<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use JMS\Serializer\Annotation\Expose;

/** @MongoDB\EmbeddedDocument */
class OpenHours
{
    protected $days = ['Mo' => 'Monday', 'Tu' => 'Tuesday', 'We' => 'Wednesday', 'Th' => 'Thursday', 'Fr' => 'Friday', 'Sa' => 'Saturday', 'Su' => 'Sunday'];

    /**
     * @Expose
     * @MongoDB\EmbedOne(targetDocument="App\Document\DailyTimeSlot") */
    private $Monday;

    /**
     * @Expose
     * @MongoDB\EmbedOne(targetDocument="App\Document\DailyTimeSlot") */
    private $Tuesday;
    /**
     * @Expose
     * @MongoDB\EmbedOne(targetDocument="App\Document\DailyTimeSlot") */
    private $Wednesday;
    /**
     * @Expose
     * @MongoDB\EmbedOne(targetDocument="App\Document\DailyTimeSlot") */
    private $Thursday;
    /**
     * @Expose
     * @MongoDB\EmbedOne(targetDocument="App\Document\DailyTimeSlot") */
    private $Friday;
    /**
     * @Expose
     * @MongoDB\EmbedOne(targetDocument="App\Document\DailyTimeSlot") */
    private $Saturday;
    /**
     * @Expose
     * @MongoDB\EmbedOne(targetDocument="App\Document\DailyTimeSlot") */
    private $Sunday;

    public function __construct($openHours = null)
    {
        if ($openHours && is_array($openHours)) {
            foreach ($openHours as $day => $timeSlotString) {
                $slot1start = null;
                $slot1end = null;
                $slot2start = null;
                $slot2end = null;
                $slots = explode(',', $timeSlotString);
                if (count($slots) > 0) {
                    list($slot1start, $slot1end) = $this->buildSlotsFrom($slots[0]);
                }
                if (2 == count($slots)) {
                    list($slot2start, $slot2end) = $this->buildSlotsFrom($slots[1]);
                }
                $dailySlot = new DailyTimeSlot($slot1start, $slot1end, $slot2start, $slot2end);
                $method = 'set'.$this->days[$day];
                $this->$method($dailySlot);
            }
        }
    }

    private function buildSlotsFrom($string)
    {
        $times = explode('-', $string);
        if (count($times) != 2) return [null, null];
        if ($times[0] == "" || $times[1] == "") return [null, null];
        $start = date_create_from_format('H:i', $times[0]);
        $end = date_create_from_format('H:i', $times[1]);
        if (!$start || !$end) return [null, null];
        return [$start, $end];
    }

    public function toJson()
    {
        $result = '{';
        if ($this->Monday) {
            $result .= '"Mo":'.$this->Monday->toJson().',';
        }
        if ($this->Tuesday) {
            $result .= '"Tu":'.$this->Tuesday->toJson().',';
        }
        if ($this->Wednesday) {
            $result .= '"We":'.$this->Wednesday->toJson().',';
        }
        if ($this->Thursday) {
            $result .= '"Th":'.$this->Thursday->toJson().',';
        }
        if ($this->Friday) {
            $result .= '"Fr":'.$this->Friday->toJson().',';
        }
        if ($this->Saturday) {
            $result .= '"Sa":'.$this->Saturday->toJson().',';
        }
        if ($this->Sunday) {
            $result .= '"Su":'.$this->Sunday->toJson().',';
        }
        $result = rtrim($result, ',');
        $result .= '}';

        return $result;
    }

    public function getMonday()
    {
        return $this->Monday;
    }

    public function getTuesday()
    {
        return $this->Tuesday;
    }

    public function getWednesday()
    {
        return $this->Wednesday;
    }

    public function getThursday()
    {
        return $this->Thursday;
    }

    public function getFriday()
    {
        return $this->Friday;
    }

    public function getSaturday()
    {
        return $this->Saturday;
    }

    public function getSunday()
    {
        return $this->Sunday;
    }

    // setters
    public function setMonday($dailyTimeSlot)
    {
        $this->Monday = $dailyTimeSlot;

        return $this;
    }

    public function setTuesday($dailyTimeSlot)
    {
        $this->Tuesday = $dailyTimeSlot;

        return $this;
    }

    public function setWednesday($dailyTimeSlot)
    {
        $this->Wednesday = $dailyTimeSlot;

        return $this;
    }

    public function setThursday($dailyTimeSlot)
    {
        $this->Thursday = $dailyTimeSlot;

        return $this;
    }

    public function setFriday($dailyTimeSlot)
    {
        $this->Friday = $dailyTimeSlot;

        return $this;
    }

    public function setSaturday($dailyTimeSlot)
    {
        $this->Saturday = $dailyTimeSlot;

        return $this;
    }

    public function setSunday($dailyTimeSlot)
    {
        $this->Sunday = $dailyTimeSlot;

        return $this;
    }

    /*public function __construct()
    {
    }

    public setDailyTimeSlot($day,$plage1,$plage2)
    {
        $this->$days[$day] = new DailyTimeSlot($plage1,$plage2);
    }

    public getDailyTimeSlot($day)
    {
        return $this->$days[$day];
    }*/
}
