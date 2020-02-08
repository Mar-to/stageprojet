<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-25 12:11:11
 */

namespace App\Admin\Element;

// custom iterator

// There is a chain of inherance to split ElementAdmin in different files
// ElementAdminShowEdit inherit from ElementAdminList wich inherit from ElementAdminFilters and so on..
class ElementAdmin extends ElementAdminShowEdit
{
    public function getExportFields()
    {
        $dm = $this->getModelManager()->getDocumentManager('App\Document\Configuration');
        $basicFields = [
      'id' => 'id',
      'name' => 'name',
      'categories' => 'optionsString',
      'latitude' => 'geo.latitude',
      'longitude' => 'geo.longitude',
      'streetAddress' => 'address.streetAddress',
      'addressLocality' => 'address.addressLocality',
      'postalCode' => 'address.postalCode',
      'addressCountry' => 'address.addressCountry',
    ];
        $publicProperties = $dm->getRepository('App\Document\Element')->findAllCustomProperties($onlypublic = true);
        $customFields = [];
        foreach ($publicProperties as $key => $prop) {
            $customFields[$prop] = 'data';
        }

        return array_merge($basicFields, $customFields);
    }
}
