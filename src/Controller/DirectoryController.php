<?php

namespace App\Controller;

use App\Services\GoGoCartoJsService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Request;

class DirectoryController extends GoGoController
{
    public function renderAction(Request $request, GoGoCartoJsService $gogoJsService)
    {
        $gogoConfig = $gogoJsService->getConfig();

        return $this->render('directory/directory.html.twig', ['gogoConfig' => $gogoConfig]);
    }

    public function appShell(Request $request, DocumentManager $dm)
    {
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        $params = ['gogoConfigUrl' => $this->generateUrl('gogo_api_gogocartojs_configuration')];
        if( $config->getHideHeaderInPwa() ) $params['hideHeader'] = true;

        return $this->render('directory/directory.html.twig', $params);
    }
}
