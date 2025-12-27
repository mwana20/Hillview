// Home page hero slides
const createHeroSlidesHome = () => {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  const slides = [
    'images/campus.jpg',
    'images/assembly.jpg',
    'images/football.jpg'
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

// Inject and init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  createHeroSlidesHome();
  if (window.initHeroSliders) window.initHeroSliders();
});