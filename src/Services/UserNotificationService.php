<?php

namespace App\Services;

use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Routing\RouterInterface;

class UserNotificationService
{
    public function __construct(DocumentManager $dm, MailService $mailService,
                                UrlService $urlService)
    {
        $this->dm = $dm;
        $this->mailService = $mailService;
        $this->urlService = $urlService;
    }

    function sendModerationNotifications()
    {
        $users = $this->dm->get('User')->findByWatchModeration(true);
        $usersNotified = 0;
        foreach ($users as $user) {
            $elementsCount = $this->dm->get('Element')
                                  ->findModerationElementToNotifyToUser($user);
            if ($elementsCount > 0) {
                // strange bug, if using doctrine we get the config of the root project... so using MongoClient instead
                // Update: I think the bug does not occurs anymore...
                $config = $this->dm->getCollection('Configuration')->findOne();
                $subject = "Des éléments sont à modérer sur {$config['appName']}";
                $url = $this->urlService->generateUrlFor($config['dbName'], 'gogo_directory');
                $editPreferenceUrl = $this->urlService->generateUrlFor($config['dbName'], 'admin_app_user_edit', ['id' => $user->getId()]);
                $elementsCountText = $elementsCount == 1 ? "{$config['elementDisplayName']} est" : "{$config['elementDisplayNamePlural']} sont";
                $content = "Bonjour !</br></br>$elementsCount $elementsCountText à modérer sur la carte \"{$config['appName']}\"</br></br>
                <a href='{$url}'>Accéder à la carte</a></br></br>
                Pour changer vos préférences de notification, <a href='$editPreferenceUrl'>cliquez ici</a>";
                $this->mailService->sendMail($user->getEmail(), $subject, $content);
                $usersNotified++;
            }
        }   
        return $usersNotified; 
    }

    function notifyImportError($import)
    {
        if (!$import->isDynamicImport()) return;
        foreach($import->getUsersToNotify() as $user) {
            $config = $this->dm->get('Configuration')->findConfiguration();
            $importUrl = $this->urlService->generateUrlFor($config, 'admin_app_import_edit', ['id' => $import->getId()]);
            $subject = "Des erreurs ont eu lieu lors d'un import sur {$config->getAppName()}";
            $content = "Bonjour !</br></br>L'import {$import->getSourceName()} semble avoir quelques soucis.. <a href='$importUrl'>Cliquez ici</a> pour essayer d'y remédier";
            $this->mailService->sendMail($user->getEmail(), $subject, $content);
        }
    }

    function notifyImportMapping($import)
    {
        if (!$import->isDynamicImport()) return;
        foreach($import->getUsersToNotify() as $user) {
            $config = $this->dm->get('Configuration')->findConfiguration();
            $importUrl = $this->urlService->generateUrlFor($config, 'admin_app_import_edit', ['id' => $import->getId()]);
            $subject = "Action requise pour un import sur {$config->getAppName()}";
            $content = "Bonjour !</br></br>L'import {$import->getSourceName()} a de nouveaux champs ou de nouvelles catégories qui auraient peut être besoin de votre attention.. <a href='$importUrl'>Cliquez ici</a> pour accéder aux tables de correspondances";
            $this->mailService->sendMail($user->getEmail(), $subject, $content);
        }
    }
}