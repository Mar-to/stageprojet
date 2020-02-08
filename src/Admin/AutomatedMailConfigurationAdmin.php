<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2017-09-22 10:30:12
 */

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\FormatterBundle\Form\Type\SimpleFormatterType;

class AutomatedMailConfigurationAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('active', null, ['required' => false, 'label' => 'Activé'])
            ->add('subject', null, ['required' => false, 'label' => 'Objet du message'])
            ->add('content', SimpleFormatterType::class, [
                'format' => 'richhtml',
                'ckeditor_context' => 'full',
                'required' => false,
                'label' => 'Contenu du message',
            ]);
    }
}
