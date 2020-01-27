<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class GoGoController extends AbstractController
{
   public function publicGenerateUrl($route, $params)
   {
      return parent::generateUrl($route, $params);
   }
}
