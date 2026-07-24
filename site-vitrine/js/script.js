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

  const revealEls = document.querySelectorAll('.card, .gallery figure, .about-image, .about-text, .hero-text, .hero-image');
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

  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');

  const validators = {
    name: (value) => value.trim().length > 0,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: (value) => value.trim().length > 0,
  };

  const errorText = {
    name: 'Veuillez indiquer votre nom.',
    email: 'Veuillez indiquer une adresse email valide.',
    message: 'Veuillez saisir un message.',
  };

  function validateField(field) {
    const value = field.value;
    const isValid = validators[field.name](value);
    const row = field.closest('.form-row');
    const errorEl = document.getElementById(`${field.name}Error`);

    row.classList.toggle('has-error', !isValid);
    errorEl.textContent = isValid ? '' : errorText[field.name];
    return isValid;
  }

  ['name', 'email', 'message'].forEach((fieldName) => {
    const field = form.elements[fieldName];
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMessage.hidden = true;

    const fields = ['name', 'email', 'message'].map((name) => form.elements[name]);
    const allValid = fields.map(validateField).every(Boolean);

    if (allValid) {
      form.reset();
      successMessage.hidden = false;
    }
  });
});
