<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class OptionLiteType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', null, ['required' => true, 'label' => 'Nom'])
            ->add('index', null, ['required' => false, 'label' => 'Position'])
            ->add('color', null, ['required' => false, 'label' => 'Couleur', 'attr' => ['class' => 'gogo-color-picker']])
            ->add('icon', null, ['required' => false, 'label' => 'Icone', 'attr' => ['class' => 'gogo-icon-picker']])
            ->add('id', null, ['required' => false, 'label' => 'Plus de paramètres', 'attr' => ['class' => 'gogo-route-id', 'data-route-id' => 'admin_app_option_edit']])
            ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => 'App\Document\Option',
      ]);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'gogo_form_option_lite';
    }
}
