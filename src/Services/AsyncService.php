<?php

namespace App\Services;

use App\Helper\SaasHelper;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Process\PhpExecutableFinder;
use Symfony\Component\Process\Process;

class AsyncService
{
    protected $runSynchronously = false;

    public function __construct(Filesystem $filesystem, $rootDir, $env)
    {
        $this->filesystem = $filesystem;
        $this->rootDir = $rootDir;
        $this->env = $env;
        $this->consolePath = 'bin/console';
        $this->consolePath = $this->resolveConsolePath();
        $this->phpPath = $this->resolvePhpPath();
    }

    public function setRunSynchronously($bool)
    {
        $this->runSynchronously = $bool;
    }

    public function callCommand($commandName, $arguments = [], $dbname = null)
    {
        if (null === $dbname) {
            $saasHelper = new SaasHelper();
            $dbname = $saasHelper->getCurrentProjectCode();
        }

        $commandline = $this->phpPath.' '.$this->consolePath;
        $commandline .= ' --env='.$this->env;
        $commandline .= ' '.$commandName;
        foreach ($arguments as $key => $arg) {
            $commandline .= ' '.$arg;
        }
        $commandline .= ' '.$dbname;
        $commandline .= ' > /tmp/command.log 2>/tmp/command.log';
        if (!$this->runSynchronously) {
            $commandline .= ' &';
        }

        return $this->runProcess($commandline);
    }

    protected function runProcess($commandline)
    {
        $process = Process::fromShellCommandline($commandline);
        $process->start();
        if ($this->runSynchronously) {
            $process->wait();
        }

        return $process->getPid();
    }

    protected function resolveConsolePath()
    {
        $consolePath = $this->consolePath;

        if (!$this->filesystem->isAbsolutePath($consolePath)) {
            $consolePath = $this->rootDir.'/../'.$consolePath;
        }

        if (!$this->filesystem->exists($consolePath)) {
            throw new FileNotFoundException(sprintf('File %s doesn\'t exist', $consolePath));
        }

        return $consolePath;
    }

    protected function resolvePhpPath()
    {
        $finder = new PhpExecutableFinder();
        $phpPath = $finder->find();

        if (!$this->filesystem->exists($phpPath)) {
            throw new FileNotFoundException(sprintf('PHP executable %s doesn\'t exist', $phpPath));
        }

        return $phpPath;
    }
}
