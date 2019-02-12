<?php
namespace Biopen\GeoDirectoryBundle\Services;
 
class ConvertCsvToArrayService {
    
    public function __construct()
    {
    }
    
    public function convert($filename, $delimiter = ',') 
    {
        $header = NULL;
        $data = array();
        
        if (($handle = fopen($filename, 'r')) !== FALSE) {
            while (($row = fgetcsv($handle, 0, $delimiter)) !== FALSE) {
                if(!$header) {
                    $header = $row;
                } else {
                    if (count($header) != count ($row)) dump($row);
                    else $data[] = array_combine($header, $row);
                }
            }
            fclose($handle);
        }
        return $data;
    }
 
}