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
document.addEventListener('DOMContentLoaded', () => {
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