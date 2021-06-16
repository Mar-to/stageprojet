(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin"],{

/***/ "./assets/admin.pack.js":
/*!******************************!*\
  !*** ./assets/admin.pack.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_admin_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/admin.scss */ "./assets/scss/admin.scss");
/* harmony import */ var _scss_admin_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_admin_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_admin_configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/admin/configuration */ "./assets/js/admin/configuration.js");
/* harmony import */ var _js_admin_configuration__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_admin_configuration__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_admin_element_import_element_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/admin/element-import/element-import */ "./assets/js/admin/element-import/element-import.js");
/* harmony import */ var _js_admin_osm_tags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/admin/osm-tags */ "./assets/js/admin/osm-tags.js");
/* harmony import */ var _js_admin_element_edit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/admin/element-edit */ "./assets/js/admin/element-edit.js");
/* harmony import */ var _js_admin_source_priority__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/admin/source-priority */ "./assets/js/admin/source-priority.js");
// Styles
 // Javascript







/***/ }),

/***/ "./assets/js/admin/configuration.js":
/*!******************************************!*\
  !*** ./assets/js/admin/configuration.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

// CONFIGURATION ADMIN, disable the whole feature box according to checkbox "feature active"
document.addEventListener('DOMContentLoaded', function () {
  checkCollaborativeVoteActivated();
  $('.collaborative-feature .sonata-ba-field.sonata-ba-field-inline-natural > .form-group:first-child .icheckbox_square-blue .iCheck-helper').click(checkCollaborativeVoteActivated);
  $('.gogo-feature').each(function () {
    checkGoGoFeatureActivated(this);
  });
  $('.gogo-feature .sonata-ba-field.sonata-ba-field-inline-natural > .form-group:first-child .icheckbox_square-blue .iCheck-helper').click(function () {
    var that = this;
    setTimeout(function () {
      checkGoGoFeatureActivated($(that).closest('.gogo-feature'));
    }, 10);
  });
});

function checkCollaborativeVoteActivated() {
  var collabActive = $('.collaborative-feature .sonata-ba-field.sonata-ba-field-inline-natural > .form-group:first-child .icheckbox_square-blue').hasClass('checked');
  var opacity = collabActive ? '1' : '0.4';
  $('.collaborative-moderation-box').css('opacity', opacity);
}

function checkGoGoFeatureActivated(object) {
  var featureActive = $(object).find('.sonata-ba-field.sonata-ba-field-inline-natural > .form-group:first-child .icheckbox_square-blue').hasClass('checked');
  var opacity = featureActive ? '1' : '0.5';
  $(object).css('opacity', opacity);
}

/***/ }),

/***/ "./assets/js/admin/element-edit.js":
/*!*****************************************!*\
  !*** ./assets/js/admin/element-edit.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_dist_vue_esm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue/dist/vue.esm */ "./node_modules/vue/dist/vue.esm.js");


document.addEventListener('DOMContentLoaded', function () {
  if ($('.element-data-fields').length > 0) {
    new vue_dist_vue_esm__WEBPACK_IMPORTED_MODULE_1__["default"]({
      el: ".element-data-fields",
      data: {
        newFields: [],
        existingProps: existingProps.map(function (prop) {
          return {
            id: prop,
            text: prop
          };
        })
      },
      methods: {
        addField: function addField() {
          this.newFields.push('');
        }
      }
    });
  }
});

/***/ }),

/***/ "./assets/js/admin/element-import/BoundsPicker.vue":
/*!*********************************************************!*\
  !*** ./assets/js/admin/element-import/BoundsPicker.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BoundsPicker_vue_vue_type_template_id_cb95b4f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BoundsPicker.vue?vue&type=template&id=cb95b4f8& */ "./assets/js/admin/element-import/BoundsPicker.vue?vue&type=template&id=cb95b4f8&");
/* harmony import */ var _BoundsPicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoundsPicker.vue?vue&type=script&lang=js& */ "./assets/js/admin/element-import/BoundsPicker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _BoundsPicker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BoundsPicker.vue?vue&type=style&index=0&lang=scss& */ "./assets/js/admin/element-import/BoundsPicker.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BoundsPicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BoundsPicker_vue_vue_type_template_id_cb95b4f8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BoundsPicker_vue_vue_type_template_id_cb95b4f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "assets/js/admin/element-import/BoundsPicker.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./assets/js/admin/element-import/BoundsPicker.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./assets/js/admin/element-import/BoundsPicker.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./BoundsPicker.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/BoundsPicker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./assets/js/admin/element-import/BoundsPicker.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************!*\
  !*** ./assets/js/admin/element-import/BoundsPicker.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader/dist/cjs.js??ref--4-oneOf-1-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/resolve-url-loader??ref--4-oneOf-1-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--4-oneOf-1-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./BoundsPicker.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/BoundsPicker.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./assets/js/admin/element-import/BoundsPicker.vue?vue&type=template&id=cb95b4f8&":
/*!****************************************************************************************!*\
  !*** ./assets/js/admin/element-import/BoundsPicker.vue?vue&type=template&id=cb95b4f8& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_template_id_cb95b4f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./BoundsPicker.vue?vue&type=template&id=cb95b4f8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/BoundsPicker.vue?vue&type=template&id=cb95b4f8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_template_id_cb95b4f8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BoundsPicker_vue_vue_type_template_id_cb95b4f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilder.vue":
/*!************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilder.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OsmQueryBuilder_vue_vue_type_template_id_6781daea_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OsmQueryBuilder.vue?vue&type=template&id=6781daea&scoped=true& */ "./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=template&id=6781daea&scoped=true&");
/* harmony import */ var _OsmQueryBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OsmQueryBuilder.vue?vue&type=script&lang=js& */ "./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _OsmQueryBuilder_vue_vue_type_style_index_0_id_6781daea_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OsmQueryBuilder.vue?vue&type=style&index=0&id=6781daea&lang=scss&scoped=true& */ "./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=style&index=0&id=6781daea&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OsmQueryBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OsmQueryBuilder_vue_vue_type_template_id_6781daea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OsmQueryBuilder_vue_vue_type_template_id_6781daea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6781daea",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "assets/js/admin/element-import/OsmQueryBuilder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmQueryBuilder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=style&index=0&id=6781daea&lang=scss&scoped=true&":
/*!**********************************************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=style&index=0&id=6781daea&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_style_index_0_id_6781daea_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader/dist/cjs.js??ref--4-oneOf-1-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/resolve-url-loader??ref--4-oneOf-1-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--4-oneOf-1-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmQueryBuilder.vue?vue&type=style&index=0&id=6781daea&lang=scss&scoped=true& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=style&index=0&id=6781daea&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_style_index_0_id_6781daea_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_style_index_0_id_6781daea_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_style_index_0_id_6781daea_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_style_index_0_id_6781daea_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=template&id=6781daea&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=template&id=6781daea&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_template_id_6781daea_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmQueryBuilder.vue?vue&type=template&id=6781daea&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=template&id=6781daea&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_template_id_6781daea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilder_vue_vue_type_template_id_6781daea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilderCondition.vue":
/*!*********************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilderCondition.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OsmQueryBuilderCondition_vue_vue_type_template_id_04e62b80___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OsmQueryBuilderCondition.vue?vue&type=template&id=04e62b80& */ "./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=template&id=04e62b80&");
/* harmony import */ var _OsmQueryBuilderCondition_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OsmQueryBuilderCondition.vue?vue&type=script&lang=js& */ "./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OsmQueryBuilderCondition_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OsmQueryBuilderCondition_vue_vue_type_template_id_04e62b80___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OsmQueryBuilderCondition_vue_vue_type_template_id_04e62b80___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "assets/js/admin/element-import/OsmQueryBuilderCondition.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderCondition_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmQueryBuilderCondition.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderCondition_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=template&id=04e62b80&":
/*!****************************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=template&id=04e62b80& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderCondition_vue_vue_type_template_id_04e62b80___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmQueryBuilderCondition.vue?vue&type=template&id=04e62b80& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=template&id=04e62b80&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderCondition_vue_vue_type_template_id_04e62b80___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderCondition_vue_vue_type_template_id_04e62b80___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue":
/*!*********************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OsmQueryBuilderTagSearch_vue_vue_type_template_id_357b0e72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OsmQueryBuilderTagSearch.vue?vue&type=template&id=357b0e72& */ "./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=template&id=357b0e72&");
/* harmony import */ var _OsmQueryBuilderTagSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OsmQueryBuilderTagSearch.vue?vue&type=script&lang=js& */ "./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OsmQueryBuilderTagSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OsmQueryBuilderTagSearch_vue_vue_type_template_id_357b0e72___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OsmQueryBuilderTagSearch_vue_vue_type_template_id_357b0e72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderTagSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmQueryBuilderTagSearch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderTagSearch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=template&id=357b0e72&":
/*!****************************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=template&id=357b0e72& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderTagSearch_vue_vue_type_template_id_357b0e72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmQueryBuilderTagSearch.vue?vue&type=template&id=357b0e72& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=template&id=357b0e72&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderTagSearch_vue_vue_type_template_id_357b0e72___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmQueryBuilderTagSearch_vue_vue_type_template_id_357b0e72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue":
/*!********************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OsmqueryBuilderWikiLink_vue_vue_type_template_id_a92fb356_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OsmqueryBuilderWikiLink.vue?vue&type=template&id=a92fb356&scoped=true& */ "./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=template&id=a92fb356&scoped=true&");
/* harmony import */ var _OsmqueryBuilderWikiLink_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OsmqueryBuilderWikiLink.vue?vue&type=script&lang=js& */ "./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _OsmqueryBuilderWikiLink_vue_vue_type_style_index_0_id_a92fb356_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OsmqueryBuilderWikiLink.vue?vue&type=style&index=0&id=a92fb356&scoped=true&lang=css& */ "./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=style&index=0&id=a92fb356&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OsmqueryBuilderWikiLink_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OsmqueryBuilderWikiLink_vue_vue_type_template_id_a92fb356_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OsmqueryBuilderWikiLink_vue_vue_type_template_id_a92fb356_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "a92fb356",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmqueryBuilderWikiLink.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=style&index=0&id=a92fb356&scoped=true&lang=css&":
/*!*****************************************************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=style&index=0&id=a92fb356&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_1_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_style_index_0_id_a92fb356_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader/dist/cjs.js??ref--1-oneOf-1-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmqueryBuilderWikiLink.vue?vue&type=style&index=0&id=a92fb356&scoped=true&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=style&index=0&id=a92fb356&scoped=true&lang=css&");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_1_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_style_index_0_id_a92fb356_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_1_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_style_index_0_id_a92fb356_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_1_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_style_index_0_id_a92fb356_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_1_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_style_index_0_id_a92fb356_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=template&id=a92fb356&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=template&id=a92fb356&scoped=true& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_template_id_a92fb356_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./OsmqueryBuilderWikiLink.vue?vue&type=template&id=a92fb356&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=template&id=a92fb356&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_template_id_a92fb356_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OsmqueryBuilderWikiLink_vue_vue_type_template_id_a92fb356_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./assets/js/admin/element-import/element-import.js":
/*!**********************************************************!*\
  !*** ./assets/js/admin/element-import/element-import.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _OsmQueryBuilder_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OsmQueryBuilder.vue */ "./assets/js/admin/element-import/OsmQueryBuilder.vue");
/* harmony import */ var vue_dist_vue_esm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue/dist/vue.esm */ "./node_modules/vue/dist/vue.esm.js");


function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



document.addEventListener('DOMContentLoaded', function () {
  if ($('#element-import').length > 0) {
    new vue_dist_vue_esm__WEBPACK_IMPORTED_MODULE_2__["default"]({
      el: "#element-import",
      data: {
        sourceType: undefined,
        url: undefined,
        osmQueriesJson: undefined,
        formName: ""
      },
      computed: {
        osmQueryInputValue: function osmQueryInputValue() {
          if (!this.osmQueriesJson) return "";
          var result = {};
          result.address = this.osmQueriesJson.address;
          result.bounds = this.osmQueriesJson.bounds;
          result.queries = [];

          var _iterator = _createForOfIteratorHelper(this.osmQueriesJson.queries),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var query = _step.value;
              result.queries.push(query.filter(function (condition) {
                return condition.key;
              }));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return JSON.stringify(result);
        }
      },
      components: {
        OsmQueryBuilder: _OsmQueryBuilder_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
      },
      mounted: function mounted() {
        for (var key in importObject) {
          this[key] = importObject[key];
        }

        this.osmQueriesJson = JSON.parse(this.osmQueriesJson);
        this.sourceType = sourceType;
        this.formName = formName;
        $("#sonata-ba-field-container-".concat(formName, "_file")).appendTo('.file-container');
      },
      watch: {
        sourceType: function sourceType(newVal) {
          $('.input-is-synched').closest('.checkbox').toggle(newVal == 'osm');
        }
      }
    });
  }
});

/***/ }),

/***/ "./assets/js/admin/osm-tags.js":
/*!*************************************!*\
  !*** ./assets/js/admin/osm-tags.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_dist_vue_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue/dist/vue.esm */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _element_import_OsmQueryBuilderCondition_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element-import/OsmQueryBuilderCondition.vue */ "./assets/js/admin/element-import/OsmQueryBuilderCondition.vue");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



