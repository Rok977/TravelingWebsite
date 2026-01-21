// ========================================================
//  MAIN.JS - FICHIER PRINCIPAL DE NOTRE SITE DE VOYAGES
// ========================================================

// --------------------------------------------------------
//  SECTION 1 : LES VARIABLES GLOBALES
// --------------------------------------------------------

let burgerMenuInitialized = false;      // Pour le menu burger
let carouselInitialized = false;        // Pour le carrousel principal
let testimonialsCarouselInitialized = false; // Pour le carrousel des avis

// --------------------------------------------------------
//  SECTION 2 : LE MENU BURGER
// --------------------------------------------------------

function initBurgerMenu() {
  // Si le menu burger est déjà fait, on s'arrête
  if (burgerMenuInitialized) return;
  
  // On récupère les éléments dans le HTML
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  
  // On vérifie si tout existe
  if (!burgerBtn || !mobileMenu) {
    console.log("Oh non ! Je ne trouve pas les éléments du menu burger");
    return;
  }
  
  // Fonction pour ouvrir/fermer le menu
  function toggleMenu() {
    const isActive = mobileMenu.classList.toggle('active');
    menuOverlay?.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    
    // On bloque le défilement de la page quand le menu est ouvert
    document.body.style.overflow = isActive ? 'hidden' : '';
  }
  
  // Fonction pour juste fermer le menu
  function closeMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay?.classList.remove('active');
    burgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // ---------------------------------
  //  LES ÉVÉNEMENTS
  // ---------------------------------
  
  // 1. Quand on clique sur le bouton burger
  burgerBtn.addEventListener('click', toggleMenu);
  
  // 2. Quand on clique sur le fond gris
  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }
  
  // 3. Quand on clique sur un lien dans le menu
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // 4. Quand on appuie sur la touche Echap du clavier
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
  
  // On dit que le menu burger est prêt !
  burgerMenuInitialized = true;
  console.log("✅ Menu burger prêt !");
}

// --------------------------------------------------------
//  SECTION 3 : LE CARROUSEL GÉNÉRIQUE
// --------------------------------------------------------

// Fonction qui peut créer n'importe quel carrousel
function createCarousel(config) {
  // On récupère tous les paramètres donnés
  const { 
    slideSelector,        // Comment trouver les slides
    dotSelector,         // Comment trouver les petits points
    prevBtnSelector,     // Comment trouver le bouton "précédent"
    nextBtnSelector,     // Comment trouver le bouton "suivant"
    containerSelector,   // Comment trouver le conteneur principal
    autoSlideInterval = 5000  // Temps entre chaque slide automatique
  } = config;
  
  // On va chercher les éléments dans le HTML
  const slides = document.querySelectorAll(slideSelector);
  const dots = document.querySelectorAll(dotSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  const container = document.querySelector(containerSelector);
  
  // S'il n'y a pas de slides, on s'arrête
  if (!slides.length) return null;
  
  // Variables importantes pour le carrousel
  let currentSlide = 0;          // La slide actuelle (commence à 0)
  const totalSlides = slides.length; // Nombre total de slides
  let slideInterval;              // Pour le défilement automatique
  
  // Fonction pour aller à une slide précise
  function goToSlide(n) {
    // On enlève la classe 'active' de la slide actuelle
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    
    // On calcule la nouvelle slide
    currentSlide = (n + totalSlides) % totalSlides;
    
    // On ajoute la classe 'active' à la nouvelle slide
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }
  
  // Fonction pour aller à la slide suivante
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  // Fonction pour aller à la slide précédente
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // Fonction pour démarrer le défilement automatique
  function startAutoSlide() {
    if (autoSlideInterval > 0) {
      slideInterval = setInterval(nextSlide, autoSlideInterval);
    }
  }
  
  // Fonction pour arrêter le défilement automatique
  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }
  
  // ---------------------------------
  //  INITIALISATION DU CARROUSEL
  // ---------------------------------
  
  // On active la première slide et le premier point
  slides[0]?.classList.add('active');
  dots[0]?.classList.add('active');
  
  // Événement sur le bouton "précédent"
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }
  
  // Événement sur le bouton "suivant"
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  // Événements sur les points
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Si on veut un défilement automatique
  if (container && autoSlideInterval > 0) {
    // Quand la souris est sur le carrousel, on arrête
    container.addEventListener('mouseenter', stopAutoSlide);
    
    // Quand la souris quitte le carrousel, on recommence
    container.addEventListener('mouseleave', startAutoSlide);
    
    // On démarre le défilement automatique
    startAutoSlide();
  }
  
  // On retourne un objet avec toutes les fonctions
  return { 
    goToSlide,      // Pour aller à une slide précise
    nextSlide,      // Pour la slide suivante
    prevSlide,      // Pour la slide précédente
    stopAutoSlide,  // Pour arrêter le défilement auto
    startAutoSlide  // Pour démarrer le défilement auto
  };
}

// --------------------------------------------------------
//  SECTION 4 : LE CARROUSEL PRINCIPAL (HERO)
// --------------------------------------------------------

