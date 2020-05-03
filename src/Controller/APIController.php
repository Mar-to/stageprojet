<?php

namespace App\Controller;

use App\Services\GoGoCartoJsService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Intervention\Image\ImageManagerStatic as InterventionImage;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class APIController extends GoGoController
{
    /* Retrieve elements via API, allow params are
    * @id
    * @limit
    * @excludeExternal -> exclude external sources in API
    * @bounds
    * @categories (ids)
    * @stamps (ids)
    * @ontology ( gogofull or gogocompact )
    **/
    public function getElementsAction(Request $request, $id = null, $_format = 'json', DocumentManager $dm)
    {
        $jsonLdRequest = $this->isJsonLdRequest($request, $_format);
        $token = $request->get('token');
        $ontology = $request->get('ontology') ? strtolower($request->get('ontology')) : 'gogofull';
        $fullRepresentation = $jsonLdRequest || 'gogocompact' != $ontology;
        $elementId = $id ? $id : $request->get('id');
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();
        $protectWithToken = $config->getApi()->getProtectPublicApiWithToken();
        $apiUiUrl = $this->generateUrl('gogo_api_ui', [], UrlGeneratorInterface::ABSOLUTE_URL);

        if ($request->isMethod('POST')) { // this kind of call is restricted with cross domain headers
            $isAdmin = $this->isUserAdmin();
            $includePrivateFields = true;
        } elseif (!$protectWithToken || $token) { // otherwise API can be protected by user token
            if ($protectWithToken) {
                $user = $dm->getRepository('App\Document\User')->findOneByToken($token);
                if (!$user) {
                    $response = 'The token you provided does not correspond to any existing user. Please visit '.$apiUiUrl;

                    return $this->createResponse($response, $config);
                }
            }
            $isAdmin = false;
            $includePrivateFields = false;
        } else {
            $response = 'You need to provide a token to access to this API. Please visit '.$apiUiUrl;

            return $this->createResponse($response, $config);
        }

        $elementRepo = $dm->getRepository('App\Document\Element');

        if ($elementId) {
            $element = $elementRepo->findOneBy(['id' => $elementId]);
            $elementsJson = $element ? $element->getJson($includePrivateFields, $isAdmin) : null;
        } else {
            if ($request->get('bounds')) {
                $boxes = [];
                $bounds = explode(';', $request->get('bounds'));
                foreach ($bounds as $key => $bound) {
                    $boxes[] = explode(',', $bound);
                }
                $elementsFromDB = $elementRepo->findWhithinBoxes($boxes, $request, $fullRepresentation, $isAdmin);
            } else {
                $elementsFromDB = $elementRepo->findAllPublics($fullRepresentation, $isAdmin, $request);
            }
            $elementsJson = $this->encodeElementArrayToJsonArray($elementsFromDB, $fullRepresentation, $isAdmin, $includePrivateFields);
        }

        $status = 200;
        if (!$elementsJson) {
            $responseJson = '{ "error": "Element does not exists" }';
            $status = 500;
        } elseif ($jsonLdRequest) {
            $responseJson = '{
        "@context" : "https://rawgit.com/jmvanel/rdf-convert/master/context-gogo.jsonld",
        "@graph"   :  '.$elementsJson.'
      }';
        } else {
            $responseJson = '{
        "licence": "'.$config->getDataLicenseUrl().'",
        "ontology":"'.$ontology.'"';

            if (!$fullRepresentation) {
                $mapping = ['id', $config->getMarker()->getFieldsUsedByTemplate(), 'latitude', 'longitude', 'status', 'moderationState'];
                $responseJson .= ', "mapping":'.json_encode($mapping);
            }

            $responseJson .= ', "data":'.$elementsJson.'}';
        }

        // TODO count how much a user is using the API
        // $responseSize = strlen($elementsJson);
        // $date = date('d/m/Y');

        return $this->createResponse($responseJson, $config, $status);
    }

    public function getTaxonomyAction(Request $request, $id = null, $_format = 'json', DocumentManager $dm,
                                    SerializerInterface $serializer)
    {
        $optionId = $id ? $id : $request->get('id');
        $jsonLdRequest = $this->isJsonLdRequest($request, $_format);

        if ($optionId) {
            $option = $dm->getRepository('App\Document\Option')->findOneBy(['id' => $optionId]);
            $serializationContext = $jsonLdRequest ? SerializationContext::create()->setGroups(['semantic']) : null;
            $dataJson = $serializer->serialize($option, 'json', $serializationContext);
            if ($jsonLdRequest) {
                $dataJson = '['.$dataJson.']';
            }
        } else {
            $dataJson = $dm->getRepository('App\Document\Taxonomy')->findTaxonomyJson($jsonLdRequest);
        }

        if ($jsonLdRequest) {
            $responseJson = '{
          "@context" : "https://rawgit.com/jmvanel/rdf-convert/master/pdcn-taxonomy/taxonomy.context.jsonld",
          "@graph"   :  '.$dataJson.'
        }';
        } else {
            $responseJson = $dataJson;
        }

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        return $this->createResponse($responseJson, $config);
    }

    public function getTaxonomyMappingAction(Request $request, $id = null, $_format = 'json', DocumentManager $dm,
                                           SerializerInterface $serialize)
    {
        $options = $dm->getRepository('App\Document\Option')->findAll();
        $result = [];
        foreach ($options as $key => $option) {
            $result[$option->getId()] = $option;
        }

        $responseJson = $serializer->serialize($result, 'json');

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        return $this->createResponse($responseJson, $config);
    }

    private function isJsonLdRequest($request, $_format)
    {
        return 'jsonld' == $_format || 'application/ld+json' == $request->headers->get('Accept');
    }

    private function createResponse($text, $config, $status = 200)
    {
        $response = new Response($text, $status);
        if ($config->getApi()->getInternalApiAuthorizedDomains()) {
            $response->headers->set('Access-Control-Allow-Origin', $config->getApi()->getInternalApiAuthorizedDomains());
        }
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function getElementsFromTextAction(Request $request, DocumentManager $dm)
    {
        $isAdmin = $this->isUserAdmin();

        $elements = $dm->getRepository('App\Document\Element')->findElementsWithText($request->get('text'), true, $isAdmin);

        $elementsJson = $this->encodeElementArrayToJsonArray($elements, true, $isAdmin, true);
        $responseJson = '{ "data":'.$elementsJson.', "ontology" : "gogofull"}';

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        return $this->createResponse($responseJson, $config);
    }

    public function getElementNamessFromTextAction(Request $request, DocumentManager $dm)
    {
        $isAdmin = $this->isUserAdmin();

        $elements = $dm->getRepository('App\Document\Element')->findElementNamesWithText($request->get('text'));
        dump($elements);

        $responseJson = json_encode($elements);

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        return $this->createResponse($responseJson, $config);
    }

    private function isUserAdmin()
    {
        if ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_REMEMBERED')) {
            $user = $this->getUser();
            $isAdmin = $user && $user->isAdmin();

            return $isAdmin;
        }

        return false;
    }

    private function encodeElementArrayToJsonArray($array, $fullRepresentation, $isAdmin = false, $includePrivateFields = false)
    {
        $elementsJson = '[';
        foreach ($array as $key => $value) {
            if ('true' == $fullRepresentation) {
                $elementJson = $value['baseJson'];
                if ($includePrivateFields && '{}' != $value['privateJson']) {
                    $elementJson = substr($elementJson, 0, -1).','.substr($value['privateJson'], 1);
                }
                if ($isAdmin && '{}' != $value['adminJson']) {
                    $elementJson = substr($elementJson, 0, -1).','.substr($value['adminJson'], 1);
                }
                if (key_exists('score', $value)) {
                    // remove first '{'
                    $elementJson = substr($elementJson, 1);
                    $elementJson = '{"searchScore" : '.$value['score'].','.$elementJson;
                }
            } else {
                $elementJson = $value['compactJson'];
            }
            $elementsJson .= $elementJson.',';
        }

        $elementsJson = rtrim($elementsJson, ',').']';

        return $elementsJson;
    }

    public function getGoGoCartoJsConfigurationAction(DocumentManager $dm, GoGoCartoJsService $gogoJsService)
    {
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        $gogocartoConf = $gogoJsService->getConfig();

        return $this->createResponse(json_encode($gogocartoConf), $config);
    }

    public function apiUiAction(SessionInterface $session, DocumentManager $dm)
    {
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();
        $protectPublicApiWithToken = $config->getApi()->getProtectPublicApiWithToken();

        $userLoggued = $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_REMEMBERED');

        if ($protectPublicApiWithToken && !$userLoggued) {
            $session->set('_security.main.target_path', 'api');

            return $this->redirectToRoute('fos_user_security_login');
        }

        if ($protectPublicApiWithToken) {
            $user = $this->getUser();
            if (!$user->getToken()) {
                $user->createToken();
                $dm->flush();
            }
        }

        $options = $dm->getRepository('App\Document\Option')->findAll();

        return $this->render('api/api-ui.html.twig', ['options' => $options, 'config' => $config]);
    }

    public function getManifestAction(Request $request, DocumentManager $dm)
    {
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();
        $img = $config->getFavicon() ? $config->getFavicon() : $config->getLogo();
        $imageData = null;

        if ($img) {
            $imgUrl = $img->getImageUrl('512x512', 'png');
            try {
                if (!$img->isExternalFile()) {
                    $imageData = InterventionImage::make($img->calculateFilePath('512x512', 'png'));
                } else {
                    $imageData = InterventionImage::make($imgUrl);
                }
            } catch (\Exception $error) {
            }
        }
        if (!$imageData) {
            $imgUrl = $request->getUriForPath('/assets/img/default-icon.png');
            if ('dev' == $this->getParameter('kernel.environment')) {
                $imgUrl = str_replace('index.php/', '', $imgUrl);
            }
            try {
                $imageData = InterventionImage::make($imgUrl);
            } catch (\Exception $error) {
            }
        }

        $icon = ['src' => $imgUrl];
        if ($imageData) {
            $icon['sizes'] = $imageData->height().'x'.$imageData->width();
            $icon['mime'] = $imageData->mime();
        }
        $shortName = $config->getAppNameShort() && strlen($config->getAppNameShort()) > 0 ? $config->getAppNameShort() : $config->getAppName();
        $responseArray = [
          'name' => $config->getAppName(),
          'short_name' => str_split($shortName, 12)[0],
          'lang' => 'fr',
          'start_url' => '/annuaire#/carte/autour-de-moi',
          'display' => 'standalone',
          'theme_color' => $config->getPrimaryColor(),
          'background_color' => $config->getBackgroundColor(),
          'icons' => [$icon],
        ];
        $response = new Response(json_encode($responseArray));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function getProjectInfoAction(DocumentManager $dm)
    {
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();
        $img = $config->getSocialShareImage() ? $config->getSocialShareImage() : $config->getLogo();
        $imageUrl = $img ? $img->getImageUrl() : null;
        $dataSize = $dm->getRepository('App\Document\Element')->findVisibles(true);

        $users = $dm->getRepository('App\Document\User')->findAll();
        $adminEmails = [];
        $lastLogin = null;
        foreach ($users as $key => $user) {
            if ($user->isAdmin()) $adminEmails[] = $user->getEmail();
            if (!$lastLogin || $user->getLastLogin() > $lastLogin) $lastLogin = $user->getLastLogin();
        }
        $responseArray = [
          'name' => $config->getAppName(),
          'imageUrl' => $imageUrl,
          'description' => $config->getAppBaseline(),
          'tags' => $config->getAppTags(),
          'dataSize' => $dataSize,
          'adminEmails' => implode(',', $adminEmails),
          'publish' => $config->getPublishOnSaasPage(),
          'lastLogin' => $lastLogin->getTimestamp()
        ];
        $response = new Response(json_encode($responseArray));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function getConfigurationAction(DocumentManager $dm)
    {
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();
        $defaultTileLayer = $config->getDefaultTileLayer()->getName();
        $config = json_decode(json_encode($config));

        $tileLayers = $dm->getRepository('App\Document\TileLayer')->findAll();

        $config->defaultTileLayer = $defaultTileLayer;
        $config->tileLayers = $tileLayers;
        $response = new Response(json_encode($config));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function hideLogAction($id, DocumentManager $dm)
    {
        $log = $dm->getRepository('App\Document\GoGoLog')->find($id);
        $log->setHidden(true);
        $dm->flush();
        $response = new Response(json_encode(['success' => true]));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function hideAllLogsAction(DocumentManager $dm)
    {
        $qb = $dm->createQueryBuilder('App\Document\GoGoLog');
        $qb->updateMany()
       ->field('type')->notEqual('update')
       ->field('hidden')->equals(false)
       ->field('hidden')->set(true)->getQuery()->execute();

        return $this->redirectToRoute('sonata_admin_dashboard');
    }

    public function hideAllMessagesAction(DocumentManager $dm)
    {
        $qb = $dm->createQueryBuilder('App\Document\GoGoLogUpdate');
        $qb->updateMany()
       ->field('type')->equals('update')
       ->field('hidden')->equals(false)
       ->field('hidden')->set(true)->getQuery()->execute();

        return $this->redirectToRoute('sonata_admin_dashboard');
    }
}
