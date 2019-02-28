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
	

	public function preRemove(\Doctrine\ODM\MongoDB\Event\LifecycleEventArgs $args)
	{
		$document = $args->getDocument();
		$dm = $args->getDocumentManager();
		if ($document instanceof Option)
		{
			$option = $document;
			$qb = $dm->getRepository('BiopenGeoDirectoryBundle:Element')->createQueryBuilder();
      $elements = $qb->field('optionValues.optionId')->in([$option->getId()])->getQuery()->execute();
      if ($elements->count() > 0)
      {
	      $i = 0;
	      foreach ($elements as $element) {      	
	        $optionsValues = $element->getOptionValues()->toArray();               
	        $optionValueToBeRemoved = array_filter($optionsValues, function($oV) use($option){ return $oV->getOptionId() == $option->getId(); });
	        $optionValue = array_values($optionValueToBeRemoved)[0];
	        $element->removeOptionValue($optionValue);

	        if ((++$i % 50) == 0) {
	          $dm->flush();
	          $dm->clear();
	        }
	      }

	      $dm->flush();
	      $dm->clear();
	    }
		}
		else if ($document instanceof Group)
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
}