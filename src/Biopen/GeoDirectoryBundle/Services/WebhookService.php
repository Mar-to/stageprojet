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

class WebhookService
{
	protected $em;

	protected $router;

	/** @var Request $request */
	protected $request;

    public function __construct(DocumentManager $documentManager, Router $router, RequestStack $requestStack, SecurityContext $securityContext)
    {
    	 $this->em = $documentManager;
    	 $this->router = $router;
    	 $this->request = $requestStack->getCurrentRequest();
         $this->securityContext = $securityContext;
    }

    public function queue($actionType, Element $element)
    {
        /** @var Webhook[] $webhooks */
        $webhooks = $this->em->getRepository(Webhook::class)->findAll();

        $user = $this->securityContext->getToken()->getUser();
        $userDisplayName = is_string($user) ? $user : $user->getDisplayName();

        foreach( $webhooks as $webhook ) {

            $data = [
                'action' => $actionType,
                'user' => $userDisplayName,
                'link' => str_replace('%23', '#', $this->router->generate('biopen_directory_showElement', array('id'=>$element->getId()), true)),
                'data' => json_decode($element->getBaseJson(), true)
            ];

            $data['text'] = $this->getNotificationText($data);

            $post = new WebhookPost();
            $post->setUrl($webhook->getUrl());
            $post->setData($this->formatData($webhook->getFormat(), $data));
            $this->em->persist($post);
        }
    }

    /**
     * @param WebhookPost[] $webhookPosts
     */
    public function processPosts($limit)
    {
        $webhookPostRepo = $this->em->getRepository(WebhookPost::class);

        // Get webhook posts in an ordered array
        $webhookPosts = array_values($webhookPostRepo->findPendings($limit)->toArray());

        $client = new Client();

        $requests = function() use( $client, $webhookPosts ) {
            foreach($webhookPosts as $webhookPost) {
                yield new \GuzzleHttp\Psr7\Request('POST', $webhookPost->getUrl(), [], json_encode($webhookPost->getData()));
            }
        };

        $pool = new Pool($client, $requests(), [
            'concurrency' => 5,
            'fulfilled' => function (Response $response, $index) use ($webhookPosts) {
                $this->em->remove($webhookPosts[$index]);
            },
            'rejected' => function ($reason, $index) use ($webhookPosts) {
                $webhookPosts[$index]->incrementNumAttempts();
                $webhookPosts[$index]->setLatestAttemptAt(new \DateTime());
            },
        ]);

        // Initiate the transfers and create a promise
        $promise = $pool->promise();

        // Force the pool of requests to complete.
        $promise->wait();

        $this->em->flush();

        return( count($webhookPosts) );
    }

    private function getNotificationText($data)
    {
        switch($data['action']) {
            case WebhookAction::Add:
                return "**AJOUT** Acteur \"{$data['data']['name']}\" ajouté par {$data['user']}\n{$data['link']}";
            case WebhookAction::Edit:
                return "**MODIFICATION** Acteur \"{$data['data']['name']}\ mise à jour par {$data['user']}\n{$data['link']}";
            case WebhookAction::Delete:
                return "**SUPPRESSION** Acteur \"{$data['data']['name']}\" supprimé par {$data['user']}";
            default:
                throw new InvalidArgumentException(sprintf('The webhook action "%s" is invalid.', $data['action']));
        }
    }

    private function getBotIcon()
    {
        /** @var Configuration $config */
        $config = $this->em->getRepository(Configuration::class)->findConfiguration();

        /** @var ConfImage $img */
        $img = $config->getFavicon() ? $config->getFavicon() : $config->getLogo();

        return $img
            ? $img->getImageUrl('128x128', 'png')
            : $this->request->getUriForPath('/assets/img/default-icon.png');
    }

    private function formatData($format, $data)
    {
        switch($format) {
            case WebhookFormat::Raw:
                return $data;

            case WebhookFormat::Mattermost:
                return [
                    "username" => 'Gogocarto Bot',
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
