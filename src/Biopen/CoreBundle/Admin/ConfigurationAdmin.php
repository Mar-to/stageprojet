<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */
namespace Biopen\CoreBundle\Admin;

use Biopen\CoreBundle\Admin\ConfigurationAbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;

class ConfigurationAdmin extends ConfigurationAbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $imagesOptions = array(
            'class'=> 'Biopen\CoreBundle\Document\ConfImage', 
            'placeholder' => "Séléctionnez une image déjà importée, ou ajoutez en une !",
            'required' => false, 
            'choices_as_values' => true,
            'label' => 'Logo',
            'mapped' => true
        );

        $featureStyle = array('class' => 'col-md-6 col-lg-3');
        $contributionStyle = array('class' => 'col-md-6 col-lg-4');
        $mailStyle = array('class' => 'col-md-12 col-lg-6');
        $featureFormOption = ['delete' => false, 'required'=> false, 'label_attr'=> ['style'=> 'display:none']];
        $featureFormTypeOption = ['edit' => 'inline'];

        $dm = $this->getConfigurationPool()->getContainer()->get('doctrine_mongodb');
        $apiProperties = $dm->getRepository('BiopenGeoDirectoryBundle:Element')->findAllCustomProperties();

        $formMapper
            ->with('Le site', array('class' => 'col-md-6', "description" => '<div class="iframe-container"><iframe height="110" sandbox="allow-same-origin allow-scripts" src="https://video.colibris-outilslibres.org/videos/embed/fc7d3784-7bd1-4f3a-b915-ab6daefdd52d" frameborder="0" allowfullscreen></iframe></div>'))
                ->add('appName', null, array('label' => 'Nom du site'))  
                ->add('appBaseline', null, array('label' => 'Description du site (baseline)','required' => false))  
                ->add('appTags', null, array('label' => 'Mot clés pour le référencement (séparés par une virgule)', 'required' => false))  
                ->add('dataLicenseUrl', null, array('label' => 'Url de la licence qui protège vos données', 'required' => false))  
            ->end()
            ->with('Images générales', array('class' => 'col-md-6'))
                ->add('logo', 'sonata_type_model', $imagesOptions)
                ->add('logoInline', 'sonata_type_model', array_replace($imagesOptions,['label' => 'Logo pour la barre de menu']))
                ->add('socialShareImage', 'sonata_type_model', array_replace($imagesOptions,['label' => "Image à afficher lors d'un partage sur les réseaux sociaux"]))
                ->add('favicon', 'sonata_type_model', array_replace($imagesOptions,['label' => 'Favicon']))
            ->end()
            ->with('Fonctions principales', array('class' => 'col-md-6'))
                ->add('activateHomePage', null, array('label' => "Activer la page d'accueil", 'required' => false))
                ->add('activatePartnersPage', null, array('label' => 'Activer la page type "Partenaires"', 'required' => false))
                ->add('partnerPageTitle', null, array('label' => 'Titre de la page "Partenaires"', 'required' => false))
                ->add('activateAbouts', null, array('label' => 'Activer les popups type "A propos"', 'required' => false))
                ->add('aboutHeaderTitle', null, array('label' => 'Titre de la section "A propos"', 'required' => false))
            ->end() 
            ->with('Nom des entités référencées sur l\'annuaire', array('class' => 'col-md-6'))
                ->add('elementDisplayName', null, array('label' => "Nom"))
                ->add('elementDisplayNameDefinite', null, array('label' => 'Nom avec article défini'))  
                ->add('elementDisplayNameIndefinite', null, array('label' => 'Nom avec article indéfini'))  
                ->add('elementDisplayNamePlural', null, array('label' => 'Nom pluriel '))  
            ->end()    
        ;
    }
}