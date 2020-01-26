<?php

namespace App\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use App\Document\MigrationState;
use App\Command\MigrationCommand;

use joshtronic\LoremIpsum;

class LoadMigrationState implements FixtureInterface
{

  public function load(ObjectManager $manager)
  {
    $migrationState = new MigrationState();
    $migrationCommand = new MigrationCommand();
    $migrationState->setMigrationIndex(count($migrationCommand->migrations));
    $migrationState->setCommandsIndex(count($migrationCommand->commands));
    $migrationState->setMessagesIndex(count($migrationCommand->messages));
    $manager->persist($migrationState);
    $manager->flush();
  }
}