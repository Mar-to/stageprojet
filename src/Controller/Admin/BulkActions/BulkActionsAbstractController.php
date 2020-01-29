<?php

namespace App\Controller\Admin\BulkActions;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use App\Document\ElementStatus;
use App\Document\ModerationState;
use App\Document\UserRoles;
use App\Document\OptionValue;
use App\Document\UserInteractionContribution;
use App\Document\InteractionType;

class BulkActionsAbstractController extends Controller
{
    protected $optionList = [];
    protected $title = null;
    protected $fromBeginning = false;
    protected $batchSize = 1000;
    protected $automaticRedirection = true;

    protected function elementsBulkAction($functionToExecute, $dm, $request, $session)
    {
        $elementsLeft = null;
        $elementLeftCount = 0;
        $isStillElementsToProceed = false;

        $elementRepo = $dm->getRepository('App\Document\Element');

        $optionsRepo = $dm->getRepository('App\Document\Option');
        $this->optionList = $optionsRepo->createQueryBuilder()->hydrate(false)->getQuery()->execute()->toArray();

        if (!$this->fromBeginning && $request->get('batchFromStep')) $batchFromStep = $request->get('batchFromStep');
        else $batchFromStep = 0;

        $count = $elementRepo->findAllElements(null, $batchFromStep, true);
        $elementsToProcceedCount = 0;
        if ($count > $this->batchSize)
        {
            $batchLastStep = $batchFromStep + $this->batchSize;
            $isStillElementsToProceed = true;
            $elementsToProcceedCount =  $count - $this->batchSize;
        }
        else
        {
            $batchLastStep = $batchFromStep + $count;
        }

        $elements = $elementRepo->findAllElements($this->batchSize, $batchFromStep);

        $i = 0;
        $renderedViews = [];
        foreach ($elements as $key => $element)
        {
           $view = $this->$functionToExecute($element, $dm);
           if ($view) $renderedViews[] = $view;

           if ((++$i % 100) == 0) {
                $dm->flush();
                $dm->clear();
            }
        }

        $dm->flush();
        $dm->clear();

        $redirectionRoute = $this->generateUrl($request->get('_route'), ['batchFromStep' => $batchLastStep]);
        if ($isStillElementsToProceed && $this->automaticRedirection) return $this->redirect($redirectionRoute);

        if ($this->automaticRedirection) {
            $session->getFlashBag()->add('success', "Tous les éléments ont été traité avec succès");
            return $this->redirectToIndex();
        }

        return $this->render('admin/pages/bulks/bulk_abstract.html.twig', array(
            'isStillElementsToProceed' => $isStillElementsToProceed,
            'renderedViews' => $renderedViews,
            'firstId' => $batchFromStep,
            'lastId' => $batchLastStep,
            'elementsToProcceedCount' => $elementsToProcceedCount,
            'redirectionRoute' => $redirectionRoute,
            'title' => $this->title ? $this->title : $functionToExecute));
    }

    protected function redirectToIndex()
    {
        return $this->redirect($this->generateUrl("gogo_bulk_actions_index"));
    }
}