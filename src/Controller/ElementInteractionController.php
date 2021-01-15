<?php

/**
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @copyright Copyright (c) 2016 Sebastian Castro - 90scastro@gmail.com
 * @license    MIT License
 * @Last Modified time: 2018-04-07 16:22:43
 */

namespace App\Controller;

use App\Document\UserInteractionReport;
use App\Services\ConfigurationService;
use App\Services\ElementActionService;
use App\Services\ElementVoteService;
use App\Services\MailService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ElementInteractionController extends Controller
{
    public function voteAction(Request $request, DocumentManager $dm, ConfigurationService $confService,
                               ElementVoteService $voteService)
    {
        if (!$confService->isUserAllowed('vote', $request)) {
            return $this->returnResponse(false, "Désolé, vous n'êtes pas autorisé à voter !");
        }

        // CHECK REQUEST IS VALID
        if (!$request->get('elementId') || null === $request->get('value')) {
            return $this->returnResponse(false, 'Les paramètres du vote sont incomplets');
        }

        $element = $dm->get('Element')->find($request->get('elementId'));

        $resultMessage = $voteService->voteForElement($element, $request->get('value'),
                                                      $request->get('comment'),
                                                      $request->get('userEmail'));

        return $this->returnResponse(true, $resultMessage, $element->getStatus());
    }

    public function reportErrorAction(Request $request, DocumentManager $dm, ConfigurationService $confService)
    {
        if (!$confService->isUserAllowed('report', $request)) {
            return $this->returnResponse(false, "Désolé, vous n'êtes pas autorisé à signaler d'erreurs !");
        }

        // CHECK REQUEST IS VALID
        if (!$request->get('elementId') || null === $request->get('value') || !$request->get('userEmail')) {
            return $this->returnResponse(false, 'Les paramètres du signalement sont incomplets');
        }

        $element = $dm->get('Element')->find($request->get('elementId'));

        $report = new UserInteractionReport();
        $report->setValue($request->get('value'));
        $report->updateUserInformation($this->container->get('security.token_storage'), $request->get('userEmail'));
        $comment = $request->get('comment');
        if ($comment) {
            $report->setComment($comment);
        }

        $element->addReport($report);

        $element->updateTimestamp();

        $dm->persist($element);
        $dm->flush();

        return $this->returnResponse(true, 'Merci, votre signalement a bien été enregistré !');
    }

    public function deleteAction(Request $request, DocumentManager $dm, ConfigurationService $confService,
                                 ElementActionService $elementActionService)
    {
        if (!$confService->isUserAllowed('delete', $request)) {
            return $this->returnResponse(false, "Désolé, vous n'êtes pas autorisé à supprimer un élément !");
        }

        // CHECK REQUEST IS VALID
        if (!$request->get('elementId')) {
            return $this->returnResponse(false, 'Les paramètres sont incomplets');
        }

        $element = $dm->get('Element')->find($request->get('elementId'));
        $dm->persist($element);

        $elementActionService->delete($element, true, $request->get('message'));

        $dm->flush();

        return $this->returnResponse(true, "L'élément a bien été supprimé");
    }

    public function resolveReportsAction(Request $request, DocumentManager $dm,
                                         ConfigurationService $confService,
                                         ElementActionService $elementActionService)
    {
        if (!$confService->isUserAllowed('directModeration', $request)) {
            return $this->returnResponse(false, "Désolé, vous n'êtes pas autorisé à modérer cet élément !");
        }

        // CHECK REQUEST IS VALID
        if (!$request->get('elementId')) {
            return $this->returnResponse(false, 'Les paramètres sont incomplets');
        }

        $element = $dm->get('Element')->find($request->get('elementId'));

        $elementActionService->resolveReports($element, $request->get('comment'), true);

        $dm->persist($element);
        $dm->flush();

        return $this->returnResponse(true, "L'élément a bien été modéré");
    }

    public function sendMailAction(Request $request, DocumentManager $dm, ConfigurationService $confService,
                                   MailService $mailService)
    {
        // CHECK REQUEST IS VALID
        if (!$request->get('elementId') || !$request->get('subject') || !$request->get('content') || !$request->get('userEmail')) {
            return $this->returnResponse(false, 'Les paramètres sont incomplets');
        }

        $element = $dm->get('Element')->find($request->get('elementId'));

        $senderMail = $request->get('userEmail');

        // TODO make it configurable
        $mailSubject = 'Message reçu depuis la plateforme '.$this->getParameter('instance_name');
        $mailContent =
            '<p>Bonjour <i>'.$element->getName().'</i>,</p>
            <p>Vous avez reçu un message de la part de <a href="mailto:'.$senderMail.'">'.$senderMail.'</a></br>
            </p>
            <p><b>Titre du message</b></p><p> '.$request->get('subject').'</p>
            <p><b>Contenu</b></p><p> '.$request->get('content').'</p>';

        $mailService->sendMail($element->getEmail(), $mailSubject, $mailContent);

        return $this->returnResponse(true, "L'email a bien été envoyé");
    }

    public function stampAction(Request $request, DocumentManager $dm)
    {
        // CHECK REQUEST IS VALID
        if (!$request->get('stampId') || null === $request->get('value') || !$request->get('elementId')) {
            return $this->returnResponse(false, 'Les paramètres sont incomplets');
        }

        $element = $dm->get('Element')->find($request->get('elementId'));
        $stamp = $dm->get('Stamp')->find($request->get('stampId'));
        $user = $this->getUser();

        if (!in_array($stamp, $user->getAllowedStamps()->toArray())) {
            return $this->returnResponse(false, "Vous n'êtes pas autorisé à utiliser cette étiquette");
        }

        if ('true' == $request->get('value')) {
            if (!in_array($stamp, $element->getStamps()->toArray())) {
                $element->addStamp($stamp);
            }
        } else {
            $element->removeStamp($stamp);
        }

        $dm->persist($element);
        $dm->flush();

        return $this->returnResponse(true, "L'étiquette a bien été modifiée", $element->getStampIds());
    }

    private function returnResponse($success, $message, $data = null)
    {
        $response['success'] = $success;
        $response['message'] = $message;
        if (null !== $data) {
            $response['data'] = $data;
        }

        $responseJson = json_encode($response);
        $response = new Response($responseJson);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}
