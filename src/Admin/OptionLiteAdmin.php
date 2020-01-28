<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-07-08 17:28:56
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

class OptionLiteAdmin extends AbstractAdmin
{
  protected $baseRouteName = 'admin_gogo_geodirectory_option_lite';
	protected $baseRoutePattern = 'admin_gogo_geodirectory_option_lite';

	protected function configureFormFields(FormMapper $formMapper)
	{
	  $formMapper
		  	->add('name', null, array('required' => true,'label' => 'Nom'))
		  	->add('index', null, array('required' => false, 'label' => 'Position'))
		  	->add('color', 'text', array('required' => false, 'label' => 'Couleur', 'attr' => ['class' => 'gogo-color-picker']))
		  	->add('icon', null, array('required' => false, 'label' => 'Icone', 'attr' => ['class' => 'gogo-icon-picker']))
		  	->add('useIconForMarker', null, array('required' => false, 'label' => "Icone  pour le marqueur", 'label_attr' => ['title'=>"Le marqueur affichera toutes icones de chaque catégorie ayant cette option activée. Les icones seront classées par ordre de selection des catégories dans le formulaire"]))
		  	->add('useColorForMarker', null, array('required' => false, 'label' => "Couleur pour le marqueur", 'label_attr' => ['title'=>"Si un élément a plusieurs catégories qui donnent la couleur, on utilise la catégorie de plus bas niveau"]))
				->add('_link', 'text', array('required' => false, 'mapped' => false, 'label' => 'admin_gogo_geodirectory_option_edit', ));
	}
}