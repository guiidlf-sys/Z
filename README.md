# Z — Site vitrine (Nova Solutions)

Site vitrine statique multi-pages, avec du **contenu provisoire** (textes et images)
prêt à être personnalisé : nom d'entreprise, textes, coordonnées et visuels sont des
exemples à remplacer.

## Structure

```
site-vitrine/
├── index.html          # Accueil : hero + aperçu des rubriques
├── services.html        # Détail des services
├── a-propos.html         # À propos de l'équipe
├── portfolio.html        # Galerie de réalisations
├── devis.html            # Formulaire dédié de demande de devis
├── contact.html           # Formulaire de contact général
├── css/
│   └── style.css       # Styles (responsive, mobile-first)
├── js/
│   └── script.js       # Menu mobile, animations au scroll, validation des formulaires
└── images/
    ├── hero.svg         # Illustration d'en-tête (placeholder)
    ├── about.svg        # Illustration "à propos" (placeholder)
    └── portfolio-*.svg  # Vignettes de portfolio (placeholders)
```

Chaque page partage le même en-tête (logo, navigation, bouton « Demander un devis »)
et le même pied de page. Chaque bouton d'action du site renvoie vers une page dédiée
à son sujet : le bouton « Demander un devis » (présent dans l'en-tête et sur la page
d'accueil) ouvre toujours `devis.html`, « Découvrir nos services » ouvre
`services.html`, etc.

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

- **Textes** : tous les paragraphes marqués « provisoire » dans les fichiers
  `.html` sont à remplacer par le contenu réel (nom, activité, coordonnées, etc.).
- **Images** : les fichiers `.svg` du dossier `images/` sont des visuels
  temporaires générés pour occuper l'espace ; remplacez-les par de vraies
  photos/illustrations (mêmes noms de fichiers ou mettez à jour les `src` dans
  les pages HTML).
- **Couleurs** : les couleurs principales sont définies en haut de
  `css/style.css` dans le bloc `:root` (variables `--color-primary`,
  `--color-secondary`, etc.).
- **Formulaires** : les formulaires de `contact.html` et `devis.html` valident
  les champs côté client (`js/script.js`, classe `validated-form`) mais
  n'envoient rien vers un serveur — à connecter à un service d'envoi d'emails
  (Formspree, backend maison, etc.) pour un usage réel.
- **Pages** : pour ajouter une nouvelle page, dupliquez la structure d'en-tête
  et de pied de page d'une page existante et mettez à jour le lien actif
  (classe `active`) dans la navigation.

## Fonctionnalités incluses

- Site multi-pages : chaque section (services, à propos, portfolio, devis,
  contact) a sa propre page
- Navigation responsive avec menu burger sur mobile, cohérente sur toutes les pages
- Bouton d'appel à l'action « Demander un devis » persistant dans l'en-tête
- Animations d'apparition au scroll
- Bouton "retour en haut"
- Formulaires (contact et devis) avec validation générique côté client
