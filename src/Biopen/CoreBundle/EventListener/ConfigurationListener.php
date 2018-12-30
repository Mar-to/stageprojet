<?php
namespace Biopen\CoreBundle\EventListener;

use Biopen\CoreBundle\Document\Configuration\ConfigurationApi;

class ConfigurationListener
{
    protected $asyncService;
    
    public function __construct($asyncService) {
        $this->asyncService = $asyncService;
    }

    public function preUpdate(\Doctrine\ODM\MongoDB\Event\LifecycleEventArgs $args)
    {
        $document = $args->getDocument();
        $dm = $args->getDocumentManager();

        // Change the database to fit the private property config
        // There is two attribute in element : data & privateData
        // If an custom field is private, it will be stored in privateData instead of data
        if ($document instanceof ConfigurationApi) {
            $uow = $dm->getUnitOfWork();
            $uow->computeChangeSets();
            $changeset = $uow->getDocumentChangeSet($document); 
            if (array_key_exists("publicApiPrivateProperties", $changeset)) {
                $privatePropChanged = $changeset['publicApiPrivateProperties'];
                $oldPrivateProperties = $privatePropChanged[0] ? array_values($privatePropChanged[0]) : [];
                $newPrivateProperties = $privatePropChanged[1] ? array_values($privatePropChanged[1]) : [];
                $removedProps = array_diff($oldPrivateProperties, $newPrivateProperties);
                $addedProps = array_diff($newPrivateProperties, $oldPrivateProperties);

                $qb = $dm->createQueryBuilder('BiopenGeoDirectoryBundle:Element');
                $qb = $qb->updateMany();
                foreach ($removedProps as $key => $prop) {
                  $qb = $qb->field('privateData.' . $prop)->rename('data.' . $prop);
                }
                foreach ($addedProps as $key => $prop) {
                  $qb = $qb->field('data.' . $prop)->rename('privateData.' . $prop);
                }
                 
                $qb->getQuery()->execute();

                $this->asyncService->callCommand('app:elements:updateJson', []);
            }
        }
    }
}
