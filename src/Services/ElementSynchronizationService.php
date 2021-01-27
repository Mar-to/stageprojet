<?php

namespace App\Services;

use App\Document\Configuration;
use App\Document\UserInteractionContribution;
use GuzzleHttp\Client;
use GuzzleHttp\Promise\Promise;
use Services_OpenStreetMap;
use GuzzleHttp\Psr7\Response;
use Doctrine\ODM\MongoDB\DocumentManager;
use App\Document\GoGoLog;
use App\Document\GoGoLogLevel;

class ElementSynchronizationService
{
    protected $config;
    
    public function __construct(DocumentManager $dm, UrlService $urlService)
    {
        $this->dm = $dm;
        $this->urlService = $urlService;
    }

    public function getConfig()
    {
        if (!$this->config) $this->config = $this->dm->get('Configuration')->findConfiguration();
        return $this->config;
    }

    /*
        Dispatch the contribution on the original database
        Log in into OSM
        Commit the change...
    */
    public function asyncDispatch(UserInteractionContribution $contribution, $preparedData) : Promise
    {
        // Wrap the whole function into a promise to make it asynchronous
        $promise = new Promise(function () use (&$promise, &$contribution, &$preparedData) {
            try {
                // Init OSM API handler
                $configOsm = $this->getConfig()->getOsm();
                $osm = new Services_OpenStreetMap([
                    'server' => $this->getOsmServer(),
                    'user' => $configOsm->getOsmUsername(),
                    'password' => $configOsm->getOsmPassword(),
                    'User-Agent' => $this->getConfig()->getAppName(),
                    'verbose' => true
                ]);

                $element = $contribution->getElement();
                $osmFeature = $this->elementToOsm($element);

                // Get URL of current map
                $url = $this->urlService->generateUrl();

                // Check contribution validity according to OSM criterias
                if($this->allowOsmUpload($contribution, $preparedData)) {
                    $toAdd = null;

                    // Process contribution
                    // New feature
                    if($preparedData['action'] == 'add') {
                        if($element->getProperty('osm/type') == 'node') {
                            $toAdd = $osm->createNode($osmFeature['center']['latitude'], $osmFeature['center']['longitude'], $osmFeature['tags']);
                        }
                    }
                    // Edit existing feature
                    else if($preparedData['action'] == 'edit') {
                        $existingFeature = null;

                        switch($element->getProperty('osm/type')) {
                            case 'node':
                                $existingFeature = $osm->getNode($osmFeature['osmId']);
                                break;
                            case 'way':
                                $existingFeature = $osm->getWay($osmFeature['osmId']);
                                break;
                            case 'relation':
                                $existingFeature = $osm->getRelation($osmFeature['osmId']);
                                break;
                        }

                        if($existingFeature) {
                            // Check version number (to make sure Gogocarto version is the latest)
                            if($existingFeature->getVersion() == intval($osmFeature['version'])) {
                                // Edit tags
                                foreach($osmFeature['tags'] as $k => $v) {
                                    if($v == null || $v == '') {
                                        $existingFeature->removeTag($k);
                                    }
                                    else {
                                        $existingFeature->setTag($k, $v);
                                    }
                                }

                                // If node coordinates are edited, check if it is detached
                                if($element->getProperty('osm/type') == 'node' && (!$existingFeature->getWays()->valid() || $existingFeature->getWays()->count() == 0)) {
                                    if($osmFeature['center']['latitude'] != $existingFeature->getLat()) {
                                        $existingFeature->setLat($osmFeature['center']['latitude']);
                                    }

                                    if($osmFeature['center']['longitude'] != $existingFeature->getLon()) {
                                        $existingFeature->setLon($osmFeature['center']['longitude']);
                                    }
                                }

                                $toAdd = $existingFeature;
                            }
                            else {
                                $message = 'Feature versions mismatch: '.$osmFeature['version'].' on our side, '.$existingFeature->getVersion().' on OSM';
                                $log = new GoGoLog(GoGoLogLevel::Error, 'Error during OSM sync : '.$message);
                                $this->dm->persist($log);
                                $this->dm->flush();
                                return $promise->resolve(new Response(500, [], null, '1.1', $message));
                            }
                        }
                        else {
                            $message = 'Feature does not exist on OSM';
                            $log = new GoGoLog(GoGoLogLevel::Error, 'Error during OSM sync : '.$message);
                            $this->dm->persist($log);
                            $this->dm->flush();
                            return $promise->resolve(new Response(500, [], null, '1.1', $message));
                        }
                    }

                    // Create changeset and upload changes
                    if(isset($toAdd)) {
                        $changeset = $osm->createChangeset();
                        $changeset->setId(-1); // To prevent bug with setTag
                        $changeset->setTag('host', $url);
                        $changeset->setTag('gogocarto:user', $contribution->getUserDisplayName());
                        $changeset->setTag('created_by:library', 'GoGoCarto');
                        $changeset->setTag('created_by', $this->getConfig()->getAppName());
                        $changeset->begin($this->getOsmComment($preparedData));

                        // Add edited feature to changeset
                        $changeset->add($toAdd);

                        // Close changeset
                        try {
                            $changeset->commit();

                            // Update version in case of feature edit
                            if($preparedData['action'] == 'edit') {
                                $toUpdateInDb = null;
                                switch($element->getProperty('osm/type')) {
                                    case 'node':
                                        $toUpdateInDb = $osm->getNode($osmFeature['osmId']);
                                        break;
                                    case 'way':
                                        $toUpdateInDb = $osm->getWay($osmFeature['osmId']);
                                        break;
                                    case 'relation':
                                        $toUpdateInDb = $osm->getRelation($osmFeature['osmId']);
                                        break;
                                }

                                if($toUpdateInDb) {
                                    $element->setCustomProperty('osm/version', $toUpdateInDb->getVersion());
                                    $element->setCustomProperty('osm/timestamp', strval($toUpdateInDb->getAttributes()->timestamp));
                                    $this->dm->persist($element);
                                    $this->dm->flush();
                                }
                            }

                            return $promise->resolve(new Response(200, [], null, '1.1', 'Success'));
                        }
                        catch(Exception $e) {
                            $message = 'Error when sending changeset';
                            $log = new GoGoLog(GoGoLogLevel::Error, 'Error during OSM sync : '.$message);
                            $this->dm->persist($log);
                            $this->dm->flush();
                            return $promise->resolve(new Response(500, [], null, '1.1', $message));
                        }
                    }
                }
                // If we don't send edit to OSM, just resolve promise
                else {
                    $message = 'Skipped sending OSM feature';
                    $log = new GoGoLog(GoGoLogLevel::Info, $message);
                    $this->dm->persist($log);
                    $this->dm->flush();
                    return $promise->resolve(new Response(200, [], null, '1.1', $message));
                }
            }
            catch(Exception $e) {
                return $promise->resolve(new Response(500, [], null, '1.1', $e->getMessage()));
            }
        });

        return $promise;
    }

