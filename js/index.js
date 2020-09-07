$(document).ready(function(){
  const $ = jQuery(this);
  const btnOpenNav = document.getElementById('js-open-nav');
  const navbar = document.getElementById('header-nav');
  
  (function navbarAction() {
    btnOpenNav.addEventListener('click', function() {
      navbar.classList.toggle('open');
    });
    
    window.addEventListener('resize', function() {
      if(navbar.classList.contains('open')) {
        navbar.classList.remove('open')
      }
      
    });
  })();

  $.find('.hero [data-fancybox]').fancybox({
    youtube: {
      controls : 1,
      showinfo : 0
    },
    vimeo: {
      color : 'f00'
    }
  });

  $.find('.gallery-images [data-fancybox="images"]').fancybox({
    toolbar: false,
    thumb: true,
    // loop: true
  });

  $.find('.testimonials .ttms-slider.owl-carousel').owlCarousel({
    items: 1,
    margin: 30,
    loop: false,
    dots: true,
    nav: true,
    navText: [
      '<i class="icofont-long-arrow-right"></i>',
      '<i class="icofont-long-arrow-left"></i>'
    ],
    responsive:{
      0: {
        nav: false
      },
      1199: {
        nav: true
      }
    },
  });

});



