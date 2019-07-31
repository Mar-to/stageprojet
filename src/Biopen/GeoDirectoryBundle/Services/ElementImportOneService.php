<?php

namespace Biopen\GeoDirectoryBundle\Services;

use Doctrine\ODM\MongoDB\DocumentManager;
use Biopen\GeoDirectoryBundle\Document\Element;
use Biopen\GeoDirectoryBundle\Document\ElementStatus;
use Biopen\GeoDirectoryBundle\Document\ModerationState;
use Biopen\GeoDirectoryBundle\Document\Coordinates;
use Biopen\GeoDirectoryBundle\Document\Option;
use Biopen\GeoDirectoryBundle\Document\OptionValue;
use Biopen\GeoDirectoryBundle\Document\UserInteractionContribution;
use Biopen\GeoDirectoryBundle\Document\PostalAddress;
use Biopen\GeoDirectoryBundle\Document\ElementImage;

class ElementImportOneService
{
	private $em;
	private $geocoder;
	private $interactionService;

	protected $optionIdsToAddToEachElement = [];

	protected $coreFields = ['id', 'name', 'categories', 'streetAddress', 'addressLocality', 'postalCode', 'addressCountry', 'latitude', 'longitude', 'images', 'owner', 'source'];
	protected $privateDataProps;

	/**
    * Constructor
    */
  public function __construct(DocumentManager $documentManager, $geocoder, $interactionService)
  {
		$this->em = $documentManager;
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
    $config = $this->em->getRepository('BiopenCoreBundle:Configuration')->findConfiguration();
    $this->privateDataProps = $config->getApi()->getPublicApiPrivateProperties();
  }

	public function createElementFromArray($row, $import)
	{
		$updateExisting = false; // if we create a new element or update an existing one
		$realUpdate = false; // if we are sure that the external has been edited with 'FieldToCheckElementHaveBeenUpdated'
		if ($row['id'])
		{
			if (in_array($row['id'], $import->getIdsToIgnore())) return;
			$qb = $this->em->createQueryBuilder('BiopenGeoDirectoryBundle:Element');
			$qb->field('source')->references($import);
			$qb->field('oldId')->equals("" . $row['id']);
			$element = $qb->getQuery()->getSingleResult();
		} else {
			$qb = $this->em->createQueryBuilder('BiopenGeoDirectoryBundle:Element');
			$qb->field('source')->references($import);
			$qb->field('name')->equals($row['name']);
			$qb->field('geo.latitude')->equals((float) number_format((float)$row['latitude'], 5));
			$qb->field('geo.longitude')->equals((float) number_format((float)$row['longitude'], 5));
			$element = $qb->getQuery()->getSingleResult();
		}

		if ($element) // if element with this Id already exists
		{
			$updatedAtField = $import->getFieldToCheckElementHaveBeenUpdated();
			// if updated date hasn't change, nothing to do
			if ($updatedAtField && array_key_exists($updatedAtField, $row)) {
				if ($row[$updatedAtField] && $row[$updatedAtField] == $element->getCustomProperty($updatedAtField)) {
					$element->setPreventJsonUpdate(true);
					if ($element->getStatus() == ElementStatus::DynamicImportTemp) $element->setStatus(ElementStatus::DynamicImport);
					$this->em->persist($element);
					return "nothing_to_do";
				} else {
					$realUpdate = true;
				}
			}
			$updateExisting = true;
			// resetting "geolocc" and "no options" modearation state so it will be calculated again
			if ($element->getModerationState() < 0) $element->setModerationState(ModerationState::NotNeeded);
		}
		else
		{
			$element = new Element();
		}
		$this->currentRow = $row;

		// adds missings fields instead of checking if each field is set before accessing
		$missingFields = array_diff($this->coreFields, array_keys($row));
    foreach ($missingFields as $missingField) {
      $data[$key][$missingField] = "";
    }

		$element->setOldId($row['id']);
		$element->setName($row['name']);
		$address = new PostalAddress($row['streetAddress'], $row['addressLocality'], $row['postalCode'], $row["addressCountry"]);
		$element->setAddress($address);

		$defaultSourceName = $import ? $import->getSourceName() : 'Inconnu';
		$element->setSourceKey( (strlen($row['source']) > 0 && $row['source'] != 'Inconnu') ? $row['source'] : $defaultSourceName);
		$element->setSource($import);

		if (array_key_exists('owner', $row)) $element->setUserOwnerEmail($row['owner']);

		$lat = $row['latitude']; $lng = $row['longitude'];
		if (is_object($lat) || is_array($lat) || strlen($lat) == 0 || is_object($lng) || strlen($lng) == 0 || $lat == 'null' || $lat == null)
		{
			$lat = 0; $lng = 0;
			if ($import->getGeocodeIfNecessary())
			{
		   	$result = $this->geocoder->geocode($address->getFormatedAddress())->first();
		   	$lat = $result->getLatitude();
		   	$lng = $result->getLongitude();
			}
		}

		if ($lat == 0 || $lng == 0) $element->setModerationState(ModerationState::GeolocError);
		$element->setGeo(new Coordinates((float)$lat, (float)$lng));

		$this->createCategories($element, $row, $import);
		$this->createImages($element, $row);
		$this->saveCustomFields($element, $row);

		if ($import->isDynamicImport()) { // keep the same status for the one who were deleted
			$status = (!$element->getStatus() || $element->getStatus() == ElementStatus::DynamicImportTemp) ? ElementStatus::DynamicImport : $element->getStatus();
			$element->setIsExternal(true);
		}
		else
			$status = ElementStatus::AddedByAdmin;

		// create import contribution if first time imported
		if (!$updateExisting)
		{
			$contribution = $this->interactionService->createContribution(null, 0, $status);
			$element->addContribution($contribution);
      // $this->mailService->sendAutomatedMail('add', $element, $message);
		}
		// create edit contribution if real update
		else if ($realUpdate) {
			$contribution = $this->interactionService->createContribution(null, 1, $status);
			$element->addContribution($contribution);
		}

		$element->setStatus($status);
		$element->updateTimestamp();

		$this->em->persist($element);

		return $updateExisting ? "updated" : "created";
	}

