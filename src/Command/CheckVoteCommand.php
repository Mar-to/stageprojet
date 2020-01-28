<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

use App\Document\ElementStatus;

use App\Command\GoGoAbstractCommand;

class CheckVoteCommand extends GoGoAbstractCommand
{
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

      $voteService = $this->getContainer()->get('gogo.element_vote_service');

      foreach ($elements as $key => $element)
      {
          $voteService->checkVotes($element);
          $dm->persist($element);
      }

      $dm->flush();

      $output->writeln('Nombre elements checkés : ' . count($elements));
    }
}