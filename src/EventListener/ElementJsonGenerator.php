<?php

namespace App\EventListener;

use App\Document\ElementStatus;
use Doctrine\ODM\MongoDB\DocumentManager;

class ElementJsonGenerator
{
    protected $config = null;
    protected $options = null;

    public function __construct(DocumentManager $dm)
    {
        $this->dm = $dm;
    }

    public function getConfig()
    {
        if (!$this->config) {
            $this->config = $this->dm->get('Configuration')->findConfiguration();
        }

        return $this->config;
    }

    public function getOptions()
    {
        // load all options so we don't need to do a query on each element being modified
        if (!$this->options) {
            $this->options = $this->dm->query('Option')->select('name')->getArray();
        }

        return $this->options;
    }

    public function preFlush(\Doctrine\ODM\MongoDB\Event\PreFlushEventArgs $eventArgs)
    {
        $this->dm = $eventArgs->getDocumentManager();
        $documentManaged = $this->dm->getUnitOfWork()->getIdentityMap();

        if (array_key_exists("App\Document\Element", $documentManaged)) {
            foreach ($documentManaged["App\Document\Element"] as $key => $element) {
                if (!$element->getPreventJsonUpdate() && $element->getStatus() != ElementStatus::ModifiedPendingVersion) {
                    $element->setPreventJsonUpdate(true); // ensure performing serialization only once
                    $element->checkForModerationStillNeeded();

                    // Update Json
                    $this->updateJsonRepresentation($element);
                }
            }
        }
    }

