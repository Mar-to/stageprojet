<?php

namespace Biopen\GeoDirectoryBundle\Admin;

use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Biopen\GeoDirectoryBundle\Document\ElementStatus;

class ImportDynamicAdmin extends ImportAbstractAdmin
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
            ->with("Import Dynamique, pour afficher des données gérées par quelqu'un d'autre", ["description" => $this->getInstructions()])
                ->add('sourceName', 'text', array('required' => true, 'label' => 'Nom de la source '))
                ->add('url', 'text', array('label' => "Url de l'api Json", 'required' => true))
                ->add('geocodeIfNecessary', null, array('required' => false, 'label' => 'Géocoder les élements sans latitude ni longitude à partir de leur adresse'))
                ->add('createMissingOptions', null, array('required' => false, 'label' => 'Créer les catégories manquantes', 'label_attr' => ['title' => "Si un élément importé a une catégorie qui n'existe pas encore sur votre carte, elle sera automatiquement crée"]))
                ->add('optionsToAddToEachElement', 'sonata_type_model', array(
                    'class'=> 'Biopen\GeoDirectoryBundle\Document\Option', 
                    'required' => false, 
                    'choices_as_values' => true,
                    'multiple' => true,
                    'btn_add' => false,
                    'label' => 'Catégories à ajouter à chaque élément importé'), array('admin_code' => 'admin.option'))      
                ->add('refreshFrequencyInDays', null, array('required' => false, 'label' => "Fréquence de mise à jours des données en jours (laisser vide pour ne jamais mettre à jour automatiquement"))
                ->add('idsToIgnore', 'text', array('required' => false, 'attr' => ['class' => 'gogo-display-array'], 'label' => "Liste des IDs à ignorer lors de l'import", 'label_attr' => ['title' => "Pour ignorer un élément, supprimer le (définitivement) et il ne sera plus jamais importé. Si vous supprimez un élément dynamiquement importé juste en changeant son status (soft delete), l'élément sera quand meme importé mais conservera son status supprimé. Vous pourrez donc à tout moment restaurer cet élement pour le voir apparaitre de nouveau"]))
            ->end() 
            ->with('Historique', array('class' => 'col-sm-12'))
                ->add('logs', 'hidden', array('attr' => ['class' => 'gogo-display-logs'], 'mapped' => false))
            ->end(); 
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
        $dm = $this->getConfigurationPool()->getContainer()->get('doctrine_mongodb');
        $deletedElementsCount = $dm->getRepository('BiopenGeoDirectoryBundle:Element')->findDeletedElementsByImportIdCount();

        $listMapper
            ->addIdentifier('sourceName', null, array('label' => 'Nom de la source'))       
            // Total count
            ->add('logs', null, array('label' => "Nombre d'éléments", 'template' => '@BiopenAdmin/partials/import/list_total_count.html.twig'))
            // non visibles count
            ->add('idsToIgnore', null, array('label' => "Non visibles", 'template' => '@BiopenAdmin/partials/import/list_non_visibles_count.html.twig', 'choices' => $deletedElementsCount))
            ->add('refreshFrequencyInDays', null, array('label' => 'Mise à jour', 'template' => '@BiopenAdmin/partials/import/list_refresh_frequency.html.twig'))
            ->add('lastRefresh', null, array('label' => 'Derniere mise à jour', 'template' => '@BiopenAdmin/partials/import/list_last_refresh.html.twig'))
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