/********************************************************
 *
 * Custom Javascript code for Snart Bootstrap theme
 * Written by Themelize.me (http://themelize.me)
 *
 *******************************************************/
$(document).ready(function() {
  var defaultColour = 'blue';
  
  //scheme switcher
  if ($('#schemes').size() > 0) {
    var bgActive = $('#header').data('demo-background');
    var bgTag = $('#header');
    var bgLinks = $(this).find('.backgrounds a');
    
    var allSchemes = 'blue wine'
    var schemeActive = $('body').data('demo-colour');
    var schemeTag = $('body');
    var schemeLinks = $(this).find('.colours a');
    
    // set default on page load
    $(this).find('.backgrounds a.'+ bgActive).addClass('active');
    $(this).find('.colours a.'+ schemeActive).addClass('active');
    
    // background links
    bgLinks.click(function() {
      bgLinks.removeClass('active');
      $(this).addClass('active');
      bgTag.removeClass();
      bgTag.addClass($(this).attr('class'));
    });
    
    // scheme links
    schemeLinks.click(function() {
      schemeLinks.removeClass('active');
      $(this).addClass('active');
      schemeTag.removeClass(allSchemes);
      schemeTag.addClass($(this).attr('class'));
    });    
  }
  
  //IE placeholders
  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      if (this.originalType) {
        this.type = this.originalType;
        delete this.originalType;
      }
      input.val('');
      input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() == '') {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
    }
  }).blur();  
  
  //Bootstrap tooltip
  // invoke by adding _tooltip to a tags (this makes it validate)
  $('body').tooltip({
    selector: "a[class*=_tooltip]"
  });
    
  //Bootstrap popover
  // invoke by adding _popover to a tags (this makes it validate)
  $('body').popover({
    selector: "a[class*=_popover]",
    trigger: "hover"
  }); 
  
  //Scroll Top link
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrolltop').fadeIn();
    } else {
      $('.scrolltop').fadeOut();
    }
  });
 
  $('.scrolltop').click(function(){
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });  
  
  //show hide elements
  $('.show-hide').each(function() {
    $(this).click(function(e) {
      var state = 'open'; //assume target is closed & needs opening
      var target = $(this).data('target');
      var targetState = $(this).data('target-state');
      
      //allows trigger link to say target is open & should be closed
      if (typeof targetState !== 'undefined' && targetState !== false) {
        state = targetState;
      }
      
      if (state == 'undefined') {
        state = 'open';
      }
      
      $(target).toggleClass('show-hide-'+ state);
      $(this).toggleClass(state);
      e.preventDefault();
    });
  });
  
  
  //------------ Plugins ------------//
  
  //flexslider carousels
  //flexslider
  $('.flexslider').each(function(i) {
    var currentFlexslider = $(this);
    
    //passable settings
    var sliderNav = $(this).data('slidernav');
 
    var sliderSettings =  {
      id: 'flexslider-'+ i,
      animation: $(this).data('transition'),
      selector: ".items > .item",
      controlNav: true,
      smoothHeight: false      
    };

    if (sliderNav != 'auto') {
      sliderSettings = $.extend({}, sliderSettings, {
        manualControls: sliderNav +' li a',
        controlsContainer: '.flexslider-wrapper'
      });
    }   

    $(this).flexslider(sliderSettings);
  }); 
  
  
  //jQuery Count Down plugin @see: https://github.com/hilios/jQuery.countdown
  $('.count-down').each(function() {
    var $this = $(this);
    var date = $(this).data('countdown-date');
    var hideOnComplete = $(this).data('countdown-hide-oncomplete');
    var countdownComplete = $this.find('.count-down-complete');
    if (countdownComplete.length > 0) {
      countdownComplete.hide();
    }
    
    if (date != '') {
      $this.countdown(date, function(event) {
        switch(event.type) {
          case "seconds":
          case "minutes":
          case "hours":
          case "days":
          case "weeks":
          case "daysLeft":
            if ($this.find('span#'+event.type).length > 0) {
              $this.find('span#'+event.type).html(event.value);
            }
            break;
          case "finished":            
            //if .count-down-complete present show it
            if (countdownComplete.length > 0) {
              countdownComplete.show();
            }
            
            // hide the countdown digits
            if (hideOnComplete == true) {
              $this.find('.count').hide();
            }
            break;
        }
      });
    }
    else {
      $this.hide();
    }
  });
  
  // Magnific Popup - @see: http://dimsemenov.com/plugins/magnific-popup/
  if ($('.video-modal').size() > 0) {
    $('.video-modal').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: true,
      fixedContentPos: true
    });
  }
  
});