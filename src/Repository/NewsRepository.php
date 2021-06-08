<?php

declare(strict_types=1);

namespace App\Repository;

use App\Enum\NewsStatus;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

final class NewsRepository extends DocumentRepository
{
    public function findLastPublishedNews(\DateTime $lastNewsletterSentAt)
    {
        return $this->createQueryBuilder()
            ->field('status')->equals(NewsStatus::PUBLISHED)
            ->sort('publicationDate', 'desc')
            ->field('publicationDate')->lte(new \DateTime())
            ->field('publicationDate')->gte($lastNewsletterSentAt)
            ->getQuery()
            ->execute();
    }
}
