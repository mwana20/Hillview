// ========================================
// NEWS PAGE JAVASCRIPT - HILL VIEW COLLEGE
// ========================================

(function() {
  'use strict';

  // DOM Elements
  const searchInput = document.getElementById('news-search');
  const categoryFilter = document.getElementById('news-category');
  const sortFilter = document.getElementById('news-sort');
  const newsGrid = document.getElementById('news-grid');
  const noResults = document.getElementById('no-results');
  const activeFiltersContainer = document.getElementById('active-filters');
  const modal = document.getElementById('news-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalBody = document.getElementById('modal-body');
  const modalClose = modal.querySelector('.modal-close');
  const modalBackdrop = modal.querySelector('.modal-backdrop');

  // Get all news cards
  let allCards = Array.from(document.querySelectorAll('.news-card'));

  // ========================================
  // ANIMATED COUNTER FOR HERO STATS
  // ========================================
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Animate counters when page loads
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  function handleScroll() {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ========================================
  // SEARCH & FILTER FUNCTIONALITY
  // ========================================
  function filterCards() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const sortOrder = sortFilter.value;

    let filteredCards = allCards.filter(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
      const category = card.getAttribute('data-category');

      const matchesSearch = searchTerm === '' || 
                           title.includes(searchTerm) || 
                           excerpt.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || 
                             category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort cards
    filteredCards.sort((a, b) => {
      const dateA = new Date(a.getAttribute('data-date'));
      const dateB = new Date(b.getAttribute('data-date'));
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Update grid
    newsGrid.innerHTML = '';
    
    if (filteredCards.length === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
      filteredCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        newsGrid.appendChild(card);
      });
      // Re-attach event listeners
      attachCardListeners();
    }

    // Update active filters display
    updateActiveFilters();
  }

  function updateActiveFilters() {
    const filters = [];
    
    if (searchInput.value.trim() !== '') {
      filters.push({
        type: 'search',
        label: `Search: "${searchInput.value}"`,
        clear: () => {
          searchInput.value = '';
          filterCards();
        }
      });
    }
    
    if (categoryFilter.value !== 'all') {
      const categoryText = categoryFilter.options[categoryFilter.selectedIndex].text;
      filters.push({
        type: 'category',
        label: `Category: ${categoryText}`,
        clear: () => {
          categoryFilter.value = 'all';
          filterCards();
        }
      });
    }

    activeFiltersContainer.innerHTML = '';
    
    filters.forEach(filter => {
      const tag = document.createElement('div');
      tag.className = 'filter-tag';
      tag.innerHTML = `
        ${filter.label}
        <button aria-label="Remove filter">×</button>
      `;
      tag.querySelector('button').addEventListener('click', filter.clear);
      activeFiltersContainer.appendChild(tag);
    });
  }

  // ========================================
  // MODAL FUNCTIONALITY
  // ========================================
  function openModal(title, date, content) {
    modalTitle.textContent = title;
    modalDate.textContent = formatDate(date);
    modalBody.textContent = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  // ========================================
  // EVENT LISTENERS FOR CARDS
  // ========================================
  function attachCardListeners() {
    const readMoreButtons = document.querySelectorAll('.btn-read-more');
    
    readMoreButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.news-card');
        const title = card.querySelector('.card-title').textContent;
        const date = card.querySelector('.card-date').getAttribute('datetime');
        const content = this.getAttribute('data-full');
        openModal(title, date, content);
      });
    });

    // Also make entire card clickable
    const cards = document.querySelectorAll('.news-card');
    cards.forEach(card => {
      card.addEventListener('click', function() {
        const button = this.querySelector('.btn-read-more');
        if (button) {
          const title = this.querySelector('.card-title').textContent;
          const date = this.querySelector('.card-date').getAttribute('datetime');
          const content = button.getAttribute('data-full');
          openModal(title, date, content);
        }
      });
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#all-events') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // ========================================
  // EVENT ITEM HOVER EFFECTS
  // ========================================
  function initEventItems() {
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
      });
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });
  }

  // ========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ========================================
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.news-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
      // Close modal with Escape key
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
      
      // Focus search with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // ========================================
  // DEBOUNCE FUNCTION FOR SEARCH
  // ========================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ========================================
  // INITIALIZATION
  // ========================================
  function init() {
    // Initialize counters
    initCounters();

    // Attach event listeners
    searchInput.addEventListener('input', debounce(filterCards, 300));
    categoryFilter.addEventListener('change', filterCards);
    sortFilter.addEventListener('change', filterCards);
    
    // Modal controls
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    // Card interactions
    attachCardListeners();
    
    // Scroll effects
    window.addEventListener('scroll', debounce(handleScroll, 10));
    
    // Smooth scrolling
    initSmoothScroll();
    
    // Event items
    initEventItems();
    
    // Scroll animations
    initScrollAnimations();
    
    // Keyboard navigation
    initKeyboardNavigation();
    
    // Initial filter update
    updateActiveFilters();
    
    console.log('News page initialized successfully!');
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();