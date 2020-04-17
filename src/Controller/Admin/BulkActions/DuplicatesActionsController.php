<?php

namespace App\Controller\Admin\BulkActions;

use App\Document\ElementStatus;
use App\Document\ModerationState;
use App\Services\ElementActionService;
use App\Services\ElementDuplicatesService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class DuplicatesActionsController extends BulkActionsAbstractController
{
    protected $duplicatesFound = [];

    public function detectDuplicatesAction(Request $request, SessionInterface $session, DocumentManager $dm,
                                          ElementActionService $elementActionService,
                                          ElementDuplicatesService $duplicateService)
    {
        $this->title = 'Détection des doublons';
        $this->automaticRedirection = false;
        $this->batchSize = 2000;
        $this->duplicateService = $duplicateService;
        $this->elementActionService = $elementActionService;

        return $this->elementsBulkAction('detectDuplicates', $dm, $request, $session);
    }

    public function detectDuplicates($element, $dm)
    {
        if ($element->getStatus() >= ElementStatus::PendingModification
          && !array_key_exists($element->getId(), $this->duplicatesFound)
          && !$element->isPotentialDuplicate()) {
            $distance = 0.4;
            $city = strtolower($element->getAddress()->getAddressLocality());
            if (in_array($element->getAddress()->getDepartmentCode(), ['75', '92', '93', '94'])
            || in_array($city, ['marseille', 'lyon', 'bordeaux', 'lille', 'montpellier', 'strasbourg', 'nantes', 'nice'])) {
                $distance = 0.1;
            }

            $duplicates = $this->duplicateService->checkForDuplicates($element, false, true, $distance);
            if (0 == count($duplicates)) {
                return null;
            }

            $perfectMatches = array_filter($duplicates, function ($duplicate) use ($element) { return $this->slugify($duplicate->getName()) == $this->slugify($element->getName()); });
            $otherDuplicates = array_diff($duplicates, $perfectMatches);
            $duplicates[] = $element;

            if (count($perfectMatches) > 0) {
                $element = $this->automaticMerge($element, $perfectMatches);
            }

            if (count($otherDuplicates) > 0) {
                $otherDuplicates[] = $element;

                foreach ($otherDuplicates as $key => $duplicate) {
                    if ($duplicate != $element) {
                        $element->addPotentialDuplicate($duplicate);
                    }
                    $duplicate->setModerationState(ModerationState::PotentialDuplicate);
                    $this->duplicatesFound[$duplicate->getId()] = true;
                }
                $element->setIsDuplicateNode(true);
            }

            return $this->render('admin/pages/bulks/bulk_duplicates.html.twig', [
               'duplicates' => $duplicates,
               'automaticMerge' => count($perfectMatches) > 0,
               'needHumanMerge' => count($otherDuplicates) > 0,
               'mergedId' => $element->getId(),
               'router' => $this->get('router'), ]);
        }
    }

    public function automaticMerge($element, $duplicates)
    {
        $sortedDuplicates = $element->getSortedDuplicates($duplicates);

        foreach ($sortedDuplicates as $duplicate) {
            $this->duplicatesFound[$duplicate->getId()] = true;
        }

        $merged = array_shift($sortedDuplicates);
        $mergedData = $merged->getData();
        $mergedPrivateData = $merged->getPrivateData();
        $mergedOptionIds = $merged->getOptionIds();

        foreach ($sortedDuplicates as $duplicate) {
            // Auto merge option values
            foreach ($duplicate->getOptionValues() as $dupOptionValue) {
                if (!in_array($dupOptionValue->getOptionId(), $mergedOptionIds)) {
                    $mergedOptionIds[] = $dupOptionValue->getOptionId();
                    $merged->addOptionValue($dupOptionValue);
                }
            }
            // Auto merge custom attributes
            foreach ($duplicate->getData() as $key => $value) {
                if ($value && (!array_key_exists($key, $mergedData) || !$mergedData[$key]
                           || ('description' == $key && strlen($value) > strlen($mergedData[$key])))) {
                    $mergedData[$key] = $value;
                }
            }
            foreach ($duplicate->getPrivateData() as $key => $value) {
                if ($value && (!array_key_exists($key, $mergedPrivateData) || !$mergedPrivateData[$key]
                           || ('description' == $key && strlen($value) > strlen($mergedPrivateData[$key])))) {
                    $mergedPrivateData[$key] = $value;
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
        $merged->setPrivateData($mergedPrivateData);

        return $merged;
    }

    private function slugify($text)
    {
        $text = strtolower($text); // lowercase
        // replace non letter or digits by -
        $text = str_replace('é', 'e', $text);
        $text = str_replace('è', 'e', $text);
        $text = str_replace('ê', 'e', $text);
        $text = str_replace('ô', 'o', $text);
        $text = str_replace('ç', 'c', $text);
        $text = str_replace('à', 'a', $text);
        $text = str_replace('â', 'a', $text);
        $text = str_replace('î', 'i', $text);
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);

        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text); // transliterate
      $text = preg_replace('~[^-\w]+~', '', $text); // remove unwanted characters
      $text = trim($text, '-'); // trim
      $text = rtrim($text, 's'); // remove final "s" for plural
      $text = preg_replace('~-+~', '-', $text); // remove duplicate -

      if (empty($text)) {
          return '';
      }

        return $text;
    }
}
