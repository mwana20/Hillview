// ================= FOOTER ENHANCEMENTS =================

document.addEventListener('DOMContentLoaded', function() {

  // ================= NEWSLETTER FORM HANDLING =================
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        showNotification('⚠️ Please enter a valid email address', 'error');
        return;
      }
      
      // Show loading state
      const submitBtn = this.querySelector('button');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call (replace with actual API endpoint)
      setTimeout(() => {
        // Success
        showNotification('✓ Successfully subscribed to our newsletter!', 'success');
        emailInput.value = '';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Store subscription in localStorage (optional)
        localStorage.setItem('newsletter_subscribed', 'true');
        localStorage.setItem('newsletter_email', email);
      }, 1500);
    });
  }

  // ================= NOTIFICATION SYSTEM =================
  function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.footer-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `footer-notification ${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 18px 25px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
      color: white;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      font-weight: 600;
      font-size: 0.95rem;
      animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 3s;
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3.5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease forwards';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // ================= SOCIAL MEDIA LINK TRACKING =================
  const socialLinks = document.querySelectorAll('.footer-social a');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Optional: Add analytics tracking here
      const platform = this.getAttribute('aria-label');
      console.log(`Social link clicked: ${platform}`);
      
      // Add visual feedback
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });

  // ================= FOOTER LINK HOVER EFFECTS =================
  const footerLinks = document.querySelectorAll('.footer-column a');
  
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--accent-color);
        border-radius: 50%;
        left: 0;
        top: 50%;
        transform: translateY(-50%) scale(0);
        animation: ripple 0.6s ease;
      `;
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ================= SCROLL TO TOP WHEN FOOTER LINK CLICKED =================
  const footerLogoLink = document.querySelector('.footer-logo');
  
  if (footerLogoLink) {
    footerLogoLink.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#' || !this.getAttribute('href')) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  // ================= FOOTER ANIMATION ON SCROLL INTO VIEW =================
  const footer = document.querySelector('.site-footer');
  
  if (footer && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add('footer-visible');
          
          // Animate footer elements
          const footerElements = footer.querySelectorAll('.footer-column, .footer-school-info, .footer-contact');
          footerElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }, 100);
          });
        }
      });
    }, {
      threshold: 0.1
    });
    
    footerObserver.observe(footer);
  }

  // ================= CONTACT ITEM COPY TO CLIPBOARD =================
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.setAttribute('title', 'Click to copy');
    
    item.addEventListener('click', function() {
      const text = this.querySelector('p').textContent;
      
      // Copy to clipboard
      navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const originalBg = this.style.background;
        this.style.background = 'rgba(39, 174, 96, 0.2)';
        this.style.borderLeftColor = '#27ae60';
        
        showNotification('📋 Copied to clipboard!', 'success');
        
        setTimeout(() => {
          this.style.background = originalBg;
          this.style.borderLeftColor = 'var(--accent-color)';
        }, 1000);
      }).catch(() => {
        showNotification('⚠️ Failed to copy', 'error');
      });
    });
  });

  // ================= CURRENT YEAR AUTO-UPDATE =================
  const currentYearElement = document.querySelector('.footer-bottom p');
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYearElement.textContent.replace('2025', currentYear);
  }

  // ================= CHECK IF USER ALREADY SUBSCRIBED =================
  if (localStorage.getItem('newsletter_subscribed') === 'true') {
    const newsletterSection = document.querySelector('.footer-newsletter');
    if (newsletterSection) {
      const subscribedMessage = document.createElement('div');
      subscribedMessage.className = 'subscribed-message';
      subscribedMessage.innerHTML = `
        <div style="text-align: center; padding: 20px; color: var(--accent-color); font-weight: 600;">
          ✓ You're already subscribed! Check your email for updates.
        </div>
      `;
      newsletterSection.innerHTML = '';
      newsletterSection.appendChild(subscribedMessage);
    }
  }

  // ================= PERFORMANCE: LAZY LOAD FOOTER IMAGES =================
  const footerImages = document.querySelectorAll('.site-footer img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });
    
    footerImages.forEach(img => imageObserver.observe(img));
  }

  console.log('🎨 Epic footer loaded successfully!');
});

// ================= CSS ANIMATIONS (Add to your CSS or include here) =================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
  
  @keyframes ripple {
    from {
      transform: translateY(-50%) scale(0);
      opacity: 1;
    }
    to {
      transform: translateY(-50%) scale(10);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);