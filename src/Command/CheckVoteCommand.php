<?php

namespace App\Command;

use App\Services\ElementVoteService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CheckVoteCommand extends GoGoAbstractCommand
{
    public function __construct(DocumentManager $dm, LoggerInterface $commandsLogger,
                               TokenStorageInterface $security,
                               ElementVoteService $voteService)
    {
        $this->voteService = $voteService;
        parent::__construct($dm, $commandsLogger, $security);
    }

    protected function gogoConfigure(): void
    {
        $this
        ->setName('app:elements:checkvote')
        ->setDescription('Check for collaborative vote validation')
    ;
    }

    protected function gogoExecute(DocumentManager $dm, InputInterface $input, OutputInterface $output): void
    {
        $elementRepo = $dm->getRepository('App\Document\Element');
        $elements = $elementRepo->findPendings();

        foreach ($elements as $key => $element) {
            $this->voteService->checkVotes($element);
            $dm->persist($element);
        }

        $dm->flush();

        $output->writeln('Nombre elements checkés : '.count($elements));
    }
}
