<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */
namespace App\Admin;

use App\Admin\ConfigurationAbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class ConfigurationStyleAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'biopen_core_bundle_config_style_admin_classname';

    protected $baseRoutePattern = 'biopen/core/configuration-style';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $featureStyle = array('class' => 'col-md-6 col-lg-3');
        $contributionStyle = array('class' => 'col-md-6 col-lg-4');
        $mailStyle = array('class' => 'col-md-12 col-lg-6');
        $featureFormOption = ['delete' => false, 'required'=> false, 'label_attr'=> ['style'=> 'display:none']];
        $featureFormTypeOption = ['edit' => 'inline'];
        $formMapper
            ->tab('Style')
                ->with('Thème et polices', array('class' => 'col-md-6'))
                    ->add('theme', ChoiceType::class, array('label' => 'Thème', "choices" => ["default" => "Défaut", "presdecheznous" => "Près de chez Nous", "transiscope" => "Transiscope"]))
                    ->add('mainFont', null, array('label' => 'Police principale', 'attr' => ['class' => 'gogo-font-picker']))
                    ->add('titleFont', null, array('label' => 'Police de titre', 'attr' => ['class' => 'gogo-font-picker']))

                ->end()
                ->with('Couleurs principales', array('class' => 'col-md-6'))
                    ->add('textColor', null, array('label' => 'Couleur de texte', 'attr' => ['class' => 'gogo-color-picker']))
                    ->add('primaryColor', null, array('label' => 'Couleur Primaire', 'attr' => ['class' => 'gogo-color-picker']))
                    ->add('backgroundColor', null, array('label' => 'Couleur de fond de page', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                ->end()
                ->with("Charger d'autres polices et icones")
                    ->add('fontImport', null, array('label' => 'Lien pour le CDN des polices', 'required' => false))
                    ->add('iconImport', null, array('label' => 'Lien pour le CDN des icones (par défault, les icones de FontAwesome sont chargées)', 'required' => false))
                ->end()
                ->with('Autres couleurs', array('class' => 'col-md-6'))
                    ->add('secondaryColor', null, array('label' => 'Couleur Secondaire', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('headerColor', null, array('label' => 'Couleur fond header', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('headerTextColor', null, array('label' => 'Couleur texte header', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('headerHoverColor', null, array('label' => 'Couleur texte survol header', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('contentBackgroundColor', null, array('label' => 'Couleur arrière plan du contenu des pages', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('contentBackgroundElementBodyColor', null, array('label' => 'Couleur arrière plan du contenu de la fiche détail', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('homeBackgroundColor', null, array('label' => "Couleur arrière plan de la page d'accueil", 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('searchBarColor', null, array('label' => 'Couleur bar de recherche', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('interactiveSectionColor', null, array('label' => 'Couleur section pour voter dans la fiche détail', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                ->end()
                ->with('Couleurs avancées', array('class' => 'col-md-6'))
                    ->add('textDarkColor', null, array('label' => 'Couleur text foncé', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('textDarkSoftColor', null, array('label' => 'Couleur text foncé adoucie', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('textLightColor', null, array('label' => 'Couleur texte clair', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('textLightSoftColor', null, array('label' => 'Couleur text clair adoucie', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('errorColor', null, array('label' => "Couleur d'erreur", 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('disableColor', null, array('label' => 'Couleur désactivé', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))
                    ->add('pendingColor', null, array('label' => 'Couleur en attente de validation', 'attr' => ['class' => 'gogo-color-picker'], 'required' => false))

                ->end()
            ->end()
            ->tab('Custom Style')
                ->with('Entrez du code CSS qui sera chargé sur toutes les pages publiques')
                    ->add('customCSS', null, array('label' => 'Custom CSS', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'css', 'height' => '500'], 'required' => false))
                ->end()
            ->end()
            ->tab('Custom Javascript')
                ->with('Entrez du code Javascript qui sera chargé sur toutes les pages publiques')
                    ->add('customJavascript', null, array('label' => 'Custom Javascript', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'javascript', 'height' => '500'], 'required' => false))
                ->end()
            ->end()
            ;
    }
}