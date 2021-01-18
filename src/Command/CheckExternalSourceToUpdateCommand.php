<?php

namespace App\Command;

use App\Document\ImportState;
use App\Services\ElementImportService;
use Doctrine\ODM\MongoDB\DocumentManager;
use App\Services\DocumentManagerFactory;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CheckExternalSourceToUpdateCommand extends GoGoAbstractCommand
{
    public function __construct(DocumentManagerFactory $dm, LoggerInterface $commandsLogger,
                               TokenStorageInterface $security,
                               ElementImportService $importService)
    {
        $this->importService = $importService;
        parent::__construct($dm, $commandsLogger, $security);
    }

    protected function gogoConfigure(): void
    {
        $this
        ->setName('app:elements:checkExternalSourceToUpdate')
        ->setDescription('Check for updating external sources');
    }

    protected function gogoExecute(DocumentManager $dm, InputInterface $input, OutputInterface $output): void
    {
        $qb = $dm->query('ImportDynamic');

        $dynamicImports = $qb->field('refreshFrequencyInDays')->gt(0)
                ->field('nextRefresh')->lte(new \DateTime())
                ->execute();
        if ($count = $dynamicImports->count() > 0) {
            $this->log("CheckExternalSourceToUpdate : Nombre de sources à mettre à jour : $count");

            foreach ($dynamicImports as $import) {
                $this->log('Updating source : '.$import->getSourceName());
                try {
                    $this->log($this->importService->startImport($import));
                } catch (\Exception $e) {
                    $this->dm->persist($import);
                    $import->setCurrState(ImportState::Failed);
                    $message = $e->getMessage().'</br>'.$e->getFile().' LINE '.$e->getLine();
                    $import->setCurrMessage($message);
                    $this->error('Source: '.$import->getSourceName().' - '.$message);
                }
            }
        }
    }
}
