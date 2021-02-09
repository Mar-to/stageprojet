<?php

namespace App\Services;

use App\Document\Element;
use App\Document\Import;
use App\Document\UserInteractionContribution;
use GuzzleHttp\Promise\Promise;
use Services_OpenStreetMap;
use GuzzleHttp\Psr7\Response;
use Doctrine\ODM\MongoDB\DocumentManager;
use App\Document\GoGoLog;
use App\Document\GoGoLogLevel;

class ElementSynchronizationService
{
    protected $config;

    const MAIN_OSM_KEYS = ['highway', 'natural', 'landuse', 'power', 'waterway', 'amenity', 'barrier', 'place', 'leisure', 'railway', 'shop', 'man_made', 'public_transport', 'tourism', 'boundary', 'emergency', 'historic', 'type', 'traffic_sign', 'office', 'traffic_calming', 'aeroway', 'healthcare', 'aerialway', 'craft', 'geological', 'military', 'telecom'];
    const MAIN_OSM_KEYS_FALLBACK = ['addr:housenumber', 'entrance', 'information', 'indoor', 'building']; // To check only if no main OSM tags has been found, as they can be used as descriptive tags and not only main tags
    const EARTH_RADIUS = 6378;
    const OSM_SEARCH_RADIUS_METERS = 20;

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
                $osm = $this->getOsmApiHandler();

                $element = $contribution->getElement();
                $osmFeature = $this->elementToOsm($element);

                // Check contribution validity according to OSM criterias
                if($this->allowOsmUpload($contribution, $preparedData)) {
                    $toAdd = null;

                    // Process contribution
                    // New feature
                    if($preparedData['action'] == 'add') {
                        $toAdd = $osm->createNode($osmFeature['center']['latitude'], $osmFeature['center']['longitude'], $osmFeature['tags']);
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
                        $changeset->setTag('host', $this->urlService->generateUrl());
                        $changeset->setTag('created_by:library', 'GoGoCarto');
                        $changeset->setTag('created_by', $this->getConfig()->getAppName());
                        $changeset->begin($this->getOsmComment($preparedData));

                        // Add edited feature to changeset
                        $changeset->add($toAdd);

                        // Close changeset
                        try {
                            $changeset->commit();

                            // Update version in case of feature edit
                            $toUpdateInDb = null;

                            if($preparedData['action'] == 'add') {
                                $toUpdateInDb = $osm->getNode($toAdd->getId());
                            }
                            else if($preparedData['action'] == 'edit') {
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
                            }

                            if($toUpdateInDb) {
                                if($preparedData['action'] == 'add') {
                                    $element->setCustomProperty('osm/type', 'node');
                                    $element->setOldId($toUpdateInDb->getId());
                                }
                                $element->setCustomProperty('osm/version', $toUpdateInDb->getVersion());
                                $element->setCustomProperty('osm/timestamp', strval($toUpdateInDb->getAttributes()->timestamp));
                                $this->dm->persist($element);
                                $this->dm->flush();
                            }

                            return $promise->resolve(new Response(200, [], null, '1.1', 'Success'));
                        }
                        catch(\Exception $e) {
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
            catch(\Exception $e) {
                return $promise->resolve(new Response(500, [], null, '1.1', $e->getMessage()));
            }
        });

        return $promise;
    }

    /**
     * Convert an element into a JSON-like OSM feature
     */
    public function elementToOsm(Element $element)
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

        // Other data
        $osmFeature['osmId'] = $element->getProperty('oldId');
        if($element->getOpenHours()) {
            $h = $element->getOpenHours()->toOsm();
            if(strlen($h) > 0) {
                $osmFeatures['tags']['opening_hours'] = $h;
            }
        }

