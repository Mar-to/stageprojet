<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\AdminType;
use Sonata\AdminBundle\Form\Type\ModelType;
use Sonata\FormatterBundle\Form\Type\SimpleFormatterType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use App\Helper\GoGoHelper;

class ConfigurationMapAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_map_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-map';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $featureStyle = ['class' => 'col-md-6 col-lg-3 gogo-feature'];
        $featureFormOption = ['delete' => false, 'required' => false, 'label_attr' => ['style' => 'display:none']];
        $featureFormTypeOption = ['edit' => 'inline'];
        $dm = GoGoHelper::getDmFromAdmin($this);
        $config = $dm->get('Configuration')->findConfiguration();

        $formMapper
            ->tab('Paramètres de la carte')
                ->with('La carte')
                    ->add('defaultTileLayer', ModelType::class, [
                            'class' => 'App\Document\TileLayer',
                            'required' => true,
                            'label' => 'Fond de carte par défaut (enregistez pour voir apparaitre le fond délectionné sur la carte ci-dessous)', ])
                    ->add('defaultViewPicker', HiddenType::class, ['mapped' => false, 'attr' => [
                                                        'class' => 'gogo-viewport-picker',
                                                        'data-title-layer' => $config->getDefaultTileLayer()->getUrl(),
                                                        'data-default-bounds' => json_encode($config->getDefaultBounds()),
                                                    ]])
                    ->add('defaultNorthEastBoundsLat', HiddenType::class, ['attr' => ['class' => 'bounds NELat']])
                    ->add('defaultNorthEastBoundsLng', HiddenType::class, ['attr' => ['class' => 'bounds NELng']])
                    ->add('defaultSouthWestBoundsLat', HiddenType::class, ['attr' => ['class' => 'bounds SWLat']])
                    ->add('defaultSouthWestBoundsLng', HiddenType::class, ['attr' => ['class' => 'bounds SWLng']])
                ->end()
                ->with('Cookies')
                    ->add('saveViewportInCookies', CheckboxType::class, ['label' => 'Sauvegarder la position courante de la carte dans les cookies', 'required' => false])
                    ->add('saveTileLayerInCookies', CheckboxType::class, ['label' => "Sauvegarder le choix du fond de carte par l'utilisateur dans les cookies", 'required' => false])
                ->end()
            ->end()
            ->tab('Fonctionnalités')
                ->with('Favoris', $featureStyle)
                    ->add('favoriteFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Partage de l\'URL', $featureStyle)
                    ->add('shareFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Calcul Itinéraire', $featureStyle)
                    ->add('directionsFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Signalement d\'une erreur', $featureStyle)
                    ->add('reportFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Etiquetter les éléments', $featureStyle)
                    ->add('stampFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Mode Liste', $featureStyle)
                    ->add('listModeFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Choix du fond de carte', $featureStyle)
                    ->add('layersFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Revenir à la vue par défault', $featureStyle)
                    ->add('mapDefaultViewFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Export Iframe', $featureStyle)
                    ->add('exportIframeFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Affichage des éléments en attente de validation', $featureStyle)
                    ->add('pendingFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
            ->end()
            ->tab('Message personnalisé')
                ->with('Message personnalisé à faire apparaitre dans un coin de la carte', ['class' => 'gogo-feature'])
                    ->add('customPopupFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)
                    ->add('customPopupText', SimpleFormatterType::class, [
                            'format' => 'richhtml',
                            'label' => 'Texte à afficher (Exemple: "Ce site est encore en version bêta !")',
                            'label_attr' => ['style' => 'margin-top: 20px'],
                            'ckeditor_context' => 'full',
                            'required' => false,
                    ])
                    ->add('customPopupId', null, ['label' => 'Numéro de version du popup (à changer quand vous modifiez le texte)', 'required' => false])
                    ->add('customPopupShowOnlyOnce', null, ['label' => "Afficher la popup une fois seulement (si l'utilisateur la ferme, il ne la reverra plus jusqu'à ce que vous changiez le numéro de version)", 'required' => false])
                ->end()
            ->end()
        ;
    }
}
