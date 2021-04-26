<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class KeyController extends Controller
{
    public function indexAction()
    {
        return $this->render('admin/pages/key.html.twig');
    }

    public function generateAction(SessionInterface $session)
    {
        $keyLength = 10;
        $key = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($keyLength/strlen($x)) )),1,$keyLength);

        $session->getFlashBag()->add('success', ' La clé générée est : '.$key);

        return $this->redirect($this->generateUrl('gogo_core_key'));
    }
}
