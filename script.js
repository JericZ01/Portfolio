console.log("Portfolio site loaded successfully!");

// Update active nav link on click
document.querySelectorAll('header nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('header nav a').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Update active nav link on scroll (section in view)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav a');

function setActiveLinkOnScroll() {
  let currentSectionId = null;
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // offset for fixed header
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  if (currentSectionId) {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const idFromHref = href && href.startsWith('#') ? href.slice(1) : null;
      if (idFromHref === currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

window.addEventListener('scroll', setActiveLinkOnScroll);
window.addEventListener('load', setActiveLinkOnScroll);

// Scroll-triggered popup
(function initScrollPopup() {
  const popup = document.getElementById('scroll-popup');
  if (!popup) return;

  const closeBtn = popup.querySelector('.popup-close');
  let shown = false;

  function maybeShowPopup() {
    if (shown) return;
    if (window.scrollY > window.innerHeight * 0.75) {
      popup.classList.add('show');
      popup.setAttribute('aria-hidden', 'false');
      shown = true;
    }
  }

  function hidePopup() {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
  }

  window.addEventListener('scroll', maybeShowPopup, { passive: true });
  window.addEventListener('load', maybeShowPopup);
  if (closeBtn) closeBtn.addEventListener('click', hidePopup);
})();

// Footer dynamic year
(function setFooterYear() {
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();