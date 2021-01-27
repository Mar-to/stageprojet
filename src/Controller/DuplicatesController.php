<?php

/**
 * @Author: Sebastian Castro
 * @Date:   2018-06-16 11:15:08
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-06-17 16:46:54
 */

namespace App\Controller;

use App\Document\Element;
use App\Services\ElementActionService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DuplicatesController extends GoGoController
{
    const DUPLICATE_BATH_SIZE = 15;

    public function indexAction(DocumentManager $dm)
    {
        $optionsNames = $dm->query('Option')->select('name')->getArray();

        $duplicatesNodeCount = $dm->get('Element')->findDuplicatesNodes(null, true);
        $duplicatesNode = $dm->get('Element')->findDuplicatesNodes(DuplicatesController::DUPLICATE_BATH_SIZE)->toArray();

        $leftDuplicatesToProceedCount = max($duplicatesNodeCount - DuplicatesController::DUPLICATE_BATH_SIZE, 0);

        $lockUntil = time() + 10 * 60; // lock for 10 minutes
        foreach ($duplicatesNode as $key => $element) {
            $element->setLockUntil($lockUntil);
        }
        $dm->flush();

        return $this->render('duplicates/duplicates-index.html.twig', ['duplicatesNode' => $duplicatesNode, 'router' => $this->get('router'), 'optionsNames' => $optionsNames, 'leftDuplicatesToProceedCount' => $leftDuplicatesToProceedCount]);
    }

    // Will mark all the
    public function markAsNonDuplicateAction(Request $request, DocumentManager $dm, ElementActionService $elementActionService)
    {
        if ($request->isXmlHttpRequest()) {
            if (!$request->get('elementId')) {
                return $this->returnResponse(false, 'Les paramètres sont incomplets');
            }

            $element = $dm->get('Element')->find($request->get('elementId'));

            $element->setIsDuplicateNode(false);
            $duplicates = $element->getPotentialDuplicates() ? $element->getPotentialDuplicates()->toArray() : [];
            // if no potential duplicates, element has already been resolved, nothing to do
            if (count($duplicates) > 0) {
                $duplicates[] = $element;
                // Adds each other to non duplicates
                foreach ($duplicates as $key => $duplicate) {
                    foreach ($duplicates as $dup) {
                        if ($dup != $duplicate) {
                            $duplicate->addNonDuplicate($dup);
                        }
                    }
                }
                // resolve
                foreach ($duplicates as $key => $duplicate) {
                    $elementActionService->resolveReports($duplicate, 'Marqué comme non doublon', true);
                }
                $element->clearPotentialDuplicates();
                $dm->flush();
            }

            return new Response('Les éléments ont bien été marqués comme non doublons');
        } else {
            return new Response('Not valid ajax request');
        }
    }
}
