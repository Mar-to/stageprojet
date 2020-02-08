<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;

class ConfigurationAbstractAdmin extends AbstractAdmin
{
    public function getTemplate($name)
    {
        switch ($name) {
            // overwrite edit template so we hide delete button in actions menu
            case 'edit': return 'admin/edit/edit_configuration.html.twig';
            break;
            default: return parent::getTemplate($name);
            break;
        }
    }
}
