<?php

namespace Biopen\GeoDirectoryBundle\Admin;

use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Biopen\GeoDirectoryBundle\Document\ElementStatus;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Form\Type\ModelType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;

class ImportAdmin extends AbstractAdmin
{
    public function getTemplate($name)
    {
        $isDynamic = $this->getClass() == "Biopen\GeoDirectoryBundle\Document\ImportDynamic";
        switch ($name) {
            case 'edit': return '@BiopenAdmin/edit/edit_import.html.twig';
            break;
            case 'list': return $isDynamic ? '@BiopenAdmin/list/list_import_dynamic.html.twig' : '@BiopenAdmin/list/list_import.html.twig';
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

        $taxonomy = $dm->getRepository('BiopenGeoDirectoryBundle:Taxonomy')->findTaxonomy();
        $optionsList = $taxonomy->getTaxonomyJson();

        $isDynamic = $this->getSubject()->isDynamicImport();
        $title = $isDynamic ? "Import Dynamique, pour afficher des données gérées par quelqu'un d'autre" : "Importer des données en dur, depuis un fichier CSV ou une API Json";

        $formMapper
            ->tab('Général')
                ->with($title, ['class' => 'col-md-6'])
                    ->add('sourceName', null, array('required' => true, 'label' => 'Nom de la source '))
                    ->add('file', FileType::class, array('label' => 'Fichier CSV à importer (séparation par virgules, encodage en UTF8)', 'required' => false))
                    ->add('url', UrlType::class, array('label' => "Ou URL vers un API Json", 'required' => false));
        if ($isDynamic)
            $formMapper
                    ->add('refreshFrequencyInDays', null, array('required' => false, 'label' => "Fréquence de mise à jours des données en jours (laisser vide pour ne jamais mettre à jour automatiquement"))
                    ->add('idsToIgnore', null, array('required' => false, 'attr' => ['class' => 'gogo-display-array'], 'label' => "Liste des IDs qui seront ignorées lors de l'import", 'label_attr' => ['title' => "Pour ignorer un élément, supprimer le (définitivement) et il ne sera plus jamais importé. Si vous supprimez un élément dynamiquement importé juste en changeant son status (soft delete), l'élément sera quand meme importé mais conservera son status supprimé. Vous pourrez donc à tout moment restaurer cet élement pour le voir apparaitre de nouveau"]));
        $formMapper
                ->end()
                ->with("Autres options", ['box_class' => 'box box-default', 'class' => 'col-md-6'])
                    ->add('geocodeIfNecessary', null, array('required' => false, 'label' => 'Géocoder les élements sans latitude ni longitude à partir de leur adresse'))
                    ->add('createMissingOptions', null, array('required' => false, 'label' => 'Créer les catégories manquantes', 'label_attr' => ['title' => "Si un élément importé a une catégorie qui n'existe pas encore sur votre carte, elle sera automatiquement crée"]))
                    ->add('optionsToAddToEachElement', ModelType::class, array(
                        'class'=> 'Biopen\GeoDirectoryBundle\Document\Option',
                        'required' => false,
                        'multiple' => true,
                        'btn_add' => false,
                        'label' => 'Catégories à ajouter à chaque élément importé'), array('admin_code' => 'admin.option_hidden'))
                    ->add('needToHaveOptionsOtherThanTheOnesAddedToEachElements', null, array('required' => false, 'label' => 'Les éléments importés doivent contenir au moins une catégorie en dehors de celles ajoutées manuellement ci-dessus', 'label_attr' => ['title' => "Sans prendre en compte les catégories ajoutés via le champs \"Catégories à ajouter à chaque élément importé\", si les éléments importés n'ont pas de catégories, ils seront marqués comme \"Modération aucune catégorie renseignée\""]))
                    ->add('preventImportIfNoCategories', null, array('required' => false, 'label' => "Ne pas importer les éléments qui n'ont aucune catégories", 'label_attr' => ['title' => "Lorsqu'on veut importer seulement une partie des éléments d'une base de donnée, il peut être pratique de mapper uniquement les catégories que l'on veut importer. Mais tous les autres élément seront aussi importés mais sans catégories. En cochant cette option, uniquement les éléments avec une catégorie mappée seront importés"]));
         if ($isDynamic)
            $formMapper
                    ->add('fieldToCheckElementHaveBeenUpdated', null, array('required' => false, 'label' => "Nom de l'attribut à comparer pour la mise à jour", 'label_attr' => ['title' => "Lorsqu'on met à jour une source, certains des éléments à importer existent déjà dans notre base de donnée. Vous pouvez renseigner ici un champs qui permettra de comparer si l'élément à été mis à jour au sein de la source depuis le dernier import. Exple de champ: updatedAt, date_maj etc... (laisser vide pour mettre à jour les éléments à chaque fois)"]));
                $formMapper->end();
                if ($this->getSubject()->getId())
                {
                    $formMapper->with('Historique', array('class' => 'col-sm-12'))
                        ->add('logs', null, array('attr' => ['class' => 'gogo-display-logs'], 'mapped' => false))
                    ->end();
                }
        $formMapper->end();
        $formMapper->tab('Modifier les données en exécutant du code')
            ->with('Entrez du code qui sera exécuté à la reception des données, avant leur traitement par GoGoCarto', ["description" => "La variable <b>\$data</b> représente le tableau PHP créé à partir des données Csv ou Json. </br>
<pre>Quelques examples de transformations simple:</pre>
Si les éléments à importer sont dans une sous propriété appelée 'elements'
<pre>&lt;?php</br>\$data = \$data['elements'];</pre>
Ajouter un attribute 'source' à tous les éléments, avec comme valeur 'MySource'
<pre>&lt;?php</br>foreach(\$data as \$key => \$row) {
    \$data[\$key]['source'] = \"MySource\";
}</pre>
Ajouter un attribut en utilisant la valeur d'un autre attribut
<pre>&lt;?php</br>foreach(\$data as \$key => \$row) {
    \$data[\$key]['latitude'] = \$row['geo']['latitude']);
    \$data[\$key]['longitude'] = \$row['geo']['longitude']);
}</pre>
Transformer un attribut
<pre>&lt;?php</br>foreach(\$data as \$key => \$row) {
    \$data[\$key]['categories'] = array_map(function(\$cat) { return \$cat[0]; }, \$row['categories']);
}</pre>"])
                ->add('customCode', null, array('label' => 'Code PHP qui sera exécuté', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'php', 'height' => '500'], 'required' => false))
            ->end()
        ->end();

        if ($this->getSubject()->getId())
        {
            $title = 'Table de correspondance des champs';
            if ($this->getSubject()->getNewOntologyToMap()) $title .= ' <label class="label label-info">Nouveaux champs</label>';
            $formMapper
                ->tab($title)
                    ->with('Transformer les données à importer')
                        ->add('ontologyMapping', null, array('attr' => ['class' => 'gogo-mapping-ontology', 'data-form-props' => $formProperties, 'data-props' => $elementProperties]))
                    ->end()
                ->end();
            if (count($this->getSubject()->getOntologyMapping()) > 0)
            {
                $title = 'Table de correspondance des catégories';
                if ($this->getSubject()->getNewTaxonomyToMap()) $title .= ' <label class="label label-info">Nouvelles catégories</label>';
                $formMapper->tab($title)
                    ->with('Faites correspondre les catégories')
                        ->add('taxonomyMapping', null, array('attr' => ['class' => 'gogo-mapping-taxonomy', 'data-options' => $optionsList]))
                    ->end()
                ->end();
            }

        }
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->add('refresh', $this->getRouterIdParameter().'/refresh');
        $collection->add('collect', $this->getRouterIdParameter().'/collect');
        $collection->add('showData', $this->getRouterIdParameter().'/show-data');
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('sourceName')
        ;
    }

