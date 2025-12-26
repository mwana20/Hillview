// Admissions Page JavaScript - Excludes Header & Footer

document.addEventListener('DOMContentLoaded', function() {
  
  // Animate sections on scroll (excluding header and footer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe only .section elements (not header or footer)
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Animate list items on scroll
  const listItems = document.querySelectorAll('.section ul li, .section ol li');
  listItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    const itemObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, observerOptions);
    
    itemObserver.observe(item);
  });

  // Add counter animation for fees
  const feesCells = document.querySelectorAll('.fees-table tbody td:nth-child(2), .fees-table tbody td:nth-child(3)');
  
  feesCells.forEach(cell => {
    const text = cell.textContent.trim();
    const number = parseInt(text.replace(/,/g, ''));
    
    if (!isNaN(number)) {
      cell.textContent = '0';
      
      const cellObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateValue(cell, 0, number, 1500);
            cellObserver.unobserve(cell);
          }
        });
      }, { threshold: 0.5 });
      
      cellObserver.observe(cell);
    }
  });

  // Counter animation function
  function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuad = progress => progress * (2 - progress);
      const currentValue = Math.floor(start + (end - start) * easeOutQuad(progress));
      
      element.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }

  // Smooth scroll for anchor links
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

  // Toggle hero section visibility
function toggleHero() {
    const heroSection = document.getElementById('heroSection');
    const toggleBtn = document.querySelector('.hero-toggle-btn');
    
    if (heroSection.style.display === 'none' || heroSection.style.display === '') {
        heroSection.style.display = 'flex';
        toggleBtn.textContent = 'Hide Hero Image';
        // Smooth scroll to hero section
        heroSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        heroSection.style.display = 'none';
        toggleBtn.textContent = 'Show Hero Image';
    }
}

// Optional: Show hero on page load after a delay (for demo purposes)
window.addEventListener('DOMContentLoaded', function() {
    // Uncomment the line below if you want the hero to appear automatically after 1 second
    // setTimeout(() => toggleHero(), 1000);
});

  // Add copy functionality to fees table
  const feesTable = document.querySelector('.fees-table');
  if (feesTable) {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;
      gap: 15px;
      margin: 20px 0;
      flex-wrap: wrap;
    `;

    // Copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Fees Structure';
    copyButton.className = 'copy-fees-btn';
    copyButton.style.cssText = `
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    `;
    
    copyButton.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
    });
    
    copyButton.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
    
    copyButton.addEventListener('click', function() {
      const rows = Array.from(feesTable.querySelectorAll('tr'));
      const text = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => cell.textContent.trim()).join('\t');
      }).join('\n');
      
      navigator.clipboard.writeText(text).then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = '✓ Copied!';
        copyButton.style.background = '#28a745';
        
        setTimeout(() => {
          copyButton.textContent = originalText;
          copyButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });

    // Print button
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Fees Structure';
    printButton.className = 'print-fees-btn';
    printButton.style.cssText = `
      padding: 12px 24px;
      background: #ffffff;
      color: #667eea;
      border: 2px solid #667eea;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('mouseenter', function() {
      this.style.background = '#667eea';
      this.style.color = 'white';
      this.style.transform = 'translateY(-2px)';
    });
    
    printButton.addEventListener('mouseleave', function() {
      this.style.background = 'white';
      this.style.color = '#667eea';
      this.style.transform = 'translateY(0)';
    });
    
    printButton.addEventListener('click', function() {
      window.print();
    });

    buttonContainer.appendChild(copyButton);
    buttonContainer.appendChild(printButton);
    feesTable.parentNode.insertBefore(buttonContainer, feesTable.nextSibling);
  }

  // Add floating "Apply Now" button
  const applyButton = document.createElement('a');
  applyButton.href = 'contact.html';
  applyButton.className = 'floating-apply-btn';
  applyButton.textContent = 'Apply Now';
  applyButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 16px 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
  `;
  
  applyButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.05)';
    this.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
  });
  
  applyButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
  });
  
  document.body.appendChild(applyButton);
  
  // Show/hide floating button on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      applyButton.style.opacity = '1';
      applyButton.style.pointerEvents = 'auto';
    } else {
      applyButton.style.opacity = '0';
      applyButton.style.pointerEvents = 'none';
    }
  });

  // Highlight table rows on hover with subtle animation
  const tableRows = document.querySelectorAll('.fees-table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  console.log('Admissions page JavaScript loaded successfully!');
});