<?php

namespace App\Controller;

use App\Document\Coordinates;
use App\Document\ElementStatus;
use App\Document\ModerationState;
use App\Services\MailService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MailTestController extends Controller
{
    public function __construct(DocumentManager $dm, MailService $mailService)
    {
        $this->dm = $dm;
        $this->mailService = $mailService;
    }

    public function draftAutomatedAction($mailType)
    {
        $draftResponse = $this->draftTest($mailType);

        if (null == $draftResponse) {
            return new Response('No visible elements in database, please create an element');
        }

        if ($draftResponse['success']) {
            $mailContent = $this->mailService->draftTemplate($draftResponse['content']);

            return $this->render('emails/test-emails.html.twig', ['subject' => $draftResponse['subject'], 'content' => $mailContent, 'mailType' => $mailType]);
        } else {
            $this->addFlash('error', 'Error : '.$draftResponse['message']);

            return $this->redirectToRoute('admin_app_configuration_list');
        }
    }

    public function sentTestAutomatedAction(Request $request, $mailType)
    {
        $mail = $request->get('email');

        if (!$mail) {
            return new Response('Aucune adresse mail n\'a été renseignée');
        }

        $draftResponse = $this->draftTest($mailType);

        if (null == $draftResponse) {
            $this->addFlash('error', 'No elements in database, please create an element for email testing');

            return $this->redirectToRoute('admin_app_configuration_list');
        }

        if ($draftResponse['success']) {
            $result = $this->mailService->sendMail($mail, $draftResponse['subject'], $draftResponse['content']);
            if ($result['success']) {
                $this->addFlash('success', 'Le mail a bien été envoyé à '.$mail.'</br>Si vous ne le voyez pas vérifiez dans vos SPAMs');
            } else {
                $this->addFlash('error', $result['message']);
            }
        } else {
            $this->addFlash('error', 'Erreur : '.$draftResponse['message']);
        }

        return $this->redirectToRoute('gogo_mail_draft_automated', ['mailType' => $mailType]);
    }

    private function draftTest($mailType)
    {
        $options = null;

        if ('newsletter' == $mailType) {
            $element = $this->dm->get('User')->findOneByEnabled(true);
            $element->setLocation('bordeaux');
            $element->setGeo(new Coordinates(44.876, -0.512));
            $qb = $this->dm->query('Element');
            $qb->field('status')->gte(ElementStatus::AdminRefused);
            $qb->field('moderationState')->notIn([ModerationState::GeolocError, ModerationState::NoOptionProvided]);
            $options = $qb->limit(30)->execute();
        } else {
            $element = $this->dm->get('Element')->findVisibles()->getSingleResult();
        }

        if (!$element) {
            return null;
        }

        $draftResponse = $this->mailService->draftEmail($mailType, $element, 'Un customMessage de test', $options);

        return $draftResponse;
    }
}
