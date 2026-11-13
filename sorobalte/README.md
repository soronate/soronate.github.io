# SOROBALTE – site autonome (FR / EN / LV)
Pages HTML autonomes (CSS et JS inclus), sans dépendance ni compilation : `fr/index.html`, `en/index.html`, `lv/index.html`, plus trois pages légales par langue (mentions légales, politique de confidentialité, accessibilité).
Prêt à pousser sur GitHub (Pages : Settings > Pages > branche main, dossier `/ (root)`) ou sur Cloudflare Pages (build vide, sortie `/`).



## Modifier (optionnel)
Textes : `src/i18n/*.json` · pages légales : `src/i18n/legal-*.json` · gabarits : `src/template.html`, `src/legal.html`, `src/partials/` (en-tête, pied de page) · style : `src/style.css`
Puis `python3 tools/build.py`. Remplacer `SITE` et `EMAIL` dans `tools/build.py`, puis relancer.

## Interactivité et compatibilité
Carte cliquable, filtres, onglets (itinéraire, saisons), galerie avec visionneuse (balayage tactile, clavier), mode sombre, barre de progression.
Compatibilité Safari/iOS : `100svh` avec repli, zones sûres (encoche), pas de `background-attachment:fixed` sur tactile, champs à 16 px (pas de zoom iOS), cibles tactiles ≥ 44 px.

## Contact
L'adresse e-mail (variable `EMAIL` dans `tools/build.py`) n'apparaît pas en clair dans les pages : elle y est encodée et n'est utilisée qu'au clic sur « Nous écrire » ou à l'envoi du formulaire. Le formulaire ouvre la messagerie ou Gmail avec le message prêt à envoyer.
URL du site : `SITE` dans `tools/build.py` (par défaut https://soronate.github.io/sorobalte).
Météo de Riga : API gratuite Open-Meteo (usage non commercial).

## Pages légales et pied de page
Pied de page commun : `src/partials/footer.html` (adresse, navigation, liens légaux, réseaux). Les textes légaux sont dans `src/i18n/legal-fr|en|lv.json`.
Fichiers générés : `fr/mentions-legales.html`, `fr/politique-de-confidentialite.html`, `fr/accessibilite.html` (et équivalents `en/`, `lv/`).

## Images
Les photos viennent de Wikimedia Commons (`IMG` dans `tools/build.py`). `python3 tools/check_images.py` (poste connecté) liste celles qui sont en 404.
Sécurité à l'exécution : si une image échoue, le site charge automatiquement la photo d'en-tête de l'article Wikipédia associé (`WIKI` dans `build.py`), puis, à défaut, une illustration locale. Carte, galerie, visionneuse et diaporama continuent donc de fonctionner.
