<?php
// Global methodds helper. This file is loaded automatically
function is_associative_array($a) {
    if (!is_array($a)) return false;
    foreach (array_keys($a) as $key) { if (!is_int($key)) return true;  }
    return false;
}

function startsWith( $haystack, $needle ) {
    $length = strlen( $needle );
    return substr( $haystack, 0, $length ) === $needle;
}

function endsWith( $haystack, $needle ) {
   $length = strlen( $needle );
   if( !$length ) {
       return true;
   }
   return substr( $haystack, -$length ) === $needle;
}

function slugify($text) {
    $text = strtolower($text); // lowercase
    // replace non letter or digits by -
    $text = str_replace('é', 'e', $text);
    $text = str_replace('è', 'e', $text);
    $text = str_replace('ê', 'e', $text);
    $text = str_replace('ô', 'o', $text);
    $text = str_replace('ç', 'c', $text);
    $text = str_replace('à', 'a', $text);
    $text = str_replace('â', 'a', $text);
    $text = str_replace('î', 'i', $text);
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);

    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text); // transliterate
    $text = preg_replace('~[^-\w]+~', '', $text); // remove unwanted characters
    $text = trim($text, '-'); // trim
    $text = rtrim($text, 's'); // remove final "s" for plural
    $text = preg_replace('~-+~', '-', $text); // remove duplicate -

    if (empty($text)) {
        return '';
    }

    return $text;
}

function extractFieldsUsedInTemplate($string) {
    $matches = [];
    preg_match_all('/{{\s*([\w_]*)\s*|[^{}]*}}/', $string, $matches);
    return array_unique(array_filter(array_map(function ($fieldName) {
        if ('image' == $fieldName) {
            $fieldName = 'images';
        }
        return $fieldName;
    }, $matches[1])));
}