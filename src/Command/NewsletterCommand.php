<?php

namespace App\Command;

use App\Document\User;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use App\Services\NewsletterService;

final class NewsletterCommand extends GoGoAbstractCommand
{
  private $newsletterService;

    public function __construct(DocumentManager $dm, LoggerInterface $commandsLogger,
                               TokenStorageInterface $security,
                               NewsletterService $newsletterService)
    {
        $this->newsletterService = $newsletterService;
        parent::__construct($dm, $commandsLogger, $security);
    }

    protected function gogoConfigure(): void
    {
       $this
          ->setName('app:users:sendNewsletter')
          ->setDescription('Send the newsletter to each user')
       ;
    }

    protected function gogoExecute(DocumentManager $dm, InputInterface $input, OutputInterface $output): void
    {
      $usersRepo = $dm->getRepository(User::class);

      $users = $usersRepo->findNeedsToReceiveNewsletter();
      $nbrUsers = $users->count();

      foreach ($users as $key => $user)
      {
         $dm->persist($user);
         $nreElements = $this->newsletterService->sendTo($user);
         // $this->log('  -> User : ' . $user->getDisplayName() . ', location : ' . $user->getLocation() . ' / ' . $user->getNewsletterRange() . ' km -> Nre Elements : ' .  $nreElements);
      }

      $dm->flush();
      $this->log('Nombre newsletters envoyées : ' . $nbrUsers);
    }
}
