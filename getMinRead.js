(function($) {
	$.fn.getMinRead = function( options ) {
		var settings = $.extend({}, $.fn.getMinRead.defaults, options), methods = {

			init: function ($obj){
					methods.bind($obj);
			}, //-init

			bind:function($obj){
					$obj.bind("keypress.counter keydown.counter keyup.counter blur.counter focus.counter change.counter paste.counter", methods.updateCounter);
					$obj.bind("keydown.counter", methods.doStopTyping);
					$obj.trigger('keydown');
			}, //-bind

			updateCounter: function(e){
				console.log("updateCounter")
				var element = $(this);
				var time = calculateTime(element.val(), settings);
				element.parent().find(settings.where).text(time + settings.text);
				return;
			}, //-updateCounter

			doStopTyping: function(e){
				console.log("doStopTyping")
				var element = $(this);
				var time = calculateTime(element.val(), settings);
				element.parent().find(settings.where).text(time + settings.text);
				return;
			} //-doStopTyping
		}; //extend
	
		return this.each( function() {

			methods.init($(this)); //methods
			var element = $(this);
			var time = calculateTime(element.val(), settings);
			element.parent().find(settings.where).text(time + settings.text);

			if (settings.archive) {
				var articleLink = element.find(settings.anchor);
				var articleUrl = articleLink.attr("href");
				// console.log(articleUrl);
				$.get(articleUrl, function(data){
					data = data.replace(/<img.+>/gi, "");
					// console.log(data);
					var text = $(data).find(settings.archiveText).text();
					var archiveTime = calculateTime(text, settings);
					element.find(settings.where).text(archiveTime + " min read");

				}); //-$.get()
				} //- settings.archive
		}); //- function

	};
	
	function calculateTime(text, settings) {
		// console.log("The text: " + text);
		// console.log("number of text: " + text.split(' ').length);
		return Math.ceil(text.split(' ').length / settings.wordsPerMinute) || 1;
	}

	$.fn.getMinRead.defaults = {
		text 							 : " min read",
		where              : ".minRead",
		wordsPerMinute     : 180,
		archive            : false,
		archiveText        : ".text",
		anchor             : ".article-link"
	};

})(jQuery);