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

    protected function gogoExecute($em, InputInterface $input, OutputInterface $output)
    {
      try {

        if ($input->getArgument('ids') == "all")
        {
            $elements = $em->getRepository('BiopenGeoDirectoryBundle:Element')->findAllElements();
        }
        else
        {
            $qb = $em->createQueryBuilder('BiopenGeoDirectoryBundle:Element');
            $qb->field('id')->in(explode(',',$input->getArgument('ids')));
            $elements = $qb->getQuery()->execute();
        }

        $count = $elements->count();

        $this->log('Generating json representation for ' . $count . ' elements...');
        $elemntJsonService = $this->getContainer()->get('biopen.element_json_generator');

        $i = 0;
        foreach ($elements as $key => $element)
        {
            $elemntJsonService->updateJsonRepresentation($element, $em);

            if ((++$i % 100) == 0) {
                $em->flush();
                $em->clear();
            }
            if (($i % 1000) == 0) {
                $this->log($i . ' / ' . $count . ' elements completed...');
            }
        }

        $em->flush();
        $em->clear();

        $this->log('All elements successfully updated');

      } catch (\Exception $e) {
          $this->error($e->getMessage());
      }
    }

}