<?php

namespace Biopen\GeoDirectoryBundle\Controller\Admin;

use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Symfony\Component\HttpFoundation\Request;
use Biopen\GeoDirectoryBundle\Document\Category;

class CategoryAdminController extends Controller
{
    public function listAction()
    {
        return $this->treeAction();
    }

    public function treeAction()
    {
        $this->admin->checkAccess('list');

        $em = $this->get('doctrine_mongodb')->getManager();
        $config = $em->getRepository('BiopenCoreBundle:Configuration')->findConfiguration();
        $rootCategories = $em->getRepository('BiopenGeoDirectoryBundle:Category')->findRootCategories();

        return $this->render('@BiopenAdmin/list/tree_category.html.twig', array(
            'categories' => $rootCategories, 'config' => $config
        ), null);
    }
}