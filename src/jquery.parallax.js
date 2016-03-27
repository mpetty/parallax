/*!
 *	Parallax Effects
 *
 *	@author		Mitchell Petty <https://github.com/mpetty/parallax>
 *	@version	v1.0.0
 */
(function($) {
"use strict";

	var Parallax = {

		init : function(el) {

			var self = this;

			if(!window.requestAnimationFrame) return false;

			this.images = this.getImages(el);
			this.scrollingTimer = false;
			this.scrolling = false;
			this.lastKnownScrollTop = null;
			this.scrollTimeout = null;
			this.window = $(window);

			this.window.on('load scroll', function() {
				self.lastKnownScrollTop = self.window.scrollTop();

				if(!self.scrolling) {
					self.scrolling = true;
					self.doParallax();
				}

				clearTimeout(self.scrollingTimer);
				self.scrollingTimer = setTimeout($.proxy(self.onScrollEnd, self), 300);
			});

		},

		onScrollEnd : function() {

			this.scrolling = false;

		},

		getImages : function(el) {

			var images = [];

			for (var i = 0; i < el.length; i++) {
				$(el[i]).addClass('parallax');

				images.push({
					el : $(el[i]),
					container : $(el[i]).parent(),
					height : $(el[i]).parent().outerHeight(),
					speed : $(el[i]).data('parallax') || 20
				});
			}

			return images;

		},

		doParallax : function() {

			if(this.window.width() > 900) {
				$.each(this.images, $.proxy(this.parallaxAnimation, this));
				if(this.scrolling) window.requestAnimationFrame($.proxy(this.doParallax, this));
			} else {
				$.each(this.images, function(i, image) {
					image.el.css({ 'transform' :  'translateY(0)' });
				});
			}

		},

		parallaxAnimation : function(index, image) {

			var yPos,
				offsetY = image.container.offset().top,
				windowHeight = this.window.height(),
				scrollTop = this.lastKnownScrollTop,
				scrollBottom = scrollTop + this.window.height();

			if(scrollBottom > offsetY && scrollTop < offsetY + image.height) {
				yPos = (scrollTop + (windowHeight - image.height) / 2 - offsetY) / image.speed;
				image.el.css({ 'transform' :  'translate3d(0,'+(yPos.toFixed())+'px,0)' });
			}

		}

	};

	/**
	 *	Initialize Plugin
	 */
	$.fn.parallax = function(options) {
		var settings = $.extend(true, {}, $.fn.parallax.defaults, options);
		Parallax.init(this);
		return this;
	};

	/**
	 *	Plugin Defaults
	 */
	$.fn.parallax.defaults = {
	};

})(jQuery);