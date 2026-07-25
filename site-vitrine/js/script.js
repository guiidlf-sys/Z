(function redirectHomeOnReload() {
  var isReload = false;
  try {
    if (window.performance && typeof performance.getEntriesByType === 'function') {
      var navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length && navEntries[0].type === 'reload') {
        isReload = true;
      }
    } else if (window.performance && performance.navigation && performance.navigation.type === 1) {
      isReload = true;
    }
  } catch (e) {
    isReload = false;
  }

  if (isReload) {
    var path = window.location.pathname;
    var isHome = /(^|\/)index\.html$/.test(path) || /\/$/.test(path);
    if (!isHome) {
      window.location.replace('index.html');
    }
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('[data-action="back"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  });

  const revealEls = document.querySelectorAll(
    '.service-card, .work-group img, .about-teaser, .hero-text, .hero-image, .pricing-card, .social-card'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll('form.validated-form').forEach((form) => {
    const successEl = form.querySelector('.form-success');
    const fields = Array.from(form.querySelectorAll('input[required], select[required], textarea[required]'));

    function validateField(field) {
      const value = field.value.trim();
      let isValid = value.length > 0;
      if (isValid && field.type === 'email') {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      const row = field.closest('.form-row');
      const errorEl = row.querySelector('.error-message');
      row.classList.toggle('has-error', !isValid);
      if (errorEl) {
        errorEl.textContent = isValid ? '' : field.dataset.errorMessage || 'Ce champ est requis.';
      }
      return isValid;
    }

    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (successEl) successEl.hidden = true;

      const allValid = fields.map(validateField).every(Boolean);

      if (allValid) {
        const mailtoTarget = form.dataset.mailto;
        if (mailtoTarget) {
          const lines = [];
          form.querySelectorAll('.form-row').forEach((row) => {
            const field = row.querySelector('input, select, textarea');
            const label = row.querySelector('label');
            if (field && label && field.value.trim()) {
              lines.push(`${label.textContent} : ${field.value.trim()}`);
            }
          });
          const subject = 'Nouveau message depuis le site Arqoy';
          const mailtoUrl = `mailto:${mailtoTarget}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
          window.location.href = mailtoUrl;
        }

        form.reset();
        if (successEl) successEl.hidden = false;
      }
    });
  });
});
