<?php

namespace App\Command;

use App\Services\WebhookService;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use App\Command\GoGoAbstractCommand;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class WebhooksPostCommand extends GoGoAbstractCommand
{
    public function __construct(DocumentManager $dm, LoggerInterface $commandsLogger,
                               TokenStorageInterface $security,
                               WebhookService $webhookService)
    {
        $this->webhookService = $webhookService;
        parent::__construct($dm, $commandsLogger, $security);
    }

    protected function gogoConfigure()
    {
       $this
        ->setName('app:webhooks:post')
        ->setDescription('Post the queued data to the given webhooks');
    }

    protected function gogoExecute($dm, InputInterface $input, OutputInterface $output)
    {
        $numPosts = $this->webhookService->processPosts(10);

        $this->log('Nombre webhooks traités : ' . $numPosts);
    }
}