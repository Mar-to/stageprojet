<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class ConfigurationMarkerAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_marker_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-marker';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with("Popup (contenu qui s'affiche par défault lors du sorvol d'un marqueur)",
                    ['description' => 'Pour la configuration du template, référrez vous aux instructions données dans Modèle de Donnée / Fiche détail'])
                ->add('marker.displayPopup', CheckboxType::class, ['label' => 'Afficher la popup', 'required' => false])
                ->add('marker.popupAlwaysVisible', CheckboxType::class, ['label' => "Toujours afficher la popup (par défault elle ne s'affiche qu'au survol du marqueur)", 'required' => false])
                ->add('marker.popupTemplateUseMarkdown', CheckboxType::class, ['label' => 'Utiliser la syntaxe markdown pour ce template (sinon uniquement la syntaxe Nunjucks)', 'attr' => ['class' => 'use-markdown'], 'required' => false])
                ->add('marker.popupTemplate', null, ['label' => 'Contenu de la popup', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'twig', 'height' => '200'], 'required' => false])
            ->end()
            ->with("Clusters (grouper les marqueurs lorsqu'ils sont proches les uns des autres)",
                    ['description' => "Sans utiliser les clusters, à partir de 1000 marqueurs affichés sur l'écran cela peut causer des ralentissements pour l'utilisateur"])
                ->add('marker.useClusters', CheckboxType::class, ['label' => 'Activer les clusters', 'required' => false])
            ->end()
        ;
    }
}
