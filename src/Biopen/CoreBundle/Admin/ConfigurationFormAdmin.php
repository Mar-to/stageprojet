<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */
namespace Biopen\CoreBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;

class ConfigurationFormAdmin extends AbstractAdmin
{
    protected $baseRouteName = 'biopen_core_bundle_config_form_admin_classname';

    protected $baseRoutePattern = 'biopen/core/configuration-form';

    protected function configureFormFields(FormMapper $formMapper)
    {        
        $formMapper
            ->tab('Formulaire')  
                ->with('Configuration du formulaire', array('description' => "Choisissez ici quels champs constituent un élement de votre base de donnée. 
                    <li>Choisissez bien l'attribut <b>Nom (unique)</b>, avec une valeur compréhensible.</li>
                    <li>Certains champs sont obligatoires (categories, titre, adresse). </li>
                    <li>Le champ <b>Email principal</b> sera utilisé pour envoyer des emails à l'élément référencé, pour lui indiquer qu'il a bien été ajouté sur le site, qu'il a été supprimé etc.. C'est donc un champ conseillé si vous souhaitez mettre en place ce genre de communications.</li>"))
                    ->add('elementFormFieldsJson', 'hidden', array('attr' => ['class' => 'gogo-form-builder'])) 
                ->end()
            ->end()
            ->tab('Autres textes et options')
                ->with('Autres textes et options', array('class' => 'col-md-12'))                    
                    ->add('elementFormIntroText', 'textarea'  , 
                        array('required' => false, 'attr' => ['placeholder' => 'Exemple: Attention nous ne référencons pas tel et tel type d\'élements'],
                              'label' => "Texte d'introduction qui apparait en haut du formulaire"))
                    ->add('elementFormValidationText', 'textarea' , 
                        array('required' => false, 'attr' => ['placeholder' => 'Exemple: Je certifie que les informations renseignées dans ce formulaire sont exactes'],
                              'label' => "Label de la checkbox de validation du formulaire (laisser vide pour désactiver)"))
                    ->add('elementFormOwningText', 'textarea' , 
                        array('required' => false, 'attr' => ['placeholder' => 'Exemple: Je suis impliqué.e dans la gestion de la structure décrite'],
                              'label' => "Label pour demander si l'utilisateur est propriétaire de la fiche (laisser vide pour désactiver)"))
                    ->add('elementFormGeocodingHelp', 'textarea' , 
                        array('required' => false,
                              'label' => "Texte d'aide pour la geolocalisation"))
                ->end()            
            ->end()    
            ;
    }
}