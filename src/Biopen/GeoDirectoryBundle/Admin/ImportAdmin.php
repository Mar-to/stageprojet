<?php

namespace Biopen\GeoDirectoryBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;

class ImportAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with("Importer des données depuis un fichier CSV ou une API Json", 
                    ["description" => "Les colonnes/propriétés importantes sont les suivantes : 
                    <ul>
                    <li><b>name</b> Le titre de la fiche</li>
                    <li><b>taxonomy</b> la liste des options séparées par des virgules. Exple: Alimentation, Restaurant
                    
                    <li><b>address</b> L'adresse de l'élément. Si vous disposez d'une adresse plus précise vous pouvez plutot utiliser les colonnes suivantes : <b>streetAddress, addressLocality, postalCode, addressCountry</b></li>
                    <li><b>latitude</b> (Sinon, elle peut être calculée à partir de l'adresse)</li>
                    <li><b>longitude</b> (Sinon, elle peut être calculée à partir de l'adresse)</li>
                    <li><b>source</b> Le nom de la source des données</li>
                    <li><b>email</b> L'email à utiliser pour contacter cet élément</li>
                    </ul>
                    Vous pouvez ensuite avoir n'importe quelles autres colonnes, elles seront importées. Veillez à faire concorder le nom des colonnes avec le nom des champs de votre formulaire"
                    ])
                ->add('sourceName', 'text', array(
                    'required' => true,                  
                    'label' => 'Nom de la source des données'))
                ->add('file', 'file', array('label' => 'Fichier à importer', 'required' => false))
                ->add('url', 'text', array('label' => 'Ou Url vers une API Json', 'required' => false))
                ->add('geocodeIfNecessary', null, array('required' => false, 'label' => 'Géocoder les élements sans latitude ni longitude à partir de leur adresse'))
                ->add('createMissingOptions', null, array('required' => false, 'label' => 'Créer les options manquantes'))
                // ->add('parentCategoryToCreateOptions', 'sonata_type_model', array(
                //     'class'=> 'Biopen\GeoDirectoryBundle\Document\Category', 
                //     'required' => false, 
                //     'btn_add' => false,
                //     'label' => 'Catégorie parente pour créer les options manquantes',
                //     'mapped' => true), array('admin_code' => 'admin.category'))
                ->add('createMissingOptions', null, array('required' => false, 'label' => 'Créer les options manquantes à partir des catégories renseignées dans chaque élément'))
                ->add('optionsToAddToEachElement', 'sonata_type_model', array(
                    'class'=> 'Biopen\GeoDirectoryBundle\Document\Option', 
                    'required' => false, 
                    'choices_as_values' => true,
                    'multiple' => true,
                    'btn_add' => false,
                    'label' => 'Options à ajouter à chaque élément importé'), array('admin_code' => 'admin.option'))                
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