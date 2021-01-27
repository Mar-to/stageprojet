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

        $sourceList = $dm->query('Element')->distinct('sourceKey')->execute();
        // Adds missing source to the priority list
        $priorityList = $this->getSubject()->getDuplicates()->getSourcePriorityInAutomaticMerge();
        foreach($sourceList as $source) {
            if (!in_array($source, $priorityList)) $priorityList[] = $source;
        }
        $this->getSubject()->getDuplicates()->setSourcePriorityInAutomaticMerge($priorityList);

        $formMapper
            ->with('Configuration')
                ->add('duplicates.fieldsToBeUsedForComparaison', ChoiceType::class, [
                    'choices' => $propsChoices, 
                    'label' => "Liste des champs utilisés pour la détection de doublons", 
                    'required' => false, 'multiple' => true])
                ->add('duplicates.rangeInMeters', null, ['label' => 'Distance maximale (en mètres) entre deux doublons'])
            ->end()
            ->with('Fusion automatique')
                ->add('duplicates.automaticMergeIfPerfectMatch', CheckboxType::class, [
                    'label' => "Fusionner automatiquement lors d'une correspondance parfaite", 
                    'required' => false])
                ->add('duplicates.sourcePriorityInAutomaticMerge', null, [
                    'label' => "Lors d'une fusion automatique, quelle source voulez vous conserver en priorité?", 
                    'attr' => [
                        'class' => 'gogo-source-priority',
                        'data-source-list' => $sourceList]])
            ->end()
        ;
    }
}
