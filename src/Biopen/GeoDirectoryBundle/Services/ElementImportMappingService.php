<?php

namespace Biopen\GeoDirectoryBundle\Services;

use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Helper\ProgressBar;
use Biopen\GeoDirectoryBundle\Document\Element;
use Biopen\GeoDirectoryBundle\Document\ElementStatus;
use Biopen\GeoDirectoryBundle\Document\ModerationState;
use Biopen\GeoDirectoryBundle\Document\Coordinates;
use Biopen\GeoDirectoryBundle\Document\Option;
use Biopen\GeoDirectoryBundle\Document\OptionValue;
use Biopen\GeoDirectoryBundle\Document\UserInteractionContribution;
use Biopen\GeoDirectoryBundle\Document\PostalAddress;
use Biopen\GeoDirectoryBundle\Document\ElementUrl;
use Biopen\GeoDirectoryBundle\Document\ElementImage;
use Biopen\GeoDirectoryBundle\Document\ImportState;
use Biopen\CoreBundle\Document\GoGoLogImport;
use Biopen\CoreBundle\Document\GoGoLogLevel;

class ElementImportMappingService
{
  protected $import;
  protected $createMissingOptions;
  protected $parentCategoryIdToCreateMissingOptions;
  protected $em;
  protected $coreFields = ['id', 'name', 'categories', 'streetAddress', 'addressLocality', 'postalCode', 'addressCountry', 'latitude', 'longitude', 'images', 'owner', 'source'];
  protected $mappedCoreFields = [
    'title' => 'name',
    'taxonomy' => 'categories',
    'address' => 'streetAddress',
    'city' => 'addressLocatily',
    'postcode' => 'postalCode',
    'country' => 'addressCountry',
    'lat' => 'latitude',
    'long' => 'longitude', 'lng' => 'longitude'
  ];

  public function __construct(DocumentManager $documentManager)
  {
    $this->em = $documentManager;
  }

  public function transform($data, $import)
  {
    $this->import = $import;
    $this->createMissingOptions = $import->getCreateMissingOptions();
    $parent = $import->getParentCategoryToCreateOptions() ?: $this->em->getRepository('BiopenGeoDirectoryBundle:Category')->findOneByIsRootCategory(true);
    $this->parentCategoryIdToCreateMissingOptions = $parent->getId();

    $this->collectOntology($data, $import);
    $data = $this->mapOntology($data);

    // remove empty row, i.e. without name
    $data = array_filter($data, function($row) { return array_key_exists('name', $row); });
    // $data = $this->addMissingFieldsToData($data);

    if ($import->isCategoriesFieldMapped())
    {
      $this->collectTaxonomy($data, $import);
      $data = $this->mapTaxonomy($data);
    }

    $this->em->persist($import);
    $this->em->flush();
    return $data;
  }

  public function collectOntology($data, $import)
  {
    $ontologyMapping = $import->getOntologyMapping();
    $allNewFields = [];
    foreach($data as $row)
    {
      foreach ($row as $key => $value) {
        if (!in_array($key, $allNewFields)) $allNewFields[] = $key;
        if (!array_key_exists($key, $ontologyMapping)) {
          $value = in_array($key, $this->coreFields) ? $key : "";
          if (!$value && in_array($this->mappedCoreFields[$key], $this->coreFields)) $value = $this->mappedCoreFields[$key];
          $ontologyMapping[$key] = $value;
        }
      }
    }
    // delete no more used fields
    foreach($ontologyMapping as $field => $mappedField) {
      if (!in_array($field, $allNewFields)) unset($ontologyMapping[$field]);
    }

    $import->setOntologyMapping($ontologyMapping);
  }

  public function collectTaxonomy($data, $import)
  {
    $taxonomyMapping = $import->getTaxonomyMapping();
    $allNewCategories = [];
    $this->createOptionsMappingTable();

    foreach($data as $row)
    {
      $categories = $row['categories'];
      $categories = is_array($categories) ? $categories : explode(',', $categories);
      foreach($categories as $category) {
        if (!in_array($category, $allNewCategories)) $allNewCategories[] = $category;
        if ($category && !array_key_exists($category, $taxonomyMapping))
        {
          $categorySlug = $this->slugify($category);
          $value = array_key_exists($categorySlug, $this->mappingTableIds) ? $this->mappingTableIds[$categorySlug]['id'] : '';

          // create option if does not exist
          if ($value == '' && $this->createMissingOptions) $value = $this->createOption($category);

          $taxonomyMapping[$category] = $value;
        }
        // create options for previously imported non mapped options
        if (array_key_exists($category, $taxonomyMapping)
            && (!$taxonomyMapping[$category] || $taxonomyMapping[$category] == '/')
            && $this->createMissingOptions) {
          $taxonomyMapping[$category] = $this->createOption($category);
        }
      }
    }
    // delete no more used categories
    foreach($taxonomyMapping as $category => $mappedCategory) {
      if (!in_array($category, $allNewCategories)) unset($taxonomyMapping[$category]);
    }
    $import->setTaxonomyMapping($taxonomyMapping);
  }

  private function mapOntology($data)
  {
    $mapping = $this->import->getOntologyMapping();

    foreach ($data as $key => $row) {
      foreach ($mapping as $search => $replace) {
        if ($replace == '/' || $replace == '') {
          unset($data[$key][$search]);
        }
        else if (isset($row[$search]) && !isset($row[$replace])) {
          $data[$key][$replace] = $data[$key][$search];
          unset($data[$key][$search]);
        }
      }
    }
    return $data;
  }

  private function addMissingFieldsToData($data)
  {
    foreach ($data as $key => $row) {
      $missingFields = array_diff($this->coreFields, array_keys($row));
      foreach ($missingFields as $missingField) {
        $data[$key][$missingField] = "";
      }
    }
    return $data;
  }

  private function mapTaxonomy($data)
  {
    $mapping = $this->import->getTaxonomyMapping();
    foreach ($data as $key => $row)
    {
      if (is_string($row['categories'])) $row['categories'] = explode(',', $row['categories']);
      $data[$key]['categories'] = array_map(function($el) use ($mapping) {
        return array_key_exists($el, $mapping) ? $mapping[$el] : '';
      }, $row['categories']);
    }
    return $data;
  }

  private function createOptionsMappingTable($options = null)
  {
    if ($options === null) $options = $this->em->getRepository('BiopenGeoDirectoryBundle:Option')->findAll();

    foreach($options as $option)
    {
      $ids = [
        'id' => $option->getId(),
        'idAndParentsId' => $option->getIdAndParentOptionIds()
      ];
      $this->mappingTableIds[$this->slugify($option->getNameWithParent())] = $ids;
      $this->mappingTableIds[$this->slugify($option->getName())] = $ids;
      $this->mappingTableIds[strval($option->getId())] = $ids;
      if ($option->getCustomId()) $this->mappingTableIds[$this->slugify($option->getCustomId())] = $ids;
    }
  }

  private function createOption($name)
  {
    $option = new Option();
    $option->setName($name);
    $parent = $this->em->getRepository('BiopenGeoDirectoryBundle:Category')->find($this->parentCategoryIdToCreateMissingOptions);
    $option->setParent($parent);
    $option->setUseIconForMarker(false);
    $option->setUseColorForMarker(false);
    $this->em->persist($option);
    $this->createOptionsMappingTable([$option]);
    return $option->getId();
  }

  private function slugify($text)
  {
    if (!is_string($text)) return;
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

    if (empty($text)) return '';
    return $text;
  }
}