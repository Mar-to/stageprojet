<?php

namespace App\Controller;

use App\Controller\GoGoController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Document\InteractionType;
use Symfony\Component\HttpFoundation\Request;
use App\Document\ElementStatus;
use App\Form\UserProfileType;
use Symfony\Component\Form\FormError;
use App\Document\Coordinates;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class UserController extends GoGoController
{
   public function userSpaceAction()
   {
      return $this->render('user/user-space.html.twig');
   }

   public function contributionsAction()
   {
      $dm = $this->get('doctrine_mongodb')->getManager();
      $user = $this->getUser();
      $userEmail = $user->getEmail();

      $elementsOwned = $dm->getRepository('App\Document\Element')->findElementsOwnedBy($userEmail);
      $elementsOwned = array_filter($elementsOwned->toArray(), function($element) use ($userEmail) {
         return !$element->isPending() || $element->getCurrContribution()->getUserEmail() != $userEmail;
      });

      $allContribs = $dm->getRepository('App\Document\UserInteractionContribution')->findByUserEmail($userEmail);

      $allContribs = array_filter($allContribs, function($interaction) {
         return in_array($interaction->getType(), [InteractionType::Add, InteractionType::Edit]);
      });
      $elementsUserHaveContributed = [];
      $pendingContribs = [];
      foreach ($allContribs as $key => $contrib) {
         if ($contrib->getStatus() == null) $pendingContribs[] = $contrib;

         if ($contrib->countAsValidContributionFrom($userEmail)
             && !in_array($contrib->getElement(), $elementsUserHaveContributed)
             && !in_array($contrib->getElement(), $elementsOwned)) {
            try { if ($contrib->getElement()->getName()) {
               array_push($elementsUserHaveContributed, $contrib->getElement());
            }} catch (\Exception $e) {}
         }
      }

      usort($pendingContribs, function ($a, $b) { return $b->getTimestamp() - $a->getTimestamp(); });
      usort($allContribs, function ($a, $b) { return $b->getTimestamp() - $a->getTimestamp(); });

      return $this->render('user/contributions/my-contributions.html.twig', array(
         'elementsOwned' => $elementsOwned,
         'elementsUserHaveContributed' => $elementsUserHaveContributed,
         'pendingContributions' => $pendingContribs,
         'allContributions' => $allContribs));
   }

   public function votesAction()
   {
      $dm = $this->get('doctrine_mongodb')->getManager();
      $user = $this->getUser();
      $userEmail = $user->getEmail();

      $votes = $dm->getRepository('App\Document\UserInteractionVote')->findByUserEmail($userEmail);
      usort($votes, function ($a, $b) { return $b->getTimestamp() - $a->getTimestamp(); });

      return $this->render('user/contributions/votes.html.twig', array('votes' => $votes));
   }

   public function reportsAction()
   {
      $dm = $this->get('doctrine_mongodb')->getManager();
      $user = $this->getUser();
      $userEmail = $user->getEmail();

      $reports = $dm->getRepository('App\Document\UserInteractionReport')->findByUserEmail($userEmail);
      usort($reports, function ($a, $b) { return $b->getTimestamp() - $a->getTimestamp(); });

      return $this->render('user/contributions/reports.html.twig', array('reports' => $reports));
   }

   public function becomeOwnerAction($id, Request $request, SessionInterface $session)
   {
      $dm = $this->get('doctrine_mongodb')->getManager();
      $element = $dm->getRepository('App\Document\Element')->find($id);

      if (!$element->getUserOwnerEmail()) {
         $user = $this->getUser();
         $userEmail = $user->getEmail();
         $element->setUserOwnerEmail($userEmail);
         $session->getFlashBag()->add('success', "Vous êtes maintenant propriétaire de la fiche " . $element->getName() . " !");
         $dm->flush();
      }
      else
      {
         $session->getFlashBag()->add('error', "Désolé, cet élément appartient déjà à quelqu'un !");
      }

      return $this->redirectToRoute('biopen_user_contributions');
   }

   public function profileAction(Request $request, SessionInterface $session)
   {
      $user = $this->getUser();
      $current_user = clone $user;
      $form = $this->get('form.factory')->create(UserProfileType::class, $user);
      $dm = $this->get('doctrine_mongodb')->getManager();
      $userRepo = $dm->getRepository('App\Document\User');
      $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

      if (!$user->getNewsletterRange()) $user->setNewsletterRange(50);

      $form->handleRequest($request);
      if ($form->isSubmitted() && $form->isValid())
      {
         $alreadyUsedEmail    = ($current_user->getEmail()    != $user->getEmail())    && count($userRepo->findByEmail($user->getEmail())) > 0;
         $alreadyUsedUserName = ($current_user->getUsername() != $user->getUsername()) && count($userRepo->findByUsername($user->getUsername())) > 0;
         $locationSetToReceiveNewsletter = $user->getNewsletterFrequency() > 0 && !$user->getLocation();
         $geocodeError = false;

         if ($user->getLocation()) {
             try
             {
                 $geocoded = $this->get('bazinga_geocoder.geocoder')->using('google_maps')->geocode($user->getLocation())->first();
                 $user->setGeo(new Coordinates($geocoded->getLatitude(), $geocoded->getLongitude()));
             }
             catch (\Exception $error) { $geocodeError = true; }
         }

         if ($form->isValid() /*&& !$alreadyUsedEmail */&& !$alreadyUsedUserName && !$locationSetToReceiveNewsletter && !$geocodeError)
         {
            $dm->persist($user);
            $dm->flush();
            $session->getFlashBag()->add('info', "Modifications sauvegardées !");
         }
         else
         {
            // if ($alreadyUsedEmail) $form->get('email')->addError(new FormError('Cet email est déjà utilisé'));
            if ($alreadyUsedUserName) $form->get('username')->addError(new FormError("Ce nom d'utilisateur est déjà pris !"));
            if ($locationSetToReceiveNewsletter) $form->get('location')->addError(new FormError("Si vous voulez recevoir les nouveaux ajouts, vous devez renseigner une adresse"));
            if ($geocodeError) $form->get('location')->addError(new FormError("Impossible de localiser cette adresse"));
         }
      }

      return $this->render('user/profile.html.twig', array('user' => $user, 'form' => $form->createView(), 'config' => $config));
   }
}
