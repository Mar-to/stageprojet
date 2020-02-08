<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ModelType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class ConfigurationHomeAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_home_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-home';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $imagesOptions = [
            'class' => 'App\Document\ConfImage',
            'placeholder' => 'Séléctionnez une image déjà importée, ou ajoutez en une !',
            'required' => false,
            'label' => 'Logo',
            'mapped' => true,
        ];

        $featureStyle = ['class' => 'col-md-6 col-lg-3'];
        $contributionStyle = ['class' => 'col-md-6 col-lg-4'];
        $mailStyle = ['class' => 'col-md-12 col-lg-6'];
        $featureFormOption = ['delete' => false, 'required' => false, 'label_attr' => ['style' => 'display:none']];
        $featureFormTypeOption = ['edit' => 'inline'];
        $formMapper
            ->add('activateHomePage', null, ['label' => "Activer la page d'accueil", 'required' => false])
            ->add('backgroundImage', ModelType::class, array_replace($imagesOptions, ['label' => 'Image de fond (le nom du fichier ne doit pas contenir d\'espaces ou de caractères spéciaux']))
            ->add('home.displayCategoriesToPick', CheckboxType::class, ['label' => 'Afficher les catégories principales selectionnables pour la recherche', 'required' => false])
            ->add('home.addElementHintText', null, ['label' => 'Texte au dessus du bouton "Ajouter un élément"', 'required' => false, 'attr' => ['placeholder' => 'Exemple: Aidez nous à renrichir la base de donnée en ajoutant un élément !']])
            ->add('home.seeMoreButtonText', null, ['label' => "Texte pour inviter à scroller (si des bandeaux de la page d'accueil existent)", 'required' => false, 'attr' => ['placeholder' => "Exemple: Plus d'informations"]])
        ;
    }
}
