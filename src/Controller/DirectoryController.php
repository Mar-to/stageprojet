<?php

/**
 * This file is part of the GoGoCarto project.
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @copyright Copyright (c) 2016 Sebastian Castro - 90scastro@gmail.com
 * @license    MIT License
 * @Last Modified time: 2018-07-08 12:11:20
 */

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
