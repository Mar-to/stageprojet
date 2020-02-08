<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-07-08 17:27:53
 */

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Form\FormMapper;

class CategoryLiteAdmin extends AbstractAdmin
{
    protected $baseRouteName = 'admin_app_category_lite';
    protected $baseRoutePattern = 'admin_app_category_lite';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper

            ->add('name', null, ['required' => true, 'label' => 'Nom du groupe'])
            ->add('pickingOptionText', null, ['required' => true, 'label' => 'Text à afficher dans le formulaire : Choisissez ....'])
            ->add('index', null, ['required' => false, 'label' => 'Position'])
            ->add('isMandatory', null, ['required' => false, 'label' => 'Obligatoire'])
            ->add('singleOption', null, ['required' => false, 'label' => 'Choix unique'])
            ->add('displayInMenu', null, ['required' => false, 'label' => 'Menu'])
         ->add('displayInInfoBar', null, ['required' => false, 'label' => 'Fiche'])
         ->add('displayInForm', null, ['required' => false, 'label' => 'Formulaire'])
            ->add('_link', 'text', ['required' => false, 'mapped' => false, 'label' => 'admin_app_category_edit']);
    }
}
