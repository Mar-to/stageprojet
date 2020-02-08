<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\AdminType;
use Sonata\FormatterBundle\Form\Type\SimpleFormatterType;

class ConfigurationContributionsAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_contributions_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-contributions';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $contributionStyle = ['class' => 'col-md-6 col-lg-4 gogo-feature'];
        $featureFormOption = ['delete' => false, 'required' => false, 'label_attr' => ['style' => 'display:none']];
        $featureFormTypeOption = ['edit' => 'inline'];

        $formMapper
            ->with('Pouvoir ajouter un élément', $contributionStyle)
                ->add('addFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
            ->with('Pouvoir editer un élément', $contributionStyle)
                ->add('editFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
            ->with('Pouvoir supprimer un élément', $contributionStyle)
                ->add('deleteFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
            ->with('Modération directe', $contributionStyle)
                ->add('directModerationFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
            ->with('Modération collaborative (pouvoir voter)', ['class' => 'col-md-6 col-lg-4 gogo-feature collaborative-feature'])
                ->add('collaborativeModerationFeature', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
            ->with('Paramètres pour la modération collaborative', ['class' => 'col-md-4 collaborative-moderation-box'])
                ->add('minVoteToChangeStatus', null, ['required' => false, 'label' => 'Nombre votes pour valider/refuser automatiquement'])
                ->add('maxOppositeVoteTolerated', null, ['required' => false, 'label' => 'Nombres maximum de vos contradictoires tolérés'])
                ->add('minDayBetweenContributionAndCollaborativeValidation', null, ['required' => false, 'label' => 'Nombre de jours minimum avant une validation/refus collaboratif'])
                ->add('maxDaysLeavingAnElementPending', null, ['required' => false, 'label' => 'Nombre de jours au bout desquels un élément toujours en attente apparaîtra à modérer'])
                ->add('minVoteToForceChangeStatus', null, ['required' => false, 'label' => 'Nombre votes pour valider/refuser automatiquement, sans attendre de jours minimum'])
            ->end()
            ->with('Textes')
                ->add('collaborativeModerationExplanations', SimpleFormatterType::class, [
                        'format' => 'richhtml',
                        'label' => 'Explications au sujet de la modération collaborative',
                        'ckeditor_context' => 'full',
                        'required' => false,
                ])
            ->end()
        ;
    }
}
