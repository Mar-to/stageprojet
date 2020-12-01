<?php

namespace App\EventListener;

use App\Document\Configuration\ConfigurationApi;
use App\Document\Configuration;
use App\Document\Configuration\ConfigurationMarker;
use App\Services\AsyncService;
use Symfony\Component\Process\Process;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;

class ConfigurationListener
{
    protected $asyncService;

    public function __construct(AsyncService $asyncService, $baseUrl, $basePath, $contactEmail, $projectDir)
    {
        $this->asyncService = $asyncService;
        $this->baseUrl = $baseUrl;
        $this->basePath = $basePath;
        $this->contactEmail = $contactEmail;
        $this->projectDir = $projectDir;
    }

    public function preUpdate(\Doctrine\ODM\MongoDB\Event\LifecycleEventArgs $args)
    {
        $document = $args->getDocument();
        $dm = $args->getDocumentManager();

        // Change the database to fit the private property config
        // There is two attribute in element : data & privateData
        // If an custom field is private, it will be stored in privateData instead of data
        if ($document instanceof ConfigurationApi) {
            $uow = $dm->getUnitOfWork();
            $uow->computeChangeSets();
            $changeset = $uow->getDocumentChangeSet($document);
            if (array_key_exists('publicApiPrivateProperties', $changeset)) {
                $privatePropChanged = $changeset['publicApiPrivateProperties'];
                $oldPrivateProperties = $privatePropChanged[0] ? array_values($privatePropChanged[0]) : [];
                $newPrivateProperties = $privatePropChanged[1] ? array_values($privatePropChanged[1]) : [];
                $removedProps = array_diff($oldPrivateProperties, $newPrivateProperties);
                $addedProps = array_diff($newPrivateProperties, $oldPrivateProperties);

                // Update field path (move them between data and privateData object)
                $qb = $dm->createQueryBuilder('App\Document\Element');
                $qb = $qb->updateMany();
                foreach ($removedProps as $key => $prop) {
                    $qb = $qb->field('privateData.'.$prop)->rename('data.'.$prop);
                }
                foreach ($addedProps as $key => $prop) {
                    $qb = $qb->field('data.'.$prop)->rename('privateData.'.$prop);
                }
                $qb->getQuery()->execute();
                $this->asyncService->callCommand('app:elements:updateJson', ['ids' => 'all']);

                // Update search index
                $fullConfig = $dm->getRepository('App\Document\Configuration')->findConfiguration();
                $this->updateSearchIndex($fullConfig->getDbName(),
                                         $oldPrivateProperties,
                                         $newPrivateProperties,
                                         $fullConfig->getElementFormFieldsJson(),
                                         $fullConfig->getElementFormFieldsJson());
            }
        }
        if ($document instanceof ConfigurationMarker) {
            $uow = $dm->getUnitOfWork();
            $uow->computeChangeSets();
            $changeset = $uow->getDocumentChangeSet($document);
            if (array_key_exists('fieldsUsedByTemplate', $changeset)) {
                $this->asyncService->callCommand('app:elements:updateJson', ['ids' => 'all']);
            }
        }

        if ($document instanceof Configuration) {
            $uow = $dm->getUnitOfWork();
            $uow->computeChangeSets();
            $changeset = $uow->getDocumentChangeSet($document);
            if (array_key_exists('elementFormFieldsJson', $changeset)) {
                $formFieldsChanged = $changeset['elementFormFieldsJson'];
                $oldFormFields = $formFieldsChanged[0];
                $newFormFields = $formFieldsChanged[1];
                $this->updateSearchIndex($document->getDbName(),
                                         $document->getApi()->getPublicApiPrivateProperties(),
                                         $document->getApi()->getPublicApiPrivateProperties(),
                                         $oldFormFields,
                                         $newFormFields);
            }
            if (array_key_exists('customDomain', $changeset)) {
                $customDomainChanged = $changeset['customDomain'];
                $oldCustomDomain = preg_replace('/https?:\/\//', '', $customDomainChanged[0]);
                $newCustomDomain = preg_replace('/https?:\/\//', '', $customDomainChanged[1]);
                $filesystem = new Filesystem();
                // Those files will be consumed by bin/execute_custom_domain.sh called by a cron tab
                $removePath = "$this->projectDir/var/file_queues/custom_domain_to_remove";
                $addPath = "$this->projectDir/var/file_queues/custom_domain_to_configure";
                if ($oldCustomDomain) {
                    $filesystem->dumpFile("$removePath/{$document->getDbName()}", $oldCustomDomain);
                }
                if  ($newCustomDomain) {
                    $gogo_url = $document->getDbName() . '.' . $this->baseUrl . $this->basePath;
                    $filesystem->dumpFile("$addPath/{$document->getDbName()}", "$newCustomDomain $gogo_url $this->contactEmail");
                }
            }
        }
    }

    private function updateSearchIndex($db, $oldPrivateProperties, $newPrivateProperties,
                                       $oldFormFields, $newFormFields) {
        $oldSearchIndex = $this->calculateSearchIndexConfig($oldPrivateProperties, $oldFormFields);
        $newSearchIndex = $this->calculateSearchIndexConfig($newPrivateProperties, $newFormFields);

        if ($oldSearchIndex != $newSearchIndex) {
            $command = 'db.Element.dropIndex("name_text");'; // Default index created by doctrine
            $command .= 'db.Element.dropIndex("search_index");';
            $command .= "db.Element.createIndex( {$newSearchIndex["fields"]}, { name: \"search_index\", default_language: \"french\", weights: {$newSearchIndex["weights"]} });";

            $process = Process::fromShellCommandline("mongo {$db} --eval '{$command}'");
            $process->run();
        }
    }

    private function calculateSearchIndexConfig($privateProps, $formFieldsJson) {
        $indexConf = [];
        $indexWeight = [];
        $formFields = json_decode($formFieldsJson);
        foreach ($formFields as $key => $field) {
            if (property_exists($field, 'search') && $field->search) {
                $path = in_array($field->name, $privateProps) ? 'privateData' : 'data';
                $path .= '.' . $field->name;
                if ($field->name == 'name') $path = 'name';
                $indexConf[$path] = "text";
                $indexWeight[$path] = (int) $field->searchWeight;
            }
        }
        // default index on name
        if (count($indexConf) == 0) {
            $indexConf = ['name' => 'text'];
            $indexWeight = ['name' => 1];
        }
        return ['fields' => json_encode($indexConf), 'weights' => json_encode($indexWeight)];
    }
}
