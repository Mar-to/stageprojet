<?php

/**
 * This file is part of the GoGoCarto project.
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @copyright Copyright (c) 2016 Sebastian Castro - 90scastro@gmail.com
 * @license    MIT License
 * @Last Modified time: 2018-06-05 18:12:14
 */


namespace App\Controller;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use App\Document\Element;
use App\Document\OptionValue;

use joshtronic\LoremIpsum;

class ImportController extends Controller
{
    public function generateRandomAction($nombre, $generateVote = false)
    {
        $lastElementCreated = $this->get('biopen.random_creation_service')->generate($nombre, $generateVote);

        return $this->render('@BiopenAdmin/pages/help.html.twig');
    }

    public function availableOptionsAction()
    {
        $options = $this->get('doctrine_mongodb')->getManager()->getRepository('BiopenGeoDirectoryBundle:Option')->findAll();
        $bottomOptions = array_filter($options, function($option) { return $option->getSubcategoriesCount() == 0;});
        $optionsNames = array_map(function($option) { return $option->getNameWithParent(); }, $bottomOptions);

        return new Response(join('<br>', $optionsNames));
    }

    public function currStateAction($id)
    {
        $em = $this->get('doctrine_mongodb')->getManager();
        $import = $em->getRepository('BiopenGeoDirectoryBundle:Import')->find($id);
        $responseArray = array(
            "state" => $import->getCurrState(),
            "message" => $import->getCurrMessage()
        );
        $response = new Response(json_encode($responseArray));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
