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
        $dm = $this->getConfigurationPool()->getContainer()->get('doctrine_mongodb');
        $repo = $dm->getRepository('BiopenGeoDirectoryBundle:Element');
        $formProperties = json_encode($repo->findFormProperties());
        $elementProperties = json_encode($repo->findDataCustomProperties());
        $optionsList = $dm->getRepository('BiopenGeoDirectoryBundle:Option')->createQueryBuilder()
                      ->select('name')->hydrate(false)->getQuery()->execute()->toArray();
        $optionsList = json_encode($optionsList);

        $formMapper
            ->tab('Général')
                ->with("Import Dynamique, pour afficher des données gérées par quelqu'un d'autre", ['class' => 'col-md-6'])
                    ->add('sourceName', 'text', array('required' => true, 'label' => 'Nom de la source '))
                    ->add('url', 'text', array('label' => "Url de l'api Json", 'required' => true))
                    ->add('refreshFrequencyInDays', null, array('required' => false, 'label' => "Fréquence de mise à jours des données en jours (laisser vide pour ne jamais mettre à jour automatiquement"))
                    ->add('idsToIgnore', 'text', array('required' => false, 'attr' => ['class' => 'gogo-display-array'], 'label' => "Liste des IDs qui seront ignorées lors de l'import", 'label_attr' => ['title' => "Pour ignorer un élément, supprimer le (définitivement) et il ne sera plus jamais importé. Si vous supprimez un élément dynamiquement importé juste en changeant son status (soft delete), l'élément sera quand meme importé mais conservera son status supprimé. Vous pourrez donc à tout moment restaurer cet élement pour le voir apparaitre de nouveau"]))
                ->end()
                ->with("Autres options", ['box_class' => 'box box-default', 'class' => 'col-md-6'])
                    ->add('geocodeIfNecessary', null, array('required' => false, 'label' => 'Géocoder les élements sans latitude ni longitude à partir de leur adresse'))
                    ->add('createMissingOptions', null, array('required' => false, 'label' => 'Créer les catégories manquantes', 'label_attr' => ['title' => "Si un élément importé a une catégorie qui n'existe pas encore sur votre carte, elle sera automatiquement crée"]))
                    ->add('optionsToAddToEachElement', 'sonata_type_model', array(
                        'class'=> 'Biopen\GeoDirectoryBundle\Document\Option',
                        'required' => false,
                        'choices_as_values' => true,
                        'multiple' => true,
                        'btn_add' => false,
                        'label' => 'Catégories à ajouter à chaque élément importé'), array('admin_code' => 'admin.option'))
                    ->add('needToHaveOptionsOtherThanTheOnesAddedToEachElements', null, array('required' => false, 'label' => 'Les éléments importés doivent contenir au moins une catégorie en dehors de celles ajoutées manuellement ci-dessus', 'label_attr' => ['title' => "Sans prendre en compte les catégories ajoutés via le champs \"Catégories à ajouter à chaque élément importé\", si les éléments importés n'ont pas de catégories, ils seront marqués comme \"Modération aucune catégorie renseignée\""]))
                    ->add('fieldToCheckElementHaveBeenUpdated', null, array('required' => false, 'label' => "Nom de l'attribut à comparer pour la mise à jour", 'label_attr' => ['title' => "Lorsqu'on met à jour une source, certains des éléments à importer existent déjà dans notre base de donnée. Vous pouvez renseigner ici un champs qui permettra de comparer si l'élément à été mis à jour au sein de la source depuis le dernier import. Exple de champ: updatedAt, date_maj etc... (laisser vide pour mettre à jour les éléments à chaque fois)"]))
                ->end();
                if ($this->getSubject()->getId())
                {
                    $formMapper->with('Historique', array('class' => 'col-sm-12'))
                        ->add('logs', 'hidden', array('attr' => ['class' => 'gogo-display-logs'], 'mapped' => false))
                    ->end();
                }
            $formMapper->end();

        if ($this->getSubject()->getId())
        {
            $formMapper
                ->tab('Table de correspondance des champs')
                    ->with('Transformer les données à importer')
                        ->add('ontologyMapping', 'hidden', array('attr' => ['class' => 'gogo-mapping-ontology', 'data-form-props' => $formProperties, 'data-props' => $elementProperties]))
                    ->end()
                ->end();
            if (count($this->getSubject()->getOntologyMapping()) > 0)
            {
                $formMapper->tab('Table de correspondance des catégories')
                    ->with('Faites correspondre les catégories')
                        ->add('taxonomyMapping', 'hidden', array('attr' => ['class' => 'gogo-mapping-taxonomy', 'data-options' => $optionsList]))
                    ->end()
                ->end();
            }

        }

        $formMapper
            ->tab('Aide')
                ->with("Aide", ['box_class' => 'box box-default', "description" => $this->getInstructions('13154fa0-13c2-41f1-a4ad-e04c35c86e89')])
                ->end()
            ->end();
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->add('refresh', $this->getRouterIdParameter().'/refresh');
        $collection->add('collect', $this->getRouterIdParameter().'/collect');
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
            ->add('idsToIgnore', null, array('label' => "Infos", 'template' => '@BiopenAdmin/partials/import/list_non_visibles_count.html.twig', 'choices' => $deletedElementsCount))
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