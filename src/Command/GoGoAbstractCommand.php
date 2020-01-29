<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Security\Core\Authentication\Token\AnonymousToken;
use App\Document\GoGoLog;
use App\Document\GoGoLogLevel;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

class GoGoAbstractCommand extends ContainerAwareCommand
{
   protected $logger;
   protected $output;
   protected $dm;

   protected function configure()
   {
      $this->setName('app:abstract:command');
      $this->gogoConfigure();
      $this->addArgument('dbname', InputArgument::OPTIONAL, 'Db name');
   }

   protected function execute(InputInterface $input, OutputInterface $output)
   {
      try {
         $this->odm = $this->getContainer()->get('doctrine_mongodb.odm.default_document_manager');

         $this->logger = $this->getContainer()->get('monolog.logger.commands');
         $this->output = $output;

         if ($input->getArgument('dbname')) $this->odm->getConfiguration()->setDefaultDB($input->getArgument('dbname'));

         // create dummy user, as some code called from command will maybe need the current user informations
         $token = new AnonymousToken('admin', 'GoGo Gadget au Bot', ['ROLE_ADMIN']);
         $this->getContainer()->get('security.token_storage')->setToken($token);

         $this->gogoExecute($this->odm, $input, $output);
      } catch (\Exception $e) {
         $message = $e->getMessage() . '</br>' . $e->getFile() . ' LINE ' . $e->getLine();
         $this->error("Error executing command: " . $message);
      }
   }

   protected function gogoExecute($dm, InputInterface $input, OutputInterface $output) {}

   protected function gogoConfigure() {}

   protected function log($message)
   {
      $this->logger->info($message);
      $this->output->writeln($message);
   }

   protected function error($message)
   {
      $this->logger->error($message);
      $this->output->writeln('ERROR ' . $message);
      $log = new GoGoLog(GoGoLogLevel::Error, 'Error running ' . $this->getName() . ' : ' . $message);
      $this->odm->persist($log);
      $this->odm->flush();
   }
}