	private function saveCustomFields($element, $raw_data)
	{
		$customFields = array_diff(array_keys($raw_data), $this->coreFields);
		$customFields = array_diff($customFields, ['lat', 'long', 'lon', 'lng', 'title', 'nom', 'categories', 'address']);
		$customData = [];
    foreach ($customFields as $customField) {
			if ($customField && is_string($customField)) $customData[$customField] = $raw_data[$customField];
		}

    $element->setCustomData($customData, $this->privateDataProps);
	}

	private function createImages($element, $row)
	{
		$element->resetImages();
		$images_raw = $row['images'];
		if (is_string($images_raw) && strlen($images_raw) > 0) $images = explode(',', $row['images']);
		else if (is_array($images_raw)) $images = $images_raw;
		else
		{
			$keys = array_keys($row);
			$image_keys = array_filter($keys, function($key) { return $this->startsWith($key, 'image'); });
			$images = array_map(function($key) use ($row) { return $row[$key]; }, $image_keys);
		}

		if (count($images) == 0) return;

		foreach($images as $imageUrl)
		{
			if (is_string($imageUrl) && strlen($imageUrl) > 5)
			{
				$elementImage = new ElementImage();
				$elementImage->setExternalImageUrl($imageUrl);
				$element->addImage($elementImage);
			}
		}
	}

	function startsWith($haystack, $needle)
	{
	  $length = strlen($needle);
	  return (substr($haystack, 0, $length) === $needle);
	}

	private function createCategories($element, $row, $import)
	{
		$element->resetOptionsValues();
		$optionsIdAdded = [];
		$options = $row['categories'];

		$defaultOption = array("index" => 0, "description" => "");
		foreach ($options as $option) {
    	$option = array_merge($defaultOption, $option);
			$this->addOptionValue($element, $option['mappedId'], $option['index'], $option['description']);
		}

		if ($import->getNeedToHaveOptionsOtherThanTheOnesAddedToEachElements()) {
			// checking option number before adding optionIdsToAddToEachElement
			if (count($element->getOptionValues()) == 0) $element->setModerationState(ModerationState::NoOptionProvided);
		}

		// Manually add some options to each element imported
		foreach ($this->optionIdsToAddToEachElement as $optionId) {
			if (!in_array($optionId, $optionsIdAdded)) $optionsIdAdded[] = $this->addOptionValue($element, $optionId);
		}

		if (count($element->getOptionValues()) == 0) $element->setModerationState(ModerationState::NoOptionProvided);
	}

	private function addOptionValue($element, $id, $index = 0, $description = "")
	{
		if (!$id || $id == "0" || $id == 0) return;
		$optionValue = new OptionValue();
		$optionValue->setOptionId($id);
	  $optionValue->setIndex($index);
	  $optionValue->setDescription($description);
	  $element->addOptionValue($optionValue);
	  return $id;
	}
}