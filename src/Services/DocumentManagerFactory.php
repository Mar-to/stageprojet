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
    private $currentDocumentManager;

    /* name of the root database */
    private $rootDB;
    /**
     * All DocumentManagers created by Factory so far.
     *
     * @var DocumentManager[]
     */
    private $instances = array();

    public function __construct(DocumentManager $dm, $rootDB)
    {
        $this->currentDocumentManager = $dm;
        $this->rootDB = $rootDB;
    }

    public function createForDB(String $databaseName)
    {
        if (isset($this->instances[$databaseName])) {
            return $this->instances[$databaseName];
        }
        $configuration = clone $this->currentDocumentManager->getConfiguration();
        $newDm = DocumentManager::create(
            $this->currentDocumentManager->getConnection(),
            $configuration,
            $this->currentDocumentManager->getEventManager()
        );
        $newDm->getConfiguration()->setDefaultDB($databaseName);
        return $this->instances[$databaseName] = $newDm;
    }

    // In SAAS Mode, it get the document manager of the root project
    public function getRootManager()
    {
        return $this->createForDB($this->rootDB);
    }

    public function getCurrentManager()
    {
        return $this->currentDocumentManager;
    }

    public function getCurrentDbName()
    {
        return $this->getCurrentManager()->getConfiguration()->getDefaultDB();
    }

    public function isRootProject()
    {
        return $this->getCurrentDbName() == $this->rootDB;
    }
}