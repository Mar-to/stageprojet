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
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use App\Helper\GoGoHelper;

class ConfigurationInfoBarAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_map_element_form_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-map-element-form';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $featureFormOption = ['delete' => false, 'required' => false, 'label_attr' => ['style' => 'display:none']];

        $dm = GoGoHelper::getDmFromAdmin($this);
        $apiProperties = $dm->get('Element')->findAllCustomProperties();
        $propertiesText = implode($apiProperties, ',');

        $formMapper
            ->tab('Fiche détail')
                ->with("Contenu de la Fiche détail (panneau qui s'affiche lors d'un click sur un marker)",
                        ['description' => "<div class='text-and-iframe-container'><div class='iframe-container-aside' style='margin-top: 0'><iframe height='200' sandbox='allow-same-origin allow-scripts' src='https://video.colibris-outilslibres.org/videos/embed/354086c4-e826-44ad-b44a-475e517c3af6' frameborder='0' allowfullscreen></iframe></div>
                        <p style='margin-top: 10px'>Vous pouvez utiliser <a href='https://guides.github.com/features/mastering-markdown/#syntax'>la syntaxe mardown</a> et <a href='https://mozilla.github.io/nunjucks/'>la syntaxe nunjucks (pour des utilisations avancée)</a></p>
                        <p>Pour afficher la valeur d'un champ de votre formulaire (voir liste des champs ci-arpès) utilisez une double accolades <b>{{ nom_de_mon_champ }}</b>. Vous pouvez également choisir de formatter votre champ avec un filtre en utilisant le symbole <b>|</b> suivi du nom du filtre. Par example, pour afficher un champ en majuscule on pourra faire <b>{{ nom_de_mon_champ|upper }}</b>. Des filtres spéciaux pour gogocarto ont été créés, ils permettent d'afficher simplement certains type de champ. Par example, pour un champ de description longue, on pourra utiliser <b>{{ nom_de_mon_champ_description_longue|gogo_textarea(truncate = 300) }}</b>. Cela coupera la description aux environs de 300 caractères et affichera un petit bouton pour afficher la description entière.<p>
                        <p>Consultez la liste des <a href='https://mozilla.github.io/nunjucks/templating.html#builtin-filters'>filtres nunjucks ici</a>. La liste des filtres de gogocarto n'est pas encore documentée</p></div>

                        <h2 style='margin: 0 0 25px 0'>
                          Contenu de la fiche détail
                          <span class='btn btn-primary' id='generate-body-template' onclick='generateBodyTemplate()'>Générer automatiquement le contenu de la fiche détail</span>
                        </h2>"])

                    ->add('infobar.headerTemplateUseMarkdown', CheckboxType::class, ['label' => 'Utiliser la syntaxe markdown pour le header (sinon uniquement la syntaxe Nunjucks)', 'attr' => ['class' => 'use-markdown'], 'required' => false])
                    ->add('infobar.headerTemplate', null, ['label' => 'En tête de la fiche (header)', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'twig', 'height' => '200'], 'required' => false])
                    ->add('infobar.bodyTemplateUseMarkdown', CheckboxType::class, ['label' => 'Utiliser la syntaxe markdown pour le body (sinon uniquement la syntaxe Nunjucks)', 'attr' => ['class' => 'use-markdown'], 'required' => false])
                    ->add('infobar.bodyTemplate', null, ['label' => 'Corps de la fiche (body)', 'attr' => ['class' => 'gogo-code-editor', 'data-id' => 'body-template', 'format' => 'twig', 'height' => '500'], 'required' => false])
                ->end()
                ->with('Autres Paramètres')
                    ->add('infobar.width', IntegerType::class, ['label' => 'Largeur de la fiche détail (en pixels, par défaut : 540)', 'required' => false])
                ->end()
            ->end()
            ->tab('Liste des Champs disponibles (aide)')
                ->with('')
                    ->add('elementFormFieldsJson', HiddenType::class, ['attr' => ['class' => 'gogo-form-fields', 'dataproperties' => $propertiesText]])
                ->end()
            ->end()
            ->tab('Liste des fitlres disponibles (aide)')
                ->with('Informations concernant les mails automatiques', ['box_class' => 'box box-default', 'description' => "
                        <p><b>Les filtres permettent d'appliquer des transformations sur un variable / un champ</b></p>
                        <h3>Les filtres du language nunjucks</h3>
                        <a href='https://mozilla.github.io/nunjucks/fr/templating.html#filtres-int-gr-s'>Voir la documentation en ligne</a>
                        <h3>Les filtres spéciaux de GoGoCarto</h3>

                        <h4>gogo_text</h4>
                        Afficher du texte (avec retour à la ligne avant et après le texte)</br>
                        Vous pouvez utiliser <b>l'option label</b> : {{ tel|gogo_text(label = 'Téléphone') }}

                        <h4>gogo_textarea</h4>
                        Afficher des texte longs, il y a plusieurs options
                        <ul><li><b>truncate</b>: tronquer le texte au bout de XX caractères (par défault 1000), et mettre un petit bouton \"afficher plus\"</li>
                        <li><b>tolerance</b>: le troncage essaie de se faire à la fin d'une phrase ou moins d'un mot. La tolerance est le nombre de caractère que l'on donne comme marge à l'agorithme. i.e tronque à 1000 caractères +/- 50</li>
                        <li><b>glossary</b>: un glossaire pour expliquer certains mots. Le mot sera légèrement surligné et au survol s'affichera l'explication</li></ul>
                        <pre>{{ 'Mon beautiful texte supposement très très long'|gogo_textarea(truncate = 15, tolerance = 5, glossary = { 'beautiful': 'Mot anglais qui veut dire joli'}) }}</pre>
                        <h5>gogo_tags</h5>
                        Affiche un tableau sous forme de tags {{ ['Service', 'Blanc'] | gogo_tags }}

                        <h3>Débugger des données</h3>
                        Si vous utilisez des données un peu spécifiques de type object, vous pouvez utiliser le filtre 'dump' pour afficher leur contenu {{ my_specific_field|dump }}
                    "])->end()
            ->end()
        ;
    }
}
