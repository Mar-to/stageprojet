<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class GoGoController extends AbstractController
{
   public function render(string $view, array $parameters = [], Response $response = null): Response
   {
      $em = $this->get('doctrine_mongodb')->getManager();
      $config = $em->getRepository('BiopenCoreBundle:Configuration')->findConfiguration();
      $listAbouts = $em->getRepository('BiopenCoreBundle:About')->findAllOrderedByPosition();
      $countPartners = count($em->getRepository('BiopenCoreBundle:Partner')->findAll());
      $parameters['config'] = $config;
      $parameters['listAbouts'] = $listAbouts;
      $parameters['countPartners'] = $countPartners;

      return parent::render($view, $parameters, $response);
   }

   public function publicGenerateUrl($route, $params)
   {
      return parent::generateUrl($route, $params);
   }
}
