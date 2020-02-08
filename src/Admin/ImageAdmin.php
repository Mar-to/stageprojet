<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class ImageAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('file', FileType::class, ['label' => 'Fichier à importer', 'required' => false])
            ->add('externalImageUrl', null, ['label' => 'Lien vers une image externe', 'required' => false])
        ;
    }

    protected function configureShowFields(ShowMapper $show)
    {
        $show->add('fileName');
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('fileName')
        ;
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('fileName')
            ->add('_action', 'actions', [
                'actions' => [
                    'edit' => [],
                ],
            ])
        ;
    }
}
