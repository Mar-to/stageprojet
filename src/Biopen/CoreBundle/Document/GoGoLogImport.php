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
        $result = $this->getMessage() . ", mais avec pas mal de problèmes ! <strong>Total: " . $this->getDataProp('elementsCount') . "</strong> ";

        if ($this->getDataProp('elementsCreatedCount') > 0) $result .= " - " . $this->getDataProp('elementsCreatedCount') . " élément.s importé.s";
        if ($this->getDataProp('elementsUpdatedCount') > 0) $result .= " - " . $this->getDataProp('elementsUpdatedCount') . " élement.s mis à jour";
        if ($this->getDataProp('elementsNothingToDoCount') > 0) $result .= " - " . $this->getDataProp('elementsNothingToDoCount') . " élement.s laissé.s tel.s quel.s (rien à mettre à jour)";   
        if ($this->getDataProp('elementsMissingGeoCount') > 0) $result .= " - " . $this->getDataProp('elementsMissingGeoCount') . " élement.s sans geoloc";
        if ($this->getDataProp('elementsMissingTaxoCount') > 0) $result .= " - " . $this->getDataProp('elementsMissingTaxoCount') . " élement.s sans categories";
        if ($this->getDataProp('elementsDeletedCount') > 0) $result .= " - " . $this->getDataProp('elementsDeletedCount') . " élement.s supprimé.s";
        if ($this->getDataProp('elementsErrorsCount') > 0) $result .= " - " . $this->getDataProp('elementsErrorsCount') . " erreur.s pendant l'import";

        if ($this->getDataProp('errorMessages')) $result .= '</br></br>' . implode('</br>', $this->getDataProp('errorMessages'));
        return $result;
    }    
}
