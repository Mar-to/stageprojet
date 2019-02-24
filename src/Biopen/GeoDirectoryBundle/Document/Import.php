<?php

namespace Biopen\GeoDirectoryBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Biopen\CoreBundle\Document\AbstractFile;

abstract class ImportState
{       
    const Started = "started";     
    const Downloading = "downloading";
    const InProgress = "in_progress";    
    const Completed = "completed";  
    const Errors = "errors";   
    const Failed = "failed";
}

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

    /**
    * @MongoDB\ReferenceMany(targetDocument="Biopen\CoreBundle\Document\GoGoLog", cascade={"all"})
    */
    private $logs;

    /**
     * State of the import when processing. Type of ImportState
     * When processing import, this variable is being updated in realtime, so the client can follow 
     * the state of the import also in realtime
     * @MongoDB\Field(type="string")
     */
    private $currState;

    /**
     * A message can be added to the state information
     * @MongoDB\Field(type="string")
     */
    private $currMessage;

    /** 
     * After importing some Data, if the user hard delete some elements, their ids will be remembered 
     * so next time we do not import them again 
     * 
     * @MongoDB\Field(type="collection") 
     */ 
    private $idsToIgnore = [];    

    
    public function __construct() {
        $this->logs = new \Doctrine\Common\Collections\ArrayCollection();;
    }

    public function __toString() { return "Import " . $this->sourceName; }

    public function isDynamicImport() { return false; }

    public function addIdToIgnore($id)  
    { 
        $this->idsToIgnore[] = $id; 
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

    /**
     * Add log
     *
     * @param Biopen\CoreBundle\Document\GoGoLog $log
     */
    public function addLog(\Biopen\CoreBundle\Document\GoGoLog $log)
    {
        $this->logs[] = $log;
    }

    /**
     * Remove log
     *
     * @param Biopen\CoreBundle\Document\GoGoLog $log
     */
    public function removeLog(\Biopen\CoreBundle\Document\GoGoLog $log)
    {
        $this->logs->removeElement($log);
    }

    /**
     * Get logs
     *
     * @return \Doctrine\Common\Collections\Collection $logs
     */
    public function getLogs()
    {        
        $logs = is_array($this->logs) ? $this->logs : $this->logs->toArray();
        usort( $logs, function ($a, $b) { return $b->getCreatedAt()->getTimestamp() - $a->getCreatedAt()->getTimestamp(); });
        return $logs;
    }

    /**
     * Set currState
     *
     * @param string $currState
     * @return $this
     */
    public function setCurrState($currState)
    {
        $this->currState = $currState;
        return $this;
    }

    /**
     * Get currState
     *
     * @return string $currState
     */
    public function getCurrState()
    {
        return $this->currState;
    }

    /**
     * Set currMessage
     *
     * @param string $currMessage
     * @return $this
     */
    public function setCurrMessage($currMessage)
    {
        $this->currMessage = $currMessage;
        return $this;
    }

    /**
     * Get currMessage
     *
     * @return string $currMessage
     */
    public function getCurrMessage()
    {
        return $this->currMessage;
    }

    /** 
     * Set idsToIgnore 
     * 
     * @param collection $idsToIgnore 
     * @return $this 
     */ 
    public function setIdsToIgnore($idsToIgnore) 
    { 
        $this->idsToIgnore = $idsToIgnore; 
        return $this; 
    } 
 
    /** 
     * Get idsToIgnore 
     * 
     * @return collection $idsToIgnore 
     */ 
    public function getIdsToIgnore() 
    { 
        return $this->idsToIgnore; 
    } 
}
