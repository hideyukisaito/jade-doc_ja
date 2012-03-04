/*
 * 	exScrollEvent 1.0.0 - jQuery plugin
 *	written by Cyokodog	
 *
 *	Copyright (c) 2009 Cyokodog (http://d.hatena.ne.jp/cyokodog/)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
(function($j){
	$j.ex = $j.ex || {};
	$j.ex.scrollEvent = function( target , config ){
		var o = this;
		if( typeof config == 'function') config = {
			callback : config
		}
		var c = o.config = $j.extend({},$j.ex.scrollEvent.defaults,config,{
			target : target
		});
		c.status = 0;
		c.scroll = o.getPos();
		c.target.scroll(function( evt ){
			if (o.isMove()) {
				c.status = (c.status == 0 ? 1 : (c.status == 1 ? 2 : c.status) );
				c.callback( evt , c );
			}
			if(c.tm) clearTimeout(c.tm);
			c.tm = setTimeout(function(){
				o.isMove();
				c.status = 0;
				c.callback( evt , c );
			},c.delay);
		});
	}
	$j.extend($j.ex.scrollEvent.prototype,{
		isMove : function(){
			var o = this, c = o.config;
			var pos = o.getPos();
			var scrollY = (pos.top != c.scroll.top);
			var scrollX = (pos.left != c.scroll.left);
			if(scrollY || scrollX){
				c.scrollY = scrollY;
				c.scrollX = scrollX;
				c.prevScroll = c.scroll;
				c.scroll = pos;
				return true;
			}
			return false;

		},
		getPos : function(){
			var o = this, c = o.config;
			return {
				top : c.target.scrollTop(),
				left : c.target.scrollLeft()
			}		
		}
	});
	$j.ex.scrollEvent.defaults = {
		delay : 100
	}
	$j.fn.exScrollEvent = function( config ){
		new $j.ex.scrollEvent(this , config);
		return this;
	};
})(jQuery);

