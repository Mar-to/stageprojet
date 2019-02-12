<?php
namespace Biopen\GeoDirectoryBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use Biopen\GeoDirectoryBundle\Document\ImportState;
use Biopen\GeoDirectoryBundle\Document\ElementStatus;

use Biopen\SaasBundle\Command\GoGoAbstractCommand;

class ImportSourceCommand extends GoGoAbstractCommand
{
    protected function gogoConfigure()
    {
       $this
        ->setName('app:elements:importSource')
        ->setDescription('Check for updating external sources')
        ->addArgument('sourceNameOrImportId', InputArgument::REQUIRED, 'The name of the source');
    }

    protected function gogoExecute($em, InputInterface $input, OutputInterface $output)
    {
      try {
        $this->output = $output;
        $sourceNameOrId = $input->getArgument('sourceNameOrImportId');
        $import = $em->getRepository('BiopenGeoDirectoryBundle:ImportDynamic')->find($sourceNameOrId);
        if (!$import) $import = $em->getRepository('BiopenGeoDirectoryBundle:ImportDynamic')->findOneBySourceName($sourceNameOrId); 
        if (!$import) 
        {
          $message = "ERREUR pendant l'import : Aucune source avec pour nom ou id " . $input->getArgument('sourceNameOrImportId') . " n'existe dans la base de donnée " . $input->getArgument('dbname');
          $this->error($message);
          return;
        }
        
        $this->log('Updating source ' . $import->getSourceName() . ' for project ' . $input->getArgument('dbname') . ' begins...');
        $importService = $this->getContainer()->get('biopen.element_import');
        $result = $importService->startImport($import);
        $this->log($result);
      } catch (\Exception $e) {     
          $this->odm->persist($import);
          $import->setCurrState(ImportState::Failed);
          $import->setCurrMessage($e->getMessage());     
          $this->error("Source: " . $import->getSourceName() . " - " . $e->getMessage());
      }
    }
      
}