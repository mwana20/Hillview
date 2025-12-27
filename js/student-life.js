// Student Life Page Interactive Features

// Scroll reveal animation
const revealOnScroll = () => {
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });
};

// Add hover effects to routine cards
const enhanceRoutineCards = () => {
  const cards = document.querySelectorAll('.routine-card, .club-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
};

// Add click interaction to activity list items
const enhanceActivityList = () => {
  const items = document.querySelectorAll('.activities-list li');
  
  items.forEach(item => {
    item.addEventListener('click', function() {
      this.style.background = 'linear-gradient(135deg, #d4f1f4, #cfe8fc)';
      
      setTimeout(() => {
        this.style.background = '';
      }, 1000);
    });
  });
};

// Smooth scroll for anchor links
const smoothScrollLinks = () => {
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
};

// Initialize all features when DOM is ready
const createHeroSlides = () => {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  const slides = [
    'images/football.jpg',
    'images/assembly.jpg',
    'images/campus.jpg'
  ];
  const gradient = 'linear-gradient(135deg, rgba(26,77,46,0.85), rgba(79,138,109,0.75))';
  const sliderHTML = `
    <div class="hero-slider">
      ${slides.map((src,i) => `<div class="hero-slide${i===0 ? ' active' : ''}" style="background-image: ${gradient}, url('${src}'); background-size: cover; background-position: center;"></div>`).join('')}
    </div>
    <div class="slider-indicators">
      ${slides.map((_,i) => `<span class="indicator${i===0 ? ' active' : ''}" data-slide="${i}"></span>`).join('')}
    </div>
  `;

  heroSection.querySelector('.hero-slider')?.remove();
  heroSection.querySelector('.slider-indicators')?.remove();
  heroSection.insertAdjacentHTML('afterbegin', sliderHTML);
};

document.addEventListener('DOMContentLoaded', () => {
  createHeroSlides();
  // Initialize hero slider behaviors after injecting slides
  if (window.initHeroSliders) window.initHeroSliders();
  revealOnScroll();
  enhanceRoutineCards();
  enhanceActivityList();
  smoothScrollLinks();
  
  console.log('✨ Student Life page features loaded successfully!');
});

// Page entrance animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});