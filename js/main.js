
/***********************************
            FUNCTIONS
***********************************/
function refreshVisibilityNavbar(){
 var $this = $(document),
 $nav =  $('nav'),
 breakpoint = $('#principal-section').offset().top + $('#principal-section').height() - 61;
 if( $this.scrollTop() > breakpoint) {
    $nav.removeClass("hide-nav").addClass("white-transparent-bg");
  } else {
   if($(window).width() < 768 )
      $(".collapse").collapse("hide");
    $nav.addClass("hide-nav").removeClass("white-transparent-bg");
  }
}


function addListenersToScroll(){
  $( "#btn-group-target button a," +
    " #arrow-btn," +
    " .navbar .nav li a," +
    " .navbar-brand" ).on('click', function(event){

  // Prevent default anchor click behavior
  event.preventDefault();
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {


    // Store hash (#)
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
    $('html, body').animate({
      scrollTop: $(hash).offset().top-60
    }, 600,"swing", function(){

      // Add hash (#) to URL when done scrolling (default click behavior)
     // window.location.hash = hash;
      refreshVisibilityNavbar();
    }) // End if statement
  };

});
}

function getActiveValues($active){

  return{
    width: $active.width(),
    left: $active.position().left,
    top: $active.position().top,
    height: $active.height()
  };
}

function addNavLinesInteractivy(){

  var $active = $("li.active");
  if($active && $active.length){
    var values = getActiveValues($active);
    $(".top-navline ")
                      .css("width", values.width)
                      .css("left", values.left)
                      .css("top", values.top + 11);
    $(".bottom-navline")
                      .css("width", values.width)
                      .css("left", values.left)
                      .css("top", values.top + values.height - 5);

  $(".top-navline , .bottom-navline").show();

  } else {
    //doesn't exist an active element
     $(".top-navline , .bottom-navline").hide();
  }

}

function initSmoothScroll(){
  var $window = $(window);
  var scrollTime = 1;
  var scrollDistance = 200;
  $window.on("mousewheel DOMMouseScroll", function(event){
    event.preventDefault(); 
    var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(delta*scrollDistance);

    TweenMax.to($window, scrollTime, {
      scrollTo : { y: finalScroll, autoKill:true },
      ease: Power1.easeOut,
      overwrite: 5              
    });

  });
}

function initThumbnailsToggle(){
  $(".js-show-desc").on("click", function(){
    if($(this).hasClass("active"))
      $(this).removeClass("active");
    else 
      $(this).addClass("active");
    $(this).siblings(".description").slideToggle("slow");
  });
}

function initRefreshVisibilityNavbar(){
  refreshVisibilityNavbar();

  $(document).on("scroll",function(){
   refreshVisibilityNavbar();
    });
}

function initNavlinesInterativity(){
  addNavLinesInteractivy();
  $(".navbar").on("activate.bs.scrollspy", function(){
      addNavLinesInteractivy();
  });

  $(window).on('resize orientationChange',function(){
      addNavLinesInteractivy();
  });
}

function initWow(){
   new WOW(
            {
              boxClass:     'wow',      // default
              animateClass: 'animated', // default
              offset:       10,          // default
              mobile:       true,       // default
              live:         true        // default
            }).init();
}

function checkForm(){
  var errors = [];

  $("input[required] , textarea[required]").each(function(){
   /* if( !$(this) || !$(this)[0] || ! $(this)[0].checkValidity() )
      if($(this) && $(this)[0])
        errors.push($(this)[0]);
      else
        throw "Undefined element problem in checkForm";*/
      if( ! this || ! this.checkValidity() )
      if(this)
        errors.push(this);
      else
        throw "Undefined element problem in checkForm";
  });

  if(errors.length){
    //have errors
    highlightErrors(errors);
  }
  
  return errors;
}

function highlightErrors(errors){
  console.log((errors));
  $(errors).each(function(){
    console.log($(this).siblings("label.input__label"));
    $(this).siblings("label.input__label").addClass("on-error");
  });

  $(errors)[0].focus();
}

function clearErrors(){
  $("label.input__label").removeClass("on-error");

}

function sendMessage(){
  clearErrors();
  var errors = checkForm();
  if(! errors.length){
    //send message
    console.log("no errors in form");
    console.log($("form").serialize());
    /*var user_name = $("#name")[0].text(),
        user_email = $("#email")[0].text(),
        user_subject = $("#subject")[0].text(),
        user_message = $("#message")[0].text();*/
    $.ajax({
      url: 'https://formspree.io/arielkohan94@gmail.com',
      method: 'POST',
      data: $("form").serialize(),
      dataType: 'json',
      beforeSend: function() {
        //$("form").append('<div class="alert alert--loading">Sending message…</div>');
      },
      success: function(data) {
       /* $("form").find('.alert--loading').hide();
        $("form").append('<div class="alert alert--success">Message sent!</div>');*/
        console.log("success: " + data);
      },
      error: function(err) {
        /*$("form").find('.alert--loading').hide();
        $("form").append('<div class="alert alert--error">Ops, there was an error.</div>');*/
        console.log("error: " + err);
      }
    });

  }
}

function initSendMessage(){
  $("form").submit(function(event){
    console.log("Sending Message");
    event.preventDefault();
    sendMessage(event);
  });
}

/***********************************
            APP
***********************************/

$(document).ready(function(){

  initRefreshVisibilityNavbar();
  addListenersToScroll();
  initNavlinesInterativity();
  initThumbnailsToggle();
  initWow();
  initSendMessage();
});