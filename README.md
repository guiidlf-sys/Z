# Z — Site vitrine (Arqoy)

Site vitrine statique multi-pages pour **Arqoy**, freelance débutant proposant deux
services : montage vidéo et informatique/programmation. Contenu provisoire
(textes et images), prêt à être personnalisé.

## Structure

```
site-vitrine/
├── index.html          # Accueil : hero, teaser à propos, services, derniers projets, CTA
├── a-propos.html         # À propos : bio, stats, outils utilisés
├── services.html         # Détail des deux services (montage vidéo / informatique)
├── portfolio.html        # Galerie de réalisations (vidéo + code)
├── tarifs.html            # Grille tarifaire (3 forfaits)
├── contact.html           # Formulaire de contact
├── css/
│   └── style.css       # Styles (thème sombre, responsive, mobile-first)
├── js/
│   └── script.js       # Menu mobile, animations au scroll, validation du formulaire, bouton retour
└── images/
    ├── hero-photo.svg, about-photo.svg, about-teaser-photo.svg  # Illustrations (placeholders)
    ├── home-work-*.svg                                          # Miniatures accueil
    ├── pf-video-*.svg, pf-code-*.svg                             # Miniatures portfolio
    └── logo-mark.svg                                             # Favicon
```

Chaque page partage le même en-tête (logo texte "Arqoy", navigation, bouton pill
"Me contacter") et le même pied de page.

## Identité visuelle

- **Couleurs** (définies en `oklch()` dans `css/style.css`, bloc `:root`) :
  fond quasi-noir brun, cartes légèrement plus claires, texte blanc cassé,
  accent orange (montage vidéo) et accent bleu (informatique).
- **Typographie** : Archivo (titres, 700/800/900) + IBM Plex Sans (texte courant),
  chargées via Google Fonts.
- **Composants** : bouton pill pour le CTA principal, cartes à coins arrondis
  (20-24px), bandeau CTA en dégradé orange→bleu.

## Aperçu local

Site 100% statique, aucune installation nécessaire. Ouvrez directement
`site-vitrine/index.html` dans un navigateur, ou lancez un serveur local :

```bash
cd site-vitrine
python3 -m http.server 8000
```

Puis rendez-vous sur `http://localhost:8000`.

## Personnalisation

- **Textes** : remplacez les textes de présentation, la bio, les tarifs et les
  coordonnées (email, délai de réponse) par le contenu réel.
- **Images** : les fichiers `.svg` du dossier `images/` sont des visuels
  temporaires ; remplacez-les par de vraies photos/captures (mêmes noms de
  fichiers ou mettez à jour les `src` dans les pages HTML).
- **Couleurs** : modifiez les variables `--color-*` en haut de `css/style.css`.
- **Formulaire de contact** : valide les champs côté client (`js/script.js`,
  classe `validated-form`) mais n'envoie rien vers un serveur — à connecter à
  un service d'envoi d'emails pour un usage réel.

## Fonctionnalités incluses

- Site multi-pages : Accueil, À propos, Services, Portfolio, Tarifs, Contact
- Navigation responsive avec menu burger sur mobile (breakpoints 768px et 480px)
- Bouton "Retour" sur les sous-pages (historique du navigateur)
- Animations d'apparition au scroll
- Formulaire de contact avec validation générique côté client
