<?php

namespace App\Controller\Admin;

use App\Services\ValidationType;
use App\Document\PostalAddress;
use App\Document\Coordinates;
use Symfony\Component\HttpFoundation\RedirectResponse;

// Split this big controller into two classes
class ElementAdminController extends ElementAdminBulkController
{
    public function redirectEditAction()
    {
        $object = $this->admin->getSubject();

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }

        return $this->redirectToRoute('gogo_element_edit', ['id' => $object->getId()]);
    }

    public function redirectShowAction()
    {
        $object = $this->admin->getSubject();

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }

        return $this->redirect($object->getShowUrlFromController($this->get('router')));
    }

    public function redirectBackAction()
    {
        return $this->redirect($this->admin->generateUrl('list', ['filter' => $this->admin->getFilterParameters()]));
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

        return $this->render('admin/edit/edit_element.html.twig', [
            'action' => 'edit',
            'form' => $view,
            'object' => $object,
            'elements' => $this->admin->getShow(),
        ], null);
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

                    $object->setCustomData($request->get('data'));
                    $adr = $request->get('address');
                    $address = new PostalAddress($adr['streetAddress'], $adr['addressLocality'], $adr['postalCode'], $adr['addressCountry'], $adr['customFormatedAddress']);
                    $object->setAddress($address);
                    $geo = new Coordinates($request->get('latitude'), $request->get('lontitude'));
                    $object->setGeo($geo);

                    if ($request->get('submit_update_json')) {
                        $this->jsonGenerator->updateJsonRepresentation($object);
                    } elseif ($object->isPending() && ($request->get('submit_accept') || $request->get('submit_refuse'))) {
                        $this->elementActionService->resolve($object, $request->get('submit_accept'), ValidationType::Admin, $message);
                    } else {
                        $sendMail = $request->get('send_mail');

                        if ($request->get('submit_delete')) {
                            $this->elementActionService->delete($object, $sendMail, $message);
                        } elseif ($request->get('submit_restore')) {
                            $this->elementActionService->restore($object, $sendMail, $message);
                        } else {
                            $this->elementActionService->edit($object, $sendMail, $message);
                        }
                    }

                    $object = $this->admin->update($object);

                    $this->addFlash(
                        'sonata_flash_success',
                        $this->trans(
                            'flash_edit_success',
                            ['%name%' => $this->escapeHtml($this->admin->toString($object))],
                            'SonataAdminBundle'
                        )
                    );

                    if ($request->get('submit_redirect')) {
                        return new RedirectResponse(
                            $this->admin->generateUrl('list')
                        );
                    }
                } catch (\Sonata\AdminBundle\Exception\ModelManagerException $e) {
                    $this->handleModelManagerException($e);

                    $isFormValid = false;
                } catch (\Sonata\AdminBundle\Exception\LockException $e) {
                    $this->addFlash('sonata_flash_error', $this->trans('flash_lock_error', [
                        '%name%' => $this->escapeHtml($this->admin->toString($object)),
                        '%link_start%' => '<a href="'.$this->admin->generateObjectUrl('edit', $object).'">',
                        '%link_end%' => '</a>',
                    ], 'SonataAdminBundle'));
                }
            }

            // show an error message if the form failed validation
            if (!$isFormValid) {
                if (!$this->isXmlHttpRequest()) {
                    $this->addFlash(
                        'sonata_flash_error',
                        $this->trans(
                            'flash_edit_error',
                            ['%name%' => $this->escapeHtml($this->admin->toString($object))],
                            'SonataAdminBundle'
                        )
                    );
                }
            }
        }

        return $this->redirectToRoute('admin_app_element_showEdit', ['id' => $id]);
    }
}
