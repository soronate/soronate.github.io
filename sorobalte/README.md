# Sorobalte — première version

Site vitrine statique trilingue (FR / EN / LV), conçu pour GitHub Pages.

## Contenu
- `index.html` : page d'accueil et sections de présentation.
- `css/style.css` : identité visuelle responsive, mode clair/sombre.
- `js/translations.js` : contenus français, anglais et letton.
- `js/main.js` : changement de langue, thème, formulaire et année du pied de page.

## Prévisualisation locale
Ouvrir `index.html` dans un navigateur. Pour une prévisualisation plus fidèle, lancer un serveur local depuis ce dossier :
`python -m http.server 8000`
Puis ouvrir http://localhost:8000.

## Publication GitHub Pages
1. Créer un dépôt `sorobalte.github.io` (si ce nom est disponible) ou un dépôt de projet.
2. Déposer le contenu de ce dossier à la racine du dépôt.
3. Dans Settings > Pages, choisir la branche `main` et le dossier `/ (root)`.
4. Si le dépôt est un dépôt de projet, l'URL sera de type `https://<compte>.github.io/<depot>/`.

## À configurer avant publication
- Remplacer l'adresse vide `recipient` dans `js/main.js` par l'adresse e-mail de contact.
- Ajouter les mentions légales, politique de confidentialité et informations sur l'activité.
- Vérifier les droits et la disponibilité des images distantes Unsplash, puis idéalement héberger les images autorisées dans `images/`.
- Adapter les textes aux prestations réellement proposées. Les formulations actuelles présentent une offre indicative et ne constituent pas une réservation ni une garantie de disponibilité.
- Ajouter un domaine personnalisé si souhaité.

## Notes
Le site utilise Bootstrap 5.3.3 et Google Fonts via CDN. Le formulaire prépare un e-mail avec le logiciel de messagerie du visiteur ; il ne stocke aucune donnée sur le site.
