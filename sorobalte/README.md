# SOROBALTE – site autonome (FR / EN / LV)
Pages HTML autonomes (CSS et JS inclus), sans dépendance ni compilation : `fr/index.html`, `en/index.html`, `lv/index.html`.
Prêt à pousser sur GitHub (Pages : Settings > Pages > branche main, dossier `/ (root)`) ou sur Cloudflare Pages (build vide, sortie `/`).

Photos : Wikimedia Commons (liens directs, crédits en bas de page). Les licences (CC BY, CC BY-SA, domaine public) sont détaillées sur chaque page de fichier.

## Modifier (optionnel)
Textes : `src/i18n/*.json` · gabarit : `src/template.html` · style : `src/style.css`
Puis `python3 tools/build.py`. Remplacer `SITE` et `EMAIL` dans `tools/build.py`, puis relancer.
