<?php

namespace Biopen\GeoDirectoryBundle\EventListener;

use Biopen\GeoDirectoryBundle\Document\Element;
use Biopen\GeoDirectoryBundle\Document\ModerationState;
use Biopen\GeoDirectoryBundle\Document\ElementStatus;

class ElementJsonGenerator
{
  protected $currElementChangeset;
  protected $config = null;

  public function getConfig($dm) 
  {
    if (!$this->config) $this->config = $dm->getRepository('BiopenCoreBundle:Configuration')->findConfiguration();
    return $this->config;
  }

  public function preFlush(\Doctrine\ODM\MongoDB\Event\PreFlushEventArgs $eventArgs)
  {  
    $dm = $eventArgs->getDocumentManager();
    $documentManaged = $dm->getUnitOfWork()->getIdentityMap();  

    if (array_key_exists("Biopen\GeoDirectoryBundle\Document\Element", $documentManaged)) 
    {   
      // dump("on pre flush, number of doc managed" . count($documentManaged["Biopen\GeoDirectoryBundle\Document\Element"]));
      // $uow = $dm->getUnitOfWork();
      // $uow->computeChangeSets();

      foreach ($documentManaged["Biopen\GeoDirectoryBundle\Document\Element"] as $key => $element) 
      {      
        if (!$element->getPreventJsonUpdate()) {
          $element->setPreventJsonUpdate(true); // ensure perofming serialization only once
          $element->checkForModerationStillNeeded();

          // if we want to update only some specific part of the Json object, user currElementChangeset and below method attrChanged
          // $this->currElementChangeset = array_keys($uow->getDocumentChangeSet($element)); 
          $this->updateJsonRepresentation($element, $dm); 
        }        
      }
    }
  }

