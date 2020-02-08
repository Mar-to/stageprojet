<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2017-08-22 11:54:53
 */

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class FeatureConfigurationAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('active', CheckboxType::class, ['required' => false, 'label' => 'Activé'])
            ->add('activeInIframe', CheckboxType::class, ['required' => false, 'label' => 'Activé en Iframe'])
            ->add('allow_role_anonymous', CheckboxType::class, ['required' => false, 'label' => 'Autoriser Anonymes'])
            ->add('allow_role_user', CheckboxType::class, ['required' => false, 'label' => 'Autoriser Utilisateurs'])
            ->add('allow_role_admin', CheckboxType::class, ['required' => false, 'label' => 'Autoriser Modérateurs']);
    }
}
