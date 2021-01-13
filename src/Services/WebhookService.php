<?php

namespace App\Services;

use App\Document\Configuration;
use App\Document\ConfImage;
use App\Document\InteractionType;
use App\Document\UserInteractionContribution;
use App\Document\WebhookFormat;
use App\Services\ElementSynchronizationService;
use Doctrine\ODM\MongoDB\DocumentManager;
use GuzzleHttp\Client;
use GuzzleHttp\Promise;
use http\Exception\InvalidArgumentException;
use Symfony\Component\Routing\RouterInterface;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\RequestException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class WebhookService
{
    protected $dm;

    protected $router;

    public function __construct(DocumentManager $dm, RouterInterface $router,
                                TokenStorageInterface $securityContext,
                                ElementSynchronizationService $synchService,
                                $baseUrl)
    {
        $this->dm = $dm;
        $this->router = $router;
        $this->securityContext = $securityContext;
        $this->baseUrl = 'http://'.$baseUrl;
        $this->config = $this->dm->getRepository(Configuration::class)->findConfiguration();
        $this->synchService = $synchService;
    }

    public function processPosts($limit = 5)
    {
        $contributions = $this->dm->createQueryBuilder(UserInteractionContribution::class)
            ->field('status')->exists(true) // null status are pending contributions, so ignore
            ->field('webhookPosts.numAttempts')->lte(6) // ignore posts with 6 failures
            ->field('webhookPosts.nextAttemptAt')->lte(new \DateTime())
            ->limit($limit)
            ->getQuery()->execute();
        if (!$contributions || 0 == $contributions->count()) {
            return 0;
        }

        $client = new Client();
        $promises = [];

        // DISPATCH EACH POST
        foreach ($contributions as $contribution) {
            $data = $this->calculateData($contribution);
            foreach ($contribution->getWebhookPosts() as $post) {
                $webhook = $post->getWebhook();
                
                if ($webhook) {
                    $jsonData = json_encode($this->formatData($webhook->getFormat(), $data));
                    $promise = $client->postAsync($webhook->getUrl(), [], $jsonData);
                } else {
                    // when no webhook it mean it's a special handling, like for OpenStreetMap
                    $promise = $this->synchService->asyncDispatch($contribution, $data);
                }                
                
                $promise->then(
                    function (ResponseInterface $res) use ($post, $contribution) {
                        // TODO: not sure we should always expect 200...
                        if ($res->getStatusCode() == 200)
                            $this->handlePostSuccess($post, $contribution);
                        else 
                            $this->handlePostFailure($post, $contribution);
                    },
                    function (RequestException $e) use($post, $contribution) {
                        $this->handlePostFailure($post, $contribution);
                    }
                );
                $promises[] = $promise;
            }
        }

        // Wait for the requests to complete, even if some of them fail
        // Not sure if we need that or not... maybe just for the flush
        Promise\Utils::settle($promises)->wait();  

        $this->dm->flush();
        return count($promises);
    }

    private function handlePostSuccess($post, $contribution)
    {
        $contribution->removeWebhookPost($post);
    }

    private function handlePostFailure($post, $contribution)
    {
        $attemps = $post->incrementNumAttempts();
        // After first try, wait 5m, 25m, 2h, 10h, 2d
        $intervalInMinutes = pow(5, $attemps);
        $interval = new \DateInterval("PT{$intervalInMinutes}M");
        $now = new \DateTime();
        $post->setNextAttemptAt($now->add($interval));
    }

    private function calculateData($contribution)
    {
        // STANDRD CONTIRBUTION
        if ($contribution->getElement()) {
            $element = $contribution->getElement();
            $this->dm->refresh($element);
            $element->setPreventJsonUpdate(true);
            $link = str_replace('%23', '#', $this->router->generate('gogo_directory_showElement', ['id' => $element->getId()], true));
            $data = json_decode($element->getBaseJson(), true);
        }
        // BATCH CONTRIBUTION
        else {
            $link = '';
            $data = ['ids' => $contribution->getElementIds()];
        }

        $mappingType = [InteractionType::Deleted => 'delete', InteractionType::Add => 'add',     InteractionType::Edit => 'edit',
                        InteractionType::Import => 'add',     InteractionType::Restored => 'add', ];
        $result = [
            'action' => $mappingType[$contribution->getType()],
            'user' => $contribution->getUserDisplayName(),
            'link' => $link,
            'data' => $data,
        ];
        $result['text'] = $contribution->getElement() ? $this->getNotificationText($result) : $this->getBatchNotificationText($result);

        return $result;
    }

    private function getNotificationText($result)
    {
        $element = $this->config->getElementDisplayName();
        switch ($result['action']) {
            case 'add':
                return "**AJOUT** {$element} **{$result['data']['name']}** ajouté par {$result['user']}\n[Lien vers la fiche]({$result['link']})";
            case 'edit':
                return "**MODIFICATION** {$element} **{$result['data']['name']}** mis à jour par *{$result['user']}*\n[Lien vers la fiche]({$result['link']})";
            case 'delete':
                return "**SUPPRESSION** {$element} **{$result['data']['name']}** supprimé par *{$result['user']}*";
            default:
                throw new InvalidArgumentException(sprintf('The webhook action "%s" is invalid.', $result['action']));
        }
    }

    protected $transTitle = ['add' => 'AJOUT', 'edit' => 'MODIFICATION', 'delete' => 'SUPPRESSION'];
    protected $transText = ['add' => 'ajoutés', 'edit' => 'mis à jour', 'delete' => 'supprimés'];

    private function getBatchNotificationText($result)
    {
        $elements = $this->config->getElementDisplayNamePlural();
        $title = $this->transTitle[$result['action']];
        $text = $this->transText[$result['action']];
        $count = count($result['data']['ids']);

        return "**{$title}** {$count} {$elements} {$text} par {$result['user']}";
    }

    private function getBotIcon()
    {
        /** @var ConfImage $img */
        $img = $this->config->getFavicon() ? $this->config->getFavicon() : $this->config->getLogo();

        return $img
            ? $img->getImageUrl()
            : str_replace('index.php/', '', $this->baseUrl.'/img/default-icon.png'); // Fix if there is no url rewrite
    }

    private function formatData($format, $data)
    {
        switch ($format) {
            case WebhookFormat::Raw:
                return $data;

            case WebhookFormat::Mattermost:
                return [
                    'username' => $this->config->getAppName(),
                    'icon_url' => $this->getBotIcon(),
                    'text' => $data['text'],
                ];

            case WebhookFormat::Slack:
                return ['text' => $data['text']];

            default:
                throw new InvalidArgumentException(sprintf('The webhook format "%s" is invalid.', $format));
        }
    }
}
