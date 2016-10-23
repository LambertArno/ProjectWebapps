$(document).ready(function() {
    
/* Divider Counter
    -----------------------------------------------*/
    jQuery('.counter-item').appear(function() {
        jQuery('.counter-number').countTo();
        jQuery(this).addClass('funcionando');
        console.log('funcionando');
    });
    
/* Fit Car Images 16:10
    -----------------------------------------------*/
    
    var width = $('.images .view img').width();
    var height = width / 16 * 10;
    $('.images .view img').css('height', height);
    $('.images .view img').css('object-fit', 'cover');
    
    
    var blog_width = $('.blog-wrapper img').width();
    var blog_height = blog_width / 16 * 10;
    $('.blog-wrapper img').css('height', blog_height);
    $('.blog-wrapper img').css('object-fit', 'cover');
    
/* Fit Car Images 16:10 on resize
    -----------------------------------------------*/ 
    
    window.onresize = function(event) {
        var width = $('.images .view img').width();
        var height = width / 16 * 10;
        $('.images .view img').css('height', height);
        $('.images .view img').css('object-fit', 'cover');
    };
    
/* Fit Parallax Sections on mobile
    -----------------------------------------------*/
    var viewPortWidth = $(window).width();
    console.log(viewPortWidth);
    if (viewPortWidth <= 768){
        $(".parallax-section").each(function(){
            var height = $(this).outerHeight(true);
            console.log(height);
            $(this).css('cssText', 'background-size: auto ' + height + 'px !important');
            height = $(this).css('background-size');
            console.log(height);
        });
    };
    
    
/* Nivo Lightbox
    -----------------------------------------------*/
    $(".mask a").attr("data-lightbox-gallery", "gallery");
    $('.mask a').nivoLightbox({
        effect: 'fadeScale',
    });
    
    $("a.view").attr("data-lightbox-gallery", "gallery");
    $('a.view').nivoLightbox({
        effect: 'fadeScale',
    });
    

/* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });


/* jQuery to collapse the navbar on scroll
    -----------------------------------------------*/
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });


/*  smoothscroll
    -----------------------------------------------*/
   $(function() {
        $('.navbar-default a').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 49
            }, 1000);
            event.preventDefault();
        });
    });


/* blog masonry
  -----------------------------------------------*/
    $(window).load(function () {
        blogisotope = function () {
            var e, t = $(".blog-masonry").width(),
                n = Math.floor(t);
            if ($(".blog-masonry").hasClass("masonry-true") === true) {
                n = Math.floor(t * .3033);
                e = Math.floor(t * .04);
                if ($(window).width() < 1023) {
                    if ($(window).width() < 768) {
                        n = Math.floor(t * 1)
                    } else {
                        n = Math.floor(t * .48)
                    }
                } else {
                    n = Math.floor(t * .3033)
                }
            }
            return e
        };
        var r = $(".blog-masonry");
        bloggingisotope = function () {
            r.isotope({
                itemSelector: ".post-masonry",
                animationEngine: "jquery",
                masonry: {
                    gutterWidth: blogisotope()
                }
            })
        };
        bloggingisotope();
        $(window).smartresize(bloggingisotope)
    })


/* Owl Carousel
    -----------------------------------------------*/
    $(document).ready(function() {
        $("#owl-testimonial").owlCarousel({
            autoPlay: 8000,
            singleItem: true,
        });
    });


/* Parallax section
    -----------------------------------------------*/
    function initParallax() {
        $('#home').parallax("100%", 0.1);
        $('#counter').parallax("100%", 0.2);
        $('#contact').parallax("100%", 0.3);        
    }
    initParallax();
    

/* wow
  -------------------------------*/
    new WOW({ mobile: false }).init();

});