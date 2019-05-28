<?php

namespace Biopen\CoreBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;

class ConfigurationAbstractAdmin extends AbstractAdmin
{
    public function getTemplate($name) 
    {
        switch ($name) {
            // overwrite edit template so we hide delete button in actions menu
            case 'edit': return '@BiopenAdmin/edit/edit_configuration.html.twig';
            break;
            default : return parent::getTemplate($name);
            break;
        }
    }    
}