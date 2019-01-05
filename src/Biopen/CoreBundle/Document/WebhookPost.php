<?php

namespace Biopen\CoreBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Gedmo\Mapping\Annotation as Gedmo;

/** @MongoDB\Document */
class WebhookPost
{
    /** @MongoDB\Id(strategy="INCREMENT") */
    private $id;

    /** @MongoDB\Field(type="string") */
    public $url;

    /** @MongoDB\Field(type="hash") */
    public $data;

    /**
     * @MongoDB\Field(type="date")
     * @Gedmo\Timestampable(on="create")
     */
    public $createdAt;

    /** @MongoDB\Field(type="int") */
    public $numRetry;

    /** @MongoDB\Field(type="date") */
    public $latestRetry;

    function __construct()
    {
        $this->numRetry = 0;
    }

    function __toString()
    {
        return (string) $this->getId();
    }

    /**
     * Get id
     *
     * @return int $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set url
     *
     * @param string $url
     * @return $this
     */
    public function setUrl($url)
    {
        $this->url = $url;
        return $this;
    }

    /**
     * Get url
     *
     * @return string $url
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set data
     *
     * @param array $data
     * @return $this
     */
    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Get data
     *
     * @return array $data
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Set num retry
     *
     * @param int $numRetry
     * @return $this
     */
    public function setNumRetry($numRetry)
    {
        $this->data = $numRetry;
        return $this;
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
     * Get num retry
     *
     * @return int $numRetry
     */
    public function getNumRetry()
    {
        return $this->numRetry;
    }

    /**
     * Set latest retry
     *
     * @param \DateTime $latestRetry
     * @return $this
     */
    public function setLastRefresh($latestRetry)
    {
        $this->latestRetry = $latestRetry;
        return $this;
    }

    /**
     * Get latest retry
     *
     * @return \DateTime $latestRetry
     */
    public function getLatestRetry()
    {
        return $this->latestRetry;
    }
}
