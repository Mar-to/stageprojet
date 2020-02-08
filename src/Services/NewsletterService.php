<?php

namespace App\Services;

use App\Document\Element;
use Doctrine\ODM\MongoDB\DocumentManager;

class NewsletterService
{
    protected $dm;
    protected $elementRepo;
    protected $mailService;
    protected $config;

    public function __construct(DocumentManager $dm, MailService $mailService)
    {
        $this->dm = $dm;
        $this->mailService = $mailService;
        $this->elementRepo = $this->dm->getRepository(Element::class);
    }

    public function sendTo($user)
    {
        $elements = $this->elementRepo->findWithinCenterFromDate(
                                        $user->getGeo()->getLatitude(),
                                        $user->getGeo()->getLongitude(),
                                        $user->getNewsletterRange(),
                                        $user->getLastNewsletterSentAt());

        $elementCount = $elements->count();
        if ($elementCount > 0) {
            $this->mailService->sendAutomatedMail('newsletter', $user, null, $elements);
        }

        $user->setLastNewsletterSentAt(new \DateTime());
        $user->updateNextNewsletterDate();

        return $elementCount;
    }
}
