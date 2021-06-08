<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * Codeinvitation.
 *
 * @MongoDB\Document(repositoryClass="App\Repository\CodeInvitationRepository")
 * @MongoDB\Index(keys={"geo"="2d"})
 */
class CodeInvitation
{
   /**
     * @var int
     *
     * @MongoDB\Id(strategy="auto")
     */
    private $id;

     /**
     * @var string
     *
     * @MongoDB\Field(type="string")
     */
    private $code;

    /**
     * @MongoDB\Field(type="date")
     *
     * @var \DateTime
     */
    private $date;

    /**
     * @var bool
     * @MongoDB\Field(type="bool") @MongoDB\Index
     */
    private $active;

    /**
     * @var int
     *
     * @MongoDB\Field(type="int")
     */
    private $usable;
    
    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set code.
     *
     * @param string $code
     *
     * @return CodeInvitation
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code.
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }
    
    /**
     * Set Date.
     *
     * @param date $date
     *
     * @return CodeInvitation
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get Date.
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Get Active.
     *
     * @return bool $active
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set Active.
     *
     * @param bool $active
     *
     * @return CodeInvitation
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Set Usable.
     *
     * @param int $usable
     *
     * @return CodeInvitation
     */
    public function setUsable($usable)
    {
        $this->usable = $usable;

        return $this;
    }

    /**
     * Get Usable.
     *
     * @return int
     */
    public function getUsable()
    {
        return $this->usable;
    }
}