    public function updateJsonRepresentation($element)
    {
        if (!$element->getGeo()) {
            return;
        }
        $config = $this->getConfig($this->dm);
        $options = $this->getOptions($this->dm);
        $privateProps = $config->getApi()->getPublicApiPrivateProperties();

        // -------------------- FULL JSON ----------------

        // BASIC FIELDS
        $baseJson = json_encode($element);
        $baseJson = ltrim($baseJson, '{'); // remove first '{'
        $baseJson = rtrim($baseJson, '}'); // remove last '}'
        if ($element->getAddress()) {
            $baseJson .= ',"address":'.$element->getAddress()->toJson();
        }
        if ($element->getOpenHours()) {
            $baseJson .= ',"openHours": '.$element->getOpenHours()->toJson();
        }

        // CREATED AT, UPDATED AT
        $baseJson .= ',"createdAt":"'.date_format($element->getCreatedAt(), 'd/m/Y à H:i').'"';
        $updatedAt = $element->getUpdatedAt() ? $element->getUpdatedAt() : $element->getCreatedAt();
        $updatedAtFormated = 'integer' == gettype($updatedAt) ? date('d/m/Y à H:i', $updatedAt) : date_format($updatedAt, 'd/m/Y à H:i');
        $baseJson .= ',"updatedAt":"'.$updatedAtFormated.'"';

        // STATUS
        $status = strval($element->getStatus());
        if (!$status || '' == $status || 0 == strlen($status)) {
            $status = '0';
        }
        $baseJson .= ',"status":'.$status;
        if ($element->getModerationState() != 0) {
            $baseJson .= ',"moderationState":'.$element->getModerationState();
        }

        // OPTIONS VALUES (= TAXONOMY)
        $sortedOptionsValues = $element->getSortedOptionsValues();
        $optValuesLength = count($sortedOptionsValues);
        $elementOptions = [];
        $optionsFullJson = [];
        if ($sortedOptionsValues) {
            for ($i = 0; $i < $optValuesLength; ++$i) {
                $optionValue = $sortedOptionsValues[$i];
                if (isset($options[$optionValue->getOptionId()])) {
                    $optionName = $options[$optionValue->getOptionId()];
                    $elementOptions[] = $optionName;
                    $optionsFullJson[] = $sortedOptionsValues[$i]->toJson(json_encode($optionName));
                } else {
                    $element->removeOptionValue($sortedOptionsValues[$i]);
                }
            }
        }
        $baseJson .= ',"categories": ' . json_encode($elementOptions) . ',';
        $element->setOptionsString(implode(',', $elementOptions)); // we also update optionsString attribute which is used in exporting from element admin list
        // Options values with description
        if (count($optionsFullJson)) {
            $baseJson .= '"categoriesFull": ['.implode(',', $optionsFullJson).'],';
        }

        // CUSTOM DATA
        $customPrivateData = '';
        if ($element->getData()) {
            foreach ($element->getData() as $key => $value) {
                $propJson = '"'.$key.'": '.json_encode($value).',';
                if (in_array($key, $privateProps)) $customPrivateData .= $propJson;
                else $baseJson .= $propJson;
            }
        }

        // SPECIFIC DATA
        $baseJson .= $this->encodeArrayObjectToJson('stamps', $element->getStamps());
        $imagesJson = $this->encodeArrayObjectToJson('images', $element->getImages());
        $filesJson = $this->encodeArrayObjectToJson('files', $element->getFiles());
        if (in_array('images', $privateProps)) $customPrivateData .= $imagesJson;
        else $baseJson .= $imagesJson;
        if (in_array('files', $privateProps)) $customPrivateData .= $filesJson;
        else $baseJson .= $filesJson;
        if (in_array('email', $privateProps) && $element->getEmail()) {
            $email = $element->isPending() ? $element->getEmail() : "private";
            $baseJson .= '"email":"'.$email.'",'; // indicate that the email exist, so can show the "send email" button
        }
        $baseJson = rtrim($baseJson, ',');

        // MODIFIED ELEMENT (for pending modification)
        if ($element->isPendingModification() && $element->getModifiedElement()) {
            $this->updateJsonRepresentation($element->getModifiedElement());
            $baseJson .= ', "modifiedElement": '.$element->getModifiedElement()->getJson(false);
        }
        $element->setBaseJson($baseJson);

        // ---------------- ADMIN JSON = REPORTS & CONTRIBUTIONS & PRIVATE DATA ---------------------
        $adminJson = '';
        if (ElementStatus::ModifiedPendingVersion != $element->getStatus()) {
            $adminJson .= $this->encodeArrayObjectToJson('reports', $element->getUnresolvedReports());
            $adminJson .= $this->encodeArrayObjectToJson('contributions', $element->getContributionsAndResolvedReports());
            if ($element->isPending()) {
                $adminJson .= $this->encodeArrayObjectToJson('votes', $element->getVotesArray());
                if ($element->getCurrContribution()) {
                    $adminJson .= '"pendingContribution":'.$element->getCurrContribution()->toJson() . ',';
                }
            }            
        }
        // CUSTOM PRIVATE DATA
        $adminJson .= $customPrivateData;
        $adminJson = rtrim($adminJson, ',');
        $element->setAdminJson($adminJson);

        // -------------------- COMPACT JSON ----------------
        // [id, customData, latitude, longitude, status, moderationState]
        $compactFields = $config->getCompactFields();
        $compactData = [];
        foreach ($compactFields as $field) {
            $compactData[] = $element->getProperty($field);
        }

        $compactJson = '["'.$element->id.'",'.json_encode($compactData).',';
        $compactJson .= $element->getGeo()->getLatitude().','.$element->getGeo()->getLongitude().', [';
        if ($sortedOptionsValues) {
            for ($i = 0; $i < $optValuesLength; ++$i) {
                $value = $sortedOptionsValues[$i];
                $compactJson .= $value->getOptionId();
                $compactJson .= ',';
            }
            $compactJson = rtrim($compactJson, ',');
        }
        $compactJson .= ']';
        if ($element->getStatus() <= 0 || 0 != $element->getModerationState()) {
            $compactJson .= ','.$status;
        }
        if (0 != $element->getModerationState()) {
            $compactJson .= ','.$element->getModerationState();
        }
        $compactJson .= ']';
        $element->setCompactJson($compactJson);
    }

    private function encodeArrayObjectToJson($propertyName, $array)
    {
        if (!$array) {
            return '';
        }
        $array = is_array($array) ? $array : $array->toArray();
        if (0 == count($array)) {
            return '';
        }
        $result = '"'.$propertyName.'": [';
        foreach ($array as $key => $value) {
            $result .= $value->toJson();
            $result .= ',';
        }
        $result = rtrim($result, ',');
        $result .= '],';

        return $result;
    }
}