        return $osmFeature;
    }

    /**
     * When adding an element in GoGoCarto, we should consider if this element
     * might be added to OSM as well. If it should, then we detect duplicate on OSM
     * before adding it
     *
     * @param Element $element
     * @return void
     */
    public function checkIfNewElementShouldBeAddedToOsm(Element $element)
    {
        if ($this->linkElementToExistingOsmImport($element)) {
            // Get element in OSM format
            $osmFeature = $this->elementToOsm($element);

            // List tags to use for potential duplicates search
            $osmFeaturesMainTags = array_filter(
                $osmFeature['tags'],
                function($key) {
                    return in_array($key, ElementSynchronizationService::MAIN_OSM_KEYS);
                },
                ARRAY_FILTER_USE_KEY
            );

            if(count($osmFeaturesMainTags) == 0) {
                $osmFeaturesMainTags = array_filter(
                    $osmFeature['tags'],
                    function($key) {
                        return in_array($key, ElementSynchronizationService::MAIN_OSM_KEYS_FALLBACK);
                    },
                    ARRAY_FILTER_USE_KEY
                );
            }

            // If can't find main tags, do not send to OSM, feature might be broken
            if(count($osmFeaturesMainTags) == 0) {
                $log = new GoGoLog(GoGoLogLevel::Info, 'L\'objet n\'a pas de clé principale pour OSM');
                $this->dm->persist($log);
                $this->dm->flush();
                return ['result' => false, 'duplicates' => []];
            }
            // Otherwise, start looking for duplicates
            else {
                $duplicates = [];

                // Compute bounding box to retrieve
                $radiusKm = ElementSynchronizationService::OSM_SEARCH_RADIUS_METERS / 1000;
                $north = $osmFeature['center']['latitude'] + ($radiusKm / ElementSynchronizationService::EARTH_RADIUS) * (180 / M_PI);
                $east = $osmFeature['center']['longitude'] + ($radiusKm / ElementSynchronizationService::EARTH_RADIUS) * (180 / M_PI) / cos($osmFeature['center']['latitude'] * M_PI / 180);
                $south = $osmFeature['center']['latitude'] - ($radiusKm / ElementSynchronizationService::EARTH_RADIUS) * (180 / M_PI);
                $west = $osmFeature['center']['longitude'] - ($radiusKm / ElementSynchronizationService::EARTH_RADIUS) * (180 / M_PI) / cos($osmFeature['center']['latitude'] * M_PI / 180);

                // Load data from OSM editing API
                $osm = $this->getOsmApiHandler();
                $osm->get($west, $south, $east, $north);
                $potentialDuplicates = $osm->search($osmFeaturesMainTags);

                // Transform found potential duplicates into GogoCarto format$
                foreach($potentialDuplicates as $dup) {
                    $dupOsmId = $dup->getType().'/'.$dup->getId();
                    array_push($duplicates, [
                        'name' => $dup->getTag('name') ?? $dup->getTag('brand') ?? $dup->getTag('operator') ?? $dup->getTag('owner') ?? $dup->getTag('ref') ?? $dupOsmId,
                        'osmId' => $dupOsmId,
                        'description' => 'Attributs : '.$this->osmTagsToString($dup->getTags()),
                        'address' => [
                            'streetAddress' => implode(' ', array_filter([$dup->getTag('addr:housenumber'), $dup->getTag('addr:street')])),
                            'postalCode' => $dup->getTag('addr:postcode'),
                            'addressLocality' => $dup->getTag('addr:city')
                        ]
                    ]);
                }

                return ['result' => true, 'duplicates' => $duplicates];
            }

        } else {
            return ['result' => false, 'duplicates' => []];
        }
    }

    /**
     * When adding an element that should be linked to OSM, if we detect some
     * duplicates on OSM we show them to the user. If the user click "yes this is a duplicate"
     * of an OSM point, then instead of adding a new point to OSM, we should update the existing
     * OSM point with the new data.
     *
     * @param Element $element The new element being added to GoGoCarto
     * @param integer $odmId ID of the duplicate on OSM
     * @return void
     */
    public function updateOsmDuplicateWithNewElementData($osmId, Element $element)
    {
        // Init OSM API handler
        $osm = $this->getOsmApiHandler();
        $osmFeature = $this->elementToOsm($element);
        $existingFeature = null;
        $osmIdParts = explode('/', $osmId);

        switch($osmIdParts[0]) {
            case 'node':
                $existingFeature = $osm->getNode($osmIdParts[1]);
                break;
            case 'way':
                $existingFeature = $osm->getWay($osmIdParts[1]);
                break;
            case 'relation':
                $existingFeature = $osm->getRelation($osmIdParts[1]);
                break;
        }

        if($existingFeature) {
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
            if($osmIdParts[0] == 'node' && (!$existingFeature->getWays()->valid() || $existingFeature->getWays()->count() == 0)) {
                if($osmFeature['center']['latitude'] != $existingFeature->getLat()) {
                    $existingFeature->setLat($osmFeature['center']['latitude']);
                }

                if($osmFeature['center']['longitude'] != $existingFeature->getLon()) {
                    $existingFeature->setLon($osmFeature['center']['longitude']);
                }
            }

            // Create changeset
            $changeset = $osm->createChangeset();
            $changeset->setId(-1); // To prevent bug with setTag
            $changeset->setTag('host', $this->urlService->generateUrl());
            $changeset->setTag('created_by:library', 'GoGoCarto');
            $changeset->setTag('created_by', $this->getConfig()->getAppName());
            $changeset->begin('Mise à jour attributs '.($existingFeature->getTag('name') ?? $existingFeature->getTag('brand') ?? $existingFeature->getTag('operator') ?? $osmId));

            // Add edited feature to changeset
            $changeset->add($existingFeature);

            // Close changeset
            try {
                $changeset->commit();

                // Update version in case of feature edit
                $toUpdateInDb = null;
                switch($osmIdParts[0]) {
                    case 'node':
                        $toUpdateInDb = $osm->getNode($osmIdParts[1]);
                        break;
                    case 'way':
                        $toUpdateInDb = $osm->getWay($osmIdParts[1]);
                        break;
                    case 'relation':
                        $toUpdateInDb = $osm->getRelation($osmIdParts[1]);
                        break;
                }

                if($toUpdateInDb) {
                    $element->setCustomProperty('osm/version', $toUpdateInDb->getVersion());
                    $element->setCustomProperty('osm/timestamp', strval($toUpdateInDb->getAttributes()->timestamp));
                    $this->dm->persist($element);
                    $this->dm->flush();
                }
            }
            catch(\Exception $e) {
                $message = 'Error when sending changeset';
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

    /**
     * Check if an element have at least one categorie which is used in an OSM import
     * that is synchronized. In this case the new element will be linked to this import
     *
     * @param Element $element
     * @return Import
     */
    private function linkElementToExistingOsmImport(Element $element)
    {
        $elementOptionsIds = $element->getOptionIds();
        $osmImports = $this->dm->get('Import')->findBy(['sourceType' => 'osm', 'isSynchronized' => true]);
        $linkedImport = null;

        foreach($osmImports as $import) {
            foreach($import->getOptionsToAddToEachElement() as $option) {
                if (in_array($option->getId(), $elementOptionsIds)) {
                    $linkedImport = $import;
                    break;
                }
            }
            foreach($import->getTaxonomyMapping() as $mappedObject) {
                if (array_intersect($mappedObject['mappedCategoryIds'], $elementOptionsIds)) {
                    $linkedImport = $import;
                    break;
                }
            }
        }
        if ($linkedImport) {
            $element->setSource($linkedImport);
        }
        return $linkedImport;
    }

    /*
     * Get a ready-to-use version of OSM API handler (with account/server defined)
     */
    private function getOsmApiHandler()
    {
        $configOsm = $this->getConfig()->getOsm();
        return new Services_OpenStreetMap([
            'server' => $this->getOsmServer(),
            'user' => $configOsm->getOsmUsername(),
            'password' => $configOsm->getOsmPassword(),
            'User-Agent' => $this->getConfig()->getAppName(),
            'verbose' => true
        ]);
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
     * Transform a list of OSM tags object into a human-readable string
     */
    private function osmTagsToString($tags) {
        $str = '';

        foreach($tags as $k => $v) {
            if(strlen($str) > 0) { $str .= ', '; }
            $str .= $k.' = '.$v;
        }

        return $str;
    }

    /**
     * Should this contribution be sent to OSM ?
     */
    private function allowOsmUpload($contribution, $preparedData) {
        return $contribution->hasBeenAccepted()
            && ($preparedData['action'] == 'edit' || $preparedData['action'] == 'add');
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
