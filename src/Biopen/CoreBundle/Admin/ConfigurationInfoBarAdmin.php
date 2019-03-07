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

class ConfigurationInfoBarAdmin extends AbstractAdmin
{
    protected $baseRouteName = 'biopen_core_bundle_config_map_element_form_admin_classname';

    protected $baseRoutePattern = 'biopen/core/configuration-map-element-form';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $featureFormOption = ['delete' => false, 'required'=> false, 'label_attr'=> ['style'=> 'display:none']];

        $dm = $this->getConfigurationPool()->getContainer()->get('doctrine_mongodb');
        $apiProperties = $dm->getRepository('BiopenGeoDirectoryBundle:Element')->findAllCustomProperties();
        $propertiesText = implode($apiProperties, ',');

        $formMapper  
            ->tab("Fiche détail")          
                ->with("Contenu de la Fiche détail (panneau qui s'affiche lors d'un click sur un marker)",
                        ["description" => "<div class='text-and-iframe-container'><div class='iframe-container-aside' style='margin-top: 0'><iframe height='200' sandbox='allow-same-origin allow-scripts' src='https://video.colibris-outilslibres.org/videos/embed/354086c4-e826-44ad-b44a-475e517c3af6' frameborder='0' allowfullscreen></iframe></div>
                        <p style='margin-top: 10px'>Vous pouvez utiliser <a href='https://guides.github.com/features/mastering-markdown/#syntax'>la syntaxe mardown</a> et <a href='https://mozilla.github.io/nunjucks/'>la syntaxe nunjucks (pour des utilisations avancée)</a></p>
                        <p>Pour afficher la valeur d'un champ de votre formulaire (voir liste des champs ci-arpès) utilisez une double accolades <b>{{ nom_de_mon_champ }}</b>. Vous pouvez également choisir de formatter votre champ avec un filtre en utilisant le symbole <b>|</b> suivi du nom du filtre. Par example, pour afficher un champ en majuscule on pourra faire <b>{{ nom_de_mon_champ|upper }}</b>. Des filtres spéciaux pour gogocarto ont été créés, ils permettent d'afficher simplement certains type de champ. Par example, pour un champ de description longue, on pourra utiliser <b>{{ nom_de_mon_champ_description_longue|gogo_textarea(truncate = 300) }}</b>. Cela coupera la description aux environs de 300 caractères et affichera un petit bouton pour afficher la description entière.<p>
                        <p>Consultez la liste des <a href='https://mozilla.github.io/nunjucks/templating.html#builtin-filters'>filtres nunjucks ici</a>. La liste des filtres de gogocarto n'est pas encore documentée</p></div>

                        <h2 style='margin: 0 0 25px 0'>
                          Contenu de la fiche détail
                          <span class='btn btn-primary' id='generate-body-template' onclick='generateBodyTemplate()'>Générer automatiquement le contenu de la fiche détail</span>
                        </h2>"])
                     
                    ->add('infobar.headerTemplateUseMarkdown', 'checkbox', array('label' => 'Utiliser la syntaxe markdown pour le header (sinon uniquement la syntaxe Nunjucks)', 'attr' => ['class' => 'use-markdown'], 'required' => false))
                    ->add('infobar.headerTemplate', 'text', array('label' => 'En tête de la fiche (header)', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'twig', 'height' => '200'], 'required' => false))
                    ->add('infobar.bodyTemplateUseMarkdown', 'checkbox', array('label' => 'Utiliser la syntaxe markdown pour le body (sinon uniquement la syntaxe Nunjucks)', 'attr' => ['class' => 'use-markdown'], 'required' => false))
                    ->add('infobar.bodyTemplate', 'text', array('label' => 'Corps de la fiche (body)', 'attr' => ['class' => 'gogo-code-editor', 'data-id' => 'body-template', 'format' => 'twig', 'height' => '500'], 'required' => false))       
                ->end()
            ->end()
            ->tab('Liste des Champs disponibles (aide)')
                ->with('')
                    ->add('elementFormFieldsJson', 'hidden', array('attr' => ['class' => 'gogo-form-fields', 'dataproperties' => $propertiesText]))
                ->end()
            ->end()
            ->tab('Autres paramètres')
                ->with('Paramètres')
                    ->add('infobar.width', 'number', array('label' => "Largeur de la fiche détail (en pixels, par défaut : 540)", 'required' => false))
                ->end()
                ->with("Masquer l'email de contact en le remplacant par un bouton \"Envoyer un email\"", 
                        ["description" => "<i>Cela permet par exemple d'éviter que des personnes récupèrent tous les emails pour des fin commerciales</i>"])
                    ->add('sendMailFeature','sonata_type_admin', $featureFormOption, ['edit' => 'inline'])
                ->end()   
            ->end()
        ;            
    }
}
