// ================= HERO SLIDER FUNCTIONALITY =================
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize hero sliders on all sections (supports multiple .hero-section instances)
  const heroSections = document.querySelectorAll('.hero-section');

  heroSections.forEach((heroSection) => {
    // If the page doesn't provide its own slider, insert a default 3-slide slider
    if (!heroSection.querySelector('.hero-slider')) {
      const sliderHTML = `
        <div class="hero-slider">
          <div class="hero-slide active"></div>
          <div class="hero-slide"></div>
          <div class="hero-slide"></div>
        </div>
        <div class="slider-indicators">
          <span class="indicator active" data-slide="0"></span>
          <span class="indicator" data-slide="1"></span>
          <span class="indicator" data-slide="2"></span>
        </div>
      `;
      heroSection.insertAdjacentHTML('afterbegin', sliderHTML);
    }

    // Slider functionality (works with any number of .hero-slide elements per section)
    const slides = heroSection.querySelectorAll('.hero-slide');
    const indicators = heroSection.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
      // Remove active class from all slides and hide captions
      slides.forEach(slide => {
        slide.classList.remove('active');
        const cap = slide.querySelector('.slide-caption');
        if (cap) cap.setAttribute('aria-hidden', 'true');
      });
      indicators.forEach(indicator => indicator.classList.remove('active'));

      // Add active class to current slide and indicator (guard index)
      const idx = index % slides.length;
      slides[idx].classList.add('active');
      const activeCap = slides[idx].querySelector('.slide-caption');
      if (activeCap) activeCap.setAttribute('aria-hidden', 'false');
      if (indicators[idx]) indicators[idx].classList.add('active');
    }

    // Initialize caption aria-hidden state
    slides.forEach((slide) => {
      const cap = slide.querySelector('.slide-caption');
      if (cap) cap.setAttribute('aria-hidden', slide.classList.contains('active') ? 'false' : 'true');
    });

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    // Auto-advance slides
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Manual slide control via indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);

        // Reset timer when manually changing slides
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
      });
    });

    // Pause slider on hover
    heroSection.addEventListener('mouseenter', () => {
      clearInterval(slideTimer);
    });

    heroSection.addEventListener('mouseleave', () => {
      slideTimer = setInterval(nextSlide, slideInterval);
    });
  });
  
  // ================= MOBILE HAMBURGER MENU =================
  const header = document.querySelector('.site-header');
  const headerFlex = document.querySelector('.header-flex');
  const nav = document.querySelector('.main-nav');
  
  // Create hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'mobile-menu-btn';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  
  // Create overlay for mobile menu
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
  
  // Insert hamburger button into header
  headerFlex.appendChild(hamburger);
  
  // Toggle menu function
  function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  // Hamburger click event
  hamburger.addEventListener('click', toggleMenu);
  
  // Overlay click event (close menu when clicking outside)
  overlay.addEventListener('click', toggleMenu);
  
  // Close menu when clicking a nav link
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // ================= SMOOTH SCROLLING =================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ================= SCROLL ANIMATIONS =================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    '.vmv-card, .leader-card, .news-card, .academic-list li'
  );
  
  animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
  
  // ================= HEADER SCROLL EFFECT =================
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow to header on scroll
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
  });
  
  // ================= SCROLL TO TOP BUTTON =================
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--accent-color);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(scrollTopBtn);
  
  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.visibility = 'visible';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top functionality
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.background = '#e69516';
  });
  
  scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.background = '#f5a623';
  });
  
  // ================= CARD HOVER EFFECTS =================
  const cards = document.querySelectorAll('.vmv-card, .leader-card, .news-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });
  
  // ================= ACTIVE LINK HIGHLIGHT =================
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.main-nav a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNav);
  
  // ================= TOUCH SWIPE FOR MOBILE SLIDER =================
  let touchStartX = 0;
  let touchEndX = 0;
  
  heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    }
  }
  
  // ================= MOBILE MENU ANIMATION =================
  // Add staggered animation to menu items
  navLinks.forEach((link, index) => {
    link.style.transition = `all 0.3s ease ${index * 0.05}s`;
  });
  
  // ================= PERFORMANCE OPTIMIZATION =================
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // ================= PREVENT MENU CLOSE ON SCROLL =================
  let isScrolling;
  window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      // Scroll ended
    }, 66);
  }, false);
  
  // ================= ACCESSIBILITY IMPROVEMENTS =================
  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      toggleMenu();
    }
  });
  
  // Focus trap in mobile menu
  const focusableElements = nav.querySelectorAll('a, button');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  nav.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });
  
  // ================= PRELOAD IMAGES =================
  // You can add actual image URLs here
  const imageUrls = [
    'images/hero1.jpg',
    'images/hero2.jpg',
    'images/hero3.jpg'
  ];
  
  // Preload images for smooth transitions
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
  
  console.log('🎓 Hill View College website loaded successfully!');
  console.log('📱 Mobile menu ready');
  console.log('🖼️ Hero slider active');
});

// ================= FORM VALIDATION (if needed) =================
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#e74c3c';
        input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.2)';
      } else {
        input.style.borderColor = '#27ae60';
        input.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.2)';
      }
    });
    
    if (isValid) {
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.textContent = '✓ Form submitted successfully!';
      successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.5s ease;
      `;
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.style.opacity = '0';
        setTimeout(() => successMsg.remove(), 300);
      }, 3000);
      
      // Uncomment to actually submit
      // form.submit();
    } else {
      alert('⚠️ Please fill in all required fields.');
    }
  });
}