<?php

namespace App\Controller;

use App\Services\DocumentManagerFactory;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Services\GoGoCartoJsService;
use App\Services\UrlService;
use App\Helper\GoGoHelper;

class CoreController extends GoGoController
{
    public function homeAction($force = false, DocumentManagerFactory $dmFactory, SessionInterface $session,
                               GoGoCartoJsService $gogoJsService, UrlService $urlService)
    {
        if (!$force && $this->getParameter('use_as_saas') && $dmFactory->isRootProject()) {
            return $this->redirectToRoute('gogo_saas_home');
        }
        $dm = $dmFactory->getCurrentManager();
        $config = $dm->get('Configuration')->findConfiguration();
        if (!$config && $this->getParameter('use_as_saas')) {
            $url = $urlService->generateRootUrl();
            return $this->redirect($url);
        }
        if (!$config->getActivateHomePage()) {
            return $this->redirectToRoute('gogo_directory');
        }

        // Get Wrapper List
        $listWrappers = $dm->get('Wrapper')->findAllOrderedByPosition();
        $mainCategory = $dm->get('Category')->findOneByIsRootCategory(true);
        $mainOptions = $mainCategory ? $mainCategory->getOptions() : [];

        $session->clear();

        return $this->render('home.html.twig', [
            'listWrappers' => $listWrappers,
            'mainOptions' => $mainOptions,
            'config' => $config,
            'gogoConfig' => $gogoJsService->getConfig() ]);
    }

    public function partnersAction(DocumentManager $dm)
    {
        $repository = $dm->get('Partner');
        $config = $dm->get('Configuration')->findConfiguration();

        $listPartners = $repository->findAllOrderedByPosition();

        return $this->render('partners.html.twig', ['listPartners' => $listPartners, 'config' => $config]);
    }

    public function helpAction()
    {
        return $this->render('admin/pages/help.html.twig');
    }
}
