/*!
 * Datepicker for Bootstrap v1.6.4 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a,b){function c(){return new Date(Date.UTC.apply(Date,arguments))}function d(){var a=new Date;return c(a.getFullYear(),a.getMonth(),a.getDate())}function e(a,b){return a.getUTCFullYear()===b.getUTCFullYear()&&a.getUTCMonth()===b.getUTCMonth()&&a.getUTCDate()===b.getUTCDate()}function f(a){return function(){return this[a].apply(this,arguments)}}function g(a){return a&&!isNaN(a.getTime())}function h(b,c){function d(a,b){return b.toLowerCase()}var e,f=a(b).data(),g={},h=new RegExp("^"+c.toLowerCase()+"([A-Z])");c=new RegExp("^"+c.toLowerCase());for(var i in f)c.test(i)&&(e=i.replace(h,d),g[e]=f[i]);return g}function i(b){var c={};if(q[b]||(b=b.split("-")[0],q[b])){var d=q[b];return a.each(p,function(a,b){b in d&&(c[b]=d[b])}),c}}var j=function(){var b={get:function(a){return this.slice(a)[0]},contains:function(a){for(var b=a&&a.valueOf(),c=0,d=this.length;d>c;c++)if(this[c].valueOf()===b)return c;return-1},remove:function(a){this.splice(a,1)},replace:function(b){b&&(a.isArray(b)||(b=[b]),this.clear(),this.push.apply(this,b))},clear:function(){this.length=0},copy:function(){var a=new j;return a.replace(this),a}};return function(){var c=[];return c.push.apply(c,arguments),a.extend(c,b),c}}(),k=function(b,c){a(b).data("datepicker",this),this._process_options(c),this.dates=new j,this.viewDate=this.o.defaultViewDate,this.focusDate=null,this.element=a(b),this.isInput=this.element.is("input"),this.inputField=this.isInput?this.element:this.element.find("input"),this.component=this.element.hasClass("date")?this.element.find(".add-on, .input-group-addon, .btn"):!1,this.hasInput=this.component&&this.inputField.length,this.component&&0===this.component.length&&(this.component=!1),this.isInline=!this.component&&this.element.is("div"),this.picker=a(r.template),this._check_template(this.o.templates.leftArrow)&&this.picker.find(".prev").html(this.o.templates.leftArrow),this._check_template(this.o.templates.rightArrow)&&this.picker.find(".next").html(this.o.templates.rightArrow),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan",function(a,b){return parseInt(b)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted),this.setDatesDisabled(this.o.datesDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};k.prototype={constructor:k,_resolveViewName:function(a,c){return 0===a||"days"===a||"month"===a?0:1===a||"months"===a||"year"===a?1:2===a||"years"===a||"decade"===a?2:3===a||"decades"===a||"century"===a?3:4===a||"centuries"===a||"millennium"===a?4:c===b?!1:c},_check_template:function(c){try{if(c===b||""===c)return!1;if((c.match(/[<>]/g)||[]).length<=0)return!0;var d=a(c);return d.length>0}catch(e){return!1}},_process_options:function(b){this._o=a.extend({},this._o,b);var e=this.o=a.extend({},this._o),f=e.language;q[f]||(f=f.split("-")[0],q[f]||(f=o.language)),e.language=f,e.startView=this._resolveViewName(e.startView,0),e.minViewMode=this._resolveViewName(e.minViewMode,0),e.maxViewMode=this._resolveViewName(e.maxViewMode,4),e.startView=Math.min(e.startView,e.maxViewMode),e.startView=Math.max(e.startView,e.minViewMode),e.multidate!==!0&&(e.multidate=Number(e.multidate)||!1,e.multidate!==!1&&(e.multidate=Math.max(0,e.multidate))),e.multidateSeparator=String(e.multidateSeparator),e.weekStart%=7,e.weekEnd=(e.weekStart+6)%7;var g=r.parseFormat(e.format);e.startDate!==-(1/0)&&(e.startDate?e.startDate instanceof Date?e.startDate=this._local_to_utc(this._zero_time(e.startDate)):e.startDate=r.parseDate(e.startDate,g,e.language,e.assumeNearbyYear):e.startDate=-(1/0)),e.endDate!==1/0&&(e.endDate?e.endDate instanceof Date?e.endDate=this._local_to_utc(this._zero_time(e.endDate)):e.endDate=r.parseDate(e.endDate,g,e.language,e.assumeNearbyYear):e.endDate=1/0),e.daysOfWeekDisabled=e.daysOfWeekDisabled||[],a.isArray(e.daysOfWeekDisabled)||(e.daysOfWeekDisabled=e.daysOfWeekDisabled.split(/[,\s]*/)),e.daysOfWeekDisabled=a.map(e.daysOfWeekDisabled,function(a){return parseInt(a,10)}),e.daysOfWeekHighlighted=e.daysOfWeekHighlighted||[],a.isArray(e.daysOfWeekHighlighted)||(e.daysOfWeekHighlighted=e.daysOfWeekHighlighted.split(/[,\s]*/)),e.daysOfWeekHighlighted=a.map(e.daysOfWeekHighlighted,function(a){return parseInt(a,10)}),e.datesDisabled=e.datesDisabled||[],a.isArray(e.datesDisabled)||(e.datesDisabled=[e.datesDisabled]),e.datesDisabled=a.map(e.datesDisabled,function(a){return r.parseDate(a,g,e.language,e.assumeNearbyYear)});var h=String(e.orientation).toLowerCase().split(/\s+/g),i=e.orientation.toLowerCase();if(h=a.grep(h,function(a){return/^auto|left|right|top|bottom$/.test(a)}),e.orientation={x:"auto",y:"auto"},i&&"auto"!==i)if(1===h.length)switch(h[0]){case"top":case"bottom":e.orientation.y=h[0];break;case"left":case"right":e.orientation.x=h[0]}else i=a.grep(h,function(a){return/^left|right$/.test(a)}),e.orientation.x=i[0]||"auto",i=a.grep(h,function(a){return/^top|bottom$/.test(a)}),e.orientation.y=i[0]||"auto";else;if(e.defaultViewDate){var j=e.defaultViewDate.year||(new Date).getFullYear(),k=e.defaultViewDate.month||0,l=e.defaultViewDate.day||1;e.defaultViewDate=c(j,k,l)}else e.defaultViewDate=d()},_events:[],_secondaryEvents:[],_applyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(d=b,e=a[f][1]):3===a[f].length&&(d=a[f][1],e=a[f][2]),c.on(e,d)},_unapplyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(e=b,d=a[f][1]):3===a[f].length&&(e=a[f][1],d=a[f][2]),c.off(d,e)},_buildEvents:function(){var b={keyup:a.proxy(function(b){-1===a.inArray(b.keyCode,[27,37,39,38,40,32,13,9])&&this.update()},this),keydown:a.proxy(this.keydown,this),paste:a.proxy(this.paste,this)};this.o.showOnFocus===!0&&(b.focus=a.proxy(this.show,this)),this.isInput?this._events=[[this.element,b]]:this.component&&this.hasInput?this._events=[[this.inputField,b],[this.component,{click:a.proxy(this.show,this)}]]:this._events=[[this.element,{click:a.proxy(this.show,this),keydown:a.proxy(this.keydown,this)}]],this._events.push([this.element,"*",{blur:a.proxy(function(a){this._focused_from=a.target},this)}],[this.element,{blur:a.proxy(function(a){this._focused_from=a.target},this)}]),this.o.immediateUpdates&&this._events.push([this.element,{"changeYear changeMonth":a.proxy(function(a){this.update(a.date)},this)}]),this._secondaryEvents=[[this.picker,{click:a.proxy(this.click,this)}],[a(window),{resize:a.proxy(this.place,this)}],[a(document),{mousedown:a.proxy(function(a){this.element.is(a.target)||this.element.find(a.target).length||this.picker.is(a.target)||this.picker.find(a.target).length||this.isInline||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(b,c){var d=c||this.dates.get(-1),e=this._utc_to_local(d);this.element.trigger({type:b,date:e,dates:a.map(this.dates,this._utc_to_local),format:a.proxy(function(a,b){0===arguments.length?(a=this.dates.length-1,b=this.o.format):"string"==typeof a&&(b=a,a=this.dates.length-1),b=b||this.o.format;var c=this.dates.get(a);return r.formatDate(c,b,this.o.language)},this)})},show:function(){return this.inputField.prop("disabled")||this.inputField.prop("readonly")&&this.o.enableOnReadonly===!1?void 0:(this.isInline||this.picker.appendTo(this.o.container),this.place(),this.picker.show(),this._attachSecondaryEvents(),this._trigger("show"),(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&this.o.disableTouchKeyboard&&a(this.element).blur(),this)},hide:function(){return this.isInline||!this.picker.is(":visible")?this:(this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&this.inputField.val()&&this.setValue(),this._trigger("hide"),this)},destroy:function(){return this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date,this},paste:function(b){var c;if(b.originalEvent.clipboardData&&b.originalEvent.clipboardData.types&&-1!==a.inArray("text/plain",b.originalEvent.clipboardData.types))c=b.originalEvent.clipboardData.getData("text/plain");else{if(!window.clipboardData)return;c=window.clipboardData.getData("Text")}this.setDate(c),this.update(),b.preventDefault()},_utc_to_local:function(a){return a&&new Date(a.getTime()+6e4*a.getTimezoneOffset())},_local_to_utc:function(a){return a&&new Date(a.getTime()-6e4*a.getTimezoneOffset())},_zero_time:function(a){return a&&new Date(a.getFullYear(),a.getMonth(),a.getDate())},_zero_utc_time:function(a){return a&&new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate()))},getDates:function(){return a.map(this.dates,this._utc_to_local)},getUTCDates:function(){return a.map(this.dates,function(a){return new Date(a)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){var a=this.dates.get(-1);return"undefined"!=typeof a?new Date(a):null},clearDates:function(){this.inputField&&this.inputField.val(""),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()},setDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,b),this._trigger("changeDate"),this.setValue(),this},setUTCDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,a.map(b,this._utc_to_local)),this._trigger("changeDate"),this.setValue(),this},setDate:f("setDates"),setUTCDate:f("setUTCDates"),remove:f("destroy"),setValue:function(){var a=this.getFormattedDate();return this.inputField.val(a),this},getFormattedDate:function(c){c===b&&(c=this.o.format);var d=this.o.language;return a.map(this.dates,function(a){return r.formatDate(a,c,d)}).join(this.o.multidateSeparator)},getStartDate:function(){return this.o.startDate},setStartDate:function(a){return this._process_options({startDate:a}),this.update(),this.updateNavArrows(),this},getEndDate:function(){return this.o.endDate},setEndDate:function(a){return this._process_options({endDate:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekDisabled:function(a){return this._process_options({daysOfWeekDisabled:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekHighlighted:function(a){return this._process_options({daysOfWeekHighlighted:a}),this.update(),this},setDatesDisabled:function(a){this._process_options({datesDisabled:a}),this.update(),this.updateNavArrows()},place:function(){if(this.isInline)return this;var b=this.picker.outerWidth(),c=this.picker.outerHeight(),d=10,e=a(this.o.container),f=e.width(),g="body"===this.o.container?a(document).scrollTop():e.scrollTop(),h=e.offset(),i=[];this.element.parents().each(function(){var b=a(this).css("z-index");"auto"!==b&&0!==b&&i.push(parseInt(b))});var j=Math.max.apply(Math,i)+this.o.zIndexOffset,k=this.component?this.component.parent().offset():this.element.offset(),l=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),m=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),n=k.left-h.left,o=k.top-h.top;"body"!==this.o.container&&(o+=g),this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(n-=b-m)):k.left<0?(this.picker.addClass("datepicker-orient-left"),n-=k.left-d):n+b>f?(this.picker.addClass("datepicker-orient-right"),n+=m-b):this.picker.addClass("datepicker-orient-left");var p,q=this.o.orientation.y;if("auto"===q&&(p=-g+o-c,q=0>p?"bottom":"top"),this.picker.addClass("datepicker-orient-"+q),"top"===q?o-=c+parseInt(this.picker.css("padding-top")):o+=l,this.o.rtl){var r=f-(n+m);this.picker.css({top:o,right:r,zIndex:j})}else this.picker.css({top:o,left:n,zIndex:j});return this},_allow_update:!0,update:function(){if(!this._allow_update)return this;var b=this.dates.copy(),c=[],d=!1;return arguments.length?(a.each(arguments,a.proxy(function(a,b){b instanceof Date&&(b=this._local_to_utc(b)),c.push(b)},this)),d=!0):(c=this.isInput?this.element.val():this.element.data("date")||this.inputField.val(),c=c&&this.o.multidate?c.split(this.o.multidateSeparator):[c],delete this.element.data().date),c=a.map(c,a.proxy(function(a){return r.parseDate(a,this.o.format,this.o.language,this.o.assumeNearbyYear)},this)),c=a.grep(c,a.proxy(function(a){return!this.dateWithinRange(a)||!a},this),!0),this.dates.replace(c),this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate?this.viewDate=new Date(this.o.endDate):this.viewDate=this.o.defaultViewDate,d?this.setValue():c.length&&String(b)!==String(this.dates)&&this._trigger("changeDate"),!this.dates.length&&b.length&&this._trigger("clearDate"),this.fill(),this.element.change(),this},fillDow:function(){var b=this.o.weekStart,c="<tr>";for(this.o.calendarWeeks&&(this.picker.find(".datepicker-days .datepicker-switch").attr("colspan",function(a,b){return parseInt(b)+1}),c+='<th class="cw">&#160;</th>');b<this.o.weekStart+7;)c+='<th class="dow',a.inArray(b,this.o.daysOfWeekDisabled)>-1&&(c+=" disabled"),c+='">'+q[this.o.language].daysMin[b++%7]+"</th>";c+="</tr>",this.picker.find(".datepicker-days thead").append(c)},fillMonths:function(){for(var a=this._utc_to_local(this.viewDate),b="",c=0;12>c;){var d=a&&a.getMonth()===c?" focused":"";b+='<span class="month'+d+'">'+q[this.o.language].monthsShort[c++]+"</span>"}this.picker.find(".datepicker-months td").html(b)},setRange:function(b){b&&b.length?this.range=a.map(b,function(a){return a.valueOf()}):delete this.range,this.fill()},getClassNames:function(b){var c=[],d=this.viewDate.getUTCFullYear(),e=this.viewDate.getUTCMonth(),f=new Date;return b.getUTCFullYear()<d||b.getUTCFullYear()===d&&b.getUTCMonth()<e?c.push("old"):(b.getUTCFullYear()>d||b.getUTCFullYear()===d&&b.getUTCMonth()>e)&&c.push("new"),this.focusDate&&b.valueOf()===this.focusDate.valueOf()&&c.push("focused"),this.o.todayHighlight&&b.getUTCFullYear()===f.getFullYear()&&b.getUTCMonth()===f.getMonth()&&b.getUTCDate()===f.getDate()&&c.push("today"),-1!==this.dates.contains(b)&&c.push("active"),this.dateWithinRange(b)||c.push("disabled"),this.dateIsDisabled(b)&&c.push("disabled","disabled-date"),-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekHighlighted)&&c.push("highlighted"),this.range&&(b>this.range[0]&&b<this.range[this.range.length-1]&&c.push("range"),-1!==a.inArray(b.valueOf(),this.range)&&c.push("selected"),b.valueOf()===this.range[0]&&c.push("range-start"),b.valueOf()===this.range[this.range.length-1]&&c.push("range-end")),c},_fill_yearsView:function(c,d,e,f,g,h,i,j){var k,l,m,n,o,p,q,r,s,t,u;for(k="",l=this.picker.find(c),m=parseInt(g/e,10)*e,o=parseInt(h/f,10)*f,p=parseInt(i/f,10)*f,n=a.map(this.dates,function(a){return parseInt(a.getUTCFullYear()/f,10)*f}),l.find(".datepicker-switch").text(m+"-"+(m+9*f)),q=m-f,r=-1;11>r;r+=1)s=[d],t=null,-1===r?s.push("old"):10===r&&s.push("new"),-1!==a.inArray(q,n)&&s.push("active"),(o>q||q>p)&&s.push("disabled"),q===this.viewDate.getFullYear()&&s.push("focused"),j!==a.noop&&(u=j(new Date(q,0,1)),u===b?u={}:"boolean"==typeof u?u={enabled:u}:"string"==typeof u&&(u={classes:u}),u.enabled===!1&&s.push("disabled"),u.classes&&(s=s.concat(u.classes.split(/\s+/))),u.tooltip&&(t=u.tooltip)),k+='<span class="'+s.join(" ")+'"'+(t?' title="'+t+'"':"")+">"+q+"</span>",q+=f;l.find("td").html(k)},fill:function(){var d,e,f=new Date(this.viewDate),g=f.getUTCFullYear(),h=f.getUTCMonth(),i=this.o.startDate!==-(1/0)?this.o.startDate.getUTCFullYear():-(1/0),j=this.o.startDate!==-(1/0)?this.o.startDate.getUTCMonth():-(1/0),k=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,l=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,m=q[this.o.language].today||q.en.today||"",n=q[this.o.language].clear||q.en.clear||"",o=q[this.o.language].titleFormat||q.en.titleFormat;if(!isNaN(g)&&!isNaN(h)){this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(f,o,this.o.language)),this.picker.find("tfoot .today").text(m).toggle(this.o.todayBtn!==!1),this.picker.find("tfoot .clear").text(n).toggle(this.o.clearBtn!==!1),this.picker.find("thead .datepicker-title").text(this.o.title).toggle(""!==this.o.title),this.updateNavArrows(),this.fillMonths();var p=c(g,h-1,28),s=r.getDaysInMonth(p.getUTCFullYear(),p.getUTCMonth());p.setUTCDate(s),p.setUTCDate(s-(p.getUTCDay()-this.o.weekStart+7)%7);var t=new Date(p);p.getUTCFullYear()<100&&t.setUTCFullYear(p.getUTCFullYear()),t.setUTCDate(t.getUTCDate()+42),t=t.valueOf();for(var u,v=[];p.valueOf()<t;){if(p.getUTCDay()===this.o.weekStart&&(v.push("<tr>"),this.o.calendarWeeks)){var w=new Date(+p+(this.o.weekStart-p.getUTCDay()-7)%7*864e5),x=new Date(Number(w)+(11-w.getUTCDay())%7*864e5),y=new Date(Number(y=c(x.getUTCFullYear(),0,1))+(11-y.getUTCDay())%7*864e5),z=(x-y)/864e5/7+1;v.push('<td class="cw">'+z+"</td>")}u=this.getClassNames(p),u.push("day"),this.o.beforeShowDay!==a.noop&&(e=this.o.beforeShowDay(this._utc_to_local(p)),e===b?e={}:"boolean"==typeof e?e={enabled:e}:"string"==typeof e&&(e={classes:e}),e.enabled===!1&&u.push("disabled"),e.classes&&(u=u.concat(e.classes.split(/\s+/))),e.tooltip&&(d=e.tooltip)),u=a.isFunction(a.uniqueSort)?a.uniqueSort(u):a.unique(u),v.push('<td class="'+u.join(" ")+'"'+(d?' title="'+d+'"':"")+">"+p.getUTCDate()+"</td>"),d=null,p.getUTCDay()===this.o.weekEnd&&v.push("</tr>"),p.setUTCDate(p.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(v.join(""));var A=q[this.o.language].monthsTitle||q.en.monthsTitle||"Months",B=this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode<2?A:g).end().find("span").removeClass("active");if(a.each(this.dates,function(a,b){b.getUTCFullYear()===g&&B.eq(b.getUTCMonth()).addClass("active")}),(i>g||g>k)&&B.addClass("disabled"),g===i&&B.slice(0,j).addClass("disabled"),g===k&&B.slice(l+1).addClass("disabled"),this.o.beforeShowMonth!==a.noop){var C=this;a.each(B,function(c,d){var e=new Date(g,c,1),f=C.o.beforeShowMonth(e);f===b?f={}:"boolean"==typeof f?f={enabled:f}:"string"==typeof f&&(f={classes:f}),f.enabled!==!1||a(d).hasClass("disabled")||a(d).addClass("disabled"),f.classes&&a(d).addClass(f.classes),f.tooltip&&a(d).prop("title",f.tooltip)})}this._fill_yearsView(".datepicker-years","year",10,1,g,i,k,this.o.beforeShowYear),this._fill_yearsView(".datepicker-decades","decade",100,10,g,i,k,this.o.beforeShowDecade),this._fill_yearsView(".datepicker-centuries","century",1e3,100,g,i,k,this.o.beforeShowCentury)}},updateNavArrows:function(){if(this._allow_update){var a=new Date(this.viewDate),b=a.getUTCFullYear(),c=a.getUTCMonth();switch(this.viewMode){case 0:this.o.startDate!==-(1/0)&&b<=this.o.startDate.getUTCFullYear()&&c<=this.o.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&b>=this.o.endDate.getUTCFullYear()&&c>=this.o.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:case 3:case 4:this.o.startDate!==-(1/0)&&b<=this.o.startDate.getUTCFullYear()||this.o.maxViewMode<2?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&b>=this.o.endDate.getUTCFullYear()||this.o.maxViewMode<2?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}}},click:function(b){b.preventDefault(),b.stopPropagation();var e,f,g,h,i,j,k;e=a(b.target),e.hasClass("datepicker-switch")&&this.showMode(1);var l=e.closest(".prev, .next");l.length>0&&(f=r.modes[this.viewMode].navStep*(l.hasClass("prev")?-1:1),0===this.viewMode?(this.viewDate=this.moveMonth(this.viewDate,f),this._trigger("changeMonth",this.viewDate)):(this.viewDate=this.moveYear(this.viewDate,f),1===this.viewMode&&this._trigger("changeYear",this.viewDate)),this.fill()),e.hasClass("today")&&!e.hasClass("day")&&(this.showMode(-2),this._setDate(d(),"linked"===this.o.todayBtn?null:"view")),e.hasClass("clear")&&this.clearDates(),e.hasClass("disabled")||(e.hasClass("day")&&(g=parseInt(e.text(),10)||1,h=this.viewDate.getUTCFullYear(),i=this.viewDate.getUTCMonth(),e.hasClass("old")&&(0===i?(i=11,h-=1,j=!0,k=!0):(i-=1,j=!0)),e.hasClass("new")&&(11===i?(i=0,h+=1,j=!0,k=!0):(i+=1,j=!0)),this._setDate(c(h,i,g)),k&&this._trigger("changeYear",this.viewDate),j&&this._trigger("changeMonth",this.viewDate)),e.hasClass("month")&&(this.viewDate.setUTCDate(1),g=1,i=e.parent().find("span").index(e),h=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(i),this._trigger("changeMonth",this.viewDate),1===this.o.minViewMode?(this._setDate(c(h,i,g)),this.showMode()):this.showMode(-1),this.fill()),(e.hasClass("year")||e.hasClass("decade")||e.hasClass("century"))&&(this.viewDate.setUTCDate(1),g=1,i=0,h=parseInt(e.text(),10)||0,this.viewDate.setUTCFullYear(h),e.hasClass("year")&&(this._trigger("changeYear",this.viewDate),2===this.o.minViewMode&&this._setDate(c(h,i,g))),e.hasClass("decade")&&(this._trigger("changeDecade",this.viewDate),3===this.o.minViewMode&&this._setDate(c(h,i,g))),e.hasClass("century")&&(this._trigger("changeCentury",this.viewDate),4===this.o.minViewMode&&this._setDate(c(h,i,g))),this.showMode(-1),this.fill())),this.picker.is(":visible")&&this._focused_from&&a(this._focused_from).focus(),delete this._focused_from},_toggle_multidate:function(a){var b=this.dates.contains(a);if(a||this.dates.clear(),-1!==b?(this.o.multidate===!0||this.o.multidate>1||this.o.toggleActive)&&this.dates.remove(b):this.o.multidate===!1?(this.dates.clear(),this.dates.push(a)):this.dates.push(a),"number"==typeof this.o.multidate)for(;this.dates.length>this.o.multidate;)this.dates.remove(0)},_setDate:function(a,b){b&&"date"!==b||this._toggle_multidate(a&&new Date(a)),b&&"view"!==b||(this.viewDate=a&&new Date(a)),this.fill(),this.setValue(),b&&"view"===b||this._trigger("changeDate"),this.inputField&&this.inputField.change(),!this.o.autoclose||b&&"date"!==b||this.hide()},moveDay:function(a,b){var c=new Date(a);return c.setUTCDate(a.getUTCDate()+b),c},moveWeek:function(a,b){return this.moveDay(a,7*b)},moveMonth:function(a,b){if(!g(a))return this.o.defaultViewDate;if(!b)return a;var c,d,e=new Date(a.valueOf()),f=e.getUTCDate(),h=e.getUTCMonth(),i=Math.abs(b);if(b=b>0?1:-1,1===i)d=-1===b?function(){return e.getUTCMonth()===h}:function(){return e.getUTCMonth()!==c},c=h+b,e.setUTCMonth(c),(0>c||c>11)&&(c=(c+12)%12);else{for(var j=0;i>j;j++)e=this.moveMonth(e,b);c=e.getUTCMonth(),e.setUTCDate(f),d=function(){return c!==e.getUTCMonth()}}for(;d();)e.setUTCDate(--f),e.setUTCMonth(c);return e},moveYear:function(a,b){return this.moveMonth(a,12*b)},moveAvailableDate:function(a,b,c){do{if(a=this[c](a,b),!this.dateWithinRange(a))return!1;c="moveDay"}while(this.dateIsDisabled(a));return a},weekOfDateIsDisabled:function(b){return-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekDisabled)},dateIsDisabled:function(b){return this.weekOfDateIsDisabled(b)||a.grep(this.o.datesDisabled,function(a){return e(b,a)}).length>0},dateWithinRange:function(a){return a>=this.o.startDate&&a<=this.o.endDate},keydown:function(a){if(!this.picker.is(":visible"))return void((40===a.keyCode||27===a.keyCode)&&(this.show(),a.stopPropagation()));var b,c,d=!1,e=this.focusDate||this.viewDate;switch(a.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),a.preventDefault(),a.stopPropagation();break;case 37:case 38:case 39:case 40:if(!this.o.keyboardNavigation||7===this.o.daysOfWeekDisabled.length)break;b=37===a.keyCode||38===a.keyCode?-1:1,0===this.viewMode?a.ctrlKey?(c=this.moveAvailableDate(e,b,"moveYear"),c&&this._trigger("changeYear",this.viewDate)):a.shiftKey?(c=this.moveAvailableDate(e,b,"moveMonth"),c&&this._trigger("changeMonth",this.viewDate)):37===a.keyCode||39===a.keyCode?c=this.moveAvailableDate(e,b,"moveDay"):this.weekOfDateIsDisabled(e)||(c=this.moveAvailableDate(e,b,"moveWeek")):1===this.viewMode?((38===a.keyCode||40===a.keyCode)&&(b=4*b),c=this.moveAvailableDate(e,b,"moveMonth")):2===this.viewMode&&((38===a.keyCode||40===a.keyCode)&&(b=4*b),c=this.moveAvailableDate(e,b,"moveYear")),c&&(this.focusDate=this.viewDate=c,this.setValue(),this.fill(),a.preventDefault());break;case 13:if(!this.o.forceParse)break;e=this.focusDate||this.dates.get(-1)||this.viewDate,this.o.keyboardNavigation&&(this._toggle_multidate(e),d=!0),this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(a.preventDefault(),a.stopPropagation(),this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}d&&(this.dates.length?this._trigger("changeDate"):this._trigger("clearDate"),this.inputField&&this.inputField.change())},showMode:function(a){a&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(this.o.maxViewMode,this.viewMode+a))),this.picker.children("div").hide().filter(".datepicker-"+r.modes[this.viewMode].clsName).show(),this.updateNavArrows()}};var l=function(b,c){a(b).data("datepicker",this),this.element=a(b),this.inputs=a.map(c.inputs,function(a){return a.jquery?a[0]:a}),delete c.inputs,n.call(a(this.inputs),c).on("changeDate",a.proxy(this.dateUpdated,this)),this.pickers=a.map(this.inputs,function(b){return a(b).data("datepicker")}),this.updateDates()};l.prototype={updateDates:function(){this.dates=a.map(this.pickers,function(a){return a.getUTCDate()}),this.updateRanges()},updateRanges:function(){var b=a.map(this.dates,function(a){return a.valueOf()});a.each(this.pickers,function(a,c){c.setRange(b)})},dateUpdated:function(b){if(!this.updating){this.updating=!0;var c=a(b.target).data("datepicker");if("undefined"!=typeof c){var d=c.getUTCDate(),e=a.inArray(b.target,this.inputs),f=e-1,g=e+1,h=this.inputs.length;if(-1!==e){if(a.each(this.pickers,function(a,b){b.getUTCDate()||b.setUTCDate(d)}),d<this.dates[f])for(;f>=0&&d<this.dates[f];)this.pickers[f--].setUTCDate(d);else if(d>this.dates[g])for(;h>g&&d>this.dates[g];)this.pickers[g++].setUTCDate(d);this.updateDates(),delete this.updating}}}},remove:function(){a.map(this.pickers,function(a){a.remove()}),delete this.element.data().datepicker}};var m=a.fn.datepicker,n=function(c){var d=Array.apply(null,arguments);d.shift();var e;if(this.each(function(){var b=a(this),f=b.data("datepicker"),g="object"==typeof c&&c;if(!f){var j=h(this,"date"),m=a.extend({},o,j,g),n=i(m.language),p=a.extend({},o,n,j,g);b.hasClass("input-daterange")||p.inputs?(a.extend(p,{inputs:p.inputs||b.find("input").toArray()}),f=new l(this,p)):f=new k(this,p),b.data("datepicker",f)}"string"==typeof c&&"function"==typeof f[c]&&(e=f[c].apply(f,d))}),e===b||e instanceof k||e instanceof l)return this;if(this.length>1)throw new Error("Using only allowed for the collection of a single element ("+c+" function)");return e};a.fn.datepicker=n;var o=a.fn.datepicker.defaults={assumeNearbyYear:!1,autoclose:!1,beforeShowDay:a.noop,beforeShowMonth:a.noop,beforeShowYear:a.noop,beforeShowDecade:a.noop,beforeShowCentury:a.noop,calendarWeeks:!1,clearBtn:!1,toggleActive:!1,daysOfWeekDisabled:[],daysOfWeekHighlighted:[],datesDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,maxViewMode:4,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-(1/0),startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0,disableTouchKeyboard:!1,enableOnReadonly:!0,showOnFocus:!0,zIndexOffset:10,container:"body",immediateUpdates:!1,title:"",templates:{leftArrow:"&laquo;",rightArrow:"&raquo;"}},p=a.fn.datepicker.locale_opts=["format","rtl","weekStart"];a.fn.datepicker.Constructor=k;var q=a.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",titleFormat:"MM yyyy"}},r={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10},{clsName:"decades",navFnc:"FullDecade",navStep:100},{clsName:"centuries",navFnc:"FullCentury",navStep:1e3}],isLeapYear:function(a){return a%4===0&&a%100!==0||a%400===0},getDaysInMonth:function(a,b){return[31,r.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,parseFormat:function(a){if("function"==typeof a.toValue&&"function"==typeof a.toDisplay)return a;var b=a.replace(this.validParts,"\x00").split("\x00"),c=a.match(this.validParts);if(!b||!b.length||!c||0===c.length)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(e,f,g,h){function i(a,b){return b===!0&&(b=10),100>a&&(a+=2e3,a>(new Date).getFullYear()+b&&(a-=100)),a}function j(){var a=this.slice(0,s[n].length),b=s[n].slice(0,a.length);return a.toLowerCase()===b.toLowerCase()}if(!e)return b;if(e instanceof Date)return e;if("string"==typeof f&&(f=r.parseFormat(f)),f.toValue)return f.toValue(e,f,g);var l,m,n,o,p=/([\-+]\d+)([dmwy])/,s=e.match(/([\-+]\d+)([dmwy])/g),t={d:"moveDay",m:"moveMonth",w:"moveWeek",y:"moveYear"},u={yesterday:"-1d",today:"+0d",tomorrow:"+1d"};if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)){for(e=new Date,n=0;n<s.length;n++)l=p.exec(s[n]),m=parseInt(l[1]),o=t[l[2]],e=k.prototype[o](e,m);return c(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}if("undefined"!=typeof u[e]&&(e=u[e],s=e.match(/([\-+]\d+)([dmwy])/g),/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e))){for(e=new Date,n=0;n<s.length;n++)l=p.exec(s[n]),m=parseInt(l[1]),o=t[l[2]],e=k.prototype[o](e,m);return c(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}s=e&&e.match(this.nonpunctuation)||[],e=new Date;var v,w,x={},y=["yyyy","yy","M","MM","m","mm","d","dd"],z={yyyy:function(a,b){return a.setUTCFullYear(h?i(b,h):b)},yy:function(a,b){return a.setUTCFullYear(h?i(b,h):b)},m:function(a,b){if(isNaN(a))return a;for(b-=1;0>b;)b+=12;for(b%=12,a.setUTCMonth(b);a.getUTCMonth()!==b;)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}};z.M=z.MM=z.mm=z.m,z.dd=z.d,e=d();var A=f.parts.slice();if(s.length!==A.length&&(A=a(A).filter(function(b,c){return-1!==a.inArray(c,y)}).toArray()),s.length===A.length){var B;for(n=0,B=A.length;B>n;n++){if(v=parseInt(s[n],10),l=A[n],isNaN(v))switch(l){case"MM":w=a(q[g].months).filter(j),v=a.inArray(w[0],q[g].months)+1;break;case"M":w=a(q[g].monthsShort).filter(j),v=a.inArray(w[0],q[g].monthsShort)+1}x[l]=v}var C,D;for(n=0;n<y.length;n++)D=y[n],D in x&&!isNaN(x[D])&&(C=new Date(e),z[D](C,x[D]),isNaN(C)||(e=C))}return e},formatDate:function(b,c,d){if(!b)return"";if("string"==typeof c&&(c=r.parseFormat(c)),
c.toDisplay)return c.toDisplay(b,c,d);var e={d:b.getUTCDate(),D:q[d].daysShort[b.getUTCDay()],DD:q[d].days[b.getUTCDay()],m:b.getUTCMonth()+1,M:q[d].monthsShort[b.getUTCMonth()],MM:q[d].months[b.getUTCMonth()],yy:b.getUTCFullYear().toString().substring(2),yyyy:b.getUTCFullYear()};e.dd=(e.d<10?"0":"")+e.d,e.mm=(e.m<10?"0":"")+e.m,b=[];for(var f=a.extend([],c.separators),g=0,h=c.parts.length;h>=g;g++)f.length&&b.push(f.shift()),b.push(e[c.parts[g]]);return b.join("")},headTemplate:'<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};r.template='<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">'+r.headTemplate+"<tbody></tbody>"+r.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-decades"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-centuries"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+"</table></div></div>",a.fn.datepicker.DPGlobal=r,a.fn.datepicker.noConflict=function(){return a.fn.datepicker=m,this},a.fn.datepicker.version="1.6.4",a(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(b){var c=a(this);c.data("datepicker")||(b.preventDefault(),n.call(c,"show"))}),a(function(){n.call(a('[data-provide="datepicker-inline"]'))})});

!function(a){a.fn.datepicker.dates.fr={days:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],daysShort:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],daysMin:["d","l","ma","me","j","v","s"],months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],monthsShort:["janv.","févr.","mars","avril","mai","juin","juil.","août","sept.","oct.","nov.","déc."],today:"Aujourd'hui",monthsTitle:"Mois",clear:"Effacer",weekStart:1,format:"dd/mm/yyyy"}}(jQuery);
/*
* @Author: Sebastian Castro
* @Date:   2017-03-27 16:26:49
* @Last Modified by:   Sebastian Castro
* @Last Modified time: 2018-07-08 17:24:00
*/
var index = 1;
jQuery(document).ready(function()
{	
	$(".category-select").change(function()
	{ 
		if (!$(this).val()) return;

		$(this).parents('.category-field').removeClass('error');

		// if only single option, removing all others options laready selected
		if ($(this).data('single-option'))
		{
			$(this).closest('.category-field').find('> .option-field:visible').each(function() { removeOptionField($(this)); });
		}
		
		var optionField = $('#option-field-' + $(this).val());
		optionField.stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
		optionField.attr('data-index', index);
		optionField.css('-webkit-box-ordinal-group', index);
		optionField.css('-moz-box-ordinal-group', index);
		optionField.css('-ms-flex-order', index);
		optionField.css('-webkit-order', index);
		optionField.css('order', index);

		checkForSelectLabel(optionField, 1);
		index++;

		// open automatically mandatory sub select
		var firstMandatorySubSelect = optionField.find('.category-field.mandatory .select-dropdown')[0];
		if (firstMandatorySubSelect) setTimeout(function() { firstMandatorySubSelect.click(); }, 200);
	});

	$('.option-field-delete').click(function()
	{
		removeOptionField($('#option-field-' + $(this).attr('data-id')));
	});

	function removeOptionField(optionFieldToRemove)
	{
		if (optionFieldToRemove.hasClass('inline')) 
			optionFieldToRemove.hide();
		else
			optionFieldToRemove.stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});

		checkForSelectLabel(optionFieldToRemove, 0);
	}

	function checkForSelectLabel(optionField, increment)
	{		
		var categorySelect = optionField.siblings('.category-field-select');
		var select = categorySelect.find('input.select-dropdown');

		if (optionField.siblings('.option-field:visible').length + increment === 0)
			select.val("Choisissez " + categorySelect.attr('data-picking-text'));
		else
			select.val("Ajoutez " + categorySelect.attr('data-picking-text'));
	}
});

function encodeOptionValuesIntoHiddenInput()
{
	var optionValues = [];

	$('.option-field:visible').each(function() 
	{
		var option = {};
		option.id = $(this).attr('data-id');
		option.index = $(this).attr('data-index');
		option.description = $(this).find('.option-field-description-input[data-id=' + option.id + ']').val() || "";
		optionValues.push(option);
	});

	$('input#options-values').val(JSON.stringify(optionValues));
}
function checkAndSend(submitOption)
{
	checkCategories();
	if (!$('#section_admin').is(':visible')) checkAgreeConditions();
	checkOpenHours();
	checkRequiredFields();

	// Dealing with error class
	$('.invalid, .invalid-required').each(function ()
	{
		$(this).closest('.input-field').addClass('error');
	});

	$('.valid, .validate:not(.invalid)').each(function ()
	{
		$(this).closest('.input-field').removeClass('error');
	});

	$('.input-field.error input, .input-field.error textarea').focusout(function()
	{
		if ($(this).hasClass('valid') || ($(this).hasClass('validate') && !$(this).hasClass('invalid')))
		{
			$(this).closest('.input-field').removeClass('error');
		}
		checkRequiredFields();
	});
	$('.checkbox-radio-group.invalid-required input, .select-input select').change(function()
	{
		checkRequiredFields();
	});

	checkAddressGeolocalisation();

	var errorCount = $('.error:visible:not(.flash-message), .invalid:visible').length;

	if (errorCount === 0)
	{
		encodeOptionValuesIntoHiddenInput();
		checkCustomFormatedAddressBeforeSend(); // defined in geocode-address.js
		// add submit option for handling multiple submit buttons
		$('input#submit-option').val(submitOption);
		$('input[type=file]').each(function() {
			if (!$(this).val() && !$(this).attr('value')) $(this).remove();
		})
		$('form').submit();
	}
	else  $('html,body').animate({scrollTop: $('.error:visible, .invalid:visible').first().offset().top - 80}, 'slow');

}

function checkCategories()
{
	$('.category-field.mandatory:visible').each(function()
	{
		if ($(this).children('.option-field:visible').length === 0)
		{
			$(this).addClass('error');
		}
		else
		{
			$(this).removeClass('error');
		}
	});
}

function checkAgreeConditions()
{
	if (!$('#agree').is(':checked')) $('#label-agree').addClass('error');
	else $('#label-agree').removeClass('error');
}

function checkOpenHours()
{
	$('.timepicker_1, .timepicker_3').each(function()
	{
		var id = $(this).attr('id');
		var id_2e_plage = id.split("-input-")[0] + "-input-" + (parseInt(id.split("-input-")[1]) + 1);
		var value_1 = $(this).val();
		if (value_1 === "") value_1 = null;
		var value_2 = $('#'+id_2e_plage).val();
		if (value_2 === "") value_2 = null;

		if (value_1)
		{
			$(this).parents(".open-hours-container").removeClass('open-day');
			$(this).removeClass('invalid');

			if(!value_2)
			{
				$('#'+id_2e_plage).addClass('invalid');
			}
			else
			{
				$('#'+id_2e_plage).removeClass('invalid');
				$(this).parents(".open-hours-container").addClass('open-day');
			}
		}
		else if (value_2) $(this).addClass('invalid');
	});
}

function checkAddressGeolocalisation()
{
	if (!$('#input-latitude').val() || !$('#input-longitude').val()) {
		$('#input-address-field').addClass("error");
	}
}

function checkRequiredFields()
{
	$('.required').each(function ()
	{
		if ($(this).hasClass('required-only-add') && editMode) return;

		var valuePresent = false;
		if ($(this).hasClass('checkbox-radio-group')) valuePresent = ($(this).find('input:checked').length > 0);
		else if ($(this).hasClass('select-input') || $(this).hasClass('select-elements-input')) valuePresent = ($(this).find('option:selected:not(:disabled)').length > 0);
		else valuePresent = $(this).val();

		if(!valuePresent)
		{
			$(this).addClass('invalid invalid-required');
		}
		else
		{
			$(this).removeClass('invalid-required');
			if ($(this).hasClass('select-input') || $(this).hasClass('select-elements-input') || $(this).hasClass('checkbox-radio-group')) $(this).removeClass('invalid').removeClass('error');
		}
	});
}


function getQueryParams(qs) 
{
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while ((tokens = re.exec(qs))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function initAutoCompletionForElement(element)
{
    var options = {
      componentRestrictions: {country: 'fr'}
    };
    var autocomplete = new google.maps.places.Autocomplete(element, options);   
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        $(element).trigger('place_changed');
        return false;
    });
}
/*
* @Author: Sebastian Castro
* @Date:   2017-04-16 09:32:02
* @Last Modified by:   Sebastian Castro
* @Last Modified time: 2017-12-14 12:38:22
*/

jQuery(document).ready(function()
{	
	if (window.location.search.includes('logout') )
	{
		window.location.href = window.location.origin + window.location.pathname;
	}	

	$('#btn-login').on( "login", function() {
  	window.location.reload();
	});

	$('#btn-login').on( "logout", function() {
  	window.location.href = '?logout=1';
	});
});

function checkLoginAndSend()
{
	$('.required').each(function ()
	{ 
		if(!$(this).val()) $(this).addClass('invalid');		
		else $(this).closest('.input-field').removeClass('error');
	});
	
	$('.invalid').each(function ()
	{ 		
		$(this).closest('.input-field').addClass('error');
	});

	$('.valid').each(function ()
	{ 		
		$(this).closest('.input-field').removeClass('error');
	});

	if ($('.error:visible, .invalid:visible').length === 0)
	{
		$('#inputMail').removeClass('invalid');
		$('#inputMail').siblings('i').removeClass('invalid');

		$('form[name="user"]').submit();		
	}
}
var geocoderJS;
var geocodingProcessing = false;
var firstGeocodeDone = false;
var geocodedFormatedAddress = '';

function getInputAddress() { return $('#input-address').val(); }

jQuery(document).ready(function()
{
	geocoderJS = UniversalGeocoder.createGeocoder({provider: "nominatim", useSsl: true, userAgent: "GoGoCarto"});

	// Geocoding address
	$('#input-address').change(function ()
  {
    if (!firstGeocodeDone) handleInputAdressChange();
  });

	$('#input-address').keyup(function(e)
	{
		if(e.keyCode == 13) // touche entrée
		{
			handleInputAdressChange();
		}
	});

	$('.btn-geolocalize').click(function () { handleInputAdressChange(); });
});

function handleInputAdressChange()
{
	geocodeAddress(getInputAddress());
}

function geocodeAddress(address) {

	console.log("geocodeAddress", address);

	if (geocodingProcessing || !address) { console.log("Already processing or no address provided", address); return null; }

	$('#geocode-spinner-loader').show();

	geocodingProcessing = true;

	geocoderJS.geocode(address, function(results)
	{
		if (results !== null && results.length > 0)
		{
			firstGeocodeDone = true;
			map.setView(results[0].getCoordinates(), 18);
			createMarker(results[0].getCoordinates());

			console.log("Geocode result :", results[0]);

			// Detect street address when geocoder fails to retrieve it (OSM case)
			var patt = new RegExp(/^\d+/g);
			var potentialStreetNumber = patt.exec(address);
			var streetNumber = results[0].streetNumber;
			if (potentialStreetNumber != results[0].postalCode && !results[0].streetNumber && results[0].streetName)
			{
				console.log("street number detected", potentialStreetNumber);
				streetNumber = potentialStreetNumber;
			}

			streetAddress = '';
			if (streetNumber && results[0].streetName) streetAddress += streetNumber + ' ';
			if (results[0].streetName) streetAddress +=  results[0].streetName;

			geocodedFormatedAddress = "";
			if (streetAddress) geocodedFormatedAddress += streetAddress + ', ';
			if (results[0].postalCode) geocodedFormatedAddress += results[0].postalCode + ' ';
			if (results[0].locality) geocodedFormatedAddress += results[0].locality;

			$('#input-latitude').val(marker.getLatLng().lat);
			$('#input-longitude').val(marker.getLatLng().lng);
			$('#input-postalCode').val(results[0].postalCode);
			$('#input-addressCountry').val(results[0].countryCode);
			$('#input-addressLocality').val(results[0].locality);
			$('#input-streetAddress').val(streetAddress);

			$('#input-address').val(geocodedFormatedAddress);

			$('#input-address').closest('.input-field').removeClass("error");
			$('#input-address').removeClass('invalid');
			$('#geocode-error').hide();
		}
		else if ($('#input-address').length > 0)
		{
			$('#input-address').addClass("invalid");
			$('#input-address').closest('.input-field').addClass("error");

			if (marker) marker.remove();

			$('.geolocalize-help-text').show();

			$('#input-latitude').val('');
			$('#input-longitude').val('');
			$('#input-postalCode').val('');
			$('#input-addressLocality').val('');
			$('#input-addressCountry').val('');
			$('#input-streetAddress').val('');

			console.log("erreur geocoding", status);
		} else {
			$('#geocode-error').text('Erreur lors de la geolocalisation de "' + address + '"').show()
		}

		$('#geocode-spinner-loader').hide();
		geocodingProcessing = false;
	});
}

function checkCustomFormatedAddressBeforeSend()
{
	if (getInputAddress() != geocodedFormatedAddress)
	{
		$('#input-customFormatedAddress').val(getInputAddress());
	}
	else
	{
		$('#input-customFormatedAddress').val(null);
	}
}
function onloadCaptcha() 
{
    grecaptcha.render('captcha', {
      'sitekey' : '6Lc-HCUTAAAAANRcx2NKuISCo9psjeTdVsYFUcU8'
    });
}
var map;
var marker;

// Google map initialisation
function initMap()
{
	var mapCenter;
	if ($('#input-latitude').val() && $('#input-latitude').val() != 0 &&
	    $('#input-longitude').val() && $('#input-longitude').val() != 0)
	{
		markerPosition = new L.LatLng($('#input-latitude').val(), $('#input-longitude').val());
		mapCenter = markerPosition;
		mapZoom = 18;
		firstGeocodeDone = true;
	}
	else
	{
		markerPosition = null;
		mapCenter = new L.LatLng(46.897045, 2.425235);
		mapZoom = 5;
	}

	map = L.map('address-preview-map', {
	    center: mapCenter,
	    zoom: mapZoom,
	    zoomControl: true,
	    scrollWheelZoom : false
	});

	// defaultBounds is set in address.html.twig
	if (!firstGeocodeDone && defaultBounds) map.fitBounds(defaultBounds);

	L.tileLayer(defaultTileLayer).addTo(map);

	if (markerPosition) createMarker(markerPosition);
}

function createMarker(position)
{
	if (marker) marker.remove();

	marker = new L.Marker(position, { draggable: true } ).addTo(map);
	marker.on('dragend', function()
	{
	  $('#input-latitude').attr('value',marker.getLatLng().lat);
		$('#input-longitude').attr('value',marker.getLatLng().lng);
  });

  marker.bindPopup("<center>Déplacez moi pour préciser la position</br>(au centre du bâtiment)</center>").openPopup();
}

function fitBounds(rawbounds)
{
	//console.log("fitbounds", rawbounds);

	var corner1 = L.latLng(rawbounds[0], rawbounds[1]);
	var corner2 = L.latLng(rawbounds[2], rawbounds[3]);
	var bounds = L.latLngBounds(corner1, corner2);

	map.fitBounds(bounds);
}



$('.to-html:not(.initialized)').each(function() { $(this).html($(this).text()).addClass('initialized'); });

jQuery(document).ready(function()
{
  function handleSelectInitialized($select) {
    $select.closest('.input-field').addClass("initialized")
    $select.closest('.input-field').find('.material-icons').addClass('active');
  }
  $('select:not(.select2)').each(function() {
    if ($(this).val()) handleSelectInitialized($(this))
  })
  $('select:not(.select2)').on('change', function() {
    handleSelectInitialized($(this))
  }).material_select()

  $('select.select2').change(function() {
    // add relevant classes to prefix icon, to it's colored the same way than other fields
    $(this).closest('.input-field').find('.material-icons').toggleClass('valid', !!$(this).val());
    // Because it was not possible to use a name like data[myfield][] with select, we store
    // the select2 value serialized in a hidden input. This hidden input will be deserilized in ElementFormService
    var result = {};
    var data = $(this).select2('data');
    for(var i in data) {
      var option = data[i];
      result[option.id] = option.text;
    }
    $(this).siblings('.select-encoded-result').val(JSON.stringify(result));
  })
  $('select.select2').trigger('change');
  // add relevant classes to prefix icon, to it's colored the same way than other fields
  $('input.select-dropdown, .select2-search__field').focus(function() { $(this).closest('.input-field').find('.material-icons').addClass('active') })
  $('.select2-search__field').blur(function() { $(this).closest('.input-field').find('.material-icons').removeClass('active') })
  $('input.select-dropdown').blur(function() { if (!$(this).val()) $(this).closest('.input-field').find('.material-icons').removeClass('active') })

  $('.to-html:not(.initialized)').each(function() { $(this).html($(this).text()).addClass('initialized'); });

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




function addTimeSlot( day )
{
	$('#' + day + '-open-hours-second-line').addClass('active');	
	$('#' + day + '_ajout').css('visibility','hidden');
}

function clearTimeSlot( day )
{
	$('#' + day + '_ajout').css('visibility','visible');
	$('#' + day + '-open-hours-second-line').removeClass('active');
	$('#' + day + '-input-3').val(null);
	$('#' + day + '-input-4').val(null);
}

function redoTimeSlot( day )
{
	var day_to_copy = day - 1;

	$('#' + day + '-input-1').val($('#' + day_to_copy + '-input-1').val());
	$('#' + day + '-input-2').val($('#' + day_to_copy + '-input-2').val());
	$('#' + day + '-input-3').val($('#' + day_to_copy + '-input-3').val());
	$('#' + day + '-input-4').val($('#' + day_to_copy + '-input-4').val());

	// si on recopie une plage horaire bonus, on doit la montrer visible
	if ( $('#' + day + '-input-3').val() || $('#' + day + '-input-4').val())
	{
		addTimeSlot(day);
	}		
}

$(document).ready(function()
{	
   // Gets history state from browser
   window.onpopstate = function(event)
   {
	   if (location.hash.includes('#popup') ) {
	   		$(location.hash).openModal();
    		history.replaceState(null, '', location.origin + location.pathname);
    }
    else if (location.hash == '' ) {
    	$('.modal').closeModal();
    }
	 };
});
/* 
 * Author: @senthil2rajan
 * plugin: timepicker
 * website: senthilraj.github.io/Timepicki
 */
(function($) {

	$.fn.timepicki = function(options) {

		var defaults = {
			format_output: function(tim, mini, meri) {
				if(settings.show_meridian){
					return tim + ":" + mini + ":" + meri;
				}else{
					return tim + ":" + mini;
				}
			},
			increase_direction: 'down',
			custom_classes: '',
			min_hour_value: 1,
			max_hour_value: 12,
			show_meridian: true,
			step_size_hours: '1',
			step_size_minutes: '1',
			overflow_minutes: false,
			disable_keyboard_mobile: false,
			reset: true
		};

		var settings = $.extend({}, defaults, options);

		return this.each(function() {

			var ele = $(this);
			var ele_hei = ele.outerHeight();
			ele_hei += 10;
			$(ele).wrap("<div class='time_pick'>");
			var ele_par = $(this).parents(".time_pick");

			// developer can specify which arrow makes the numbers go up or down
			var top_arrow_button = (settings.increase_direction === 'down') ?
				"<div class='prev action-prev'></div>" :
				"<div class='prev action-next'></div>";
			var bottom_arrow_button = (settings.increase_direction === 'down') ?
				"<div class='next action-next'></div>" :
				"<div class='next action-prev'></div>";

			var new_ele = $(
				"<div class='timepicker_wrap " + settings.custom_classes + "'>" +
					"<div class='arrow_top'></div>" +
					"<div class='time'>" +
						top_arrow_button +
						"<div class='ti_tx'><input type='text' class='timepicki-input'" + (settings.disable_keyboard_mobile ? "readonly" : "") + "></div>" +
						bottom_arrow_button +
					"</div>" +
					"<div class='mins'>" +
						top_arrow_button +
						"<div class='mi_tx'><input type='text' class='timepicki-input'" + (settings.disable_keyboard_mobile ? "readonly" : "") + "></div>" +
						bottom_arrow_button +
					"</div>");
			if(settings.show_meridian){
				new_ele.append(
					"<div class='meridian'>" +
						top_arrow_button +
						"<div class='mer_tx'><input type='text' class='timepicki-input' readonly></div>" +
						bottom_arrow_button +
					"</div>");
			}
			if(settings.reset){
				new_ele.append(
					"<div class='reset_time'>Réinitialiser</div>");
			}
			ele_par.append(new_ele);
			var ele_next = $(this).next(".timepicker_wrap");
			var ele_next_all_child = ele_next.find("div");
			var inputs = ele_par.find('input');
			
			$('.reset_time').on("click", function(event) {
				$(this).parent().siblings('input').val("");
				close_timepicki();
			});	

			$(".timepicki-input").keydown( function(keyevent){
					var len = $(this).val().length;

					// Allow: backspace, delete, tab, escape, and .
					if ($.inArray(keyevent.keyCode, [46, 8, 9, 110, 190]) !== -1 ||
					     // Allow: Ctrl+A
					    (keyevent.keyCode == 65 && keyevent.ctrlKey === true) || 
					     // Allow: home, end, left, right
					    (keyevent.keyCode >= 35 && keyevent.keyCode <= 39)) {
						 // let it happen, don't do anything
						 return;
					}
					// fermer le timepicker quand on press  escape
					if (keyevent.keyCode == 27) 
					{
						close_timepicki();
					}
					// valider le timepicker quand escape
					if (keyevent.keyCode == 13) 
					{
						set_value();
						close_timepicki();
					}
					
					// Ensure that it is a number and stop the keypress
					if ((/*keyevent.shiftKey || */(keyevent.keyCode < 48 || keyevent.keyCode > 57)) && 
					(keyevent.keyCode < 96 || keyevent.keyCode > 105)/* || len==2 */) {
					    keyevent.preventDefault();
					}

			});

			// open or close time picker when clicking
			$(document).on("click", function(event) {
				if (!$(event.target).is(ele_next) && ele_next.css("display")=="block" && !$(event.target).is($('.reset_time'))) {
					if (!$(event.target).is(ele)) {
						set_value(event, !is_element_in_timepicki($(event.target)));
					} else {
						var ele_lef =  0;
						
						ele_next.css({
							"top": ele_hei + "px",
							"left": ele_lef + "px"
						});
						//open_timepicki();
					}
				}
			});

			// ne pas ouvrir le timerpicker quand on vient de supprimer
			// la valeur du champs
			ele.on('focus', function() 
			{
				setTimeout(function() 
				{ 
					if ((ele.val() == "") && (ele.attr('data-timepicki-tim')))
					{
						ele.attr('data-timepicki-tim',null);
						close_timepicki();
						ele.val(null);
					}
					else open_timepicki();
				}, 100);
			});

			// select all text in input when user focuses on it
			inputs.on('focus', function() {
				var input = $(this);
				if (!input.is(ele)) {
					input.select();
				}
			});

			// allow user to increase and decrease numbers using arrow keys
			inputs.on('keydown', function(e) {
				var direction, input = $(this);

				// UP
				if (e.which === 38) {
					if (settings.increase_direction === 'down') {
						direction = 'prev';
					} else {
						direction = 'next';
					}
				// DOWN
				} else if (e.which === 40) {
					if (settings.increase_direction === 'down') {
						direction = 'next';
					} else {
						direction = 'prev';
					}
				}				

				if (input.closest('.timepicker_wrap .time').length) {
					change_time(null, direction);
				} else if (input.closest('.timepicker_wrap .mins').length) {
					change_mins(null, direction);
				} else if (input.closest('.timepicker_wrap .meridian').length && settings.show_meridian) {
					change_meri(null, direction);
				}
			});

			$(".timepicker_wrap").on('keydown', function(keyevent) 
			{				
				// close quand escape
				if (keyevent.keyCode == 27) 
				{
					close_timepicki();
				}
				// valider le timepicker quand enter
				else if (keyevent.keyCode == 13) 
				{
					set_value();
					close_timepicki();
				}		
			});			

			// close the modal when the time picker loses keyboard focus
			inputs.on('blur', function() {
				setTimeout(function() {
					var focused_element = $(document.activeElement);
					if (focused_element.is(':input') && !is_element_in_timepicki(focused_element)) {
						//set_value();
						close_timepicki();
					}
				}, 0);
			});

			function is_element_in_timepicki(jquery_element) {
				return $.contains(ele_par[0], jquery_element[0]) || ele_par.is(jquery_element);
			}

			function set_value(event, close) {
				// use input values to set the time
				var tim = ele_next.find(".ti_tx input").val();
				var mini = ele_next.find(".mi_tx input").val();
				var meri = "";
				if(settings.show_meridian){
					meri = ele_next.find(".mer_tx input").val();
				}
				
				if (tim.length !== 0 && mini.length !== 0 && (!settings.show_meridian || meri.length !== 0)) {
					// store the value so we can set the initial value
					// next time the picker is opened
					ele.attr('data-timepicki-tim', tim);
					ele.attr('data-timepicki-mini', mini);
					
					if(settings.show_meridian){
						ele.attr('data-timepicki-meri', meri);
						// set the formatted value
						ele.val(settings.format_output(tim, mini, meri));
					}else{
						ele.val(settings.format_output(tim, mini));
					}
				}

				if (close) {
					close_timepicki();
				}
			}

			function open_timepicki() {
				set_date(settings.start_time);
				ele_next.fadeIn();
				// focus on the first input and select its contents
				var first_input = ele_next.find('input:visible').first();
				first_input.focus();
				// if the user presses shift+tab while on the first input,
				// they mean to exit the time picker and go to the previous field
				var firstInputExitHandler = function(e) {
					if (e.which === 9 && e.shiftKey) {
						first_input.off('keydown', firstInputExitHandler);
						var all_form_elements = $(':input:visible:not(.timepicki-input)');
						var index_of_timepicki_input = all_form_elements.index(ele);
						var previous_form_element = all_form_elements.get(index_of_timepicki_input-1);
						previous_form_element.focus();
					}
				};
				first_input.on('keydown', firstInputExitHandler);
			}

			function close_timepicki() {
				ele_next.fadeOut();
			}

			function set_date(start_time) {
				var d, ti, mi, mer;

				// if a value was already picked we will remember that value
				if (ele.is('[data-timepicki-tim]')) {
					ti = Number(ele.attr('data-timepicki-tim'));
					mi = Number(ele.attr('data-timepicki-mini'));
					if(settings.show_meridian){
						mer = ele.attr('data-timepicki-meri');
					}
				// developer can specify a custom starting value
				} else if (typeof start_time === 'object') {
					ti = Number(start_time[0]);
					mi = Number(start_time[1]);
					if(settings.show_meridian){
						mer = start_time[2];
					}
				// default is we will use the current time
				} else {
					d = new Date();
					ti = d.getHours();
					mi = d.getMinutes();
					mer = "AM";
					if (12 < ti  && settings.show_meridian) {
						ti -= 12;
						mer = "PM";
					}
				}

				if (ti < 10) {
					ele_next.find(".ti_tx input").val("0" + ti);
				} else {
					ele_next.find(".ti_tx input").val(ti);
				}
				if (mi < 10) {
					ele_next.find(".mi_tx input").val("0" + mi);
				} else {
					ele_next.find(".mi_tx input").val(mi);
				}
				if(settings.show_meridian){
					if (mer < 10) {
						ele_next.find(".mer_tx input").val("0" + mer);
					} else {
						ele_next.find(".mer_tx input").val(mer);
					}
				}
			}

			function change_time(cur_ele, direction) {
				var cur_cli = "time";
				var cur_time = Number(ele_next.find("." + cur_cli + " .ti_tx input").val());
				var ele_st = Number(settings.min_hour_value);
				var ele_en = Number(settings.max_hour_value);
				var step_size = Number(settings.step_size_hours);
				if ((cur_ele && cur_ele.hasClass('action-next')) || direction === 'next') {
					if (cur_time + step_size > ele_en) {
						var min_value = ele_st;
						if (min_value < 10) {
							min_value = '0' + min_value;
						} else {
							min_value = String(min_value);
						}
						ele_next.find("." + cur_cli + " .ti_tx input").val(min_value);
					} else {
						cur_time = cur_time + step_size;
						if (cur_time < 10) {
							cur_time = "0" + cur_time;
						}
						ele_next.find("." + cur_cli + " .ti_tx input").val(cur_time);
					}
				} else if ((cur_ele && cur_ele.hasClass('action-prev')) || direction === 'prev') {
					if (cur_time - step_size <= 0) {
						var max_value = ele_en;
						if (max_value < 10) {
							max_value = '0' + max_value;
						} else {
							max_value = String(max_value);
						}
						ele_next.find("." + cur_cli + " .ti_tx input").val(max_value);
					} else {
						cur_time = cur_time - step_size;
						if (cur_time < 10) {
							cur_time = "0" + cur_time;
						}
						ele_next.find("." + cur_cli + " .ti_tx input").val(cur_time);
					}
				}
			}

			function change_mins(cur_ele, direction) {
				var cur_cli = "mins";
				var cur_mins = Number(ele_next.find("." + cur_cli + " .mi_tx input").val());
				var ele_st = 0;
				var ele_en = 59;
				var step_size = Number(settings.step_size_minutes);
				if ((cur_ele && cur_ele.hasClass('action-next')) || direction === 'next') {
					if (cur_mins + step_size > ele_en) {
						ele_next.find("." + cur_cli + " .mi_tx input").val("00");
						if(settings.overflow_minutes){
							change_time(null, 'next');
						}
					} else {
						cur_mins = cur_mins + step_size;
						if (cur_mins < 10) {
							ele_next.find("." + cur_cli + " .mi_tx input").val("0" + cur_mins);
						} else {
							ele_next.find("." + cur_cli + " .mi_tx input").val(cur_mins);
						}
					}
				} else if ((cur_ele && cur_ele.hasClass('action-prev')) || direction === 'prev') {
					if (cur_mins - step_size <= -1) {
						ele_next.find("." + cur_cli + " .mi_tx input").val(ele_en + 1 - step_size);
						if(settings.overflow_minutes){
							change_time(null, 'prev');
						}
					} else {
						cur_mins = cur_mins - step_size;
						if (cur_mins < 10) {
							ele_next.find("." + cur_cli + " .mi_tx input").val("0" + cur_mins);
						} else {
							ele_next.find("." + cur_cli + " .mi_tx input").val(cur_mins);
						}
					}
				}
			}

			function change_meri(cur_ele, direction) {
				var cur_cli = "meridian";
				var ele_st = 0;
				var ele_en = 1;
				var cur_mer = null;
				cur_mer = ele_next.find("." + cur_cli + " .mer_tx input").val();
				if ((cur_ele && cur_ele.hasClass('action-next')) || direction === 'next') {
					if (cur_mer == "AM") {
						ele_next.find("." + cur_cli + " .mer_tx input").val("PM");
					} else {
						ele_next.find("." + cur_cli + " .mer_tx input").val("AM");
					}
				} else if ((cur_ele && cur_ele.hasClass('action-prev')) || direction === 'prev') {
					if (cur_mer == "AM") {
						ele_next.find("." + cur_cli + " .mer_tx input").val("PM");
					} else {
						ele_next.find("." + cur_cli + " .mer_tx input").val("AM");
					}
				}
			}

			// handle clicking on the arrow icons
			var cur_next = ele_next.find(".action-next");
			var cur_prev = ele_next.find(".action-prev");
			$(cur_prev).add(cur_next).on("click", function() {
				var cur_ele = $(this);
				if (cur_ele.parent().attr("class") == "time") {
					change_time(cur_ele);
				} else if (cur_ele.parent().attr("class") == "mins") {
					change_mins(cur_ele);
				} else {
					if(settings.show_meridian){
						change_meri(cur_ele);
					}
				}
			});

		});
	};

}(jQuery));

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cross-fetch/dist/browser-ponyfill.js":
/*!***********************************************************!*\
  !*** ./node_modules/cross-fetch/dist/browser-ponyfill.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var __self__ = (function (root) {
function F() {
this.fetch = false;
this.DOMException = root.DOMException
}
F.prototype = root;
return new F();
})(typeof self !== 'undefined' ? self : this);
(function(self) {

var irrelevant = (function (exports) {
  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  return exports;

}({}));
})(__self__);
delete __self__.fetch.polyfill
exports = __self__.fetch // To enable: import fetch from 'cross-fetch'
exports.default = __self__.fetch // For TypeScript consumers without esModuleInterop.
exports.fetch = __self__.fetch // To enable: import {fetch} from 'cross-fetch'
exports.Headers = __self__.Headers
exports.Request = __self__.Request
exports.Response = __self__.Response
module.exports = exports


/***/ }),

/***/ "./src sync recursive":
/*!******************!*\
  !*** ./src sync ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src sync recursive";

/***/ }),

/***/ "./src/AdminLevel.ts":
/*!***************************!*\
  !*** ./src/AdminLevel.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AdminLevel = /** @class */ (function () {
    function AdminLevel(_a) {
        var level = _a.level, name = _a.name, code = _a.code;
        this.level = level;
        this.name = name;
        this.code = code;
    }
    AdminLevel.create = function (object) {
        return new this(object);
    };
    AdminLevel.prototype.toObject = function () {
        return {
            level: this.level,
            name: this.name,
            code: this.code,
        };
    };
    AdminLevel.prototype.getLevel = function () {
        return this.level;
    };
    AdminLevel.prototype.getName = function () {
        return this.name;
    };
    AdminLevel.prototype.getCode = function () {
        return this.code;
    };
    return AdminLevel;
}());
exports.default = AdminLevel;


/***/ }),

/***/ "./src/ExternalLoader.ts":
/*!*******************************!*\
  !*** ./src/ExternalLoader.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cross_fetch_1 = __importDefault(__webpack_require__(/*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js"));
var error_1 = __webpack_require__(/*! ./error */ "./src/error/index.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var defaultOptions = {
    protocol: "http",
    method: "GET",
};
/**
 * Load data from external geocoding engines.
 */
var ExternalLoader = /** @class */ (function () {
    function ExternalLoader(options) {
        if (options === void 0) { options = defaultOptions; }
        this.options = defaultOptions;
        this.setOptions(options);
    }
    ExternalLoader.prototype.setOptions = function (options) {
        this.options = __assign(__assign({}, defaultOptions), options);
    };
    ExternalLoader.prototype.getOptions = function () {
        return this.options;
    };
    ExternalLoader.prototype.executeRequest = function (params, callback, externalLoaderHeaders, body, errorCallback) {
        var _a = this.options, protocol = _a.protocol, host = _a.host, pathname = _a.pathname, method = _a.method;
        if (!host) {
            throw new Error("A host is required for the external loader.");
        }
        if (!pathname) {
            throw new Error("A pathname is required for the external loader.");
        }
        var requestUrl = new URL(protocol + "://" + host + "/" + pathname);
        var jsonpCallback = params.jsonpCallback, requestParams = __rest(params, ["jsonpCallback"]);
        var filteredRequestParams = utils_1.filterUndefinedObjectValues(requestParams);
        Object.keys(filteredRequestParams).forEach(function (paramKey) {
            var _a;
            return requestUrl.searchParams.append(paramKey, (_a = filteredRequestParams[paramKey]) !== null && _a !== void 0 ? _a : "");
        });
        if (jsonpCallback) {
            ExternalLoader.runJsonpCallback(requestUrl, callback, jsonpCallback);
            return;
        }
        var headers = utils_1.filterUndefinedObjectValues(externalLoaderHeaders || {});
        cross_fetch_1.default(requestUrl.toString(), {
            headers: headers,
            method: method,
            body: method === "POST" ? JSON.stringify(body) : undefined,
        })
            .then(function (response) {
            if (!response.ok) {
                throw new error_1.ResponseError("Received HTTP status code " + response.status + " when attempting geocoding request.", response);
            }
            return response.json();
        })
            .then(function (data) { return callback(data); })
            .catch(function (error) {
            if (errorCallback && error instanceof error_1.ResponseError) {
                errorCallback(error);
                return;
            }
            setTimeout(function () {
                throw error;
            });
        });
    };
    ExternalLoader.runJsonpCallback = function (requestUrl, callback, jsonpCallback) {
        if (!utils_1.isBrowser()) {
            throw new Error('"jsonpCallback" parameter can only be used in a browser environment.');
        }
        requestUrl.searchParams.append(jsonpCallback, ExternalLoader.generateJsonpCallback(callback));
        // Create a new script element.
        var scriptElement = document.createElement("script");
        // Set its source to the JSONP API.
        scriptElement.src = requestUrl.toString();
        // Stick the script element in the page <head>.
        document.getElementsByTagName("head")[0].appendChild(scriptElement);
    };
    /**
     * Generates randomly-named function to use as a callback for JSONP requests.
     * @see https://github.com/OscarGodson/JSONP
     */
    ExternalLoader.generateJsonpCallback = function (callback) {
        // Use timestamp + a random factor to account for a lot of requests in a short time.
        // e.g. jsonp1394571775161.
        var timestamp = Date.now();
        var generatedFunction = "jsonp" + Math.round(timestamp + Math.random() * 1000001);
        // Generate the temp JSONP function using the name above.
        // First, call the function the user defined in the callback param [callback(json)].
        // Then delete the generated function from the window [delete window[generatedFunction]].
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window[generatedFunction] = function (json) {
            callback(json);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete window[generatedFunction];
        };
        return generatedFunction;
    };
    return ExternalLoader;
}());
exports.default = ExternalLoader;


/***/ }),

/***/ "./src/GeoJsonDumper.ts":
/*!******************************!*\
  !*** ./src/GeoJsonDumper.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GeoJsonDumper = /** @class */ (function () {
    function GeoJsonDumper() {
    }
    GeoJsonDumper.dump = function (geocoded) {
        var result = GeoJsonDumper.baseGeoJson;
        result = __assign(__assign({}, result), {
            geometry: __assign(__assign({}, result.geometry), { coordinates: [geocoded.getLongitude(), geocoded.getLatitude()] }),
        });
        var _a = geocoded.toObject(), latitude = _a.latitude, longitude = _a.longitude, south = _a.south, west = _a.west, north = _a.north, east = _a.east, adminLevels = _a.adminLevels, geocodedProperties = __rest(_a, ["latitude", "longitude", "south", "west", "north", "east", "adminLevels"]);
        var properties = __assign({}, geocodedProperties);
        Object.keys(properties).forEach(function (property) {
            return properties[property] === undefined && delete properties[property];
        });
        if (adminLevels && adminLevels.length > 0) {
            properties = __assign(__assign({}, properties), { adminLevels: adminLevels.map(function (adminLevel) { return adminLevel.toObject(); }) });
        }
        result = __assign(__assign({}, result), { properties: properties });
        if (south && west && north && east) {
            result = __assign(__assign({}, result), { bounds: { south: south, west: west, north: north, east: east } });
        }
        return result;
    };
    GeoJsonDumper.baseGeoJson = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "Point",
            coordinates: [undefined, undefined],
        },
    };
    return GeoJsonDumper;
}());
exports.default = GeoJsonDumper;


/***/ }),

/***/ "./src/Geocoded.ts":
/*!*************************!*\
  !*** ./src/Geocoded.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Geocoded = /** @class */ (function () {
    function Geocoded(_a) {
        var latitude = _a.latitude, longitude = _a.longitude, south = _a.south, west = _a.west, north = _a.north, east = _a.east, formattedAddress = _a.formattedAddress, streetNumber = _a.streetNumber, streetName = _a.streetName, subLocality = _a.subLocality, locality = _a.locality, postalCode = _a.postalCode, region = _a.region, adminLevels = _a.adminLevels, country = _a.country, countryCode = _a.countryCode, timezone = _a.timezone;
        this.latitude = latitude;
        this.longitude = longitude;
        this.south = south;
        this.west = west;
        this.north = north;
        this.east = east;
        this.formattedAddress = formattedAddress;
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.subLocality = subLocality;
        this.locality = locality;
        this.postalCode = postalCode;
        this.region = region;
        this.adminLevels = adminLevels || [];
        this.country = country;
        this.countryCode = countryCode;
        this.timezone = timezone;
    }
    Geocoded.create = function (object) {
        return new this(object);
    };
    Geocoded.prototype.toObject = function () {
        return {
            latitude: this.latitude,
            longitude: this.longitude,
            south: this.south,
            west: this.west,
            north: this.north,
            east: this.east,
            formattedAddress: this.formattedAddress,
            streetNumber: this.streetNumber,
            streetName: this.streetName,
            subLocality: this.subLocality,
            locality: this.locality,
            postalCode: this.postalCode,
            region: this.region,
            adminLevels: this.adminLevels,
            country: this.country,
            countryCode: this.countryCode,
            timezone: this.timezone,
        };
    };
    Geocoded.prototype.withBounds = function (south, west, north, east) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { south: south,
            west: west,
            north: north,
            east: east }));
    };
    Geocoded.prototype.withCoordinates = function (latitude, longitude) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { latitude: latitude,
            longitude: longitude }));
    };
    Geocoded.prototype.getCoordinates = function () {
        return [this.latitude, this.longitude];
    };
    Geocoded.prototype.getLatitude = function () {
        return this.latitude;
    };
    Geocoded.prototype.getLongitude = function () {
        return this.longitude;
    };
    Geocoded.prototype.getBounds = function () {
        return [this.south, this.west, this.north, this.east];
    };
    Geocoded.prototype.getFormattedAddress = function () {
        return this.formattedAddress;
    };
    Geocoded.prototype.getStreetNumber = function () {
        return this.streetNumber;
    };
    Geocoded.prototype.getStreetName = function () {
        return this.streetName;
    };
    Geocoded.prototype.getSubLocality = function () {
        return this.subLocality;
    };
    Geocoded.prototype.getLocality = function () {
        return this.locality;
    };
    Geocoded.prototype.getPostalCode = function () {
        return this.postalCode;
    };
    Geocoded.prototype.getRegion = function () {
        return this.region;
    };
    Geocoded.prototype.addAdminLevel = function (adminLevel) {
        this.adminLevels.push(adminLevel);
    };
    Geocoded.prototype.getAdminLevels = function () {
        return this.adminLevels;
    };
    Geocoded.prototype.getCountry = function () {
        return this.country;
    };
    Geocoded.prototype.getCountryCode = function () {
        return this.countryCode;
    };
    Geocoded.prototype.getTimezone = function () {
        return this.timezone;
    };
    return Geocoded;
}());
exports.default = Geocoded;


/***/ }),

/***/ "./src/GeocoderProviderFactory.ts":
/*!****************************************!*\
  !*** ./src/GeocoderProviderFactory.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = __webpack_require__(/*! ./provider */ "./src/provider/index.ts");
var ExternalLoader_1 = __importDefault(__webpack_require__(/*! ./ExternalLoader */ "./src/ExternalLoader.ts"));
var ProviderFactory = /** @class */ (function () {
    function ProviderFactory() {
    }
    /**
     * Creates Geocoder Provider instances.
     * @param options
     *   Either a string representing the registered provider, or an object with the
     *   following settings for instigating providers:
     *     - provider: A string representing the registered provider.
     * @return
     *   An object compatible with ProviderInterface, or undefined if there's not a
     *   registered provider.
     */
    ProviderFactory.createProvider = function (options) {
        var createProviderOptions = __assign(__assign({}, provider_1.defaultProviderOptions), (typeof options === "string" ? { provider: options } : options));
        var externalLoader = new ExternalLoader_1.default();
        var provider = createProviderOptions.provider, providerOptions = __rest(createProviderOptions, ["provider"]);
        switch (provider) {
            case "bing":
                return (new provider_1.BingProvider(externalLoader, providerOptions));
            case "chain":
                return new provider_1.ChainProvider(__assign(__assign({}, provider_1.defaultChainProviderOptions), providerOptions));
            case "geoplugin":
                return (new provider_1.GeoPluginProvider(externalLoader, providerOptions));
            case "google":
            case "googlemaps":
                return (new provider_1.GoogleMapsProvider(externalLoader, providerOptions));
            case "mapbox":
                return (new provider_1.MapboxProvider(externalLoader, __assign(__assign({}, provider_1.defaultMapboxProviderOptions), providerOptions)));
            case "mapquest":
                return (new provider_1.MapquestProvider(externalLoader, providerOptions));
            case "openstreetmap":
            case "nominatim":
                return (new provider_1.NominatimProvider(externalLoader, __assign(__assign({}, provider_1.defaultNominatimProviderOptions), providerOptions)));
            case "opencage":
                return (new provider_1.OpenCageProvider(externalLoader, __assign(__assign({}, provider_1.defaultOpenCageProviderOptions), providerOptions)));
            case "yandex":
                return (new provider_1.YandexProvider(externalLoader, providerOptions));
            default:
        }
        return undefined;
    };
    return ProviderFactory;
}());
exports.default = ProviderFactory;


/***/ }),

/***/ "./src/UniversalGeocoder.ts":
/*!**********************************!*\
  !*** ./src/UniversalGeocoder.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GeocoderProviderFactory_1 = __importDefault(__webpack_require__(/*! ./GeocoderProviderFactory */ "./src/GeocoderProviderFactory.ts"));
var UniversalGeocoder = /** @class */ (function () {
    function UniversalGeocoder() {
        this.version = "0.1.0";
    }
    UniversalGeocoder.createGeocoder = function (options) {
        return GeocoderProviderFactory_1.default.createProvider(options);
    };
    return UniversalGeocoder;
}());
exports.default = UniversalGeocoder;


/***/ }),

/***/ "./src/error/ResponseError.ts":
/*!************************************!*\
  !*** ./src/error/ResponseError.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseError = /** @class */ (function (_super) {
    __extends(ResponseError, _super);
    function ResponseError(message, response) {
        var _this = _super.call(this, message) || this;
        _this.name = "ResponseError";
        _this.response = response;
        // eslint-disable-next-line no-proto
        _this.__proto__ = ResponseError.prototype;
        return _this;
    }
    ResponseError.prototype.getResponse = function () {
        return this.response;
    };
    return ResponseError;
}(Error));
exports.default = ResponseError;


/***/ }),

/***/ "./src/error/index.ts":
/*!****************************!*\
  !*** ./src/error/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/prefer-default-export
var ResponseError_1 = __webpack_require__(/*! ./ResponseError */ "./src/error/ResponseError.ts");
Object.defineProperty(exports, "ResponseError", { enumerable: true, get: function () { return ResponseError_1.default; } });


/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UniversalGeocoder_1 = __importDefault(__webpack_require__(/*! ./UniversalGeocoder */ "./src/UniversalGeocoder.ts"));
var GeoJsonDumper_1 = __importDefault(__webpack_require__(/*! ./GeoJsonDumper */ "./src/GeoJsonDumper.ts"));
var container = typeof window === "object" ? window : {};
container.UniversalGeocoder = UniversalGeocoder_1.default;
container.GeoJsonDumper = GeoJsonDumper_1.default;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./provider */ "./src/provider/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./query */ "./src/query/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./utils */ "./src/utils.ts"), exports);
var AdminLevel_1 = __webpack_require__(/*! ./AdminLevel */ "./src/AdminLevel.ts");
Object.defineProperty(exports, "AdminLevel", { enumerable: true, get: function () { return AdminLevel_1.default; } });
__exportStar(__webpack_require__(/*! ./AdminLevel */ "./src/AdminLevel.ts"), exports);
var ExternalLoader_1 = __webpack_require__(/*! ./ExternalLoader */ "./src/ExternalLoader.ts");
Object.defineProperty(exports, "ExternalLoader", { enumerable: true, get: function () { return ExternalLoader_1.default; } });
__exportStar(__webpack_require__(/*! ./ExternalLoader */ "./src/ExternalLoader.ts"), exports);
var Geocoded_1 = __webpack_require__(/*! ./Geocoded */ "./src/Geocoded.ts");
Object.defineProperty(exports, "Geocoded", { enumerable: true, get: function () { return Geocoded_1.default; } });
__exportStar(__webpack_require__(/*! ./Geocoded */ "./src/Geocoded.ts"), exports);
var GeocoderProviderFactory_1 = __webpack_require__(/*! ./GeocoderProviderFactory */ "./src/GeocoderProviderFactory.ts");
Object.defineProperty(exports, "GeocoderProviderFactory", { enumerable: true, get: function () { return GeocoderProviderFactory_1.default; } });
__exportStar(__webpack_require__(/*! ./GeocoderProviderFactory */ "./src/GeocoderProviderFactory.ts"), exports);
var GeoJsonDumper_1 = __webpack_require__(/*! ./GeoJsonDumper */ "./src/GeoJsonDumper.ts");
Object.defineProperty(exports, "GeoJsonDumper", { enumerable: true, get: function () { return GeoJsonDumper_1.default; } });
__exportStar(__webpack_require__(/*! ./GeoJsonDumper */ "./src/GeoJsonDumper.ts"), exports);
var UniversalGeocoder_1 = __webpack_require__(/*! ./UniversalGeocoder */ "./src/UniversalGeocoder.ts");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return UniversalGeocoder_1.default; } });


/***/ }),

/***/ "./src/provider/BingProvider.ts":
/*!**************************************!*\
  !*** ./src/provider/BingProvider.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = __webpack_require__(/*! ./ */ "./src/provider/index.ts");
var Geocoded_1 = __importDefault(__webpack_require__(/*! ../Geocoded */ "./src/Geocoded.ts"));
var BingProvider = /** @class */ (function () {
    function BingProvider(_externalLoader, options) {
        if (options === void 0) { options = provider_1.defaultProviderOptions; }
        this.externalLoader = _externalLoader;
        this.options = __assign(__assign({}, provider_1.defaultProviderOptions), options);
        if (!this.options.apiKey) {
            throw new Error('An API key is required for the Bing provider. Please add it in the "apiKey" option.');
        }
    }
    BingProvider.prototype.geocode = function (query, callback, errorCallback) {
        var geocodeQuery = provider_1.ProviderHelpers.getGeocodeQueryFromParameter(query);
        if (geocodeQuery.getIp()) {
            throw new Error("The Bing provider does not support IP geolocation, only location geocoding.");
        }
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "dev.virtualearth.net",
            pathname: "REST/v1/Locations/" + geocodeQuery.getText(),
        });
        var params = {
            key: this.options.apiKey,
            jsonpCallback: this.options.useJsonp ? "jsonp" : undefined,
        };
        this.executeRequest(params, callback, {}, {}, errorCallback);
    };
    BingProvider.prototype.geodecode = function (latitudeOrQuery, longitudeOrCallback, callbackOrErrorCallback, errorCallback) {
        var reverseQuery = provider_1.ProviderHelpers.getReverseQueryFromParameters(latitudeOrQuery, longitudeOrCallback);
        var reverseCallback = provider_1.ProviderHelpers.getCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback);
        var reverseErrorCallback = provider_1.ProviderHelpers.getErrorCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback, errorCallback);
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "dev.virtualearth.net",
            pathname: "REST/v1/Locations/" + reverseQuery.getCoordinates().latitude + "," + reverseQuery.getCoordinates().longitude,
        });
        var params = {
            key: this.options.apiKey,
            jsonpCallback: this.options.useJsonp ? "jsonp" : undefined,
        };
        this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
    };
    BingProvider.prototype.executeRequest = function (params, callback, headers, body, errorCallback) {
        this.externalLoader.executeRequest(params, function (data) {
            callback(data.resourceSets[0].resources.map(function (result) {
                return BingProvider.mapToGeocoded(result);
            }));
        }, headers, body, errorCallback);
    };
    BingProvider.mapToGeocoded = function (result) {
        var latitude = result.point.coordinates[0];
        var longitude = result.point.coordinates[1];
        var formattedAddress = result.address.formattedAddress;
        var streetName = result.address.addressLine;
        var _a = result.address, locality = _a.locality, postalCode = _a.postalCode;
        var region = result.address.adminDistrict;
        var country = result.address.countryRegion;
        var geocoded = Geocoded_1.default.create({
            latitude: latitude,
            longitude: longitude,
            formattedAddress: formattedAddress,
            streetName: streetName,
            locality: locality,
            postalCode: postalCode,
            region: region,
            country: country,
        });
        geocoded = geocoded.withBounds(result.bbox[0], result.bbox[1], result.bbox[2], result.bbox[3]);
        return geocoded;
    };
    return BingProvider;
}());
exports.default = BingProvider;


/***/ }),

/***/ "./src/provider/ChainProvider.ts":
/*!***************************************!*\
  !*** ./src/provider/ChainProvider.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultChainProviderOptions = void 0;
var provider_1 = __webpack_require__(/*! ./ */ "./src/provider/index.ts");
exports.defaultChainProviderOptions = __assign(__assign({}, provider_1.defaultProviderOptions), { providers: [] });
var ChainProvider = /** @class */ (function () {
    function ChainProvider(options) {
        if (options === void 0) { options = exports.defaultChainProviderOptions; }
        this.options = options;
    }
    ChainProvider.prototype.geocode = function (query, callback, errorCallback) {
        if (this.options.parallelize || this.options.first) {
            this.geocodeAllProviders(query, callback, errorCallback);
            return;
        }
        this.geocodeNextProvider(this.options.providers, query, callback, errorCallback);
    };
    ChainProvider.prototype.geodecode = function (latitudeOrQuery, longitudeOrCallback, callbackOrErrorCallback, errorCallback) {
        var reverseQuery = provider_1.ProviderHelpers.getReverseQueryFromParameters(latitudeOrQuery, longitudeOrCallback);
        var reverseCallback = provider_1.ProviderHelpers.getCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback);
        var reverseErrorCallback = provider_1.ProviderHelpers.getErrorCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback, errorCallback);
        if (this.options.parallelize || this.options.first) {
            this.geodecodeAllProviders(reverseQuery, reverseCallback, reverseErrorCallback);
            return;
        }
        this.geodecodeNextProvider(this.options.providers, reverseQuery, reverseCallback, reverseErrorCallback);
    };
    ChainProvider.prototype.geocodeNextProvider = function (providers, query, callback, errorCallback) {
        var _this = this;
        var provider = providers[0], nextProviders = providers.slice(1);
        var resultCallback = function (results) {
            if (results.length > 0) {
                callback(results);
                return;
            }
            _this.geocodeNextProvider(nextProviders, query, callback, errorCallback);
        };
        var resultErrorCallback = function (responseError) {
            if (errorCallback) {
                errorCallback(responseError);
            }
            if (!errorCallback) {
                // eslint-disable-next-line no-console
                console.error("An error has occurred when geocoding with the provider " + provider.constructor.name, responseError);
            }
            resultCallback([]);
        };
        provider.geocode(query, resultCallback, resultErrorCallback);
    };
    ChainProvider.prototype.geodecodeNextProvider = function (providers, reverseQuery, callback, errorCallback) {
        var _this = this;
        var provider = providers[0], nextProviders = providers.slice(1);
        var resultCallback = function (results) {
            if (results.length > 0) {
                callback(results);
                return;
            }
            _this.geodecodeNextProvider(nextProviders, reverseQuery, callback, errorCallback);
        };
        var resultErrorCallback = function (responseError) {
            if (errorCallback) {
                errorCallback(responseError);
            }
            if (!errorCallback) {
                // eslint-disable-next-line no-console
                console.error("An error has occurred when geodecoding with the provider " + provider.constructor.name, responseError);
            }
            resultCallback([]);
        };
        provider.geodecode(reverseQuery, resultCallback, resultErrorCallback);
    };
    ChainProvider.prototype.geocodeAllProviders = function (query, callback, errorCallback) {
        var _this = this;
        var providerResults = new Map();
        var callbackCalled = false;
        var getProviderResult = function () {
            return _this.options.providers.reduce(function (result, provider) {
                var providerResult = result;
                if (undefined === providerResult && _this.options.first) {
                    providerResult = [];
                }
                if (undefined === providerResult) {
                    return undefined;
                }
                if (providerResult.length > 0) {
                    return providerResult;
                }
                return providerResults.get(provider.constructor.name);
            }, []);
        };
        var resultProviderCallback = function (providerName) { return function (results) {
            providerResults.set(providerName, results);
            var providerResult = getProviderResult();
            if (!callbackCalled && providerResult) {
                callback(providerResult);
                callbackCalled = true;
            }
        }; };
        var resultProviderErrorCallback = function (providerName) { return function (responseError) {
            if (errorCallback) {
                errorCallback(responseError);
            }
            if (!errorCallback) {
                // eslint-disable-next-line no-console
                console.error("An error has occurred when geocoding with the provider " + providerName, responseError);
            }
            resultProviderCallback(providerName)([]);
        }; };
        this.options.providers.forEach(function (provider) {
            var providerName = provider.constructor.name;
            provider.geocode(query, resultProviderCallback(providerName), resultProviderErrorCallback(providerName));
        });
    };
    ChainProvider.prototype.geodecodeAllProviders = function (reverseQuery, callback, errorCallback) {
        var _this = this;
        var providerResults = new Map();
        var callbackCalled = false;
        var getProviderResult = function () {
            return _this.options.providers.reduce(function (result, provider) {
                var providerResult = result;
                if (undefined === providerResult && _this.options.first) {
                    providerResult = [];
                }
                if (undefined === providerResult) {
                    return undefined;
                }
                if (providerResult.length > 0) {
                    return providerResult;
                }
                return providerResults.get(provider.constructor.name);
            }, []);
        };
        var resultProviderCallback = function (providerName) { return function (results) {
            providerResults.set(providerName, results);
            var providerResult = getProviderResult();
            if (!callbackCalled && providerResult) {
                callback(providerResult);
                callbackCalled = true;
            }
        }; };
        var resultProviderErrorCallback = function (providerName) { return function (responseError) {
            if (errorCallback) {
                errorCallback(responseError);
            }
            if (!errorCallback) {
                // eslint-disable-next-line no-console
                console.error("An error has occurred when geodecoding with the provider " + providerName, responseError);
            }
            resultProviderCallback(providerName)([]);
        }; };
        this.options.providers.forEach(function (provider) {
            var providerName = provider.constructor.name;
            provider.geodecode(reverseQuery, resultProviderCallback(providerName), resultProviderErrorCallback(providerName));
        });
    };
    // eslint-disable-next-line class-methods-use-this
    ChainProvider.prototype.executeRequest = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    callback, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    headers, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    body, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorCallback) {
        throw new Error("executeRequest cannot be called directly from the chain provider.");
    };
    return ChainProvider;
}());
exports.default = ChainProvider;


/***/ }),

/***/ "./src/provider/MapquestProvider.ts":
/*!******************************************!*\
  !*** ./src/provider/MapquestProvider.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = __webpack_require__(/*! ./ */ "./src/provider/index.ts");
var Geocoded_1 = __importDefault(__webpack_require__(/*! ../Geocoded */ "./src/Geocoded.ts"));
var MapQuestProvider = /** @class */ (function () {
    function MapQuestProvider(_externalLoader, options) {
        if (options === void 0) { options = provider_1.defaultProviderOptions; }
        this.externalLoader = _externalLoader;
        this.options = __assign(__assign({}, provider_1.defaultProviderOptions), options);
        if (!this.options.apiKey) {
            throw new Error('An API key is required for the MapQuest provider. Please add it in the "apiKey" option.');
        }
    }
    MapQuestProvider.prototype.geocode = function (query, callback, errorCallback) {
        var geocodeQuery = provider_1.ProviderHelpers.getGeocodeQueryFromParameter(query);
        if (geocodeQuery.getIp()) {
            throw new Error("The MapQuest provider does not support IP geolocation, only location geocoding.");
        }
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "www.mapquestapi.com",
            pathname: "geocoding/v1/address",
        });
        var params = {
            key: this.options.apiKey,
            location: geocodeQuery.getText() || "",
            jsonpCallback: this.options.useJsonp ? "callback" : undefined,
        };
        this.executeRequest(params, callback, {}, {}, errorCallback);
    };
    MapQuestProvider.prototype.geodecode = function (latitudeOrQuery, longitudeOrCallback, callbackOrErrorCallback, errorCallback) {
        var reverseQuery = provider_1.ProviderHelpers.getReverseQueryFromParameters(latitudeOrQuery, longitudeOrCallback);
        var reverseCallback = provider_1.ProviderHelpers.getCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback);
        var reverseErrorCallback = provider_1.ProviderHelpers.getErrorCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback, errorCallback);
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "www.mapquestapi.com",
            pathname: "geocoding/v1/reverse",
        });
        var params = {
            key: this.options.apiKey,
            location: reverseQuery.getCoordinates().latitude + "," + reverseQuery.getCoordinates().longitude,
            jsonpCallback: this.options.useJsonp ? "callback" : undefined,
        };
        this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
    };
    MapQuestProvider.prototype.executeRequest = function (params, callback, headers, body, errorCallback) {
        this.externalLoader.executeRequest(params, function (data) {
            callback(data.results[0].locations.map(function (result) {
                return MapQuestProvider.mapToGeocoded(result);
            }));
        }, headers, body, errorCallback);
    };
    MapQuestProvider.mapToGeocoded = function (result) {
        var latitude = result.latLng.lat;
        var longitude = result.latLng.lng;
        var streetName = result.street;
        var subLocality = result.adminArea6;
        var locality = result.adminArea5;
        var postalCode = result.postalCode;
        var region = result.adminArea4;
        var country = result.adminArea1;
        var countryCode = result.adminArea1;
        return Geocoded_1.default.create({
            latitude: latitude,
            longitude: longitude,
            streetName: streetName,
            subLocality: subLocality,
            locality: locality,
            postalCode: postalCode,
            region: region,
            country: country,
            countryCode: countryCode,
        });
    };
    return MapQuestProvider;
}());
exports.default = MapQuestProvider;


/***/ }),

/***/ "./src/provider/ProviderHelpers.ts":
/*!*****************************************!*\
  !*** ./src/provider/ProviderHelpers.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(/*! ../query */ "./src/query/index.ts");
var utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
var ProviderHelpers = /** @class */ (function () {
    function ProviderHelpers() {
    }
    ProviderHelpers.getGeocodeQueryFromParameter = function (query, geocodeQuery) {
        if (geocodeQuery === void 0) { geocodeQuery = query_1.GeocodeQuery; }
        if (typeof query === "string") {
            if (utils_1.isIpv4(query) || utils_1.isIpv6(query)) {
                return geocodeQuery.create({ ip: query });
            }
            return geocodeQuery.create({ text: query });
        }
        if (!(query instanceof geocodeQuery)) {
            return geocodeQuery.create(query);
        }
        return query;
    };
    ProviderHelpers.getReverseQueryFromParameters = function (latitudeOrQuery, longitudeOrCallback, reverseQuery) {
        if (reverseQuery === void 0) { reverseQuery = query_1.ReverseQuery; }
        if (typeof latitudeOrQuery === "number" ||
            typeof latitudeOrQuery === "string") {
            if (!(typeof longitudeOrCallback === "number" ||
                typeof longitudeOrCallback === "string")) {
                throw new Error("The second parameter of geodecode must be a longitude if the first one is a latitude");
            }
            return reverseQuery.create({
                latitude: latitudeOrQuery,
                longitude: longitudeOrCallback,
            });
        }
        if (!(latitudeOrQuery instanceof reverseQuery)) {
            return reverseQuery.create(latitudeOrQuery);
        }
        return latitudeOrQuery;
    };
    ProviderHelpers.getCallbackFromParameters = function (longitudeOrCallback, callbackOrErrorCallback) {
        if (!(typeof longitudeOrCallback === "number" ||
            typeof longitudeOrCallback === "string")) {
            return longitudeOrCallback;
        }
        if (callbackOrErrorCallback) {
            return callbackOrErrorCallback;
        }
        throw new Error("A callback must be set at the last parameter of geodecode");
    };
    ProviderHelpers.getErrorCallbackFromParameters = function (longitudeOrCallback, callbackOrErrorCallback, errorCallback) {
        if (errorCallback) {
            return errorCallback;
        }
        if (typeof longitudeOrCallback === "number" ||
            typeof longitudeOrCallback === "string") {
            return undefined;
        }
        return callbackOrErrorCallback;
    };
    return ProviderHelpers;
}());
exports.default = ProviderHelpers;


/***/ }),

/***/ "./src/provider/ProviderInterface.ts":
/*!*******************************************!*\
  !*** ./src/provider/ProviderInterface.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProviderOptions = exports.DEFAULT_RESULT_LIMIT = void 0;
exports.DEFAULT_RESULT_LIMIT = 5;
exports.defaultProviderOptions = {
    useSsl: false,
    useJsonp: false,
};


/***/ }),

/***/ "./src/provider/YandexProvider.ts":
/*!****************************************!*\
  !*** ./src/provider/YandexProvider.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = __webpack_require__(/*! ./ */ "./src/provider/index.ts");
var Geocoded_1 = __importDefault(__webpack_require__(/*! ../Geocoded */ "./src/Geocoded.ts"));
var YandexProvider = /** @class */ (function () {
    function YandexProvider(_externalLoader, options) {
        if (options === void 0) { options = provider_1.defaultProviderOptions; }
        this.externalLoader = _externalLoader;
        this.options = __assign(__assign({}, provider_1.defaultProviderOptions), options);
    }
    YandexProvider.prototype.geocode = function (query, callback, errorCallback) {
        var geocodeQuery = provider_1.ProviderHelpers.getGeocodeQueryFromParameter(query);
        if (geocodeQuery.getIp()) {
            throw new Error("The Yandex provider does not support IP geolocation, only location geocoding.");
        }
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "geocode-maps.yandex.ru",
            pathname: "1.x",
        });
        var params = {
            apikey: this.options.apiKey,
            geocode: geocodeQuery.getText() || "",
            format: "json",
            lang: geocodeQuery.getLocale(),
            jsonpCallback: this.options.useJsonp ? "callback" : undefined,
        };
        this.executeRequest(params, callback, {}, {}, errorCallback);
    };
    YandexProvider.prototype.geodecode = function (latitudeOrQuery, longitudeOrCallback, callbackOrErrorCallback, errorCallback) {
        var reverseQuery = provider_1.ProviderHelpers.getReverseQueryFromParameters(latitudeOrQuery, longitudeOrCallback);
        var reverseCallback = provider_1.ProviderHelpers.getCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback);
        var reverseErrorCallback = provider_1.ProviderHelpers.getErrorCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback, errorCallback);
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "geocode-maps.yandex.ru",
            pathname: "1.x",
        });
        var params = {
            apikey: this.options.apiKey,
            geocode: reverseQuery.getCoordinates().longitude + "," + reverseQuery.getCoordinates().latitude,
            format: "json",
            lang: reverseQuery.getLocale(),
            toponym: this.options.toponym,
            jsonpCallback: this.options.useJsonp ? "callback" : undefined,
        };
        this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
    };
    YandexProvider.prototype.executeRequest = function (params, callback, headers, body, errorCallback) {
        this.externalLoader.executeRequest(params, function (data) {
            callback(data.response.GeoObjectCollection.featureMember.map(function (result) {
                return YandexProvider.mapToGeocoded(result.GeoObject);
            }));
        }, headers, body, errorCallback);
    };
    YandexProvider.mapToGeocoded = function (result) {
        var point = result.Point.pos.split(" ");
        var latitude = parseFloat(point[1]);
        var longitude = parseFloat(point[0]);
        var addressDetails = YandexProvider.flattenObject(result.metaDataProperty.GeocoderMetaData.AddressDetails);
        var streetNumber = addressDetails.PremiseNumber;
        var streetName = addressDetails.ThoroughfareName;
        var subLocality = addressDetails.DependentLocalityName;
        var locality = addressDetails.LocalityName;
        var region = addressDetails.AdministrativeAreaName;
        var country = addressDetails.CountryName;
        var countryCode = addressDetails.CountryNameCode;
        var geocoded = Geocoded_1.default.create({
            latitude: latitude,
            longitude: longitude,
            streetNumber: streetNumber,
            streetName: streetName,
            subLocality: subLocality,
            locality: locality,
            region: region,
            country: country,
            countryCode: countryCode,
        });
        var lowerCorner = result.boundedBy.Envelope.lowerCorner.split(" ");
        var upperCorner = result.boundedBy.Envelope.upperCorner.split(" ");
        geocoded = geocoded.withBounds(parseFloat(lowerCorner[1]), parseFloat(lowerCorner[0]), parseFloat(upperCorner[1]), parseFloat(upperCorner[0]));
        return geocoded;
    };
    YandexProvider.flattenObject = function (object) {
        var flattened = {};
        var step = function (nestedObject) {
            Object.keys(nestedObject).forEach(function (key) {
                var value = nestedObject[key];
                var isArray = Array.isArray(value);
                var type = Object.prototype.toString.call(value);
                var isObject = type === "[object Object]" || type === "[object Array]";
                if (!isArray &&
                    isObject &&
                    Object.keys(value).length) {
                    step(value);
                    return;
                }
                flattened[key] = value;
            });
        };
        step(object);
        return flattened;
    };
    return YandexProvider;
}());
exports.default = YandexProvider;


/***/ }),

/***/ "./src/provider/geoplugin/GeoPluginGeocoded.ts":
/*!*****************************************************!*\
  !*** ./src/provider/geoplugin/GeoPluginGeocoded.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Geocoded_1 = __importDefault(__webpack_require__(/*! ../../Geocoded */ "./src/Geocoded.ts"));
var GeoPluginGeocoded = /** @class */ (function (_super) {
    __extends(GeoPluginGeocoded, _super);
    function GeoPluginGeocoded(_a) {
        var attribution = _a.attribution, geocodedObject = __rest(_a, ["attribution"]);
        var _this = _super.call(this, geocodedObject) || this;
        _this.attribution = attribution;
        return _this;
    }
    GeoPluginGeocoded.create = function (object) {
        return new this(object);
    };
    GeoPluginGeocoded.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { attribution: this.attribution });
    };
    GeoPluginGeocoded.prototype.withAttribution = function (attribution) {
        return new GeoPluginGeocoded(__assign(__assign({}, this.toObject()), { attribution: attribution }));
    };
    GeoPluginGeocoded.prototype.getAttribution = function () {
        return this.attribution;
    };
    return GeoPluginGeocoded;
}(Geocoded_1.default));
exports.default = GeoPluginGeocoded;


/***/ }),

/***/ "./src/provider/geoplugin/GeoPluginProvider.ts":
/*!*****************************************************!*\
  !*** ./src/provider/geoplugin/GeoPluginProvider.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = __webpack_require__(/*! ./.. */ "./src/provider/index.ts");
var error_1 = __webpack_require__(/*! ../../error */ "./src/error/index.ts");
var AdminLevel_1 = __importDefault(__webpack_require__(/*! ../../AdminLevel */ "./src/AdminLevel.ts"));
var GeoPluginProvider = /** @class */ (function () {
    function GeoPluginProvider(_externalLoader, options) {
        if (options === void 0) { options = provider_1.defaultProviderOptions; }
        this.externalLoader = _externalLoader;
        this.options = __assign(__assign({}, provider_1.defaultProviderOptions), options);
    }
    GeoPluginProvider.prototype.geocode = function (query, callback, errorCallback) {
        var geocodeQuery = provider_1.ProviderHelpers.getGeocodeQueryFromParameter(query);
        if (geocodeQuery.getText()) {
            throw new Error("The GeoPlugin provider does not support location geocoding, only IP geolocation.");
        }
        if (["127.0.0.1", "::1"].includes(geocodeQuery.getIp() || "")) {
            callback([
                provider_1.GeoPluginGeocoded.create({
                    locality: "localhost",
                    country: "localhost",
                }),
            ]);
            return;
        }
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "www.geoplugin.net",
            pathname: "json.gp",
        });
        var params = {
            ip: geocodeQuery.getIp() || "",
        };
        this.executeRequest(params, callback, {}, {}, errorCallback);
    };
    // eslint-disable-next-line class-methods-use-this
    GeoPluginProvider.prototype.geodecode = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    latitudeOrQuery, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    longitudeOrCallback, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    callbackOrErrorCallback, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorCallback) {
        throw new Error("The GeoPlugin provider does not support reverse geocoding.");
    };
    GeoPluginProvider.prototype.executeRequest = function (params, callback, headers, body, errorCallback) {
        this.externalLoader.executeRequest(params, function (data) {
            if (![200, 206].includes(data.geoplugin_status)) {
                var errorMessage_1 = "An error has occurred. Status: " + data.geoplugin_status + ".";
                if (errorCallback) {
                    errorCallback(new error_1.ResponseError(errorMessage_1, data));
                    return;
                }
                setTimeout(function () {
                    throw new Error(errorMessage_1);
                });
                return;
            }
            callback([GeoPluginProvider.mapToGeocoded(data)]);
        }, headers, body, errorCallback);
    };
    GeoPluginProvider.mapToGeocoded = function (result) {
        var latitude = parseFloat(result.geoplugin_latitude);
        var longitude = parseFloat(result.geoplugin_longitude);
        var locality = result.geoplugin_city || undefined;
        var region = result.geoplugin_region || undefined;
        var country = result.geoplugin_countryName || undefined;
        var countryCode = result.geoplugin_countryCode || undefined;
        var timezone = result.geoplugin_timezone || undefined;
        var adminLevels = [];
        var attribution = result.geoplugin_credit || undefined;
        if (result.geoplugin_regionName) {
            adminLevels.push(AdminLevel_1.default.create({
                level: 1,
                name: result.geoplugin_regionName,
                code: result.geoplugin_regionCode || undefined,
            }));
        }
        var geocoded = provider_1.GeoPluginGeocoded.create({
            latitude: latitude,
            longitude: longitude,
            locality: locality,
            region: region,
            adminLevels: adminLevels,
            country: country,
            countryCode: countryCode,
            timezone: timezone,
            attribution: attribution,
        });
        return geocoded;
    };
    return GeoPluginProvider;
}());
exports.default = GeoPluginProvider;


/***/ }),

/***/ "./src/provider/geoplugin/index.ts":
/*!*****************************************!*\
  !*** ./src/provider/geoplugin/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var GeoPluginGeocoded_1 = __webpack_require__(/*! ./GeoPluginGeocoded */ "./src/provider/geoplugin/GeoPluginGeocoded.ts");
Object.defineProperty(exports, "GeoPluginGeocoded", { enumerable: true, get: function () { return GeoPluginGeocoded_1.default; } });
var GeoPluginProvider_1 = __webpack_require__(/*! ./GeoPluginProvider */ "./src/provider/geoplugin/GeoPluginProvider.ts");
Object.defineProperty(exports, "GeoPluginProvider", { enumerable: true, get: function () { return GeoPluginProvider_1.default; } });
__exportStar(__webpack_require__(/*! ./GeoPluginProvider */ "./src/provider/geoplugin/GeoPluginProvider.ts"), exports);


/***/ }),

/***/ "./src/provider/googlemaps/GoogleMapsGeocodeQuery.ts":
/*!***********************************************************!*\
  !*** ./src/provider/googlemaps/GoogleMapsGeocodeQuery.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(/*! ../../query */ "./src/query/index.ts");
var GoogleMapsGeocodeQuery = /** @class */ (function (_super) {
    __extends(GoogleMapsGeocodeQuery, _super);
    function GoogleMapsGeocodeQuery(_a) {
        var countryCodes = _a.countryCodes, components = _a.components, channel = _a.channel, geocodeQueryObject = __rest(_a, ["countryCodes", "components", "channel"]);
        var _this = _super.call(this, geocodeQueryObject) || this;
        if (countryCodes && countryCodes.length !== 1) {
            throw new Error('The "countryCodes" parameter must have only one country code top-level domain.');
        }
        _this.countryCodes = countryCodes;
        _this.components = components;
        _this.channel = channel;
        return _this;
    }
    GoogleMapsGeocodeQuery.create = function (object) {
        return new this(object);
    };
    GoogleMapsGeocodeQuery.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { countryCodes: this.countryCodes, components: this.components, channel: this.channel });
    };
    GoogleMapsGeocodeQuery.prototype.withCountryCodes = function (countryCodes) {
        return new GoogleMapsGeocodeQuery(__assign(__assign({}, this.toObject()), { countryCodes: countryCodes }));
    };
    GoogleMapsGeocodeQuery.prototype.getCountryCodes = function () {
        return this.countryCodes;
    };
    GoogleMapsGeocodeQuery.prototype.withComponents = function (components) {
        return new GoogleMapsGeocodeQuery(__assign(__assign({}, this.toObject()), { components: components }));
    };
    GoogleMapsGeocodeQuery.prototype.getComponents = function () {
        return this.components;
    };
    GoogleMapsGeocodeQuery.prototype.withChannel = function (channel) {
        return new GoogleMapsGeocodeQuery(__assign(__assign({}, this.toObject()), { channel: channel }));
    };
    GoogleMapsGeocodeQuery.prototype.getChannel = function () {
        return this.channel;
    };
    return GoogleMapsGeocodeQuery;
}(query_1.GeocodeQuery));
exports.default = GoogleMapsGeocodeQuery;


/***/ }),

/***/ "./src/provider/googlemaps/GoogleMapsGeocoded.ts":
/*!*******************************************************!*\
  !*** ./src/provider/googlemaps/GoogleMapsGeocoded.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Geocoded_1 = __importDefault(__webpack_require__(/*! ../../Geocoded */ "./src/Geocoded.ts"));
var GoogleMapsGeocoded = /** @class */ (function (_super) {
    __extends(GoogleMapsGeocoded, _super);
    function GoogleMapsGeocoded(_a) {
        var placeId = _a.placeId, partialMatch = _a.partialMatch, resultType = _a.resultType, locationType = _a.locationType, streetAddress = _a.streetAddress, intersection = _a.intersection, political = _a.political, colloquialArea = _a.colloquialArea, ward = _a.ward, neighborhood = _a.neighborhood, premise = _a.premise, subpremise = _a.subpremise, naturalFeature = _a.naturalFeature, airport = _a.airport, park = _a.park, pointOfInterest = _a.pointOfInterest, establishment = _a.establishment, postalCodeSuffix = _a.postalCodeSuffix, subLocalityLevels = _a.subLocalityLevels, geocodedObject = __rest(_a, ["placeId", "partialMatch", "resultType", "locationType", "streetAddress", "intersection", "political", "colloquialArea", "ward", "neighborhood", "premise", "subpremise", "naturalFeature", "airport", "park", "pointOfInterest", "establishment", "postalCodeSuffix", "subLocalityLevels"]);
        var _this = _super.call(this, geocodedObject) || this;
        _this.placeId = placeId;
        _this.partialMatch = partialMatch;
        _this.resultType = resultType;
        _this.locationType = locationType;
        _this.streetAddress = streetAddress;
        _this.intersection = intersection;
        _this.political = political;
        _this.colloquialArea = colloquialArea;
        _this.ward = ward;
        _this.neighborhood = neighborhood;
        _this.premise = premise;
        _this.subpremise = subpremise;
        _this.naturalFeature = naturalFeature;
        _this.airport = airport;
        _this.park = park;
        _this.pointOfInterest = pointOfInterest;
        _this.establishment = establishment;
        _this.postalCodeSuffix = postalCodeSuffix;
        _this.subLocalityLevels = subLocalityLevels || [];
        return _this;
    }
    GoogleMapsGeocoded.create = function (object) {
        return new this(object);
    };
    GoogleMapsGeocoded.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { placeId: this.placeId, partialMatch: this.partialMatch, resultType: this.resultType, locationType: this.locationType, streetAddress: this.streetAddress, intersection: this.intersection, political: this.political, colloquialArea: this.colloquialArea, ward: this.ward, neighborhood: this.neighborhood, premise: this.premise, subpremise: this.subpremise, naturalFeature: this.naturalFeature, airport: this.airport, park: this.park, pointOfInterest: this.pointOfInterest, establishment: this.establishment, postalCodeSuffix: this.postalCodeSuffix, subLocalityLevels: this.subLocalityLevels });
    };
    GoogleMapsGeocoded.prototype.withPlaceId = function (placeId) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { placeId: placeId }));
    };
    GoogleMapsGeocoded.prototype.getPlaceId = function () {
        return this.placeId;
    };
    GoogleMapsGeocoded.prototype.withPartialMatch = function (partialMatch) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { partialMatch: partialMatch }));
    };
    GoogleMapsGeocoded.prototype.isPartialMatch = function () {
        return this.partialMatch;
    };
    GoogleMapsGeocoded.prototype.withResultType = function (resultType) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { resultType: resultType }));
    };
    GoogleMapsGeocoded.prototype.getResultType = function () {
        return this.resultType;
    };
    GoogleMapsGeocoded.prototype.withLocationType = function (locationType) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { locationType: locationType }));
    };
    GoogleMapsGeocoded.prototype.getLocationType = function () {
        return this.locationType;
    };
    GoogleMapsGeocoded.prototype.withStreetAddress = function (streetAddress) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { streetAddress: streetAddress }));
    };
    GoogleMapsGeocoded.prototype.getStreetAddress = function () {
        return this.streetAddress;
    };
    GoogleMapsGeocoded.prototype.withIntersection = function (intersection) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { intersection: intersection }));
    };
    GoogleMapsGeocoded.prototype.getIntersection = function () {
        return this.intersection;
    };
    GoogleMapsGeocoded.prototype.withPolitical = function (political) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { political: political }));
    };
    GoogleMapsGeocoded.prototype.getPolitical = function () {
        return this.political;
    };
    GoogleMapsGeocoded.prototype.withColloquialArea = function (colloquialArea) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { colloquialArea: colloquialArea }));
    };
    GoogleMapsGeocoded.prototype.getColloquialArea = function () {
        return this.colloquialArea;
    };
    GoogleMapsGeocoded.prototype.withWard = function (ward) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { ward: ward }));
    };
    GoogleMapsGeocoded.prototype.getWard = function () {
        return this.ward;
    };
    GoogleMapsGeocoded.prototype.withNeighborhood = function (neighborhood) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { neighborhood: neighborhood }));
    };
    GoogleMapsGeocoded.prototype.getNeighborhood = function () {
        return this.neighborhood;
    };
    GoogleMapsGeocoded.prototype.withPremise = function (premise) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { premise: premise }));
    };
    GoogleMapsGeocoded.prototype.getPremise = function () {
        return this.premise;
    };
    GoogleMapsGeocoded.prototype.withSubpremise = function (subpremise) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { subpremise: subpremise }));
    };
    GoogleMapsGeocoded.prototype.getSubpremise = function () {
        return this.subpremise;
    };
    GoogleMapsGeocoded.prototype.withNaturalFeature = function (naturalFeature) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { naturalFeature: naturalFeature }));
    };
    GoogleMapsGeocoded.prototype.getNaturalFeature = function () {
        return this.naturalFeature;
    };
    GoogleMapsGeocoded.prototype.withAirport = function (airport) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { airport: airport }));
    };
    GoogleMapsGeocoded.prototype.getAirport = function () {
        return this.airport;
    };
    GoogleMapsGeocoded.prototype.withPark = function (park) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { park: park }));
    };
    GoogleMapsGeocoded.prototype.getPark = function () {
        return this.park;
    };
    GoogleMapsGeocoded.prototype.withPointOfInterest = function (pointOfInterest) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { pointOfInterest: pointOfInterest }));
    };
    GoogleMapsGeocoded.prototype.getPointOfInterest = function () {
        return this.pointOfInterest;
    };
    GoogleMapsGeocoded.prototype.withEstablishment = function (establishment) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { establishment: establishment }));
    };
    GoogleMapsGeocoded.prototype.getEstablishment = function () {
        return this.establishment;
    };
    GoogleMapsGeocoded.prototype.withPostalCodeSuffix = function (postalCodeSuffix) {
        return new GoogleMapsGeocoded(__assign(__assign({}, this.toObject()), { postalCodeSuffix: postalCodeSuffix }));
    };
    GoogleMapsGeocoded.prototype.getPostalCodeSuffix = function () {
        return this.postalCodeSuffix;
    };
    GoogleMapsGeocoded.prototype.addSubLocalityLevel = function (subLocalityLevel) {
        this.subLocalityLevels.push(subLocalityLevel);
    };
    GoogleMapsGeocoded.prototype.getSubLocalityLevels = function () {
        return this.subLocalityLevels;
    };
    return GoogleMapsGeocoded;
}(Geocoded_1.default));
exports.default = GoogleMapsGeocoded;


/***/ }),

/***/ "./src/provider/googlemaps/GoogleMapsProvider.ts":
/*!*******************************************************!*\
  !*** ./src/provider/googlemaps/GoogleMapsProvider.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = __webpack_require__(/*! ./.. */ "./src/provider/index.ts");
var AdminLevel_1 = __importDefault(__webpack_require__(/*! ../../AdminLevel */ "./src/AdminLevel.ts"));
var error_1 = __webpack_require__(/*! ../../error */ "./src/error/index.ts");
var utils_1 = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
var GoogleMapsProvider = /** @class */ (function () {
    function GoogleMapsProvider(_externalLoader, options) {
        if (options === void 0) { options = provider_1.defaultProviderOptions; }
        this.externalLoader = _externalLoader;
        this.options = __assign(__assign({}, provider_1.defaultProviderOptions), options);
        if (!this.options.apiKey && !this.options.clientId) {
            throw new Error('An API key or a client ID is required for the Google Maps provider. Please add it in the "apiKey" or the "clientId" option.');
        }
        if (this.options.clientId && !this.options.secret) {
            throw new Error('An URL signing secret is required if you use a client ID (Premium only). Please add it in the "secret" option.');
        }
        if (this.options.secret && utils_1.isBrowser()) {
            throw new Error('The "secret" option cannot be used in a browser environment.');
        }
        if (this.options.countryCodes && this.options.countryCodes.length !== 1) {
            throw new Error('The "countryCodes" option must have only one country code top-level domain.');
        }
    }
    GoogleMapsProvider.prototype.geocode = function (query, callback, errorCallback) {
        var _a, _b, _c, _d, _e, _f, _g;
        var geocodeQuery = provider_1.ProviderHelpers.getGeocodeQueryFromParameter(query, provider_1.GoogleMapsGeocodeQuery);
        if (geocodeQuery.getIp()) {
            throw new Error("The GoogleMaps provider does not support IP geolocation, only location geocoding.");
        }
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "maps.googleapis.com",
            pathname: "maps/api/geocode/json",
        });
        var params = this.withCommonParams({
            address: geocodeQuery.getText(),
            bounds: geocodeQuery.getBounds()
                ? ((_a = geocodeQuery.getBounds()) === null || _a === void 0 ? void 0 : _a.south) + "," + ((_b = geocodeQuery.getBounds()) === null || _b === void 0 ? void 0 : _b.west) + "|" + ((_c = geocodeQuery.getBounds()) === null || _c === void 0 ? void 0 : _c.north) + "," + ((_d = geocodeQuery.getBounds()) === null || _d === void 0 ? void 0 : _d.east)
                : undefined,
            components: geocodeQuery.getComponents()
                ? (_e = geocodeQuery
                    .getComponents()) === null || _e === void 0 ? void 0 : _e.map(function (component) { return component.name + ":" + component.value; }).join("|") : undefined,
            region: geocodeQuery.getCountryCodes()
                ? (_f = geocodeQuery.getCountryCodes()) === null || _f === void 0 ? void 0 : _f.join(",") : (_g = this.options.countryCodes) === null || _g === void 0 ? void 0 : _g.join(","),
        }, geocodeQuery);
        this.executeRequest(params, callback, {}, {}, errorCallback);
    };
    GoogleMapsProvider.prototype.geodecode = function (latitudeOrQuery, longitudeOrCallback, callbackOrErrorCallback, errorCallback) {
        var _a, _b;
        var reverseQuery = provider_1.ProviderHelpers.getReverseQueryFromParameters(latitudeOrQuery, longitudeOrCallback, provider_1.GoogleMapsReverseQuery);
        var reverseCallback = provider_1.ProviderHelpers.getCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback);
        var reverseErrorCallback = provider_1.ProviderHelpers.getErrorCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback, errorCallback);
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "maps.googleapis.com",
            pathname: "maps/api/geocode/json",
        });
        var params = this.withCommonParams({
            latlng: reverseQuery.getCoordinates().latitude + "," + reverseQuery.getCoordinates().longitude,
            result_type: reverseQuery.getResultTypes()
                ? (_a = reverseQuery.getResultTypes()) === null || _a === void 0 ? void 0 : _a.join("|") : undefined,
            location_type: reverseQuery.getLocationTypes()
                ? (_b = reverseQuery.getLocationTypes()) === null || _b === void 0 ? void 0 : _b.join("|") : undefined,
        }, reverseQuery);
        this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
    };
    GoogleMapsProvider.prototype.withCommonParams = function (params, query) {
        var withCommonParams = __assign(__assign({}, params), { key: this.options.apiKey, client: this.options.clientId, channel: query.getChannel(), language: query.getLocale(), limit: query.getLimit().toString() });
        if (this.options.secret) {
            withCommonParams = __assign(__assign({}, withCommonParams), { signature: GoogleMapsProvider.signQuery(this.options.secret, this.externalLoader.getOptions().pathname || "", withCommonParams) });
        }
        return withCommonParams;
    };
    GoogleMapsProvider.prototype.executeRequest = function (params, callback, headers, body, errorCallback) {
        var limit = params.limit, externalLoaderParams = __rest(params, ["limit"]);
        this.externalLoader.executeRequest(externalLoaderParams, function (data) {
            var errorMessage;
            switch (data.status) {
                case "REQUEST_DENIED":
                    errorMessage = "Request has been denied";
                    if (data.error_message) {
                        errorMessage += ": " + data.error_message;
                    }
                    break;
                case "OVER_QUERY_LIMIT":
                    errorMessage =
                        "Exceeded daily quota when attempting geocoding request";
                    if (data.error_message) {
                        errorMessage += ": " + data.error_message;
                    }
                    break;
                case "OVER_DAILY_LIMIT":
                    errorMessage = "API usage has been limited";
                    if (data.error_message) {
                        errorMessage += ": " + data.error_message;
                    }
                    break;
                case "INVALID_REQUEST":
                    errorMessage = "The request is invalid";
                    if (data.error_message) {
                        errorMessage += ": " + data.error_message;
                    }
                    break;
                case "UNKNOWN_ERROR":
                    errorMessage = "Unknown error";
                    if (data.error_message) {
                        errorMessage += ": " + data.error_message;
                    }
                    break;
                default:
                // Intentionnaly left empty
            }
            if (errorMessage && errorCallback) {
                errorCallback(new error_1.ResponseError(errorMessage, data));
                return;
            }
            if (errorMessage) {
                setTimeout(function () {
                    throw new Error(errorMessage);
                });
                return;
            }
            var results = data.results;
            var resultsToRemove = results.length - parseInt(limit || results.length.toString(), 10);
            if (resultsToRemove > 0) {
                results.splice(-resultsToRemove);
            }
            callback(results.map(function (result) {
                return GoogleMapsProvider.mapToGeocoded(result);
            }));
        }, headers, body, errorCallback);
    };
    GoogleMapsProvider.mapToGeocoded = function (result) {
        var latitude = result.geometry.location.lat;
        var longitude = result.geometry.location.lng;
        var formattedAddress = result.formatted_address;
        var streetNumber;
        var streetName;
        var subLocality;
        var locality;
        var postalCode;
        var region;
        var country;
        var countryCode;
        var adminLevels = [];
        var placeId = result.place_id;
        var partialMatch = result.partial_match;
        var resultType = result.types;
        var locationType = result.geometry.location_type;
        var streetAddress;
        var intersection;
        var political;
        var colloquialArea;
        var ward;
        var neighborhood;
        var premise;
        var subpremise;
        var naturalFeature;
        var airport;
        var park;
        var pointOfInterest;
        var establishment;
        var postalCodeSuffix;
        var subLocalityLevels = [];
        result.address_components.forEach(function (addressComponent) {
            addressComponent.types.forEach(function (type) {
                switch (type) {
                    case "street_number":
                        streetNumber = addressComponent.long_name;
                        break;
                    case "route":
                        streetName = addressComponent.long_name;
                        break;
                    case "sublocality":
                        subLocality = addressComponent.long_name;
                        break;
                    case "locality":
                    case "postal_town":
                        locality = addressComponent.long_name;
                        break;
                    case "postal_code":
                        postalCode = addressComponent.long_name;
                        break;
                    case "administrative_area_level_1":
                    case "administrative_area_level_2":
                    case "administrative_area_level_3":
                    case "administrative_area_level_4":
                    case "administrative_area_level_5":
                        if (type === "administrative_area_level_1") {
                            region = addressComponent.long_name;
                        }
                        adminLevels.push(AdminLevel_1.default.create({
                            level: parseInt(type.substr(-1), 10),
                            name: addressComponent.long_name,
                            code: addressComponent.short_name,
                        }));
                        break;
                    case "sublocality_level_1":
                    case "sublocality_level_2":
                    case "sublocality_level_3":
                    case "sublocality_level_4":
                    case "sublocality_level_5":
                        subLocalityLevels.push(AdminLevel_1.default.create({
                            level: parseInt(type.substr(-1), 10),
                            name: addressComponent.long_name,
                            code: addressComponent.short_name,
                        }));
                        break;
                    case "country":
                        country = addressComponent.long_name;
                        countryCode = addressComponent.short_name;
                        break;
                    case "street_address":
                        streetAddress = addressComponent.long_name;
                        break;
                    case "intersection":
                        intersection = addressComponent.long_name;
                        break;
                    case "political":
                        political = addressComponent.long_name;
                        break;
                    case "colloquial_area":
                        colloquialArea = addressComponent.long_name;
                        break;
                    case "ward":
                        ward = addressComponent.long_name;
                        break;
                    case "neighborhood":
                        neighborhood = addressComponent.long_name;
                        break;
                    case "premise":
                        premise = addressComponent.long_name;
                        break;
                    case "subpremise":
                        subpremise = addressComponent.long_name;
                        break;
                    case "natural_feature":
                        naturalFeature = addressComponent.long_name;
                        break;
                    case "airport":
                        airport = addressComponent.long_name;
                        break;
                    case "park":
                        park = addressComponent.long_name;
                        break;
                    case "point_of_interest":
                        pointOfInterest = addressComponent.long_name;
                        break;
                    case "establishment":
                        establishment = addressComponent.long_name;
                        break;
                    case "postal_code_suffix":
                        postalCodeSuffix = addressComponent.long_name;
                        break;
                    default:
                }
            });
        });
        var geocoded = provider_1.GoogleMapsGeocoded.create({
            latitude: latitude,
            longitude: longitude,
            formattedAddress: formattedAddress,
            streetNumber: streetNumber,
            streetName: streetName,
            subLocality: subLocality,
            locality: locality,
            postalCode: postalCode,
            region: region,
            country: country,
            countryCode: countryCode,
            adminLevels: adminLevels,
            placeId: placeId,
            partialMatch: partialMatch,
            resultType: resultType,
            locationType: locationType,
            streetAddress: streetAddress,
            intersection: intersection,
            political: political,
            colloquialArea: colloquialArea,
            ward: ward,
            neighborhood: neighborhood,
            premise: premise,
            subpremise: subpremise,
            naturalFeature: naturalFeature,
            airport: airport,
            park: park,
            pointOfInterest: pointOfInterest,
            establishment: establishment,
            postalCodeSuffix: postalCodeSuffix,
            subLocalityLevels: subLocalityLevels,
        });
        if (result.geometry.bounds) {
            var bounds = result.geometry.bounds;
            geocoded = (geocoded.withBounds(bounds.southwest.lat, bounds.southwest.lng, bounds.northeast.lat, bounds.northeast.lng));
        }
        else if (result.geometry.viewport) {
            var viewport = result.geometry.viewport;
            geocoded = (geocoded.withBounds(viewport.southwest.lat, viewport.southwest.lng, viewport.northeast.lat, viewport.northeast.lng));
        }
        else if (result.geometry.location_type === "ROOFTOP") {
            // Fake bounds
            geocoded = (geocoded.withBounds(latitude, longitude, latitude, longitude));
        }
        return geocoded;
    };
    GoogleMapsProvider.signQuery = function (secret, pathname, params) {
        var crypto = utils_1.getRequireFunc()("crypto");
        var filteredRequestParams = utils_1.filterUndefinedObjectValues(params);
        var safeSecret = utils_1.decodeBase64(utils_1.decodeUrlSafeBase64(secret));
        var toSign = pathname + "?" + new URLSearchParams(filteredRequestParams).toString();
        var hashedSignature = utils_1.encodeUrlSafeBase64(crypto.createHmac("sha1", safeSecret).update(toSign).digest("base64"));
        return hashedSignature;
    };
    return GoogleMapsProvider;
}());
exports.default = GoogleMapsProvider;


/***/ }),

/***/ "./src/provider/googlemaps/GoogleMapsReverseQuery.ts":
/*!***********************************************************!*\
  !*** ./src/provider/googlemaps/GoogleMapsReverseQuery.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(/*! ../../query */ "./src/query/index.ts");
var GoogleMapsReverseQuery = /** @class */ (function (_super) {
    __extends(GoogleMapsReverseQuery, _super);
    function GoogleMapsReverseQuery(_a) {
        var resultTypes = _a.resultTypes, locationTypes = _a.locationTypes, channel = _a.channel, reverseQueryObject = __rest(_a, ["resultTypes", "locationTypes", "channel"]);
        var _this = _super.call(this, reverseQueryObject) || this;
        _this.resultTypes = resultTypes;
        _this.locationTypes = locationTypes;
        _this.channel = channel;
        return _this;
    }
    GoogleMapsReverseQuery.create = function (object) {
        return new this(object);
    };
    GoogleMapsReverseQuery.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { resultTypes: this.resultTypes, locationTypes: this.locationTypes, channel: this.channel });
    };
    GoogleMapsReverseQuery.prototype.withResultTypes = function (resultTypes) {
        return new GoogleMapsReverseQuery(__assign(__assign({}, this.toObject()), { resultTypes: resultTypes }));
    };
    GoogleMapsReverseQuery.prototype.getResultTypes = function () {
        return this.resultTypes;
    };
    GoogleMapsReverseQuery.prototype.withLocationTypes = function (locationTypes) {
        return new GoogleMapsReverseQuery(__assign(__assign({}, this.toObject()), { locationTypes: locationTypes }));
    };
    GoogleMapsReverseQuery.prototype.getLocationTypes = function () {
        return this.locationTypes;
    };
    GoogleMapsReverseQuery.prototype.withChannel = function (channel) {
        return new GoogleMapsReverseQuery(__assign(__assign({}, this.toObject()), { channel: channel }));
    };
    GoogleMapsReverseQuery.prototype.getChannel = function () {
        return this.channel;
    };
    return GoogleMapsReverseQuery;
}(query_1.ReverseQuery));
exports.default = GoogleMapsReverseQuery;


/***/ }),

/***/ "./src/provider/googlemaps/index.ts":
/*!******************************************!*\
  !*** ./src/provider/googlemaps/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var GoogleMapsGeocoded_1 = __webpack_require__(/*! ./GoogleMapsGeocoded */ "./src/provider/googlemaps/GoogleMapsGeocoded.ts");
Object.defineProperty(exports, "GoogleMapsGeocoded", { enumerable: true, get: function () { return GoogleMapsGeocoded_1.default; } });
var GoogleMapsGeocodeQuery_1 = __webpack_require__(/*! ./GoogleMapsGeocodeQuery */ "./src/provider/googlemaps/GoogleMapsGeocodeQuery.ts");
Object.defineProperty(exports, "GoogleMapsGeocodeQuery", { enumerable: true, get: function () { return GoogleMapsGeocodeQuery_1.default; } });
__exportStar(__webpack_require__(/*! ./GoogleMapsGeocodeQuery */ "./src/provider/googlemaps/GoogleMapsGeocodeQuery.ts"), exports);
var GoogleMapsProvider_1 = __webpack_require__(/*! ./GoogleMapsProvider */ "./src/provider/googlemaps/GoogleMapsProvider.ts");
Object.defineProperty(exports, "GoogleMapsProvider", { enumerable: true, get: function () { return GoogleMapsProvider_1.default; } });
__exportStar(__webpack_require__(/*! ./GoogleMapsProvider */ "./src/provider/googlemaps/GoogleMapsProvider.ts"), exports);
var GoogleMapsReverseQuery_1 = __webpack_require__(/*! ./GoogleMapsReverseQuery */ "./src/provider/googlemaps/GoogleMapsReverseQuery.ts");
Object.defineProperty(exports, "GoogleMapsReverseQuery", { enumerable: true, get: function () { return GoogleMapsReverseQuery_1.default; } });
__exportStar(__webpack_require__(/*! ./GoogleMapsReverseQuery */ "./src/provider/googlemaps/GoogleMapsReverseQuery.ts"), exports);


/***/ }),

/***/ "./src/provider/index.ts":
/*!*******************************!*\
  !*** ./src/provider/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderHelpers_1 = __webpack_require__(/*! ./ProviderHelpers */ "./src/provider/ProviderHelpers.ts");
Object.defineProperty(exports, "ProviderHelpers", { enumerable: true, get: function () { return ProviderHelpers_1.default; } });
__exportStar(__webpack_require__(/*! ./ProviderInterface */ "./src/provider/ProviderInterface.ts"), exports);
var BingProvider_1 = __webpack_require__(/*! ./BingProvider */ "./src/provider/BingProvider.ts");
Object.defineProperty(exports, "BingProvider", { enumerable: true, get: function () { return BingProvider_1.default; } });
__exportStar(__webpack_require__(/*! ./BingProvider */ "./src/provider/BingProvider.ts"), exports);
var ChainProvider_1 = __webpack_require__(/*! ./ChainProvider */ "./src/provider/ChainProvider.ts");
Object.defineProperty(exports, "ChainProvider", { enumerable: true, get: function () { return ChainProvider_1.default; } });
__exportStar(__webpack_require__(/*! ./ChainProvider */ "./src/provider/ChainProvider.ts"), exports);
__exportStar(__webpack_require__(/*! ./geoplugin */ "./src/provider/geoplugin/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./googlemaps */ "./src/provider/googlemaps/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./mapbox */ "./src/provider/mapbox/index.ts"), exports);
var MapquestProvider_1 = __webpack_require__(/*! ./MapquestProvider */ "./src/provider/MapquestProvider.ts");
Object.defineProperty(exports, "MapquestProvider", { enumerable: true, get: function () { return MapquestProvider_1.default; } });
__exportStar(__webpack_require__(/*! ./MapquestProvider */ "./src/provider/MapquestProvider.ts"), exports);
__exportStar(__webpack_require__(/*! ./nominatim */ "./src/provider/nominatim/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./opencage */ "./src/provider/opencage/index.ts"), exports);
var YandexProvider_1 = __webpack_require__(/*! ./YandexProvider */ "./src/provider/YandexProvider.ts");
Object.defineProperty(exports, "YandexProvider", { enumerable: true, get: function () { return YandexProvider_1.default; } });
__exportStar(__webpack_require__(/*! ./YandexProvider */ "./src/provider/YandexProvider.ts"), exports);


/***/ }),

/***/ "./src/provider/mapbox/MapboxGeocodeQuery.ts":
/*!***************************************************!*\
  !*** ./src/provider/mapbox/MapboxGeocodeQuery.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(/*! ../../query */ "./src/query/index.ts");
var MapboxGeocodeQuery = /** @class */ (function (_super) {
    __extends(MapboxGeocodeQuery, _super);
    function MapboxGeocodeQuery(_a) {
        var countryCodes = _a.countryCodes, proximity = _a.proximity, locationTypes = _a.locationTypes, geocodeQueryObject = __rest(_a, ["countryCodes", "proximity", "locationTypes"]);
        var _this = _super.call(this, geocodeQueryObject) || this;
        _this.countryCodes = countryCodes;
        _this.proximity = proximity;
        _this.locationTypes = locationTypes;
        return _this;
    }
    MapboxGeocodeQuery.create = function (object) {
        return new this(object);
    };
    MapboxGeocodeQuery.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { countryCodes: this.countryCodes, proximity: this.proximity, locationTypes: this.locationTypes });
    };
    MapboxGeocodeQuery.prototype.withCountryCodes = function (countryCodes) {
        return new MapboxGeocodeQuery(__assign(__assign({}, this.toObject()), { countryCodes: countryCodes }));
    };
    MapboxGeocodeQuery.prototype.getCountryCodes = function () {
        return this.countryCodes;
    };
    MapboxGeocodeQuery.prototype.withProximity = function (proximity) {
        return new MapboxGeocodeQuery(__assign(__assign({}, this.toObject()), { proximity: proximity }));
    };
    MapboxGeocodeQuery.prototype.getProximity = function () {
        return this.proximity;
    };
    MapboxGeocodeQuery.prototype.withLocationTypes = function (locationTypes) {
        return new MapboxGeocodeQuery(__assign(__assign({}, this.toObject()), { locationTypes: locationTypes }));
    };
    MapboxGeocodeQuery.prototype.getLocationTypes = function () {
        return this.locationTypes;
    };
    return MapboxGeocodeQuery;
}(query_1.GeocodeQuery));
exports.default = MapboxGeocodeQuery;


/***/ }),

/***/ "./src/provider/mapbox/MapboxGeocoded.ts":
/*!***********************************************!*\
  !*** ./src/provider/mapbox/MapboxGeocoded.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Geocoded_1 = __importDefault(__webpack_require__(/*! ../../Geocoded */ "./src/Geocoded.ts"));
var MapboxGeocoded = /** @class */ (function (_super) {
    __extends(MapboxGeocoded, _super);
    function MapboxGeocoded(_a) {
        var resultType = _a.resultType, geocodedObject = __rest(_a, ["resultType"]);
        var _this = _super.call(this, geocodedObject) || this;
        _this.resultType = resultType;
        return _this;
    }
    MapboxGeocoded.create = function (object) {
        return new this(object);
    };
    MapboxGeocoded.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { resultType: this.resultType });
    };
    MapboxGeocoded.prototype.withResultType = function (resultType) {
        return new MapboxGeocoded(__assign(__assign({}, this.toObject()), { resultType: resultType }));
    };
    MapboxGeocoded.prototype.getResultType = function () {
        return this.resultType;
    };
    return MapboxGeocoded;
}(Geocoded_1.default));
exports.default = MapboxGeocoded;


/***/ }),

/***/ "./src/provider/mapbox/MapboxProvider.ts":
/*!***********************************************!*\
  !*** ./src/provider/mapbox/MapboxProvider.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMapboxProviderOptions = exports.MAPBOX_GEOCODING_MODES = void 0;
var provider_1 = __webpack_require__(/*! ./.. */ "./src/provider/index.ts");
var AdminLevel_1 = __importDefault(__webpack_require__(/*! ../../AdminLevel */ "./src/AdminLevel.ts"));
var MAPBOX_GEOCODING_MODES;
(function (MAPBOX_GEOCODING_MODES) {
    MAPBOX_GEOCODING_MODES["GEOCODING_MODE_PLACES"] = "mapbox.places";
    MAPBOX_GEOCODING_MODES["GEOCODING_MODE_PLACES_PERMANENT"] = "mapbox.places-permanent";
})(MAPBOX_GEOCODING_MODES = exports.MAPBOX_GEOCODING_MODES || (exports.MAPBOX_GEOCODING_MODES = {}));
exports.defaultMapboxProviderOptions = __assign(__assign({}, provider_1.defaultProviderOptions), { apiKey: "", geocodingMode: MAPBOX_GEOCODING_MODES.GEOCODING_MODE_PLACES });
var MapboxProvider = /** @class */ (function () {
    function MapboxProvider(_externalLoader, options) {
        if (options === void 0) { options = exports.defaultMapboxProviderOptions; }
        this.externalLoader = _externalLoader;
        this.options = __assign(__assign({}, exports.defaultMapboxProviderOptions), options);
        if (!this.options.apiKey) {
            throw new Error('An API key is required for the Mapbox provider. Please add it in the "apiKey" option.');
        }
    }
    MapboxProvider.prototype.geocode = function (query, callback, errorCallback) {
        var _a, _b, _c, _d, _e, _f, _g;
        var geocodeQuery = provider_1.ProviderHelpers.getGeocodeQueryFromParameter(query, provider_1.MapboxGeocodeQuery);
        if (geocodeQuery.getIp()) {
            throw new Error("The Mapbox provider does not support IP geolocation, only location geocoding.");
        }
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "api.mapbox.com",
            pathname: "geocoding/v5/" + this.options.geocodingMode + "/" + geocodeQuery.getText() + ".json",
        });
        var params = this.withCommonParams({
            bbox: geocodeQuery.getBounds()
                ? ((_a = geocodeQuery.getBounds()) === null || _a === void 0 ? void 0 : _a.west) + "," + ((_b = geocodeQuery.getBounds()) === null || _b === void 0 ? void 0 : _b.south) + "," + ((_c = geocodeQuery.getBounds()) === null || _c === void 0 ? void 0 : _c.east) + "," + ((_d = geocodeQuery.getBounds()) === null || _d === void 0 ? void 0 : _d.north)
                : undefined,
            proximity: geocodeQuery.getProximity()
                ? ((_e = geocodeQuery.getProximity()) === null || _e === void 0 ? void 0 : _e.longitude) + "," + ((_f = geocodeQuery.getProximity()) === null || _f === void 0 ? void 0 : _f.latitude)
                : undefined,
            types: geocodeQuery.getLocationTypes()
                ? (_g = geocodeQuery.getLocationTypes()) === null || _g === void 0 ? void 0 : _g.join(",") : undefined,
        }, geocodeQuery);
        this.executeRequest(params, callback, {}, {}, errorCallback);
    };
    MapboxProvider.prototype.geodecode = function (latitudeOrQuery, longitudeOrCallback, callbackOrErrorCallback, errorCallback) {
        var _a;
        var reverseQuery = provider_1.ProviderHelpers.getReverseQueryFromParameters(latitudeOrQuery, longitudeOrCallback, provider_1.MapboxReverseQuery);
        var reverseCallback = provider_1.ProviderHelpers.getCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback);
        var reverseErrorCallback = provider_1.ProviderHelpers.getErrorCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback, errorCallback);
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "api.mapbox.com",
            pathname: "geocoding/v5/" + this.options.geocodingMode + "/" + reverseQuery.getCoordinates().longitude + "," + reverseQuery.getCoordinates().latitude + ".json",
        });
        var params = this.withCommonParams({
            reverseMode: reverseQuery.getReverseMode()
                ? reverseQuery.getReverseMode()
                : undefined,
            types: reverseQuery.getLocationTypes()
                ? (_a = reverseQuery.getLocationTypes()) === null || _a === void 0 ? void 0 : _a.join(",") : "address",
        }, reverseQuery);
        this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
    };
    MapboxProvider.prototype.withCommonParams = function (params, query) {
        var _a, _b;
        return __assign(__assign({}, params), { access_token: this.options.apiKey || "", country: query.getCountryCodes()
                ? (_a = query.getCountryCodes()) === null || _a === void 0 ? void 0 : _a.join(",") : (_b = this.options.countryCodes) === null || _b === void 0 ? void 0 : _b.join(","), language: query.getLocale(), limit: query.getLimit().toString() });
    };
    MapboxProvider.prototype.executeRequest = function (params, callback, headers, body, errorCallback) {
        this.externalLoader.executeRequest(params, function (data) {
            callback(data.features.map(function (result) {
                return MapboxProvider.mapToGeocoded(result);
            }));
        }, headers, body, errorCallback);
    };
    MapboxProvider.mapToGeocoded = function (result) {
        var latitude = result.geometry.coordinates[1];
        var longitude = result.geometry.coordinates[0];
        var formattedAddress = result.place_name;
        var streetNumber = result.address;
        var streetName = result.text;
        var locality;
        var postalCode;
        var region;
        var country;
        var countryCode;
        var adminLevels = [];
        var resultType = result.place_type;
        var adminLevelCode;
        (result.context || []).forEach(function (feature) {
            var type = feature.id.split(".")[0];
            switch (type) {
                case "locality":
                    locality = feature.text;
                    break;
                case "place":
                    locality = feature.text;
                    adminLevels.push(AdminLevel_1.default.create({
                        level: 2,
                        name: locality,
                    }));
                    break;
                case "postcode":
                    postalCode = feature.text;
                    break;
                case "region":
                    region = feature.text;
                    adminLevelCode = undefined;
                    if (feature.short_code && feature.short_code.match(/[A-z]{2}-/)) {
                        adminLevelCode = feature.short_code.replace(/[A-z]{2}-/, "");
                    }
                    adminLevels.push(AdminLevel_1.default.create({
                        level: 1,
                        name: region,
                        code: adminLevelCode,
                    }));
                    break;
                case "country":
                    country = feature.text;
                    countryCode = feature.short_code;
                    break;
                default:
            }
        });
        var geocoded = provider_1.MapboxGeocoded.create({
            latitude: latitude,
            longitude: longitude,
            formattedAddress: formattedAddress,
            streetNumber: streetNumber,
            streetName: streetName,
            locality: locality,
            postalCode: postalCode,
            region: region,
            adminLevels: adminLevels,
            country: country,
            countryCode: countryCode,
            resultType: resultType,
        });
        if (result.bbox) {
            geocoded = (geocoded.withBounds(result.bbox[1], result.bbox[0], result.bbox[3], result.bbox[2]));
        }
        return geocoded;
    };
    return MapboxProvider;
}());
exports.default = MapboxProvider;


/***/ }),

/***/ "./src/provider/mapbox/MapboxReverseQuery.ts":
/*!***************************************************!*\
  !*** ./src/provider/mapbox/MapboxReverseQuery.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(/*! ../../query */ "./src/query/index.ts");
var MapboxReverseQuery = /** @class */ (function (_super) {
    __extends(MapboxReverseQuery, _super);
    function MapboxReverseQuery(_a) {
        var countryCodes = _a.countryCodes, reverseMode = _a.reverseMode, locationTypes = _a.locationTypes, reverseQueryObject = __rest(_a, ["countryCodes", "reverseMode", "locationTypes"]);
        var _this = _super.call(this, reverseQueryObject) || this;
        _this.countryCodes = countryCodes;
        _this.reverseMode = reverseMode;
        _this.locationTypes = locationTypes;
        return _this;
    }
    MapboxReverseQuery.create = function (object) {
        return new this(object);
    };
    MapboxReverseQuery.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { countryCodes: this.countryCodes, reverseMode: this.reverseMode, locationTypes: this.locationTypes });
    };
    MapboxReverseQuery.prototype.withCountryCodes = function (countryCodes) {
        return new MapboxReverseQuery(__assign(__assign({}, this.toObject()), { countryCodes: countryCodes }));
    };
    MapboxReverseQuery.prototype.getCountryCodes = function () {
        return this.countryCodes;
    };
    MapboxReverseQuery.prototype.withReverseMode = function (reverseMode) {
        return new MapboxReverseQuery(__assign(__assign({}, this.toObject()), { reverseMode: reverseMode }));
    };
    MapboxReverseQuery.prototype.getReverseMode = function () {
        return this.reverseMode;
    };
    MapboxReverseQuery.prototype.withLocationTypes = function (locationTypes) {
        return new MapboxReverseQuery(__assign(__assign({}, this.toObject()), { locationTypes: locationTypes }));
    };
    MapboxReverseQuery.prototype.getLocationTypes = function () {
        return this.locationTypes;
    };
    return MapboxReverseQuery;
}(query_1.ReverseQuery));
exports.default = MapboxReverseQuery;


/***/ }),

/***/ "./src/provider/mapbox/index.ts":
/*!**************************************!*\
  !*** ./src/provider/mapbox/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var MapboxGeocoded_1 = __webpack_require__(/*! ./MapboxGeocoded */ "./src/provider/mapbox/MapboxGeocoded.ts");
Object.defineProperty(exports, "MapboxGeocoded", { enumerable: true, get: function () { return MapboxGeocoded_1.default; } });
var MapboxGeocodeQuery_1 = __webpack_require__(/*! ./MapboxGeocodeQuery */ "./src/provider/mapbox/MapboxGeocodeQuery.ts");
Object.defineProperty(exports, "MapboxGeocodeQuery", { enumerable: true, get: function () { return MapboxGeocodeQuery_1.default; } });
__exportStar(__webpack_require__(/*! ./MapboxGeocodeQuery */ "./src/provider/mapbox/MapboxGeocodeQuery.ts"), exports);
var MapboxProvider_1 = __webpack_require__(/*! ./MapboxProvider */ "./src/provider/mapbox/MapboxProvider.ts");
Object.defineProperty(exports, "MapboxProvider", { enumerable: true, get: function () { return MapboxProvider_1.default; } });
__exportStar(__webpack_require__(/*! ./MapboxProvider */ "./src/provider/mapbox/MapboxProvider.ts"), exports);
var MapboxReverseQuery_1 = __webpack_require__(/*! ./MapboxReverseQuery */ "./src/provider/mapbox/MapboxReverseQuery.ts");
Object.defineProperty(exports, "MapboxReverseQuery", { enumerable: true, get: function () { return MapboxReverseQuery_1.default; } });
__exportStar(__webpack_require__(/*! ./MapboxReverseQuery */ "./src/provider/mapbox/MapboxReverseQuery.ts"), exports);


/***/ }),

/***/ "./src/provider/nominatim/NominatimGeocodeQuery.ts":
/*!*********************************************************!*\
  !*** ./src/provider/nominatim/NominatimGeocodeQuery.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(/*! ../../query */ "./src/query/index.ts");
var NominatimGeocodeQuery = /** @class */ (function (_super) {
    __extends(NominatimGeocodeQuery, _super);
    function NominatimGeocodeQuery(_a) {
        var countryCodes = _a.countryCodes, excludePlaceIds = _a.excludePlaceIds, viewBox = _a.viewBox, bounded = _a.bounded, geocodeQueryObject = __rest(_a, ["countryCodes", "excludePlaceIds", "viewBox", "bounded"]);
        var _this = _super.call(this, geocodeQueryObject) || this;
        _this.countryCodes = countryCodes;
        _this.excludePlaceIds = excludePlaceIds;
        if (viewBox && viewBox.length !== 4) {
            throw new Error('The "viewBox" parameter must be 4 numbers.');
        }
        _this.viewBox = viewBox;
        if (bounded && !viewBox) {
            throw new Error('The "bounded" parameter can only be used with the "viewBox" parameter.');
        }
        _this.bounded = bounded;
        return _this;
    }
    NominatimGeocodeQuery.create = function (object) {
        return new this(object);
    };
    NominatimGeocodeQuery.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { countryCodes: this.countryCodes, excludePlaceIds: this.excludePlaceIds, viewBox: this.viewBox, bounded: this.bounded });
    };
    NominatimGeocodeQuery.prototype.withCountryCodes = function (countryCodes) {
        return new NominatimGeocodeQuery(__assign(__assign({}, this.toObject()), { countryCodes: countryCodes }));
    };
    NominatimGeocodeQuery.prototype.getCountryCodes = function () {
        return this.countryCodes;
    };
    NominatimGeocodeQuery.prototype.withExcludePlaceIds = function (excludePlaceIds) {
        return new NominatimGeocodeQuery(__assign(__assign({}, this.toObject()), { excludePlaceIds: excludePlaceIds }));
    };
    NominatimGeocodeQuery.prototype.getExcludePlaceIds = function () {
        return this.excludePlaceIds;
    };
    NominatimGeocodeQuery.prototype.withViewBox = function (viewBox) {
        return new NominatimGeocodeQuery(__assign(__assign({}, this.toObject()), { viewBox: viewBox }));
    };
    NominatimGeocodeQuery.prototype.getViewBox = function () {
        return this.viewBox;
    };
    NominatimGeocodeQuery.prototype.withBounded = function (bounded) {
        return new NominatimGeocodeQuery(__assign(__assign({}, this.toObject()), { bounded: bounded }));
    };
    NominatimGeocodeQuery.prototype.getBounded = function () {
        return this.bounded;
    };
    return NominatimGeocodeQuery;
}(query_1.GeocodeQuery));
exports.default = NominatimGeocodeQuery;


/***/ }),

/***/ "./src/provider/nominatim/NominatimGeocoded.ts":
/*!*****************************************************!*\
  !*** ./src/provider/nominatim/NominatimGeocoded.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Geocoded_1 = __importDefault(__webpack_require__(/*! ../../Geocoded */ "./src/Geocoded.ts"));
var NominatimGeocoded = /** @class */ (function (_super) {
    __extends(NominatimGeocoded, _super);
    function NominatimGeocoded(_a) {
        var displayName = _a.displayName, osmId = _a.osmId, osmType = _a.osmType, category = _a.category, type = _a.type, attribution = _a.attribution, geocodedObject = __rest(_a, ["displayName", "osmId", "osmType", "category", "type", "attribution"]);
        var _this = _super.call(this, geocodedObject) || this;
        _this.displayName = displayName;
        _this.osmId = osmId;
        _this.osmType = osmType;
        _this.category = category;
        _this.type = type;
        _this.attribution = attribution;
        return _this;
    }
    NominatimGeocoded.create = function (object) {
        return new this(object);
    };
    NominatimGeocoded.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { displayName: this.displayName, osmId: this.osmId, osmType: this.osmType, category: this.category, type: this.type, attribution: this.attribution });
    };
    NominatimGeocoded.prototype.withDisplayName = function (displayName) {
        return new NominatimGeocoded(__assign(__assign({}, this.toObject()), { displayName: displayName }));
    };
    NominatimGeocoded.prototype.getDisplayName = function () {
        return this.displayName;
    };
    NominatimGeocoded.prototype.withOsmId = function (osmId) {
        return new NominatimGeocoded(__assign(__assign({}, this.toObject()), { osmId: osmId }));
    };
    NominatimGeocoded.prototype.getOsmId = function () {
        return this.osmId;
    };
    NominatimGeocoded.prototype.withOsmType = function (osmType) {
        return new NominatimGeocoded(__assign(__assign({}, this.toObject()), { osmType: osmType }));
    };
    NominatimGeocoded.prototype.getOsmType = function () {
        return this.osmType;
    };
    NominatimGeocoded.prototype.withCategory = function (category) {
        return new NominatimGeocoded(__assign(__assign({}, this.toObject()), { category: category }));
    };
    NominatimGeocoded.prototype.getCategory = function () {
        return this.category;
    };
    NominatimGeocoded.prototype.withType = function (type) {
        return new NominatimGeocoded(__assign(__assign({}, this.toObject()), { type: type }));
    };
    NominatimGeocoded.prototype.getType = function () {
        return this.type;
    };
    NominatimGeocoded.prototype.withAttribution = function (attribution) {
        return new NominatimGeocoded(__assign(__assign({}, this.toObject()), { attribution: attribution }));
    };
    NominatimGeocoded.prototype.getAttribution = function () {
        return this.attribution;
    };
    return NominatimGeocoded;
}(Geocoded_1.default));
exports.default = NominatimGeocoded;


/***/ }),

/***/ "./src/provider/nominatim/NominatimProvider.ts":
/*!*****************************************************!*\
  !*** ./src/provider/nominatim/NominatimProvider.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultNominatimProviderOptions = void 0;
var provider_1 = __webpack_require__(/*! ./.. */ "./src/provider/index.ts");
var AdminLevel_1 = __importDefault(__webpack_require__(/*! ../../AdminLevel */ "./src/AdminLevel.ts"));
var error_1 = __webpack_require__(/*! ../../error */ "./src/error/index.ts");
exports.defaultNominatimProviderOptions = __assign(__assign({}, provider_1.defaultProviderOptions), { host: "nominatim.openstreetmap.org", userAgent: "" });
var NominatimProvider = /** @class */ (function () {
    function NominatimProvider(_externalLoader, options) {
        if (options === void 0) { options = exports.defaultNominatimProviderOptions; }
        this.externalLoader = _externalLoader;
        this.options = __assign(__assign({}, exports.defaultNominatimProviderOptions), options);
        if (this.options.host === exports.defaultNominatimProviderOptions.host &&
            !this.options.userAgent) {
            throw new Error('An User-Agent identifying your application is required for the OpenStreetMap / Nominatim provider when using the default host. Please add it in the "userAgent" option.');
        }
    }
    NominatimProvider.prototype.geocode = function (query, callback, errorCallback) {
        var _a, _b, _c, _d;
        var geocodeQuery = provider_1.ProviderHelpers.getGeocodeQueryFromParameter(query, provider_1.NominatimGeocodeQuery);
        if (geocodeQuery.getIp()) {
            throw new Error("The OpenStreetMap / Nominatim provider does not support IP geolocation, only location geocoding.");
        }
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: this.options.host,
            pathname: "search",
        });
        var params = this.withCommonParams({
            q: geocodeQuery.getText(),
            limit: geocodeQuery.getLimit().toString(),
            countrycodes: geocodeQuery.getCountryCodes()
                ? (_a = geocodeQuery.getCountryCodes()) === null || _a === void 0 ? void 0 : _a.join(",") : undefined,
            exclude_place_ids: (geocodeQuery).getExcludePlaceIds()
                ? (_b = geocodeQuery
                    .getExcludePlaceIds()) === null || _b === void 0 ? void 0 : _b.join(",") : undefined,
            viewbox: geocodeQuery.getViewBox()
                ? (_c = geocodeQuery.getViewBox()) === null || _c === void 0 ? void 0 : _c.join(",") : undefined,
            bounded: geocodeQuery.getBounded()
                ? (_d = geocodeQuery.getBounded()) === null || _d === void 0 ? void 0 : _d.toString() : undefined,
        }, geocodeQuery);
        this.executeRequest(params, callback, this.getHeaders(), {}, errorCallback);
    };
    NominatimProvider.prototype.geodecode = function (latitudeOrQuery, longitudeOrCallback, callbackOrErrorCallback, errorCallback) {
        var _a;
        var reverseQuery = provider_1.ProviderHelpers.getReverseQueryFromParameters(latitudeOrQuery, longitudeOrCallback, provider_1.NominatimReverseQuery);
        var reverseCallback = provider_1.ProviderHelpers.getCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback);
        var reverseErrorCallback = provider_1.ProviderHelpers.getErrorCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback, errorCallback);
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: this.options.host,
            pathname: "reverse",
        });
        var params = this.withCommonParams({
            lat: reverseQuery.getCoordinates().latitude.toString(),
            lon: reverseQuery.getCoordinates().longitude.toString(),
            zoom: ((_a = reverseQuery.getZoom()) === null || _a === void 0 ? void 0 : _a.toString()) || "18",
        }, reverseQuery);
        this.executeRequest(params, reverseCallback, this.getHeaders(), {}, reverseErrorCallback);
    };
    NominatimProvider.prototype.withCommonParams = function (params, query) {
        return __assign(__assign({}, params), { format: "jsonv2", addressdetails: "1", jsonpCallback: this.options.useJsonp ? "json_callback" : undefined, "accept-language": query.getLocale() });
    };
    NominatimProvider.prototype.getHeaders = function () {
        return {
            "User-Agent": this.options.userAgent || "",
            Referer: this.options.referer,
        };
    };
    NominatimProvider.prototype.executeRequest = function (params, callback, headers, body, errorCallback) {
        this.externalLoader.executeRequest(params, function (data) {
            var results = data;
            if (!Array.isArray(data)) {
                if (data.error) {
                    var errorMessage_1 = "An error has occurred: " + data.error;
                    if (errorCallback) {
                        errorCallback(new error_1.ResponseError(errorMessage_1, data));
                        return;
                    }
                    setTimeout(function () {
                        throw new Error(errorMessage_1);
                    });
                    return;
                }
                results = [data];
            }
            callback(results.map(function (result) {
                return NominatimProvider.mapToGeocoded(result);
            }));
        }, headers, body, errorCallback);
    };
    NominatimProvider.mapToGeocoded = function (result) {
        var latitude = parseFloat(result.lat);
        var longitude = parseFloat(result.lon);
        var displayName = result.display_name;
        var streetNumber = result.address.house_number;
        var streetName = result.address.road || result.address.pedestrian;
        var subLocality = result.address.suburb;
        var locality;
        var postalCode = result.address.postcode
            ? result.address.postcode.split(";")[0]
            : undefined;
        var region = result.address.state;
        var country = result.address.country;
        var countryCode = result.address.country_code;
        var osmId = result.osm_id;
        var osmType = result.osm_type;
        var category = result.category;
        var type = result.type;
        var attribution = result.licence;
        var localityTypes = [
            "city",
            "town",
            "village",
            "hamlet",
        ];
        localityTypes.forEach(function (localityType) {
            if (result.address[localityType] && !locality) {
                locality = result.address[localityType];
            }
        });
        var geocoded = provider_1.NominatimGeocoded.create({
            latitude: latitude,
            longitude: longitude,
            displayName: displayName,
            streetNumber: streetNumber,
            streetName: streetName,
            subLocality: subLocality,
            locality: locality,
            postalCode: postalCode,
            region: region,
            country: country,
            countryCode: countryCode,
            osmId: osmId,
            osmType: osmType,
            category: category,
            type: type,
            attribution: attribution,
        });
        geocoded = (geocoded.withBounds(parseFloat(result.boundingbox[0]), parseFloat(result.boundingbox[2]), parseFloat(result.boundingbox[1]), parseFloat(result.boundingbox[3])));
        var adminLevels = ["state", "county"];
        adminLevels.forEach(function (adminLevel, level) {
            if (result.address[adminLevel]) {
                geocoded.addAdminLevel(AdminLevel_1.default.create({
                    level: level + 1,
                    name: result.address[adminLevel] || "",
                }));
            }
        });
        return geocoded;
    };
    return NominatimProvider;
}());
exports.default = NominatimProvider;


/***/ }),

/***/ "./src/provider/nominatim/NominatimReverseQuery.ts":
/*!*********************************************************!*\
  !*** ./src/provider/nominatim/NominatimReverseQuery.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(/*! ../../query */ "./src/query/index.ts");
var NominatimReverseQuery = /** @class */ (function (_super) {
    __extends(NominatimReverseQuery, _super);
    function NominatimReverseQuery(_a) {
        var zoom = _a.zoom, reverseQueryObject = __rest(_a, ["zoom"]);
        var _this = _super.call(this, reverseQueryObject) || this;
        _this.zoom = zoom;
        return _this;
    }
    NominatimReverseQuery.create = function (object) {
        return new this(object);
    };
    NominatimReverseQuery.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { zoom: this.zoom });
    };
    NominatimReverseQuery.prototype.withZoom = function (zoom) {
        return new NominatimReverseQuery(__assign(__assign({}, this.toObject()), { zoom: zoom }));
    };
    NominatimReverseQuery.prototype.getZoom = function () {
        return this.zoom;
    };
    return NominatimReverseQuery;
}(query_1.ReverseQuery));
exports.default = NominatimReverseQuery;


/***/ }),

/***/ "./src/provider/nominatim/index.ts":
/*!*****************************************!*\
  !*** ./src/provider/nominatim/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var NominatimGeocoded_1 = __webpack_require__(/*! ./NominatimGeocoded */ "./src/provider/nominatim/NominatimGeocoded.ts");
Object.defineProperty(exports, "NominatimGeocoded", { enumerable: true, get: function () { return NominatimGeocoded_1.default; } });
var NominatimGeocoded_2 = __webpack_require__(/*! ./NominatimGeocoded */ "./src/provider/nominatim/NominatimGeocoded.ts");
Object.defineProperty(exports, "OpenStreetMapGeocoded", { enumerable: true, get: function () { return NominatimGeocoded_2.default; } });
__exportStar(__webpack_require__(/*! ./NominatimGeocoded */ "./src/provider/nominatim/NominatimGeocoded.ts"), exports);
var NominatimGeocodeQuery_1 = __webpack_require__(/*! ./NominatimGeocodeQuery */ "./src/provider/nominatim/NominatimGeocodeQuery.ts");
Object.defineProperty(exports, "NominatimGeocodeQuery", { enumerable: true, get: function () { return NominatimGeocodeQuery_1.default; } });
var NominatimGeocodeQuery_2 = __webpack_require__(/*! ./NominatimGeocodeQuery */ "./src/provider/nominatim/NominatimGeocodeQuery.ts");
Object.defineProperty(exports, "OpenStreetMapGeocodeQuery", { enumerable: true, get: function () { return NominatimGeocodeQuery_2.default; } });
__exportStar(__webpack_require__(/*! ./NominatimGeocodeQuery */ "./src/provider/nominatim/NominatimGeocodeQuery.ts"), exports);
var NominatimProvider_1 = __webpack_require__(/*! ./NominatimProvider */ "./src/provider/nominatim/NominatimProvider.ts");
Object.defineProperty(exports, "NominatimProvider", { enumerable: true, get: function () { return NominatimProvider_1.default; } });
var NominatimProvider_2 = __webpack_require__(/*! ./NominatimProvider */ "./src/provider/nominatim/NominatimProvider.ts");
Object.defineProperty(exports, "OpenStreetMapProvider", { enumerable: true, get: function () { return NominatimProvider_2.default; } });
__exportStar(__webpack_require__(/*! ./NominatimProvider */ "./src/provider/nominatim/NominatimProvider.ts"), exports);
var NominatimProvider_3 = __webpack_require__(/*! ./NominatimProvider */ "./src/provider/nominatim/NominatimProvider.ts");
Object.defineProperty(exports, "defaultOpenStreetMapProviderOptions", { enumerable: true, get: function () { return NominatimProvider_3.defaultNominatimProviderOptions; } });
var NominatimReverseQuery_1 = __webpack_require__(/*! ./NominatimReverseQuery */ "./src/provider/nominatim/NominatimReverseQuery.ts");
Object.defineProperty(exports, "NominatimReverseQuery", { enumerable: true, get: function () { return NominatimReverseQuery_1.default; } });
var NominatimReverseQuery_2 = __webpack_require__(/*! ./NominatimReverseQuery */ "./src/provider/nominatim/NominatimReverseQuery.ts");
Object.defineProperty(exports, "OpenStreetMapReverseQuery", { enumerable: true, get: function () { return NominatimReverseQuery_2.default; } });
__exportStar(__webpack_require__(/*! ./NominatimReverseQuery */ "./src/provider/nominatim/NominatimReverseQuery.ts"), exports);


/***/ }),

/***/ "./src/provider/opencage/OpenCageGeocodeQuery.ts":
/*!*******************************************************!*\
  !*** ./src/provider/opencage/OpenCageGeocodeQuery.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(/*! ../../query */ "./src/query/index.ts");
var OpenCageGeocodeQuery = /** @class */ (function (_super) {
    __extends(OpenCageGeocodeQuery, _super);
    function OpenCageGeocodeQuery(_a) {
        var countryCodes = _a.countryCodes, proximity = _a.proximity, minConfidence = _a.minConfidence, noRecord = _a.noRecord, geocodeQueryObject = __rest(_a, ["countryCodes", "proximity", "minConfidence", "noRecord"]);
        var _this = _super.call(this, geocodeQueryObject) || this;
        _this.countryCodes = countryCodes;
        _this.proximity = proximity;
        if (minConfidence &&
            (minConfidence.toString() !==
                parseInt(minConfidence.toString(), 10).toString() ||
                minConfidence < 1 ||
                minConfidence > 10)) {
            throw new Error('The "minConfidence" parameter must be an integer from 1 to 10.');
        }
        _this.minConfidence = minConfidence;
        _this.noRecord = noRecord;
        return _this;
    }
    OpenCageGeocodeQuery.create = function (object) {
        return new this(object);
    };
    OpenCageGeocodeQuery.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { countryCodes: this.countryCodes, proximity: this.proximity, minConfidence: this.minConfidence, noRecord: this.noRecord });
    };
    OpenCageGeocodeQuery.prototype.withCountryCodes = function (countryCodes) {
        return new OpenCageGeocodeQuery(__assign(__assign({}, this.toObject()), { countryCodes: countryCodes }));
    };
    OpenCageGeocodeQuery.prototype.getCountryCodes = function () {
        return this.countryCodes;
    };
    OpenCageGeocodeQuery.prototype.withProximity = function (proximity) {
        return new OpenCageGeocodeQuery(__assign(__assign({}, this.toObject()), { proximity: proximity }));
    };
    OpenCageGeocodeQuery.prototype.getProximity = function () {
        return this.proximity;
    };
    OpenCageGeocodeQuery.prototype.withMinConfidence = function (minConfidence) {
        return new OpenCageGeocodeQuery(__assign(__assign({}, this.toObject()), { minConfidence: minConfidence }));
    };
    OpenCageGeocodeQuery.prototype.getMinConfidence = function () {
        return this.minConfidence;
    };
    OpenCageGeocodeQuery.prototype.withNoRecord = function (noRecord) {
        return new OpenCageGeocodeQuery(__assign(__assign({}, this.toObject()), { noRecord: noRecord }));
    };
    OpenCageGeocodeQuery.prototype.getNoRecord = function () {
        return this.noRecord;
    };
    return OpenCageGeocodeQuery;
}(query_1.GeocodeQuery));
exports.default = OpenCageGeocodeQuery;


/***/ }),

/***/ "./src/provider/opencage/OpenCageGeocoded.ts":
/*!***************************************************!*\
  !*** ./src/provider/opencage/OpenCageGeocoded.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Geocoded_1 = __importDefault(__webpack_require__(/*! ../../Geocoded */ "./src/Geocoded.ts"));
var OpenCageGeocoded = /** @class */ (function (_super) {
    __extends(OpenCageGeocoded, _super);
    function OpenCageGeocoded(_a) {
        var callingCode = _a.callingCode, flag = _a.flag, mgrs = _a.mgrs, maidenhead = _a.maidenhead, geohash = _a.geohash, what3words = _a.what3words, geocodedObject = __rest(_a, ["callingCode", "flag", "mgrs", "maidenhead", "geohash", "what3words"]);
        var _this = _super.call(this, geocodedObject) || this;
        _this.callingCode = callingCode;
        _this.flag = flag;
        _this.mgrs = mgrs;
        _this.maidenhead = maidenhead;
        _this.geohash = geohash;
        _this.what3words = what3words;
        return _this;
    }
    OpenCageGeocoded.create = function (object) {
        return new this(object);
    };
    OpenCageGeocoded.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { callingCode: this.callingCode, flag: this.flag, mgrs: this.mgrs, maidenhead: this.maidenhead, geohash: this.geohash, what3words: this.what3words });
    };
    OpenCageGeocoded.prototype.withCallingCode = function (callingCode) {
        return new OpenCageGeocoded(__assign(__assign({}, this.toObject()), { callingCode: callingCode }));
    };
    OpenCageGeocoded.prototype.getCallingCode = function () {
        return this.callingCode;
    };
    OpenCageGeocoded.prototype.withFlag = function (flag) {
        return new OpenCageGeocoded(__assign(__assign({}, this.toObject()), { flag: flag }));
    };
    OpenCageGeocoded.prototype.getFlag = function () {
        return this.flag;
    };
    OpenCageGeocoded.prototype.withMgrs = function (mgrs) {
        return new OpenCageGeocoded(__assign(__assign({}, this.toObject()), { mgrs: mgrs }));
    };
    OpenCageGeocoded.prototype.getMgrs = function () {
        return this.mgrs;
    };
    OpenCageGeocoded.prototype.withMaidenhead = function (maidenhead) {
        return new OpenCageGeocoded(__assign(__assign({}, this.toObject()), { maidenhead: maidenhead }));
    };
    OpenCageGeocoded.prototype.getMaidenhead = function () {
        return this.maidenhead;
    };
    OpenCageGeocoded.prototype.withGeohash = function (geohash) {
        return new OpenCageGeocoded(__assign(__assign({}, this.toObject()), { geohash: geohash }));
    };
    OpenCageGeocoded.prototype.getGeohash = function () {
        return this.geohash;
    };
    OpenCageGeocoded.prototype.withWhat3words = function (what3words) {
        return new OpenCageGeocoded(__assign(__assign({}, this.toObject()), { what3words: what3words }));
    };
    OpenCageGeocoded.prototype.getWhat3words = function () {
        return this.what3words;
    };
    return OpenCageGeocoded;
}(Geocoded_1.default));
exports.default = OpenCageGeocoded;


/***/ }),

/***/ "./src/provider/opencage/OpenCageProvider.ts":
/*!***************************************************!*\
  !*** ./src/provider/opencage/OpenCageProvider.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOpenCageProviderOptions = void 0;
var provider_1 = __webpack_require__(/*! ./.. */ "./src/provider/index.ts");
var AdminLevel_1 = __importDefault(__webpack_require__(/*! ../../AdminLevel */ "./src/AdminLevel.ts"));
var error_1 = __webpack_require__(/*! ../../error */ "./src/error/index.ts");
exports.defaultOpenCageProviderOptions = __assign(__assign({}, provider_1.defaultProviderOptions), { apiKey: "" });
var OpenCageProvider = /** @class */ (function () {
    function OpenCageProvider(_externalLoader, options) {
        if (options === void 0) { options = exports.defaultOpenCageProviderOptions; }
        this.externalLoader = _externalLoader;
        this.options = __assign(__assign({}, exports.defaultOpenCageProviderOptions), options);
        if (!this.options.apiKey) {
            throw new Error('An API key is required for the OpenCage provider. Please add it in the "apiKey" option.');
        }
    }
    OpenCageProvider.prototype.geocode = function (query, callback, errorCallback) {
        var _a, _b, _c, _d, _e, _f;
        var geocodeQuery = provider_1.ProviderHelpers.getGeocodeQueryFromParameter(query, provider_1.OpenCageGeocodeQuery);
        if (geocodeQuery.getIp()) {
            throw new Error("The OpenCage provider does not support IP geolocation, only location geocoding.");
        }
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "api.opencagedata.com",
            pathname: "geocode/v1/json",
        });
        var params = this.withCommonParams({
            q: geocodeQuery.getText() || "",
            bounds: geocodeQuery.getBounds()
                ? ((_a = geocodeQuery.getBounds()) === null || _a === void 0 ? void 0 : _a.west) + "," + ((_b = geocodeQuery.getBounds()) === null || _b === void 0 ? void 0 : _b.south) + "," + ((_c = geocodeQuery.getBounds()) === null || _c === void 0 ? void 0 : _c.east) + "," + ((_d = geocodeQuery.getBounds()) === null || _d === void 0 ? void 0 : _d.north)
                : undefined,
            proximity: geocodeQuery.getProximity()
                ? ((_e = geocodeQuery.getProximity()) === null || _e === void 0 ? void 0 : _e.latitude) + "," + ((_f = geocodeQuery.getProximity()) === null || _f === void 0 ? void 0 : _f.longitude)
                : undefined,
        }, geocodeQuery);
        this.executeRequest(params, callback, {}, {}, errorCallback);
    };
    OpenCageProvider.prototype.geodecode = function (latitudeOrQuery, longitudeOrCallback, callbackOrErrorCallback, errorCallback) {
        var reverseQuery = provider_1.ProviderHelpers.getReverseQueryFromParameters(latitudeOrQuery, longitudeOrCallback, provider_1.OpenCageReverseQuery);
        var reverseCallback = provider_1.ProviderHelpers.getCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback);
        var reverseErrorCallback = provider_1.ProviderHelpers.getErrorCallbackFromParameters(longitudeOrCallback, callbackOrErrorCallback, errorCallback);
        this.externalLoader.setOptions({
            protocol: this.options.useSsl ? "https" : "http",
            host: "api.opencagedata.com",
            pathname: "geocode/v1/json",
        });
        var params = this.withCommonParams({
            q: reverseQuery.getCoordinates().latitude + "," + reverseQuery.getCoordinates().longitude,
        }, reverseQuery);
        this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
    };
    OpenCageProvider.prototype.withCommonParams = function (params, query) {
        var _a, _b, _c, _d;
        return __assign(__assign({}, params), { key: this.options.apiKey || "", countrycode: query.getCountryCodes()
                ? (_a = query.getCountryCodes()) === null || _a === void 0 ? void 0 : _a.join(",") : (_b = this.options.countryCodes) === null || _b === void 0 ? void 0 : _b.join(","), language: query.getLocale(), limit: query.getLimit().toString(), min_confidence: (_c = query.getMinConfidence()) === null || _c === void 0 ? void 0 : _c.toString(), no_record: (_d = query.getNoRecord()) === null || _d === void 0 ? void 0 : _d.toString(), jsonpCallback: this.options.useJsonp ? "jsonp" : undefined });
    };
    OpenCageProvider.prototype.executeRequest = function (params, callback, headers, body, errorCallback) {
        this.externalLoader.executeRequest(params, function (data) {
            callback(data.results.map(function (result) {
                return OpenCageProvider.mapToGeocoded(result);
            }));
        }, headers, body, function (error) {
            var response = error.getResponse();
            response.json().then(function (data) {
                if (data.status) {
                    var errorMessage_1;
                    switch (data.status.code) {
                        case 400:
                            errorMessage_1 = "Invalid request (400): " + data.status.message;
                            break;
                        case 401:
                            errorMessage_1 = "Unable to authenticate (401): " + data.status.message;
                            break;
                        case 402:
                            errorMessage_1 = "Quota exceeded (402): " + data.status.message;
                            break;
                        case 403:
                            errorMessage_1 = "Forbidden (403): " + data.status.message;
                            break;
                        case 404:
                            errorMessage_1 = "Invalid API endpoint (404): " + data.status.message;
                            break;
                        case 405:
                            errorMessage_1 = "Method not allowed (405): " + data.status.message;
                            break;
                        case 408:
                            errorMessage_1 = "Timeout (408): " + data.status.message;
                            break;
                        case 410:
                            errorMessage_1 = "Request too long (410): " + data.status.message;
                            break;
                        case 429:
                            errorMessage_1 = "Too many requests (429): " + data.status.message;
                            break;
                        case 503:
                            errorMessage_1 = "Internal server error (503): " + data.status.message;
                            break;
                        default:
                            errorMessage_1 = "Error (" + data.status.code + "): " + data.status.message;
                    }
                    if (errorCallback) {
                        errorCallback(new error_1.ResponseError(errorMessage_1, data));
                        return;
                    }
                    setTimeout(function () {
                        throw new Error(errorMessage_1);
                    });
                }
            });
        });
    };
    OpenCageProvider.mapToGeocoded = function (result) {
        var _a;
        var latitude = result.geometry.lat;
        var longitude = result.geometry.lng;
        var formattedAddress = result.formatted;
        var streetNumber = result.components.house_number;
        var postalCode = result.components.postcode;
        var region = result.components.state;
        var country = result.components.country;
        var countryCode = result.components.country_code;
        var timezone = result.annotations.timezone.name;
        var callingCode = result.annotations.callingcode;
        var flag = result.annotations.flag;
        var mgrs = result.annotations.MGRS;
        var maidenhead = result.annotations.Maidenhead;
        var geohash = result.annotations.geohash;
        var what3words = (_a = result.annotations.what3words) === null || _a === void 0 ? void 0 : _a.words;
        var streetName = result.components.road ||
            result.components.footway ||
            result.components.street ||
            result.components.street_name ||
            result.components.residential ||
            result.components.path ||
            result.components.pedestrian ||
            result.components.road_reference ||
            result.components.road_reference_intl;
        var subLocality = result.components.neighbourhood ||
            result.components.suburb ||
            result.components.city_district ||
            result.components.district ||
            result.components.quarter ||
            result.components.houses ||
            result.components.subdivision;
        var locality = result.components.city ||
            result.components.town ||
            result.components.municipality ||
            result.components.village ||
            result.components.hamlet ||
            result.components.locality ||
            result.components.croft;
        var geocoded = provider_1.OpenCageGeocoded.create({
            latitude: latitude,
            longitude: longitude,
            formattedAddress: formattedAddress,
            streetNumber: streetNumber,
            streetName: streetName,
            subLocality: subLocality,
            locality: locality,
            postalCode: postalCode,
            region: region,
            country: country,
            countryCode: countryCode,
            timezone: timezone,
            callingCode: callingCode,
            flag: flag,
            mgrs: mgrs,
            maidenhead: maidenhead,
            geohash: geohash,
            what3words: what3words,
        });
        if (result.bounds) {
            geocoded = (geocoded.withBounds(result.bounds.southwest.lat, result.bounds.southwest.lng, result.bounds.northeast.lat, result.bounds.northeast.lng));
        }
        var adminLevels = [
            { nameKey: "state", codeKey: "state_code" },
            { nameKey: "county", codeKey: "county_code" },
        ];
        adminLevels.forEach(function (_a, level) {
            var nameKey = _a.nameKey, codeKey = _a.codeKey;
            if (result.components[nameKey]) {
                geocoded.addAdminLevel(AdminLevel_1.default.create({
                    level: level + 1,
                    name: result.components[nameKey] || "",
                    code: result.components[codeKey] || undefined,
                }));
            }
        });
        return geocoded;
    };
    return OpenCageProvider;
}());
exports.default = OpenCageProvider;


/***/ }),

/***/ "./src/provider/opencage/OpenCageReverseQuery.ts":
/*!*******************************************************!*\
  !*** ./src/provider/opencage/OpenCageReverseQuery.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __webpack_require__(/*! ../../query */ "./src/query/index.ts");
var OpenCageReverseQuery = /** @class */ (function (_super) {
    __extends(OpenCageReverseQuery, _super);
    function OpenCageReverseQuery(_a) {
        var countryCodes = _a.countryCodes, minConfidence = _a.minConfidence, noRecord = _a.noRecord, reverseQueryObject = __rest(_a, ["countryCodes", "minConfidence", "noRecord"]);
        var _this = _super.call(this, reverseQueryObject) || this;
        _this.countryCodes = countryCodes;
        if (minConfidence &&
            (minConfidence.toString() !==
                parseInt(minConfidence.toString(), 10).toString() ||
                minConfidence < 1 ||
                minConfidence > 10)) {
            throw new Error('The "minConfidence" parameter must be an integer from 1 to 10.');
        }
        _this.minConfidence = minConfidence;
        _this.noRecord = noRecord;
        return _this;
    }
    OpenCageReverseQuery.create = function (object) {
        return new this(object);
    };
    OpenCageReverseQuery.prototype.toObject = function () {
        return __assign(__assign({}, _super.prototype.toObject.call(this)), { countryCodes: this.countryCodes, minConfidence: this.minConfidence, noRecord: this.noRecord });
    };
    OpenCageReverseQuery.prototype.withCountryCodes = function (countryCodes) {
        return new OpenCageReverseQuery(__assign(__assign({}, this.toObject()), { countryCodes: countryCodes }));
    };
    OpenCageReverseQuery.prototype.getCountryCodes = function () {
        return this.countryCodes;
    };
    OpenCageReverseQuery.prototype.withMinConfidence = function (minConfidence) {
        return new OpenCageReverseQuery(__assign(__assign({}, this.toObject()), { minConfidence: minConfidence }));
    };
    OpenCageReverseQuery.prototype.getMinConfidence = function () {
        return this.minConfidence;
    };
    OpenCageReverseQuery.prototype.withNoRecord = function (noRecord) {
        return new OpenCageReverseQuery(__assign(__assign({}, this.toObject()), { noRecord: noRecord }));
    };
    OpenCageReverseQuery.prototype.getNoRecord = function () {
        return this.noRecord;
    };
    return OpenCageReverseQuery;
}(query_1.ReverseQuery));
exports.default = OpenCageReverseQuery;


/***/ }),

/***/ "./src/provider/opencage/index.ts":
/*!****************************************!*\
  !*** ./src/provider/opencage/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var OpenCageGeocoded_1 = __webpack_require__(/*! ./OpenCageGeocoded */ "./src/provider/opencage/OpenCageGeocoded.ts");
Object.defineProperty(exports, "OpenCageGeocoded", { enumerable: true, get: function () { return OpenCageGeocoded_1.default; } });
var OpenCageGeocodeQuery_1 = __webpack_require__(/*! ./OpenCageGeocodeQuery */ "./src/provider/opencage/OpenCageGeocodeQuery.ts");
Object.defineProperty(exports, "OpenCageGeocodeQuery", { enumerable: true, get: function () { return OpenCageGeocodeQuery_1.default; } });
__exportStar(__webpack_require__(/*! ./OpenCageGeocodeQuery */ "./src/provider/opencage/OpenCageGeocodeQuery.ts"), exports);
var OpenCageProvider_1 = __webpack_require__(/*! ./OpenCageProvider */ "./src/provider/opencage/OpenCageProvider.ts");
Object.defineProperty(exports, "OpenCageProvider", { enumerable: true, get: function () { return OpenCageProvider_1.default; } });
__exportStar(__webpack_require__(/*! ./OpenCageProvider */ "./src/provider/opencage/OpenCageProvider.ts"), exports);
var OpenCageReverseQuery_1 = __webpack_require__(/*! ./OpenCageReverseQuery */ "./src/provider/opencage/OpenCageReverseQuery.ts");
Object.defineProperty(exports, "OpenCageReverseQuery", { enumerable: true, get: function () { return OpenCageReverseQuery_1.default; } });
__exportStar(__webpack_require__(/*! ./OpenCageReverseQuery */ "./src/provider/opencage/OpenCageReverseQuery.ts"), exports);


/***/ }),

/***/ "./src/query/GeocodeQuery.ts":
/*!***********************************!*\
  !*** ./src/query/GeocodeQuery.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = __webpack_require__(/*! ../provider */ "./src/provider/index.ts");
var GeocodeQuery = /** @class */ (function () {
    function GeocodeQuery(_a) {
        var text = _a.text, ip = _a.ip, south = _a.south, west = _a.west, north = _a.north, east = _a.east, locale = _a.locale, _b = _a.limit, limit = _b === void 0 ? provider_1.DEFAULT_RESULT_LIMIT : _b;
        this.limit = provider_1.DEFAULT_RESULT_LIMIT;
        this.text = text;
        this.ip = ip;
        if (!text && !ip) {
            throw new Error('Either "text" or "ip" parameter is required.');
        }
        this.south = south;
        this.west = west;
        this.north = north;
        this.east = east;
        this.locale = locale;
        this.limit = limit;
    }
    GeocodeQuery.create = function (object) {
        return new this(object);
    };
    GeocodeQuery.prototype.toObject = function () {
        return {
            text: this.text,
            ip: this.ip,
            south: this.south,
            west: this.west,
            north: this.north,
            east: this.east,
            locale: this.locale,
            limit: this.limit,
        };
    };
    GeocodeQuery.prototype.withText = function (text) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { text: text }));
    };
    GeocodeQuery.prototype.withIp = function (ip) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { ip: ip }));
    };
    GeocodeQuery.prototype.withBounds = function (south, west, north, east) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { south: south,
            west: west,
            north: north,
            east: east }));
    };
    GeocodeQuery.prototype.withLocale = function (locale) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { locale: locale }));
    };
    GeocodeQuery.prototype.withLimit = function (limit) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { limit: limit }));
    };
    GeocodeQuery.prototype.getText = function () {
        return this.text;
    };
    GeocodeQuery.prototype.getIp = function () {
        return this.ip;
    };
    GeocodeQuery.prototype.getBounds = function () {
        if (!this.south || !this.west || !this.north || !this.east) {
            return undefined;
        }
        return {
            south: this.south,
            west: this.west,
            north: this.north,
            east: this.east,
        };
    };
    GeocodeQuery.prototype.getLocale = function () {
        return this.locale;
    };
    GeocodeQuery.prototype.getLimit = function () {
        return this.limit;
    };
    return GeocodeQuery;
}());
exports.default = GeocodeQuery;


/***/ }),

/***/ "./src/query/ReverseQuery.ts":
/*!***********************************!*\
  !*** ./src/query/ReverseQuery.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = __webpack_require__(/*! ../provider */ "./src/provider/index.ts");
var ReverseQuery = /** @class */ (function () {
    function ReverseQuery(_a) {
        var latitude = _a.latitude, longitude = _a.longitude, locale = _a.locale, _b = _a.limit, limit = _b === void 0 ? provider_1.DEFAULT_RESULT_LIMIT : _b;
        this.limit = provider_1.DEFAULT_RESULT_LIMIT;
        this.latitude = latitude;
        this.longitude = longitude;
        this.locale = locale;
        this.limit = limit;
    }
    ReverseQuery.create = function (object) {
        return new this(object);
    };
    ReverseQuery.prototype.toObject = function () {
        return {
            latitude: this.latitude,
            longitude: this.longitude,
            locale: this.locale,
            limit: this.limit,
        };
    };
    ReverseQuery.prototype.withCoordinates = function (latitude, longitude) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { latitude: latitude,
            longitude: longitude }));
    };
    ReverseQuery.prototype.withLocale = function (locale) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { locale: locale }));
    };
    ReverseQuery.prototype.withLimit = function (limit) {
        return this.constructor.create(__assign(__assign({}, this.toObject()), { limit: limit }));
    };
    ReverseQuery.prototype.getCoordinates = function () {
        return { latitude: this.latitude, longitude: this.longitude };
    };
    ReverseQuery.prototype.getLocale = function () {
        return this.locale;
    };
    ReverseQuery.prototype.getLimit = function () {
        return this.limit;
    };
    return ReverseQuery;
}());
exports.default = ReverseQuery;


/***/ }),

/***/ "./src/query/index.ts":
/*!****************************!*\
  !*** ./src/query/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var GeocodeQuery_1 = __webpack_require__(/*! ./GeocodeQuery */ "./src/query/GeocodeQuery.ts");
Object.defineProperty(exports, "GeocodeQuery", { enumerable: true, get: function () { return GeocodeQuery_1.default; } });
__exportStar(__webpack_require__(/*! ./GeocodeQuery */ "./src/query/GeocodeQuery.ts"), exports);
var ReverseQuery_1 = __webpack_require__(/*! ./ReverseQuery */ "./src/query/ReverseQuery.ts");
Object.defineProperty(exports, "ReverseQuery", { enumerable: true, get: function () { return ReverseQuery_1.default; } });
__exportStar(__webpack_require__(/*! ./ReverseQuery */ "./src/query/ReverseQuery.ts"), exports);


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequireFunc = exports.isIpv6 = exports.isIpv4 = exports.decodeBase64 = exports.encodeUrlSafeBase64 = exports.decodeUrlSafeBase64 = exports.filterUndefinedObjectValues = exports.isBrowser = void 0;
exports.isBrowser = function () { return typeof window !== "undefined"; };
exports.filterUndefinedObjectValues = function (object) {
    return Object.keys(object).reduce(function (acc, key) {
        var filtered = acc;
        var value = object[key];
        if (value !== undefined) {
            filtered[key] = value;
        }
        return filtered;
    }, {});
};
/**
 * Decode from URL-safe base64 to true base64.
 */
exports.decodeUrlSafeBase64 = function (safe) {
    return safe.replace(/-/g, "+").replace(/_/g, "/");
};
/**
 * Encode from true base64 to URL-safe base64.
 */
exports.encodeUrlSafeBase64 = function (base64) {
    return base64.replace(/\+/g, "-").replace(/\//g, "_");
};
exports.decodeBase64 = function (base64) {
    if (exports.isBrowser()) {
        throw new Error("decodeBase64 can only be used in a Node environment.");
    }
    return Buffer.from(base64, "base64").toString();
};
// From https://github.com/sindresorhus/ip-regex
var ipv4RegExp = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
exports.isIpv4 = function (ip) {
    return new RegExp("^" + ipv4RegExp + "$").test(ip);
};
// From https://github.com/sindresorhus/ip-regex
var ipv6Seg = "[a-fA-F\\d]{1,4}";
var ipv6RegExp = "((?:" + ipv6Seg + ":){7}(?:" + ipv6Seg + "|:)|(?:" + ipv6Seg + ":){6}(?:" + ipv4RegExp + "|:" + ipv6Seg + "|:)|(?:" + ipv6Seg + ":){5}(?::" + ipv4RegExp + "|(:" + ipv6Seg + "){1,2}|:)|(?:" + ipv6Seg + ":){4}(?:(:" + ipv6Seg + "){0,1}:" + ipv4RegExp + "|(:" + ipv6Seg + "){1,3}|:)|(?:" + ipv6Seg + ":){3}(?:(:" + ipv6Seg + "){0,2}:" + ipv4RegExp + "|(:" + ipv6Seg + "){1,4}|:)|(?:" + ipv6Seg + ":){2}(?:(:" + ipv6Seg + "){0,3}:" + ipv4RegExp + "|(:" + ipv6Seg + "){1,5}|:)|(?:" + ipv6Seg + ":){1}(?:(:" + ipv6Seg + "){0,4}:" + ipv4RegExp + "|(:" + ipv6Seg + "){1,6}|:)|(?::((?::" + ipv6Seg + "){0,5}:" + ipv4RegExp + "|(?::" + ipv6Seg + "){1,7}|:)))(%[0-9a-zA-Z]{1,})?";
exports.isIpv6 = function (ip) {
    return new RegExp("^" + ipv6RegExp + "$").test(ip);
};
// eslint-disable-next-line @typescript-eslint/ban-types
exports.getRequireFunc = function () {
    // eslint-disable-next-line camelcase
    return typeof require === "function"
        ? // eslint-disable-next-line camelcase
            require
        : __webpack_require__("./src sync recursive");
};


/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi ./src/index.ts ./src/global.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/index.ts */"./src/index.ts");
module.exports = __webpack_require__(/*! ./src/global.ts */"./src/global.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nyb3NzLWZldGNoL2Rpc3QvYnJvd3Nlci1wb255ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMgc3luYyIsIndlYnBhY2s6Ly8vLi9zcmMvQWRtaW5MZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRXh0ZXJuYWxMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dlb0pzb25EdW1wZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dlb2NvZGVkLnRzIiwid2VicGFjazovLy8uL3NyYy9HZW9jb2RlclByb3ZpZGVyRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVW5pdmVyc2FsR2VvY29kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL1Jlc3BvbnNlRXJyb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlci9CaW5nUHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL0NoYWluUHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL01hcHF1ZXN0UHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL1Byb3ZpZGVySGVscGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXIvUHJvdmlkZXJJbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL1lhbmRleFByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlci9nZW9wbHVnaW4vR2VvUGx1Z2luR2VvY29kZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL2dlb3BsdWdpbi9HZW9QbHVnaW5Qcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXIvZ2VvcGx1Z2luL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlci9nb29nbGVtYXBzL0dvb2dsZU1hcHNHZW9jb2RlUXVlcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL2dvb2dsZW1hcHMvR29vZ2xlTWFwc0dlb2NvZGVkLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlci9nb29nbGVtYXBzL0dvb2dsZU1hcHNQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXIvZ29vZ2xlbWFwcy9Hb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlci9nb29nbGVtYXBzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXIvbWFwYm94L01hcGJveEdlb2NvZGVRdWVyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXIvbWFwYm94L01hcGJveEdlb2NvZGVkLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlci9tYXBib3gvTWFwYm94UHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL21hcGJveC9NYXBib3hSZXZlcnNlUXVlcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL21hcGJveC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXIvbm9taW5hdGltL05vbWluYXRpbUdlb2NvZGVRdWVyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXIvbm9taW5hdGltL05vbWluYXRpbUdlb2NvZGVkLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlci9ub21pbmF0aW0vTm9taW5hdGltUHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL25vbWluYXRpbS9Ob21pbmF0aW1SZXZlcnNlUXVlcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL25vbWluYXRpbS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXIvb3BlbmNhZ2UvT3BlbkNhZ2VHZW9jb2RlUXVlcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL29wZW5jYWdlL09wZW5DYWdlR2VvY29kZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL29wZW5jYWdlL09wZW5DYWdlUHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVyL29wZW5jYWdlL09wZW5DYWdlUmV2ZXJzZVF1ZXJ5LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlci9vcGVuY2FnZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlcnkvR2VvY29kZVF1ZXJ5LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVyeS9SZXZlcnNlUXVlcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXJ5L2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZELFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLHFCQUFxQjtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLHVDQUF1QywwQkFBMEI7QUFDakU7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQiwwQkFBMEIsZUFBZTtBQUN4RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxHQUFHO0FBQ0osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxNQUFNO0FBQzNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRDtBQUNBO0FBQ0EsZ0Q7Ozs7Ozs7Ozs7Ozs7O0FDRkE7SUFPRSxvQkFBb0IsRUFBdUM7WUFBckMsS0FBSyxhQUFFLElBQUksWUFBRSxJQUFJO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFYSxpQkFBTSxHQUFwQixVQUFxQixNQUF3QjtRQUMzQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSw2QkFBUSxHQUFmO1FBQ0UsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDaEIsQ0FBQztJQUNKLENBQUM7SUFFTSw2QkFBUSxHQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFTSw0QkFBTyxHQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFTSw0QkFBTyxHQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNELG1JQUFnQztBQUVoQyx5RUFBc0M7QUFDdEMsbUVBQStEO0FBc0MvRCxJQUFNLGNBQWMsR0FBMEI7SUFDNUMsUUFBUSxFQUFFLE1BQU07SUFDaEIsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFDO0FBRUY7O0dBRUc7QUFDSDtJQUdFLHdCQUNFLE9BQXNFO1FBQXRFLGtEQUFzRTtRQUhoRSxZQUFPLEdBQTBCLGNBQWMsQ0FBQztRQUt0RCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTSxtQ0FBVSxHQUFqQixVQUNFLE9BQXFEO1FBRXJELElBQUksQ0FBQyxPQUFPLHlCQUFRLGNBQWMsR0FBSyxPQUFPLENBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU0sbUNBQVUsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLHVDQUFjLEdBQXJCLFVBQ0UsTUFBNEIsRUFDNUIsUUFBMEIsRUFDMUIscUJBQTZDLEVBQzdDLElBQXlCLEVBQ3pCLGFBQTZCO1FBRXZCLFNBQXVDLElBQUksQ0FBQyxPQUFPLEVBQWpELFFBQVEsZ0JBQUUsSUFBSSxZQUFFLFFBQVEsZ0JBQUUsTUFBTSxZQUFpQixDQUFDO1FBRTFELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDaEU7UUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsSUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUksUUFBUSxXQUFNLElBQUksU0FBSSxRQUFVLENBQUMsQ0FBQztRQUV4RCxpQkFBYSxHQUF1QixNQUFNLGNBQTdCLEVBQUssYUFBYSxVQUFLLE1BQU0sRUFBNUMsaUJBQW1DLENBQUYsQ0FBWTtRQUVuRCxJQUFNLHFCQUFxQixHQUFHLG1DQUEyQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFROztZQUNsRCxpQkFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQzVCLFFBQVEsUUFDUixxQkFBcUIsQ0FBQyxRQUFRLENBQUMsbUNBQUksRUFBRSxDQUN0QztTQUFBLENBQ0YsQ0FBQztRQUVGLElBQUksYUFBYSxFQUFFO1lBQ2pCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3JFLE9BQU87U0FDUjtRQUVELElBQU0sT0FBTyxHQUFHLG1DQUEyQixDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLHFCQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzNCLE9BQU87WUFDUCxNQUFNO1lBQ04sSUFBSSxFQUFFLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDM0QsQ0FBQzthQUNDLElBQUksQ0FBQyxVQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxJQUFJLHFCQUFhLENBQ3JCLCtCQUE2QixRQUFRLENBQUMsTUFBTSx3Q0FBcUMsRUFDakYsUUFBUSxDQUNULENBQUM7YUFDSDtZQUNELE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFDLElBQUksSUFBSyxlQUFRLENBQUMsSUFBSSxDQUFDLEVBQWQsQ0FBYyxDQUFDO2FBQzlCLEtBQUssQ0FBQyxVQUFDLEtBQUs7WUFDWCxJQUFJLGFBQWEsSUFBSSxLQUFLLFlBQVkscUJBQWEsRUFBRTtnQkFDbkQsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixPQUFPO2FBQ1I7WUFDRCxVQUFVLENBQUM7Z0JBQ1QsTUFBTSxLQUFLLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVjLCtCQUFnQixHQUEvQixVQUNFLFVBQWUsRUFDZixRQUEwQixFQUMxQixhQUFxQjtRQUVyQixJQUFJLENBQUMsaUJBQVMsRUFBRSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0VBQXNFLENBQ3ZFLENBQUM7U0FDSDtRQUVELFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUM1QixhQUFhLEVBQ2IsY0FBYyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUMvQyxDQUFDO1FBRUYsK0JBQStCO1FBQy9CLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkQsbUNBQW1DO1FBQ25DLGFBQWEsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTFDLCtDQUErQztRQUMvQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7O09BR0c7SUFDWSxvQ0FBcUIsR0FBcEMsVUFBcUMsUUFBMEI7UUFDN0Qsb0ZBQW9GO1FBQ3BGLDJCQUEyQjtRQUMzQixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBTSxpQkFBaUIsR0FBRyxVQUFRLElBQUksQ0FBQyxLQUFLLENBQzFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUNsQyxDQUFDO1FBRUoseURBQXlEO1FBQ3pELG9GQUFvRjtRQUNwRix5RkFBeUY7UUFDekYsOERBQThEO1FBQ3hELE1BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFVBQUMsSUFBWTtZQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZiw4REFBOEQ7WUFDOUQsT0FBYSxNQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUM7UUFFRixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpEO0lBQUE7SUE2REEsQ0FBQztJQW5EZSxrQkFBSSxHQUFsQixVQUFtQixRQUFrQjtRQUNuQyxJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLE1BQU0seUJBQ0QsTUFBTSxHQUNOO1lBQ0QsUUFBUSx3QkFDSCxNQUFNLENBQUMsUUFBUSxLQUNsQixXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQy9EO1NBQ0YsQ0FDRixDQUFDO1FBQ0YsSUFBTSxLQVNGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFSckIsUUFBUSxnQkFDUixTQUFTLGlCQUNULEtBQUssYUFDTCxJQUFJLFlBQ0osS0FBSyxhQUNMLElBQUksWUFDSixXQUFXLG1CQUNSLGtCQUFrQixjQVJqQiwwRUFTTCxDQUFzQixDQUFDO1FBRXhCLElBQUksVUFBVSxnQkFTTCxrQkFBa0IsQ0FBRSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUM3QixVQUFDLFFBQVE7WUFDUCxpQkFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFBakUsQ0FBaUUsQ0FDcEUsQ0FBQztRQUVGLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLFVBQVUseUJBQ0wsVUFBVSxLQUNiLFdBQVcsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBVSxJQUFLLGlCQUFVLENBQUMsUUFBUSxFQUFFLEVBQXJCLENBQXFCLENBQUMsR0FDcEUsQ0FBQztTQUNIO1FBRUQsTUFBTSx5QkFBUSxNQUFNLEtBQUUsVUFBVSxlQUFFLENBQUM7UUFDbkMsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDbEMsTUFBTSx5QkFBUSxNQUFNLEtBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxTQUFFLElBQUksUUFBRSxLQUFLLFNBQUUsSUFBSSxRQUFFLEdBQUUsQ0FBQztTQUM5RDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUEzRGMseUJBQVcsR0FBWTtRQUNwQyxJQUFJLEVBQUUsU0FBUztRQUNmLFVBQVUsRUFBRSxFQUFFO1FBQ2QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE9BQU87WUFDYixXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1NBQ3BDO0tBQ0YsQ0FBQztJQXFESixvQkFBQztDQUFBO2tCQTdEb0IsYUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNFbEM7SUFtQ0Usa0JBQXNCLEVBa0JMO1lBakJmLFFBQVEsZ0JBQ1IsU0FBUyxpQkFDVCxLQUFLLGFBQ0wsSUFBSSxZQUNKLEtBQUssYUFDTCxJQUFJLFlBQ0osZ0JBQWdCLHdCQUNoQixZQUFZLG9CQUNaLFVBQVUsa0JBQ1YsV0FBVyxtQkFDWCxRQUFRLGdCQUNSLFVBQVUsa0JBQ1YsTUFBTSxjQUNOLFdBQVcsbUJBQ1gsT0FBTyxlQUNQLFdBQVcsbUJBQ1gsUUFBUTtRQUVSLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVhLGVBQU0sR0FBcEIsVUFBcUIsTUFBc0I7UUFDekMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sMkJBQVEsR0FBZjtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQztJQUNKLENBQUM7SUFFTSw2QkFBVSxHQUFqQixVQUNFLEtBQWMsRUFDZCxJQUFhLEVBQ2IsS0FBYyxFQUNkLElBQWE7UUFFYixPQUF5QixJQUFJLENBQUMsV0FBWSxDQUFDLE1BQU0sdUJBQzVDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsS0FBSztZQUNMLElBQUk7WUFDSixLQUFLO1lBQ0wsSUFBSSxVQUNKLENBQUM7SUFDTCxDQUFDO0lBRU0sa0NBQWUsR0FBdEIsVUFBdUIsUUFBaUIsRUFBRSxTQUFrQjtRQUMxRCxPQUF5QixJQUFJLENBQUMsV0FBWSxDQUFDLE1BQU0sdUJBQzVDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsUUFBUTtZQUNSLFNBQVMsZUFDVCxDQUFDO0lBQ0wsQ0FBQztJQUVNLGlDQUFjLEdBQXJCO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSw4QkFBVyxHQUFsQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sK0JBQVksR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVNLDRCQUFTLEdBQWhCO1FBTUUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0sc0NBQW1CLEdBQTFCO1FBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVNLGtDQUFlLEdBQXRCO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxnQ0FBYSxHQUFwQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRU0saUNBQWMsR0FBckI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVNLDhCQUFXLEdBQWxCO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxnQ0FBYSxHQUFwQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRU0sNEJBQVMsR0FBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVNLGdDQUFhLEdBQXBCLFVBQXFCLFVBQXNCO1FBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxpQ0FBYyxHQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sNkJBQVUsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLGlDQUFjLEdBQXJCO1FBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFTSw4QkFBVyxHQUFsQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBQ0gsZUFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM05ELGtGQXNCa0I7QUFDbEIsK0dBQTRDO0FBcUc1QztJQUFBO0lBNEVBLENBQUM7SUEzRUM7Ozs7Ozs7OztPQVNHO0lBQ1csOEJBQWMsR0FBNUIsVUFDRSxPQUFtQjtRQUVuQixJQUFNLHFCQUFxQix5QkFDdEIsaUNBQXNCLEdBQ3RCLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQ25FLENBQUM7UUFFRixJQUFNLGNBQWMsR0FBRyxJQUFJLHdCQUFjLEVBQUUsQ0FBQztRQUVwQyxZQUFRLEdBQXlCLHFCQUFxQixTQUE5QyxFQUFLLGVBQWUsVUFBSyxxQkFBcUIsRUFBeEQsWUFBZ0MsQ0FBRixDQUEyQjtRQUMvRCxRQUFRLFFBQVEsRUFBRTtZQUNoQixLQUFLLE1BQU07Z0JBQ1QsT0FBeUMsQ0FDdkMsSUFBSSx1QkFBWSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FDbEQsQ0FBQztZQUNKLEtBQUssT0FBTztnQkFDVixPQUF5QyxJQUFJLHdCQUFhLHVCQUNyRCxzQ0FBMkIsR0FDM0IsZUFBZSxFQUNsQixDQUFDO1lBQ0wsS0FBSyxXQUFXO2dCQUNkLE9BQXlDLENBQ3ZDLElBQUksNEJBQWlCLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUN2RCxDQUFDO1lBQ0osS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFlBQVk7Z0JBQ2YsT0FBeUMsQ0FDdkMsSUFBSSw2QkFBa0IsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQ3hELENBQUM7WUFDSixLQUFLLFFBQVE7Z0JBQ1gsT0FBeUMsQ0FDdkMsSUFBSSx5QkFBYyxDQUFDLGNBQWMsd0JBQzVCLHVDQUE0QixHQUM1QixlQUFlLEVBQ2xCLENBQ0gsQ0FBQztZQUNKLEtBQUssVUFBVTtnQkFDYixPQUF5QyxDQUN2QyxJQUFJLDJCQUFnQixDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FDdEQsQ0FBQztZQUNKLEtBQUssZUFBZSxDQUFDO1lBQ3JCLEtBQUssV0FBVztnQkFDZCxPQUF5QyxDQUN2QyxJQUFJLDRCQUFpQixDQUFDLGNBQWMsd0JBQy9CLDBDQUErQixHQUMvQixlQUFlLEVBQ2xCLENBQ0gsQ0FBQztZQUNKLEtBQUssVUFBVTtnQkFDYixPQUF5QyxDQUN2QyxJQUFJLDJCQUFnQixDQUFDLGNBQWMsd0JBQzlCLHlDQUE4QixHQUM5QixlQUFlLEVBQ2xCLENBQ0gsQ0FBQztZQUNKLEtBQUssUUFBUTtnQkFDWCxPQUF5QyxDQUN2QyxJQUFJLHlCQUFjLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUNwRCxDQUFDO1lBQ0osUUFBUTtTQUNUO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hNRCwwSUFHaUM7QUFFakM7SUFBQTtRQUNTLFlBQU8sR0FBRyxPQUFPLENBQUM7SUFPM0IsQ0FBQztJQUxlLGdDQUFjLEdBQTVCLFVBQ0UsT0FBbUI7UUFFbkIsT0FBTyxpQ0FBZSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xEO0lBQTJDLGlDQUFLO0lBVzlDLHVCQUNFLE9BQWUsRUFDZixRQU1vQjtRQVJ0QixZQVVFLGtCQUFNLE9BQU8sQ0FBQyxTQU1mO1FBTEMsS0FBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7UUFDNUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsb0NBQW9DO1FBQ3BDLEtBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQzs7SUFDM0MsQ0FBQztJQUVNLG1DQUFXLEdBQWxCO1FBT0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQ0F0QzBDLEtBQUssR0FzQy9DOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUNELHdEQUF3RDtBQUN4RCxpR0FBK0Q7QUFBdEQscUhBQU8sT0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RqQyx3SEFBa0Q7QUFDbEQsNEdBQTBDO0FBYzFDLElBQU0sU0FBUyxHQUNiLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRSxFQUFnQixDQUFDO0FBRTFELFNBQVMsQ0FBQyxpQkFBaUIsR0FBRywyQkFBaUIsQ0FBQztBQUNoRCxTQUFTLENBQUMsYUFBYSxHQUFHLHVCQUFhLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQeEMsd0ZBQXlCO0FBQ3pCLGtGQUFzQjtBQUN0Qiw0RUFBc0I7QUFDdEIsa0ZBQW1EO0FBQTFDLCtHQUFPLE9BQWM7QUFDOUIsc0ZBQTJCO0FBQzNCLDhGQUEyRDtBQUFsRCx1SEFBTyxPQUFrQjtBQUNsQyw4RkFBK0I7QUFDL0IsNEVBQStDO0FBQXRDLDJHQUFPLE9BQVk7QUFDNUIsa0ZBQXlCO0FBQ3pCLHlIQUE2RTtBQUFwRSx5SUFBTyxPQUEyQjtBQUMzQyxnSEFBd0M7QUFDeEMsMkZBQXlEO0FBQWhELHFIQUFPLE9BQWlCO0FBQ2pDLDRGQUE4QjtBQUM5Qix1R0FBNEM7QUFBbkMsbUhBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJoQiwwRUFPa0I7QUFDbEIsOEZBQWdDO0FBNkNoQztJQUtFLHNCQUNFLGVBQXdDLEVBQ3hDLE9BQTBEO1FBQTFELG9DQUFvQyxpQ0FBc0I7UUFFMUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8seUJBQVEsaUNBQXNCLEdBQUssT0FBTyxDQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ2IscUZBQXFGLENBQ3RGLENBQUM7U0FDSDtJQUNILENBQUM7SUFFTSw4QkFBTyxHQUFkLFVBQ0UsS0FBaUQsRUFDakQsUUFBcUMsRUFDckMsYUFBNkI7UUFFN0IsSUFBTSxZQUFZLEdBQUcsMEJBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6RSxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUNiLDZFQUE2RSxDQUM5RSxDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNoRCxJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLFFBQVEsRUFBRSx1QkFBcUIsWUFBWSxDQUFDLE9BQU8sRUFBSTtTQUN4RCxDQUFDLENBQUM7UUFFSCxJQUFNLE1BQU0sR0FBc0I7WUFDaEMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUN4QixhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUztTQUMzRCxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQ0UsZUFBb0UsRUFDcEUsbUJBQWtFLEVBQ2xFLHVCQUFxRSxFQUNyRSxhQUE2QjtRQUU3QixJQUFNLFlBQVksR0FBRywwQkFBZSxDQUFDLDZCQUE2QixDQUNoRSxlQUFlLEVBQ2YsbUJBQW1CLENBQ3BCLENBQUM7UUFDRixJQUFNLGVBQWUsR0FBRywwQkFBZSxDQUFDLHlCQUF5QixDQUMvRCxtQkFBbUIsRUFDbkIsdUJBQXVCLENBQ3hCLENBQUM7UUFDRixJQUFNLG9CQUFvQixHQUFHLDBCQUFlLENBQUMsOEJBQThCLENBQ3pFLG1CQUFtQixFQUNuQix1QkFBdUIsRUFDdkIsYUFBYSxDQUNkLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNoRCxJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLFFBQVEsRUFBRSx1QkFBcUIsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsU0FDbkUsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQzlCO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsSUFBTSxNQUFNLEdBQXNCO1lBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDeEIsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDM0QsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLHFDQUFjLEdBQXJCLFVBQ0UsTUFBNEIsRUFDNUIsUUFBcUMsRUFDckMsT0FBK0IsRUFDL0IsSUFBeUIsRUFDekIsYUFBNkI7UUFFN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQ2hDLE1BQU0sRUFDTixVQUFDLElBQUk7WUFDSCxRQUFRLENBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBa0I7Z0JBQ3BELG1CQUFZLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUFsQyxDQUFrQyxDQUNuQyxDQUNGLENBQUM7UUFDSixDQUFDLEVBQ0QsT0FBTyxFQUNQLElBQUksRUFDSixhQUFhLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFFYSwwQkFBYSxHQUEzQixVQUE0QixNQUFrQjtRQUM1QyxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxvQkFBZ0IsR0FBSyxNQUFNLENBQUMsT0FBTyxpQkFBbkIsQ0FBb0I7UUFDNUMsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDeEMsU0FBMkIsTUFBTSxDQUFDLE9BQU8sRUFBdkMsUUFBUSxnQkFBRSxVQUFVLGdCQUFtQixDQUFDO1FBQ2hELElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzVDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBRTdDLElBQUksUUFBUSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLFFBQVE7WUFDUixTQUFTO1lBQ1QsZ0JBQWdCO1lBQ2hCLFVBQVU7WUFDVixRQUFRO1lBQ1IsVUFBVTtZQUNWLE1BQU07WUFDTixPQUFPO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQztRQUVGLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4TEQsMEVBT2tCO0FBZUwsbUNBQTJCLHlCQUNuQyxpQ0FBc0IsS0FDekIsU0FBUyxFQUFFLEVBQUUsSUFDYjtBQUlGO0lBR0UsdUJBQ0UsT0FBb0U7UUFBcEUsb0NBQXlDLG1DQUEyQjtRQUVwRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRU0sK0JBQU8sR0FBZCxVQUNFLEtBQWlELEVBQ2pELFFBQXNDLEVBQ3RDLGFBQTZCO1FBRTdCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDbEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDekQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixDQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDdEIsS0FBSyxFQUNMLFFBQVEsRUFDUixhQUFhLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFFTSxpQ0FBUyxHQUFoQixVQUNFLGVBQW9FLEVBQ3BFLG1CQUFtRSxFQUNuRSx1QkFBc0UsRUFDdEUsYUFBNkI7UUFFN0IsSUFBTSxZQUFZLEdBQUcsMEJBQWUsQ0FBQyw2QkFBNkIsQ0FDaEUsZUFBZSxFQUNmLG1CQUFtQixDQUNwQixDQUFDO1FBQ0YsSUFBTSxlQUFlLEdBQUcsMEJBQWUsQ0FBQyx5QkFBeUIsQ0FDL0QsbUJBQW1CLEVBQ25CLHVCQUF1QixDQUN4QixDQUFDO1FBQ0YsSUFBTSxvQkFBb0IsR0FBRywwQkFBZSxDQUFDLDhCQUE4QixDQUN6RSxtQkFBbUIsRUFDbkIsdUJBQXVCLEVBQ3ZCLGFBQWEsQ0FDZCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNsRCxJQUFJLENBQUMscUJBQXFCLENBQ3hCLFlBQVksRUFDWixlQUFlLEVBQ2Ysb0JBQW9CLENBQ3JCLENBQUM7WUFDRixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMscUJBQXFCLENBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN0QixZQUFZLEVBQ1osZUFBZSxFQUNmLG9CQUFvQixDQUNyQixDQUFDO0lBQ0osQ0FBQztJQUVPLDJDQUFtQixHQUEzQixVQUNFLFNBQXdDLEVBQ3hDLEtBQWlELEVBQ2pELFFBQXNDLEVBQ3RDLGFBQTZCO1FBSi9CLGlCQTZCQztRQXZCUSxZQUFRLEdBQXNCLFNBQVMsR0FBL0IsRUFBSyxhQUFhLEdBQUksU0FBUyxTQUFiLENBQWM7UUFDL0MsSUFBTSxjQUFjLEdBQWlDLFVBQUMsT0FBTztZQUMzRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU87YUFDUjtZQUNELEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUM7UUFDRixJQUFNLG1CQUFtQixHQUFrQixVQUFDLGFBQWE7WUFDdkQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM5QjtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xCLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEtBQUssQ0FDWCw0REFBMEQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFNLEVBQ3JGLGFBQWEsQ0FDZCxDQUFDO2FBQ0g7WUFDRCxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDO1FBRUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLDZDQUFxQixHQUE3QixVQUNFLFNBQXdDLEVBQ3hDLFlBQTBCLEVBQzFCLFFBQXNDLEVBQ3RDLGFBQTZCO1FBSi9CLGlCQWtDQztRQTVCUSxZQUFRLEdBQXNCLFNBQVMsR0FBL0IsRUFBSyxhQUFhLEdBQUksU0FBUyxTQUFiLENBQWM7UUFDL0MsSUFBTSxjQUFjLEdBQWlDLFVBQUMsT0FBTztZQUMzRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU87YUFDUjtZQUNELEtBQUksQ0FBQyxxQkFBcUIsQ0FDeEIsYUFBYSxFQUNiLFlBQVksRUFDWixRQUFRLEVBQ1IsYUFBYSxDQUNkLENBQUM7UUFDSixDQUFDLENBQUM7UUFDRixJQUFNLG1CQUFtQixHQUFrQixVQUFDLGFBQWE7WUFDdkQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM5QjtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xCLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEtBQUssQ0FDWCw4REFBNEQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFNLEVBQ3ZGLGFBQWEsQ0FDZCxDQUFDO2FBQ0g7WUFDRCxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDO1FBRUYsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVPLDJDQUFtQixHQUEzQixVQUNFLEtBQWlELEVBQ2pELFFBQXNDLEVBQ3RDLGFBQTZCO1FBSC9CLGlCQXdEQztRQW5EQyxJQUFNLGVBQWUsR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMzRCxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBTSxpQkFBaUIsR0FBRztZQUN4QixZQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUFNLEVBQUUsUUFBUTtnQkFDN0MsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDO2dCQUM1QixJQUFJLFNBQVMsS0FBSyxjQUFjLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQ3RELGNBQWMsR0FBRyxFQUFFLENBQUM7aUJBQ3JCO2dCQUNELElBQUksU0FBUyxLQUFLLGNBQWMsRUFBRTtvQkFDaEMsT0FBTyxTQUFTLENBQUM7aUJBQ2xCO2dCQUNELElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzdCLE9BQU8sY0FBYyxDQUFDO2lCQUN2QjtnQkFFRCxPQUFPLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RCxDQUFDLEVBQTBCLEVBQUUsQ0FBQztRQWI5QixDQWE4QixDQUFDO1FBQ2pDLElBQU0sc0JBQXNCLEdBRVEsVUFBQyxZQUFZLElBQUssaUJBQUMsT0FBTztZQUM1RCxlQUFlLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFNLGNBQWMsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxFQUFFO2dCQUNyQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3pCLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdkI7UUFDSCxDQUFDLEVBUHFELENBT3JELENBQUM7UUFDRixJQUFNLDJCQUEyQixHQUVaLFVBQUMsWUFBWSxJQUFLLGlCQUFDLGFBQWE7WUFDbkQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM5QjtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xCLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEtBQUssQ0FDWCw0REFBMEQsWUFBYyxFQUN4RSxhQUFhLENBQ2QsQ0FBQzthQUNIO1lBQ0Qsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQVpzQyxDQVl0QyxDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtZQUN0QyxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUMvQyxRQUFRLENBQUMsT0FBTyxDQUNkLEtBQUssRUFDTCxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsRUFDcEMsMkJBQTJCLENBQUMsWUFBWSxDQUFDLENBQzFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyw2Q0FBcUIsR0FBN0IsVUFDRSxZQUEwQixFQUMxQixRQUFzQyxFQUN0QyxhQUE2QjtRQUgvQixpQkF3REM7UUFuREMsSUFBTSxlQUFlLEdBQTRCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDM0QsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQU0saUJBQWlCLEdBQUc7WUFDeEIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFFLFFBQVE7Z0JBQzdDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQztnQkFDNUIsSUFBSSxTQUFTLEtBQUssY0FBYyxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO29CQUN0RCxjQUFjLEdBQUcsRUFBRSxDQUFDO2lCQUNyQjtnQkFDRCxJQUFJLFNBQVMsS0FBSyxjQUFjLEVBQUU7b0JBQ2hDLE9BQU8sU0FBUyxDQUFDO2lCQUNsQjtnQkFDRCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUM3QixPQUFPLGNBQWMsQ0FBQztpQkFDdkI7Z0JBRUQsT0FBTyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEQsQ0FBQyxFQUEwQixFQUFFLENBQUM7UUFiOUIsQ0FhOEIsQ0FBQztRQUNqQyxJQUFNLHNCQUFzQixHQUVRLFVBQUMsWUFBWSxJQUFLLGlCQUFDLE9BQU87WUFDNUQsZUFBZSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0MsSUFBTSxjQUFjLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsY0FBYyxJQUFJLGNBQWMsRUFBRTtnQkFDckMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN6QixjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQyxFQVBxRCxDQU9yRCxDQUFDO1FBQ0YsSUFBTSwyQkFBMkIsR0FFWixVQUFDLFlBQVksSUFBSyxpQkFBQyxhQUFhO1lBQ25ELElBQUksYUFBYSxFQUFFO2dCQUNqQixhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDOUI7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNsQixzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQ1gsOERBQTRELFlBQWMsRUFDMUUsYUFBYSxDQUNkLENBQUM7YUFDSDtZQUNELHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLENBQUMsRUFac0MsQ0FZdEMsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7WUFDdEMsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDL0MsUUFBUSxDQUFDLFNBQVMsQ0FDaEIsWUFBWSxFQUNaLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxFQUNwQywyQkFBMkIsQ0FBQyxZQUFZLENBQUMsQ0FDMUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGtEQUFrRDtJQUMzQyxzQ0FBYyxHQUFyQjtJQUNFLDZEQUE2RDtJQUM3RCxNQUE0QjtJQUM1Qiw2REFBNkQ7SUFDN0QsUUFBc0M7SUFDdEMsNkRBQTZEO0lBQzdELE9BQStCO0lBQy9CLDZEQUE2RDtJQUM3RCxJQUF5QjtJQUN6Qiw2REFBNkQ7SUFDN0QsYUFBNkI7UUFFN0IsTUFBTSxJQUFJLEtBQUssQ0FDYixtRUFBbUUsQ0FDcEUsQ0FBQztJQUNKLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JTRCwwRUFPa0I7QUFDbEIsOEZBQWdDO0FBOENoQztJQUtFLDBCQUNFLGVBQXdDLEVBQ3hDLE9BQTBEO1FBQTFELG9DQUFvQyxpQ0FBc0I7UUFFMUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8seUJBQVEsaUNBQXNCLEdBQUssT0FBTyxDQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ2IseUZBQXlGLENBQzFGLENBQUM7U0FDSDtJQUNILENBQUM7SUFFTSxrQ0FBTyxHQUFkLFVBQ0UsS0FBaUQsRUFDakQsUUFBeUMsRUFDekMsYUFBNkI7UUFFN0IsSUFBTSxZQUFZLEdBQUcsMEJBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6RSxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUNiLGlGQUFpRixDQUNsRixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNoRCxJQUFJLEVBQUUscUJBQXFCO1lBQzNCLFFBQVEsRUFBRSxzQkFBc0I7U0FDakMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxNQUFNLEdBQTBCO1lBQ3BDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDeEIsUUFBUSxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQ3RDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQzlELENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sb0NBQVMsR0FBaEIsVUFDRSxlQUFvRSxFQUNwRSxtQkFBc0UsRUFDdEUsdUJBQXlFLEVBQ3pFLGFBQTZCO1FBRTdCLElBQU0sWUFBWSxHQUFHLDBCQUFlLENBQUMsNkJBQTZCLENBQ2hFLGVBQWUsRUFDZixtQkFBbUIsQ0FDcEIsQ0FBQztRQUNGLElBQU0sZUFBZSxHQUFHLDBCQUFlLENBQUMseUJBQXlCLENBQy9ELG1CQUFtQixFQUNuQix1QkFBdUIsQ0FDeEIsQ0FBQztRQUNGLElBQU0sb0JBQW9CLEdBQUcsMEJBQWUsQ0FBQyw4QkFBOEIsQ0FDekUsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN2QixhQUFhLENBQ2QsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQ2hELElBQUksRUFBRSxxQkFBcUI7WUFDM0IsUUFBUSxFQUFFLHNCQUFzQjtTQUNqQyxDQUFDLENBQUM7UUFFSCxJQUFNLE1BQU0sR0FBMEI7WUFDcEMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUN4QixRQUFRLEVBQUssWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsU0FDakQsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQzlCO1lBQ0YsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDOUQsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLHlDQUFjLEdBQXJCLFVBQ0UsTUFBNEIsRUFDNUIsUUFBeUMsRUFDekMsT0FBK0IsRUFDL0IsSUFBeUIsRUFDekIsYUFBNkI7UUFFN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQ2hDLE1BQU0sRUFDTixVQUFDLElBQUk7WUFDSCxRQUFRLENBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBc0I7Z0JBQ25ELHVCQUFnQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFBdEMsQ0FBc0MsQ0FDdkMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxFQUNELE9BQU8sRUFDUCxJQUFJLEVBQ0osYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDO0lBRWEsOEJBQWEsR0FBM0IsVUFBNEIsTUFBc0I7UUFDaEQsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDbkMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDcEMsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDM0IsY0FBVSxHQUFLLE1BQU0sV0FBWCxDQUFZO1FBQzlCLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBRXRDLE9BQU8sa0JBQVEsQ0FBQyxNQUFNLENBQUM7WUFDckIsUUFBUTtZQUNSLFNBQVM7WUFDVCxVQUFVO1lBQ1YsV0FBVztZQUNYLFFBQVE7WUFDUixVQUFVO1lBQ1YsTUFBTTtZQUNOLE9BQU87WUFDUCxXQUFXO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzFMRCwwRUFLZTtBQUNmLG9FQUF1QztBQUV2QztJQUFBO0lBd0ZBLENBQUM7SUF2RmUsNENBQTRCLEdBQTFDLFVBQ0UsS0FBaUQsRUFDakQsWUFBMkI7UUFBM0IsOENBQWUsb0JBQVk7UUFFM0IsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxjQUFNLENBQUMsS0FBSyxDQUFDLElBQUksY0FBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNsQyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUMzQztZQUNELE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLFlBQVksQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVhLDZDQUE2QixHQUEzQyxVQUNFLGVBQW9FLEVBQ3BFLG1CQUFpRSxFQUNqRSxZQUEyQjtRQUEzQiw4Q0FBZSxvQkFBWTtRQUUzQixJQUNFLE9BQU8sZUFBZSxLQUFLLFFBQVE7WUFDbkMsT0FBTyxlQUFlLEtBQUssUUFBUSxFQUNuQztZQUNBLElBQ0UsQ0FBQyxDQUNDLE9BQU8sbUJBQW1CLEtBQUssUUFBUTtnQkFDdkMsT0FBTyxtQkFBbUIsS0FBSyxRQUFRLENBQ3hDLEVBQ0Q7Z0JBQ0EsTUFBTSxJQUFJLEtBQUssQ0FDYixzRkFBc0YsQ0FDdkYsQ0FBQzthQUNIO1lBQ0QsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDO2dCQUN6QixRQUFRLEVBQUUsZUFBZTtnQkFDekIsU0FBUyxFQUFFLG1CQUFtQjthQUMvQixDQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxDQUFDLGVBQWUsWUFBWSxZQUFZLENBQUMsRUFBRTtZQUM5QyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRWEseUNBQXlCLEdBQXZDLFVBQ0UsbUJBQWlFLEVBQ2pFLHVCQUFvRTtRQUVwRSxJQUNFLENBQUMsQ0FDQyxPQUFPLG1CQUFtQixLQUFLLFFBQVE7WUFDdkMsT0FBTyxtQkFBbUIsS0FBSyxRQUFRLENBQ3hDLEVBQ0Q7WUFDQSxPQUFPLG1CQUFtQixDQUFDO1NBQzVCO1FBQ0QsSUFBSSx1QkFBdUIsRUFBRTtZQUMzQixPQUFtQyx1QkFBdUIsQ0FBQztTQUM1RDtRQUVELE1BQU0sSUFBSSxLQUFLLENBQ2IsMkRBQTJELENBQzVELENBQUM7SUFDSixDQUFDO0lBRWEsOENBQThCLEdBQTVDLFVBQ0UsbUJBQWlFLEVBQ2pFLHVCQUFvRSxFQUNwRSxhQUE2QjtRQUU3QixJQUFJLGFBQWEsRUFBRTtZQUNqQixPQUFPLGFBQWEsQ0FBQztTQUN0QjtRQUVELElBQ0UsT0FBTyxtQkFBbUIsS0FBSyxRQUFRO1lBQ3ZDLE9BQU8sbUJBQW1CLEtBQUssUUFBUSxFQUN2QztZQUNBLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBRUQsT0FBa0MsdUJBQXVCLENBQUM7SUFDNUQsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRlksNEJBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBRXpCLDhCQUFzQixHQUE2QjtJQUM5RCxNQUFNLEVBQUUsS0FBSztJQUNiLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkYsMEVBT2tCO0FBQ2xCLDhGQUFnQztBQWtGaEM7SUFLRSx3QkFDRSxlQUF3QyxFQUN4QyxPQUFnRTtRQUFoRSxvQ0FBMEMsaUNBQXNCO1FBRWhFLElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLHlCQUFRLGlDQUFzQixHQUFLLE9BQU8sQ0FBRSxDQUFDO0lBQzNELENBQUM7SUFFTSxnQ0FBTyxHQUFkLFVBQ0UsS0FBaUQsRUFDakQsUUFBdUMsRUFDdkMsYUFBNkI7UUFFN0IsSUFBTSxZQUFZLEdBQUcsMEJBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6RSxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUNiLCtFQUErRSxDQUNoRixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNoRCxJQUFJLEVBQUUsd0JBQXdCO1lBQzlCLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUVILElBQU0sTUFBTSxHQUF3QjtZQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzNCLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtZQUNyQyxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFO1lBQzlCLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQzlELENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sa0NBQVMsR0FBaEIsVUFDRSxlQUFvRSxFQUNwRSxtQkFBb0UsRUFDcEUsdUJBQXVFLEVBQ3ZFLGFBQTZCO1FBRTdCLElBQU0sWUFBWSxHQUFHLDBCQUFlLENBQUMsNkJBQTZCLENBQ2hFLGVBQWUsRUFDZixtQkFBbUIsQ0FDcEIsQ0FBQztRQUNGLElBQU0sZUFBZSxHQUFHLDBCQUFlLENBQUMseUJBQXlCLENBQy9ELG1CQUFtQixFQUNuQix1QkFBdUIsQ0FDeEIsQ0FBQztRQUNGLElBQU0sb0JBQW9CLEdBQUcsMEJBQWUsQ0FBQyw4QkFBOEIsQ0FDekUsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN2QixhQUFhLENBQ2QsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQ2hELElBQUksRUFBRSx3QkFBd0I7WUFDOUIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsSUFBTSxNQUFNLEdBQXdCO1lBQ2xDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDM0IsT0FBTyxFQUFLLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLFNBQ2pELFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxRQUM5QjtZQUNGLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUU7WUFDOUIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztZQUM3QixhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUM5RCxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0sdUNBQWMsR0FBckIsVUFDRSxNQUE0QixFQUM1QixRQUF1QyxFQUN2QyxPQUErQixFQUMvQixJQUF5QixFQUN6QixhQUE2QjtRQUU3QixJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FDaEMsTUFBTSxFQUNOLFVBQUMsSUFBSTtZQUNILFFBQVEsQ0FDTixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ2pELFVBQUMsTUFBOEI7Z0JBQzdCLHFCQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFBOUMsQ0FBOEMsQ0FDakQsQ0FDRixDQUFDO1FBQ0osQ0FBQyxFQUNELE9BQU8sRUFDUCxJQUFJLEVBQ0osYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDO0lBRWEsNEJBQWEsR0FBM0IsVUFBNEIsTUFBb0I7UUFDOUMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBTSxjQUFjLEdBQWtDLGNBQWMsQ0FBQyxhQUFhLENBQ2hGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQ3hELENBQUM7UUFFRixJQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQ2xELElBQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNuRCxJQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMscUJBQXFCLENBQUM7UUFDekQsSUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztRQUM3QyxJQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsc0JBQXNCLENBQUM7UUFDckQsSUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQztRQUMzQyxJQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDO1FBRW5ELElBQUksUUFBUSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLFFBQVE7WUFDUixTQUFTO1lBQ1QsWUFBWTtZQUNaLFVBQVU7WUFDVixXQUFXO1lBQ1gsUUFBUTtZQUNSLE1BQU07WUFDTixPQUFPO1lBQ1AsV0FBVztTQUNaLENBQUMsQ0FBQztRQUVILElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckUsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRSxRQUFRLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FDNUIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMxQixVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzFCLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDMUIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMzQixDQUFDO1FBRUYsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVjLDRCQUFhLEdBQTVCLFVBR0UsTUFBUztRQUNULElBQU0sU0FBUyxHQUF5QixFQUFFLENBQUM7UUFFM0MsSUFBTSxJQUFJLEdBQUcsVUFBQyxZQUE0QjtZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFJLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBQ3ZDLElBQU0sS0FBSyxHQUFPLFlBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuRCxJQUFNLFFBQVEsR0FDWixJQUFJLEtBQUssaUJBQWlCLElBQUksSUFBSSxLQUFLLGdCQUFnQixDQUFDO2dCQUUxRCxJQUNFLENBQUMsT0FBTztvQkFDUixRQUFRO29CQUNSLE1BQU0sQ0FBQyxJQUFJLENBQTBCLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFDbEQ7b0JBQ0EsSUFBSSxDQUFhLEtBQUssQ0FBQyxDQUFDO29CQUN4QixPQUFPO2lCQUNSO2dCQUVELFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBTSxLQUFLLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFYixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsUkQsaUdBQW9EO0FBTXBEO0lBQStDLHFDQUFRO0lBR3JELDJCQUFzQixFQUdJO1FBRnhCLGVBQVcsbUJBQ1IsY0FBYyxjQUZHLGVBR3JCLENBRGtCO1FBRm5CLFlBSUUsa0JBQU0sY0FBYyxDQUFDLFNBRXRCO1FBREMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0lBQ2pDLENBQUM7SUFFYSx3QkFBTSxHQUFwQixVQUFxQixNQUErQjtRQUNsRCxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxvQ0FBUSxHQUFmO1FBQ0UsNkJBQ0ssaUJBQU0sUUFBUSxXQUFFLEtBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUM3QjtJQUNKLENBQUM7SUFFTSwyQ0FBZSxHQUF0QixVQUF1QixXQUFtQjtRQUN4QyxPQUFPLElBQUksaUJBQWlCLHVCQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLFdBQVcsaUJBQ1gsQ0FBQztJQUNMLENBQUM7SUFFTSwwQ0FBYyxHQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLENBaEM4QyxrQkFBUSxHQWdDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDRCw0RUFRa0I7QUFPbEIsNkVBQXNDO0FBQ3RDLHVHQUFvQztBQThEcEM7SUFNRSwyQkFDRSxlQUF3QyxFQUN4QyxPQUEwRDtRQUExRCxvQ0FBb0MsaUNBQXNCO1FBRTFELElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLHlCQUFRLGlDQUFzQixHQUFLLE9BQU8sQ0FBRSxDQUFDO0lBQzNELENBQUM7SUFFTSxtQ0FBTyxHQUFkLFVBQ0UsS0FBaUQsRUFDakQsUUFBMEMsRUFDMUMsYUFBNkI7UUFFN0IsSUFBTSxZQUFZLEdBQUcsMEJBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6RSxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUNiLGtGQUFrRixDQUNuRixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDN0QsUUFBUSxDQUFDO2dCQUNQLDRCQUFpQixDQUFDLE1BQU0sQ0FBQztvQkFDdkIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLE9BQU8sRUFBRSxXQUFXO2lCQUNyQixDQUFDO2FBQ0gsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDaEQsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixRQUFRLEVBQUUsU0FBUztTQUNwQixDQUFDLENBQUM7UUFFSCxJQUFNLE1BQU0sR0FBMkI7WUFDckMsRUFBRSxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO1NBQy9CLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsa0RBQWtEO0lBQzNDLHFDQUFTLEdBQWhCO0lBQ0UsNkRBQTZEO0lBQzdELGVBQW9FO0lBQ3BFLDZEQUE2RDtJQUM3RCxtQkFBdUU7SUFDdkUsNkRBQTZEO0lBQzdELHVCQUEwRTtJQUMxRSw2REFBNkQ7SUFDN0QsYUFBNkI7UUFFN0IsTUFBTSxJQUFJLEtBQUssQ0FDYiw0REFBNEQsQ0FDN0QsQ0FBQztJQUNKLENBQUM7SUFFTSwwQ0FBYyxHQUFyQixVQUNFLE1BQTRCLEVBQzVCLFFBQTBDLEVBQzFDLE9BQStCLEVBQy9CLElBQXlCLEVBQ3pCLGFBQTZCO1FBRTdCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUNoQyxNQUFNLEVBQ04sVUFBQyxJQUFxQjtZQUNwQixJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUMvQyxJQUFNLGNBQVksR0FBRyxvQ0FBa0MsSUFBSSxDQUFDLGdCQUFnQixNQUFHLENBQUM7Z0JBQ2hGLElBQUksYUFBYSxFQUFFO29CQUNqQixhQUFhLENBQUMsSUFBSSxxQkFBYSxDQUFDLGNBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxPQUFPO2lCQUNSO2dCQUNELFVBQVUsQ0FBQztvQkFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGNBQVksQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1I7WUFDRCxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUMsRUFDRCxPQUFPLEVBQ1AsSUFBSSxFQUNKLGFBQWEsQ0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVhLCtCQUFhLEdBQTNCLFVBQTRCLE1BQXVCO1FBQ2pELElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RCxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDekQsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGNBQWMsSUFBSSxTQUFTLENBQUM7UUFDcEQsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixJQUFJLFNBQVMsQ0FBQztRQUNwRCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMscUJBQXFCLElBQUksU0FBUyxDQUFDO1FBQzFELElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsSUFBSSxTQUFTLENBQUM7UUFDOUQsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixJQUFJLFNBQVMsQ0FBQztRQUN4RCxJQUFNLFdBQVcsR0FBaUIsRUFBRSxDQUFDO1FBQ3JDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTLENBQUM7UUFFekQsSUFBSSxNQUFNLENBQUMsb0JBQW9CLEVBQUU7WUFDL0IsV0FBVyxDQUFDLElBQUksQ0FDZCxvQkFBVSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxvQkFBb0I7Z0JBQ2pDLElBQUksRUFBRSxNQUFNLENBQUMsb0JBQW9CLElBQUksU0FBUzthQUMvQyxDQUFDLENBQ0gsQ0FBQztTQUNIO1FBRUQsSUFBTSxRQUFRLEdBQUcsNEJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQ3hDLFFBQVE7WUFDUixTQUFTO1lBQ1QsUUFBUTtZQUNSLE1BQU07WUFDTixXQUFXO1lBQ1gsT0FBTztZQUNQLFdBQVc7WUFDWCxRQUFRO1lBQ1IsV0FBVztTQUNaLENBQUMsQ0FBQztRQUVILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdE5ELDBIQUFvRjtBQUEzRSw2SEFBTyxPQUFxQjtBQUNyQywwSEFBb0Y7QUFBM0UsNkhBQU8sT0FBcUI7QUFDckMsdUhBQXFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZyRCw2RUFBeUQ7QUFhekQ7SUFBb0QsMENBQVk7SUFPOUQsZ0NBQXNCLEVBS1M7UUFKN0IsZ0JBQVksb0JBQ1osVUFBVSxrQkFDVixPQUFPLGVBQ0osa0JBQWtCLGNBSkQseUNBS3JCLENBRHNCO1FBSnZCLFlBTUUsa0JBQU0sa0JBQWtCLENBQUMsU0FTMUI7UUFSQyxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM3QyxNQUFNLElBQUksS0FBSyxDQUNiLGdGQUFnRixDQUNqRixDQUFDO1NBQ0g7UUFDRCxLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7SUFDekIsQ0FBQztJQUVhLDZCQUFNLEdBQXBCLFVBQ0UsTUFBb0M7UUFFcEMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0seUNBQVEsR0FBZjtRQUNFLDZCQUNLLGlCQUFNLFFBQVEsV0FBRSxLQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUNyQjtJQUNKLENBQUM7SUFFTSxpREFBZ0IsR0FBdkIsVUFBd0IsWUFBc0I7UUFDNUMsT0FBTyxJQUFJLHNCQUFzQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsWUFBWSxrQkFBRyxDQUFDO0lBQzFFLENBQUM7SUFFTSxnREFBZSxHQUF0QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sK0NBQWMsR0FBckIsVUFDRSxVQUFpQztRQUVqQyxPQUFPLElBQUksc0JBQXNCLHVCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBRSxVQUFVLGdCQUFHLENBQUM7SUFDeEUsQ0FBQztJQUVNLDhDQUFhLEdBQXBCO1FBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFTSw0Q0FBVyxHQUFsQixVQUFtQixPQUFlO1FBQ2hDLE9BQU8sSUFBSSxzQkFBc0IsdUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFFLE9BQU8sYUFBRyxDQUFDO0lBQ3JFLENBQUM7SUFFTSwyQ0FBVSxHQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLENBaEVtRCxvQkFBWSxHQWdFL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdFRCxpR0FBb0Q7QUF5QnBEO0lBQWdELHNDQUFRO0lBdUN0RCw0QkFBc0IsRUFxQks7UUFwQnpCLFdBQU8sZUFDUCxZQUFZLG9CQUNaLFVBQVUsa0JBQ1YsWUFBWSxvQkFDWixhQUFhLHFCQUNiLFlBQVksb0JBQ1osU0FBUyxpQkFDVCxjQUFjLHNCQUNkLElBQUksWUFDSixZQUFZLG9CQUNaLE9BQU8sZUFDUCxVQUFVLGtCQUNWLGNBQWMsc0JBQ2QsT0FBTyxlQUNQLElBQUksWUFDSixlQUFlLHVCQUNmLGFBQWEscUJBQ2IsZ0JBQWdCLHdCQUNoQixpQkFBaUIseUJBQ2QsY0FBYyxjQXBCRyw0UkFxQnJCLENBRGtCO1FBcEJuQixZQXNCRSxrQkFBTSxjQUFjLENBQUMsU0FvQnRCO1FBbkJDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLElBQUksRUFBRSxDQUFDOztJQUNuRCxDQUFDO0lBRWEseUJBQU0sR0FBcEIsVUFBcUIsTUFBZ0M7UUFDbkQsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0scUNBQVEsR0FBZjtRQUNFLDZCQUNLLGlCQUFNLFFBQVEsV0FBRSxLQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFDckIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQy9CLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUMzQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDL0IsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQ2pDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDekIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQ25DLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUNmLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQzNCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUNuQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQ2YsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQ3JDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUNqQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQ3ZDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsSUFDekM7SUFDSixDQUFDO0lBRU0sd0NBQVcsR0FBbEIsVUFBbUIsT0FBZTtRQUNoQyxPQUFPLElBQUksa0JBQWtCLHVCQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLE9BQU8sYUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVNLHVDQUFVLEdBQWpCO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSw2Q0FBZ0IsR0FBdkIsVUFBd0IsWUFBcUI7UUFDM0MsT0FBTyxJQUFJLGtCQUFrQix1QkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixZQUFZLGtCQUNaLENBQUM7SUFDTCxDQUFDO0lBRU0sMkNBQWMsR0FBckI7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVNLDJDQUFjLEdBQXJCLFVBQXNCLFVBQW9CO1FBQ3hDLE9BQU8sSUFBSSxrQkFBa0IsdUJBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsVUFBVSxnQkFDVixDQUFDO0lBQ0wsQ0FBQztJQUVNLDBDQUFhLEdBQXBCO1FBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFTSw2Q0FBZ0IsR0FBdkIsVUFBd0IsWUFBb0I7UUFDMUMsT0FBTyxJQUFJLGtCQUFrQix1QkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixZQUFZLGtCQUNaLENBQUM7SUFDTCxDQUFDO0lBRU0sNENBQWUsR0FBdEI7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVNLDhDQUFpQixHQUF4QixVQUF5QixhQUFxQjtRQUM1QyxPQUFPLElBQUksa0JBQWtCLHVCQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLGFBQWEsbUJBQ2IsQ0FBQztJQUNMLENBQUM7SUFFTSw2Q0FBZ0IsR0FBdkI7UUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVNLDZDQUFnQixHQUF2QixVQUF3QixZQUFvQjtRQUMxQyxPQUFPLElBQUksa0JBQWtCLHVCQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLFlBQVksa0JBQ1osQ0FBQztJQUNMLENBQUM7SUFFTSw0Q0FBZSxHQUF0QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sMENBQWEsR0FBcEIsVUFBcUIsU0FBaUI7UUFDcEMsT0FBTyxJQUFJLGtCQUFrQix1QkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixTQUFTLGVBQ1QsQ0FBQztJQUNMLENBQUM7SUFFTSx5Q0FBWSxHQUFuQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRU0sK0NBQWtCLEdBQXpCLFVBQTBCLGNBQXNCO1FBQzlDLE9BQU8sSUFBSSxrQkFBa0IsdUJBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsY0FBYyxvQkFDZCxDQUFDO0lBQ0wsQ0FBQztJQUVNLDhDQUFpQixHQUF4QjtRQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRU0scUNBQVEsR0FBZixVQUFnQixJQUFZO1FBQzFCLE9BQU8sSUFBSSxrQkFBa0IsdUJBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsSUFBSSxVQUNKLENBQUM7SUFDTCxDQUFDO0lBRU0sb0NBQU8sR0FBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sNkNBQWdCLEdBQXZCLFVBQXdCLFlBQW9CO1FBQzFDLE9BQU8sSUFBSSxrQkFBa0IsdUJBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsWUFBWSxrQkFDWixDQUFDO0lBQ0wsQ0FBQztJQUVNLDRDQUFlLEdBQXRCO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSx3Q0FBVyxHQUFsQixVQUFtQixPQUFlO1FBQ2hDLE9BQU8sSUFBSSxrQkFBa0IsdUJBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsT0FBTyxhQUNQLENBQUM7SUFDTCxDQUFDO0lBRU0sdUNBQVUsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLDJDQUFjLEdBQXJCLFVBQXNCLFVBQWtCO1FBQ3RDLE9BQU8sSUFBSSxrQkFBa0IsdUJBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsVUFBVSxnQkFDVixDQUFDO0lBQ0wsQ0FBQztJQUVNLDBDQUFhLEdBQXBCO1FBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFTSwrQ0FBa0IsR0FBekIsVUFBMEIsY0FBc0I7UUFDOUMsT0FBTyxJQUFJLGtCQUFrQix1QkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixjQUFjLG9CQUNkLENBQUM7SUFDTCxDQUFDO0lBRU0sOENBQWlCLEdBQXhCO1FBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFFTSx3Q0FBVyxHQUFsQixVQUFtQixPQUFlO1FBQ2hDLE9BQU8sSUFBSSxrQkFBa0IsdUJBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsT0FBTyxhQUNQLENBQUM7SUFDTCxDQUFDO0lBRU0sdUNBQVUsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVNLHFDQUFRLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixPQUFPLElBQUksa0JBQWtCLHVCQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLElBQUksVUFDSixDQUFDO0lBQ0wsQ0FBQztJQUVNLG9DQUFPLEdBQWQ7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVNLGdEQUFtQixHQUExQixVQUEyQixlQUF1QjtRQUNoRCxPQUFPLElBQUksa0JBQWtCLHVCQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLGVBQWUscUJBQ2YsQ0FBQztJQUNMLENBQUM7SUFFTSwrQ0FBa0IsR0FBekI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVNLDhDQUFpQixHQUF4QixVQUF5QixhQUFxQjtRQUM1QyxPQUFPLElBQUksa0JBQWtCLHVCQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLGFBQWEsbUJBQ2IsQ0FBQztJQUNMLENBQUM7SUFFTSw2Q0FBZ0IsR0FBdkI7UUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVNLGlEQUFvQixHQUEzQixVQUE0QixnQkFBd0I7UUFDbEQsT0FBTyxJQUFJLGtCQUFrQix1QkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixnQkFBZ0Isc0JBQ2hCLENBQUM7SUFDTCxDQUFDO0lBRU0sZ0RBQW1CLEdBQTFCO1FBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVNLGdEQUFtQixHQUExQixVQUEyQixnQkFBNEI7UUFDckQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxpREFBb0IsR0FBM0I7UUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLENBN1QrQyxrQkFBUSxHQTZUdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaFZELDRFQVlrQjtBQUNsQix1R0FBb0M7QUFDcEMsNkVBQXNDO0FBQ3RDLHVFQU9lO0FBbUpmO0lBTUUsNEJBQ0UsZUFBd0MsRUFDeEMsT0FBb0U7UUFBcEUsb0NBQThDLGlDQUFzQjtRQUVwRSxJQUFJLENBQUMsY0FBYyxHQUFHLGVBQWUsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyx5QkFBUSxpQ0FBc0IsR0FBSyxPQUFPLENBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNsRCxNQUFNLElBQUksS0FBSyxDQUNiLDZIQUE2SCxDQUM5SCxDQUFDO1NBQ0g7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDakQsTUFBTSxJQUFJLEtBQUssQ0FDYixnSEFBZ0gsQ0FDakgsQ0FBQztTQUNIO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxpQkFBUyxFQUFFLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FDYiw4REFBOEQsQ0FDL0QsQ0FBQztTQUNIO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZFLE1BQU0sSUFBSSxLQUFLLENBQ2IsNkVBQTZFLENBQzlFLENBQUM7U0FDSDtJQUNILENBQUM7SUFFTSxvQ0FBTyxHQUFkLFVBQ0UsS0FBcUUsRUFDckUsUUFBMkMsRUFDM0MsYUFBNkI7O1FBRTdCLElBQU0sWUFBWSxHQUFHLDBCQUFlLENBQUMsNEJBQTRCLENBQy9ELEtBQUssRUFDTCxpQ0FBc0IsQ0FDdkIsQ0FBQztRQUVGLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ2IsbUZBQW1GLENBQ3BGLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQ2hELElBQUksRUFBRSxxQkFBcUI7WUFDM0IsUUFBUSxFQUFFLHVCQUF1QjtTQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFNLE1BQU0sR0FBNEIsSUFBSSxDQUFDLGdCQUFnQixDQUMzRDtZQUNFLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQy9CLE1BQU0sRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFO2dCQUM5QixDQUFDLENBQUMsT0FBRyxZQUFZLENBQUMsU0FBUyxFQUFFLDBDQUFFLEtBQUssaUJBQ2hDLFlBQVksQ0FBQyxTQUFTLEVBQUUsMENBQUUsSUFBSSxpQkFDNUIsWUFBWSxDQUFDLFNBQVMsRUFBRSwwQ0FBRSxLQUFLLGlCQUNqQyxZQUFZLENBQUMsU0FBUyxFQUFFLDBDQUFFLElBQUksQ0FDOUI7Z0JBQ0osQ0FBQyxDQUFDLFNBQVM7WUFDYixVQUFVLEVBQTJCLFlBQWEsQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hFLENBQUMsT0FBMEIsWUFBYTtxQkFDbkMsYUFBYSxFQUFFLDBDQUNkLEdBQUcsQ0FBQyxVQUFDLFNBQVMsSUFBSyxPQUFHLFNBQVMsQ0FBQyxJQUFJLFNBQUksU0FBUyxDQUFDLEtBQU8sRUFBdEMsQ0FBc0MsRUFDMUQsSUFBSSxDQUFDLEdBQUcsRUFDYixDQUFDLENBQUMsU0FBUztZQUNiLE1BQU0sRUFBMkIsWUFBYSxDQUFDLGVBQWUsRUFBRTtnQkFDOUQsQ0FBQyxPQUEwQixZQUFhLENBQUMsZUFBZSxFQUFFLDBDQUFFLElBQUksQ0FBQyxHQUFHLEVBQ3BFLENBQUMsT0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksMENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUN6QyxFQUN1QixZQUFZLENBQ3JDLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sc0NBQVMsR0FBaEIsVUFDRSxlQUlnQyxFQUNoQyxtQkFBd0UsRUFDeEUsdUJBQTJFLEVBQzNFLGFBQTZCOztRQUU3QixJQUFNLFlBQVksR0FBRywwQkFBZSxDQUFDLDZCQUE2QixDQUNoRSxlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLGlDQUFzQixDQUN2QixDQUFDO1FBQ0YsSUFBTSxlQUFlLEdBQUcsMEJBQWUsQ0FBQyx5QkFBeUIsQ0FDL0QsbUJBQW1CLEVBQ25CLHVCQUF1QixDQUN4QixDQUFDO1FBQ0YsSUFBTSxvQkFBb0IsR0FBRywwQkFBZSxDQUFDLDhCQUE4QixDQUN6RSxtQkFBbUIsRUFDbkIsdUJBQXVCLEVBQ3ZCLGFBQWEsQ0FDZCxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDaEQsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixRQUFRLEVBQUUsdUJBQXVCO1NBQ2xDLENBQUMsQ0FBQztRQUVILElBQU0sTUFBTSxHQUE0QixJQUFJLENBQUMsZ0JBQWdCLENBQzNEO1lBQ0UsTUFBTSxFQUFLLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxRQUFRLFNBQy9DLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUM5QjtZQUNGLFdBQVcsRUFBMkIsWUFBYSxDQUFDLGNBQWMsRUFBRTtnQkFDbEUsQ0FBQyxPQUEwQixZQUFhLENBQUMsY0FBYyxFQUFFLDBDQUFFLElBQUksQ0FBQyxHQUFHLEVBQ25FLENBQUMsQ0FBQyxTQUFTO1lBQ2IsYUFBYSxFQUEyQixZQUFhLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3RFLENBQUMsT0FBMEIsWUFBYSxDQUFDLGdCQUFnQixFQUFFLDBDQUFFLElBQUksQ0FBQyxHQUFHLEVBQ3JFLENBQUMsQ0FBQyxTQUFTO1NBQ2QsRUFDdUIsWUFBWSxDQUNyQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8sNkNBQWdCLEdBQXhCLFVBQ0UsTUFTQyxFQUNELEtBQXNEO1FBRXRELElBQUksZ0JBQWdCLHlCQUNmLE1BQU0sS0FDVCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ3hCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFDN0IsT0FBTyxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFDM0IsUUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFDM0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FDbkMsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsZ0JBQWdCLHlCQUNYLGdCQUFnQixLQUNuQixTQUFTLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLElBQUksRUFBRSxFQUMvQyxnQkFBZ0IsQ0FDakIsR0FDRixDQUFDO1NBQ0g7UUFFRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFFTSwyQ0FBYyxHQUFyQixVQUNFLE1BQTRCLEVBQzVCLFFBQTJDLEVBQzNDLE9BQStCLEVBQy9CLElBQXlCLEVBQ3pCLGFBQTZCO1FBRXJCLFNBQUssR0FBOEIsTUFBTSxNQUFwQyxFQUFLLG9CQUFvQixVQUFLLE1BQU0sRUFBM0MsU0FBa0MsQ0FBRixDQUFZO1FBRWxELElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUNoQyxvQkFBb0IsRUFDcEIsVUFBQyxJQUF3QjtZQUN2QixJQUFJLFlBQWdDLENBQUM7WUFDckMsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQixLQUFLLGdCQUFnQjtvQkFDbkIsWUFBWSxHQUFHLHlCQUF5QixDQUFDO29CQUN6QyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ3RCLFlBQVksSUFBSSxPQUFLLElBQUksQ0FBQyxhQUFlLENBQUM7cUJBQzNDO29CQUNELE1BQU07Z0JBQ1IsS0FBSyxrQkFBa0I7b0JBQ3JCLFlBQVk7d0JBQ1Ysd0RBQXdELENBQUM7b0JBQzNELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTt3QkFDdEIsWUFBWSxJQUFJLE9BQUssSUFBSSxDQUFDLGFBQWUsQ0FBQztxQkFDM0M7b0JBQ0QsTUFBTTtnQkFDUixLQUFLLGtCQUFrQjtvQkFDckIsWUFBWSxHQUFHLDRCQUE0QixDQUFDO29CQUM1QyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ3RCLFlBQVksSUFBSSxPQUFLLElBQUksQ0FBQyxhQUFlLENBQUM7cUJBQzNDO29CQUNELE1BQU07Z0JBQ1IsS0FBSyxpQkFBaUI7b0JBQ3BCLFlBQVksR0FBRyx3QkFBd0IsQ0FBQztvQkFDeEMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO3dCQUN0QixZQUFZLElBQUksT0FBSyxJQUFJLENBQUMsYUFBZSxDQUFDO3FCQUMzQztvQkFDRCxNQUFNO2dCQUNSLEtBQUssZUFBZTtvQkFDbEIsWUFBWSxHQUFHLGVBQWUsQ0FBQztvQkFDL0IsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO3dCQUN0QixZQUFZLElBQUksT0FBSyxJQUFJLENBQUMsYUFBZSxDQUFDO3FCQUMzQztvQkFDRCxNQUFNO2dCQUNSLFFBQVE7Z0JBQ1IsMkJBQTJCO2FBQzVCO1lBQ0QsSUFBSSxZQUFZLElBQUksYUFBYSxFQUFFO2dCQUNqQyxhQUFhLENBQUMsSUFBSSxxQkFBYSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxPQUFPO2FBQ1I7WUFDRCxJQUFJLFlBQVksRUFBRTtnQkFDaEIsVUFBVSxDQUFDO29CQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDUjtZQUVPLFdBQU8sR0FBSyxJQUFJLFFBQVQsQ0FBVTtZQUN6QixJQUFNLGVBQWUsR0FDbkIsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxlQUFlLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbEM7WUFFRCxRQUFRLENBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQXdCO2dCQUNuQyx5QkFBa0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQXhDLENBQXdDLENBQ3pDLENBQ0YsQ0FBQztRQUNKLENBQUMsRUFDRCxPQUFPLEVBQ1AsSUFBSSxFQUNKLGFBQWEsQ0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVhLGdDQUFhLEdBQTNCLFVBQTRCLE1BQXdCO1FBQ2xELElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUM5QyxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDL0MsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsSUFBSSxZQUFZLENBQUM7UUFDakIsSUFBSSxVQUFVLENBQUM7UUFDZixJQUFJLFdBQVcsQ0FBQztRQUNoQixJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksVUFBVSxDQUFDO1FBQ2YsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQU0sV0FBVyxHQUFpQixFQUFFLENBQUM7UUFDckMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQzFDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDbkQsSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxZQUFZLENBQUM7UUFDakIsSUFBSSxTQUFTLENBQUM7UUFDZCxJQUFJLGNBQWMsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQztRQUNULElBQUksWUFBWSxDQUFDO1FBQ2pCLElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxVQUFVLENBQUM7UUFDZixJQUFJLGNBQWMsQ0FBQztRQUNuQixJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksSUFBSSxDQUFDO1FBQ1QsSUFBSSxlQUFlLENBQUM7UUFDcEIsSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxnQkFBZ0IsQ0FBQztRQUNyQixJQUFNLGlCQUFpQixHQUFpQixFQUFFLENBQUM7UUFFM0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLGdCQUFnQjtZQUNqRCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtnQkFDbEMsUUFBUSxJQUFJLEVBQUU7b0JBQ1osS0FBSyxlQUFlO3dCQUNsQixZQUFZLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUMxQyxNQUFNO29CQUNSLEtBQUssT0FBTzt3QkFDVixVQUFVLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUN4QyxNQUFNO29CQUNSLEtBQUssYUFBYTt3QkFDaEIsV0FBVyxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQzt3QkFDekMsTUFBTTtvQkFDUixLQUFLLFVBQVUsQ0FBQztvQkFDaEIsS0FBSyxhQUFhO3dCQUNoQixRQUFRLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUN0QyxNQUFNO29CQUNSLEtBQUssYUFBYTt3QkFDaEIsVUFBVSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQzt3QkFDeEMsTUFBTTtvQkFDUixLQUFLLDZCQUE2QixDQUFDO29CQUNuQyxLQUFLLDZCQUE2QixDQUFDO29CQUNuQyxLQUFLLDZCQUE2QixDQUFDO29CQUNuQyxLQUFLLDZCQUE2QixDQUFDO29CQUNuQyxLQUFLLDZCQUE2Qjt3QkFDaEMsSUFBSSxJQUFJLEtBQUssNkJBQTZCLEVBQUU7NEJBQzFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7eUJBQ3JDO3dCQUVELFdBQVcsQ0FBQyxJQUFJLENBQ2Qsb0JBQVUsQ0FBQyxNQUFNLENBQUM7NEJBQ2hCLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDcEMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLFNBQVM7NEJBQ2hDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO3lCQUNsQyxDQUFDLENBQ0gsQ0FBQzt3QkFDRixNQUFNO29CQUNSLEtBQUsscUJBQXFCLENBQUM7b0JBQzNCLEtBQUsscUJBQXFCLENBQUM7b0JBQzNCLEtBQUsscUJBQXFCLENBQUM7b0JBQzNCLEtBQUsscUJBQXFCLENBQUM7b0JBQzNCLEtBQUsscUJBQXFCO3dCQUN4QixpQkFBaUIsQ0FBQyxJQUFJLENBQ3BCLG9CQUFVLENBQUMsTUFBTSxDQUFDOzRCQUNoQixLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQ3BDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTOzRCQUNoQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTt5QkFDbEMsQ0FBQyxDQUNILENBQUM7d0JBQ0YsTUFBTTtvQkFDUixLQUFLLFNBQVM7d0JBQ1osT0FBTyxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQzt3QkFDckMsV0FBVyxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzt3QkFDMUMsTUFBTTtvQkFDUixLQUFLLGdCQUFnQjt3QkFDbkIsYUFBYSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQzt3QkFDM0MsTUFBTTtvQkFDUixLQUFLLGNBQWM7d0JBQ2pCLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7d0JBQzFDLE1BQU07b0JBQ1IsS0FBSyxXQUFXO3dCQUNkLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7d0JBQ3ZDLE1BQU07b0JBQ1IsS0FBSyxpQkFBaUI7d0JBQ3BCLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7d0JBQzVDLE1BQU07b0JBQ1IsS0FBSyxNQUFNO3dCQUNULElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7d0JBQ2xDLE1BQU07b0JBQ1IsS0FBSyxjQUFjO3dCQUNqQixZQUFZLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUMxQyxNQUFNO29CQUNSLEtBQUssU0FBUzt3QkFDWixPQUFPLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUNyQyxNQUFNO29CQUNSLEtBQUssWUFBWTt3QkFDZixVQUFVLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUN4QyxNQUFNO29CQUNSLEtBQUssaUJBQWlCO3dCQUNwQixjQUFjLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUM1QyxNQUFNO29CQUNSLEtBQUssU0FBUzt3QkFDWixPQUFPLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUNyQyxNQUFNO29CQUNSLEtBQUssTUFBTTt3QkFDVCxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUNsQyxNQUFNO29CQUNSLEtBQUssbUJBQW1CO3dCQUN0QixlQUFlLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUM3QyxNQUFNO29CQUNSLEtBQUssZUFBZTt3QkFDbEIsYUFBYSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQzt3QkFDM0MsTUFBTTtvQkFDUixLQUFLLG9CQUFvQjt3QkFDdkIsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO3dCQUM5QyxNQUFNO29CQUNSLFFBQVE7aUJBQ1Q7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEdBQUcsNkJBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ3ZDLFFBQVE7WUFDUixTQUFTO1lBQ1QsZ0JBQWdCO1lBQ2hCLFlBQVk7WUFDWixVQUFVO1lBQ1YsV0FBVztZQUNYLFFBQVE7WUFDUixVQUFVO1lBQ1YsTUFBTTtZQUNOLE9BQU87WUFDUCxXQUFXO1lBQ1gsV0FBVztZQUNYLE9BQU87WUFDUCxZQUFZO1lBQ1osVUFBVTtZQUNWLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVM7WUFDVCxjQUFjO1lBQ2QsSUFBSTtZQUNKLFlBQVk7WUFDWixPQUFPO1lBQ1AsVUFBVTtZQUNWLGNBQWM7WUFDZCxPQUFPO1lBQ1AsSUFBSTtZQUNKLGVBQWU7WUFDZixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLGlCQUFpQjtTQUNsQixDQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2xCLFVBQU0sR0FBSyxNQUFNLENBQUMsUUFBUSxPQUFwQixDQUFxQjtZQUNuQyxRQUFRLEdBQXVCLENBQzdCLFFBQVEsQ0FBQyxVQUFVLENBQ2pCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUNwQixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFDcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQ3BCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUNyQixDQUNGLENBQUM7U0FDSDthQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsWUFBUSxHQUFLLE1BQU0sQ0FBQyxRQUFRLFNBQXBCLENBQXFCO1lBQ3JDLFFBQVEsR0FBdUIsQ0FDN0IsUUFBUSxDQUFDLFVBQVUsQ0FDakIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQ3RCLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUN0QixRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFDdEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQ3ZCLENBQ0YsQ0FBQztTQUNIO2FBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDdEQsY0FBYztZQUNkLFFBQVEsR0FBdUIsQ0FDN0IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FDOUQsQ0FBQztTQUNIO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVjLDRCQUFTLEdBQXhCLFVBQ0UsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLE1BQStCO1FBRS9CLElBQU0sTUFBTSxHQUFHLHNCQUFjLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUxQyxJQUFNLHFCQUFxQixHQUFHLG1DQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWxFLElBQU0sVUFBVSxHQUFHLG9CQUFZLENBQUMsMkJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFNLE1BQU0sR0FBTSxRQUFRLFNBQUksSUFBSSxlQUFlLENBQy9DLHFCQUFxQixDQUN0QixDQUFDLFFBQVEsRUFBSSxDQUFDO1FBQ2YsSUFBTSxlQUFlLEdBQUcsMkJBQW1CLENBQ3pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQ3RFLENBQUM7UUFFRixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1bkJELDZFQUF5RDtBQVF6RDtJQUFvRCwwQ0FBWTtJQU85RCxnQ0FBc0IsRUFLUztRQUo3QixlQUFXLG1CQUNYLGFBQWEscUJBQ2IsT0FBTyxlQUNKLGtCQUFrQixjQUpELDJDQUtyQixDQURzQjtRQUp2QixZQU1FLGtCQUFNLGtCQUFrQixDQUFDLFNBSTFCO1FBSEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O0lBQ3pCLENBQUM7SUFFYSw2QkFBTSxHQUFwQixVQUNFLE1BQW9DO1FBRXBDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLHlDQUFRLEdBQWY7UUFDRSw2QkFDSyxpQkFBTSxRQUFRLFdBQUUsS0FDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFDckI7SUFDSixDQUFDO0lBRU0sZ0RBQWUsR0FBdEIsVUFBdUIsV0FBcUI7UUFDMUMsT0FBTyxJQUFJLHNCQUFzQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsV0FBVyxpQkFBRyxDQUFDO0lBQ3pFLENBQUM7SUFFTSwrQ0FBYyxHQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sa0RBQWlCLEdBQXhCLFVBQXlCLGFBQXVCO1FBQzlDLE9BQU8sSUFBSSxzQkFBc0IsdUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFFLGFBQWEsbUJBQUcsQ0FBQztJQUMzRSxDQUFDO0lBRU0saURBQWdCLEdBQXZCO1FBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFTSw0Q0FBVyxHQUFsQixVQUFtQixPQUFlO1FBQ2hDLE9BQU8sSUFBSSxzQkFBc0IsdUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFFLE9BQU8sYUFBRyxDQUFDO0lBQ3JFLENBQUM7SUFFTSwyQ0FBVSxHQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLENBekRtRCxvQkFBWSxHQXlEL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakVELDhIQUF1RjtBQUE5RSwrSEFBTyxPQUFzQjtBQUN0QywwSUFBK0Y7QUFBdEYsdUlBQU8sT0FBMEI7QUFDMUMsa0lBQTJEO0FBQzNELDhIQUF1RjtBQUE5RSwrSEFBTyxPQUFzQjtBQUN0QywwSEFBdUQ7QUFDdkQsMElBQStGO0FBQXRGLHVJQUFPLE9BQTBCO0FBQzFDLGtJQUEyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04zRCwwR0FBc0U7QUFBN0QseUhBQU8sT0FBbUI7QUFFbkMsNkdBQTJDO0FBQzNDLGlHQUFnRTtBQUF2RCxtSEFBTyxPQUFnQjtBQUNoQyxtR0FBc0M7QUFDdEMsb0dBQWtFO0FBQXpELHFIQUFPLE9BQWlCO0FBQ2pDLHFHQUF1QztBQUN2QyxtR0FBbUM7QUFDbkMscUdBQW9DO0FBQ3BDLDZGQUFnQztBQUNoQyw2R0FBd0U7QUFBL0QsMkhBQU8sT0FBb0I7QUFDcEMsMkdBQTBDO0FBQzFDLG1HQUFtQztBQUNuQyxpR0FBa0M7QUFDbEMsdUdBQW9FO0FBQTNELHVIQUFPLE9BQWtCO0FBQ2xDLHVHQUF3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmeEMsNkVBQXlEO0FBUXpEO0lBQWdELHNDQUFZO0lBTzFELDRCQUFzQixFQUtLO1FBSnpCLGdCQUFZLG9CQUNaLFNBQVMsaUJBQ1QsYUFBYSxxQkFDVixrQkFBa0IsY0FKRCw4Q0FLckIsQ0FEc0I7UUFKdkIsWUFNRSxrQkFBTSxrQkFBa0IsQ0FBQyxTQUkxQjtRQUhDLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDOztJQUNyQyxDQUFDO0lBRWEseUJBQU0sR0FBcEIsVUFBcUIsTUFBZ0M7UUFDbkQsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0scUNBQVEsR0FBZjtRQUNFLDZCQUNLLGlCQUFNLFFBQVEsV0FBRSxLQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQ3pCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxJQUNqQztJQUNKLENBQUM7SUFFTSw2Q0FBZ0IsR0FBdkIsVUFBd0IsWUFBc0I7UUFDNUMsT0FBTyxJQUFJLGtCQUFrQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsWUFBWSxrQkFBRyxDQUFDO0lBQ3RFLENBQUM7SUFFTSw0Q0FBZSxHQUF0QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sMENBQWEsR0FBcEIsVUFBcUIsU0FBc0I7UUFDekMsT0FBTyxJQUFJLGtCQUFrQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsU0FBUyxlQUFHLENBQUM7SUFDbkUsQ0FBQztJQUVNLHlDQUFZLEdBQW5CO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFTSw4Q0FBaUIsR0FBeEIsVUFBeUIsYUFBdUI7UUFDOUMsT0FBTyxJQUFJLGtCQUFrQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsYUFBYSxtQkFBRyxDQUFDO0lBQ3ZFLENBQUM7SUFFTSw2Q0FBZ0IsR0FBdkI7UUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxDQXZEK0Msb0JBQVksR0F1RDNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvREQsaUdBQW9EO0FBTXBEO0lBQTRDLGtDQUFRO0lBR2xELHdCQUFzQixFQUdDO1FBRnJCLGNBQVUsa0JBQ1AsY0FBYyxjQUZHLGNBR3JCLENBRGtCO1FBRm5CLFlBSUUsa0JBQU0sY0FBYyxDQUFDLFNBRXRCO1FBREMsS0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0lBQy9CLENBQUM7SUFFYSxxQkFBTSxHQUFwQixVQUFxQixNQUE0QjtRQUMvQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxpQ0FBUSxHQUFmO1FBQ0UsNkJBQ0ssaUJBQU0sUUFBUSxXQUFFLEtBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxJQUMzQjtJQUNKLENBQUM7SUFFTSx1Q0FBYyxHQUFyQixVQUFzQixVQUFvQjtRQUN4QyxPQUFPLElBQUksY0FBYyx1QkFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixVQUFVLGdCQUNWLENBQUM7SUFDTCxDQUFDO0lBRU0sc0NBQWEsR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxDQWhDMkMsa0JBQVEsR0FnQ25EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENELDRFQVlrQjtBQUVsQix1R0FBb0M7QUFpRnBDLElBQVksc0JBR1g7QUFIRCxXQUFZLHNCQUFzQjtJQUNoQyxpRUFBdUM7SUFDdkMscUZBQTJEO0FBQzdELENBQUMsRUFIVyxzQkFBc0IsR0FBdEIsOEJBQXNCLEtBQXRCLDhCQUFzQixRQUdqQztBQVNZLG9DQUE0Qix5QkFDcEMsaUNBQXNCLEtBQ3pCLE1BQU0sRUFBRSxFQUFFLEVBQ1YsYUFBYSxFQUFFLHNCQUFzQixDQUFDLHFCQUFxQixJQUMzRDtBQUlGO0lBTUUsd0JBQ0UsZUFBd0MsRUFDeEMsT0FBc0U7UUFBdEUsb0NBQTBDLG9DQUE0QjtRQUV0RSxJQUFJLENBQUMsY0FBYyxHQUFHLGVBQWUsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyx5QkFBUSxvQ0FBNEIsR0FBSyxPQUFPLENBQUUsQ0FBQztRQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FDYix1RkFBdUYsQ0FDeEYsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVNLGdDQUFPLEdBQWQsVUFDRSxLQUE2RCxFQUM3RCxRQUF1QyxFQUN2QyxhQUE2Qjs7UUFFN0IsSUFBTSxZQUFZLEdBQUcsMEJBQWUsQ0FBQyw0QkFBNEIsQ0FDL0QsS0FBSyxFQUNMLDZCQUFrQixDQUNuQixDQUFDO1FBRUYsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FDYiwrRUFBK0UsQ0FDaEYsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDaEQsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixRQUFRLEVBQUUsa0JBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLFNBQ3hCLFlBQVksQ0FBQyxPQUFPLEVBQUUsVUFBTztTQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFNLE1BQU0sR0FBd0IsSUFBSSxDQUFDLGdCQUFnQixDQUN2RDtZQUNFLElBQUksRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFO2dCQUM1QixDQUFDLENBQUMsT0FBRyxZQUFZLENBQUMsU0FBUyxFQUFFLDBDQUFFLElBQUksaUJBQy9CLFlBQVksQ0FBQyxTQUFTLEVBQUUsMENBQUUsS0FBSyxpQkFDN0IsWUFBWSxDQUFDLFNBQVMsRUFBRSwwQ0FBRSxJQUFJLGlCQUNoQyxZQUFZLENBQUMsU0FBUyxFQUFFLDBDQUFFLEtBQUssQ0FDL0I7Z0JBQ0osQ0FBQyxDQUFDLFNBQVM7WUFDYixTQUFTLEVBQXVCLFlBQWEsQ0FBQyxZQUFZLEVBQUU7Z0JBQzFELENBQUMsQ0FBQyxPQUF3QixZQUFhLENBQUMsWUFBWSxFQUFFLDBDQUFFLFNBQVMsaUJBQ3hDLFlBQWEsQ0FBQyxZQUFZLEVBQUUsMENBQUUsUUFBUSxDQUMzRDtnQkFDSixDQUFDLENBQUMsU0FBUztZQUNiLEtBQUssRUFBdUIsWUFBYSxDQUFDLGdCQUFnQixFQUFFO2dCQUMxRCxDQUFDLE9BQXNCLFlBQWEsQ0FBQyxnQkFBZ0IsRUFBRSwwQ0FBRSxJQUFJLENBQUMsR0FBRyxFQUNqRSxDQUFDLENBQUMsU0FBUztTQUNkLEVBQ21CLFlBQVksQ0FDakMsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxrQ0FBUyxHQUFoQixVQUNFLGVBSTRCLEVBQzVCLG1CQUFvRSxFQUNwRSx1QkFBdUUsRUFDdkUsYUFBNkI7O1FBRTdCLElBQU0sWUFBWSxHQUFHLDBCQUFlLENBQUMsNkJBQTZCLENBQ2hFLGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsNkJBQWtCLENBQ25CLENBQUM7UUFDRixJQUFNLGVBQWUsR0FBRywwQkFBZSxDQUFDLHlCQUF5QixDQUMvRCxtQkFBbUIsRUFDbkIsdUJBQXVCLENBQ3hCLENBQUM7UUFDRixJQUFNLG9CQUFvQixHQUFHLDBCQUFlLENBQUMsOEJBQThCLENBQ3pFLG1CQUFtQixFQUNuQix1QkFBdUIsRUFDdkIsYUFBYSxDQUNkLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNoRCxJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLFFBQVEsRUFBRSxrQkFBZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLFNBQ2xELFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLFNBQ3JDLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxRQUFRLFVBQU87U0FDbEQsQ0FBQyxDQUFDO1FBRUgsSUFBTSxNQUFNLEdBQXdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FDdkQ7WUFDRSxXQUFXLEVBQXVCLFlBQWEsQ0FBQyxjQUFjLEVBQUU7Z0JBQzlELENBQUMsQ0FBc0IsWUFBYSxDQUFDLGNBQWMsRUFBRTtnQkFDckQsQ0FBQyxDQUFDLFNBQVM7WUFDYixLQUFLLEVBQXVCLFlBQWEsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDMUQsQ0FBQyxPQUFzQixZQUFhLENBQUMsZ0JBQWdCLEVBQUUsMENBQUUsSUFBSSxDQUFDLEdBQUcsRUFDakUsQ0FBQyxDQUFDLFNBQVM7U0FDZCxFQUNtQixZQUFZLENBQ2pDLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTyx5Q0FBZ0IsR0FBeEIsVUFDRSxNQUdDLEVBQ0QsS0FBOEM7O1FBRTlDLDZCQUNLLE1BQU0sS0FDVCxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxFQUN2QyxPQUFPLEVBQUUsS0FBSyxDQUFDLGVBQWUsRUFBRTtnQkFDOUIsQ0FBQyxPQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsMENBQUUsSUFBSSxDQUFDLEdBQUcsRUFDbkMsQ0FBQyxPQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSwwQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ3hDLFFBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQzNCLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLElBQ2xDO0lBQ0osQ0FBQztJQUVNLHVDQUFjLEdBQXJCLFVBQ0UsTUFBNEIsRUFDNUIsUUFBdUMsRUFDdkMsT0FBK0IsRUFDL0IsSUFBeUIsRUFDekIsYUFBNkI7UUFFN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQ2hDLE1BQU0sRUFDTixVQUFDLElBQW9CO1lBQ25CLFFBQVEsQ0FDTixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQW9CO2dCQUNyQyxxQkFBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFBcEMsQ0FBb0MsQ0FDckMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxFQUNELE9BQU8sRUFDUCxJQUFJLEVBQ0osYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDO0lBRWEsNEJBQWEsR0FBM0IsVUFBNEIsTUFBb0I7UUFDOUMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQzNDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDcEMsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksVUFBVSxDQUFDO1FBQ2YsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQU0sV0FBVyxHQUFpQixFQUFFLENBQUM7UUFDckMsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUVyQyxJQUFJLGNBQWtDLENBQUM7UUFDdkMsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDckMsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsUUFBUSxJQUFJLEVBQUU7Z0JBQ1osS0FBSyxVQUFVO29CQUNiLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUN4QixNQUFNO2dCQUNSLEtBQUssT0FBTztvQkFDVixRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDeEIsV0FBVyxDQUFDLElBQUksQ0FDZCxvQkFBVSxDQUFDLE1BQU0sQ0FBQzt3QkFDaEIsS0FBSyxFQUFFLENBQUM7d0JBQ1IsSUFBSSxFQUFFLFFBQVE7cUJBQ2YsQ0FBQyxDQUNILENBQUM7b0JBQ0YsTUFBTTtnQkFDUixLQUFLLFVBQVU7b0JBQ2IsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1IsS0FBSyxRQUFRO29CQUNYLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUN0QixjQUFjLEdBQUcsU0FBUyxDQUFDO29CQUMzQixJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUU7d0JBQy9ELGNBQWMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQzlEO29CQUNELFdBQVcsQ0FBQyxJQUFJLENBQ2Qsb0JBQVUsQ0FBQyxNQUFNLENBQUM7d0JBQ2hCLEtBQUssRUFBRSxDQUFDO3dCQUNSLElBQUksRUFBRSxNQUFNO3dCQUNaLElBQUksRUFBRSxjQUFjO3FCQUNyQixDQUFDLENBQ0gsQ0FBQztvQkFDRixNQUFNO2dCQUNSLEtBQUssU0FBUztvQkFDWixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDdkIsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1IsUUFBUTthQUNUO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsR0FBRyx5QkFBYyxDQUFDLE1BQU0sQ0FBQztZQUNuQyxRQUFRO1lBQ1IsU0FBUztZQUNULGdCQUFnQjtZQUNoQixZQUFZO1lBQ1osVUFBVTtZQUNWLFFBQVE7WUFDUixVQUFVO1lBQ1YsTUFBTTtZQUNOLFdBQVc7WUFDWCxPQUFPO1lBQ1AsV0FBVztZQUNYLFVBQVU7U0FDWCxDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDZixRQUFRLEdBQW1CLENBQ3pCLFFBQVEsQ0FBQyxVQUFVLENBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FDRixDQUFDO1NBQ0g7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0V0QsNkVBQXlEO0FBVXpEO0lBQWdELHNDQUFZO0lBTzFELDRCQUFzQixFQUtLO1FBSnpCLGdCQUFZLG9CQUNaLFdBQVcsbUJBQ1gsYUFBYSxxQkFDVixrQkFBa0IsY0FKRCxnREFLckIsQ0FEc0I7UUFKdkIsWUFNRSxrQkFBTSxrQkFBa0IsQ0FBQyxTQUkxQjtRQUhDLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDOztJQUNyQyxDQUFDO0lBRWEseUJBQU0sR0FBcEIsVUFBcUIsTUFBZ0M7UUFDbkQsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0scUNBQVEsR0FBZjtRQUNFLDZCQUNLLGlCQUFNLFFBQVEsV0FBRSxLQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDL0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxJQUNqQztJQUNKLENBQUM7SUFFTSw2Q0FBZ0IsR0FBdkIsVUFBd0IsWUFBc0I7UUFDNUMsT0FBTyxJQUFJLGtCQUFrQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsWUFBWSxrQkFBRyxDQUFDO0lBQ3RFLENBQUM7SUFFTSw0Q0FBZSxHQUF0QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sNENBQWUsR0FBdEIsVUFBdUIsV0FBd0I7UUFDN0MsT0FBTyxJQUFJLGtCQUFrQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsV0FBVyxpQkFBRyxDQUFDO0lBQ3JFLENBQUM7SUFFTSwyQ0FBYyxHQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sOENBQWlCLEdBQXhCLFVBQXlCLGFBQXVCO1FBQzlDLE9BQU8sSUFBSSxrQkFBa0IsdUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFFLGFBQWEsbUJBQUcsQ0FBQztJQUN2RSxDQUFDO0lBRU0sNkNBQWdCLEdBQXZCO1FBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQ0F2RCtDLG9CQUFZLEdBdUQzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRUQsOEdBQTJFO0FBQWxFLHVIQUFPLE9BQWtCO0FBQ2xDLDBIQUFtRjtBQUExRSwrSEFBTyxPQUFzQjtBQUN0QyxzSEFBbUQ7QUFDbkQsOEdBQTJFO0FBQWxFLHVIQUFPLE9BQWtCO0FBQ2xDLDhHQUErQztBQUMvQywwSEFBbUY7QUFBMUUsK0hBQU8sT0FBc0I7QUFDdEMsc0hBQW1EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05uRCw2RUFBeUQ7QUFVekQ7SUFBbUQseUNBQVk7SUFTN0QsK0JBQXNCLEVBTVE7UUFMNUIsZ0JBQVksb0JBQ1osZUFBZSx1QkFDZixPQUFPLGVBQ1AsT0FBTyxlQUNKLGtCQUFrQixjQUxELHlEQU1yQixDQURzQjtRQUx2QixZQU9FLGtCQUFNLGtCQUFrQixDQUFDLFNBYTFCO1FBWkMsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsS0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDYix3RUFBd0UsQ0FDekUsQ0FBQztTQUNIO1FBQ0QsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O0lBQ3pCLENBQUM7SUFFYSw0QkFBTSxHQUFwQixVQUNFLE1BQW1DO1FBRW5DLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLHdDQUFRLEdBQWY7UUFDRSw2QkFDSyxpQkFBTSxRQUFRLFdBQUUsS0FDbkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQy9CLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUNyQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQ3JCO0lBQ0osQ0FBQztJQUVNLGdEQUFnQixHQUF2QixVQUF3QixZQUFzQjtRQUM1QyxPQUFPLElBQUkscUJBQXFCLHVCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBRSxZQUFZLGtCQUFHLENBQUM7SUFDekUsQ0FBQztJQUVNLCtDQUFlLEdBQXRCO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxtREFBbUIsR0FBMUIsVUFBMkIsZUFBeUI7UUFDbEQsT0FBTyxJQUFJLHFCQUFxQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsZUFBZSxxQkFBRyxDQUFDO0lBQzVFLENBQUM7SUFFTSxrREFBa0IsR0FBekI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVNLDJDQUFXLEdBQWxCLFVBQW1CLE9BQVk7UUFDN0IsT0FBTyxJQUFJLHFCQUFxQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsT0FBTyxhQUFHLENBQUM7SUFDcEUsQ0FBQztJQUVNLDBDQUFVLEdBQWpCO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSwyQ0FBVyxHQUFsQixVQUFtQixPQUFnQjtRQUNqQyxPQUFPLElBQUkscUJBQXFCLHVCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBRSxPQUFPLGFBQUcsQ0FBQztJQUNwRSxDQUFDO0lBRU0sMENBQVUsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxDQTlFa0Qsb0JBQVksR0E4RTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RkQsaUdBQW9EO0FBV3BEO0lBQStDLHFDQUFRO0lBYXJELDJCQUFzQixFQVFJO1FBUHhCLGVBQVcsbUJBQ1gsS0FBSyxhQUNMLE9BQU8sZUFDUCxRQUFRLGdCQUNSLElBQUksWUFDSixXQUFXLG1CQUNSLGNBQWMsY0FQRyxzRUFRckIsQ0FEa0I7UUFQbkIsWUFTRSxrQkFBTSxjQUFjLENBQUMsU0FPdEI7UUFOQyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7SUFDakMsQ0FBQztJQUVhLHdCQUFNLEdBQXBCLFVBQXFCLE1BQStCO1FBQ2xELE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLG9DQUFRLEdBQWY7UUFDRSw2QkFDSyxpQkFBTSxRQUFRLFdBQUUsS0FDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQzdCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUM3QjtJQUNKLENBQUM7SUFFTSwyQ0FBZSxHQUF0QixVQUF1QixXQUFtQjtRQUN4QyxPQUFPLElBQUksaUJBQWlCLHVCQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLFdBQVcsaUJBQ1gsQ0FBQztJQUNMLENBQUM7SUFFTSwwQ0FBYyxHQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0scUNBQVMsR0FBaEIsVUFBaUIsS0FBYTtRQUM1QixPQUFPLElBQUksaUJBQWlCLHVCQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLEtBQUssV0FDTCxDQUFDO0lBQ0wsQ0FBQztJQUVNLG9DQUFRLEdBQWY7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLHVDQUFXLEdBQWxCLFVBQW1CLE9BQWU7UUFDaEMsT0FBTyxJQUFJLGlCQUFpQix1QkFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixPQUFPLGFBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTSxzQ0FBVSxHQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0sd0NBQVksR0FBbkIsVUFBb0IsUUFBZ0I7UUFDbEMsT0FBTyxJQUFJLGlCQUFpQix1QkFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixRQUFRLGNBQ1IsQ0FBQztJQUNMLENBQUM7SUFFTSx1Q0FBVyxHQUFsQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sb0NBQVEsR0FBZixVQUFnQixJQUFZO1FBQzFCLE9BQU8sSUFBSSxpQkFBaUIsdUJBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsSUFBSSxVQUNKLENBQUM7SUFDTCxDQUFDO0lBRU0sbUNBQU8sR0FBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sMkNBQWUsR0FBdEIsVUFBdUIsV0FBbUI7UUFDeEMsT0FBTyxJQUFJLGlCQUFpQix1QkFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixXQUFXLGlCQUNYLENBQUM7SUFDTCxDQUFDO0lBRU0sMENBQWMsR0FBckI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxDQWhIOEMsa0JBQVEsR0FnSHREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckhELDRFQVlrQjtBQUNsQix1R0FBb0M7QUFDcEMsNkVBQXNDO0FBMkV6Qix1Q0FBK0IseUJBQ3ZDLGlDQUFzQixLQUN6QixJQUFJLEVBQUUsNkJBQTZCLEVBQ25DLFNBQVMsRUFBRSxFQUFFLElBQ2I7QUFNRjtJQU1FLDJCQUNFLGVBQXdDLEVBQ3hDLE9BQTRFO1FBQTVFLG9DQUE2Qyx1Q0FBK0I7UUFFNUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8seUJBQVEsdUNBQStCLEdBQUssT0FBTyxDQUFFLENBQUM7UUFDbEUsSUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyx1Q0FBK0IsQ0FBQyxJQUFJO1lBQzFELENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQ3ZCO1lBQ0EsTUFBTSxJQUFJLEtBQUssQ0FDYix5S0FBeUssQ0FDMUssQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFDRSxLQUFtRSxFQUNuRSxRQUEwQyxFQUMxQyxhQUE2Qjs7UUFFN0IsSUFBTSxZQUFZLEdBQUcsMEJBQWUsQ0FBQyw0QkFBNEIsQ0FDL0QsS0FBSyxFQUNMLGdDQUFxQixDQUN0QixDQUFDO1FBRUYsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FDYixrR0FBa0csQ0FDbkcsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDaEQsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUN2QixRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFNLE1BQU0sR0FBMkIsSUFBSSxDQUFDLGdCQUFnQixDQUMxRDtZQUNFLENBQUMsRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQ3pCLEtBQUssRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3pDLFlBQVksRUFBMEIsWUFBYSxDQUFDLGVBQWUsRUFBRTtnQkFDbkUsQ0FBQyxPQUF5QixZQUFhLENBQUMsZUFBZSxFQUFFLDBDQUFFLElBQUksQ0FBQyxHQUFHLEVBQ25FLENBQUMsQ0FBQyxTQUFTO1lBQ2IsaUJBQWlCLEVBQTBCLENBQ3pDLFlBQVksQ0FDWixDQUFDLGtCQUFrQixFQUFFO2dCQUNyQixDQUFDLE9BQXlCLFlBQWE7cUJBQ2xDLGtCQUFrQixFQUFFLDBDQUNuQixJQUFJLENBQUMsR0FBRyxFQUNkLENBQUMsQ0FBQyxTQUFTO1lBQ2IsT0FBTyxFQUEwQixZQUFhLENBQUMsVUFBVSxFQUFFO2dCQUN6RCxDQUFDLE9BQXlCLFlBQWEsQ0FBQyxVQUFVLEVBQUUsMENBQUUsSUFBSSxDQUFDLEdBQUcsRUFDOUQsQ0FBQyxDQUFDLFNBQVM7WUFDYixPQUFPLEVBQTBCLFlBQWEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pELENBQUMsT0FBeUIsWUFBYSxDQUFDLFVBQVUsRUFBRSwwQ0FBRSxRQUFRLEdBQzlELENBQUMsQ0FBQyxTQUFTO1NBQ2QsRUFDc0IsWUFBWSxDQUNwQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLHFDQUFTLEdBQWhCLFVBQ0UsZUFJK0IsRUFDL0IsbUJBQXVFLEVBQ3ZFLHVCQUEwRSxFQUMxRSxhQUE2Qjs7UUFFN0IsSUFBTSxZQUFZLEdBQUcsMEJBQWUsQ0FBQyw2QkFBNkIsQ0FDaEUsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixnQ0FBcUIsQ0FDdEIsQ0FBQztRQUNGLElBQU0sZUFBZSxHQUFHLDBCQUFlLENBQUMseUJBQXlCLENBQy9ELG1CQUFtQixFQUNuQix1QkFBdUIsQ0FDeEIsQ0FBQztRQUNGLElBQU0sb0JBQW9CLEdBQUcsMEJBQWUsQ0FBQyw4QkFBOEIsQ0FDekUsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN2QixhQUFhLENBQ2QsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQ2hELElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDdkIsUUFBUSxFQUFFLFNBQVM7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsSUFBTSxNQUFNLEdBQTJCLElBQUksQ0FBQyxnQkFBZ0IsQ0FDMUQ7WUFDRSxHQUFHLEVBQUUsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDdEQsR0FBRyxFQUFFLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQ3ZELElBQUksRUFDRixPQUF3QixZQUFhLENBQUMsT0FBTyxFQUFFLDBDQUFFLFFBQVEsT0FBTSxJQUFJO1NBQ3RFLEVBQ3NCLFlBQVksQ0FDcEMsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQ2pCLE1BQU0sRUFDTixlQUFlLEVBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUNqQixFQUFFLEVBQ0Ysb0JBQW9CLENBQ3JCLENBQUM7SUFDSixDQUFDO0lBRU8sNENBQWdCLEdBQXhCLFVBQ0UsTUFBdUMsRUFDdkMsS0FBb0Q7UUFFcEQsNkJBQ0ssTUFBTSxLQUNULE1BQU0sRUFBRSxRQUFRLEVBQ2hCLGNBQWMsRUFBRSxHQUFHLEVBQ25CLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQ2xFLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFDcEM7SUFDSixDQUFDO0lBRU8sc0NBQVUsR0FBbEI7UUFDRSxPQUFPO1lBQ0wsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUU7WUFDMUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztTQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVNLDBDQUFjLEdBQXJCLFVBQ0UsTUFBNEIsRUFDNUIsUUFBMEMsRUFDMUMsT0FBK0IsRUFDL0IsSUFBeUIsRUFDekIsYUFBNkI7UUFFN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQ2hDLE1BQU0sRUFDTixVQUFDLElBQXVCO1lBQ3RCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsSUFBNkIsSUFBSyxDQUFDLEtBQUssRUFBRTtvQkFDeEMsSUFBTSxjQUFZLEdBQUcsNEJBQ00sSUFBSyxDQUFDLEtBQy9CLENBQUM7b0JBQ0gsSUFBSSxhQUFhLEVBQUU7d0JBQ2pCLGFBQWEsQ0FBQyxJQUFJLHFCQUFhLENBQUMsY0FBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3JELE9BQU87cUJBQ1I7b0JBQ0QsVUFBVSxDQUFDO3dCQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBWSxDQUFDLENBQUM7b0JBQ2hDLENBQUMsQ0FBQyxDQUFDO29CQUNILE9BQU87aUJBQ1I7Z0JBQ0QsT0FBTyxHQUFHLENBQWtCLElBQUksQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsUUFBUSxDQUNjLE9BQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUF1QjtnQkFDdkQsd0JBQWlCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUF2QyxDQUF1QyxDQUN4QyxDQUNGLENBQUM7UUFDSixDQUFDLEVBQ0QsT0FBTyxFQUNQLElBQUksRUFDSixhQUFhLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFFYSwrQkFBYSxHQUEzQixVQUE0QixNQUF1QjtRQUNqRCxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUNqRCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNwRSxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxJQUFJLFFBQTRCLENBQUM7UUFDakMsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRO1lBQ3hDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixXQUFPLEdBQUssTUFBTSxDQUFDLE9BQU8sUUFBbkIsQ0FBb0I7UUFDbkMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDaEQsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3hCLFlBQVEsR0FBSyxNQUFNLFNBQVgsQ0FBWTtRQUNwQixRQUFJLEdBQUssTUFBTSxLQUFYLENBQVk7UUFDeEIsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUVuQyxJQUFNLGFBQWEsR0FBK0M7WUFDaEUsTUFBTTtZQUNOLE1BQU07WUFDTixTQUFTO1lBQ1QsUUFBUTtTQUNULENBQUM7UUFDRixhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtZQUNqQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzdDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3pDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsR0FBRyw0QkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDdEMsUUFBUTtZQUNSLFNBQVM7WUFDVCxXQUFXO1lBQ1gsWUFBWTtZQUNaLFVBQVU7WUFDVixXQUFXO1lBQ1gsUUFBUTtZQUNSLFVBQVU7WUFDVixNQUFNO1lBQ04sT0FBTztZQUNQLFdBQVc7WUFDWCxLQUFLO1lBQ0wsT0FBTztZQUNQLFFBQVE7WUFDUixJQUFJO1lBQ0osV0FBVztTQUNaLENBQUMsQ0FBQztRQUVILFFBQVEsR0FBc0IsQ0FDNUIsUUFBUSxDQUFDLFVBQVUsQ0FDakIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEMsQ0FDRixDQUFDO1FBRUYsSUFBTSxXQUFXLEdBQTJCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVLEVBQUUsS0FBSztZQUNwQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzlCLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLG9CQUFVLENBQUMsTUFBTSxDQUFDO29CQUNoQixLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUM7b0JBQ2hCLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7aUJBQ3ZDLENBQUMsQ0FDSCxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZXRCw2RUFBeUQ7QUFNekQ7SUFBbUQseUNBQVk7SUFHN0QsK0JBQXNCLEVBR1E7UUFGNUIsUUFBSSxZQUNELGtCQUFrQixjQUZELFFBR3JCLENBRHNCO1FBRnZCLFlBSUUsa0JBQU0sa0JBQWtCLENBQUMsU0FFMUI7UUFEQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7SUFDbkIsQ0FBQztJQUVhLDRCQUFNLEdBQXBCLFVBQ0UsTUFBbUM7UUFFbkMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sd0NBQVEsR0FBZjtRQUNFLDZCQUNLLGlCQUFNLFFBQVEsV0FBRSxLQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFDZjtJQUNKLENBQUM7SUFFTSx3Q0FBUSxHQUFmLFVBQWdCLElBQVk7UUFDMUIsT0FBTyxJQUFJLHFCQUFxQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsSUFBSSxVQUFHLENBQUM7SUFDakUsQ0FBQztJQUVNLHVDQUFPLEdBQWQ7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxDQS9Ca0Qsb0JBQVksR0ErQjlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDRCwwSEFBb0Y7QUFBM0UsNkhBQU8sT0FBcUI7QUFDckMsMEhBQXdGO0FBQS9FLGlJQUFPLE9BQXlCO0FBQ3pDLHVIQUFxRDtBQUVyRCxzSUFBNEY7QUFBbkYscUlBQU8sT0FBeUI7QUFDekMsc0lBQWdHO0FBQXZGLHlJQUFPLE9BQTZCO0FBQzdDLCtIQUF5RDtBQUV6RCwwSEFBb0Y7QUFBM0UsNkhBQU8sT0FBcUI7QUFDckMsMEhBQXdGO0FBQS9FLGlJQUFPLE9BQXlCO0FBQ3pDLHVIQUFxRDtBQUNyRCwwSEFJOEM7QUFENUMsdUtBQStCLE9BQXVDO0FBRXhFLHNJQUE0RjtBQUFuRixxSUFBTyxPQUF5QjtBQUN6QyxzSUFBZ0c7QUFBdkYseUlBQU8sT0FBNkI7QUFDN0MsK0hBQXlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCekQsNkVBQXlEO0FBVXpEO0lBQWtELHdDQUFZO0lBUzVELDhCQUFzQixFQU1PO1FBTDNCLGdCQUFZLG9CQUNaLFNBQVMsaUJBQ1QsYUFBYSxxQkFDYixRQUFRLGdCQUNMLGtCQUFrQixjQUxELDBEQU1yQixDQURzQjtRQUx2QixZQU9FLGtCQUFNLGtCQUFrQixDQUFDLFNBZ0IxQjtRQWZDLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQ0UsYUFBYTtZQUNiLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pELGFBQWEsR0FBRyxDQUFDO2dCQUNqQixhQUFhLEdBQUcsRUFBRSxDQUFDLEVBQ3JCO1lBQ0EsTUFBTSxJQUFJLEtBQUssQ0FDYixnRUFBZ0UsQ0FDakUsQ0FBQztTQUNIO1FBQ0QsS0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0lBQzNCLENBQUM7SUFFYSwyQkFBTSxHQUFwQixVQUNFLE1BQWtDO1FBRWxDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLHVDQUFRLEdBQWY7UUFDRSw2QkFDSyxpQkFBTSxRQUFRLFdBQUUsS0FDbkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQy9CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUN6QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQ3ZCO0lBQ0osQ0FBQztJQUVNLCtDQUFnQixHQUF2QixVQUF3QixZQUFzQjtRQUM1QyxPQUFPLElBQUksb0JBQW9CLHVCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBRSxZQUFZLGtCQUFHLENBQUM7SUFDeEUsQ0FBQztJQUVNLDhDQUFlLEdBQXRCO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSw0Q0FBYSxHQUFwQixVQUFxQixTQUFzQjtRQUN6QyxPQUFPLElBQUksb0JBQW9CLHVCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBRSxTQUFTLGVBQUcsQ0FBQztJQUNyRSxDQUFDO0lBRU0sMkNBQVksR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVNLGdEQUFpQixHQUF4QixVQUF5QixhQUFxQjtRQUM1QyxPQUFPLElBQUksb0JBQW9CLHVCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBRSxhQUFhLG1CQUFHLENBQUM7SUFDekUsQ0FBQztJQUVNLCtDQUFnQixHQUF2QjtRQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRU0sMkNBQVksR0FBbkIsVUFBb0IsUUFBaUI7UUFDbkMsT0FBTyxJQUFJLG9CQUFvQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsUUFBUSxjQUFHLENBQUM7SUFDcEUsQ0FBQztJQUVNLDBDQUFXLEdBQWxCO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQ0FqRmlELG9CQUFZLEdBaUY3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0ZELGlHQUFvRDtBQVdwRDtJQUE4QyxvQ0FBUTtJQWFwRCwwQkFBc0IsRUFRRztRQVB2QixlQUFXLG1CQUNYLElBQUksWUFDSixJQUFJLFlBQ0osVUFBVSxrQkFDVixPQUFPLGVBQ1AsVUFBVSxrQkFDUCxjQUFjLGNBUEcsc0VBUXJCLENBRGtCO1FBUG5CLFlBU0Usa0JBQU0sY0FBYyxDQUFDLFNBT3RCO1FBTkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsS0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0lBQy9CLENBQUM7SUFFYSx1QkFBTSxHQUFwQixVQUFxQixNQUE4QjtRQUNqRCxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxtQ0FBUSxHQUFmO1FBQ0UsNkJBQ0ssaUJBQU0sUUFBUSxXQUFFLEtBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQ3JCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxJQUMzQjtJQUNKLENBQUM7SUFFTSwwQ0FBZSxHQUF0QixVQUF1QixXQUFtQjtRQUN4QyxPQUFPLElBQUksZ0JBQWdCLHVCQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLFdBQVcsaUJBQ1gsQ0FBQztJQUNMLENBQUM7SUFFTSx5Q0FBYyxHQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sbUNBQVEsR0FBZixVQUFnQixJQUFZO1FBQzFCLE9BQU8sSUFBSSxnQkFBZ0IsdUJBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsSUFBSSxVQUNKLENBQUM7SUFDTCxDQUFDO0lBRU0sa0NBQU8sR0FBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sbUNBQVEsR0FBZixVQUFnQixJQUFZO1FBQzFCLE9BQU8sSUFBSSxnQkFBZ0IsdUJBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsSUFBSSxVQUNKLENBQUM7SUFDTCxDQUFDO0lBRU0sa0NBQU8sR0FBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0seUNBQWMsR0FBckIsVUFBc0IsVUFBa0I7UUFDdEMsT0FBTyxJQUFJLGdCQUFnQix1QkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixVQUFVLGdCQUNWLENBQUM7SUFDTCxDQUFDO0lBRU0sd0NBQWEsR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVNLHNDQUFXLEdBQWxCLFVBQW1CLE9BQWU7UUFDaEMsT0FBTyxJQUFJLGdCQUFnQix1QkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixPQUFPLGFBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTSxxQ0FBVSxHQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0seUNBQWMsR0FBckIsVUFBc0IsVUFBa0I7UUFDdEMsT0FBTyxJQUFJLGdCQUFnQix1QkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixVQUFVLGdCQUNWLENBQUM7SUFDTCxDQUFDO0lBRU0sd0NBQWEsR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxDQWhINkMsa0JBQVEsR0FnSHJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckhELDRFQVlrQjtBQUNsQix1R0FBb0M7QUFDcEMsNkVBQXNDO0FBK1B6QixzQ0FBOEIseUJBQ3RDLGlDQUFzQixLQUN6QixNQUFNLEVBQUUsRUFBRSxJQUNWO0FBTUY7SUFNRSwwQkFDRSxlQUF3QyxFQUN4QyxPQUEwRTtRQUExRSxvQ0FBNEMsc0NBQThCO1FBRTFFLElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLHlCQUFRLHNDQUE4QixHQUFLLE9BQU8sQ0FBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUNiLHlGQUF5RixDQUMxRixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU0sa0NBQU8sR0FBZCxVQUNFLEtBQWlFLEVBQ2pFLFFBQXlDLEVBQ3pDLGFBQTZCOztRQUU3QixJQUFNLFlBQVksR0FBRywwQkFBZSxDQUFDLDRCQUE0QixDQUMvRCxLQUFLLEVBQ0wsK0JBQW9CLENBQ3JCLENBQUM7UUFFRixJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUNiLGlGQUFpRixDQUNsRixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNoRCxJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLFFBQVEsRUFBRSxpQkFBaUI7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsSUFBTSxNQUFNLEdBQTBCLElBQUksQ0FBQyxnQkFBZ0IsQ0FDekQ7WUFDRSxDQUFDLEVBQUUsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDL0IsTUFBTSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUU7Z0JBQzlCLENBQUMsQ0FBQyxPQUFHLFlBQVksQ0FBQyxTQUFTLEVBQUUsMENBQUUsSUFBSSxpQkFDL0IsWUFBWSxDQUFDLFNBQVMsRUFBRSwwQ0FBRSxLQUFLLGlCQUM3QixZQUFZLENBQUMsU0FBUyxFQUFFLDBDQUFFLElBQUksaUJBQ2hDLFlBQVksQ0FBQyxTQUFTLEVBQUUsMENBQUUsS0FBSyxDQUMvQjtnQkFDSixDQUFDLENBQUMsU0FBUztZQUNiLFNBQVMsRUFBeUIsWUFBYSxDQUFDLFlBQVksRUFBRTtnQkFDNUQsQ0FBQyxDQUFDLE9BQTBCLFlBQWEsQ0FBQyxZQUFZLEVBQUUsMENBQUUsUUFBUSxpQkFDdkMsWUFBYSxDQUFDLFlBQVksRUFBRSwwQ0FBRSxTQUFTLENBQzlEO2dCQUNKLENBQUMsQ0FBQyxTQUFTO1NBQ2QsRUFDcUIsWUFBWSxDQUNuQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLG9DQUFTLEdBQWhCLFVBQ0UsZUFJOEIsRUFDOUIsbUJBQXNFLEVBQ3RFLHVCQUF5RSxFQUN6RSxhQUE2QjtRQUU3QixJQUFNLFlBQVksR0FBRywwQkFBZSxDQUFDLDZCQUE2QixDQUNoRSxlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLCtCQUFvQixDQUNyQixDQUFDO1FBQ0YsSUFBTSxlQUFlLEdBQUcsMEJBQWUsQ0FBQyx5QkFBeUIsQ0FDL0QsbUJBQW1CLEVBQ25CLHVCQUF1QixDQUN4QixDQUFDO1FBQ0YsSUFBTSxvQkFBb0IsR0FBRywwQkFBZSxDQUFDLDhCQUE4QixDQUN6RSxtQkFBbUIsRUFDbkIsdUJBQXVCLEVBQ3ZCLGFBQWEsQ0FDZCxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDaEQsSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixRQUFRLEVBQUUsaUJBQWlCO1NBQzVCLENBQUMsQ0FBQztRQUVILElBQU0sTUFBTSxHQUEwQixJQUFJLENBQUMsZ0JBQWdCLENBQ3pEO1lBQ0UsQ0FBQyxFQUFLLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxRQUFRLFNBQzFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUM5QjtTQUNILEVBQ3FCLFlBQVksQ0FDbkMsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVPLDJDQUFnQixHQUF4QixVQUNFLE1BQWlFLEVBQ2pFLEtBQWtEOztRQUVsRCw2QkFDSyxNQUFNLEtBQ1QsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFDOUIsV0FBVyxFQUFFLEtBQUssQ0FBQyxlQUFlLEVBQUU7Z0JBQ2xDLENBQUMsT0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLDBDQUFFLElBQUksQ0FBQyxHQUFHLEVBQ25DLENBQUMsT0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksMENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUN4QyxRQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUMzQixLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUNsQyxjQUFjLFFBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLDBDQUFFLFFBQVEsSUFDbEQsU0FBUyxRQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsMENBQUUsUUFBUSxJQUN4QyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUMxRDtJQUNKLENBQUM7SUFFTSx5Q0FBYyxHQUFyQixVQUNFLE1BQTRCLEVBQzVCLFFBQXlDLEVBQ3pDLE9BQStCLEVBQy9CLElBQXlCLEVBQ3pCLGFBQTZCO1FBRTdCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUNoQyxNQUFNLEVBQ04sVUFBQyxJQUFzQjtZQUNyQixRQUFRLENBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFzQjtnQkFDdEMsdUJBQWdCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUF0QyxDQUFzQyxDQUN2QyxDQUNGLENBQUM7UUFDSixDQUFDLEVBQ0QsT0FBTyxFQUNQLElBQUksRUFDSixVQUFDLEtBQUs7WUFDSixJQUFNLFFBQVEsR0FBYSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDL0MsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQXNCO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2YsSUFBSSxjQUFvQixDQUFDO29CQUN6QixRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO3dCQUN4QixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLDRCQUEwQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDL0QsTUFBTTt3QkFDUixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLG1DQUFpQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDdEUsTUFBTTt3QkFDUixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLDJCQUF5QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDOUQsTUFBTTt3QkFDUixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLHNCQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDekQsTUFBTTt3QkFDUixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLGlDQUErQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDcEUsTUFBTTt3QkFDUixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLCtCQUE2QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDbEUsTUFBTTt3QkFDUixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLG9CQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDdkQsTUFBTTt3QkFDUixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLDZCQUEyQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDaEUsTUFBTTt3QkFDUixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLDhCQUE0QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDakUsTUFBTTt3QkFDUixLQUFLLEdBQUc7NEJBQ04sY0FBWSxHQUFHLGtDQUFnQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQzs0QkFDckUsTUFBTTt3QkFDUjs0QkFDRSxjQUFZLEdBQUcsWUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQztxQkFDeEU7b0JBQ0QsSUFBSSxhQUFhLEVBQUU7d0JBQ2pCLGFBQWEsQ0FBQyxJQUFJLHFCQUFhLENBQUMsY0FBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3JELE9BQU87cUJBQ1I7b0JBQ0QsVUFBVSxDQUFDO3dCQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBWSxDQUFDLENBQUM7b0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFYSw4QkFBYSxHQUEzQixVQUE0QixNQUFzQjs7UUFDaEQsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDckMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDdEMsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQzFDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQ3BELElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzlDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQy9CLFdBQU8sR0FBSyxNQUFNLENBQUMsVUFBVSxRQUF0QixDQUF1QjtRQUN0QyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNuRCxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDbEQsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDM0MsUUFBSSxHQUFLLE1BQU0sQ0FBQyxXQUFXLEtBQXZCLENBQXdCO1FBQ3BDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3JDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3pDLFdBQU8sR0FBSyxNQUFNLENBQUMsV0FBVyxRQUF2QixDQUF3QjtRQUN2QyxJQUFNLFVBQVUsU0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsMENBQUUsS0FBSyxDQUFDO1FBRXhELElBQU0sVUFBVSxHQUNkLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSTtZQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU87WUFDekIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVztZQUM3QixNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVc7WUFDN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJO1lBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVTtZQUM1QixNQUFNLENBQUMsVUFBVSxDQUFDLGNBQWM7WUFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztRQUV4QyxJQUFNLFdBQVcsR0FDZixNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWE7WUFDL0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYTtZQUMvQixNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVE7WUFDMUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPO1lBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTTtZQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUVoQyxJQUFNLFFBQVEsR0FDWixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUk7WUFDdEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJO1lBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWTtZQUM5QixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU87WUFDekIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUTtZQUMxQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUUxQixJQUFJLFFBQVEsR0FBRywyQkFBZ0IsQ0FBQyxNQUFNLENBQUM7WUFDckMsUUFBUTtZQUNSLFNBQVM7WUFDVCxnQkFBZ0I7WUFDaEIsWUFBWTtZQUNaLFVBQVU7WUFDVixXQUFXO1lBQ1gsUUFBUTtZQUNSLFVBQVU7WUFDVixNQUFNO1lBQ04sT0FBTztZQUNQLFdBQVc7WUFDWCxRQUFRO1lBQ1IsV0FBVztZQUNYLElBQUk7WUFDSixJQUFJO1lBQ0osVUFBVTtZQUNWLE9BQU87WUFDUCxVQUFVO1NBQ1gsQ0FBQyxDQUFDO1FBRUgsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLFFBQVEsR0FBcUIsQ0FDM0IsUUFBUSxDQUFDLFVBQVUsQ0FDakIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUM1QixDQUNGLENBQUM7U0FDSDtRQUVELElBQU0sV0FBVyxHQUdYO1lBQ0osRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUU7WUFDM0MsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUU7U0FDOUMsQ0FBQztRQUNGLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFvQixFQUFFLEtBQUs7Z0JBQXpCLE9BQU8sZUFBRSxPQUFPO1lBQ3JDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDOUIsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsb0JBQVUsQ0FBQyxNQUFNLENBQUM7b0JBQ2hCLEtBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQztvQkFDaEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtvQkFDdEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUztpQkFDOUMsQ0FBQyxDQUNILENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDamtCRCw2RUFBeUQ7QUFRekQ7SUFBa0Qsd0NBQVk7SUFPNUQsOEJBQXNCLEVBS087UUFKM0IsZ0JBQVksb0JBQ1osYUFBYSxxQkFDYixRQUFRLGdCQUNMLGtCQUFrQixjQUpELDZDQUtyQixDQURzQjtRQUp2QixZQU1FLGtCQUFNLGtCQUFrQixDQUFDLFNBZTFCO1FBZEMsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFDRSxhQUFhO1lBQ2IsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO2dCQUN2QixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDakQsYUFBYSxHQUFHLENBQUM7Z0JBQ2pCLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFDckI7WUFDQSxNQUFNLElBQUksS0FBSyxDQUNiLGdFQUFnRSxDQUNqRSxDQUFDO1NBQ0g7UUFDRCxLQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7SUFDM0IsQ0FBQztJQUVhLDJCQUFNLEdBQXBCLFVBQ0UsTUFBa0M7UUFFbEMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sdUNBQVEsR0FBZjtRQUNFLDZCQUNLLGlCQUFNLFFBQVEsV0FBRSxLQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDL0IsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQ2pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUN2QjtJQUNKLENBQUM7SUFFTSwrQ0FBZ0IsR0FBdkIsVUFBd0IsWUFBc0I7UUFDNUMsT0FBTyxJQUFJLG9CQUFvQix1QkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUUsWUFBWSxrQkFBRyxDQUFDO0lBQ3hFLENBQUM7SUFFTSw4Q0FBZSxHQUF0QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sZ0RBQWlCLEdBQXhCLFVBQXlCLGFBQXFCO1FBQzVDLE9BQU8sSUFBSSxvQkFBb0IsdUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFFLGFBQWEsbUJBQUcsQ0FBQztJQUN6RSxDQUFDO0lBRU0sK0NBQWdCLEdBQXZCO1FBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFTSwyQ0FBWSxHQUFuQixVQUFvQixRQUFpQjtRQUNuQyxPQUFPLElBQUksb0JBQW9CLHVCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBRSxRQUFRLGNBQUcsQ0FBQztJQUNwRSxDQUFDO0lBRU0sMENBQVcsR0FBbEI7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxDQXBFaUQsb0JBQVksR0FvRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVFRCxzSEFBaUY7QUFBeEUsMkhBQU8sT0FBb0I7QUFDcEMsa0lBQXlGO0FBQWhGLG1JQUFPLE9BQXdCO0FBQ3hDLDRIQUF1RDtBQUN2RCxzSEFBaUY7QUFBeEUsMkhBQU8sT0FBb0I7QUFDcEMsb0hBQW1EO0FBQ25ELGtJQUF5RjtBQUFoRixtSUFBTyxPQUF3QjtBQUN4Qyw0SEFBdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnZELG1GQUFnRDtBQWNoRDtJQWlCRSxzQkFBc0IsRUFTRDtZQVJuQixJQUFJLFlBQ0osRUFBRSxVQUNGLEtBQUssYUFDTCxJQUFJLFlBQ0osS0FBSyxhQUNMLElBQUksWUFDSixNQUFNLGNBQ04sYUFBNEIsRUFBNUIsS0FBSyxtQkFBRywrQkFBb0I7UUFWYixVQUFLLEdBQVcsK0JBQW9CLENBQUM7UUFZcEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFYSxtQkFBTSxHQUFwQixVQUFxQixNQUEwQjtRQUM3QyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSwrQkFBUSxHQUFmO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNsQixDQUFDO0lBQ0osQ0FBQztJQUVNLCtCQUFRLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixPQUE2QixJQUFJLENBQUMsV0FBWSxDQUFDLE1BQU0sdUJBQ2hELElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsSUFBSSxVQUNKLENBQUM7SUFDTCxDQUFDO0lBRU0sNkJBQU0sR0FBYixVQUFjLEVBQVU7UUFDdEIsT0FBNkIsSUFBSSxDQUFDLFdBQVksQ0FBQyxNQUFNLHVCQUNoRCxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLEVBQUUsUUFDRixDQUFDO0lBQ0wsQ0FBQztJQUVNLGlDQUFVLEdBQWpCLFVBQ0UsS0FBYyxFQUNkLElBQWEsRUFDYixLQUFjLEVBQ2QsSUFBYTtRQUViLE9BQTZCLElBQUksQ0FBQyxXQUFZLENBQUMsTUFBTSx1QkFDaEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixLQUFLO1lBQ0wsSUFBSTtZQUNKLEtBQUs7WUFDTCxJQUFJLFVBQ0osQ0FBQztJQUNMLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixNQUFjO1FBQzlCLE9BQTZCLElBQUksQ0FBQyxXQUFZLENBQUMsTUFBTSx1QkFDaEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixNQUFNLFlBQ04sQ0FBQztJQUNMLENBQUM7SUFFTSxnQ0FBUyxHQUFoQixVQUFpQixLQUFhO1FBQzVCLE9BQTZCLElBQUksQ0FBQyxXQUFZLENBQUMsTUFBTSx1QkFDaEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUNsQixLQUFLLFdBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTSw4QkFBTyxHQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFTSw0QkFBSyxHQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxnQ0FBUyxHQUFoQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzFELE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBRUQsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2hCLENBQUM7SUFDSixDQUFDO0lBRU0sZ0NBQVMsR0FBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVNLCtCQUFRLEdBQWY7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUlELG1GQUFnRDtBQVVoRDtJQVNFLHNCQUFzQixFQUtEO1lBSm5CLFFBQVEsZ0JBQ1IsU0FBUyxpQkFDVCxNQUFNLGNBQ04sYUFBNEIsRUFBNUIsS0FBSyxtQkFBRywrQkFBb0I7UUFOYixVQUFLLEdBQVcsK0JBQW9CLENBQUM7UUFRcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVhLG1CQUFNLEdBQXBCLFVBQXFCLE1BQTBCO1FBQzdDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLCtCQUFRLEdBQWY7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBRU0sc0NBQWUsR0FBdEIsVUFBdUIsUUFBZ0IsRUFBRSxTQUFpQjtRQUN4RCxPQUE2QixJQUFJLENBQUMsV0FBWSxDQUFDLE1BQU0sdUJBQ2hELElBQUksQ0FBQyxRQUFRLEVBQUUsS0FDbEIsUUFBUTtZQUNSLFNBQVMsZUFDVCxDQUFDO0lBQ0wsQ0FBQztJQUVNLGlDQUFVLEdBQWpCLFVBQWtCLE1BQWM7UUFDOUIsT0FBNkIsSUFBSSxDQUFDLFdBQVksQ0FBQyxNQUFNLHVCQUNoRCxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLE1BQU0sWUFDTixDQUFDO0lBQ0wsQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQWlCLEtBQWE7UUFDNUIsT0FBNkIsSUFBSSxDQUFDLFdBQVksQ0FBQyxNQUFNLHVCQUNoRCxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQ2xCLEtBQUssV0FDTCxDQUFDO0lBQ0wsQ0FBQztJQUVNLHFDQUFjLEdBQXJCO1FBQ0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEUsQ0FBQztJQUVNLGdDQUFTLEdBQWhCO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSwrQkFBUSxHQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0VELDhGQUE2RDtBQUFwRCxtSEFBTyxPQUFnQjtBQUNoQyxnR0FBbUM7QUFDbkMsOEZBQTZEO0FBQXBELG1IQUFPLE9BQWdCO0FBQ2hDLGdHQUFtQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0h0QixpQkFBUyxHQUFHLGNBQWUsY0FBTyxNQUFNLEtBQUssV0FBVyxFQUE3QixDQUE2QixDQUFDO0FBRXpELG1DQUEyQixHQUFHLFVBQ3pDLE1BQXFDO0lBRXJDLGFBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBc0IsRUFBRSxHQUFHO1FBQ3JELElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBUE4sQ0FPTSxDQUFDO0FBRVQ7O0dBRUc7QUFDVSwyQkFBbUIsR0FBRyxVQUFDLElBQVk7SUFDOUMsV0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7QUFBMUMsQ0FBMEMsQ0FBQztBQUU3Qzs7R0FFRztBQUNVLDJCQUFtQixHQUFHLFVBQUMsTUFBYztJQUNoRCxhQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztBQUE5QyxDQUE4QyxDQUFDO0FBRXBDLG9CQUFZLEdBQUcsVUFBQyxNQUFjO0lBQ3pDLElBQUksaUJBQVMsRUFBRSxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0tBQ3pFO0lBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNsRCxDQUFDLENBQUM7QUFFRixnREFBZ0Q7QUFDaEQsSUFBTSxVQUFVLEdBQ2QsZ0dBQWdHLENBQUM7QUFDdEYsY0FBTSxHQUFHLFVBQUMsRUFBVTtJQUMvQixXQUFJLE1BQU0sQ0FBQyxNQUFJLFVBQVUsTUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUF0QyxDQUFzQyxDQUFDO0FBRXpDLGdEQUFnRDtBQUNoRCxJQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztBQUNuQyxJQUFNLFVBQVUsR0FBRyxTQUFPLE9BQU8sZ0JBQVcsT0FBTyxlQUFVLE9BQU8sZ0JBQVcsVUFBVSxVQUFLLE9BQU8sZUFBVSxPQUFPLGlCQUFZLFVBQVUsV0FBTSxPQUFPLHFCQUFnQixPQUFPLGtCQUFhLE9BQU8sZUFBVSxVQUFVLFdBQU0sT0FBTyxxQkFBZ0IsT0FBTyxrQkFBYSxPQUFPLGVBQVUsVUFBVSxXQUFNLE9BQU8scUJBQWdCLE9BQU8sa0JBQWEsT0FBTyxlQUFVLFVBQVUsV0FBTSxPQUFPLHFCQUFnQixPQUFPLGtCQUFhLE9BQU8sZUFBVSxVQUFVLFdBQU0sT0FBTywyQkFBc0IsT0FBTyxlQUFVLFVBQVUsYUFBUSxPQUFPLG1DQUFnQyxDQUFDO0FBQzdoQixjQUFNLEdBQUcsVUFBQyxFQUFVO0lBQy9CLFdBQUksTUFBTSxDQUFDLE1BQUksVUFBVSxNQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQXRDLENBQXNDLENBQUM7QUFFekMsd0RBQXdEO0FBQzNDLHNCQUFjLEdBQUc7SUFDNUIscUNBQXFDO0lBQ3JDLGNBQU8sT0FBdUIsS0FBSyxVQUFVO1FBQzNDLENBQUMsQ0FBQyxxQ0FBcUM7WUFDckMsT0FBdUI7UUFDekIsQ0FBQyxDQUFDLDJDQUFPO0FBSFgsQ0FHVyxDQUFDIiwiZmlsZSI6InVuaXZlcnNhbC1nZW9jb2Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsInZhciBfX3NlbGZfXyA9IChmdW5jdGlvbiAocm9vdCkge1xuZnVuY3Rpb24gRigpIHtcbnRoaXMuZmV0Y2ggPSBmYWxzZTtcbnRoaXMuRE9NRXhjZXB0aW9uID0gcm9vdC5ET01FeGNlcHRpb25cbn1cbkYucHJvdG90eXBlID0gcm9vdDtcbnJldHVybiBuZXcgRigpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuKGZ1bmN0aW9uKHNlbGYpIHtcblxudmFyIGlycmVsZXZhbnQgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6XG4gICAgICAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJlxuICAgICAgJ0Jsb2InIGluIHNlbGYgJiZcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBuZXcgQmxvYigpO1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfTtcblxuICBmdW5jdGlvbiBpc0RhdGFWaWV3KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdO1xuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID1cbiAgICAgIEFycmF5QnVmZmVyLmlzVmlldyB8fFxuICAgICAgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSk7XG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLl5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9O1xuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKTtcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXTtcbiAgICB0aGlzLm1hcFtuYW1lXSA9IG9sZFZhbHVlID8gb2xkVmFsdWUgKyAnLCAnICsgdmFsdWUgOiB2YWx1ZTtcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgIGl0ZW1zLnB1c2gobmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgIGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9O1xuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXM7XG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpO1xuICAgICAgfTtcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpO1xuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcik7XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYik7XG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aCk7XG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKTtcbiAgICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHk7XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcik7XG4gICAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pO1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpO1xuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBjb25zdW1lZCh0aGlzKSB8fCBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpO1xuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddO1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keTtcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmw7XG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHM7XG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kO1xuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZTtcbiAgICAgIHRoaXMuc2lnbmFsID0gaW5wdXQuc2lnbmFsO1xuICAgICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXQ7XG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpO1xuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ3NhbWUtb3JpZ2luJztcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKTtcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGw7XG4gICAgdGhpcy5zaWduYWwgPSBvcHRpb25zLnNpZ25hbCB8fCB0aGlzLnNpZ25hbDtcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbDtcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSk7XG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7Ym9keTogdGhpcy5fYm9keUluaXR9KVxuICB9O1xuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICBib2R5XG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoJyYnKVxuICAgICAgLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKTtcbiAgICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvZywgJyAnKTtcbiAgICBwcmVQcm9jZXNzZWRIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6Jyk7XG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKCk7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKCk7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoZWFkZXJzXG4gIH1cblxuICBCb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnO1xuICAgIHRoaXMuc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgPT09IHVuZGVmaW5lZCA/IDIwMCA6IG9wdGlvbnMuc3RhdHVzO1xuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDA7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snO1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJztcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdCk7XG4gIH1cblxuICBCb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9O1xuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSk7XG4gICAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcic7XG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH07XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdO1xuXG4gIFJlc3BvbnNlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsLCBzdGF0dXMpIHtcbiAgICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG4gIH07XG5cbiAgZXhwb3J0cy5ET01FeGNlcHRpb24gPSBzZWxmLkRPTUV4Y2VwdGlvbjtcbiAgdHJ5IHtcbiAgICBuZXcgZXhwb3J0cy5ET01FeGNlcHRpb24oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24gPSBmdW5jdGlvbihtZXNzYWdlLCBuYW1lKSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHZhciBlcnJvciA9IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgdGhpcy5zdGFjayA9IGVycm9yLnN0YWNrO1xuICAgIH07XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuICAgIGV4cG9ydHMuRE9NRXhjZXB0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGV4cG9ydHMuRE9NRXhjZXB0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcblxuICAgICAgaWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgZXhwb3J0cy5ET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKVxuICAgICAgfVxuXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIGZ1bmN0aW9uIGFib3J0WGhyKCkge1xuICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgIH1cblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKTtcbiAgICAgICAgdmFyIGJvZHkgPSAncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgZXhwb3J0cy5ET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdvbWl0Jykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVxdWVzdC5zaWduYWwpIHtcbiAgICAgICAgcmVxdWVzdC5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocik7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIERPTkUgKHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHJlcXVlc3Quc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRYaHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdCk7XG4gICAgfSlcbiAgfVxuXG4gIGZldGNoLnBvbHlmaWxsID0gdHJ1ZTtcblxuICBpZiAoIXNlbGYuZmV0Y2gpIHtcbiAgICBzZWxmLmZldGNoID0gZmV0Y2g7XG4gICAgc2VsZi5IZWFkZXJzID0gSGVhZGVycztcbiAgICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0O1xuICAgIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZTtcbiAgfVxuXG4gIGV4cG9ydHMuSGVhZGVycyA9IEhlYWRlcnM7XG4gIGV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gIGV4cG9ydHMuUmVzcG9uc2UgPSBSZXNwb25zZTtcbiAgZXhwb3J0cy5mZXRjaCA9IGZldGNoO1xuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KHt9KSk7XG59KShfX3NlbGZfXyk7XG5kZWxldGUgX19zZWxmX18uZmV0Y2gucG9seWZpbGxcbmV4cG9ydHMgPSBfX3NlbGZfXy5mZXRjaCAvLyBUbyBlbmFibGU6IGltcG9ydCBmZXRjaCBmcm9tICdjcm9zcy1mZXRjaCdcbmV4cG9ydHMuZGVmYXVsdCA9IF9fc2VsZl9fLmZldGNoIC8vIEZvciBUeXBlU2NyaXB0IGNvbnN1bWVycyB3aXRob3V0IGVzTW9kdWxlSW50ZXJvcC5cbmV4cG9ydHMuZmV0Y2ggPSBfX3NlbGZfXy5mZXRjaCAvLyBUbyBlbmFibGU6IGltcG9ydCB7ZmV0Y2h9IGZyb20gJ2Nyb3NzLWZldGNoJ1xuZXhwb3J0cy5IZWFkZXJzID0gX19zZWxmX18uSGVhZGVyc1xuZXhwb3J0cy5SZXF1ZXN0ID0gX19zZWxmX18uUmVxdWVzdFxuZXhwb3J0cy5SZXNwb25zZSA9IF9fc2VsZl9fLlJlc3BvbnNlXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNcbiIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gZnVuY3Rpb24oKSB7IHJldHVybiBbXTsgfTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL3NyYyBzeW5jIHJlY3Vyc2l2ZVwiOyIsImV4cG9ydCBpbnRlcmZhY2UgQWRtaW5MZXZlbE9iamVjdCB7XG4gIHJlYWRvbmx5IGxldmVsOiBudW1iZXI7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgY29kZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRtaW5MZXZlbCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGV2ZWw6IG51bWJlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IGNvZGU/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih7IGxldmVsLCBuYW1lLCBjb2RlIH06IEFkbWluTGV2ZWxPYmplY3QpIHtcbiAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob2JqZWN0OiBBZG1pbkxldmVsT2JqZWN0KTogQWRtaW5MZXZlbCB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9PYmplY3QoKTogQWRtaW5MZXZlbE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxldmVsOiB0aGlzLmxldmVsLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0TGV2ZWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5sZXZlbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb2RlKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29kZTtcbiAgfVxufVxuIiwiaW1wb3J0IGZldGNoIGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuaW1wb3J0IHsgRXJyb3JDYWxsYmFjayB9IGZyb20gXCJwcm92aWRlclwiO1xuaW1wb3J0IHsgUmVzcG9uc2VFcnJvciB9IGZyb20gXCJlcnJvclwiO1xuaW1wb3J0IHsgaXNCcm93c2VyLCBmaWx0ZXJVbmRlZmluZWRPYmplY3RWYWx1ZXMgfSBmcm9tIFwidXRpbHNcIjtcbmltcG9ydCB7IFBhcnRpYWxTb21lIH0gZnJvbSBcInR5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZXJuYWxMb2FkZXJJbnRlcmZhY2Uge1xuICBzZXRPcHRpb25zKG9wdGlvbnM6IFBhcnRpYWxTb21lPEV4dGVybmFsTG9hZGVyT3B0aW9ucywgXCJtZXRob2RcIj4pOiB2b2lkO1xuICBnZXRPcHRpb25zKCk6IEV4dGVybmFsTG9hZGVyT3B0aW9ucztcbiAgZXhlY3V0ZVJlcXVlc3QoXG4gICAgcGFyYW1zOiBFeHRlcm5hbExvYWRlclBhcmFtcyxcbiAgICBjYWxsYmFjazogUmVzcG9uc2VDYWxsYmFjayxcbiAgICBoZWFkZXJzPzogRXh0ZXJuYWxMb2FkZXJIZWFkZXJzLFxuICAgIGJvZHk/OiBFeHRlcm5hbExvYWRlckJvZHksXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFeHRlcm5hbExvYWRlck9wdGlvbnMge1xuICByZWFkb25seSBwcm90b2NvbDogc3RyaW5nO1xuICByZWFkb25seSBob3N0Pzogc3RyaW5nO1xuICByZWFkb25seSBwYXRobmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgbWV0aG9kOiBcIkdFVFwiIHwgXCJQT1NUXCI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZXJuYWxMb2FkZXJCb2R5IHtcbiAgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZXJuYWxMb2FkZXJQYXJhbXMge1xuICBbcGFyYW06IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAganNvbnBDYWxsYmFjaz86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFeHRlcm5hbExvYWRlckhlYWRlcnMge1xuICBbaGVhZGVyOiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG50eXBlIFJlc3BvbnNlQ2FsbGJhY2sgPSAocmVzcG9uc2U6IGFueSkgPT4gdm9pZDtcblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IEV4dGVybmFsTG9hZGVyT3B0aW9ucyA9IHtcbiAgcHJvdG9jb2w6IFwiaHR0cFwiLFxuICBtZXRob2Q6IFwiR0VUXCIsXG59O1xuXG4vKipcbiAqIExvYWQgZGF0YSBmcm9tIGV4dGVybmFsIGdlb2NvZGluZyBlbmdpbmVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHRlcm5hbExvYWRlciBpbXBsZW1lbnRzIEV4dGVybmFsTG9hZGVySW50ZXJmYWNlIHtcbiAgcHJpdmF0ZSBvcHRpb25zOiBFeHRlcm5hbExvYWRlck9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgb3B0aW9uczogUGFydGlhbFNvbWU8RXh0ZXJuYWxMb2FkZXJPcHRpb25zLCBcIm1ldGhvZFwiPiA9IGRlZmF1bHRPcHRpb25zXG4gICkge1xuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRPcHRpb25zKFxuICAgIG9wdGlvbnM6IFBhcnRpYWxTb21lPEV4dGVybmFsTG9hZGVyT3B0aW9ucywgXCJtZXRob2RcIj5cbiAgKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zID0geyAuLi5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICB9XG5cbiAgcHVibGljIGdldE9wdGlvbnMoKTogRXh0ZXJuYWxMb2FkZXJPcHRpb25zIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGVSZXF1ZXN0KFxuICAgIHBhcmFtczogRXh0ZXJuYWxMb2FkZXJQYXJhbXMsXG4gICAgY2FsbGJhY2s6IFJlc3BvbnNlQ2FsbGJhY2ssXG4gICAgZXh0ZXJuYWxMb2FkZXJIZWFkZXJzPzogRXh0ZXJuYWxMb2FkZXJIZWFkZXJzLFxuICAgIGJvZHk/OiBFeHRlcm5hbExvYWRlckJvZHksXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBwcm90b2NvbCwgaG9zdCwgcGF0aG5hbWUsIG1ldGhvZCB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgaWYgKCFob3N0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIGhvc3QgaXMgcmVxdWlyZWQgZm9yIHRoZSBleHRlcm5hbCBsb2FkZXIuXCIpO1xuICAgIH1cbiAgICBpZiAoIXBhdGhuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHBhdGhuYW1lIGlzIHJlcXVpcmVkIGZvciB0aGUgZXh0ZXJuYWwgbG9hZGVyLlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0VXJsID0gbmV3IFVSTChgJHtwcm90b2NvbH06Ly8ke2hvc3R9LyR7cGF0aG5hbWV9YCk7XG5cbiAgICBjb25zdCB7IGpzb25wQ2FsbGJhY2ssIC4uLnJlcXVlc3RQYXJhbXMgfSA9IHBhcmFtcztcblxuICAgIGNvbnN0IGZpbHRlcmVkUmVxdWVzdFBhcmFtcyA9IGZpbHRlclVuZGVmaW5lZE9iamVjdFZhbHVlcyhyZXF1ZXN0UGFyYW1zKTtcbiAgICBPYmplY3Qua2V5cyhmaWx0ZXJlZFJlcXVlc3RQYXJhbXMpLmZvckVhY2goKHBhcmFtS2V5KSA9PlxuICAgICAgcmVxdWVzdFVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKFxuICAgICAgICBwYXJhbUtleSxcbiAgICAgICAgZmlsdGVyZWRSZXF1ZXN0UGFyYW1zW3BhcmFtS2V5XSA/PyBcIlwiXG4gICAgICApXG4gICAgKTtcblxuICAgIGlmIChqc29ucENhbGxiYWNrKSB7XG4gICAgICBFeHRlcm5hbExvYWRlci5ydW5Kc29ucENhbGxiYWNrKHJlcXVlc3RVcmwsIGNhbGxiYWNrLCBqc29ucENhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBoZWFkZXJzID0gZmlsdGVyVW5kZWZpbmVkT2JqZWN0VmFsdWVzKGV4dGVybmFsTG9hZGVySGVhZGVycyB8fCB7fSk7XG4gICAgZmV0Y2gocmVxdWVzdFVybC50b1N0cmluZygpLCB7XG4gICAgICBoZWFkZXJzLFxuICAgICAgbWV0aG9kLFxuICAgICAgYm9keTogbWV0aG9kID09PSBcIlBPU1RcIiA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLFxuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgIHRocm93IG5ldyBSZXNwb25zZUVycm9yKFxuICAgICAgICAgICAgYFJlY2VpdmVkIEhUVFAgc3RhdHVzIGNvZGUgJHtyZXNwb25zZS5zdGF0dXN9IHdoZW4gYXR0ZW1wdGluZyBnZW9jb2RpbmcgcmVxdWVzdC5gLFxuICAgICAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGNhbGxiYWNrKGRhdGEpKVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3JDYWxsYmFjayAmJiBlcnJvciBpbnN0YW5jZW9mIFJlc3BvbnNlRXJyb3IpIHtcbiAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBydW5Kc29ucENhbGxiYWNrKFxuICAgIHJlcXVlc3RVcmw6IFVSTCxcbiAgICBjYWxsYmFjazogUmVzcG9uc2VDYWxsYmFjayxcbiAgICBqc29ucENhbGxiYWNrOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnXCJqc29ucENhbGxiYWNrXCIgcGFyYW1ldGVyIGNhbiBvbmx5IGJlIHVzZWQgaW4gYSBicm93c2VyIGVudmlyb25tZW50LidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVxdWVzdFVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKFxuICAgICAganNvbnBDYWxsYmFjayxcbiAgICAgIEV4dGVybmFsTG9hZGVyLmdlbmVyYXRlSnNvbnBDYWxsYmFjayhjYWxsYmFjaylcbiAgICApO1xuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHNjcmlwdCBlbGVtZW50LlxuICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXG4gICAgLy8gU2V0IGl0cyBzb3VyY2UgdG8gdGhlIEpTT05QIEFQSS5cbiAgICBzY3JpcHRFbGVtZW50LnNyYyA9IHJlcXVlc3RVcmwudG9TdHJpbmcoKTtcblxuICAgIC8vIFN0aWNrIHRoZSBzY3JpcHQgZWxlbWVudCBpbiB0aGUgcGFnZSA8aGVhZD4uXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyByYW5kb21seS1uYW1lZCBmdW5jdGlvbiB0byB1c2UgYXMgYSBjYWxsYmFjayBmb3IgSlNPTlAgcmVxdWVzdHMuXG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL09zY2FyR29kc29uL0pTT05QXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBnZW5lcmF0ZUpzb25wQ2FsbGJhY2soY2FsbGJhY2s6IFJlc3BvbnNlQ2FsbGJhY2spOiBzdHJpbmcge1xuICAgIC8vIFVzZSB0aW1lc3RhbXAgKyBhIHJhbmRvbSBmYWN0b3IgdG8gYWNjb3VudCBmb3IgYSBsb3Qgb2YgcmVxdWVzdHMgaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIGUuZy4ganNvbnAxMzk0NTcxNzc1MTYxLlxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgZ2VuZXJhdGVkRnVuY3Rpb24gPSBganNvbnAke01hdGgucm91bmQoXG4gICAgICB0aW1lc3RhbXAgKyBNYXRoLnJhbmRvbSgpICogMTAwMDAwMVxuICAgICl9YDtcblxuICAgIC8vIEdlbmVyYXRlIHRoZSB0ZW1wIEpTT05QIGZ1bmN0aW9uIHVzaW5nIHRoZSBuYW1lIGFib3ZlLlxuICAgIC8vIEZpcnN0LCBjYWxsIHRoZSBmdW5jdGlvbiB0aGUgdXNlciBkZWZpbmVkIGluIHRoZSBjYWxsYmFjayBwYXJhbSBbY2FsbGJhY2soanNvbildLlxuICAgIC8vIFRoZW4gZGVsZXRlIHRoZSBnZW5lcmF0ZWQgZnVuY3Rpb24gZnJvbSB0aGUgd2luZG93IFtkZWxldGUgd2luZG93W2dlbmVyYXRlZEZ1bmN0aW9uXV0uXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAoPGFueT53aW5kb3cpW2dlbmVyYXRlZEZ1bmN0aW9uXSA9IChqc29uOiBzdHJpbmcpID0+IHtcbiAgICAgIGNhbGxiYWNrKGpzb24pO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIGRlbGV0ZSAoPGFueT53aW5kb3cpW2dlbmVyYXRlZEZ1bmN0aW9uXTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGdlbmVyYXRlZEZ1bmN0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQgR2VvY29kZWQgZnJvbSBcIkdlb2NvZGVkXCI7XG5pbXBvcnQgQWRtaW5MZXZlbCwgeyBBZG1pbkxldmVsT2JqZWN0IH0gZnJvbSBcIkFkbWluTGV2ZWxcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHZW9Kc29uIHtcbiAgcmVhZG9ubHkgdHlwZTogXCJGZWF0dXJlXCI7XG4gIHJlYWRvbmx5IHByb3BlcnRpZXM6IHtcbiAgICByZWFkb25seSBbcHJvcGVydHk6IHN0cmluZ106XG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBzdHJpbmdbXVxuICAgICAgfCBudW1iZXJcbiAgICAgIHwgYm9vbGVhblxuICAgICAgfCBBZG1pbkxldmVsW11cbiAgICAgIHwgQWRtaW5MZXZlbE9iamVjdFtdXG4gICAgICB8IHVuZGVmaW5lZDtcbiAgfTtcbiAgcmVhZG9ubHkgZ2VvbWV0cnk6IHtcbiAgICByZWFkb25seSB0eXBlOiBcIlBvaW50XCI7XG4gICAgcmVhZG9ubHkgY29vcmRpbmF0ZXM6IFtudW1iZXIgfCB1bmRlZmluZWQsIG51bWJlciB8IHVuZGVmaW5lZF07XG4gIH07XG4gIHJlYWRvbmx5IGJvdW5kcz86IHtcbiAgICByZWFkb25seSBzb3V0aDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHdlc3Q6IG51bWJlcjtcbiAgICByZWFkb25seSBub3J0aDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGVhc3Q6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VvSnNvbkR1bXBlciB7XG4gIHByaXZhdGUgc3RhdGljIGJhc2VHZW9Kc29uOiBHZW9Kc29uID0ge1xuICAgIHR5cGU6IFwiRmVhdHVyZVwiLFxuICAgIHByb3BlcnRpZXM6IHt9LFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB0eXBlOiBcIlBvaW50XCIsXG4gICAgICBjb29yZGluYXRlczogW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgICB9LFxuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgZHVtcChnZW9jb2RlZDogR2VvY29kZWQpOiBHZW9Kc29uIHtcbiAgICBsZXQgcmVzdWx0ID0gR2VvSnNvbkR1bXBlci5iYXNlR2VvSnNvbjtcbiAgICByZXN1bHQgPSB7XG4gICAgICAuLi5yZXN1bHQsXG4gICAgICAuLi57XG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgLi4ucmVzdWx0Lmdlb21ldHJ5LFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbZ2VvY29kZWQuZ2V0TG9uZ2l0dWRlKCksIGdlb2NvZGVkLmdldExhdGl0dWRlKCldLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIGxhdGl0dWRlLFxuICAgICAgbG9uZ2l0dWRlLFxuICAgICAgc291dGgsXG4gICAgICB3ZXN0LFxuICAgICAgbm9ydGgsXG4gICAgICBlYXN0LFxuICAgICAgYWRtaW5MZXZlbHMsXG4gICAgICAuLi5nZW9jb2RlZFByb3BlcnRpZXNcbiAgICB9ID0gZ2VvY29kZWQudG9PYmplY3QoKTtcblxuICAgIGxldCBwcm9wZXJ0aWVzOiB7XG4gICAgICBbcHJvcGVydHk6IHN0cmluZ106XG4gICAgICAgIHwgc3RyaW5nXG4gICAgICAgIHwgc3RyaW5nW11cbiAgICAgICAgfCBudW1iZXJcbiAgICAgICAgfCBib29sZWFuXG4gICAgICAgIHwgQWRtaW5MZXZlbFtdXG4gICAgICAgIHwgQWRtaW5MZXZlbE9iamVjdFtdXG4gICAgICAgIHwgdW5kZWZpbmVkO1xuICAgIH0gPSB7IC4uLmdlb2NvZGVkUHJvcGVydGllcyB9O1xuICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goXG4gICAgICAocHJvcGVydHkpID0+XG4gICAgICAgIHByb3BlcnRpZXNbcHJvcGVydHldID09PSB1bmRlZmluZWQgJiYgZGVsZXRlIHByb3BlcnRpZXNbcHJvcGVydHldXG4gICAgKTtcblxuICAgIGlmIChhZG1pbkxldmVscyAmJiBhZG1pbkxldmVscy5sZW5ndGggPiAwKSB7XG4gICAgICBwcm9wZXJ0aWVzID0ge1xuICAgICAgICAuLi5wcm9wZXJ0aWVzLFxuICAgICAgICBhZG1pbkxldmVsczogYWRtaW5MZXZlbHMubWFwKChhZG1pbkxldmVsKSA9PiBhZG1pbkxldmVsLnRvT2JqZWN0KCkpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXN1bHQgPSB7IC4uLnJlc3VsdCwgcHJvcGVydGllcyB9O1xuICAgIGlmIChzb3V0aCAmJiB3ZXN0ICYmIG5vcnRoICYmIGVhc3QpIHtcbiAgICAgIHJlc3VsdCA9IHsgLi4ucmVzdWx0LCBib3VuZHM6IHsgc291dGgsIHdlc3QsIG5vcnRoLCBlYXN0IH0gfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgQWRtaW5MZXZlbCBmcm9tIFwiQWRtaW5MZXZlbFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlb2NvZGVkT2JqZWN0IHtcbiAgcmVhZG9ubHkgW3Byb3BlcnR5OiBzdHJpbmddOlxuICAgIHwgc3RyaW5nXG4gICAgfCBzdHJpbmdbXVxuICAgIHwgbnVtYmVyXG4gICAgfCBib29sZWFuXG4gICAgfCBBZG1pbkxldmVsW11cbiAgICB8IHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgbGF0aXR1ZGU/OiBudW1iZXI7XG4gIHJlYWRvbmx5IGxvbmdpdHVkZT86IG51bWJlcjtcbiAgcmVhZG9ubHkgc291dGg/OiBudW1iZXI7XG4gIHJlYWRvbmx5IHdlc3Q/OiBudW1iZXI7XG4gIHJlYWRvbmx5IG5vcnRoPzogbnVtYmVyO1xuICByZWFkb25seSBlYXN0PzogbnVtYmVyO1xuICByZWFkb25seSBmb3JtYXR0ZWRBZGRyZXNzPzogc3RyaW5nO1xuICByZWFkb25seSBzdHJlZXROdW1iZXI/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHN0cmVldE5hbWU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHN1YkxvY2FsaXR5Pzogc3RyaW5nO1xuICByZWFkb25seSBsb2NhbGl0eT86IHN0cmluZztcbiAgcmVhZG9ubHkgcG9zdGFsQ29kZT86IHN0cmluZztcbiAgcmVhZG9ubHkgcmVnaW9uPzogc3RyaW5nO1xuICByZWFkb25seSBhZG1pbkxldmVscz86IEFkbWluTGV2ZWxbXTtcbiAgcmVhZG9ubHkgY291bnRyeT86IHN0cmluZztcbiAgcmVhZG9ubHkgY291bnRyeUNvZGU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHRpbWV6b25lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW9jb2RlZCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGF0aXR1ZGU/OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBsb25naXR1ZGU/OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzb3V0aD86IG51bWJlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IHdlc3Q/OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBub3J0aD86IG51bWJlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IGVhc3Q/OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBmb3JtYXR0ZWRBZGRyZXNzPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RyZWV0TnVtYmVyPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RyZWV0TmFtZT86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IHN1YkxvY2FsaXR5Pzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbG9jYWxpdHk/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBwb3N0YWxDb2RlPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcmVnaW9uPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgYWRtaW5MZXZlbHM6IEFkbWluTGV2ZWxbXTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGNvdW50cnk/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjb3VudHJ5Q29kZT86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IHRpbWV6b25lPzogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih7XG4gICAgbGF0aXR1ZGUsXG4gICAgbG9uZ2l0dWRlLFxuICAgIHNvdXRoLFxuICAgIHdlc3QsXG4gICAgbm9ydGgsXG4gICAgZWFzdCxcbiAgICBmb3JtYXR0ZWRBZGRyZXNzLFxuICAgIHN0cmVldE51bWJlcixcbiAgICBzdHJlZXROYW1lLFxuICAgIHN1YkxvY2FsaXR5LFxuICAgIGxvY2FsaXR5LFxuICAgIHBvc3RhbENvZGUsXG4gICAgcmVnaW9uLFxuICAgIGFkbWluTGV2ZWxzLFxuICAgIGNvdW50cnksXG4gICAgY291bnRyeUNvZGUsXG4gICAgdGltZXpvbmUsXG4gIH06IEdlb2NvZGVkT2JqZWN0KSB7XG4gICAgdGhpcy5sYXRpdHVkZSA9IGxhdGl0dWRlO1xuICAgIHRoaXMubG9uZ2l0dWRlID0gbG9uZ2l0dWRlO1xuICAgIHRoaXMuc291dGggPSBzb3V0aDtcbiAgICB0aGlzLndlc3QgPSB3ZXN0O1xuICAgIHRoaXMubm9ydGggPSBub3J0aDtcbiAgICB0aGlzLmVhc3QgPSBlYXN0O1xuICAgIHRoaXMuZm9ybWF0dGVkQWRkcmVzcyA9IGZvcm1hdHRlZEFkZHJlc3M7XG4gICAgdGhpcy5zdHJlZXROdW1iZXIgPSBzdHJlZXROdW1iZXI7XG4gICAgdGhpcy5zdHJlZXROYW1lID0gc3RyZWV0TmFtZTtcbiAgICB0aGlzLnN1YkxvY2FsaXR5ID0gc3ViTG9jYWxpdHk7XG4gICAgdGhpcy5sb2NhbGl0eSA9IGxvY2FsaXR5O1xuICAgIHRoaXMucG9zdGFsQ29kZSA9IHBvc3RhbENvZGU7XG4gICAgdGhpcy5yZWdpb24gPSByZWdpb247XG4gICAgdGhpcy5hZG1pbkxldmVscyA9IGFkbWluTGV2ZWxzIHx8IFtdO1xuICAgIHRoaXMuY291bnRyeSA9IGNvdW50cnk7XG4gICAgdGhpcy5jb3VudHJ5Q29kZSA9IGNvdW50cnlDb2RlO1xuICAgIHRoaXMudGltZXpvbmUgPSB0aW1lem9uZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG9iamVjdDogR2VvY29kZWRPYmplY3QpOiBHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9PYmplY3QoKTogR2VvY29kZWRPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBsYXRpdHVkZTogdGhpcy5sYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZTogdGhpcy5sb25naXR1ZGUsXG4gICAgICBzb3V0aDogdGhpcy5zb3V0aCxcbiAgICAgIHdlc3Q6IHRoaXMud2VzdCxcbiAgICAgIG5vcnRoOiB0aGlzLm5vcnRoLFxuICAgICAgZWFzdDogdGhpcy5lYXN0LFxuICAgICAgZm9ybWF0dGVkQWRkcmVzczogdGhpcy5mb3JtYXR0ZWRBZGRyZXNzLFxuICAgICAgc3RyZWV0TnVtYmVyOiB0aGlzLnN0cmVldE51bWJlcixcbiAgICAgIHN0cmVldE5hbWU6IHRoaXMuc3RyZWV0TmFtZSxcbiAgICAgIHN1YkxvY2FsaXR5OiB0aGlzLnN1YkxvY2FsaXR5LFxuICAgICAgbG9jYWxpdHk6IHRoaXMubG9jYWxpdHksXG4gICAgICBwb3N0YWxDb2RlOiB0aGlzLnBvc3RhbENvZGUsXG4gICAgICByZWdpb246IHRoaXMucmVnaW9uLFxuICAgICAgYWRtaW5MZXZlbHM6IHRoaXMuYWRtaW5MZXZlbHMsXG4gICAgICBjb3VudHJ5OiB0aGlzLmNvdW50cnksXG4gICAgICBjb3VudHJ5Q29kZTogdGhpcy5jb3VudHJ5Q29kZSxcbiAgICAgIHRpbWV6b25lOiB0aGlzLnRpbWV6b25lLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgd2l0aEJvdW5kcyhcbiAgICBzb3V0aD86IG51bWJlcixcbiAgICB3ZXN0PzogbnVtYmVyLFxuICAgIG5vcnRoPzogbnVtYmVyLFxuICAgIGVhc3Q/OiBudW1iZXJcbiAgKTogR2VvY29kZWQge1xuICAgIHJldHVybiAoPHR5cGVvZiBHZW9jb2RlZD50aGlzLmNvbnN0cnVjdG9yKS5jcmVhdGUoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgc291dGgsXG4gICAgICB3ZXN0LFxuICAgICAgbm9ydGgsXG4gICAgICBlYXN0LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHdpdGhDb29yZGluYXRlcyhsYXRpdHVkZT86IG51bWJlciwgbG9uZ2l0dWRlPzogbnVtYmVyKTogR2VvY29kZWQge1xuICAgIHJldHVybiAoPHR5cGVvZiBHZW9jb2RlZD50aGlzLmNvbnN0cnVjdG9yKS5jcmVhdGUoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgbGF0aXR1ZGUsXG4gICAgICBsb25naXR1ZGUsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29vcmRpbmF0ZXMoKTogW3VuZGVmaW5lZCB8IG51bWJlciwgdW5kZWZpbmVkIHwgbnVtYmVyXSB7XG4gICAgcmV0dXJuIFt0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZV07XG4gIH1cblxuICBwdWJsaWMgZ2V0TGF0aXR1ZGUoKTogdW5kZWZpbmVkIHwgbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5sYXRpdHVkZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMb25naXR1ZGUoKTogdW5kZWZpbmVkIHwgbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5sb25naXR1ZGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0Qm91bmRzKCk6IFtcbiAgICB1bmRlZmluZWQgfCBudW1iZXIsXG4gICAgdW5kZWZpbmVkIHwgbnVtYmVyLFxuICAgIHVuZGVmaW5lZCB8IG51bWJlcixcbiAgICB1bmRlZmluZWQgfCBudW1iZXJcbiAgXSB7XG4gICAgcmV0dXJuIFt0aGlzLnNvdXRoLCB0aGlzLndlc3QsIHRoaXMubm9ydGgsIHRoaXMuZWFzdF07XG4gIH1cblxuICBwdWJsaWMgZ2V0Rm9ybWF0dGVkQWRkcmVzcygpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdHRlZEFkZHJlc3M7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3RyZWV0TnVtYmVyKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RyZWV0TnVtYmVyO1xuICB9XG5cbiAgcHVibGljIGdldFN0cmVldE5hbWUoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdHJlZXROYW1lO1xuICB9XG5cbiAgcHVibGljIGdldFN1YkxvY2FsaXR5KCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3ViTG9jYWxpdHk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TG9jYWxpdHkoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGl0eTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQb3N0YWxDb2RlKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucG9zdGFsQ29kZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSZWdpb24oKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpb247XG4gIH1cblxuICBwdWJsaWMgYWRkQWRtaW5MZXZlbChhZG1pbkxldmVsOiBBZG1pbkxldmVsKTogdm9pZCB7XG4gICAgdGhpcy5hZG1pbkxldmVscy5wdXNoKGFkbWluTGV2ZWwpO1xuICB9XG5cbiAgcHVibGljIGdldEFkbWluTGV2ZWxzKCk6IEFkbWluTGV2ZWxbXSB7XG4gICAgcmV0dXJuIHRoaXMuYWRtaW5MZXZlbHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnRyeSgpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvdW50cnk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnRyeUNvZGUoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudHJ5Q29kZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaW1lem9uZSgpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRpbWV6b25lO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBCaW5nUHJvdmlkZXIsXG4gIENoYWluUHJvdmlkZXIsXG4gIENoYWluUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlLFxuICBHZW9QbHVnaW5Qcm92aWRlcixcbiAgR29vZ2xlTWFwc1Byb3ZpZGVyLFxuICBHb29nbGVNYXBzUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlLFxuICBNYXBib3hQcm92aWRlcixcbiAgTWFwYm94UHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlLFxuICBNYXBxdWVzdFByb3ZpZGVyLFxuICBOb21pbmF0aW1Qcm92aWRlcixcbiAgTm9taW5hdGltUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlLFxuICBPcGVuQ2FnZVByb3ZpZGVyLFxuICBPcGVuQ2FnZVByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSxcbiAgWWFuZGV4UHJvdmlkZXIsXG4gIFlhbmRleFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSxcbiAgUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlLFxuICBkZWZhdWx0Q2hhaW5Qcm92aWRlck9wdGlvbnMsXG4gIGRlZmF1bHRNYXBib3hQcm92aWRlck9wdGlvbnMsXG4gIGRlZmF1bHROb21pbmF0aW1Qcm92aWRlck9wdGlvbnMsXG4gIGRlZmF1bHRPcGVuQ2FnZVByb3ZpZGVyT3B0aW9ucyxcbiAgZGVmYXVsdFByb3ZpZGVyT3B0aW9ucyxcbn0gZnJvbSBcInByb3ZpZGVyXCI7XG5pbXBvcnQgRXh0ZXJuYWxMb2FkZXIgZnJvbSBcIkV4dGVybmFsTG9hZGVyXCI7XG5cbmludGVyZmFjZSBQcm92aWRlck9wdGlvbkludGVyZmFjZSB7XG4gIHByb3ZpZGVyOlxuICAgIHwgXCJiaW5nXCJcbiAgICB8IFwiY2hhaW5cIlxuICAgIHwgXCJnZW9wbHVnaW5cIlxuICAgIHwgXCJnb29nbGVcIlxuICAgIHwgXCJnb29nbGVtYXBzXCJcbiAgICB8IFwibWFwYm94XCJcbiAgICB8IFwibWFwcXVlc3RcIlxuICAgIHwgXCJub21pbmF0aW1cIlxuICAgIHwgXCJvcGVuY2FnZVwiXG4gICAgfCBcIm9wZW5zdHJlZXRtYXBcIlxuICAgIHwgXCJ5YW5kZXhcIjtcbn1cblxuaW50ZXJmYWNlIFByb3ZpZGVyRmFjdG9yeU9wdGlvbnNcbiAgZXh0ZW5kcyBQcm92aWRlck9wdGlvbnNJbnRlcmZhY2UsXG4gICAgUHJvdmlkZXJPcHRpb25JbnRlcmZhY2Uge31cblxuaW50ZXJmYWNlIENoYWluR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gIGV4dGVuZHMgUHJvdmlkZXJPcHRpb25JbnRlcmZhY2UsXG4gICAgQ2hhaW5Qcm92aWRlck9wdGlvbnNJbnRlcmZhY2Uge1xuICBwcm92aWRlcjogXCJjaGFpblwiO1xufVxuXG5pbnRlcmZhY2UgR2VvUGx1Z2luR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gIGV4dGVuZHMgUHJvdmlkZXJPcHRpb25JbnRlcmZhY2Uge1xuICBwcm92aWRlcjogXCJnZW9wbHVnaW5cIjtcbn1cblxuaW50ZXJmYWNlIEdvb2dsZU1hcHNHZW9jb2RlclByb3ZpZGVyRmFjdG9yeU9wdGlvbnNcbiAgZXh0ZW5kcyBQcm92aWRlck9wdGlvbkludGVyZmFjZSxcbiAgICBHb29nbGVNYXBzUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlIHtcbiAgcHJvdmlkZXI6IFwiZ29vZ2xlXCIgfCBcImdvb2dsZW1hcHNcIjtcbn1cblxuaW50ZXJmYWNlIE1hcGJveEdlb2NvZGVyUHJvdmlkZXJGYWN0b3J5T3B0aW9uc1xuICBleHRlbmRzIFByb3ZpZGVyT3B0aW9uSW50ZXJmYWNlLFxuICAgIE1hcGJveFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSB7XG4gIHByb3ZpZGVyOiBcIm1hcGJveFwiO1xufVxuXG5pbnRlcmZhY2UgTm9taW5hdGltR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gIGV4dGVuZHMgUHJvdmlkZXJPcHRpb25JbnRlcmZhY2UsXG4gICAgTm9taW5hdGltUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlIHtcbiAgcHJvdmlkZXI6IFwibm9taW5hdGltXCIgfCBcIm9wZW5zdHJlZXRtYXBcIjtcbn1cblxuaW50ZXJmYWNlIE9wZW5DYWdlR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gIGV4dGVuZHMgUHJvdmlkZXJPcHRpb25JbnRlcmZhY2UsXG4gICAgT3BlbkNhZ2VQcm92aWRlck9wdGlvbnNJbnRlcmZhY2Uge1xuICBwcm92aWRlcjogXCJvcGVuY2FnZVwiO1xufVxuXG5pbnRlcmZhY2UgWWFuZGV4R2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gIGV4dGVuZHMgUHJvdmlkZXJPcHRpb25JbnRlcmZhY2UsXG4gICAgWWFuZGV4UHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlIHtcbiAgcHJvdmlkZXI6IFwieWFuZGV4XCI7XG59XG5cbmV4cG9ydCB0eXBlIEdlb2NvZGVyUHJvdmlkZXJGYWN0b3J5T3B0aW9ucyA9XG4gIHwgUHJvdmlkZXJGYWN0b3J5T3B0aW9uc1xuICB8IENoYWluR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gIHwgR2VvUGx1Z2luR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gIHwgR29vZ2xlTWFwc0dlb2NvZGVyUHJvdmlkZXJGYWN0b3J5T3B0aW9uc1xuICB8IE1hcGJveEdlb2NvZGVyUHJvdmlkZXJGYWN0b3J5T3B0aW9uc1xuICB8IE5vbWluYXRpbUdlb2NvZGVyUHJvdmlkZXJGYWN0b3J5T3B0aW9uc1xuICB8IE9wZW5DYWdlR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gIHwgWWFuZGV4R2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zO1xuXG5leHBvcnQgdHlwZSBHZW9jb2RlclByb3ZpZGVyID1cbiAgfCBCaW5nUHJvdmlkZXJcbiAgfCBDaGFpblByb3ZpZGVyXG4gIHwgR2VvUGx1Z2luUHJvdmlkZXJcbiAgfCBHb29nbGVNYXBzUHJvdmlkZXJcbiAgfCBNYXBib3hQcm92aWRlclxuICB8IE1hcHF1ZXN0UHJvdmlkZXJcbiAgfCBOb21pbmF0aW1Qcm92aWRlclxuICB8IE9wZW5DYWdlUHJvdmlkZXJcbiAgfCBZYW5kZXhQcm92aWRlcjtcblxuZXhwb3J0IHR5cGUgR2VvY29kZXJQcm92aWRlckJ5T3B0aW9uc1R5cGU8XG4gIE9cbj4gPSBPIGV4dGVuZHMgQ2hhaW5HZW9jb2RlclByb3ZpZGVyRmFjdG9yeU9wdGlvbnNcbiAgPyBDaGFpblByb3ZpZGVyXG4gIDogTyBleHRlbmRzIEdlb1BsdWdpbkdlb2NvZGVyUHJvdmlkZXJGYWN0b3J5T3B0aW9uc1xuICA/IEdlb1BsdWdpblByb3ZpZGVyXG4gIDogTyBleHRlbmRzIEdvb2dsZU1hcHNHZW9jb2RlclByb3ZpZGVyRmFjdG9yeU9wdGlvbnNcbiAgPyBHb29nbGVNYXBzUHJvdmlkZXJcbiAgOiBPIGV4dGVuZHMgTWFwYm94R2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gID8gTWFwYm94UHJvdmlkZXJcbiAgOiBPIGV4dGVuZHMgTm9taW5hdGltR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zXG4gID8gTm9taW5hdGltUHJvdmlkZXJcbiAgOiBPIGV4dGVuZHMgT3BlbkNhZ2VHZW9jb2RlclByb3ZpZGVyRmFjdG9yeU9wdGlvbnNcbiAgPyBPcGVuQ2FnZVByb3ZpZGVyXG4gIDogTyBleHRlbmRzIFlhbmRleEdlb2NvZGVyUHJvdmlkZXJGYWN0b3J5T3B0aW9uc1xuICA/IFlhbmRleFByb3ZpZGVyXG4gIDogR2VvY29kZXJQcm92aWRlcjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdmlkZXJGYWN0b3J5IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgR2VvY29kZXIgUHJvdmlkZXIgaW5zdGFuY2VzLlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiAgIEVpdGhlciBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJlZ2lzdGVyZWQgcHJvdmlkZXIsIG9yIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgKiAgIGZvbGxvd2luZyBzZXR0aW5ncyBmb3IgaW5zdGlnYXRpbmcgcHJvdmlkZXJzOlxuICAgKiAgICAgLSBwcm92aWRlcjogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSByZWdpc3RlcmVkIHByb3ZpZGVyLlxuICAgKiBAcmV0dXJuXG4gICAqICAgQW4gb2JqZWN0IGNvbXBhdGlibGUgd2l0aCBQcm92aWRlckludGVyZmFjZSwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlJ3Mgbm90IGFcbiAgICogICByZWdpc3RlcmVkIHByb3ZpZGVyLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBjcmVhdGVQcm92aWRlcjxPIGV4dGVuZHMgR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zPihcbiAgICBvcHRpb25zOiBzdHJpbmcgfCBPXG4gICk6IEdlb2NvZGVyUHJvdmlkZXJCeU9wdGlvbnNUeXBlPE8+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBjcmVhdGVQcm92aWRlck9wdGlvbnMgPSB7XG4gICAgICAuLi5kZWZhdWx0UHJvdmlkZXJPcHRpb25zLFxuICAgICAgLi4uKHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID8geyBwcm92aWRlcjogb3B0aW9ucyB9IDogb3B0aW9ucyksXG4gICAgfTtcblxuICAgIGNvbnN0IGV4dGVybmFsTG9hZGVyID0gbmV3IEV4dGVybmFsTG9hZGVyKCk7XG5cbiAgICBjb25zdCB7IHByb3ZpZGVyLCAuLi5wcm92aWRlck9wdGlvbnMgfSA9IGNyZWF0ZVByb3ZpZGVyT3B0aW9ucztcbiAgICBzd2l0Y2ggKHByb3ZpZGVyKSB7XG4gICAgICBjYXNlIFwiYmluZ1wiOlxuICAgICAgICByZXR1cm4gPEdlb2NvZGVyUHJvdmlkZXJCeU9wdGlvbnNUeXBlPE8+PihcbiAgICAgICAgICBuZXcgQmluZ1Byb3ZpZGVyKGV4dGVybmFsTG9hZGVyLCBwcm92aWRlck9wdGlvbnMpXG4gICAgICAgICk7XG4gICAgICBjYXNlIFwiY2hhaW5cIjpcbiAgICAgICAgcmV0dXJuIDxHZW9jb2RlclByb3ZpZGVyQnlPcHRpb25zVHlwZTxPPj5uZXcgQ2hhaW5Qcm92aWRlcih7XG4gICAgICAgICAgLi4uZGVmYXVsdENoYWluUHJvdmlkZXJPcHRpb25zLFxuICAgICAgICAgIC4uLnByb3ZpZGVyT3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiZ2VvcGx1Z2luXCI6XG4gICAgICAgIHJldHVybiA8R2VvY29kZXJQcm92aWRlckJ5T3B0aW9uc1R5cGU8Tz4+KFxuICAgICAgICAgIG5ldyBHZW9QbHVnaW5Qcm92aWRlcihleHRlcm5hbExvYWRlciwgcHJvdmlkZXJPcHRpb25zKVxuICAgICAgICApO1xuICAgICAgY2FzZSBcImdvb2dsZVwiOlxuICAgICAgY2FzZSBcImdvb2dsZW1hcHNcIjpcbiAgICAgICAgcmV0dXJuIDxHZW9jb2RlclByb3ZpZGVyQnlPcHRpb25zVHlwZTxPPj4oXG4gICAgICAgICAgbmV3IEdvb2dsZU1hcHNQcm92aWRlcihleHRlcm5hbExvYWRlciwgcHJvdmlkZXJPcHRpb25zKVxuICAgICAgICApO1xuICAgICAgY2FzZSBcIm1hcGJveFwiOlxuICAgICAgICByZXR1cm4gPEdlb2NvZGVyUHJvdmlkZXJCeU9wdGlvbnNUeXBlPE8+PihcbiAgICAgICAgICBuZXcgTWFwYm94UHJvdmlkZXIoZXh0ZXJuYWxMb2FkZXIsIHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRNYXBib3hQcm92aWRlck9wdGlvbnMsXG4gICAgICAgICAgICAuLi5wcm92aWRlck9wdGlvbnMsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgXCJtYXBxdWVzdFwiOlxuICAgICAgICByZXR1cm4gPEdlb2NvZGVyUHJvdmlkZXJCeU9wdGlvbnNUeXBlPE8+PihcbiAgICAgICAgICBuZXcgTWFwcXVlc3RQcm92aWRlcihleHRlcm5hbExvYWRlciwgcHJvdmlkZXJPcHRpb25zKVxuICAgICAgICApO1xuICAgICAgY2FzZSBcIm9wZW5zdHJlZXRtYXBcIjpcbiAgICAgIGNhc2UgXCJub21pbmF0aW1cIjpcbiAgICAgICAgcmV0dXJuIDxHZW9jb2RlclByb3ZpZGVyQnlPcHRpb25zVHlwZTxPPj4oXG4gICAgICAgICAgbmV3IE5vbWluYXRpbVByb3ZpZGVyKGV4dGVybmFsTG9hZGVyLCB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0Tm9taW5hdGltUHJvdmlkZXJPcHRpb25zLFxuICAgICAgICAgICAgLi4ucHJvdmlkZXJPcHRpb25zLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICBjYXNlIFwib3BlbmNhZ2VcIjpcbiAgICAgICAgcmV0dXJuIDxHZW9jb2RlclByb3ZpZGVyQnlPcHRpb25zVHlwZTxPPj4oXG4gICAgICAgICAgbmV3IE9wZW5DYWdlUHJvdmlkZXIoZXh0ZXJuYWxMb2FkZXIsIHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRPcGVuQ2FnZVByb3ZpZGVyT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLnByb3ZpZGVyT3B0aW9ucyxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgY2FzZSBcInlhbmRleFwiOlxuICAgICAgICByZXR1cm4gPEdlb2NvZGVyUHJvdmlkZXJCeU9wdGlvbnNUeXBlPE8+PihcbiAgICAgICAgICBuZXcgWWFuZGV4UHJvdmlkZXIoZXh0ZXJuYWxMb2FkZXIsIHByb3ZpZGVyT3B0aW9ucylcbiAgICAgICAgKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3ZpZGVyRmFjdG9yeSwge1xuICBHZW9jb2RlclByb3ZpZGVyQnlPcHRpb25zVHlwZSxcbiAgR2VvY29kZXJQcm92aWRlckZhY3RvcnlPcHRpb25zLFxufSBmcm9tIFwiR2VvY29kZXJQcm92aWRlckZhY3RvcnlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5pdmVyc2FsR2VvY29kZXIge1xuICBwdWJsaWMgdmVyc2lvbiA9IFwiMC4xLjBcIjtcblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZUdlb2NvZGVyPE8gZXh0ZW5kcyBHZW9jb2RlclByb3ZpZGVyRmFjdG9yeU9wdGlvbnM+KFxuICAgIG9wdGlvbnM6IHN0cmluZyB8IE9cbiAgKTogR2VvY29kZXJQcm92aWRlckJ5T3B0aW9uc1R5cGU8Tz4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBQcm92aWRlckZhY3RvcnkuY3JlYXRlUHJvdmlkZXIob3B0aW9ucyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEdlb1BsdWdpblJlc3VsdCxcbiAgR29vZ2xlTWFwc1Jlc3BvbnNlLFxuICBNYXBib3hSZXNwb25zZSxcbiAgTm9taW5hdGltUmVzcG9uc2UsXG4gIE9wZW5DYWdlUmVzcG9uc2UsXG59IGZyb20gXCJwcm92aWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwdWJsaWMgX19wcm90b19fOiBSZXNwb25zZUVycm9yO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcmVzcG9uc2U6XG4gICAgfCBSZXNwb25zZVxuICAgIHwgR2VvUGx1Z2luUmVzdWx0XG4gICAgfCBHb29nbGVNYXBzUmVzcG9uc2VcbiAgICB8IE1hcGJveFJlc3BvbnNlXG4gICAgfCBOb21pbmF0aW1SZXNwb25zZVxuICAgIHwgT3BlbkNhZ2VSZXNwb25zZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHJlc3BvbnNlOlxuICAgICAgfCBSZXNwb25zZVxuICAgICAgfCBHZW9QbHVnaW5SZXN1bHRcbiAgICAgIHwgR29vZ2xlTWFwc1Jlc3BvbnNlXG4gICAgICB8IE1hcGJveFJlc3BvbnNlXG4gICAgICB8IE5vbWluYXRpbVJlc3BvbnNlXG4gICAgICB8IE9wZW5DYWdlUmVzcG9uc2VcbiAgKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gXCJSZXNwb25zZUVycm9yXCI7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvXG4gICAgdGhpcy5fX3Byb3RvX18gPSBSZXNwb25zZUVycm9yLnByb3RvdHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSZXNwb25zZSgpOlxuICAgIHwgUmVzcG9uc2VcbiAgICB8IEdlb1BsdWdpblJlc3VsdFxuICAgIHwgR29vZ2xlTWFwc1Jlc3BvbnNlXG4gICAgfCBNYXBib3hSZXNwb25zZVxuICAgIHwgTm9taW5hdGltUmVzcG9uc2VcbiAgICB8IE9wZW5DYWdlUmVzcG9uc2Uge1xuICAgIHJldHVybiB0aGlzLnJlc3BvbnNlO1xuICB9XG59XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydFxuZXhwb3J0IHsgZGVmYXVsdCBhcyBSZXNwb25zZUVycm9yIH0gZnJvbSBcImVycm9yL1Jlc3BvbnNlRXJyb3JcIjtcbiIsImltcG9ydCBVbml2ZXJzYWxHZW9jb2RlciBmcm9tIFwiVW5pdmVyc2FsR2VvY29kZXJcIjtcbmltcG9ydCBHZW9Kc29uRHVtcGVyIGZyb20gXCJHZW9Kc29uRHVtcGVyXCI7XG5cbmludGVyZmFjZSBDb250YWluZXIge1xuICBVbml2ZXJzYWxHZW9jb2RlcjogdHlwZW9mIFVuaXZlcnNhbEdlb2NvZGVyO1xuICBHZW9Kc29uRHVtcGVyOiB0eXBlb2YgR2VvSnNvbkR1bXBlcjtcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBVbml2ZXJzYWxHZW9jb2RlcjogdHlwZW9mIFVuaXZlcnNhbEdlb2NvZGVyO1xuICAgIEdlb0pzb25EdW1wZXI6IHR5cGVvZiBHZW9Kc29uRHVtcGVyO1xuICB9XG59XG5cbmNvbnN0IGNvbnRhaW5lcjogV2luZG93IHwgQ29udGFpbmVyID1cbiAgdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6ICh7fSBhcyBDb250YWluZXIpO1xuXG5jb250YWluZXIuVW5pdmVyc2FsR2VvY29kZXIgPSBVbml2ZXJzYWxHZW9jb2RlcjtcbmNvbnRhaW5lci5HZW9Kc29uRHVtcGVyID0gR2VvSnNvbkR1bXBlcjtcbiIsImV4cG9ydCBpbnRlcmZhY2UgQm91bmRzIHtcbiAgcmVhZG9ubHkgc291dGg6IG51bWJlciB8IHN0cmluZztcbiAgcmVhZG9ubHkgd2VzdDogbnVtYmVyIHwgc3RyaW5nO1xuICByZWFkb25seSBub3J0aDogbnVtYmVyIHwgc3RyaW5nO1xuICByZWFkb25seSBlYXN0OiBudW1iZXIgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29vcmRpbmF0ZXMge1xuICByZWFkb25seSBsYXRpdHVkZTogbnVtYmVyIHwgc3RyaW5nO1xuICByZWFkb25seSBsb25naXR1ZGU6IG51bWJlciB8IHN0cmluZztcbn1cblxuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwicXVlcnlcIjtcbmV4cG9ydCAqIGZyb20gXCJ1dGlsc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBBZG1pbkxldmVsIH0gZnJvbSBcIkFkbWluTGV2ZWxcIjtcbmV4cG9ydCAqIGZyb20gXCJBZG1pbkxldmVsXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEV4dGVybmFsTG9hZGVyIH0gZnJvbSBcIkV4dGVybmFsTG9hZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiRXh0ZXJuYWxMb2FkZXJcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgR2VvY29kZWQgfSBmcm9tIFwiR2VvY29kZWRcIjtcbmV4cG9ydCAqIGZyb20gXCJHZW9jb2RlZFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHZW9jb2RlclByb3ZpZGVyRmFjdG9yeSB9IGZyb20gXCJHZW9jb2RlclByb3ZpZGVyRmFjdG9yeVwiO1xuZXhwb3J0ICogZnJvbSBcIkdlb2NvZGVyUHJvdmlkZXJGYWN0b3J5XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEdlb0pzb25EdW1wZXIgfSBmcm9tIFwiR2VvSnNvbkR1bXBlclwiO1xuZXhwb3J0ICogZnJvbSBcIkdlb0pzb25EdW1wZXJcIjtcbmV4cG9ydCB7IGRlZmF1bHQgfSBmcm9tIFwiVW5pdmVyc2FsR2VvY29kZXJcIjtcbiIsImltcG9ydCB7XG4gIEV4dGVybmFsTG9hZGVyQm9keSxcbiAgRXh0ZXJuYWxMb2FkZXJIZWFkZXJzLFxuICBFeHRlcm5hbExvYWRlckludGVyZmFjZSxcbiAgRXh0ZXJuYWxMb2FkZXJQYXJhbXMsXG59IGZyb20gXCJFeHRlcm5hbExvYWRlclwiO1xuaW1wb3J0IHtcbiAgRXJyb3JDYWxsYmFjayxcbiAgR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gIFByb3ZpZGVySGVscGVycyxcbiAgUHJvdmlkZXJJbnRlcmZhY2UsXG4gIFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSxcbiAgZGVmYXVsdFByb3ZpZGVyT3B0aW9ucyxcbn0gZnJvbSBcInByb3ZpZGVyXCI7XG5pbXBvcnQgR2VvY29kZWQgZnJvbSBcIkdlb2NvZGVkXCI7XG5pbXBvcnQge1xuICBHZW9jb2RlUXVlcnksXG4gIEdlb2NvZGVRdWVyeU9iamVjdCxcbiAgUmV2ZXJzZVF1ZXJ5LFxuICBSZXZlcnNlUXVlcnlPYmplY3QsXG59IGZyb20gXCJxdWVyeVwiO1xuaW1wb3J0IHsgQm94IH0gZnJvbSBcInR5cGVzXCI7XG5cbmludGVyZmFjZSBCaW5nUmVxdWVzdFBhcmFtcyB7XG4gIFtwYXJhbTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICByZWFkb25seSBrZXk/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGpzb25wQ2FsbGJhY2s/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmluZ1Jlc3VsdCB7XG4gIF9fdHlwZTogc3RyaW5nO1xuICBiYm94OiBCb3g7XG4gIG5hbWU6IHN0cmluZztcbiAgcG9pbnQ6IHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgY29vcmRpbmF0ZXM6IFtudW1iZXIsIG51bWJlcl07XG4gIH07XG4gIGFkZHJlc3M6IHtcbiAgICBhZGRyZXNzTGluZTogc3RyaW5nO1xuICAgIGFkbWluRGlzdHJpY3Q6IHN0cmluZztcbiAgICBhZG1pbkRpc3RyaWN0Mjogc3RyaW5nO1xuICAgIGNvdW50cnlSZWdpb246IHN0cmluZztcbiAgICBmb3JtYXR0ZWRBZGRyZXNzOiBzdHJpbmc7XG4gICAgbG9jYWxpdHk6IHN0cmluZztcbiAgICBwb3N0YWxDb2RlOiBzdHJpbmc7XG4gIH07XG4gIGNvbmZpZGVuY2U6IHN0cmluZztcbiAgZW50aXR5VHlwZTogc3RyaW5nO1xuICBnZW9jb2RlUG9pbnRzOiB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIGNhbGN1bGF0aW9uTWV0aG9kOiBzdHJpbmc7XG4gICAgdXNhZ2VUeXBlczogc3RyaW5nW107XG4gIH1bXTtcbiAgbWF0Y2hDb2Rlczogc3RyaW5nW107XG59XG5cbnR5cGUgQmluZ0dlb2NvZGVkUmVzdWx0c0NhbGxiYWNrID0gR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2s8R2VvY29kZWQ+O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaW5nUHJvdmlkZXIgaW1wbGVtZW50cyBQcm92aWRlckludGVyZmFjZTxHZW9jb2RlZD4ge1xuICBwcml2YXRlIGV4dGVybmFsTG9hZGVyOiBFeHRlcm5hbExvYWRlckludGVyZmFjZTtcblxuICBwcml2YXRlIG9wdGlvbnM6IFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgX2V4dGVybmFsTG9hZGVyOiBFeHRlcm5hbExvYWRlckludGVyZmFjZSxcbiAgICBvcHRpb25zOiBQcm92aWRlck9wdGlvbnNJbnRlcmZhY2UgPSBkZWZhdWx0UHJvdmlkZXJPcHRpb25zXG4gICkge1xuICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIgPSBfZXh0ZXJuYWxMb2FkZXI7XG4gICAgdGhpcy5vcHRpb25zID0geyAuLi5kZWZhdWx0UHJvdmlkZXJPcHRpb25zLCAuLi5vcHRpb25zIH07XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYXBpS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBbiBBUEkga2V5IGlzIHJlcXVpcmVkIGZvciB0aGUgQmluZyBwcm92aWRlci4gUGxlYXNlIGFkZCBpdCBpbiB0aGUgXCJhcGlLZXlcIiBvcHRpb24uJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2VvY29kZShcbiAgICBxdWVyeTogc3RyaW5nIHwgR2VvY29kZVF1ZXJ5IHwgR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICAgIGNhbGxiYWNrOiBCaW5nR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZ2VvY29kZVF1ZXJ5ID0gUHJvdmlkZXJIZWxwZXJzLmdldEdlb2NvZGVRdWVyeUZyb21QYXJhbWV0ZXIocXVlcnkpO1xuXG4gICAgaWYgKGdlb2NvZGVRdWVyeS5nZXRJcCgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiVGhlIEJpbmcgcHJvdmlkZXIgZG9lcyBub3Qgc3VwcG9ydCBJUCBnZW9sb2NhdGlvbiwgb25seSBsb2NhdGlvbiBnZW9jb2RpbmcuXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5leHRlcm5hbExvYWRlci5zZXRPcHRpb25zKHtcbiAgICAgIHByb3RvY29sOiB0aGlzLm9wdGlvbnMudXNlU3NsID8gXCJodHRwc1wiIDogXCJodHRwXCIsXG4gICAgICBob3N0OiBcImRldi52aXJ0dWFsZWFydGgubmV0XCIsXG4gICAgICBwYXRobmFtZTogYFJFU1QvdjEvTG9jYXRpb25zLyR7Z2VvY29kZVF1ZXJ5LmdldFRleHQoKX1gLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFyYW1zOiBCaW5nUmVxdWVzdFBhcmFtcyA9IHtcbiAgICAgIGtleTogdGhpcy5vcHRpb25zLmFwaUtleSxcbiAgICAgIGpzb25wQ2FsbGJhY2s6IHRoaXMub3B0aW9ucy51c2VKc29ucCA/IFwianNvbnBcIiA6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgdGhpcy5leGVjdXRlUmVxdWVzdChwYXJhbXMsIGNhbGxiYWNrLCB7fSwge30sIGVycm9yQ2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIGdlb2RlY29kZShcbiAgICBsYXRpdHVkZU9yUXVlcnk6IG51bWJlciB8IHN0cmluZyB8IFJldmVyc2VRdWVyeSB8IFJldmVyc2VRdWVyeU9iamVjdCxcbiAgICBsb25naXR1ZGVPckNhbGxiYWNrOiBudW1iZXIgfCBzdHJpbmcgfCBCaW5nR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgY2FsbGJhY2tPckVycm9yQ2FsbGJhY2s/OiBCaW5nR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2sgfCBFcnJvckNhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHJldmVyc2VRdWVyeSA9IFByb3ZpZGVySGVscGVycy5nZXRSZXZlcnNlUXVlcnlGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxhdGl0dWRlT3JRdWVyeSxcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2tcbiAgICApO1xuICAgIGNvbnN0IHJldmVyc2VDYWxsYmFjayA9IFByb3ZpZGVySGVscGVycy5nZXRDYWxsYmFja0Zyb21QYXJhbWV0ZXJzKFxuICAgICAgbG9uZ2l0dWRlT3JDYWxsYmFjayxcbiAgICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrXG4gICAgKTtcbiAgICBjb25zdCByZXZlcnNlRXJyb3JDYWxsYmFjayA9IFByb3ZpZGVySGVscGVycy5nZXRFcnJvckNhbGxiYWNrRnJvbVBhcmFtZXRlcnMoXG4gICAgICBsb25naXR1ZGVPckNhbGxiYWNrLFxuICAgICAgY2FsbGJhY2tPckVycm9yQ2FsbGJhY2ssXG4gICAgICBlcnJvckNhbGxiYWNrXG4gICAgKTtcblxuICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIuc2V0T3B0aW9ucyh7XG4gICAgICBwcm90b2NvbDogdGhpcy5vcHRpb25zLnVzZVNzbCA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiLFxuICAgICAgaG9zdDogXCJkZXYudmlydHVhbGVhcnRoLm5ldFwiLFxuICAgICAgcGF0aG5hbWU6IGBSRVNUL3YxL0xvY2F0aW9ucy8ke3JldmVyc2VRdWVyeS5nZXRDb29yZGluYXRlcygpLmxhdGl0dWRlfSwke1xuICAgICAgICByZXZlcnNlUXVlcnkuZ2V0Q29vcmRpbmF0ZXMoKS5sb25naXR1ZGVcbiAgICAgIH1gLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFyYW1zOiBCaW5nUmVxdWVzdFBhcmFtcyA9IHtcbiAgICAgIGtleTogdGhpcy5vcHRpb25zLmFwaUtleSxcbiAgICAgIGpzb25wQ2FsbGJhY2s6IHRoaXMub3B0aW9ucy51c2VKc29ucCA/IFwianNvbnBcIiA6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgdGhpcy5leGVjdXRlUmVxdWVzdChwYXJhbXMsIHJldmVyc2VDYWxsYmFjaywge30sIHt9LCByZXZlcnNlRXJyb3JDYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVJlcXVlc3QoXG4gICAgcGFyYW1zOiBFeHRlcm5hbExvYWRlclBhcmFtcyxcbiAgICBjYWxsYmFjazogQmluZ0dlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGhlYWRlcnM/OiBFeHRlcm5hbExvYWRlckhlYWRlcnMsXG4gICAgYm9keT86IEV4dGVybmFsTG9hZGVyQm9keSxcbiAgICBlcnJvckNhbGxiYWNrPzogRXJyb3JDYWxsYmFja1xuICApOiB2b2lkIHtcbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLmV4ZWN1dGVSZXF1ZXN0KFxuICAgICAgcGFyYW1zLFxuICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgZGF0YS5yZXNvdXJjZVNldHNbMF0ucmVzb3VyY2VzLm1hcCgocmVzdWx0OiBCaW5nUmVzdWx0KSA9PlxuICAgICAgICAgICAgQmluZ1Byb3ZpZGVyLm1hcFRvR2VvY29kZWQocmVzdWx0KVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzLFxuICAgICAgYm9keSxcbiAgICAgIGVycm9yQ2FsbGJhY2tcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBtYXBUb0dlb2NvZGVkKHJlc3VsdDogQmluZ1Jlc3VsdCk6IEdlb2NvZGVkIHtcbiAgICBjb25zdCBsYXRpdHVkZSA9IHJlc3VsdC5wb2ludC5jb29yZGluYXRlc1swXTtcbiAgICBjb25zdCBsb25naXR1ZGUgPSByZXN1bHQucG9pbnQuY29vcmRpbmF0ZXNbMV07XG4gICAgY29uc3QgeyBmb3JtYXR0ZWRBZGRyZXNzIH0gPSByZXN1bHQuYWRkcmVzcztcbiAgICBjb25zdCBzdHJlZXROYW1lID0gcmVzdWx0LmFkZHJlc3MuYWRkcmVzc0xpbmU7XG4gICAgY29uc3QgeyBsb2NhbGl0eSwgcG9zdGFsQ29kZSB9ID0gcmVzdWx0LmFkZHJlc3M7XG4gICAgY29uc3QgcmVnaW9uID0gcmVzdWx0LmFkZHJlc3MuYWRtaW5EaXN0cmljdDtcbiAgICBjb25zdCBjb3VudHJ5ID0gcmVzdWx0LmFkZHJlc3MuY291bnRyeVJlZ2lvbjtcblxuICAgIGxldCBnZW9jb2RlZCA9IEdlb2NvZGVkLmNyZWF0ZSh7XG4gICAgICBsYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZSxcbiAgICAgIGZvcm1hdHRlZEFkZHJlc3MsXG4gICAgICBzdHJlZXROYW1lLFxuICAgICAgbG9jYWxpdHksXG4gICAgICBwb3N0YWxDb2RlLFxuICAgICAgcmVnaW9uLFxuICAgICAgY291bnRyeSxcbiAgICB9KTtcbiAgICBnZW9jb2RlZCA9IGdlb2NvZGVkLndpdGhCb3VuZHMoXG4gICAgICByZXN1bHQuYmJveFswXSxcbiAgICAgIHJlc3VsdC5iYm94WzFdLFxuICAgICAgcmVzdWx0LmJib3hbMl0sXG4gICAgICByZXN1bHQuYmJveFszXVxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VvY29kZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEV4dGVybmFsTG9hZGVyQm9keSxcbiAgRXh0ZXJuYWxMb2FkZXJIZWFkZXJzLFxuICBFeHRlcm5hbExvYWRlclBhcmFtcyxcbn0gZnJvbSBcIkV4dGVybmFsTG9hZGVyXCI7XG5pbXBvcnQgR2VvY29kZWQgZnJvbSBcIkdlb2NvZGVkXCI7XG5pbXBvcnQge1xuICBFcnJvckNhbGxiYWNrLFxuICBHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgUHJvdmlkZXJIZWxwZXJzLFxuICBQcm92aWRlckludGVyZmFjZSxcbiAgUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlLFxuICBkZWZhdWx0UHJvdmlkZXJPcHRpb25zLFxufSBmcm9tIFwicHJvdmlkZXJcIjtcbmltcG9ydCB7XG4gIEdlb2NvZGVRdWVyeSxcbiAgR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICBSZXZlcnNlUXVlcnksXG4gIFJldmVyc2VRdWVyeU9iamVjdCxcbn0gZnJvbSBcInF1ZXJ5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhaW5Qcm92aWRlck9wdGlvbnNJbnRlcmZhY2VcbiAgZXh0ZW5kcyBQcm92aWRlck9wdGlvbnNJbnRlcmZhY2Uge1xuICByZWFkb25seSBwcm92aWRlcnM6IFByb3ZpZGVySW50ZXJmYWNlPEdlb2NvZGVkPltdO1xuICByZWFkb25seSBwYXJhbGxlbGl6ZT86IGJvb2xlYW47XG4gIHJlYWRvbmx5IGZpcnN0PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDaGFpblByb3ZpZGVyT3B0aW9ucyA9IHtcbiAgLi4uZGVmYXVsdFByb3ZpZGVyT3B0aW9ucyxcbiAgcHJvdmlkZXJzOiBbXSxcbn07XG5cbnR5cGUgQ2hhaW5HZW9jb2RlZFJlc3VsdHNDYWxsYmFjayA9IEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPEdlb2NvZGVkPjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhaW5Qcm92aWRlciBpbXBsZW1lbnRzIFByb3ZpZGVySW50ZXJmYWNlPEdlb2NvZGVkPiB7XG4gIHByaXZhdGUgb3B0aW9uczogQ2hhaW5Qcm92aWRlck9wdGlvbnNJbnRlcmZhY2U7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIG9wdGlvbnM6IENoYWluUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlID0gZGVmYXVsdENoYWluUHJvdmlkZXJPcHRpb25zXG4gICkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2VvY29kZShcbiAgICBxdWVyeTogc3RyaW5nIHwgR2VvY29kZVF1ZXJ5IHwgR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICAgIGNhbGxiYWNrOiBDaGFpbkdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYWxsZWxpemUgfHwgdGhpcy5vcHRpb25zLmZpcnN0KSB7XG4gICAgICB0aGlzLmdlb2NvZGVBbGxQcm92aWRlcnMocXVlcnksIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmdlb2NvZGVOZXh0UHJvdmlkZXIoXG4gICAgICB0aGlzLm9wdGlvbnMucHJvdmlkZXJzLFxuICAgICAgcXVlcnksXG4gICAgICBjYWxsYmFjayxcbiAgICAgIGVycm9yQ2FsbGJhY2tcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdlb2RlY29kZShcbiAgICBsYXRpdHVkZU9yUXVlcnk6IG51bWJlciB8IHN0cmluZyB8IFJldmVyc2VRdWVyeSB8IFJldmVyc2VRdWVyeU9iamVjdCxcbiAgICBsb25naXR1ZGVPckNhbGxiYWNrOiBudW1iZXIgfCBzdHJpbmcgfCBDaGFpbkdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrPzogQ2hhaW5HZW9jb2RlZFJlc3VsdHNDYWxsYmFjayB8IEVycm9yQ2FsbGJhY2ssXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgcmV2ZXJzZVF1ZXJ5ID0gUHJvdmlkZXJIZWxwZXJzLmdldFJldmVyc2VRdWVyeUZyb21QYXJhbWV0ZXJzKFxuICAgICAgbGF0aXR1ZGVPclF1ZXJ5LFxuICAgICAgbG9uZ2l0dWRlT3JDYWxsYmFja1xuICAgICk7XG4gICAgY29uc3QgcmV2ZXJzZUNhbGxiYWNrID0gUHJvdmlkZXJIZWxwZXJzLmdldENhbGxiYWNrRnJvbVBhcmFtZXRlcnMoXG4gICAgICBsb25naXR1ZGVPckNhbGxiYWNrLFxuICAgICAgY2FsbGJhY2tPckVycm9yQ2FsbGJhY2tcbiAgICApO1xuICAgIGNvbnN0IHJldmVyc2VFcnJvckNhbGxiYWNrID0gUHJvdmlkZXJIZWxwZXJzLmdldEVycm9yQ2FsbGJhY2tGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFjayxcbiAgICAgIGVycm9yQ2FsbGJhY2tcbiAgICApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYXJhbGxlbGl6ZSB8fCB0aGlzLm9wdGlvbnMuZmlyc3QpIHtcbiAgICAgIHRoaXMuZ2VvZGVjb2RlQWxsUHJvdmlkZXJzKFxuICAgICAgICByZXZlcnNlUXVlcnksXG4gICAgICAgIHJldmVyc2VDYWxsYmFjayxcbiAgICAgICAgcmV2ZXJzZUVycm9yQ2FsbGJhY2tcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5nZW9kZWNvZGVOZXh0UHJvdmlkZXIoXG4gICAgICB0aGlzLm9wdGlvbnMucHJvdmlkZXJzLFxuICAgICAgcmV2ZXJzZVF1ZXJ5LFxuICAgICAgcmV2ZXJzZUNhbGxiYWNrLFxuICAgICAgcmV2ZXJzZUVycm9yQ2FsbGJhY2tcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW9jb2RlTmV4dFByb3ZpZGVyKFxuICAgIHByb3ZpZGVyczogUHJvdmlkZXJJbnRlcmZhY2U8R2VvY29kZWQ+W10sXG4gICAgcXVlcnk6IHN0cmluZyB8IEdlb2NvZGVRdWVyeSB8IEdlb2NvZGVRdWVyeU9iamVjdCxcbiAgICBjYWxsYmFjazogQ2hhaW5HZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgICBlcnJvckNhbGxiYWNrPzogRXJyb3JDYWxsYmFja1xuICApOiB2b2lkIHtcbiAgICBjb25zdCBbcHJvdmlkZXIsIC4uLm5leHRQcm92aWRlcnNdID0gcHJvdmlkZXJzO1xuICAgIGNvbnN0IHJlc3VsdENhbGxiYWNrOiBDaGFpbkdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrID0gKHJlc3VsdHMpID0+IHtcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY2FsbGJhY2socmVzdWx0cyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ2VvY29kZU5leHRQcm92aWRlcihuZXh0UHJvdmlkZXJzLCBxdWVyeSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgIH07XG4gICAgY29uc3QgcmVzdWx0RXJyb3JDYWxsYmFjazogRXJyb3JDYWxsYmFjayA9IChyZXNwb25zZUVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICBlcnJvckNhbGxiYWNrKHJlc3BvbnNlRXJyb3IpO1xuICAgICAgfVxuICAgICAgaWYgKCFlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYEFuIGVycm9yIGhhcyBvY2N1cnJlZCB3aGVuIGdlb2NvZGluZyB3aXRoIHRoZSBwcm92aWRlciAke3Byb3ZpZGVyLmNvbnN0cnVjdG9yLm5hbWV9YCxcbiAgICAgICAgICByZXNwb25zZUVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXN1bHRDYWxsYmFjayhbXSk7XG4gICAgfTtcblxuICAgIHByb3ZpZGVyLmdlb2NvZGUocXVlcnksIHJlc3VsdENhbGxiYWNrLCByZXN1bHRFcnJvckNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VvZGVjb2RlTmV4dFByb3ZpZGVyKFxuICAgIHByb3ZpZGVyczogUHJvdmlkZXJJbnRlcmZhY2U8R2VvY29kZWQ+W10sXG4gICAgcmV2ZXJzZVF1ZXJ5OiBSZXZlcnNlUXVlcnksXG4gICAgY2FsbGJhY2s6IENoYWluR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgW3Byb3ZpZGVyLCAuLi5uZXh0UHJvdmlkZXJzXSA9IHByb3ZpZGVycztcbiAgICBjb25zdCByZXN1bHRDYWxsYmFjazogQ2hhaW5HZW9jb2RlZFJlc3VsdHNDYWxsYmFjayA9IChyZXN1bHRzKSA9PiB7XG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdHMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmdlb2RlY29kZU5leHRQcm92aWRlcihcbiAgICAgICAgbmV4dFByb3ZpZGVycyxcbiAgICAgICAgcmV2ZXJzZVF1ZXJ5LFxuICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgZXJyb3JDYWxsYmFja1xuICAgICAgKTtcbiAgICB9O1xuICAgIGNvbnN0IHJlc3VsdEVycm9yQ2FsbGJhY2s6IEVycm9yQ2FsbGJhY2sgPSAocmVzcG9uc2VFcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhyZXNwb25zZUVycm9yKTtcbiAgICAgIH1cbiAgICAgIGlmICghZXJyb3JDYWxsYmFjaykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGBBbiBlcnJvciBoYXMgb2NjdXJyZWQgd2hlbiBnZW9kZWNvZGluZyB3aXRoIHRoZSBwcm92aWRlciAke3Byb3ZpZGVyLmNvbnN0cnVjdG9yLm5hbWV9YCxcbiAgICAgICAgICByZXNwb25zZUVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXN1bHRDYWxsYmFjayhbXSk7XG4gICAgfTtcblxuICAgIHByb3ZpZGVyLmdlb2RlY29kZShyZXZlcnNlUXVlcnksIHJlc3VsdENhbGxiYWNrLCByZXN1bHRFcnJvckNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VvY29kZUFsbFByb3ZpZGVycyhcbiAgICBxdWVyeTogc3RyaW5nIHwgR2VvY29kZVF1ZXJ5IHwgR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICAgIGNhbGxiYWNrOiBDaGFpbkdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHByb3ZpZGVyUmVzdWx0czogTWFwPHN0cmluZywgR2VvY29kZWRbXT4gPSBuZXcgTWFwKCk7XG4gICAgbGV0IGNhbGxiYWNrQ2FsbGVkID0gZmFsc2U7XG4gICAgY29uc3QgZ2V0UHJvdmlkZXJSZXN1bHQgPSAoKSA9PlxuICAgICAgdGhpcy5vcHRpb25zLnByb3ZpZGVycy5yZWR1Y2UoKHJlc3VsdCwgcHJvdmlkZXIpID0+IHtcbiAgICAgICAgbGV0IHByb3ZpZGVyUmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICBpZiAodW5kZWZpbmVkID09PSBwcm92aWRlclJlc3VsdCAmJiB0aGlzLm9wdGlvbnMuZmlyc3QpIHtcbiAgICAgICAgICBwcm92aWRlclJlc3VsdCA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1bmRlZmluZWQgPT09IHByb3ZpZGVyUmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvdmlkZXJSZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBwcm92aWRlclJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm92aWRlclJlc3VsdHMuZ2V0KHByb3ZpZGVyLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgfSwgPHVuZGVmaW5lZCB8IEdlb2NvZGVkW10+W10pO1xuICAgIGNvbnN0IHJlc3VsdFByb3ZpZGVyQ2FsbGJhY2s6IChcbiAgICAgIHByb3ZpZGVyTmFtZTogc3RyaW5nXG4gICAgKSA9PiBDaGFpbkdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrID0gKHByb3ZpZGVyTmFtZSkgPT4gKHJlc3VsdHMpID0+IHtcbiAgICAgIHByb3ZpZGVyUmVzdWx0cy5zZXQocHJvdmlkZXJOYW1lLCByZXN1bHRzKTtcbiAgICAgIGNvbnN0IHByb3ZpZGVyUmVzdWx0ID0gZ2V0UHJvdmlkZXJSZXN1bHQoKTtcbiAgICAgIGlmICghY2FsbGJhY2tDYWxsZWQgJiYgcHJvdmlkZXJSZXN1bHQpIHtcbiAgICAgICAgY2FsbGJhY2socHJvdmlkZXJSZXN1bHQpO1xuICAgICAgICBjYWxsYmFja0NhbGxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCByZXN1bHRQcm92aWRlckVycm9yQ2FsbGJhY2s6IChcbiAgICAgIHByb3ZpZGVyTmFtZTogc3RyaW5nXG4gICAgKSA9PiBFcnJvckNhbGxiYWNrID0gKHByb3ZpZGVyTmFtZSkgPT4gKHJlc3BvbnNlRXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2socmVzcG9uc2VFcnJvcik7XG4gICAgICB9XG4gICAgICBpZiAoIWVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBgQW4gZXJyb3IgaGFzIG9jY3VycmVkIHdoZW4gZ2VvY29kaW5nIHdpdGggdGhlIHByb3ZpZGVyICR7cHJvdmlkZXJOYW1lfWAsXG4gICAgICAgICAgcmVzcG9uc2VFcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmVzdWx0UHJvdmlkZXJDYWxsYmFjayhwcm92aWRlck5hbWUpKFtdKTtcbiAgICB9O1xuXG4gICAgdGhpcy5vcHRpb25zLnByb3ZpZGVycy5mb3JFYWNoKChwcm92aWRlcikgPT4ge1xuICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gcHJvdmlkZXIuY29uc3RydWN0b3IubmFtZTtcbiAgICAgIHByb3ZpZGVyLmdlb2NvZGUoXG4gICAgICAgIHF1ZXJ5LFxuICAgICAgICByZXN1bHRQcm92aWRlckNhbGxiYWNrKHByb3ZpZGVyTmFtZSksXG4gICAgICAgIHJlc3VsdFByb3ZpZGVyRXJyb3JDYWxsYmFjayhwcm92aWRlck5hbWUpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW9kZWNvZGVBbGxQcm92aWRlcnMoXG4gICAgcmV2ZXJzZVF1ZXJ5OiBSZXZlcnNlUXVlcnksXG4gICAgY2FsbGJhY2s6IENoYWluR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgcHJvdmlkZXJSZXN1bHRzOiBNYXA8c3RyaW5nLCBHZW9jb2RlZFtdPiA9IG5ldyBNYXAoKTtcbiAgICBsZXQgY2FsbGJhY2tDYWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBnZXRQcm92aWRlclJlc3VsdCA9ICgpID0+XG4gICAgICB0aGlzLm9wdGlvbnMucHJvdmlkZXJzLnJlZHVjZSgocmVzdWx0LCBwcm92aWRlcikgPT4ge1xuICAgICAgICBsZXQgcHJvdmlkZXJSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgIGlmICh1bmRlZmluZWQgPT09IHByb3ZpZGVyUmVzdWx0ICYmIHRoaXMub3B0aW9ucy5maXJzdCkge1xuICAgICAgICAgIHByb3ZpZGVyUmVzdWx0ID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gcHJvdmlkZXJSZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm92aWRlclJlc3VsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3ZpZGVyUmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyUmVzdWx0cy5nZXQocHJvdmlkZXIuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICB9LCA8dW5kZWZpbmVkIHwgR2VvY29kZWRbXT5bXSk7XG4gICAgY29uc3QgcmVzdWx0UHJvdmlkZXJDYWxsYmFjazogKFxuICAgICAgcHJvdmlkZXJOYW1lOiBzdHJpbmdcbiAgICApID0+IENoYWluR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2sgPSAocHJvdmlkZXJOYW1lKSA9PiAocmVzdWx0cykgPT4ge1xuICAgICAgcHJvdmlkZXJSZXN1bHRzLnNldChwcm92aWRlck5hbWUsIHJlc3VsdHMpO1xuICAgICAgY29uc3QgcHJvdmlkZXJSZXN1bHQgPSBnZXRQcm92aWRlclJlc3VsdCgpO1xuICAgICAgaWYgKCFjYWxsYmFja0NhbGxlZCAmJiBwcm92aWRlclJlc3VsdCkge1xuICAgICAgICBjYWxsYmFjayhwcm92aWRlclJlc3VsdCk7XG4gICAgICAgIGNhbGxiYWNrQ2FsbGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHJlc3VsdFByb3ZpZGVyRXJyb3JDYWxsYmFjazogKFxuICAgICAgcHJvdmlkZXJOYW1lOiBzdHJpbmdcbiAgICApID0+IEVycm9yQ2FsbGJhY2sgPSAocHJvdmlkZXJOYW1lKSA9PiAocmVzcG9uc2VFcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhyZXNwb25zZUVycm9yKTtcbiAgICAgIH1cbiAgICAgIGlmICghZXJyb3JDYWxsYmFjaykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGBBbiBlcnJvciBoYXMgb2NjdXJyZWQgd2hlbiBnZW9kZWNvZGluZyB3aXRoIHRoZSBwcm92aWRlciAke3Byb3ZpZGVyTmFtZX1gLFxuICAgICAgICAgIHJlc3BvbnNlRXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdFByb3ZpZGVyQ2FsbGJhY2socHJvdmlkZXJOYW1lKShbXSk7XG4gICAgfTtcblxuICAgIHRoaXMub3B0aW9ucy5wcm92aWRlcnMuZm9yRWFjaCgocHJvdmlkZXIpID0+IHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHByb3ZpZGVyLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICBwcm92aWRlci5nZW9kZWNvZGUoXG4gICAgICAgIHJldmVyc2VRdWVyeSxcbiAgICAgICAgcmVzdWx0UHJvdmlkZXJDYWxsYmFjayhwcm92aWRlck5hbWUpLFxuICAgICAgICByZXN1bHRQcm92aWRlckVycm9yQ2FsbGJhY2socHJvdmlkZXJOYW1lKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gIHB1YmxpYyBleGVjdXRlUmVxdWVzdChcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgcGFyYW1zOiBFeHRlcm5hbExvYWRlclBhcmFtcyxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgY2FsbGJhY2s6IENoYWluR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGhlYWRlcnM/OiBFeHRlcm5hbExvYWRlckhlYWRlcnMsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGJvZHk/OiBFeHRlcm5hbExvYWRlckJvZHksXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiZXhlY3V0ZVJlcXVlc3QgY2Fubm90IGJlIGNhbGxlZCBkaXJlY3RseSBmcm9tIHRoZSBjaGFpbiBwcm92aWRlci5cIlxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEV4dGVybmFsTG9hZGVyQm9keSxcbiAgRXh0ZXJuYWxMb2FkZXJIZWFkZXJzLFxuICBFeHRlcm5hbExvYWRlckludGVyZmFjZSxcbiAgRXh0ZXJuYWxMb2FkZXJQYXJhbXMsXG59IGZyb20gXCJFeHRlcm5hbExvYWRlclwiO1xuaW1wb3J0IHtcbiAgRXJyb3JDYWxsYmFjayxcbiAgR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gIFByb3ZpZGVySGVscGVycyxcbiAgUHJvdmlkZXJJbnRlcmZhY2UsXG4gIFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSxcbiAgZGVmYXVsdFByb3ZpZGVyT3B0aW9ucyxcbn0gZnJvbSBcInByb3ZpZGVyXCI7XG5pbXBvcnQgR2VvY29kZWQgZnJvbSBcIkdlb2NvZGVkXCI7XG5pbXBvcnQge1xuICBHZW9jb2RlUXVlcnksXG4gIEdlb2NvZGVRdWVyeU9iamVjdCxcbiAgUmV2ZXJzZVF1ZXJ5LFxuICBSZXZlcnNlUXVlcnlPYmplY3QsXG59IGZyb20gXCJxdWVyeVwiO1xuXG5pbnRlcmZhY2UgTWFwUXVlc3RSZXF1ZXN0UGFyYW1zIHtcbiAgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHJlYWRvbmx5IGtleT86IHN0cmluZztcbiAgcmVhZG9ubHkgbG9jYXRpb246IHN0cmluZztcbiAgcmVhZG9ubHkganNvbnBDYWxsYmFjaz86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXBRdWVzdFJlc3VsdCB7XG4gIGxhdExuZzoge1xuICAgIGxhdDogbnVtYmVyO1xuICAgIGxuZzogbnVtYmVyO1xuICB9O1xuICBkaXNwbGF5TGF0TG5nOiB7XG4gICAgbGF0OiBudW1iZXI7XG4gICAgbG5nOiBudW1iZXI7XG4gIH07XG4gIHN0cmVldDogc3RyaW5nO1xuICBzaWRlT2ZTdHJlZXQ6IHN0cmluZztcbiAgYWRtaW5BcmVhMT86IHN0cmluZztcbiAgYWRtaW5BcmVhMVR5cGU/OiBzdHJpbmc7XG4gIGFkbWluQXJlYTM/OiBzdHJpbmc7XG4gIGFkbWluQXJlYTNUeXBlPzogc3RyaW5nO1xuICBhZG1pbkFyZWE0Pzogc3RyaW5nO1xuICBhZG1pbkFyZWE0VHlwZT86IHN0cmluZztcbiAgYWRtaW5BcmVhNT86IHN0cmluZztcbiAgYWRtaW5BcmVhNVR5cGU/OiBzdHJpbmc7XG4gIGFkbWluQXJlYTY/OiBzdHJpbmc7XG4gIGFkbWluQXJlYTZUeXBlPzogc3RyaW5nO1xuICBwb3N0YWxDb2RlOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgbGlua0lkOiBzdHJpbmc7XG4gIGRyYWdQb2ludDogYm9vbGVhbjtcbiAgZ2VvY29kZVF1YWxpdHk6IHN0cmluZztcbiAgZ2VvY29kZVF1YWxpdHlDb2RlOiBzdHJpbmc7XG59XG5cbnR5cGUgTWFwUXVlc3RHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayA9IEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPEdlb2NvZGVkPjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwUXVlc3RQcm92aWRlciBpbXBsZW1lbnRzIFByb3ZpZGVySW50ZXJmYWNlPEdlb2NvZGVkPiB7XG4gIHByaXZhdGUgZXh0ZXJuYWxMb2FkZXI6IEV4dGVybmFsTG9hZGVySW50ZXJmYWNlO1xuXG4gIHByaXZhdGUgb3B0aW9uczogUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBfZXh0ZXJuYWxMb2FkZXI6IEV4dGVybmFsTG9hZGVySW50ZXJmYWNlLFxuICAgIG9wdGlvbnM6IFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSA9IGRlZmF1bHRQcm92aWRlck9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy5leHRlcm5hbExvYWRlciA9IF9leHRlcm5hbExvYWRlcjtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLmRlZmF1bHRQcm92aWRlck9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5hcGlLZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0FuIEFQSSBrZXkgaXMgcmVxdWlyZWQgZm9yIHRoZSBNYXBRdWVzdCBwcm92aWRlci4gUGxlYXNlIGFkZCBpdCBpbiB0aGUgXCJhcGlLZXlcIiBvcHRpb24uJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2VvY29kZShcbiAgICBxdWVyeTogc3RyaW5nIHwgR2VvY29kZVF1ZXJ5IHwgR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICAgIGNhbGxiYWNrOiBNYXBRdWVzdEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdlb2NvZGVRdWVyeSA9IFByb3ZpZGVySGVscGVycy5nZXRHZW9jb2RlUXVlcnlGcm9tUGFyYW1ldGVyKHF1ZXJ5KTtcblxuICAgIGlmIChnZW9jb2RlUXVlcnkuZ2V0SXAoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIlRoZSBNYXBRdWVzdCBwcm92aWRlciBkb2VzIG5vdCBzdXBwb3J0IElQIGdlb2xvY2F0aW9uLCBvbmx5IGxvY2F0aW9uIGdlb2NvZGluZy5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLnNldE9wdGlvbnMoe1xuICAgICAgcHJvdG9jb2w6IHRoaXMub3B0aW9ucy51c2VTc2wgPyBcImh0dHBzXCIgOiBcImh0dHBcIixcbiAgICAgIGhvc3Q6IFwid3d3Lm1hcHF1ZXN0YXBpLmNvbVwiLFxuICAgICAgcGF0aG5hbWU6IFwiZ2VvY29kaW5nL3YxL2FkZHJlc3NcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IHBhcmFtczogTWFwUXVlc3RSZXF1ZXN0UGFyYW1zID0ge1xuICAgICAga2V5OiB0aGlzLm9wdGlvbnMuYXBpS2V5LFxuICAgICAgbG9jYXRpb246IGdlb2NvZGVRdWVyeS5nZXRUZXh0KCkgfHwgXCJcIixcbiAgICAgIGpzb25wQ2FsbGJhY2s6IHRoaXMub3B0aW9ucy51c2VKc29ucCA/IFwiY2FsbGJhY2tcIiA6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgdGhpcy5leGVjdXRlUmVxdWVzdChwYXJhbXMsIGNhbGxiYWNrLCB7fSwge30sIGVycm9yQ2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIGdlb2RlY29kZShcbiAgICBsYXRpdHVkZU9yUXVlcnk6IG51bWJlciB8IHN0cmluZyB8IFJldmVyc2VRdWVyeSB8IFJldmVyc2VRdWVyeU9iamVjdCxcbiAgICBsb25naXR1ZGVPckNhbGxiYWNrOiBudW1iZXIgfCBzdHJpbmcgfCBNYXBRdWVzdEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrPzogTWFwUXVlc3RHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayB8IEVycm9yQ2FsbGJhY2ssXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgcmV2ZXJzZVF1ZXJ5ID0gUHJvdmlkZXJIZWxwZXJzLmdldFJldmVyc2VRdWVyeUZyb21QYXJhbWV0ZXJzKFxuICAgICAgbGF0aXR1ZGVPclF1ZXJ5LFxuICAgICAgbG9uZ2l0dWRlT3JDYWxsYmFja1xuICAgICk7XG4gICAgY29uc3QgcmV2ZXJzZUNhbGxiYWNrID0gUHJvdmlkZXJIZWxwZXJzLmdldENhbGxiYWNrRnJvbVBhcmFtZXRlcnMoXG4gICAgICBsb25naXR1ZGVPckNhbGxiYWNrLFxuICAgICAgY2FsbGJhY2tPckVycm9yQ2FsbGJhY2tcbiAgICApO1xuICAgIGNvbnN0IHJldmVyc2VFcnJvckNhbGxiYWNrID0gUHJvdmlkZXJIZWxwZXJzLmdldEVycm9yQ2FsbGJhY2tGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFjayxcbiAgICAgIGVycm9yQ2FsbGJhY2tcbiAgICApO1xuXG4gICAgdGhpcy5leHRlcm5hbExvYWRlci5zZXRPcHRpb25zKHtcbiAgICAgIHByb3RvY29sOiB0aGlzLm9wdGlvbnMudXNlU3NsID8gXCJodHRwc1wiIDogXCJodHRwXCIsXG4gICAgICBob3N0OiBcInd3dy5tYXBxdWVzdGFwaS5jb21cIixcbiAgICAgIHBhdGhuYW1lOiBcImdlb2NvZGluZy92MS9yZXZlcnNlXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXJhbXM6IE1hcFF1ZXN0UmVxdWVzdFBhcmFtcyA9IHtcbiAgICAgIGtleTogdGhpcy5vcHRpb25zLmFwaUtleSxcbiAgICAgIGxvY2F0aW9uOiBgJHtyZXZlcnNlUXVlcnkuZ2V0Q29vcmRpbmF0ZXMoKS5sYXRpdHVkZX0sJHtcbiAgICAgICAgcmV2ZXJzZVF1ZXJ5LmdldENvb3JkaW5hdGVzKCkubG9uZ2l0dWRlXG4gICAgICB9YCxcbiAgICAgIGpzb25wQ2FsbGJhY2s6IHRoaXMub3B0aW9ucy51c2VKc29ucCA/IFwiY2FsbGJhY2tcIiA6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgdGhpcy5leGVjdXRlUmVxdWVzdChwYXJhbXMsIHJldmVyc2VDYWxsYmFjaywge30sIHt9LCByZXZlcnNlRXJyb3JDYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVJlcXVlc3QoXG4gICAgcGFyYW1zOiBFeHRlcm5hbExvYWRlclBhcmFtcyxcbiAgICBjYWxsYmFjazogTWFwUXVlc3RHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgICBoZWFkZXJzPzogRXh0ZXJuYWxMb2FkZXJIZWFkZXJzLFxuICAgIGJvZHk/OiBFeHRlcm5hbExvYWRlckJvZHksXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5leHRlcm5hbExvYWRlci5leGVjdXRlUmVxdWVzdChcbiAgICAgIHBhcmFtcyxcbiAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgIGRhdGEucmVzdWx0c1swXS5sb2NhdGlvbnMubWFwKChyZXN1bHQ6IE1hcFF1ZXN0UmVzdWx0KSA9PlxuICAgICAgICAgICAgTWFwUXVlc3RQcm92aWRlci5tYXBUb0dlb2NvZGVkKHJlc3VsdClcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgaGVhZGVycyxcbiAgICAgIGJvZHksXG4gICAgICBlcnJvckNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbWFwVG9HZW9jb2RlZChyZXN1bHQ6IE1hcFF1ZXN0UmVzdWx0KTogR2VvY29kZWQge1xuICAgIGNvbnN0IGxhdGl0dWRlID0gcmVzdWx0LmxhdExuZy5sYXQ7XG4gICAgY29uc3QgbG9uZ2l0dWRlID0gcmVzdWx0LmxhdExuZy5sbmc7XG4gICAgY29uc3Qgc3RyZWV0TmFtZSA9IHJlc3VsdC5zdHJlZXQ7XG4gICAgY29uc3Qgc3ViTG9jYWxpdHkgPSByZXN1bHQuYWRtaW5BcmVhNjtcbiAgICBjb25zdCBsb2NhbGl0eSA9IHJlc3VsdC5hZG1pbkFyZWE1O1xuICAgIGNvbnN0IHsgcG9zdGFsQ29kZSB9ID0gcmVzdWx0O1xuICAgIGNvbnN0IHJlZ2lvbiA9IHJlc3VsdC5hZG1pbkFyZWE0O1xuICAgIGNvbnN0IGNvdW50cnkgPSByZXN1bHQuYWRtaW5BcmVhMTtcbiAgICBjb25zdCBjb3VudHJ5Q29kZSA9IHJlc3VsdC5hZG1pbkFyZWExO1xuXG4gICAgcmV0dXJuIEdlb2NvZGVkLmNyZWF0ZSh7XG4gICAgICBsYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZSxcbiAgICAgIHN0cmVldE5hbWUsXG4gICAgICBzdWJMb2NhbGl0eSxcbiAgICAgIGxvY2FsaXR5LFxuICAgICAgcG9zdGFsQ29kZSxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGNvdW50cnksXG4gICAgICBjb3VudHJ5Q29kZSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXJyb3JDYWxsYmFjaywgR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2sgfSBmcm9tIFwicHJvdmlkZXJcIjtcbmltcG9ydCBHZW9jb2RlZCBmcm9tIFwiR2VvY29kZWRcIjtcbmltcG9ydCB7XG4gIEdlb2NvZGVRdWVyeSxcbiAgR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICBSZXZlcnNlUXVlcnksXG4gIFJldmVyc2VRdWVyeU9iamVjdCxcbn0gZnJvbSBcInF1ZXJ5XCI7XG5pbXBvcnQgeyBpc0lwdjQsIGlzSXB2NiB9IGZyb20gXCJ1dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm92aWRlckhlbHBlcnMge1xuICBwdWJsaWMgc3RhdGljIGdldEdlb2NvZGVRdWVyeUZyb21QYXJhbWV0ZXIoXG4gICAgcXVlcnk6IHN0cmluZyB8IEdlb2NvZGVRdWVyeSB8IEdlb2NvZGVRdWVyeU9iamVjdCxcbiAgICBnZW9jb2RlUXVlcnkgPSBHZW9jb2RlUXVlcnlcbiAgKTogR2VvY29kZVF1ZXJ5IHtcbiAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAoaXNJcHY0KHF1ZXJ5KSB8fCBpc0lwdjYocXVlcnkpKSB7XG4gICAgICAgIHJldHVybiBnZW9jb2RlUXVlcnkuY3JlYXRlKHsgaXA6IHF1ZXJ5IH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdlb2NvZGVRdWVyeS5jcmVhdGUoeyB0ZXh0OiBxdWVyeSB9KTtcbiAgICB9XG4gICAgaWYgKCEocXVlcnkgaW5zdGFuY2VvZiBnZW9jb2RlUXVlcnkpKSB7XG4gICAgICByZXR1cm4gZ2VvY29kZVF1ZXJ5LmNyZWF0ZShxdWVyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRSZXZlcnNlUXVlcnlGcm9tUGFyYW1ldGVyczxHIGV4dGVuZHMgR2VvY29kZWQ+KFxuICAgIGxhdGl0dWRlT3JRdWVyeTogbnVtYmVyIHwgc3RyaW5nIHwgUmV2ZXJzZVF1ZXJ5IHwgUmV2ZXJzZVF1ZXJ5T2JqZWN0LFxuICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2s6IG51bWJlciB8IHN0cmluZyB8IEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPEc+LFxuICAgIHJldmVyc2VRdWVyeSA9IFJldmVyc2VRdWVyeVxuICApOiBSZXZlcnNlUXVlcnkge1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiBsYXRpdHVkZU9yUXVlcnkgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgIHR5cGVvZiBsYXRpdHVkZU9yUXVlcnkgPT09IFwic3RyaW5nXCJcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgIShcbiAgICAgICAgICB0eXBlb2YgbG9uZ2l0dWRlT3JDYWxsYmFjayA9PT0gXCJudW1iZXJcIiB8fFxuICAgICAgICAgIHR5cGVvZiBsb25naXR1ZGVPckNhbGxiYWNrID09PSBcInN0cmluZ1wiXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJUaGUgc2Vjb25kIHBhcmFtZXRlciBvZiBnZW9kZWNvZGUgbXVzdCBiZSBhIGxvbmdpdHVkZSBpZiB0aGUgZmlyc3Qgb25lIGlzIGEgbGF0aXR1ZGVcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldmVyc2VRdWVyeS5jcmVhdGUoe1xuICAgICAgICBsYXRpdHVkZTogbGF0aXR1ZGVPclF1ZXJ5LFxuICAgICAgICBsb25naXR1ZGU6IGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCEobGF0aXR1ZGVPclF1ZXJ5IGluc3RhbmNlb2YgcmV2ZXJzZVF1ZXJ5KSkge1xuICAgICAgcmV0dXJuIHJldmVyc2VRdWVyeS5jcmVhdGUobGF0aXR1ZGVPclF1ZXJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGF0aXR1ZGVPclF1ZXJ5O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRDYWxsYmFja0Zyb21QYXJhbWV0ZXJzPEcgZXh0ZW5kcyBHZW9jb2RlZD4oXG4gICAgbG9uZ2l0dWRlT3JDYWxsYmFjazogbnVtYmVyIHwgc3RyaW5nIHwgR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2s8Rz4sXG4gICAgY2FsbGJhY2tPckVycm9yQ2FsbGJhY2s/OiBHZW9jb2RlZFJlc3VsdHNDYWxsYmFjazxHPiB8IEVycm9yQ2FsbGJhY2tcbiAgKTogR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2s8Rz4ge1xuICAgIGlmIChcbiAgICAgICEoXG4gICAgICAgIHR5cGVvZiBsb25naXR1ZGVPckNhbGxiYWNrID09PSBcIm51bWJlclwiIHx8XG4gICAgICAgIHR5cGVvZiBsb25naXR1ZGVPckNhbGxiYWNrID09PSBcInN0cmluZ1wiXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm4gbG9uZ2l0dWRlT3JDYWxsYmFjaztcbiAgICB9XG4gICAgaWYgKGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gPEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPEc+PmNhbGxiYWNrT3JFcnJvckNhbGxiYWNrO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiQSBjYWxsYmFjayBtdXN0IGJlIHNldCBhdCB0aGUgbGFzdCBwYXJhbWV0ZXIgb2YgZ2VvZGVjb2RlXCJcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRFcnJvckNhbGxiYWNrRnJvbVBhcmFtZXRlcnM8RyBleHRlbmRzIEdlb2NvZGVkPihcbiAgICBsb25naXR1ZGVPckNhbGxiYWNrOiBudW1iZXIgfCBzdHJpbmcgfCBHZW9jb2RlZFJlc3VsdHNDYWxsYmFjazxHPixcbiAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFjaz86IEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPEc+IHwgRXJyb3JDYWxsYmFjayxcbiAgICBlcnJvckNhbGxiYWNrPzogRXJyb3JDYWxsYmFja1xuICApOiB1bmRlZmluZWQgfCBFcnJvckNhbGxiYWNrIHtcbiAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGVycm9yQ2FsbGJhY2s7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIGxvbmdpdHVkZU9yQ2FsbGJhY2sgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgIHR5cGVvZiBsb25naXR1ZGVPckNhbGxiYWNrID09PSBcInN0cmluZ1wiXG4gICAgKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiA8dW5kZWZpbmVkIHwgRXJyb3JDYWxsYmFjaz5jYWxsYmFja09yRXJyb3JDYWxsYmFjaztcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRXh0ZXJuYWxMb2FkZXJCb2R5LFxuICBFeHRlcm5hbExvYWRlckhlYWRlcnMsXG4gIEV4dGVybmFsTG9hZGVyUGFyYW1zLFxufSBmcm9tIFwiRXh0ZXJuYWxMb2FkZXJcIjtcbmltcG9ydCBHZW9jb2RlZCBmcm9tIFwiR2VvY29kZWRcIjtcbmltcG9ydCB7XG4gIEdlb2NvZGVRdWVyeSxcbiAgR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICBSZXZlcnNlUXVlcnksXG4gIFJldmVyc2VRdWVyeU9iamVjdCxcbn0gZnJvbSBcInF1ZXJ5XCI7XG5pbXBvcnQgeyBSZXNwb25zZUVycm9yIH0gZnJvbSBcImVycm9yXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFU1VMVF9MSU1JVCA9IDU7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvdmlkZXJPcHRpb25zOiBQcm92aWRlck9wdGlvbnNJbnRlcmZhY2UgPSB7XG4gIHVzZVNzbDogZmFsc2UsXG4gIHVzZUpzb25wOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlIHtcbiAgcmVhZG9ubHkgdXNlU3NsPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgdXNlSnNvbnA/OiBib29sZWFuO1xuICByZWFkb25seSBhcGlLZXk/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPEcgZXh0ZW5kcyBHZW9jb2RlZD4gPSAoXG4gIHJlc3VsdHM6IEdbXVxuKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgRXJyb3JDYWxsYmFjayA9IChyZXNwb25zZUVycm9yOiBSZXNwb25zZUVycm9yKSA9PiB2b2lkO1xuXG5leHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgUHJvdmlkZXJJbnRlcmZhY2U8RyBleHRlbmRzIEdlb2NvZGVkPiB7XG4gIGdlb2NvZGUoXG4gICAgcXVlcnk6IHN0cmluZyB8IEdlb2NvZGVRdWVyeSB8IEdlb2NvZGVRdWVyeU9iamVjdCxcbiAgICBjYWxsYmFjazogR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2s8Rz4sXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZDtcbiAgZ2VvZGVjb2RlKFxuICAgIGxhdGl0dWRlT3JRdWVyeTogbnVtYmVyIHwgc3RyaW5nIHwgUmV2ZXJzZVF1ZXJ5IHwgUmV2ZXJzZVF1ZXJ5T2JqZWN0LFxuICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2s6IG51bWJlciB8IHN0cmluZyB8IEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPEc+LFxuICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrPzogR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2s8Rz4gfCBFcnJvckNhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQ7XG4gIGV4ZWN1dGVSZXF1ZXN0KFxuICAgIHBhcmFtczogRXh0ZXJuYWxMb2FkZXJQYXJhbXMsXG4gICAgY2FsbGJhY2s6IEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPEc+LFxuICAgIGhlYWRlcnM/OiBFeHRlcm5hbExvYWRlckhlYWRlcnMsXG4gICAgYm9keT86IEV4dGVybmFsTG9hZGVyQm9keSxcbiAgICBlcnJvckNhbGxiYWNrPzogRXJyb3JDYWxsYmFja1xuICApOiB2b2lkO1xufVxuIiwiaW1wb3J0IHtcbiAgRXh0ZXJuYWxMb2FkZXJCb2R5LFxuICBFeHRlcm5hbExvYWRlckhlYWRlcnMsXG4gIEV4dGVybmFsTG9hZGVySW50ZXJmYWNlLFxuICBFeHRlcm5hbExvYWRlclBhcmFtcyxcbn0gZnJvbSBcIkV4dGVybmFsTG9hZGVyXCI7XG5pbXBvcnQge1xuICBFcnJvckNhbGxiYWNrLFxuICBHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgUHJvdmlkZXJIZWxwZXJzLFxuICBQcm92aWRlckludGVyZmFjZSxcbiAgUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlLFxuICBkZWZhdWx0UHJvdmlkZXJPcHRpb25zLFxufSBmcm9tIFwicHJvdmlkZXJcIjtcbmltcG9ydCBHZW9jb2RlZCBmcm9tIFwiR2VvY29kZWRcIjtcbmltcG9ydCB7XG4gIEdlb2NvZGVRdWVyeSxcbiAgR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICBSZXZlcnNlUXVlcnksXG4gIFJldmVyc2VRdWVyeU9iamVjdCxcbn0gZnJvbSBcInF1ZXJ5XCI7XG5cbmludGVyZmFjZSBZYW5kZXhSZXF1ZXN0UGFyYW1zIHtcbiAgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHJlYWRvbmx5IGFwaWtleT86IHN0cmluZztcbiAgcmVhZG9ubHkgZ2VvY29kZTogc3RyaW5nO1xuICByZWFkb25seSBmb3JtYXQ6IHN0cmluZztcbiAgcmVhZG9ubHkgbGFuZz86IHN0cmluZztcbiAgcmVhZG9ubHkgdG9wb255bT86IFwiaG91c2VcIiB8IFwic3RyZWV0XCIgfCBcIm1ldHJvXCIgfCBcImRpc3RyaWN0XCIgfCBcImxvY2FsaXR5XCI7XG4gIHJlYWRvbmx5IGpzb25wQ2FsbGJhY2s/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBZYW5kZXhDb2xsZWN0aW9uUmVzdWx0IHtcbiAgR2VvT2JqZWN0OiBZYW5kZXhSZXN1bHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgWWFuZGV4UmVzdWx0IHtcbiAgbWV0YURhdGFQcm9wZXJ0eToge1xuICAgIEdlb2NvZGVyTWV0YURhdGE6IHtcbiAgICAgIGtpbmQ6IHN0cmluZztcbiAgICAgIHRleHQ6IHN0cmluZztcbiAgICAgIHByZWNpc2lvbjogc3RyaW5nO1xuICAgICAgQWRkcmVzc0RldGFpbHM6IHtcbiAgICAgICAgQ291bnRyeToge1xuICAgICAgICAgIEFkZHJlc3NMaW5lOiBzdHJpbmc7XG4gICAgICAgICAgQ291bnRyeU5hbWVDb2RlOiBzdHJpbmc7XG4gICAgICAgICAgQ291bnRyeU5hbWU6IHN0cmluZztcbiAgICAgICAgICBBZG1pbmlzdHJhdGl2ZUFyZWE/OiB7XG4gICAgICAgICAgICBBZG1pbmlzdHJhdGl2ZUFyZWFOYW1lOiBzdHJpbmc7XG4gICAgICAgICAgICBTdWJBZG1pbmlzdHJhdGl2ZUFyZWE/OiB7XG4gICAgICAgICAgICAgIFN1YkFkbWluaXN0cmF0aXZlQXJlYU5hbWU6IHN0cmluZztcbiAgICAgICAgICAgICAgTG9jYWxpdHk/OiB7XG4gICAgICAgICAgICAgICAgTG9jYWxpdHlOYW1lOiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgVGhvcm91Z2hmYXJlPzoge1xuICAgICAgICAgICAgICAgICAgVGhvcm91Z2hmYXJlTmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgUHJlbWlzZToge1xuICAgICAgICAgICAgICAgICAgICBQcmVtaXNlTnVtYmVyOiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG4gIH07XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgYm91bmRlZEJ5OiB7XG4gICAgRW52ZWxvcGU6IHtcbiAgICAgIGxvd2VyQ29ybmVyOiBzdHJpbmc7XG4gICAgICB1cHBlckNvcm5lcjogc3RyaW5nO1xuICAgIH07XG4gIH07XG4gIFBvaW50OiB7XG4gICAgcG9zOiBzdHJpbmc7XG4gIH07XG59XG5cbmludGVyZmFjZSBZYW5kZXhGbGF0dGVuZWRBZGRyZXNzRGV0YWlscyB7XG4gIENvdW50cnlOYW1lQ29kZT86IHN0cmluZztcbiAgQ291bnRyeU5hbWU/OiBzdHJpbmc7XG4gIEFkbWluaXN0cmF0aXZlQXJlYU5hbWU/OiBzdHJpbmc7XG4gIExvY2FsaXR5TmFtZT86IHN0cmluZztcbiAgRGVwZW5kZW50TG9jYWxpdHlOYW1lPzogc3RyaW5nO1xuICBUaG9yb3VnaGZhcmVOYW1lPzogc3RyaW5nO1xuICBQcmVtaXNlTnVtYmVyPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFlhbmRleFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZVxuICBleHRlbmRzIFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSB7XG4gIHJlYWRvbmx5IHRvcG9ueW0/OiBcImhvdXNlXCIgfCBcInN0cmVldFwiIHwgXCJtZXRyb1wiIHwgXCJkaXN0cmljdFwiIHwgXCJsb2NhbGl0eVwiO1xufVxuXG50eXBlIFlhbmRleEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrID0gR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2s8R2VvY29kZWQ+O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZYW5kZXhQcm92aWRlciBpbXBsZW1lbnRzIFByb3ZpZGVySW50ZXJmYWNlPEdlb2NvZGVkPiB7XG4gIHByaXZhdGUgZXh0ZXJuYWxMb2FkZXI6IEV4dGVybmFsTG9hZGVySW50ZXJmYWNlO1xuXG4gIHByaXZhdGUgb3B0aW9uczogWWFuZGV4UHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBfZXh0ZXJuYWxMb2FkZXI6IEV4dGVybmFsTG9hZGVySW50ZXJmYWNlLFxuICAgIG9wdGlvbnM6IFlhbmRleFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSA9IGRlZmF1bHRQcm92aWRlck9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy5leHRlcm5hbExvYWRlciA9IF9leHRlcm5hbExvYWRlcjtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLmRlZmF1bHRQcm92aWRlck9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZW9jb2RlKFxuICAgIHF1ZXJ5OiBzdHJpbmcgfCBHZW9jb2RlUXVlcnkgfCBHZW9jb2RlUXVlcnlPYmplY3QsXG4gICAgY2FsbGJhY2s6IFlhbmRleEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdlb2NvZGVRdWVyeSA9IFByb3ZpZGVySGVscGVycy5nZXRHZW9jb2RlUXVlcnlGcm9tUGFyYW1ldGVyKHF1ZXJ5KTtcblxuICAgIGlmIChnZW9jb2RlUXVlcnkuZ2V0SXAoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIlRoZSBZYW5kZXggcHJvdmlkZXIgZG9lcyBub3Qgc3VwcG9ydCBJUCBnZW9sb2NhdGlvbiwgb25seSBsb2NhdGlvbiBnZW9jb2RpbmcuXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5leHRlcm5hbExvYWRlci5zZXRPcHRpb25zKHtcbiAgICAgIHByb3RvY29sOiB0aGlzLm9wdGlvbnMudXNlU3NsID8gXCJodHRwc1wiIDogXCJodHRwXCIsXG4gICAgICBob3N0OiBcImdlb2NvZGUtbWFwcy55YW5kZXgucnVcIixcbiAgICAgIHBhdGhuYW1lOiBcIjEueFwiLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFyYW1zOiBZYW5kZXhSZXF1ZXN0UGFyYW1zID0ge1xuICAgICAgYXBpa2V5OiB0aGlzLm9wdGlvbnMuYXBpS2V5LFxuICAgICAgZ2VvY29kZTogZ2VvY29kZVF1ZXJ5LmdldFRleHQoKSB8fCBcIlwiLFxuICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgIGxhbmc6IGdlb2NvZGVRdWVyeS5nZXRMb2NhbGUoKSxcbiAgICAgIGpzb25wQ2FsbGJhY2s6IHRoaXMub3B0aW9ucy51c2VKc29ucCA/IFwiY2FsbGJhY2tcIiA6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgdGhpcy5leGVjdXRlUmVxdWVzdChwYXJhbXMsIGNhbGxiYWNrLCB7fSwge30sIGVycm9yQ2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIGdlb2RlY29kZShcbiAgICBsYXRpdHVkZU9yUXVlcnk6IG51bWJlciB8IHN0cmluZyB8IFJldmVyc2VRdWVyeSB8IFJldmVyc2VRdWVyeU9iamVjdCxcbiAgICBsb25naXR1ZGVPckNhbGxiYWNrOiBudW1iZXIgfCBzdHJpbmcgfCBZYW5kZXhHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFjaz86IFlhbmRleEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrIHwgRXJyb3JDYWxsYmFjayxcbiAgICBlcnJvckNhbGxiYWNrPzogRXJyb3JDYWxsYmFja1xuICApOiB2b2lkIHtcbiAgICBjb25zdCByZXZlcnNlUXVlcnkgPSBQcm92aWRlckhlbHBlcnMuZ2V0UmV2ZXJzZVF1ZXJ5RnJvbVBhcmFtZXRlcnMoXG4gICAgICBsYXRpdHVkZU9yUXVlcnksXG4gICAgICBsb25naXR1ZGVPckNhbGxiYWNrXG4gICAgKTtcbiAgICBjb25zdCByZXZlcnNlQ2FsbGJhY2sgPSBQcm92aWRlckhlbHBlcnMuZ2V0Q2FsbGJhY2tGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFja1xuICAgICk7XG4gICAgY29uc3QgcmV2ZXJzZUVycm9yQ2FsbGJhY2sgPSBQcm92aWRlckhlbHBlcnMuZ2V0RXJyb3JDYWxsYmFja0Zyb21QYXJhbWV0ZXJzKFxuICAgICAgbG9uZ2l0dWRlT3JDYWxsYmFjayxcbiAgICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFja1xuICAgICk7XG5cbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLnNldE9wdGlvbnMoe1xuICAgICAgcHJvdG9jb2w6IHRoaXMub3B0aW9ucy51c2VTc2wgPyBcImh0dHBzXCIgOiBcImh0dHBcIixcbiAgICAgIGhvc3Q6IFwiZ2VvY29kZS1tYXBzLnlhbmRleC5ydVwiLFxuICAgICAgcGF0aG5hbWU6IFwiMS54XCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXJhbXM6IFlhbmRleFJlcXVlc3RQYXJhbXMgPSB7XG4gICAgICBhcGlrZXk6IHRoaXMub3B0aW9ucy5hcGlLZXksXG4gICAgICBnZW9jb2RlOiBgJHtyZXZlcnNlUXVlcnkuZ2V0Q29vcmRpbmF0ZXMoKS5sb25naXR1ZGV9LCR7XG4gICAgICAgIHJldmVyc2VRdWVyeS5nZXRDb29yZGluYXRlcygpLmxhdGl0dWRlXG4gICAgICB9YCxcbiAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICBsYW5nOiByZXZlcnNlUXVlcnkuZ2V0TG9jYWxlKCksXG4gICAgICB0b3BvbnltOiB0aGlzLm9wdGlvbnMudG9wb255bSxcbiAgICAgIGpzb25wQ2FsbGJhY2s6IHRoaXMub3B0aW9ucy51c2VKc29ucCA/IFwiY2FsbGJhY2tcIiA6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgdGhpcy5leGVjdXRlUmVxdWVzdChwYXJhbXMsIHJldmVyc2VDYWxsYmFjaywge30sIHt9LCByZXZlcnNlRXJyb3JDYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVJlcXVlc3QoXG4gICAgcGFyYW1zOiBFeHRlcm5hbExvYWRlclBhcmFtcyxcbiAgICBjYWxsYmFjazogWWFuZGV4R2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgaGVhZGVycz86IEV4dGVybmFsTG9hZGVySGVhZGVycyxcbiAgICBib2R5PzogRXh0ZXJuYWxMb2FkZXJCb2R5LFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIuZXhlY3V0ZVJlcXVlc3QoXG4gICAgICBwYXJhbXMsXG4gICAgICAoZGF0YSkgPT4ge1xuICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICBkYXRhLnJlc3BvbnNlLkdlb09iamVjdENvbGxlY3Rpb24uZmVhdHVyZU1lbWJlci5tYXAoXG4gICAgICAgICAgICAocmVzdWx0OiBZYW5kZXhDb2xsZWN0aW9uUmVzdWx0KSA9PlxuICAgICAgICAgICAgICBZYW5kZXhQcm92aWRlci5tYXBUb0dlb2NvZGVkKHJlc3VsdC5HZW9PYmplY3QpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICBib2R5LFxuICAgICAgZXJyb3JDYWxsYmFja1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG1hcFRvR2VvY29kZWQocmVzdWx0OiBZYW5kZXhSZXN1bHQpOiBHZW9jb2RlZCB7XG4gICAgY29uc3QgcG9pbnQgPSByZXN1bHQuUG9pbnQucG9zLnNwbGl0KFwiIFwiKTtcbiAgICBjb25zdCBsYXRpdHVkZSA9IHBhcnNlRmxvYXQocG9pbnRbMV0pO1xuICAgIGNvbnN0IGxvbmdpdHVkZSA9IHBhcnNlRmxvYXQocG9pbnRbMF0pO1xuXG4gICAgY29uc3QgYWRkcmVzc0RldGFpbHM6IFlhbmRleEZsYXR0ZW5lZEFkZHJlc3NEZXRhaWxzID0gWWFuZGV4UHJvdmlkZXIuZmxhdHRlbk9iamVjdChcbiAgICAgIHJlc3VsdC5tZXRhRGF0YVByb3BlcnR5Lkdlb2NvZGVyTWV0YURhdGEuQWRkcmVzc0RldGFpbHNcbiAgICApO1xuXG4gICAgY29uc3Qgc3RyZWV0TnVtYmVyID0gYWRkcmVzc0RldGFpbHMuUHJlbWlzZU51bWJlcjtcbiAgICBjb25zdCBzdHJlZXROYW1lID0gYWRkcmVzc0RldGFpbHMuVGhvcm91Z2hmYXJlTmFtZTtcbiAgICBjb25zdCBzdWJMb2NhbGl0eSA9IGFkZHJlc3NEZXRhaWxzLkRlcGVuZGVudExvY2FsaXR5TmFtZTtcbiAgICBjb25zdCBsb2NhbGl0eSA9IGFkZHJlc3NEZXRhaWxzLkxvY2FsaXR5TmFtZTtcbiAgICBjb25zdCByZWdpb24gPSBhZGRyZXNzRGV0YWlscy5BZG1pbmlzdHJhdGl2ZUFyZWFOYW1lO1xuICAgIGNvbnN0IGNvdW50cnkgPSBhZGRyZXNzRGV0YWlscy5Db3VudHJ5TmFtZTtcbiAgICBjb25zdCBjb3VudHJ5Q29kZSA9IGFkZHJlc3NEZXRhaWxzLkNvdW50cnlOYW1lQ29kZTtcblxuICAgIGxldCBnZW9jb2RlZCA9IEdlb2NvZGVkLmNyZWF0ZSh7XG4gICAgICBsYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZSxcbiAgICAgIHN0cmVldE51bWJlcixcbiAgICAgIHN0cmVldE5hbWUsXG4gICAgICBzdWJMb2NhbGl0eSxcbiAgICAgIGxvY2FsaXR5LFxuICAgICAgcmVnaW9uLFxuICAgICAgY291bnRyeSxcbiAgICAgIGNvdW50cnlDb2RlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgbG93ZXJDb3JuZXIgPSByZXN1bHQuYm91bmRlZEJ5LkVudmVsb3BlLmxvd2VyQ29ybmVyLnNwbGl0KFwiIFwiKTtcbiAgICBjb25zdCB1cHBlckNvcm5lciA9IHJlc3VsdC5ib3VuZGVkQnkuRW52ZWxvcGUudXBwZXJDb3JuZXIuc3BsaXQoXCIgXCIpO1xuICAgIGdlb2NvZGVkID0gZ2VvY29kZWQud2l0aEJvdW5kcyhcbiAgICAgIHBhcnNlRmxvYXQobG93ZXJDb3JuZXJbMV0pLFxuICAgICAgcGFyc2VGbG9hdChsb3dlckNvcm5lclswXSksXG4gICAgICBwYXJzZUZsb2F0KHVwcGVyQ29ybmVyWzFdKSxcbiAgICAgIHBhcnNlRmxvYXQodXBwZXJDb3JuZXJbMF0pXG4gICAgKTtcblxuICAgIHJldHVybiBnZW9jb2RlZDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGZsYXR0ZW5PYmplY3Q8XG4gICAgTyBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogT1trZXlvZiBPXSB8IFMgfSxcbiAgICBTIGV4dGVuZHMgc3RyaW5nIHwgc3RyaW5nW11cbiAgPihvYmplY3Q6IE8pIHtcbiAgICBjb25zdCBmbGF0dGVuZWQ6IHsgW2tleTogc3RyaW5nXTogUyB9ID0ge307XG5cbiAgICBjb25zdCBzdGVwID0gKG5lc3RlZE9iamVjdDogTyB8IE9ba2V5b2YgT10pOiB2b2lkID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKDxPPm5lc3RlZE9iamVjdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gKDxPPm5lc3RlZE9iamVjdClba2V5XTtcbiAgICAgICAgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICAgICAgICBjb25zdCB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgICAgICAgY29uc3QgaXNPYmplY3QgPVxuICAgICAgICAgIHR5cGUgPT09IFwiW29iamVjdCBPYmplY3RdXCIgfHwgdHlwZSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAhaXNBcnJheSAmJlxuICAgICAgICAgIGlzT2JqZWN0ICYmXG4gICAgICAgICAgT2JqZWN0LmtleXMoPFJlY29yZDxzdHJpbmcsIHVua25vd24+PnZhbHVlKS5sZW5ndGhcbiAgICAgICAgKSB7XG4gICAgICAgICAgc3RlcCg8T1trZXlvZiBPXT52YWx1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZmxhdHRlbmVkW2tleV0gPSA8Uz52YWx1ZTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzdGVwKG9iamVjdCk7XG5cbiAgICByZXR1cm4gZmxhdHRlbmVkO1xuICB9XG59XG4iLCJpbXBvcnQgR2VvY29kZWQsIHsgR2VvY29kZWRPYmplY3QgfSBmcm9tIFwiR2VvY29kZWRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHZW9QbHVnaW5HZW9jb2RlZE9iamVjdCBleHRlbmRzIEdlb2NvZGVkT2JqZWN0IHtcbiAgcmVhZG9ubHkgYXR0cmlidXRpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlb1BsdWdpbkdlb2NvZGVkIGV4dGVuZHMgR2VvY29kZWQge1xuICBwcml2YXRlIHJlYWRvbmx5IGF0dHJpYnV0aW9uPzogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih7XG4gICAgYXR0cmlidXRpb24sXG4gICAgLi4uZ2VvY29kZWRPYmplY3RcbiAgfTogR2VvUGx1Z2luR2VvY29kZWRPYmplY3QpIHtcbiAgICBzdXBlcihnZW9jb2RlZE9iamVjdCk7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbiA9IGF0dHJpYnV0aW9uO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob2JqZWN0OiBHZW9QbHVnaW5HZW9jb2RlZE9iamVjdCk6IEdlb1BsdWdpbkdlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IHRoaXMob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b09iamVjdCgpOiBHZW9QbHVnaW5HZW9jb2RlZE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnRvT2JqZWN0KCksXG4gICAgICBhdHRyaWJ1dGlvbjogdGhpcy5hdHRyaWJ1dGlvbixcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHdpdGhBdHRyaWJ1dGlvbihhdHRyaWJ1dGlvbjogc3RyaW5nKTogR2VvUGx1Z2luR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgR2VvUGx1Z2luR2VvY29kZWQoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgYXR0cmlidXRpb24sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXR0cmlidXRpb24oKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRXh0ZXJuYWxMb2FkZXJCb2R5LFxuICBFeHRlcm5hbExvYWRlckhlYWRlcnMsXG4gIEV4dGVybmFsTG9hZGVySW50ZXJmYWNlLFxuICBFeHRlcm5hbExvYWRlclBhcmFtcyxcbn0gZnJvbSBcIkV4dGVybmFsTG9hZGVyXCI7XG5pbXBvcnQge1xuICBFcnJvckNhbGxiYWNrLFxuICBHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgR2VvUGx1Z2luR2VvY29kZWQsXG4gIFByb3ZpZGVySGVscGVycyxcbiAgUHJvdmlkZXJJbnRlcmZhY2UsXG4gIFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSxcbiAgZGVmYXVsdFByb3ZpZGVyT3B0aW9ucyxcbn0gZnJvbSBcInByb3ZpZGVyXCI7XG5pbXBvcnQge1xuICBHZW9jb2RlUXVlcnksXG4gIEdlb2NvZGVRdWVyeU9iamVjdCxcbiAgUmV2ZXJzZVF1ZXJ5LFxuICBSZXZlcnNlUXVlcnlPYmplY3QsXG59IGZyb20gXCJxdWVyeVwiO1xuaW1wb3J0IHsgUmVzcG9uc2VFcnJvciB9IGZyb20gXCJlcnJvclwiO1xuaW1wb3J0IEFkbWluTGV2ZWwgZnJvbSBcIkFkbWluTGV2ZWxcIjtcblxuaW50ZXJmYWNlIEdlb1BsdWdpblJlcXVlc3RQYXJhbXMge1xuICBbcGFyYW06IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgaXA6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZW9QbHVnaW5SZXN1bHQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl9yZXF1ZXN0OiBzdHJpbmc7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgZ2VvcGx1Z2luX3N0YXR1czogbnVtYmVyO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl9kZWxheTogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl9jcmVkaXQ6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5fY2l0eTogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl9yZWdpb246IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5fcmVnaW9uQ29kZTogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl9yZWdpb25OYW1lOiBzdHJpbmc7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgZ2VvcGx1Z2luX2FyZWFDb2RlOiBzdHJpbmc7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgZ2VvcGx1Z2luX2RtYUNvZGU6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5fY291bnRyeUNvZGU6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5fY291bnRyeU5hbWU6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5faW5FVTogYm9vbGVhbjtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5fZXVWQVRyYXRlOiBudW1iZXI7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgZ2VvcGx1Z2luX2NvbnRpbmVudENvZGU6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5fY29udGluZW50TmFtZTogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl9sYXRpdHVkZTogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl9sb25naXR1ZGU6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5fbG9jYXRpb25BY2N1cmFjeVJhZGl1czogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl90aW1lem9uZTogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl9jdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5fY3VycmVuY3lTeW1ib2w6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBnZW9wbHVnaW5fY3VycmVuY3lTeW1ib2xfVVRGODogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGdlb3BsdWdpbl9jdXJyZW5jeUNvbnZlcnRlcjogc3RyaW5nO1xufVxuXG50eXBlIEdlb1BsdWdpbkdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrID0gR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2s8XG4gIEdlb1BsdWdpbkdlb2NvZGVkXG4+O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW9QbHVnaW5Qcm92aWRlclxuICBpbXBsZW1lbnRzIFByb3ZpZGVySW50ZXJmYWNlPEdlb1BsdWdpbkdlb2NvZGVkPiB7XG4gIHByaXZhdGUgZXh0ZXJuYWxMb2FkZXI6IEV4dGVybmFsTG9hZGVySW50ZXJmYWNlO1xuXG4gIHByaXZhdGUgb3B0aW9uczogUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBfZXh0ZXJuYWxMb2FkZXI6IEV4dGVybmFsTG9hZGVySW50ZXJmYWNlLFxuICAgIG9wdGlvbnM6IFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSA9IGRlZmF1bHRQcm92aWRlck9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy5leHRlcm5hbExvYWRlciA9IF9leHRlcm5hbExvYWRlcjtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLmRlZmF1bHRQcm92aWRlck9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZW9jb2RlKFxuICAgIHF1ZXJ5OiBzdHJpbmcgfCBHZW9jb2RlUXVlcnkgfCBHZW9jb2RlUXVlcnlPYmplY3QsXG4gICAgY2FsbGJhY2s6IEdlb1BsdWdpbkdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdlb2NvZGVRdWVyeSA9IFByb3ZpZGVySGVscGVycy5nZXRHZW9jb2RlUXVlcnlGcm9tUGFyYW1ldGVyKHF1ZXJ5KTtcblxuICAgIGlmIChnZW9jb2RlUXVlcnkuZ2V0VGV4dCgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiVGhlIEdlb1BsdWdpbiBwcm92aWRlciBkb2VzIG5vdCBzdXBwb3J0IGxvY2F0aW9uIGdlb2NvZGluZywgb25seSBJUCBnZW9sb2NhdGlvbi5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoW1wiMTI3LjAuMC4xXCIsIFwiOjoxXCJdLmluY2x1ZGVzKGdlb2NvZGVRdWVyeS5nZXRJcCgpIHx8IFwiXCIpKSB7XG4gICAgICBjYWxsYmFjayhbXG4gICAgICAgIEdlb1BsdWdpbkdlb2NvZGVkLmNyZWF0ZSh7XG4gICAgICAgICAgbG9jYWxpdHk6IFwibG9jYWxob3N0XCIsXG4gICAgICAgICAgY291bnRyeTogXCJsb2NhbGhvc3RcIixcbiAgICAgICAgfSksXG4gICAgICBdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLnNldE9wdGlvbnMoe1xuICAgICAgcHJvdG9jb2w6IHRoaXMub3B0aW9ucy51c2VTc2wgPyBcImh0dHBzXCIgOiBcImh0dHBcIixcbiAgICAgIGhvc3Q6IFwid3d3Lmdlb3BsdWdpbi5uZXRcIixcbiAgICAgIHBhdGhuYW1lOiBcImpzb24uZ3BcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IHBhcmFtczogR2VvUGx1Z2luUmVxdWVzdFBhcmFtcyA9IHtcbiAgICAgIGlwOiBnZW9jb2RlUXVlcnkuZ2V0SXAoKSB8fCBcIlwiLFxuICAgIH07XG5cbiAgICB0aGlzLmV4ZWN1dGVSZXF1ZXN0KHBhcmFtcywgY2FsbGJhY2ssIHt9LCB7fSwgZXJyb3JDYWxsYmFjayk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICBwdWJsaWMgZ2VvZGVjb2RlKFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBsYXRpdHVkZU9yUXVlcnk6IG51bWJlciB8IHN0cmluZyB8IFJldmVyc2VRdWVyeSB8IFJldmVyc2VRdWVyeU9iamVjdCxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgbG9uZ2l0dWRlT3JDYWxsYmFjazogbnVtYmVyIHwgc3RyaW5nIHwgR2VvUGx1Z2luR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrPzogR2VvUGx1Z2luR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2sgfCBFcnJvckNhbGxiYWNrLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBlcnJvckNhbGxiYWNrPzogRXJyb3JDYWxsYmFja1xuICApOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcIlRoZSBHZW9QbHVnaW4gcHJvdmlkZXIgZG9lcyBub3Qgc3VwcG9ydCByZXZlcnNlIGdlb2NvZGluZy5cIlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVJlcXVlc3QoXG4gICAgcGFyYW1zOiBFeHRlcm5hbExvYWRlclBhcmFtcyxcbiAgICBjYWxsYmFjazogR2VvUGx1Z2luR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgaGVhZGVycz86IEV4dGVybmFsTG9hZGVySGVhZGVycyxcbiAgICBib2R5PzogRXh0ZXJuYWxMb2FkZXJCb2R5LFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIuZXhlY3V0ZVJlcXVlc3QoXG4gICAgICBwYXJhbXMsXG4gICAgICAoZGF0YTogR2VvUGx1Z2luUmVzdWx0KSA9PiB7XG4gICAgICAgIGlmICghWzIwMCwgMjA2XS5pbmNsdWRlcyhkYXRhLmdlb3BsdWdpbl9zdGF0dXMpKSB7XG4gICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYEFuIGVycm9yIGhhcyBvY2N1cnJlZC4gU3RhdHVzOiAke2RhdGEuZ2VvcGx1Z2luX3N0YXR1c30uYDtcbiAgICAgICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhuZXcgUmVzcG9uc2VFcnJvcihlcnJvck1lc3NhZ2UsIGRhdGEpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soW0dlb1BsdWdpblByb3ZpZGVyLm1hcFRvR2VvY29kZWQoZGF0YSldKTtcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzLFxuICAgICAgYm9keSxcbiAgICAgIGVycm9yQ2FsbGJhY2tcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBtYXBUb0dlb2NvZGVkKHJlc3VsdDogR2VvUGx1Z2luUmVzdWx0KTogR2VvUGx1Z2luR2VvY29kZWQge1xuICAgIGNvbnN0IGxhdGl0dWRlID0gcGFyc2VGbG9hdChyZXN1bHQuZ2VvcGx1Z2luX2xhdGl0dWRlKTtcbiAgICBjb25zdCBsb25naXR1ZGUgPSBwYXJzZUZsb2F0KHJlc3VsdC5nZW9wbHVnaW5fbG9uZ2l0dWRlKTtcbiAgICBjb25zdCBsb2NhbGl0eSA9IHJlc3VsdC5nZW9wbHVnaW5fY2l0eSB8fCB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmVnaW9uID0gcmVzdWx0Lmdlb3BsdWdpbl9yZWdpb24gfHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNvdW50cnkgPSByZXN1bHQuZ2VvcGx1Z2luX2NvdW50cnlOYW1lIHx8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBjb3VudHJ5Q29kZSA9IHJlc3VsdC5nZW9wbHVnaW5fY291bnRyeUNvZGUgfHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IHRpbWV6b25lID0gcmVzdWx0Lmdlb3BsdWdpbl90aW1lem9uZSB8fCB1bmRlZmluZWQ7XG4gICAgY29uc3QgYWRtaW5MZXZlbHM6IEFkbWluTGV2ZWxbXSA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0aW9uID0gcmVzdWx0Lmdlb3BsdWdpbl9jcmVkaXQgfHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKHJlc3VsdC5nZW9wbHVnaW5fcmVnaW9uTmFtZSkge1xuICAgICAgYWRtaW5MZXZlbHMucHVzaChcbiAgICAgICAgQWRtaW5MZXZlbC5jcmVhdGUoe1xuICAgICAgICAgIGxldmVsOiAxLFxuICAgICAgICAgIG5hbWU6IHJlc3VsdC5nZW9wbHVnaW5fcmVnaW9uTmFtZSxcbiAgICAgICAgICBjb2RlOiByZXN1bHQuZ2VvcGx1Z2luX3JlZ2lvbkNvZGUgfHwgdW5kZWZpbmVkLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZW9jb2RlZCA9IEdlb1BsdWdpbkdlb2NvZGVkLmNyZWF0ZSh7XG4gICAgICBsYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZSxcbiAgICAgIGxvY2FsaXR5LFxuICAgICAgcmVnaW9uLFxuICAgICAgYWRtaW5MZXZlbHMsXG4gICAgICBjb3VudHJ5LFxuICAgICAgY291bnRyeUNvZGUsXG4gICAgICB0aW1lem9uZSxcbiAgICAgIGF0dHJpYnV0aW9uLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGdlb2NvZGVkO1xuICB9XG59XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIEdlb1BsdWdpbkdlb2NvZGVkIH0gZnJvbSBcInByb3ZpZGVyL2dlb3BsdWdpbi9HZW9QbHVnaW5HZW9jb2RlZFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHZW9QbHVnaW5Qcm92aWRlciB9IGZyb20gXCJwcm92aWRlci9nZW9wbHVnaW4vR2VvUGx1Z2luUHJvdmlkZXJcIjtcbmV4cG9ydCAqIGZyb20gXCJwcm92aWRlci9nZW9wbHVnaW4vR2VvUGx1Z2luUHJvdmlkZXJcIjtcbiIsImltcG9ydCB7IEdlb2NvZGVRdWVyeSwgR2VvY29kZVF1ZXJ5T2JqZWN0IH0gZnJvbSBcInF1ZXJ5XCI7XG5cbmludGVyZmFjZSBHb29nbGVNYXBzQ29tcG9uZW50IHtcbiAgbmFtZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdvb2dsZU1hcHNHZW9jb2RlUXVlcnlPYmplY3QgZXh0ZW5kcyBHZW9jb2RlUXVlcnlPYmplY3Qge1xuICByZWFkb25seSBjb3VudHJ5Q29kZXM/OiBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgY29tcG9uZW50cz86IEdvb2dsZU1hcHNDb21wb25lbnRbXTtcbiAgcmVhZG9ubHkgY2hhbm5lbD86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29vZ2xlTWFwc0dlb2NvZGVRdWVyeSBleHRlbmRzIEdlb2NvZGVRdWVyeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgY291bnRyeUNvZGVzPzogc3RyaW5nW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjb21wb25lbnRzPzogR29vZ2xlTWFwc0NvbXBvbmVudFtdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY2hhbm5lbD86IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioe1xuICAgIGNvdW50cnlDb2RlcyxcbiAgICBjb21wb25lbnRzLFxuICAgIGNoYW5uZWwsXG4gICAgLi4uZ2VvY29kZVF1ZXJ5T2JqZWN0XG4gIH06IEdvb2dsZU1hcHNHZW9jb2RlUXVlcnlPYmplY3QpIHtcbiAgICBzdXBlcihnZW9jb2RlUXVlcnlPYmplY3QpO1xuICAgIGlmIChjb3VudHJ5Q29kZXMgJiYgY291bnRyeUNvZGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIFwiY291bnRyeUNvZGVzXCIgcGFyYW1ldGVyIG11c3QgaGF2ZSBvbmx5IG9uZSBjb3VudHJ5IGNvZGUgdG9wLWxldmVsIGRvbWFpbi4nXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmNvdW50cnlDb2RlcyA9IGNvdW50cnlDb2RlcztcbiAgICB0aGlzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShcbiAgICBvYmplY3Q6IEdvb2dsZU1hcHNHZW9jb2RlUXVlcnlPYmplY3RcbiAgKTogR29vZ2xlTWFwc0dlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9PYmplY3QoKTogR29vZ2xlTWFwc0dlb2NvZGVRdWVyeU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnRvT2JqZWN0KCksXG4gICAgICBjb3VudHJ5Q29kZXM6IHRoaXMuY291bnRyeUNvZGVzLFxuICAgICAgY29tcG9uZW50czogdGhpcy5jb21wb25lbnRzLFxuICAgICAgY2hhbm5lbDogdGhpcy5jaGFubmVsLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgd2l0aENvdW50cnlDb2Rlcyhjb3VudHJ5Q29kZXM6IHN0cmluZ1tdKTogR29vZ2xlTWFwc0dlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBHb29nbGVNYXBzR2VvY29kZVF1ZXJ5KHsgLi4udGhpcy50b09iamVjdCgpLCBjb3VudHJ5Q29kZXMgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnRyeUNvZGVzKCk6IHVuZGVmaW5lZCB8IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudHJ5Q29kZXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aENvbXBvbmVudHMoXG4gICAgY29tcG9uZW50czogR29vZ2xlTWFwc0NvbXBvbmVudFtdXG4gICk6IEdvb2dsZU1hcHNHZW9jb2RlUXVlcnkge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc0dlb2NvZGVRdWVyeSh7IC4uLnRoaXMudG9PYmplY3QoKSwgY29tcG9uZW50cyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb21wb25lbnRzKCk6IHVuZGVmaW5lZCB8IEdvb2dsZU1hcHNDb21wb25lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cztcbiAgfVxuXG4gIHB1YmxpYyB3aXRoQ2hhbm5lbChjaGFubmVsOiBzdHJpbmcpOiBHb29nbGVNYXBzR2VvY29kZVF1ZXJ5IHtcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcHNHZW9jb2RlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIGNoYW5uZWwgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2hhbm5lbCgpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNoYW5uZWw7XG4gIH1cbn1cbiIsImltcG9ydCBHZW9jb2RlZCwgeyBHZW9jb2RlZE9iamVjdCB9IGZyb20gXCJHZW9jb2RlZFwiO1xuaW1wb3J0IEFkbWluTGV2ZWwgZnJvbSBcIkFkbWluTGV2ZWxcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHb29nbGVNYXBzR2VvY29kZWRPYmplY3QgZXh0ZW5kcyBHZW9jb2RlZE9iamVjdCB7XG4gIHJlYWRvbmx5IHBsYWNlSWQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHBhcnRpYWxNYXRjaD86IGJvb2xlYW47XG4gIHJlYWRvbmx5IHJlc3VsdFR5cGU/OiBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgbG9jYXRpb25UeXBlPzogc3RyaW5nO1xuICByZWFkb25seSBzdHJlZXRBZGRyZXNzPzogc3RyaW5nO1xuICByZWFkb25seSBpbnRlcnNlY3Rpb24/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHBvbGl0aWNhbD86IHN0cmluZztcbiAgcmVhZG9ubHkgY29sbG9xdWlhbEFyZWE/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHdhcmQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IG5laWdoYm9yaG9vZD86IHN0cmluZztcbiAgcmVhZG9ubHkgcHJlbWlzZT86IHN0cmluZztcbiAgcmVhZG9ubHkgc3VicHJlbWlzZT86IHN0cmluZztcbiAgcmVhZG9ubHkgbmF0dXJhbEZlYXR1cmU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGFpcnBvcnQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHBhcms/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHBvaW50T2ZJbnRlcmVzdD86IHN0cmluZztcbiAgcmVhZG9ubHkgZXN0YWJsaXNobWVudD86IHN0cmluZztcbiAgcmVhZG9ubHkgcG9zdGFsQ29kZVN1ZmZpeD86IHN0cmluZztcbiAgcmVhZG9ubHkgc3ViTG9jYWxpdHlMZXZlbHM/OiBBZG1pbkxldmVsW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2dsZU1hcHNHZW9jb2RlZCBleHRlbmRzIEdlb2NvZGVkIHtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGFjZUlkPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcGFydGlhbE1hdGNoPzogYm9vbGVhbjtcblxuICBwcml2YXRlIHJlYWRvbmx5IHJlc3VsdFR5cGU/OiBzdHJpbmdbXTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGxvY2F0aW9uVHlwZT86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IHN0cmVldEFkZHJlc3M/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBpbnRlcnNlY3Rpb24/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBwb2xpdGljYWw/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjb2xsb3F1aWFsQXJlYT86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IHdhcmQ/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBuZWlnaGJvcmhvb2Q/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBwcmVtaXNlPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3VicHJlbWlzZT86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IG5hdHVyYWxGZWF0dXJlPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgYWlycG9ydD86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IHBhcms/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBwb2ludE9mSW50ZXJlc3Q/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlc3RhYmxpc2htZW50Pzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcG9zdGFsQ29kZVN1ZmZpeD86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IHN1YkxvY2FsaXR5TGV2ZWxzOiBBZG1pbkxldmVsW107XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHtcbiAgICBwbGFjZUlkLFxuICAgIHBhcnRpYWxNYXRjaCxcbiAgICByZXN1bHRUeXBlLFxuICAgIGxvY2F0aW9uVHlwZSxcbiAgICBzdHJlZXRBZGRyZXNzLFxuICAgIGludGVyc2VjdGlvbixcbiAgICBwb2xpdGljYWwsXG4gICAgY29sbG9xdWlhbEFyZWEsXG4gICAgd2FyZCxcbiAgICBuZWlnaGJvcmhvb2QsXG4gICAgcHJlbWlzZSxcbiAgICBzdWJwcmVtaXNlLFxuICAgIG5hdHVyYWxGZWF0dXJlLFxuICAgIGFpcnBvcnQsXG4gICAgcGFyayxcbiAgICBwb2ludE9mSW50ZXJlc3QsXG4gICAgZXN0YWJsaXNobWVudCxcbiAgICBwb3N0YWxDb2RlU3VmZml4LFxuICAgIHN1YkxvY2FsaXR5TGV2ZWxzLFxuICAgIC4uLmdlb2NvZGVkT2JqZWN0XG4gIH06IEdvb2dsZU1hcHNHZW9jb2RlZE9iamVjdCkge1xuICAgIHN1cGVyKGdlb2NvZGVkT2JqZWN0KTtcbiAgICB0aGlzLnBsYWNlSWQgPSBwbGFjZUlkO1xuICAgIHRoaXMucGFydGlhbE1hdGNoID0gcGFydGlhbE1hdGNoO1xuICAgIHRoaXMucmVzdWx0VHlwZSA9IHJlc3VsdFR5cGU7XG4gICAgdGhpcy5sb2NhdGlvblR5cGUgPSBsb2NhdGlvblR5cGU7XG4gICAgdGhpcy5zdHJlZXRBZGRyZXNzID0gc3RyZWV0QWRkcmVzcztcbiAgICB0aGlzLmludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbjtcbiAgICB0aGlzLnBvbGl0aWNhbCA9IHBvbGl0aWNhbDtcbiAgICB0aGlzLmNvbGxvcXVpYWxBcmVhID0gY29sbG9xdWlhbEFyZWE7XG4gICAgdGhpcy53YXJkID0gd2FyZDtcbiAgICB0aGlzLm5laWdoYm9yaG9vZCA9IG5laWdoYm9yaG9vZDtcbiAgICB0aGlzLnByZW1pc2UgPSBwcmVtaXNlO1xuICAgIHRoaXMuc3VicHJlbWlzZSA9IHN1YnByZW1pc2U7XG4gICAgdGhpcy5uYXR1cmFsRmVhdHVyZSA9IG5hdHVyYWxGZWF0dXJlO1xuICAgIHRoaXMuYWlycG9ydCA9IGFpcnBvcnQ7XG4gICAgdGhpcy5wYXJrID0gcGFyaztcbiAgICB0aGlzLnBvaW50T2ZJbnRlcmVzdCA9IHBvaW50T2ZJbnRlcmVzdDtcbiAgICB0aGlzLmVzdGFibGlzaG1lbnQgPSBlc3RhYmxpc2htZW50O1xuICAgIHRoaXMucG9zdGFsQ29kZVN1ZmZpeCA9IHBvc3RhbENvZGVTdWZmaXg7XG4gICAgdGhpcy5zdWJMb2NhbGl0eUxldmVscyA9IHN1YkxvY2FsaXR5TGV2ZWxzIHx8IFtdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob2JqZWN0OiBHb29nbGVNYXBzR2VvY29kZWRPYmplY3QpOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgdGhpcyhvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIHRvT2JqZWN0KCk6IEdvb2dsZU1hcHNHZW9jb2RlZE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnRvT2JqZWN0KCksXG4gICAgICBwbGFjZUlkOiB0aGlzLnBsYWNlSWQsXG4gICAgICBwYXJ0aWFsTWF0Y2g6IHRoaXMucGFydGlhbE1hdGNoLFxuICAgICAgcmVzdWx0VHlwZTogdGhpcy5yZXN1bHRUeXBlLFxuICAgICAgbG9jYXRpb25UeXBlOiB0aGlzLmxvY2F0aW9uVHlwZSxcbiAgICAgIHN0cmVldEFkZHJlc3M6IHRoaXMuc3RyZWV0QWRkcmVzcyxcbiAgICAgIGludGVyc2VjdGlvbjogdGhpcy5pbnRlcnNlY3Rpb24sXG4gICAgICBwb2xpdGljYWw6IHRoaXMucG9saXRpY2FsLFxuICAgICAgY29sbG9xdWlhbEFyZWE6IHRoaXMuY29sbG9xdWlhbEFyZWEsXG4gICAgICB3YXJkOiB0aGlzLndhcmQsXG4gICAgICBuZWlnaGJvcmhvb2Q6IHRoaXMubmVpZ2hib3Job29kLFxuICAgICAgcHJlbWlzZTogdGhpcy5wcmVtaXNlLFxuICAgICAgc3VicHJlbWlzZTogdGhpcy5zdWJwcmVtaXNlLFxuICAgICAgbmF0dXJhbEZlYXR1cmU6IHRoaXMubmF0dXJhbEZlYXR1cmUsXG4gICAgICBhaXJwb3J0OiB0aGlzLmFpcnBvcnQsXG4gICAgICBwYXJrOiB0aGlzLnBhcmssXG4gICAgICBwb2ludE9mSW50ZXJlc3Q6IHRoaXMucG9pbnRPZkludGVyZXN0LFxuICAgICAgZXN0YWJsaXNobWVudDogdGhpcy5lc3RhYmxpc2htZW50LFxuICAgICAgcG9zdGFsQ29kZVN1ZmZpeDogdGhpcy5wb3N0YWxDb2RlU3VmZml4LFxuICAgICAgc3ViTG9jYWxpdHlMZXZlbHM6IHRoaXMuc3ViTG9jYWxpdHlMZXZlbHMsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoUGxhY2VJZChwbGFjZUlkOiBzdHJpbmcpOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc0dlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIHBsYWNlSWQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UGxhY2VJZCgpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlSWQ7XG4gIH1cblxuICBwdWJsaWMgd2l0aFBhcnRpYWxNYXRjaChwYXJ0aWFsTWF0Y2g6IGJvb2xlYW4pOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc0dlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIHBhcnRpYWxNYXRjaCxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc1BhcnRpYWxNYXRjaCgpOiB1bmRlZmluZWQgfCBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYXJ0aWFsTWF0Y2g7XG4gIH1cblxuICBwdWJsaWMgd2l0aFJlc3VsdFR5cGUocmVzdWx0VHlwZTogc3RyaW5nW10pOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc0dlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIHJlc3VsdFR5cGUsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVzdWx0VHlwZSgpOiB1bmRlZmluZWQgfCBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0VHlwZTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTG9jYXRpb25UeXBlKGxvY2F0aW9uVHlwZTogc3RyaW5nKTogR29vZ2xlTWFwc0dlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcHNHZW9jb2RlZCh7XG4gICAgICAuLi50aGlzLnRvT2JqZWN0KCksXG4gICAgICBsb2NhdGlvblR5cGUsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TG9jYXRpb25UeXBlKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb25UeXBlO1xuICB9XG5cbiAgcHVibGljIHdpdGhTdHJlZXRBZGRyZXNzKHN0cmVldEFkZHJlc3M6IHN0cmluZyk6IEdvb2dsZU1hcHNHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBHb29nbGVNYXBzR2VvY29kZWQoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgc3RyZWV0QWRkcmVzcyxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTdHJlZXRBZGRyZXNzKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RyZWV0QWRkcmVzcztcbiAgfVxuXG4gIHB1YmxpYyB3aXRoSW50ZXJzZWN0aW9uKGludGVyc2VjdGlvbjogc3RyaW5nKTogR29vZ2xlTWFwc0dlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcHNHZW9jb2RlZCh7XG4gICAgICAuLi50aGlzLnRvT2JqZWN0KCksXG4gICAgICBpbnRlcnNlY3Rpb24sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW50ZXJzZWN0aW9uKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9uO1xuICB9XG5cbiAgcHVibGljIHdpdGhQb2xpdGljYWwocG9saXRpY2FsOiBzdHJpbmcpOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc0dlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIHBvbGl0aWNhbCxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQb2xpdGljYWwoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wb2xpdGljYWw7XG4gIH1cblxuICBwdWJsaWMgd2l0aENvbGxvcXVpYWxBcmVhKGNvbGxvcXVpYWxBcmVhOiBzdHJpbmcpOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc0dlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGNvbGxvcXVpYWxBcmVhLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldENvbGxvcXVpYWxBcmVhKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sbG9xdWlhbEFyZWE7XG4gIH1cblxuICBwdWJsaWMgd2l0aFdhcmQod2FyZDogc3RyaW5nKTogR29vZ2xlTWFwc0dlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcHNHZW9jb2RlZCh7XG4gICAgICAuLi50aGlzLnRvT2JqZWN0KCksXG4gICAgICB3YXJkLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFdhcmQoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy53YXJkO1xuICB9XG5cbiAgcHVibGljIHdpdGhOZWlnaGJvcmhvb2QobmVpZ2hib3Job29kOiBzdHJpbmcpOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc0dlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIG5laWdoYm9yaG9vZCxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROZWlnaGJvcmhvb2QoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5uZWlnaGJvcmhvb2Q7XG4gIH1cblxuICBwdWJsaWMgd2l0aFByZW1pc2UocHJlbWlzZTogc3RyaW5nKTogR29vZ2xlTWFwc0dlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcHNHZW9jb2RlZCh7XG4gICAgICAuLi50aGlzLnRvT2JqZWN0KCksXG4gICAgICBwcmVtaXNlLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFByZW1pc2UoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wcmVtaXNlO1xuICB9XG5cbiAgcHVibGljIHdpdGhTdWJwcmVtaXNlKHN1YnByZW1pc2U6IHN0cmluZyk6IEdvb2dsZU1hcHNHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBHb29nbGVNYXBzR2VvY29kZWQoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgc3VicHJlbWlzZSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTdWJwcmVtaXNlKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3VicHJlbWlzZTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTmF0dXJhbEZlYXR1cmUobmF0dXJhbEZlYXR1cmU6IHN0cmluZyk6IEdvb2dsZU1hcHNHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBHb29nbGVNYXBzR2VvY29kZWQoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgbmF0dXJhbEZlYXR1cmUsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TmF0dXJhbEZlYXR1cmUoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5uYXR1cmFsRmVhdHVyZTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoQWlycG9ydChhaXJwb3J0OiBzdHJpbmcpOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc0dlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGFpcnBvcnQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWlycG9ydCgpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFpcnBvcnQ7XG4gIH1cblxuICBwdWJsaWMgd2l0aFBhcmsocGFyazogc3RyaW5nKTogR29vZ2xlTWFwc0dlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcHNHZW9jb2RlZCh7XG4gICAgICAuLi50aGlzLnRvT2JqZWN0KCksXG4gICAgICBwYXJrLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFBhcmsoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYXJrO1xuICB9XG5cbiAgcHVibGljIHdpdGhQb2ludE9mSW50ZXJlc3QocG9pbnRPZkludGVyZXN0OiBzdHJpbmcpOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc0dlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIHBvaW50T2ZJbnRlcmVzdCxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQb2ludE9mSW50ZXJlc3QoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wb2ludE9mSW50ZXJlc3Q7XG4gIH1cblxuICBwdWJsaWMgd2l0aEVzdGFibGlzaG1lbnQoZXN0YWJsaXNobWVudDogc3RyaW5nKTogR29vZ2xlTWFwc0dlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcHNHZW9jb2RlZCh7XG4gICAgICAuLi50aGlzLnRvT2JqZWN0KCksXG4gICAgICBlc3RhYmxpc2htZW50LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldEVzdGFibGlzaG1lbnQoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lc3RhYmxpc2htZW50O1xuICB9XG5cbiAgcHVibGljIHdpdGhQb3N0YWxDb2RlU3VmZml4KHBvc3RhbENvZGVTdWZmaXg6IHN0cmluZyk6IEdvb2dsZU1hcHNHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBHb29nbGVNYXBzR2VvY29kZWQoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgcG9zdGFsQ29kZVN1ZmZpeCxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQb3N0YWxDb2RlU3VmZml4KCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucG9zdGFsQ29kZVN1ZmZpeDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdWJMb2NhbGl0eUxldmVsKHN1YkxvY2FsaXR5TGV2ZWw6IEFkbWluTGV2ZWwpOiB2b2lkIHtcbiAgICB0aGlzLnN1YkxvY2FsaXR5TGV2ZWxzLnB1c2goc3ViTG9jYWxpdHlMZXZlbCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3ViTG9jYWxpdHlMZXZlbHMoKTogQWRtaW5MZXZlbFtdIHtcbiAgICByZXR1cm4gdGhpcy5zdWJMb2NhbGl0eUxldmVscztcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRXh0ZXJuYWxMb2FkZXJCb2R5LFxuICBFeHRlcm5hbExvYWRlckhlYWRlcnMsXG4gIEV4dGVybmFsTG9hZGVySW50ZXJmYWNlLFxuICBFeHRlcm5hbExvYWRlclBhcmFtcyxcbn0gZnJvbSBcIkV4dGVybmFsTG9hZGVyXCI7XG5pbXBvcnQge1xuICBFcnJvckNhbGxiYWNrLFxuICBHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgR29vZ2xlTWFwc0dlb2NvZGVkLFxuICBHb29nbGVNYXBzR2VvY29kZVF1ZXJ5LFxuICBHb29nbGVNYXBzR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5LFxuICBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5T2JqZWN0LFxuICBQcm92aWRlckhlbHBlcnMsXG4gIFByb3ZpZGVySW50ZXJmYWNlLFxuICBQcm92aWRlck9wdGlvbnNJbnRlcmZhY2UsXG4gIGRlZmF1bHRQcm92aWRlck9wdGlvbnMsXG59IGZyb20gXCJwcm92aWRlclwiO1xuaW1wb3J0IEFkbWluTGV2ZWwgZnJvbSBcIkFkbWluTGV2ZWxcIjtcbmltcG9ydCB7IFJlc3BvbnNlRXJyb3IgfSBmcm9tIFwiZXJyb3JcIjtcbmltcG9ydCB7XG4gIGRlY29kZUJhc2U2NCxcbiAgZGVjb2RlVXJsU2FmZUJhc2U2NCxcbiAgZW5jb2RlVXJsU2FmZUJhc2U2NCxcbiAgZmlsdGVyVW5kZWZpbmVkT2JqZWN0VmFsdWVzLFxuICBnZXRSZXF1aXJlRnVuYyxcbiAgaXNCcm93c2VyLFxufSBmcm9tIFwidXRpbHNcIjtcblxuaW50ZXJmYWNlIEdvb2dsZU1hcHNSZXF1ZXN0UGFyYW1zIHtcbiAgW3BhcmFtOiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHJlYWRvbmx5IGtleT86IHN0cmluZztcbiAgcmVhZG9ubHkgY2xpZW50Pzogc3RyaW5nO1xuICByZWFkb25seSBzaWduYXR1cmU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNoYW5uZWw/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHJlZ2lvbj86IHN0cmluZztcbiAgcmVhZG9ubHkgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxpbWl0Pzogc3RyaW5nO1xuICByZWFkb25seSBhZGRyZXNzPzogc3RyaW5nO1xuICByZWFkb25seSBjb21wb25lbnRzPzogc3RyaW5nO1xuICByZWFkb25seSBib3VuZHM/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxhdGxuZz86IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICByZWFkb25seSByZXN1bHRfdHlwZT86IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICByZWFkb25seSBsb2NhdGlvbl90eXBlPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgR29vZ2xlTWFwc0xhdExuZyB7XG4gIGxhdDogbnVtYmVyO1xuICBsbmc6IG51bWJlcjtcbn1cblxudHlwZSBHb29nbGVNYXBzUGxhY2VUeXBlID1cbiAgfCBcImFpcnBvcnRcIlxuICB8IFwiYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xXCJcbiAgfCBcImFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMlwiXG4gIHwgXCJhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzNcIlxuICB8IFwiYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF80XCJcbiAgfCBcImFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfNVwiXG4gIHwgXCJhcmNoaXBlbGFnb1wiXG4gIHwgXCJidXNfc3RhdGlvblwiXG4gIHwgXCJjb2xsb3F1aWFsX2FyZWFcIlxuICB8IFwiY29udGluZW50XCJcbiAgfCBcImNvdW50cnlcIlxuICB8IFwiZXN0YWJsaXNobWVudFwiXG4gIHwgXCJmaW5hbmNlXCJcbiAgfCBcImZsb29yXCJcbiAgfCBcImZvb2RcIlxuICB8IFwiZ2VuZXJhbF9jb250cmFjdG9yXCJcbiAgfCBcImdlb2NvZGVcIlxuICB8IFwiaGVhbHRoXCJcbiAgfCBcImludGVyc2VjdGlvblwiXG4gIHwgXCJsb2NhbGl0eVwiXG4gIHwgXCJuYXR1cmFsX2ZlYXR1cmVcIlxuICB8IFwibmVpZ2hib3Job29kXCJcbiAgfCBcInBhcmtcIlxuICB8IFwicGFya2luZ1wiXG4gIHwgXCJwbGFjZV9vZl93b3JzaGlwXCJcbiAgfCBcInBsdXNfY29kZVwiXG4gIHwgXCJwb2ludF9vZl9pbnRlcmVzdFwiXG4gIHwgXCJwb2xpdGljYWxcIlxuICB8IFwicG9zdF9ib3hcIlxuICB8IFwicG9zdGFsX2NvZGVcIlxuICB8IFwicG9zdGFsX2NvZGVfcHJlZml4XCJcbiAgfCBcInBvc3RhbF9jb2RlX3N1ZmZpeFwiXG4gIHwgXCJwb3N0YWxfdG93blwiXG4gIHwgXCJwcmVtaXNlXCJcbiAgfCBcInJvb21cIlxuICB8IFwicm91dGVcIlxuICB8IFwic3RyZWV0X2FkZHJlc3NcIlxuICB8IFwic3RyZWV0X251bWJlclwiXG4gIHwgXCJzdWJsb2NhbGl0eVwiXG4gIHwgXCJzdWJsb2NhbGl0eV9sZXZlbF8xXCJcbiAgfCBcInN1YmxvY2FsaXR5X2xldmVsXzJcIlxuICB8IFwic3VibG9jYWxpdHlfbGV2ZWxfM1wiXG4gIHwgXCJzdWJsb2NhbGl0eV9sZXZlbF80XCJcbiAgfCBcInN1YmxvY2FsaXR5X2xldmVsXzVcIlxuICB8IFwic3VicHJlbWlzZVwiXG4gIHwgXCJ0b3duX3NxdWFyZVwiXG4gIHwgXCJ0cmFpbl9zdGF0aW9uXCJcbiAgfCBcInRyYW5zaXRfc3RhdGlvblwiXG4gIHwgXCJ3YXJkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlTWFwc1Jlc3BvbnNlIHtcbiAgcmVzdWx0czogR29vZ2xlTWFwc1Jlc3VsdFtdO1xuICBzdGF0dXM6XG4gICAgfCBcIk9LXCJcbiAgICB8IFwiWkVST19SRVNVTFRTXCJcbiAgICB8IFwiT1ZFUl9EQUlMWV9MSU1JVFwiXG4gICAgfCBcIk9WRVJfUVVFUllfTElNSVRcIlxuICAgIHwgXCJSRVFVRVNUX0RFTklFRFwiXG4gICAgfCBcIklOVkFMSURfUkVRVUVTVFwiXG4gICAgfCBcIlVOS05PV05fRVJST1JcIjtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBlcnJvcl9tZXNzYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdvb2dsZU1hcHNSZXN1bHQge1xuICBnZW9tZXRyeToge1xuICAgIGxvY2F0aW9uOiBHb29nbGVNYXBzTGF0TG5nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBsb2NhdGlvbl90eXBlOlxuICAgICAgfCBcIlJPT0ZUT1BcIlxuICAgICAgfCBcIlJBTkdFX0lOVEVSUE9MQVRFRFwiXG4gICAgICB8IFwiR0VPTUVUUklDX0NFTlRFUlwiXG4gICAgICB8IFwiQVBQUk9YSU1BVEVcIjtcbiAgICB2aWV3cG9ydDoge1xuICAgICAgbm9ydGhlYXN0OiBHb29nbGVNYXBzTGF0TG5nO1xuICAgICAgc291dGh3ZXN0OiBHb29nbGVNYXBzTGF0TG5nO1xuICAgIH07XG4gICAgYm91bmRzPzoge1xuICAgICAgbm9ydGhlYXN0OiBHb29nbGVNYXBzTGF0TG5nO1xuICAgICAgc291dGh3ZXN0OiBHb29nbGVNYXBzTGF0TG5nO1xuICAgIH07XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgZm9ybWF0dGVkX2FkZHJlc3M6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBhZGRyZXNzX2NvbXBvbmVudHM6IHtcbiAgICB0eXBlczogR29vZ2xlTWFwc1BsYWNlVHlwZVtdO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBsb25nX25hbWU6IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgc2hvcnRfbmFtZTogc3RyaW5nO1xuICB9W107XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgcGxhY2VfaWQ6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBwbHVzX2NvZGU/OiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGdsb2JhbF9jb2RlOiBzdHJpbmc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGNvbXBvdW5kX2NvZGU/OiBzdHJpbmc7XG4gIH07XG4gIHR5cGVzOiBHb29nbGVNYXBzUGxhY2VUeXBlW107XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgcG9zdGNvZGVfbG9jYWxpdGllcz86IHN0cmluZ1tdO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHBhcnRpYWxfbWF0Y2g/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdvb2dsZU1hcHNQcm92aWRlck9wdGlvbnNJbnRlcmZhY2VcbiAgZXh0ZW5kcyBQcm92aWRlck9wdGlvbnNJbnRlcmZhY2Uge1xuICByZWFkb25seSBhcGlLZXk/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHNlY3JldD86IHN0cmluZztcbiAgcmVhZG9ubHkgY2xpZW50SWQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNvdW50cnlDb2Rlcz86IHN0cmluZ1tdO1xufVxuXG50eXBlIEdvb2dsZU1hcHNHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayA9IEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPFxuICBHb29nbGVNYXBzR2VvY29kZWRcbj47XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2dsZU1hcHNQcm92aWRlclxuICBpbXBsZW1lbnRzIFByb3ZpZGVySW50ZXJmYWNlPEdvb2dsZU1hcHNHZW9jb2RlZD4ge1xuICBwcml2YXRlIGV4dGVybmFsTG9hZGVyOiBFeHRlcm5hbExvYWRlckludGVyZmFjZTtcblxuICBwcml2YXRlIG9wdGlvbnM6IEdvb2dsZU1hcHNQcm92aWRlck9wdGlvbnNJbnRlcmZhY2U7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIF9leHRlcm5hbExvYWRlcjogRXh0ZXJuYWxMb2FkZXJJbnRlcmZhY2UsXG4gICAgb3B0aW9uczogR29vZ2xlTWFwc1Byb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSA9IGRlZmF1bHRQcm92aWRlck9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy5leHRlcm5hbExvYWRlciA9IF9leHRlcm5hbExvYWRlcjtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLmRlZmF1bHRQcm92aWRlck9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5hcGlLZXkgJiYgIXRoaXMub3B0aW9ucy5jbGllbnRJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQW4gQVBJIGtleSBvciBhIGNsaWVudCBJRCBpcyByZXF1aXJlZCBmb3IgdGhlIEdvb2dsZSBNYXBzIHByb3ZpZGVyLiBQbGVhc2UgYWRkIGl0IGluIHRoZSBcImFwaUtleVwiIG9yIHRoZSBcImNsaWVudElkXCIgb3B0aW9uLidcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpZW50SWQgJiYgIXRoaXMub3B0aW9ucy5zZWNyZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0FuIFVSTCBzaWduaW5nIHNlY3JldCBpcyByZXF1aXJlZCBpZiB5b3UgdXNlIGEgY2xpZW50IElEIChQcmVtaXVtIG9ubHkpLiBQbGVhc2UgYWRkIGl0IGluIHRoZSBcInNlY3JldFwiIG9wdGlvbi4nXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnNlY3JldCAmJiBpc0Jyb3dzZXIoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIFwic2VjcmV0XCIgb3B0aW9uIGNhbm5vdCBiZSB1c2VkIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudC4nXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvdW50cnlDb2RlcyAmJiB0aGlzLm9wdGlvbnMuY291bnRyeUNvZGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIFwiY291bnRyeUNvZGVzXCIgb3B0aW9uIG11c3QgaGF2ZSBvbmx5IG9uZSBjb3VudHJ5IGNvZGUgdG9wLWxldmVsIGRvbWFpbi4nXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZW9jb2RlKFxuICAgIHF1ZXJ5OiBzdHJpbmcgfCBHb29nbGVNYXBzR2VvY29kZVF1ZXJ5IHwgR29vZ2xlTWFwc0dlb2NvZGVRdWVyeU9iamVjdCxcbiAgICBjYWxsYmFjazogR29vZ2xlTWFwc0dlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdlb2NvZGVRdWVyeSA9IFByb3ZpZGVySGVscGVycy5nZXRHZW9jb2RlUXVlcnlGcm9tUGFyYW1ldGVyKFxuICAgICAgcXVlcnksXG4gICAgICBHb29nbGVNYXBzR2VvY29kZVF1ZXJ5XG4gICAgKTtcblxuICAgIGlmIChnZW9jb2RlUXVlcnkuZ2V0SXAoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIlRoZSBHb29nbGVNYXBzIHByb3ZpZGVyIGRvZXMgbm90IHN1cHBvcnQgSVAgZ2VvbG9jYXRpb24sIG9ubHkgbG9jYXRpb24gZ2VvY29kaW5nLlwiXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIuc2V0T3B0aW9ucyh7XG4gICAgICBwcm90b2NvbDogdGhpcy5vcHRpb25zLnVzZVNzbCA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiLFxuICAgICAgaG9zdDogXCJtYXBzLmdvb2dsZWFwaXMuY29tXCIsXG4gICAgICBwYXRobmFtZTogXCJtYXBzL2FwaS9nZW9jb2RlL2pzb25cIixcbiAgICB9KTtcblxuICAgIGNvbnN0IHBhcmFtczogR29vZ2xlTWFwc1JlcXVlc3RQYXJhbXMgPSB0aGlzLndpdGhDb21tb25QYXJhbXMoXG4gICAgICB7XG4gICAgICAgIGFkZHJlc3M6IGdlb2NvZGVRdWVyeS5nZXRUZXh0KCksXG4gICAgICAgIGJvdW5kczogZ2VvY29kZVF1ZXJ5LmdldEJvdW5kcygpXG4gICAgICAgICAgPyBgJHtnZW9jb2RlUXVlcnkuZ2V0Qm91bmRzKCk/LnNvdXRofSwke1xuICAgICAgICAgICAgICBnZW9jb2RlUXVlcnkuZ2V0Qm91bmRzKCk/Lndlc3RcbiAgICAgICAgICAgIH18JHtnZW9jb2RlUXVlcnkuZ2V0Qm91bmRzKCk/Lm5vcnRofSwke1xuICAgICAgICAgICAgICBnZW9jb2RlUXVlcnkuZ2V0Qm91bmRzKCk/LmVhc3RcbiAgICAgICAgICAgIH1gXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGNvbXBvbmVudHM6ICg8R29vZ2xlTWFwc0dlb2NvZGVRdWVyeT5nZW9jb2RlUXVlcnkpLmdldENvbXBvbmVudHMoKVxuICAgICAgICAgID8gKDxHb29nbGVNYXBzR2VvY29kZVF1ZXJ5Pmdlb2NvZGVRdWVyeSlcbiAgICAgICAgICAgICAgLmdldENvbXBvbmVudHMoKVxuICAgICAgICAgICAgICA/Lm1hcCgoY29tcG9uZW50KSA9PiBgJHtjb21wb25lbnQubmFtZX06JHtjb21wb25lbnQudmFsdWV9YClcbiAgICAgICAgICAgICAgLmpvaW4oXCJ8XCIpXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIHJlZ2lvbjogKDxHb29nbGVNYXBzR2VvY29kZVF1ZXJ5Pmdlb2NvZGVRdWVyeSkuZ2V0Q291bnRyeUNvZGVzKClcbiAgICAgICAgICA/ICg8R29vZ2xlTWFwc0dlb2NvZGVRdWVyeT5nZW9jb2RlUXVlcnkpLmdldENvdW50cnlDb2RlcygpPy5qb2luKFwiLFwiKVxuICAgICAgICAgIDogdGhpcy5vcHRpb25zLmNvdW50cnlDb2Rlcz8uam9pbihcIixcIiksXG4gICAgICB9LFxuICAgICAgPEdvb2dsZU1hcHNHZW9jb2RlUXVlcnk+Z2VvY29kZVF1ZXJ5XG4gICAgKTtcblxuICAgIHRoaXMuZXhlY3V0ZVJlcXVlc3QocGFyYW1zLCBjYWxsYmFjaywge30sIHt9LCBlcnJvckNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBnZW9kZWNvZGUoXG4gICAgbGF0aXR1ZGVPclF1ZXJ5OlxuICAgICAgfCBudW1iZXJcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IEdvb2dsZU1hcHNSZXZlcnNlUXVlcnlcbiAgICAgIHwgR29vZ2xlTWFwc1JldmVyc2VRdWVyeU9iamVjdCxcbiAgICBsb25naXR1ZGVPckNhbGxiYWNrOiBudW1iZXIgfCBzdHJpbmcgfCBHb29nbGVNYXBzR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgY2FsbGJhY2tPckVycm9yQ2FsbGJhY2s/OiBHb29nbGVNYXBzR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2sgfCBFcnJvckNhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHJldmVyc2VRdWVyeSA9IFByb3ZpZGVySGVscGVycy5nZXRSZXZlcnNlUXVlcnlGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxhdGl0dWRlT3JRdWVyeSxcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5XG4gICAgKTtcbiAgICBjb25zdCByZXZlcnNlQ2FsbGJhY2sgPSBQcm92aWRlckhlbHBlcnMuZ2V0Q2FsbGJhY2tGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFja1xuICAgICk7XG4gICAgY29uc3QgcmV2ZXJzZUVycm9yQ2FsbGJhY2sgPSBQcm92aWRlckhlbHBlcnMuZ2V0RXJyb3JDYWxsYmFja0Zyb21QYXJhbWV0ZXJzKFxuICAgICAgbG9uZ2l0dWRlT3JDYWxsYmFjayxcbiAgICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFja1xuICAgICk7XG5cbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLnNldE9wdGlvbnMoe1xuICAgICAgcHJvdG9jb2w6IHRoaXMub3B0aW9ucy51c2VTc2wgPyBcImh0dHBzXCIgOiBcImh0dHBcIixcbiAgICAgIGhvc3Q6IFwibWFwcy5nb29nbGVhcGlzLmNvbVwiLFxuICAgICAgcGF0aG5hbWU6IFwibWFwcy9hcGkvZ2VvY29kZS9qc29uXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXJhbXM6IEdvb2dsZU1hcHNSZXF1ZXN0UGFyYW1zID0gdGhpcy53aXRoQ29tbW9uUGFyYW1zKFxuICAgICAge1xuICAgICAgICBsYXRsbmc6IGAke3JldmVyc2VRdWVyeS5nZXRDb29yZGluYXRlcygpLmxhdGl0dWRlfSwke1xuICAgICAgICAgIHJldmVyc2VRdWVyeS5nZXRDb29yZGluYXRlcygpLmxvbmdpdHVkZVxuICAgICAgICB9YCxcbiAgICAgICAgcmVzdWx0X3R5cGU6ICg8R29vZ2xlTWFwc1JldmVyc2VRdWVyeT5yZXZlcnNlUXVlcnkpLmdldFJlc3VsdFR5cGVzKClcbiAgICAgICAgICA/ICg8R29vZ2xlTWFwc1JldmVyc2VRdWVyeT5yZXZlcnNlUXVlcnkpLmdldFJlc3VsdFR5cGVzKCk/LmpvaW4oXCJ8XCIpXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGxvY2F0aW9uX3R5cGU6ICg8R29vZ2xlTWFwc1JldmVyc2VRdWVyeT5yZXZlcnNlUXVlcnkpLmdldExvY2F0aW9uVHlwZXMoKVxuICAgICAgICAgID8gKDxHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5PnJldmVyc2VRdWVyeSkuZ2V0TG9jYXRpb25UeXBlcygpPy5qb2luKFwifFwiKVxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgfSxcbiAgICAgIDxHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5PnJldmVyc2VRdWVyeVxuICAgICk7XG5cbiAgICB0aGlzLmV4ZWN1dGVSZXF1ZXN0KHBhcmFtcywgcmV2ZXJzZUNhbGxiYWNrLCB7fSwge30sIHJldmVyc2VFcnJvckNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgd2l0aENvbW1vblBhcmFtcyhcbiAgICBwYXJhbXM6IFBpY2s8XG4gICAgICBHb29nbGVNYXBzUmVxdWVzdFBhcmFtcyxcbiAgICAgIHwgXCJhZGRyZXNzXCJcbiAgICAgIHwgXCJib3VuZHNcIlxuICAgICAgfCBcImNvbXBvbmVudHNcIlxuICAgICAgfCBcImxhdGxuZ1wiXG4gICAgICB8IFwibG9jYXRpb25fdHlwZVwiXG4gICAgICB8IFwicmVnaW9uXCJcbiAgICAgIHwgXCJyZXN1bHRfdHlwZVwiXG4gICAgPixcbiAgICBxdWVyeTogR29vZ2xlTWFwc0dlb2NvZGVRdWVyeSB8IEdvb2dsZU1hcHNSZXZlcnNlUXVlcnlcbiAgKTogR29vZ2xlTWFwc1JlcXVlc3RQYXJhbXMge1xuICAgIGxldCB3aXRoQ29tbW9uUGFyYW1zOiBHb29nbGVNYXBzUmVxdWVzdFBhcmFtcyA9IHtcbiAgICAgIC4uLnBhcmFtcyxcbiAgICAgIGtleTogdGhpcy5vcHRpb25zLmFwaUtleSxcbiAgICAgIGNsaWVudDogdGhpcy5vcHRpb25zLmNsaWVudElkLFxuICAgICAgY2hhbm5lbDogcXVlcnkuZ2V0Q2hhbm5lbCgpLFxuICAgICAgbGFuZ3VhZ2U6IHF1ZXJ5LmdldExvY2FsZSgpLFxuICAgICAgbGltaXQ6IHF1ZXJ5LmdldExpbWl0KCkudG9TdHJpbmcoKSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZWNyZXQpIHtcbiAgICAgIHdpdGhDb21tb25QYXJhbXMgPSB7XG4gICAgICAgIC4uLndpdGhDb21tb25QYXJhbXMsXG4gICAgICAgIHNpZ25hdHVyZTogR29vZ2xlTWFwc1Byb3ZpZGVyLnNpZ25RdWVyeShcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuc2VjcmV0LFxuICAgICAgICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIuZ2V0T3B0aW9ucygpLnBhdGhuYW1lIHx8IFwiXCIsXG4gICAgICAgICAgd2l0aENvbW1vblBhcmFtc1xuICAgICAgICApLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2l0aENvbW1vblBhcmFtcztcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlUmVxdWVzdChcbiAgICBwYXJhbXM6IEV4dGVybmFsTG9hZGVyUGFyYW1zLFxuICAgIGNhbGxiYWNrOiBHb29nbGVNYXBzR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgaGVhZGVycz86IEV4dGVybmFsTG9hZGVySGVhZGVycyxcbiAgICBib2R5PzogRXh0ZXJuYWxMb2FkZXJCb2R5LFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgbGltaXQsIC4uLmV4dGVybmFsTG9hZGVyUGFyYW1zIH0gPSBwYXJhbXM7XG5cbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLmV4ZWN1dGVSZXF1ZXN0KFxuICAgICAgZXh0ZXJuYWxMb2FkZXJQYXJhbXMsXG4gICAgICAoZGF0YTogR29vZ2xlTWFwc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2U6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgICAgICAgc3dpdGNoIChkYXRhLnN0YXR1cykge1xuICAgICAgICAgIGNhc2UgXCJSRVFVRVNUX0RFTklFRFwiOlxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJSZXF1ZXN0IGhhcyBiZWVuIGRlbmllZFwiO1xuICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3JfbWVzc2FnZSkge1xuICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYDogJHtkYXRhLmVycm9yX21lc3NhZ2V9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJPVkVSX1FVRVJZX0xJTUlUXCI6XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPVxuICAgICAgICAgICAgICBcIkV4Y2VlZGVkIGRhaWx5IHF1b3RhIHdoZW4gYXR0ZW1wdGluZyBnZW9jb2RpbmcgcmVxdWVzdFwiO1xuICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3JfbWVzc2FnZSkge1xuICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYDogJHtkYXRhLmVycm9yX21lc3NhZ2V9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJPVkVSX0RBSUxZX0xJTUlUXCI6XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkFQSSB1c2FnZSBoYXMgYmVlbiBsaW1pdGVkXCI7XG4gICAgICAgICAgICBpZiAoZGF0YS5lcnJvcl9tZXNzYWdlKSB7XG4gICAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgOiAke2RhdGEuZXJyb3JfbWVzc2FnZX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcIklOVkFMSURfUkVRVUVTVFwiOlxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJUaGUgcmVxdWVzdCBpcyBpbnZhbGlkXCI7XG4gICAgICAgICAgICBpZiAoZGF0YS5lcnJvcl9tZXNzYWdlKSB7XG4gICAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgOiAke2RhdGEuZXJyb3JfbWVzc2FnZX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcIlVOS05PV05fRVJST1JcIjpcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiVW5rbm93biBlcnJvclwiO1xuICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3JfbWVzc2FnZSkge1xuICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYDogJHtkYXRhLmVycm9yX21lc3NhZ2V9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gSW50ZW50aW9ubmFseSBsZWZ0IGVtcHR5XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZSAmJiBlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgZXJyb3JDYWxsYmFjayhuZXcgUmVzcG9uc2VFcnJvcihlcnJvck1lc3NhZ2UsIGRhdGEpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyByZXN1bHRzIH0gPSBkYXRhO1xuICAgICAgICBjb25zdCByZXN1bHRzVG9SZW1vdmUgPVxuICAgICAgICAgIHJlc3VsdHMubGVuZ3RoIC0gcGFyc2VJbnQobGltaXQgfHwgcmVzdWx0cy5sZW5ndGgudG9TdHJpbmcoKSwgMTApO1xuICAgICAgICBpZiAocmVzdWx0c1RvUmVtb3ZlID4gMCkge1xuICAgICAgICAgIHJlc3VsdHMuc3BsaWNlKC1yZXN1bHRzVG9SZW1vdmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgcmVzdWx0cy5tYXAoKHJlc3VsdDogR29vZ2xlTWFwc1Jlc3VsdCkgPT5cbiAgICAgICAgICAgIEdvb2dsZU1hcHNQcm92aWRlci5tYXBUb0dlb2NvZGVkKHJlc3VsdClcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgaGVhZGVycyxcbiAgICAgIGJvZHksXG4gICAgICBlcnJvckNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbWFwVG9HZW9jb2RlZChyZXN1bHQ6IEdvb2dsZU1hcHNSZXN1bHQpOiBHb29nbGVNYXBzR2VvY29kZWQge1xuICAgIGNvbnN0IGxhdGl0dWRlID0gcmVzdWx0Lmdlb21ldHJ5LmxvY2F0aW9uLmxhdDtcbiAgICBjb25zdCBsb25naXR1ZGUgPSByZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24ubG5nO1xuICAgIGNvbnN0IGZvcm1hdHRlZEFkZHJlc3MgPSByZXN1bHQuZm9ybWF0dGVkX2FkZHJlc3M7XG4gICAgbGV0IHN0cmVldE51bWJlcjtcbiAgICBsZXQgc3RyZWV0TmFtZTtcbiAgICBsZXQgc3ViTG9jYWxpdHk7XG4gICAgbGV0IGxvY2FsaXR5O1xuICAgIGxldCBwb3N0YWxDb2RlO1xuICAgIGxldCByZWdpb247XG4gICAgbGV0IGNvdW50cnk7XG4gICAgbGV0IGNvdW50cnlDb2RlO1xuICAgIGNvbnN0IGFkbWluTGV2ZWxzOiBBZG1pbkxldmVsW10gPSBbXTtcbiAgICBjb25zdCBwbGFjZUlkID0gcmVzdWx0LnBsYWNlX2lkO1xuICAgIGNvbnN0IHBhcnRpYWxNYXRjaCA9IHJlc3VsdC5wYXJ0aWFsX21hdGNoO1xuICAgIGNvbnN0IHJlc3VsdFR5cGUgPSByZXN1bHQudHlwZXM7XG4gICAgY29uc3QgbG9jYXRpb25UeXBlID0gcmVzdWx0Lmdlb21ldHJ5LmxvY2F0aW9uX3R5cGU7XG4gICAgbGV0IHN0cmVldEFkZHJlc3M7XG4gICAgbGV0IGludGVyc2VjdGlvbjtcbiAgICBsZXQgcG9saXRpY2FsO1xuICAgIGxldCBjb2xsb3F1aWFsQXJlYTtcbiAgICBsZXQgd2FyZDtcbiAgICBsZXQgbmVpZ2hib3Job29kO1xuICAgIGxldCBwcmVtaXNlO1xuICAgIGxldCBzdWJwcmVtaXNlO1xuICAgIGxldCBuYXR1cmFsRmVhdHVyZTtcbiAgICBsZXQgYWlycG9ydDtcbiAgICBsZXQgcGFyaztcbiAgICBsZXQgcG9pbnRPZkludGVyZXN0O1xuICAgIGxldCBlc3RhYmxpc2htZW50O1xuICAgIGxldCBwb3N0YWxDb2RlU3VmZml4O1xuICAgIGNvbnN0IHN1YkxvY2FsaXR5TGV2ZWxzOiBBZG1pbkxldmVsW10gPSBbXTtcblxuICAgIHJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudHMuZm9yRWFjaCgoYWRkcmVzc0NvbXBvbmVudCkgPT4ge1xuICAgICAgYWRkcmVzc0NvbXBvbmVudC50eXBlcy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgXCJzdHJlZXRfbnVtYmVyXCI6XG4gICAgICAgICAgICBzdHJlZXROdW1iZXIgPSBhZGRyZXNzQ29tcG9uZW50LmxvbmdfbmFtZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJyb3V0ZVwiOlxuICAgICAgICAgICAgc3RyZWV0TmFtZSA9IGFkZHJlc3NDb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInN1YmxvY2FsaXR5XCI6XG4gICAgICAgICAgICBzdWJMb2NhbGl0eSA9IGFkZHJlc3NDb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcImxvY2FsaXR5XCI6XG4gICAgICAgICAgY2FzZSBcInBvc3RhbF90b3duXCI6XG4gICAgICAgICAgICBsb2NhbGl0eSA9IGFkZHJlc3NDb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInBvc3RhbF9jb2RlXCI6XG4gICAgICAgICAgICBwb3N0YWxDb2RlID0gYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xXCI6XG4gICAgICAgICAgY2FzZSBcImFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMlwiOlxuICAgICAgICAgIGNhc2UgXCJhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzNcIjpcbiAgICAgICAgICBjYXNlIFwiYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF80XCI6XG4gICAgICAgICAgY2FzZSBcImFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfNVwiOlxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xXCIpIHtcbiAgICAgICAgICAgICAgcmVnaW9uID0gYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFkbWluTGV2ZWxzLnB1c2goXG4gICAgICAgICAgICAgIEFkbWluTGV2ZWwuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBsZXZlbDogcGFyc2VJbnQodHlwZS5zdWJzdHIoLTEpLCAxMCksXG4gICAgICAgICAgICAgICAgbmFtZTogYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWUsXG4gICAgICAgICAgICAgICAgY29kZTogYWRkcmVzc0NvbXBvbmVudC5zaG9ydF9uYW1lLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJzdWJsb2NhbGl0eV9sZXZlbF8xXCI6XG4gICAgICAgICAgY2FzZSBcInN1YmxvY2FsaXR5X2xldmVsXzJcIjpcbiAgICAgICAgICBjYXNlIFwic3VibG9jYWxpdHlfbGV2ZWxfM1wiOlxuICAgICAgICAgIGNhc2UgXCJzdWJsb2NhbGl0eV9sZXZlbF80XCI6XG4gICAgICAgICAgY2FzZSBcInN1YmxvY2FsaXR5X2xldmVsXzVcIjpcbiAgICAgICAgICAgIHN1YkxvY2FsaXR5TGV2ZWxzLnB1c2goXG4gICAgICAgICAgICAgIEFkbWluTGV2ZWwuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBsZXZlbDogcGFyc2VJbnQodHlwZS5zdWJzdHIoLTEpLCAxMCksXG4gICAgICAgICAgICAgICAgbmFtZTogYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWUsXG4gICAgICAgICAgICAgICAgY29kZTogYWRkcmVzc0NvbXBvbmVudC5zaG9ydF9uYW1lLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJjb3VudHJ5XCI6XG4gICAgICAgICAgICBjb3VudHJ5ID0gYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWU7XG4gICAgICAgICAgICBjb3VudHJ5Q29kZSA9IGFkZHJlc3NDb21wb25lbnQuc2hvcnRfbmFtZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJzdHJlZXRfYWRkcmVzc1wiOlxuICAgICAgICAgICAgc3RyZWV0QWRkcmVzcyA9IGFkZHJlc3NDb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcImludGVyc2VjdGlvblwiOlxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uID0gYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwicG9saXRpY2FsXCI6XG4gICAgICAgICAgICBwb2xpdGljYWwgPSBhZGRyZXNzQ29tcG9uZW50LmxvbmdfbmFtZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJjb2xsb3F1aWFsX2FyZWFcIjpcbiAgICAgICAgICAgIGNvbGxvcXVpYWxBcmVhID0gYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwid2FyZFwiOlxuICAgICAgICAgICAgd2FyZCA9IGFkZHJlc3NDb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcIm5laWdoYm9yaG9vZFwiOlxuICAgICAgICAgICAgbmVpZ2hib3Job29kID0gYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwicHJlbWlzZVwiOlxuICAgICAgICAgICAgcHJlbWlzZSA9IGFkZHJlc3NDb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInN1YnByZW1pc2VcIjpcbiAgICAgICAgICAgIHN1YnByZW1pc2UgPSBhZGRyZXNzQ29tcG9uZW50LmxvbmdfbmFtZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJuYXR1cmFsX2ZlYXR1cmVcIjpcbiAgICAgICAgICAgIG5hdHVyYWxGZWF0dXJlID0gYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiYWlycG9ydFwiOlxuICAgICAgICAgICAgYWlycG9ydCA9IGFkZHJlc3NDb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInBhcmtcIjpcbiAgICAgICAgICAgIHBhcmsgPSBhZGRyZXNzQ29tcG9uZW50LmxvbmdfbmFtZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJwb2ludF9vZl9pbnRlcmVzdFwiOlxuICAgICAgICAgICAgcG9pbnRPZkludGVyZXN0ID0gYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiZXN0YWJsaXNobWVudFwiOlxuICAgICAgICAgICAgZXN0YWJsaXNobWVudCA9IGFkZHJlc3NDb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInBvc3RhbF9jb2RlX3N1ZmZpeFwiOlxuICAgICAgICAgICAgcG9zdGFsQ29kZVN1ZmZpeCA9IGFkZHJlc3NDb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgZ2VvY29kZWQgPSBHb29nbGVNYXBzR2VvY29kZWQuY3JlYXRlKHtcbiAgICAgIGxhdGl0dWRlLFxuICAgICAgbG9uZ2l0dWRlLFxuICAgICAgZm9ybWF0dGVkQWRkcmVzcyxcbiAgICAgIHN0cmVldE51bWJlcixcbiAgICAgIHN0cmVldE5hbWUsXG4gICAgICBzdWJMb2NhbGl0eSxcbiAgICAgIGxvY2FsaXR5LFxuICAgICAgcG9zdGFsQ29kZSxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGNvdW50cnksXG4gICAgICBjb3VudHJ5Q29kZSxcbiAgICAgIGFkbWluTGV2ZWxzLFxuICAgICAgcGxhY2VJZCxcbiAgICAgIHBhcnRpYWxNYXRjaCxcbiAgICAgIHJlc3VsdFR5cGUsXG4gICAgICBsb2NhdGlvblR5cGUsXG4gICAgICBzdHJlZXRBZGRyZXNzLFxuICAgICAgaW50ZXJzZWN0aW9uLFxuICAgICAgcG9saXRpY2FsLFxuICAgICAgY29sbG9xdWlhbEFyZWEsXG4gICAgICB3YXJkLFxuICAgICAgbmVpZ2hib3Job29kLFxuICAgICAgcHJlbWlzZSxcbiAgICAgIHN1YnByZW1pc2UsXG4gICAgICBuYXR1cmFsRmVhdHVyZSxcbiAgICAgIGFpcnBvcnQsXG4gICAgICBwYXJrLFxuICAgICAgcG9pbnRPZkludGVyZXN0LFxuICAgICAgZXN0YWJsaXNobWVudCxcbiAgICAgIHBvc3RhbENvZGVTdWZmaXgsXG4gICAgICBzdWJMb2NhbGl0eUxldmVscyxcbiAgICB9KTtcblxuICAgIGlmIChyZXN1bHQuZ2VvbWV0cnkuYm91bmRzKSB7XG4gICAgICBjb25zdCB7IGJvdW5kcyB9ID0gcmVzdWx0Lmdlb21ldHJ5O1xuICAgICAgZ2VvY29kZWQgPSA8R29vZ2xlTWFwc0dlb2NvZGVkPihcbiAgICAgICAgZ2VvY29kZWQud2l0aEJvdW5kcyhcbiAgICAgICAgICBib3VuZHMuc291dGh3ZXN0LmxhdCxcbiAgICAgICAgICBib3VuZHMuc291dGh3ZXN0LmxuZyxcbiAgICAgICAgICBib3VuZHMubm9ydGhlYXN0LmxhdCxcbiAgICAgICAgICBib3VuZHMubm9ydGhlYXN0LmxuZ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0Lmdlb21ldHJ5LnZpZXdwb3J0KSB7XG4gICAgICBjb25zdCB7IHZpZXdwb3J0IH0gPSByZXN1bHQuZ2VvbWV0cnk7XG4gICAgICBnZW9jb2RlZCA9IDxHb29nbGVNYXBzR2VvY29kZWQ+KFxuICAgICAgICBnZW9jb2RlZC53aXRoQm91bmRzKFxuICAgICAgICAgIHZpZXdwb3J0LnNvdXRod2VzdC5sYXQsXG4gICAgICAgICAgdmlld3BvcnQuc291dGh3ZXN0LmxuZyxcbiAgICAgICAgICB2aWV3cG9ydC5ub3J0aGVhc3QubGF0LFxuICAgICAgICAgIHZpZXdwb3J0Lm5vcnRoZWFzdC5sbmdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5nZW9tZXRyeS5sb2NhdGlvbl90eXBlID09PSBcIlJPT0ZUT1BcIikge1xuICAgICAgLy8gRmFrZSBib3VuZHNcbiAgICAgIGdlb2NvZGVkID0gPEdvb2dsZU1hcHNHZW9jb2RlZD4oXG4gICAgICAgIGdlb2NvZGVkLndpdGhCb3VuZHMobGF0aXR1ZGUsIGxvbmdpdHVkZSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdlb2NvZGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc2lnblF1ZXJ5KFxuICAgIHNlY3JldDogc3RyaW5nLFxuICAgIHBhdGhuYW1lOiBzdHJpbmcsXG4gICAgcGFyYW1zOiBHb29nbGVNYXBzUmVxdWVzdFBhcmFtc1xuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGNyeXB0byA9IGdldFJlcXVpcmVGdW5jKCkoXCJjcnlwdG9cIik7XG5cbiAgICBjb25zdCBmaWx0ZXJlZFJlcXVlc3RQYXJhbXMgPSBmaWx0ZXJVbmRlZmluZWRPYmplY3RWYWx1ZXMocGFyYW1zKTtcblxuICAgIGNvbnN0IHNhZmVTZWNyZXQgPSBkZWNvZGVCYXNlNjQoZGVjb2RlVXJsU2FmZUJhc2U2NChzZWNyZXQpKTtcbiAgICBjb25zdCB0b1NpZ24gPSBgJHtwYXRobmFtZX0/JHtuZXcgVVJMU2VhcmNoUGFyYW1zKFxuICAgICAgZmlsdGVyZWRSZXF1ZXN0UGFyYW1zXG4gICAgKS50b1N0cmluZygpfWA7XG4gICAgY29uc3QgaGFzaGVkU2lnbmF0dXJlID0gZW5jb2RlVXJsU2FmZUJhc2U2NChcbiAgICAgIGNyeXB0by5jcmVhdGVIbWFjKFwic2hhMVwiLCBzYWZlU2VjcmV0KS51cGRhdGUodG9TaWduKS5kaWdlc3QoXCJiYXNlNjRcIilcbiAgICApO1xuXG4gICAgcmV0dXJuIGhhc2hlZFNpZ25hdHVyZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmV2ZXJzZVF1ZXJ5LCBSZXZlcnNlUXVlcnlPYmplY3QgfSBmcm9tIFwicXVlcnlcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5T2JqZWN0IGV4dGVuZHMgUmV2ZXJzZVF1ZXJ5T2JqZWN0IHtcbiAgcmVhZG9ubHkgcmVzdWx0VHlwZXM/OiBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgbG9jYXRpb25UeXBlcz86IHN0cmluZ1tdO1xuICByZWFkb25seSBjaGFubmVsPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5IGV4dGVuZHMgUmV2ZXJzZVF1ZXJ5IHtcbiAgcHJpdmF0ZSByZWFkb25seSByZXN1bHRUeXBlcz86IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbG9jYXRpb25UeXBlcz86IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY2hhbm5lbD86IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioe1xuICAgIHJlc3VsdFR5cGVzLFxuICAgIGxvY2F0aW9uVHlwZXMsXG4gICAgY2hhbm5lbCxcbiAgICAuLi5yZXZlcnNlUXVlcnlPYmplY3RcbiAgfTogR29vZ2xlTWFwc1JldmVyc2VRdWVyeU9iamVjdCkge1xuICAgIHN1cGVyKHJldmVyc2VRdWVyeU9iamVjdCk7XG4gICAgdGhpcy5yZXN1bHRUeXBlcyA9IHJlc3VsdFR5cGVzO1xuICAgIHRoaXMubG9jYXRpb25UeXBlcyA9IGxvY2F0aW9uVHlwZXM7XG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxuICAgIG9iamVjdDogR29vZ2xlTWFwc1JldmVyc2VRdWVyeU9iamVjdFxuICApOiBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5IHtcbiAgICByZXR1cm4gbmV3IHRoaXMob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b09iamVjdCgpOiBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5T2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIudG9PYmplY3QoKSxcbiAgICAgIHJlc3VsdFR5cGVzOiB0aGlzLnJlc3VsdFR5cGVzLFxuICAgICAgbG9jYXRpb25UeXBlczogdGhpcy5sb2NhdGlvblR5cGVzLFxuICAgICAgY2hhbm5lbDogdGhpcy5jaGFubmVsLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgd2l0aFJlc3VsdFR5cGVzKHJlc3VsdFR5cGVzOiBzdHJpbmdbXSk6IEdvb2dsZU1hcHNSZXZlcnNlUXVlcnkge1xuICAgIHJldHVybiBuZXcgR29vZ2xlTWFwc1JldmVyc2VRdWVyeSh7IC4uLnRoaXMudG9PYmplY3QoKSwgcmVzdWx0VHlwZXMgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVzdWx0VHlwZXMoKTogdW5kZWZpbmVkIHwgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdFR5cGVzO1xuICB9XG5cbiAgcHVibGljIHdpdGhMb2NhdGlvblR5cGVzKGxvY2F0aW9uVHlwZXM6IHN0cmluZ1tdKTogR29vZ2xlTWFwc1JldmVyc2VRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5KHsgLi4udGhpcy50b09iamVjdCgpLCBsb2NhdGlvblR5cGVzIH0pO1xuICB9XG5cbiAgcHVibGljIGdldExvY2F0aW9uVHlwZXMoKTogdW5kZWZpbmVkIHwgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0aW9uVHlwZXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aENoYW5uZWwoY2hhbm5lbDogc3RyaW5nKTogR29vZ2xlTWFwc1JldmVyc2VRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5KHsgLi4udGhpcy50b09iamVjdCgpLCBjaGFubmVsIH0pO1xuICB9XG5cbiAgcHVibGljIGdldENoYW5uZWwoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jaGFubmVsO1xuICB9XG59XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIEdvb2dsZU1hcHNHZW9jb2RlZCB9IGZyb20gXCJwcm92aWRlci9nb29nbGVtYXBzL0dvb2dsZU1hcHNHZW9jb2RlZFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHb29nbGVNYXBzR2VvY29kZVF1ZXJ5IH0gZnJvbSBcInByb3ZpZGVyL2dvb2dsZW1hcHMvR29vZ2xlTWFwc0dlb2NvZGVRdWVyeVwiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL2dvb2dsZW1hcHMvR29vZ2xlTWFwc0dlb2NvZGVRdWVyeVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHb29nbGVNYXBzUHJvdmlkZXIgfSBmcm9tIFwicHJvdmlkZXIvZ29vZ2xlbWFwcy9Hb29nbGVNYXBzUHJvdmlkZXJcIjtcbmV4cG9ydCAqIGZyb20gXCJwcm92aWRlci9nb29nbGVtYXBzL0dvb2dsZU1hcHNQcm92aWRlclwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHb29nbGVNYXBzUmV2ZXJzZVF1ZXJ5IH0gZnJvbSBcInByb3ZpZGVyL2dvb2dsZW1hcHMvR29vZ2xlTWFwc1JldmVyc2VRdWVyeVwiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL2dvb2dsZW1hcHMvR29vZ2xlTWFwc1JldmVyc2VRdWVyeVwiO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBQcm92aWRlckhlbHBlcnMgfSBmcm9tIFwicHJvdmlkZXIvUHJvdmlkZXJIZWxwZXJzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFByb3ZpZGVySW50ZXJmYWNlIH0gZnJvbSBcInByb3ZpZGVyL1Byb3ZpZGVySW50ZXJmYWNlXCI7XG5leHBvcnQgKiBmcm9tIFwicHJvdmlkZXIvUHJvdmlkZXJJbnRlcmZhY2VcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQmluZ1Byb3ZpZGVyIH0gZnJvbSBcInByb3ZpZGVyL0JpbmdQcm92aWRlclwiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL0JpbmdQcm92aWRlclwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDaGFpblByb3ZpZGVyIH0gZnJvbSBcInByb3ZpZGVyL0NoYWluUHJvdmlkZXJcIjtcbmV4cG9ydCAqIGZyb20gXCJwcm92aWRlci9DaGFpblByb3ZpZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwicHJvdmlkZXIvZ2VvcGx1Z2luXCI7XG5leHBvcnQgKiBmcm9tIFwicHJvdmlkZXIvZ29vZ2xlbWFwc1wiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL21hcGJveFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXBxdWVzdFByb3ZpZGVyIH0gZnJvbSBcInByb3ZpZGVyL01hcHF1ZXN0UHJvdmlkZXJcIjtcbmV4cG9ydCAqIGZyb20gXCJwcm92aWRlci9NYXBxdWVzdFByb3ZpZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwicHJvdmlkZXIvbm9taW5hdGltXCI7XG5leHBvcnQgKiBmcm9tIFwicHJvdmlkZXIvb3BlbmNhZ2VcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgWWFuZGV4UHJvdmlkZXIgfSBmcm9tIFwicHJvdmlkZXIvWWFuZGV4UHJvdmlkZXJcIjtcbmV4cG9ydCAqIGZyb20gXCJwcm92aWRlci9ZYW5kZXhQcm92aWRlclwiO1xuIiwiaW1wb3J0IHsgR2VvY29kZVF1ZXJ5LCBHZW9jb2RlUXVlcnlPYmplY3QgfSBmcm9tIFwicXVlcnlcIjtcblxuZXhwb3J0IGludGVyZmFjZSBNYXBib3hHZW9jb2RlUXVlcnlPYmplY3QgZXh0ZW5kcyBHZW9jb2RlUXVlcnlPYmplY3Qge1xuICByZWFkb25seSBjb3VudHJ5Q29kZXM/OiBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgcHJveGltaXR5PzogQ29vcmRpbmF0ZXM7XG4gIHJlYWRvbmx5IGxvY2F0aW9uVHlwZXM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwYm94R2VvY29kZVF1ZXJ5IGV4dGVuZHMgR2VvY29kZVF1ZXJ5IHtcbiAgcHJpdmF0ZSByZWFkb25seSBjb3VudHJ5Q29kZXM/OiBzdHJpbmdbXTtcblxuICBwcml2YXRlIHJlYWRvbmx5IHByb3hpbWl0eT86IENvb3JkaW5hdGVzO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbG9jYXRpb25UeXBlcz86IHN0cmluZ1tdO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih7XG4gICAgY291bnRyeUNvZGVzLFxuICAgIHByb3hpbWl0eSxcbiAgICBsb2NhdGlvblR5cGVzLFxuICAgIC4uLmdlb2NvZGVRdWVyeU9iamVjdFxuICB9OiBNYXBib3hHZW9jb2RlUXVlcnlPYmplY3QpIHtcbiAgICBzdXBlcihnZW9jb2RlUXVlcnlPYmplY3QpO1xuICAgIHRoaXMuY291bnRyeUNvZGVzID0gY291bnRyeUNvZGVzO1xuICAgIHRoaXMucHJveGltaXR5ID0gcHJveGltaXR5O1xuICAgIHRoaXMubG9jYXRpb25UeXBlcyA9IGxvY2F0aW9uVHlwZXM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShvYmplY3Q6IE1hcGJveEdlb2NvZGVRdWVyeU9iamVjdCk6IE1hcGJveEdlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9PYmplY3QoKTogTWFwYm94R2VvY29kZVF1ZXJ5T2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIudG9PYmplY3QoKSxcbiAgICAgIGNvdW50cnlDb2RlczogdGhpcy5jb3VudHJ5Q29kZXMsXG4gICAgICBwcm94aW1pdHk6IHRoaXMucHJveGltaXR5LFxuICAgICAgbG9jYXRpb25UeXBlczogdGhpcy5sb2NhdGlvblR5cGVzLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgd2l0aENvdW50cnlDb2Rlcyhjb3VudHJ5Q29kZXM6IHN0cmluZ1tdKTogTWFwYm94R2VvY29kZVF1ZXJ5IHtcbiAgICByZXR1cm4gbmV3IE1hcGJveEdlb2NvZGVRdWVyeSh7IC4uLnRoaXMudG9PYmplY3QoKSwgY291bnRyeUNvZGVzIH0pO1xuICB9XG5cbiAgcHVibGljIGdldENvdW50cnlDb2RlcygpOiB1bmRlZmluZWQgfCBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuY291bnRyeUNvZGVzO1xuICB9XG5cbiAgcHVibGljIHdpdGhQcm94aW1pdHkocHJveGltaXR5OiBDb29yZGluYXRlcyk6IE1hcGJveEdlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBNYXBib3hHZW9jb2RlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIHByb3hpbWl0eSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcm94aW1pdHkoKTogdW5kZWZpbmVkIHwgQ29vcmRpbmF0ZXMge1xuICAgIHJldHVybiB0aGlzLnByb3hpbWl0eTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTG9jYXRpb25UeXBlcyhsb2NhdGlvblR5cGVzOiBzdHJpbmdbXSk6IE1hcGJveEdlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBNYXBib3hHZW9jb2RlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIGxvY2F0aW9uVHlwZXMgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TG9jYXRpb25UeXBlcygpOiB1bmRlZmluZWQgfCBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb25UeXBlcztcbiAgfVxufVxuIiwiaW1wb3J0IEdlb2NvZGVkLCB7IEdlb2NvZGVkT2JqZWN0IH0gZnJvbSBcIkdlb2NvZGVkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwYm94R2VvY29kZWRPYmplY3QgZXh0ZW5kcyBHZW9jb2RlZE9iamVjdCB7XG4gIHJlYWRvbmx5IHJlc3VsdFR5cGU/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwYm94R2VvY29kZWQgZXh0ZW5kcyBHZW9jb2RlZCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVzdWx0VHlwZT86IHN0cmluZ1tdO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih7XG4gICAgcmVzdWx0VHlwZSxcbiAgICAuLi5nZW9jb2RlZE9iamVjdFxuICB9OiBNYXBib3hHZW9jb2RlZE9iamVjdCkge1xuICAgIHN1cGVyKGdlb2NvZGVkT2JqZWN0KTtcbiAgICB0aGlzLnJlc3VsdFR5cGUgPSByZXN1bHRUeXBlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob2JqZWN0OiBNYXBib3hHZW9jb2RlZE9iamVjdCk6IE1hcGJveEdlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IHRoaXMob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b09iamVjdCgpOiBNYXBib3hHZW9jb2RlZE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnRvT2JqZWN0KCksXG4gICAgICByZXN1bHRUeXBlOiB0aGlzLnJlc3VsdFR5cGUsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoUmVzdWx0VHlwZShyZXN1bHRUeXBlOiBzdHJpbmdbXSk6IE1hcGJveEdlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IE1hcGJveEdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIHJlc3VsdFR5cGUsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVzdWx0VHlwZSgpOiB1bmRlZmluZWQgfCBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0VHlwZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRXh0ZXJuYWxMb2FkZXJCb2R5LFxuICBFeHRlcm5hbExvYWRlckhlYWRlcnMsXG4gIEV4dGVybmFsTG9hZGVySW50ZXJmYWNlLFxuICBFeHRlcm5hbExvYWRlclBhcmFtcyxcbn0gZnJvbSBcIkV4dGVybmFsTG9hZGVyXCI7XG5pbXBvcnQge1xuICBFcnJvckNhbGxiYWNrLFxuICBHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgTWFwYm94R2VvY29kZWQsXG4gIE1hcGJveEdlb2NvZGVRdWVyeSxcbiAgTWFwYm94R2VvY29kZVF1ZXJ5T2JqZWN0LFxuICBNYXBib3hSZXZlcnNlUXVlcnksXG4gIE1hcGJveFJldmVyc2VRdWVyeU9iamVjdCxcbiAgUHJvdmlkZXJIZWxwZXJzLFxuICBQcm92aWRlckludGVyZmFjZSxcbiAgUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlLFxuICBkZWZhdWx0UHJvdmlkZXJPcHRpb25zLFxufSBmcm9tIFwicHJvdmlkZXJcIjtcbmltcG9ydCB7IEJveCB9IGZyb20gXCJ0eXBlc1wiO1xuaW1wb3J0IEFkbWluTGV2ZWwgZnJvbSBcIkFkbWluTGV2ZWxcIjtcblxuaW50ZXJmYWNlIE1hcGJveFJlcXVlc3RQYXJhbXMge1xuICBbcGFyYW06IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICByZWFkb25seSBhY2Nlc3NfdG9rZW46IHN0cmluZztcbiAgcmVhZG9ubHkgY291bnRyeT86IHN0cmluZztcbiAgcmVhZG9ubHkgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxpbWl0Pzogc3RyaW5nO1xuICByZWFkb25seSBiYm94Pzogc3RyaW5nO1xuICByZWFkb25seSBwcm94aW1pdHk/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHJldmVyc2VNb2RlPzogXCJkaXN0YW5jZVwiIHwgXCJzY29yZVwiO1xuICByZWFkb25seSB0eXBlcz86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXBib3hSZXNwb25zZSB7XG4gIHR5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIjtcbiAgcXVlcnk6IHN0cmluZ1tdO1xuICBmZWF0dXJlczogTWFwYm94UmVzdWx0W107XG4gIGF0dHJpYnV0aW9uOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBNYXBib3hGZWF0dXJlQ29udGV4dFByb3BlcnRpZXMge1xuICBpZDogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIHdpa2lkYXRhPzogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHNob3J0X2NvZGU/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBNYXBib3hGZWF0dXJlUHJvcGVydGllcyB7XG4gIGFjY3VyYWN5Pzogc3RyaW5nO1xuICBhZGRyZXNzPzogc3RyaW5nO1xuICBjYXRlZ29yeT86IHN0cmluZztcbiAgbWFraT86IHN0cmluZztcbiAgd2lraWRhdGE/OiBzdHJpbmc7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgc2hvcnRfY29kZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXBib3hSZXN1bHQge1xuICBpZDogc3RyaW5nO1xuICB0eXBlOiBcIkZlYXR1cmVcIjtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBwbGFjZV90eXBlOiAoXG4gICAgfCBcImNvdW50cnlcIlxuICAgIHwgXCJyZWdpb25cIlxuICAgIHwgXCJwb3N0Y29kZVwiXG4gICAgfCBcImRpc3RyaWN0XCJcbiAgICB8IFwicGxhY2VcIlxuICAgIHwgXCJsb2NhbGl0eVwiXG4gICAgfCBcIm5laWdoYm9yaG9vZFwiXG4gICAgfCBcImFkZHJlc3NcIlxuICAgIHwgXCJwb2lcIlxuICApW107XG4gIHJlbGV2YW5jZTogbnVtYmVyO1xuICBhZGRyZXNzPzogc3RyaW5nO1xuICBwcm9wZXJ0aWVzOiBNYXBib3hGZWF0dXJlUHJvcGVydGllcztcbiAgdGV4dDogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHBsYWNlX25hbWU6IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICBtYXRjaGluZ190ZXh0Pzogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIG1hdGNoaW5nX3BsYWNlX25hbWU/OiBzdHJpbmc7XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICBiYm94PzogQm94O1xuICBjZW50ZXI6IFtudW1iZXIsIG51bWJlcl07XG4gIGdlb21ldHJ5OiB7XG4gICAgdHlwZTogXCJQb2ludFwiO1xuICAgIGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdO1xuICB9O1xuICBjb250ZXh0PzogTWFwYm94RmVhdHVyZUNvbnRleHRQcm9wZXJ0aWVzW107XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgcm91dGFibGVfcG9pbnRzPzoge1xuICAgIHBvaW50cz86IHtcbiAgICAgIGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIH1bXTtcbiAgfTtcbn1cblxuZXhwb3J0IGVudW0gTUFQQk9YX0dFT0NPRElOR19NT0RFUyB7XG4gIEdFT0NPRElOR19NT0RFX1BMQUNFUyA9IFwibWFwYm94LnBsYWNlc1wiLFxuICBHRU9DT0RJTkdfTU9ERV9QTEFDRVNfUEVSTUFORU5UID0gXCJtYXBib3gucGxhY2VzLXBlcm1hbmVudFwiLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hcGJveFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZVxuICBleHRlbmRzIFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSB7XG4gIHJlYWRvbmx5IGFwaUtleTogc3RyaW5nO1xuICByZWFkb25seSBnZW9jb2RpbmdNb2RlPzogTUFQQk9YX0dFT0NPRElOR19NT0RFUztcbiAgcmVhZG9ubHkgY291bnRyeUNvZGVzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0TWFwYm94UHJvdmlkZXJPcHRpb25zID0ge1xuICAuLi5kZWZhdWx0UHJvdmlkZXJPcHRpb25zLFxuICBhcGlLZXk6IFwiXCIsXG4gIGdlb2NvZGluZ01vZGU6IE1BUEJPWF9HRU9DT0RJTkdfTU9ERVMuR0VPQ09ESU5HX01PREVfUExBQ0VTLFxufTtcblxudHlwZSBNYXBib3hHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayA9IEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrPE1hcGJveEdlb2NvZGVkPjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwYm94UHJvdmlkZXJcbiAgaW1wbGVtZW50cyBQcm92aWRlckludGVyZmFjZTxNYXBib3hHZW9jb2RlZD4ge1xuICBwcml2YXRlIGV4dGVybmFsTG9hZGVyOiBFeHRlcm5hbExvYWRlckludGVyZmFjZTtcblxuICBwcml2YXRlIG9wdGlvbnM6IE1hcGJveFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgX2V4dGVybmFsTG9hZGVyOiBFeHRlcm5hbExvYWRlckludGVyZmFjZSxcbiAgICBvcHRpb25zOiBNYXBib3hQcm92aWRlck9wdGlvbnNJbnRlcmZhY2UgPSBkZWZhdWx0TWFwYm94UHJvdmlkZXJPcHRpb25zXG4gICkge1xuICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIgPSBfZXh0ZXJuYWxMb2FkZXI7XG4gICAgdGhpcy5vcHRpb25zID0geyAuLi5kZWZhdWx0TWFwYm94UHJvdmlkZXJPcHRpb25zLCAuLi5vcHRpb25zIH07XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYXBpS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBbiBBUEkga2V5IGlzIHJlcXVpcmVkIGZvciB0aGUgTWFwYm94IHByb3ZpZGVyLiBQbGVhc2UgYWRkIGl0IGluIHRoZSBcImFwaUtleVwiIG9wdGlvbi4nXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZW9jb2RlKFxuICAgIHF1ZXJ5OiBzdHJpbmcgfCBNYXBib3hHZW9jb2RlUXVlcnkgfCBNYXBib3hHZW9jb2RlUXVlcnlPYmplY3QsXG4gICAgY2FsbGJhY2s6IE1hcGJveEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdlb2NvZGVRdWVyeSA9IFByb3ZpZGVySGVscGVycy5nZXRHZW9jb2RlUXVlcnlGcm9tUGFyYW1ldGVyKFxuICAgICAgcXVlcnksXG4gICAgICBNYXBib3hHZW9jb2RlUXVlcnlcbiAgICApO1xuXG4gICAgaWYgKGdlb2NvZGVRdWVyeS5nZXRJcCgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiVGhlIE1hcGJveCBwcm92aWRlciBkb2VzIG5vdCBzdXBwb3J0IElQIGdlb2xvY2F0aW9uLCBvbmx5IGxvY2F0aW9uIGdlb2NvZGluZy5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLnNldE9wdGlvbnMoe1xuICAgICAgcHJvdG9jb2w6IHRoaXMub3B0aW9ucy51c2VTc2wgPyBcImh0dHBzXCIgOiBcImh0dHBcIixcbiAgICAgIGhvc3Q6IFwiYXBpLm1hcGJveC5jb21cIixcbiAgICAgIHBhdGhuYW1lOiBgZ2VvY29kaW5nL3Y1LyR7XG4gICAgICAgIHRoaXMub3B0aW9ucy5nZW9jb2RpbmdNb2RlXG4gICAgICB9LyR7Z2VvY29kZVF1ZXJ5LmdldFRleHQoKX0uanNvbmAsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXJhbXM6IE1hcGJveFJlcXVlc3RQYXJhbXMgPSB0aGlzLndpdGhDb21tb25QYXJhbXMoXG4gICAgICB7XG4gICAgICAgIGJib3g6IGdlb2NvZGVRdWVyeS5nZXRCb3VuZHMoKVxuICAgICAgICAgID8gYCR7Z2VvY29kZVF1ZXJ5LmdldEJvdW5kcygpPy53ZXN0fSwke1xuICAgICAgICAgICAgICBnZW9jb2RlUXVlcnkuZ2V0Qm91bmRzKCk/LnNvdXRoXG4gICAgICAgICAgICB9LCR7Z2VvY29kZVF1ZXJ5LmdldEJvdW5kcygpPy5lYXN0fSwke1xuICAgICAgICAgICAgICBnZW9jb2RlUXVlcnkuZ2V0Qm91bmRzKCk/Lm5vcnRoXG4gICAgICAgICAgICB9YFxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICBwcm94aW1pdHk6ICg8TWFwYm94R2VvY29kZVF1ZXJ5Pmdlb2NvZGVRdWVyeSkuZ2V0UHJveGltaXR5KClcbiAgICAgICAgICA/IGAkeyg8TWFwYm94R2VvY29kZVF1ZXJ5Pmdlb2NvZGVRdWVyeSkuZ2V0UHJveGltaXR5KCk/LmxvbmdpdHVkZX0sJHtcbiAgICAgICAgICAgICAgKDxNYXBib3hHZW9jb2RlUXVlcnk+Z2VvY29kZVF1ZXJ5KS5nZXRQcm94aW1pdHkoKT8ubGF0aXR1ZGVcbiAgICAgICAgICAgIH1gXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIHR5cGVzOiAoPE1hcGJveEdlb2NvZGVRdWVyeT5nZW9jb2RlUXVlcnkpLmdldExvY2F0aW9uVHlwZXMoKVxuICAgICAgICAgID8gKDxNYXBib3hHZW9jb2RlUXVlcnk+Z2VvY29kZVF1ZXJ5KS5nZXRMb2NhdGlvblR5cGVzKCk/LmpvaW4oXCIsXCIpXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgICAgPE1hcGJveEdlb2NvZGVRdWVyeT5nZW9jb2RlUXVlcnlcbiAgICApO1xuXG4gICAgdGhpcy5leGVjdXRlUmVxdWVzdChwYXJhbXMsIGNhbGxiYWNrLCB7fSwge30sIGVycm9yQ2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIGdlb2RlY29kZShcbiAgICBsYXRpdHVkZU9yUXVlcnk6XG4gICAgICB8IG51bWJlclxuICAgICAgfCBzdHJpbmdcbiAgICAgIHwgTWFwYm94UmV2ZXJzZVF1ZXJ5XG4gICAgICB8IE1hcGJveFJldmVyc2VRdWVyeU9iamVjdCxcbiAgICBsb25naXR1ZGVPckNhbGxiYWNrOiBudW1iZXIgfCBzdHJpbmcgfCBNYXBib3hHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFjaz86IE1hcGJveEdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrIHwgRXJyb3JDYWxsYmFjayxcbiAgICBlcnJvckNhbGxiYWNrPzogRXJyb3JDYWxsYmFja1xuICApOiB2b2lkIHtcbiAgICBjb25zdCByZXZlcnNlUXVlcnkgPSBQcm92aWRlckhlbHBlcnMuZ2V0UmV2ZXJzZVF1ZXJ5RnJvbVBhcmFtZXRlcnMoXG4gICAgICBsYXRpdHVkZU9yUXVlcnksXG4gICAgICBsb25naXR1ZGVPckNhbGxiYWNrLFxuICAgICAgTWFwYm94UmV2ZXJzZVF1ZXJ5XG4gICAgKTtcbiAgICBjb25zdCByZXZlcnNlQ2FsbGJhY2sgPSBQcm92aWRlckhlbHBlcnMuZ2V0Q2FsbGJhY2tGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFja1xuICAgICk7XG4gICAgY29uc3QgcmV2ZXJzZUVycm9yQ2FsbGJhY2sgPSBQcm92aWRlckhlbHBlcnMuZ2V0RXJyb3JDYWxsYmFja0Zyb21QYXJhbWV0ZXJzKFxuICAgICAgbG9uZ2l0dWRlT3JDYWxsYmFjayxcbiAgICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFja1xuICAgICk7XG5cbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLnNldE9wdGlvbnMoe1xuICAgICAgcHJvdG9jb2w6IHRoaXMub3B0aW9ucy51c2VTc2wgPyBcImh0dHBzXCIgOiBcImh0dHBcIixcbiAgICAgIGhvc3Q6IFwiYXBpLm1hcGJveC5jb21cIixcbiAgICAgIHBhdGhuYW1lOiBgZ2VvY29kaW5nL3Y1LyR7dGhpcy5vcHRpb25zLmdlb2NvZGluZ01vZGV9LyR7XG4gICAgICAgIHJldmVyc2VRdWVyeS5nZXRDb29yZGluYXRlcygpLmxvbmdpdHVkZVxuICAgICAgfSwke3JldmVyc2VRdWVyeS5nZXRDb29yZGluYXRlcygpLmxhdGl0dWRlfS5qc29uYCxcbiAgICB9KTtcblxuICAgIGNvbnN0IHBhcmFtczogTWFwYm94UmVxdWVzdFBhcmFtcyA9IHRoaXMud2l0aENvbW1vblBhcmFtcyhcbiAgICAgIHtcbiAgICAgICAgcmV2ZXJzZU1vZGU6ICg8TWFwYm94UmV2ZXJzZVF1ZXJ5PnJldmVyc2VRdWVyeSkuZ2V0UmV2ZXJzZU1vZGUoKVxuICAgICAgICAgID8gKDxNYXBib3hSZXZlcnNlUXVlcnk+cmV2ZXJzZVF1ZXJ5KS5nZXRSZXZlcnNlTW9kZSgpXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIHR5cGVzOiAoPE1hcGJveFJldmVyc2VRdWVyeT5yZXZlcnNlUXVlcnkpLmdldExvY2F0aW9uVHlwZXMoKVxuICAgICAgICAgID8gKDxNYXBib3hSZXZlcnNlUXVlcnk+cmV2ZXJzZVF1ZXJ5KS5nZXRMb2NhdGlvblR5cGVzKCk/LmpvaW4oXCIsXCIpXG4gICAgICAgICAgOiBcImFkZHJlc3NcIixcbiAgICAgIH0sXG4gICAgICA8TWFwYm94UmV2ZXJzZVF1ZXJ5PnJldmVyc2VRdWVyeVxuICAgICk7XG5cbiAgICB0aGlzLmV4ZWN1dGVSZXF1ZXN0KHBhcmFtcywgcmV2ZXJzZUNhbGxiYWNrLCB7fSwge30sIHJldmVyc2VFcnJvckNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgd2l0aENvbW1vblBhcmFtcyhcbiAgICBwYXJhbXM6IFBpY2s8XG4gICAgICBNYXBib3hSZXF1ZXN0UGFyYW1zLFxuICAgICAgXCJiYm94XCIgfCBcInByb3hpbWl0eVwiIHwgXCJyZXZlcnNlTW9kZVwiIHwgXCJ0eXBlc1wiXG4gICAgPixcbiAgICBxdWVyeTogTWFwYm94R2VvY29kZVF1ZXJ5IHwgTWFwYm94UmV2ZXJzZVF1ZXJ5XG4gICk6IE1hcGJveFJlcXVlc3RQYXJhbXMge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5wYXJhbXMsXG4gICAgICBhY2Nlc3NfdG9rZW46IHRoaXMub3B0aW9ucy5hcGlLZXkgfHwgXCJcIixcbiAgICAgIGNvdW50cnk6IHF1ZXJ5LmdldENvdW50cnlDb2RlcygpXG4gICAgICAgID8gcXVlcnkuZ2V0Q291bnRyeUNvZGVzKCk/LmpvaW4oXCIsXCIpXG4gICAgICAgIDogdGhpcy5vcHRpb25zLmNvdW50cnlDb2Rlcz8uam9pbihcIixcIiksXG4gICAgICBsYW5ndWFnZTogcXVlcnkuZ2V0TG9jYWxlKCksXG4gICAgICBsaW1pdDogcXVlcnkuZ2V0TGltaXQoKS50b1N0cmluZygpLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZVJlcXVlc3QoXG4gICAgcGFyYW1zOiBFeHRlcm5hbExvYWRlclBhcmFtcyxcbiAgICBjYWxsYmFjazogTWFwYm94R2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgaGVhZGVycz86IEV4dGVybmFsTG9hZGVySGVhZGVycyxcbiAgICBib2R5PzogRXh0ZXJuYWxMb2FkZXJCb2R5LFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIuZXhlY3V0ZVJlcXVlc3QoXG4gICAgICBwYXJhbXMsXG4gICAgICAoZGF0YTogTWFwYm94UmVzcG9uc2UpID0+IHtcbiAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgZGF0YS5mZWF0dXJlcy5tYXAoKHJlc3VsdDogTWFwYm94UmVzdWx0KSA9PlxuICAgICAgICAgICAgTWFwYm94UHJvdmlkZXIubWFwVG9HZW9jb2RlZChyZXN1bHQpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICBib2R5LFxuICAgICAgZXJyb3JDYWxsYmFja1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG1hcFRvR2VvY29kZWQocmVzdWx0OiBNYXBib3hSZXN1bHQpOiBNYXBib3hHZW9jb2RlZCB7XG4gICAgY29uc3QgbGF0aXR1ZGUgPSByZXN1bHQuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV07XG4gICAgY29uc3QgbG9uZ2l0dWRlID0gcmVzdWx0Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdO1xuICAgIGNvbnN0IGZvcm1hdHRlZEFkZHJlc3MgPSByZXN1bHQucGxhY2VfbmFtZTtcbiAgICBjb25zdCBzdHJlZXROdW1iZXIgPSByZXN1bHQuYWRkcmVzcztcbiAgICBjb25zdCBzdHJlZXROYW1lID0gcmVzdWx0LnRleHQ7XG4gICAgbGV0IGxvY2FsaXR5O1xuICAgIGxldCBwb3N0YWxDb2RlO1xuICAgIGxldCByZWdpb247XG4gICAgbGV0IGNvdW50cnk7XG4gICAgbGV0IGNvdW50cnlDb2RlO1xuICAgIGNvbnN0IGFkbWluTGV2ZWxzOiBBZG1pbkxldmVsW10gPSBbXTtcbiAgICBjb25zdCByZXN1bHRUeXBlID0gcmVzdWx0LnBsYWNlX3R5cGU7XG5cbiAgICBsZXQgYWRtaW5MZXZlbENvZGU6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgICAocmVzdWx0LmNvbnRleHQgfHwgW10pLmZvckVhY2goKGZlYXR1cmUpID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSBmZWF0dXJlLmlkLnNwbGl0KFwiLlwiKVswXTtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwibG9jYWxpdHlcIjpcbiAgICAgICAgICBsb2NhbGl0eSA9IGZlYXR1cmUudGV4dDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBsYWNlXCI6XG4gICAgICAgICAgbG9jYWxpdHkgPSBmZWF0dXJlLnRleHQ7XG4gICAgICAgICAgYWRtaW5MZXZlbHMucHVzaChcbiAgICAgICAgICAgIEFkbWluTGV2ZWwuY3JlYXRlKHtcbiAgICAgICAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgICAgICAgIG5hbWU6IGxvY2FsaXR5LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicG9zdGNvZGVcIjpcbiAgICAgICAgICBwb3N0YWxDb2RlID0gZmVhdHVyZS50ZXh0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVnaW9uXCI6XG4gICAgICAgICAgcmVnaW9uID0gZmVhdHVyZS50ZXh0O1xuICAgICAgICAgIGFkbWluTGV2ZWxDb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGlmIChmZWF0dXJlLnNob3J0X2NvZGUgJiYgZmVhdHVyZS5zaG9ydF9jb2RlLm1hdGNoKC9bQS16XXsyfS0vKSkge1xuICAgICAgICAgICAgYWRtaW5MZXZlbENvZGUgPSBmZWF0dXJlLnNob3J0X2NvZGUucmVwbGFjZSgvW0Etel17Mn0tLywgXCJcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFkbWluTGV2ZWxzLnB1c2goXG4gICAgICAgICAgICBBZG1pbkxldmVsLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGxldmVsOiAxLFxuICAgICAgICAgICAgICBuYW1lOiByZWdpb24sXG4gICAgICAgICAgICAgIGNvZGU6IGFkbWluTGV2ZWxDb2RlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY291bnRyeVwiOlxuICAgICAgICAgIGNvdW50cnkgPSBmZWF0dXJlLnRleHQ7XG4gICAgICAgICAgY291bnRyeUNvZGUgPSBmZWF0dXJlLnNob3J0X2NvZGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgZ2VvY29kZWQgPSBNYXBib3hHZW9jb2RlZC5jcmVhdGUoe1xuICAgICAgbGF0aXR1ZGUsXG4gICAgICBsb25naXR1ZGUsXG4gICAgICBmb3JtYXR0ZWRBZGRyZXNzLFxuICAgICAgc3RyZWV0TnVtYmVyLFxuICAgICAgc3RyZWV0TmFtZSxcbiAgICAgIGxvY2FsaXR5LFxuICAgICAgcG9zdGFsQ29kZSxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGFkbWluTGV2ZWxzLFxuICAgICAgY291bnRyeSxcbiAgICAgIGNvdW50cnlDb2RlLFxuICAgICAgcmVzdWx0VHlwZSxcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmJib3gpIHtcbiAgICAgIGdlb2NvZGVkID0gPE1hcGJveEdlb2NvZGVkPihcbiAgICAgICAgZ2VvY29kZWQud2l0aEJvdW5kcyhcbiAgICAgICAgICByZXN1bHQuYmJveFsxXSxcbiAgICAgICAgICByZXN1bHQuYmJveFswXSxcbiAgICAgICAgICByZXN1bHQuYmJveFszXSxcbiAgICAgICAgICByZXN1bHQuYmJveFsyXVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBnZW9jb2RlZDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmV2ZXJzZVF1ZXJ5LCBSZXZlcnNlUXVlcnlPYmplY3QgfSBmcm9tIFwicXVlcnlcIjtcblxudHlwZSBSZXZlcnNlTW9kZSA9IFwiZGlzdGFuY2VcIiB8IFwic2NvcmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBNYXBib3hSZXZlcnNlUXVlcnlPYmplY3QgZXh0ZW5kcyBSZXZlcnNlUXVlcnlPYmplY3Qge1xuICByZWFkb25seSBjb3VudHJ5Q29kZXM/OiBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgcmV2ZXJzZU1vZGU/OiBSZXZlcnNlTW9kZTtcbiAgcmVhZG9ubHkgbG9jYXRpb25UeXBlcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBib3hSZXZlcnNlUXVlcnkgZXh0ZW5kcyBSZXZlcnNlUXVlcnkge1xuICBwcml2YXRlIHJlYWRvbmx5IGNvdW50cnlDb2Rlcz86IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcmV2ZXJzZU1vZGU/OiBSZXZlcnNlTW9kZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGxvY2F0aW9uVHlwZXM/OiBzdHJpbmdbXTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioe1xuICAgIGNvdW50cnlDb2RlcyxcbiAgICByZXZlcnNlTW9kZSxcbiAgICBsb2NhdGlvblR5cGVzLFxuICAgIC4uLnJldmVyc2VRdWVyeU9iamVjdFxuICB9OiBNYXBib3hSZXZlcnNlUXVlcnlPYmplY3QpIHtcbiAgICBzdXBlcihyZXZlcnNlUXVlcnlPYmplY3QpO1xuICAgIHRoaXMuY291bnRyeUNvZGVzID0gY291bnRyeUNvZGVzO1xuICAgIHRoaXMucmV2ZXJzZU1vZGUgPSByZXZlcnNlTW9kZTtcbiAgICB0aGlzLmxvY2F0aW9uVHlwZXMgPSBsb2NhdGlvblR5cGVzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob2JqZWN0OiBNYXBib3hSZXZlcnNlUXVlcnlPYmplY3QpOiBNYXBib3hSZXZlcnNlUXVlcnkge1xuICAgIHJldHVybiBuZXcgdGhpcyhvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIHRvT2JqZWN0KCk6IE1hcGJveFJldmVyc2VRdWVyeU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnRvT2JqZWN0KCksXG4gICAgICBjb3VudHJ5Q29kZXM6IHRoaXMuY291bnRyeUNvZGVzLFxuICAgICAgcmV2ZXJzZU1vZGU6IHRoaXMucmV2ZXJzZU1vZGUsXG4gICAgICBsb2NhdGlvblR5cGVzOiB0aGlzLmxvY2F0aW9uVHlwZXMsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoQ291bnRyeUNvZGVzKGNvdW50cnlDb2Rlczogc3RyaW5nW10pOiBNYXBib3hSZXZlcnNlUXVlcnkge1xuICAgIHJldHVybiBuZXcgTWFwYm94UmV2ZXJzZVF1ZXJ5KHsgLi4udGhpcy50b09iamVjdCgpLCBjb3VudHJ5Q29kZXMgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnRyeUNvZGVzKCk6IHVuZGVmaW5lZCB8IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudHJ5Q29kZXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aFJldmVyc2VNb2RlKHJldmVyc2VNb2RlOiBSZXZlcnNlTW9kZSk6IE1hcGJveFJldmVyc2VRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBNYXBib3hSZXZlcnNlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIHJldmVyc2VNb2RlIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFJldmVyc2VNb2RlKCk6IHVuZGVmaW5lZCB8IFJldmVyc2VNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlTW9kZTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTG9jYXRpb25UeXBlcyhsb2NhdGlvblR5cGVzOiBzdHJpbmdbXSk6IE1hcGJveFJldmVyc2VRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBNYXBib3hSZXZlcnNlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIGxvY2F0aW9uVHlwZXMgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TG9jYXRpb25UeXBlcygpOiB1bmRlZmluZWQgfCBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb25UeXBlcztcbiAgfVxufVxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXBib3hHZW9jb2RlZCB9IGZyb20gXCJwcm92aWRlci9tYXBib3gvTWFwYm94R2VvY29kZWRcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFwYm94R2VvY29kZVF1ZXJ5IH0gZnJvbSBcInByb3ZpZGVyL21hcGJveC9NYXBib3hHZW9jb2RlUXVlcnlcIjtcbmV4cG9ydCAqIGZyb20gXCJwcm92aWRlci9tYXBib3gvTWFwYm94R2VvY29kZVF1ZXJ5XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hcGJveFByb3ZpZGVyIH0gZnJvbSBcInByb3ZpZGVyL21hcGJveC9NYXBib3hQcm92aWRlclwiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL21hcGJveC9NYXBib3hQcm92aWRlclwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXBib3hSZXZlcnNlUXVlcnkgfSBmcm9tIFwicHJvdmlkZXIvbWFwYm94L01hcGJveFJldmVyc2VRdWVyeVwiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL21hcGJveC9NYXBib3hSZXZlcnNlUXVlcnlcIjtcbiIsImltcG9ydCB7IEdlb2NvZGVRdWVyeSwgR2VvY29kZVF1ZXJ5T2JqZWN0IH0gZnJvbSBcInF1ZXJ5XCI7XG5pbXBvcnQgeyBCb3ggfSBmcm9tIFwidHlwZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBOb21pbmF0aW1HZW9jb2RlUXVlcnlPYmplY3QgZXh0ZW5kcyBHZW9jb2RlUXVlcnlPYmplY3Qge1xuICByZWFkb25seSBjb3VudHJ5Q29kZXM/OiBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgZXhjbHVkZVBsYWNlSWRzPzogbnVtYmVyW107XG4gIHJlYWRvbmx5IHZpZXdCb3g/OiBCb3g7XG4gIHJlYWRvbmx5IGJvdW5kZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb21pbmF0aW1HZW9jb2RlUXVlcnkgZXh0ZW5kcyBHZW9jb2RlUXVlcnkge1xuICBwcml2YXRlIHJlYWRvbmx5IGNvdW50cnlDb2Rlcz86IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZXhjbHVkZVBsYWNlSWRzPzogbnVtYmVyW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSB2aWV3Qm94PzogQm94O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgYm91bmRlZD86IGJvb2xlYW47XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHtcbiAgICBjb3VudHJ5Q29kZXMsXG4gICAgZXhjbHVkZVBsYWNlSWRzLFxuICAgIHZpZXdCb3gsXG4gICAgYm91bmRlZCxcbiAgICAuLi5nZW9jb2RlUXVlcnlPYmplY3RcbiAgfTogTm9taW5hdGltR2VvY29kZVF1ZXJ5T2JqZWN0KSB7XG4gICAgc3VwZXIoZ2VvY29kZVF1ZXJ5T2JqZWN0KTtcbiAgICB0aGlzLmNvdW50cnlDb2RlcyA9IGNvdW50cnlDb2RlcztcbiAgICB0aGlzLmV4Y2x1ZGVQbGFjZUlkcyA9IGV4Y2x1ZGVQbGFjZUlkcztcbiAgICBpZiAodmlld0JveCAmJiB2aWV3Qm94Lmxlbmd0aCAhPT0gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJ2aWV3Qm94XCIgcGFyYW1ldGVyIG11c3QgYmUgNCBudW1iZXJzLicpO1xuICAgIH1cbiAgICB0aGlzLnZpZXdCb3ggPSB2aWV3Qm94O1xuICAgIGlmIChib3VuZGVkICYmICF2aWV3Qm94KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgXCJib3VuZGVkXCIgcGFyYW1ldGVyIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCB0aGUgXCJ2aWV3Qm94XCIgcGFyYW1ldGVyLidcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuYm91bmRlZCA9IGJvdW5kZWQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShcbiAgICBvYmplY3Q6IE5vbWluYXRpbUdlb2NvZGVRdWVyeU9iamVjdFxuICApOiBOb21pbmF0aW1HZW9jb2RlUXVlcnkge1xuICAgIHJldHVybiBuZXcgdGhpcyhvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIHRvT2JqZWN0KCk6IE5vbWluYXRpbUdlb2NvZGVRdWVyeU9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnRvT2JqZWN0KCksXG4gICAgICBjb3VudHJ5Q29kZXM6IHRoaXMuY291bnRyeUNvZGVzLFxuICAgICAgZXhjbHVkZVBsYWNlSWRzOiB0aGlzLmV4Y2x1ZGVQbGFjZUlkcyxcbiAgICAgIHZpZXdCb3g6IHRoaXMudmlld0JveCxcbiAgICAgIGJvdW5kZWQ6IHRoaXMuYm91bmRlZCxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHdpdGhDb3VudHJ5Q29kZXMoY291bnRyeUNvZGVzOiBzdHJpbmdbXSk6IE5vbWluYXRpbUdlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBOb21pbmF0aW1HZW9jb2RlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIGNvdW50cnlDb2RlcyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3VudHJ5Q29kZXMoKTogdW5kZWZpbmVkIHwgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmNvdW50cnlDb2RlcztcbiAgfVxuXG4gIHB1YmxpYyB3aXRoRXhjbHVkZVBsYWNlSWRzKGV4Y2x1ZGVQbGFjZUlkczogbnVtYmVyW10pOiBOb21pbmF0aW1HZW9jb2RlUXVlcnkge1xuICAgIHJldHVybiBuZXcgTm9taW5hdGltR2VvY29kZVF1ZXJ5KHsgLi4udGhpcy50b09iamVjdCgpLCBleGNsdWRlUGxhY2VJZHMgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RXhjbHVkZVBsYWNlSWRzKCk6IHVuZGVmaW5lZCB8IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy5leGNsdWRlUGxhY2VJZHM7XG4gIH1cblxuICBwdWJsaWMgd2l0aFZpZXdCb3godmlld0JveDogQm94KTogTm9taW5hdGltR2VvY29kZVF1ZXJ5IHtcbiAgICByZXR1cm4gbmV3IE5vbWluYXRpbUdlb2NvZGVRdWVyeSh7IC4uLnRoaXMudG9PYmplY3QoKSwgdmlld0JveCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRWaWV3Qm94KCk6IHVuZGVmaW5lZCB8IEJveCB7XG4gICAgcmV0dXJuIHRoaXMudmlld0JveDtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoQm91bmRlZChib3VuZGVkOiBib29sZWFuKTogTm9taW5hdGltR2VvY29kZVF1ZXJ5IHtcbiAgICByZXR1cm4gbmV3IE5vbWluYXRpbUdlb2NvZGVRdWVyeSh7IC4uLnRoaXMudG9PYmplY3QoKSwgYm91bmRlZCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCb3VuZGVkKCk6IHVuZGVmaW5lZCB8IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmJvdW5kZWQ7XG4gIH1cbn1cbiIsImltcG9ydCBHZW9jb2RlZCwgeyBHZW9jb2RlZE9iamVjdCB9IGZyb20gXCJHZW9jb2RlZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vbWluYXRpbUdlb2NvZGVkT2JqZWN0IGV4dGVuZHMgR2VvY29kZWRPYmplY3Qge1xuICByZWFkb25seSBkaXNwbGF5TmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgb3NtSWQ/OiBudW1iZXI7XG4gIHJlYWRvbmx5IG9zbVR5cGU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNhdGVnb3J5Pzogc3RyaW5nO1xuICByZWFkb25seSB0eXBlPzogc3RyaW5nO1xuICByZWFkb25seSBhdHRyaWJ1dGlvbj86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9taW5hdGltR2VvY29kZWQgZXh0ZW5kcyBHZW9jb2RlZCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGlzcGxheU5hbWU/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBvc21JZD86IG51bWJlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IG9zbVR5cGU/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjYXRlZ29yeT86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IHR5cGU/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBhdHRyaWJ1dGlvbj86IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioe1xuICAgIGRpc3BsYXlOYW1lLFxuICAgIG9zbUlkLFxuICAgIG9zbVR5cGUsXG4gICAgY2F0ZWdvcnksXG4gICAgdHlwZSxcbiAgICBhdHRyaWJ1dGlvbixcbiAgICAuLi5nZW9jb2RlZE9iamVjdFxuICB9OiBOb21pbmF0aW1HZW9jb2RlZE9iamVjdCkge1xuICAgIHN1cGVyKGdlb2NvZGVkT2JqZWN0KTtcbiAgICB0aGlzLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gICAgdGhpcy5vc21JZCA9IG9zbUlkO1xuICAgIHRoaXMub3NtVHlwZSA9IG9zbVR5cGU7XG4gICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbiA9IGF0dHJpYnV0aW9uO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob2JqZWN0OiBOb21pbmF0aW1HZW9jb2RlZE9iamVjdCk6IE5vbWluYXRpbUdlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IHRoaXMob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b09iamVjdCgpOiBOb21pbmF0aW1HZW9jb2RlZE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnRvT2JqZWN0KCksXG4gICAgICBkaXNwbGF5TmFtZTogdGhpcy5kaXNwbGF5TmFtZSxcbiAgICAgIG9zbUlkOiB0aGlzLm9zbUlkLFxuICAgICAgb3NtVHlwZTogdGhpcy5vc21UeXBlLFxuICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnksXG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBhdHRyaWJ1dGlvbjogdGhpcy5hdHRyaWJ1dGlvbixcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHdpdGhEaXNwbGF5TmFtZShkaXNwbGF5TmFtZTogc3RyaW5nKTogTm9taW5hdGltR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgTm9taW5hdGltR2VvY29kZWQoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgZGlzcGxheU5hbWUsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RGlzcGxheU5hbWUoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5TmFtZTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoT3NtSWQob3NtSWQ6IG51bWJlcik6IE5vbWluYXRpbUdlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IE5vbWluYXRpbUdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIG9zbUlkLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldE9zbUlkKCk6IHVuZGVmaW5lZCB8IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3NtSWQ7XG4gIH1cblxuICBwdWJsaWMgd2l0aE9zbVR5cGUob3NtVHlwZTogc3RyaW5nKTogTm9taW5hdGltR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgTm9taW5hdGltR2VvY29kZWQoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgb3NtVHlwZSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPc21UeXBlKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub3NtVHlwZTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoQ2F0ZWdvcnkoY2F0ZWdvcnk6IHN0cmluZyk6IE5vbWluYXRpbUdlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IE5vbWluYXRpbUdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGNhdGVnb3J5LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldENhdGVnb3J5KCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY2F0ZWdvcnk7XG4gIH1cblxuICBwdWJsaWMgd2l0aFR5cGUodHlwZTogc3RyaW5nKTogTm9taW5hdGltR2VvY29kZWQge1xuICAgIHJldHVybiBuZXcgTm9taW5hdGltR2VvY29kZWQoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgdHlwZSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUeXBlKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoQXR0cmlidXRpb24oYXR0cmlidXRpb246IHN0cmluZyk6IE5vbWluYXRpbUdlb2NvZGVkIHtcbiAgICByZXR1cm4gbmV3IE5vbWluYXRpbUdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGF0dHJpYnV0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldEF0dHJpYnV0aW9uKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRpb247XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEV4dGVybmFsTG9hZGVyQm9keSxcbiAgRXh0ZXJuYWxMb2FkZXJIZWFkZXJzLFxuICBFeHRlcm5hbExvYWRlckludGVyZmFjZSxcbiAgRXh0ZXJuYWxMb2FkZXJQYXJhbXMsXG59IGZyb20gXCJFeHRlcm5hbExvYWRlclwiO1xuaW1wb3J0IHtcbiAgRXJyb3JDYWxsYmFjayxcbiAgR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gIE5vbWluYXRpbUdlb2NvZGVkLFxuICBOb21pbmF0aW1SZXZlcnNlUXVlcnksXG4gIE5vbWluYXRpbVJldmVyc2VRdWVyeU9iamVjdCxcbiAgTm9taW5hdGltR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICBOb21pbmF0aW1HZW9jb2RlUXVlcnksXG4gIFByb3ZpZGVySGVscGVycyxcbiAgUHJvdmlkZXJJbnRlcmZhY2UsXG4gIFByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSxcbiAgZGVmYXVsdFByb3ZpZGVyT3B0aW9ucyxcbn0gZnJvbSBcInByb3ZpZGVyXCI7XG5pbXBvcnQgQWRtaW5MZXZlbCBmcm9tIFwiQWRtaW5MZXZlbFwiO1xuaW1wb3J0IHsgUmVzcG9uc2VFcnJvciB9IGZyb20gXCJlcnJvclwiO1xuXG5pbnRlcmZhY2UgTm9taW5hdGltUmVxdWVzdFBhcmFtcyB7XG4gIFtwYXJhbTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICByZWFkb25seSBxPzogc3RyaW5nO1xuICByZWFkb25seSBsYXQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxvbj86IHN0cmluZztcbiAgcmVhZG9ubHkgZm9ybWF0OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGFkZHJlc3NkZXRhaWxzOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHpvb20/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxpbWl0Pzogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHJlYWRvbmx5IFwiYWNjZXB0LWxhbmd1YWdlXCI/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNvdW50cnljb2Rlcz86IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICByZWFkb25seSBleGNsdWRlX3BsYWNlX2lkcz86IHN0cmluZztcbiAgcmVhZG9ubHkgdmlld2JveD86IHN0cmluZztcbiAgcmVhZG9ubHkgYm91bmRlZD86IHN0cmluZztcbiAgcmVhZG9ubHkganNvbnBDYWxsYmFjaz86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIE5vbWluYXRpbUVycm9yUmVzcG9uc2Uge1xuICBlcnJvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBOb21pbmF0aW1SZXNwb25zZSA9XG4gIHwgTm9taW5hdGltRXJyb3JSZXNwb25zZVxuICB8IE5vbWluYXRpbVJlc3VsdFxuICB8IE5vbWluYXRpbVJlc3VsdFtdO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vbWluYXRpbVJlc3VsdCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgcGxhY2VfaWQ6IG51bWJlcjtcbiAgbGljZW5jZTogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIG9zbV90eXBlOiBzdHJpbmc7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgb3NtX2lkOiBudW1iZXI7XG4gIGJvdW5kaW5nYm94OiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nXTtcbiAgbGF0OiBzdHJpbmc7XG4gIGxvbjogc3RyaW5nO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGRpc3BsYXlfbmFtZTogc3RyaW5nO1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIGltcG9ydGFuY2U6IG51bWJlcjtcbiAgaWNvbjogc3RyaW5nO1xuICBhZGRyZXNzOiB7XG4gICAgYXR0cmFjdGlvbj86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgaG91c2VfbnVtYmVyPzogc3RyaW5nO1xuICAgIHJvYWQ/OiBzdHJpbmc7XG4gICAgcGVkZXN0cmlhbj86IHN0cmluZztcbiAgICBuZWlnaGJvdXJob29kPzogc3RyaW5nO1xuICAgIHN1YnVyYj86IHN0cmluZztcbiAgICBjaXR5Pzogc3RyaW5nO1xuICAgIHRvd24/OiBzdHJpbmc7XG4gICAgdmlsbGFnZT86IHN0cmluZztcbiAgICBoYW1sZXQ/OiBzdHJpbmc7XG4gICAgc3RhdGU/OiBzdHJpbmc7XG4gICAgY291bnR5Pzogc3RyaW5nO1xuICAgIHBvc3Rjb2RlPzogc3RyaW5nO1xuICAgIGNvdW50cnk/OiBzdHJpbmc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGNvdW50cnlfY29kZT86IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb21pbmF0aW1Qcm92aWRlck9wdGlvbnNJbnRlcmZhY2VcbiAgZXh0ZW5kcyBQcm92aWRlck9wdGlvbnNJbnRlcmZhY2Uge1xuICByZWFkb25seSBob3N0Pzogc3RyaW5nO1xuICByZWFkb25seSB1c2VyQWdlbnQ6IHN0cmluZztcbiAgcmVhZG9ubHkgcmVmZXJlcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHROb21pbmF0aW1Qcm92aWRlck9wdGlvbnMgPSB7XG4gIC4uLmRlZmF1bHRQcm92aWRlck9wdGlvbnMsXG4gIGhvc3Q6IFwibm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnXCIsXG4gIHVzZXJBZ2VudDogXCJcIixcbn07XG5cbnR5cGUgTm9taW5hdGltR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2sgPSBHZW9jb2RlZFJlc3VsdHNDYWxsYmFjazxcbiAgTm9taW5hdGltR2VvY29kZWRcbj47XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vbWluYXRpbVByb3ZpZGVyXG4gIGltcGxlbWVudHMgUHJvdmlkZXJJbnRlcmZhY2U8Tm9taW5hdGltR2VvY29kZWQ+IHtcbiAgcHJpdmF0ZSBleHRlcm5hbExvYWRlcjogRXh0ZXJuYWxMb2FkZXJJbnRlcmZhY2U7XG5cbiAgcHJpdmF0ZSBvcHRpb25zOiBOb21pbmF0aW1Qcm92aWRlck9wdGlvbnNJbnRlcmZhY2U7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIF9leHRlcm5hbExvYWRlcjogRXh0ZXJuYWxMb2FkZXJJbnRlcmZhY2UsXG4gICAgb3B0aW9uczogTm9taW5hdGltUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlID0gZGVmYXVsdE5vbWluYXRpbVByb3ZpZGVyT3B0aW9uc1xuICApIHtcbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyID0gX2V4dGVybmFsTG9hZGVyO1xuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4uZGVmYXVsdE5vbWluYXRpbVByb3ZpZGVyT3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICAgIGlmIChcbiAgICAgIHRoaXMub3B0aW9ucy5ob3N0ID09PSBkZWZhdWx0Tm9taW5hdGltUHJvdmlkZXJPcHRpb25zLmhvc3QgJiZcbiAgICAgICF0aGlzLm9wdGlvbnMudXNlckFnZW50XG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBbiBVc2VyLUFnZW50IGlkZW50aWZ5aW5nIHlvdXIgYXBwbGljYXRpb24gaXMgcmVxdWlyZWQgZm9yIHRoZSBPcGVuU3RyZWV0TWFwIC8gTm9taW5hdGltIHByb3ZpZGVyIHdoZW4gdXNpbmcgdGhlIGRlZmF1bHQgaG9zdC4gUGxlYXNlIGFkZCBpdCBpbiB0aGUgXCJ1c2VyQWdlbnRcIiBvcHRpb24uJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2VvY29kZShcbiAgICBxdWVyeTogc3RyaW5nIHwgTm9taW5hdGltR2VvY29kZVF1ZXJ5IHwgTm9taW5hdGltR2VvY29kZVF1ZXJ5T2JqZWN0LFxuICAgIGNhbGxiYWNrOiBOb21pbmF0aW1HZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgICBlcnJvckNhbGxiYWNrPzogRXJyb3JDYWxsYmFja1xuICApOiB2b2lkIHtcbiAgICBjb25zdCBnZW9jb2RlUXVlcnkgPSBQcm92aWRlckhlbHBlcnMuZ2V0R2VvY29kZVF1ZXJ5RnJvbVBhcmFtZXRlcihcbiAgICAgIHF1ZXJ5LFxuICAgICAgTm9taW5hdGltR2VvY29kZVF1ZXJ5XG4gICAgKTtcblxuICAgIGlmIChnZW9jb2RlUXVlcnkuZ2V0SXAoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIlRoZSBPcGVuU3RyZWV0TWFwIC8gTm9taW5hdGltIHByb3ZpZGVyIGRvZXMgbm90IHN1cHBvcnQgSVAgZ2VvbG9jYXRpb24sIG9ubHkgbG9jYXRpb24gZ2VvY29kaW5nLlwiXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIuc2V0T3B0aW9ucyh7XG4gICAgICBwcm90b2NvbDogdGhpcy5vcHRpb25zLnVzZVNzbCA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiLFxuICAgICAgaG9zdDogdGhpcy5vcHRpb25zLmhvc3QsXG4gICAgICBwYXRobmFtZTogXCJzZWFyY2hcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IHBhcmFtczogTm9taW5hdGltUmVxdWVzdFBhcmFtcyA9IHRoaXMud2l0aENvbW1vblBhcmFtcyhcbiAgICAgIHtcbiAgICAgICAgcTogZ2VvY29kZVF1ZXJ5LmdldFRleHQoKSxcbiAgICAgICAgbGltaXQ6IGdlb2NvZGVRdWVyeS5nZXRMaW1pdCgpLnRvU3RyaW5nKCksXG4gICAgICAgIGNvdW50cnljb2RlczogKDxOb21pbmF0aW1HZW9jb2RlUXVlcnk+Z2VvY29kZVF1ZXJ5KS5nZXRDb3VudHJ5Q29kZXMoKVxuICAgICAgICAgID8gKDxOb21pbmF0aW1HZW9jb2RlUXVlcnk+Z2VvY29kZVF1ZXJ5KS5nZXRDb3VudHJ5Q29kZXMoKT8uam9pbihcIixcIilcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgZXhjbHVkZV9wbGFjZV9pZHM6ICg8Tm9taW5hdGltR2VvY29kZVF1ZXJ5PihcbiAgICAgICAgICBnZW9jb2RlUXVlcnlcbiAgICAgICAgKSkuZ2V0RXhjbHVkZVBsYWNlSWRzKClcbiAgICAgICAgICA/ICg8Tm9taW5hdGltR2VvY29kZVF1ZXJ5Pmdlb2NvZGVRdWVyeSlcbiAgICAgICAgICAgICAgLmdldEV4Y2x1ZGVQbGFjZUlkcygpXG4gICAgICAgICAgICAgID8uam9pbihcIixcIilcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgdmlld2JveDogKDxOb21pbmF0aW1HZW9jb2RlUXVlcnk+Z2VvY29kZVF1ZXJ5KS5nZXRWaWV3Qm94KClcbiAgICAgICAgICA/ICg8Tm9taW5hdGltR2VvY29kZVF1ZXJ5Pmdlb2NvZGVRdWVyeSkuZ2V0Vmlld0JveCgpPy5qb2luKFwiLFwiKVxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICBib3VuZGVkOiAoPE5vbWluYXRpbUdlb2NvZGVRdWVyeT5nZW9jb2RlUXVlcnkpLmdldEJvdW5kZWQoKVxuICAgICAgICAgID8gKDxOb21pbmF0aW1HZW9jb2RlUXVlcnk+Z2VvY29kZVF1ZXJ5KS5nZXRCb3VuZGVkKCk/LnRvU3RyaW5nKClcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgICA8Tm9taW5hdGltR2VvY29kZVF1ZXJ5Pmdlb2NvZGVRdWVyeVxuICAgICk7XG5cbiAgICB0aGlzLmV4ZWN1dGVSZXF1ZXN0KHBhcmFtcywgY2FsbGJhY2ssIHRoaXMuZ2V0SGVhZGVycygpLCB7fSwgZXJyb3JDYWxsYmFjayk7XG4gIH1cblxuICBwdWJsaWMgZ2VvZGVjb2RlKFxuICAgIGxhdGl0dWRlT3JRdWVyeTpcbiAgICAgIHwgbnVtYmVyXG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBOb21pbmF0aW1SZXZlcnNlUXVlcnlcbiAgICAgIHwgTm9taW5hdGltUmV2ZXJzZVF1ZXJ5T2JqZWN0LFxuICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2s6IG51bWJlciB8IHN0cmluZyB8IE5vbWluYXRpbUdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrPzogTm9taW5hdGltR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2sgfCBFcnJvckNhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHJldmVyc2VRdWVyeSA9IFByb3ZpZGVySGVscGVycy5nZXRSZXZlcnNlUXVlcnlGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxhdGl0dWRlT3JRdWVyeSxcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICBOb21pbmF0aW1SZXZlcnNlUXVlcnlcbiAgICApO1xuICAgIGNvbnN0IHJldmVyc2VDYWxsYmFjayA9IFByb3ZpZGVySGVscGVycy5nZXRDYWxsYmFja0Zyb21QYXJhbWV0ZXJzKFxuICAgICAgbG9uZ2l0dWRlT3JDYWxsYmFjayxcbiAgICAgIGNhbGxiYWNrT3JFcnJvckNhbGxiYWNrXG4gICAgKTtcbiAgICBjb25zdCByZXZlcnNlRXJyb3JDYWxsYmFjayA9IFByb3ZpZGVySGVscGVycy5nZXRFcnJvckNhbGxiYWNrRnJvbVBhcmFtZXRlcnMoXG4gICAgICBsb25naXR1ZGVPckNhbGxiYWNrLFxuICAgICAgY2FsbGJhY2tPckVycm9yQ2FsbGJhY2ssXG4gICAgICBlcnJvckNhbGxiYWNrXG4gICAgKTtcblxuICAgIHRoaXMuZXh0ZXJuYWxMb2FkZXIuc2V0T3B0aW9ucyh7XG4gICAgICBwcm90b2NvbDogdGhpcy5vcHRpb25zLnVzZVNzbCA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiLFxuICAgICAgaG9zdDogdGhpcy5vcHRpb25zLmhvc3QsXG4gICAgICBwYXRobmFtZTogXCJyZXZlcnNlXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXJhbXM6IE5vbWluYXRpbVJlcXVlc3RQYXJhbXMgPSB0aGlzLndpdGhDb21tb25QYXJhbXMoXG4gICAgICB7XG4gICAgICAgIGxhdDogcmV2ZXJzZVF1ZXJ5LmdldENvb3JkaW5hdGVzKCkubGF0aXR1ZGUudG9TdHJpbmcoKSxcbiAgICAgICAgbG9uOiByZXZlcnNlUXVlcnkuZ2V0Q29vcmRpbmF0ZXMoKS5sb25naXR1ZGUudG9TdHJpbmcoKSxcbiAgICAgICAgem9vbTpcbiAgICAgICAgICAoPE5vbWluYXRpbVJldmVyc2VRdWVyeT5yZXZlcnNlUXVlcnkpLmdldFpvb20oKT8udG9TdHJpbmcoKSB8fCBcIjE4XCIsXG4gICAgICB9LFxuICAgICAgPE5vbWluYXRpbVJldmVyc2VRdWVyeT5yZXZlcnNlUXVlcnlcbiAgICApO1xuXG4gICAgdGhpcy5leGVjdXRlUmVxdWVzdChcbiAgICAgIHBhcmFtcyxcbiAgICAgIHJldmVyc2VDYWxsYmFjayxcbiAgICAgIHRoaXMuZ2V0SGVhZGVycygpLFxuICAgICAge30sXG4gICAgICByZXZlcnNlRXJyb3JDYWxsYmFja1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHdpdGhDb21tb25QYXJhbXMoXG4gICAgcGFyYW1zOiBQYXJ0aWFsPE5vbWluYXRpbVJlcXVlc3RQYXJhbXM+LFxuICAgIHF1ZXJ5OiBOb21pbmF0aW1HZW9jb2RlUXVlcnkgfCBOb21pbmF0aW1SZXZlcnNlUXVlcnlcbiAgKTogTm9taW5hdGltUmVxdWVzdFBhcmFtcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnBhcmFtcyxcbiAgICAgIGZvcm1hdDogXCJqc29udjJcIixcbiAgICAgIGFkZHJlc3NkZXRhaWxzOiBcIjFcIixcbiAgICAgIGpzb25wQ2FsbGJhY2s6IHRoaXMub3B0aW9ucy51c2VKc29ucCA/IFwianNvbl9jYWxsYmFja1wiIDogdW5kZWZpbmVkLFxuICAgICAgXCJhY2NlcHQtbGFuZ3VhZ2VcIjogcXVlcnkuZ2V0TG9jYWxlKCksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SGVhZGVycygpOiBFeHRlcm5hbExvYWRlckhlYWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBcIlVzZXItQWdlbnRcIjogdGhpcy5vcHRpb25zLnVzZXJBZ2VudCB8fCBcIlwiLFxuICAgICAgUmVmZXJlcjogdGhpcy5vcHRpb25zLnJlZmVyZXIsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlUmVxdWVzdChcbiAgICBwYXJhbXM6IEV4dGVybmFsTG9hZGVyUGFyYW1zLFxuICAgIGNhbGxiYWNrOiBOb21pbmF0aW1HZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgICBoZWFkZXJzPzogRXh0ZXJuYWxMb2FkZXJIZWFkZXJzLFxuICAgIGJvZHk/OiBFeHRlcm5hbExvYWRlckJvZHksXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5leHRlcm5hbExvYWRlci5leGVjdXRlUmVxdWVzdChcbiAgICAgIHBhcmFtcyxcbiAgICAgIChkYXRhOiBOb21pbmF0aW1SZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGE7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgIGlmICgoPE5vbWluYXRpbUVycm9yUmVzcG9uc2U+ZGF0YSkuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBBbiBlcnJvciBoYXMgb2NjdXJyZWQ6ICR7XG4gICAgICAgICAgICAgICg8Tm9taW5hdGltRXJyb3JSZXNwb25zZT5kYXRhKS5lcnJvclxuICAgICAgICAgICAgfWA7XG4gICAgICAgICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKG5ldyBSZXNwb25zZUVycm9yKGVycm9yTWVzc2FnZSwgZGF0YSkpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0cyA9IFs8Tm9taW5hdGltUmVzdWx0PmRhdGFdO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICg8Tm9taW5hdGltUmVzdWx0W10+cmVzdWx0cykubWFwKChyZXN1bHQ6IE5vbWluYXRpbVJlc3VsdCkgPT5cbiAgICAgICAgICAgIE5vbWluYXRpbVByb3ZpZGVyLm1hcFRvR2VvY29kZWQocmVzdWx0KVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzLFxuICAgICAgYm9keSxcbiAgICAgIGVycm9yQ2FsbGJhY2tcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBtYXBUb0dlb2NvZGVkKHJlc3VsdDogTm9taW5hdGltUmVzdWx0KTogTm9taW5hdGltR2VvY29kZWQge1xuICAgIGNvbnN0IGxhdGl0dWRlID0gcGFyc2VGbG9hdChyZXN1bHQubGF0KTtcbiAgICBjb25zdCBsb25naXR1ZGUgPSBwYXJzZUZsb2F0KHJlc3VsdC5sb24pO1xuICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gcmVzdWx0LmRpc3BsYXlfbmFtZTtcbiAgICBjb25zdCBzdHJlZXROdW1iZXIgPSByZXN1bHQuYWRkcmVzcy5ob3VzZV9udW1iZXI7XG4gICAgY29uc3Qgc3RyZWV0TmFtZSA9IHJlc3VsdC5hZGRyZXNzLnJvYWQgfHwgcmVzdWx0LmFkZHJlc3MucGVkZXN0cmlhbjtcbiAgICBjb25zdCBzdWJMb2NhbGl0eSA9IHJlc3VsdC5hZGRyZXNzLnN1YnVyYjtcbiAgICBsZXQgbG9jYWxpdHk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gcmVzdWx0LmFkZHJlc3MucG9zdGNvZGVcbiAgICAgID8gcmVzdWx0LmFkZHJlc3MucG9zdGNvZGUuc3BsaXQoXCI7XCIpWzBdXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCByZWdpb24gPSByZXN1bHQuYWRkcmVzcy5zdGF0ZTtcbiAgICBjb25zdCB7IGNvdW50cnkgfSA9IHJlc3VsdC5hZGRyZXNzO1xuICAgIGNvbnN0IGNvdW50cnlDb2RlID0gcmVzdWx0LmFkZHJlc3MuY291bnRyeV9jb2RlO1xuICAgIGNvbnN0IG9zbUlkID0gcmVzdWx0Lm9zbV9pZDtcbiAgICBjb25zdCBvc21UeXBlID0gcmVzdWx0Lm9zbV90eXBlO1xuICAgIGNvbnN0IHsgY2F0ZWdvcnkgfSA9IHJlc3VsdDtcbiAgICBjb25zdCB7IHR5cGUgfSA9IHJlc3VsdDtcbiAgICBjb25zdCBhdHRyaWJ1dGlvbiA9IHJlc3VsdC5saWNlbmNlO1xuXG4gICAgY29uc3QgbG9jYWxpdHlUeXBlczogKFwiY2l0eVwiIHwgXCJ0b3duXCIgfCBcInZpbGxhZ2VcIiB8IFwiaGFtbGV0XCIpW10gPSBbXG4gICAgICBcImNpdHlcIixcbiAgICAgIFwidG93blwiLFxuICAgICAgXCJ2aWxsYWdlXCIsXG4gICAgICBcImhhbWxldFwiLFxuICAgIF07XG4gICAgbG9jYWxpdHlUeXBlcy5mb3JFYWNoKChsb2NhbGl0eVR5cGUpID0+IHtcbiAgICAgIGlmIChyZXN1bHQuYWRkcmVzc1tsb2NhbGl0eVR5cGVdICYmICFsb2NhbGl0eSkge1xuICAgICAgICBsb2NhbGl0eSA9IHJlc3VsdC5hZGRyZXNzW2xvY2FsaXR5VHlwZV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgZ2VvY29kZWQgPSBOb21pbmF0aW1HZW9jb2RlZC5jcmVhdGUoe1xuICAgICAgbGF0aXR1ZGUsXG4gICAgICBsb25naXR1ZGUsXG4gICAgICBkaXNwbGF5TmFtZSxcbiAgICAgIHN0cmVldE51bWJlcixcbiAgICAgIHN0cmVldE5hbWUsXG4gICAgICBzdWJMb2NhbGl0eSxcbiAgICAgIGxvY2FsaXR5LFxuICAgICAgcG9zdGFsQ29kZSxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGNvdW50cnksXG4gICAgICBjb3VudHJ5Q29kZSxcbiAgICAgIG9zbUlkLFxuICAgICAgb3NtVHlwZSxcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgdHlwZSxcbiAgICAgIGF0dHJpYnV0aW9uLFxuICAgIH0pO1xuXG4gICAgZ2VvY29kZWQgPSA8Tm9taW5hdGltR2VvY29kZWQ+KFxuICAgICAgZ2VvY29kZWQud2l0aEJvdW5kcyhcbiAgICAgICAgcGFyc2VGbG9hdChyZXN1bHQuYm91bmRpbmdib3hbMF0pLFxuICAgICAgICBwYXJzZUZsb2F0KHJlc3VsdC5ib3VuZGluZ2JveFsyXSksXG4gICAgICAgIHBhcnNlRmxvYXQocmVzdWx0LmJvdW5kaW5nYm94WzFdKSxcbiAgICAgICAgcGFyc2VGbG9hdChyZXN1bHQuYm91bmRpbmdib3hbM10pXG4gICAgICApXG4gICAgKTtcblxuICAgIGNvbnN0IGFkbWluTGV2ZWxzOiAoXCJzdGF0ZVwiIHwgXCJjb3VudHlcIilbXSA9IFtcInN0YXRlXCIsIFwiY291bnR5XCJdO1xuICAgIGFkbWluTGV2ZWxzLmZvckVhY2goKGFkbWluTGV2ZWwsIGxldmVsKSA9PiB7XG4gICAgICBpZiAocmVzdWx0LmFkZHJlc3NbYWRtaW5MZXZlbF0pIHtcbiAgICAgICAgZ2VvY29kZWQuYWRkQWRtaW5MZXZlbChcbiAgICAgICAgICBBZG1pbkxldmVsLmNyZWF0ZSh7XG4gICAgICAgICAgICBsZXZlbDogbGV2ZWwgKyAxLFxuICAgICAgICAgICAgbmFtZTogcmVzdWx0LmFkZHJlc3NbYWRtaW5MZXZlbF0gfHwgXCJcIixcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGdlb2NvZGVkO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZXZlcnNlUXVlcnksIFJldmVyc2VRdWVyeU9iamVjdCB9IGZyb20gXCJxdWVyeVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vbWluYXRpbVJldmVyc2VRdWVyeU9iamVjdCBleHRlbmRzIFJldmVyc2VRdWVyeU9iamVjdCB7XG4gIHJlYWRvbmx5IHpvb20/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vbWluYXRpbVJldmVyc2VRdWVyeSBleHRlbmRzIFJldmVyc2VRdWVyeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgem9vbT86IG51bWJlcjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioe1xuICAgIHpvb20sXG4gICAgLi4ucmV2ZXJzZVF1ZXJ5T2JqZWN0XG4gIH06IE5vbWluYXRpbVJldmVyc2VRdWVyeU9iamVjdCkge1xuICAgIHN1cGVyKHJldmVyc2VRdWVyeU9iamVjdCk7XG4gICAgdGhpcy56b29tID0gem9vbTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxuICAgIG9iamVjdDogTm9taW5hdGltUmV2ZXJzZVF1ZXJ5T2JqZWN0XG4gICk6IE5vbWluYXRpbVJldmVyc2VRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9PYmplY3QoKTogTm9taW5hdGltUmV2ZXJzZVF1ZXJ5T2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIudG9PYmplY3QoKSxcbiAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHdpdGhab29tKHpvb206IG51bWJlcik6IE5vbWluYXRpbVJldmVyc2VRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBOb21pbmF0aW1SZXZlcnNlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIHpvb20gfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Wm9vbSgpOiB1bmRlZmluZWQgfCBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnpvb207XG4gIH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgTm9taW5hdGltR2VvY29kZWQgfSBmcm9tIFwicHJvdmlkZXIvbm9taW5hdGltL05vbWluYXRpbUdlb2NvZGVkXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE9wZW5TdHJlZXRNYXBHZW9jb2RlZCB9IGZyb20gXCJwcm92aWRlci9ub21pbmF0aW0vTm9taW5hdGltR2VvY29kZWRcIjtcbmV4cG9ydCAqIGZyb20gXCJwcm92aWRlci9ub21pbmF0aW0vTm9taW5hdGltR2VvY29kZWRcIjtcbmV4cG9ydCB7IE5vbWluYXRpbUdlb2NvZGVkT2JqZWN0IGFzIE9wZW5TdHJlZXRNYXBHZW9jb2RlZE9iamVjdCB9IGZyb20gXCJwcm92aWRlci9ub21pbmF0aW0vTm9taW5hdGltR2VvY29kZWRcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTm9taW5hdGltR2VvY29kZVF1ZXJ5IH0gZnJvbSBcInByb3ZpZGVyL25vbWluYXRpbS9Ob21pbmF0aW1HZW9jb2RlUXVlcnlcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT3BlblN0cmVldE1hcEdlb2NvZGVRdWVyeSB9IGZyb20gXCJwcm92aWRlci9ub21pbmF0aW0vTm9taW5hdGltR2VvY29kZVF1ZXJ5XCI7XG5leHBvcnQgKiBmcm9tIFwicHJvdmlkZXIvbm9taW5hdGltL05vbWluYXRpbUdlb2NvZGVRdWVyeVwiO1xuZXhwb3J0IHsgTm9taW5hdGltR2VvY29kZVF1ZXJ5T2JqZWN0IGFzIE9wZW5TdHJlZXRNYXBHZW9jb2RlUXVlcnlPYmplY3QgfSBmcm9tIFwicHJvdmlkZXIvbm9taW5hdGltL05vbWluYXRpbUdlb2NvZGVRdWVyeVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOb21pbmF0aW1Qcm92aWRlciB9IGZyb20gXCJwcm92aWRlci9ub21pbmF0aW0vTm9taW5hdGltUHJvdmlkZXJcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT3BlblN0cmVldE1hcFByb3ZpZGVyIH0gZnJvbSBcInByb3ZpZGVyL25vbWluYXRpbS9Ob21pbmF0aW1Qcm92aWRlclwiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL25vbWluYXRpbS9Ob21pbmF0aW1Qcm92aWRlclwiO1xuZXhwb3J0IHtcbiAgTm9taW5hdGltUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlIGFzIE9wZW5TdHJlZXRNYXBQcm92aWRlck9wdGlvbnNJbnRlcmZhY2UsXG4gIE5vbWluYXRpbVJlc3VsdCBhcyBPcGVuU3RyZWV0TWFwUmVzdWx0LFxuICBkZWZhdWx0Tm9taW5hdGltUHJvdmlkZXJPcHRpb25zIGFzIGRlZmF1bHRPcGVuU3RyZWV0TWFwUHJvdmlkZXJPcHRpb25zLFxufSBmcm9tIFwicHJvdmlkZXIvbm9taW5hdGltL05vbWluYXRpbVByb3ZpZGVyXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5vbWluYXRpbVJldmVyc2VRdWVyeSB9IGZyb20gXCJwcm92aWRlci9ub21pbmF0aW0vTm9taW5hdGltUmV2ZXJzZVF1ZXJ5XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE9wZW5TdHJlZXRNYXBSZXZlcnNlUXVlcnkgfSBmcm9tIFwicHJvdmlkZXIvbm9taW5hdGltL05vbWluYXRpbVJldmVyc2VRdWVyeVwiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL25vbWluYXRpbS9Ob21pbmF0aW1SZXZlcnNlUXVlcnlcIjtcbmV4cG9ydCB7IE5vbWluYXRpbVJldmVyc2VRdWVyeU9iamVjdCBhcyBPcGVuU3RyZWV0TWFwUmV2ZXJzZVF1ZXJ5T2JqZWN0IH0gZnJvbSBcInByb3ZpZGVyL25vbWluYXRpbS9Ob21pbmF0aW1SZXZlcnNlUXVlcnlcIjtcbiIsImltcG9ydCB7IEdlb2NvZGVRdWVyeSwgR2VvY29kZVF1ZXJ5T2JqZWN0IH0gZnJvbSBcInF1ZXJ5XCI7XG5pbXBvcnQgeyBDb29yZGluYXRlcyB9IGZyb20gXCJpbmRleFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5DYWdlR2VvY29kZVF1ZXJ5T2JqZWN0IGV4dGVuZHMgR2VvY29kZVF1ZXJ5T2JqZWN0IHtcbiAgcmVhZG9ubHkgY291bnRyeUNvZGVzPzogc3RyaW5nW107XG4gIHJlYWRvbmx5IHByb3hpbWl0eT86IENvb3JkaW5hdGVzO1xuICByZWFkb25seSBtaW5Db25maWRlbmNlPzogbnVtYmVyO1xuICByZWFkb25seSBub1JlY29yZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wZW5DYWdlR2VvY29kZVF1ZXJ5IGV4dGVuZHMgR2VvY29kZVF1ZXJ5IHtcbiAgcHJpdmF0ZSByZWFkb25seSBjb3VudHJ5Q29kZXM/OiBzdHJpbmdbXTtcblxuICBwcml2YXRlIHJlYWRvbmx5IHByb3hpbWl0eT86IENvb3JkaW5hdGVzO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbWluQ29uZmlkZW5jZT86IG51bWJlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IG5vUmVjb3JkPzogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioe1xuICAgIGNvdW50cnlDb2RlcyxcbiAgICBwcm94aW1pdHksXG4gICAgbWluQ29uZmlkZW5jZSxcbiAgICBub1JlY29yZCxcbiAgICAuLi5nZW9jb2RlUXVlcnlPYmplY3RcbiAgfTogT3BlbkNhZ2VHZW9jb2RlUXVlcnlPYmplY3QpIHtcbiAgICBzdXBlcihnZW9jb2RlUXVlcnlPYmplY3QpO1xuICAgIHRoaXMuY291bnRyeUNvZGVzID0gY291bnRyeUNvZGVzO1xuICAgIHRoaXMucHJveGltaXR5ID0gcHJveGltaXR5O1xuICAgIGlmIChcbiAgICAgIG1pbkNvbmZpZGVuY2UgJiZcbiAgICAgIChtaW5Db25maWRlbmNlLnRvU3RyaW5nKCkgIT09XG4gICAgICAgIHBhcnNlSW50KG1pbkNvbmZpZGVuY2UudG9TdHJpbmcoKSwgMTApLnRvU3RyaW5nKCkgfHxcbiAgICAgICAgbWluQ29uZmlkZW5jZSA8IDEgfHxcbiAgICAgICAgbWluQ29uZmlkZW5jZSA+IDEwKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIFwibWluQ29uZmlkZW5jZVwiIHBhcmFtZXRlciBtdXN0IGJlIGFuIGludGVnZXIgZnJvbSAxIHRvIDEwLidcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMubWluQ29uZmlkZW5jZSA9IG1pbkNvbmZpZGVuY2U7XG4gICAgdGhpcy5ub1JlY29yZCA9IG5vUmVjb3JkO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUoXG4gICAgb2JqZWN0OiBPcGVuQ2FnZUdlb2NvZGVRdWVyeU9iamVjdFxuICApOiBPcGVuQ2FnZUdlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9PYmplY3QoKTogT3BlbkNhZ2VHZW9jb2RlUXVlcnlPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci50b09iamVjdCgpLFxuICAgICAgY291bnRyeUNvZGVzOiB0aGlzLmNvdW50cnlDb2RlcyxcbiAgICAgIHByb3hpbWl0eTogdGhpcy5wcm94aW1pdHksXG4gICAgICBtaW5Db25maWRlbmNlOiB0aGlzLm1pbkNvbmZpZGVuY2UsXG4gICAgICBub1JlY29yZDogdGhpcy5ub1JlY29yZCxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHdpdGhDb3VudHJ5Q29kZXMoY291bnRyeUNvZGVzOiBzdHJpbmdbXSk6IE9wZW5DYWdlR2VvY29kZVF1ZXJ5IHtcbiAgICByZXR1cm4gbmV3IE9wZW5DYWdlR2VvY29kZVF1ZXJ5KHsgLi4udGhpcy50b09iamVjdCgpLCBjb3VudHJ5Q29kZXMgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnRyeUNvZGVzKCk6IHVuZGVmaW5lZCB8IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudHJ5Q29kZXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aFByb3hpbWl0eShwcm94aW1pdHk6IENvb3JkaW5hdGVzKTogT3BlbkNhZ2VHZW9jb2RlUXVlcnkge1xuICAgIHJldHVybiBuZXcgT3BlbkNhZ2VHZW9jb2RlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIHByb3hpbWl0eSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcm94aW1pdHkoKTogdW5kZWZpbmVkIHwgQ29vcmRpbmF0ZXMge1xuICAgIHJldHVybiB0aGlzLnByb3hpbWl0eTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTWluQ29uZmlkZW5jZShtaW5Db25maWRlbmNlOiBudW1iZXIpOiBPcGVuQ2FnZUdlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBPcGVuQ2FnZUdlb2NvZGVRdWVyeSh7IC4uLnRoaXMudG9PYmplY3QoKSwgbWluQ29uZmlkZW5jZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNaW5Db25maWRlbmNlKCk6IHVuZGVmaW5lZCB8IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubWluQ29uZmlkZW5jZTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTm9SZWNvcmQobm9SZWNvcmQ6IGJvb2xlYW4pOiBPcGVuQ2FnZUdlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuIG5ldyBPcGVuQ2FnZUdlb2NvZGVRdWVyeSh7IC4uLnRoaXMudG9PYmplY3QoKSwgbm9SZWNvcmQgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm9SZWNvcmQoKTogdW5kZWZpbmVkIHwgYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9SZWNvcmQ7XG4gIH1cbn1cbiIsImltcG9ydCBHZW9jb2RlZCwgeyBHZW9jb2RlZE9iamVjdCB9IGZyb20gXCJHZW9jb2RlZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5DYWdlR2VvY29kZWRPYmplY3QgZXh0ZW5kcyBHZW9jb2RlZE9iamVjdCB7XG4gIHJlYWRvbmx5IGNhbGxpbmdDb2RlPzogbnVtYmVyO1xuICByZWFkb25seSBmbGFnPzogc3RyaW5nO1xuICByZWFkb25seSBtZ3JzPzogc3RyaW5nO1xuICByZWFkb25seSBtYWlkZW5oZWFkPzogc3RyaW5nO1xuICByZWFkb25seSBnZW9oYXNoPzogc3RyaW5nO1xuICByZWFkb25seSB3aGF0M3dvcmRzPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVuQ2FnZUdlb2NvZGVkIGV4dGVuZHMgR2VvY29kZWQge1xuICBwcml2YXRlIHJlYWRvbmx5IGNhbGxpbmdDb2RlPzogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZmxhZz86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IG1ncnM/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtYWlkZW5oZWFkPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZ2VvaGFzaD86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IHdoYXQzd29yZHM/OiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHtcbiAgICBjYWxsaW5nQ29kZSxcbiAgICBmbGFnLFxuICAgIG1ncnMsXG4gICAgbWFpZGVuaGVhZCxcbiAgICBnZW9oYXNoLFxuICAgIHdoYXQzd29yZHMsXG4gICAgLi4uZ2VvY29kZWRPYmplY3RcbiAgfTogT3BlbkNhZ2VHZW9jb2RlZE9iamVjdCkge1xuICAgIHN1cGVyKGdlb2NvZGVkT2JqZWN0KTtcbiAgICB0aGlzLmNhbGxpbmdDb2RlID0gY2FsbGluZ0NvZGU7XG4gICAgdGhpcy5mbGFnID0gZmxhZztcbiAgICB0aGlzLm1ncnMgPSBtZ3JzO1xuICAgIHRoaXMubWFpZGVuaGVhZCA9IG1haWRlbmhlYWQ7XG4gICAgdGhpcy5nZW9oYXNoID0gZ2VvaGFzaDtcbiAgICB0aGlzLndoYXQzd29yZHMgPSB3aGF0M3dvcmRzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUob2JqZWN0OiBPcGVuQ2FnZUdlb2NvZGVkT2JqZWN0KTogT3BlbkNhZ2VHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9PYmplY3QoKTogT3BlbkNhZ2VHZW9jb2RlZE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnRvT2JqZWN0KCksXG4gICAgICBjYWxsaW5nQ29kZTogdGhpcy5jYWxsaW5nQ29kZSxcbiAgICAgIGZsYWc6IHRoaXMuZmxhZyxcbiAgICAgIG1ncnM6IHRoaXMubWdycyxcbiAgICAgIG1haWRlbmhlYWQ6IHRoaXMubWFpZGVuaGVhZCxcbiAgICAgIGdlb2hhc2g6IHRoaXMuZ2VvaGFzaCxcbiAgICAgIHdoYXQzd29yZHM6IHRoaXMud2hhdDN3b3JkcyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHdpdGhDYWxsaW5nQ29kZShjYWxsaW5nQ29kZTogbnVtYmVyKTogT3BlbkNhZ2VHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBPcGVuQ2FnZUdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGNhbGxpbmdDb2RlLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldENhbGxpbmdDb2RlKCk6IHVuZGVmaW5lZCB8IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGluZ0NvZGU7XG4gIH1cblxuICBwdWJsaWMgd2l0aEZsYWcoZmxhZzogc3RyaW5nKTogT3BlbkNhZ2VHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBPcGVuQ2FnZUdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGZsYWcsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmxhZygpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmZsYWc7XG4gIH1cblxuICBwdWJsaWMgd2l0aE1ncnMobWdyczogc3RyaW5nKTogT3BlbkNhZ2VHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBPcGVuQ2FnZUdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIG1ncnMsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWdycygpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1ncnM7XG4gIH1cblxuICBwdWJsaWMgd2l0aE1haWRlbmhlYWQobWFpZGVuaGVhZDogc3RyaW5nKTogT3BlbkNhZ2VHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBPcGVuQ2FnZUdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIG1haWRlbmhlYWQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWFpZGVuaGVhZCgpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1haWRlbmhlYWQ7XG4gIH1cblxuICBwdWJsaWMgd2l0aEdlb2hhc2goZ2VvaGFzaDogc3RyaW5nKTogT3BlbkNhZ2VHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBPcGVuQ2FnZUdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGdlb2hhc2gsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0R2VvaGFzaCgpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdlb2hhc2g7XG4gIH1cblxuICBwdWJsaWMgd2l0aFdoYXQzd29yZHMod2hhdDN3b3Jkczogc3RyaW5nKTogT3BlbkNhZ2VHZW9jb2RlZCB7XG4gICAgcmV0dXJuIG5ldyBPcGVuQ2FnZUdlb2NvZGVkKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIHdoYXQzd29yZHMsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0V2hhdDN3b3JkcygpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLndoYXQzd29yZHM7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEV4dGVybmFsTG9hZGVyQm9keSxcbiAgRXh0ZXJuYWxMb2FkZXJIZWFkZXJzLFxuICBFeHRlcm5hbExvYWRlckludGVyZmFjZSxcbiAgRXh0ZXJuYWxMb2FkZXJQYXJhbXMsXG59IGZyb20gXCJFeHRlcm5hbExvYWRlclwiO1xuaW1wb3J0IHtcbiAgRXJyb3JDYWxsYmFjayxcbiAgR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gIE9wZW5DYWdlR2VvY29kZWQsXG4gIE9wZW5DYWdlR2VvY29kZVF1ZXJ5LFxuICBPcGVuQ2FnZUdlb2NvZGVRdWVyeU9iamVjdCxcbiAgT3BlbkNhZ2VSZXZlcnNlUXVlcnksXG4gIE9wZW5DYWdlUmV2ZXJzZVF1ZXJ5T2JqZWN0LFxuICBQcm92aWRlckhlbHBlcnMsXG4gIFByb3ZpZGVySW50ZXJmYWNlLFxuICBQcm92aWRlck9wdGlvbnNJbnRlcmZhY2UsXG4gIGRlZmF1bHRQcm92aWRlck9wdGlvbnMsXG59IGZyb20gXCJwcm92aWRlclwiO1xuaW1wb3J0IEFkbWluTGV2ZWwgZnJvbSBcIkFkbWluTGV2ZWxcIjtcbmltcG9ydCB7IFJlc3BvbnNlRXJyb3IgfSBmcm9tIFwiZXJyb3JcIjtcblxuaW50ZXJmYWNlIE9wZW5DYWdlUmVxdWVzdFBhcmFtcyB7XG4gIFtwYXJhbTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICByZWFkb25seSBrZXk6IHN0cmluZztcbiAgcmVhZG9ubHkgcTogc3RyaW5nO1xuICByZWFkb25seSBjb3VudHJ5Y29kZT86IHN0cmluZztcbiAgcmVhZG9ubHkgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxpbWl0Pzogc3RyaW5nO1xuICByZWFkb25seSBib3VuZHM/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHByb3hpbWl0eT86IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICByZWFkb25seSBtaW5fY29uZmlkZW5jZT86IHN0cmluZztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICByZWFkb25seSBub19yZWNvcmQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGpzb25wQ2FsbGJhY2s/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBPcGVuQ2FnZUNvb3JkaW5hdGVzIHtcbiAgbGF0OiBudW1iZXI7XG4gIGxuZzogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgT3BlbkNhZ2VTdW4ge1xuICBhcHBhcmVudDogbnVtYmVyO1xuICBhc3Ryb25vbWljYWw6IG51bWJlcjtcbiAgY2l2aWw6IG51bWJlcjtcbiAgbmF1dGljYWw6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuQ2FnZVJlc3BvbnNlIHtcbiAgZG9jdW1lbnRhdGlvbjogc3RyaW5nO1xuICBsaWNlbmNlczoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgfVtdO1xuICByYXRlOiB7XG4gICAgbGltaXQ6IG51bWJlcjtcbiAgICByZW1haW5pbmc6IG51bWJlcjtcbiAgICByZXNldDogbnVtYmVyO1xuICB9O1xuICByZXN1bHRzOiBPcGVuQ2FnZVJlc3VsdFtdO1xuICBzdGF0dXM6IHtcbiAgICBjb2RlOiAyMDAgfCA0MDAgfCA0MDEgfCA0MDIgfCA0MDMgfCA0MDQgfCA0MDUgfCA0MDggfCA0MTAgfCA0MjkgfCA1MDM7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHN0YXlfaW5mb3JtZWQ6IHtcbiAgICBibG9nOiBzdHJpbmc7XG4gICAgdHdpdHRlcjogc3RyaW5nO1xuICB9O1xuICB0aGFua3M6IHN0cmluZztcbiAgdGltZXN0YW1wOiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGNyZWF0ZWRfaHR0cDogc3RyaW5nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBjcmVhdGVkX3VuaXg6IG51bWJlcjtcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICB0b3RhbF9yZXN1bHRzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbkNhZ2VSZXN1bHQge1xuICBhbm5vdGF0aW9uczoge1xuICAgIGNhbGxpbmdjb2RlOiBudW1iZXI7XG4gICAgY3VycmVuY3k6IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgIGFsdGVybmF0ZV9zeW1ib2xzOiBzdHJpbmdbXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgIGRlY2ltYWxfbWFyazogc3RyaW5nO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgZGlzYW1iaWd1YXRlX3N5bWJvbD86IHN0cmluZztcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgIGh0bWxfZW50aXR5OiBzdHJpbmc7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgICBpc29fY29kZTogc3RyaW5nO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgaXNvX251bWVyaWM6IHN0cmluZztcbiAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgIHNtYWxsZXN0X2Rlbm9taW5hdGlvbjogbnVtYmVyO1xuICAgICAgc3VidW5pdDogc3RyaW5nO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgc3VidW5pdF90b191bml0OiBudW1iZXI7XG4gICAgICBzeW1ib2w6IHN0cmluZztcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgIHN5bWJvbF9maXJzdDogbnVtYmVyO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgdGhvdXNhbmRzX3NlcGFyYXRvcjogc3RyaW5nO1xuICAgIH07XG4gICAgRE1TOiB7XG4gICAgICBsYXQ6IHN0cmluZztcbiAgICAgIGxuZzogc3RyaW5nO1xuICAgIH07XG4gICAgRklQUz86IHtcbiAgICAgIHN0YXRlPzogc3RyaW5nO1xuICAgICAgY291bnR5Pzogc3RyaW5nO1xuICAgIH07XG4gICAgZmxhZzogc3RyaW5nO1xuICAgIGdlb2hhc2g/OiBzdHJpbmc7XG4gICAgSVRNPzoge1xuICAgICAgZWFzdGluZzogc3RyaW5nO1xuICAgICAgbm9ydGhpbmc6IHN0cmluZztcbiAgICB9O1xuICAgIE1haWRlbmhlYWQ/OiBzdHJpbmc7XG4gICAgTWVyY2F0b3I6IHtcbiAgICAgIHg6IG51bWJlcjtcbiAgICAgIHk6IG51bWJlcjtcbiAgICB9O1xuICAgIE1HUlM/OiBzdHJpbmc7XG4gICAgT1NNOiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgICBlZGl0X3VybD86IHN0cmluZztcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgIG5vdGVfdXJsOiBzdHJpbmc7XG4gICAgICB1cmw6IHN0cmluZztcbiAgICB9O1xuICAgIHFpYmxhOiBudW1iZXI7XG4gICAgcm9hZGluZm86IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgIGRyaXZlX29uOiBcImxlZnRcIiB8IFwicmlnaHRcIjtcbiAgICAgIHJvYWQ/OiBzdHJpbmc7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgICByb2FkX3R5cGU/OiBzdHJpbmc7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgICByb2FkX3JlZmVyZW5jZT86IHN0cmluZztcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgIHJvYWRfcmVmZXJlbmNlX2ludGw/OiBzdHJpbmc7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgICBzcGVlZF9pbjogXCJrbS9oXCIgfCBcIm1waFwiO1xuICAgIH07XG4gICAgc3VuOiB7XG4gICAgICByaXNlOiBPcGVuQ2FnZVN1bjtcbiAgICAgIHNldDogT3BlbkNhZ2VTdW47XG4gICAgfTtcbiAgICB0aW1lem9uZToge1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgbm93X2luX2RzdDogbnVtYmVyO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgb2Zmc2V0X3NlYzogbnVtYmVyO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgb2Zmc2V0X3N0cmluZzogc3RyaW5nO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgc2hvcnRfbmFtZTogc3RyaW5nO1xuICAgIH07XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIFVOX000OToge1xuICAgICAgcmVnaW9uczoge1xuICAgICAgICBbcmVnaW9uOiBzdHJpbmddOiBzdHJpbmc7XG4gICAgICB9O1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgc3RhdGlzdGljYWxfZ3JvdXBpbmdzOiAoXCJMRENcIiB8IFwiTEVEQ1wiIHwgXCJMTERDXCIgfCBcIk1FRENcIiB8IFwiU0lEU1wiKVtdO1xuICAgIH07XG4gICAgd2hhdDN3b3Jkcz86IHtcbiAgICAgIHdvcmRzOiBzdHJpbmc7XG4gICAgfTtcbiAgICB3aWtpZGF0YT86IHN0cmluZztcbiAgfTtcbiAgYm91bmRzOiB7XG4gICAgbm9ydGhlYXN0OiBPcGVuQ2FnZUNvb3JkaW5hdGVzO1xuICAgIHNvdXRod2VzdDogT3BlbkNhZ2VDb29yZGluYXRlcztcbiAgfTtcbiAgY29tcG9uZW50czoge1xuICAgIFwiSVNPXzMxNjYtMV9hbHBoYS0yXCI/OiBzdHJpbmc7XG4gICAgXCJJU09fMzE2Ni0xX2FscGhhLTNcIj86IHN0cmluZztcbiAgICBfY2F0ZWdvcnk6XG4gICAgICB8IFwiYWdyaWN1bHR1cmVcIlxuICAgICAgfCBcImJ1aWxkaW5nXCJcbiAgICAgIHwgXCJjYXN0bGVcIlxuICAgICAgfCBcImNvbW1lcmNlXCJcbiAgICAgIHwgXCJjb25zdHJ1Y3Rpb25cIlxuICAgICAgfCBcImVkdWNhdGlvblwiXG4gICAgICB8IFwiZmluYW5jaWFsXCJcbiAgICAgIHwgXCJnb3Zlcm5tZW50XCJcbiAgICAgIHwgXCJoZWFsdGhcIlxuICAgICAgfCBcImluZHVzdHJpYWxcIlxuICAgICAgfCBcIm1pbGl0YXJ5XCJcbiAgICAgIHwgXCJuYXR1cmFsL3dhdGVyXCJcbiAgICAgIHwgXCJvdXRkb29ycy9yZWNyZWF0aW9uXCJcbiAgICAgIHwgXCJwbGFjZVwiXG4gICAgICB8IFwicGxhY2Vfb2Zfd29yc2hpcFwiXG4gICAgICB8IFwicG9zdGNvZGVcIlxuICAgICAgfCBcInJvYWRcIlxuICAgICAgfCBcInNvY2lhbFwiXG4gICAgICB8IFwidHJhbnNwb3J0YXRpb25cIlxuICAgICAgfCBcInRyYXZlbC90b3VyaXNtXCJcbiAgICAgIHwgXCJ1bmtub3duXCI7XG4gICAgX3R5cGU6IHN0cmluZztcbiAgICBjYXN0bGU/OiBzdHJpbmc7XG4gICAgY2l0eT86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgY2l0eV9kaXN0cmljdD86IHN0cmluZztcbiAgICBjb250aW5lbnQ/OlxuICAgICAgfCBcIkFmcmljYVwiXG4gICAgICB8IFwiQW50YXJjdGljYVwiXG4gICAgICB8IFwiQXNpYVwiXG4gICAgICB8IFwiRXVyb3BlXCJcbiAgICAgIHwgXCJPY2VhbmlhXCJcbiAgICAgIHwgXCJOb3J0aCBBbWVyaWNhXCJcbiAgICAgIHwgXCJTb3V0aCBBbWVyaWNhXCI7XG4gICAgY291bnRyeT86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgY291bnRyeV9jb2RlPzogc3RyaW5nO1xuICAgIGNvdW50eT86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgY291bnR5X2NvZGU/OiBzdHJpbmc7XG4gICAgY3JvZnQ/OiBzdHJpbmc7XG4gICAgZGlzdHJpY3Q/OiBzdHJpbmc7XG4gICAgZm9vdHdheT86IHN0cmluZztcbiAgICBoYW1sZXQ/OiBzdHJpbmc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGhvdXNlX251bWJlcj86IHN0cmluZztcbiAgICBob3VzZXM/OiBzdHJpbmc7XG4gICAgbG9jYWxpdHk/OiBzdHJpbmc7XG4gICAgbXVuaWNpcGFsaXR5Pzogc3RyaW5nO1xuICAgIG5laWdoYm91cmhvb2Q/OiBzdHJpbmc7XG4gICAgcGF0aD86IHN0cmluZztcbiAgICBwZWRlc3RyaWFuPzogc3RyaW5nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBwb2xpdGljYWxfdW5pb24/OiBzdHJpbmc7XG4gICAgcG9zdGNvZGU/OiBzdHJpbmc7XG4gICAgcXVhcnRlcj86IHN0cmluZztcbiAgICByZXNpZGVudGlhbD86IHN0cmluZztcbiAgICByb2FkPzogc3RyaW5nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICByb2FkX3JlZmVyZW5jZT86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgcm9hZF9yZWZlcmVuY2VfaW50bD86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgcm9hZF90eXBlPzogc3RyaW5nO1xuICAgIHN0YXRlPzogc3RyaW5nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBzdGF0ZV9jb2RlPzogc3RyaW5nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBzdGF0ZV9kaXN0cmljdD86IHN0cmluZztcbiAgICBzdHJlZXQ/OiBzdHJpbmc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIHN0cmVldF9uYW1lPzogc3RyaW5nO1xuICAgIHN1YmRpdmlzaW9uPzogc3RyaW5nO1xuICAgIHN1YnVyYj86IHN0cmluZztcbiAgICB0b3duPzogc3RyaW5nO1xuICAgIHZpbGxhZ2U/OiBzdHJpbmc7XG4gIH07XG4gIGNvbmZpZGVuY2U6IG51bWJlcjtcbiAgZm9ybWF0dGVkOiBzdHJpbmc7XG4gIGdlb21ldHJ5OiBPcGVuQ2FnZUNvb3JkaW5hdGVzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5DYWdlUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlXG4gIGV4dGVuZHMgUHJvdmlkZXJPcHRpb25zSW50ZXJmYWNlIHtcbiAgcmVhZG9ubHkgYXBpS2V5OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNvdW50cnlDb2Rlcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wZW5DYWdlUHJvdmlkZXJPcHRpb25zID0ge1xuICAuLi5kZWZhdWx0UHJvdmlkZXJPcHRpb25zLFxuICBhcGlLZXk6IFwiXCIsXG59O1xuXG50eXBlIE9wZW5DYWdlR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2sgPSBHZW9jb2RlZFJlc3VsdHNDYWxsYmFjazxcbiAgT3BlbkNhZ2VHZW9jb2RlZFxuPjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3BlbkNhZ2VQcm92aWRlclxuICBpbXBsZW1lbnRzIFByb3ZpZGVySW50ZXJmYWNlPE9wZW5DYWdlR2VvY29kZWQ+IHtcbiAgcHJpdmF0ZSBleHRlcm5hbExvYWRlcjogRXh0ZXJuYWxMb2FkZXJJbnRlcmZhY2U7XG5cbiAgcHJpdmF0ZSBvcHRpb25zOiBPcGVuQ2FnZVByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgX2V4dGVybmFsTG9hZGVyOiBFeHRlcm5hbExvYWRlckludGVyZmFjZSxcbiAgICBvcHRpb25zOiBPcGVuQ2FnZVByb3ZpZGVyT3B0aW9uc0ludGVyZmFjZSA9IGRlZmF1bHRPcGVuQ2FnZVByb3ZpZGVyT3B0aW9uc1xuICApIHtcbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyID0gX2V4dGVybmFsTG9hZGVyO1xuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4uZGVmYXVsdE9wZW5DYWdlUHJvdmlkZXJPcHRpb25zLCAuLi5vcHRpb25zIH07XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYXBpS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBbiBBUEkga2V5IGlzIHJlcXVpcmVkIGZvciB0aGUgT3BlbkNhZ2UgcHJvdmlkZXIuIFBsZWFzZSBhZGQgaXQgaW4gdGhlIFwiYXBpS2V5XCIgb3B0aW9uLidcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdlb2NvZGUoXG4gICAgcXVlcnk6IHN0cmluZyB8IE9wZW5DYWdlR2VvY29kZVF1ZXJ5IHwgT3BlbkNhZ2VHZW9jb2RlUXVlcnlPYmplY3QsXG4gICAgY2FsbGJhY2s6IE9wZW5DYWdlR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2ssXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZ2VvY29kZVF1ZXJ5ID0gUHJvdmlkZXJIZWxwZXJzLmdldEdlb2NvZGVRdWVyeUZyb21QYXJhbWV0ZXIoXG4gICAgICBxdWVyeSxcbiAgICAgIE9wZW5DYWdlR2VvY29kZVF1ZXJ5XG4gICAgKTtcblxuICAgIGlmIChnZW9jb2RlUXVlcnkuZ2V0SXAoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIlRoZSBPcGVuQ2FnZSBwcm92aWRlciBkb2VzIG5vdCBzdXBwb3J0IElQIGdlb2xvY2F0aW9uLCBvbmx5IGxvY2F0aW9uIGdlb2NvZGluZy5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLnNldE9wdGlvbnMoe1xuICAgICAgcHJvdG9jb2w6IHRoaXMub3B0aW9ucy51c2VTc2wgPyBcImh0dHBzXCIgOiBcImh0dHBcIixcbiAgICAgIGhvc3Q6IFwiYXBpLm9wZW5jYWdlZGF0YS5jb21cIixcbiAgICAgIHBhdGhuYW1lOiBcImdlb2NvZGUvdjEvanNvblwiLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFyYW1zOiBPcGVuQ2FnZVJlcXVlc3RQYXJhbXMgPSB0aGlzLndpdGhDb21tb25QYXJhbXMoXG4gICAgICB7XG4gICAgICAgIHE6IGdlb2NvZGVRdWVyeS5nZXRUZXh0KCkgfHwgXCJcIixcbiAgICAgICAgYm91bmRzOiBnZW9jb2RlUXVlcnkuZ2V0Qm91bmRzKClcbiAgICAgICAgICA/IGAke2dlb2NvZGVRdWVyeS5nZXRCb3VuZHMoKT8ud2VzdH0sJHtcbiAgICAgICAgICAgICAgZ2VvY29kZVF1ZXJ5LmdldEJvdW5kcygpPy5zb3V0aFxuICAgICAgICAgICAgfSwke2dlb2NvZGVRdWVyeS5nZXRCb3VuZHMoKT8uZWFzdH0sJHtcbiAgICAgICAgICAgICAgZ2VvY29kZVF1ZXJ5LmdldEJvdW5kcygpPy5ub3J0aFxuICAgICAgICAgICAgfWBcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgcHJveGltaXR5OiAoPE9wZW5DYWdlR2VvY29kZVF1ZXJ5Pmdlb2NvZGVRdWVyeSkuZ2V0UHJveGltaXR5KClcbiAgICAgICAgICA/IGAkeyg8T3BlbkNhZ2VHZW9jb2RlUXVlcnk+Z2VvY29kZVF1ZXJ5KS5nZXRQcm94aW1pdHkoKT8ubGF0aXR1ZGV9LCR7XG4gICAgICAgICAgICAgICg8T3BlbkNhZ2VHZW9jb2RlUXVlcnk+Z2VvY29kZVF1ZXJ5KS5nZXRQcm94aW1pdHkoKT8ubG9uZ2l0dWRlXG4gICAgICAgICAgICB9YFxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgfSxcbiAgICAgIDxPcGVuQ2FnZUdlb2NvZGVRdWVyeT5nZW9jb2RlUXVlcnlcbiAgICApO1xuXG4gICAgdGhpcy5leGVjdXRlUmVxdWVzdChwYXJhbXMsIGNhbGxiYWNrLCB7fSwge30sIGVycm9yQ2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGljIGdlb2RlY29kZShcbiAgICBsYXRpdHVkZU9yUXVlcnk6XG4gICAgICB8IG51bWJlclxuICAgICAgfCBzdHJpbmdcbiAgICAgIHwgT3BlbkNhZ2VSZXZlcnNlUXVlcnlcbiAgICAgIHwgT3BlbkNhZ2VSZXZlcnNlUXVlcnlPYmplY3QsXG4gICAgbG9uZ2l0dWRlT3JDYWxsYmFjazogbnVtYmVyIHwgc3RyaW5nIHwgT3BlbkNhZ2VHZW9jb2RlZFJlc3VsdHNDYWxsYmFjayxcbiAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFjaz86IE9wZW5DYWdlR2VvY29kZWRSZXN1bHRzQ2FsbGJhY2sgfCBFcnJvckNhbGxiYWNrLFxuICAgIGVycm9yQ2FsbGJhY2s/OiBFcnJvckNhbGxiYWNrXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHJldmVyc2VRdWVyeSA9IFByb3ZpZGVySGVscGVycy5nZXRSZXZlcnNlUXVlcnlGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxhdGl0dWRlT3JRdWVyeSxcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICBPcGVuQ2FnZVJldmVyc2VRdWVyeVxuICAgICk7XG4gICAgY29uc3QgcmV2ZXJzZUNhbGxiYWNrID0gUHJvdmlkZXJIZWxwZXJzLmdldENhbGxiYWNrRnJvbVBhcmFtZXRlcnMoXG4gICAgICBsb25naXR1ZGVPckNhbGxiYWNrLFxuICAgICAgY2FsbGJhY2tPckVycm9yQ2FsbGJhY2tcbiAgICApO1xuICAgIGNvbnN0IHJldmVyc2VFcnJvckNhbGxiYWNrID0gUHJvdmlkZXJIZWxwZXJzLmdldEVycm9yQ2FsbGJhY2tGcm9tUGFyYW1ldGVycyhcbiAgICAgIGxvbmdpdHVkZU9yQ2FsbGJhY2ssXG4gICAgICBjYWxsYmFja09yRXJyb3JDYWxsYmFjayxcbiAgICAgIGVycm9yQ2FsbGJhY2tcbiAgICApO1xuXG4gICAgdGhpcy5leHRlcm5hbExvYWRlci5zZXRPcHRpb25zKHtcbiAgICAgIHByb3RvY29sOiB0aGlzLm9wdGlvbnMudXNlU3NsID8gXCJodHRwc1wiIDogXCJodHRwXCIsXG4gICAgICBob3N0OiBcImFwaS5vcGVuY2FnZWRhdGEuY29tXCIsXG4gICAgICBwYXRobmFtZTogXCJnZW9jb2RlL3YxL2pzb25cIixcbiAgICB9KTtcblxuICAgIGNvbnN0IHBhcmFtczogT3BlbkNhZ2VSZXF1ZXN0UGFyYW1zID0gdGhpcy53aXRoQ29tbW9uUGFyYW1zKFxuICAgICAge1xuICAgICAgICBxOiBgJHtyZXZlcnNlUXVlcnkuZ2V0Q29vcmRpbmF0ZXMoKS5sYXRpdHVkZX0sJHtcbiAgICAgICAgICByZXZlcnNlUXVlcnkuZ2V0Q29vcmRpbmF0ZXMoKS5sb25naXR1ZGVcbiAgICAgICAgfWAsXG4gICAgICB9LFxuICAgICAgPE9wZW5DYWdlUmV2ZXJzZVF1ZXJ5PnJldmVyc2VRdWVyeVxuICAgICk7XG5cbiAgICB0aGlzLmV4ZWN1dGVSZXF1ZXN0KHBhcmFtcywgcmV2ZXJzZUNhbGxiYWNrLCB7fSwge30sIHJldmVyc2VFcnJvckNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgd2l0aENvbW1vblBhcmFtcyhcbiAgICBwYXJhbXM6IFBpY2s8T3BlbkNhZ2VSZXF1ZXN0UGFyYW1zLCBcInFcIiB8IFwiYm91bmRzXCIgfCBcInByb3hpbWl0eVwiPixcbiAgICBxdWVyeTogT3BlbkNhZ2VHZW9jb2RlUXVlcnkgfCBPcGVuQ2FnZVJldmVyc2VRdWVyeVxuICApOiBPcGVuQ2FnZVJlcXVlc3RQYXJhbXMge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5wYXJhbXMsXG4gICAgICBrZXk6IHRoaXMub3B0aW9ucy5hcGlLZXkgfHwgXCJcIixcbiAgICAgIGNvdW50cnljb2RlOiBxdWVyeS5nZXRDb3VudHJ5Q29kZXMoKVxuICAgICAgICA/IHF1ZXJ5LmdldENvdW50cnlDb2RlcygpPy5qb2luKFwiLFwiKVxuICAgICAgICA6IHRoaXMub3B0aW9ucy5jb3VudHJ5Q29kZXM/LmpvaW4oXCIsXCIpLFxuICAgICAgbGFuZ3VhZ2U6IHF1ZXJ5LmdldExvY2FsZSgpLFxuICAgICAgbGltaXQ6IHF1ZXJ5LmdldExpbWl0KCkudG9TdHJpbmcoKSxcbiAgICAgIG1pbl9jb25maWRlbmNlOiBxdWVyeS5nZXRNaW5Db25maWRlbmNlKCk/LnRvU3RyaW5nKCksXG4gICAgICBub19yZWNvcmQ6IHF1ZXJ5LmdldE5vUmVjb3JkKCk/LnRvU3RyaW5nKCksXG4gICAgICBqc29ucENhbGxiYWNrOiB0aGlzLm9wdGlvbnMudXNlSnNvbnAgPyBcImpzb25wXCIgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlUmVxdWVzdChcbiAgICBwYXJhbXM6IEV4dGVybmFsTG9hZGVyUGFyYW1zLFxuICAgIGNhbGxiYWNrOiBPcGVuQ2FnZUdlb2NvZGVkUmVzdWx0c0NhbGxiYWNrLFxuICAgIGhlYWRlcnM/OiBFeHRlcm5hbExvYWRlckhlYWRlcnMsXG4gICAgYm9keT86IEV4dGVybmFsTG9hZGVyQm9keSxcbiAgICBlcnJvckNhbGxiYWNrPzogRXJyb3JDYWxsYmFja1xuICApOiB2b2lkIHtcbiAgICB0aGlzLmV4dGVybmFsTG9hZGVyLmV4ZWN1dGVSZXF1ZXN0KFxuICAgICAgcGFyYW1zLFxuICAgICAgKGRhdGE6IE9wZW5DYWdlUmVzcG9uc2UpID0+IHtcbiAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgZGF0YS5yZXN1bHRzLm1hcCgocmVzdWx0OiBPcGVuQ2FnZVJlc3VsdCkgPT5cbiAgICAgICAgICAgIE9wZW5DYWdlUHJvdmlkZXIubWFwVG9HZW9jb2RlZChyZXN1bHQpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICBib2R5LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gPFJlc3BvbnNlPmVycm9yLmdldFJlc3BvbnNlKCk7XG4gICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhOiBPcGVuQ2FnZVJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdHVzKSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEuc3RhdHVzLmNvZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSA0MDA6XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gYEludmFsaWQgcmVxdWVzdCAoNDAwKTogJHtkYXRhLnN0YXR1cy5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBVbmFibGUgdG8gYXV0aGVudGljYXRlICg0MDEpOiAke2RhdGEuc3RhdHVzLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0MDI6XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gYFF1b3RhIGV4Y2VlZGVkICg0MDIpOiAke2RhdGEuc3RhdHVzLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gYEZvcmJpZGRlbiAoNDAzKTogJHtkYXRhLnN0YXR1cy5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDA0OlxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBJbnZhbGlkIEFQSSBlbmRwb2ludCAoNDA0KTogJHtkYXRhLnN0YXR1cy5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDA1OlxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBNZXRob2Qgbm90IGFsbG93ZWQgKDQwNSk6ICR7ZGF0YS5zdGF0dXMubWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQwODpcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBgVGltZW91dCAoNDA4KTogJHtkYXRhLnN0YXR1cy5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDEwOlxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBSZXF1ZXN0IHRvbyBsb25nICg0MTApOiAke2RhdGEuc3RhdHVzLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0Mjk6XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gYFRvbyBtYW55IHJlcXVlc3RzICg0MjkpOiAke2RhdGEuc3RhdHVzLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA1MDM6XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gYEludGVybmFsIHNlcnZlciBlcnJvciAoNTAzKTogJHtkYXRhLnN0YXR1cy5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gYEVycm9yICgke2RhdGEuc3RhdHVzLmNvZGV9KTogJHtkYXRhLnN0YXR1cy5tZXNzYWdlfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKG5ldyBSZXNwb25zZUVycm9yKGVycm9yTWVzc2FnZSwgZGF0YSkpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG1hcFRvR2VvY29kZWQocmVzdWx0OiBPcGVuQ2FnZVJlc3VsdCk6IE9wZW5DYWdlR2VvY29kZWQge1xuICAgIGNvbnN0IGxhdGl0dWRlID0gcmVzdWx0Lmdlb21ldHJ5LmxhdDtcbiAgICBjb25zdCBsb25naXR1ZGUgPSByZXN1bHQuZ2VvbWV0cnkubG5nO1xuICAgIGNvbnN0IGZvcm1hdHRlZEFkZHJlc3MgPSByZXN1bHQuZm9ybWF0dGVkO1xuICAgIGNvbnN0IHN0cmVldE51bWJlciA9IHJlc3VsdC5jb21wb25lbnRzLmhvdXNlX251bWJlcjtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gcmVzdWx0LmNvbXBvbmVudHMucG9zdGNvZGU7XG4gICAgY29uc3QgcmVnaW9uID0gcmVzdWx0LmNvbXBvbmVudHMuc3RhdGU7XG4gICAgY29uc3QgeyBjb3VudHJ5IH0gPSByZXN1bHQuY29tcG9uZW50cztcbiAgICBjb25zdCBjb3VudHJ5Q29kZSA9IHJlc3VsdC5jb21wb25lbnRzLmNvdW50cnlfY29kZTtcbiAgICBjb25zdCB0aW1lem9uZSA9IHJlc3VsdC5hbm5vdGF0aW9ucy50aW1lem9uZS5uYW1lO1xuICAgIGNvbnN0IGNhbGxpbmdDb2RlID0gcmVzdWx0LmFubm90YXRpb25zLmNhbGxpbmdjb2RlO1xuICAgIGNvbnN0IHsgZmxhZyB9ID0gcmVzdWx0LmFubm90YXRpb25zO1xuICAgIGNvbnN0IG1ncnMgPSByZXN1bHQuYW5ub3RhdGlvbnMuTUdSUztcbiAgICBjb25zdCBtYWlkZW5oZWFkID0gcmVzdWx0LmFubm90YXRpb25zLk1haWRlbmhlYWQ7XG4gICAgY29uc3QgeyBnZW9oYXNoIH0gPSByZXN1bHQuYW5ub3RhdGlvbnM7XG4gICAgY29uc3Qgd2hhdDN3b3JkcyA9IHJlc3VsdC5hbm5vdGF0aW9ucy53aGF0M3dvcmRzPy53b3JkcztcblxuICAgIGNvbnN0IHN0cmVldE5hbWUgPVxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMucm9hZCB8fFxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMuZm9vdHdheSB8fFxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMuc3RyZWV0IHx8XG4gICAgICByZXN1bHQuY29tcG9uZW50cy5zdHJlZXRfbmFtZSB8fFxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMucmVzaWRlbnRpYWwgfHxcbiAgICAgIHJlc3VsdC5jb21wb25lbnRzLnBhdGggfHxcbiAgICAgIHJlc3VsdC5jb21wb25lbnRzLnBlZGVzdHJpYW4gfHxcbiAgICAgIHJlc3VsdC5jb21wb25lbnRzLnJvYWRfcmVmZXJlbmNlIHx8XG4gICAgICByZXN1bHQuY29tcG9uZW50cy5yb2FkX3JlZmVyZW5jZV9pbnRsO1xuXG4gICAgY29uc3Qgc3ViTG9jYWxpdHkgPVxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMubmVpZ2hib3VyaG9vZCB8fFxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMuc3VidXJiIHx8XG4gICAgICByZXN1bHQuY29tcG9uZW50cy5jaXR5X2Rpc3RyaWN0IHx8XG4gICAgICByZXN1bHQuY29tcG9uZW50cy5kaXN0cmljdCB8fFxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMucXVhcnRlciB8fFxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMuaG91c2VzIHx8XG4gICAgICByZXN1bHQuY29tcG9uZW50cy5zdWJkaXZpc2lvbjtcblxuICAgIGNvbnN0IGxvY2FsaXR5ID1cbiAgICAgIHJlc3VsdC5jb21wb25lbnRzLmNpdHkgfHxcbiAgICAgIHJlc3VsdC5jb21wb25lbnRzLnRvd24gfHxcbiAgICAgIHJlc3VsdC5jb21wb25lbnRzLm11bmljaXBhbGl0eSB8fFxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMudmlsbGFnZSB8fFxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMuaGFtbGV0IHx8XG4gICAgICByZXN1bHQuY29tcG9uZW50cy5sb2NhbGl0eSB8fFxuICAgICAgcmVzdWx0LmNvbXBvbmVudHMuY3JvZnQ7XG5cbiAgICBsZXQgZ2VvY29kZWQgPSBPcGVuQ2FnZUdlb2NvZGVkLmNyZWF0ZSh7XG4gICAgICBsYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZSxcbiAgICAgIGZvcm1hdHRlZEFkZHJlc3MsXG4gICAgICBzdHJlZXROdW1iZXIsXG4gICAgICBzdHJlZXROYW1lLFxuICAgICAgc3ViTG9jYWxpdHksXG4gICAgICBsb2NhbGl0eSxcbiAgICAgIHBvc3RhbENvZGUsXG4gICAgICByZWdpb24sXG4gICAgICBjb3VudHJ5LFxuICAgICAgY291bnRyeUNvZGUsXG4gICAgICB0aW1lem9uZSxcbiAgICAgIGNhbGxpbmdDb2RlLFxuICAgICAgZmxhZyxcbiAgICAgIG1ncnMsXG4gICAgICBtYWlkZW5oZWFkLFxuICAgICAgZ2VvaGFzaCxcbiAgICAgIHdoYXQzd29yZHMsXG4gICAgfSk7XG5cbiAgICBpZiAocmVzdWx0LmJvdW5kcykge1xuICAgICAgZ2VvY29kZWQgPSA8T3BlbkNhZ2VHZW9jb2RlZD4oXG4gICAgICAgIGdlb2NvZGVkLndpdGhCb3VuZHMoXG4gICAgICAgICAgcmVzdWx0LmJvdW5kcy5zb3V0aHdlc3QubGF0LFxuICAgICAgICAgIHJlc3VsdC5ib3VuZHMuc291dGh3ZXN0LmxuZyxcbiAgICAgICAgICByZXN1bHQuYm91bmRzLm5vcnRoZWFzdC5sYXQsXG4gICAgICAgICAgcmVzdWx0LmJvdW5kcy5ub3J0aGVhc3QubG5nXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgYWRtaW5MZXZlbHM6IHtcbiAgICAgIG5hbWVLZXk6IFwic3RhdGVcIiB8IFwiY291bnR5XCI7XG4gICAgICBjb2RlS2V5OiBcInN0YXRlX2NvZGVcIiB8IFwiY291bnR5X2NvZGVcIjtcbiAgICB9W10gPSBbXG4gICAgICB7IG5hbWVLZXk6IFwic3RhdGVcIiwgY29kZUtleTogXCJzdGF0ZV9jb2RlXCIgfSxcbiAgICAgIHsgbmFtZUtleTogXCJjb3VudHlcIiwgY29kZUtleTogXCJjb3VudHlfY29kZVwiIH0sXG4gICAgXTtcbiAgICBhZG1pbkxldmVscy5mb3JFYWNoKCh7IG5hbWVLZXksIGNvZGVLZXkgfSwgbGV2ZWwpID0+IHtcbiAgICAgIGlmIChyZXN1bHQuY29tcG9uZW50c1tuYW1lS2V5XSkge1xuICAgICAgICBnZW9jb2RlZC5hZGRBZG1pbkxldmVsKFxuICAgICAgICAgIEFkbWluTGV2ZWwuY3JlYXRlKHtcbiAgICAgICAgICAgIGxldmVsOiBsZXZlbCArIDEsXG4gICAgICAgICAgICBuYW1lOiByZXN1bHQuY29tcG9uZW50c1tuYW1lS2V5XSB8fCBcIlwiLFxuICAgICAgICAgICAgY29kZTogcmVzdWx0LmNvbXBvbmVudHNbY29kZUtleV0gfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZ2VvY29kZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJldmVyc2VRdWVyeSwgUmV2ZXJzZVF1ZXJ5T2JqZWN0IH0gZnJvbSBcInF1ZXJ5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbkNhZ2VSZXZlcnNlUXVlcnlPYmplY3QgZXh0ZW5kcyBSZXZlcnNlUXVlcnlPYmplY3Qge1xuICByZWFkb25seSBjb3VudHJ5Q29kZXM/OiBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgbWluQ29uZmlkZW5jZT86IG51bWJlcjtcbiAgcmVhZG9ubHkgbm9SZWNvcmQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVuQ2FnZVJldmVyc2VRdWVyeSBleHRlbmRzIFJldmVyc2VRdWVyeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgY291bnRyeUNvZGVzPzogc3RyaW5nW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtaW5Db25maWRlbmNlPzogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbm9SZWNvcmQ/OiBib29sZWFuO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih7XG4gICAgY291bnRyeUNvZGVzLFxuICAgIG1pbkNvbmZpZGVuY2UsXG4gICAgbm9SZWNvcmQsXG4gICAgLi4ucmV2ZXJzZVF1ZXJ5T2JqZWN0XG4gIH06IE9wZW5DYWdlUmV2ZXJzZVF1ZXJ5T2JqZWN0KSB7XG4gICAgc3VwZXIocmV2ZXJzZVF1ZXJ5T2JqZWN0KTtcbiAgICB0aGlzLmNvdW50cnlDb2RlcyA9IGNvdW50cnlDb2RlcztcbiAgICBpZiAoXG4gICAgICBtaW5Db25maWRlbmNlICYmXG4gICAgICAobWluQ29uZmlkZW5jZS50b1N0cmluZygpICE9PVxuICAgICAgICBwYXJzZUludChtaW5Db25maWRlbmNlLnRvU3RyaW5nKCksIDEwKS50b1N0cmluZygpIHx8XG4gICAgICAgIG1pbkNvbmZpZGVuY2UgPCAxIHx8XG4gICAgICAgIG1pbkNvbmZpZGVuY2UgPiAxMClcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSBcIm1pbkNvbmZpZGVuY2VcIiBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBpbnRlZ2VyIGZyb20gMSB0byAxMC4nXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLm1pbkNvbmZpZGVuY2UgPSBtaW5Db25maWRlbmNlO1xuICAgIHRoaXMubm9SZWNvcmQgPSBub1JlY29yZDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKFxuICAgIG9iamVjdDogT3BlbkNhZ2VSZXZlcnNlUXVlcnlPYmplY3RcbiAgKTogT3BlbkNhZ2VSZXZlcnNlUXVlcnkge1xuICAgIHJldHVybiBuZXcgdGhpcyhvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIHRvT2JqZWN0KCk6IE9wZW5DYWdlUmV2ZXJzZVF1ZXJ5T2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIudG9PYmplY3QoKSxcbiAgICAgIGNvdW50cnlDb2RlczogdGhpcy5jb3VudHJ5Q29kZXMsXG4gICAgICBtaW5Db25maWRlbmNlOiB0aGlzLm1pbkNvbmZpZGVuY2UsXG4gICAgICBub1JlY29yZDogdGhpcy5ub1JlY29yZCxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHdpdGhDb3VudHJ5Q29kZXMoY291bnRyeUNvZGVzOiBzdHJpbmdbXSk6IE9wZW5DYWdlUmV2ZXJzZVF1ZXJ5IHtcbiAgICByZXR1cm4gbmV3IE9wZW5DYWdlUmV2ZXJzZVF1ZXJ5KHsgLi4udGhpcy50b09iamVjdCgpLCBjb3VudHJ5Q29kZXMgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnRyeUNvZGVzKCk6IHVuZGVmaW5lZCB8IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudHJ5Q29kZXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aE1pbkNvbmZpZGVuY2UobWluQ29uZmlkZW5jZTogbnVtYmVyKTogT3BlbkNhZ2VSZXZlcnNlUXVlcnkge1xuICAgIHJldHVybiBuZXcgT3BlbkNhZ2VSZXZlcnNlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIG1pbkNvbmZpZGVuY2UgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWluQ29uZmlkZW5jZSgpOiB1bmRlZmluZWQgfCBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm1pbkNvbmZpZGVuY2U7XG4gIH1cblxuICBwdWJsaWMgd2l0aE5vUmVjb3JkKG5vUmVjb3JkOiBib29sZWFuKTogT3BlbkNhZ2VSZXZlcnNlUXVlcnkge1xuICAgIHJldHVybiBuZXcgT3BlbkNhZ2VSZXZlcnNlUXVlcnkoeyAuLi50aGlzLnRvT2JqZWN0KCksIG5vUmVjb3JkIH0pO1xuICB9XG5cbiAgcHVibGljIGdldE5vUmVjb3JkKCk6IHVuZGVmaW5lZCB8IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vUmVjb3JkO1xuICB9XG59XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIE9wZW5DYWdlR2VvY29kZWQgfSBmcm9tIFwicHJvdmlkZXIvb3BlbmNhZ2UvT3BlbkNhZ2VHZW9jb2RlZFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPcGVuQ2FnZUdlb2NvZGVRdWVyeSB9IGZyb20gXCJwcm92aWRlci9vcGVuY2FnZS9PcGVuQ2FnZUdlb2NvZGVRdWVyeVwiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL29wZW5jYWdlL09wZW5DYWdlR2VvY29kZVF1ZXJ5XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE9wZW5DYWdlUHJvdmlkZXIgfSBmcm9tIFwicHJvdmlkZXIvb3BlbmNhZ2UvT3BlbkNhZ2VQcm92aWRlclwiO1xuZXhwb3J0ICogZnJvbSBcInByb3ZpZGVyL29wZW5jYWdlL09wZW5DYWdlUHJvdmlkZXJcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT3BlbkNhZ2VSZXZlcnNlUXVlcnkgfSBmcm9tIFwicHJvdmlkZXIvb3BlbmNhZ2UvT3BlbkNhZ2VSZXZlcnNlUXVlcnlcIjtcbmV4cG9ydCAqIGZyb20gXCJwcm92aWRlci9vcGVuY2FnZS9PcGVuQ2FnZVJldmVyc2VRdWVyeVwiO1xuIiwiaW1wb3J0IHsgREVGQVVMVF9SRVNVTFRfTElNSVQgfSBmcm9tIFwicHJvdmlkZXJcIjtcbmltcG9ydCB7IEJvdW5kcyB9IGZyb20gXCJpbmRleFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlb2NvZGVRdWVyeU9iamVjdCB7XG4gIHJlYWRvbmx5IHRleHQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGlwPzogc3RyaW5nO1xuICByZWFkb25seSBzb3V0aD86IG51bWJlciB8IHN0cmluZztcbiAgcmVhZG9ubHkgd2VzdD86IG51bWJlciB8IHN0cmluZztcbiAgcmVhZG9ubHkgbm9ydGg/OiBudW1iZXIgfCBzdHJpbmc7XG4gIHJlYWRvbmx5IGVhc3Q/OiBudW1iZXIgfCBzdHJpbmc7XG4gIHJlYWRvbmx5IGxvY2FsZT86IHN0cmluZztcbiAgcmVhZG9ubHkgbGltaXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlb2NvZGVRdWVyeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgdGV4dD86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IGlwPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc291dGg/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSB3ZXN0PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbm9ydGg/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlYXN0PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbG9jYWxlPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbGltaXQ6IG51bWJlciA9IERFRkFVTFRfUkVTVUxUX0xJTUlUO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih7XG4gICAgdGV4dCxcbiAgICBpcCxcbiAgICBzb3V0aCxcbiAgICB3ZXN0LFxuICAgIG5vcnRoLFxuICAgIGVhc3QsXG4gICAgbG9jYWxlLFxuICAgIGxpbWl0ID0gREVGQVVMVF9SRVNVTFRfTElNSVQsXG4gIH06IEdlb2NvZGVRdWVyeU9iamVjdCkge1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgdGhpcy5pcCA9IGlwO1xuICAgIGlmICghdGV4dCAmJiAhaXApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWl0aGVyIFwidGV4dFwiIG9yIFwiaXBcIiBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIHRoaXMuc291dGggPSBzb3V0aDtcbiAgICB0aGlzLndlc3QgPSB3ZXN0O1xuICAgIHRoaXMubm9ydGggPSBub3J0aDtcbiAgICB0aGlzLmVhc3QgPSBlYXN0O1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICAgIHRoaXMubGltaXQgPSBsaW1pdDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG9iamVjdDogR2VvY29kZVF1ZXJ5T2JqZWN0KTogR2VvY29kZVF1ZXJ5IHtcbiAgICByZXR1cm4gbmV3IHRoaXMob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b09iamVjdCgpOiBHZW9jb2RlUXVlcnlPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiB0aGlzLnRleHQsXG4gICAgICBpcDogdGhpcy5pcCxcbiAgICAgIHNvdXRoOiB0aGlzLnNvdXRoLFxuICAgICAgd2VzdDogdGhpcy53ZXN0LFxuICAgICAgbm9ydGg6IHRoaXMubm9ydGgsXG4gICAgICBlYXN0OiB0aGlzLmVhc3QsXG4gICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoVGV4dCh0ZXh0OiBzdHJpbmcpOiBHZW9jb2RlUXVlcnkge1xuICAgIHJldHVybiAoPHR5cGVvZiBHZW9jb2RlUXVlcnk+dGhpcy5jb25zdHJ1Y3RvcikuY3JlYXRlKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIHRleHQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgd2l0aElwKGlwOiBzdHJpbmcpOiBHZW9jb2RlUXVlcnkge1xuICAgIHJldHVybiAoPHR5cGVvZiBHZW9jb2RlUXVlcnk+dGhpcy5jb25zdHJ1Y3RvcikuY3JlYXRlKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGlwLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHdpdGhCb3VuZHMoXG4gICAgc291dGg/OiBudW1iZXIsXG4gICAgd2VzdD86IG51bWJlcixcbiAgICBub3J0aD86IG51bWJlcixcbiAgICBlYXN0PzogbnVtYmVyXG4gICk6IEdlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuICg8dHlwZW9mIEdlb2NvZGVRdWVyeT50aGlzLmNvbnN0cnVjdG9yKS5jcmVhdGUoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgc291dGgsXG4gICAgICB3ZXN0LFxuICAgICAgbm9ydGgsXG4gICAgICBlYXN0LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHdpdGhMb2NhbGUobG9jYWxlOiBzdHJpbmcpOiBHZW9jb2RlUXVlcnkge1xuICAgIHJldHVybiAoPHR5cGVvZiBHZW9jb2RlUXVlcnk+dGhpcy5jb25zdHJ1Y3RvcikuY3JlYXRlKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGxvY2FsZSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTGltaXQobGltaXQ6IG51bWJlcik6IEdlb2NvZGVRdWVyeSB7XG4gICAgcmV0dXJuICg8dHlwZW9mIEdlb2NvZGVRdWVyeT50aGlzLmNvbnN0cnVjdG9yKS5jcmVhdGUoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgbGltaXQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGV4dCgpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRleHQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXAoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pcDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCb3VuZHMoKTogdW5kZWZpbmVkIHwgQm91bmRzIHtcbiAgICBpZiAoIXRoaXMuc291dGggfHwgIXRoaXMud2VzdCB8fCAhdGhpcy5ub3J0aCB8fCAhdGhpcy5lYXN0KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzb3V0aDogdGhpcy5zb3V0aCxcbiAgICAgIHdlc3Q6IHRoaXMud2VzdCxcbiAgICAgIG5vcnRoOiB0aGlzLm5vcnRoLFxuICAgICAgZWFzdDogdGhpcy5lYXN0LFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0TG9jYWxlKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlO1xuICB9XG5cbiAgcHVibGljIGdldExpbWl0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubGltaXQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IERFRkFVTFRfUkVTVUxUX0xJTUlUIH0gZnJvbSBcInByb3ZpZGVyXCI7XG5pbXBvcnQgeyBDb29yZGluYXRlcyB9IGZyb20gXCJpbmRleFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJldmVyc2VRdWVyeU9iamVjdCB7XG4gIHJlYWRvbmx5IGxhdGl0dWRlOiBudW1iZXIgfCBzdHJpbmc7XG4gIHJlYWRvbmx5IGxvbmdpdHVkZTogbnVtYmVyIHwgc3RyaW5nO1xuICByZWFkb25seSBsb2NhbGU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxpbWl0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXZlcnNlUXVlcnkge1xuICBwcml2YXRlIHJlYWRvbmx5IGxhdGl0dWRlOiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBsb25naXR1ZGU6IG51bWJlciB8IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IGxvY2FsZT86IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IGxpbWl0OiBudW1iZXIgPSBERUZBVUxUX1JFU1VMVF9MSU1JVDtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioe1xuICAgIGxhdGl0dWRlLFxuICAgIGxvbmdpdHVkZSxcbiAgICBsb2NhbGUsXG4gICAgbGltaXQgPSBERUZBVUxUX1JFU1VMVF9MSU1JVCxcbiAgfTogUmV2ZXJzZVF1ZXJ5T2JqZWN0KSB7XG4gICAgdGhpcy5sYXRpdHVkZSA9IGxhdGl0dWRlO1xuICAgIHRoaXMubG9uZ2l0dWRlID0gbG9uZ2l0dWRlO1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICAgIHRoaXMubGltaXQgPSBsaW1pdDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG9iamVjdDogUmV2ZXJzZVF1ZXJ5T2JqZWN0KTogUmV2ZXJzZVF1ZXJ5IHtcbiAgICByZXR1cm4gbmV3IHRoaXMob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b09iamVjdCgpOiBSZXZlcnNlUXVlcnlPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBsYXRpdHVkZTogdGhpcy5sYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZTogdGhpcy5sb25naXR1ZGUsXG4gICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoQ29vcmRpbmF0ZXMobGF0aXR1ZGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXIpOiBSZXZlcnNlUXVlcnkge1xuICAgIHJldHVybiAoPHR5cGVvZiBSZXZlcnNlUXVlcnk+dGhpcy5jb25zdHJ1Y3RvcikuY3JlYXRlKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGxhdGl0dWRlLFxuICAgICAgbG9uZ2l0dWRlLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHdpdGhMb2NhbGUobG9jYWxlOiBzdHJpbmcpOiBSZXZlcnNlUXVlcnkge1xuICAgIHJldHVybiAoPHR5cGVvZiBSZXZlcnNlUXVlcnk+dGhpcy5jb25zdHJ1Y3RvcikuY3JlYXRlKHtcbiAgICAgIC4uLnRoaXMudG9PYmplY3QoKSxcbiAgICAgIGxvY2FsZSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTGltaXQobGltaXQ6IG51bWJlcik6IFJldmVyc2VRdWVyeSB7XG4gICAgcmV0dXJuICg8dHlwZW9mIFJldmVyc2VRdWVyeT50aGlzLmNvbnN0cnVjdG9yKS5jcmVhdGUoe1xuICAgICAgLi4udGhpcy50b09iamVjdCgpLFxuICAgICAgbGltaXQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29vcmRpbmF0ZXMoKTogQ29vcmRpbmF0ZXMge1xuICAgIHJldHVybiB7IGxhdGl0dWRlOiB0aGlzLmxhdGl0dWRlLCBsb25naXR1ZGU6IHRoaXMubG9uZ2l0dWRlIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0TG9jYWxlKCk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlO1xuICB9XG5cbiAgcHVibGljIGdldExpbWl0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubGltaXQ7XG4gIH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgR2VvY29kZVF1ZXJ5IH0gZnJvbSBcInF1ZXJ5L0dlb2NvZGVRdWVyeVwiO1xuZXhwb3J0ICogZnJvbSBcInF1ZXJ5L0dlb2NvZGVRdWVyeVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBSZXZlcnNlUXVlcnkgfSBmcm9tIFwicXVlcnkvUmV2ZXJzZVF1ZXJ5XCI7XG5leHBvcnQgKiBmcm9tIFwicXVlcnkvUmV2ZXJzZVF1ZXJ5XCI7XG4iLCJleHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCk6IGJvb2xlYW4gPT4gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcblxuZXhwb3J0IGNvbnN0IGZpbHRlclVuZGVmaW5lZE9iamVjdFZhbHVlcyA9IDxWPihcbiAgb2JqZWN0OiBSZWNvcmQ8c3RyaW5nLCBWIHwgdW5kZWZpbmVkPlxuKTogUmVjb3JkPHN0cmluZywgVj4gPT5cbiAgT2JqZWN0LmtleXMob2JqZWN0KS5yZWR1Y2UoKGFjYzogUmVjb3JkPHN0cmluZywgVj4sIGtleSkgPT4ge1xuICAgIGNvbnN0IGZpbHRlcmVkID0gYWNjO1xuICAgIGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpbHRlcmVkW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcmVkO1xuICB9LCB7fSk7XG5cbi8qKlxuICogRGVjb2RlIGZyb20gVVJMLXNhZmUgYmFzZTY0IHRvIHRydWUgYmFzZTY0LlxuICovXG5leHBvcnQgY29uc3QgZGVjb2RlVXJsU2FmZUJhc2U2NCA9IChzYWZlOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgc2FmZS5yZXBsYWNlKC8tL2csIFwiK1wiKS5yZXBsYWNlKC9fL2csIFwiL1wiKTtcblxuLyoqXG4gKiBFbmNvZGUgZnJvbSB0cnVlIGJhc2U2NCB0byBVUkwtc2FmZSBiYXNlNjQuXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNvZGVVcmxTYWZlQmFzZTY0ID0gKGJhc2U2NDogc3RyaW5nKTogc3RyaW5nID0+XG4gIGJhc2U2NC5yZXBsYWNlKC9cXCsvZywgXCItXCIpLnJlcGxhY2UoL1xcLy9nLCBcIl9cIik7XG5cbmV4cG9ydCBjb25zdCBkZWNvZGVCYXNlNjQgPSAoYmFzZTY0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZWNvZGVCYXNlNjQgY2FuIG9ubHkgYmUgdXNlZCBpbiBhIE5vZGUgZW52aXJvbm1lbnQuXCIpO1xuICB9XG5cbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGJhc2U2NCwgXCJiYXNlNjRcIikudG9TdHJpbmcoKTtcbn07XG5cbi8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9pcC1yZWdleFxuY29uc3QgaXB2NFJlZ0V4cCA9XG4gIFwiKD86MjVbMC01XXwyWzAtNF1cXFxcZHwxXFxcXGRcXFxcZHxbMS05XVxcXFxkfFxcXFxkKSg/OlxcXFwuKD86MjVbMC01XXwyWzAtNF1cXFxcZHwxXFxcXGRcXFxcZHxbMS05XVxcXFxkfFxcXFxkKSl7M31cIjtcbmV4cG9ydCBjb25zdCBpc0lwdjQgPSAoaXA6IHN0cmluZyk6IGJvb2xlYW4gPT5cbiAgbmV3IFJlZ0V4cChgXiR7aXB2NFJlZ0V4cH0kYCkudGVzdChpcCk7XG5cbi8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9pcC1yZWdleFxuY29uc3QgaXB2NlNlZyA9IFwiW2EtZkEtRlxcXFxkXXsxLDR9XCI7XG5jb25zdCBpcHY2UmVnRXhwID0gYCgoPzoke2lwdjZTZWd9Oil7N30oPzoke2lwdjZTZWd9fDopfCg/OiR7aXB2NlNlZ306KXs2fSg/OiR7aXB2NFJlZ0V4cH18OiR7aXB2NlNlZ318Oil8KD86JHtpcHY2U2VnfTopezV9KD86OiR7aXB2NFJlZ0V4cH18KDoke2lwdjZTZWd9KXsxLDJ9fDopfCg/OiR7aXB2NlNlZ306KXs0fSg/Oig6JHtpcHY2U2VnfSl7MCwxfToke2lwdjRSZWdFeHB9fCg6JHtpcHY2U2VnfSl7MSwzfXw6KXwoPzoke2lwdjZTZWd9Oil7M30oPzooOiR7aXB2NlNlZ30pezAsMn06JHtpcHY0UmVnRXhwfXwoOiR7aXB2NlNlZ30pezEsNH18Oil8KD86JHtpcHY2U2VnfTopezJ9KD86KDoke2lwdjZTZWd9KXswLDN9OiR7aXB2NFJlZ0V4cH18KDoke2lwdjZTZWd9KXsxLDV9fDopfCg/OiR7aXB2NlNlZ306KXsxfSg/Oig6JHtpcHY2U2VnfSl7MCw0fToke2lwdjRSZWdFeHB9fCg6JHtpcHY2U2VnfSl7MSw2fXw6KXwoPzo6KCg/Ojoke2lwdjZTZWd9KXswLDV9OiR7aXB2NFJlZ0V4cH18KD86OiR7aXB2NlNlZ30pezEsN318OikpKSglWzAtOWEtekEtWl17MSx9KT9gO1xuZXhwb3J0IGNvbnN0IGlzSXB2NiA9IChpcDogc3RyaW5nKTogYm9vbGVhbiA9PlxuICBuZXcgUmVnRXhwKGBeJHtpcHY2UmVnRXhwfSRgKS50ZXN0KGlwKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbmV4cG9ydCBjb25zdCBnZXRSZXF1aXJlRnVuYyA9ICgpOiBGdW5jdGlvbiA9PlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIHR5cGVvZiBfX25vbl93ZWJwYWNrX3JlcXVpcmVfXyA9PT0gXCJmdW5jdGlvblwiXG4gICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgICBfX25vbl93ZWJwYWNrX3JlcXVpcmVfX1xuICAgIDogcmVxdWlyZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=