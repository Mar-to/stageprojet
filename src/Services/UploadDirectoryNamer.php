<?php

namespace App\Services;

use App\Helper\SaasHelper;
use Vich\UploaderBundle\Mapping\PropertyMapping;
use Vich\UploaderBundle\Naming\DirectoryNamerInterface;

/**
 * Directory namer wich can create subfolder depends on generated filename.
 *
 * @author Konstantin Myakshin <koc-dp@yandex.ru>
 */
class UploadDirectoryNamer implements DirectoryNamerInterface
{
    private $BASE_PATH = 'uploads/';

    private $PATHS = [
      'image' => '/images',
      'element_image' => '/images/elements',
      'element_file' => '/files/elements',
      'partner_image' => '/images/partners',
      'config_image' => '/images/config',
      'import_file' => '/imports',
      'default_file' => '/default',
   ];

    public function directoryName($object, PropertyMapping $mapping): string
    {
        $name = $this->getDirectoryPathFromKey($object->getVichUploadFileKey());

        return $name;
    }

    public function getDirectoryPathFromKey($key)
    {
        $hostHelper = new SaasHelper();

        return $this->BASE_PATH.$hostHelper->getCurrentProjectCode().$this->PATHS[$key];
    }
}
