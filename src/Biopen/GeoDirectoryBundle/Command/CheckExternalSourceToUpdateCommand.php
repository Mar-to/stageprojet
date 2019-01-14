<?php
namespace Biopen\GeoDirectoryBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

use Biopen\GeoDirectoryBundle\Document\ElementStatus;

use Biopen\SaasBundle\Command\GoGoAbstractCommand;

class CheckExternalSourceToUpdateCommand extends GoGoAbstractCommand
{
    protected function gogoConfigure()
    {
       $this
        ->setName('app:elements:checkExternalSourceToUpdate')
        ->setDescription('Check for updating external sources');
    }

    protected function gogoExecute($em, InputInterface $input, OutputInterface $output)
    {      
      $qb = $em->createQueryBuilder('BiopenGeoDirectoryBundle:ImportDynamic');
      
      $dynamicImports = $qb->field('refreshFrequencyInDays')->gt(0)               
                ->field('nextRefresh')->lte(new \DateTime())
                ->getQuery()->execute();
      $importService = $this->getContainer()->get('biopen.element_import');

      $this->log('CheckExternalSourceToUpdate : Nombre de sources à mettre à jour : ' . $dynamicImports->count());

      foreach ($dynamicImports as $key => $import)
      { 
        $this->log('Updating source : ' . $import->getSource()->getName());
        $this->log($importService->importJson($source));        
      }      
    }
}