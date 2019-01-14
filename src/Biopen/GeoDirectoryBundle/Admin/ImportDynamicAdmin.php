<?php

namespace Biopen\GeoDirectoryBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;

class ImportDynamicAdmin extends AbstractAdmin
{
    public function getTemplate($name) 
    {
        switch ($name) {
            case 'edit': return '@BiopenAdmin/edit/edit_import_dynamic.html.twig';
            break;
            default : return parent::getTemplate($name);
            break;
        }
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('sourceName', 'text', array('required' => true, 'label' => 'Nom de la source '))
            ->add('url', 'text', array('label' => "Url de l'api Json", 'required' => true))
            ->add('geocodeIfNecessary', null, array('required' => false, 'label' => 'Géocoder les élements sans latitude ni longitude à partir de leur adresse'))
            ->add('createMissingOptions', null, array('required' => false, 'label' => 'Créer les options manquantes à partir des catégories renseignées dans chaque élément'))
            ->add('optionsToAddToEachElement', 'sonata_type_model', array(
                'class'=> 'Biopen\GeoDirectoryBundle\Document\Option', 
                'required' => false, 
                'choices_as_values' => true,
                'multiple' => true,
                'btn_add' => false,
                'label' => 'Options à ajouter à chaque élément importé'), array('admin_code' => 'admin.option'))      
            ->add('refreshFrequencyInDays', null, array('required' => false, 'label' => "Fréquence de mise à jours des données en jours (laisser vide pour ne jamais mettre à jour automatiquement"))
            ->add('idsToIgnore', 'text', array('required' => false, 'attr' => ['class' => 'gogo-display-array'], 'label' => "Liste des IDs à ignorer lors de l'import (pour ignorer un élément, supprimer le et il ne sera plus jamais importé"));
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->add('refresh', $this->getRouterIdParameter().'/refresh');
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('sourceName')
        ;
    }
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('sourceName', null, array('label' => 'Nom de la source'))
            ->add('lastRefresh', 'datetime', array('label' => 'Dernière synchronisation des données', 'format' => 'd/m/Y - H:i'))
            ->add('nextRefresh', 'date', array('label' => 'Prochaine synchronisation', 'template' => '@BiopenAdmin/partials/list_next_refresh.html.twig'))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'edit' => array(),
                    'delete' => array(),
                    'refresh' => array('template' => '@BiopenAdmin/partials/list__action_refresh.html.twig'),
                )
            ))
        ;
    }
}