<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

use App\Document\ElementStatus;

use App\Command\GoGoAbstractCommand;

class UpdateElementsJsonCommand extends GoGoAbstractCommand
{
    protected function gogoConfigure()
    {
       $this
        ->setName('app:elements:updateJson')
        ->addArgument('ids', InputArgument::REQUIRED, 'ids to update')
        ->setDescription('Calculate again all the element json representation');
    }

    protected function gogoExecute($dm, InputInterface $input, OutputInterface $output)
    {
      try {

        if ($input->getArgument('ids') == "all")
        {
            $elements = $dm->getRepository('App\Document\Element')->findAllElements();
        }
        else
        {
            $qb = $dm->createQueryBuilder('BiopenGeoDirectoryBundle:Element');
            $qb->field('id')->in(explode(',',$input->getArgument('ids')));
            $elements = $qb->getQuery()->execute();
        }

        $count = $elements->count();

        $this->log('Generating json representation for ' . $count . ' elements...');
        $elemntJsonService = $this->getContainer()->get('gogo.element_json_generator');

        $i = 0;
        foreach ($elements as $key => $element)
        {
            $elemntJsonService->updateJsonRepresentation($element, $dm);

            if ((++$i % 100) == 0) {
                $dm->flush();
                $dm->clear();
            }
            if (($i % 1000) == 0) {
                $this->log($i . ' / ' . $count . ' elements completed...');
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