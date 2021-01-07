<?php

namespace App\Document\Configuration;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/** @MongoDB\EmbeddedDocument */
class ConfigurationOsm
{
    /**
     * OSM user name for instance account
     *
     * @MongoDB\Field(type="string")
     */
    public $osmUsername;

    /**
     * OSM password for instance account
     *
     * @MongoDB\Field(type="string")
     */
    public $osmPassword;

    /**
     * Set osmUsername.
     *
     * @param string $osmUsername
     *
     * @return $this
     */
    public function setOsmUsername($osmUsername)
    {
        $this->osmUsername = $osmUsername;

        return $this;
    }

    /**
     * Get osmUsername.
     *
     * @return string $osmUsername
     */
    public function getOsmUsername()
    {
        return $this->osmUsername;
    }

    /**
     * Set osmPassword.
     *
     * @param string $osmPassword
     *
     * @return $this
     */
    public function setOsmPassword($osmPassword)
    {
        $this->osmPassword = $osmPassword;

        return $this;
    }

    /**
     * Get osmPassword.
     *
     * @return string $osmPassword
     */
    public function getOsmPassword()
    {
        return $this->osmPassword;
    }
}
