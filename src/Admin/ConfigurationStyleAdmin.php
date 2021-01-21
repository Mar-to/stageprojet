<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class ConfigurationStyleAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_style_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-style';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('Thème et polices', ['class' => 'col-md-6'])
                ->add('theme', ChoiceType::class, ['label' => 'Thème', 'choices' => ['Défaut' => 'default', 'Flat' => 'flat', 'Près de chez Nous' => 'presdecheznous', 'Transiscope' => 'transiscope']])
                ->add('mainFont', null, ['label' => 'Police principale', 'attr' => ['class' => 'gogo-font-picker']])
                ->add('titleFont', null, ['label' => 'Police de titre', 'attr' => ['class' => 'gogo-font-picker']])

            ->end()
            ->with('Couleurs principales', ['class' => 'col-md-6'])
                ->add('textColor', null, ['label' => 'Couleur de texte', 'attr' => ['class' => 'gogo-color-picker']])
                ->add('primaryColor', null, ['label' => 'Couleur Primaire', 'attr' => ['class' => 'gogo-color-picker']])
                ->add('backgroundColor', null, ['label' => 'Couleur de fond de page', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
            ->end()
            ->with("Charger d'autres polices et icones")
                ->add('fontImport', null, ['label' => 'Lien pour le CDN des polices', 'required' => false])
                ->add('iconImport', null, ['label' => 'Lien pour le CDN des icones (par défault, les icones de FontAwesome sont chargées)', 'required' => false])
            ->end()
            ->with('Autres couleurs', ['class' => 'col-md-6'])
                ->add('secondaryColor', null, ['label' => 'Couleur Secondaire', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('headerColor', null, ['label' => 'Couleur fond header', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('headerTextColor', null, ['label' => 'Couleur texte header', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('headerHoverColor', null, ['label' => 'Couleur texte survol header', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('contentBackgroundColor', null, ['label' => 'Couleur arrière plan du contenu des pages', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('contentBackgroundElementBodyColor', null, ['label' => 'Couleur arrière plan du contenu de la fiche détail', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('homeBackgroundColor', null, ['label' => "Couleur arrière plan de la page d'accueil", 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('searchBarColor', null, ['label' => 'Couleur bar de recherche', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('interactiveSectionColor', null, ['label' => 'Couleur section pour voter dans la fiche détail', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
            ->end()
            ->with('Couleurs avancées', ['class' => 'col-md-6'])
                ->add('textDarkColor', null, ['label' => 'Couleur text foncé', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('textDarkSoftColor', null, ['label' => 'Couleur text foncé adoucie', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('textLightColor', null, ['label' => 'Couleur texte clair', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('textLightSoftColor', null, ['label' => 'Couleur text clair adoucie', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('errorColor', null, ['label' => "Couleur d'erreur", 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('disableColor', null, ['label' => 'Couleur désactivé', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])
                ->add('pendingColor', null, ['label' => 'Couleur en attente de validation', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false])

            ->end()     
            ;
    }
}