document.addEventListener('DOMContentLoaded', function () {
  if ($('.osm-tags-field').length > 0) {
    new vue_dist_vue_esm__WEBPACK_IMPORTED_MODULE_0__["default"]({
      el: ".osm-tags-field",
      data: {
        formName: undefined,
        tags: []
      },
      computed: {
        stringifiedTagsHash: function stringifiedTagsHash() {
          var result = {};

          var _iterator = _createForOfIteratorHelper(this.tags),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var tag = _step.value;
              if (tag.key && tag.value) result[tag.key] = tag.value;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return JSON.stringify(result);
        }
      },
      components: {
        OsmCondition: _element_import_OsmQueryBuilderCondition_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
      },
      mounted: function mounted() {
        this.formName = formName;
        console.log(importObject, importObject.osmTags);

        for (var key in importObject.osmTags) {
          this.tags.push({
            key: key,
            value: importObject.osmTags[key]
          });
        }
      }
    });
  }
});

/***/ }),

/***/ "./assets/js/admin/source-priority.js":
/*!********************************************!*\
  !*** ./assets/js/admin/source-priority.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_dist_vue_esm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue/dist/vue.esm */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");




vue_dist_vue_esm__WEBPACK_IMPORTED_MODULE_2__["default"].directive('sortable', {
  inserted: function inserted(el, binding) {
    new sortablejs__WEBPACK_IMPORTED_MODULE_3__["default"](el, binding.value || {});
  }
});
document.addEventListener('DOMContentLoaded', function () {
  if ($('.source-priority-container').length > 0) {
    new vue_dist_vue_esm__WEBPACK_IMPORTED_MODULE_2__["default"]({
      el: ".source-priority-container",
      data: {
        list: undefined,
        value: undefined
      },
      mounted: function mounted() {
        this.list = sourceList;
        this.value = this.list.join(',');
      },
      methods: {
        onUpdate: function onUpdate(event) {
          this.list.splice(event.newIndex, 0, this.list.splice(event.oldIndex, 1)[0]);
          this.value = this.list.join(',');
        },
        textFrom: function textFrom(item) {
          return item ? item : "Cette Carte";
        }
      }
    });
  }
});

/***/ }),

/***/ "./assets/scss/admin.scss":
/*!********************************!*\
  !*** ./assets/scss/admin.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/BoundsPicker.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/BoundsPicker.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./node_modules/leaflet/dist/leaflet.css");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var leaflet_shades__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! leaflet-shades */ "./node_modules/leaflet-shades/src/js/index.js");
