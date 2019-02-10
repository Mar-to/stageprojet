<?php

namespace Biopen\GeoDirectoryBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @MongoDB\Document(repositoryClass="Biopen\GeoDirectoryBundle\Repository\WebhookPostRepository")
 */
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
    public $numAttempts;

    /** @MongoDB\Field(type="date") */
    public $latestAttemptAt;

    function __construct()
    {
        $this->numAttempts = 0;
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
     * Set num attempts
     *
     * @param int $numAttempts
     * @return $this
     */
    public function setNumAttempts($numAttempts)
    {
        $this->numAttempts = $numAttempts;
        return $this;
    }

    /**
     * Increment num attempts
     *
     * @param int $numAttempts
     * @return $this
     */
    public function incrementNumAttempts()
    {
        $this->numAttempts++;
        return $this;
    }

    /**
     * Get num attempts
     *
     * @return int $numAttempts
     */
    public function getNumAttempts()
    {
        return $this->numAttempts;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
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
     * @return \DateTime $createdAt
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set latest attempt date
     *
     * @param \DateTime $latestAttemptAt
     * @return $this
     */
    public function setLatestAttemptAt($latestAttemptAt)
    {
        $this->latestAttemptAt = $latestAttemptAt;
        return $this;
    }

    /**
     * Get latest attempt date
     *
     * @return \DateTime $latestAttemptAt
     */
    public function getLatestAttemptAt()
    {
        return $this->latestAttemptAt;
    }
}
