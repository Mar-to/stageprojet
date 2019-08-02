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

class ConfigurationMapAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'biopen_core_bundle_config_map_admin_classname';

    protected $baseRoutePattern = 'biopen/core/configuration-map';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $featureStyle = array('class' => 'col-md-6 col-lg-3 gogo-feature');
        $featureFormOption = ['delete' => false, 'required'=> false, 'label_attr'=> ['style'=> 'display:none']];
        $featureFormTypeOption = ['edit' => 'inline'];
        $container = $this->getConfigurationPool()->getContainer();
        $em = $container->get('doctrine_mongodb')->getManager();
        $config = $em->getRepository('BiopenCoreBundle:Configuration')->findConfiguration();

        $formMapper
            ->tab('Paramètres de la carte')
                ->with('La carte')
                    ->add('defaultTileLayer', 'sonata_type_model', array(
                            'class'=> 'Biopen\CoreBundle\Document\TileLayer',
                            'required' => true,
                            'choices_as_values' => true,
                            'label' => 'Fond de carte par défaut (enregistez pour voir apparaitre le fond délectionné sur la carte ci-dessous)'))
                    ->add('defaultViewPicker', 'hidden', array('mapped' => false, 'attr' => [
                                                        'class' => 'gogo-viewport-picker',
                                                        'data-title-layer' => $config->getDefaultTileLayer()->getUrl(),
                                                        'data-default-bounds' => json_encode($config->getDefaultBounds())
                                                    ]))
                    ->add('defaultNorthEastBoundsLat', 'hidden', ['attr' => ['class' => 'bounds NELat']])
                    ->add('defaultNorthEastBoundsLng', 'hidden', ['attr' => ['class' => 'bounds NELng']])
                    ->add('defaultSouthWestBoundsLat', 'hidden', ['attr' => ['class' => 'bounds SWLat']])
                    ->add('defaultSouthWestBoundsLng', 'hidden', ['attr' => ['class' => 'bounds SWLng']])
                ->end()
                ->with('Cookies')
                    ->add('saveViewportInCookies', 'checkbox', array('label' => "Sauvegarder la position courante de la carte dans les cookies", 'required' => false))
                    ->add('saveTileLayerInCookies', 'checkbox', array('label' => "Sauvegarder le choix du fond de carte par l'utilisateur dans les cookies", 'required' => false))
                ->end()
            ->end()
            ->tab('Fonctionnalités')
                ->with('Favoris', $featureStyle)
                    ->add('favoriteFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with('Partage de l\'URL', $featureStyle)
                    ->add('shareFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with('Calcul Itinéraire', $featureStyle)
                    ->add('directionsFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with('Signalement d\'une erreur', $featureStyle)
                    ->add('reportFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with('Etiquetter les éléments', $featureStyle)
                    ->add('stampFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()


                ->with('Mode Liste', $featureStyle)
                    ->add('listModeFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with("Recherche d'un lieu", $featureStyle)
                    ->add('searchPlaceFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with("Bouton geolocalisation", $featureStyle)
                    ->add('searchGeolocateFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with("Recherche d'un élément", $featureStyle)
                    ->add('searchElementsFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()

                ->with('Choix du fond de carte', $featureStyle)
                    ->add('layersFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with('Revenir à la vue par défault', $featureStyle)
                    ->add('mapDefaultViewFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with('Export Iframe', $featureStyle)
                    ->add('exportIframeFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
                ->with('Affichage des éléments en attente de validation', $featureStyle)
                    ->add('pendingFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)->end()
            ->end()
            ->tab('Message personnalisé')
                ->with('Message personnalisé à faire apparaitre dans un coin de la carte', ['class' => 'gogo-feature'])
                    ->add('customPopupFeature','sonata_type_admin', $featureFormOption, $featureFormTypeOption)
                    ->add('customPopupText', 'sonata_simple_formatter_type', array(
                            'format' => 'richhtml',
                            'label' => 'Texte à afficher (Exemple: "Ce site est encore en version bêta !")',
                            'label_attr' => ['style' => 'margin-top: 20px'],
                            'ckeditor_context' => 'full',
                            'required' => false
                    ))
                    ->add('customPopupId', null, array('label' => 'Numéro de version du popup (à changer quand vous modifiez le texte)', 'required' => false))
                    ->add('customPopupShowOnlyOnce', null, array('label' => "Afficher la popup une fois seulement (si l'utilisateur la ferme, il ne la reverra plus jusqu'à ce que vous changiez le numéro de version)", 'required' => false))
                ->end()
            ->end()
            ->tab('Menu')
                ->with('Menu (contient les filtre des catégories et la barre de recherche)')
                    ->add('menu.width', 'number', array('label' => "Largueur du menu", 'required' => false, 'attr' => ['placeholder' => '290']))
                    ->add('menu.smallWidthStyle', 'checkbox', array('label' => "Utiliser un style compréssé", 'label_attr' => ['title' => "Diminue un peu la taille de la police et les marges. Pratique lorsque le nom des catégories sont longues que l'on veut gagner en largeur"], 'required' => false))
                    ->add('menu.showOnePanePerMainOption', 'checkbox', array('label' => "Afficher un sous menu pour chaque catégorie principale", 'required' => false))
                    ->add('menu.showCheckboxForMainFilterPane', 'checkbox', array('label' => "Afficher les checkbox dans la panneau principal", 'required' => false))
                    ->add('menu.showCheckboxForSubFilterPane', 'checkbox', array('label' => "Afficher les checkbox dans les sous panneaux",  'label_attr' => ['title' => "Valable uniquement si \"afficher un sous menu pour chaque catégorie principale\" est coché"], 'required' => false))
                    ->add('menu.displayNumberOfElementForEachCategory', 'checkbox', array('label' => "Pour chaque catégorie, afficher le nombre d'élément ayant cette catégorie", 'required' => false))
                    ->add('menu.displayNumberOfElementRoundResults', 'checkbox', array('label' => "Arrondir les résultat (afficher 300+ au lieu de 326)",  'label_attr' => ['title' => "Valable uniquement si \"afficher le nombre d'éléments par catégorie\" est coché"], 'required' => false))
                ->end()
            ->end()
        ;
    }
}
