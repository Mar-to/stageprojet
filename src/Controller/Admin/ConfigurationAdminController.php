<?php

namespace App\Controller\Admin;

use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Sonata\AdminBundle\Datagrid\ProxyQueryInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use App\Document\ElementStatus;
use Doctrine\ODM\MongoDB\DocumentManager;

class ConfigurationAdminController extends Controller
{
  public function listAction()
  {
    $dm = $this->admin->getModelManager()->getDocumentManager('App\Document\Configuration');
    $configuration = $dm->getRepository('App\Document\Configuration')->findConfiguration();

    if ($configuration)
       return $this->redirect($this->admin->generateUrl('edit', ['id' => $configuration->getId()]));
    else
    	return $this->redirect($this->admin->generateUrl('create'));
  }

  public function deleteAction($id)
  {
    // do nothing
    $this->addFlash('sonata_flash_error', "Impossible de supprimer la configuration, cette action est interdite car est elle casserait toute votre carte");
    return $this->redirect($this->admin->generateUrl('edit', ['id' => $id]));
  }
}