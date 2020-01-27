<?php

namespace App\Command;

use App\Command\GoGoAbstractCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Document\GoGoLogUpdate;
use Symfony\Component\Console\Input\InputArgument;

/**
 * Command to update database when schema need migration
 * Also provide some update message in the admin dashboard
 */
class AddMessageCommand extends GoGoAbstractCommand
{
    protected function gogoConfigure()
    {
        $this->setName('gogolog:add:message')
             ->addArgument('message', InputArgument::REQUIRED, 'Message to add')
             ->setDescription('Update datatabse each time after code update');
    }

    protected function gogoExecute($dm, InputInterface $input, OutputInterface $output)
    {
        $log = new GoGoLogUpdate('info', $input->getArgument('message'));

        $dm->persist($log);
        $dm->flush();
    }
}