<?php

namespace Biopen\GeoDirectoryBundle\Services;

use Biopen\CoreBundle\Document\Configuration;
use Biopen\CoreBundle\Document\ConfImage;
use Biopen\CoreBundle\Document\User;
use Biopen\GeoDirectoryBundle\Document\Webhook;
use Biopen\GeoDirectoryBundle\Document\WebhookAction;
use Biopen\GeoDirectoryBundle\Document\WebhookFormat;
use Biopen\GeoDirectoryBundle\Document\WebhookPost;
use Biopen\GeoDirectoryBundle\Document\Element;
use Doctrine\ODM\MongoDB\DocumentManager;
use GuzzleHttp\Client;
use GuzzleHttp\Pool;
use GuzzleHttp\Psr7\Response;
use http\Exception\InvalidArgumentException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Router;
use Symfony\Component\Security\Core\SecurityContext;
use Biopen\GeoDirectoryBundle\Document\UserInteractionContribution;

class WebhookService
{
	protected $em;

	protected $router;

    public function __construct(DocumentManager $documentManager, Router $router, SecurityContext $securityContext, $baseUrl, $basePath)
    {
    	 $this->em = $documentManager;
    	 $this->router = $router;
         $this->securityContext = $securityContext;
         $this->baseUrl = 'http://' . $baseUrl . $basePath;
         $this->config = $this->em->getRepository(Configuration::class)->findConfiguration();
    }

    public function queue($actionType, Element $element)
    {
        $webhooks = $this->em->getRepository(Webhook::class)->findAll();

        $user = $this->securityContext->getToken()->getUser();
        $userDisplayName = is_string($user) ? $user : $user->getDisplayName();

        foreach( $webhooks as $webhook ) {
            $post = new WebhookPost();
            $post->setUrl($webhook->getUrl());
            $post->setData();
            $this->em->persist($post);
        }
    }

    /**
     * @param WebhookPost[] $webhookPosts
     */
    public function processPosts()
    {
        $contribution = $this->em->createQueryBuilder(UserInteractionContribution::class)
        ->field('status')->exists(true)
        ->field('webhookDispatchStatus')->in(['pending', 'partially_failed'])
        ->field('webhookPosts.nextAttemptAt')->lte(new \DateTime())        
        ->getQuery()->getSingleResult();

        if (!$contribution) return;

        $client = new Client();
        $postsToProceed = [];

        $element = $contribution->getElements()->first();

        $mappingType = ['-1' => 'delete', 0 => 'add', 1 => 'edit', 4 => 'add', 5 => 'add'];
        $data = [
            'action' => $mappingType[$contribution->getType()],
            'user' => $contribution->getUserDisplayName(),
            'link' => str_replace('%23', '#', $this->router->generate('biopen_directory_showElement', array('id'=>$element->getId()), true)),
            'data' => json_decode($element->getBaseJson(), true)
        ];
        $data['text'] = $this->getNotificationText($data);

        foreach($contribution->getWebhookPosts() as $webhookPost) {
            if (!$webhookPost->getStatus()) {
                $webhook = $webhookPost->getWebhook();
                $webhookPost->setUrl($webhook->getUrl());                   
                $jsonData = json_encode($this->formatData($webhook->getFormat(), $data));
                $webhookPost->setData($jsonData);
                $postsToProceed[] = $webhookPost;
            }                    
        }        

        $requests = function() use($client, $postsToProceed) {
            foreach($postsToProceed as $post) yield new \GuzzleHttp\Psr7\Request('POST', $post->getUrl() , [], $post->getData() );
        };        

        $pool = new Pool($client, $requests(), [
            'concurrency' => 5,
            'fulfilled' => function (Response $response, $index) use ($postsToProceed) {
                $post = $postsToProceed[$index];
                $post->setDispatched(true);
                $post->setNextAttemptAt(new \DateTime('3000-01-01'));
            },
            'rejected' => function ($reason, $index) use ($postsToProceed, $contribution) {
                $post = $postsToProceed[$index];
                $attemps = $post->incrementNumAttempts();
                if ($attemps < 6) {
                    // After first try, wait 5m, 25m, 2h, 10h, 2d 
                    $intervalInMinutes = pow(5, $attemps); 
                    $interval = new \DateInterval("PT{$intervalInMinutes}M"); 
                    $now = new \DateTime();
                    $post->setNextAttemptAt($now->add($interval));
                } else {                    
                    $post->setStatus('failed');
                    $post->setNextAttemptAt(new \DateTime('3000-01-01'));
                    $webhooks = $contribution->getWebhookPosts()->toArray();
                    $failedCount = count(array_filter($webhooks, function($post) { return $post->getStatus() == 'failed'; }));

                    if ($failedCount == count($webhooks)) 
                        $contribution->setWebhookDispatchStatus('failed');
                    else
                        $contribution->setWebhookDispatchStatus('partially_failed');
                }                
            },
        ]);

        // Initiate the transfers and create a promise
        $promise = $pool->promise();
        // Force the pool of requests to complete.
        $promise->wait();

        // the Element lodaded through UserInteraction association is no fully loaded and there is problems while saving this element 
        // detach opration does not work, so we load it again properly
        $this->em->refresh($element);
        $element->setPreventJsonUpdate(true);

        $this->em->flush();

        return( count($postsToProceed) );
    }

    private function getNotificationText($data)
    {
        $element = $this->config->getElementDisplayName();
        switch($data['action']) {
            case 'add':
                return "**AJOUT** Acteur **{$data['data']['name']}** ajouté par {$data['user']}\n{$data['link']}";
            case 'edit':
                return "**MODIFICATION** Acteur **{$data['data']['name']}** mis à jour par *{$data['user']}*\n{$data['link']}";
            case 'delete':
                return "**SUPPRESSION** Acteur **{$data['data']['name']}** supprimé par *{$data['user']}*";
            default:
                throw new InvalidArgumentException(sprintf('The webhook action "%s" is invalid.', $data['action']));
        }
    }

    private function getBotIcon()
    {       
        /** @var ConfImage $img */
        $img = $this->config->getFavicon() ? $this->config->getFavicon() : $this->config->getLogo();

        return $img
            ? $img->getImageUrl('128x128', 'png')
            : str_replace('app_dev.php/', '', $this->baseUrl . '/assets/img/default-icon.png');
    }

    private function formatData($format, $data)
    {
        switch($format) {
            case WebhookFormat::Raw:
                return $data;

            case WebhookFormat::Mattermost:
                return [
                    "username" => $this->config->getAppName(),
                    "icon_url" => $this->getBotIcon(),
                    "text" => $data['text']
                ];

            case WebhookFormat::Slack:
                return ["text" => $data['text']];

            default:
                throw new InvalidArgumentException(sprintf('The webhook format "%s" is invalid.', $format));
        }
    }
}
