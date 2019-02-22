<?php

namespace Biopen\GeoDirectoryBundle\EventListener;

use Biopen\GeoDirectoryBundle\Document\Element;
use Biopen\GeoDirectoryBundle\Document\ElementStatus;
use Biopen\GeoDirectoryBundle\Services\WebhookService;
use Doctrine\ODM\MongoDB\Event\LifecycleEventArgs;

class WebhookListener
{
    protected $webhookService;

    public function __construct(WebhookService $webhookService)
    {
        $this->webhookService = $webhookService;
    }

    public function postPersist(LifecycleEventArgs $args)
    {
        $document = $args->getDocument();

        if ($document instanceof Element)
        {
            // Only call webhooks if the element added is immediately visible
            if( $document->isVisible() ) {
                $this->webhookService->queue('add', $document);
            }
        }
    }

    public function postUpdate(LifecycleEventArgs $args)
    {
        $document = $args->getDocument();

        if ($document instanceof Element)
        {
            $uow = $args->getDocumentManager()->getUnitOfWork();
            $changeSet = $uow->getDocumentChangeSet($document);

            // We check if the status is in the changeSet AND if there was a previous status
            // (On addition, postPersist and postUpdate are both called so this avoids a duplicate)
            if( isset($changeSet['status']) && isset($changeSet['status'][0]) ) {
                if( $changeSet['status'][0] < ElementStatus::PendingModification && $changeSet['status'][1] >= ElementStatus::PendingModification ) {
                    // Call webhooks if the element was hidden and is now visible
                    $this->webhookService->queue('add', $document);
                } else if( $changeSet['status'][0] >= ElementStatus::PendingModification && $changeSet['status'][1] < ElementStatus::PendingModification ) {
                    // Call webhooks if the element was visible and is now hidden
                    $this->webhookService->queue('delete', $document);
                }
            } else {
                // We don't queue edit actions yet because postUpdate is called thousands of times on user addition (?)
                // $this->webhookService->queue('edit', $document);
            }
        }
    }

    public function postRemove(LifecycleEventArgs $args)
    {
        $document = $args->getDocument();

        if ($document instanceof Element)
        {
            // Only call webhooks if the element removed was visible
            if( $document->isVisible() ) {
                $this->webhookService->queue('delete', $document);
            }
        }
    }
}