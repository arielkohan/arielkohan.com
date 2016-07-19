
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
    "#btn-group-target button," +
    " #arrow-btn," +
    " .navbar .nav li a," +
    " .navbar-brand" ).on('click', function(event){

  // Prevent default anchor click behavior
  event.preventDefault();
  // Make sure this.hash has a value before overriding default behavior
    
  if (this.hash !== "") {
    var hash ;
    if($(this).hasClass("btn")){
      hash = $(this).children("a").attr("href");
    } else {
      hash = $(this).attr("href")
    }
    // Store hash (#)
    
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

function setDialogMessage(type, name){
  var $h2 = $("#somedialog .dialog-inner h2"),
      $h2_strong = $("#somedialog .dialog-inner h2 strong"),
      $p = $("#somedialog .dialog-inner p"),
      $img = $("#somedialog .dialog-inner img"),
      $button = $("#somedialog .dialog-inner div button");

  if(type && type === "waiting"){
    $h2.text("Wait a sec, " + name + " ...");
    $img.attr("src","img/Forrest.gif");
    $p.css("display", "none");
    $img.css("display","block");
    $button.attr("disabled","");
    $button.css("display","none");
  } else if (type && type === "success"){
    $p.text("I will respond as soon as possible. Have a great day ahead!");
    $h2.text("Thank you for getting in touch, " + name + "!");
    $button.removeAttr("disabled");
    $img.css("display","none");
    $p.css("display","block");
    $button.css("display","block");
    //$button.slideDown("slow");
  } else if (type && type === "error"){
    $p.text("Please, try again later.");
    $h2.text("Oops, there was an error, " + name + ".");
    $button.removeAttr("disabled");
    $img.css("display","none");
    $p.css("display","block");
    //$button.slideDown("slow");
    $button.css("display","block");
  } else throw "Problem with the dialog";
  
}

function sendMessage(){
  clearErrors();
  var errors = checkForm();
  if(! errors.length){
    //send message
    console.log("no errors in form");
    console.log($("form").serialize());
    var dialogToggle = new DialogFx(somedialog);
    $.ajax({
      url: 'https://formspree.io/arielkohan94@gmail.com',
      method: 'POST',
      data: $("form").serialize(),
      dataType: 'json',
      beforeSend: function() {

        setDialogMessage("waiting", $("#name").val() );
        if(! dialogToggle.isOpen) 
          dialogToggle.toggle();
      },
      success: function(data) {
        console.log("success: " + data);
        if(dialogToggle.isOpen)
          dialogToggle.toggle();

        setDialogMessage("success",  $("#name").val());
        setTimeout(function(){
          dialogToggle.toggle();
        } , 200);
      },
      error: function(err) {
        console.log("error: " + err);
        if(dialogToggle.isOpen)
          dialogToggle.toggle();

        setDialogMessage("error",  $("#name").val());
        setTimeout(function(){
          dialogToggle.toggle();
        } , 200);
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