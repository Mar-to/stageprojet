<?php

namespace App\Services;

use App\Document\Coordinates;
use App\Document\Element;
use App\Document\ElementFile;
use App\Document\ElementImage;
use App\Document\ElementStatus;
use App\Document\ModerationState;
use App\Document\OpenHours;
use App\Document\Option;
use App\Document\OptionValue;
use App\Document\PostalAddress;
use Doctrine\ODM\MongoDB\DocumentManager;
use Geocoder\ProviderAggregator;

class ElementImportOneService
{
    private $dm;
    private $geocoder;
    private $interactionService;

    protected $optionIdsToAddToEachElement = [];

    protected $coreFields = ['id', 'name', 'categories', 'streetAddress', 'addressLocality', 'postalCode', 'addressCountry', 'customFormatedAddress', 'latitude', 'longitude', 'images', 'files', 'owner', 'source', 'openHours'];
    protected $privateDataProps;

    /**
     * Constructor.
     */
    public function __construct(DocumentManager $dm, ProviderAggregator $geocoder,
                                                UserInteractionService $interactionService)
    {
        $this->dm = $dm;
        $this->geocoder = $geocoder->using('google_maps');
        $this->interactionService = $interactionService;
        $this->currentRow = [];
    }

    public function initialize($import)
    {
        $this->optionIdsToAddToEachElement = [];
        foreach ($import->getOptionsToAddToEachElement() as $option) {
            $this->optionIdsToAddToEachElement[] = $option->getId();
        }

        // Getting the private field of the custom data
        $config = $this->dm->getRepository('App\Document\Configuration')->findConfiguration();
        $this->privateDataProps = $config->getApi()->getPublicApiPrivateProperties();
    }

    public function createElementFromArray($row, $import)
    {
        $updateExisting = false; // if we create a new element or update an existing one
        $realUpdate = false; // if we are sure that the external has been edited with 'FieldToCheckElementHaveBeenUpdated'

        // adds missings fields instead of checking if each field is set before accessing
        $missingFields = array_diff($this->coreFields, array_keys($row));
        foreach ($missingFields as $missingField) {
            $row[$missingField] = ('categories' == $missingField) ? [] : '';
        }

        $element = null;

        if ($row['id']) {
            if (in_array($row['id'], $import->getIdsToIgnore())) {
                return;
            }
            $qb = $this->dm->createQueryBuilder('App\Document\Element');
            $qb->field('source')->references($import);
            $qb->field('oldId')->equals(''.$row['id']);
            $element = $qb->getQuery()->getSingleResult();
        } elseif (is_string($row['name']) && strlen($row['name']) > 0) {
            $qb = $this->dm->createQueryBuilder('App\Document\Element');
            $qb->field('source')->references($import);
            $qb->field('name')->equals($row['name']);

            if (is_string($row['latitude']) && strlen($row['latitude']) > 0 && is_string($row['longitude']) && strlen($row['longitude']) > 0) {
                $geo = new Coordinates($row['latitude'], $row['longitude']);
                $qb->field('geo.latitude')->equals($geo->getLatitude());
                $qb->field('geo.longitude')->equals($geo->getLongitude());
                $element = $qb->getQuery()->getSingleResult();
            } elseif (strlen($row['streetAddress']) > 0) {
                if (strlen($row['streetAddress']) > 0) {
                    $qb->field('address.streetAddress')->equals($row['streetAddress']);
                }
                if (strlen($row['addressLocality']) > 0) {
                    $qb->field('address.addressLocality')->equals($row['addressLocality']);
                }
                if (strlen($row['postalCode']) > 0) {
                    $qb->field('address.postalCode')->equals($row['postalCode']);
                }
                $element = $qb->getQuery()->getSingleResult();
            }
        }

        if ($element) { // if the element already exists, we update it
            $updatedAtField = $import->getFieldToCheckElementHaveBeenUpdated();
            // if updated date hasn't change, nothing to do
            if ($updatedAtField && array_key_exists($updatedAtField, $row)) {
                if ($row[$updatedAtField] && $row[$updatedAtField] == $element->getCustomProperty($updatedAtField)) {
                    $element->setPreventJsonUpdate(true);
                    if (ElementStatus::DynamicImportTemp == $element->getStatus()) {
                        $element->setStatus(ElementStatus::DynamicImport);
                    }
                    $this->dm->persist($element);

                    return 'nothing_to_do';
                } else {
                    $realUpdate = true;
                }
            }
            $updateExisting = true;
            // resetting "geolocc" and "no options" modearation state so it will be calculated again
            if ($element->getModerationState() < 0) {
                $element->setModerationState(ModerationState::NotNeeded);
            }
        } else {
            $element = new Element();
        }
        $this->currentRow = $row;

        $element->setOldId($row['id']);
        $element->setName($row['name']);
        $address = new PostalAddress($row['streetAddress'], $row['addressLocality'], $row['postalCode'], $row['addressCountry'], $row['customFormatedAddress']);
        $element->setAddress($address);

        $defaultSourceName = $import ? $import->getSourceName() : 'Inconnu';
        $element->setSourceKey((strlen($row['source']) > 0 && 'Inconnu' != $row['source']) ? $row['source'] : $defaultSourceName);
        $element->setSource($import);

        if (array_key_exists('owner', $row)) {
            $element->setUserOwnerEmail($row['owner']);
        }

        $lat = $row['latitude'];
        $lng = $row['longitude'];
        if (is_object($lat) || is_array($lat) || 0 == strlen($lat) || is_object($lng) || 0 == strlen($lng) || 'null' == $lat || null == $lat) {
            $lat = 0;
            $lng = 0;
            if ($import->getGeocodeIfNecessary()) {
                $result = $this->geocoder->geocode($address->getFormatedAddress())->first()->getCoordinates();
                $lat = $result->getLatitude();
                $lng = $result->getLongitude();
            }
        }

        if (0 == $lat || 0 == $lng) {
            $element->setModerationState(ModerationState::GeolocError);
        }
        $element->setGeo(new Coordinates($lat, $lng));

        $this->createCategories($element, $row, $import);

        if ($import->getPreventImportIfNoCategories() && ModerationState::NoOptionProvided == $element->getModerationState()) {
            return 'no_category';
        }

        $this->createImages($element, $row);
        $this->createFiles($element, $row);
        $this->createOpenHours($element, $row);
        $this->saveCustomFields($element, $row);

        if ($import->isDynamicImport()) { // keep the same status for the one who were deleted
            $status = (!$element->getStatus() || ElementStatus::DynamicImportTemp == $element->getStatus()) ? ElementStatus::DynamicImport : $element->getStatus();
            $element->setIsExternal(true);
        } else {
            $status = ElementStatus::AddedByAdmin;
        }

        // create import contribution if first time imported
        if (!$updateExisting) {
            $contribution = $this->interactionService->createContribution(null, 0, $status);
            $element->addContribution($contribution);
        // $this->mailService->sendAutomatedMail('add', $element, $message);
        }
        // create edit contribution if real update
        elseif ($realUpdate) {
            $contribution = $this->interactionService->createContribution(null, 1, $status);
            $element->addContribution($contribution);
        }

        $element->setStatus($status);
        $element->updateTimestamp();

        $this->dm->persist($element);

        return $updateExisting ? 'updated' : 'created';
    }

