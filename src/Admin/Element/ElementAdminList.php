<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-06-05 17:39:59
 */

namespace App\Admin\Element;

use App\Document\ElementStatus;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class ElementAdminList extends ElementAdminFilters
{
    public function getTemplate($name)
    {
        switch ($name) {
         case 'list': return 'admin/list/base_list_custom_batch.html.twig';
             break;
         default: return parent::getTemplate($name);
             break;
     }
    }

    public function createQuery($context = 'list')
    {
        $query = parent::createQuery($context);
        // not display the modified version
        $query->field('status')->notEqual(ElementStatus::ModifiedPendingVersion);

        return $query;
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->add('redirectShow', $this->getRouterIdParameter().'/redirectShow');
        $collection->add('redirectEdit', $this->getRouterIdParameter().'/redirectEdit');
        $collection->add('showEdit', $this->getRouterIdParameter().'/show-edit');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
         ->add('name', null, ['editable' => false, 'template' => 'admin/partials/list_name.html.twig'])
         ->add('status', ChoiceType::class, [
               'choices' => $this->statusChoices,
               'editable' => true,
               'template' => 'admin/partials/list_choice_status.html.twig',
               ])
         ->add('updatedAt', 'date', ['format' => 'd/m/Y'])
         ->add('sourceKey', null, ['label' => 'Source'])
         ->add('optionsString', null, ['header_style' => 'width: 250px','label' => 'Catégories'])
         ->add('moderationState', ChoiceType::class, [
               'label' => 'Modération',
               'choices' => $this->moderationChoices,
               'editable' => true,
               'template' => 'admin/partials/list_choice_moderation.html.twig',
               ])
         // use fake attribute createdAt, we then access full object inside template
         ->add('createdAt', null, ['template' => 'admin/partials/list_votes.html.twig', 'label' => 'Votes'])

         ->add('_action', 'actions', [
             'actions' => [
                 'show-edit' => ['template' => 'admin/partials/list__action_show_edit.html.twig'],
                 //'edit' => array('template' => 'admin/partials/list__action_edit.html.twig'),
                 //'delete' => array('template' => 'admin/partials/list__action_delete.html.twig'),
                 'redirect-show' => ['template' => 'admin/partials/list__action_redirect_show.html.twig'],
                 'redirect-edit' => ['template' => 'admin/partials/list__action_redirect_edit.html.twig'],
             ],
         ]);
    }

    public function configureBatchActions($actions)
    {
        $actions = [];
        $actions['validation'] = $this->createBatchConfig('Valider', 'validation');
        $actions['refusal'] = $this->createBatchConfig('Refuser', 'refusal');
        $actions['softDelete'] = $this->createBatchConfig('Supprimer (changement de status)', 'softDelete');
        $actions['restore'] = $this->createBatchConfig('Restaurer', 'restore');
        $actions['resolveReports'] = $this->createBatchConfig('Résoudre la modération', 'resolveReports');

        $actions['sendMail'] = [
            'label' => 'Envoyer un mail',
            'ask_confirmation' => false,
            'modal' => [
                ['type' => 'text',      'label' => 'Votre adresse mail',  'id' => 'from'],
                ['type' => 'text',      'label' => 'Object',  'id' => 'mail-subject'],
                ['type' => 'textarea',  'label' => 'Contenu', 'id' => 'mail-content'],
                ['type' => 'checkbox',      'label' => "Envoyer l'email aux éléments",  'id' => 'send-to-element', 'checked' => 'true'],
                ['type' => 'checkbox',      'label' => "Envoyer l'email aux derniers contributeurs",  'id' => 'send-to-last-contributor', 'checked' => 'false'],
            ],
        ];
        $actions['editOptions'] = [
            'label' => 'Modifier les catégories',
            'ask_confirmation' => false,
            'modal' => [
                ['type' => 'choice',  'choices' => $this->getOptionsChoices(), 'id' => 'optionsToRemove', 'label' => 'Catégories à supprimer'],
                ['type' => 'choice',  'choices' => $this->getOptionsChoices(), 'id' => 'optionsToAdd', 'label' => 'Catégories à ajouter'],
            ],
        ];
        $actions['delete'] = ['label' => 'Supprimer définitivement'];

        return $actions;
    }

    protected function createBatchConfig($name, $id)
    {
        return [
            'label' => $name,
            'ask_confirmation' => false,
            'modal' => [
                ['type' => 'text',  'label' => 'Détail de la modification, raison de la suppression... ce texte remplacera {{ customMessage }} dans les mails automatiques', 'id' => 'comment-'.$id],
                ['type' => 'checkbox',  'checked' => true, 'label' => 'Ne pas envoyer de mail',  'id' => 'dont-send-mail-'.$id],
            ],
        ];
    }
}
