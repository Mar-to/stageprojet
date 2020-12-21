<?php

namespace App\Services;

use App\Document\Category;
use App\Document\Option;
use Doctrine\ODM\MongoDB\DocumentManager;

class ElementImportMappingService
{
    protected $import;
    protected $createMissingOptions;
    protected $parentCategoryIdToCreateMissingOptions;
    protected $dm;
    protected $ontologyMapping;
    protected $collectedProps;
    protected $existingProps;
    protected $coreFields = ['id', 'name', 'categories', 'streetAddress', 'addressLocality', 'postalCode', 'addressCountry', 'latitude', 'longitude', 'images', 'files', 'owner', 'source', 'openHours', 'email'];
    protected $mappedCoreFields = [
        'title' => 'name', 'nom' => 'name', 'titre' => 'name',
        'mail' => 'email',
        'taxonomy' => 'categories',
        'address' => 'streetAddress', 'addr:street' => 'streetAddress',
        'city' => 'addressLocality', 'addr:city' => 'addressLocality',
        'postcode' => 'postalCode', 'addr:postcode' => 'postalCode',
        'country' => 'addressCountry', 'addr:country' => 'addressCountry',
        'lat' => 'latitude',
        'long' => 'longitude', 'lng' => 'longitude', 'lon' => 'longitude',
    ];

    public function __construct(DocumentManager $dm)
    {
        $this->dm = $dm;
        $this->mappingTableIds = [];
    }

    public function transform($data, $import)
    {
        $this->import = $import;
        $this->createMissingOptions = $import->getCreateMissingOptions();
        // $parent = $import->getParentCategoryToCreateOptions() ?: $this->dm->getRepository('App\Document\Category')->findOneByIsRootCategory(true);
        $this->parentCategoryIdToCreateMissingOptions = null; //$parent ? $parent->getId() : null;

        // Execute custom code (the <?php is used to have proper code highliting in text editor, we remove it before executing)
        eval(str_replace('<?php', '', $import->getCustomCode()));
        if (null == $data || !is_array($data)) {
            return [];
        }

        // elements is ofently stored nested in some attribute
        if (array_key_exists('data', $data) && is_array($data['data'])) {
            $data = $data['data'];
        }
        if (array_key_exists('elements', $data) && is_array($data['elements'])) {
            $data = $data['elements'];
        }
        if (array_key_exists('features', $data) && is_array($data['features'])) {
            $data = $data['features'];
        }

        // Fixs known ontology when importing
        foreach ($data as $key => $row) {
            if (is_array($row)) {
                // GOGOCARTO ONTOLGY
                if (isset($row['geo']) && isset($row['geo']['latitude']) && isset($row['geo']['longitude'])) {
                    $data[$key]['latitude'] = $row['geo']['latitude'];
                    $data[$key]['longitude'] = $row['geo']['longitude'];
                    unset($data[$key]['geo']);
                }
                if (array_key_exists('address', $row)) {
                    $address = $row['address'];

                    if ('string' == gettype($address)) {
                        $data[$key]['streetAddress'] = $address;
                    } elseif ($address) {
                        $data[$key] = array_merge($data[$key], $address);
                    }
                    unset($data[$key]['address']);
                }
                if (array_key_exists('categories', $row) && array_key_exists('categoriesFull', $row)) {
                    $data[$key]['categories'] = $data[$key]['categoriesFull'];
                    unset($data[$key]['categoriesFull']);
                }

                // GEOJSON
                if (isset($row['geometry']) && isset($row['geometry']['coordinates'])) {
                    $data[$key]['latitude'] = $row['geometry']['coordinates'][1];
                    $data[$key]['longitude'] = $row['geometry']['coordinates'][0];
                    unset($data[$key]['geometry']);

                    if (isset($row['properties']) && $this->isAssociativeArray($row['properties'])) {
                        foreach ($row['properties'] as $field => $value) {
                            $data[$key][$field] = $value;
                        }
                        unset($data[$key]['properties']);
                    }
                }

                // OPENSTREETMAP
                if ($this->import->getSourceType() == 'osm') {
                    if (isset($data[$key]['center'])) {
                        $data[$key]['lat'] = $data[$key]['center']['lat'];
                        $data[$key]['lon'] = $data[$key]['center']['lon'];
                        unset($data[$key]['center']);
                    } 
                    // remove unrelevant metadata so it does not get too noisy for the ontology mapping              
                    unset($data[$key]['nodes']); 
                    unset($data[$key]['changeset']); 
                    unset($data[$key]['uid']); 
                    unset($data[$key]['user']); 
                    unset($data[$key]['type']); 
                }
            } else {
                // the $row is not an array, probably a string so we ignore it
                unset($data[$key]);
            }
        }
        
        // Ontology
        $this->collectOntology($data, $import);
        $data = $this->mapOntology($data);

        if (null == $data || !is_array($data)) {
            return [];
        }
        // remove empty row, i.e. without name
        $data = array_filter($data, function ($row) { return array_key_exists('name', $row); });

        // Taxonomy
        if ($import->isCategoriesFieldMapped()) {
            $this->collectTaxonomy($data, $import);
            $data = $this->mapTaxonomy($data);
        }

        try {
            $this->dm->persist($import);
            $this->dm->flush();
        } catch (\Exception $e) {
            // catching corrupt BSON
            return null;
        }

        return $data;
    }

