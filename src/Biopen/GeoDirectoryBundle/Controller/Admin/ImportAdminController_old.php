<?php

namespace Biopen\GeoDirectoryBundle\Controller\Admin;

use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Sonata\AdminBundle\Datagrid\ProxyQueryInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Biopen\GeoDirectoryBundle\Document\ElementStatus;
use Biopen\GeoDirectoryBundle\Document\ImportState;

class ImportAdminController extends Controller
{
    public function listAction()
    {
        return $this->redirect($this->admin->generateUrl('create'));
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('edit');
    }

    private function executeImport($import)
    {        
        $object = $import;
        $em = $this->get('doctrine_mongodb')->getManager();
        $em->flush();

        $object->setCurrState(ImportState::Started);
        $object->setCurrMessage("En attente...");
        
        $em->persist($object);
        $em->flush();

        $this->get('biopen.async')->callCommand('app:elements:importSource', [$object->getId()]);

        // $result = $this->get('biopen.element_import')->startImport($object);  

        $redirectionUrl = $this->admin->generateUrl('create');
        $stateUrl = $this->generateUrl('biopen_import_state', ['id' => $object->getId()]); 

        return $this->render('@BiopenAdmin/pages/import/import-progress.html.twig', [
          'import' => $object,
          'redirectUrl' => $redirectionUrl,
          'stateUrl' => $stateUrl
        ]);    
    }

    // This method is just an overwrite of the SonataAdminCRUDController for calling the executeImport once the document is created
    public function createAction()
    {
        $request = $this->getRequest();
        $this->admin->checkAccess('create');
        $object = $this->admin->getNewInstance();
        $this->admin->setSubject($object);

        $form = $this->admin->getForm();
        $form->setData($object);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            $isFormValid = $form->isValid();
            // persist if the form was valid and if in preview mode the preview was approved
            if ($isFormValid) {
                try {
                    $object = $this->admin->create($object);   
                    return $this->executeImport($object);
                } catch (ModelManagerException $e) {
                    $this->handleModelManagerException($e);
                    $isFormValid = false;
                }
            }
            if (!$isFormValid) { // show an error message if the form failed validation
                $text = $this->trans('flash_create_error', array('%name%' => $this->escapeHtml($this->admin->toString($object))), 'SonataAdminBundle');
                $this->addFlash('sonata_flash_error', $text);
            }
        }

        $view = $form->createView();
        // set the theme for the current Admin Form
        $this->get('twig')->getExtension('form')->renderer->setTheme($view, $this->admin->getFormTheme());

        return $this->render('@BiopenAdmin/edit/edit_import.html.twig', array(
            'action' => 'create',
            'form' => $view,
            'object' => $object,
        ), null);
    }
}