<?php
namespace Application\Sonata\UserBundle\Security;

use Sonata\AdminBundle\Security\Handler\RoleSecurityHandler as RoleSecurityHandler;
use Sonata\AdminBundle\Admin\AdminInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;
use Sonata\AdminBundle\Security\Handler\SecurityHandlerInterface;


class CustomRoleSecurityHandler implements SecurityHandlerInterface
{
    /**
     * @var AuthorizationCheckerInterface
     */
    protected $authorizationChecker;

    /**
     * @var array
     */
    protected $superAdminRoles;

    /**
     * NEXT_MAJOR: Go back to signature class check when bumping requirements to SF 2.6+.
     *
     * @param AuthorizationCheckerInterface $authorizationChecker
     * @param array                                                  $superAdminRoles
     */
    public function __construct($authorizationChecker, array $superAdminRoles)
    {
        if (!$authorizationChecker instanceof AuthorizationCheckerInterface) {
            throw new \InvalidArgumentException('Argument 1 should be an instance of Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface');
        }

        $this->authorizationChecker = $authorizationChecker;
        $this->superAdminRoles = $superAdminRoles;
    }

    /**
     * {@inheritdoc}
     */
    public function isGranted(AdminInterface $admin, $attributes, $object = null)
    {
        if (!is_array($attributes)) {
            $attributes = array($attributes);
        }

        $adminCode = $admin->getCode();
        // use same permission for all option/categories objects
        if (in_array($adminCode, ['admin.option_hidden', 'admin.option.lite_hidden', 'admin.categories.lite_hidden']))
            $adminCode = 'admin.categories';

        // give access to all hidden objects, like the images objects
        if (strpos($adminCode, 'hidden')) return true;

        foreach ($attributes as $pos => $attribute) {
            $attributes[$pos] = sprintf($this->getBaseRole($admin, $adminCode), $attribute);
        }

        $allRole = sprintf($this->getBaseRole($admin, $adminCode), 'ALL');

        try {
            return $this->authorizationChecker->isGranted($this->superAdminRoles)
                || $this->authorizationChecker->isGranted($attributes, $object)
                || $this->authorizationChecker->isGranted(array($allRole), $object);
        } catch (AuthenticationCredentialsNotFoundException $e) {
            return false;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getBaseRole(AdminInterface $admin, $adminCode = null)
    {
        if (!$adminCode) $adminCode = $admin->getCode();
        return 'ROLE_'.str_replace('.', '_', strtoupper($adminCode)).'_%s';
    }

    /**
     * {@inheritdoc}
     */
    public function buildSecurityInformation(AdminInterface $admin)
    {
        return array();
    }

    /**
     * {@inheritdoc}
     */
    public function createObjectSecurity(AdminInterface $admin, $object)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function deleteObjectSecurity(AdminInterface $admin, $object)
    {
    }
}