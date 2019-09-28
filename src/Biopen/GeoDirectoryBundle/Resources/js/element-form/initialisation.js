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
  $('select').material_select();

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

  var imagesCounter = $('#images-fields-list').children().length;
  $('.btn-add-image').click(function (e) {
    // grab the prototype template
    var newWidget = $('#new-image-template').html().replace(/__count__/g, imagesCounter);
    imagesCounter++;

    // create a new list element and add it to the list
    var newElem = $('<li></li>').html(newWidget);
    newElem.appendTo($('#new-images-fields-list'));
    var uploadField = newElem.find('input[type=file]');
    uploadField.trigger('click');

    uploadField.change(function() {
      newElem.find('.file-too-big').hide();
      if(this.files[0].size > uploadMaxFilesize){
         newElem.find('.file-too-big').show();
         this.value = "";
      };
    });
  });

  $('#images-fields-list .icon-close').click(function() {
    $(this).closest('li').remove();
  })
});



