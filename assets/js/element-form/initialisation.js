/**
 * This file is part of the GoGoCarto project.
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @copyright Copyright (c) 2016 Sebastian Castro - 90scastro@gmail.com
 * @license    MIT License
 * @Last Modified time: 2018-02-20 17:36:33
 */
jQuery(document).ready(function()
{
  $('select:not(.select2)').material_select();

  $('select.select2').change(function() {
    // add relevant classes to prefix icon, to it's colored the same way than other fields
    $(this).closest('.input-field').find('.material-icons').toggleClass('valid', !!$(this).val());
    // Because it was not possible to use a name like data[myfield][] with select, we store
    // the select2 value serialized in a hidden input. This hidden input will be deserilized in ElementFormService
    var result = {};
    $(this).siblings('.select2-container').find('.select2-selection__choice').each(function() {
      result[$(this).data('select2-id')] = $(this).attr('title');
    })
    $(this).siblings('.select-encoded-result').val(JSON.stringify(result));
  })
  $('select.select2').trigger('change');
  // add relevant classes to prefix icon, to it's colored the same way than other fields
  $('.select2-search__field').focus(function() { $(this).closest('.input-field').find('.material-icons').addClass('active') })
  $('.select2-search__field').blur(function() { $(this).closest('.input-field').find('.material-icons').removeClass('active') })

  $('.to-html').each(function() { $(this).html($(this).text()); });

  // TIMEPICKERS
  $('.timepicker').each(function(e) {
    var start_time;
    switch ($(this).data('slot-number'))
    {
      case 1: start_time = ["09", "00"];break;
      case 2: start_time = ["12", "00"];break;
      case 3: start_time = ["14", "00"];break;
      case 4: start_time = ["18", "00"];break;
    }
    if ($(this).val()) { start_time = $(this).val().split(':'); }
    $(this).timepicki({start_time: start_time, increase_direction:"up", show_meridian:false, step_size_minutes:15,min_hour_value:0, max_hour_value:23, overflow_minutes:true});
  });

	$('.tooltipped').tooltip();

  // fix problem on textarea initialisation
  $('.materialize-textarea').each(function() {
    $(this).val($(this).attr('value'));
    $(this).trigger('autoresize');
  });

	// ---------------
	// LISTENERS
	// ---------------

	// OPEN HOURS
	// 2nd time slot
	$('.add-time-slot-button').click(function() { addTimeSlot($(this).attr('id').split("_")[0]); });
  $('.clear-time-slot-button').click(function() { clearTimeSlot($(this).attr('id').split("_")[0]); });
	// recopy info
	$('.redo-time-slot-button').click(function() { redoTimeSlot($(this).attr('id').split("_")[0]); });

  $('.btn-add-file').click(function (e) {
    var type = $(this).data('type');
    var maxsize = $(this).data('maxsize');
    // grab the prototype template
    var counter = parseInt($(this).data('count'));
    var newWidget = $('.new-file-template.' + type).html().replace(/__count__/g, counter);
    console.log("add file", type, counter);
    $(this).data('count', counter + 1);

    // create a new list element and add it to the list
    var newElem = $('<li></li>').html(newWidget);
    newElem.appendTo($('.new-file-fields-list.' + type));
    var uploadField = newElem.find('input[type=file]');
    uploadField.trigger('click');

    uploadField.change(function() {
      newElem.find('.file-too-big').hide();
      if(this.files[0].size > maxsize){
         newElem.find('.file-too-big').show();
         this.value = "";
      };
    });
  });

  $('.file-fields-list .btn-close').click(function() {
    $(this).closest('li').remove();
  })
});



