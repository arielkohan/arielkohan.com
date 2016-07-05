
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
    $nav.addClass("hide-nav");
  }
}

function refreshSections(){
  var $doc = $(document);
  $(".section").each(function(){
    var breakpoint = $( this ).offset().top - ($(window).height() - 10);
    if($doc.scrollTop() > breakpoint){
      $( this ).removeClass("hide-section");
    }
  });
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
  var values = getActiveValues($active);
  $(".top-navline ")
                    .css("width", values.width)
                    .css("left", values.left)
                    .css("top", values.top + 11);
  $(".bottom-navline")
                    .css("width", values.width)
                    .css("left", values.left)
                    .css("top", values.top + values.height - 5);


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


/***********************************
            APP
***********************************/

$(document).ready(function(){
  $(".parallax-window").parallax({imageSrc: './img/desk-mac-devices-bl.jpg'});
  refreshVisibilityNavbar();
  //refreshSections();
  addListenersToScroll();
  addNavLinesInteractivy();
  initSmoothScroll();

  //$(document).scroll(function(){
  $(document).on("scroll",function(){
   refreshVisibilityNavbar();
  // refreshSections();
    });

  $(".navbar").on("activate.bs.scrollspy", function(){
      addNavLinesInteractivy();
    });

  $(window).on('resize orientationChange',function(){
      addNavLinesInteractivy();
    });

});