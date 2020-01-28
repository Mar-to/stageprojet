<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;


class UserProfileType extends AbstractType
{
  /**
   * @param FormBuilderInterface $builder
   * @param array $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
      $builder->add('username')
              ->add('email', EmailType::class, array('required' => true))
              ->add('newsletterFrequency', ChoiceType::class, [
                   'choices'  => array(
                       'Chaque semaine' => 1,
                       'Chaque mois' => 2,
                       'Jamais' => 0,
                   ),
                   'expanded' => true,  'multiple' => false,
                   'required' => false, 'placeholder' => false ])
              ->add('location',TextType::class, ['required' => false] )
              ->add('newsletterRange', RangeType::class, [
                   'required' => false,
                   'attr' => array(
                       'min' => 1,
                       'max' => 250
                   )
                  ]);
  }

  /**
   * @param OptionsResolver $resolver
   */
  public function configureOptions(OptionsResolver $resolver)
  {
      $resolver->setDefaults(array(
          'data_class' => 'App\Document\User'
      ));
  }

  /**
  * @return string
  */
  public function getName()
  {
    return 'gogo_corebundle_user_profile';
  }
}
