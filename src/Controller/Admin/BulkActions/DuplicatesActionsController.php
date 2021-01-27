<?php

namespace App\Controller\Admin\BulkActions;

use App\Document\ElementStatus;
use App\Document\ModerationState;
use App\Services\ElementActionService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class DuplicatesActionsController extends BulkActionsAbstractController
{
    protected $duplicatesFound = [];

    public function detectDuplicatesAction(Request $request, SessionInterface $session, DocumentManager $dm,
                                          ElementActionService $elementActionService)
    {
        $this->title = 'Détection des doublons';
        $this->automaticRedirection = false;
        $this->batchSize = 2000;
        $this->elementActionService = $elementActionService;

        if (!$request->get('batchFromStep')) {
            // reset previous detections
            $dm->query('Element')->update()
            ->field('isDuplicateNode')->unsetField()->exists(true)
            ->field('potentialDuplicates')->unsetField()->exists(true)
            ->execute();
        }

        return $this->elementsBulkAction('detectDuplicates', $dm, $request, $session);
    }

    public function detectDuplicates($element, $dm)
    {       
        if ($element->getStatus() >= ElementStatus::PendingModification
        && !array_key_exists($element->getId(), $this->duplicatesFound)) {        
            $duplicates = $dm->get('Element')->findDuplicatesFor($element);
            $config = $dm->get('Configuration')->findConfiguration();
            if (count($duplicates) == 0) return null;
            
            $duplicates[] = $element;

            // Remember them so we do not check duplicate on them again
            foreach ($duplicates as $duplicate) {
                $this->duplicatesFound[$duplicate->getId()] = true;
            }

            // sort duplicates
            $sourcePriorities = $config->getDuplicates()->getSourcePriorityInAutomaticMerge();
            usort($duplicates, function($a, $b) use ($sourcePriorities) {
                $aPriority = array_search($a->getSourceKey(), $sourcePriorities);
                $bPriority = array_search($b->getSourceKey(), $sourcePriorities);
                if ($aPriority != $bPriority) {
                    // order by source priority
                    return $aPriority > $bPriority;
                } else {
                    // Or get the more recent
                    $diffDays = (float) date_diff($a->getUpdatedAt(), $b->getUpdatedAt())->format('%d');
                    return $diffDays;
                };
            });   
            
            $elementToKeep = array_shift($duplicates);

            $perfectMatches = [];
            if ($config->getDuplicates()->getAutomaticMergeIfPerfectMatch()) {
                $perfectMatches = array_filter($duplicates, function ($duplicate) use ($elementToKeep) { 
                    // null score means duplicate come from the query with field, which relies on perfect value
                    return $duplicate->getScore() === null || slugify($duplicate->getName()) == slugify($elementToKeep->getName()); 
                });
            }
              
            $potentialDuplicates = array_diff($duplicates, $perfectMatches);                     

            if (count($perfectMatches) > 0) {
                $elementToKeep = $this->automaticMerge($elementToKeep, $perfectMatches);
            }

            if (count($potentialDuplicates) > 0) {
                $elementToKeep->setIsDuplicateNode(true);
                foreach ($potentialDuplicates as $duplicate) {
                    $elementToKeep->addPotentialDuplicate($duplicate);
                    $duplicate->setModerationState(ModerationState::PotentialDuplicate);
                }                
            }

            return $this->render('admin/pages/bulks/bulk_duplicates.html.twig', [
               'duplicates' => array_merge([$elementToKeep], $perfectMatches, $potentialDuplicates),
               'config' => $config,
               'automaticMerge' => count($perfectMatches) > 0,
               'needHumanMerge' => count($potentialDuplicates) > 0,
               'mergedId' => $elementToKeep->getId(),
               'router' => $this->get('router'), ]);
        }
    }

    public function automaticMerge($merged, $duplicates)
    {
        $mergedData = $merged->getData();
        $mergedOptionIds = $merged->getOptionIds();

        foreach ($duplicates as $duplicate) {
            // Auto merge option values
            foreach ($duplicate->getOptionValues() as $dupOptionValue) {
                if (!in_array($dupOptionValue->getOptionId(), $mergedOptionIds)) {
                    $mergedOptionIds[] = $dupOptionValue->getOptionId();
                    $merged->addOptionValue($dupOptionValue);
                }
            }
            // Auto merge custom attributes
            foreach ($duplicate->getData() as $key => $value) {
                if ($value && (!array_key_exists($key, $mergedData) || !$mergedData[$key])) {
                    $mergedData[$key] = $value;
                }
            }
            // Auto merge special attributes
            $merged->setImages(array_merge($merged->getImagesArray(), $duplicate->getImagesArray()));
            $merged->setFiles(array_merge($merged->getFilesArray(), $duplicate->getFilesArray()));
            if (!$merged->getOpenHours() && $duplicate->getOpenHours()) {
                $merged->setOpenHours($duplicate->getOpenHours());
            }
            if (!$merged->getUserOwnerEmail() && $duplicate->getUserOwnerEmail()) {
                $merged->setUserOwnerEmail($duplicate->getUserOwnerEmail());
            }
            if (!$merged->getAddress()->isComplete()) {
                $address = $merged->getAddress();
                $dupAddress = $duplicate->getAddress();
                if (!$address->getStreetAddress() && $dupAddress->getStreetAddress()) {
                    $address->setStreetAddress($dupAddress->getStreetAddress());
                }
                if (!$address->getAddressLocality() && $dupAddress->getAddressLocality()) {
                    $address->setAddressLocality($dupAddress->getAddressLocality());
                }
                if (!$address->getAddressCountry() && $dupAddress->getAddressCountry()) {
                    $address->setAddressCountry($dupAddress->getAddressCountry());
                }
                if (!$address->getPostalCode() && $dupAddress->getPostalCode()) {
                    $address->setPostalCode($dupAddress->getPostalCode());
                }
                $merged->setAddress($address);
            }
            // setting this moderation so when deleted it becomes "deleted duplicate" instead of just "deleted"
            $duplicate->setModerationState(ModerationState::PotentialDuplicate);
            $this->elementActionService->delete($duplicate, false);
        }
        $merged->setModerationState(ModerationState::NotNeeded);
        $merged->setData($mergedData);

        return $merged;
    }
}
