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
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Router;

class WebhookService
{
	protected $em;

	protected $router;

	/** @var Request $request */
	protected $request;

    public function __construct(DocumentManager $documentManager, Router $router, RequestStack $requestStack)
    {
    	 $this->em = $documentManager;
    	 $this->router = $router;
    	 $this->request = $requestStack->getCurrentRequest();
    }

    public function getNotificationText($data)
    {
        switch($data['action']) {
            case WebhookAction::Add:
                return "**AJOUT** Acteur \"{$data['data']['name']}\" ajoutée par {$data['user']}\n{$data['link']}";
            case WebhookAction::Update:
                return "**MODIFICATION** Acteur \"{$data['data']['name']}\ mise à jour par {$data['user']}\n{$data['link']}";
            case WebhookAction::Delete:
                return "**SUPPRESSION** Acteur \"{$data['data']['name']}\" supprimée par {$data['user']}";
        }
    }

    public function getBotIcon()
    {
        /** @var Configuration $config */
        $config = $this->em->getRepository(Configuration::class)->findConfiguration();

        /** @var ConfImage $img */
        $img = $config->getFavicon() ? $config->getFavicon() : $config->getLogo();

        return $img
            ? $img->getImageUrl('128x128', 'png')
            : $this->request->getUriForPath('/assets/img/default-icon.png');
    }

    public function formatData($format, $data)
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
