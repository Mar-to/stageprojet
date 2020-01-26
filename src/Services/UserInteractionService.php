<?php

namespace App\Services;

use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Security\Core\Security;
use App\Document\Webhook;
use App\Document\WebhookPost;
use App\Document\UserInteractionContribution;
use App\Document\ElementStatus;


/**
* Service used to handle to resolution of pending Elements
**/
class UserInteractionService
{
   protected $webhooks;
   /**
   * Constructor
   */
   public function __construct(DocumentManager $documentManager, $securityContext)
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

      // Create webhook posts to be dispatched
      // for Pending contributions, we will wait for the status to be set (i.e. contribution is resolved) before dipatching those events
      if ($interactType != 6) // 6 = InteractionType::ModerationResolved
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

   public function resolveContribution($element, $isAccepted, $validationType, $message)
   {
      $contribution = $element->getCurrContribution();
      if (!$contribution) return;
      if (!$isAccepted) $contribution->clearWebhookPosts();

      if ($validationType == 2) // 2 = ValidationType::Admin
      {
         $contribution->setResolvedMessage($message);
         $contribution->updateResolvedby($this->securityContext);
         $contribution->setStatus($isAccepted ? ElementStatus::AdminValidate : ElementStatus::AdminRefused);
      }
      else
      {
         $text = $isAccepted ? 'Cette contribution a été approuvée le processus de modération collaborative' : 'Cette contribution a été refusée par le processus de modération collaborative';
         $contribution->setResolvedMessage($text);
         $contribution->setResolvedby("Collaborative process");
         $contribution->setStatus($isAccepted ? ElementStatus::CollaborativeValidate : ElementStatus::CollaborativeRefused);
      }
   }
}