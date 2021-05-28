<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use App\Document\CodeInvitation;
use App\Repository\CodeInvitationRepository;


class KeyController extends Controller
{
    public function indexAction()
    {
        return $this->render('admin/pages/key.html.twig');
    }

    public function generateAction(SessionInterface $session, DocumentManager $dm)
    {
        $keyLength = 10;
        $key = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($keyLength/strlen($x)) )),1,$keyLength);

        $new_CodeInvitation = new CodeInvitation();
        $new_CodeInvitation->setCode($key);
        $today = date("d.m.y");
        $new_CodeInvitation->setDate(strtotime($today. ' + 6 months'));
        $new_CodeInvitation->setUsable('1');
        $new_CodeInvitation->setActive(true);
        
        $dm->persist($new_CodeInvitation);

        // we trigger saving of all abouts
        $dm->flush();
        
        $session->getFlashBag()->add('success', ' La clé générée est : '.$key);

        return $this->redirect($this->generateUrl('admin_app_codeinvitation_list'));
    }
}
