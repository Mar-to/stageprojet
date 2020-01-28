<?php

namespace App\Controller\Admin\BulkActions;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class DataUpdateActionsController extends BulkActionsAbstractController
{
   public function updateGamificationAction(Request $request, SessionInterface $session)
   {
      $dm = $this->get('doctrine_mongodb')->getManager();
      $qb = $dm->createQueryBuilder('BiopenCoreBundle:User');
      $qb->field('email')->notEqual(null);
      $query = $qb->getQuery();
      $users = $query->execute();

      $gamificationService = $this->get('gogo_user.gamification');

      $i = 0;
      foreach ($users as $key => $user)
      {
         $gamificationService->updateGamification($user);

         if ((++$i % 100) == 0) {
            $dm->flush();
            $dm->clear();
         }
      }

      $dm->flush();
      $dm->clear();

      $session->getFlashBag()->add('success', count($users) . " utilisateurs ont été mis à jour");
      return $this->redirect($this->generateUrl('admin_gogo_core_user_list'));
   }
}