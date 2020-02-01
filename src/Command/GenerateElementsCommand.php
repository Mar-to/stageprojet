<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

use App\Command\GoGoAbstractCommand;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use App\Services\RandomCreationService;

class GenerateElementsCommand extends GoGoAbstractCommand
{
    public function __construct(DocumentManager $dm, LoggerInterface $commandsLogger,
                               TokenStorageInterface $security,
                               RandomCreationService $randomService)
    {
        $this->randomService = $randomService;
        parent::__construct($dm, $commandsLogger, $security);
    }

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

    protected function gogoExecute($dm, InputInterface $input, OutputInterface $output)
    {
      $this->output = $output;

      $randomService->generate($input->getArgument('number'), $input->getArgument('generateVotes'));

      $this->log('Element générés !');
    }
}