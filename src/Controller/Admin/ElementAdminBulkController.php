<?php

namespace App\Controller\Admin;

use App\Document\UserInteraction;
use App\Document\UserInteractionContribution;
use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Sonata\AdminBundle\Datagrid\ProxyQueryInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use App\Document\OptionValue;
use App\Document\ValidationType;
use Doctrine\ODM\MongoDB\DocumentManager;

use App\Document\ElementStatus;
use App\Document\Import;
use App\Document\ModerationState;


class ElementAdminBulkController extends Controller
{
    public function batchActionSoftDelete(ProxyQueryInterface $selectedModelQuery) {
        return $this->batchStatus($selectedModelQuery, 'softDelete');
    }
    public function batchActionRestore(ProxyQueryInterface $selectedModelQuery) {
        return $this->batchStatus($selectedModelQuery, 'restore');
    }
    public function batchActionResolveReports(ProxyQueryInterface $selectedModelQuery) {
        return $this->batchStatus($selectedModelQuery, 'resolveReports');
    }
    public function batchActionValidation(ProxyQueryInterface $selectedModelQuery) {
        return $this->batchStatus($selectedModelQuery, 'validation');
    }
    public function batchActionRefusal(ProxyQueryInterface $selectedModelQuery) {
        return $this->batchStatus($selectedModelQuery, 'refusal');
    }

