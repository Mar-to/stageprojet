<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

use App\Command\GoGoAbstractCommand;

class GenerateElementsCommand extends GoGoAbstractCommand
{
    protected function gogoConfigure()
    {
       $this
        ->setName('app:elements:generate')
        ->setDescription('Generate random elements.')
        ->setHelp('This command allows you generate random elements')
        ->addArgument('number', InputArgument::REQUIRED, 'The number of generated elements')
        ->addArgument('generateVotes', InputArgument::OPTIONAL, 'If we generate somes fake votes')
    ;
    }

    protected function gogoExecute($em, InputInterface $input, OutputInterface $output)
    {
      $this->output = $output;

      $this->getContainer()->get('biopen.random_creation_service')->generate($input->getArgument('number'), $input->getArgument('generateVotes'));

      $this->log('Element générés !');
    }
}