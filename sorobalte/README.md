# Sorobalte — site statique trilingue

Site vitrine multi-pages pour présenter des séjours et expériences personnalisés en Lettonie.

## Publication sur GitHub Pages
1. Décompressez l'archive.
2. Créez un dépôt GitHub (par exemple `sorobalte.github.io`) ou utilisez un dépôt de projet.
3. Placez **le contenu** du dossier `sorobalte` à la racine du dépôt.
4. Dans GitHub : **Settings → Pages → Deploy from a branch**, sélectionnez `main` et `/ (root)`.
5. Le site sera publié à l'adresse indiquée par GitHub Pages.

## Avant publication — personnalisations indispensables
- Remplacer `bonjour@sorobalte.com` dans `contact.html` et `assets/js/main.js` par votre véritable adresse.
- Ajouter vos coordonnées et vos mentions légales / politique de confidentialité adaptées à votre activité.
- Vérifier le périmètre exact des prestations proposées, les conditions de réservation, d'annulation et d'éventuels partenariats.
- Ajouter vos propres photos ou vérifier les conditions d'utilisation des images externes utilisées dans cette maquette.
- Les textes décrivent des exemples et des pistes : confirmer les prestations réellement disponibles avant toute commercialisation.

## Fonctionnement
- HTML5 multi-pages, Bootstrap 5.3.3 via CDN, CSS personnalisé et JavaScript sans framework.
- Langues FR / EN / LV avec français par défaut et préférence conservée dans le navigateur.
- Mode clair / sombre mémorisé localement.
- Formulaire `mailto:` : il prépare un e-mail dans le logiciel du visiteur, mais ne transmet rien côté serveur. Pour une réception sans logiciel mail, connecter un service de formulaire (Formspree, Netlify Forms, etc.).
- Les photographies sont chargées depuis Unsplash via URL distante. Une connexion internet est nécessaire. Pour une version totalement autonome, télécharger des images dont vous détenez les droits et remplacer les URL dans les pages et CSS.

## Arborescence
- `index.html` : accueil
- `riga.html` : Riga
- `regions.html` : régions lettones
- `hebergements.html` : hébergements
- `gastronomie.html` : gastronomie et traditions
- `prestations.html` : prestations
- `experiences.html` : exemples de circuits
- `contact.html` : contact
- `assets/css/style.css` : identité graphique responsive
- `assets/js/i18n.js` : textes FR / EN / LV
- `assets/js/main.js` : navigation, thème, langue et formulaire