    // BATCH STATUS (SOFT DELETE, RESTORE, RESOLVE, REFUSE, VALIDATE...)
    private function batchStatus(ProxyQueryInterface $selectedModelQuery, $actionName = '')
    {
        $this->admin->checkAccess('edit');

        $request = $this->get('request')->request;
        $modelManager = $this->admin->getModelManager();

        $qb = clone $selectedModelQuery;
        $elementIds = array_keys($qb->select('id')->hydrate(false)->getQuery()->execute()->toArray());
        $elementIdsString = '"' . implode(',',$elementIds) . '"';
        $queryArray = $selectedModelQuery->getQuery()->getQuery()['query'];
        // if query is "get all elements", no need to specify all ids
        if ($queryArray == ['status' => ['$ne' => -5]]) $elementIdsString = "all";

        $selectedModels = $selectedModelQuery->execute();
        $nbreModelsToProceed = $selectedModels->count();
        $isBulk = $nbreModelsToProceed > 2; // treat as bulk only if upper than X element to proceed

        $sendMail = !($request->has('dont-send-mail-' . $actionName) && $request->get('dont-send-mail-' . $actionName));
        $comment = $request->get('comment-' . $actionName);
        $dm = $modelManager->getDocumentManager($selectedModels->getNext());
        if ($sendMail) $mailService = $this->container->get('gogo.mail_service');

        try {
            // BULK - PROCEED ALL ELEMENTS AT ONCE
            if ($isBulk && in_array($actionName, ['softDelete', 'restore', 'resolveReports']))
            {
                $interactionService = $this->container->get('gogo.user_interaction_service');

                // SEND EMAIL - ITERATE EACH ELEMENT WITHOUT DB OPERATIONS
                if ($nbreModelsToProceed < 5000) {
                    foreach ($selectedModels as $element) {
                        $mappingType = array('softDelete' => 'delete', 'restore' => 'add');
                        if ($sendMail && isset($mappingType[$actionName])) $mailService->sendAutomatedMail($mappingType[$actionName], $element, $comment);
                        if ($actionName == 'resolveReports') {
                            foreach($element->getUnresolvedReports() as $report) $mailService->sendAutomatedMail('report', $element, $comment, $report);
                        }
                        $element->setPreventJsonUpdate(true);
                    }
                }
                else if ($sendMail || $actionName == 'resolveReports')
                    $this->addFlash('sonata_flash_error', "Les emails n'ont pas été envoyés, trop d'éléments à traiter d'un coup");

                // CREATE CONTRIBUTION
                $contrib = null;
                switch ($actionName) {
                    case 'softDelete': $contrib = $interactionService->createContribution($comment, InteractType::Deleted, ElementStatus::Deleted); break;
                    case 'restore': $contrib = $interactionService->createContribution($comment, InteractType::Restored, ElementStatus::AddedByAdmin);  break;
                    case 'resolveReports': $contrib = $interactionService->createContribution($comment, InteractType::ModerationResolved, ElementStatus::AdminValidate); break;
                }

                // Clear previous interaction with same type pending to be dispatched (prevent dispatching multiple edit event)
                $query = $dm->createQueryBuilder('App\Document\UserInteractionContribution')
                   ->updateMany()
                   ->field('type')->equals($contrib->getType())
                   ->field('elements.id')->in($elementIds)
                   ->field('webhookPosts')->unsetField()->exists(true)
                   ->getQuery()->execute();

                $contrib->setElementIds($elementIds);
                $dm->persist($contrib);

                // UPDATE EACH ELEMENT AT ONCE
                $mappingStatus = array('softDelete' => ElementStatus::Deleted, 'restore' => ElementStatus::AddedByAdmin);
                $qb = $selectedModelQuery->updateMany()
                    ->field('updatedAt')->set(new \DateTime());
                // Push contribution
                if ($contrib) $qb->field('contributions')->push($contrib);
                // Update status
                if (isset($mappingStatus[$actionName])) $qb = $qb->field('status')->set($mappingStatus[$actionName]);
                // Reset Moderation
                if ($actionName == 'resolveReports') $qb = $qb->field('moderationState')->set(ModerationState::NotNeeded);

                $qb->getQuery()->execute();

                // BATCH RESOLVE REPORTS
                if ($actionName == 'resolveReports')
                {
                    $query = $dm->createQueryBuilder('App\Document\UserInteractionReport')
                       ->updateMany()
                       ->field('isResolved')->notEqual(true)
                       ->field('element.id')->in($elementIds)
                       ->field('isResolved')->set(true)
                       ->field('resolvedMessage')->set($comment)
                       ->field('resolvedBy')->set($this->container->get('security.token_storage')->getToken()->getUser()->getEmail())
                       ->field('updatedAt')->set(new \DateTime())
                       ->getQuery()->execute();
                }

                $dm->flush();

                // update element json asyncronously
                $this->container->get('gogo.async')->callCommand('app:elements:updateJson', ["ids" => $elementIdsString]);
            }
            // PROCEED EACH ELEMENT ONE BY ONE
            else
            {
                $elementActionService = $this->container->get('gogo.element_action_service');
                $i = 0;
                foreach ($selectedModels as $selectedModel)
                {
                    switch ($actionName) {
                        case 'softDelete': $elementActionService->delete($selectedModel, $sendMail, $comment); break;
                        case 'restore': $elementActionService->restore($selectedModel, $sendMail, $comment);  break;
                        case 'resolveReports': $elementActionService->resolveReports($selectedModel, $comment, true); break;
                        case 'validation': $elementActionService->resolve($selectedModel, true, 2, $comment); break;
                        case 'refusal': $elementActionService->resolve($selectedModel, false, 2, $comment); break;
                    }

                    if ((++$i % 100) == 0) {
                        $dm->flush();
                        $dm->clear();
                    }
                }
                $dm->flush();
                $dm->clear();
            }

        } catch (\Exception $e) {
            $this->addFlash('sonata_flash_error', 'Une erreur est survenue :' . $e->getMessage());
            return new RedirectResponse($this->admin->generateUrl('list', array('filter' => $this->admin->getFilterParameters())));
        }

        $this->addFlash('sonata_flash_success', 'Les '. $nbreModelsToProceed .' élements ont bien été traités');
        // if ($nbreModelsToProceed >= $limit) $this->addFlash('sonata_flash_info', "Trop d'éléments à traiter ! Seulement " . $limit . " ont été traités");

        return new RedirectResponse($this->admin->generateUrl('list', array('filter' => $this->admin->getFilterParameters())));
    }

