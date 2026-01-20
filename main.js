// ========== VARIABLES GLOBALES ==========
let burgerMenuInitialized = false;
let carouselInitialized = false;
let testimonialsCarouselInitialized = false;

// ========== MENU BURGER ==========
function initBurgerMenu() {
  if (burgerMenuInitialized) return;
  
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  
  if (!burgerBtn || !mobileMenu) {
    console.log("Éléments de menu non trouvés");
    return;
  }
  
  function toggleMenu() {
    const isActive = mobileMenu.classList.toggle('active');
    menuOverlay?.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  }
  
  function closeMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay?.classList.remove('active');
    burgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Gestionnaires d'événements
  burgerBtn.addEventListener('click', toggleMenu);
  menuOverlay?.addEventListener('click', closeMenu);
  
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
  
  burgerMenuInitialized = true;
  console.log("Menu burger initialisé");
}

// ========== CARROUSEL GÉNÉRIQUE ==========
function createCarousel(config) {
  const { 
    slideSelector, 
    dotSelector, 
    prevBtnSelector, 
    nextBtnSelector,
    containerSelector,
    autoSlideInterval = 5000
  } = config;
  
  const slides = document.querySelectorAll(slideSelector);
  const dots = document.querySelectorAll(dotSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  const container = document.querySelector(containerSelector);
  
  if (!slides.length) return null;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;
  
  function goToSlide(n) {
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    
    currentSlide = (n + totalSlides) % totalSlides;
    
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  function startAutoSlide() {
    if (autoSlideInterval > 0) {
      slideInterval = setInterval(nextSlide, autoSlideInterval);
    }
  }
  
  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }
  
  // Initialisation
  slides[0]?.classList.add('active');
  dots[0]?.classList.add('active');
  
  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  if (container && autoSlideInterval > 0) {
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
    startAutoSlide();
  }
  
  return { goToSlide, nextSlide, prevSlide, stopAutoSlide, startAutoSlide };
}

// ========== CARROUSELS SPÉCIFIQUES ==========
function initHeroCarousel() {
  if (carouselInitialized) return;
  
  const heroCarousel = createCarousel({
    slideSelector: '.carousel-slide',
    dotSelector: '.dot',
    prevBtnSelector: '.prev-btn',
    nextBtnSelector: '.next-btn',
    containerSelector: '.hero-carousel',
    autoSlideInterval: 5000
  });
  
  if (heroCarousel) {
    carouselInitialized = true;
    console.log("Carrousel hero initialisé");
  }
}

function initTestimonialsCarousel() {
  if (testimonialsCarouselInitialized) return;
  
  const testimonialCarousel = createCarousel({
    slideSelector: '.testimonial-slide',
    dotSelector: '.testimonial-dot',
    prevBtnSelector: '.prev-arrow',
    nextBtnSelector: '.next-arrow',
    containerSelector: '.testimonials-carousel',
    autoSlideInterval: 6000
  });
  
  if (testimonialCarousel) {
    // Navigation clavier spécifique au carrousel témoignages
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') testimonialCarousel.prevSlide();
      if (e.key === 'ArrowRight') testimonialCarousel.nextSlide();
    });
    
    testimonialsCarouselInitialized = true;
    console.log("Carrousel témoignages initialisé");
  }
}

// ========== PAGE DE CHARGEMENT ==========
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressFill = document.querySelector('.progress-fill');
  
  if (!loadingScreen) {
    console.log("Écran de chargement non trouvé");
    return;
  }
  
  // Animation de la barre
  if (progressFill) {
    progressFill.style.animation = 'loading 2.5s ease-in-out forwards';
  }
  
  function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      console.log("Page de chargement terminée");
    }, 800);
  }
  
  // Combiner les deux déclencheurs avec Promise.race
  const pageLoad = new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve);
    }
  });
  
  const timeout = new Promise(resolve => {
    setTimeout(resolve, 3000);
  });
  
  Promise.race([pageLoad, timeout]).then(hideLoadingScreen);
}

// ========== MENU DE RECHERCHE ==========
function initSearchModal() {
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  
  if (!searchBtn || !searchModal) {
    console.log("Éléments de recherche non trouvés");
    return;
  }
  
  const closeSearch = document.getElementById('closeSearch');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchForm = document.getElementById('searchForm');
  
  let adultsCount = 2;
  let childrenCount = 0;
  const adultsDisplay = document.getElementById('adultsCount');
  const childrenDisplay = document.getElementById('childrenCount');
  
  function openSearch() {
    searchModal.classList.add('active');
    searchOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      document.getElementById('destination')?.focus();
    }, 300);
  }
  
  function closeSearchModal() {
    searchModal.classList.remove('active');
    searchOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function updateTravelers(type, increment) {
    if (type === 'adults') {
      adultsCount = Math.max(1, adultsCount + increment);
      if (adultsDisplay) adultsDisplay.textContent = adultsCount;
    } else if (type === 'children') {
      childrenCount = Math.max(0, childrenCount + increment);
      if (childrenDisplay) childrenDisplay.textContent = childrenCount;
    }
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault();
    
    const destination = document.getElementById('destination')?.value || '';
    const checkin = document.getElementById('checkin')?.value || '';
    const checkout = document.getElementById('checkout')?.value || '';
    
    console.log("Recherche envoyée :", {
      destination,
      checkin,
      checkout,
      adults: adultsCount,
      children: childrenCount
    });
    
    alert(`Recherche de voyage à ${destination || "destination inconnue"} pour ${adultsCount + childrenCount} personnes`);
    closeSearchModal();
  }
  
  // Événements
  searchBtn.addEventListener('click', openSearch);
  closeSearch?.addEventListener('click', closeSearchModal);
  searchOverlay?.addEventListener('click', closeSearchModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeSearchModal();
    }
  });
  
  document.querySelectorAll('.traveler-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      const isPlus = btn.classList.contains('plus');
      updateTravelers(type, isPlus ? 1 : -1);
    });
  });
  
  searchForm?.addEventListener('submit', handleSearchSubmit);
  
  // Dates
  const today = new Date().toISOString().split('T')[0];
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  
  if (checkinInput) {
    checkinInput.min = today;
    checkinInput.addEventListener('change', function() {
      if (checkoutInput) checkoutInput.min = this.value;
    });
  }
  
  if (checkoutInput) checkoutInput.min = today;
  
  console.log("Menu de recherche initialisé");
}

// ========== INITIALISATION GLOBALE ==========
document.addEventListener('DOMContentLoaded', function() {
  console.time("Initialisation totale");
  
  // Initialiser dans l'ordre optimal
  initLoadingScreen();
  initBurgerMenu();
  initHeroCarousel();
  initTestimonialsCarousel();
  initSearchModal();
  
  console.timeEnd("Initialisation totale");
  
  // Pour le débogage
  window.app = {
    burgerMenu: burgerMenuInitialized,
    heroCarousel: carouselInitialized,
    testimonialsCarousel: testimonialsCarouselInitialized
  };
});