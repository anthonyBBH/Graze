/**
 * Main module, starts the JS for the application and includes
 * any and all global functions used throughout the application's JS.
 *
 * @namespace
 */
var W = (function(api) {

  /** @private */
  var api = api || {};

  /**
   * Handles console.log for ie
   *
   * @function
   * @private
   */

  function createConsole(){
    if (!window.console) {
      window.console = {};
      window.console.log = function(){};
    }
  }

//**************FOR CHANGING BACKGROUND ON REFRESH*****************
  // function initializeBackground () {
  //   var totalCount = 6;
  //   var num = Math.ceil(Math.random() * totalCount);
  //   $('.splash').css('background-image', 'url(../images/bgsplash/'+num+'.jpg)');
  // }

  function initializeNavigation () {
    $("nav a").on('click', function(e){
      //e.preventDefault();
      $('html, body').animate({
        scrollTop: $($(e.target).attr('href')).offset().top
      }, 500);
    });

    $(".splash-scroll").on('click', function(e){
      //e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 500);
    });

    $('.nav-jump-to').on('click touch', function(){
      $('.nav-list').slideToggle();
      $('.nav-arrow').toggleClass("active");
    });

    $('.nav-list').on('click', function(){
      $('.nav-list').hide();
    })
  }

  function initializeTwitter (argument) {
    var wt = {};


    $.ajax({
      url: "/twitter-proxy",
      data: {
        url: "statuses/user_timeline.json?screen_name=wondersauce&include_entities=true&exclude_replies=true&count=50"
      },
      dataType: "json",
      success: handleResponseData
  })
  

    function handleResponseData(data){
      $.each(data, function(i, data){
        
        var date    = moment(data.created_at).format("MMM D"),
            tweet   = '<div class="t"><p class="tweet-text">'+data.text+'</p>'+'<p class="tweet-date">'+'— '+date+' —'+'</p></div>';

         $.each(data.entities.urls, function(i, link){
            tweet = tweet.split(link.url).join('<a href="'+link.url+'" target="_blank">'+link.display_url+'</a>');
         });

         $.each(data.entities.user_mentions, function(i, mention){
            tweet = tweet.split("@"+mention.screen_name).join('<a href="http://twitter.com/'+mention.screen_name+'" target="_blank">'+"@"+mention.screen_name+'</a>');
         });

        $(".tweet").append(tweet);

      });

      tweetNav();
    };

    function tweetNav(){
      wt.currentTweet = 0;
      wt.tweets = $('.t').css('display', 'none');
      wt.tweets.eq(wt.currentTweet).fadeIn();

      $('.next-arrow').on('click', function (e) {
         e.preventDefault();
        if (wt.currentTweet == wt.tweets.length - 1) {
          wt.currentTweet = 0;
        } else {
          wt.currentTweet = wt.currentTweet + 1;
        } 
        wt.tweets.css({display: 'none'}).eq(wt.currentTweet).fadeIn(100);
      })

      $('.prev-arrow').on('click', function (e) {
        e.preventDefault();
        if (wt.currentTweet == 0) {
          wt.currentTweet = wt.tweets.length - 1;
        } else {
          wt.currentTweet = wt.currentTweet - 1;
        } 
        wt.tweets.css({display: 'none'}).eq(wt.currentTweet).fadeIn(100);
      });
    }
  }; //initializetwitter()


  /**
   * Inits the app
   *
   * @function 
   * @public
   */
  api.init = function() {
    initializeTwitter();
    initializeNavigation();
    // initializeBackground();


  }

  /** 
   * This is the final object returned representing
   * the module's API 
   *
   * @scope W
   * @public
  */
  return api;

}(W));
