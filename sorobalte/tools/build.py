#!/usr/bin/env python3
"""Génère les pages autonomes (fr, en, lv + pages légales). Usage : python3 tools/build.py"""
import json, re, html, datetime, pathlib
from urllib.parse import quote
R = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://soronate.github.io/sorobalte"
EMAIL_B64 = "Q29udGFjdFNvcm9uYXRlQGdtYWlsLmNvbQ=="      # adresse de contact encodée : jamais écrite en clair dans les pages
SIRET = ""                 # ex. "SIRET : 000 000 000 00000" (affiché dans les mentions légales si renseigné)
LANGS = ["fr", "en", "lv"]
STD = (500, 960, 1280, 1920)   # largeurs standard servies par Wikimedia
IMG = {
 "hero": ("Riga (23621609751).jpg", 1280, "Riga", "Flickr via Commons"),
 "pano": ("Riga Skyline Panorama, Latvia - Diliff.jpg", 1920, "Panorama", "Diliff"),
 "riga": ("Riga-Blick von Petrikirche01.jpg", 960, "Vue de Riga", "Nikater"),
 "old": ("Street Scene - Old Town - Riga - Latvia - 02.jpg", 960, "Vecrīga", "Adam Jones"),
 "nouveau": ("Immeuble art nouveau (Riga) (7567163020).jpg", 960, "Alberta iela 4", "J.-P. Dalbéra"),
 "market": ("Riga central market.jpg", 960, "Centrāltirgus", "Kulmalukko"),
 "rundale": ("Latvia Rundāle palace 2.jpg", 960, "Rundāle", "Wojsyl"),
 "gauja": ("Turaidas skats uz Gauju 2okt04.JPG", 960, "Gauja", "Gatis Pāvils"),
 "jurmala": ("Majori beach Jūrmala.jpg", 960, "Majori", "Roquai"),
 "kuldiga": ("Ventas rumba, 13.05.2012.jpg", 960, "Ventas rumba", "Wikimedia Commons"),
 "hall": ("Ryga1.2007-08-09.jpg", 960, "Melngalvju nams", "Algėrds"),
 "cesis": ("CesuPils 2017-09-10.jpg", 960, "Cēsis", "Wikimedia Commons"),
 "freedom": ("Freedom Monument Latvia 05.jpg", 960, "Brīvības piemineklis", "Wikimedia Commons"),
 "song": ("Latvian Song festival 2008.jpg", 960, "Dziesmu svētki", "Wikimedia Commons"),
 "rye": ("Rupjmaizes kārtojums.jpg", 500, "Rupjmaizes kārtojums", "Wikimedia Commons"),
 "bridge": ("Kuldiga bridge.jpg", 960, "Kuldīgas tilts", "Wikimedia Commons"),
 "turc": ("Turaida Castle.JPG", 960, "Turaidas pils", "Pudelek"),
 "mhall": ("Riga Central Market Hall.jpg", 960, "Centrāltirgus", "Wikimedia Commons"),
 "townhall": ("Riga town hall.jpg", 960, "Rātslaukums", "Wikimedia Commons"),
 "rund2": ("Rundale05.jpg", 960, "Rundāles dārzs", "Nikater"),
 "turaida": ("Turaidas-pils.jpg", 960, "Turaida", "Wikimedia Commons"),
 "kolka": ("Tranquil blue (1258425411).jpg", 960, "Kolka", "Mar10os"),
 "karosta": ("Karosta church.JPG", 960, "Karosta", "Kulmalukko"),
 "castle": ("Riga-Schloss02.jpg", 960, "Rīgas pils", "Nikater"),
 "gate": ("Svenskporten Riga.jpg", 960, "Zviedru vārti", "Tahbepet"),
 "dome": ("Riga Dom-Düna.jpg", 960, "Doms", "Brunswyk"),
 "tram": ("Retro tramvaj v Rize.jpg", 960, "Tramvajs", "Dezidor"),
 "sigulda": ("The new Sigulda castle (2).JPG", 960, "Sigulda", "P.-A. Leclercq"),
}
OUT=[(21.05,56.45),(21.05,56.9),(21.3,57.2),(21.55,57.55),(21.8,57.6),(22.6,57.76),(22.9,57.55),(23.1,57.35),(23.6,57.05),(24.1,57.05),(24.3,57.3),(24.35,57.87),(26.03,57.77),(27.05,57.45),(27.7,57.2),(28.2,56.65),(28.1,56.1),(27.65,55.95),(26.6,55.68),(25.9,56.0),(25.3,56.15),(24.7,56.4),(24.0,56.3),(23.3,56.4),(22.6,56.4),(21.8,56.35)]
GAL=["hero","gate","castle","freedom","dome","townhall","tram","nouveau","mhall","market","rundale","rund2","gauja","turc","sigulda","cesis","song","kolka","jurmala","kuldiga","bridge","karosta"]
def url(f, w):
    w = min(x for x in STD if x >= w)
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + quote(f.replace(" ", "_")) + f"?width={w}"
def page(f): return "https://commons.wikimedia.org/wiki/File:" + quote(f.replace(" ", "_"))
e = html.escape
credits = ", ".join(f'<a href="{page(f)}" rel="noopener">{n}</a> ({a})' for f, w, n, a in IMG.values())
MARK = (R/"logo/logo-mark.svg").read_text().replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">', '<svg class="mark" viewBox="0 0 48 48" aria-hidden="true">')
def sections(d):
    E=[("exp1","old","riga"),("exp2","nouveau","riga"),("exp3","market","riga"),("exp7","castle","riga"),("exp8","gate","riga"),("exp10","freedom","riga"),("exp4","rundale","trip"),("exp5","kolka","trip"),("exp6","karosta","trip"),("exp9","cesis","trip")]
    I=lambda s,a,w,h_: f'<img onerror="imgFix(this)" src="{s}" alt="{e(a)}" width="{w}" height="{h_}" loading="lazy">'
    cards="".join(f'<article class="card" data-cat="{c}"><div>{I(d["img_"+i],d[k+"_t"],800,533)}</div><h3>{d[k+"_t"]}</h3><p>{d[k+"_d"]}</p><button type="button" class="add" aria-pressed="false" data-n="{e(d[k+"_t"])}" data-a="{e(d["add_l"])}" data-b="{e(d["added_l"])}">{d["add_l"]}</button></article>' for k,i,c in E)
    chips="".join(f'<button type="button" class="chip{" on" if f=="*" else ""}" data-f="{f}">{d["chip_"+n]}</button>' for f,n in [("*","all"),("riga","riga"),("trip","trip")])
    P=[("Riga",24.1,56.95,"riga","riga"),("Jūrmala",23.65,57.0,"jurmala","jurmala"),("Sigulda",24.85,57.15,"sigulda","sigulda"),("Cēsis",25.27,57.31,"cesis","cesis"),("Kuldīga",21.97,56.97,"kuldiga","kuldiga"),("Liepāja",21.01,56.51,"liepaja","karosta"),("Rundāle",24.03,56.41,"rundale","rundale"),("Kolka",22.59,57.76,"kolka","kolka")]
    pins="".join(f'<button type="button" class="pin" style="left:{(x-20.9)/7.4*100:.1f}%;top:{(58.1-y)/2.5*100:.1f}%" data-t="{n}" data-i="{url(IMG[im][0],960)}" data-d="{e(d["pin_"+k])}" aria-label="{n}"><i></i></button>' for n,x,y,k,im in P)
    poly=" ".join(f"{(x-20.9)/7.4*407:.0f},{(58.1-y)/2.5*250:.0f}" for x,y in OUT)
    def tabs(items):
        return '<div class="tabs" data-tabs><div class="tl" role="tablist">'+"".join(f'<button type="button" role="tab" aria-selected="{"true" if i==0 else "false"}">{a}</button>' for i,(a,_) in enumerate(items))+'</div>'+"".join(f'<div class="tp" role="tabpanel"{"" if i==0 else " hidden"}>{b}</div>' for i,(_,b) in enumerate(items))+'</div>'
    itin=tabs([(f'{d["day"]} {i}',f'<h3>{d[f"d{i}_t"]}</h3><p>{d[f"d{i}_d"]}</p>') for i in (1,2,3)])
    seas=tabs([(d[f"s{i}"],f'<p>{d[f"s{i}_d"]}</p>') for i in (1,2,3,4)])
    hist=tabs([(y,f'<p>{d[f"h{i}"]}</p>') for i,y in enumerate(["1201","1282","1873","1918","1991","2004","2014","2023"],1)])
    reg=tabs([(n,f'<p>{d[f"reg{i}"]}</p>') for i,n in enumerate(["Rīga · Jūrmala","Vidzeme","Kurzeme","Zemgale","Latgale"],1)])
    tips="".join(f'<article class="note"><h3>{d[f"tip{i}_t"]}</h3><p>{d[f"tip{i}_d"]}</p></article>' for i in (1,2,3,4))
    steps="".join(f'<article class="note"><b class="n">{i}</b><h3>{d[f"st{i}_t"]}</h3><p>{d[f"st{i}_d"]}</p></article>' for i in (1,2,3))
    gal="".join(f'<button type="button" class="gi" data-full="{url(IMG[k][0],1920)}" data-cap="{e(IMG[k][2])} – {e(IMG[k][3])}">{I(d["img_"+k],IMG[k][2],800,533)}<span>{e(IMG[k][2])}</span></button>' for k in GAL)
    hx="".join(f'<img data-src="{url(IMG[k][0],1280)}" data-set="{url(IMG[k][0],1280)} 1280w, {url(IMG[k][0],1920)} 1920w" sizes="100vw" alt="" width="1280" height="853" onerror="imgFix(this)">' for k in ("jurmala","cesis","gauja"))
    return dict(hero_extra=hx,
     sec_map=f'<section id="map" class="wrap"><h2>{d["map_h"]}</h2><p class="lead">{d["map_p"]}</p><div class="mapbox"><div class="map"><svg viewBox="0 0 407 250" aria-hidden="true"><polygon points="{poly}"/></svg>{pins}</div><div class="mapinfo" aria-live="polite"><img onerror="imgFix(this)" alt="" width="960" height="540"><div><h3></h3><p></p></div></div></div></section>',
     sec_regions=f'<section id="regions" class="wrap narrow"><h2>{d["reg_h"]}</h2>{reg}</section>',
     sec_exp=f'<section id="exp" class="band"><div class="wrap"><h2>{d["exp_h"]}</h2><div class="chips" role="group">{chips}</div><input type="search" class="sq" placeholder="{e(d["search_l"])}" aria-label="{e(d["search_l"])}"><div class="grid g4">{cards}</div><p class="none" hidden>{d["none"]}</p></div></section>',
     sec_itin=f'<section id="itin" class="wrap narrow"><h2>{d["itin_h"]}</h2>{itin}</section>',
     sec_gal=f'<section id="gallery" class="band"><div class="wrap"><h2>{d["gal_h"]}</h2><div class="galw"><button type="button" class="ga" data-g="-1" aria-label="{d["lb_prev"]}">‹</button><div class="gal">{gal}</div><button type="button" class="ga" data-g="1" aria-label="{d["lb_next"]}">›</button></div></div></section>',
     sec_song=f'<section id="song" class="wrap split">{I(d["img_song"],d["song_h"],960,640)}<div><h2>{d["song_h"]}</h2><p>{d["song_p"]}</p><div class="jani"><span>{d["jani_l"]}</span><b id="jd">–</b><span>{d["jani_u"]}</span></div></div></section>',
     sec_hist=f'<section id="history" class="band"><div class="wrap narrow"><h2>{d["hist_h"]}</h2>{hist}</div></section>',
     sec_steps=f'<section id="steps" class="wrap"><h2>{d["steps_h"]}</h2><div class="grid">{steps}</div></section>',
     sec_seasons=f'<section id="seasons" class="band"><div class="wrap narrow"><h2>{d["seas_h"]}</h2>{seas}</div></section>',
     sec_tips=f'<section id="tips" class="wrap"><h2>{d["tips_h"]}</h2><div class="grid g4">{tips}</div></section>')
