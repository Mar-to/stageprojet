<?php

declare(strict_types=1);

namespace App\Admin;

use App\Enum\NewsStatus;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Sonata\FormatterBundle\Form\Type\SimpleFormatterType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class NewsAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->add('title', TextType::class, ['label' => 'Titre'])
            ->add('content', SimpleFormatterType::class, [
                'label' => 'Contenu',
                'format' => 'richhtml',
                'ckeditor_context' => 'full',
            ])
            ->add('publicationDate', DateTimeType::class, ['label' => 'Date de publication'])
            ->add('status', ChoiceType::class, ['label' => 'Statut', 'choices' => [
                'Brouillon (non publiée)' => NewsStatus::DRAFT,
                'Publiée' => NewsStatus::PUBLISHED,
            ]])
        ;
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->addIdentifier('title', 'text', ['label' => 'Titre'])
            ->add('publicationDate', 'datetime', ['label' => 'Date de publication', 'format' => 'd/m/Y à H:i'])
            ->add('status', 'choice', ['label' => 'Statut', 'choices' => [
                NewsStatus::DRAFT => 'Brouillon (non publiée)',
                NewsStatus::PUBLISHED => 'Publiée',
            ]])
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $filter): void
    {
        $filter
            ->add('title', null, ['label' => 'Titre'])
            ->add('status', 'doctrine_mongo_choice', ['label' => 'Statut'], ChoiceType::class, ['choices' => [
                'Brouillon (non publiée)' => NewsStatus::DRAFT,
                'Publiée' => NewsStatus::PUBLISHED,
            ]])
        ;
    }

    protected function configureShowFields(ShowMapper $show): void
    {
        $show
            ->add('title', 'text', ['label' => 'Titre'])
            ->add('publicationDate', 'datetime', ['label' => 'Date de publication', 'format' => 'd/m/Y à H:i'])
            ->add('status', 'choice', ['label' => 'Statut', 'choices' => [
                NewsStatus::DRAFT => 'Brouillon (non publiée)',
                NewsStatus::PUBLISHED => 'Publiée',
            ]])
        ;
    }
}