    // BATCH HARD DELETE
    public function batchActionDelete(ProxyQueryInterface $selectedModelQuery)
    {
        $dm = $this->admin->getModelManager(); // ??
        dump($dm);
        // Add contribution for webhook - Get elements visible, no need to add a contirbution if element where already soft deleted for example
        $selectedModels = clone $selectedModelQuery;
        $elementIds = array_keys($selectedModels->select('id')->field('status')->gte(-1)->hydrate(false)->getQuery()->execute()->toArray());
        if (count($elementIds)) {
            $interactionService = $this->container->get('gogo.user_interaction_service');
            $contribution = $interactionService->createContribution(null, InteractType::Deleted, ElementStatus::Deleted);
            $contribution->setElementIds($elementIds);
            $dm->persist($contribution);
        }

        // Add element id to ignore to sources
        $selectedModels = clone $selectedModelQuery;
        $elementsIdsGroupedBySource = $selectedModels
            ->map('function() { if (this.source) emit(this.source.$id, this._id); }')
            ->reduce('function(k, vals) {
                return vals.join(",");
            }')->getQuery()->execute()->toArray();

        foreach ($elementsIdsGroupedBySource as $value) {
            $elementIdsForCurrSource = explode(',', $value['value']);
            $qb = $dm->createQueryBuilder(Import::class);
            $qb->updateOne()
               ->field('id')->equals($value['_id'])
               ->field('idsToIgnore')->addToSet($qb->expr()->each($elementIdsForCurrSource))
               ->getQuery()->execute();
        }

        // Perform remove
        $selectedModelQuery->remove()->getQuery()->execute();
        $dm->createQueryBuilder(UserInteractionContribution::class)->field('element.id')->in($elementIds)->remove()->getQuery()->execute();
        $dm->flush();

        return new RedirectResponse($this->admin->generateUrl('list', array('filter' => $this->admin->getFilterParameters())));
    }

    // BATCH SEND EMAILS
    public function batchActionSendMail(ProxyQueryInterface $selectedModelQuery)
    {
        $selectedModels = $selectedModelQuery->execute();
        $nbreModelsToProceed = $selectedModels->count();
        $selectedModels->limit(5000);

        $request = $this->get('request')->request;

        $mails = [];
        $mailsSent = 0;
        $elementWithoutEmail = 0;

        try {
            foreach ($selectedModels as $element)
            {
                $mail = $request->get('send-to-element') ? $element->getEmail() : null;
                $mailContrib = null;
                if ($request->get('send-to-last-contributor'))
                {
                    $contrib = $element->getCurrContribution();
                    $mailContrib = $contrib ? $contrib->getUserEmail() : null;
                    if ($mailContrib == "no email") $mailContrib = null;
                }

                if ($mail) $mails[] = $mail;
                if ($mailContrib) $mails[] = $mailContrib;
                if (!$mail && !$mailContrib) $elementWithoutEmail++;
            }
        } catch (\Exception $e) {
            $this->addFlash('sonata_flash_error', 'ERROR : ' . $e->getMessage());
            return new RedirectResponse($this->admin->generateUrl('list', $this->admin->getFilterParameters()));
        }

        if (!$request->get('mail-subject') || !$request->get('mail-content'))
        {
            $this->addFlash('sonata_flash_error', "Vous devez renseigner un objet et un contenu. Veuillez recommencer");
        }
        else if (count($mails) > 0)
        {
            $mailService = $this->container->get('gogo.mail_service');
            $result = $mailService->sendMail(null, $request->get('mail-subject'), $request->get('mail-content'), $request->get('from'), $mails);
            if ($result['success'])
                $this->addFlash('sonata_flash_success', count($mails) . ' mails ont bien été envoyés');
            else
                $this->addFlash('sonata_flash_error',$result['message']);
        }

        if ($elementWithoutEmail > 0)
            $this->addFlash('sonata_flash_error', $elementWithoutEmail . " mails n'ont pas pu être envoyé car aucune adresse n'était renseignée");

        if ($nbreModelsToProceed >= 5000)
        {
            $this->addFlash('sonata_flash_info', "Trop d'éléments à traiter ! Seulement 5000 ont été traités");
        }

        return new RedirectResponse($this->admin->generateUrl('list', $this->admin->getFilterParameters()));
    }

