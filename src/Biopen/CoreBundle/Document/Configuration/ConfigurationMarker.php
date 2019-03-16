<?php

namespace Biopen\CoreBundle\Document\Configuration;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/** @MongoDB\EmbeddedDocument */
class ConfigurationMarker
{
    /** @MongoDB\Field(type="bool") */
    public $displayPopup = true;

    /** @MongoDB\Field(type="bool") */
    public $popupAlwaysVisible = false;

    /** @MongoDB\Field(type="string") */
    public $popupTemplate = "{{ name }}";

     /** @MongoDB\Field(type="bool") */
    public $popupTemplateUseMarkDown = true;


    /**
     * Set displayPopup
     *
     * @param bool $displayPopup
     * @return $this
     */
    public function setDisplayPopup($displayPopup)
    {
        $this->displayPopup = $displayPopup;
        return $this;
    }

    /**
     * Get displayPopup
     *
     * @return bool $displayPopup
     */
    public function getDisplayPopup()
    {
        return $this->displayPopup;
    }

    /**
     * Set popupAlwaysVisible
     *
     * @param bool $popupAlwaysVisible
     * @return $this
     */
    public function setPopupAlwaysVisible($popupAlwaysVisible)
    {
        $this->popupAlwaysVisible = $popupAlwaysVisible;
        return $this;
    }

    /**
     * Get popupAlwaysVisible
     *
     * @return bool $popupAlwaysVisible
     */
    public function getPopupAlwaysVisible()
    {
        return $this->popupAlwaysVisible;
    }

    /**
     * Set popupTemplate
     *
     * @param string $popupTemplate
     * @return $this
     */
    public function setPopupTemplate($popupTemplate)
    {
        $this->popupTemplate = $popupTemplate;
        return $this;
    }

    /**
     * Get popupTemplate
     *
     * @return string $popupTemplate
     */
    public function getPopupTemplate()
    {
        return $this->popupTemplate;
    }

    /**
     * Set popupTemplateUseMarkDown
     *
     * @param bool $popupTemplateUseMarkDown
     * @return $this
     */
    public function setPopupTemplateUseMarkDown($popupTemplateUseMarkDown)
    {
        $this->popupTemplateUseMarkDown = $popupTemplateUseMarkDown;
        return $this;
    }

    /**
     * Get popupTemplateUseMarkDown
     *
     * @return bool $popupTemplateUseMarkDown
     */
    public function getPopupTemplateUseMarkDown()
    {
        return $this->popupTemplateUseMarkDown;
    }
}
