<?php

namespace Biopen\CoreBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Biopen\CoreBundle\Document\MigrationState;
use Biopen\CoreBundle\Command\MigrationCommand;

use joshtronic\LoremIpsum;

class LoadMigrationState implements FixtureInterface
{
  
  public function load(ObjectManager $manager)
  {  
    $migrationState = new MigrationState();
    $migrationCommand = new MigrationCommand();
    $migrationState->setMigrationIndex(count($migrationCommand->migrations));
    $migrationState->setMessagesIndex(count($migrationCommand->messages));
    $manager->persist($migrationState);
    $manager->flush();
  }
}