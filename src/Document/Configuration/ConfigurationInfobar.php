<?php

namespace App\Document\Configuration;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/** @MongoDB\EmbeddedDocument */
class ConfigurationInfobar
{
    /** @MongoDB\Field(type="int") */
    public $width = null;

    /** @MongoDB\Field(type="string") */
    public $headerTemplate = null;

    /** @MongoDB\Field(type="bool") */
    public $headerTemplateUseMarkDown = true;

    /** @MongoDB\Field(type="string") */
    public $bodyTemplate = null;

    /** @MongoDB\Field(type="bool") */
    public $bodyTemplateUseMarkDown = true;

    /** @MongoDB\Field(type="int") */
    public $width2 = null;

    /** @MongoDB\Field(type="string") */
    public $headerTemplate2 = null;

    /** @MongoDB\Field(type="bool") */
    public $headerTemplateUseMarkDown2 = true;

    /** @MongoDB\Field(type="string") */
    public $bodyTemplate2 = null;

    /** @MongoDB\Field(type="bool") */
    public $bodyTemplateUseMarkDown2 = true;

    /**
     * Set width.
     *
     * @param int $width
     *
     * @return $this
     */
    public function setWidth($width)
    {
        $this->width = $width;

        return $this;
    }

    /**
     * Get width.
     *
     * @return int $width
     */
    public function getWidth()
    {
        return $this->width;
    }

     /**
     * Set width2.
     *
     * @param int $width2
     *
     * @return $this
     */
    public function setWidth2($width)
    {
        $this->width2 = $width;

        return $this;
    }

    /**
     * Get width2.
     *
     * @return int $width2
     */
    public function getWidth2()
    {
        return $this->width2;
    }

    /**
     * Set bodyTemplate.
     *
     * @param string $bodyTemplate
     *
     * @return $this
     */
    public function setBodyTemplate($bodyTemplate)
    {
        $this->bodyTemplate = $bodyTemplate;

        return $this;
    }

    /**
     * Get bodyTemplate.
     *
     * @return string $bodyTemplate
     */
    public function getBodyTemplate()
    {
        return $this->bodyTemplate;
    }

    /**
     * Set headerTemplate.
     *
     * @param string $headerTemplate
     *
     * @return $this
     */
    public function setHeaderTemplate($headerTemplate)
    {
        $this->headerTemplate = $headerTemplate;

        return $this;
    }

    /**
     * Get headerTemplate.
     *
     * @return string $headerTemplate
     */
    public function getHeaderTemplate()
    {
        return $this->headerTemplate;
    }

    /**
     * Set headerTemplateUseMarkDown.
     *
     * @param bool $headerTemplateUseMarkDown
     *
     * @return $this
     */
    public function setHeaderTemplateUseMarkDown($headerTemplateUseMarkDown)
    {
        $this->headerTemplateUseMarkDown = $headerTemplateUseMarkDown;

        return $this;
    }

    /**
     * Get headerTemplateUseMarkDown.
     *
     * @return bool $headerTemplateUseMarkDown
     */
    public function getHeaderTemplateUseMarkDown()
    {
        return $this->headerTemplateUseMarkDown;
    }

    /**
     * Set bodyTemplateUseMarkDown.
     *
     * @param bool $bodyTemplateUseMarkDown
     *
     * @return $this
     */
    public function setBodyTemplateUseMarkDown($bodyTemplateUseMarkDown)
    {
        $this->bodyTemplateUseMarkDown = $bodyTemplateUseMarkDown;

        return $this;
    }

    /**
     * Get bodyTemplateUseMarkDown.
     *
     * @return bool $bodyTemplateUseMarkDown
     */
    public function getBodyTemplateUseMarkDown()
    {
        return $this->bodyTemplateUseMarkDown;
    }

    /**
     * Set bodyTemplate2.
     *
     * @param string $bodyTemplate2
     *
     * @return $this
     */
    public function setBodyTemplate2($bodyTemplate)
    {
        $this->bodyTemplate2 = $bodyTemplate;

        return $this;
    }

    /**
     * Get bodyTemplate2.
     *
     * @return string $bodyTemplate2
     */
    public function getBodyTemplate2()
    {
        return $this->bodyTemplate2;
    }

    /**
     * Set headerTemplate2.
     *
     * @param string $headerTemplate2
     *
     * @return $this
     */
    public function setHeaderTemplate2($headerTemplate)
    {
        $this->headerTemplate2 = $headerTemplate;

        return $this;
    }

    /**
     * Get headerTemplate2.
     *
     * @return string $headerTemplate2
     */
    public function getHeaderTemplate2()
    {
        return $this->headerTemplate2;
    }

    /**
     * Set headerTemplateUseMarkDown2.
     *
     * @param bool $headerTemplateUseMarkDown2
     *
     * @return $this
     */
    public function setHeaderTemplateUseMarkDown2($headerTemplateUseMarkDown)
    {
        $this->headerTemplateUseMarkDown2 = $headerTemplateUseMarkDown;

        return $this;
    }

    /**
     * Get headerTemplateUseMarkDown2.
     *
     * @return bool $headerTemplateUseMarkDown2
     */
    public function getHeaderTemplateUseMarkDown2()
    {
        return $this->headerTemplateUseMarkDown2;
    }

    /**
     * Set bodyTemplateUseMarkDown2.
     *
     * @param bool $bodyTemplateUseMarkDown2
     *
     * @return $this
     */
    public function setBodyTemplateUseMarkDown2($bodyTemplateUseMarkDown)
    {
        $this->bodyTemplateUseMarkDown2 = $bodyTemplateUseMarkDown;

        return $this;
    }

    /**
     * Get bodyTemplateUseMarkDown2.
     *
     * @return bool $bodyTemplateUseMarkDown2
     */
    public function getBodyTemplateUseMarkDown2()
    {
        return $this->bodyTemplateUseMarkDown2;
    }
}
