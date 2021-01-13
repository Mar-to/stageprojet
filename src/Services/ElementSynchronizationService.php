<?php

namespace App\Services;

use App\Document\UserInteractionContribution;
use GuzzleHttp\Promise\Promise;
use GuzzleHttp\Client;

class ElementSynchronizationService
{
    /* 
        Dispatch the contribution on the original database 
        Log in into OSM
        Commit the change...
    */
    public function asyncDispatch(UserInteractionContribution $contribution, $preparedData) : Promise
    {
        // Should return a Promise, maybe the OSM api can be reached with a final asyncRequest with GuzzleHttp
        $client = new Client();
        return $client->postAsync('api.osm.fr');
        // Or return a custom promise if you are using the PHP library
        return new Promise();
    }
    
    public function elementToOsm($element)
    {
        $osmFeature = [];

        // Get original mappings
        $ontology = $element->getSource()->getOntologyMapping();
        $taxonomy = $element->getSource()->getTaxonomyMapping();

        // Coordinates
        $osmFeature['center']['latitude'] = $element->getGeo()->getLatitude();
        $osmFeature['center']['longitude'] = $element->getGeo()->getLongitude();

        // Categories
        foreach($taxonomy as $taxonomyKey => $taxonomyValue) {
            foreach($ontology as $ontologyKey => $ontologyValue) {
                $ontologySubkeys = explode("/", $ontologyKey);
                $ontologyTrueKey = array_pop($ontologySubkeys);
                if($ontologyTrueKey == $taxonomyValue['fieldName']) {
                    $this->setNestedArrayValue($osmFeature, $ontologyKey, $taxonomyKey, "/");
                }
            }
        }

        // Core fields
        $myCoreFields = array_diff($element::CORE_FIELDS, ['latitude', 'longitude', 'categories']);
        foreach($myCoreFields as $field) {
            $elemValue = $element->getProperty($field);
            if(isset($elemValue)) {
                // Ontology
                foreach($ontology as $ontologyKey => $ontologyValue) {
                    if($ontologyValue['mappedProperty'] == $field) {
                        $this->setNestedArrayValue($osmFeature, $ontologyKey, $elemValue, "/");
                        break;
                    }
                }
            }
        }

        // Custom data
        foreach($element->getData() as $elemKey => $elemValue) {
            foreach($ontology as $ontologyKey => $ontologyValue) {
                if($ontologyValue['mappedProperty'] == $elemKey) {
                    $this->setNestedArrayValue($osmFeature, $ontologyKey, $elemValue, "/");
                    break;
                }
            }
        }

        return $osmFeature;
    }

    /**
     * Sets a value in a nested array based on path
     * @param array $array The array to modify
     * @param string $path The path in the array
     * @param mixed $value The value to set
     * @param string $delimiter The separator for the path
     * @return The previous value
     */
    private function setNestedArrayValue(&$array, $path, &$value, $delimiter = '/') {
        $pathParts = explode($delimiter, $path);

        $current = &$array;
        foreach($pathParts as $key) {
            $current = &$current[$key];
        }

        $backup = $current;
        $current = $value;

        return $backup;
    }
}
