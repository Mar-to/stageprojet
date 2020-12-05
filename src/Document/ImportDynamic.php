<?php

namespace App\Document;

use Datetime;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * External source to load dynamically.
 *
 * @MongoDB\Document
 */
class ImportDynamic extends Import
{
    /**
     * @var string
     * @MongoDB\Field(type="string")
     */
    public $sourceType;

    /**
     * Get Data from OpenStreetMap using overpass query
     * @MongoDB\Field(type="string")
     */
    public $osmQueriesJson;
    
    /**
     * @var string
     * @MongoDB\Field(type="int")
     */
    private $refreshFrequencyInDays;

    /**
     * @var date
     *
     * @MongoDB\Field(type="date")
     */
    private $nextRefresh = null;

    public function isDynamicImport()
    {
        return true;
    }

    public function updateNextRefreshDate()
    {
        if (0 == $this->getRefreshFrequencyInDays()) {
            $this->setNextRefresh(null);
        } else {
            $interval = new \DateInterval('P'.$this->getRefreshFrequencyInDays().'D');
            $date = new DateTime();
            $date->setTimestamp(time());
            $this->setNextRefresh($date->add($interval));
        }
    }

    /**
     * Set refreshFrequencyInDays.
     *
     * @param int $refreshFrequencyInDays
     *
     * @return $this
     */
    public function setRefreshFrequencyInDays($refreshFrequencyInDays)
    {
        $this->refreshFrequencyInDays = $refreshFrequencyInDays;
        $this->updateNextRefreshDate();

        return $this;
    }

    /**
     * Get refreshFrequencyInDays.
     *
     * @return int $refreshFrequencyInDays
     */
    public function getRefreshFrequencyInDays()
    {
        return $this->refreshFrequencyInDays;
    }

    /**
     * Set nextRefresh.
     *
     * @param date $nextRefresh
     *
     * @return $this
     */
    public function setNextRefresh($nextRefresh)
    {
        $this->nextRefresh = $nextRefresh;

        return $this;
    }

    /**
     * Get nextRefresh.
     *
     * @return date $nextRefresh
     */
    public function getNextRefresh()
    {
        return $this->nextRefresh;
    }

    public function getOsmQueriesJson()
    {
        return $this->osmQueriesJson;
    }

    public function setOsmQueriesJson($json) 
    {
        $this->osmQueriesJson = $json;
        return $this;
    }

    public function setSourceType($sourceType)
    {
        $this->sourceType = $sourceType;
        return $this;
    }
    public function getSourceType()
    {
        return $this->sourceType;
    }

}
