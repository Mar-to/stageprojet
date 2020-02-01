<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use App\Document\ElementStatus;
use App\Command\GoGoAbstractCommand;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use App\Services\ElementVoteService;

class CheckVoteCommand extends GoGoAbstractCommand
{
   public function __construct(DocumentManager $dm, LoggerInterface $commandsLogger,
                               TokenStorageInterface $security,
                               ElementVoteService $voteService)
   {
      $this->voteService = $voteService;
      parent::__construct($dm, $commandsLogger, $security);
   }

    protected function gogoConfigure()
    {
       $this
        ->setName('app:elements:checkvote')
        ->setDescription('Check for collaborative vote validation')
    ;
    }

    protected function gogoExecute($dm, InputInterface $input, OutputInterface $output)
    {
      $elementRepo = $dm->getRepository('App\Document\Element');
      $elements = $elementRepo->findPendings();

      foreach ($elements as $key => $element)
      {
          $this->voteService->checkVotes($element);
          $dm->persist($element);
      }

      $dm->flush();

      $output->writeln('Nombre elements checkés : ' . count($elements));
    }
}