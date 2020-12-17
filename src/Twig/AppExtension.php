<?php

namespace App\Twig;

use App\Services\ConfigurationService;
use App\Services\DocumentManagerFactory;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function __construct(DocumentManagerFactory $dmFactory, ConfigurationService $configService)
    {
        $this->dmFactory = $dmFactory;
        $this->dm = $dmFactory->getCurrentManager();
        $this->configService = $configService;
    }

    public function getFilters()
    {
        return [
            new TwigFilter('json_decode', [$this, 'jsonDecode']),
            new TwigFilter('values', [$this, 'values']),
        ];
    }

    public function jsonDecode($value)
    {
        return json_decode($value);
    }

    public function values($value)
    {
        return $value ? array_values($value) : [];
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('is_root_project', [$this, 'isRootProject']),
            new TwigFunction('new_msgs_count', [$this, 'getNewMessagesCount']),
            new TwigFunction('errors_count', [$this, 'getErrorsCount']),
            new TwigFunction('is_user_allowed', [$this, 'isUserAllowed']),
        ];
    }

    public function isRootProject()
    {
        return $this->dmFactory->isRootProject();
    }

    public function getNewMessagesCount()
    {
        return count($this->dm->getRepository('App\Document\GoGoLog')->findBy(['type' => 'update', 'hidden' => false]));
    }

    public function getErrorsCount()
    {
        return count($this->dm->getRepository('App\Document\GoGoLog')->findBy(['level' => 'error', 'hidden' => false]));
    }

    public function isUserAllowed($featureName)
    {
        return $this->configService->isUserAllowed($featureName);
    }
}
