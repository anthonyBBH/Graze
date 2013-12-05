
$(document).ready(function() {
   
  W.init();

});






$(function(){

/*----------------------- L O A D ---*/

	TweenLite.to($('#main'), 0, {css:{'opacity':'0'}, ease:Power4.easeInOut});
	
	$(window).load(function(e) {
		$('#main').removeClass('alpha0');
		$('.loader').hide().remove();
        TweenLite.to($('#main'), 1, {css:{'opacity':'1'}, ease:Power4.easeInOut});
		scroll_ev(0, 0);
	});

	
// ! ---------
	
/*---------------------------
	Main Var / Array / Obj
	------------------------*/
	
	var win = {h:window.innerHeight, w:window.innerWidth, ua:$.browser};
	var page = {h:$("body").css("height").substr(0, $("body").css("height").length-2), w:parseFloat($('body').width())};
	var video = false;
	var videoHeight = win.h-($('.logo').outerHeight(true)*2);
	var pathname = window.location.pathname;
	
	// ! ---------

/*-----------------------
	ScrollTo
	-------------------*/	
	var scroll_ev = function (a, t){
		TweenLite.to(window, t, {scrollTo:{y: a, x:0}, ease:Power4.easeInOut, onComplete:update});
	};

// ! ---------

/*-----------------------
	Next Event
	-------------------*/	
	var scrollNext = function (e){
		e.preventDefault();
		var to = $(this).attr('href');
		if(to!='#'){
			scroll_ev($(to).offset().top-70, 1);
		}else{
			scroll_ev(0, 1);
		}
	};

// ! ---------


/*-----------------------
	Mouse Click
	-------------------*/
	
	$('.play').on('click', playVideo);
	$('.close a').on('click', closeVideo);
	$('.next a').on('click', scrollNext);
	$('.pagination a').on('click', scrollNext);
	$('.shareList a').bind('click', shareEv);
	
// ! ---------

/*-----------------------
	Mouse Hover/Out
	-------------------*/
	$('.play').on('mouseover', btHover);
	$('.play').on('mouseleave', btOut);
	$('.close a').on('mouseover', btHover);
	$('.close a').on('mouseleave', btOut);
	
	function  btHover(e){
		e.preventDefault();
		TweenLite.to($(this),0.2, {css:{"background-color":"#dc3741"}});
	
	}
	
	function  btOut(e){
		e.preventDefault();
		TweenLite.to($(this),0.2, {css:{"background-color":""}});
	
	}
		
// ! ---------


/*-----------------------
	Page Share Events
	-------------------*/
	function shareEv(e){
		e.preventDefault();
			
		if($(this).attr('href')=='#facebook'){
			window.open("http://www.facebook.com/sharer.php?u=http%3Aadayinbigdata.com","Facebook Share","height=300, width=600,scrollbars=yes");
			_gaq.push(['_trackPageview', '/Facebook-Share']);
		}else if($(this).attr('href')=='#twitter'){
			window.open("http://twitter.com/share?text=See%20how%20big%20data%20can%20make%20life%20easier%20@OgilvyOne%20&url=http%3A//adayinbigdata.com&hashtags=bigdata","Twitter Share","height=300, width=600,scrollbars=yes");
			_gaq.push(['_trackPageview', '/Twitter-Share']);
		}else if($(this).attr('href')=='#linkedin'){
			window.open("http://www.linkedin.com/shareArticle?mini=true&url=http%3A//adayinbigdata.com&title=A%20day%20in%20BIG%20DATA&&source=OgilvyOne","Linkedin Share","height=400, width=600,scrollbars=yes");
			_gaq.push(['_trackPageview', '/Linkedin-share']);
		}else if($(this).attr('href')=='#google'){
			window.open("https://plus.google.com/share?url=http%3A//adayinbigdata.com","Google+ Share","height=300, width=600,scrollbars=yes");
			_gaq.push(['_trackPageview', '/Google-share']);
				
		}
	};


/*-----------------------
	Video Events
	-------------------*/

	function playVideo(e){
		e.preventDefault();
		video = true;
		scroll_ev($('.logo').outerHeight(true), 1);
		TweenLite.to($('.video'), 1, {css:{'height':win.h+'px'}, ease:Power4.easeInOut, onComplete:showVideo});
		TweenLite.to($('#awwwards'),1, {css:{'opacity':'0', 'top':'-100%'}, ease:Power4.easeInOut});
		TweenLite.to($('.description'),1, {css:{'opacity':'0'}, ease:Power4.easeInOut});
		TweenLite.to($('.pagination'),1, {css:{'opacity':'0'}, ease:Power4.easeInOut});
		$('html').css({'overflow':'hidden'});
	}	
	
	function showVideo(){
		TweenLite.to($('.video #youtube'), 0, {css:{'height':win.h+'px', 'width':win.w+'px'}, ease:Power4.easeInOut});
		TweenLite.to($('.description'), 0, {css:{'top':'-100%'}, ease:Power4.easeInOut});
		TweenLite.to($('.pagination'), 0, {css:{'top':'-100%'}, ease:Power4.easeInOut});
		$('.video #youtube').append('<iframe id="player" src="http://www.youtube.com/embed/449twsMTrJI?html5=1?rel=0&autoplay=1" allowfullscreen></iframe>');
		$('#main>header>.video>#youtube>#player').css({'margin-top':'40px', 'height':win.h-80+'px', 'width':win.w-80+'px'});
		$('#main>header>.video>#youtube>.close').css({'top':'0'});
		TweenLite.to($('.video #youtube'), 1, {css:{'opacity':'1'}, ease:Power4.easeInOut});
	}
	function closeVideo(e){
		e.preventDefault();
		video = false;
		TweenLite.to($('.video #youtube'), 1, {css:{'opacity':'0'}, ease:Power4.easeInOut, onComplete:deleteVideo});
		TweenLite.to($('#awwwards'),1, {css:{'opacity':'1', 'top':'25px'}, ease:Power4.easeInOut});
		TweenLite.to($('.description'), 0, {css:{'top':'50%'}, ease:Power4.easeInOut});
		TweenLite.to($('.pagination'), 0, {css:{'top':'50%'}, ease:Power4.easeInOut});
	}
	function deleteVideo(){
		
		TweenLite.to($('.description'),1, {css:{'opacity':'1'}, ease:Power4.easeInOut});
		TweenLite.to($('.pagination'),1, {css:{'opacity':'1'}, ease:Power4.easeInOut});
		TweenLite.to($('.video #youtube'), 1, {css:{'height':videoHeight+'px'}, ease:Power4.easeInOut});
		TweenLite.to($('.video'), 1, {css:{'height':videoHeight+'px'}, ease:Power4.easeInOut});
		$('html').css({'overflow':'auto'});
		$('.video #youtube #player').remove();
		
		scroll_ev(0, 1);
		
		
	}
	
// ! --------



/*-----------------------
	Apear Events
	-------------------*/
	
	function show(id,xo){
		TweenLite.to($(id),1, {css:{'opacity':'1', scaleX:1, scaleY:1}, ease:Power4.easeInOut, delay:xo});
	}
	
	if( Modernizr.touch){
		
		// avoid scolling animation on touch devices
	
	}else{
		TweenLite.to($('.apear'),0, {css:{'opacity':'0',scaleX:0.9, scaleY:0.9}});
		TweenLite.to($('footer'),0, {css:{'opacity':'0', 'top':'30px'}});
		
		$('#whatisbigdata .apear:eq(0)').waypoint(function() {show($('#whatisbigdata .apear:eq(0)'),0)}, { offset: '90%' });	
		$('#whatisbigdata .apear:eq(1)').waypoint(function() {show($('#whatisbigdata .apear:eq(1)'),0)}, { offset: '80%' });	
		$('#whatisbigdata .apear:eq(2)').waypoint(function() {show($('#whatisbigdata .apear:eq(2)'),0)}, { offset: '80%' });	
		
		$('#whynow .apear:eq(0)').waypoint(function() {show($('#whynow .apear:eq(0)'),0)}, { offset: '90%' });
		$('#whynow .apear:eq(1)').waypoint(function() {show($('#whynow .apear:eq(1)'),0)}, { offset: '80%' });	
		$('#whynow .apear:eq(2)').waypoint(function() {show($('#whynow .apear:eq(2)'),0.25)}, { offset: '80%' });	
		$('#whynow .apear:eq(3)').waypoint(function() {show($('#whynow .apear:eq(3)'),0.5)}, { offset: '80%' });	
		
		$('#howbig .apear:eq(0)').waypoint(function() {show($('#howbig .apear:eq(0)'),0)}, { offset: '90%' });
		$('#howbig .apear:eq(1)').waypoint(function() {show($('#howbig .apear:eq(1)'),0)}, { offset: '80%' });	
		$('#howbig .apear:eq(2)').waypoint(function() {show($('#howbig .apear:eq(2)'),0.25)}, { offset: '80%' });	
		$('#howbig .apear:eq(3)').waypoint(function() {show($('#howbig .apear:eq(3)'),0.5)}, { offset: '80%' });	
		$('#howbig .apear:eq(4)').waypoint(function() {show($('#howbig .apear:eq(4)'),0.75)}, { offset: '80%' });	
		
		$('#howpeople .apear:eq(0)').waypoint(function() {show($('#howpeople .apear:eq(0)'),0)}, { offset: '90%' });
		$('#howpeople .apear:eq(1)').waypoint(function() {show($('#howpeople .apear:eq(1)'),0)}, { offset: '80%' });	
		$('#howpeople .apear:eq(2)').waypoint(function() {show($('#howpeople .apear:eq(2)'),0.25)}, { offset: '80%' });	
		$('#howpeople .apear:eq(3)').waypoint(function() {show($('#howpeople .apear:eq(3)'),0.5)}, { offset: '80%' });	
		$('#howpeople .apear:eq(4)').waypoint(function() {show($('#howpeople .apear:eq(4)'),0.75)}, { offset: '80%' });
		
		$('#ourambition .apear:eq(0)').waypoint(function() {show($('#ourambition .apear:eq(0)'),0)}, { offset: '90%' });
		$('#ourambition .apear:eq(1)').waypoint(function() {show($('#ourambition .apear:eq(1)'),0)}, { offset: '80%' });	
		$('#ourambition .apear:eq(2)').waypoint(function() {show($('#ourambition .apear:eq(2)'),0.25)}, { offset: '80%' });	
		$('#ourambition .apear:eq(3)').waypoint(function() {show($('#ourambition .apear:eq(3)'),0.5)}, { offset: '80%' });	
		$('#ourambition .apear:eq(4)').waypoint(function() {show($('#ourambition .apear:eq(4)'),0.75)}, { offset: '80%' });
		
		$('footer').waypoint(function() {TweenLite.to($('footer'),0.5, {css:{'opacity':'1', 'top':'0px'}});}, { offset: '80%' });
	}
	
		
		$('footer').waypoint(function() {$('#main>.pagination>ul>li>a').css({'background':'#FFF'});}, { offset: '40%' }); // add white bg to the nav
		$('footer').waypoint(function() {$('#main>.pagination>ul>li>a').css({'background':''});}, { offset: '60%' }); // rremove white bg to the nav	
	
// ! ------


/*-------------------
	Nav Selector
	-------------------*/
	var navSelector = function (page){
		
		$('.pagination a span').removeClass('navSelect');
		$('.pagination a[href='+'#'+page+'] span').addClass('navSelect');
		
	};
	navSelector('video')

// ! ---------





/*-------------------
	Scroll Events
	-------------------*/

$(window).scroll(function(e){
			var h = window.innerHeight;
			var perc = (win.h*0.01)*50;
			
			
			if($(window).scrollTop()<=$('#whatisbigdata').offset().top-perc){
				navSelector('video');
					
			}else if ($(window).scrollTop()<=$('#whynow').offset().top-perc){
				navSelector('whatisbigdata');
			}else if ($(window).scrollTop()<=$('#howbig').offset().top-perc){
				navSelector('whynow');
			}else if ($(window).scrollTop()<=$('#howpeople').offset().top-perc){
				navSelector('howbig');
			}else if ($(window).scrollTop()<=$('#ourambition').offset().top-perc){
				navSelector('howpeople');
			}else if ($(window).scrollTop()<=$('footer iframe').offset().top){
				navSelector('ourambition');
			};
	
			
});

// ! Scroll Events



/*-----------------------
	On Resize
	-------------------*/

	function update(){
		win.w=window.innerWidth;
		win.h=window.innerHeight;
		var dh= Math.round($('#main>header>.video>.description').height()*0.5);
		TweenLite.to($('.description'),0.5, {css:{'margin-top':''+(-1*dh)+'px'}});
		
		if(win.h>=530){
			videoHeight = win.h-($('.logo').outerHeight(true)*2);
			
			if(video){
				TweenLite.to(window, 0.1, {scrollTo:{y: $('.logo').outerHeight(true), x:0}, ease:Power4.easeInOut});
				$('.video').css({'height':win.h+'px'});
				$('.video #youtube').css({'height':win.h+'px', 'width':win.w+'px'});
				$('#main>header>.video>#youtube>iframe').css({'height':win.h-80+'px', 'width':win.w-80+'px'});
			}else{
				$('.video').css({'height':videoHeight+'px'});
				$('.video  #youtube').css({'height':videoHeight+'px'});
			}
			
		}else{
			videoHeight = 350;
			
			if(video){
				TweenLite.to(window, 0.1, {scrollTo:{y: $('.logo').outerHeight(true), x:0}, ease:Power4.easeInOut});
				$('.video').css({'height':win.h+'px'});
				$('.video #youtube').css({'height':win.h+'px', 'width':win.w+'px'});
				$('#main>header>.video>#youtube>iframe').css({'height':win.h-80+'px', 'width':win.w-80+'px'});
			}else{
				$('.video').css({'height':videoHeight+'px'});
				$('.video  #youtube').css({'height':videoHeight+'px'});
			}
		}
	};
	update();
	
	
	$(window).resize(function() {
			update();
			
	});
// ! --------


	
});