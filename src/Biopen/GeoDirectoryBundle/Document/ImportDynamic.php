<?php

namespace Biopen\GeoDirectoryBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use \Datetime;

/**
 * External source to load dynamically
 *
 * @MongoDB\Document
 */
class ImportDynamic extends Import
{
    /**
     * @var string   
     * @MongoDB\Field(type="int")
     */
    private $refreshFrequencyInDays;

    /**
     * @var date $lastRefresh
     *
     * @MongoDB\Field(type="date")
     */
    private $lastRefresh = null;

    /**
     * @var date $lastRefresh
     *
     * @MongoDB\Field(type="date")
     */
    private $nextRefresh = null;

    /**
     * After importing some Data, if the user delete some elements, their ids will be remembered
     * so next time we do not import them again
     *
     * @MongoDB\Field(type="collection")
     */
    private $idsToIgnore = [];

    public function isDynamicImport() { return true; }

    public function updateNextRefreshDate() 
    {
        if ($this->getRefreshFrequencyInDays() == 0) $this->setNextRefresh(null);
        else 
        {           
            $interval = new \DateInterval('P' . $this->getRefreshFrequencyInDays() .'D');
            $date = new DateTime();
            $date->setTimestamp(time());
            $this->setNextRefresh($date->add($interval));
        }
    }    

    public function addIdToIgnore($id) 
    {
        $this->idsToIgnore[] = $id;
    }

    /**
     * Set refreshFrequencyInDays
     *
     * @param int $refreshFrequencyInDays
     * @return $this
     */
    public function setRefreshFrequencyInDays($refreshFrequencyInDays)
    {
        $this->refreshFrequencyInDays = $refreshFrequencyInDays;
        $this->updateNextRefreshDate();
        return $this;
    }

    /**
     * Get refreshFrequencyInDays
     *
     * @return int $refreshFrequencyInDays
     */
    public function getRefreshFrequencyInDays()
    {
        return $this->refreshFrequencyInDays;
    }

    /**
     * Set lastRefresh
     *
     * @param date $lastRefresh
     * @return $this
     */
    public function setLastRefresh($lastRefresh)
    {
        $this->lastRefresh = $lastRefresh;
        return $this;
    }

    /**
     * Get lastRefresh
     *
     * @return date $lastRefresh
     */
    public function getLastRefresh()
    {
        return $this->lastRefresh;
    }

    /**
     * Set nextRefresh
     *
     * @param date $nextRefresh
     * @return $this
     */
    public function setNextRefresh($nextRefresh)
    {
        $this->nextRefresh = $nextRefresh;
        return $this;
    }

    /**
     * Get nextRefresh
     *
     * @return date $nextRefresh
     */
    public function getNextRefresh()
    {
        return $this->nextRefresh;
    }


    /**
     * Set idsToIgnore
     *
     * @param collection $idsToIgnore
     * @return $this
     */
    public function setIdsToIgnore($idsToIgnore)
    {
        $this->idsToIgnore = $idsToIgnore;
        return $this;
    }

    /**
     * Get idsToIgnore
     *
     * @return collection $idsToIgnore
     */
    public function getIdsToIgnore()
    {
        return $this->idsToIgnore;
    }
}
