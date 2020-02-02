<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-07-08 17:27:53
 */
namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use App\Document\CategoryStatus;
use App\Document\ModerationState;
use Sonata\AdminBundle\Admin\AdminInterface;
use Knp\Menu\ItemInterface;

class CategoryLiteAdmin extends AbstractAdmin
{
   protected $baseRouteName = 'admin_app_category_lite';
	protected $baseRoutePattern = 'admin_app_category_lite';

	protected function configureFormFields(FormMapper $formMapper)
	{
	  $formMapper

		  	->add('name', null, array('required' => true, 'label' => 'Nom du groupe'))
		  	->add('pickingOptionText', null, array('required' => true, 'label' => 'Text à afficher dans le formulaire : Choisissez ....'))
		  	->add('index', null, array('required' => false, 'label' => 'Position'))
		  	->add('isMandatory', null, array('required' => false, 'label' => "Obligatoire"))
		  	->add('singleOption', null, array('required' => false, 'label' => 'Choix unique'))
		  	->add('displayInMenu', null, array('required' => false, 'label' => "Menu"))
         ->add('displayInInfoBar', null, array('required' => false, 'label' => "Fiche"))
         ->add('displayInForm', null, array('required' => false, 'label' => "Formulaire"))
		  	->add('_link', 'text', array('required' => false, 'mapped'=>false, 'label' => 'admin_app_category_edit'));
	}
}