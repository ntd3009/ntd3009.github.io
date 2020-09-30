$(document).ready(function () {
  const _this = jQuery(this);

  const header = document.getElementById('header');
  const btnOpenNavHeader = document.getElementById('js-show-hide-navbar');
  const navbar = document.getElementById('navbar-header');
  const goTopBtn = document.getElementById('js-go-top');

  // go to top btn
  let goTop = function () {
    goTopBtn.addEventListener('click', function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
    window.addEventListener("scroll", function () {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        goTopBtn.style.display = "flex";

      } else {
        goTopBtn.style.display = "none";
      }
    });
  }
  goTop()
  //  sticky header
  let stickyHeader = function () {
    let stickyStatus = false;
    window.addEventListener("scroll", function () {
      let sticky = header.offsetTop;
      let y = pageYOffset;
      if (y > sticky) {
        if (!stickyStatus) {
          stickyStatus = true;
          header.classList.add('sticky', 'header-moved-up');
        }
        if (y > (sticky + 680)) {
          header.classList.remove('header-moved-up');
        }
      } else {
        if (stickyStatus) {
          stickyStatus = false;
          header.classList.remove('sticky');
        }
      }
    })
  }
  stickyHeader();
  // header mobile
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

      let megaDropLv1 = _this.find('.nav-mobile .mega-drop-lv1');
      let megaDropLv2 = _this.find('.nav-mobile .mega-drop-lv2');

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

  // client - owl slider
  _this.find('.clients .owl-carousel.client-items').owlCarousel({
    margin: 30,
    nav: false,
    dots: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 8000,
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
  // counter
  let counterAction = function () {
    let counter = _this.find('.js-count');

    function startCounter() {
      counter.each(function () {
        let that = jQuery(this);
        let countStart = that.attr('data-start')
        let countTo = that.attr('data-end');
        that.text(countStart);
        jQuery({
          countNum: that.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 3000,
          easing: 'linear',
          step: function () {
            that.text(setNumber(that, this.countNum));
          },
          complete: function () {
            that.text(setNumber(that, this.countNum));
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
    window.addEventListener('scroll', function () {
      if (isAnyPartOfElementInViewport(counter[0])) {
        startCounter();
      }
    });
  }
  counterAction();

});