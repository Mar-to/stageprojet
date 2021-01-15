<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use App\Helper\GoGoHelper;

class ConfigurationFormAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_form_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-form';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $dm = GoGoHelper::getDmFromAdmin($this);
        $repo = $dm->get('Element');
        $elementProperties = json_encode($repo->findAllCustomProperties());

        $formMapper
            ->tab('Formulaire')
                ->with('Configuration du formulaire', ['description' => "
                    <div class='text-and-iframe-container'><div class='iframe-container-aside'><iframe height='200' sandbox='allow-same-origin allow-scripts' src='https://video.colibris-outilslibres.org/videos/embed/2dd4dad3-63fa-4bb4-b48c-e518f8e56d36' frameborder='0' allowfullscreen></iframe></div>
                    <b>Le formulaire permet d'ajouter/éditer des données depuis l'interface publique</b></br>
                    Si vous avez importé des données, vous pouvez ajouter un champ au formulaire et le lier au champ importé grâce à l'attribut \"Nom du champ\"</div>"])
                    ->add('elementFormFieldsJson', HiddenType::class, ['attr' => ['class' => 'gogo-form-builder', 'data-props' => $elementProperties]])
                ->end()
            ->end()
            ->tab('Autres textes et options')
                ->with('Autres textes et options', ['class' => 'col-md-12'])
                    ->add('elementFormIntroText', TextareaType::class,
                        ['required' => false, 'attr' => ['placeholder' => 'Exemple: Attention nous ne référencons pas tel et tel type d\'élements'],
                              'label' => "Texte d'introduction qui apparait en haut du formulaire", ])
                    ->add('elementFormValidationText', TextareaType::class,
                        ['required' => false, 'attr' => ['placeholder' => 'Exemple: Je certifie que les informations renseignées dans ce formulaire sont exactes'],
                              'label' => 'Label de la checkbox de validation du formulaire (laisser vide pour désactiver)', ])
                    ->add('elementFormOwningText', TextareaType::class,
                        ['required' => false, 'attr' => ['placeholder' => 'Exemple: Je suis impliqué.e dans la gestion de la structure décrite'],
                              'label' => "Label pour demander si l'utilisateur est propriétaire de la fiche (laisser vide pour désactiver)", ])
                    ->add('elementFormGeocodingHelp', TextareaType::class,
                        ['required' => false,
                              'label' => "Texte d'aide pour la geolocalisation", ])
                ->end()
            ->end()
            ;
    }
}
