<?php

namespace Biopen\GeoDirectoryBundle\Services;

use Doctrine\ODM\MongoDB\DocumentManager;

class WebhookService
{
	protected $em;

	/**
     * Constructor
     */
    public function __construct(DocumentManager $documentManager)
    {
    	 $this->em = $documentManager;
    }

    public function post()
    {
	    $webhooks = $this->em->getRepository('BiopenCoreBundle:Webhook')->findRootCategories();

	    print_r($webhooks);

  }
}
