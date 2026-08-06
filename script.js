// Fade-in on scroll (progressive enhancement — content is visible by default;
// this class opts back into the animated hidden state, only when JS runs)
document.documentElement.classList.add('js');

const faders = document.querySelectorAll('.fade-in');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  faders.forEach((fader) => fader.classList.add('visible'));
} else {
  // threshold: 0 so long sections (e.g. Projects) reveal as soon as they
  // start entering view, rather than requiring 15% of their total height
  // to be on screen at once — which very tall sections may never reach.
  const appearOptions = { threshold: 0, rootMargin: '0px 0px -60px 0px' };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach((fader) => appearOnScroll.observe(fader));
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}
