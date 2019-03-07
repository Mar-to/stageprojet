<?php

namespace Biopen\GeoDirectoryBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;

class ImportAbstractAdmin extends AbstractAdmin
{
    protected function getInstructions($video_id)
    {
        $dm = $this->getConfigurationPool()->getContainer()->get('doctrine_mongodb');
        $apiProperties = $dm->getRepository('BiopenGeoDirectoryBundle:Element')->findAllCustomProperties();
        $propertiesText = count($apiProperties) > 0 ? implode($apiProperties, ', ') : "Aucun !";
        $instructions = "
            <div class='text-and-iframe-container'>
                <div class='iframe-container-aside' style='margin-right: 40px'><iframe height='200' sandbox='allow-same-origin allow-scripts' src='https://video.colibris-outilslibres.org/videos/embed/" . $video_id . "' frameborder='0' allowfullscreen></iframe></div>
                <p>
                    Les colonnes/propriétés importantes sont les suivantes : 
                    <ul style='margin-left: 20px'>
                        <li><b>name</b> Le titre de la fiche</li>
                        <li><b>categories</b> la liste des catégories séparées par des virgules. Exple: Alimentation, Restaurant
                        
                        <li><b>address</b> L'adresse de l'élément. Si vous disposez d'une adresse plus précise vous pouvez plutot utiliser les colonnes/propriétés suivantes : <b>streetAddress, addressLocality, postalCode, addressCountry</b></li>
                        <li><b>latitude</b> (Sinon, elle peut être calculée à partir de l'adresse)</li>
                        <li><b>longitude</b> (Sinon, elle peut être calculée à partir de l'adresse)</li>
                    </ul>
                </p>
            </div>

            <p>D'autres colonnes/propriété intéressantes sont:</p>

            <ul>
            <li><b>id</b> L'id de cet élément dans son ancienne base de donnée. Permet notamment de ne pas re importé un même élément pour les import dynamiques</li>
            <li><b>updatedAt</b> Date de la dernière mise à jour, permet de savoir lors d'un import dynamique si cet élément doit être mis à jour ou pas</li>
            <li><b>source</b> Nom de la source des données. Si ce champ est vide (ce qui est le cas le plus courant) le nom de la source sera celui renseigné ci après. Mais il est pratique d'utiliser ce champ lorsque l'on importe des données venant de plusieurs sources via un seul fichier ou une seule API</li>
            <li><b>email</b> L'email à utiliser pour contacter cet élément</li>
            <li><b>owner</b> L'email du propriétaire de cet élément. Si un utilisateur avec le même email existe sur votre carte, alors il pourra éditer comme bon lui semble cet élement</li>                    
            <li><b>images</b> Des urls vers des images, sous forme de tableau ou séparées par des virgules. Si le champ 'images' n'existe pas, toutes les colonnes/propriétés commançant par le mot 'image' seront utilisée (par example: image_logo, image, imageCouverture ...)</li>
            
            </ul>
            Vous pouvez ensuite avoir n'importe quelles autres colonnes/propriété, elles seront importées. Veillez à faire concorder le nom des colonnes avec le nom des champs de votre formulaire. </br></br>
            Noms des autres champs déjà présent dans vos données : <b>" . $propertiesText . "</b>";
        return $instructions;
    }
}