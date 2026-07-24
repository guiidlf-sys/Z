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

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const revealEls = document.querySelectorAll(
    '.card, .gallery figure, .about-image, .about-text, .hero-text, .hero-image, .steps li'
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

  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('[data-action="back"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  });

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
        form.reset();
        if (successEl) successEl.hidden = false;
      }
    });
  });
});
