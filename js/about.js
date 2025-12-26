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

/* ================= PARALLAX BANNER ================= */
const banner = document.querySelector(".page-banner");

if (banner) {
  window.addEventListener("scroll", () => {
    banner.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
  });
}
