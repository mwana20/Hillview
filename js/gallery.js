// Gallery Page Interactive Features

// Create lightbox modal
const createLightbox = () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>
    <button class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>
    <div class="lightbox-content">
      <img src="" alt="">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);
  return lightbox;
};

// Initialize lightbox functionality
const initLightbox = () => {
  const lightbox = createLightbox();
  const lightboxImg = lightbox.querySelector('.lightbox-content img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  let currentImages = [];
  let currentIndex = 0;

  // Collect all gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('p');
    
    currentImages.push({
      src: img.src,
      alt: img.alt,
      caption: caption ? caption.textContent : ''
    });

    // Click to open lightbox
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const updateLightboxImage = () => {
    const current = currentImages[currentIndex];
    lightboxImg.src = current.src;
    lightboxImg.alt = current.alt;
    lightboxCaption.textContent = current.caption;
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
    animateTransition('next');
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
    animateTransition('prev');
  };

  const animateTransition = (direction) => {
    const content = lightbox.querySelector('.lightbox-content');
    content.style.animation = 'none';
    setTimeout(() => {
      content.style.animation = 'zoomIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }, 10);
  };

  // Event listeners
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
};

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

// Lazy loading for images
const lazyLoadImages = () => {
  const images = document.querySelectorAll('.gallery-item img');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const parent = img.closest('.gallery-item');
        
        parent.classList.add('loading');
        
        img.addEventListener('load', () => {
          parent.classList.remove('loading');
          img.style.opacity = '0';
          setTimeout(() => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
          }, 10);
        });
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  images.forEach(img => imageObserver.observe(img));
};

// Add parallax effect to gallery items
const addParallaxEffect = () => {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach((item, index) => {
          const speed = 0.05 + (index % 3) * 0.02;
          const yPos = -(scrolled * speed);
          item.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
};

// Create floating particles background
const createParticlesBackground = () => {
  const container = document.createElement('div');
  container.className = 'particles-bg';
  
  const colors = [
    'rgba(102, 126, 234, 0.3)',
    'rgba(118, 75, 162, 0.3)',
    'rgba(240, 147, 251, 0.3)'
  ];
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = `${4 + Math.random() * 8}px`;
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    
    container.appendChild(particle);
  }
  
  document.body.insertBefore(container, document.body.firstChild);
};

// Add hover tilt effect to gallery items
const addTiltEffect = () => {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
};

// Add sparkle effect on image hover
const addSparkleEffect = () => {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach(item => {
    item.addEventListener('mouseenter', function() {
      createSparkles(this);
    });
  });
};

const createSparkles = (element) => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, #fff, #f093fb);
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
      `;
      
      const rect = element.getBoundingClientRect();
      sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
      sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
      
      document.body.appendChild(sparkle);
      
      const animation = sparkle.animate([
        { 
          transform: 'translateY(0) scale(1) rotate(0deg)', 
          opacity: 1 
        },
        { 
          transform: `translateY(-${40 + Math.random() * 20}px) scale(0) rotate(${Math.random() * 360}deg)`, 
          opacity: 0 
        }
      ], {
        duration: 1000 + Math.random() * 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });
      
      animation.onfinish = () => sparkle.remove();
    }, i * 80);
  }
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

// Add image loading effect
const addImageLoadEffect = () => {
  const images = document.querySelectorAll('.gallery-item img');
  
  images.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.addEventListener('load', function() {
        this.style.transition = 'opacity 0.6s ease';
        this.style.opacity = '1';
      });
    }
  });
};

// Category filter functionality (if you add filter buttons)
const initCategoryFilter = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.category;
      
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
          item.style.animation = 'itemAppear 0.6s ease-out forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
};

// Add counter animation for sections
const addSectionCounter = () => {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach((section, index) => {
    const counter = document.createElement('div');
    counter.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 20px;
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
      animation: pulse 2s infinite;
    `;
    counter.textContent = index + 1;
    section.style.position = 'relative';
    section.appendChild(counter);
  });
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  `;
  document.head.appendChild(style);
};

// Initialize all features
const createHeroSlides = () => {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  const slides = [
    'images/campus.jpg',
    'images/football.jpg',
    'images/speechday.jpg'
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
  initLightbox();
  revealOnScroll();
  lazyLoadImages();
  addParallaxEffect();
  createParticlesBackground();
  addTiltEffect();
  addSparkleEffect();
  smoothScrollLinks();
  addImageLoadEffect();
  addSectionCounter();
  
  // Initialize filter if buttons exist
  if (document.querySelector('.filter-btn')) {
    initCategoryFilter();
  }
  
  console.log('✨ Gallery features loaded successfully!');
});

// Page entrance animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
  let touchStartX = 0;
  let touchEndX = 0;
  
  const lightbox = document.querySelector('.lightbox');
  
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next image
          document.querySelector('.lightbox-next')?.click();
        } else {
          // Swipe right - previous image
          document.querySelector('.lightbox-prev')?.click();
        }
      }
    };
  }
}