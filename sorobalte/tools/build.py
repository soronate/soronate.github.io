#!/usr/bin/env python3
"""Génère des pages autonomes fr/ en/ lv/ (CSS et JS inclus) + sitemap + robots. Usage : python3 tools/build.py"""
import json, re, datetime, pathlib
from urllib.parse import quote
R = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://soronate.github.io/sorobalte"   # à adapter si le dépôt ou le domaine change
EMAIL = "ContactSoronate@gmail.com"
LANGS = ["fr", "en", "lv"]
# clé : (fichier Wikimedia Commons, largeur px, libellé crédit, auteur)
IMG = {
 "hero": ("Riga (23621609751).jpg", 2000, "Riga", "Flickr via Commons"),
 "pano": ("Riga Skyline Panorama, Latvia - Diliff.jpg", 3200, "Panorama", "Diliff"),
 "riga": ("Riga-Blick von Petrikirche01.jpg", 1000, "Vue de Riga", "Nikater"),
 "old": ("Street Scene - Old Town - Riga - Latvia - 02.jpg", 800, "Vecrīga", "Adam Jones"),
 "nouveau": ("Immeuble art nouveau (Riga) (7567163020).jpg", 800, "Alberta iela 4", "J.-P. Dalbéra"),
 "market": ("Riga central market.jpg", 800, "Centrāltirgus", "Kulmalukko"),
 "rundale": ("Latvia Rundāle palace 2.jpg", 800, "Rundāle", "Wojsyl"),
 "gauja": ("Turaidas skats uz Gauju 2okt04.JPG", 800, "Gauja", "Gatis Pāvils"),
 "jurmala": ("Majori beach Jūrmala.jpg", 800, "Majori", "Roquai"),
 "kuldiga": ("Ventas rumba, 13.05.2012.jpg", 800, "Ventas rumba", "Wikimedia Commons"),
 "hall": ("Ryga1.2007-08-09.jpg", 800, "Melngalvju nams", "Algėrds"),
 "cesis": ("CesuPils 2017-09-10.jpg", 800, "Cēsis", "Wikimedia Commons"),
 "freedom": ("Monumento a la Libertad, Riga, Letonia, 2012-08-07, DD 10.JPG", 800, "Brīvības piemineklis", "Diego Delso"),
 "song": ("Latvian Song festival 2008.jpg", 1000, "Dziesmu svētki", "Wikimedia Commons"),
 "rye": ("Rupjmaizes kārtojums.jpg", 600, "Rupjmaizes kārtojums", "Wikimedia Commons"),
 "bridge": ("Kuldiga bridge.jpg", 800, "Kuldīgas tilts", "Wikimedia Commons"),
 "turc": ("Turaida Castle.JPG", 800, "Turaidas pils", "Pudelek"),
 "mhall": ("Riga Central Market Hall.jpg", 800, "Centrāltirgus", "Wikimedia Commons"),
 "townhall": ("Riga town hall.jpg", 800, "Rātslaukums", "Wikimedia Commons"),
 "rund2": ("Rundale05.jpg", 800, "Rundāles dārzs", "Nikater"),
 "turaida": ("Turaidas-pils.jpg", 800, "Turaida", "Wikimedia Commons"),
 "kolka": ("Tranquil blue (1258425411).jpg", 800, "Kolka", "Mar10os"),
 "karosta": ("Karosta church.JPG", 800, "Karosta", "Kulmalukko"),
 "castle": ("Riga-Schloss02.jpg", 800, "Rīgas pils", "Nikater"),
 "gate": ("Svenskporten Riga.jpg", 800, "Zviedru vārti", "Tahbepet"),
 "dome": ("Riga Dom-Düna.jpg", 800, "Doms", "Brunswyk"),
 "tram": ("Retro tramvaj v Rize.jpg", 800, "Tramvajs", "Dezidor"),
 "sigulda": ("The new Sigulda castle (2).JPG", 800, "Sigulda", "P.-A. Leclercq"),
}
def url(f, w): return "https://commons.wikimedia.org/wiki/Special:FilePath/" + quote(f.replace(" ", "_")) + f"?width={w}"
def page(f): return "https://commons.wikimedia.org/wiki/File:" + quote(f.replace(" ", "_"))
credits = ", ".join(f'<a href="{page(f)}" rel="noopener">{n}</a> ({a})' for f, w, n, a in IMG.values())