function initHeroCarousel() {
  // Si déjà fait, on ne refait pas
  if (carouselInitialized) return;
  
  // On crée le carrousel avec ses paramètres
  const heroCarousel = createCarousel({
    slideSelector: '.carousel-slide',
    dotSelector: '.dot',
    prevBtnSelector: '.prev-btn',
    nextBtnSelector: '.next-btn',
    containerSelector: '.hero-carousel',
    autoSlideInterval: 5000
  });
  
  // Si le carrousel a été créé avec succès
  if (heroCarousel) {
    carouselInitialized = true;
    console.log("✅ Carrousel principal prêt !");
  }
}

// --------------------------------------------------------
//  SECTION 5 : LE CARROUSEL DES TÉMOIGNAGES
// --------------------------------------------------------

function initTestimonialsCarousel() {
  // Si déjà fait, on ne refait pas
  if (testimonialsCarouselInitialized) return;
  
  // On crée le carrousel des témoignages
  const testimonialCarousel = createCarousel({
    slideSelector: '.testimonial-slide',
    dotSelector: '.testimonial-dot',
    prevBtnSelector: '.prev-arrow',
    nextBtnSelector: '.next-arrow',
    containerSelector: '.testimonials-carousel',
    autoSlideInterval: 6000
  });
  
  // Si le carrousel a été créé avec succès
  if (testimonialCarousel) {
    // On ajoute la navigation au clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') testimonialCarousel.prevSlide();
      if (e.key === 'ArrowRight') testimonialCarousel.nextSlide();
    });
    
    testimonialsCarouselInitialized = true;
    console.log("✅ Carrousel des témoignages prêt !");
  }
}

// --------------------------------------------------------
//  SECTION 6 : L'ÉCRAN DE CHARGEMENT
// --------------------------------------------------------

function initLoadingScreen() {
  // On récupère l'écran de chargement
  const loadingScreen = document.getElementById('loadingScreen');
  
  // On vérifie s'il existe
  if (!loadingScreen) {
    console.log("⚠️ Pas d'écran de chargement trouvé");
    return;
  }
  
  // On récupère aussi la barre de progression
  const progressFill = document.querySelector('.progress-fill');
  
  // Si on a une barre de progression, on l'anime
  if (progressFill) {
    progressFill.style.animation = 'loading 2.5s ease-in-out forwards';
  }
  
  // Fonction pour cacher l'écran de chargement
  function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');
    
    // Après un petit délai, on le cache complètement
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      console.log("✅ Page chargée !");
    }, 800);
  }
  
  // Méthode 1 : Attendre que la page soit chargée
  const pageLoad = new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve);
    }
  });
  
  // Méthode 2 : Attendre maximum 3 secondes
  const timeout = new Promise(resolve => {
    setTimeout(resolve, 3000);
  });
  
  // On utilise la première méthode qui termine
  Promise.race([pageLoad, timeout]).then(hideLoadingScreen);
}

// --------------------------------------------------------
//  SECTION 7 : LE DROPDOWN DE RECHERCHE (NOUVEAU !)
// --------------------------------------------------------

function initSearchDropdown() {
  // On récupère le bouton de recherche
  const btn = document.getElementById('searchBtn');
  
  // On récupère le dropdown (le menu qui descend)
  const dropdown = document.getElementById('searchDropdown');

  // Si un des deux n'existe pas, on s'arrête
  if (!btn || !dropdown) {
    console.log("⚠️ Éléments de recherche non trouvés");
    return;
  }

  // Quand on clique sur le bouton de recherche
  btn.addEventListener('click', () => {
    // On ajoute ou enlève la classe 'active'
    // toggle = si elle est là, on l'enlève, si elle n'est pas là, on l'ajoute
    dropdown.classList.toggle('active');
    
    console.log("✅ Dropdown de recherche cliqué !");
  });
}

// --------------------------------------------------------
//  SECTION 8 : LANCEMENT DE TOUT LE SITE
// --------------------------------------------------------

// Cette fonction est appelée quand la page est prête
document.addEventListener('DOMContentLoaded', function() {
  console.time("⏱️ Temps d'initialisation total");
  
  // On lance toutes nos fonctions dans l'ordre :
  initLoadingScreen();      // 1. Écran de chargement
  initBurgerMenu();         // 2. Menu burger
  initHeroCarousel();       // 3. Carrousel principal
  initTestimonialsCarousel(); // 4. Carrousel des avis
  initSearchDropdown();     // 5. Dropdown de recherche (Nouveau !)
  
  console.timeEnd("⏱️ Temps d'initialisation total");
  
  // Pour le débogage (optionnel)
  window.app = {
    burgerMenu: burgerMenuInitialized,
    heroCarousel: carouselInitialized,
    testimonialsCarousel: testimonialsCarouselInitialized
  };
  
  console.log("🎉 Tout est prêt ! Le site est initialisé.");
});

// --------------------------------------------------------
//  FIN DU FICHIER
// --------------------------------------------------------