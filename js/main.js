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
  var $popup = $('.js-popup');
  var $popupBorder = $('.js-popup-border');
  var windowWidth = $(window).width();
  var heroText = {
    1: [
      {
        text: 'Кажется, у&nbsp;тебя&nbsp;есть промокод?'
      },{
        text: '<span>Нет промокода? Качай приложение!</span>'
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
  var promoCodeSubmitAllow = false;
  var $promoCodeForm = $('.js-promo-from');
  var $phoneInput = $('.js-phone-input');
  var $promoCodeForm_Error = $('.js-promo-from-error');
  var $promoCodeForm_Success = $('.js-promo-from-success');
  var $popupTabs = $('.js-popup-tab');
  var $popupTabsBox = $('.js-tabs-box');
  var $promoCodeCall = $('.js-promo-code-call');
  var $overlayPromoCode = $('.js-overlay-promo-code');
  var $promoCodePOpupClose = $('.js-close-promo-code');
  var $shopForm = $('.js-shop-form');
  var $shopFormBorder = $('.js-shop-form-border');

  $(window).on('resize', function () {
    windowWidth = $(window).width();
    popupBorderHeight();
    mapChoosepBorderHeight();
  });

  $(window).on('load', function () {
    loader();
    scrollTo($body, 0, 0);
  });

  /**
   * open popup promo on load if hash
   */
  function getHashToOpenPromoPopup() {
    var hash = window.location.hash;
    if (hash == '#?promoCodePopup'){
      openPopupPromoCode();
    }
  }
  getHashToOpenPromoPopup();

  /**
   * close promo code popup
   */
  function closePopupPromoCode(){

    $body.removeClass('overflow');
    $overlayPromoCode.removeClass('open');
    window.location.hash = '';

    setTimeout(function () {
      $promoCodeForm[0].reset();
      $promoCodeForm.removeClass('hidden error-show');
      $promoCodeForm_Success.addClass('hidden');
    }, 250);
  }

  /**
   * close promo code on click
   */
  $promoCodePOpupClose.on('click', function (e) {
    e.preventDefault();

    closePopupPromoCode();
  });

  /**
   * promo code popup call
   */
  $promoCodeCall.on('click', function (e) {
    e.preventDefault();

    var idText = parseInt($(this).closest($heroClick).attr('data-text'));

    $('.js-popup-tab', $('.b-popup__tabs-item').eq(idText)).trigger('click');

    openPopupPromoCode();
    window.location.hash = '#?promoCodePopup';
  });

  /**
   * promo code popup open
   */
  function openPopupPromoCode() {
    $body.addClass('overflow');
    $overlayPromoCode.addClass('open');
    scrollTo($body, 0, 500, $overlayPromoCode);
  }

  /**
   * popup tabs
   */
  $popupTabs.on('click', function (e) {
    e.preventDefault();

    if (!$(this).hasClass('active')){
      var thisHref = $(this).attr('href');
      $popupTabs.removeClass('active');
      $(this).addClass('active');
      $popupTabsBox.addClass('hidden');
      $(thisHref).removeClass('hidden');
      popupBorderHeight();
    }
  });

  /**
   * set popup promo cod border height
   */
  function popupBorderHeight() {
    setTimeout(function () {
      var heightPopup = $popup.height();
      var val = heightPopup + 44;
      $popupBorder.css('border-bottom-width', val+'px');
    }, 10);
  }
  popupBorderHeight();

  /**
   * set popup promo cod border height
   */
  function mapChoosepBorderHeight() {
    setTimeout(function () {
      var heightPopup = $shopForm.height();
      var val = parseInt(heightPopup + 1.4 * 12.8);
      $shopFormBorder.css('border-bottom-width', val+'px');
    }, 10);
  }
  mapChoosepBorderHeight();

  /**
   * loader activation and hide
   */
  function loader() {
    setTimeout(function () {
      $loader.addClass('active');
      setTimeout(function () {
        $body.addClass('show').removeClass('overflow');
        $html.removeClass('overflow');
        setTimeout(function () {
          $body.removeClass('transitions').addClass('regular');
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
      closePopupVideo();
    }

    if (e.which == 27 && $overlayPromoCode.hasClass('open')) {
      closePopupPromoCode();
    }
  });

  /**
   * close popup on overlay
   */
  $(document).on('click', function (e) {
    var $target = $(e.target);

    if ($target.is('.js-overlay-promo-code')){
      closePopupPromoCode();
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

  // VALIDATION

  /**
   * validate form for amount of filled required felds
   * @param $form - form dom
   */
  function chkformCode($form) {
    var emailMask = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-zA-Z0-9]{1}[a-zA-Z0-9\-]{0,62}[a-zA-Z0-9]{1})|[a-zA-Z])\.)+[a-zA-Z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/;
    var validEmail = emailMask.test($('.js-email-input', $form).val());

    if ($('.js-required.js-filled', $form).length < $('.js-required', $form).length) {
      promoCodeSubmitAllow = false;
    } else if ($('.js-phone-input', $form).val().length < 17) {
      promoCodeSubmitAllow = false;
      $('.js-phone-input', $form).addClass('error');
    } else if (!validEmail){
      promoCodeSubmitAllow = false;
      $('.js-email-input', $form).addClass('error');
    } else if (!$('.js-agree', $form).is(':checked')){
      promoCodeSubmitAllow = false;
    } else {
      promoCodeSubmitAllow = true;
      $('.js-email-input', $form).removeClass('error');
      $('.js-phone-input', $form).removeClass('error');
    }
  }

  /**
   * inputs set status filled of value more than 0
   */
  $('input, textarea', $promoCodeForm).on('keyup paste change input', function () {
    var $this = $(this);

    commonFormsInputsChanging($this, this);

    // check form
    chkformCode($promoCodeForm);
  });

  /**
   * submit form
   */
  $promoCodeForm.on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this);

    if (promoCodeSubmitAllow){
      submitPromoCodeForm($this, $this.serialize());
    } else {
      $('input, textarea', $promoCodeForm).trigger('change');
      $promoCodeForm_Error.html('Пожалуйста, заполните все поля формы');
      $this.addClass('error-show');
    }

    return false;
  });

  /**
   * submit Form
   * @param $this
   * @param data
   */
  function submitPromoCodeForm($this, data) {

    $.ajax({
      url: $this.attr('action'),
      method: "POST",
      data: data,
      dataType: "JSON",
      success: function (data) {
        data.result === 'ok' ? showSuccessPromoCodeForm() : showErrorPromoCodeForm();
      },
      error: function () {
        showErrorPromoCodeForm();
      }
    });
  }

  /**
   * promo code success
   */
  function showSuccessPromoCodeForm() {
    $promoCodeForm.addClass('hidden');
    $promoCodeForm_Success.removeClass('hidden');
    popupBorderHeight();
  }

  /**
   * promo code form error
   */
  function showErrorPromoCodeForm() {
    $promoCodeForm_Error.html('Возникла ошибка.<br>Повторите попытку позже.');
    $promoCodeForm.addClass('error-show');

    setTimeout(function () {
      $promoCodeForm.removeClass('error-show');
    }, 3000);
  }

  /**
   * phone mask
   */
  $phoneInput.mask('+7 (000) 000-0000');

});

/**
 * common inputs behaviour
 * @param $this
 */
commonFormsInputsChanging = function ($thisElem, $this) {
  //reset error class
  var $thisForm = $thisElem.closest('form');
  if ($thisForm.hasClass('error-show'))
    $thisForm.removeClass('error-show');

  //set filled class
  if ($thisElem.hasClass('js-checkbox')){

    $thisElem.is(':checked') ? $thisElem.addClass('js-filled').removeClass('error') : $thisElem.removeClass('js-filled').addClass('error');

  } else {
    $this.value.length > 0 ? $thisElem.addClass('js-filled').removeClass('error') : $thisElem.removeClass('js-filled').addClass('error');
  }
};

/**
 * scroll to block
 * @param selector
 */
scrollTo = function(selector, offset, time, scrollElem, position) {
  if (time != 0) {
    time = 500;
  }

  setTimeout(function () {
    !offset ? offset = 0 : offset;
    if (!position == true){
      var scroll = $(selector).offset().top - offset;
    } else {
      var scroll = $(selector).position().top - offset;
    }

    if (!scrollElem){
      scrollElem = $('html,body');
    }
    scrollElem.animate({
      scrollTop: scroll
    }, time);
  }, 10);
};