/* harmony import */ var leaflet_shades__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(leaflet_shades__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var leaflet_shades_src_css_leaflet_shades_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! leaflet-shades/src/css/leaflet-shades.css */ "./node_modules/leaflet-shades/src/css/leaflet-shades.css");
/* harmony import */ var leaflet_shades_src_css_leaflet_shades_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(leaflet_shades_src_css_leaflet_shades_css__WEBPACK_IMPORTED_MODULE_5__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['osmQueryObject', 'tileLayer', 'defaultBounds'],
  data: function data() {
    return {
      queryType: null,
      // either 'address' or 'bounds'
      inputAddress: undefined,
      geocodedAddress: {},
      geocodeErrorMsg: '',
      mapBounds: null,
      drawnBounds: null,
      // drawn bounds by user with leaflet-shades
      map: undefined,
      currentLayers: undefined,
      mapShades: undefined
    };
  },
  computed: {
    bounds: function bounds() {
      // if (this.addressPresent) return null
      return this.queryType == 'bounds' && this.drawnBounds ? this.drawnBounds : this.mapBounds;
    },
    address: function address() {
      if (this.queryType == 'address' && this.geocodedAddress && this.geocodedAddress.osm_id) return this.inputAddress;else return null;
    },
    // builds the geographical part of the overpass query
    overpassQuery: function overpassQuery() {
      if (this.address) {
        var areaRef = 1 * this.geocodedAddress.osm_id;
        if (this.geocodedAddress.osm_type == "way") areaRef += 2400000000;
        if (this.geocodedAddress.osm_type == "relation") areaRef += 3600000000;
        return "(area:".concat(areaRef, ")");
      } else {
        var b = this.bounds;
        return "(".concat(b.getSouth(), ",").concat(b.getWest(), ",").concat(b.getNorth(), ",").concat(b.getEast(), ")");
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    // Init map
    this.map = leaflet__WEBPACK_IMPORTED_MODULE_2__["map"](this.$refs.map, {
      editable: true
    });
    leaflet__WEBPACK_IMPORTED_MODULE_2__["tileLayer"](this.tileLayer).addTo(this.map);
    this.map.on('moveend', function () {
      return _this.mapBounds = _this.map.getBounds();
    });
    this.currentLayers = new leaflet__WEBPACK_IMPORTED_MODULE_2__["layerGroup"]();
    this.currentLayers.addTo(this.map); // Initialise state from saved osmQueryObject

    var initialBounds = this.defaultBounds;

    if (this.osmQueryObject && this.osmQueryObject.address) {
      this.inputAddress = this.osmQueryObject.address;
      this.geocodeAddress();
      this.queryType = 'address';
    } else if (this.osmQueryObject && this.osmQueryObject.bounds) {
      initialBounds = new leaflet__WEBPACK_IMPORTED_MODULE_2__["latLngBounds"](this.osmQueryObject.bounds);
      this.drawnBounds = initialBounds;
      this.queryType = 'bounds';
    } // Init map position


    this.map.fitBounds(initialBounds);
    this.mapBounds = this.map.getBounds();
  },
  watch: {
    // When switching query type we need to turn on/off leaflet shades plugin
    queryType: function queryType() {
      var _this2 = this;

      if (this.mapShades) {
        this.mapShades.onRemove(this.map); // See https://github.com/mkong0216/leaflet-shades/issues/3

        this.mapShades = null;
      }

      this.currentLayers.clearLayers();

      if (this.queryType == 'bounds') {
        if (this.drawnBounds) {
          var rect = leaflet__WEBPACK_IMPORTED_MODULE_2__["rectangle"](this.drawnBounds);
          this.currentLayers.addLayer(rect);
          rect.enableEdit();
        } else {
          this.currentLayers.addLayer(this.map.editTools.startRectangle());
        } // Init shades


        this.mapShades = new leaflet__WEBPACK_IMPORTED_MODULE_2__["LeafletShades"]();
        this.mapShades.addTo(this.map);
        this.mapShades.on('shades:bounds-changed', function (event) {
          _this2.drawnBounds = event.bounds;
        });
      }
    }
  },
  methods: {
    geocodeAddress: function geocodeAddress() {
      var _this3 = this;

      if (!this.inputAddress) {
        this.geocodeErrorMsg = "Veuillez entrer une adresse";
        return;
      }

      var url = "https://nominatim.openstreetmap.org/search.php?q=".concat(this.inputAddress, "&polygon_geojson=1&format=jsonv2");
      $.getJSON(url, function (results) {
        if (!results || results.length == 0) {
          _this3.geocodeErrorMsg = "Aucune r\xE9sultat trouv\xE9 pour ".concat(_this3.inputAddress);
          return;
        }

        _this3.geocodeErrorMsg = '';

        _this3.currentLayers.clearLayers();

        _this3.geocodedAddress = results[0];
        var layer = leaflet__WEBPACK_IMPORTED_MODULE_2__["geoJSON"](_this3.geocodedAddress.geojson, {
          style: function style(feature) {
            color: 'blue';
          }
        });

        _this3.currentLayers.addLayer(layer);

        _this3.map.fitBounds(layer.getBounds());
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _OsmQueryBuilderCondition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OsmQueryBuilderCondition */ "./assets/js/admin/element-import/OsmQueryBuilderCondition.vue");
/* harmony import */ var _OsmQueryBuilderTagSearch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OsmQueryBuilderTagSearch */ "./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue");
/* harmony import */ var _BoundsPicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BoundsPicker */ "./assets/js/admin/element-import/BoundsPicker.vue");




function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['osmQueryObject', 'tileLayer', 'defaultBounds'],
  components: {
    OsmCondition: _OsmQueryBuilderCondition__WEBPACK_IMPORTED_MODULE_3__["default"],
    OsmTagSearch: _OsmQueryBuilderTagSearch__WEBPACK_IMPORTED_MODULE_4__["default"],
    BoundsPicker: _BoundsPicker__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  data: function data() {
    return {
      queries: []
    };
  },
  computed: {
    // Transform queries array into an Overpass query
    overpassQuery: function overpassQuery() {
      var result = '';

      var _iterator = _createForOfIteratorHelper(this.queries),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var query = _step.value;
          var queryString = '';

          var _iterator2 = _createForOfIteratorHelper(query),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var condition = _step2.value;

              if (condition.operator == "" || condition.operator == "!") {
                queryString += "[".concat(condition.operator, "\"").concat(condition.key, "\"]");
              } else if (condition.value) {
                var value = condition.value.replace(/,/g, '|'); // transform multi input into reg expr

                queryString += "[\"".concat(condition.key, "\"").concat(condition.operator, "\"").concat(value, "\"]");
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          queryString += this.$refs.boundsPicker.overpassQuery;
          if (query != '') result += "node".concat(queryString, ";way").concat(queryString, ";relation").concat(queryString, ";");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;
    },
    overpassApiUrl: function overpassApiUrl() {
      // out meta provide extra data, out center provide center of way or relation
      return "https://overpass-api.de/api/interpreter?data=[out:json][timeout:1000];(".concat(this.overpassQuery, ");out%20meta%20center;");
    }
  },
  watch: {
    overpassApiUrl: function overpassApiUrl(url) {
      this.$emit('osm-url-changed', url);
      this.$emit('update:osmQueryObject', {
        queries: this.queries,
        bounds: [this.$refs.boundsPicker.bounds.getSouthWest(), this.$refs.boundsPicker.bounds.getNorthEast()],
        address: this.$refs.boundsPicker.address
      });
    }
  },
  mounted: function mounted() {
    if (this.osmQueryObject && this.osmQueryObject.queries) this.queries = this.osmQueryObject.queries;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _OsmqueryBuilderWikiLink__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./OsmqueryBuilderWikiLink */ "./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue");








function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['condition'],
  components: {
    OsmWikiLink: _OsmqueryBuilderWikiLink__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  data: function data() {
    return {
      prevalentValues: []
    };
  },
  computed: {
    operator: function operator() {
      return this.condition.operator;
    },
    isMultipleCondition: function isMultipleCondition() {
      return this.operator && this.operator.includes('~');
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.condition.key) {
      // get prevalentValues using first result, i.e. perfect match
      $.getJSON(this.keyInfoUrl(this.condition.key), function (response) {
        if (response.data.length > 0) {
          _this.prevalentValues = response.data[0].prevalent_values;

          _this.initInputValue();
        }
      });
    } else {
      this.initSearchKeyInput();
    }
  },
  watch: {
    operator: function operator(newVal, oldVal) {
      var newValIsArray = newVal && newVal.includes('~');
      var oldValIsArray = oldVal && oldVal.includes('~');

      if (newValIsArray != oldValIsArray) {
        if (!newValIsArray && this.condition.value) {
          // transform array value to single value
          this.condition.value = this.condition.value.split(',')[0];
          $(this.$refs.inputValue).val(this.condition.value).trigger('change'); // needed for select2 to be updated
        }

        this.initInputValue();
      }
    }
  },
  methods: {
    keyInfoUrl: function keyInfoUrl(key) {
      return "https://taginfo.openstreetmap.org/api/4/keys/all?query=".concat(key, "&include=prevalent_values&sortname=count_all&sortorder=desc&page=1&rp=20&qtype=key&format=json_pretty");
    },
    initSearchKeyInput: function initSearchKeyInput() {
      var _this2 = this;

      $(this.$refs.inputKey).select2({
        minimumInputLength: 2,
        ajax: {
          url: function url(term) {
            return _this2.keyInfoUrl(term);
          },
          dataType: 'json',
          processResults: function processResults(response) {
            return {
              results: response.data
            };
          }
        },
        id: function id(item) {
          return item.key;
        },
        formatResult: function formatResult(item) {
          return item.key;
        },
        formatSelection: function formatSelection(item) {
          return _this2.onKeySelectedFromSearchResults(item);
        }
      });
    },
    onKeySelectedFromSearchResults: function onKeySelectedFromSearchResults(item) {
      this.prevalentValues = item.prevalent_values;
      this.initInputValue();
      this.condition.key = item.key;
      return item.key;
    },
    initInputValue: function initInputValue() {
      var _this3 = this;

      var data = this.prevalentValues;

      if (this.condition.value) {
        if (this.isMultipleCondition) {
          var _iterator = _createForOfIteratorHelper(this.condition.value.split(',')),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var value = _step.value;
              data.unshift({
                value: value
              });
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          data.unshift({
            value: this.condition.value
          });
        }
      } // Format to select2 style


      data = data.map(function (v) {
        return {
          id: v.value,
          text: v.value.charAt(0).toUpperCase() + v.value.slice(1)
        };
      }); // Init Value Input from prevalent values

      $(this.$refs.inputValue).select2({
        createSearchChoice: function createSearchChoice(term, data) {
          if ($(data).filter(function () {
            return this.text.localeCompare(term) === 0;
          }).length === 0) {
            return {
              id: term,
              text: term
            };
          }
        },
        multiple: this.isMultipleCondition,
        data: data
      }).on('change', function () {
        _this3.condition.value = $(_this3.$refs.inputValue).val();
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_4__);






function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var _this = this;

    $('.tag-search').select2({
      minimumInputLength: 2,
      ajax: {
        url: function url(term) {
          return "https://tagfinder.herokuapp.com/api/search?query=".concat(term);
        },
        dataType: 'json',
        processResults: function processResults(data) {
          return {
            results: data
          };
        }
      },
      id: function id(item) {
        return item.subject;
      },
      formatResult: function formatResult(item) {
        return "<b>".concat(item.prefLabel, "</b> : ").concat(item.scopeNote.en);
      },
      formatSelection: function formatSelection(item) {
        var query = [];
        if (item.isTag) query.push({
          key: item.prefLabel.split('=')[0],
          operator: '=',
          value: item.prefLabel.split('=')[1]
        });else query.push({
          key: item.prefLabel,
          operator: '=',
          value: ''
        });
        var combinesTags = {};

        var _iterator = _createForOfIteratorHelper(item.combines),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var combine = _step.value;
            var combineKey = combine.label.split('=')[0];
            var combineValue = combine.label.split('=')[1]; // Ignore some keys not used for filtering

            if (['name', 'website', 'wikipedia', 'opening_hours'].includes(combineKey)) continue;
            if (combinesTags[combineKey]) combinesTags[combineKey] += ",".concat(combineValue);else combinesTags[combineKey] = combineValue;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        for (var key in combinesTags) {
          var value = combinesTags[key];
          if (value == '*') query.push({
            key: key,
            operator: '',
            value: ''
          });else query.push({
            key: key,
            operator: value.includes(',') ? '~' : '=',
            value: value
          });
        }

        _this.$parent.queries.push(query);

        return null;
      }
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);

//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['condition'],
  computed: {
    isTag: function isTag() {
      if (this.condition.key && this.condition.operator == '=' && this.condition.value) return true;
      return false;
    },
    url: function url() {
      if (this.isTag) {
        return "https://wiki.openstreetmap.org/wiki/Tag:".concat(this.tag);
      } else {
        return "https://wiki.openstreetmap.org/wiki/Key:".concat(this.condition.key);
      }
    },
    tag: function tag() {
      return "".concat(this.condition.key, "=").concat(this.condition.value);
    },
    title: function title() {
      return "Lien vers la fiche Wiki de \"".concat(this.isTag ? this.tag : this.condition.key, "\"");
    }
  }
});

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/BoundsPicker.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--4-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader??ref--4-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--4-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/BoundsPicker.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=style&index=0&id=6781daea&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--4-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader??ref--4-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--4-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=style&index=0&id=6781daea&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=style&index=0&id=a92fb356&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--1-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=style&index=0&id=a92fb356&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/BoundsPicker.vue?vue&type=template&id=cb95b4f8&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/BoundsPicker.vue?vue&type=template&id=cb95b4f8& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "bounds-picker-container" }, [
    _c("label", [_vm._v("Zone Géographique de la requete")]),
    _vm._v(" "),
    _c("div", { staticClass: "input-group" }, [
      _c("span", { staticClass: "input-group-btn" }, [
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.queryType,
                expression: "queryType"
              }
            ],
            staticClass: "form-control",
            staticStyle: { width: "auto" },
            attrs: { "data-sonata-select2": "false" },
            on: {
              change: function($event) {
                var $$selectedVal = Array.prototype.filter
                  .call($event.target.options, function(o) {
                    return o.selected
                  })
                  .map(function(o) {
                    var val = "_value" in o ? o._value : o.value
                    return val
                  })
                _vm.queryType = $event.target.multiple
                  ? $$selectedVal
                  : $$selectedVal[0]
              }
            }
          },
          [
            _c("option", { attrs: { value: "address" } }, [
              _vm._v("Chercher par adresse")
            ]),
            _vm._v(" "),
            _c("option", { attrs: { value: "bounds" } }, [
              _vm._v("Dessiner un rectangle sur la carte")
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.inputAddress,
            expression: "inputAddress"
          }
        ],
        ref: "inputAddress",
        staticClass: "form-control",
        attrs: {
          disabled: _vm.queryType != "address",
          placeholder: "Une ville, une région, un pays..."
        },
        domProps: { value: _vm.inputAddress },
        on: {
          keypress: function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            $event.preventDefault()
            return _vm.geocodeAddress($event)
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.inputAddress = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c("span", { staticClass: "input-group-btn" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-primary",
            attrs: { type: "button", disabled: _vm.queryType != "address" },
            on: { click: _vm.geocodeAddress }
          },
          [_vm._v("\n                Chercher\n            ")]
        )
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.geocodeErrorMsg,
            expression: "geocodeErrorMsg"
          }
        ],
        staticClass: "alert alert-danger"
      },
      [_vm._v(_vm._s(_vm.geocodeErrorMsg))]
    ),
    _vm._v(" "),
    _c("div", { ref: "map", staticClass: "bounds-picker-map" })
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=template&id=6781daea&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmQueryBuilder.vue?vue&type=template&id=6781daea&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "osm-query-builder" },
    [
      _c("label", [_vm._v("Liste des requêtes dans la base OpenStreetMap")]),
      _vm._v(" "),
      _c("osm-tag-search"),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-default",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              return _vm.queries.push([{ key: "", operator: "=", value: "" }])
            }
          }
        },
        [_vm._v("\n        Ou ajouter une requête manuellement\n    ")]
      ),
      _vm._v(" "),
      _vm._l(_vm.queries, function(query, queryIndex) {
        return _c(
          "div",
          { key: queryIndex, staticClass: "bs-callout" },
          [
            _c(
              "button",
              {
                staticClass: "btn btn-default remove-query btn-icon",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.queries.splice(queryIndex, 1)
                  }
                }
              },
              [_c("i", { staticClass: "fa fa-trash" })]
            ),
            _vm._v(" "),
            _vm._l(query, function(condition, conditionIndex) {
              return _c(
                "div",
                { key: conditionIndex, staticClass: "condition-container" },
                [
                  _c("osm-condition", {
                    key: "Query" + queryIndex,
                    attrs: { condition: condition }
                  }),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default btn-icon remove-condition",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return query.splice(conditionIndex, 1)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fa fa-trash remove-condition" })]
                  )
                ],
                1
              )
            }),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-default btn-add-condition btn-sm",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return query.push({ key: "", operator: "=", value: "" })
                  }
                }
              },
              [_vm._v("Ajouter une condition")]
            )
          ],
          2
        )
      }),
      _vm._v(" "),
      _c("bounds-picker", {
        ref: "boundsPicker",
        attrs: {
          "osm-query-object": _vm.osmQueryObject,
          tileLayer: _vm.tileLayer,
          "default-bounds": _vm.defaultBounds
        }
      }),
      _vm._v(" "),
      _c(
        "label",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.overpassQuery,
              expression: "overpassQuery"
            }
          ]
        },
        [
          _vm._v(
            "Code automatiquement généré pour la requête OpenStreetMap (via OverPass)"
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "pre",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.overpassQuery,
              expression: "overpassQuery"
            }
          ]
        },
        [_vm._v(_vm._s(_vm.overpassQuery))]
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=template&id=04e62b80&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmQueryBuilderCondition.vue?vue&type=template&id=04e62b80& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "condition" },
    [
      _c("osm-wiki-link", {
        ref: "wikiLink",
        attrs: { condition: _vm.condition }
      }),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.condition.key,
            expression: "condition.key"
          }
        ],
        ref: "inputKey",
        staticClass: "form-control",
        attrs: { type: "text", placeholder: "Chercher une clé" },
        domProps: { value: _vm.condition.key },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.$set(_vm.condition, "key", $event.target.value)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.condition.operator,
              expression: "condition.operator"
            }
          ],
          ref: "selectOperator",
          staticClass: "condition-operator form-control",
          attrs: {
            "data-sonata-select2": "false",
            placeholder: "Condition..."
          },
          on: {
            change: function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.$set(
                _vm.condition,
                "operator",
                $event.target.multiple ? $$selectedVal : $$selectedVal[0]
              )
            }
          }
        },
        [
          _c("option", { attrs: { value: "" } }, [_vm._v("Existe")]),
          _vm._v(" "),
          _c("option", { attrs: { value: "!" } }, [_vm._v("N'existe pas")]),
          _vm._v(" "),
          _c("option", { attrs: { value: "=" } }, [_vm._v("Est égal à")]),
          _vm._v(" "),
          _c("option", { attrs: { value: "!=" } }, [_vm._v("Différent de")]),
          _vm._v(" "),
          _c("option", { attrs: { value: "~" } }, [
            _vm._v("Est l'une des valeurs")
          ]),
          _vm._v(" "),
          _c("option", { attrs: { value: "!~" } }, [
            _vm._v("N'est aucune des valeurs")
          ])
        ]
      ),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.condition.value,
            expression: "condition.value"
          }
        ],
        ref: "inputValue",
        staticClass: "form-control",
        attrs: { disabled: ["", "!"].includes(_vm.condition.operator) },
        domProps: { value: _vm.condition.value },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.$set(_vm.condition, "value", $event.target.value)
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=template&id=357b0e72&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmQueryBuilderTagSearch.vue?vue&type=template&id=357b0e72& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _c("input", {
        staticClass: "form-control tag-search",
        attrs: {
          type: "text",
          placeholder:
            "Recherche rapide dans OpenSteetMap en Anglais (restaurant, organic, second hand...)"
        }
      })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=template&id=a92fb356&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./assets/js/admin/element-import/OsmqueryBuilderWikiLink.vue?vue&type=template&id=a92fb356&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.condition.key
    ? _c(
        "a",
        {
          staticClass: "btn btn-default btn-icon",
          attrs: { href: _vm.url, target: "_blank", title: _vm.title }
        },
        [
          _c("i", {
            staticClass:
              "fa fa-external-link-square fas fa-external-link-square-alt"
          })
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ })

},[["./assets/admin.pack.js","runtime","vendors~admin"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4ucGFjay5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vY29uZmlndXJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1lZGl0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Cb3VuZHNQaWNrZXIudnVlIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Cb3VuZHNQaWNrZXIudnVlPzVhNzgiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L0JvdW5kc1BpY2tlci52dWU/ZjI0NyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvQm91bmRzUGlja2VyLnZ1ZT9hYjA1Iiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21RdWVyeUJ1aWxkZXIudnVlIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21RdWVyeUJ1aWxkZXIudnVlP2JlYzYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L09zbVF1ZXJ5QnVpbGRlci52dWU/YzQ1ZiIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtUXVlcnlCdWlsZGVyLnZ1ZT81ZTBmIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21RdWVyeUJ1aWxkZXJDb25kaXRpb24udnVlIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21RdWVyeUJ1aWxkZXJDb25kaXRpb24udnVlPzIyMTYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L09zbVF1ZXJ5QnVpbGRlckNvbmRpdGlvbi52dWU/ZDNjNSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtUXVlcnlCdWlsZGVyVGFnU2VhcmNoLnZ1ZSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtUXVlcnlCdWlsZGVyVGFnU2VhcmNoLnZ1ZT82MGQ2Iiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21RdWVyeUJ1aWxkZXJUYWdTZWFyY2gudnVlPzE3ZDkiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L09zbXF1ZXJ5QnVpbGRlcldpa2lMaW5rLnZ1ZSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtcXVlcnlCdWlsZGVyV2lraUxpbmsudnVlPzAyMTgiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L09zbXF1ZXJ5QnVpbGRlcldpa2lMaW5rLnZ1ZT9mMGIzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21xdWVyeUJ1aWxkZXJXaWtpTGluay52dWU/YjhhZiIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvZWxlbWVudC1pbXBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FkbWluL29zbS10YWdzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9zb3VyY2UtcHJpb3JpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvYWRtaW4uc2NzcyIsIndlYnBhY2s6Ly8vYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L0JvdW5kc1BpY2tlci52dWUiLCJ3ZWJwYWNrOi8vL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21RdWVyeUJ1aWxkZXIudnVlIiwid2VicGFjazovLy9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtUXVlcnlCdWlsZGVyQ29uZGl0aW9uLnZ1ZSIsIndlYnBhY2s6Ly8vYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L09zbVF1ZXJ5QnVpbGRlclRhZ1NlYXJjaC52dWUiLCJ3ZWJwYWNrOi8vL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21xdWVyeUJ1aWxkZXJXaWtpTGluay52dWUiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L0JvdW5kc1BpY2tlci52dWU/OThhYyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtUXVlcnlCdWlsZGVyLnZ1ZT84ZTRiIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21xdWVyeUJ1aWxkZXJXaWtpTGluay52dWU/Njk0ZiIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvQm91bmRzUGlja2VyLnZ1ZT9iODM2Iiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21RdWVyeUJ1aWxkZXIudnVlPzhhMmMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L09zbVF1ZXJ5QnVpbGRlckNvbmRpdGlvbi52dWU/NTY2YiIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtUXVlcnlCdWlsZGVyVGFnU2VhcmNoLnZ1ZT8zOGFjIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Pc21xdWVyeUJ1aWxkZXJXaWtpTGluay52dWU/YmFmYyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjaGVja0NvbGxhYm9yYXRpdmVWb3RlQWN0aXZhdGVkIiwiJCIsImNsaWNrIiwiZWFjaCIsImNoZWNrR29Hb0ZlYXR1cmVBY3RpdmF0ZWQiLCJ0aGF0Iiwic2V0VGltZW91dCIsImNsb3Nlc3QiLCJjb2xsYWJBY3RpdmUiLCJoYXNDbGFzcyIsIm9wYWNpdHkiLCJjc3MiLCJvYmplY3QiLCJmZWF0dXJlQWN0aXZlIiwiZmluZCIsImxlbmd0aCIsIlZ1ZSIsImVsIiwiZGF0YSIsIm5ld0ZpZWxkcyIsImV4aXN0aW5nUHJvcHMiLCJtYXAiLCJwcm9wIiwiaWQiLCJ0ZXh0IiwibWV0aG9kcyIsImFkZEZpZWxkIiwicHVzaCIsInNvdXJjZVR5cGUiLCJ1bmRlZmluZWQiLCJ1cmwiLCJvc21RdWVyaWVzSnNvbiIsImZvcm1OYW1lIiwiY29tcHV0ZWQiLCJvc21RdWVyeUlucHV0VmFsdWUiLCJyZXN1bHQiLCJhZGRyZXNzIiwiYm91bmRzIiwicXVlcmllcyIsInF1ZXJ5IiwiZmlsdGVyIiwiY29uZGl0aW9uIiwia2V5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbXBvbmVudHMiLCJPc21RdWVyeUJ1aWxkZXIiLCJtb3VudGVkIiwiaW1wb3J0T2JqZWN0IiwicGFyc2UiLCJhcHBlbmRUbyIsIndhdGNoIiwibmV3VmFsIiwidG9nZ2xlIiwidGFncyIsInN0cmluZ2lmaWVkVGFnc0hhc2giLCJ0YWciLCJ2YWx1ZSIsIk9zbUNvbmRpdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJvc21UYWdzIiwiZGlyZWN0aXZlIiwiaW5zZXJ0ZWQiLCJiaW5kaW5nIiwiU29ydGFibGUiLCJsaXN0Iiwic291cmNlTGlzdCIsImpvaW4iLCJvblVwZGF0ZSIsImV2ZW50Iiwic3BsaWNlIiwibmV3SW5kZXgiLCJvbGRJbmRleCIsInRleHRGcm9tIiwiaXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0NBR0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBQSxRQUFRLENBQUNDLGdCQUFULENB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFkbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4vc2Nzcy9hZG1pbi5zY3NzJ1xuXG4vLyBKYXZhc2NyaXB0XG5pbXBvcnQgJy4vanMvYWRtaW4vY29uZmlndXJhdGlvbidcbmltcG9ydCAnLi9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9lbGVtZW50LWltcG9ydCdcbmltcG9ydCAnLi9qcy9hZG1pbi9vc20tdGFncydcbmltcG9ydCAnLi9qcy9hZG1pbi9lbGVtZW50LWVkaXQnXG5pbXBvcnQgJy4vanMvYWRtaW4vc291cmNlLXByaW9yaXR5J1xuIiwiLy8gQ09ORklHVVJBVElPTiBBRE1JTiwgZGlzYWJsZSB0aGUgd2hvbGUgZmVhdHVyZSBib3ggYWNjb3JkaW5nIHRvIGNoZWNrYm94IFwiZmVhdHVyZSBhY3RpdmVcIlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGNoZWNrQ29sbGFib3JhdGl2ZVZvdGVBY3RpdmF0ZWQoKTtcbiAgICAkKCcuY29sbGFib3JhdGl2ZS1mZWF0dXJlIC5zb25hdGEtYmEtZmllbGQuc29uYXRhLWJhLWZpZWxkLWlubGluZS1uYXR1cmFsID4gLmZvcm0tZ3JvdXA6Zmlyc3QtY2hpbGQgLmljaGVja2JveF9zcXVhcmUtYmx1ZSAuaUNoZWNrLWhlbHBlcicpLmNsaWNrKGNoZWNrQ29sbGFib3JhdGl2ZVZvdGVBY3RpdmF0ZWQpO1xuXG4gICAgJCgnLmdvZ28tZmVhdHVyZScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGNoZWNrR29Hb0ZlYXR1cmVBY3RpdmF0ZWQodGhpcyk7XG4gICAgfSk7XG4gICAgJCgnLmdvZ28tZmVhdHVyZSAuc29uYXRhLWJhLWZpZWxkLnNvbmF0YS1iYS1maWVsZC1pbmxpbmUtbmF0dXJhbCA+IC5mb3JtLWdyb3VwOmZpcnN0LWNoaWxkIC5pY2hlY2tib3hfc3F1YXJlLWJsdWUgLmlDaGVjay1oZWxwZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjaGVja0dvR29GZWF0dXJlQWN0aXZhdGVkKCQodGhhdCkuY2xvc2VzdCgnLmdvZ28tZmVhdHVyZScpKTsgwqB9LCAxMCk7XG4gICAgfSk7XG59KTtcblxuZnVuY3Rpb24gY2hlY2tDb2xsYWJvcmF0aXZlVm90ZUFjdGl2YXRlZCgpIHtcbiAgICB2YXIgY29sbGFiQWN0aXZlID0gJCgnLmNvbGxhYm9yYXRpdmUtZmVhdHVyZSAuc29uYXRhLWJhLWZpZWxkLnNvbmF0YS1iYS1maWVsZC1pbmxpbmUtbmF0dXJhbCA+IC5mb3JtLWdyb3VwOmZpcnN0LWNoaWxkIC5pY2hlY2tib3hfc3F1YXJlLWJsdWUnKS5oYXNDbGFzcygnY2hlY2tlZCcpO1xuICAgIHZhciBvcGFjaXR5ID0gY29sbGFiQWN0aXZlID8gJzEnIDogJzAuNCc7XG4gICAgJCgnLmNvbGxhYm9yYXRpdmUtbW9kZXJhdGlvbi1ib3gnKS5jc3MoJ29wYWNpdHknLCBvcGFjaXR5KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tHb0dvRmVhdHVyZUFjdGl2YXRlZChvYmplY3QpIHtcbiAgICB2YXIgZmVhdHVyZUFjdGl2ZSA9ICQob2JqZWN0KS5maW5kKCcuc29uYXRhLWJhLWZpZWxkLnNvbmF0YS1iYS1maWVsZC1pbmxpbmUtbmF0dXJhbCA+IC5mb3JtLWdyb3VwOmZpcnN0LWNoaWxkIC5pY2hlY2tib3hfc3F1YXJlLWJsdWUnKS5oYXNDbGFzcygnY2hlY2tlZCcpO1xuICAgIHZhciBvcGFjaXR5ID0gZmVhdHVyZUFjdGl2ZSA/ICcxJyA6ICcwLjUnO1xuICAgICQob2JqZWN0KS5jc3MoJ29wYWNpdHknLCBvcGFjaXR5KTtcbn0iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZS9kaXN0L3Z1ZS5lc20nXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoJCgnLmVsZW1lbnQtZGF0YS1maWVsZHMnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ldyBWdWUoe1xuICAgICAgICAgICAgZWw6IFwiLmVsZW1lbnQtZGF0YS1maWVsZHNcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBuZXdGaWVsZHM6IFtdLFxuICAgICAgICAgICAgICAgIGV4aXN0aW5nUHJvcHM6IGV4aXN0aW5nUHJvcHMubWFwKCBwcm9wID0+IHsgcmV0dXJuIHtpZDogcHJvcCwgdGV4dDogcHJvcH0gfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICAgICAgYWRkRmllbGQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3RmllbGRzLnB1c2goJycpICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICB9XG59KSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQm91bmRzUGlja2VyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1jYjk1YjRmOCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Cb3VuZHNQaWNrZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Cb3VuZHNQaWNrZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0JvdW5kc1BpY2tlci52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9ob21lL3VzZXIvQnVyZWF1L2luY2gvc3RhZ2Vwcm9qZXQvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnY2I5NWI0ZjgnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnY2I5NWI0ZjgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnY2I5NWI0ZjgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0JvdW5kc1BpY2tlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Y2I5NWI0ZjgmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignY2I5NWI0ZjgnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImFzc2V0cy9qcy9hZG1pbi9lbGVtZW50LWltcG9ydC9Cb3VuZHNQaWNrZXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Cb3VuZHNQaWNrZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0JvdW5kc1BpY2tlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNC1vbmVPZi0xLTEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanM/P3JlZi0tNC1vbmVPZi0xLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTQtb25lT2YtMS0zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQm91bmRzUGlja2VyLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9c2NzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Cb3VuZHNQaWNrZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWNiOTViNGY4JlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Pc21RdWVyeUJ1aWxkZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTY3ODFkYWVhJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL09zbVF1ZXJ5QnVpbGRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL09zbVF1ZXJ5QnVpbGRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vT3NtUXVlcnlCdWlsZGVyLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTY3ODFkYWVhJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNjc4MWRhZWFcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvaG9tZS91c2VyL0J1cmVhdS9pbmNoL3N0YWdlcHJvamV0L25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzY3ODFkYWVhJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzY3ODFkYWVhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzY3ODFkYWVhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Pc21RdWVyeUJ1aWxkZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTY3ODFkYWVhJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzY3ODFkYWVhJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJhc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtUXVlcnlCdWlsZGVyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vT3NtUXVlcnlCdWlsZGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Pc21RdWVyeUJ1aWxkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTQtb25lT2YtMS0xIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtb25lT2YtMS0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS00LW9uZU9mLTEtMyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL09zbVF1ZXJ5QnVpbGRlci52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD02NzgxZGFlYSZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vT3NtUXVlcnlCdWlsZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02NzgxZGFlYSZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vT3NtUXVlcnlCdWlsZGVyQ29uZGl0aW9uLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wNGU2MmI4MCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Pc21RdWVyeUJ1aWxkZXJDb25kaXRpb24udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Pc21RdWVyeUJ1aWxkZXJDb25kaXRpb24udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvaG9tZS91c2VyL0J1cmVhdS9pbmNoL3N0YWdlcHJvamV0L25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzA0ZTYyYjgwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzA0ZTYyYjgwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzA0ZTYyYjgwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Pc21RdWVyeUJ1aWxkZXJDb25kaXRpb24udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA0ZTYyYjgwJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzA0ZTYyYjgwJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJhc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtUXVlcnlCdWlsZGVyQ29uZGl0aW9uLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vT3NtUXVlcnlCdWlsZGVyQ29uZGl0aW9uLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Pc21RdWVyeUJ1aWxkZXJDb25kaXRpb24udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL09zbVF1ZXJ5QnVpbGRlckNvbmRpdGlvbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDRlNjJiODAmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL09zbVF1ZXJ5QnVpbGRlclRhZ1NlYXJjaC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzU3YjBlNzImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vT3NtUXVlcnlCdWlsZGVyVGFnU2VhcmNoLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vT3NtUXVlcnlCdWlsZGVyVGFnU2VhcmNoLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL2hvbWUvdXNlci9CdXJlYXUvaW5jaC9zdGFnZXByb2pldC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCczNTdiMGU3MicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCczNTdiMGU3MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCczNTdiMGU3MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vT3NtUXVlcnlCdWlsZGVyVGFnU2VhcmNoLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zNTdiMGU3MiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCczNTdiMGU3MicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiYXNzZXRzL2pzL2FkbWluL2VsZW1lbnQtaW1wb3J0L09zbVF1ZXJ5QnVpbGRlclRhZ1NlYXJjaC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL09zbVF1ZXJ5QnVpbGRlclRhZ1NlYXJjaC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vT3NtUXVlcnlCdWlsZGVyVGFnU2VhcmNoLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Pc21RdWVyeUJ1aWxkZXJUYWdTZWFyY2gudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTM1N2IwZTcyJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Pc21xdWVyeUJ1aWxkZXJXaWtpTGluay52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YTkyZmIzNTYmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vT3NtcXVlcnlCdWlsZGVyV2lraUxpbmsudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Pc21xdWVyeUJ1aWxkZXJXaWtpTGluay52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vT3NtcXVlcnlCdWlsZGVyV2lraUxpbmsudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9YTkyZmIzNTYmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImE5MmZiMzU2XCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL2hvbWUvdXNlci9CdXJlYXUvaW5jaC9zdGFnZXByb2pldC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCdhOTJmYjM1NicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdhOTJmYjM1NicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdhOTJmYjM1NicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vT3NtcXVlcnlCdWlsZGVyV2lraUxpbmsudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWE5MmZiMzU2JnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2E5MmZiMzU2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJhc3NldHMvanMvYWRtaW4vZWxlbWVudC1pbXBvcnQvT3NtcXVlcnlCdWlsZGVyV2lraUxpbmsudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Pc21xdWVyeUJ1aWxkZXJXaWtpTGluay52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vT3NtcXVlcnlCdWlsZGVyV2lraUxpbmsudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTEtb25lT2YtMS0xIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL09zbXF1ZXJ5QnVpbGRlcldpa2lMaW5rLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWE5MmZiMzU2JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL09zbXF1ZXJ5QnVpbGRlcldpa2lMaW5rLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hOTJmYjM1NiZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCBPc21RdWVyeUJ1aWxkZXIgZnJvbSAnLi9Pc21RdWVyeUJ1aWxkZXIudnVlJ1xuaW1wb3J0IFZ1ZSBmcm9tICd2dWUvZGlzdC92dWUuZXNtJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQoJyNlbGVtZW50LWltcG9ydCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV3IFZ1ZSh7XG4gICAgICAgICAgICBlbDogXCIjZWxlbWVudC1pbXBvcnRcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzb3VyY2VUeXBlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdXJsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgb3NtUXVlcmllc0pzb246IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBmb3JtTmFtZTogXCJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgICAgIG9zbVF1ZXJ5SW5wdXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9zbVF1ZXJpZXNKc29uKSByZXR1cm4gXCJcIlxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0ge31cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFkZHJlc3MgPSB0aGlzLm9zbVF1ZXJpZXNKc29uLmFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJvdW5kcyA9IHRoaXMub3NtUXVlcmllc0pzb24uYm91bmRzXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5xdWVyaWVzID0gW11cbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBxdWVyeSBvZiB0aGlzLm9zbVF1ZXJpZXNKc29uLnF1ZXJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5xdWVyaWVzLnB1c2gocXVlcnkuZmlsdGVyKGNvbmRpdGlvbiA9PiBjb25kaXRpb24ua2V5KSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wb25lbnRzOiB7IE9zbVF1ZXJ5QnVpbGRlciB9LFxuICAgICAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGtleSBpbiBpbXBvcnRPYmplY3QpIHRoaXNba2V5XSA9IGltcG9ydE9iamVjdFtrZXldXG4gICAgICAgICAgICAgICAgdGhpcy5vc21RdWVyaWVzSnNvbiA9IEpTT04ucGFyc2UodGhpcy5vc21RdWVyaWVzSnNvbilcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZVR5cGUgPSBzb3VyY2VUeXBlO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybU5hbWUgPSBmb3JtTmFtZVxuICAgICAgICAgICAgICAgICQoYCNzb25hdGEtYmEtZmllbGQtY29udGFpbmVyLSR7Zm9ybU5hbWV9X2ZpbGVgKS5hcHBlbmRUbygnLmZpbGUtY29udGFpbmVyJylcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgICAgICBzb3VyY2VUeXBlKG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuaW5wdXQtaXMtc3luY2hlZCcpLmNsb3Nlc3QoJy5jaGVja2JveCcpLnRvZ2dsZShuZXdWYWwgPT0gJ29zbScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn0pXG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZS9kaXN0L3Z1ZS5lc20nXG5pbXBvcnQgT3NtQ29uZGl0aW9uIGZyb20gJy4vZWxlbWVudC1pbXBvcnQvT3NtUXVlcnlCdWlsZGVyQ29uZGl0aW9uLnZ1ZSdcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKCcub3NtLXRhZ3MtZmllbGQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ldyBWdWUoe1xuICAgICAgICAgICAgZWw6IFwiLm9zbS10YWdzLWZpZWxkXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZm9ybU5hbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB0YWdzOiBbXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICAgICAgc3RyaW5naWZpZWRUYWdzSGFzaCgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHt9XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdGFnIG9mIHRoaXMudGFncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZy5rZXkgJiYgdGFnLnZhbHVlKSByZXN1bHRbdGFnLmtleV0gPSB0YWcudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wb25lbnRzOiB7IE9zbUNvbmRpdGlvbiB9LFxuICAgICAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1OYW1lID0gZm9ybU5hbWVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbXBvcnRPYmplY3QsIGltcG9ydE9iamVjdC5vc21UYWdzKVxuICAgICAgICAgICAgICAgIGZvcihsZXQga2V5IGluIGltcG9ydE9iamVjdC5vc21UYWdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFncy5wdXNoKHtrZXk6IGtleSwgdmFsdWU6IGltcG9ydE9iamVjdC5vc21UYWdzW2tleV19KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59KVxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUvZGlzdC92dWUuZXNtJ1xuaW1wb3J0IFNvcnRhYmxlIGZyb20gJ3NvcnRhYmxlanMnXG5cblZ1ZS5kaXJlY3RpdmUoJ3NvcnRhYmxlJywge1xuICBpbnNlcnRlZDogZnVuY3Rpb24gKGVsLCBiaW5kaW5nKSB7XG4gICAgbmV3IFNvcnRhYmxlKGVsLCBiaW5kaW5nLnZhbHVlIHx8IHt9KVxuICB9XG59KVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQoJy5zb3VyY2UtcHJpb3JpdHktY29udGFpbmVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICBuZXcgVnVlKHtcbiAgICAgICAgICAgIGVsOiBcIi5zb3VyY2UtcHJpb3JpdHktY29udGFpbmVyXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbGlzdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gc291cmNlTGlzdFxuICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubGlzdC5qb2luKCcsJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICAgICAgb25VcGRhdGUoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoZXZlbnQubmV3SW5kZXgsIDAsIHRoaXMubGlzdC5zcGxpY2UoZXZlbnQub2xkSW5kZXgsIDEpWzBdKVxuICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubGlzdC5qb2luKCcsJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXh0RnJvbShpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtID8gaXRlbSA6IFwiQ2V0dGUgQ2FydGVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiYm91bmRzLXBpY2tlci1jb250YWluZXJcIj5cbiAgICAgICAgPGxhYmVsPlpvbmUgR8Opb2dyYXBoaXF1ZSBkZSBsYSByZXF1ZXRlPC9sYWJlbD5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCB2LW1vZGVsPVwicXVlcnlUeXBlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBkYXRhLXNvbmF0YS1zZWxlY3QyPVwiZmFsc2VcIiBzdHlsZT1cIndpZHRoOmF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFkZHJlc3NcIj5DaGVyY2hlciBwYXIgYWRyZXNzZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYm91bmRzXCI+RGVzc2luZXIgdW4gcmVjdGFuZ2xlIHN1ciBsYSBjYXJ0ZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0IEBrZXlwcmVzcy5lbnRlci5wcmV2ZW50PVwiZ2VvY29kZUFkZHJlc3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHYtbW9kZWw9XCJpbnB1dEFkZHJlc3NcIiA6ZGlzYWJsZWQ9XCJxdWVyeVR5cGUgIT0gJ2FkZHJlc3MnXCIgXG4gICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJVbmUgdmlsbGUsIHVuZSByw6lnaW9uLCB1biBwYXlzLi4uXCIgcmVmPVwiaW5wdXRBZGRyZXNzXCIvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBAY2xpY2s9XCJnZW9jb2RlQWRkcmVzc1wiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwicXVlcnlUeXBlICE9ICdhZGRyZXNzJ1wiPlxuICAgICAgICAgICAgICAgICAgICBDaGVyY2hlclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHYtc2hvdz1cImdlb2NvZGVFcnJvck1zZ1wiPnt7IGdlb2NvZGVFcnJvck1zZyB9fTwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3VuZHMtcGlja2VyLW1hcFwiIHJlZj1cIm1hcFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCdcbmltcG9ydCAnbGVhZmxldC9kaXN0L2xlYWZsZXQuY3NzJ1xuaW1wb3J0ICdsZWFmbGV0LXNoYWRlcydcbmltcG9ydCAnbGVhZmxldC1zaGFkZXMvc3JjL2Nzcy9sZWFmbGV0LXNoYWRlcy5jc3MnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogWyAnb3NtUXVlcnlPYmplY3QnLCAndGlsZUxheWVyJywgJ2RlZmF1bHRCb3VuZHMnIF0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHF1ZXJ5VHlwZTogbnVsbCwgLy8gZWl0aGVyICdhZGRyZXNzJyBvciAnYm91bmRzJ1xuICAgICAgICAgICAgaW5wdXRBZGRyZXNzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBnZW9jb2RlZEFkZHJlc3M6IHt9LFxuICAgICAgICAgICAgZ2VvY29kZUVycm9yTXNnOiAnJyxcbiAgICAgICAgICAgIG1hcEJvdW5kczogbnVsbCxcbiAgICAgICAgICAgIGRyYXduQm91bmRzOiBudWxsLCAvLyBkcmF3biBib3VuZHMgYnkgdXNlciB3aXRoIGxlYWZsZXQtc2hhZGVzXG4gICAgICAgICAgICBtYXA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGN1cnJlbnRMYXllcnM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG1hcFNoYWRlczogdW5kZWZpbmVkLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBib3VuZHMoKSB7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5hZGRyZXNzUHJlc2VudCkgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5VHlwZSA9PSAnYm91bmRzJyAmJiB0aGlzLmRyYXduQm91bmRzID8gdGhpcy5kcmF3bkJvdW5kcyA6IHRoaXMubWFwQm91bmRzXG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3MoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5xdWVyeVR5cGUgPT0gJ2FkZHJlc3MnICYmIHRoaXMuZ2VvY29kZWRBZGRyZXNzICYmIHRoaXMuZ2VvY29kZWRBZGRyZXNzLm9zbV9pZClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dEFkZHJlc3NcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9LFxuICAgICAgICAvLyBidWlsZHMgdGhlIGdlb2dyYXBoaWNhbCBwYXJ0IG9mIHRoZSBvdmVycGFzcyBxdWVyeVxuICAgICAgICBvdmVycGFzc1F1ZXJ5KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWRkcmVzcykge1xuICAgICAgICAgICAgICAgIHZhciBhcmVhUmVmID0gMSAqIHRoaXMuZ2VvY29kZWRBZGRyZXNzLm9zbV9pZDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZW9jb2RlZEFkZHJlc3Mub3NtX3R5cGUgPT0gXCJ3YXlcIikgYXJlYVJlZiArPSAyNDAwMDAwMDAwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdlb2NvZGVkQWRkcmVzcy5vc21fdHlwZSA9PSBcInJlbGF0aW9uXCIpIGFyZWFSZWYgKz0gMzYwMDAwMDAwMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYChhcmVhOiR7YXJlYVJlZn0pYFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgYiA9IHRoaXMuYm91bmRzXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAoJHtiLmdldFNvdXRoKCl9LCR7Yi5nZXRXZXN0KCl9LCR7Yi5nZXROb3J0aCgpfSwke2IuZ2V0RWFzdCgpfSlgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIC8vIEluaXQgbWFwXG4gICAgICAgIHRoaXMubWFwID0gTC5tYXAodGhpcy4kcmVmcy5tYXAsIHtlZGl0YWJsZTogdHJ1ZX0pO1xuICAgICAgICBMLnRpbGVMYXllcih0aGlzLnRpbGVMYXllcikuYWRkVG8odGhpcy5tYXApOyAgICAgICAgIFxuICAgICAgICB0aGlzLm1hcC5vbignbW92ZWVuZCcsICgpID0+IHRoaXMubWFwQm91bmRzID0gdGhpcy5tYXAuZ2V0Qm91bmRzKCkpXG4gICAgICAgIHRoaXMuY3VycmVudExheWVycyA9IG5ldyBMLmxheWVyR3JvdXAoKVxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllcnMuYWRkVG8odGhpcy5tYXApXG5cbiAgICAgICAgLy8gSW5pdGlhbGlzZSBzdGF0ZSBmcm9tIHNhdmVkIG9zbVF1ZXJ5T2JqZWN0XG4gICAgICAgIGxldCBpbml0aWFsQm91bmRzID0gdGhpcy5kZWZhdWx0Qm91bmRzXG4gICAgICAgIGlmICh0aGlzLm9zbVF1ZXJ5T2JqZWN0ICYmIHRoaXMub3NtUXVlcnlPYmplY3QuYWRkcmVzcykge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEFkZHJlc3MgPSB0aGlzLm9zbVF1ZXJ5T2JqZWN0LmFkZHJlc3NcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZUFkZHJlc3MoKSAgIFxuICAgICAgICAgICAgdGhpcy5xdWVyeVR5cGUgPSAnYWRkcmVzcycgICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9zbVF1ZXJ5T2JqZWN0ICYmIHRoaXMub3NtUXVlcnlPYmplY3QuYm91bmRzKSB7XG4gICAgICAgICAgICBpbml0aWFsQm91bmRzID0gbmV3IEwubGF0TG5nQm91bmRzKHRoaXMub3NtUXVlcnlPYmplY3QuYm91bmRzKVxuICAgICAgICAgICAgdGhpcy5kcmF3bkJvdW5kcyA9IGluaXRpYWxCb3VuZHNcbiAgICAgICAgICAgIHRoaXMucXVlcnlUeXBlID0gJ2JvdW5kcycgXG4gICAgICAgIH0gICBcblxuICAgICAgICAvLyBJbml0IG1hcCBwb3NpdGlvblxuICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHMoaW5pdGlhbEJvdW5kcyk7ICAgICAgICBcbiAgICAgICAgdGhpcy5tYXBCb3VuZHMgPSB0aGlzLm1hcC5nZXRCb3VuZHMoKVxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgcXVlcnkgdHlwZSB3ZSBuZWVkIHRvIHR1cm4gb24vb2ZmIGxlYWZsZXQgc2hhZGVzIHBsdWdpblxuICAgICAgICBxdWVyeVR5cGUoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXBTaGFkZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFNoYWRlcy5vblJlbW92ZSh0aGlzLm1hcCkgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ta29uZzAyMTYvbGVhZmxldC1zaGFkZXMvaXNzdWVzLzNcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFNoYWRlcyA9IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVycy5jbGVhckxheWVycygpXG4gICAgICAgICAgICBpZiAodGhpcy5xdWVyeVR5cGUgPT0gJ2JvdW5kcycpIHsgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3bkJvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gTC5yZWN0YW5nbGUodGhpcy5kcmF3bkJvdW5kcyk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJzLmFkZExheWVyKHJlY3QpXG4gICAgICAgICAgICAgICAgICAgIHJlY3QuZW5hYmxlRWRpdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVycy5hZGRMYXllcih0aGlzLm1hcC5lZGl0VG9vbHMuc3RhcnRSZWN0YW5nbGUoKSk7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBJbml0IHNoYWRlc1xuICAgICAgICAgICAgICAgIHRoaXMubWFwU2hhZGVzID0gbmV3IEwuTGVhZmxldFNoYWRlcygpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwU2hhZGVzLmFkZFRvKHRoaXMubWFwKTsgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMubWFwU2hhZGVzLm9uKCdzaGFkZXM6Ym91bmRzLWNoYW5nZWQnLCAoZXZlbnQpID0+IHsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd25Cb3VuZHMgPSBldmVudC5ib3VuZHMgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGdlb2NvZGVBZGRyZXNzKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlucHV0QWRkcmVzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZUVycm9yTXNnID0gXCJWZXVpbGxleiBlbnRyZXIgdW5lIGFkcmVzc2VcIlxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHVybCA9IGBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9zZWFyY2gucGhwP3E9JHt0aGlzLmlucHV0QWRkcmVzc30mcG9seWdvbl9nZW9qc29uPTEmZm9ybWF0PWpzb252MmBcbiAgICAgICAgICAgICQuZ2V0SlNPTih1cmwsIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0cyB8fCByZXN1bHRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZUVycm9yTXNnID0gYEF1Y3VuZSByw6lzdWx0YXQgdHJvdXbDqSBwb3VyICR7dGhpcy5pbnB1dEFkZHJlc3N9YFxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5nZW9jb2RlRXJyb3JNc2cgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVycy5jbGVhckxheWVycygpXG4gICAgICAgICAgICAgICAgdGhpcy5nZW9jb2RlZEFkZHJlc3MgPSByZXN1bHRzWzBdXG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gTC5nZW9KU09OKHRoaXMuZ2VvY29kZWRBZGRyZXNzLmdlb2pzb24sIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGZlYXR1cmUgPT4ge2NvbG9yOiAnYmx1ZSd9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllcnMuYWRkTGF5ZXIobGF5ZXIpXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuZml0Qm91bmRzKGxheWVyLmdldEJvdW5kcygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbiAgICAuYm91bmRzLXBpY2tlci1jb250YWluZXIge1xuICAgICAgICBtYXJnaW4tdG9wOiAxLjVyZW07XG4gICAgICAgIC5hbGVydC1kYW5nZXIge1xuICAgICAgICAgICAgbWFyZ2luOiAxLjVyZW0gMDtcbiAgICAgICAgfVxuICAgICAgICAuYm91bmRzLXBpY2tlci1tYXAge1xuICAgICAgICAgICAgaGVpZ2h0OiAzMDBweDtcbiAgICAgICAgICAgIG1hcmdpbjogMS41cmVtIDA7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgIH1cbiAgICAgICAgLmxlYWZsZXQtcGFuZSB7XG4gICAgICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICB9XG4gICAgfSAgICBcbiAgICBhLmxlYWZsZXQtY29udHJvbC16b29tLWluIHtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGNvbG9yOiAjM2QzZDNkO1xuICAgIH1cbiAgICBhLmxlYWZsZXQtY29udHJvbC16b29tLW91dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjVweCEgaW1wb3J0YW50O1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBjb2xvcjogIzNkM2QzZDtcbiAgICAgICAgdGV4dC1pbmRlbnQ6IDA7XG4gICAgfSAgICBcbiAgICAubGVhZmxldC10b3AsIC5sZWFmbGV0LWJvdHRvbSB7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgfVxuPC9zdHlsZT4iLCI8dGVtcGxhdGU+XG4gICAgIDxkaXYgY2xhc3M9XCJvc20tcXVlcnktYnVpbGRlclwiPlxuICAgICAgICA8bGFiZWw+TGlzdGUgZGVzIHJlcXXDqnRlcyBkYW5zIGxhIGJhc2UgT3BlblN0cmVldE1hcDwvbGFiZWw+XG4gICAgICAgIFxuICAgICAgICA8b3NtLXRhZy1zZWFyY2g+PC9vc20tdGFnLXNlYXJjaD5cblxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIFxuICAgICAgICAgICAgICAgIEBjbGljaz1cInF1ZXJpZXMucHVzaChbe2tleTogJycsIG9wZXJhdG9yOiAnPScsIHZhbHVlOiAnJ31dKVwiPlxuICAgICAgICAgICAgT3UgYWpvdXRlciB1bmUgcmVxdcOqdGUgbWFudWVsbGVtZW50XG4gICAgICAgIDwvYnV0dG9uPiBcbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJicy1jYWxsb3V0XCIgdi1mb3I9XCIocXVlcnksIHF1ZXJ5SW5kZXgpIGluIHF1ZXJpZXNcIiA6a2V5PVwicXVlcnlJbmRleFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgQGNsaWNrPVwicXVlcmllcy5zcGxpY2UocXVlcnlJbmRleCwxKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHJlbW92ZS1xdWVyeSBidG4taWNvblwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgdi1mb3I9XCIoY29uZGl0aW9uLCBjb25kaXRpb25JbmRleCkgaW4gcXVlcnlcIiBjbGFzcz1cImNvbmRpdGlvbi1jb250YWluZXJcIiA6a2V5PVwiY29uZGl0aW9uSW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8b3NtLWNvbmRpdGlvbiA6Y29uZGl0aW9uPVwiY29uZGl0aW9uXCIgOmtleT1cIidRdWVyeScgKyBxdWVyeUluZGV4XCI+PC9vc20tY29uZGl0aW9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIEBjbGljaz1cInF1ZXJ5LnNwbGljZShjb25kaXRpb25JbmRleCwxKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1pY29uIHJlbW92ZS1jb25kaXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10cmFzaCByZW1vdmUtY29uZGl0aW9uXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4tYWRkLWNvbmRpdGlvbiBidG4tc21cIiBcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwicXVlcnkucHVzaCh7a2V5OiAnJywgb3BlcmF0b3I6ICc9JywgdmFsdWU6ICcnfSlcIj5Bam91dGVyIHVuZSBjb25kaXRpb248L2J1dHRvbj4gICAgICAgIFxuICAgICAgICA8L2Rpdj4gICAgICAgICAgXG5cbiAgICAgICAgPGJvdW5kcy1waWNrZXIgcmVmPVwiYm91bmRzUGlja2VyXCIgOm9zbS1xdWVyeS1vYmplY3Q9XCJvc21RdWVyeU9iamVjdFwiIDp0aWxlTGF5ZXI9XCJ0aWxlTGF5ZXJcIiA6ZGVmYXVsdC1ib3VuZHM9XCJkZWZhdWx0Qm91bmRzXCI+PC9ib3VuZHMtcGlja2VyPlxuXG4gICAgICAgIDxsYWJlbCB2LXNob3c9XCJvdmVycGFzc1F1ZXJ5XCI+Q29kZSBhdXRvbWF0aXF1ZW1lbnQgZ8OpbsOpcsOpIHBvdXIgbGEgcmVxdcOqdGUgT3BlblN0cmVldE1hcCAodmlhIE92ZXJQYXNzKTwvbGFiZWw+XG4gICAgICAgIDxwcmUgdi1zaG93PVwib3ZlcnBhc3NRdWVyeVwiPnt7IG92ZXJwYXNzUXVlcnkgfX08L3ByZT5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgT3NtQ29uZGl0aW9uIGZyb20gXCIuL09zbVF1ZXJ5QnVpbGRlckNvbmRpdGlvblwiXG5pbXBvcnQgT3NtVGFnU2VhcmNoIGZyb20gXCIuL09zbVF1ZXJ5QnVpbGRlclRhZ1NlYXJjaFwiXG5pbXBvcnQgQm91bmRzUGlja2VyIGZyb20gXCIuL0JvdW5kc1BpY2tlclwiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogWyAnb3NtUXVlcnlPYmplY3QnLCAndGlsZUxheWVyJywgJ2RlZmF1bHRCb3VuZHMnIF0sXG4gICAgY29tcG9uZW50czogeyBPc21Db25kaXRpb24sIE9zbVRhZ1NlYXJjaCwgQm91bmRzUGlja2VyIH0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHF1ZXJpZXM6IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC8vIFRyYW5zZm9ybSBxdWVyaWVzIGFycmF5IGludG8gYW4gT3ZlcnBhc3MgcXVlcnlcbiAgICAgICAgb3ZlcnBhc3NRdWVyeSgpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJ1xuICAgICAgICAgICAgZm9yKGxldCBxdWVyeSBvZiB0aGlzLnF1ZXJpZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgcXVlcnlTdHJpbmcgPSAnJ1xuICAgICAgICAgICAgICAgIGZvcihsZXQgY29uZGl0aW9uIG9mIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb24ub3BlcmF0b3IgPT0gXCJcIiB8fCBjb25kaXRpb24ub3BlcmF0b3IgPT0gXCIhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nICs9IGBbJHtjb25kaXRpb24ub3BlcmF0b3J9XCIke2NvbmRpdGlvbi5rZXl9XCJdYFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmRpdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gY29uZGl0aW9uLnZhbHVlLnJlcGxhY2UoLywvZywgJ3wnKSAvLyB0cmFuc2Zvcm0gbXVsdGkgaW5wdXQgaW50byByZWcgZXhwclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlTdHJpbmcgKz0gYFtcIiR7Y29uZGl0aW9uLmtleX1cIiR7Y29uZGl0aW9uLm9wZXJhdG9yfVwiJHt2YWx1ZX1cIl1gXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcXVlcnlTdHJpbmcgKz0gdGhpcy4kcmVmcy5ib3VuZHNQaWNrZXIub3ZlcnBhc3NRdWVyeVxuICAgICAgICAgICAgICAgIGlmIChxdWVyeSAhPSAnJykgcmVzdWx0ICs9IGBub2RlJHtxdWVyeVN0cmluZ307d2F5JHtxdWVyeVN0cmluZ307cmVsYXRpb24ke3F1ZXJ5U3RyaW5nfTtgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH0sXG4gICAgICAgIG92ZXJwYXNzQXBpVXJsKCkge1xuICAgICAgICAgICAgLy8gb3V0IG1ldGEgcHJvdmlkZSBleHRyYSBkYXRhLCBvdXQgY2VudGVyIHByb3ZpZGUgY2VudGVyIG9mIHdheSBvciByZWxhdGlvblxuICAgICAgICAgICAgcmV0dXJuIGBodHRwczovL292ZXJwYXNzLWFwaS5kZS9hcGkvaW50ZXJwcmV0ZXI/ZGF0YT1bb3V0Ompzb25dW3RpbWVvdXQ6MTAwMF07KCR7dGhpcy5vdmVycGFzc1F1ZXJ5fSk7b3V0JTIwbWV0YSUyMGNlbnRlcjtgXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICAgIG92ZXJwYXNzQXBpVXJsKHVybCkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnb3NtLXVybC1jaGFuZ2VkJywgdXJsKVxuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOm9zbVF1ZXJ5T2JqZWN0Jywge1xuICAgICAgICAgICAgICAgIHF1ZXJpZXM6IHRoaXMucXVlcmllcywgXG4gICAgICAgICAgICAgICAgYm91bmRzOiBbdGhpcy4kcmVmcy5ib3VuZHNQaWNrZXIuYm91bmRzLmdldFNvdXRoV2VzdCgpLCB0aGlzLiRyZWZzLmJvdW5kc1BpY2tlci5ib3VuZHMuZ2V0Tm9ydGhFYXN0KCldLCBcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLiRyZWZzLmJvdW5kc1BpY2tlci5hZGRyZXNzXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICBpZiAodGhpcy5vc21RdWVyeU9iamVjdCAmJiB0aGlzLm9zbVF1ZXJ5T2JqZWN0LnF1ZXJpZXMpXG4gICAgICAgICAgICB0aGlzLnF1ZXJpZXMgPSB0aGlzLm9zbVF1ZXJ5T2JqZWN0LnF1ZXJpZXNcbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuICAgIC5jb25kaXRpb24tY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgLmJ0bi1pY29uIHsgcGFkZGluZzogNHB4IDEwcHg7fVxuICAgIH1cbiAgICAuY29uZGl0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgLmJ0bi5idG4taWNvbiBpIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbiAgICAucmVtb3ZlLXF1ZXJ5IHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IC0xMHB4O1xuICAgICAgICBsZWZ0OiAtMTBweDtcbiAgICAgICAgcGFkZGluZzogMnB4IDVweDtcbiAgICB9XG4gICAgLmJ0bi1hZGQtY29uZGl0aW9uIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICB9XG48L3N0eWxlPiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiY29uZGl0aW9uXCI+XG4gICAgICAgIDxvc20td2lraS1saW5rIDpjb25kaXRpb249XCJjb25kaXRpb25cIiByZWY9XCJ3aWtpTGlua1wiPjwvb3NtLXdpa2ktbGluaz5cblxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHJlZj1cImlucHV0S2V5XCIgdi1tb2RlbD1cImNvbmRpdGlvbi5rZXlcIlxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNoZXJjaGVyIHVuZSBjbMOpXCIvPlxuICAgICAgICBcbiAgICAgICAgPHNlbGVjdCBkYXRhLXNvbmF0YS1zZWxlY3QyPVwiZmFsc2VcIiBjbGFzcz1cImNvbmRpdGlvbi1vcGVyYXRvciBmb3JtLWNvbnRyb2xcIiByZWY9XCJzZWxlY3RPcGVyYXRvclwiIFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJjb25kaXRpb24ub3BlcmF0b3JcIiBwbGFjZWhvbGRlcj1cIkNvbmRpdGlvbi4uLlwiPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPkV4aXN0ZTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiFcIj5OJ2V4aXN0ZSBwYXM8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI9XCI+RXN0IMOpZ2FsIMOgPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiIT1cIj5EaWZmw6lyZW50IGRlPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiflwiPkVzdCBsJ3VuZSBkZXMgdmFsZXVyczwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIiF+XCI+Tidlc3QgYXVjdW5lIGRlcyB2YWxldXJzPC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHYtbW9kZWw9XCJjb25kaXRpb24udmFsdWVcIiByZWY9XCJpbnB1dFZhbHVlXCJcbiAgICAgICAgICAgIDpkaXNhYmxlZD1cIlsnJywgJyEnXS5pbmNsdWRlcyhjb25kaXRpb24ub3BlcmF0b3IpXCIgLz4gICAgICAgICAgICBcbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgT3NtV2lraUxpbmsgZnJvbSBcIi4vT3NtcXVlcnlCdWlsZGVyV2lraUxpbmtcIlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsnY29uZGl0aW9uJ10sXG4gICAgY29tcG9uZW50czogeyBPc21XaWtpTGluayB9LFxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmV2YWxlbnRWYWx1ZXM6IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIG9wZXJhdG9yKCkgeyByZXR1cm4gdGhpcy5jb25kaXRpb24ub3BlcmF0b3IgfSxcbiAgICAgICAgaXNNdWx0aXBsZUNvbmRpdGlvbigpIHsgcmV0dXJuIHRoaXMub3BlcmF0b3IgJiYgdGhpcy5vcGVyYXRvci5pbmNsdWRlcygnficpfVxuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZGl0aW9uLmtleSkge1xuICAgICAgICAgICAgLy8gZ2V0IHByZXZhbGVudFZhbHVlcyB1c2luZyBmaXJzdCByZXN1bHQsIGkuZS4gcGVyZmVjdCBtYXRjaFxuICAgICAgICAgICAgJC5nZXRKU09OKHRoaXMua2V5SW5mb1VybCh0aGlzLmNvbmRpdGlvbi5rZXkpLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmFsZW50VmFsdWVzID0gcmVzcG9uc2UuZGF0YVswXS5wcmV2YWxlbnRfdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdElucHV0VmFsdWUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluaXRTZWFyY2hLZXlJbnB1dCgpXG4gICAgICAgIH0gICAgICAgIFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgb3BlcmF0b3IobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICAgIGxldCBuZXdWYWxJc0FycmF5ID0gbmV3VmFsICYmIG5ld1ZhbC5pbmNsdWRlcygnficpXG4gICAgICAgICAgICBsZXQgb2xkVmFsSXNBcnJheSA9IG9sZFZhbCAmJiBvbGRWYWwuaW5jbHVkZXMoJ34nKVxuICAgICAgICAgICAgaWYgKG5ld1ZhbElzQXJyYXkgIT0gb2xkVmFsSXNBcnJheSkge1xuICAgICAgICAgICAgICAgIGlmICghbmV3VmFsSXNBcnJheSAmJiB0aGlzLmNvbmRpdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0cmFuc2Zvcm0gYXJyYXkgdmFsdWUgdG8gc2luZ2xlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uLnZhbHVlID0gdGhpcy5jb25kaXRpb24udmFsdWUuc3BsaXQoJywnKVswXVxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMuJHJlZnMuaW5wdXRWYWx1ZSkudmFsKHRoaXMuY29uZGl0aW9uLnZhbHVlKS50cmlnZ2VyKCdjaGFuZ2UnKSAvLyBuZWVkZWQgZm9yIHNlbGVjdDIgdG8gYmUgdXBkYXRlZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRJbnB1dFZhbHVlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBrZXlJbmZvVXJsKGtleSkgeyBcbiAgICAgICAgICAgIHJldHVybiBgaHR0cHM6Ly90YWdpbmZvLm9wZW5zdHJlZXRtYXAub3JnL2FwaS80L2tleXMvYWxsP3F1ZXJ5PSR7a2V5fSZpbmNsdWRlPXByZXZhbGVudF92YWx1ZXMmc29ydG5hbWU9Y291bnRfYWxsJnNvcnRvcmRlcj1kZXNjJnBhZ2U9MSZycD0yMCZxdHlwZT1rZXkmZm9ybWF0PWpzb25fcHJldHR5YFxuICAgICAgICB9LFxuICAgICAgICBpbml0U2VhcmNoS2V5SW5wdXQoKSB7XG4gICAgICAgICAgICAkKHRoaXMuJHJlZnMuaW5wdXRLZXkpLnNlbGVjdDIoe1xuICAgICAgICAgICAgICAgIG1pbmltdW1JbnB1dExlbmd0aDogMixcbiAgICAgICAgICAgICAgICBhamF4OiB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogKHRlcm0pID0+IHRoaXMua2V5SW5mb1VybCh0ZXJtKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJywgICBcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4geyByZXN1bHRzOiByZXNwb25zZS5kYXRhIH07IH0gXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpZDogKGl0ZW0pID0+IGl0ZW0ua2V5LCBcbiAgICAgICAgICAgICAgICBmb3JtYXRSZXN1bHQ6IChpdGVtKSA9PiBpdGVtLmtleSxcbiAgICAgICAgICAgICAgICBmb3JtYXRTZWxlY3Rpb246IChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uS2V5U2VsZWN0ZWRGcm9tU2VhcmNoUmVzdWx0cyhpdGVtKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIG9uS2V5U2VsZWN0ZWRGcm9tU2VhcmNoUmVzdWx0cyhpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZhbGVudFZhbHVlcyA9IGl0ZW0ucHJldmFsZW50X3ZhbHVlcyAgIFxuICAgICAgICAgICAgdGhpcy5pbml0SW5wdXRWYWx1ZSgpICAgICBcbiAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uLmtleSA9IGl0ZW0ua2V5ICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5rZXlcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdElucHV0VmFsdWUoKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMucHJldmFsZW50VmFsdWVzXG4gICAgICAgICAgICBpZiAodGhpcy5jb25kaXRpb24udmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlQ29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuY29uZGl0aW9uLnZhbHVlLnNwbGl0KCcsJykpXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnVuc2hpZnQoe3ZhbHVlOiB2YWx1ZX0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS51bnNoaWZ0KHt2YWx1ZTogdGhpcy5jb25kaXRpb24udmFsdWV9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZvcm1hdCB0byBzZWxlY3QyIHN0eWxlXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5tYXAoKHYpID0+IHsgcmV0dXJuIHtpZDogdi52YWx1ZSwgdGV4dDogdi52YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHYudmFsdWUuc2xpY2UoMSl9IH0pXG4gICAgICAgICAgICAvLyBJbml0IFZhbHVlIElucHV0IGZyb20gcHJldmFsZW50IHZhbHVlc1xuICAgICAgICAgICAgJCh0aGlzLiRyZWZzLmlucHV0VmFsdWUpLnNlbGVjdDIoe1xuICAgICAgICAgICAgICAgIGNyZWF0ZVNlYXJjaENob2ljZTpmdW5jdGlvbih0ZXJtLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGRhdGEpLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHQubG9jYWxlQ29tcGFyZSh0ZXJtKT09PTA7XG4gICAgICAgICAgICAgICAgICAgIH0pLmxlbmd0aD09PTApXG4gICAgICAgICAgICAgICAgICAgIHtyZXR1cm4ge2lkOnRlcm0sIHRleHQ6dGVybX07fVxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIG11bHRpcGxlOiB0aGlzLmlzTXVsdGlwbGVDb25kaXRpb24sXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgfSkub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbi52YWx1ZSA9ICQodGhpcy4kcmVmcy5pbnB1dFZhbHVlKS52YWwoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cbiAgICA8cD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgdGFnLXNlYXJjaFwiIFxuICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJSZWNoZXJjaGUgcmFwaWRlIGRhbnMgT3BlblN0ZWV0TWFwIGVuIEFuZ2xhaXMgKHJlc3RhdXJhbnQsIG9yZ2FuaWMsIHNlY29uZCBoYW5kLi4uKVwiLz5cbiAgICA8L3A+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICQoJy50YWctc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtSW5wdXRMZW5ndGg6IDIsXG4gICAgICAgICAgICBhamF4OiB7XG4gICAgICAgICAgICAgICAgdXJsOiAodGVybSkgPT4gYGh0dHBzOi8vdGFnZmluZGVyLmhlcm9rdWFwcC5jb20vYXBpL3NlYXJjaD9xdWVyeT0ke3Rlcm19YCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLCAgICAgXG4gICAgICAgICAgICAgICAgcHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiB7IHJlc3VsdHM6IGRhdGEgfTsgfSBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZDogKGl0ZW0pID0+IGl0ZW0uc3ViamVjdCwgXG4gICAgICAgICAgICBmb3JtYXRSZXN1bHQ6IChpdGVtKSA9PiBgPGI+JHtpdGVtLnByZWZMYWJlbH08L2I+IDogJHtpdGVtLnNjb3BlTm90ZS5lbn1gLFxuICAgICAgICAgICAgZm9ybWF0U2VsZWN0aW9uOiAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBxdWVyeSA9IFtdXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNUYWcpIHF1ZXJ5LnB1c2goe2tleTogaXRlbS5wcmVmTGFiZWwuc3BsaXQoJz0nKVswXSwgb3BlcmF0b3I6ICc9JywgdmFsdWU6IGl0ZW0ucHJlZkxhYmVsLnNwbGl0KCc9JylbMV19KVxuICAgICAgICAgICAgICAgIGVsc2UgcXVlcnkucHVzaCh7a2V5OiBpdGVtLnByZWZMYWJlbCwgb3BlcmF0b3I6ICc9JywgdmFsdWU6ICcnfSlcbiAgICAgICAgICAgICAgICBsZXQgY29tYmluZXNUYWdzID0ge31cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb21iaW5lIG9mIGl0ZW0uY29tYmluZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbWJpbmVLZXkgPSBjb21iaW5lLmxhYmVsLnNwbGl0KCc9JylbMF1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbWJpbmVWYWx1ZSA9IGNvbWJpbmUubGFiZWwuc3BsaXQoJz0nKVsxXVxuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgc29tZSBrZXlzIG5vdCB1c2VkIGZvciBmaWx0ZXJpbmdcbiAgICAgICAgICAgICAgICAgICAgaWYgKFsnbmFtZScsICd3ZWJzaXRlJywgJ3dpa2lwZWRpYScsICdvcGVuaW5nX2hvdXJzJ10uaW5jbHVkZXMoY29tYmluZUtleSkpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tYmluZXNUYWdzW2NvbWJpbmVLZXldKSBjb21iaW5lc1RhZ3NbY29tYmluZUtleV0gKz0gYCwke2NvbWJpbmVWYWx1ZX1gXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgY29tYmluZXNUYWdzW2NvbWJpbmVLZXldID0gY29tYmluZVZhbHVlICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gY29tYmluZXNUYWdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGNvbWJpbmVzVGFnc1trZXldXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAnKicpIHF1ZXJ5LnB1c2goe2tleToga2V5LCBvcGVyYXRvcjogJycsIHZhbHVlOiAnJ30pXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcXVlcnkucHVzaCh7a2V5OiBrZXksIG9wZXJhdG9yOiB2YWx1ZS5pbmNsdWRlcygnLCcpID8gJ34nIDogJz0nLCB2YWx1ZTogdmFsdWV9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQucXVlcmllcy5wdXNoKHF1ZXJ5KVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICB9LCAgICAgICAgIFxuICAgICAgICB9KTsgICAgIFxuICAgIH1cbn1cbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cbiAgICA8YSA6aHJlZj1cInVybFwiIHYtaWY9XCJjb25kaXRpb24ua2V5XCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWljb25cIiBcbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiIDp0aXRsZT1cInRpdGxlXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWV4dGVybmFsLWxpbmstc3F1YXJlIGZhcyBmYS1leHRlcm5hbC1saW5rLXNxdWFyZS1hbHRcIj48L2k+XG4gICAgPC9hPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogWydjb25kaXRpb24nXSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBpc1RhZygpIHsgXG4gICAgICAgICAgICBpZiAodGhpcy5jb25kaXRpb24ua2V5ICYmICh0aGlzLmNvbmRpdGlvbi5vcGVyYXRvciA9PSAnPScpICYmIHRoaXMuY29uZGl0aW9uLnZhbHVlKSBcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHVybCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVGFnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBodHRwczovL3dpa2kub3BlbnN0cmVldG1hcC5vcmcvd2lraS9UYWc6JHt0aGlzLnRhZ31gXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBgaHR0cHM6Ly93aWtpLm9wZW5zdHJlZXRtYXAub3JnL3dpa2kvS2V5OiR7dGhpcy5jb25kaXRpb24ua2V5fWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGFnKCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuY29uZGl0aW9uLmtleX09JHt0aGlzLmNvbmRpdGlvbi52YWx1ZX1gXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGBMaWVuIHZlcnMgbGEgZmljaGUgV2lraSBkZSBcIiR7dGhpcy5pc1RhZyA/IHRoaXMudGFnIDogdGhpcy5jb25kaXRpb24ua2V5fVwiYCBcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIC5idG4uYnRuLWljb24gaSB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG4gICAgLmJ0bi1pY29uIHsgcGFkZGluZzogNHB4IDEwcHg7fVxuPC9zdHlsZT4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm91bmRzLXBpY2tlci1jb250YWluZXJcIiB9LCBbXG4gICAgX2MoXCJsYWJlbFwiLCBbX3ZtLl92KFwiWm9uZSBHw6lvZ3JhcGhpcXVlIGRlIGxhIHJlcXVldGVcIildKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXBcIiB9LCBbXG4gICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cC1idG5cIiB9LCBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwic2VsZWN0XCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucXVlcnlUeXBlLFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicXVlcnlUeXBlXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiYXV0b1wiIH0sXG4gICAgICAgICAgICBhdHRyczogeyBcImRhdGEtc29uYXRhLXNlbGVjdDJcIjogXCJmYWxzZVwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciAkJHNlbGVjdGVkVmFsID0gQXJyYXkucHJvdG90eXBlLmZpbHRlclxuICAgICAgICAgICAgICAgICAgLmNhbGwoJGV2ZW50LnRhcmdldC5vcHRpb25zLCBmdW5jdGlvbihvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbihvKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBcIl92YWx1ZVwiIGluIG8gPyBvLl92YWx1ZSA6IG8udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBfdm0ucXVlcnlUeXBlID0gJGV2ZW50LnRhcmdldC5tdWx0aXBsZVxuICAgICAgICAgICAgICAgICAgPyAkJHNlbGVjdGVkVmFsXG4gICAgICAgICAgICAgICAgICA6ICQkc2VsZWN0ZWRWYWxbMF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXCJvcHRpb25cIiwgeyBhdHRyczogeyB2YWx1ZTogXCJhZGRyZXNzXCIgfSB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIkNoZXJjaGVyIHBhciBhZHJlc3NlXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcIm9wdGlvblwiLCB7IGF0dHJzOiB7IHZhbHVlOiBcImJvdW5kc1wiIH0gfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCJEZXNzaW5lciB1biByZWN0YW5nbGUgc3VyIGxhIGNhcnRlXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF1cbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgIHZhbHVlOiBfdm0uaW5wdXRBZGRyZXNzLFxuICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJpbnB1dEFkZHJlc3NcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgcmVmOiBcImlucHV0QWRkcmVzc1wiLFxuICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogX3ZtLnF1ZXJ5VHlwZSAhPSBcImFkZHJlc3NcIixcbiAgICAgICAgICBwbGFjZWhvbGRlcjogXCJVbmUgdmlsbGUsIHVuZSByw6lnaW9uLCB1biBwYXlzLi4uXCJcbiAgICAgICAgfSxcbiAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5pbnB1dEFkZHJlc3MgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBrZXlwcmVzczogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICEkZXZlbnQudHlwZS5pbmRleE9mKFwia2V5XCIpICYmXG4gICAgICAgICAgICAgIF92bS5faygkZXZlbnQua2V5Q29kZSwgXCJlbnRlclwiLCAxMywgJGV2ZW50LmtleSwgXCJFbnRlclwiKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgcmV0dXJuIF92bS5nZW9jb2RlQWRkcmVzcygkZXZlbnQpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdm0uaW5wdXRBZGRyZXNzID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAtYnRuXCIgfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tcHJpbWFyeVwiLFxuICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiwgZGlzYWJsZWQ6IF92bS5xdWVyeVR5cGUgIT0gXCJhZGRyZXNzXCIgfSxcbiAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBfdm0uZ2VvY29kZUFkZHJlc3MgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICBDaGVyY2hlclxcbiAgICAgICAgICAgIFwiKV1cbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHtcbiAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgICAgICAgIHZhbHVlOiBfdm0uZ2VvY29kZUVycm9yTXNnLFxuICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJnZW9jb2RlRXJyb3JNc2dcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwiYWxlcnQgYWxlcnQtZGFuZ2VyXCJcbiAgICAgIH0sXG4gICAgICBbX3ZtLl92KF92bS5fcyhfdm0uZ2VvY29kZUVycm9yTXNnKSldXG4gICAgKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFwiZGl2XCIsIHsgcmVmOiBcIm1hcFwiLCBzdGF0aWNDbGFzczogXCJib3VuZHMtcGlja2VyLW1hcFwiIH0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwib3NtLXF1ZXJ5LWJ1aWxkZXJcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihcIkxpc3RlIGRlcyByZXF1w6p0ZXMgZGFucyBsYSBiYXNlIE9wZW5TdHJlZXRNYXBcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcIm9zbS10YWctc2VhcmNoXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1kZWZhdWx0XCIsXG4gICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdm0ucXVlcmllcy5wdXNoKFt7IGtleTogXCJcIiwgb3BlcmF0b3I6IFwiPVwiLCB2YWx1ZTogXCJcIiB9XSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgIE91IGFqb3V0ZXIgdW5lIHJlcXXDqnRlIG1hbnVlbGxlbWVudFxcbiAgICBcIildXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbChfdm0ucXVlcmllcywgZnVuY3Rpb24ocXVlcnksIHF1ZXJ5SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBrZXk6IHF1ZXJ5SW5kZXgsIHN0YXRpY0NsYXNzOiBcImJzLWNhbGxvdXRcIiB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1kZWZhdWx0IHJlbW92ZS1xdWVyeSBidG4taWNvblwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnF1ZXJpZXMuc3BsaWNlKHF1ZXJ5SW5kZXgsIDEpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiZmEgZmEtdHJhc2hcIiB9KV1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX3ZtLl9sKHF1ZXJ5LCBmdW5jdGlvbihjb25kaXRpb24sIGNvbmRpdGlvbkluZGV4KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHsga2V5OiBjb25kaXRpb25JbmRleCwgc3RhdGljQ2xhc3M6IFwiY29uZGl0aW9uLWNvbnRhaW5lclwiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJvc20tY29uZGl0aW9uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIlF1ZXJ5XCIgKyBxdWVyeUluZGV4LFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBjb25kaXRpb246IGNvbmRpdGlvbiB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tZGVmYXVsdCBidG4taWNvbiByZW1vdmUtY29uZGl0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeS5zcGxpY2UoY29uZGl0aW9uSW5kZXgsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiZmEgZmEtdHJhc2ggcmVtb3ZlLWNvbmRpdGlvblwiIH0pXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tZGVmYXVsdCBidG4tYWRkLWNvbmRpdGlvbiBidG4tc21cIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5LnB1c2goeyBrZXk6IFwiXCIsIG9wZXJhdG9yOiBcIj1cIiwgdmFsdWU6IFwiXCIgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCJBam91dGVyIHVuZSBjb25kaXRpb25cIildXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAyXG4gICAgICAgIClcbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYm91bmRzLXBpY2tlclwiLCB7XG4gICAgICAgIHJlZjogXCJib3VuZHNQaWNrZXJcIixcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICBcIm9zbS1xdWVyeS1vYmplY3RcIjogX3ZtLm9zbVF1ZXJ5T2JqZWN0LFxuICAgICAgICAgIHRpbGVMYXllcjogX3ZtLnRpbGVMYXllcixcbiAgICAgICAgICBcImRlZmF1bHQtYm91bmRzXCI6IF92bS5kZWZhdWx0Qm91bmRzXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICAgICAgICB2YWx1ZTogX3ZtLm92ZXJwYXNzUXVlcnksXG4gICAgICAgICAgICAgIGV4cHJlc3Npb246IFwib3ZlcnBhc3NRdWVyeVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgXCJDb2RlIGF1dG9tYXRpcXVlbWVudCBnw6luw6lyw6kgcG91ciBsYSByZXF1w6p0ZSBPcGVuU3RyZWV0TWFwICh2aWEgT3ZlclBhc3MpXCJcbiAgICAgICAgICApXG4gICAgICAgIF1cbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwicHJlXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICAgICAgICB2YWx1ZTogX3ZtLm92ZXJwYXNzUXVlcnksXG4gICAgICAgICAgICAgIGV4cHJlc3Npb246IFwib3ZlcnBhc3NRdWVyeVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0ub3ZlcnBhc3NRdWVyeSkpXVxuICAgICAgKVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY29uZGl0aW9uXCIgfSxcbiAgICBbXG4gICAgICBfYyhcIm9zbS13aWtpLWxpbmtcIiwge1xuICAgICAgICByZWY6IFwid2lraUxpbmtcIixcbiAgICAgICAgYXR0cnM6IHsgY29uZGl0aW9uOiBfdm0uY29uZGl0aW9uIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICB2YWx1ZTogX3ZtLmNvbmRpdGlvbi5rZXksXG4gICAgICAgICAgICBleHByZXNzaW9uOiBcImNvbmRpdGlvbi5rZXlcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgcmVmOiBcImlucHV0S2V5XCIsXG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICBhdHRyczogeyB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiQ2hlcmNoZXIgdW5lIGNsw6lcIiB9LFxuICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLmNvbmRpdGlvbi5rZXkgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdm0uJHNldChfdm0uY29uZGl0aW9uLCBcImtleVwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwic2VsZWN0XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBfdm0uY29uZGl0aW9uLm9wZXJhdG9yLFxuICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImNvbmRpdGlvbi5vcGVyYXRvclwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICByZWY6IFwic2VsZWN0T3BlcmF0b3JcIixcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb25kaXRpb24tb3BlcmF0b3IgZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIFwiZGF0YS1zb25hdGEtc2VsZWN0MlwiOiBcImZhbHNlXCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJDb25kaXRpb24uLi5cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgIHZhciAkJHNlbGVjdGVkVmFsID0gQXJyYXkucHJvdG90eXBlLmZpbHRlclxuICAgICAgICAgICAgICAgIC5jYWxsKCRldmVudC50YXJnZXQub3B0aW9ucywgZnVuY3Rpb24obykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG8uc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24obykge1xuICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IFwiX3ZhbHVlXCIgaW4gbyA/IG8uX3ZhbHVlIDogby52YWx1ZVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgIF92bS5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgXCJvcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICRldmVudC50YXJnZXQubXVsdGlwbGUgPyAkJHNlbGVjdGVkVmFsIDogJCRzZWxlY3RlZFZhbFswXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJvcHRpb25cIiwgeyBhdHRyczogeyB2YWx1ZTogXCJcIiB9IH0sIFtfdm0uX3YoXCJFeGlzdGVcIildKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwib3B0aW9uXCIsIHsgYXR0cnM6IHsgdmFsdWU6IFwiIVwiIH0gfSwgW192bS5fdihcIk4nZXhpc3RlIHBhc1wiKV0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJvcHRpb25cIiwgeyBhdHRyczogeyB2YWx1ZTogXCI9XCIgfSB9LCBbX3ZtLl92KFwiRXN0IMOpZ2FsIMOgXCIpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcIm9wdGlvblwiLCB7IGF0dHJzOiB7IHZhbHVlOiBcIiE9XCIgfSB9LCBbX3ZtLl92KFwiRGlmZsOpcmVudCBkZVwiKV0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJvcHRpb25cIiwgeyBhdHRyczogeyB2YWx1ZTogXCJ+XCIgfSB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXCJFc3QgbCd1bmUgZGVzIHZhbGV1cnNcIilcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwib3B0aW9uXCIsIHsgYXR0cnM6IHsgdmFsdWU6IFwiIX5cIiB9IH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcIk4nZXN0IGF1Y3VuZSBkZXMgdmFsZXVyc1wiKVxuICAgICAgICAgIF0pXG4gICAgICAgIF1cbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgIHZhbHVlOiBfdm0uY29uZGl0aW9uLnZhbHVlLFxuICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjb25kaXRpb24udmFsdWVcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgcmVmOiBcImlucHV0VmFsdWVcIixcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBbXCJcIiwgXCIhXCJdLmluY2x1ZGVzKF92bS5jb25kaXRpb24ub3BlcmF0b3IpIH0sXG4gICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uY29uZGl0aW9uLnZhbHVlIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLmNvbmRpdGlvbiwgXCJ2YWx1ZVwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX3ZtLl9tKDApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcInBcIiwgW1xuICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbCB0YWctc2VhcmNoXCIsXG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6XG4gICAgICAgICAgICBcIlJlY2hlcmNoZSByYXBpZGUgZGFucyBPcGVuU3RlZXRNYXAgZW4gQW5nbGFpcyAocmVzdGF1cmFudCwgb3JnYW5pYywgc2Vjb25kIGhhbmQuLi4pXCJcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX3ZtLmNvbmRpdGlvbi5rZXlcbiAgICA/IF9jKFxuICAgICAgICBcImFcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tZGVmYXVsdCBidG4taWNvblwiLFxuICAgICAgICAgIGF0dHJzOiB7IGhyZWY6IF92bS51cmwsIHRhcmdldDogXCJfYmxhbmtcIiwgdGl0bGU6IF92bS50aXRsZSB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcImlcIiwge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgIFwiZmEgZmEtZXh0ZXJuYWwtbGluay1zcXVhcmUgZmFzIGZhLWV4dGVybmFsLWxpbmstc3F1YXJlLWFsdFwiXG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgKVxuICAgIDogX3ZtLl9lKClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iXSwic291cmNlUm9vdCI6IiJ9