<?php

namespace Biopen\GeoDirectoryBundle\Controller\Admin;

use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Biopen\GeoDirectoryBundle\Document\ImportState;

class ImportDynamicAdminController extends Controller
{
  public function collectAction()
  {
    $object = $this->admin->getSubject();
    $result = $this->get('biopen.element_import')->collectData($object);

    $this->addFlash('sonata_flash_success', "Les données ont été chargées avec succès. Vous pouvez maintenant compléter les tables de correspondances, puis importer les données.");
    $url = $this->admin->generateUrl('edit', ['id' => $object->getId()]) . "#tab_2";
    return $this->redirect($url);
  }

  public function refreshAction()
  {
    $object = $this->admin->getSubject();

    $object->setCurrState(ImportState::Started);
    $object->setCurrMessage("En attente...");
    $em = $this->get('doctrine_mongodb')->getManager();
    $em->persist($object);
    $em->flush();

    // $this->get('biopen.async')->callCommand('app:elements:importSource', [$object->getId()]);

    $result = $this->get('biopen.element_import')->importJson($object);

    $redirectionUrl = $this->admin->generateUrl('edit', ['id' => $object->getId()]);
    $stateUrl = $this->generateUrl('biopen_import_state', ['id' => $object->getId()]);

    return $this->render('@BiopenAdmin/pages/import/import-progress.html.twig', [
      'import' => $object,
      'redirectUrl' => $redirectionUrl,
      'redirectListUrl' => $redirectionUrl = $this->admin->generateUrl('list'),
      'stateUrl' => $stateUrl
    ]);
  }

  /**
   * Overite Sonata CRud Controller
   */
  public function editAction($id = null)
  {
    $request = $this->getRequest();
    $id = $request->get($this->admin->getIdParameter());
    $object = $this->admin->getObject($id);

    if (!$object) throw $this->createNotFoundException(sprintf('unable to find the object with id : %s', $id));

    $this->admin->checkAccess('edit', $object);
    $this->admin->setSubject($object);

    $form = $this->admin->getForm();
    $form->setData($object);
    $form->handleRequest($request);

    if ($form->isSubmitted()) {
      //TODO: remove this check for 4.0
      if (method_exists($this->admin, 'preValidate')) {
        $this->admin->preValidate($object);
      }
      $isFormValid = $form->isValid();

      // persist if the form was valid and if in preview mode the preview was approved
      if ($isFormValid) {
        try {

          // ----- CUSTOM -------
          $object->setOntologyMapping($request->get('ontology'));
          $object->setTaxonomyMapping($request->get('taxonomy'));

          // ---- END CUSTOM ------

          $object = $this->admin->update($object);

          $this->addFlash(
            'sonata_flash_success',
            $this->trans(
              'flash_edit_success',
              array('%name%' => $this->escapeHtml($this->admin->toString($object))),
              'SonataAdminBundle'
            )
          );
          // redirect to edit mode
          return $this->redirectTo($object);
        } catch (ModelManagerException $e) {
          $this->handleModelManagerException($e);
          $isFormValid = false;
        } catch (LockException $e) {
          $this->addFlash('sonata_flash_error', $this->trans('flash_lock_error', array(
            '%name%' => $this->escapeHtml($this->admin->toString($object)),
            '%link_start%' => '<a href="'.$this->admin->generateObjectUrl('edit', $object).'">',
            '%link_end%' => '</a>',
          ), 'SonataAdminBundle'));
        }
      }

      // show an error message if the form failed validation
      if (!$isFormValid) {
        if (!$this->isXmlHttpRequest()) {
          $this->addFlash(
            'sonata_flash_error',
            $this->trans(
              'flash_edit_error',
              array('%name%' => $this->escapeHtml($this->admin->toString($object))),
              'SonataAdminBundle'
            )
          );
        }
      }
    }

    $view = $form->createView();
    // set the theme for the current Admin Form
    $this->get('twig')->getExtension('form')->renderer->setTheme($view, $this->admin->getFormTheme());

    return $this->render($this->admin->getTemplate('edit'), array(
      'action' => 'edit',
      'form' => $view,
      'object' => $object,
    ), null);
  }


    /**
    * Overwrite Sonata CRud Controller
    */
    public function createAction()
    {
      $request = $this->getRequest();
      // the key used to lookup the template
      $templateKey = 'edit';
      $this->admin->checkAccess('create');
      $class = new \ReflectionClass($this->admin->hasActiveSubClass() ? $this->admin->getActiveSubClass() : $this->admin->getClass());

      $object = $this->admin->getNewInstance();

      $this->admin->setSubject($object);

      $form = $this->admin->getForm();
      $form->setData($object);
      $form->handleRequest($request);

      if ($form->isSubmitted()) {
          //TODO: remove this check for 4.0
          if (method_exists($this->admin, 'preValidate')) {
              $this->admin->preValidate($object);
          }
          $isFormValid = $form->isValid();

          // persist if the form was valid and if in preview mode the preview was approved
          if ($isFormValid && (!$this->isInPreviewMode($request) || $this->isPreviewApproved($request))) {
              try {
                  $object = $this->admin->create($object);

                  $result = $this->get('biopen.element_import')->collectData($object);

                  $this->addFlash('sonata_flash_success', "Les données ont été chargées avec succès. Vous pouvez maintenant compléter les tables de correspondances, puis importer les données.");

                  $url = $this->admin->generateUrl('edit', ['id' => $object->getId()]) . "#tab_2";
                  return $this->redirect($url);
              } catch (ModelManagerException $e) {
                  $this->handleModelManagerException($e);
                  $isFormValid = false;
              }
          }

          // show an error message if the form failed validation
          if (!$isFormValid) {
              if (!$this->isXmlHttpRequest()) {
                  $this->addFlash(
                      'sonata_flash_error',
                      $this->trans(
                          'flash_create_error',
                          array('%name%' => $this->escapeHtml($this->admin->toString($object))),
                          'SonataAdminBundle'
                      )
                  );
              }
          } elseif ($this->isPreviewRequested()) {
              // pick the preview template if the form was valid and preview was requested
              $templateKey = 'preview';
              $this->admin->getShow();
          }
      }

      $view = $form->createView();

      // set the theme for the current Admin Form
      $this->get('twig')->getExtension('form')->renderer->setTheme($view, $this->admin->getFormTheme());

      return $this->render($this->admin->getTemplate($templateKey), array(
          'action' => 'create',
          'form' => $view,
          'object' => $object,
      ), null);
    }
}