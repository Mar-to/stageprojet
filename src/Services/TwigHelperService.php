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
    return $this->dm->get('Configuration')->findConfiguration();
  }

  public function listAbouts()
  {
    return $this->dm->get('About')->findAllOrderedByPosition();
  }

  public function countPartners()
  {
    return count($this->dm->get('Partner')->findAll());
  }
}