<?php

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;

class ConfigurationCustomJsCssAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_custom_js_css_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-custom-js-css';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->tab('Custom Style')
                ->with('Entrez du code CSS qui sera chargé sur toutes les pages publiques')
                    ->add('customCSS', null, ['label' => 'Custom CSS', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'css', 'height' => '500'], 'required' => false])
                ->end()
            ->end()
            ->tab('Custom Javascript')
                ->with('Entrez du code Javascript qui sera chargé sur toutes les pages publiques')
                    ->add('customJavascript', null, ['label' => 'Custom Javascript', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'javascript', 'height' => '500'], 'required' => false])
                ->end()
            ->end()
        ;
    }
}
