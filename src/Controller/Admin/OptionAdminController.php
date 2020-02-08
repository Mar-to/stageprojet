<?php

namespace App\Controller\Admin;

use Sonata\AdminBundle\Controller\CRUDController as Controller;

class OptionAdminController extends Controller
{
    public function listAction()
    {
        return $this->redirectToRoute('admin_app_category_list');
    }
}
