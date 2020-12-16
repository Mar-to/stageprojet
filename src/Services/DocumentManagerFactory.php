<?php

namespace App\Services;

use Doctrine\ODM\MongoDB\DocumentManager;

class DocumentManagerFactory
{
    /**
     * DocumentManager created by Symfony.
     *
     * @var DocumentManager
     */
    private $defaultDocumentManager;

    /**
     * All DocumentManagers created by Factory so far.
     *
     * @var DocumentManager[]
     */
    private $instances = array();

    public function __construct(DocumentManager $dm)
    {
        $this->defaultDocumentManager = $dm;
    }

    public function createForDB(String $databaseName)
    {
        if (isset($this->instances[$databaseName])) {
            return $this->instances[$databaseName];
        }
        $configuration = clone $this->defaultDocumentManager->getConfiguration();
        $newDm = DocumentManager::create(
            $this->defaultDocumentManager->getConnection(),
            $configuration,
            $this->defaultDocumentManager->getEventManager()
        );
        $newDm->getConfiguration()->setDefaultDB($databaseName);
        return $this->instances[$databaseName] = $newDm;
    }

    public function getDefaultManager()
    {
        return $this->defaultDocumentManager;
    }
}