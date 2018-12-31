<?php

namespace Biopen\GeoDirectoryBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Biopen\CoreBundle\Document\AbstractFile;

/** 
* @MongoDB\Document 
* @Vich\Uploadable
* Import data into GoGoCarto. the data can imported through a static file, or via API url
* The Import can be made once for all (static import) or dynamically every X days (ImportDynamic)
*
* @MongoDB\InheritanceType("SINGLE_COLLECTION")
* @MongoDB\DiscriminatorField("type")
* @MongoDB\DiscriminatorMap({"normal"="Import", "dynamic"="ImportDynamic"})
*/
class Import extends AbstractFile
{
    protected $vichUploadFileKey = "import_file";

    /**
     * @var int
     * @MongoDB\Id(strategy="INCREMENT") 
     */
    private $id;

    /**
     * @var string   
     * @MongoDB\Field(type="string")
     */
    public $sourceName;

    /**
     * @var string   
     * Url of API to get the data
     * @MongoDB\Field(type="string")
     */
    private $url;

    /**
     * @MongoDB\ReferenceOne(targetDocument="Biopen\GeoDirectoryBundle\Document\Category", cascade={"persist"})
     */
    private $parentCategoryToCreateOptions = null;

    /**
     * @MongoDB\ReferenceMany(targetDocument="Biopen\GeoDirectoryBundle\Document\Option", cascade={"persist"})
     */
    private $optionsToAddToEachElement = [];

    /**
     * @MongoDB\Field(type="bool")
     */
    private $createMissingOptions = false;

    /**
     * @MongoDB\Field(type="bool")
     */
    private $geocodeIfNecessary = false;    
    
    public function __construct() {}

    public function isDynamicImport() { return false; }

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
     * Set parentCategoryToCreateOptions
     *
     * @param Biopen\GeoDirectoryBundle\Document\Category $parentCategoryToCreateOptions
     * @return $this
     */
    public function setParentCategoryToCreateOptions(\Biopen\GeoDirectoryBundle\Document\Category $parentCategoryToCreateOptions)
    {
        $this->parentCategoryToCreateOptions = $parentCategoryToCreateOptions;
        return $this;
    }

    /**
     * Get parentCategoryToCreateOptions
     *
     * @return Biopen\GeoDirectoryBundle\Document\Category $parentCategoryToCreateOptions
     */
    public function getParentCategoryToCreateOptions()
    {
        return $this->parentCategoryToCreateOptions;
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
     * Set createMissingOptions
     *
     * @param bool $createMissingOptions
     * @return $this
     */
    public function setCreateMissingOptions($createMissingOptions)
    {
        $this->createMissingOptions = $createMissingOptions;
        return $this;
    }

    /**
     * Get createMissingOptions
     *
     * @return bool $createMissingOptions
     */
    public function getCreateMissingOptions()
    {
        return $this->createMissingOptions;
    }

    /**
     * Set geocodeIfNecessary
     *
     * @param bool $geocodeIfNecessary
     * @return $this
     */
    public function setGeocodeIfNecessary($geocodeIfNecessary)
    {
        $this->geocodeIfNecessary = $geocodeIfNecessary;
        return $this;
    }

    /**
     * Get geocodeIfNecessary
     *
     * @return bool $geocodeIfNecessary
     */
    public function getGeocodeIfNecessary()
    {
        return $this->geocodeIfNecessary;
    }

    /**
     * Add optionsToAddToEachElement
     *
     * @param Biopen\GeoDirectoryBundle\Document\Option $optionsToAddToEachElement
     */
    public function addOptionsToAddToEachElement(\Biopen\GeoDirectoryBundle\Document\Option $optionsToAddToEachElement)
    {
        $this->optionsToAddToEachElement[] = $optionsToAddToEachElement;
    }

    /**
     * Remove optionsToAddToEachElement
     *
     * @param Biopen\GeoDirectoryBundle\Document\Option $optionsToAddToEachElement
     */
    public function removeOptionsToAddToEachElement(\Biopen\GeoDirectoryBundle\Document\Option $optionsToAddToEachElement)
    {
        $this->optionsToAddToEachElement->removeElement($optionsToAddToEachElement);
    }

    /**
     * Get optionsToAddToEachElement
     *
     * @return \Doctrine\Common\Collections\Collection $optionsToAddToEachElement
     */
    public function getOptionsToAddToEachElement()
    {
        return $this->optionsToAddToEachElement;
    }

    /**
     * Set sourceName
     *
     * @param string $sourceName
     * @return $this
     */
    public function setSourceName($sourceName)
    {
        $this->sourceName = $sourceName;
        return $this;
    }

    /**
     * Get sourceName
     *
     * @return string $sourceName
     */
    public function getSourceName()
    {
        return $this->sourceName;
    }
}
