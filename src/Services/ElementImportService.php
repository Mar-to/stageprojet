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
    protected $manuallyStarted = true;

    /**
     * Constructor.
     */
    public function __construct(DocumentManager $dm, ElementImportOneService $importOneService,
                              ElementImportMappingService $mappingService,
                              TaxonomyJsonGenerator $taxonomyJsonGenerator,
                              UserNotificationService $notifService)
    {
        $this->dm = $dm;
        $this->importOneService = $importOneService;
        $this->mappingService = $mappingService;
        $this->taxonomyJsonGenerator = $taxonomyJsonGenerator;
        $this->notifService = $notifService;
    }

    public function startImport($import, $manuallyStarted = true)
    {
        $this->manuallyStarted = filter_var($manuallyStarted, FILTER_VALIDATE_BOOLEAN);
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
        $json = file_get_contents(str_replace(' ', '%20', $import->getUrl()));
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
        elseif ($import->getFilePath()) $data = $this->importCsv($import, true);
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
            $batchSize = 25;
            $i = 0;
            $previouslyImportedElementIds = [];
            $newlyImportedElementIds = [];
            // do the mapping
            $data = $this->mappingService->transform($data, $import);

            $import->setCurrState(ImportState::InProgress);
            
            $qb = $this->dm->query('Element');
            if ($import->isDynamicImport()) {
                $import->updateNextRefreshDate();

                // before updating the source, we collect all elements ids
                $previouslyImportedElementIds = $qb->field('source')->references($import)->getIds();
                $previouslyImportedElementIds = array_map(function($id) {
                    return strval($id); // fix some id are just numbers
                }, $previouslyImportedElementIds);
            } else {
                $import->setCurrMessage("Suppression des données précédemment importées");
                // before re importing a static source, we delete all previous items
                $qb->field('source')->references($import)->batchRemove();
                $this->dm->persist($import); // batch remove call a dm->clear so need to persist again
            }

            $this->importOneService->initialize($import);
            $size = count($data);
            // processing each data
            foreach ($data as $row) {
                try {
                    $import->setCurrMessage("Importation des données $i/$size traitées");
                    $result = $this->importOneService->createElementFromArray($row, $import);
                    if (isset($result['id']))
                        $newlyImportedElementIds[] = $result['id'];
                    // saving modified version so it does not get deleted at the end of the import
                    if (isset($result['id_pending_modified'])) 
                        $newlyImportedElementIds[] = $result['id_pending_modified'];
                    
                    switch ($result['status']) {
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
                        $newlyImportedElementIds[] = ''.$row['id'];
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

                if (0 === ($i % $batchSize)) {
                    $import = $this->batchFlush($import);
                }
            }
            $import = $this->batchFlush($import);
            $import->setLastRefresh(time());

            // Remove Elements no longer imported
            $countElemenDeleted = 0;
            if ($import->isDynamicImport()) {
                $qb = $this->dm->query('Element');
                $elementIdsToDelete = array_diff($previouslyImportedElementIds, $newlyImportedElementIds);
                // first get proper count (without ElementPendingVersion which are misleading)
                $countElemenDeleted = $qb->field('source')->references($import)
                                         ->field('status')->notEqual(ElementStatus::ModifiedPendingVersion)
                                         ->field('id')->in($elementIdsToDelete)
                                         ->getCount();
                // delete elements
                $qb = $this->dm->query('Element');
                $qb->field('source')->references($import)
                   ->field('id')->in($elementIdsToDelete)
                   ->batchRemove();
                $this->dm->persist($import); // batch remove call a dm->clear so need to eprsist again
            }

            // Link elements between each others
            $config = $this->dm->get('Configuration')->findConfiguration();
            $elementsLinkedFields = [];
            foreach($config->getElementFormFields() as $field) {
                if ($field->type === 'elements' && in_array($field->name, $import->getMappedProperties()))
                {
                    $elementsLinkedFields[] = $field->name;
                    // resetting the reversed field to it will be filled correctly
                    if (isset($field->reversedBy)) {
                        $qb = $this->dm->query('Element');
                        $qb->field('source')->references($import)
                           ->updateMany()
                           ->field("data.$field->reversedBy")->unsetField()
                           ->execute();                        
                    }
                }
            }
            $this->dm->flush(); // execute the unsetField queries

            if (count($elementsLinkedFields) > 0) {
                // Go through each individual imported elements, and link elements from each other
                $importedElements = $this->dm->query('Element')
                    ->field('source')->references($import)
                    ->execute();
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
                                $qb = $this->dm->query('Element');
                                $qb->field('source')->references($import);
                                $qb->addOr($qb->expr()->field('name')->in($values));
                                $qb->addOr($qb->expr()->field('oldId')->in($values));
                                $result = $qb->select('name')->getArray();
                                if (count($result) > 0) $element->setCustomProperty($linkField, $result);
                            }
                        }
                        ++$i;
                        if (0 === ($i % $batchSize)) {
                            $import = $this->batchFlush($import);
                        }
                    }
                }
                $import = $this->batchFlush($import);
            }

            $qb = $this->dm->query('Element');
            $totalCount = $qb->field('status')->notEqual(ElementStatus::ModifiedPendingVersion)
                             ->field('source')->references($import)
                             ->count()->execute();

            $qb = $this->dm->query('Element');
            $elementsMissingGeoCount = $qb->field('source')->references($import)->field('moderationState')->equals(ModerationState::GeolocError)->count()->execute();
            $qb = $this->dm->query('Element');
            $elementsMissingTaxoCount = $qb->field('source')->references($import)->field('moderationState')->equals(ModerationState::NoOptionProvided)->count()->execute();

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
            if ($import->isDynamicImport() && !$this->manuallyStarted) {
                if ($totalErrors > 0) {
                    $this->notifService->notifyImportError($import);
                }
                if ($import->getNewOntologyToMap() || $import->getNewTaxonomyToMap()) {
                    $this->notifService->notifyImportMapping($import);
                }
            }

            $this->dm->flush();
        } catch (\Error $e) {
            $message = '<u>'.$e->getMessage().'</u></br>'.$e->getFile().' LINE '.$e->getLine().'</br>';
            $import->setCurrMessage($message);
            $import->setCurrState(ImportState::Errors);
            $this->dm->flush();
        }

        return $message;
    }

    private function batchFlush($import) {
        $this->dm->flush();
        $this->dm->clear();
        // After dm->clear, we need to get again the import from the DB to avoid doctrine raising errors
        $import = $this->dm->get('Import')->find($import->getId());
        $this->dm->persist($import);
        return $import;
    }
}