import html
OUT=[(21.05,56.45),(21.05,56.9),(21.3,57.2),(21.55,57.55),(21.8,57.6),(22.6,57.76),(22.9,57.55),(23.1,57.35),(23.6,57.05),(24.1,57.05),(24.3,57.3),(24.35,57.87),(26.03,57.77),(27.05,57.45),(27.7,57.2),(28.2,56.65),(28.1,56.1),(27.65,55.95),(26.6,55.68),(25.9,56.0),(25.3,56.15),(24.7,56.4),(24.0,56.3),(23.3,56.4),(22.6,56.4),(21.8,56.35)]
GAL=["hero","gate","castle","freedom","dome","townhall","tram","nouveau","mhall","market","rundale","rund2","gauja","turc","sigulda","cesis","song","kolka","jurmala","kuldiga","bridge","karosta"]
def sections(d):
    e=html.escape
    E=[("exp1","old","riga"),("exp2","nouveau","riga"),("exp3","market","riga"),("exp7","castle","riga"),("exp8","gate","riga"),("exp10","freedom","riga"),("exp4","rundale","trip"),("exp5","kolka","trip"),("exp6","karosta","trip"),("exp9","cesis","trip")]
    cards="".join(f'<article class="card" data-cat="{c}"><div><img src="{d["img_"+i]}" alt="{e(d[k+"_t"])}" width="800" height="533" loading="lazy"></div><h3>{d[k+"_t"]}</h3><p>{d[k+"_d"]}</p><button type="button" class="add" aria-pressed="false" data-n="{e(d[k+"_t"])}" data-a="{e(d["add_l"])}" data-b="{e(d["added_l"])}">{d["add_l"]}</button></article>' for k,i,c in E)
    chips="".join(f'<button type="button" class="chip{" on" if f=="*" else ""}" data-f="{f}">{d["chip_"+n]}</button>' for f,n in [("*","all"),("riga","riga"),("trip","trip")])
    P=[("Riga",24.1,56.95,"riga","riga"),("Jūrmala",23.65,57.0,"jurmala","jurmala"),("Sigulda",24.85,57.15,"sigulda","sigulda"),("Cēsis",25.27,57.31,"cesis","cesis"),("Kuldīga",21.97,56.97,"kuldiga","kuldiga"),("Liepāja",21.01,56.51,"liepaja","karosta"),("Rundāle",24.03,56.41,"rundale","rundale"),("Kolka",22.59,57.76,"kolka","kolka")]
    pins="".join(f'<button type="button" class="pin" style="left:{(x-20.9)/7.4*100:.1f}%;top:{(58.1-y)/2.5*100:.1f}%" data-t="{n}" data-i="{url(IMG[im][0],700)}" data-d="{e(d["pin_"+k])}" aria-label="{n}"><i></i></button>' for n,x,y,k,im in P)
    poly=" ".join(f"{(x-20.9)/7.4*407:.0f},{(58.1-y)/2.5*250:.0f}" for x,y in OUT)
    def tabs(items):
        return '<div class="tabs" data-tabs><div class="tl" role="tablist">'+"".join(f'<button type="button" role="tab" aria-selected="{"true" if i==0 else "false"}">{a}</button>' for i,(a,_) in enumerate(items))+'</div>'+"".join(f'<div class="tp" role="tabpanel"{"" if i==0 else " hidden"}>{b}</div>' for i,(_,b) in enumerate(items))+'</div>'
    itin=tabs([(f'{d["day"]} {i}',f'<h3>{d[f"d{i}_t"]}</h3><p>{d[f"d{i}_d"]}</p>') for i in (1,2,3)])
    seas=tabs([(d[f"s{i}"],f'<p>{d[f"s{i}_d"]}</p>') for i in (1,2,3,4)])
    hist=tabs([(y,f'<p>{d[f"h{i}"]}</p>') for i,y in enumerate(["1201","1282","1873","1918","1991","2004","2014","2023"],1)])
    gal="".join(f'<button type="button" class="gi" data-full="{url(IMG[k][0],1600)}" data-cap="{e(IMG[k][2])} – {e(IMG[k][3])}"><img src="{d["img_"+k]}" alt="{e(IMG[k][2])}" width="800" height="533" loading="lazy"><span>{e(IMG[k][2])}</span></button>' for k in GAL)
    hx="".join(f'<img src="{url(IMG[k][0],1800)}" alt="" width="1800" height="1200" loading="lazy">' for k in ("jurmala","cesis","gauja"))
    return dict(hero_extra=hx,
     sec_map=f'<section id="map" class="wrap"><h2>{d["map_h"]}</h2><p class="lead">{d["map_p"]}</p><div class="mapbox"><div class="map"><svg viewBox="0 0 407 250" aria-hidden="true"><polygon points="{poly}"/></svg>{pins}</div><div class="mapinfo" aria-live="polite"><img alt="" width="700" height="394"><div><h3></h3><p></p></div></div></div></section>',
     sec_exp=f'<section id="exp" class="band"><div class="wrap"><h2>{d["exp_h"]}</h2><div class="chips" role="group">{chips}</div><input type="search" class="sq" placeholder="{e(d["search_l"])}" aria-label="{e(d["search_l"])}"><div class="grid g4">{cards}</div><p class="none" hidden>{d["none"]}</p></div></section>',
     sec_itin=f'<section id="itin" class="wrap narrow"><h2>{d["itin_h"]}</h2>{itin}</section>',
     sec_gal=f'<section id="gallery" class="band"><div class="wrap"><h2>{d["gal_h"]}</h2><div class="galw"><button type="button" class="ga" data-g="-1" aria-label="{d["lb_prev"]}">‹</button><div class="gal">{gal}</div><button type="button" class="ga" data-g="1" aria-label="{d["lb_next"]}">›</button></div></div></section>',
     sec_song=f'<section id="song" class="wrap split"><img src="{d["img_song"]}" alt="{e(d["song_h"])}" width="1000" height="667" loading="lazy"><div><h2>{d["song_h"]}</h2><p>{d["song_p"]}</p><div class="jani"><span>{d["jani_l"]}</span><b id="jd">–</b><span>{d["jani_u"]}</span></div></div></section>',
     sec_hist=f'<section id="history" class="band"><div class="wrap narrow"><h2>{d["hist_h"]}</h2>{hist}</div></section>',
     sec_seasons=f'<section id="seasons" class="wrap narrow"><h2>{d["seas_h"]}</h2>{seas}</section>')
