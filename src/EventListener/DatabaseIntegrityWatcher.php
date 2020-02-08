<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-06-18 21:03:01
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-07-08 16:46:11
 */

namespace App\EventListener;

use App\Application\Sonata\UserBundle\Document\Group;
use App\Document\Element;
use App\Document\Import;
use App\Document\ImportDynamic;
use App\Document\Option;
use App\Document\Webhook;
use App\Services\AsyncService;

/* check database integrity : for example when removing an option, need to remove all references to this options */
class DatabaseIntegrityWatcher
{
    protected $asyncService;

    public function __construct(AsyncService $asyncService)
    {
        $this->asyncService = $asyncService;
    }

    // use post remove instead?
    public function preRemove(\Doctrine\ODM\MongoDB\Event\LifecycleEventArgs $args)
    {
        $document = $args->getDocument();
        $dm = $args->getDocumentManager();
        if ($document instanceof Group) {
            $group = $document;
            $qb = $dm->getRepository('App\Document\User')->createQueryBuilder();
            $users = $qb->field('groups.id')->in([$group->getId()])->getQuery()->execute();
            if ($users->count() > 0) {
                $i = 0;
                foreach ($users as $user) {
                    $user->removeGroup($group);
                }
            }
        } elseif ($document instanceof Import || $document instanceof ImportDynamic) {
            $import = $document;
            $qb = $dm->getRepository('App\Document\Element')->createQueryBuilder();
            $elements = $qb->remove()->field('source')->references($import)->getQuery()->execute();
        } elseif ($document instanceof Webhook) {
            $webhook = $document;
            $contributions = $dm->createQueryBuilder('App\Document\UserInteractionContribution')
      ->field('webhookPosts.webhook.$id')->equals($webhook->getId())
      ->getQuery()->execute();

            foreach ($contributions as $contrib) {
                $contrib->getElement()->setPreventJsonUpdate(true);
                foreach ($contrib->getWebhookPosts() as $post) {
                    if ($post->getWebhook()->getId() == $webhook->getId()) {
                        $contrib->removeWebhookPost($post);
                    }
                }
            }
        }
    }

    public function preUpdate(\Doctrine\ODM\MongoDB\Event\LifecycleEventArgs $args)
    {
        $document = $args->getDocument();
        $dm = $args->getDocumentManager();

        // When changing the name of one Option, we need to update json representation of every element
        // using this option
        if ($document instanceof Option) {
            $uow = $dm->getUnitOfWork();
            $uow->computeChangeSets();
            $changeset = $uow->getDocumentChangeSet($document);
            if (array_key_exists('name', $changeset)) {
                $query = $dm->createQueryBuilder('App\Document\Element')->field('optionValues.optionId')->in([$document->getId()]);
                $elementIds = array_keys($query->select('id')->hydrate(false)->getQuery()->execute()->toArray());
                if (count($elementIds)) {
                    $elementIdsString = '"'.implode(',', $elementIds).'"';
                    $this->asyncService->callCommand('app:elements:updateJson', ['ids' => $elementIdsString]);
                }
            }
        }
    }

    public function preFlush(\Doctrine\ODM\MongoDB\Event\PreFlushEventArgs $eventArgs)
    {
        $dm = $eventArgs->getDocumentManager();
        $optionsDeleted = array_filter($dm->getUnitOfWork()->getScheduledDocumentDeletions(), function ($doc) { return $doc instanceof Option; });
        if (0 == count($optionsDeleted)) {
            return;
        }

        $optionsIdDeleted = array_map(function ($option) { return $option->getId(); }, $optionsDeleted);
        $this->asyncService->callCommand('app:elements:removeOptions', ['ids' => implode($optionsIdDeleted, ',')]);
    }
}
