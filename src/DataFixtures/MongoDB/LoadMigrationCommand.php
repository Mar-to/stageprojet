<?php

namespace App\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\FixtureInterface;
use App\Document\MigrationState;
use App\Command\MigrationCommand;

use Doctrine\Persistence\ObjectManager;
use joshtronic\LoremIpsum;

class LoadMigrationState implements FixtureInterface
{
  public function load(ObjectManager $manager)
  {
    $migrationState = new MigrationState();
    $migrationState->setMigrationIndex(count(MigrationCommand::$migrations));
    $migrationState->setCommandsIndex(count(MigrationCommand::$commands));
    $migrationState->setMessagesIndex(count(MigrationCommand::$messages));
    $manager->persist($migrationState);
    $manager->flush();
  }
}
