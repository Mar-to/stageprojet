<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

use App\Command\GoGoAbstractCommand;

class NewsletterCommand extends GoGoAbstractCommand
{
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

      $newsletterService = $this->getContainer()->get('gogo.newsletter_service');

      foreach ($users as $key => $user)
      {
         $dm->persist($user);
         $nreElements = $newsletterService->sendTo($user);
         // $this->log('  -> User : ' . $user->getDisplayName() . ', location : ' . $user->getLocation() . ' / ' . $user->getNewsletterRange() . ' km -> Nre Elements : ' .  $nreElements);
      }

      $dm->flush();
      $this->log('Nombre newsletter envoyées : ' . $nbrUsers);
    }
}