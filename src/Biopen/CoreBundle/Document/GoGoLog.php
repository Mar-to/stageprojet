<?php

namespace Biopen\CoreBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Gedmo\Mapping\Annotation as Gedmo;

abstract class GoGoLogType
{
    const Debug = "debug";
    const Info = "info";     
    const Warning = "warning";
    const Error = "error";    
    const Success = "success";     
}

/**
 * @MongoDB\Document
 */
class GoGoLog
{
    /**
     * @var int
     *
     * @MongoDB\Id(strategy="INCREMENT") 
     */
    private $id;

     /**
     * @var string
     *
     * @MongoDB\Field(type="string")
     * @MongoDB\Index
     */
    private $type;

     /**
     * @var string
     *
     * @MongoDB\Field(type="string")
     */
    private $message;

    /**
     * @var string
     *
     * @MongoDB\Field(type="string")
     */
    private $subcontent;

     /**
     * @var bool
     * When user click "dismiss" log, it will not appear again
     * @MongoDB\Field(type="bool")
     */
    private $hidden = false;

    /**
     * @var date $createdAt
     *
     * @MongoDB\Field(type="date")
     * @Gedmo\Timestampable(on="create")
     */
    protected $createdAt;

    public function __construct($type = null, $message = null)
    {
        $this->type = $type;
        $this->message = $message;
    }

    /**
     * Get id
     *
     * @return int_id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set message
     *
     * @param string $message
     * @return $this
     */
    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }

    /**
     * Get message
     *
     * @return string $message
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set createdAt
     *
     * @param date $createdAt
     * @return $this
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * Get createdAt
     *
     * @return date $createdAt
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return $this
     */
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }

    /**
     * Get type
     *
     * @return string $type
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set hidden
     *
     * @param bool $hidden
     * @return $this
     */
    public function setHidden($hidden)
    {
        $this->hidden = $hidden;
        return $this;
    }

    /**
     * Get hidden
     *
     * @return bool $hidden
     */
    public function getHidden()
    {
        return $this->hidden;
    }

    /**
     * Set subcontent
     *
     * @param string $subcontent
     * @return $this
     */
    public function setSubcontent($subcontent)
    {
        $this->subcontent = $subcontent;
        return $this;
    }

    /**
     * Get subcontent
     *
     * @return string $subcontent
     */
    public function getSubcontent()
    {
        return $this->subcontent;
    }
}
