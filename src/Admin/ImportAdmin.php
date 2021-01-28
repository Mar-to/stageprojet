<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ModelType;
use Sonata\AdminBundle\Route\RouteCollection;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use App\Helper\GoGoHelper;

class ImportAdmin extends AbstractAdmin
{
    public function getTemplate($name)
    {
        $isDynamic = "App\Document\ImportDynamic" == $this->getClass();
        switch ($name) {
            case 'edit': return 'admin/edit/edit_import.html.twig';
            break;
            case 'list': return $isDynamic ? 'admin/list/list_import_dynamic.html.twig' : 'admin/list/list_import.html.twig';
            break;
            default: return parent::getTemplate($name);
            break;
        }
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        $dm = GoGoHelper::getDmFromAdmin($this);
        $repo = $dm->get('Element');
        $formProperties = json_encode($repo->findFormProperties());
        $elementProperties = json_encode($repo->findDataCustomProperties());
        $config = $dm->get('Configuration')->findConfiguration();
        $taxonomy = $dm->get('Taxonomy')->findTaxonomy();
        $optionsList = $taxonomy->getTaxonomyJson();

        $isDynamic = $this->getSubject()->isDynamicImport();
        $title = $isDynamic ? "Import Dynamique, pour afficher des données gérées par quelqu'un d'autre" : 'Importer des données en dur, depuis un fichier CSV ou une API Json';
        $isPersisted = $this->getSubject()->getId();
        
        $usersQuery = $dm->query('User');
        $usersQuery->addOr($usersQuery->expr()->field('roles')->exists(true))
                   ->addOr($usersQuery->expr()->field('groups')->exists(true));
        $formMapper
            ->tab('Général')
                ->with($title, ['class' => 'col-md-12'])
                    ->add('sourceName', null, ['required' => true, 'label' => 'Nom de la source '])
                    ->add('file', FileType::class, ['label' => 'Fichier CSV à importer (séparation par virgules, encodage en UTF8)', 'required' => false]);
        if ($isDynamic) {
            $formMapper
                    // Every attribute that will be update need to be mapped here. Following attributes are manually inserted in element-import.html.twig, but we still need them here as hidden input
                    ->add('osmQueriesJson', HiddenType::class)
                    ->add('url', HiddenType::class)
                    ->add('sourceType', null, ['attr' => ['class' => 
                            'gogo-element-import',
                            'data-title-layer' => $config->getDefaultTileLayer()->getUrl(),
                            'data-default-bounds' => json_encode($config->getDefaultBounds()),
                        ], 'required' => true, 'label' => 'Type de la source'])
                ->end()
                ->with('Paramètres', ['class' => 'col-md-12'])
                    ->add('refreshFrequencyInDays', null, ['required' => false, 'label' => 'Fréquence de mise à jours des données en jours (laisser vide pour ne jamais mettre à jour automatiquement'])
                    ->add('usersToNotify', ModelType::class, [
                        'class' => 'App\Document\User',
                        'required' => false,
                        'multiple' => true,
                        'query' => $usersQuery,
                        'btn_add' => false,
                        'label' => "Utilisateurs à notifier en cas d'erreur, ou lorsque de nouveaux champs/catégories sont à faire correspondre", ], ['admin_code' => 'admin.option_hidden'])
                    
                    ->add('moderateElements', null, [
                        'required' => false, 
                        'label' => 'Modérer les éléments importés',
                        'label_attr' => ['title' => 'Les éléments importés auront le status "en attente de validation" et devront être manuellement validés. Idem pour des mise à jour d\'éléments existant (modification)']])
                    ->add('idsToIgnore', TextType::class, ['mapped' => false, 'required' => false, 
                        'attr' => ['class' => 'gogo-display-array', 
                        'value' => $this->getSubject()->getIdsToIgnore()], 
                        'label' => "Liste des IDs qui seront ignorées lors de l'import", 
                        'label_attr' => ['title' => "Pour ignorer un élément, supprimer le (définitivement) et il ne sera plus jamais importé. Si vous supprimez un élément dynamiquement importé juste en changeant son status (soft delete), l'élément sera quand meme importé mais conservera son status supprimé. Vous pourrez donc à tout moment restaurer cet élement pour le voir apparaitre de nouveau"]]);
        } else {
            $formMapper                    
                    ->add('url', UrlType::class, ['label' => 'Ou URL vers un API Json', 'required' => false]);
        }
        $formMapper->end();                
        if ($isPersisted) {
            $formMapper->with('Historique', ['class' => 'col-sm-12'])
                        ->add('currState', null, ['attr' => ['class' => 'gogo-display-logs'], 'label_attr' => ['style' => 'display: none'], 'mapped' => false])
                    ->end();
        }
        $formMapper->end();

        // TAB - Custom Code
        $formMapper->tab('Modifier les données en exécutant du code')
            ->with('Entrez du code qui sera exécuté à la reception des données, avant leur traitement par GoGoCarto', ['description' => "La variable <b>\$data</b> représente le tableau PHP créé à partir des données Csv ou Json. </br>
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
                ->add('customCode', null, ['label' => 'Code PHP qui sera exécuté', 'attr' => ['class' => 'gogo-code-editor', 'format' => 'php', 'height' => '500'], 'required' => false])
            ->end()
        ->end();

        
        if ($isPersisted) {
            // TAB - Ontology Mapping
            $title = 'Table de correspondance des champs';
            if ($this->getSubject()->getNewOntologyToMap()) {
                $title .= ' <label class="label label-info">Nouveaux champs</label>';
            }
            $formMapper
                ->tab($title)                    
                    ->with('Transformer les données à importer')
                        ->add('ontologyMapping', null, ['label_attr' => ['style' => 'display:none'], 'attr' => ['class' => 'gogo-mapping-ontology', 'data-form-props' => $formProperties, 'data-props' => $elementProperties]])
                    ->end();
                
                if ($this->getSubject()->getSourceType() != 'osm') {
                        $formMapper->with('Autres Options', ['box_class' => 'box box-default'])
                        ->add('geocodeIfNecessary', null, ['required' => false, 'label' => 'Géocoder les élements sans latitude ni longitude à partir de leur adresse']);
                        if ($isDynamic) {
                            $formMapper
                                    ->add('fieldToCheckElementHaveBeenUpdated', null, ['required' => false, 'label' => "Nom de l'attribut à comparer pour la mise à jour", 'label_attr' => ['title' => "Lorsqu'on met à jour une source, certains des éléments à importer existent déjà dans notre base de donnée. Vous pouvez renseigner ici un champs qui permettra de comparer si l'élément à été mis à jour au sein de la source depuis le dernier import. Exple de champ: updatedAt, date_maj etc... (laisser vide pour mettre à jour les éléments à chaque fois)"]]);
                        }
                    $formMapper->end();
                }
                $formMapper->end();

            // TAB - Taxonomy Mapping
            if (count($this->getSubject()->getOntologyMapping()) > 0) {     
                $title = 'Table de correspondance des catégories';
                if ($this->getSubject()->getNewTaxonomyToMap()) {
                    $title .= ' <label class="label label-info">Nouvelles catégories</label>';
                }
                $formMapper->tab($title)          
                    ->with('Faites correspondre les catégories')
                        ->add('taxonomyMapping', null, ['label_attr' => ['style' => 'display:none'], 'attr' => ['class' => 'gogo-mapping-taxonomy', 'data-options' => $optionsList]])
                    ->end()

                    ->with('Autres Options', ['box_class' => 'box box-default'])
                        ->add('optionsToAddToEachElement', ModelType::class, [
                            'class' => 'App\Document\Option',
                            'required' => false,
                            'multiple' => true,
                            'btn_add' => false,
                            'label' => 'Catégories à ajouter à chaque élément importé', ], ['admin_code' => 'admin.option_hidden'])
                        ->add('needToHaveOptionsOtherThanTheOnesAddedToEachElements', null, ['required' => false, 'label' => 'Les éléments importés sans catégorie (en dehors de celles ajoutées manuellement ci-dessus) seront marqués comme "à modérer"', 'label_attr' => ['title' => "Sans prendre en compte les catégories ajoutés via le champs \"Catégories à ajouter à chaque élément importé\", si les éléments importés n'ont pas de catégories, ils seront marqués comme \"Modération aucune catégorie renseignée\""]])
                        ->add('preventImportIfNoCategories', null, ['required' => false, 'label' => "Ne pas importer les éléments qui n'ont aucune catégories", 'label_attr' => ['title' => "Lorsqu'on veut importer seulement une partie des éléments d'une base de donnée, il peut être pratique de mapper uniquement les catégories que l'on veut importer. Mais tous les autres élément seront aussi importés mais sans catégories. En cochant cette option, uniquement les éléments avec une catégorie mappée seront importés"]])
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
        $isDynamic = "App\Document\ImportDynamic" == $this->getClass();
        $query = parent::createQuery($context);
        if (!$isDynamic) {
            $query->field('type')->equals('normal');
        }
        $query->sort('updatedAt', 'DESC');

        return $query;
    }

    public function configureBatchActions($actions)
    {
        return [];
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $dm = GoGoHelper::getDmFromAdmin($this);
        $deletedElementsCount = $dm->get('Element')->findDeletedElementsByImportIdCount();
        $isDynamic = "App\Document\ImportDynamic" == $this->getClass();

        $listMapper
            ->addIdentifier('sourceName', null, ['label' => 'Nom de la source'])
            ->add('logs', null, ['label' => "Nombre d'éléments", 'template' => 'admin/partials/import/list_total_count.html.twig']);
        if ($isDynamic) {
            $listMapper
            ->add('idsToIgnore', null, ['label' => 'Infos', 'template' => 'admin/partials/import/list_non_visibles_count.html.twig', 'choices' => $deletedElementsCount])
            ->add('refreshFrequencyInDays', null, ['label' => 'Mise à jour', 'template' => 'admin/partials/import/list_refresh_frequency.html.twig']);
        }

        $listMapper
            ->add('lastRefresh', null, ['label' => 'Dernier import', 'template' => 'admin/partials/import/list_last_refresh.html.twig'])
            ->add('_action', 'actions', [
                'actions' => [
                    'edit' => [],
                    'delete' => [],
                    'refresh' => ['template' => 'admin/partials/list__action_refresh.html.twig'],
                ],
            ])
        ;
    }
}