  public function updateJsonRepresentation($element, $dm)
  {
    if (!$element->getGeo()) { return; }
    $config = $this->getConfig($dm);

    // -------------------- FULL JSON ----------------
    
    // BASIC FIELDS
    $baseJson = json_encode($element);
    $baseJson = substr($baseJson , 0, -1); // remove last '}'
    if ($element->getAddress())   $baseJson .= ', "address":'    . $element->getAddress()->toJson();         
    if ($element->getOpenHours()) $baseJson .= ', "openHours": ' . $element->getOpenHours()->toJson(); 
    
    // CREATED AT, UPDATED AT
    $baseJson .= ', "createdAt":"'    . date_format($element->getCreatedAt(),"d/m/Y à H:i") . '"';
    $updatedAt = $element->getUpdatedAt() ? $element->getUpdatedAt() : $element->getCreatedAt();
    $updatedAtFormated = gettype($updatedAt) == "integer" ? date("d/m/Y à H:i", $updatedAt) : date_format($updatedAt,"d/m/Y à H:i");
    $baseJson .= ', "updatedAt":"'    . $updatedAtFormated . '"';

    // OPTIONS VALUES (= TAXONOMY)
    $sortedOptionsValues = $element->getSortedOptionsValues();
    $optValuesLength = count($sortedOptionsValues);
    // Options values ids
    $baseJson .= ', "categories": [';
    if ($sortedOptionsValues)
    {            
        for ($i=0; $i < $optValuesLength; $i++) { 
            $baseJson .= $sortedOptionsValues[$i]->getOptionId() . ',';
        }
    }
    $baseJson = rtrim($baseJson, ',');
    $baseJson .= '],';
    // Options values with descriptionO      
    $optionDescriptionsJson = [];
    if ($sortedOptionsValues)
    {            
        for ($i=0; $i < $optValuesLength; $i++) {
            if ($sortedOptionsValues[$i]->getDescription()) $optionDescriptionsJson[] =  $sortedOptionsValues[$i]->toJson();
        }
    }
    if (count($optionDescriptionsJson)) $baseJson .= '"categoriesDescriptions": [' . implode(",", $optionDescriptionsJson) . '],';

    // CUSTOM DATA
    if ($element->getData())
        foreach ($element->getData() as $key => $value) {
            $baseJson .= '"'. $key .'": ' . json_encode($value) . ',';
        }
    
    // SPECIFIC DATA
    $baseJson .= $this->encodeArrayObjectToJson("stamps", $element->getStamps());
    $baseJson .= $this->encodeArrayObjectToJson("images", $element->getImages());
    $baseJson = rtrim($baseJson, ',');         

    // MODIFIED ELEMENT (for pending modification)
    if ($element->getModifiedElement()) {
        $baseJson .= ', "modifiedElement": ' . $element->getModifiedElement()->getJson(true, false);
    }
    $baseJson .= '}';

    $element->setBaseJson($baseJson);


    // -------------------- PRIVATE JSON -------------------------
    $privateJson = '{';        
    // status
    $privateJson .= '"status": ' . $element->getStatus() . ',';
    $privateJson .= '"moderationState": ' . $element->getModerationState() . ',';
    // CUSTOM PRIVATE DATA
    foreach ($element->getPrivateData() as $key => $value) {
        $privateJson .= '"'. $key .'": ' . json_encode($value) . ',';
    }
    $privateJson = rtrim($privateJson, ',');
    $privateJson .= '}';
    $element->setPrivateJson($privateJson);


    // ---------------- ADMIN JSON = REPORTS & CONTRIBUTIONS ---------------------
    $adminJson = '{';
    if ($element->getStatus() != ElementStatus::ModifiedPendingVersion)
    {
        $adminJson .= $this->encodeArrayObjectToJson('reports', $element->getUnresolvedReports());
        $adminJson .= $this->encodeArrayObjectToJson('contributions', $element->getContributionsAndResolvedReports());
        if ($element->isPending()) {
            $adminJson .= $this->encodeArrayObjectToJson('votes', $element->getVotesArray());
            if ($element->getCurrContribution()) $adminJson .= '"pendingContribution":' . $element->getCurrContribution()->toJson();
        }
        $adminJson = rtrim($adminJson, ',');
    }
    $adminJson .= '}';
    $element->setAdminJson($adminJson);

    // -------------------- COMPACT JSON ----------------
    // [id, customData, latitude, longitude, status, moderationState]
    $compactFields = $this->getConfig($dm)->getMarker()->getFieldsUsedByTemplate();
    $compactData = [];
    foreach ($compactFields as $field) $compactData[] = $element->getProperty($field);
    dump($compactFields);
    dump($compactData);
    dump(json_encode($compactData));

    $compactJson = '["'.$element->id . '",' . json_encode($compactData) . ',';
    $compactJson.= $element->getGeo()->getLatitude() .','. $element->getGeo()->getLongitude() .', [';
    if ($sortedOptionsValues)
    {
        for ($i=0; $i < $optValuesLength; $i++) { 
            $value = $sortedOptionsValues[$i];
            $compactJson .= $value->getOptionId();
            $compactJson .= ',';
        }
        $compactJson = rtrim($compactJson, ',');
    }
    $compactJson .= ']';
    if ($element->getStatus() <= 0 || $element->getModerationState() != 0) $compactJson .= ','. $element->getStatus();
    if ($element->getModerationState() != 0) $compactJson .= ','. $element->getModerationState();
    $compactJson .= ']';
    dump($compactJson);
    $element->setCompactJson($compactJson);
  }

  // private function attrChanged($attrs)
  // {
  //   if (!$this->currElementChangeset) return true;
  //   foreach ($attrs as $attr) {
  //       if (in_array($attr, $this->currElementChangeset)) return true;
  //   }
  //   return false;
  // }

  private function encodeArrayObjectToJson($propertyName, $array)
  {
    if (!$array) return "";
    $array = is_array($array) ? $array : $array->toArray();
    if (count($array) == 0) return '';
    $result = '"'. $propertyName .'": [';
    foreach ($array as $key => $value) {
        $result .= $value->toJson();
        $result .= ',';
    }
    $result = rtrim($result, ',');
    $result .= '],';
    return $result;
  }
}