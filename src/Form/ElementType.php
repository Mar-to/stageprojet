<?php

/**
 * This file is part of the GoGoCarto project.
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @copyright Copyright (c) 2016 Sebastian Castro - 90scastro@gmail.com
 * @license    MIT License
 * @Last Modified time: 2018-01-19 13:04:59
 */


namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormInterface;

use Doctrine\Bundle\MongoDBBundle\Form\Type\DocumentType;

use App\Form\OpenHoursType;
use App\Form\PostalAddressType;
use App\Form\CoordinatesType;
use App\Form\ElementImageType;
use App\Form\ElementFileType;

use Doctrine\ODM\MongoDB\DocumentRepository;
use Doctrine\ODM\MongoDB\DocumentManager;

class ElementType extends AbstractType
{

  public function __construct(DocumentManager $documentManager)
  {
     $this->em = $documentManager;
  }

  /**
   * @param FormBuilderInterface $builder
   * @param array $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('name', TextType::class, array('required' => false))
      ->add('email', TextType::class, array('required' => false))
      ->add('fullAddress', TextType::class, array('mapped' => false))
      ->add('address', PostalAddressType::class)
      ->add('geo', CoordinatesType::class)

      ->add('files', CollectionType::class, array(
                'entry_type' => ElementFileType::class,
                'allow_add'     => true,
                'allow_delete'  => true,
                'label' => ''
            ))
      ->add('images', CollectionType::class, array(
                'entry_type' => ElementImageType::class,
                'allow_add'     => true,
                'allow_delete'  => true,
                'label' => ''
            ))
      ->add('openHours', OpenHoursType::class, array('required' => false));
  }

  /**
   * @param OptionsResolver $resolver
   */
  public function configureOptions(OptionsResolver $resolver)
  {
      $resolver->setDefaults(array(
          'data_class' => 'App\Document\Element'
      ));
  }

  /**
  * @return string
  */
  public function getName()
  {
    return 'gogo_elementbundle_element';
  }
}
