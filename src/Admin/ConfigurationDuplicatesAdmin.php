<?php

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use App\Helper\GoGoHelper;

class ConfigurationDuplicatesAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_duplicates_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-duplicates';

    public function getTemplate($name)
    {
        switch ($name) {
            // overwrite edit template so we hide delete button in actions menu
            case 'edit': return 'admin/edit/edit_configuration_duplicates.html.twig';
            break;
            default: return parent::getTemplate($name);
            break;
        }
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        $dm = GoGoHelper::getDmFromAdmin($this);
        $props = $dm->get('Element')->findAllCustomProperties();
        array_unshift($props, 'name');
        $propsChoices = [];
        foreach ($props as $value) {
            $propsChoices[$value] = $value;
        }

        $sourceList = $dm->query('Element')->distinct('sourceKey')->getArray();
        $sourceList = array_merge($sourceList, $dm->query('Import')->distinct('sourceName')->getArray());
        $sourceList = array_unique($sourceList);
        // Remove no more used sources
        $priorityList = $this->getSubject()->getDuplicates()->getSourcePriorityInAutomaticMerge();
        $newPriorityList = [];
        foreach($priorityList as $source) {
            if (in_array($source, $sourceList)) $newPriorityList[] = $source;
        }
        // Adds new source to the end
        foreach($sourceList as $source) {
            if (!in_array($source, $newPriorityList)) $newPriorityList[] = $source;
        }
        $this->getSubject()->getDuplicates()->setSourcePriorityInAutomaticMerge($newPriorityList);
        $searchFields = implode(', ', $this->getSubject()->getDuplicates()->getFieldsInvolvedInGlobalSearch());
        $formMapper
            ->with('Configuration')
                ->add('duplicates.useGlobalSearch', CheckboxType::class, [
                    'label' => "Utiliser la recherche générale pour chercher les doublons (recherche souple dans $searchFields)", 
                    'label_attr' => ['title' => "La recherche générale est configurée dans la personalisation du formulaire (choisissez quels champs seront recherchés, de base cela recherche uniquement dans le titre de la fiche). Elle est souple, c'est à dire qu'elle détectera des valeurs similaires (\"test\" trouvera \"Un TésT\"). Un correspondance parfaite sera détectée uniquement si les titres de fiche sont quasiment similaire : \"test\" et \"Un TésT\" ne sera pas une correspondance parfaite, alors que \"test\" et \"TésT\" le sera"],
                    'required' => false
                ])
                ->add('duplicates.fieldsToBeUsedForComparaison', ChoiceType::class, [
                    'choices' => $propsChoices, 
                    'label' => "Autres champs utilisés pour la détection de doublons (recherche stricte)", 
                    'label_attr' => ['title' => "Seuls les valeurs exactement identiques seront détectés. Une correspondance d'un seul de ces champ sera interprété comme une correspondance parfaite entre les deux éléments"],
                    'required' => false, 'multiple' => true])
                ->add('duplicates.rangeInMeters', null, ['label' => 'Distance maximale (en mètres) entre deux doublons'])
                ->add('duplicates.detectAfterImport', CheckboxType::class, [
                    'label' => "Détecter les doublons après chaque Import", 
                    'label_attr' => ['title' => "Pour chaque nouvel élément ajouté lors de l'import, une recherche sera effectuée sur l'ensemble de la base de donnée pour trouver d'éventuels doublons"],
                    'required' => false
                ])
            ->end()
            
            ->with('Fusion des doublons')
                ->add('duplicates.automaticMergeIfPerfectMatch', CheckboxType::class, [
                    'label' => "Fusionner automatiquement lors d'une correspondance parfaite", 
                    'required' => false])
                ->add('duplicates.sourcePriorityInAutomaticMerge', null, [
                    'label' => "Lors d'une fusion, quelle source voulez vous conserver en priorité?", 
                    'attr' => [
                        'class' => 'gogo-source-priority',
                        'data-source-list' => $sourceList]])
            ->end()

            ->with('Restreindre la détection manuelle (optionel)', ['box_class' => 'box box-default'])
                ->add('duplicates.sourcesToDetectFrom', ChoiceType::class, [
                    'label' => "Chercher les doublons entre les sources (laisser vide pour chercher dans toute la base de donnée)",
                    'choice_label' => function ($choice, $key, $value) {
                        if ('' === $choice) return 'Cette carte';  
                        return $choice;
                    },
                    'choices' => $sourceList,
                    'multiple' => true, 'required' => false])
                ->add('duplicates.sourcesToDetectWith', ChoiceType::class, [
                    'label' => "Et les sources (laisser vide pour chercher dans toute la base de donnée)",
                    'choices' => $sourceList,
                    'choice_label' => function ($choice, $key, $value) {
                        if ('' === $choice) return 'Cette carte';              
                        return $choice;
                    },
                    'multiple' => true, 'required' => false])
            ->end()
        ;
    }
}
