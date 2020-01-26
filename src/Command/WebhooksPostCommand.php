<?php

namespace App\Command;

use App\Services\WebhookService;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use App\Command\GoGoAbstractCommand;

class WebhooksPostCommand extends GoGoAbstractCommand
{
    protected function gogoConfigure()
    {
       $this
        ->setName('app:webhooks:post')
        ->setDescription('Post the queued data to the given webhooks');
    }

    protected function gogoExecute($em, InputInterface $input, OutputInterface $output)
    {
        /** @var WebhookService $webhookService */
        $webhookService = $this->getContainer()->get('biopen.webhook_service');

        $numPosts = $webhookService->processPosts(10);

        $this->log('Nombre webhooks traités : ' . $numPosts);
    }
}