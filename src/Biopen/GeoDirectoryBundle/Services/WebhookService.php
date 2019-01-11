<?php

namespace Biopen\GeoDirectoryBundle\Services;

use Biopen\CoreBundle\Document\User;
use Biopen\GeoDirectoryBundle\Document\Webhook;
use Biopen\GeoDirectoryBundle\Document\WebhookAction;
use Biopen\GeoDirectoryBundle\Document\WebhookFormat;
use Biopen\GeoDirectoryBundle\Document\WebhookPost;
use Biopen\GeoDirectoryBundle\Document\Element;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Templating\Helper\AssetsHelper;
use Symfony\Component\Routing\Router;

class WebhookService
{
	protected $em;

	protected $router;

	protected $assetsHelper;

    public function __construct(DocumentManager $documentManager, Router $router, AssetsHelper $assetsHelper)
    {
    	 $this->em = $documentManager;
    	 $this->router = $router;
    	 $this->assetsHelper = $assetsHelper;
    }

    public function getNotificationText($data) {
        switch($data['action']) {
            case WebhookAction::Add:
                return "**AJOUT** Acteur \"{$data['data']['name']}\" ajoutée par {$data['user']}\n{$data['link']}";
            case WebhookAction::Update:
                return "**MODIFICATION** Acteur \"{$data['data']['name']}\ mise à jour par {$data['user']}\n{$data['link']}";
            case WebhookAction::Delete:
                return "**SUPPRESSION** Acteur \"{$data['data']['name']}\" supprimée par {$data['user']}";
        }
    }

    public function formatData($format, $data) {
        switch($format) {
            case WebhookFormat::Raw:
                return $data;

            case WebhookFormat::Mattermost:
                return [
                    "username" => 'Gogocarto Bot',
                    // TODO generate absolute URL to icon (and find the icon from the user parameters)
                    "icon_url" => $this->assetsHelper->getUrl('/img/default-icon.png'),
                    "text" => $data['text']
                ];

            case WebhookFormat::Slack:
                return ["text" => $data['text']];
        }
    }

    public function queue($actionType, Element $element, User $user)
    {
        /** @var Webhook[] $webhooks */
	    $webhooks = $this->em->getRepository(Webhook::class)->findAll();

	    foreach( $webhooks as $webhook ) {

	        $data = [
                'action' => $actionType,
                'user' => $user->getDisplayName(),
                'link' => str_replace('%23', '#', $this->router->generate('biopen_directory_showElement', array('id'=>$element->getId()), true)),
                'data' => json_decode($element->getBaseJson(), true)
            ];

	        $data['text'] = $this->getNotificationText($data);

	        $post = new WebhookPost();
            $post->setUrl($webhook->getUrl());
            $post->setData($this->formatData($webhook->getFormat(), $data));
            $this->em->persist($post);
        }

	    $this->em->flush();
  }
}
