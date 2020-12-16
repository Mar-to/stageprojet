<?php

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;

class ConfigurationMobileAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_mobile_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-mobile';
    
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('Application mobile simulée (Progressive Web App)', ['description' => "Gogocarto est nativement une <b>Progressive Web App</b>: lorsqu'un utilisateur visite le site depuis son téléphone portable, il aura la possibilité d'ajouter un raccourci sur son écran d'accueil. En cliquant sur ce raccourci, le site s'ouvrira en plein écran comme une application mobile standard."])
                ->add('appNameShort', null, ['label' => 'Nom court de l\'application (12 caractères max.)', 'required' => false])
                ->add('hideHeaderInPwa', null, ['label' => "Masquer la barre du haut lorsque la carte est ouverte en mode PWA", 'required' => false])                
            ->end()
            ->with('Vrai application mobile (Trusted Web Activity)', ['description' => 'Cette fonctionalité est en cours de test, merci de patienter pour de future explications'])
                ->add('packageName', null, ['label' => 'Nom de domaine de l\'appli (si vous la publiez en tant que TWA). Format: fr.gogocarto.macarto', 'required' => false])
                ->add('sha256CertFingerprints', null, ['label' => 'Empreintes du certificat SHA256 (si vous la publiez en tant que TWA). Format: 57:2B:36:...', 'required' => false])
            ->end()
        ;
    }
}
