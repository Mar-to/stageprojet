<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

class KeyAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        //$formMapper->add('code');
        //$formMapper->add('date');
        $formMapper->add('active');
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('date');
        $datagridMapper->add('active');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
         ->addIdentifier('code')
         ->addIdentifier('date')
         ->addIdentifier('active')
         ->add('_action', 'actions', [
             'actions' => [
                 'delete' => [],
             ],
         ]);
    }
}
