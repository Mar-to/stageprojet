<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

use App\Command\GoGoAbstractCommand;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use App\Services\NewsletterService;

class NewsletterCommand extends GoGoAbstractCommand
{
    public function __construct(DocumentManager $dm, LoggerInterface $commandsLogger,
                               TokenStorageInterface $security,
                               NewsletterService $newsletterService)
    {
        $this->newsletterService = $newsletterService;
        parent::__construct($dm, $commandsLogger, $security);
    }

    protected function gogoConfigure()
    {
       $this
        ->setName('app:users:sendNewsletter')
        ->setDescription('Check for sending the enwsletter to each user')
    ;
    }

    protected function gogoExecute($dm, InputInterface $input, OutputInterface $output)
    {
      $usersRepo = $dm->getRepository('App\Document\User');

      $users = $usersRepo->findNeedsToReceiveNewsletter();
      $nbrUsers = $users->count();


      foreach ($users as $key => $user)
      {
         $dm->persist($user);
         $nreElements = $this->newsletterService->sendTo($user);
         // $this->log('  -> User : ' . $user->getDisplayName() . ', location : ' . $user->getLocation() . ' / ' . $user->getNewsletterRange() . ' km -> Nre Elements : ' .  $nreElements);
      }

      $dm->flush();
      $this->log('Nombre newsletter envoyées : ' . $nbrUsers);
    }
}