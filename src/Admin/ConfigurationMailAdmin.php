<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-03-29 09:25:31
 */

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\AdminType;
use App\Helper\GoGoHelper;

class ConfigurationMailAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_mail_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-mail';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $dm = GoGoHelper::getDmFromAdmin($this);
        $repo = $dm->get('Configuration');
        $config = $repo->findConfiguration();
        $router = $this->getConfigurationPool()->getContainer()->get('router');

        $featureStyle = ['class' => 'col-md-6 col-lg-3'];
        $contributionStyle = ['class' => 'col-md-6 col-lg-4'];
        $mailStyle = ['class' => 'col-md-12 col-lg-6'];
        $featureFormOption = ['delete' => false, 'required' => false, 'label_attr' => ['style' => 'display:none']];
        $featureFormTypeOption = ['edit' => 'inline'];
        $formMapper
            ->tab('Mails auto pour les '.$config->getElementDisplayNamePlural())
                ->with('Informations concernant les mails automatiques', ['box_class' => 'box box-danger',
                    'description' => '
                     <div class="text-and-iframe-container">
                     <div class="iframe-container-aside"><iframe height="200" sandbox="allow-same-origin allow-scripts" src="https://video.colibris-outilslibres.org/videos/embed/d5d007ec-e5c6-4a50-ab66-572e35e8905a" frameborder="0" allowfullscreen></iframe></div>
                    Ces mails sont envoyés automatiquement aux '.$config->getElementDisplayNamePlural()." lorsque leur fiche est ajoutée, modifiée ou supprimée.</br>
                    Il est possible d'inclure les variables suivantes dans les messages (en conservant les '{{}}' ) : </br>
                    <li>{{ element }} le nom de ".$config->getElementDisplayNameDefinite()."</li>
                    <li>{{ showUrl }} l'adresse qui renvoie à la visualisation de la fiche</li>
                    <li>{{ editUrl }} l'adresse qui renvoie à la modification de la fiche</li>
                    <li>{{ homeUrl }} l'adresse de la page d'accueil du site</li>
                    <li>{{ directEditElementUniqueUrl }} l'adresse unique pour éditer directement l'élément sans être admin</li>
                    <li>{{ customMessage }} le message personnel qui a été rédigé par les admins (uniquement lors de la suppression)</li></br>
                    </div>
                    Vous pouvez également utiliser ces variables dans les contenus spéciaux de l'éditeur de texte. Par example dans le champs URL de la popup
                    qui s'ouvre lorsqu'on clique sur d'ajouter un lien.</br>
                    <b>Une fois le mail sauvegardé</b>, vous pouvez cliquer sur les boutons <b>TESTER</b> pour visualiser le rendu", ])->end()
                ->with("Lors d'un ajout".$this->getEmailTestLink($router, 'add'), $mailStyle)
                    ->add('addMail', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with("Lors d'une modification".$this->getEmailTestLink($router, 'edit'), $mailStyle)
                    ->add('editMail', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with("Lors d'une suppression".$this->getEmailTestLink($router, 'delete'), $mailStyle)
                    ->add('deleteMail', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
            ->end()
            ->tab('Mails auto pour les contributeurs')
                ->with('Informations concernant les mails automatiques', ['box_class' => 'box box-danger',
                    'description' => "Ces mails sont envoyés automatiquement aux contributeurs lorsque leurs contributions sont acceptées, refusées etc...</br>
                    Il est possible d'inclure les variables suivantes dans les messages (en conservant les '{{}}' ) : </br>
                    <li>{{ element }} le nom de ".$config->getElementDisplayNameDefinite()."</li>
                    <li>{{ user }} le nom ou l'adresse mail du contributeur</li>
                    <li>{{ showUrl }} l'adresse qui renvoie à la visualisation de la fiche</li>
                    <li>{{ editUrl }} l'adresse qui renvoie à la modification de la fiche</li>
                    <li>{{ homeUrl }} l'adresse de la page d'accueil du site</li>
                    <li>{{ userContributionsUrl }} l'adresse de la page \"Mes contributions\"</li>
                    <li>{{ customMessage }} le message personnel qui a été rédigé par les admins (uniquement lors d'un refus')</li></br>
                    Vous pouvez également utiliser ces variables dans les contenus spéciaux de l'éditeur de texte. Par example dans le champs URL de la popup
                    qui s'ouvre lorsqu'on clique sur d'ajouter un lien.</br>
                    <b>Une fois le mail sauvegardé</b>, vous pouvez cliquer sur les boutons <b>TESTER</b> pour visualiser le rendu", ])->end()
                ->with("Lors d'une validation".$this->getEmailTestLink($router, 'validation'), $mailStyle)
                    ->add('validationMail', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with("Lors d'un refus".$this->getEmailTestLink($router, 'refusal'), $mailStyle)
                    ->add('refusalMail', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
                ->with("Lors d'un signalement pris en compte".$this->getEmailTestLink($router, 'refusal'), $mailStyle)
                    ->add('reportResolvedMail', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
            ->end()
            ->tab('Newsletter')
                ->with('Informations concernant la newsletter', ['box_class' => 'box box-danger',
                    'description' => "Ce mail est envoyé automatiquement aux utilisateurs y ayant souscrit. Il donne la liste des derniers éléments ajoutés dans une zone
                    géographique determinée et optionnellement des nouvelles</br></br>
                    <b>Il est nécessaire d'inclure la variable <u>{{ newElements }}</u> et/ou <u>{{ pendingElements }}</u></b> qui seront respectivement remplacées par la liste des nouveaux élements et des nouveaux élements en attente de validation</br></br>
                    Il est possible d'inclure les variables suivantes dans les messages (en conservant les '{{}}' ) : </br>
                    <ul>
                    <li>{{ news }} la dernière nouvelle publiée</li>
                    <li>{{ user }} le nom ou l'adresse mail du contributeur</li>
                    <li>{{ homeUrl }} l'adresse de la page d'accueil du site</li>
                    <li>{{ userProfileUrl }} l'adresse de la page \"Mes paramètres\" dans l'espace utilisateur</li>
                    <li>{{ showOnMapBtn }} un bouton pour renvoyer vers la carte centrée sur la position de l'utilisateur</li>
                    </ul>
                    </br>
                    <b>Une fois le mail sauvegardé</b>, vous pouvez cliquer sur le bouton <b>TESTER</b> pour visualiser le rendu", ])->end()
                ->with('Newsletter'.$this->getEmailTestLink($router, 'newsletter'), ['class' => 'col-md-12'])
                    ->add('newsletterMail', AdminType::class, $featureFormOption, $featureFormTypeOption)->end()
            ->end()
        ;
    }

    private function getEmailTestLink($router, $mailType)
    {
        $url = $router->generate('gogo_mail_draft_automated', ['mailType' => $mailType]);

        return ' - <a href="'.$url.'" target="_blank">TESTER</a>';
    }
}
