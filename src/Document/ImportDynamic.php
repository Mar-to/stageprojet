<?php

namespace App\Document;

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
     * @var date $nextRefresh
     *
     * @MongoDB\Field(type="date")
     */
    private $nextRefresh = null;


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
}
