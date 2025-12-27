// Admissions Page Interactive Features

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

// Smooth scroll for any anchor links
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

// Add hover effects to table rows
const enhanceTableInteractivity = () => {
  const tableRows = document.querySelectorAll('.fees-table tbody tr');
  
  tableRows.forEach((row, index) => {
    // Stagger animation on page load
    row.style.opacity = '0';
    row.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
      row.style.transition = 'all 0.6s ease-out';
      row.style.opacity = '1';
      row.style.transform = 'translateX(0)';
    }, 300 + (index * 150));

    // Add click to highlight effect
    row.addEventListener('click', function() {
      tableRows.forEach(r => r.style.background = '');
      
      if (index % 2 === 0) {
        this.style.background = 'linear-gradient(135deg, #e6f2ff, #cce5ff)';
      } else {
        this.style.background = 'linear-gradient(135deg, #e6f2ff, #cce5ff)';
      }
      
      setTimeout(() => {
        this.style.background = '';
      }, 2000);
    });
  });
};

// Add sparkle effect to sections on hover
const addSparkleEffect = () => {
  const sections = document.querySelectorAll('.section h2');
  
  sections.forEach(heading => {
    heading.addEventListener('mouseenter', function() {
      createSparkles(this);
    });
  });
};

const createSparkles = (element) => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
      `;
      
      const rect = element.getBoundingClientRect();
      sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
      sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
      
      document.body.appendChild(sparkle);
      
      const animation = sparkle.animate([
        { 
          transform: 'translateY(0) scale(1)', 
          opacity: 1 
        },
        { 
          transform: `translateY(-${30 + Math.random() * 20}px) scale(0)`, 
          opacity: 0 
        }
      ], {
        duration: 800 + Math.random() * 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });
      
      animation.onfinish = () => sparkle.remove();
    }, i * 100);
  }
};

// Animate numbers in fees table
const animateNumbers = () => {
  const numberCells = document.querySelectorAll('.fees-table tbody td:not(:first-child)');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const cell = entry.target;
        const finalValue = cell.textContent.replace(/,/g, '');
        const duration = 1000;
        const steps = 30;
        const increment = finalValue / steps;
        let current = 0;
        
        cell.dataset.animated = 'true';
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
          }
          cell.textContent = Math.floor(current).toLocaleString();
        }, duration / steps);
      }
    });
  }, observerOptions);
  
  numberCells.forEach(cell => observer.observe(cell));
};

// Add progress indicator for list items
const addProgressIndicators = () => {
  const orderedLists = document.querySelectorAll('.section ol');
  
  orderedLists.forEach(list => {
    const items = list.querySelectorAll('li');
    const totalItems = items.length;
    
    items.forEach((item, index) => {
      item.addEventListener('click', function() {
        this.style.background = 'linear-gradient(135deg, #d4f1f4, #cfe8fc)';
        this.style.borderColor = '#667eea';
        
        // Create a checkmark overlay
        const check = document.createElement('span');
        check.textContent = '✓';
        check.style.cssText = `
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%) scale(0);
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        this.appendChild(check);
        
        setTimeout(() => {
          check.style.transform = 'translateY(-50%) scale(1)';
        }, 10);
      });
    });
  });
};

// Add floating particles background
const createFloatingParticles = () => {
  const particleCount = 15;
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  `;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${4 + Math.random() * 6}px;
      height: ${4 + Math.random() * 6}px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4));
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${15 + Math.random() * 10}s infinite ease-in-out;
      animation-delay: ${Math.random() * 5}s;
      filter: blur(1px);
    `;
    container.appendChild(particle);
  }
  
  document.body.insertBefore(container, document.body.firstChild);
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { 
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      33% { 
        transform: translate(${-50 + Math.random() * 100}px, ${-50 + Math.random() * 100}px) scale(1.2);
        opacity: 0.6;
      }
      66% { 
        transform: translate(${-50 + Math.random() * 100}px, ${-50 + Math.random() * 100}px) scale(0.8);
        opacity: 0.4;
      }
    }
  `;
  document.head.appendChild(style);
};

// Parallax effect on scroll
const addParallaxEffect = () => {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed * 0.1);
      section.style.transform = `translateY(${yPos}px)`;
    });
  });
};

// Initialize all features when DOM is ready
const createHeroSlides = () => {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  const slides = [
    'images/campus.jpg',
    'images/football.jpg',
    'images/graduation.jpg'
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

  // Replace any existing slider/indicators (in case index.js inserted defaults)
  heroSection.querySelector('.hero-slider')?.remove();
  heroSection.querySelector('.slider-indicators')?.remove();
  heroSection.insertAdjacentHTML('afterbegin', sliderHTML);
};

document.addEventListener('DOMContentLoaded', () => {
  createHeroSlides();
  // Initialize hero slider behaviors after injecting slides
  if (window.initHeroSliders) window.initHeroSliders();
  revealOnScroll();
  smoothScrollLinks();
  enhanceTableInteractivity();
  addSparkleEffect();
  animateNumbers();
  addProgressIndicators();
  createFloatingParticles();
  addParallaxEffect();
  
  console.log('✨ Admissions page features loaded successfully!');
});

// Add smooth entry animation for the entire page
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});