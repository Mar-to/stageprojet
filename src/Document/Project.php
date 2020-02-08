<?php

namespace App\Document;

use Doctrine\Bundle\MongoDBBundle\Validator\Constraints\Unique;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @MongoDB\Document
 * @Unique(fields="name")
 * @Unique(fields="domainName")
 */
class Project
{
    /**
     * @var int
     *
     * @MongoDB\Id(strategy="INCREMENT")
     */
    private $id;

    /**
     * @MongoDB\Field(type="string")
     */
    private $name;

    /**
     * domain-name.my-server-url.org.
     *
     * @MongoDB\Field(type="string")
     */
    private $domainName;

    // not persisted
    private $homeUrl;

    /** @MongoDB\Field(type="string") */
    private $imageUrl;

    /** @MongoDB\Field(type="string") */
    private $description;

    /** @MongoDB\Field(type="int") */
    private $dataSize = 0;

    /**
     * @var date
     *
     * @MongoDB\Field(type="date")
     * @Gedmo\Timestampable(on="create")
     */
    private $createdAt;

    /** @MongoDB\ReferenceMany(targetDocument="App\Document\ScheduledCommand", inversedBy="project", cascade={"all"}) */
    private $commands;

    public function getDbName()
    {
        return $this->getDomainName();
    }

    public function __toString()
    {
        return $this->getName() ? $this->getName() : '';
    }

    /**
     * Get id.
     *
     * @return int_id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string $name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set domainName.
     *
     * @param string $domainName
     *
     * @return $this
     */
    public function setDomainName($domainName)
    {
        $this->domainName = $domainName;

        return $this;
    }

    /**
     * Get domainName.
     *
     * @return string $domainName
     */
    public function getDomainName()
    {
        return $this->domainName;
    }

    /**
     * Set homeUrl.
     *
     * @param string $homeUrl
     *
     * @return $this
     */
    public function setHomeUrl($homeUrl)
    {
        $this->homeUrl = $homeUrl;

        return $this;
    }

    /**
     * Get homeUrl.
     *
     * @return string $homeUrl
     */
    public function getHomeUrl()
    {
        return $this->homeUrl;
    }

    /**
     * Set imageUrl.
     *
     * @param string $imageUrl
     *
     * @return $this
     */
    public function setImageUrl($imageUrl)
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    /**
     * Get imageUrl.
     *
     * @return string $imageUrl
     */
    public function getImageUrl()
    {
        return $this->imageUrl;
    }

    /**
     * Set description.
     *
     * @param string $description
     *
     * @return $this
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string $description
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set dataSize.
     *
     * @param int $dataSize
     *
     * @return $this
     */
    public function setDataSize($dataSize)
    {
        $this->dataSize = $dataSize;

        return $this;
    }

    /**
     * Get dataSize.
     *
     * @return int $dataSize
     */
    public function getDataSize()
    {
        return $this->dataSize;
    }

    /**
     * Set createdAt.
     *
     * @param date $createdAt
     *
     * @return $this
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return date $createdAt
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function __construct()
    {
        $this->commands = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add command.
     *
     * @param App\Document\ScheduledCommand $command
     */
    public function addCommand(\App\Document\ScheduledCommand $command)
    {
        $this->commands[] = $command;
    }

    /**
     * Remove command.
     *
     * @param App\Document\ScheduledCommand $command
     */
    public function removeCommand(\App\Document\ScheduledCommand $command)
    {
        $this->commands->removeElement($command);
    }

    /**
     * Get commands.
     *
     * @return \Doctrine\Common\Collections\Collection $commands
     */
    public function getCommands()
    {
        return $this->commands;
    }
}