tpl = (R/"src/template.html").read_text(encoding="utf-8")
css = (R/"src/style.css").read_text(); js = (R/"src/main.js").read_text()
for l in LANGS:
    d = json.loads((R/f"src/i18n/{l}.json").read_text(encoding="utf-8"))
    d.update(lang=l, site=SITE, url=f"{SITE}/{l}/", email=EMAIL, year=datetime.date.today().year, css=css, js=js, credits=credits, og=url(*IMG["hero"][:2]))
    for k, v in IMG.items(): d["img_" + k] = url(v[0], v[1])
    d["hreflang"] = "\n".join(f'<link rel="alternate" hreflang="{k}" href="{SITE}/{k}/">' for k in LANGS) + f'\n<link rel="alternate" hreflang="x-default" href="{SITE}/en/">'
    d["langnav"] = " ".join(f'<a href="../{k}/" hreflang="{k}" lang="{k}"' + (' aria-current="true"' if k == l else '') + f'>{k.upper()}</a>' for k in LANGS)
    d.update(sections(d))
    out = re.sub(r"\{\{(\w+)\}\}", lambda m: str(d[m.group(1)]), tpl)
    (R/l).mkdir(exist_ok=True); (R/l/"index.html").write_text(out, encoding="utf-8")
(R/"sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f"<url><loc>{SITE}/{l}/</loc></url>\n" for l in LANGS) + "</urlset>\n")
(R/"robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n")
print("OK")
