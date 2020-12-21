<?php

namespace App\Services;

use App\Document\Element;
use App\Document\ElementStatus;
use App\Document\GoGoLogImport;
use App\Document\ImportState;
use App\Document\ModerationState;
use App\Document\UserInteraction;
use App\EventListener\TaxonomyJsonGenerator;
use Doctrine\ODM\MongoDB\DocumentManager;
use App\Services\Utf8Encoder;

class ElementImportService
{
    private $dm;

    protected $countElementCreated = 0;
    protected $countElementUpdated = 0;
    protected $countElementNothingToDo = 0;
    protected $countElementErrors = 0;
    protected $countNoCategoryPreventImport = 0;
    protected $elementIdsErrors = [];
    protected $errorsMessages = [];
    protected $errorsCount = [];

    /**
     * Constructor.
     */
    public function __construct(DocumentManager $dm, ElementImportOneService $importOneService,
                              ElementImportMappingService $mappingService,
                              TaxonomyJsonGenerator $taxonomyJsonGenerator)
    {
        $this->dm = $dm;
        $this->importOneService = $importOneService;
        $this->mappingService = $mappingService;
        $this->taxonomyJsonGenerator = $taxonomyJsonGenerator;
    }

    public function startImport($import)
    {
        $this->countElementCreated = 0;
        $this->countElementUpdated = 0;
        $this->countElementNothingToDo = 0;
        $this->countElementErrors = 0;
        $this->countNoCategoryPreventImport = 0;
        $this->elementIdsErrors = [];
        $this->errorsMessages = [];
        $this->errorsCount = [];

        $import->setCurrState(ImportState::Downloading);
        $import->setCurrMessage('Téléchargement des données en cours... Veuillez patienter...');
        $this->dm->persist($import);
        $this->dm->flush();
        if ($import->getUrl()) {
            return $this->importJson($import);
        } else {
            return $this->importCsv($import);
        }
    }

    public function importCsv($import, $onlyGetData = false)
    {
        list($header,$data) = $this->readCSV($import->getFilePath(), ',');
        if ($header && count($header) < 3) {
            // try with ; separtor
            list($header,$data) = $this->readCSV($import->getFilePath(), ';');
        }

        if (!$data) {
            return [];
        }

        if ($onlyGetData) {
            return $data;
        }

        return $this->importData($data, $import);
    }

    private function readCSv($fileName, $delimiter)
    {
        $data = [];
        $header = null;
        if (false !== ($handle = fopen($fileName, 'r'))) {
            while (false !== ($row = fgetcsv($handle, 0, $delimiter))) {
                $row = Utf8Encoder::toUTF8($row);
                if (!$header) {
                    $header = $row;
                } else {
                    if (count($header) == count($row)) {
                        $data[] = array_combine($header, $row);
                    }
                }
            }
            fclose($handle);
        }
        return [$header, $data];
    }

    public function importJson($import, $onlyGetData = false)
    {
        $json = file_get_contents($import->getUrl());
        $data = json_decode($json, true);
        if (null === $data) {
            return null;
        }

        if ($onlyGetData) {
            return $data;
        }

        $elementImportedCount = $this->importData($data, $import);

        return $elementImportedCount;
    }

    // read the data and extract ontology and categories. After this operation, the user will be able
    // create a mapping table for ontology and taxonomy
    public function collectData($import)
    {
        
        if ($import->getUrl()) $data = $this->importJson($import, true);
        elseif ($import->getFile()) $data = $this->importCsv($import, true);
        if (!isset($data)) return null;

        return $this->mappingService->transform($data, $import);
    }

