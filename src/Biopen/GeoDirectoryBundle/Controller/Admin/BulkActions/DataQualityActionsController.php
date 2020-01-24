<?php

namespace Biopen\GeoDirectoryBundle\Controller\Admin\BulkActions;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class DataQualityActionsController extends BulkActionsAbstractController
{
   public function fixsEmailAddressesAction(Request $request) { return $this->elementsBulkAction('fixsEmailAddresses', $request); }
   public function fixsEmailAddresses($element)
   {
      $actualMail = $element->getEmail();
      if ($actualMail)
      {
       $element->setEmail(str_replace('.@', '@', $actualMail));
      }
   }

   public function fixsCoordinatesDigitsAction(Request $request) { return $this->elementsBulkAction('fixsCoordinatesDigits', $request); }
   public function fixsCoordinatesDigits($element)
   {
      $geo = $element->getGeo();
      $geo->setLatitude( $geo->getLatitude());
      $geo->setLongitude( $geo->getLongitude());
   }

   public function fixsMissingCitiesAction(Request $request, SessionInterface $session)
   {
      $em = $this->get('doctrine_mongodb')->getManager();
      $qb = $em->createQueryBuilder('BiopenGeoDirectoryBundle:Element');
      $elements = $qb
         ->addOr($qb->expr()->field('city')->equals(''))
         ->addOr($qb->expr()->field('sourceKey')->equals('PDCN'))
         ->getQuery()
         ->execute();

      $geocoder = $this->get('bazinga_geocoder.geocoder')->using('google_maps');
      try
      {
         foreach($elements as $element) {
            $result = $geocoder->geocode($element->getAddress())->first();
            $element->setCity($result->getLocality());
            $element->setStreetAddress($result->getStreetNumber() . ' ' . $result->getStreetName());
         }
      }
      catch (\Exception $error) { }

      $em->flush();

      $session->getFlashBag()->add('success', count($elements) . " éléments  ont été réparés");
      return $this->redirectToIndex();
   }
}