    // BATCH EDIT OPTIONS
    public function batchActionEditOptions(ProxyQueryInterface $selectedModelQuery)
    {
        $this->admin->checkAccess('edit');

        $request = $this->get('request')->request;
        $modelManager = $this->admin->getModelManager();

        $selectedModels = $selectedModelQuery->execute();
        $nbreModelsToProceed = $selectedModels->count();

        $limit = 2000;
        $selectedModels->limit($limit);

        $optionstoRemoveIds = $request->get('optionsToRemove');
        $optionstoAddIds = $request->get('optionsToAdd');

        $dm = $modelManager->getDocumentManager($selectedModels->getNext());

        try {
            $i = 0;
            foreach ($selectedModels as $selectedModel) {
                $optionsValues = $selectedModel->getOptionValues()->toArray();
                if ($optionstoRemoveIds && count($optionstoRemoveIds) > 0)
                {
                    $optionsToRemove = $dm->createQueryBuilder('App\Document\Option')->field('id')->in($optionstoRemoveIds)
                                                       ->getQuery()->execute()->toArray();
                    $optionstoRemoveIds = array_map(function($opt) { return $opt->getIdAndChildrenOptionIds(); }, $optionsToRemove);
                    $optionstoRemoveIds = array_unique($this->flatten($optionstoRemoveIds));

                    $optionValuesToBeRemoved = array_filter($optionsValues, function($oV) use($optionstoRemoveIds){ return in_array($oV->getOptionId(), $optionstoRemoveIds); });

                    foreach ($optionValuesToBeRemoved as $key => $optionValue) {
                        $selectedModel->removeOptionValue($optionValue);
                    }
                }

                if ($optionstoAddIds && count($optionstoAddIds) > 0)
                {
                    $optionsToAdd = $dm->createQueryBuilder('App\Document\Option')->field('id')->in($optionstoAddIds)->getQuery()->execute()->toArray();
                    $optionstoAddIds = array_map(function($opt) { return $opt->getIdAndParentOptionIds(); }, $optionsToAdd);
                    $optionstoAddIds = array_unique($this->flatten($optionstoAddIds));

                    $optionValuesIds = array_map( function($x) { return $x->getOptionId(); }, $optionsValues);

                    foreach ($optionstoAddIds as $key => $optionId) {
                        if (!in_array($optionId, $optionValuesIds))
                        {
                            $optionValue = new OptionValue();
                            $optionValue->setOptionId($optionId);
                            $selectedModel->addOptionValue($optionValue);
                        }
                    }
                }
                if ((++$i % 100) == 0) { $dm->flush(); $dm->clear(); }
            }
            $dm->flush();
            $dm->clear();

        } catch (\Exception $e) {
            $this->addFlash('sonata_flash_error', 'Une erreur est survenue :' . $e->getMessage());
            return new RedirectResponse($this->admin->generateUrl('list', array('filter' => $this->admin->getFilterParameters())));
        }

        $this->addFlash('sonata_flash_success', 'Les catégories des '. min([$nbreModelsToProceed,$limit]) .' élements ont bien été mis à jour');
        if ($nbreModelsToProceed >= $limit) $this->addFlash('sonata_flash_info', "Trop d'éléments à traiter ! Seulement " . $limit . " ont été traités");
        return new RedirectResponse( $this->admin->generateUrl('list', array('filter' => $this->admin->getFilterParameters())));
    }

    private function flatten(array $array)
    {
        $return = array();
        array_walk_recursive($array, function($a) use (&$return) { $return[] = $a; });
        return $return;
    }
}