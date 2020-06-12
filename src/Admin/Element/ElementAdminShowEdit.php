<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-06-09 14:29:33
 */

namespace App\Admin\Element;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;

class ElementAdminShowEdit extends ElementAdminList
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
      ->with('Informations générales', [])
          ->add('name')
      ->add('userOwnerEmail', EmailType::class, ['required' => false, 'label' => "Email de l'utilisateur propriétaire de cette fiche"])
        ->end();
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $needModeration = 0 != $this->subject->getModerationState();
        $statusClass = $needModeration ? 'col-md-6' : 'col-md-12';
        if ($this->subject->isPending()) {
          $show->with('En attente', ['class' => $statusClass])
            ->add('currContribution', null, ['template' => 'admin/partials/show_one_contribution.html.twig'])->end();
        } else {
          $show->with('Status', ['class' => $statusClass])
            ->add('status', ChoiceType::class, [
              'choices' => $this->statusChoices,
              'template' => 'admin/partials/show_choice_status.html.twig',
            ])->end();
        }

        if ($needModeration) {
            $show
       ->with('Modération', ['class' => 'col-md-6 col-sm-12'])
        ->add('moderationState', ChoiceType::class, [
            'label' => 'Moderation',
               'choices' => $this->moderationChoices,
               'template' => 'admin/partials/show_choice_moderation.html.twig',
               ])
        ->add('reports', null, ['template' => 'admin/partials/show_pending_reports.html.twig', 'label' => 'Signalements'])
       ->end();
        }

        $show
      ->with('Autre infos', ['class' => 'col-md-6 col-sm-12'])
        ->add('id')
        ->add('optionValues', null, [
            'template' => 'admin/partials/show_option_values.html.twig',
            'choices' => $this->optionList,
            'label' => 'Catégories', ])
        ->add('email', EmailType::class, ['label' => 'Email de contact'])
        ->add('images', null, ['template' => 'admin/partials/show_element_images.html.twig'])
        ->add('randomHash')
        ->add('oldId', null, ['label' => 'Id dans la base de données importée'])
        ->add('sourceKey', null, ['label' => 'Source'])
        ->add('createdAt', 'datetime', ['format' => 'd/m/Y à H:i'])
        ->add('updatedAt', 'datetime', ['format' => 'd/m/Y à H:i'])
      ->end()

      ->with('Localisation', ['class' => 'col-md-6 col-sm-12'])
        ->add('address.formatedAddress', null, ['label' => 'Adresse complète'])
        ->add('address.streetAddress', null, ['label' => 'Adresse'])
        ->add('address.addressLocality', null, ['label' => 'Ville'])
          ->add('address.postalCode', null, ['label' => 'Code postal'])
        ->add('address.addressCountry', null, ['label' => 'Pays'])
          ->add('geo.latitude')
          ->add('geo.longitude')
      ->end()

      ->with('Champs personnalisés', ['class' => 'col-md-12 col-sm-12'])
        ->add('data', null, ['template' => 'admin/partials/show_element_data.html.twig'])
      ->end()

      ->with('Historique des contributions', ['class' => 'col-sm-12'])
        ->add('contributions', null, ['template' => 'admin/partials/show_contributions.html.twig'])
      ->end();

        $show
      ->with('JSON', ['class' => 'col-md-12', 'box_class' => 'box box-default'])
        ->add('compactJson')
        ->add('baseJson')
        ->add('privateJson')
        ->add('adminJson')
      ->end();
    }
}
