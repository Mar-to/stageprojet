<?php

namespace App\Repository;

use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

class TaxonomyRepository extends DocumentRepository
{
    public function findTaxonomy()
    {
        $qb = $this->createQueryBuilder('App\Document\Taxonomy');

        return $qb->getQuery()->getSingleResult();
    }

    public function findTaxonomyJson($getOnlyOptions = false)
    {
        $qb = $this->createQueryBuilder('App\Document\Taxonomy');
        $taxonomy = $qb->hydrate(false)->getQuery()->getSingleResult();

        return $getOnlyOptions ? $taxonomy['optionsJson'] : $taxonomy['taxonomyJson'];
    }
}
