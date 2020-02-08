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
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DailyTimeSlotType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('slot1start', TimeType::class, [
                            'widget' => 'single_text',
                            'required' => 'false', ])
              ->add('slot1end', TimeType::class, [
                            'widget' => 'single_text',
                            'required' => 'false', ])
              ->add('slot2start', TimeType::class, [
                            'widget' => 'single_text',
                            'required' => 'false', ])
              ->add('slot2end', TimeType::class, [
                            'widget' => 'single_text',
                            'required' => 'false', ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => 'App\Document\DailyTimeSlot',
      ]);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'gogo_elementbundle_dayhoraire';
    }
}