    /**
     * Convert an element into a JSON-like OSM feature
     */
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

        $osmFeature['osmId'] = $element->getProperty('oldId');

        return $osmFeature;
    }

    /**
     * Get OSM server URL, cleaned
     */
    private function getOsmServer() {
        $url = $this->getConfig()->getOsm()->getOsmHost();
        if(isset($url)) {
            if(!str_starts_with($url, "http://") && !str_starts_with($url, "https://")) {
                $url = "https://" + $url;
            }

            if(!str_ends_with($url, "/")) {
                $url .= "/";
            }
        }
        return $url;
    }

    /**
     * Generate comment for OSM changeset
     */
    private function getOsmComment($preparedData) {
        $actionsLabels = ['add' => 'Ajout', 'edit' => 'Modification', 'delete' => 'Suppression'];
        $category = isset($preparedData['data']) && isset($preparedData['data']['categories']) && count($preparedData['data']['categories']) > 0 ? $preparedData['data']['categories'][0] : 'objet';
        $name = isset($preparedData['data']) && isset($preparedData['data']['name']) ? $preparedData['data']['name'] : null;

        return implode(" ", array_filter([$actionsLabels[$preparedData['action']], $category, $name], function($k) { return $k !== null; }));
    }

    /**
     * Should this contribution be sent to OSM ?
     */
    private function allowOsmUpload($contribution, $preparedData) {
        return $contribution->hasBeenAccepted()
            && $preparedData['action'] != 'delete'
            && ($preparedData['action'] == 'edit' || ($preparedData['action'] == 'add' && $contribution->getElement()->getProperty('osm/type') == 'node'));
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
