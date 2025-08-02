(function () {
  "use strict";

  /**
   * Scroll toggle class
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn?.addEventListener('click', mobileNavToogle);

  /**
   * Hide nav on same-page hash click
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle dropdowns in mobile nav
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * AOS init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Skills progress bar animation
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function () {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * PureCounter
   */
  new PureCounter();

  /**
   * Swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * GLightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
    openEffect: 'zoom',
    closeButton: true,
    loop: true,
    touchNavigation: true,
    zoomable: true
  });

  /**
   * Isotope layout
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') aosInit();
      }, false);
    });
  });

  /**
   * Dynamic portfolio rendering
   */
  const portfolioContainer = document.querySelector('#portfolioContainer');
  if (portfolioContainer) {
    const portfolioData = [
      { title: "Poster Design 1", category: "poster", image: "assets/img/posters/poster-1.png", description: "Bold and creative poster.", detailsPage: "portfolio-details.html" },
      { title: "Poster Design 2", category: "poster", image: "assets/img/posters/poster-2.png", description: "Event promotional poster.", detailsPage: "portfolio-details.html" },
      { title: "Thumbnail Design", category: "thumbnail", image: "assets/img/thumbnails/thumb-1.jpg", description: "Eye-catching thumbnail design.", detailsPage: "portfolio-details.html" },
      { title: "Carousel Slide", category: "carousels", image: "assets/img/carousels/carousel-1.png", description: "Instagram carousel for promotions.", detailsPage: "portfolio-details.html" },
      { title: "Logo Design 1", category: "logos", image: "assets/img/logos/logo-1.png", description: "Minimalist branding logo.", detailsPage: "portfolio-details.html" },
      { title: "Logo Design 2", category: "logos", image: "assets/img/logos/logo-2.png", description: "Symbolic clean logo.", detailsPage: "portfolio-details.html" },
      { title: "Package Design", category: "package", image: "assets/img/packages/package-1.png", description: "Packaging mockup.", detailsPage: "portfolio-details.html" },
      { title: "Pamplet Design", category: "pamplet", image: "assets/img/pamplets/pamplet-1.jpg", description: "Informative layout.", detailsPage: "portfolio-details.html" },
      { title: "Card Design", category: "cards", image: "assets/img/cards/card-1.png", description: "Elegant business card.", detailsPage: "portfolio-details.html" }
    ];

    portfolioData.forEach(item => {
      const html = `
        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-${item.category}">
          <img src="${item.image}" class="img-fluid" alt="${item.title}">
          <div class="portfolio-info">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <a href="${item.image}" title="${item.title}" data-gallery="portfolio-gallery" class="glightbox preview-link">
              <i class="bi bi-zoom-in"></i>
            </a>
          </div>
        </div>`;
      portfolioContainer.insertAdjacentHTML('beforeend', html);
    });

    // Init Isotope after images load
    imagesLoaded(portfolioContainer, function () {
      const iso = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry'
      });

      document.querySelectorAll('.portfolio-filters li').forEach(btn => {
        btn.addEventListener('click', function () {
          document.querySelector('.portfolio-filters .filter-active')?.classList.remove('filter-active');
          this.classList.add('filter-active');
          iso.arrange({ filter: this.getAttribute('data-filter') });
          aosInit();
        });
      });
    });

    GLightbox({ selector: '.glightbox' });
  }

})();
