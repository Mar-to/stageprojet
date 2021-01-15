<?php

namespace App\Controller;

use App\Services\RandomCreationService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;
use Symfony\Component\HttpFoundation\Response;

class ImportController extends Controller
{
    public function generateRandomAction($nombre, $generateVote = false, RandomCreationService $randomService)
    {
        $lastElementCreated = $randomService->generate($nombre, $generateVote);

        return $this->render('admin/pages/help.html.twig');
    }

    public function availableOptionsAction(DocumentManager $dm)
    {
        $options = $dm->get('Option')->findAll();
        $bottomOptions = array_filter($options, function ($option) { return 0 == $option->getSubcategoriesCount(); });
        $optionsNames = array_map(function ($option) { return $option->getNameWithParent(); }, $bottomOptions);

        return new Response(join('<br>', $optionsNames));
    }

    public function currStateAction($id, DocumentManager $dm)
    {
        $import = $dm->get('Import')->find($id);
        $responseArray = [
            'state' => $import->getCurrState(),
            'message' => $import->getCurrMessage(),
        ];
        $response = new Response(json_encode($responseArray));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