    public function createQuery($context = 'list')
    {
       $isDynamic = $this->getClass() == "Biopen\GeoDirectoryBundle\Document\ImportDynamic";
       $query = parent::createQuery($context);
       if (!$isDynamic) $query->field('type')->equals('normal');
       $query->sort('updatedAt', 'DESC');
       return $query;
    }

    public function configureBatchActions($actions) { return []; }

    protected function configureListFields(ListMapper $listMapper)
    {
        $dm = $this->getConfigurationPool()->getContainer()->get('doctrine_mongodb');
        $deletedElementsCount = $dm->getRepository('BiopenGeoDirectoryBundle:Element')->findDeletedElementsByImportIdCount();
        $isDynamic = $this->getClass() == "Biopen\GeoDirectoryBundle\Document\ImportDynamic";

        $listMapper
            ->addIdentifier('sourceName', null, array('label' => 'Nom de la source'))
            // Total count
            ->add('logs', null, array('label' => "Nombre d'éléments", 'template' => '@BiopenAdmin/partials/import/list_total_count.html.twig'))
            // non visibles count
            ;
        if ($isDynamic)
            $listMapper
            ->add('idsToIgnore', null, array('label' => "Infos", 'template' => '@BiopenAdmin/partials/import/list_non_visibles_count.html.twig', 'choices' => $deletedElementsCount))
            ->add('refreshFrequencyInDays', null, array('label' => 'Mise à jour', 'template' => '@BiopenAdmin/partials/import/list_refresh_frequency.html.twig'));

        $listMapper
            ->add('lastRefresh', null, array('label' => 'Dernier import', 'template' => '@BiopenAdmin/partials/import/list_last_refresh.html.twig'))
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