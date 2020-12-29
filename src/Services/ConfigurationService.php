<?php

namespace App\Services;

use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ConfigurationService
{
    protected $dm;
    protected $securityContext;
    protected $config;

    /**
     * Constructor.
     */
    public function __construct(DocumentManager $dm, TokenStorageInterface $securityContext)
    {
        $this->dm = $dm;
        $this->securityContext = $securityContext;
        $this->config = $this->dm->getRepository('App\Document\Configuration')->findConfiguration();
    }

    public function isUserAllowed($featureName, $request = null, $email = null)
    {
        if (null === $email && null !== $request) {
            $email = $request->get('userEmail');
        }

        $user = $this->securityContext->getToken()->getUser();

        if ('anon.' == $user) {
            $user = null;
        }

        $feature = $this->getFeatureConfig($featureName);

        // CHECK USER IS ALLOWED
        return $feature->isAllowed($user, $request ? $request->get('iframe') : false, $email);
    }

    public function getConfig()
    {
        return $this->config;
    }

    public function getFeatureConfig($featureName)
    {
        switch ($featureName) {
            case 'report':              $feature = $this->config->getReportFeature(); break;
            case 'add':                 $feature = $this->config->getAddFeature(); break;
            case 'edit':                $feature = $this->config->getEditFeature(); break;
            case 'directModeration':    $feature = $this->config->getDirectModerationFeature(); break;
            case 'delete':              $feature = $this->config->getDeleteFeature(); break;
            case 'vote':                $feature = $this->config->getCollaborativeModerationFeature(); break;
            case 'pending':             $feature = $this->config->getPendingFeature(); break;
        }

        return $feature;
    }
}
