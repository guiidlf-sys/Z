# Z — Site vitrine (Nova Solutions)

Site vitrine statique, avec du **contenu provisoire** (textes et images) prêt à être
personnalisé : nom d'entreprise, textes, coordonnées et visuels sont des exemples
à remplacer.

## Structure

```
site-vitrine/
├── index.html          # Page unique : accueil, services, à propos, portfolio, contact
├── css/
│   └── style.css       # Styles (responsive, mobile-first)
├── js/
│   └── script.js       # Menu mobile, animations au scroll, validation du formulaire
└── images/
    ├── hero.svg         # Illustration d'en-tête (placeholder)
    ├── about.svg        # Illustration "à propos" (placeholder)
    └── portfolio-*.svg  # Vignettes de portfolio (placeholders)
```

## Aperçu local

Aucune installation n'est nécessaire, le site est 100% statique. Ouvrez
directement `site-vitrine/index.html` dans un navigateur, ou lancez un petit
serveur local depuis le dossier `site-vitrine/` :

```bash
cd site-vitrine
python3 -m http.server 8000
```

Puis rendez-vous sur `http://localhost:8000`.

## Personnalisation

- **Textes** : tous les paragraphes marqués « provisoire » dans `index.html`
  sont à remplacer par le contenu réel (nom, activité, coordonnées, etc.).
- **Images** : les fichiers `.svg` du dossier `images/` sont des visuels
  temporaires générés pour occuper l'espace ; remplacez-les par de vraies
  photos/illustrations (mêmes noms de fichiers ou mettez à jour les `src` dans
  `index.html`).
- **Couleurs** : les couleurs principales sont définies en haut de
  `css/style.css` dans le bloc `:root` (variables `--color-primary`,
  `--color-secondary`, etc.).
- **Formulaire de contact** : le formulaire valide les champs côté client
  (`js/script.js`) mais n'envoie rien vers un serveur — à connecter à un
  service d'envoi d'emails (Formspree, backend maison, etc.) pour un usage
  réel.

## Fonctionnalités incluses

- Navigation responsive avec menu burger sur mobile
- Défilement fluide vers les sections
- Animations d'apparition au scroll
- Bouton "retour en haut"
- Formulaire de contact avec validation
