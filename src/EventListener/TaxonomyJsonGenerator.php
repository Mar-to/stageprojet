<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-06-18 21:03:01
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-07-08 16:46:11
 */
namespace App\EventListener;

use App\Document\Element;
use App\Document\Taxonomy;
use App\Document\Category;
use App\Document\Option;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use JMS\Serializer\SerializerInterface;
use JMS\Serializer\SerializationContext;

class TaxonomyJsonGenerator
{
	protected $serializer;
  protected $needUpdateTaxonomyOnNextFlush = false;
	/**
	* Constructor
	*/
	public function __construct(SerializerInterface $serializer)
	{
		 $this->serializer = $serializer;
	}

	public function postPersist(\Doctrine\ODM\MongoDB\Event\LifecycleEventArgs $args)
	{
		$document = $args->getDocument();
		$dm = $args->getDocumentManager();

		if ($document instanceof Taxonomy)
		{
      $this->updateTaxonomy($dm);
		}
	}

  public function postUpdate(\Doctrine\ODM\MongoDB\Event\LifecycleEventArgs $eventArgs)
  {
    $document = $eventArgs->getDocument();
    $dm = $eventArgs->getDocumentManager();

    if ($document instanceof Option || $document instanceof  Category)
    {
      $this->updateTaxonomy($dm);
    }
  }

  public function preFlush(\Doctrine\ODM\MongoDB\Event\preFlushEventArgs $eventArgs)
  {
    $dm = $eventArgs->getDocumentManager();

    foreach ($dm->getUnitOfWork()->getScheduledDocumentInsertions() as $document) {
      if ($document instanceof Option || $document instanceof Category) {
        $this->needUpdateTaxonomyOnNextFlush = true;
        return;
      }
    }

    foreach ($dm->getUnitOfWork()->getScheduledDocumentDeletions() as $document) {
      if ($document instanceof Option || $document instanceof Category) {
        $this->needUpdateTaxonomyOnNextFlush = true;
        return;
      }
    }
  }

  public function postFlush(\Doctrine\ODM\MongoDB\Event\PostFlushEventArgs $eventArgs)
  {
    $dm = $eventArgs->getDocumentManager();
    if ($this->needUpdateTaxonomyOnNextFlush)
    {
      $this->needUpdateTaxonomyOnNextFlush = false;
      $this->updateTaxonomy($dm);
    }
  }

	public function updateTaxonomy($dm)
	{
    $taxonomy = $dm->getRepository('App\Document\Taxonomy')->findTaxonomy();
		if (!$taxonomy || $taxonomy->preventUpdate) return false;
    $taxonomy->preventUpdate = true;

		$rootCategories = $dm->getRepository('App\Document\Category')->findRootCategories();
		$options = $dm->getRepository('App\Document\Option')->findAll();

		if (count($rootCategories) == 0) {
      $optionsJson = "[]";
      $taxonomyJson = "[]";
    }
    else
    {
      // Create hierachic taxonomy
      $rootCategoriesSerialized = [];
      foreach ($rootCategories as $key => $rootCategory)
      {
        $rootCategoriesSerialized[] = $this->serializer->serialize($rootCategory, 'json');
      }
      $taxonomyJson = '[' . implode(", ", $rootCategoriesSerialized) . ']';

      // Create flatten option list
      $optionsSerialized = [];
      foreach ($options as $key => $option)
      {
        $optionsSerialized[] = $this->serializer->serialize($option, 'json', SerializationContext::create()->setGroups(['semantic']));
      }
      $optionsJson = '[' . implode(", ", $optionsSerialized) . ']';
    }
    $taxonomy->setTaxonomyJson($taxonomyJson);
		$taxonomy->setOptionsJson($optionsJson);
    $dm->flush();
	}
}