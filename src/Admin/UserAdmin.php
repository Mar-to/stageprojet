<?php

/*
 * This file is part of the Sonata Project package.
 *
 * (c) Thomas Rabaix <thomas.rabaix@sonata-project.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Admin;

use FOS\UserBundle\Model\UserManagerInterface;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ModelType;
use Sonata\AdminBundle\Show\ShowMapper;
use Sonata\UserBundle\Form\Type\SecurityRolesType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class UserAdmin extends AbstractAdmin
{
    /**
     * @var UserManagerInterface
     */
    protected $userManager;

    protected $userContribRepo;

    /**
     * {@inheritdoc}
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('username')
            ->add('email')
            ->add('groups')
            ->add('gamification', null, ['label' => 'Interaction Score'])
            ->add('contributionsCount', null, ['label' => 'Contributions'])
            ->add('votesCount', null, ['label' => 'Votes'])
            ->add('reportsCount', null, ['label' => 'Signalements'])
            ->add('createdAt', 'date', ['format' => 'd/m/Y'])
        ;

        if ($this->isGranted('ROLE_ALLOWED_TO_SWITCH')) {
            $listMapper
                ->add('impersonating', 'string', ['template' => 'SonataUserBundle:Admin:Field/impersonating.html.twig'])
            ;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getFormBuilder()
    {
        $this->formOptions['data_class'] = $this->getClass();

        $options = $this->formOptions;
        $options['validation_groups'] = (!$this->getSubject() || is_null($this->getSubject()->getId())) ? 'Registration' : 'Profile';

        $formBuilder = $this->getFormContractor()->getFormBuilder($this->getUniqid(), $options);

        $this->defineFormBuilder($formBuilder);

        return $formBuilder;
    }

    /**
     * {@inheritdoc}
     */
    public function getExportFields()
    {
        // avoid security field to be exported
        return array_filter(parent::getExportFields(), function ($v) {
            return !in_array($v, ['password', 'salt']);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function preUpdate($user)
    {
        $this->getUserManager()->updateCanonicalFields($user);
        $this->getUserManager()->updatePassword($user);
    }

    public function setUserManager(UserManagerInterface $userManager)
    {
        $this->userManager = $userManager;
    }

    /**
     * @return UserManagerInterface
     */
    public function getUserManager()
    {
        return $this->userManager;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureDatagridFilters(DatagridMapper $filterMapper)
    {
        $filterMapper
            ->add('id')
            ->add('username')
            ->add('newsletterFrequency', 'doctrine_mongo_callback', [
                'label' => 'Reception newsletter',
                'field_type' => CheckboxType::class,
                'callback' => function ($queryBuilder, $alias, $field, $value) {
                    if (!$value || !$value['value']) {
                        return;
                    }
                    $queryBuilder->field('newsletterFrequency')->gt(0);

                    return true;
                }, ])
            ->add('email')
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->with('General')
                ->add('username')
                ->add('email')
            ->end()
            ->with('Groups')
                ->add('groups')
            ->end()
            ->with('Profile')
                ->add('dateOfBirth')
                ->add('firstname')
                ->add('lastname')
                ->add('website')
                ->add('biography')
                ->add('gender')
                ->add('locale')
                ->add('timezone')
                ->add('phone')
            ->end()
            ->with('Social')
                ->add('facebookUid')
                ->add('facebookName')
                ->add('communsUid')
                ->add('communsName')
                ->add('gplusUid')
                ->add('gplusName')
            ->end()
            ->with('Security')
                ->add('token')
            ->end()
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        // define group zoning
        $formMapper
            ->tab('User')
                ->with('General', ['class' => 'col-md-6'])->end()
                ->with('Status', ['class' => 'col-md-6'])->end()
                ->with('Groups', ['class' => 'col-md-6'])->end()
                ->with('Notifications', ['class' => 'col-md-12'])
                    ->add('watchModeration', null, ['label' => "Etre notifié par email lorsque des éléments sont à modérer", 'required' => false])
                    ->add('watchModerationOnlyWithOptions', ModelType::class, [
                        'class' => 'App\Document\Option',
                        'required' => false,
                        'multiple' => true,
                        'btn_add' => false,
                        'label' => 'Seulement pour les éléments ayant une des catégories suivante', ], ['admin_code' => 'admin.option_hidden'])
                    ->add('watchModerationOnlyWithPostCodes', null, [
                        'label' => "Seulement pour les éléments avec code postal", 
                        'label_attr' => ['title' => "Séparés par des virgules. On peut utiliser le symbole * pour choisir tout un département, par example : 40*, 47*, 48500"],
                        'required' => false,
                        'attr' => ['placeholder' => '40*, 47*, 48500']])
                ->end()
            ->end()
            ->tab('Security')
                ->with('Roles', ['class' => 'col-md-12'])->end()
            ->end()
        ;

        $now = new \DateTime();

        $modelType = ModelType::class;

        $formMapper
            ->tab('User')
                ->with('General')
                    ->add('username')
                    ->add('email')
                    ->add('plainPassword', PasswordType::class, [
                        'required' => (!$this->getSubject() || is_null($this->getSubject()->getId())),
                    ])
                    ->add('allowedStamps', $modelType, [
                        'required' => false,
                        'expanded' => false,
                        'multiple' => true,
                    ])
                ->end()
                ->with('Status')
                    ->add('locked', CheckboxType::class, ['required' => false])
                    ->add('expired', CheckboxType::class, ['required' => false])
                    ->add('enabled', CheckboxType::class, ['required' => false])
                    ->add('credentialsExpired', CheckboxType::class, ['required' => false])
                ->end()
                ->with('Groups')
                    ->add('groups', $modelType, [
                        'required' => false,
                        'expanded' => true,
                        'multiple' => true,
                    ])
                ->end()
            ->end()
            ->tab('Security')
                ->with('Roles')
                    ->add('realRoles', SecurityRolesType::class, [
                        'label' => false,
                        'expanded' => true,
                        'multiple' => true,
                        'required' => false,
                    ])
                ->end()
            ->end()
        ;
    }

    public function getTemplate($name)
    {
        switch ($name) {
         case 'list': return 'admin/list/list_user.html.twig';
             break;
         default: return parent::getTemplate($name);
             break;
     }
    }

    public function configureBatchActions($actions)
    {
        // $actions = parent::configureBatchActions($actions);
        $actions = [];

        $actions['sendMail'] = [
         'label' => 'Envoyer un mail',
         'ask_confirmation' => false,
         'modal' => [
            ['type' => 'text',      'label' => 'Votre adresse mail',  'id' => 'from'],
            ['type' => 'text',      'label' => 'Object',  'id' => 'mail-subject'],
            ['type' => 'textarea',  'label' => 'Contenu', 'id' => 'mail-content'],
         ],
      ];

        return $actions;
    }
}
