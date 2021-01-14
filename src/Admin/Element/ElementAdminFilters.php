<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-01-02 16:04:23
 */

namespace App\Admin\Element;

use App\Document\ElementStatus;
use App\Document\ModerationState;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class ElementAdminFilters extends ElementAdminAbstract
{
    public function buildDatagrid()
    {
        $this->persistFilters = true;
        parent::buildDatagrid();
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
      $datagridMapper
      ->add('name')
      ->add('status', 'doctrine_mongo_choice', [], ChoiceType::class,
          [
            'choices' => array_flip($this->statusChoices),
            'expanded' => false,
            'multiple' => false,
          ]
        )
      ->add('valide', 'doctrine_mongo_callback', [
                'label' => 'Validés',
                'callback' => function ($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) {
                        return;
                    }

                    $queryBuilder->field('status')->gt(ElementStatus::PendingAdd);

                    return true;
                },
                'field_type' => CheckboxType::class,
            ])
      ->add('pending', 'doctrine_mongo_callback', [
                'label' => 'En attente',
                'callback' => function ($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) {
                        return;
                    }
                    $queryBuilder->field('status')->in([ElementStatus::PendingModification, ElementStatus::PendingAdd]);

                    return true;
                },
                'field_type' => CheckboxType::class,
            ])
      ->add('moderationNeeded', 'doctrine_mongo_callback', [
            'label' => 'Modération Nécessaire',
                'callback' => function ($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) {
                        return;
                    }
                    $queryBuilder->field('moderationState')->notIn([ModerationState::NotNeeded]);
                    $queryBuilder->field('status')->gte(ElementStatus::PendingModification);

                    return true;
                },
                'field_type' => CheckboxType::class,
            ])
      ->add('moderationState', 'doctrine_mongo_choice', ['label' => 'Type de Modération'],
          ChoiceType::class,
          [
             'choices' => array_flip($this->moderationChoices),
             'expanded' => false,
             'multiple' => false,
            ]
          )
      ->add('optionValuesAll', 'doctrine_mongo_callback', [
               'label' => 'Catégories (contient toutes)',
               'callback' => function ($queryBuilder, $alias, $field, $value) {
                   if (!$value || !$value['value']) {
                       return;
                   }
                   $queryBuilder->field('optionValues.optionId')->all($value['value']);

                   return true;
               },
                'field_type' => ChoiceType::class,
                'field_options' => [
                     'choices' => array_flip($this->getOptionsChoices()),
                     'expanded' => false,
                     'multiple' => true,
                    ],
               ]
            )
      ->add('optionValuesIn', 'doctrine_mongo_callback', [
               'label' => 'Catégories (contient une parmis)',
               'callback' => function ($queryBuilder, $alias, $field, $value) {
                   if (!$value || !$value['value']) {
                       return;
                   }
                   $queryBuilder->field('optionValues.optionId')->in($value['value']);

                   return true;
               },
                'field_type' => ChoiceType::class,
                'field_options' => [
                     'choices' => array_flip($this->getOptionsChoices()),
                     'expanded' => false,
                     'multiple' => true,
                    ],
               ]
            )
      ->add('optionValuesNotIn', 'doctrine_mongo_callback', [
               'label' => 'Catégories (ne contient pas)',
               'callback' => function ($queryBuilder, $alias, $field, $value) {
                   if (!$value || !$value['value']) {
                       return;
                   }
                   $queryBuilder->field('optionValues.optionId')->notIn($value['value']);

                   return true;
               },
                'field_type' => ChoiceType::class,
                'field_options' => [
                     'choices' => array_flip($this->getOptionsChoices()),
                     'expanded' => false,
                     'multiple' => true,
                    ],
               ]
            )
      ->add('postalCode', 'doctrine_mongo_callback', [
                'label' => 'Code Postal',
                'callback' => function ($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) {
                        return;
                    }
                    $queryBuilder->field('address.postalCode')->equals($value['value']);

                    return true;
                },
            ])
      ->add('departementCode', 'doctrine_mongo_callback', [
                'label' => 'Numéro de département',
                'callback' => function ($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) {
                        return;
                    }
                    $queryBuilder->field('address.postalCode')->equals(new \MongoRegex('/^'.$value['value'].'/'));

                    return true;
                },
            ])
      ->add('email')
      ->add('sourceKey', null, ['label' => 'Source']);
    }
}