    public function importData($data, $import)
    {
        if (!$data) {
            return 0;
        }

        try {
            // Define the frequency for persisting the data and the current index of records
            $batchSize = 100;
            $i = 0;

            // do the mapping
            $data = $this->mappingService->transform($data, $import);

            $import->setLastRefresh(time());
            $import->setCurrState(ImportState::InProgress);

            $qb = $this->dm->createQueryBuilder('App\Document\Element');
            if ($import->isDynamicImport()) {
                $import->updateNextRefreshDate();

                // before updating the source, we put all elements into DynamicImportTemp status
                $qb->updateMany()
                   ->field('source')->references($import)
                   ->field('status')->gt(ElementStatus::Deleted) // leave the deleted one as they are, so we know we do not need to import them
                   ->field('status')->set(ElementStatus::DynamicImportTemp)
                   ->getQuery()->execute();
            } else {
                // before re importing a static source, we delete all previous items
                $qb->remove()->field('source')->references($import)->getQuery()->execute();
            }

            $this->importOneService->initialize($import);
            $size = count($data);
            // processing each data
            foreach ($data as $row) {
                try {
                    $import->setCurrMessage("Importation des données $i/$size traitées");
                    $result = $this->importOneService->createElementFromArray($row, $import);
                    switch ($result) {
                      case 'nothing_to_do': $this->countElementNothingToDo++; break;
                      case 'created': $this->countElementCreated++; break;
                      case 'updated': $this->countElementUpdated++; break;
                      case 'no_category': $this->countNoCategoryPreventImport++; break;
                    }
                    ++$i;
                } catch (\Exception $e) {
                    ++$this->countElementErrors;
                    if (isset($row['id']) && !is_array($row['id'])) {
                        $this->elementIdsErrors[] = ''.$row['id'];
                    }

                    if (!array_key_exists($e->getMessage(), $this->errorsCount)) {
                        $this->errorsCount[$e->getMessage()] = 1;
                    } else {
                        ++$this->errorsCount[$e->getMessage()];
                    }
                    $message = '<u>'.$e->getMessage().'</u> <b>(x'.$this->errorsCount[$e->getMessage()].')</b></br>'.$e->getFile().' LINE '.$e->getLine().'</br>';
                    $message .= 'CONTEXT : <pre>'.print_r($row, true).'</pre>';
                    $this->errorsMessages[$e->getMessage()] = $message;
                }

                if (1 === ($i % $batchSize)) {
                    $this->dm->flush();
                    $this->dm->clear();
                    // After flush, we need to get again the import from the DB to avoid doctrine raising errors
                    $import = $this->dm->getRepository('App\Document\Import')->find($import->getId());
                    $this->dm->persist($import);
                }
            }

            $this->dm->flush();
            $this->dm->clear();

            $this->taxonomyJsonGenerator->updateTaxonomy($this->dm);
            $import = $this->dm->getRepository('App\Document\Import')->find($import->getId());
            $this->dm->persist($import);

            // Link elements between each others
            $config = $this->dm->getRepository('App\Document\Configuration')->findConfiguration();
            $elementsLinkedFields = [];
            foreach($config->getElementFormFields() as $field) {
                if ($field->type === 'elements' && in_array($field->name, $import->getMappedProperties()))
                {
                    $elementsLinkedFields[] = $field->name;
                    // resetting the reversed field to it will be filled correctly
                    if (isset($field->reversedBy)) {
                        $qb = $this->dm->createQueryBuilder('App\Document\Element');
                        $qb->field('source')->references($import)
                           ->updateMany()
                           ->field("data.$field->reversedBy")->unsetField()
                           ->field("privateData.$field->reversedBy")->unsetField()
                           ->getQuery()->execute();
                    }
                }
            }

            if (count($elementsLinkedFields) > 0) {
                // Go through each individual imported elements, and link elements from each other
                $importedElements = $this->dm->createQueryBuilder('App\Document\Element')
                    ->field('source')->references($import)
                    ->getQuery()->execute();
                $i = 0;
                $size = count($importedElements);
                foreach ($elementsLinkedFields as $linkField) {
                    foreach ($importedElements as $element) {
                        $import->setCurrMessage("Calcul des liens pour le champ '$linkField' : $i/$size éléments traitées");
                        $values = $element->getCustomProperty($linkField);
                        if ($values !== null) {
                            if (!is_array($values)) $values = preg_split("/[,;]/", $values);
                            $values = array_map('trim', $values);
                            $values = array_filter($values, function($e) { return strlen($e) > 0; });
                            if (count($values) > 0) {
                                $qb = $this->dm->createQueryBuilder('App\Document\Element');
                                $qb->field('source')->references($import);
                                $qb->addOr($qb->expr()->field('name')->in($values));
                                $qb->addOr($qb->expr()->field('oldId')->in($values));
                                $result = $qb->select('name')->hydrate(false)->getQuery()->execute()->toArray();
                                $result = array_map(function($el) {
                                    return $el['name'];
                                }, $result);
                                if (count($result) > 0) $element->setCustomProperty($linkField, $result);
                            }
                        }
                        ++$i;
                        if (1 === ($i % $batchSize)) {
                            $this->dm->flush();
                            $this->dm->clear();
                            // After flush, we need to get again the import from the DB to avoid doctrine raising errors
                            $import = $this->dm->getRepository('App\Document\Import')->find($import->getId());
                            $this->dm->persist($import);
                        }
                    }
                }
                $this->dm->flush();
                $this->dm->clear();

                // After flush, we need to get again the import from the DB to avoid doctrine raising errors
                $import = $this->dm->getRepository('App\Document\Import')->find($import->getId());
                $this->dm->persist($import);
            }

            $countElemenDeleted = 0;
            if ($import->isDynamicImport()) {
                if ($this->countElementErrors > 0) {
                    // If there was an error while retrieving an already existing element
                    // we set back the status to DynamicImport otherwise it will be deleted just after
                    $qb = $this->dm->createQueryBuilder('App\Document\Element');
                    $result = $qb->updateMany()
                        ->field('source')->references($import)->field('oldId')->in($this->elementIdsErrors)
                        ->field('status')->set(ElementStatus::DynamicImport)
                        ->getQuery()->execute();
                }

                // after updating the source, the element still in DynamicImportTemp are the one who are missing
                // from the new data received, so we need to delete them
                $qb = $this->dm->createQueryBuilder('App\Document\Element');
                $deleteQuery = $qb
                    ->field('source')->references($import)
                    ->field('status')->equals(ElementStatus::DynamicImportTemp);
                // really needed?
                $deletedElementIds = array_keys($deleteQuery->select('id')->hydrate(false)->getQuery()->execute()->toArray());
                $qb = $this->dm->createQueryBuilder(UserInteraction::class);
                $qb->field('element.id')->in($deletedElementIds)->remove()->getQuery()->execute();

                $countElemenDeleted = $deleteQuery->remove()->getQuery()->execute()['n'];
            }

            $qb = $this->dm->createQueryBuilder('App\Document\Element');
            $totalCount = $qb->field('status')->field('source')->references($import)->count()->getQuery()->execute();

            $qb = $this->dm->createQueryBuilder('App\Document\Element');
            $elementsMissingGeoCount = $qb->field('source')->references($import)->field('moderationState')->equals(ModerationState::GeolocError)->count()->getQuery()->execute();
            $qb = $this->dm->createQueryBuilder('App\Document\Element');
            $elementsMissingTaxoCount = $qb->field('source')->references($import)->field('moderationState')->equals(ModerationState::NoOptionProvided)->count()->getQuery()->execute();

            $logData = [
                'elementsCount' => $totalCount,
                'elementsCreatedCount' => $this->countElementCreated,
                'elementsUpdatedCount' => $this->countElementUpdated,
                'elementsNothingToDoCount' => $this->countElementNothingToDo,
                'elementsMissingGeoCount' => $elementsMissingGeoCount,
                'elementsMissingTaxoCount' => $elementsMissingTaxoCount,
                'elementsPreventImportedNoTaxo' => $this->countNoCategoryPreventImport,
                'elementsDeletedCount' => $countElemenDeleted,
                'elementsErrorsCount' => $this->countElementErrors,
                'errorMessages' => $this->errorsMessages,
            ];

            $totalErrors = $elementsMissingGeoCount + $elementsMissingTaxoCount + $this->countElementErrors;
            $logLevel = $totalErrors > 0 ? ($totalErrors > ($size / 4) ? 'error' : 'warning') : 'success';

            $message = 'Import de '.$import->getSourceName().' terminé';
            if ('success' != $logLevel) {
                $message .= ', mais avec des problèmes !';
            }

            $log = new GoGoLogImport($logLevel, $message, $logData);
            $import->addLog($log);

            $import->setCurrState($totalErrors > 0 ? ($totalErrors == $size ? ImportState::Failed : ImportState::Errors) : ImportState::Completed);
            $import->setCurrMessage($log->displayMessage());

            $this->dm->flush();
        } catch (\Error $e) {
            $message = '<u>'.$e->getMessage().'</u></br>'.$e->getFile().' LINE '.$e->getLine().'</br>';
            $import->setCurrMessage($message);
            $import->setCurrState(ImportState::Errors);
            $this->dm->flush();
        }

        return $message;
    }
}
