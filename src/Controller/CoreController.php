<?php

namespace App\Controller;

use App\Controller\GoGoController;
use App\Helper\SaasHelper;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager;

class CoreController extends GoGoController
{

    public function homeAction($force = true, DocumentManager $dm)
    {
        $sassHelper = new SaasHelper();
        if (!$force && $this->getParameter('use_as_saas') && $sassHelper->isRootProject()) return $this->redirectToRoute('biopen_saas_home');

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();
        if (!$config && $this->getParameter('use_as_saas')) {
            $url = 'http://' . $this->getParameter('base_url') . $this->generateUrl('biopen_saas_home');
            return $this->redirect($url);
        }
        if (!$config->getActivateHomePage()) return $this->redirectToRoute('biopen_directory');

        // Get Wrapper List
        $listWrappers = $dm->getRepository('App\Document\Wrapper')->findAllOrderedByPosition();
        $mainCategory = $dm->getRepository('App\Document\Category')->findOneByIsRootCategory(true);
        $mainOptions = $mainCategory ? $mainCategory->getOptions() : [];
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        $this->get('session')->clear();

        return $this->render('@BiopenCoreBundle/home.html.twig', array(
            'listWrappers' => $listWrappers,
            'mainOptions' => $mainOptions,
            'config' => $config));
    }

    public function headerAction($title = "GoGoCarto", DocumentManager $dm)
    {
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();
        $listAbouts = $dm->getRepository('App\Document\About')->findAllOrderedByPosition();
        $countPartners = count($dm->getRepository('App\Document\Partner')->findAll());
        $parameters['config'] = $config;
        $parameters['listAbouts'] = $listAbouts;
        $parameters['countPartners'] = $countPartners;
        return $this->render('@BiopenCoreBundle/header.html.twig', array(
            "title" => $title,
            "config" => $config,
            "listAbouts" => $listAbouts,
            "countPartners" => $countPartners,
            "renderedFromController" => true));
    }

    public function partnersAction()
    {
    	$repository = $this
    	  ->get('doctrine_mongodb')->getManager()
    	  ->getRepository('App\Document\Partner');

        $listPartners = $repository->findAllOrderedByPosition();

        return $this->render('@BiopenCoreBundle/partners.html.twig', array('listPartners' => $listPartners));
    }

    public function helpAction()
    {
        return $this->render('@BiopenAdmin/pages/help.html.twig');
    }

}
