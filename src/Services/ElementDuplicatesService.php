<?php

namespace App\Services;

use Doctrine\ODM\MongoDB\DocumentManager;
use App\Services\ElementActionService;
use App\Document\ElementStatus;
use App\Document\ModerationState;

class ElementDuplicatesService
{
    // To know if an element have already been processed, we use the moderationstate : PotentialDuplicate
    // but as we are processing element in batch, during the same batch data is not persisted and so instead
    // we use this array or element Id that we exclude from the detection
    protected $duplicatesFound = [];

    public function __construct(DocumentManager $dm, ElementActionService $elementActionService)
    {
        $this->dm = $dm;
        $this->elementActionService = $elementActionService;
    }

    public function detectDuplicatesFor($element)
    {       
        if ($element->getStatus() >= ElementStatus::PendingModification
        && !in_array($element->getId(), $this->duplicatesFound)
        && !$element->isPotentialDuplicate()) {
            dump("detect duplicate for {$element->getName()}");    
            $duplicates = $this->dm->get('Element')->findDuplicatesFor($element, $this->duplicatesFound);
            if (count($duplicates) == 0) return null;
            
            // only keep two duplicates, so get easier to manage for the users (less complicated cases)
            // so we sort duplicates and keep first (best choice)
            usort($duplicates, function($a, $b) use ($element) {
                if ($this->isPerfectMatch($element, $a)) return true; 
                if ($this->isPerfectMatch($element, $b)) return false; 
                if ($a->getScore() != null && $b->getScore() != null) return $a->getScore() > $b->getScore();
            }); 
            $bestDuplicate = array_shift($duplicates);
            $isPerfectMatch = $this->isPerfectMatch($element, $bestDuplicate);
            $duplicatesToProceed = [$element, $bestDuplicate];
            
            // Choose which duplicate to keep
            $config = $this->dm->get('Configuration')->findConfiguration();
            $sourcePriorities = $config->getDuplicates()->getSourcePriorityInAutomaticMerge();
            usort($duplicatesToProceed, function($a, $b) use ($sourcePriorities) {
                $aPriority = array_search($a->getSourceKey(), $sourcePriorities);
                $bPriority = array_search($b->getSourceKey(), $sourcePriorities);
                if ($aPriority != $bPriority) {
                    // order by source priority
                    return $aPriority > $bPriority;
                } else {
                    // Or get the more recent
                    try { $diffDays = (float) date_diff($a->getUpdatedAt(), $b->getUpdatedAt())->format('%d'); }
                    catch (\Exception $e) { return 0; }                    
                    return $diffDays;
                };
            });   

            // Remember them so we do not check duplicate on them again
            foreach ($duplicatesToProceed as $duplicate) {
                $this->duplicatesFound[] = $duplicate->getId();
                $duplicate->setModerationState(ModerationState::PotentialDuplicate);
            }
            
            $elementToKeep = array_shift($duplicatesToProceed);
            $duplicate = array_pop($duplicatesToProceed);
            $autoMerge = $isPerfectMatch && $config->getDuplicates()->getAutomaticMergeIfPerfectMatch();
            if ($autoMerge) {
                $elementToKeep = $this->automaticMerge($elementToKeep, [$duplicate]);
            } else {
                $elementToKeep->setIsDuplicateNode(true);
                $elementToKeep->addPotentialDuplicate($duplicate);
                $duplicate->setModerationState(ModerationState::PotentialDuplicate);
            }
            return [
                'automaticMerge' => $autoMerge,
                'elementToKeep' => $elementToKeep,
                'duplicate' => $duplicate
            ];
        }
    }

    private function isPerfectMatch($element, $duplicate)
    {
        // null score means duplicate come from the query with field, which relies on perfect value
        return $duplicate->getScore() === null || slugify($duplicate->getName()) == slugify($element->getName());
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
            // merge non duplicates
            foreach ($duplicate->getNonDuplicates() as $nonDup) $merged->addNonDuplicate($nonDup);
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
            if ($duplicate->getStatus() > $merged->getStatus()) $merged->setStatus($duplicate->getStatus());
            $this->elementActionService->delete($duplicate, false);
        }
        $merged->setModerationState(ModerationState::NotNeeded);
        $merged->setData($mergedData);

        return $merged;
    }
}