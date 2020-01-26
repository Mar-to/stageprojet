<?php

namespace App\Block;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use App\Document\ElementStatus;
use App\Document\NewsletterFrequencyOptions;

use Sonata\BlockBundle\Model\BlockInterface;
use Sonata\BlockBundle\Block\BlockContextInterface;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\CoreBundle\Validator\ErrorElement;
use Sonata\BlockBundle\Block\Service\AbstractBlockService;

use Doctrine\ODM\MongoDB\DocumentManager;

class MonitoringElementsBlockService extends AbstractBlockService
{
	protected $em;

	public function __construct($templating, DocumentManager $documentManager)
	{
		 $this->em = $documentManager;
       $this->templating = $templating;
	}

	public function getName()
	{
	  return 'Monitoring';
	}

	public function getDefaultSettings()
	{
	  return array();
	}

	public function validateBlock(ErrorElement $errorElement, BlockInterface $block)
	{
	}

	public function buildEditForm(FormMapper $formMapper, BlockInterface $block)
	{
	}

	public function execute(BlockContextInterface $blockContext, Response $response = null)
	{
	    $pendings = $this->em->getRepository('BiopenGeoDirectoryBundle:Element')->findPendings(true);
	    $moderationNeeded = $this->em->getRepository('BiopenGeoDirectoryBundle:Element')->findModerationNeeded(true);
	    $validateElements = $this->em->getRepository('BiopenGeoDirectoryBundle:Element')->findValidated(true);
	    $allVisibleElements = $this->em->getRepository('BiopenGeoDirectoryBundle:Element')->findVisibles(true, false);
	    $visibleNonImportedElements = $this->em->getRepository('BiopenGeoDirectoryBundle:Element')->findVisibles(true, true);
	    $activeUsersCount = $this->em->createQueryBuilder('BiopenCoreBundle:User')->field('enabled')->equals(true)->count()->getQuery()->execute();
	    $activeUsersNewsletterCount = $this->em->createQueryBuilder('BiopenCoreBundle:User')->field('enabled')->equals(true)
	    																				->field('newsletterFrequency')->gt(NewsletterFrequencyOptions::Never)->count()->getQuery()->execute();

	    $errors = $this->em->getRepository('BiopenCoreBundle:GoGoLog')->findBy(['level' => 'error', 'hidden' => false]);
      usort( $errors, function ($a, $b) { return $b->getCreatedAt()->getTimestamp() - $a->getCreatedAt()->getTimestamp(); });

      $messages = $this->em->getRepository('BiopenCoreBundle:GoGoLog')->findBy(['type' => 'update', 'hidden' => false]);
      usort( $errors, function ($a, $b) { return $b->getCreatedAt()->getTimestamp() - $a->getCreatedAt()->getTimestamp(); });

	    // merge settings
	    $settings = $blockContext->getSettings();

	    return $this->renderResponse('@BiopenAdmin/blocks/block_monitoring.html.twig', array(
	        'block'     => $blockContext->getBlock(),
	        'settings'  => $settings,
	        'pendingCount' => $pendings,
	        'moderationNeededCount' => $moderationNeeded,
	        'validatesCount' => $validateElements,
	        'allVisibleCount' => $allVisibleElements,
	        'visibleNonImportedCount' => $visibleNonImportedElements,
	        'activeUsersCount' => $activeUsersCount,
	        'activeUsersNewsletterCount' => $activeUsersNewsletterCount,
	        'errors' => $errors,
	        'messages' => $messages
	    ), $response);
	}
}