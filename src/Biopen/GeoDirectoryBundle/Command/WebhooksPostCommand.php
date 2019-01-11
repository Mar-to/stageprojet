<?php

namespace Biopen\GeoDirectoryBundle\Command;

use Biopen\GeoDirectoryBundle\Document\WebhookPost;
use Biopen\GeoDirectoryBundle\Repository\WebhookPostRepository;
use Biopen\GeoDirectoryBundle\Services\WebhookService;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Biopen\SaasBundle\Command\GoGoAbstractCommand;

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
        $webhookPostRepo = $em->getRepository(WebhookPost::class);
//        $webhookPosts = $webhookPostRepo->findPendings(5);
//
//        /** @var WebhookService $webhookService */
//        $webhookService = $this->getContainer()->get('biopen.webhook_service');
//
//        $webhookService->callMultiple($webhookPosts);
//
//        $output->writeln('Nombre webhooks traités : ' . count($webhookPosts));

        $output->writeln('Nombre webhooks');
    }
}