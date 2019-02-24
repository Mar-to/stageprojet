<?php

namespace Biopen\GeoDirectoryBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;

class ImportAdmin extends ImportAbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with("Importer des données en dur, depuis un fichier CSV ou une API Json", ["description" => $this->getInstructions()])
                ->add('sourceName', 'text', array(
                    'required' => true,                  
                    'label' => 'Nom de la source des données'))
                ->add('file', 'file', array('label' => 'Fichier à importer', 'required' => false))
                ->add('url', 'text', array('label' => 'Ou Url vers une API Json', 'required' => false))
                ->add('geocodeIfNecessary', null, array('required' => false, 'label' => 'Géocoder les élements sans latitude ni longitude à partir de leur adresse'))
                // ->add('parentCategoryToCreateOptions', 'sonata_type_model', array(
                //     'class'=> 'Biopen\GeoDirectoryBundle\Document\Category', 
                //     'required' => false, 
                //     'btn_add' => false,
                //     'label' => 'Catégorie parente pour créer les options manquantes',
                //     'mapped' => true), array('admin_code' => 'admin.category'))
                ->add('createMissingOptions', null, array('required' => false, 'label' => 'Créer les catégories manquantes à partir des catégories renseignées dans chaque élément'))
                ->add('optionsToAddToEachElement', 'sonata_type_model', array(
                    'class'=> 'Biopen\GeoDirectoryBundle\Document\Option', 
                    'required' => false, 
                    'choices_as_values' => true,
                    'multiple' => true,
                    'btn_add' => false,
                    'label' => 'Catégories à ajouter à chaque élément importé'), array('admin_code' => 'admin.option'))                
            ->end()
        ;
    }
   protected function configureRoutes(RouteCollection $collection)
   {
      $collection->add('execute', $this->getRouterIdParameter().'/execute');
   }
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
        ;
    }
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('fileName')
            ->add('_action', 'actions', array(
                'actions' => array(
                    'edit' => array(),
                )
            ))
        ;
    }
}