<?php
namespace App\Services;

use Doctrine\ODM\MongoDB\DocumentManager;
use App\Document\UserInteractionReport;
use App\Document\Element;
use App\Document\User;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class MailService
{
    protected $dm;
    protected $config;
    protected $mailer;
    protected $router;
    protected $twig;
    protected $baseUrl;
    protected $dmail;
    protected $instanceName;

	/**
	* Constructor
	*/
	public function __construct(DocumentManager $dm, $mailer, $router, $twig, $baseUrl, $basePath, $sass, $dmail, $instanceName)
	{
	   $this->dm = $dm;
       $this->config = $this->dm->getRepository('App\Document\Configuration')->findConfiguration();
       $this->mailer = $mailer;
       $this->router = $router;
       $this->twig = $twig;

       $this->baseUrl = 'http://';
       if ($sass) $this->baseUrl .= $this->config->getDbName() . '.';
       $this->baseUrl .= $baseUrl;
       $this->email = $dmail;
       $this->instanceName = $instanceName;
	}

    public function sendMail($to, $subject, $content, $from = null, $toBCC = null)
    {
        if (!$from) $from = array($this->email => $this->instanceName);
        try {

            $draftedContent = $this->draftTemplate($content);

            $message = (new \Swift_Message())
            ->setFrom($from)
            ->setSubject($subject)
            ->setBody(
                $draftedContent,
                'text/html'
            );

            if ($to) $message->setTo($to);
            if ($toBCC) $message->setBcc($toBCC);

            $this->mailer->send($message);
        }
        catch (\Swift_RfcComplianceException $e) {
            $error = 'Une erreur est survenue : ' . $e->getMessage();
            return [ 'success' => false, 'message' => $error ];
        }

        return [ 'success' => true, 'message' => 'The message has been send' ];
    }

    public function sendAutomatedMail($mailType, $element, $customMessage = null, $option = null)
    {
        if ($element instanceof Element && $element->isDynamicImported()) return; // do not send email to dynamically imported elements

        if (!$customMessage) $customMessage = 'Pas de message particulier';
        $mailConfig = $this->getAutomatedMailConfigFromType($mailType);

        if (!$mailConfig->getActive())
            return [ 'success' => false, 'message' => $mailType . ' automated mail disabled' ];

        $draftResponse = $this->draftEmail($mailType,$element,$customMessage, $option);

        if ($draftResponse['success'])
        {
            if (in_array($mailType, ['validation', 'refusal']))
                $mailTo = $element->getCurrContribution() ? $element->getCurrContribution()->getUserEmail() : null;
            else if ($mailType == 'report' && $option && $option instanceof UserInteractionReport)
                $mailTo = $option->getUserEmail();
            else
                $mailTo =  $element->getEmail();

            if ($mailTo && $mailTo != "no email")
            {
                return $this->sendMail($mailTo, $draftResponse['subject'], $draftResponse['content']);
            }
            else
                return [ 'success' => false, 'message' => 'No email address to deliver to' ];
        }
        else
        {
            return $draftResponse;
        }
    }

    public function draftEmail($mailType, $element, $customMessage, $option = null)
    {
        $mailConfig = $this->getAutomatedMailConfigFromType($mailType);

        if ($mailConfig == null)
            return [ 'success' => false, 'message' => $mailType . ' automated mail does not exist' ];

        $subject = $mailConfig->getSubject();
        $content = $mailConfig->getContent();

        if (!$mailConfig->getSubject() || !$mailConfig->getContent())
            return [ 'success' => false, 'message' => $mailType . ' automated mail missing subject or content' ];

        if ($mailType == 'newsletter')
            $content = $this->replaceNewElementsList($content, $option, $element);

        $subject = $this->replaceMailsVariables($subject, $element, $customMessage, $mailType, $option);
        $content = $this->replaceMailsVariables($content, $element, $customMessage, $mailType, $option);

        return [ 'success' => true, 'subject' => $subject, 'content' => $content];
    }

    public function draftTemplate($content, $template = 'base')
    {
        return $this->twig->render(
                'emails/layout.html.twig',
                array('content' => $content, 'config' => $this->config, 'homeUrl' => $this->generateRoute('gogo_homepage'))
            );
    }

    public function getConfig()
    {
        return $this->config;
    }

    public function getAutomatedMailConfigFromType($mailType)
    {
        $mailConfig = null;

        switch($mailType)
        {
            case 'add':            $mailConfig = $this->config->getAddMail();break;
            case 'edit':           $mailConfig = $this->config->getEditMail();break;
            case 'delete':         $mailConfig = $this->config->getDeleteMail();break;
            case 'validation':     $mailConfig = $this->config->getValidationMail();break;
            case 'refusal':        $mailConfig = $this->config->getRefusalMail();break;
            case 'report':         $mailConfig = $this->config->getReportResolvedMail();break;
            case 'newsletter':     $mailConfig = $this->config->getNewsletterMail();break;
        }

        return $mailConfig;
    }

    private function replaceMailsVariables($string, $element = null, $customMessage, $mailType, $option)
    {
        if ($element !== null && $element)
        {
            if ($element instanceof Element)
            {
                $showElementUrl = $this->generateRoute('gogo_directory_showElement', array('id' => $element->getId()));
                $showElementUrl = str_replace('%23', '#', $showElementUrl);
                $editElementUrl = $this->generateRoute('gogo_element_edit', array('id' => $element->getId()));
                $elementName = $element->getName();
                $contribution = $element->getCurrContribution();
                $directEditElementUniqueUrl = $this->generateRoute('gogo_element_edit',array("id" => $element->getId(), "hash" => $element->getRandomHash()));

                if ($mailType == 'report' && $option && $option instanceof UserInteractionReport)
                    $user = $option->getUserDisplayName();
                else
                    $user = $contribution ? $contribution->getUserDisplayName() : 'Inconnu';

                $string = preg_replace('/({{((?:\s)+)?element((?:\s)+)?}})/i', $elementName, $string);
                $string = preg_replace('/({{((?:\s)+)?user((?:\s)+)?}})/i',    $user, $string);
                $string = preg_replace('/({{((?:\s)+)?customMessage((?:\s)+)?}})/i', $customMessage, $string);
                $string = preg_replace('/({{((?:\s)+)?showUrl((?:\s)+)?}})/i', $showElementUrl, $string);
                $string = preg_replace('/({{((?:\s)+)?editUrl((?:\s)+)?}})/i', $editElementUrl, $string);
                $string = preg_replace('/({{((?:\s)+)?directEditElementUniqueUrl((?:\s)+)?}})/i', $directEditElementUniqueUrl, $string);
            }
            else if  ($element instanceof User)
            {
                $string = preg_replace('/({{((?:\s)+)?user((?:\s)+)?}})/i', $element->getDisplayName(), $string);
            }
        }

        $homeUrl = $this->generateRoute('gogo_homepage');
        $userContributionsUrl = $this->generateRoute('gogo_user_contributions');
        $userProfileUrl = $this->generateRoute('gogo_user_profile');

        $string = preg_replace('/({{((?:\s)+)?homeUrl((?:\s)+)?}})/i', $homeUrl, $string);
        $string = preg_replace('/({{((?:\s)+)?customMessage((?:\s)+)?}})/i', $customMessage, $string);
        $string = preg_replace('/({{((?:\s)+)?userContributionsUrl((?:\s)+)?}})/i', $userContributionsUrl, $string);
        $string = preg_replace('/({{((?:\s)+)?userProfileUrl((?:\s)+)?}})/i', $userProfileUrl, $string);

        $string = str_replace('http://http://', 'http://', $string);
        $string = str_replace('http://', 'https://', $string);
        $string = str_replace('https://https://', 'https://', $string);

        return $string;
    }

    private function generateRoute($routeName, $args = [])
    {
        return $this->baseUrl . $this->router->generate($routeName, $args);
    }

    private function replaceNewElementsList($string, $elements, $user)
    {
        if (!is_array($elements)) $elements = $elements->toArray();

        $pendingElements = array_filter($elements, function($el) { return $el->isPending(); });
        $newElements     = array_filter($elements, function($el) { return !$el->isPending(); });

        $pendingElementsHtml = $this->twig->render('emails/newsletter-new-elements.html.twig',
            array('elements' => $pendingElements, 'config' => $this->config, 'baseUrl' => $this->baseUrl)
        );

        $newElementsHtml = $this->twig->render('emails/newsletter-new-elements.html.twig',
            array('elements' => $newElements, 'config' => $this->config, 'baseUrl' => $this->baseUrl)
        );

        $showOnMapBtnHtml = $this->twig->render('emails/newsletter-show-on-map-button.html.twig',
            array('config' => $this->config, 'user' => $user, 'directoryUrl' => $this->generateRoute('gogo_directory'))
        );

        $string = preg_replace('/({{((?:\s)+)?pendingElements((?:\s)+)?}})/i', $pendingElementsHtml, $string);
        $string = preg_replace('/({{((?:\s)+)?newElements((?:\s)+)?}})/i', $newElementsHtml, $string);
        $string = preg_replace('/({{((?:\s)+)?showOnMapBtn((?:\s)+)?}})/i', $showOnMapBtnHtml, $string);

        return $string;
    }
}