/* ================= COUNTER ANIMATION ================= */
const counters = document.querySelectorAll(".stat-value");

if (counters.length) {
  const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    let current = 0;

    const step = () => {
      current += Math.ceil(target / 120);
      if (current < target) {
        counter.textContent = current;
        requestAnimationFrame(step);
      } else {
        counter.textContent = target;
      }
    };
    step();
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ================= SCROLL REVEAL ================= */
const revealItems = document.querySelectorAll(
  ".stat-box, .vmv-item, .feature-card, .team-card"
);

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "all 0.8s ease";
    revealObserver.observe(item);
  });
}

/* ================= PAGE HERO SLIDES ================= */
const createHeroSlides = () => {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  // slides list (edit these filenames)
  const slides = [
    'images/campus.jpg',
    'images/library.svg',
    'images/assembly.jpg'
  ];
  const gradient = 'linear-gradient(135deg, rgba(26,77,46,0.8), rgba(79,138,109,0.7))';
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
  // injection (adds the slider at the top of .hero-section)
  heroSection.insertAdjacentHTML('afterbegin', sliderHTML);
};

/* ================= PARALLAX BANNER ================= */
const banner = document.querySelector(".page-banner");

if (banner) {
  window.addEventListener("scroll", () => {
    banner.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
  });
}

// Inject hero slides and initialize slider
document.addEventListener('DOMContentLoaded', () => {
  createHeroSlides();
  if (window.initHeroSliders) window.initHeroSliders();
});
