<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Doctrine\ODM\MongoDB\DocumentManager;

/*
* Update infos of each instance for the Saas Index page
*/
class UpdateProjectsInfoCommand extends Command
{
   protected function configure()
   {
      $this->setName('app:saas:update-projects-info');
   }

   protected function execute(InputInterface $input, OutputInterface $output, DocumentManager $dm)
   {
      $projects = $dm->getRepository('App\Document\Project')->findAll();

      $logger = $this->getContainer()->get('monolog.logger.commands');
      $logger->info("Updating projects informations. " . count($projects) . " projects to update");
      $router = $this->getContainer()->get('router');
      $apiUrl = $this->getContainer()->getParameter('base_url') . $router->generate('gogo_api_project_info');

      foreach ($projects as $key => $project) {
        try {
          $logger->info('  -> Update project ' . $project->getName());
          $url = 'http://' . $project->getDomainName() . '.' . $apiUrl;
          $json = file_get_contents($url);
          $data = json_decode($json, true);
          $project->setName($data['name']);
          $project->setImageUrl($data['imageUrl']);
          $project->setDescription($data['description']);
          $project->setDataSize($data['dataSize']);
          $dm->persist($project);
        }
        catch (\Exception $e) {
          $logger->error($e->getMessage());
        }
      }
      $dm->flush();
   }
}