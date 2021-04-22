<?php

namespace App\DataFixtures\MongoDB;

use App\Document\CodeInvitation;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Persistence\ObjectManager;

class LoadCodeInvitation implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $new_CodeInvitation = new CodeInvitation();
        //$new_CodeInvitation = setCode('oui');
        $manager->persist($new_CodeInvitation);

        // we trigger saving of all abouts
        $manager->flush();
    }
}
