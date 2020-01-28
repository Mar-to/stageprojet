<?php

namespace App\Controller\Admin\BulkActions;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class BulkCoreController extends Controller
{
   public function indexAction()
   {
      return $this->render('admin/pages/bulks/bulk_index.html.twig');
   }
}