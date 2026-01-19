// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {
  
  // Récupérer les éléments
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  
  // Vérifier qu'ils existent
  if (!burgerBtn || !mobileMenu) {
    console.log("Problème : éléments non trouvés");
    return;
  }
  
  // Fonction pour ouvrir/fermer
  function toggleMenu() {
    // Ajoute/enlève la classe "active"
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    
    // Empêche de scroller quand le menu est ouvert
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  // Fonction pour fermer seulement
  function closeMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    burgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Quand on clique sur le bouton burger
  burgerBtn.addEventListener('click', toggleMenu);
  
  // Quand on clique sur le fond gris
  menuOverlay.addEventListener('click', closeMenu);
  
  // Quand on clique sur un lien du menu
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Fermer avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
  
});

// ========== CARROUSEL HERO ==========
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!slides.length) {
    console.log("Aucun carrousel trouvé");
    return;
  }
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  function goToSlide(n) {
    // Enlever 'active' de l'actuel
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Calculer le nouvel index
    currentSlide = (n + totalSlides) % totalSlides;
    
    // Ajouter 'active' au nouveau
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // Événements
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Auto-slide
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Arrêter auto-slide au survol
  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  }
  
  console.log("Carrousel prêt !");
}

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', function() {
  initBurgerMenu();
  initCarousel();
});

// ========== PAGE DE CHARGEMENT ==========
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressFill = document.querySelector('.progress-fill');
  
  if (!loadingScreen) {
    console.log("Écran de chargement non trouvé");
    return;
  }
  
  console.log("Page de chargement initialisée");
  
  // Animation de la barre
  if (progressFill) {
    progressFill.style.animation = 'loading 2.5s ease-in-out forwards';
  }
  
  // Fonction pour cacher l'écran
  function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');
    
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      console.log("Page de chargement terminée");
    }, 800);
  }
  
  // Événement quand tout est chargé
  window.addEventListener('load', hideLoadingScreen);
  
  // Plan B après 3 secondes max
  setTimeout(hideLoadingScreen, 3000);
}

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', function() {
  // ⭐ IMPORTANT : Appeler initLoadingScreen() EN PREMIER
  initLoadingScreen();
  
  // Ensuite les autres
  initBurgerMenu();
  initCarousel();
});

