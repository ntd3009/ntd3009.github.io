$(document).ready(function () {
  const $ = jQuery(this);

  const header = document.getElementById('header');
  const btnOpenNavHeader = document.getElementById('js-show-hide-navbar');
  const navbar = document.getElementById('navbar-header');

  const goTopBtn = document.getElementById('js-go-top');
  goTopBtn.addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  let stickyHeader = function () {
    var sticky = header.offsetTop;
    if(window.pageYOffset > sticky) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  let openNavbar = function () {
    btnOpenNavHeader.addEventListener('click', function () {
      navbar.classList.toggle('open');
    });
  };

  let megaMenuRps = function () {
    const mb = window.matchMedia("(max-width: 991px)");
    if (mb.matches) {
      if (!navbar.classList.contains('nav-mobile')) {
        navbar.classList.add('nav-mobile');
      }

      let megaDropLv1 = $.find('.nav-mobile .mega-drop-lv1');
      let megaDropLv2 = $.find('.nav-mobile .mega-drop-lv2');

      let removeAllActive = function (items) {
        items.each(function (i) {
          let hasClass = this.classList.contains('active');
          if (hasClass) {
            this.classList.remove('active');
          }
        });
      }

      let eventAc = function (dom, dom2) {
        let heads = dom.children('.btn-drop-menu');
        heads.each(function (i) {
          this.addEventListener('click', () => {
            let wrap = this.parentNode;
            let currentHasAc = wrap.classList.contains('active');
            if (!currentHasAc) {
              removeAllActive(dom);
              if (dom2) {
                removeAllActive(dom2);
              }
              wrap.classList.add('active');
            } else {
              removeAllActive(dom);
              if (dom2) {
                removeAllActive(dom2);
              }
            }
          });
        });
      }

      openNavbar();
      eventAc(megaDropLv1, megaDropLv2);
      eventAc(megaDropLv2);
    } else {
      if (navbar.classList.contains('nav-mobile')) {
        navbar.classList.remove('nav-mobile')
      }
    }

    window.addEventListener('resize', function () {
      megaMenuRps();
      if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
      }
    });
  }
  megaMenuRps();

  // 
  // $.find('.hero [data-fancybox]').fancybox({
  //   youtube: {
  //     controls: 1,
  //     showinfo: 0
  //   },
  //   vimeo: {
  //     color: 'f00'
  //   }
  // });
  //
  $.find('.clients .owl-carousel.client-items').owlCarousel({
    margin: 30,
    nav: false,
    dots: false,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      480: {
        items: 3
      },
      992: {
        items: 5
      }
    }
  });
  //
  let counter = $.find('.js-count');

  function startCounter() {
    counter.each(function () {
      let $ = jQuery(this);
      let countStart = $.attr('data-start')
      let countTo = $.attr('data-end');
      $.text(countStart);
      jQuery({
        countNum: $.text()
      }).animate({
        countNum: countTo
      }, {
        duration: 3000,
        easing: 'linear',
        step: function () {
          $.text(setNumber($, this.countNum));
        },
        complete: function () {
          $.text(setNumber($, this.countNum));
        }
      });
    });
  }

  function setNumber($this, num) {
    var rs = Math.floor(num);
    return rs;
  }

  function isAnyPartOfElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
  }
  // 
  let goTop = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      goTopBtn.style.display = "flex";

    } else {
      goTopBtn.style.display = "none";
    }
  }
  // 

  jQuery(window).on('scroll resize', function () {
    if (isAnyPartOfElementInViewport(counter[0])) {
      startCounter();
      jQuery(window).off('scroll resize');
    }
    // if(jQuery(window).width() >= 992) {
    // }
    stickyHeader();
    goTop()

  }).trigger('scroll resize');
});