    public function collectOntology($data, $import)
    {
        $this->ontologyMapping = $import->getOntologyMapping();
        // reset count & values
        foreach($this->ontologyMapping as &$mappedObject) {
            $mappedObject['collectedCount'] = 0;
            $mappedObject['collectedValues'] = [];
        }
        unset($mappedObject); // prevent edge case https://www.php.net/manual/fr/control-structures.foreach.php

        $this->existingProps = $this->dm->getRepository('App\Document\Element')->findAllCustomProperties();
        $this->existingProps = array_merge($this->coreFields, $this->existingProps);
        $this->collectedProps = [];

        foreach ($data as $row) {
            foreach ($row as $prop => $value) {
                $this->collectProperty($prop, null, $import, $value);
                if ($this->isAssociativeArray($value) && !in_array($prop, ['openHours', 'modifiedElement'])) {
                    foreach ($value as $subprop => $subvalue) {
                        $this->collectProperty($subprop, $prop, $import, $subvalue);
                    }
                }
            }
        }
        // delete no more used fields
        foreach ($this->ontologyMapping as $prop => $mappedObject) {
            if (!in_array($prop, $this->collectedProps)) {
                unset($this->ontologyMapping[$prop]);
            }
        }
        if ($import->getSourceType() == 'osm') unset($this->ontologyMapping['tags']); // no need for the full tags object, better map invidvudal tag
        $count = count($data);
        foreach($this->ontologyMapping as &$mappedObject) {
            $mappedObject['collectedPercent'] = $mappedObject['collectedCount'] / $count * 100;
        }
        $import->setOntologyMapping($this->ontologyMapping);
    }

    private function slugProp($prop)
    {
        $result = preg_replace('~(^bf_|_)~', '', strtolower($prop));
        return str_replace('.', '', $result); // dots are not allawed in MongoDB hash keys
    }

