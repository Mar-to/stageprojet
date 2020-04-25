<?php

namespace App\Command;

use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Routing\RouterInterface;

/*
* Update infos of each instance for the Saas Index page
*/
class UpdateProjectsInfoCommand extends Command
{
    public function __construct(DocumentManager $dm, LoggerInterface $commandsLogger, RouterInterface $router,
                                $baseUrl)
    {
        $this->dm = $dm;
        $this->router = $router;
        $this->logger = $commandsLogger;
        $this->baseUrl = $baseUrl;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('app:saas:update-projects-info');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $projects = $this->dm->getRepository('App\Document\Project')->findAll();

        $this->logger->info('Updating projects informations. '. count($projects) .' projects to update');
        $apiUrl = $this->baseUrl . $this->router->generate('gogo_api_project_info');

        foreach ($projects as $key => $project) {
            try {
                $this->logger->info('  -> Update project '.$project->getName());
                $url = 'https://'.$project->getDomainName().'.'.$apiUrl;
                $json = file_get_contents($url);
                $data = json_decode($json, true);
                $project->setName($data['name']);
                $project->setImageUrl($data['imageUrl']);
                $project->setDescription($data['description']);
                $project->setDataSize($data['dataSize']);
                $project->setAdminEmails($data['adminEmails']);
                $project->setPublished($data['publish']);
                $project->setLastLogin($data['lastLogin']);
                $this->dm->persist($project);
            } catch (\Exception $e) {
                $this->logger->error($e->getMessage());
            }
        }
        $this->dm->flush();
    }
}
