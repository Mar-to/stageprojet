<?php

namespace App\Services;

use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Routing\RouterInterface;

class UserNotificationService
{
    public function __construct(DocumentManager $dm, MailService $mailService,
                                RouterInterface $router, $baseUrl)
    {
        $this->dm = $dm;
        $this->mailService = $mailService;
        $this->baseUrl = $baseUrl;
        $this->router = $router;
    }

    function sendModerationNotifications()
    {
        $users = $this->dm->getRepository('App\Document\User')
                    ->findByWatchModeration(true);
        foreach ($users as $user) {
            $elementsCount = $this->dm->getRepository('App\Document\Element')
                                  ->findModerationElementToNotifyToUser($user);
            if ($elementsCount > 0) {
                $config = $this->dm->getRepository('App\Document\Configuration')->findConfiguration();

                $subject = "Des éléments sont à modérer sur {$config->getAppName()}";
                $url = $this->generateRoute($config, 'gogo_directory');
                $editPreferenceUrl = $this->generateRoute($config, 'admin_app_user_edit', ['id' => $user->getId()]);
                $elementsCountText = $elementsCount == 1 ? "{$config->getElementDisplayName()} est" : "{$config->getElementDisplayNamePlural()} sont";
                $content = "Bonjour !</br></br>$elementsCount $elementsCountText à modérer sur la carte \"{$config->getAppName()}\"</br></br>
                <a href='{$url}'>Accéder à la carte</a></br></br>
                Pour changer vos préférences de notification, <a href='$editPreferenceUrl'>cliquez ici</a>";
                $this->mailService->sendMail($user->getEmail(), $subject, $content);
            }
        }    
    }

    private function generateRoute($config, $route, $params = [])
    {
        return 'http://'.$config->getDbName().'.'.$this->baseUrl . $this->router->generate($route, $params);
    }

    function notifyImportError($import)
    {
        if (!$import->isDynamicImport()) return;
        $import->getUsersToNotify()->count();
        foreach($import->getUsersToNotify() as $user) {
            $config = $this->dm->getRepository('App\Document\Configuration')->findConfiguration();
            $importUrl = $this->generateRoute($config, 'admin_app_import_edit', ['id' => $import->getId()]);
            $subject = "Des erreurs ont eu lieu lors d'un import sur {$config->getAppName()}";
            $content = "Bonjour !</br></br>L'import {$import->getSourceName()} semble avoir quelques soucis.. <a href='$importUrl'>Cliquez ici</a> pour essayer d'y remédier";
            $this->mailService->sendMail($user->getEmail(), $subject, $content);
        }
    }

    function notifyImportMapping($import)
    {
        if (!$import->isDynamicImport()) return;
        foreach($import->getUsersToNotify() as $user) {
            $config = $this->dm->getRepository('App\Document\Configuration')->findConfiguration();
            $importUrl = $this->generateRoute($config, 'admin_app_import_edit', ['id' => $import->getId()]);
            $subject = "Action requise pour un import sur {$config->getAppName()}";
            $content = "Bonjour !</br></br>L'import {$import->getSourceName()} a de nouveaux champs ou de nouvelles catégories qui auraient peut être besoin de votre attention.. <a href='$importUrl'>Cliquez ici</a> pour accéder aux tables de correspondances";
            $this->mailService->sendMail($user->getEmail(), $subject, $content);
        }
    }
}