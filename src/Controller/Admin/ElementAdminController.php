<?php

namespace App\Controller\Admin;

use Symfony\Component\HttpFoundation\RedirectResponse;
use App\Services\ValidationType;

// Split this big controller into two classes
class ElementAdminController extends ElementAdminBulkController
{
    public function redirectEditAction()
    {
        $object = $this->admin->getSubject();

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }

        return $this->redirectToRoute('biopen_element_edit', ['id' => $object->getId()]);
    }

    public function redirectShowAction()
    {
        $object = $this->admin->getSubject();

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }

        return $this->redirect($object->getShowUrlFromController($this));
    }

    public function redirectBackAction()
    {
        return $this->redirect($this->admin->generateUrl('list', array('filter' => $this->admin->getFilterParameters())));
    }

    public function showEditAction($id = null)
    {
        $request = $this->getRequest();

        $id = $request->get($this->admin->getIdParameter());
        $object = $this->admin->getObject($id);

        if (!$object) {
            throw $this->createNotFoundException(sprintf('unable to find the object with id : %s', $id));
        }

        $this->admin->checkAccess('edit', $object);
        $this->admin->setSubject($object);

        /** @var $form Form */
        $form = $this->admin->getForm();
        $form->setData($object);

        $view = $form->createView();

        // set the theme for the current Admin Form
        $this->get('twig')->getRuntime(\Symfony\Component\Form\FormRenderer::class)
             ->setTheme($view, $this->admin->getFormTheme());

        return $this->render('admin/edit/edit_element.html.twig', array(
            'action' => 'edit',
            'form' => $view,
            'object' => $object,
            'elements' => $this->admin->getShow(),
        ), null);
    }

    public function editAction($id = null)
    {
        $request = $this->getRequest();

        $id = $request->get($this->admin->getIdParameter());
        $object = $this->admin->getObject($id);

        if (!$object) {
            throw $this->createNotFoundException(sprintf('unable to find the object with id : %s', $id));
        }

        $this->admin->checkAccess('edit', $object);
        $this->admin->setSubject($object);

        /** @var $form Form */
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
                    $message = $request->get('custom_message') ? $request->get('custom_message') : '';

                    $elementActionService = $this->container->get('biopen.element_action_service');

                    if ($request->get('submit_update_json'))
                    {
                        $dm = $this->container->get('doctrine_mongodb')->getManager();
                        $this->container->get('biopen.element_json_generator')->updateJsonRepresentation($object, $dm);
                    }
                    elseif ($object->isPending() && ($request->get('submit_accept') || $request->get('submit_refuse')))
                    {
                        $elementActionService->resolve($object, $request->get('submit_accept'), ValidationType::Admin, $message);
                    }
                    else
                    {
                        $sendMail = $request->get('send_mail');

                        if ($request->get('submit_delete'))  { $elementActionService->delete($object, $sendMail, $message); }
                        else if ($request->get('submit_restore')) { $elementActionService->restore($object, $sendMail, $message); }
                        else { $elementActionService->edit($object, $sendMail, $message); }
                    }

                    $object = $this->admin->update($object);

                    $this->addFlash(
                        'sonata_flash_success',
                        $this->trans(
                            'flash_edit_success',
                            array('%name%' => $this->escapeHtml($this->admin->toString($object))),
                            'SonataAdminBundle'
                        )
                    );

                    if ($request->get('submit_redirect'))
                        return new RedirectResponse(
                            $this->admin->generateUrl('list')
                        );

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

        return $this->redirectToRoute('admin_biopen_geodirectory_element_showEdit', ['id' => $id]);
    }
}