tpl=(R/"src/template.html").read_text(encoding="utf-8"); ltpl=(R/"src/legal.html").read_text(encoding="utf-8")
css=(R/"src/style.css").read_text(); common=(R/"src/common.js").read_text().replace("__E__",EMAIL_B64)
js=common+(R/"src/main.js").read_text(); ljs=common
def fill(t,d): return re.sub(r"\{\{(\w+)\}\}",lambda m:str(d[m.group(1)]),t)
today=datetime.date.today()
for l in LANGS:
    d=json.loads((R/f"src/i18n/{l}.json").read_text(encoding="utf-8"))
    lgd="../en/" if l=="lv" else ""
    d.update(lang=l,site=SITE,url=f"{SITE}/{l}/",year=today.year,css=css,js=js,credits=credits,og=url(IMG["hero"][0],1280),mark=MARK,lgd=lgd)
    for k,v in IMG.items(): d["img_"+k]=url(v[0],v[1])
    d["img_hero_set"]=f'{url(IMG["hero"][0],1280)} 1280w, {url(IMG["hero"][0],1920)} 1920w'
    d["hreflang"]="\n".join(f'<link rel="alternate" hreflang="{k}" href="{SITE}/{k}/">' for k in LANGS)+f'\n<link rel="alternate" hreflang="x-default" href="{SITE}/en/">'
    d["langnav"]=" ".join(f'<a href="../{k}/" hreflang="{k}" lang="{k}"'+(' aria-current="true"' if k==l else '')+f'>{"🇫🇷" if k=="fr" else "🇬🇧" if k=="en" else "🇱🇻"}</a>' for k in LANGS)
    d.update(sections(d))
    (R/l).mkdir(exist_ok=True); (R/l/"index.html").write_text(fill(tpl,d),encoding="utf-8")
    if l=="lv": continue
    leg=json.loads((R/f"src/legal_{l}.json").read_text(encoding="utf-8"))
    nav=" ".join(f'<a href="{f}.html">{d[k]}</a>' for f,k in [("mentions","lg_mentions"),("politique","lg_privacy"),("accessibilite","lg_access")])
    for f,(t,body) in leg.items():
        body=body.replace("{{siret}}",f"<p>{SIRET}</p>" if SIRET else "")
        ld=dict(lang=l,t=t,b=body,canon=f"{SITE}/{l}/{f}.html",css=css,js=ljs,mark=MARK,theme=d["theme"],lg_back=d["lg_back"],lg_upd=d["lg_upd"],date=today.isoformat(),year=today.year,lgnav=nav)
        (R/l/f"{f}.html").write_text(fill(ltpl,ld),encoding="utf-8")
urls=[f"{SITE}/{l}/" for l in LANGS]+[f"{SITE}/{l}/{f}.html" for l in ("fr","en") for f in ("mentions","politique","accessibilite")]
(R/"sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+"".join(f"<url><loc>{u}</loc></url>\n" for u in urls)+"</urlset>\n")
(R/"robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n")
print("OK")
