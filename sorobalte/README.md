# SOROBALTE – site autonome (FR / EN / LV)
Pages HTML autonomes (CSS et JS inclus), sans dépendance ni compilation : `fr/index.html`, `en/index.html`, `lv/index.html`.
Prêt à pousser sur GitHub (Pages : Settings > Pages > branche main, dossier `/ (root)`) ou sur Cloudflare Pages (build vide, sortie `/`).



## Modifier (optionnel)
Textes : `src/i18n/*.json` · gabarit : `src/template.html` · style : `src/style.css`
Puis `python3 tools/build.py`. Remplacer `SITE` et `EMAIL` dans `tools/build.py`, puis relancer.

## Interactivité et compatibilité
Carte cliquable, filtres, onglets (itinéraire, saisons), galerie avec visionneuse (balayage tactile, clavier), mode sombre, barre de progression.
Compatibilité Safari/iOS : `100svh` avec repli, zones sûres (encoche), pas de `background-attachment:fixed` sur tactile, champs à 16 px (pas de zoom iOS), cibles tactiles ≥ 44 px.

## Contact
Adresse : ContactSoronate@gmail.com (modifiable dans `tools/build.py`, variable `EMAIL`). Le formulaire ouvre la messagerie ou Gmail avec le message prêt à envoyer.
URL du site : `SITE` dans `tools/build.py` (par défaut https://soronate.github.io/sorobalte).
Météo de Riga : API gratuite Open-Meteo (usage non commercial).
