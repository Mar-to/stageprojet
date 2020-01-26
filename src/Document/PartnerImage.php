<?php

namespace App\Document;

use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use App\Document\Image;
/**
* @MongoDB\Document
* @Vich\Uploadable
*/
class PartnerImage extends Image
{
   /**
     * @var int
     *
     * @MongoDB\Id(strategy="INCREMENT")
     */
   private $id;

   protected $vichUploadFileKey = "partner_image";
}
