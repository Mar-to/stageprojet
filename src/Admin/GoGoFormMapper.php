<?php

namespace App\Admin;

use Sonata\AdminBundle\Form\Type\CollectionType;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\CollectionType as SymfonyCollectionType;
use Symfony\Component\Form\FormBuilderInterface;

class GoGoFormMapper extends FormMapper
{   
    // Override to create magic shortcuts : if translation exists with suffix _hint or _help, we directly
    // Adds it to the config
    public function add($name, $type = null, array $options = [], array $fieldDescriptionOptions = [])
    {
        if (!$this->shouldApply()) {
            return $this;
        }

        if ($name instanceof FormBuilderInterface) {
            $fieldName = $name->getName();
        } else {
            $fieldName = $name;
        }

        // "Dot" notation is not allowed as form name, but can be used as property path to access nested data.
        if (!$name instanceof FormBuilderInterface && !isset($options['property_path'])) {
            $options['property_path'] = $fieldName;

            // fix the form name
            $fieldName = $this->sanitizeFieldName($fieldName);
        }

        // change `collection` to `sonata_type_native_collection` form type to
        // avoid BC break problems
        if ('collection' === $type || SymfonyCollectionType::class === $type) {
            $type = CollectionType::class;
        }

        $label = $fieldName;

        $group = $this->addFieldToCurrentGroup($label);

        if (isset($options['label_trans_params'])) {
            $fieldDescriptionOptions['label_translation_parameters'] = $options['label_trans_params'];
        }

        // Try to autodetect type
        if ($name instanceof FormBuilderInterface && null === $type) {
            $fieldDescriptionOptions['type'] = \get_class($name->getType()->getInnerType());
        }

        if (!isset($fieldDescriptionOptions['type']) && \is_string($type)) {
            $fieldDescriptionOptions['type'] = $type;
        }

        if ($group['translation_domain'] && !isset($fieldDescriptionOptions['translation_domain'])) {
            $fieldDescriptionOptions['translation_domain'] = $group['translation_domain'];
        }

        $fieldDescription = $this->admin->getModelManager()->getNewFieldDescriptionInstance(
            $this->admin->getClass(),
            $name instanceof FormBuilderInterface ? $name->getName() : $name,
            $fieldDescriptionOptions
        );

        // Note that the builder var is actually the formContractor:
        $this->builder->fixFieldDescription($this->admin, $fieldDescription, $fieldDescriptionOptions);

        if ($fieldName !== $name) {
            $fieldDescription->setName($fieldName);
        }

        $this->admin->addFormFieldDescription($fieldName, $fieldDescription);

        if ($name instanceof FormBuilderInterface) {
            $type = null;
            $options = [];
        } else {
            $name = $fieldDescription->getName();

            // -----------------------------------
            // GoGo Custom Code

            // Note that the builder var is actually the formContractor:
            $defaultOptions = $this->builder->getDefaultOptions($type, $fieldDescription) ?? [];
            $defaultOptions['required'] = false;
            $options = array_replace_recursive($defaultOptions, $options);

            // be compatible with mopa if not installed, avoid generating an exception for invalid option
            // force the default to false ...
            if (!isset($options['label_render'])) {
                $options['label_render'] = false;
            }      

            if (!isset($options['label'])) {
                $options['label'] = $this->admin->getLabelTranslatorStrategy()->getLabel($name, 'form', 'label');
            }
            if (isset($options['label_trans_params'])) {
                $options['label'] = $this->admin->t($options['label'], $options['label_trans_params'] ?? []); 
                unset($options['label_trans_params']);
            }

            // Handles shortcuts like "auto_help" or "placeholder_trans_params"
            foreach(['help', 'hint', 'placeholder'] as $key) {
                if (isset($options["auto_$key"]) || isset($options["{$key}_trans_params"])) {
                    $helpKey = $this->admin->getLabelTranslatorStrategy()->getLabel($name, 'form', 'help');
                    $options[$key] = $this->admin->t($helpKey, $options["{$key}_trans_params"] ?? []); 
                    unset($options["auto_$key"]);
                    unset($options["{$key}_trans_params"]);
                }  
            } 

            if (isset($options['help'])) {
                $options['label_attr']['title'] = $options['help'];
                unset($options['help']);
            }               
            if (isset($options['hint'])) {
                if ($options['hint'] != null) $this->admin->getFormFieldDescription($name)->setHelp($options['hint']);
                unset($options['hint']);                
            }

            // End of GoGo Custom Code
            // ---------------------------------
        }

        if (!isset($fieldDescriptionOptions['role']) || $this->admin->isGranted($fieldDescriptionOptions['role'])) {
            $this->formBuilder->add($name, $type, $options);
        }

        return $this;
    }


}
