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

class OpenHoursType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('Monday', DailyTimeSlotType::class)
              ->add('Tuesday', DailyTimeSlotType::class)
              ->add('Wednesday', DailyTimeSlotType::class)
              ->add('Thursday', DailyTimeSlotType::class)
              ->add('Friday', DailyTimeSlotType::class)
              ->add('Saturday', DailyTimeSlotType::class)
              ->add('Sunday', DailyTimeSlotType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
          'data_class' => 'App\Document\OpenHours',
      ]);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'gogo_elementbundle_openhours';
    }
}
