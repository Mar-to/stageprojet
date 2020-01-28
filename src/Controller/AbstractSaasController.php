<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Helper\SaasHelper;

class AbstractSaasController extends Controller
{
    protected function isAuthorized()
    {
        $sassHelper = new SaasHelper();
        return $sassHelper->isRootProject();
    }

    protected function getOdmForProject($project)
    {
        $odm = $this->get('doctrine_mongodb')->getManager();
        $odm->getConfiguration()->setDefaultDB($project->getDbName());
        return $odm;
    }

    protected function generateUrlForProject($project, $route = 'gogo_homepage')
    {
        return 'http://' . $project->getDomainName() . '.' . $this->getParameter('base_url') . $this->generateUrl($route);
    }
}