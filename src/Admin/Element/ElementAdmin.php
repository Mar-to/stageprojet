<?php
/**
 * @Author: Sebastian Castro
 * @Date:   2017-03-28 15:29:03
 * @Last Modified by:   Sebastian Castro
 * @Last Modified time: 2018-04-25 12:11:11
 */

namespace App\Admin\Element;

// custom iterator
use Sonata\DoctrineMongoDBAdminBundle\Datagrid\ProxyQuery;
use App\Helper\GoGoHelper;

// There is a chain of inherance to split ElementAdmin in different files
// ElementAdminShowEdit inherit from ElementAdminList wich inherit from ElementAdminFilters and so on..
class ElementAdmin extends ElementAdminShowEdit
{
    public function getExportFields()
    {
        $dm = GoGoHelper::getDmFromAdmin($this);
        $basicFields = [
          'id' => 'id',
          'name' => 'name',
          'categories' => 'optionsString',
          'categories_ids' => 'optionIds',
          'latitude' => 'geo.latitude',
          'longitude' => 'geo.longitude',
          'streetAddress' => 'address.streetAddress',
          'addressLocality' => 'address.addressLocality',
          'postalCode' => 'address.postalCode',
          'addressCountry' => 'address.addressCountry',
          'status' => 'status',
          'moderationState' => 'moderationState',
          'source' => 'sourceKey',
          'images' => 'gogo-custom-images',
          'files' => 'gogo-custom-files'
        ];
        $config = $dm->get('Configuration')->findConfiguration();
        $formFieldsMapping = $config->getElementFormFieldsMapping();
        $props = $dm->get('Element')->findDataCustomProperties();
        $customFields = [];

        // Currently only names are exported
        foreach ($props as $key => $prop) {
          if (!isset($basicFields[$prop])) {
            $type = isset($formFieldsMapping[$prop]) ? '-'.$formFieldsMapping[$prop]->type : '';
            $customFields[$prop] = 'gogo-custom' . $type;
          }
        }

        return array_merge($basicFields, $customFields);
    }

    public function getDataSourceIterator()
    {
      $datagrid = $this->getDatagrid();
      $datagrid->buildPager();

      $fields = [];

      foreach ($this->getExportFields() as $key => $field) {
          $label = $this->getTranslationLabel($field, 'export', 'label');
          $transLabel = $this->trans($label);

          // NEXT_MAJOR: Remove this hack, because all field labels will be translated with the major release
          // No translation key exists
          if ($transLabel == $label) {
              $fields[$key] = $field;
          } else {
              $fields[$transLabel] = $field;
          }
      }

      $datagrid->buildPager();
      $query = $datagrid->getQuery();
      return new ElementSourceIterator($query instanceof ProxyQuery ? $query->getQuery() : $query, $fields);
    }
}
