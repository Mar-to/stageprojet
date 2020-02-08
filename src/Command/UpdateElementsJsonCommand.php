<?php

namespace App\Command;

use App\EventListener\ElementJsonGenerator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UpdateElementsJsonCommand extends GoGoAbstractCommand
{
    public function __construct(DocumentManager $dm, LoggerInterface $commandsLogger,
                               TokenStorageInterface $security,
                               ElementJsonGenerator $elemntJsonService)
    {
        $this->elemntJsonService = $elemntJsonService;
        parent::__construct($dm, $commandsLogger, $security);
    }

    protected function gogoConfigure(): void
    {
        $this
        ->setName('app:elements:updateJson')
        ->addArgument('ids', InputArgument::REQUIRED, 'ids to update')
        ->setDescription('Calculate again all the element json representation');
    }

    protected function gogoExecute(DocumentManager $dm, InputInterface $input, OutputInterface $output): void
    {
        try {
            if ('all' == $input->getArgument('ids')) {
                $elements = $dm->getRepository('App\Document\Element')->findAllElements();
            } else {
                $qb = $dm->createQueryBuilder('App\Document\Element');
                $qb->field('id')->in(explode(',', $input->getArgument('ids')));
                $elements = $qb->getQuery()->execute();
            }

            $count = $elements->count();

            $this->log('Generating json representation for '.$count.' elements...');

            $i = 0;
            foreach ($elements as $key => $element) {
                $this->elemntJsonService->updateJsonRepresentation($element);

                if (0 == (++$i % 100)) {
                    $dm->flush();
                    $dm->clear();
                }
                if (0 == ($i % 1000)) {
                    $this->log($i.' / '.$count.' elements completed...');
                }
            }

            $dm->flush();
            $dm->clear();

            $this->log('All elements successfully updated');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
