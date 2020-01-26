<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-01-02 16:04:23
 */
namespace App\Admin\Element;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use App\Document\ElementStatus;
use App\Document\ModerationState;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

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
      ->add('status', 'doctrine_mongo_choice', array(),
        ChoiceType::class,
        array(
            'choices' => $this->statusChoices,
           'expanded' => false,
           'multiple' => false
          )
        )
      ->add('valide', 'doctrine_mongo_callback', array(
                'label' => 'Validés',
                'callback' => function($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) { return; }

                    $queryBuilder->field('status')->gt(ElementStatus::PendingAdd)->notEqual(ElementStatus::DynamicImport);
                    return true;
                },
                'field_type' => CheckboxType::class
            ))
      ->add('pending', 'doctrine_mongo_callback', array(
                'label' => 'En attente',
                'callback' => function($queryBuilder, $alias, $field, $value)
                {
                    if (!$value || !$value['value']) { return; }
                    $queryBuilder->field('status')->in(array(ElementStatus::PendingModification,ElementStatus::PendingAdd));
                    return true;
                },
                'field_type' => CheckboxType::class
            ))
      ->add('moderationNeeded', 'doctrine_mongo_callback', array(
            'label' => 'Modération Nécessaire',
                'callback' => function($queryBuilder, $alias, $field, $value)
                {
                    if (!$value || !$value['value']) { return; }
                    $queryBuilder->field('moderationState')->notIn([ModerationState::NotNeeded]);
                    $queryBuilder->field('status')->gte(ElementStatus::PendingModification);
                    return true;
                },
                'field_type' => CheckboxType::class
            ))
      ->add('moderationState', 'doctrine_mongo_choice', array('label' => 'Type de Modération'),
          ChoiceType::class,
          array(
             'choices' => $this->moderationChoices,
             'expanded' => false,
             'multiple' => false
            )
          )
      ->add('optionValuesAll', 'doctrine_mongo_callback', array(
               'label' => 'Catégories (contient toutes)',
               'callback' => function($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) { return; }
                    $queryBuilder->field('optionValues.optionId')->all($value['value']);
                    return true;
                },
                'field_type' => ChoiceType::class,
                'field_options' =>
                 array(
                     'choices' => $this->optionsChoices,
                     'expanded' => false,
                     'multiple' => true
                    )
               )
            )
      ->add('optionValuesIn', 'doctrine_mongo_callback', array(
               'label' => 'Catégories (contient une parmis)',
               'callback' => function($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) { return; }
                    $queryBuilder->field('optionValues.optionId')->in($value['value']);
                    return true;
                },
                'field_type' => ChoiceType::class,
                'field_options' =>
                 array(
                     'choices' => $this->optionsChoices,
                     'expanded' => false,
                     'multiple' => true
                    )
               )
            )
      ->add('optionValuesNotIn', 'doctrine_mongo_callback', array(
               'label' => 'Catégories (ne contient pas)',
               'callback' => function($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) { return; }
                    $queryBuilder->field('optionValues.optionId')->notIn($value['value']);
                    return true;
                },
                'field_type' => ChoiceType::class,
                'field_options' =>
                 array(
                     'choices' => $this->optionsChoices,
                     'expanded' => false,
                     'multiple' => true
                    )
               )
            )
      ->add('postalCode', 'doctrine_mongo_callback', array(
                'label' => 'Code Postal',
                'callback' => function($queryBuilder, $alias, $field, $value)
                {
                    if (!$value || !$value['value']) { return; }
                    $queryBuilder->field('address.postalCode')->equals($value['value']);
                    return true;
                }
            ))
      ->add('departementCode', 'doctrine_mongo_callback', array(
                'label' => 'Numéro de département',
                'callback' => function($queryBuilder, $alias, $field, $value)
                {
                    if (!$value || !$value['value']) { return; }
                    $queryBuilder->field('address.postalCode')->equals(new \MongoRegex('/^'. $value['value'] .'/'));
                    return true;
                }
            ))
      ->add('email')
      ->add('sourceKey', null, array('label' => 'Source'));
  }
}