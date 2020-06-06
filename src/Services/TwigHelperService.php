<?php

namespace App\Services;

use Doctrine\ODM\MongoDB\DocumentManager;

class TwigHelperService
{
  public function __construct(DocumentManager $dm)
  {
    $this->dm = $dm;
  }

  public function config()
  {
    return $this->dm->getRepository('App\Document\Configuration')->findConfiguration();
  }

  public function listAbouts()
  {
    return $this->dm->getRepository('App\Document\About')->findAllOrderedByPosition();
  }

  public function countPartners()
  {
    return count($this->dm->getRepository('App\Document\Partner')->findAll());
  }
}