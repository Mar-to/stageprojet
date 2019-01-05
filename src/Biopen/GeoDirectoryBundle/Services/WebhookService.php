<?php

namespace Biopen\GeoDirectoryBundle\Services;

use Biopen\CoreBundle\Document\Webhook;
use Biopen\CoreBundle\Document\WebhookPost;
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
        /** @var Webhook[] $webhooks */
	    $webhooks = $this->em->getRepository('BiopenCoreBundle:Webhook')->findAll();

	    foreach( $webhooks as $webhook ) {
	        $post = new WebhookPost();
            $post->setUrl($webhook->getUrl());
            $post->setData(['text' => 'Hello world']);
            $this->em->persist($post);
        }

	    $this->em->flush();
  }
}
