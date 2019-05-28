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

class ConfigurationMarkerAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'biopen_core_bundle_config_marker_admin_classname';

    protected $baseRoutePattern = 'biopen/core/configuration-marker';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper          
            ->with("Popup (contenu qui s'affiche par défault lors du sorvol d'un marqueur)",
                    ["description" => "Pour la configuration du template, référrez vous aux instructions données dans Modèle de Donnée / Fiche détail"])
                ->add('marker.displayPopup', 'checkbox', ['label' => 'Afficher la popup', 'required' => false])
                ->add('marker.popupAlwaysVisible', 'checkbox', ['label' => "Toujours afficher la popup (par défault elle ne s'affiche qu'au survol du marqueur)", 'required' => false]) 
                ->add('marker.popupTemplateUseMarkdown', 'checkbox', array('label' => 'Utiliser la syntaxe markdown pour ce template (sinon uniquement la syntaxe Nunjucks)', 'attr' => ['class' => 'use-markdown'], 'required' => false))
                ->add('marker.popupTemplate', 'text', array('label' => 'Contenu de la popup', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'twig', 'height' => '200'], 'required' => false))    
            ->end()
        ;            
    }
}
