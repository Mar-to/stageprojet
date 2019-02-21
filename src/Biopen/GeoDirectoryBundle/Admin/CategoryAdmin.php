<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-07-08 16:42:20
 */
namespace Biopen\GeoDirectoryBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Biopen\GeoDirectoryBundle\Document\CategoryStatus;
use Biopen\GeoDirectoryBundle\Document\ModerationState;
use Sonata\AdminBundle\Admin\AdminInterface;
use Knp\Menu\ItemInterface;

class CategoryAdmin extends AbstractAdmin
{
  protected $baseRouteName = 'admin_biopen_geodirectory_category';
	protected $baseRoutePattern = 'admin_biopen_geodirectory_category';

   public function createQuery($context = 'list')
	{
	   $query = parent::createQuery($context);
	   return $query;
	}	

   public function getTemplate($name) 
   {
      switch ($name) {
         case 'edit': return '@BiopenAdmin/edit/edit_option_category.html.twig';
            break;
         default : return parent::getTemplate($name);
            break;
     }
   }

	protected function configureFormFields(FormMapper $formMapper)
	{
	  $formMapper
	  ->with('Paramètres principaux', array('class' => 'col-xs-12 col-md-6'))
		  	->add('name', null, array('required' => true, 'label' => 'Nom du groupe'))
		  	->add('pickingOptionText', null, array('required' => true, 'label' => 'Texte à afficher dans le formulaire : Choisissez ....')) 
		  	->add('parent', 'sonata_type_model', array(
		  		'class'=> 'Biopen\GeoDirectoryBundle\Document\Option', 
		  		'required' => false, 
            'choices_as_values' => true,
		  		'label' => 'Option parente'), array('admin_code' => 'admin.option'))		
        ->add('isMandatory', null, array('required' => false, 'label' => "Choix obligatoire", 'label_attr' => ['title'=>"Une catégorie de ce groupe doit être obligatoirement selectionnée"]))   
        ->add('singleOption', null, array('required' => false, 'label' => 'Choix unique', 'label_attr' => ['title'=>"Une seule catégorie est selectionnable à la fois"]))         
        ->add('enableDescription', null, array('required' => false, 'label' => "Activer la description des catégories", 'label_attr' => ['title'=>"On pourra renseigner un texte pour décrire chaque catégorie. Par example, pour un catégorie Agriculture, on pourrait ajouter comme texte \"Maraîchage, produits transformés...\""]))   		
		->end()
		->with('Paramètres secondaires d\'affichage', array('class' => 'col-xs-12 col-md-6', 'box_class' => 'box'))	
         ->add('nameShort', null, array('required' => false, 'label' => 'Nom (version courte)', 'label_attr' => ['title'=>"La version courte est utilisée dans le menu, car souvent on manque de place"]))
         ->add('index', null, array('required' => false, 'label' => 'Position'))	  				      
         ->add('showExpanded', null, array('required' => false, 'label' => 'En position intiale afficher les catégories (sinon il faudra cliquer pour les afficher)'))         
			   ->add('unexpandable', null, array('required' => false, 'label' => 'Ne pas pouvoir reduire ce groupe de catégories', 'label_attr' => ['title'=>"Dans le menu, les catégories de ce groupe seront toujours affichées"]))
         ->add('displaySuboptionsInline', null, array('required' => false, 'label' => 'Afficher les sous catégories sur une seule ligne'))         		
		->end()
      ->with('Afficher ce groupe', array('class' => 'col-md-6', 'box_class' => 'box'))  
         ->add('displayInMenu', null, array('required' => false, 'label' => "Dans le menu", 'label_attr' => ['title'=>"Le nom du groupe ne sera pas affiché, mais les catégories le seront"]))  
         ->add('displayInInfoBar', null, array('required' => false, 'label' => "Dans la fiche détail", 'label_attr' => ['title'=>"Le nom du groupe ne sera pas affiché, mais les catégories le seront"]))  
         ->add('displayInForm', null, array('required' => false, 'label' => "Dans le formulaire", 'label_attr' => ['title'=>"Ni le groupe ni les catégories ne seront affichés dans le formulaire"])) 
      ->end() 
		->with('Catégories contenues dans ce groupe', array('class' => 'col-xs-12 sub-options-container'))	
			->add('options', 'sonata_type_collection', array('by_reference' => false, 'type_options' => array('delete' => false), 'label_attr'=> ['style'=> 'display:none']), array(
                'edit' => 'inline',
                'inline' => 'table',
                'label' => '',
                'admin_code'    => 'admin.option.lite',
                //'sortable' => 'index',
            ))
		->end();         
	}

	protected function configureListFields(ListMapper $listMapper)
	{
	  $listMapper
	      ->add('name')	 
	      ->add('_action', 'actions', array(
               'actions' => array(
                	'tree' => array('template' => '@BiopenAdmin/partials/list__action_tree.html.twig')
               )
            ));   
	}

	protected function configureRoutes(RouteCollection $collection)
	{
	  $collection->add('tree', $this->getRouterIdParameter().'/tree');
	}
}