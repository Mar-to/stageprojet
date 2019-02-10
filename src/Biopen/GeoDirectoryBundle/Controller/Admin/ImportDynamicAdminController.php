<?php

namespace Biopen\GeoDirectoryBundle\Controller\Admin;

use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class ImportDynamicAdminController extends Controller
{
    public function refreshAction()
    {
        $object = $this->admin->getSubject();

        $this->get('biopen.async')->callCommand('app:elements:importSource', [$object->getId()]);
        $this->addFlash('sonata_flash_success', "Les éléments sont en cours d'importation. Cela peut prendre plusieurs minutes.");

        // $result = $this->get('biopen.element_import')->importJson($object);        
        // $this->addFlash('sonata_flash_success', $result);     

        return $this->redirect($this->admin->generateUrl('edit', ['id' => $object->getId()]));
    }
}