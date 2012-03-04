/*
 * jQuery smoothAnchor
 *
 * jQuery required.
 * jQuery Easing Plugin extends this Plugin.
 *
 * Copyright 2009 (c) kamem
 * http://develo.org/
 * Licensed Under the MIT.
 *
 * Date: 2010.09.4
*/

//例 : $('h1').smoothAnchor({easing : 'quart',speed : 1000,target : #header});
//アンカーがないときになにもtarget指定がなかった場合の飛び先
var target = '#header';

$(function() {
//（動き,スピード,ターゲット（#headerなど）)
$('a[href^="#"]').smoothAnchor({easing : 'easeOutQuart',speed : 1000});

/*画面クリック時アニメーションを止める
var pageWrapTag = $.support.boxModel ? navigator.appName.match(/Opera/) ? "html" : "html,body" : "body";
$(document).click(function(){
	$(pageWrapTag).queue([]).stop()
});*/

//アドレスに#1000,10など数値で指定している場合その位置に移動
if(parseInt(location.hash.slice(1))) {
	var targetAddress = location.hash.split(",");
	var targetPositiontop = parseInt(targetAddress[1]);
	var targetPositionleft = parseInt(targetAddress[0].slice(1));

	//boxModelによって実装が違うみたいでたとえば、後方互換モードは body、Operaは html,body の両方指定にすると、不具合が出る
	var pageWrapTag = $.support.boxModel ? navigator.appName.match(/Opera/) ? "html" : "html,body" : "body";
	$(pageWrapTag).animate({ scrollTop : targetPositiontop,scrollLeft : targetPositionleft }, 0, 0);
}
});


//jQuery Plugin
$.fn.smoothAnchor = function(options) {

	var c = $.extend({
		easing: '',
		speed: '',
		target: target
	},options);

	tagClick($(this),c.easing,c.speed,c.target);
}

//タグをクリックしたとき
function tagClick(tag,easing,speed,target) {
	tag.click(function () {
		
		//タグにアンカーがない指定したアンカー（target）を入れる
		target = (this.hash) ? target = this.hash : target;

		var tag = this;
		smoothAnchor({tag: tag,easing: easing,speed: speed,target: target});
	return false;
	});
}

//処理
function smoothAnchor(options) {
	//初期設定
	var c = $.extend({
		tag: 'body',
		easing: 'easeOutQuart',
		speed: 1000,
		target: target
	},options);

	tag = c.tag
	easing = c.easing;
	speed = c.speed;
	target = c.target;

	//boxModelによって実装が違うみたいでたとえば、後方互換モードは body、Operaは html,body の両方指定にすると、不具合が出る
	var pageWrapTag = $.support.boxModel ? navigator.appName.match(/Opera/) ? "html" : "html,body" : "body";
	
	$(pageWrapTag).queue([]).stop();

	//数字ターゲットの場合 数字の位置に移動（例 : #1000,10）
	if(parseInt(target.slice(1))) {
		target = target.split(",");
		var targetPositiontop = parseInt(target[1]);
		var targetPositionleft = parseInt(target[0].slice(1));
	}
	//普通の場合
	else {
		var targetPosition = $(target).offset();
		var targetPositiontop  = targetPosition.top;
		var targetPositionleft = targetPosition.left;
	}

	$(pageWrapTag).animate({ scrollTop : targetPositiontop,scrollLeft : targetPositionleft }, speed, easing,function(){location.hash = target });
	//アンカー一から、少しずらしたいときは↓を使ってください。アドレスバーはかわりません。
	//$("html,body").animate({ scrollTop: targetPosition - 100 }, 1000, 'quart');
}