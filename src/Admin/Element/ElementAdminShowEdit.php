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
use Symfony\Component\Form\Extension\Core\Type\TextType;
use App\Form\ElementImageType;
use App\Form\ElementFileType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use App\Helper\GoGoHelper;

class ElementAdminShowEdit extends ElementAdminList
{
    public $config;

    protected function configureFormFields(FormMapper $formMapper)
    {
        $dm = GoGoHelper::getDmFromAdmin($this);
        $this->config = $dm->get('Configuration')->findConfiguration();  
        $categories = $dm->query('Option')->select('name')->getArray();
        $categoriesChoices = array_flip($categories);
        $elementProperties = $dm->get('Element')->findDataCustomProperties();
        $elementProperties = array_values(array_diff($elementProperties, array_keys($this->getSubject()->getData())));
        
        $formMapper
          ->with('Informations générales', ['class' => 'col-md-6'])
            ->add('name', null, ['required' => true, 'label' => "Nom / Titre"])
            ->add('optionIds', ChoiceType::class, [
              'required' => false,
              'multiple' => true,
              'choices' => $categoriesChoices,
              'label' => 'Catégories'], ['admin_code' => 'admin.option_hidden'])
            ->add('data', null, [
              'label_attr' => ['style' => 'display:none;'], 
              'attr' => [
                'class' => 'gogo-element-data',
                'data-props' => json_encode($elementProperties)
              ]])
            ->add('userOwnerEmail', EmailType::class, ['required' => false, 'label' => "Email de l'utilisateur propriétaire de cette fiche"])
            ->add('email', EmailType::class, ['required' => false, 'label' => "Email de l'élément"])
            ->add('images', CollectionType::class, [
              'entry_type' => ElementImageType::class,
              'allow_add' => true,
              'label' => 'Images',
              'allow_delete' => true,              
              'required' => false
            ])
            ->add('files', CollectionType::class, [
              'entry_type' => ElementFileType::class,
              'allow_add' => true,
              'allow_delete' => true,
              'label' => 'Fichiers',
              'required' => false
            ])
            // ->add('openHours', OpenHoursType::class, ['required' => false])
          ->end()
          ->with('Localisation', ['class' => 'col-md-6'])
            ->add('address.streetAddress', TextType::class, ['label_attr' => ['style' => 'display:none;'], 'attr' => ['class' => 'gogo-element-address']])
          ->end()
        ;
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $needModeration = 0 != $this->subject->getModerationState();
        
        $show
          ->with('Autre infos', ['class' => 'col-md-6 col-sm-12'])
            ->add('id')
            ->add('randomHash')
            ->add('oldId', null, ['label' => 'Id dans la base de données importée'])
            ->add('sourceKey', null, ['label' => 'Source'])
            ->add('createdAt', 'datetime', ['format' => 'd/m/Y à H:i'])
            ->add('updatedAt', 'datetime', ['format' => 'd/m/Y à H:i'])
          ->end();
        
        if ($this->subject->isPending()) {
          $show->with('En attente', ['class' => 'col-md-6'])
            ->add('currContribution', null, ['template' => 'admin/partials/show_one_contribution.html.twig'])->end();
        } else {
          $show->with('Status', ['class' => 'col-md-6'])
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
          ->with('Historique des contributions', ['class' => 'col-sm-12'])
            ->add('contributions', null, ['template' => 'admin/partials/show_contributions.html.twig'])
          ->end();

        $show
          ->with('JSON', ['class' => 'col-md-12', 'box_class' => 'box box-default'])
            ->add('compactJson')
            ->add('baseJson')
            ->add('adminJson')
          ->end();
    }
}
