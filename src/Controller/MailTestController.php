<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use App\Document\Coordinates;
use App\Document\ElementStatus;
use App\Document\ModerationState;
use App\Services\MailService;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Doctrine\ODM\MongoDB\DocumentManager;

class MailTestController extends Controller
{
   public function draftAutomatedAction(Request $request, SessionInterface $session, MailService $mailService,
                                        $mailType)
   {
      $draftResponse = $this->draftTest($mailType);

      if ($draftResponse == null) return new Response('No visible elements in database, please create an element');

      if ($draftResponse['success'])
      {
         $mailContent = $mailService->draftTemplate($draftResponse['content']);
         return $this->render('emails/test-emails.html.twig', array('subject' => $draftResponse['subject'], 'content' => $mailContent, 'mailType' => $mailType));
      }
      else
      {
         $session->getFlashBag()->add('error', 'Error : ' . $draftResponse['message']);
         return $this->redirectToRoute('admin_app_configuration_list');
      }
   }

   public function sentTestAutomatedAction(Request $request, SessionInterface $session, MailService $mailService,
                                           $mailType)
   {
      $mail = $request->get('email');

      if (!$mail) return new Response('Aucune adresse mail n\'a été renseignée');

      $draftResponse = $this->draftTest($mailType);

      if ($draftResponse == null)
      {
         $session->getFlashBag()->add('error', 'No elements in database, please create an element for email testing');
         return $this->redirectToRoute('admin_app_configuration_list');
      }

      if ($draftResponse['success'])
      {
         $result = $mailService->sendMail($mail,$draftResponse['subject'], $draftResponse['content']);
         if ($result['success'])
          $session->getFlashBag()->add('success', 'Le mail a bien été envoyé à ' . $mail . '</br>Si vous ne le voyez pas vérifiez dans vos SPAMs');
         else
          $session->getFlashBag()->add('error', $result['message']);
      }
      else
      {
         $session->getFlashBag()->add('error', 'Erreur : ' . $draftResponse['message']);
      }
      return $this->redirectToRoute('gogo_mail_draft_automated', array('mailType' => $mailType));
   }

  private function draftTest($mailType, DocumentManager $dm, MailService $mailService)
  {
     $options = null;

     if ($mailType == 'newsletter')
     {
        $element = $dm->getRepository('App\Document\User')->findOneByEnabled(true);
        $element->setLocation('bordeaux');
        $element->setGeo(new Coordinates(44.876,-0.512));
        $qb = $dm->createQueryBuilder('App\Document\Element');
        $qb->field('status')->gte(ElementStatus::AdminRefused);
        $qb->field('moderationState')->notIn(array(ModerationState::GeolocError, ModerationState::NoOptionProvided));
        $options = $qb->limit(30)->getQuery()->execute();
     }
     else
     {
      $element = $dm->getRepository('App\Document\Element')->findVisibles()->getSingleResult();
     }

     if (!$element) return null;

     $draftResponse = $mailService->draftEmail($mailType, $element, "Un customMessage de test", $options);
     return $draftResponse;
  }
}
