<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-06-09 14:29:33
 */
namespace Biopen\GeoDirectoryBundle\Admin\Element;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Biopen\GeoDirectoryBundle\Document\ElementStatus;
use Biopen\GeoDirectoryBundle\Document\ModerationState;
use Vich\UploaderBundle\Form\Type\VichImageType;

class ElementAdminShowEdit extends ElementAdminList
{
	protected function configureFormFields(FormMapper $formMapper)
	{
	  $formMapper
	  ->with('Informations générales', array())
		  ->add('name', 'text')         
      ->add('userOwnerEmail', 'text', array('required' => false, 'label' => "Email de l'utilisateur propriétaire de cette fiche"))
      // ->add('images', 'sonata_type_collection', array('by_reference' => true, 'type_options' => array('delete' => true)), 
      //    array('edit' => 'inline', 'inline' => 'table'))
      // ->add('stamps', 'sonata_type_model', array(
      //       'label' => "Etiquettes",
      //       'required' => false,
      //       'choices_as_values' => true,
      //       'expanded' => false,
      //       'multiple' => true,
      //   ))
		->end();      
	}	

	protected function configureShowFields(ShowMapper $show)
	{    
    $needModeration = $this->subject->getModerationState() != 0;
    $statusClass = $needModeration ? 'col-md-6' : 'col-md-12';
    if ($this->subject->isPending())
    {
      $show       
       ->with('En attente', array('class' => $statusClass))
         ->add('currContribution', null, array('template' => '@BiopenAdmin/partials/show_one_contribution.html.twig'))->end();
    }
    else
    {
      $show->with('Status', array('class' => $statusClass))
         ->add('status', 'choice', [ 'choices'=> $this->statusChoices ])->end(); 
    }

    if ($needModeration) {
      $show 
       ->with('Modération', array('class' => 'col-md-6 col-sm-12'))         
        ->add('moderationState', 'choice', [
            'label' => 'Moderation',
               'choices'=> $this->moderationChoices,
               'template' => '@BiopenAdmin/partials/show_choice_moderation.html.twig'
               ])       
        ->add('reports', null, array('template' => '@BiopenAdmin/partials/show_pending_reports.html.twig', 'label' => 'Signalements'))
       ->end();
    }     
    
    $show
      ->with('Autre infos', array('class' => 'col-md-6 col-sm-12'))
        ->add('id')
        ->add('optionValues', null, [
            'template' => '@BiopenAdmin/partials/show_option_values.html.twig', 
            'choices' => $this->optionList,
            'label' => 'Catégories' ])
        ->add('email', 'text', array('label' => 'Email de contact'))  
        ->add('images', null, array('template' => '@BiopenAdmin/partials/show_element_images.html.twig'))
        ->add('randomHash')
        ->add('oldId', null, array('label' => 'Id dans la base de données importée'))
        ->add('sourceKey', null, array('label' => 'Source'))
        ->add('createdAt', 'datetime', array("format" => "d/m/Y à H:i"))
        ->add('updatedAt', 'datetime', array("format" => "d/m/Y à H:i"))
      ->end()

      ->with('Localisation', array('class' => 'col-md-6 col-sm-12'))         
        ->add('address.formatedAddress', null, array('label' => 'Adresse complète'))
        ->add('address.streetAddress', null, array('label' => 'Adresse'))
        ->add('address.addressLocality', null, array('label' => 'Ville'))
	      ->add('address.postalCode', null, array('label' => 'Code postal'))
        ->add('address.addressCountry', null, array('label' => 'Pays'))
	      ->add('geo.latitude')
	      ->add('geo.longitude')
      ->end()   

      ->with('Champs personnalisés', array('class' => 'col-md-12 col-sm-12'))
        ->add('data',  null, array('template' => '@BiopenAdmin/partials/show_element_data.html.twig')) 
      ->end()       

      ->with('Hitorique des contributions', array('class' => 'col-sm-12'))
        ->add('contributions', null, array('template' => '@BiopenAdmin/partials/show_contributions.html.twig'))
      ->end(); 

    $show
      ->with('JSON', array('class' => 'col-md-12', 'box_class' => 'box box-default'))         
        ->add('compactJson')
        ->add('baseJson')
        ->add('privateJson')
        ->add('adminJson')
      ->end();
	}
}