    private function saveCustomFields($element, $raw_data)
    {
        $customFields = array_diff(array_keys($raw_data), $this->coreFields);
        $customData = [];
        foreach ($customFields as $customField) {
            if ($customField && is_string($customField)) {
                $customData[$customField] = $raw_data[$customField];
            }
        }

        $element->setCustomData($customData, $this->privateDataProps);
    }

    private function createImages($element, $row)
    {
        $element->resetImages();
        $images_raw = $row['images'];
        if (is_string($images_raw) && strlen($images_raw) > 0) {
            $images = explode(',', $row['images']);
        } elseif (is_array($images_raw)) {
            $images = $images_raw;
        } else {
            $keys = array_keys($row);
            $image_keys = array_filter($keys, function ($key) { return $this->startsWith($key, 'image'); });
            $images = array_map(function ($key) use ($row) { return $row[$key]; }, $image_keys);
        }

        if (0 == count($images)) {
            return;
        }

        foreach ($images as $imageUrl) {
            if (is_string($imageUrl) && strlen($imageUrl) > 5) {
                $elementImage = new ElementImage();
                $elementImage->setExternalImageUrl($imageUrl);
                $element->addImage($elementImage);
            }
        }
    }

    private function createFiles($element, $row)
    {
        $element->resetFiles();
        $files = $row['files'];
        if (is_string($files) && strlen($files) > 0) {
            $files = explode(',', $files);
        }
        if (!is_array($files) || 0 == count($files)) {
            return;
        }

        foreach ($files as $url) {
            if (is_string($url) && strlen($url) > 5) {
                $elementFile = new ElementFile();
                $elementFile->setFileUrl($url);
                $name = explode('/', $url);
                $name = end($name);
                $elementFile->setFileName($name);
                $element->addFile($elementFile);
            }
        }
    }

    private function createOpenHours($element, $row)
    {
        if (!isset($row['openhours']) || !$this->isAssociativeArray($row['openhours'])) {
            return;
        }
        $element->setOpenHours(new OpenHours($row['openhours']));
    }

    private function isAssociativeArray($a)
    {
        if (!is_array($a)) {
            return false;
        }
        foreach (array_keys($a) as $key) {
            if (!is_int($key)) {
                return true;
            }
        }

        return false;
    }

    public function startsWith($haystack, $needle)
    {
        $length = strlen($needle);

        return substr($haystack, 0, $length) === $needle;
    }

    private function createCategories($element, $row, $import)
    {
        $element->resetOptionsValues();
        $optionsIdAdded = [];
        $options = $row['categories'];

        $defaultOption = ['index' => 0, 'description' => ''];
        foreach ($options as $option) {
            $option = array_merge($defaultOption, $option);
            $this->addOptionValue($element, $option['mappedId'], $option['index'], $option['description']);
        }

        if ($import->getNeedToHaveOptionsOtherThanTheOnesAddedToEachElements()) {
            // checking option number before adding optionIdsToAddToEachElement
            if (0 == count($element->getOptionValues())) {
                $element->setModerationState(ModerationState::NoOptionProvided);
            }
        }

        // Manually add some options to each element imported
        foreach ($this->optionIdsToAddToEachElement as $optionId) {
            if (!in_array($optionId, $optionsIdAdded)) {
                $optionsIdAdded[] = $this->addOptionValue($element, $optionId);
            }
        }

        if (0 == count($element->getOptionValues())) {
            $element->setModerationState(ModerationState::NoOptionProvided);
        }
    }

    private function addOptionValue($element, $id, $index = 0, $description = '')
    {
        if (!$id || '0' == $id || 0 == $id) {
            return;
        }
        $optionValue = new OptionValue();
        $optionValue->setOptionId($id);
        $optionValue->setIndex($index);
        $optionValue->setDescription($description);
        $element->addOptionValue($optionValue);

        return $id;
    }
}
