<?php

namespace App\Document\Configuration;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/** @MongoDB\EmbeddedDocument */
class ConfigurationApi
{
    /** @MongoDB\Field(type="string") */
    public $internalApiAuthorizedDomains = null;

    /**
     * List of the custom properties we don't want to share in the public API.
     *
     * @MongoDB\Field(type="collection")
     */
    public $publicApiPrivateProperties = [];

    /**
     * Set internalApiAuthorizedDomains.
     *
     * @param string $internalApiAuthorizedDomains
     *
     * @return $this
     */
    public function setInternalApiAuthorizedDomains($internalApiAuthorizedDomains)
    {
        $this->internalApiAuthorizedDomains = $internalApiAuthorizedDomains;

        return $this;
    }

    /**
     * Get internalApiAuthorizedDomains.
     *
     * @return string $internalApiAuthorizedDomains
     */
    public function getInternalApiAuthorizedDomains()
    {
        return $this->internalApiAuthorizedDomains;
    }

    /**
     * Set publicApiPrivateProperties.
     *
     * @param collection $publicApiPrivateProperties
     *
     * @return $this
     */
    public function setPublicApiPrivateProperties($publicApiPrivateProperties)
    {
        $this->publicApiPrivateProperties = $publicApiPrivateProperties;

        return $this;
    }

    /**
     * Get publicApiPrivateProperties.
     *
     * @return collection $publicApiPrivateProperties
     */
    public function getPublicApiPrivateProperties()
    {
        return $this->publicApiPrivateProperties;
    }
}
