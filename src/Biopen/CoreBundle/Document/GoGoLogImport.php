<?php

namespace Biopen\CoreBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * Special log for Import
 *
 * @MongoDB\Document
 */
class GoGoLogImport extends GoGoLog
{
    public function displayMessage() 
    {
        $result = "<strong>Total: " . $this->getDataProp('elementsCount') . "</strong> ";

        if ($this->getDataProp('elementsCreatedCount') > 0) $result .= " - " . $this->getDataProp('elementsCreatedCount') . " élément.s importé.s";
        if ($this->getDataProp('elementsUpdatedCount') > 0) $result .= " - " . $this->getDataProp('elementsUpdatedCount') . " élement.s mis à jour";
        if ($this->getDataProp('elementsNothingToDoCount') > 0) $result .= " - " . $this->getDataProp('elementsNothingToDoCount') . " élement.s laissé.s tel.s quel.s (rien à mettre à jour)";   
        if ($this->getDataProp('elementsNeedModerationCount') > 0) $result .= " - " . $this->getDataProp('elementsNeedModerationCount') . " élement.s incomplets (geoloc ou catégories)";
        if ($this->getDataProp('elementsDeletedCount') > 0) $result .= " - " . $this->getDataProp('elementsDeletedCount') . " élement.s supprimé.s";
        if ($this->getDataProp('elementsErrorsCount') > 0) $result .= " - " . $this->getDataProp('elementsErrorsCount') . " erreur.s pendant l'import";

        return $result;
    }    
}
