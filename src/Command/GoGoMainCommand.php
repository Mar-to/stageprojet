<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;

/*
* For SAAS Instance, this command is executed every minute, and check if there is a command to execute
* for a particular instance. This permit to not run all the commands as the same time
*/
class GoGoMainCommand extends Command
{
   // List of the command to execute periodically, with the period in hours
   public const SCHEDULED_COMMANDS = [
      "app:elements:checkvote" => "24H",
      "app:elements:checkExternalSourceToUpdate" => "24H",
      "app:users:sendNewsletter" => "1H",
      "app:webhooks:post" => "5M" // 5 minuutes
   ];

   public function __construct(DocumentManager $dm, LoggerInterface $commandsLogger)
   {
      $this->dm = $dm;
      $this->logger = $commandsLogger;
      parent::__construct();
   }

   protected function configure()
   {
      $this->setName('app:main-command');
   }

   protected function execute(InputInterface $input, OutputInterface $output)
   {
      $qb = $this->dm->createQueryBuilder('App\Document\ScheduledCommand');

      $commandToExecute = $qb->field('nextExecutionAt')->lte(new \DateTime())
                             ->sort('nextExecutionAt', 'ASC')
                             ->getQuery()->getSingleResult();

      if ($commandToExecute !== null)
      {
         // Updating next execution time
         $dateNow = new \DateTime();
         $dateNow->setTimestamp(time());
         $interval = new \DateInterval('PT' . self::SCHEDULED_COMMANDS[$commandToExecute->getCommandName()]);
         $commandToExecute->setNextExecutionAt($dateNow->add($interval));
         $this->dm->persist($commandToExecute);
         $this->dm->flush();

         try {
          $this->logger->info('---- Running command ' . $commandToExecute->getCommandName() . ' for project : ' . $commandToExecute->getProject()->getName());
         } catch (\Exception $e) {
          // the project has been deleted
          $this->logger->info('---- DELETEING command ' . $commandToExecute->getCommandName());
          $this->dm->remove($commandToExecute);
          $this->dm->flush();
          return;
         }
         $command = $this->getApplication()->find($commandToExecute->getCommandNAme());

         $arguments = array(
           'command' => $commandToExecute->getCommandName(),
           'dbname'  => $commandToExecute->getProject()->getDbName(),
         );

         $input = new ArrayInput($arguments);
         try { $command->run($input, $output); }
         catch (\Exception $e) { $this->logger->error($e->getMessage()); }
      }
   }
}