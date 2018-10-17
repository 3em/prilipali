// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var windowHeight = $(window).height();
var windowWidth = $(window).width();

var widthVideo = windowWidth - 100;
var heightVideo = widthVideo * .565;

if (windowWidth < 1025){
  widthVideo = windowWidth;
  heightVideo = widthVideo * .565;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: heightVideo,
    width: widthVideo,
    videoId: '1B-K_ZsCrXk',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {

  if (event.data == 0){
    $('.video-container').removeClass('played').addClass('preload-pic')
  }

  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

$(function () {

  var $html = $('html');
  var $body = $('body');
  var $loader = $('.js-loader');
  var $parallax = $('.js-parallax');
  var $heroClick =  $('.js-hero-click');
  var $overlayVideo = $('.js-overlay-video');
  var $overlayVideoClose = $('.js-overlay-video-close');
  var $callVideoMain = $('.js-call-video-main');
  var windowWidth = $(window).width();

  $(window).on('resize', function () {
    windowWidth = $(window).width();
  });

  $(window).on('load', function () {
    loader();
  });

  var heroText = {
    1: [
      {
        text: 'Кажется, у&nbsp;тебя&nbsp;есть промокод?'
      },{
        text: 'Кажется, тут&nbsp;есть 2&nbsp;текст?'
      }
    ],
    2: [
      {
        text: 'Получи веселого <br>прилипалу за каждые 500 р. в чеке!'
      },{
        text: 'Получи веселого прилипалу <a href="#">по ссылке</a>'
      }
    ],
    3: [
      {
        text: 'Просто играю в&nbsp;Прилипал на&nbsp;телефоне)'
      },{
        text: 'Просто играю'
      }
    ]
  };

  /**
   * loader activation and hide
   */
  function loader() {
    setTimeout(function () {
      $loader.addClass('active');
      setTimeout(function () {
        $body.addClass('show');
        setTimeout(function () {
          $body.removeClass('transitions').addClass('regular').removeClass('overflow');
          $html.removeClass('overflow');
        }, 4000)
      }, 1000)
    }, 500);
  }

  /**
   * video play popup
   */
  $callVideoMain.on('click', function (e) {
    e.preventDefault();
    $body.addClass('overflow');
    $overlayVideo.addClass('open');
    player.playVideo();
  });

  /**
   * fn close video popup
   */
  function closePopupVideo() {
    $body.removeClass('overflow');
    $overlayVideo.removeClass('open');
    setTimeout(function () {
      player.stopVideo();
    }, 250);
  }

  /**
   * close popup video on click
   */
  $overlayVideoClose.on('click', function (e) {
    e.preventDefault();
    closePopupVideo();
  });

  /**
   * close popup if esc
   */
  $(document).keyup(function (e) {
    if (e.which == 27 && $overlayVideo.hasClass('open')) {
      closePopupVideo()
    }
  });

  /**
   * hero click change text
   */
  $heroClick.on('click', function (e) {

    var id = $(this).attr('data-id');
    var numText = parseInt($(this).attr('data-text')) + 1;
    var length = heroText[id].length - 1;

    if (numText > length)
      numText = 0;

    $(this).attr('data-text', numText);
    $('.b-section-top__hero-cloud', $(this)).html(heroText[id][numText].text);

  });

  /**
   * parallax top screen
   */
  function paralax() {
    if (windowWidth > 1024){
      $parallax.each(function () {
        var scene = $(this)[0];
        var parallaxInstance = new Parallax(scene);
      })
    }
  }
  paralax();


});