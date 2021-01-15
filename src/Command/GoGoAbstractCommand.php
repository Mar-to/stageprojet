<?php

namespace App\Command;

use App\Document\GoGoLog;
use App\Document\GoGoLogLevel;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Core\Authentication\Token\AnonymousToken;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use App\Services\DocumentManagerFactory;

class GoGoAbstractCommand extends Command
{
    protected $dm;
    protected $dmFactory;
    protected $logger;
    protected $security;
    protected $output;

    public function __construct(DocumentManagerFactory $dmFactory, LoggerInterface $commandsLogger,
                               TokenStorageInterface $tokenStorage)
    {
        $this->dmFactory = $dmFactory;
        $this->logger = $commandsLogger;
        $this->security = $tokenStorage;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('app:abstract:command');
        $this->gogoConfigure();
        $this->addArgument('dbname', InputArgument::OPTIONAL, 'Db name');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $this->output = $output;

            if ($input->getArgument('dbname')) {
                $this->dm = $this->dmFactory->switchCurrManagerToUseDb($input->getArgument('dbname'));
            } else {
                $this->dm = $this->dmFactory->getRootManager();
            }

            // create dummy user, as some code called from command will maybe need the current user informations
            $token = new AnonymousToken('admin', 'GoGo Gadget au Bot', ['ROLE_ADMIN']);
            $this->security->setToken($token);

            $this->gogoExecute($this->dm, $input, $output);
        } catch (\Exception $e) {
            $message = $e->getMessage().'</br>'.$e->getFile().' LINE '.$e->getLine();
            $this->error('Error executing command: '.$message);
        }
    }

    protected function gogoExecute(DocumentManager $dm, InputInterface $input, OutputInterface $output): void
    {
    }

    protected function gogoConfigure(): void
    {
    }

    protected function log($message)
    {
        $this->logger->info($message);
        $this->output->writeln($message);
    }

    protected function error($message)
    {
        $this->logger->error($message);
        $this->output->writeln('ERROR '.$message);
        $log = new GoGoLog(GoGoLogLevel::Error, 'Error running '.$this->getName().' : '.$message);
        $this->dm->persist($log);
        $this->dm->flush();
    }
}
