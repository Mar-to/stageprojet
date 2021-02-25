<?php

namespace App\Document\Configuration;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\ODM\MongoDB\UnitOfWork;

/** @MongoDB\EmbeddedDocument */
class ConfigurationDuplicates
{
    /** @MongoDB\Field(type="bool") */
    private $useGlobalSearch = true;    
    
    /**  @MongoDB\Field(type="collection") */
    private $fieldsToBeUsedForComparaison = [];

    /** @MongoDB\Field(type="int") */
    private $rangeInMeters = 200;

    /** @MongoDB\Field(type="bool") */
    private $automaticMergeIfPerfectMatch = true;    

    /**  @MongoDB\Field(type="collection") */
    private $sourcePriorityInAutomaticMerge = [];
     /**
     * A message to indicate the state of the current detection
     *
     * @MongoDB\Field(type="string")
     */
    private $currentProcessState;

    private $formFields = [];
    private $fieldsInvolvded = null;

    public function setFormFields($formFields) {
        $this->formFields = $formFields;
    }

    public function getFieldsInvolvedInDetection() {
        if ($this->fieldsInvolvded) return $this->fieldsInvolvded;
        $result = $this->fieldsToBeUsedForComparaison;
        if ($this->useGlobalSearch) {
            foreach($this->formFields as $field) {
                if (isset($field->search)) $result[] = $field->name;
            }
        }
        $this->fieldsInvolvded = $result;
        return $result;
    }

    /**
     * Get the value of automaticMergeIfPerfectMatch
     */ 
    public function getAutomaticMergeIfPerfectMatch()
    {
        return $this->automaticMergeIfPerfectMatch;
    }

    /**
     * Set the value of automaticMergeIfPerfectMatch
     *
     * @return  self
     */ 
    public function setAutomaticMergeIfPerfectMatch($automaticMergeIfPerfectMatch)
    {
        $this->automaticMergeIfPerfectMatch = $automaticMergeIfPerfectMatch;

        return $this;
    }

    /**
     * Get the value of fieldsToBeUsedForComparaison
     */ 
    public function getFieldsToBeUsedForComparaison()
    {
        return $this->fieldsToBeUsedForComparaison;
    }

    /**
     * Set the value of fieldsToBeUsedForComparaison
     *
     * @return  self
     */ 
    public function setFieldsToBeUsedForComparaison($fieldsToBeUsedForComparaison)
    {
        $this->fieldsToBeUsedForComparaison = $fieldsToBeUsedForComparaison;

        return $this;
    }

    /**
     * Get a message to indicate the state of the current detection
     */ 
    public function getCurrentProcessState()
    {
        return $this->currentProcessState;
    }

    /**
     * Set a message to indicate the state of the current detection
     *
     * @return  self
     */ 
    public function setCurrentProcessState($currentProcessState)
    {
        $this->currentProcessState = $currentProcessState;

        return $this;
    }

    /**
     * Get the value of sourcePriorityInAutomaticMerge
     */ 
    public function getSourcePriorityInAutomaticMerge()
    {
        return $this->sourcePriorityInAutomaticMerge;
    }

    /**
     * Set the value of sourcePriorityInAutomaticMerge
     *
     * @return  self
     */ 
    public function setSourcePriorityInAutomaticMerge($list)
    {
        if (is_string($list)) $list = explode(',', $list);
        $this->sourcePriorityInAutomaticMerge = $list;

        return $this;
    }

    /**
     * Get the value of rangeInMeters
     */ 
    public function getRangeInMeters()
    {
        return $this->rangeInMeters;
    }

    /**
     * Set the value of rangeInMeters
     *
     * @return  self
     */ 
    public function setRangeInMeters($rangeInMeters)
    {
        $this->rangeInMeters = $rangeInMeters;

        return $this;
    }

    /**
     * Get the value of useGlobalSearch
     */ 
    public function getUseGlobalSearch()
    {
        return $this->useGlobalSearch;
    }

    /**
     * Set the value of useGlobalSearch
     *
     * @return  self
     */ 
    public function setUseGlobalSearch($useGlobalSearch)
    {
        $this->useGlobalSearch = $useGlobalSearch;

        return $this;
    }
}
