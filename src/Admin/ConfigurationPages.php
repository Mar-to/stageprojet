<?php

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ModelType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;

class ConfigurationPages extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_pages_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-pages';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('Page 1', ['class' => 'col-md-6'])
                ->add('ActivatePage1', null, ['label' => 'Activer la page additionnelle 1', 'required' => false])
                ->add('Page1Title', null, ['label' => 'Titre de la page additionnelle 1', 'required' => false])
            ->end()
            ->with('Page 2', ['class' => 'col-md-6'])
                ->add('ActivatePage2', null, ['label' => 'Activer la page additionnelle 2', 'required' => false])
                ->add('Page2Title', null, ['label' => 'Titre de la page additionnelle 2', 'required' => false])
            ->end()
            ->with('Page 3', ['class' => 'col-md-6'])
                ->add('ActivatePage3', null, ['label' => 'Activer la page additionnelle 3', 'required' => false])
                ->add('Page3Title', null, ['label' => 'Titre de la page additionnelle 3', 'required' => false])
            ->end()
            ;
    }
}