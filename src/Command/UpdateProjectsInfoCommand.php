<?php

namespace App\Command;

use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Routing\RouterInterface;
use App\Services\DocumentManagerFactory;

/*
* Update infos of each instance for the Saas Index page
*/
class UpdateProjectsInfoCommand extends Command
{
    public function __construct(DocumentManagerFactory $dmFactory, LoggerInterface $commandsLogger,
                                RouterInterface $router)
    {
        $this->dmFactory = $dmFactory;
        $this->rootDm = $dmFactory->getRootManager();
        $this->router = $router;
        $this->logger = $commandsLogger;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('app:saas:update-projects-info');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $projects = $this->rootDm->get('Project')->findAll();

        $this->logger->info('Updating projects informations. '. count($projects) .' projects to update');

        foreach ($projects as $key => $project) {
            try {
                $this->logger->info('  -> Update project '.$project->getName());
                $dm = $this->dmFactory->createForDB($project->getDomainName());

                $config = $dm->get('Configuration')->findConfiguration();
                if (!$config) {
                    $this->logger->error("Project {$project->getDomainName()} does not have config");
                    continue;
                }
                $img = $config->getSocialShareImage() ? $config->getSocialShareImage() : $config->getLogo();
                $imageUrl = $img ? $img->getImageUrl() : null;
                $dataSize = $dm->get('Element')->findVisibles(true);

                $users = $dm->get('User')->findAll();
                $adminEmails = [];
                $lastLogin = null;
                foreach ($users as $key => $user) {
                    if ($user->isAdmin()) $adminEmails[] = $user->getEmail();
                    if (!$lastLogin || $user->getLastLogin() > $lastLogin) $lastLogin = $user->getLastLogin();
                }

                $project->setName($config->getAppName());
                $project->setImageUrl($imageUrl);
                $project->setDescription($config->getAppBaseline());
                $project->setDataSize($dataSize);
                $project->setAdminEmails(implode(',', $adminEmails));
                $project->setPublished($config->getPublishOnSaasPage());
                if ($lastLogin) $project->setLastLogin($lastLogin);

                $this->rootDm->persist($project);
            } catch (\Exception $e) {
                $this->logger->error($e->getMessage());
            }
        }
        $this->rootDm->flush();
    }
}
