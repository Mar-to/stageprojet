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
use Twig\Environment;

class MonitoringElementsBlockService extends AbstractBlockService
{
	protected $dm;

	public function __construct(Environment $twig, DocumentManager $dm)
	{
		$this->dm = $dm;
    parent::__construct($twig);
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
	    $pendings = $this->dm->getRepository('App\Document\Element')->findPendings(true);
	    $moderationNeeded = $this->dm->getRepository('App\Document\Element')->findModerationNeeded(true);
	    $validateElements = $this->dm->getRepository('App\Document\Element')->findValidated(true);
	    $allVisibleElements = $this->dm->getRepository('App\Document\Element')->findVisibles(true, false);
	    $visibleNonImportedElements = $this->dm->getRepository('App\Document\Element')->findVisibles(true, true);
	    $activeUsersCount = $this->dm->createQueryBuilder('App\Document\User')->field('enabled')->equals(true)->count()->getQuery()->execute();
	    $activeUsersNewsletterCount = $this->dm->createQueryBuilder('App\Document\User')->field('enabled')->equals(true)
	    																				->field('newsletterFrequency')->gt(NewsletterFrequencyOptions::Never)->count()->getQuery()->execute();

	    $errors = $this->dm->getRepository('App\Document\GoGoLog')->findBy(['level' => 'error', 'hidden' => false]);
      usort( $errors, function ($a, $b) { return $b->getCreatedAt()->getTimestamp() - $a->getCreatedAt()->getTimestamp(); });

      $messages = $this->dm->getRepository('App\Document\GoGoLog')->findBy(['type' => 'update', 'hidden' => false]);
      usort( $errors, function ($a, $b) { return $b->getCreatedAt()->getTimestamp() - $a->getCreatedAt()->getTimestamp(); });

	    // merge settings
	    $settings = $blockContext->getSettings();
	    return $this->renderResponse('admin/blocks/block_monitoring.html.twig', array(
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