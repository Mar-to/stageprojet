<?php

namespace Biopen\GeoDirectoryBundle\Controller\Admin;

use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Biopen\GeoDirectoryBundle\Document\ImportState;

class ImportDynamicAdminController extends Controller
{
    public function refreshAction()
    {
        $object = $this->admin->getSubject();

        $object->setCurrState(ImportState::Started);
        $object->setCurrMessage("En attente...");
        $em = $this->get('doctrine_mongodb')->getManager();
        $em->persist($object);
        $em->flush();

        $this->get('biopen.async')->callCommand('app:elements:importSource', [$object->getId()]);

        // $result = $this->get('biopen.element_import')->importJson($object);  

        $redirectionUrl = $this->admin->generateUrl('edit', ['id' => $object->getId()]); 
        $stateUrl = $this->generateUrl('biopen_import_state', ['id' => $object->getId()]); 

        return $this->render('@BiopenAdmin/pages/import/import-progress.html.twig', [
          'import' => $object,
          'redirectUrl' => $redirectionUrl,
          'redirectListUrl' => $redirectionUrl = $this->admin->generateUrl('list'),
          'stateUrl' => $stateUrl
        ]);        
    }
}