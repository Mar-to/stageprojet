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
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ConfigurationFormAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_form_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-form';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->tab('Formulaire')
                ->with('Configuration du formulaire', array('description' => "
                    <div class='text-and-iframe-container'><div class='iframe-container-aside'><iframe height='200' sandbox='allow-same-origin allow-scripts' src='https://video.colibris-outilslibres.org/videos/embed/2dd4dad3-63fa-4bb4-b48c-e518f8e56d36' frameborder='0' allowfullscreen></iframe></div>
                    Choisissez ici quels champs constituent un élement de votre base de donnée.
                    <li>Choisissez bien l'attribut <b>Nom (unique)</b>, avec une valeur compréhensible.</li>
                    <li>Certains champs sont obligatoires (categories, titre, adresse). </li>
                    <li>Le champ <b>Email principal</b> sera utilisé pour envoyer des emails à l'élément référencé, pour lui indiquer qu'il a bien été ajouté sur le site, qu'il a été supprimé etc.. C'est donc un champ conseillé si vous souhaitez mettre en place ce genre de communications.</li></div>"))
                    ->add('elementFormFieldsJson', HiddenType::class, array('attr' => ['class' => 'gogo-form-builder']))
                ->end()
            ->end()
            ->tab('Autres textes et options')
                ->with('Autres textes et options', array('class' => 'col-md-12'))
                    ->add('elementFormIntroText', TextareaType::class  ,
                        array('required' => false, 'attr' => ['placeholder' => 'Exemple: Attention nous ne référencons pas tel et tel type d\'élements'],
                              'label' => "Texte d'introduction qui apparait en haut du formulaire"))
                    ->add('elementFormValidationText', TextareaType::class ,
                        array('required' => false, 'attr' => ['placeholder' => 'Exemple: Je certifie que les informations renseignées dans ce formulaire sont exactes'],
                              'label' => "Label de la checkbox de validation du formulaire (laisser vide pour désactiver)"))
                    ->add('elementFormOwningText', TextareaType::class ,
                        array('required' => false, 'attr' => ['placeholder' => 'Exemple: Je suis impliqué.e dans la gestion de la structure décrite'],
                              'label' => "Label pour demander si l'utilisateur est propriétaire de la fiche (laisser vide pour désactiver)"))
                    ->add('elementFormGeocodingHelp', TextareaType::class ,
                        array('required' => false,
                              'label' => "Texte d'aide pour la geolocalisation"))
                ->end()
            ->end()
            ;
    }
}