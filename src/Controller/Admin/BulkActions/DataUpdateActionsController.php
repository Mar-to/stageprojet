<?php

namespace App\Controller\Admin\BulkActions;

use App\Application\Sonata\UserBundle\Services\GamificationService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class DataUpdateActionsController extends BulkActionsAbstractController
{
    public function updateGamificationAction(Request $request, SessionInterface $session, DocumentManager $dm,
                                            GamificationService $gamificationService)
    {
        $qb = $dm->query('User');
        $qb->field('email')->notEqual(null);
        $query = $qb->getQuery();
        $users = $query->execute();

        $i = 0;
        foreach ($users as $key => $user) {
            $gamificationService->updateGamification($user);

            if (0 == (++$i % 100)) {
                $dm->flush();
                $dm->clear();
            }
        }

        $dm->flush();
        $dm->clear();

        $session->getFlashBag()->add('success', count($users).' utilisateurs ont été mis à jour');

        return $this->redirect($this->generateUrl('admin_app_user_list'));
    }
}
