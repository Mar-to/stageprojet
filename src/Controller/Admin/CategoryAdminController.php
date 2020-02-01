<?php

namespace App\Controller\Admin;

use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Symfony\Component\HttpFoundation\Request;
use App\Document\Category;
use Doctrine\ODM\MongoDB\DocumentManager;

class CategoryAdminController extends Controller
{
    public function listAction()
    {
        return $this->treeAction();
    }

    public function treeAction()
    {
        $this->admin->checkAccess('list');
        $dm = $this->admin->getModelManager()->getDocumentManager('App\Document\Configuration');
        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();
        $rootCategories = $dm->getRepository('App\Document\Category')->findRootCategories();

        return $this->render('admin/list/tree_category.html.twig', array(
            'categories' => $rootCategories, 'config' => $config
        ), null);
    }
}