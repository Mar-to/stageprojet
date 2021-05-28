<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

use App\Helper\GoGoHelper;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;


class KeyAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        //$dm = GoGoHelper::getDmFromAdmin($this);
        //$repo = $dm->get('CodeInvitation');
        /*
        $formMapper->add('code' );
        $formMapper->add('date');
        $formMapper->add('usable');
        $formMapper->add('active', CheckboxType::class, ['required' => false]);
        */

        $formMapper
            ->with('Configuration')
                ->add('code')
                ->add('active', CheckboxType::class, ['required' => false])
            ->end()
            ->with('Utilisabilité')
                ->add('date', null, ['format' => 'd/m/Y', 'label' => 'Date de fin'])
                ->add('usable', null, ['label' => 'Utilisations restantes'])
            ->end()
            ;


    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('date');
        $datagridMapper->add('usable');
        $datagridMapper->add('active');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
         ->addIdentifier('code')
         
         ->add('date', 'date', ['format' => 'd/m/Y', 'label' => 'Date de fin'])
         ->addIdentifier('usable', null, ['label' => 'Utilisations restantes'])
         ->addIdentifier('active')
         ->add('_action', 'actions', [
             'actions' => [
                 'delete' => [],
             ],
         ]);
    }

    public function getTemplate($name)
    {
        switch ($name) {
         case 'list': return 'admin/list/list_key.html.twig';
             break;
         default: return parent::getTemplate($name);
             break;
     }
    }
}
