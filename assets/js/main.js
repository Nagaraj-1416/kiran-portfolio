(function () {
  "use strict";

  // Toggle .scrolled class on scroll
  function toggleScrolled() {
    const body = document.querySelector('body');
    const header = document.querySelector('#header');
    if (!header.classList.contains('scroll-up-sticky') &&
        !header.classList.contains('sticky-top') &&
        !header.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // Mobile nav toggle
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn?.addEventListener('click', mobileNavToogle);

  // Hide nav on same-page click
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  // Mobile nav dropdowns
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(drop => {
    drop.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  // Scroll top button
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

  // AOS init
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  // PureCounter init
  new PureCounter();

  // GLightbox init
  const glightbox = GLightbox({ selector: '.glightbox' });

  /**
   * Portfolio section – dynamic data
   */
  const portfolioData = [
    { title: "Poster Design 1", category: "poster", image: "assets/img/posters/poster-1.png", description: "Bold and creative poster.", detailsPage: "portfolio-details.html" },
    { title: "Thumbnail Design", category: "thumbnail", image: "assets/img/thumbnails/thumb-1.jpg", description: "Eye-catching thumbnail design.", detailsPage: "portfolio-details.html" },
    { title: "Carousel Slide", category: "carousels", image: "assets/img/carousels/carousel-1.png", description: "Instagram carousel for promotions.", detailsPage: "portfolio-details.html" },
    { title: "Logo Design", category: "logos", image: "assets/img/logos/logo-1.png", description: "Clean and modern logo.", detailsPage: "portfolio-details.html" },
    { title: "Logo Design", category: "logos", image: "assets/img/logos/logo-2.png", description: "Clean and modern logo.", detailsPage: "portfolio-details.html" },
    { title: "Logo Design", category: "logos", image: "assets/img/logos/logo-3.png", description: "Clean and modern logo.", detailsPage: "portfolio-details.html" },
    { title: "Package Design", category: "package", image: "assets/img/packages/package-1.png", description: "Packaging layout for product.", detailsPage: "portfolio-details.html" },
    { title: "Pamplet Design", category: "pamplet", image: "assets/img/pamplets/pamplet-1.jpg", description: "Informative pamplet layout.", detailsPage: "portfolio-details.html" },
    { title: "Card Design", category: "cards", image: "assets/img/cards/card-1.png", description: "Elegant business card.", detailsPage: "portfolio-details.html" },
    { title: "Poster Design 2", category: "poster", image: "assets/img/posters/poster-2.png", description: "Event promotional poster.", detailsPage: "portfolio-details.html" }
  ];

  const portfolioContainer = document.querySelector('#portfolioContainer');

  if (portfolioContainer) {
    // Generate HTML dynamically
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
            <a href="${item.detailsPage}" title="More Details" class="details-link">
              <i class="bi bi-link-45deg"></i>
            </a>
          </div>
        </div>`;
      portfolioContainer.insertAdjacentHTML('beforeend', html);
    });

    // Initialize Isotope after images are loaded
    imagesLoaded(portfolioContainer, function () {
      const iso = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry'
      });

      // Filter buttons
      document.querySelectorAll('.portfolio-filters li').forEach(filterBtn => {
        filterBtn.addEventListener('click', function () {
          document.querySelector('.portfolio-filters .filter-active')?.classList.remove('filter-active');
          this.classList.add('filter-active');
          iso.arrange({ filter: this.getAttribute('data-filter') });
          aosInit();
        });
      });
    });
  }

})();
