(function redirectHomeOnReload() {
  function goHomeIfNotHome() {
    var path = window.location.pathname;
    var isHome = /(^|\/)index\.html$/.test(path) || /\/$/.test(path);
    if (!isHome) {
      window.location.replace('index.html');
    }
  }

  function wasReloaded() {
    var reloaded = false;
    try {
      if (window.performance && typeof performance.getEntriesByType === 'function') {
        var navEntries = performance.getEntriesByType('navigation');
        if (navEntries.length && navEntries[0].type === 'reload') {
          reloaded = true;
        }
      }
      if (!reloaded && window.performance && performance.navigation && performance.navigation.type === 1) {
        reloaded = true;
      }
    } catch (e) {
      reloaded = false;
    }
    return reloaded;
  }

  if (wasReloaded()) {
    goHomeIfNotHome();
  }

  // Some browsers (notably older iOS Safari) restore a suspended page from the
  // back/forward cache instead of firing a normal reload — the script above
  // never re-runs in that case, so catch it separately via pageshow.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      goHomeIfNotHome();
    }
  });
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
    '.service-card, .work-group img, .work-grid > img, .work-grid > div, .about-teaser, .hero-text, .hero-image, .pricing-card, .social-card, .page-header, .section-header, .cta-band, .contact-form, .contact-facts, .stats-row .stat, .tool-pills'
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

  initChatbot();
});

function initChatbot() {
  const FAQ = [
    {
      keywords: ['bonjour', 'salut', 'hello', 'coucou', 'hey', 'bonsoir'],
      answer: "Bonjour ! Je suis l'assistant du site Arqoy. Pose-moi une question sur les services, les tarifs, le portfolio ou comment me contacter."
    },
    {
      keywords: ['service', 'propose', 'proposes', 'offre', 'competence', 'faire'],
      answer: "Arqoy propose deux services : le montage vidéo (découpage, sous-titres, étalonnage, formats réseaux sociaux) et l'informatique (sites web, scripts, dépannage). Détails sur la page Services."
    },
    {
      keywords: ['tarif', 'prix', 'cout', 'coute', 'combien'],
      answer: "Les tarifs : Montage simple 15€/vidéo, Montage créatif 35€/vidéo, Développement sur devis. Détails sur la page Tarifs."
    },
    {
      keywords: ['devis'],
      answer: "Pour un devis personnalisé, utilise le formulaire de la page Contact en décrivant ton projet."
    },
    {
      keywords: ['contact', 'joindre', 'mail', 'email', 'ecrire', 'appeler'],
      answer: "Tu peux contacter Arqoy par email à contactArqoy@gmail.com ou via le formulaire de la page Contact."
    },
    {
      keywords: ['portfolio', 'projet', 'exemple', 'realisation', 'travaux'],
      answer: "Tu peux voir des exemples de projets vidéo et informatiques sur la page Portfolio."
    },
    {
      keywords: ['delai', 'temps', 'reponse', 'rapide', 'vite'],
      answer: "Arqoy répond généralement sous 24 à 48h."
    },
    {
      keywords: ['reseau', 'social', 'tiktok', 'instagram'],
      answer: "Tu peux suivre Arqoy sur TikTok : @arqoy1. Voir la page Réseaux."
    },
    {
      keywords: ['qui es', 'a propos', 'apropos', 'experience', 'arqoy'],
      answer: "Arqoy est un freelance débutant passionné de montage vidéo et de développement informatique. Plus d'infos sur la page À propos."
    },
    {
      keywords: ['merci', 'super', 'top', 'cool', 'parfait'],
      answer: "Avec plaisir ! N'hésite pas si tu as d'autres questions."
    }
  ];

  const FALLBACK =
    "Je ne suis pas sûr de comprendre. Tu peux me demander : les services, les tarifs, le portfolio, les réseaux, ou comment contacter Arqoy. Sinon, passe par le formulaire de la page Contact pour une réponse personnalisée.";

  function normalize(str) {
    try {
      return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } catch (e) {
      return str.toLowerCase();
    }
  }

  function findAnswer(message) {
    const norm = normalize(message);
    for (const entry of FAQ) {
      if (entry.keywords.some((kw) => norm.includes(kw))) {
        return entry.answer;
      }
    }
    return FALLBACK;
  }

  const root = document.createElement('div');
  root.className = 'chatbot';
  root.innerHTML =
    '<button class="chatbot-toggle" id="chatbotToggle" aria-label="Ouvrir l\'assistant" aria-expanded="false">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' +
    '</button>' +
    '<div class="chatbot-panel" id="chatbotPanel">' +
    '<div class="chatbot-header">' +
    '<span>Assistant Arqoy</span>' +
    '<button class="chatbot-close" id="chatbotClose" aria-label="Fermer l\'assistant">&times;</button>' +
    '</div>' +
    '<div class="chatbot-messages" id="chatbotMessages" aria-live="polite"></div>' +
    '<form class="chatbot-form" id="chatbotForm">' +
    '<input type="text" id="chatbotInput" placeholder="Pose ta question..." autocomplete="off" aria-label="Ta question">' +
    '<button type="submit" aria-label="Envoyer">→</button>' +
    '</form>' +
    '</div>';
  document.body.appendChild(root);

  const toggleBtn = document.getElementById('chatbotToggle');
  const closeBtn = document.getElementById('chatbotClose');
  const panel = document.getElementById('chatbotPanel');
  const messagesEl = document.getElementById('chatbotMessages');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');

  let hasGreeted = false;

  function addMessage(text, from) {
    const msg = document.createElement('div');
    msg.className = 'chatbot-msg is-' + from;
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function openPanel() {
    panel.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (!hasGreeted) {
      hasGreeted = true;
      addMessage(
        "Salut ! Pose-moi une question sur les services, les tarifs, le portfolio ou comment contacter Arqoy.",
        'bot'
      );
    }
    input.focus();
  }

  function closePanel() {
    panel.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', () => {
    if (panel.classList.contains('is-open')) {
      closePanel();
    } else {
      openPanel();
    }
  });

  closeBtn.addEventListener('click', closePanel);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addMessage(value, 'user');
    input.value = '';
    const answer = findAnswer(value);
    window.setTimeout(() => addMessage(answer, 'bot'), 400);
  });
}
