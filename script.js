const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');
const backTop = document.getElementById('backTop');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
  backTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(el);
});
