<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-06-18 21:03:01
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-07-08 16:46:11
 */
namespace Biopen\GeoDirectoryBundle\EventListener;

use Biopen\GeoDirectoryBundle\Document\Element;
use Application\Sonata\UserBundle\Document\Group;
use Biopen\GeoDirectoryBundle\Document\Option;
use Biopen\GeoDirectoryBundle\Document\ImportDynamic;
use Doctrine\ODM\MongoDB\DocumentManager;

/* check database integrity : for example when removing an option, need to remove all references to this options */
class DatabaseIntegrityWatcher
{
	protected $asyncService;

	public function __construct($asyncService) 
	{
		$this->asyncService = $asyncService;
	}
	
	// use post remove instead?
	public function preRemove(\Doctrine\ODM\MongoDB\Event\LifecycleEventArgs $args)
	{
		$document = $args->getDocument();
		$dm = $args->getDocumentManager();
		if ($document instanceof Group)
		{
			$group = $document;
			$qb = $dm->getRepository('BiopenCoreBundle:User')->createQueryBuilder();
      $users = $qb->field('groups.id')->in([$group->getId()])->getQuery()->execute();
      if ($users->count() > 0)
      {
	      $i = 0;
	      foreach ($users as $user) {   	      
	        $user->removeGroup($group);
	      }
	    }
		}
		else if ($document instanceof ImportDynamic)
		{
			$import = $document;
			$qb = $dm->getRepository('BiopenGeoDirectoryBundle:Element')->createQueryBuilder();
      $elements = $qb->remove()->field('source')->references($import)->getQuery()->execute();
		}
	}

	public function preFlush(\Doctrine\ODM\MongoDB\Event\PreFlushEventArgs $eventArgs) 
	{
		$dm = $eventArgs->getDocumentManager();
		$optionsDeleted = array_filter($dm->getUnitOfWork()->getScheduledDocumentDeletions(), function($doc) { return $doc instanceof Option; });	
		if (count($optionsDeleted) == 0) return;
		
		$optionsIdDeleted = array_map(function($option) { return $option->getId(); }, $optionsDeleted);
		$this->asyncService->callCommand('app:elements:removeOptions', ['ids' => implode($optionsIdDeleted, ',')]);
	}
}