<?php
namespace Biopen\CoreBundle\EventListener;

use Biopen\CoreBundle\Document\ConfImage;
use Biopen\GeoDirectoryBundle\Document\ElementImage;
use Intervention\Image\ImageManagerStatic as InterventionImage;

/* While image is uploaded, generate thumbnails and other thing */
class ImageResizer
{
    public function postPersist(\Doctrine\ODM\MongoDB\Event\LifecycleEventArgs $args)
    {
        $document = $args->getDocument();
        if ($document instanceof ConfImage && !$document->isExternalFile()) {
            $w = 512;
            $h = 512;
            $srcImage = $document->calculateFilePath();
            $destImage = preg_replace('/(\.jpe?g|\.png)$/i', '-'.$w.'x'.$h.'.png', $srcImage);
            $image = InterventionImage::make($srcImage)->fit($w, $h)->save($destImage);
        }
        if ($document instanceof ElementImage)
        {
            if (!$document->getFile()) return;
            $srcImage = $document->calculateFilePath();
            $image = InterventionImage::make($srcImage);
            if ($image->width() > 700) $image->widen(700)->save($srcImage);
            return;
        }
    }
}
