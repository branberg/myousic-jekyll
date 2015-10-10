/***********************************************************

FUNCTIONS

1 - vertCenterNav
2 - keepSquare
3 - mobileMenu
4 - photoGallery
5 - header parallax

***********************************************************/

(function ($) {

  // 1 - centerLogo
  $.fn.vertCenterNav = function(){

    var logo = this.find('#logo_wrap');
    var logoHeight = logo.height();

    var nav = this.find('#header_nav');
    var navHeight = nav.height();
    var yPos = null;

    if( navHeight > logoHeight ){
      var yPos = Math.round(( navHeight - logoHeight )/2);
      logo.css( 'padding-top', yPos );
      nav.css( 'padding-top', 0);
    } else if( logoHeight > navHeight ) {
      var yPos = Math.round(( logoHeight - navHeight )/2);
      nav.css( 'padding-top', yPos );
      logo.css( 'padding-top', 0);
    }

    return this;
  };

  // 2 - keepSquare
  $.fn.keepSquare = function(){
    var elementWidth = this.width();
    this.height(elementWidth);
    return this;
  };

  // 3 - mobileMenu
  $.fn.mobileMenu = function(){
    var menu = this.html();
    var mobileMarkup = '<button class="mobile-menu-toggle"><i class="fa fa-bars"></i></button>';
    $('body').prepend('<div id="mobile-menu">' + menu + '</div>');
    $('#site-wrap').prepend(mobileMarkup);
    return this;
  };

  // 4 - photoGallery
  $.fn.photoGallery = function(){

  };

  // 5. Header Photo Parallax Scrolling
  $.fn.headerParallax = function(speed){
    var distance = $(window).scrollTop();
    var yPos = 50-( distance / speed );
    var yPosRound = yPos.toFixed(2);
    var coords = '50% ' + yPosRound + '%';
    this.css({ backgroundPosition: coords });
    return this;
  };

}(jQuery));



jQuery(document).ready(function($) {

  var windowWidth = $(window).width();

  /****************************************************************
  Vertically center logo relative to navigation...and vice versa
  ****************************************************************/
  $(window).load(function(){
    if(windowWidth > 768){
      $('body.interior_page #main_header').vertCenterNav();
    }
  });
  $(window).resize(function(){
    var windowWidth = $(window).width();
    if(windowWidth > 768){
      $('body.interior_page #main_header').vertCenterNav();
    }
  });

  /****************************************************************
  Build mobile menu
  ****************************************************************/
  $('.site-header .menu-container').mobileMenu();

  /****************************************************************
  Animate the menu stuff
  ****************************************************************/
  var mobileMenuToggle = $('.mobile-menu-toggle');
  $(mobileMenuToggle).click(function(){

    var windowWidth = $(window).width();
    var rightOffset = windowWidth - 60;
    var siteWrap = $('#site-wrap');

    if( $(mobileMenuToggle).hasClass('expanded') ) {
      siteWrap.animate({
        right: 0
      }, {
        duration: 120,
        specialEasing: "swing"
      });
      $(mobileMenuToggle).removeClass('expanded');
    } else {
      siteWrap.animate({
        right: -rightOffset
      }, {
        duration: 120,
        specialEasing: "swing"
      });
      $(mobileMenuToggle).addClass('expanded');
    }

    return false;

  });

  /*************************************************************************
  Make header image slightly parallax
  *************************************************************************/
  $(window).scroll(function(){

    $('#main_header').headerParallax(5);

  });

  /*************************************************************************
  Keep Album dimensions equal no matter what
  *************************************************************************/
  $('.soundcloud_embed').keepSquare();
  if( windowWidth > 768 ){
    $('.album_info_wrapper').keepSquare();
  }
  $(window).resize(function(){
    var windowWidth = $(window).width();
    $('.soundcloud_embed').keepSquare();
    if( windowWidth > 768 ){
      $('.album_info_wrapper').keepSquare();
    } else {
      $('.album_info_wrapper').height('auto');
    }
  });

  /*************************************************************************
  Allow album descriptions to be longer and scroll rather than get cut off
  *************************************************************************/
  //do things initial on window load
  $(window).load(function(){

    $('.album').each(function(){

      //set variables
      var album = $(this);
      var albumPadding = 40;
      var extraSpacing = 40;
      var albumHeight = album.find('.album_info_wrapper').outerHeight();
      var typeHeight = album.find('.album_type').outerHeight();
      var titleHeight = album.find('.album_title').outerHeight();
      var buttonHeight = album.find('.album_button').outerHeight();

      //do math to find height value needed
      var descriptionHeight = albumHeight - ( typeHeight + titleHeight + buttonHeight + ( albumPadding * 2 ) + extraSpacing );

      if( windowWidth > 768 ){

        //set initial load height of description
        album.find('.album_description').height(descriptionHeight);

        //if the content is being scrolled, add some padding to it so the text doesn't touch the scroll bars
        if( descriptionHeight < album.find('.album_description p').height() ){
          album.find('.album_description p').css('padding-right', 20);
        }

      }

    });


  });

  $(window).resize(function(){

    //set window width to be a dynamic variable as screen is resized
    var windowWidth = $(window).width();

    $('.album').each(function(){

      //set variables
      var album = $(this);
      var albumPadding = 40;
      var extraSpacing = 40;
      var albumHeight = album.find('.album_info_wrapper').outerHeight();
      var typeHeight = album.find('.album_type').outerHeight();
      var titleHeight = album.find('.album_title').outerHeight();
      var buttonHeight = album.find('.album_button').outerHeight();

      //do math to find height value needed
      var descriptionHeight = albumHeight - ( typeHeight + titleHeight + buttonHeight + ( albumPadding * 2 ) + extraSpacing );

      if( windowWidth > 768 ){

        //set initial load height of description
        album.find('.album_description').height(descriptionHeight);

        //if the content is being scrolled, add some padding to it so the text doesn't touch the scroll bars
        if( descriptionHeight < album.find('.album_description p').height() ){
          album.find('.album_description p').css('padding-right', 20);
        }

      } else {

        // if smaller than 768, reset the vales back to normal to no scrollign happens
        album.find('.album_description').height('auto');
        album.find('.album_description p').css('padding-right', 0);

      }

    });

  });

  /*************************************************************************
  Make video embeds responsive - Youtube, vimeo
  *************************************************************************/
  $(".video_embed").fitVids();


  /*************************************************************************
  LIGHTBOX FOR PHOTOS
  *************************************************************************/
  if( windowWidth < 768 ) {
    $('a.lightbox').swipebox();
  } else {
    $('a.lightbox').nivoLightbox();
  }

  /****************************************************************
  Fix IE placeholder issues
  ****************************************************************/
  if (jQuery.placeholder) {
    jQuery.placeholder.shim();
  }

});