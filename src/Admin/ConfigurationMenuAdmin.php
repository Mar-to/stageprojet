<?php

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\AdminType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use App\Helper\GoGoHelper;

class ConfigurationMenuAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_menu_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-menu';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $dm = GoGoHelper::getDmFromAdmin($this);
        $config = $dm->get('Configuration')->findConfiguration();
        $apiProperties = $dm->get('Element')->findAllCustomProperties();
        $propertiesText = implode($apiProperties, ',');

        $featureStyle = ['class' => 'col-md-6 col-lg-3 gogo-feature'];
        $featureFormOption = ['delete' => false, 'required' => false, 'label_attr' => ['style' => 'display:none']];
        $featureFormTypeOption = ['edit' => 'inline'];

        $formMapper
            ->tab('Général')
                ->with('Menu (contient les filtre et la barre de recherche)')
                    ->add('menu.width', IntegerType::class, ['label' => 'Largeur du menu', 'required' => false, 'attr' => ['placeholder' => '290']])
                    ->add('menu.smallWidthStyle', CheckboxType::class, ['label' => 'Utiliser un style compressé', 'label_attr' => ['title' => "Diminue un peu la taille de la police et les marges. Pratique lorsque le nom des catégories sont longues que l'on veut gagner en largeur"], 'required' => false])
                    ->add('menu.showOnePanePerMainOption', CheckboxType::class, ['label' => 'Afficher un sous menu pour chaque catégorie principale', 'required' => false])
                    ->add('menu.showCheckboxForMainFilterPane', CheckboxType::class, ['label' => 'Afficher les checkbox dans la panneau principal', 'required' => false])
                    ->add('menu.showCheckboxForSubFilterPane', CheckboxType::class, ['label' => 'Afficher les checkbox dans les sous panneaux',  'label_attr' => ['title' => 'Valable uniquement si "afficher un sous menu pour chaque catégorie principale" est coché'], 'required' => false])
                    ->add('menu.displayNumberOfElementForEachCategory', CheckboxType::class, ['label' => "Pour chaque catégorie, afficher le nombre d'élément ayant cette catégorie", 'required' => false])
                    ->add('menu.displayNumberOfElementRoundResults', CheckboxType::class, ['label' => 'Arrondir les résultat (afficher 300+ au lieu de 326)',  'label_attr' => ['title' => "Valable uniquement si \"afficher le nombre d'éléments par catégorie\" est coché"], 'required' => false])
                ->end()
                ->with('Personnalisez les filtres dans le menu', ['description' => ""])
                    ->add('menu.filtersJson', HiddenType::class, ['attr' => ['class' => 'gogo-filters-builder', 'dataproperties' => $propertiesText]])
                ->end()
            ->end()
            ->tab('Recherche')
                ->with("Recherche d'un lieu", $featureStyle)
                    ->add('searchPlaceFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Bouton geolocalisation', $featureStyle)
                    ->add('searchGeolocateFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with("Recherche d'un élément", $featureStyle)
                    ->add('searchElementsFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with("Recherche dans les catégories", $featureStyle)
                    ->add('searchCategoriesFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with('Paramètre de la recherche')
                    ->add('searchExcludingWords', null, ['required' => false, 'label' => 'Mots à exclure de la recherche, séparés par des virgules', 'label_attr' => ['title' => 'Si vous faites un annuaire de producteurs locaux, vous voudrez peut être exclure les mots comme "bio", car ce genre de recherche donnerait de mauvais résultats. Par exemple si vous cherchez "Ferme du bayou bio", des résultat qui n\'ont rien à voir tel que "Amap bio" sortiraient dans les résultats, juste à cause du mot "bio". De manière générale, excluez les mots communément utilisés dans les titres de vos fiches. Notez que la recherche est aussi utilisée dans la détection de doublons']])
                ->end()
                ->with('Champs à utiliser pour chercher dans les élements', ['description' => "Pour choisir les champs de recherche, allez dans le formulaire, éditer un des champs et vous verrez apparaître l'option \"Recherche dans ce champ\". Vous pouvez aussi assigner des poids différents sur chaque champs, les poids seront utilisés pour classer les résultats par pertinence."])
                ->end()
            ->end()
        ;
    }
}
