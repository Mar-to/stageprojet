<?php

namespace App\Application\Hwi\OAuthBundle\Controller;

use HWI\Bundle\OAuthBundle\Controller\ConnectController as BaseController;
use Symfony\Component\HttpFoundation\Request;

class ConnectController extends BaseController
{
    // this route is just about using the root instance domain, and then redirect to the subdomain
    // So we don't need to register each subdomain for the SSO
    public function gogoOAuthAction(Request $request, $ressourcePath)
    {
        $domainName = $request->get('domainName');
        $url = 'http://'.$domainName.'.'.$this->getParameter('base_url'). "/login/$ressourcePath?";
        foreach($request->query->all() as $key => $value)
            $url = $url . "$key=$value&";
        return $this->redirect($url);
    }
}