    // Collect an original property of the data imported
    private function collectProperty($prop, $parentProp = null, $import, $value)
    {
        if (in_array($prop, ['__initializer__', '__cloner__', '__isInitialized__'])) {
            return;
        }
        $prop = $this->slugProp($prop);
        $parentProp = $this->slugProp($parentProp);
        $fullProp = $parentProp ? $parentProp.'/'.$prop : $prop;
        
        if (!is_string($value)) $value = "";

        if (!$prop || 0 == strlen($prop)) {
            return;
        }

        if (!in_array($prop, $this->collectedProps)) {
            $this->collectedProps[] = $fullProp;
        }
        if (!array_key_exists($fullProp, $this->ontologyMapping)) {
            // if prop with same name exist in the DB, map it directly to itself
            $mappedProp = in_array($prop, $this->existingProps) ? $prop : '';
            // handle some special cases
            if ($import->getSourceType() == 'osm') {
                switch ($prop) {
                    case 'source': $mappedProp = 'osm:source'; break; // we don't want to overide GoGoCarto source field with Osm field
                    case 'openning_hours': $mappedProp = 'osm:openning_hours'; break;    
                }                 
            }
            // use alternative name, like lat instead of latitude
            if (!$mappedProp && array_key_exists($prop, $this->mappedCoreFields)) {
                $mappedProp = $this->mappedCoreFields[$prop];
            }
            // Asign mapping
            $alreadyMappedProperties = array_map(function($a) { return $a['mappedProperty']; }, $this->ontologyMapping);
            if (!$mappedProp || !in_array($mappedProp, $alreadyMappedProperties)) {
                $this->ontologyMapping[$fullProp] = [
                    'mappedProperty' => $mappedProp,
                    'collectedCount' => 1,
                    'collectedValues' => [$value]
                ];
                $import->setNewOntologyToMap(true);
            }
        } else {
            // update count and values
            $this->ontologyMapping[$fullProp]['collectedCount']++;
            // Do not save more than 10 values for same property
            $valuesCount = count($this->ontologyMapping[$fullProp]['collectedValues']);
            $numberValuesSaved = 10;
            if ($valuesCount < $numberValuesSaved) {
                $this->ontologyMapping[$fullProp]['collectedValues'][] = $value;
                $this->ontologyMapping[$fullProp]['collectedValues'] = array_filter(array_unique($this->ontologyMapping[$fullProp]['collectedValues']),'strlen');
            } else if ($valuesCount == $numberValuesSaved) {
                $this->ontologyMapping[$fullProp]['collectedValues'][] = '...';
            }            
        }
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

    public function collectTaxonomy($data, $import)
    {
        $taxonomyMapping = $import->getTaxonomyMapping();
        // delete obsolte mapping (if an option have been deleted, but is still in the mapping)
        $allOptionsIds = array_keys($this->dm->createQueryBuilder('App\Document\Option')->select('id')
                                ->hydrate(false)->getQuery()->execute()->toArray());
        foreach ($taxonomyMapping as $key => $value) {
            $taxonomyMapping[$key] = array_filter($value, function ($el) use ($allOptionsIds) {
                return in_array($el, $allOptionsIds);
            });
        }
        $import->setTaxonomyMapping($taxonomyMapping);
        $allNewCategories = [];
        $this->createOptionsMappingTable();
        foreach ($data as $row) {
            if (isset($row['categories'])) {
                $categories = $row['categories'];
                $categories = is_array($categories) ? $categories : preg_split("[,;]+/", $categories);
                foreach ($categories as $category) {
                    if (is_array($category)) {
                        $category = $category['name'];
                    }
                    $category = ltrim(rtrim($category));
                    $category = str_replace('.', '_', $category);
                    if (!in_array($category, $allNewCategories)) {
                        $allNewCategories[] = $category;
                    }
                    if ($category && !array_key_exists($category, $taxonomyMapping)) {
                        $categorySlug = $this->slugify($category);
                        $value = array_key_exists($categorySlug, $this->mappingTableIds) ? $this->mappingTableIds[$categorySlug]['id'] : '';

                        // create option if does not exist
                        if ('' == $value && $this->createMissingOptions) {
                            $value = $this->createOption($category);
                        }

                        $taxonomyMapping[$category] = [$value];
                        if (!$value) {
                            $import->setNewTaxonomyToMap(true);
                        }
                    }
                    // create options for previously imported non mapped options
                    if (array_key_exists($category, $taxonomyMapping)
                        && (!$taxonomyMapping[$category]
                            || '/' == $taxonomyMapping[$category]
                            || '' == $taxonomyMapping[$category])
                        && $this->createMissingOptions) {
                        $taxonomyMapping[$category] = [$this->createOption($category)];
                    }
                }
            }
        }
        // delete no more used categories
        foreach ($taxonomyMapping as $category => $mappedCategory) {
            if (!in_array($category, $allNewCategories)) {
                unset($taxonomyMapping[$category]);
            }
        }
        $import->setTaxonomyMapping($taxonomyMapping);
    }

    private function mapOntology($data)
    {
        $mapping = $this->import->getOntologyMapping();
        foreach ($data as $key => $row) {
            $newRow = [];
            // Fix bad prop names
            foreach($row as $prop => $value) {
                $data[$key][$this->slugProp($prop)] = $value;
            }
            
            foreach ($mapping as $prop => $mappedObject) {
                $mappedProp = $mappedObject['mappedProperty'];
                $explodedProp = explode('/', $prop);
                // Map nested properties first (if you didn't map the parent property then it will be gone 
                // and you'll no longer able to access the subproperty)
                if (2 == count($explodedProp)) {
                    $prop = $explodedProp[0];
                    $subProp = $explodedProp[1];
                    if (!in_array($mappedProp, ['/', '']) && isset($row[$prop]) && isset($row[$prop][$subProp])) {
                        $newRow = $this->mapProperty($newRow, $mappedProp, $row[$prop][$subProp]);
                    }
                }
                // Map standard properties
                if (1 == count($explodedProp)) {
                    if (!in_array($mappedProp, ['/', '']) && isset($row[$prop])) {
                        $newRow = $this->mapProperty($newRow, $mappedProp, $row[$prop]);
                    }
                }
            }
            
            foreach ($mapping as $searchProp => $mappedObject) {
                $mappedProp = $mappedObject['mappedProperty'];
                
            }
            // Add streetNumber into streetAddress
            if (isset($newRow['streetNumber']) && isset($newRow['streetAddress'])) {
                $newRow['streetAddress'] = $newRow['streetNumber'].' '.$newRow['streetAddress'];
            }
            if (isset($newRow['fullAddress'])) {
                $newRow['streetAddress'] = $newRow['fullAddress'];
            }
            // convert lat/long numeric into string
            if (isset($newRow['latitude']) && is_numeric($newRow['latitude'])) {
                $newRow['latitude'] = ''.$newRow['latitude'];
            }
            if (isset($newRow['longitude']) && is_numeric($newRow['longitude'])) {
                $newRow['longitude'] = ''.$newRow['longitude'];
            }

            $data[$key] = $newRow;
        }

        return $data;
    }

    // map $value inside $mappedProp attribute
    private function mapProperty($newRow, $mappedProp, $value)
    {
        // We allow that multiple keys maps to categories. In this case they will be concatenated
        if ('categories' == $mappedProp) {
            if (is_string($value)) {
                $value = preg_split('/[,;]+/', $value);
            }
            $oldVal = isset($newRow[$mappedProp]) ? $newRow[$mappedProp] : [];
            $value = array_merge($oldVal, $value);
        }

        // replacing existing value only if not set, or if categories because values have been merged
        if (!isset($newRow[$mappedProp]) || 'categories' == $mappedProp) {
            $newRow[$mappedProp] = $value;
        }

        return $newRow;
    }

    private function mapTaxonomy($data)
    {
        $mapping = $this->import->getTaxonomyMapping();
        foreach ($data as $key => $row) {
            if (isset($data[$key]['categories'])) {
                $categories = [];
                $categoriesIds = [];
                foreach ($row['categories'] as $category) {
                    $val = is_array($category) ? $category['name'] : $category;
                    $val = ltrim(rtrim($val));
                    if (isset($mapping[$val]) && $mapping[$val]) {
                        foreach ($mapping[$val] as $mappedCategory) {
                            if (array_key_exists($mappedCategory, $this->mappingTableIds)) {
                                $newcat['originalValue'] = $val;
                                $newcat['mappedName'] = $this->mappingTableIds[$mappedCategory]['name'];
                                $newcat['mappedId'] = $this->mappingTableIds[$mappedCategory]['id'];
                                if (!in_array($newcat['mappedId'], $categoriesIds)) {
                                    if (isset($category['index'])) {
                                        $newcat['index'] = $category['index'];
                                    }
                                    if (isset($category['description'])) {
                                        $newcat['description'] = $category['description'];
                                    }
                                    $categories[] = $newcat;
                                    $categoriesIds[] = $newcat['mappedId'];
                                    $parentIds = $this->mappingTableIds[$mappedCategory]['idAndParentsId'];
                                    foreach ($parentIds as $id) {
                                        if (!in_array($id, $categoriesIds)) {
                                            $categories[] = ['mappedId' => $id, 'info' => "Automatiquement ajoutée (category parente d'une category importée)"];
                                            $categoriesIds[] = $id;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                $data[$key]['categories'] = $categories;
            }
        }

        return $data;
    }

    private function createOptionsMappingTable($options = null)
    {
        if (null === $options) {
            $options = $this->dm->getRepository('App\Document\Option')->findAll();
        }

        foreach ($options as $option) {
            $ids = [
                'id' => $option->getId(),
                'name' => $option->getName(),
                'idAndParentsId' => $option->getIdAndParentOptionIds(),
            ];
            $this->mappingTableIds[$this->slugify($option->getNameWithParent())] = $ids;
            $this->mappingTableIds[$this->slugify($option->getName())] = $ids;
            $this->mappingTableIds[strval($option->getId())] = $ids;
            if ($option->getCustomId()) {
                $this->mappingTableIds[$this->slugify($option->getCustomId())] = $ids;
            }
        }
    }

    private function createOption($name)
    {
        if ($this->parentCategoryIdToCreateMissingOptions) {
            $parent = $this->dm->getRepository('App\Document\Category')->find($this->parentCategoryIdToCreateMissingOptions);
        } else {
            // create a default category
            $mainCategory = new Category();
            $mainCategory->setName('Catégories Principales');
            $mainCategory->setPickingOptionText('Une catégorie principale');
            $this->dm->persist($mainCategory);
            $this->parentCategoryIdToCreateMissingOptions = $mainCategory->getId();
            $parent = $mainCategory;
        }

        $option = new Option();
        $option->setName($name);
        $option->setParent($parent);
        $option->setUseIconForMarker(false);
        $option->setUseColorForMarker(false);
        $this->dm->persist($option);
        $this->createOptionsMappingTable([$option]);

        return $option->getId();
    }

    private function slugify($text)
    {
        if (!is_string($text)) {
            return;
        }
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
    $text = strtolower($text); // lowercase

    if (empty($text)) {
        return '';
    }

        return $text;
    }
}
