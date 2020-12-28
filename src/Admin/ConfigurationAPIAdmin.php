<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-22 19:45:15
 */

namespace App\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class ConfigurationAPIAdmin extends ConfigurationAbstractAdmin
{
    protected $baseRouteName = 'gogo_core_bundle_config_api_admin_classname';

    protected $baseRoutePattern = 'gogo/core/configuration-api';

    protected function configureFormFields(FormMapper $formMapper)
    {
        $dm = $this->getModelManager()->getDocumentManager('App\Document\Configuration');
        $apiProperties = $dm->getRepository('App\Document\Element')->findAllCustomProperties();

        $apiPropertiesChanged = [];
        foreach ($apiProperties as $key => $value) {
            $apiPropertiesChanged[$value] = $value;
        }

        $formMapper
            ->with('Configuration', ['description' => "<div class='iframe-container'><iframe height='200' sandbox='allow-same-origin allow-scripts' src='https://video.colibris-outilslibres.org/videos/embed/aa05a654-a5d6-472a-bb12-108e0f6ce18e' frameborder='0' allowfullscreen></iframe></div>"])
                ->add('api.internalApiAuthorizedDomains', null, ['label' => "Liste des domaines externe qui utiliseront l'API interne. Mettez * si vous voulez que n'importe quel domaine puisse y avoir accès. Cette option est nécessaire si vous voulez afficher vos données avec GoGoCartoJs mais sur un autre serveur.", 'required' => false])
                ->add('api.publicApiPrivateProperties', ChoiceType::class, ['choices' => $apiPropertiesChanged, 'label' => "Liste des champs que vous ne voulez pas partager dans l'api publique", 'required' => false, 'multiple' => true])
            ->end()
            ->with('Liste des apis disponibles')
                ->add('apilist', TextType::class, ['mapped' => false, 'label' => false, 'required' => false, 'attr' => ['class' => 'gogo-api-list']])
            ->end()
        ;
    }
}
