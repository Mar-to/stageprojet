<?php

namespace App\Controller\Admin;

use App\Services\MailService;
use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Sonata\AdminBundle\Datagrid\ProxyQueryInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;

class UserAdminController extends Controller
{
    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    public function batchActionSendMail(ProxyQueryInterface $selectedModelQuery)
    {
        $selectedModels = $selectedModelQuery->execute();
        $nbreModelsToProceed = $selectedModels->count();
        $selectedModels->limit(5000);

        $request = $this->get('request_stack')->getCurrentRequest()->request;

        $mails = [];
        $usersWithoutEmail = 0;

        try {
            foreach ($selectedModels as $user) {
                $mail = $user->getEmail();
                if ($mail) {
                    $mails[] = $mail;
                } else {
                    ++$usersWithoutEmail;
                }
            }
        } catch (\Exception $e) {
            $this->addFlash('sonata_flash_error', 'ERROR : '.$e->getMessage());

            return new RedirectResponse($this->admin->generateUrl('list', $this->admin->getFilterParameters()));
        }

        if (!$request->get('mail-subject') || !$request->get('mail-content')) {
            $this->addFlash('sonata_flash_error', 'Vous devez renseigner un objet et un contenu. Veuillez recommencer');
        } elseif (count($mails) > 0) {
            $result = $this->mailService->sendMail(null, $request->get('mail-subject'), $request->get('mail-content'), $request->get('from'), $mails);
            if ($result['success']) {
                $this->addFlash('sonata_flash_success', count($mails).' mails ont bien été envoyés');
            } else {
                $this->addFlash('sonata_flash_error', $result['message']);
            }
        }

        if ($usersWithoutEmail > 0) {
            $this->addFlash('sonata_flash_error', $usersWithoutEmail." mails n'ont pas pu être envoyé car aucune adresse mail n'était renseignée");
        }

        if ($nbreModelsToProceed >= 5000) {
            $this->addFlash('sonata_flash_info', "Trop d'éléments à traiter ! Seulement 5000 ont été traités");
        }

        return new RedirectResponse($this->admin->generateUrl('list', $this->admin->getFilterParameters()));
    }
}
