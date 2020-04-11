<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\FormatterBundle\Form\Type\SimpleFormatterType;

class ConfigurationSaasAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_saas_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-saas';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('Configuration')
                ->add('saas.endUserLicenceAgreement', SimpleFormatterType::class, [
                    'format' => 'richhtml', 'ckeditor_context' => 'full',
                    'label' => "Conditions Générales d'Utilisation",
                    'required' => false
                ])
                ->add('saas.newProjectInstructions', SimpleFormatterType::class, [
                    'format' => 'richhtml', 'ckeditor_context' => 'full',
                    'label' => "Texte personnalisé affiché en haut du formulaire de création d'un nouveau projet",
                    'required' => false
                ])
            ->end()
        ;
    }
}
