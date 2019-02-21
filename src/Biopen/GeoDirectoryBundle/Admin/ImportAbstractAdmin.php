<?php

namespace Biopen\GeoDirectoryBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;

class ImportAbstractAdmin extends AbstractAdmin
{
    protected function getInstructions()
    {
        $dm = $this->getConfigurationPool()->getContainer()->get('doctrine_mongodb');
        $apiProperties = $dm->getRepository('BiopenGeoDirectoryBundle:Element')->findAllCustomProperties();
        $propertiesText = count($apiProperties) > 0 ? implode($apiProperties, ',') : "Aucun !";
        $instructions = "Les colonnes/propriétés importantes sont les suivantes : 
                    <ul>
                    <li><b>name</b> Le titre de la fiche</li>
                    <li><b>taxonomy</b> la liste des options séparées par des virgules. Exple: Alimentation, Restaurant
                    
                    <li><b>address</b> L'adresse de l'élément. Si vous disposez d'une adresse plus précise vous pouvez plutot utiliser les colonnes/propriétés suivantes : <b>streetAddress, addressLocality, postalCode, addressCountry</b></li>
                    <li><b>latitude</b> (Sinon, elle peut être calculée à partir de l'adresse)</li>
                    <li><b>longitude</b> (Sinon, elle peut être calculée à partir de l'adresse)</li>
                    <li><b>email</b> L'email à utiliser pour contacter cet élément</li>
                    </ul>
                    Vous pouvez ensuite avoir n'importe quelles autres colonnes/propriété, elles seront importées. Veillez à faire concorder le nom des colonnes avec le nom des champs de votre formulaire. </br>Noms des autres champs déjà présent dans vos données : <b>" . $propertiesText . "</b></br><hr>";
        return $instructions;
    }
}