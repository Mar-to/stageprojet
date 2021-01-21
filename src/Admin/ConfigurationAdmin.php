<?php

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ModelType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;

class ConfigurationAdmin extends ConfigurationAbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $imagesOptions = [
            'class' => 'App\Document\ConfImage',
            'placeholder' => 'Séléctionnez une image déjà importée, ou ajoutez en une !',
            'required' => false,
            'label' => 'Logo',
            'mapped' => true,
        ];

        $container = $this->getConfigurationPool()->getContainer();

        $formMapper
            ->with('Le site', ['class' => 'col-md-6', 'description' => '<div class="iframe-container"><iframe height="110" sandbox="allow-same-origin allow-scripts" src="https://video.colibris-outilslibres.org/videos/embed/fc7d3784-7bd1-4f3a-b915-ab6daefdd52d" frameborder="0" allowfullscreen></iframe></div>']);
        if ($container->getParameter('use_as_saas')) {
            $formMapper
                ->add('publishOnSaasPage', null, ['label' => 'Rendre ce projet visible sur ' . $container->getParameter('base_url'), 'required' => false]);
        }
        $formMapper
                ->add('appName', null, ['label' => 'Nom du site'])
                ->add('appBaseline', null, ['label' => 'Description du site (baseline)', 'required' => false])
                ->add('appTags', null, ['label' => 'Mot clés pour le référencement (séparés par une virgule)', 'required' => false])
                ->add('customDomain', UrlType::class, ['label' => "Utiliser un nom de domaine personnalisé (exple macarte.org au lieu de macarte.gogocarto.fr). Après avoir acheté le nom de domaine macarte.org, vous devez d'abords le rediriger sur l'adresse IP du serveur GoGoCarto (" . $_SERVER['SERVER_ADDR'] ."). Ensuite renseignez ici le nom de votre domaine, et attendez le temps que cela soit configuré par GoGoCarto (une tentative est effectuée toute les heures). GoGoCarto abandonne au bout de 4 tentatives", 'label_attr' => ['title' => 'Si au bout de plusieurs heures rien ne se passe, vous devrez remettre vide la configuration du sous domaine, sauvegarder, puis la reremplir pour créer un nouvel essai'], 'required' => false])
                ->add('dataLicenseUrl', null, ['label' => 'Url de la licence qui protège vos données', 'required' => false])
            ->end()
            ->with('Images générales', ['class' => 'col-md-6'])
                ->add('logo', ModelType::class, $imagesOptions)
                ->add('logoInline', ModelType::class, array_replace($imagesOptions, ['label' => 'Logo pour la barre de menu']))
                ->add('socialShareImage', ModelType::class, array_replace($imagesOptions, ['label' => "Image à afficher lors d'un partage sur les réseaux sociaux"]))
                ->add('favicon', ModelType::class, array_replace($imagesOptions, ['label' => 'Favicon']))
            ->end()
            ->with('Fonctions principales', ['class' => 'col-md-6'])
                ->add('activateHomePage', null, ['label' => "Activer la page d'accueil", 'required' => false])
                ->add('activatePartnersPage', null, ['label' => 'Activer la page type "Partenaires"', 'required' => false])
                ->add('partnerPageTitle', null, ['label' => 'Titre de la page "Partenaires"', 'required' => false])
                ->add('activateAbouts', null, ['label' => 'Activer les popups type "A propos"', 'required' => false])
                ->add('aboutHeaderTitle', null, ['label' => 'Titre de la section "A propos"', 'required' => false])
            ->end()
            ->with('Nom des entités référencées sur l\'annuaire', ['class' => 'col-md-6'])
                ->add('elementDisplayName', null, ['label' => 'Nom'])
                ->add('elementDisplayNameDefinite', null, ['label' => 'Nom avec article défini'])
                ->add('elementDisplayNameIndefinite', null, ['label' => 'Nom avec article indéfini'])
                ->add('elementDisplayNamePlural', null, ['label' => 'Nom pluriel '])
            ->end()
        ;
    }
}
