<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */
namespace App\Admin;

use App\Admin\ConfigurationAbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class ConfigurationUserAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_login_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-login';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $container = $this->getConfigurationPool()->getContainer();

        $formMapper
            ->add('user.enableRegistration', CheckboxType::class, array('label' => "Autoriser la création de compte", 'required' => false))
            ->add('user.sendConfirmationEmail', CheckboxType::class, array('label' => "Valider la création avec un email de confirmation", 'required' => false));

        // provide oauth id if configured
        if ($container->getParameter('oauth_communs_id') != "disabled") {
            $formMapper->add('user.loginWithLesCommuns', CheckboxType::class, array('label' => "Activer la connexion avec \"LesCommuns.org\"", 'required' => false));
            $formMapper->add('user.loginWithMonPrintemps', CheckboxType::class, array('label' => "Activer la connexion avec MonPrintemps", 'required' => false));
        }
        if ($container->getParameter('oauth_google_id') != "disabled")
            $formMapper->add('user.loginWithGoogle', CheckboxType::class, array('label' => "Activer la connexion avec Google", 'required' => false));
        if ($container->getParameter('oauth_facebook_id') != "disabled")
            $formMapper->add('user.loginWithFacebook', CheckboxType::class, array('label' => "Activer la connexion avec Facebook", 'required' => false));

    }
}