<?php

namespace Biopen\CoreBundle\Admin;

use Biopen\CoreBundle\Document\WebhookFormat;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class WebhookAdmin extends AbstractAdmin
{
    protected $datagridValues = array(
        '_page' => 1,
        '_sort_order' => 'DESC',
        '_sort_by' => 'id',
    );

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('format', ChoiceType::class, [
                'choices'  => array(
                    'Brut' => WebhookFormat::Raw,
                    'Mattermost' => WebhookFormat::Mattermost,
                    'Slack' => WebhookFormat::Slack,
                ),
                'expanded' => false,  'multiple' => false,
                'required' => true, 'placeholder' => false,
                'choices_as_values' => true ])
            ->add('url', 'text');
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('url');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('url')
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array()
                )
            ));
    }
}