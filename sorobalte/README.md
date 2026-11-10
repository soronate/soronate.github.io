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

URL du site : `SITE` dans `tools/build.py` (par défaut https://soronate.github.io/sorobalte).


## Axeptio, légal et contact
- Axeptio : coller votre script à l'emplacement `<!-- Axeptio -->` de `src/template.html` et `src/legal.html`, puis relancer `python3 tools/build.py`.
- Pages légales : `src/legal_fr.json` et `src/legal_en.json` (les pages lettones renvoient vers les pages anglaises). SIRET : variable `SIRET`.
- L'adresse email est encodée (`EMAIL_B64`) et n'apparaît jamais en clair dans les pages.

Météo de Riga : API gratuite Open-Meteo (usage non commercial), appelée par le navigateur du visiteur.
