<?php

namespace App\Admin;

use Sonata\AdminBundle\Translator\LabelTranslatorStrategyInterface;

class GoGoLabelStrategy implements LabelTranslatorStrategyInterface
{
    public function __construct($code)
    {
        $this->code = $code;
    }

    public function getLabel($label, $context = '', $type = '')
    {
        return str_replace('admin.', '', $this->code) . ".$context.$label" . ($type && $type != 'label' ? "_$type" : '');
    }
}