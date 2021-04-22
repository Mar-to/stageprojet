<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * Codeinvitation.
 *
 * @MongoDB\Document(repositoryClass="App\Repository\CodeInvitationRepository")
 */
class CodeInvitation
{
   /**
     * @var int
     *
     * @MongoDB\Id(strategy="auto")
     */
    private $id;

     /**
     * @var string
     *
     * @MongoDB\Field(type="string")
     */
    private $code;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set code.
     *
     * @param string $code
     *
     * @return CodeInvitation
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code.
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }
}
