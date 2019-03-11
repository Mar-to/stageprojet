<?php

namespace Biopen\GeoDirectoryBundle\Services;

use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Security\Core\SecurityContext;
use Biopen\GeoDirectoryBundle\Document\Webhook;
use Biopen\GeoDirectoryBundle\Document\WebhookPost;
use Biopen\GeoDirectoryBundle\Document\WebhookStatus;
use Biopen\GeoDirectoryBundle\Document\UserInteractionContribution;
use Biopen\GeoDirectoryBundle\Document\InteractionType;

/**
* Service used to handle to resolution of pending Elements
**/
class UserInteractionService
{  
   protected $webhooks;
   /**
   * Constructor
   */
   public function __construct(DocumentManager $documentManager, SecurityContext $securityContext)
   {
      $this->em = $documentManager;
      $this->securityContext = $securityContext;
      $this->webhooks = $this->em->getRepository(Webhook::class)->findAll();
   }

   public function createContribution($message, $interactType, $status, $directModerationWithHash = false, $email = null)
   {
      $contribution = new UserInteractionContribution();
      $contribution->setType($interactType);
      $contribution->updateUserInformation($this->securityContext, $email, $directModerationWithHash);
      $contribution->setResolvedMessage($message);
      
      // pending contribution does not have status
      if ($status) {
        $contribution->updateResolvedBy($this->securityContext, null, $directModerationWithHash);      
        $contribution->setStatus($status);
      }
      
      if ($interactType != InteractionType::ModerationResolved)
      {
         foreach ($this->webhooks as $webhook) {
            $post = new WebhookPost();
            $post->setWebhook($webhook);
            $post->setNextAttemptAt(new \DateTime());
            $contribution->addWebhookPost($post);
         }
      }
      return $contribution;
   }
}