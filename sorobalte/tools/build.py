#!/usr/bin/env python3
"""Génère des pages autonomes fr/ en/ lv/ (CSS et JS inclus) + sitemap + robots. Usage : python3 tools/build.py"""
import json, re, datetime, pathlib
from urllib.parse import quote
R = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://VOTRE-COMPTE.github.io/sorobalte"   # à remplacer (GitHub Pages ou domaine Cloudflare)
EMAIL = "contact@sorobalte.example"                 # à remplacer
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
 "turaida": ("Turaidas-pils.jpg", 800, "Turaida", "Wikimedia Commons"),
}
def url(f, w): return "https://commons.wikimedia.org/wiki/Special:FilePath/" + quote(f.replace(" ", "_")) + f"?width={w}"
def page(f): return "https://commons.wikimedia.org/wiki/File:" + quote(f.replace(" ", "_"))
credits = ", ".join(f'<a href="{page(f)}" rel="noopener">{n}</a> ({a})' for f, w, n, a in IMG.values())
tpl = (R/"src/template.html").read_text(encoding="utf-8")
css = (R/"src/style.css").read_text(); js = (R/"src/main.js").read_text()
for l in LANGS:
    d = json.loads((R/f"src/i18n/{l}.json").read_text(encoding="utf-8"))
    d.update(lang=l, site=SITE, url=f"{SITE}/{l}/", email=EMAIL, year=datetime.date.today().year, css=css, js=js, credits=credits, og=url(*IMG["hero"][:2]))
    for k, v in IMG.items(): d["img_" + k] = url(v[0], v[1])
    d["hreflang"] = "\n".join(f'<link rel="alternate" hreflang="{k}" href="{SITE}/{k}/">' for k in LANGS) + f'\n<link rel="alternate" hreflang="x-default" href="{SITE}/en/">'
    d["langnav"] = " ".join(f'<a href="../{k}/" hreflang="{k}" lang="{k}"' + (' aria-current="true"' if k == l else '') + f'>{k.upper()}</a>' for k in LANGS)
    out = re.sub(r"\{\{(\w+)\}\}", lambda m: str(d[m.group(1)]), tpl)
    (R/l).mkdir(exist_ok=True); (R/l/"index.html").write_text(out, encoding="utf-8")
(R/"sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f"<url><loc>{SITE}/{l}/</loc></url>\n" for l in LANGS) + "</urlset>\n")
(R/"robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n")
print("OK")
