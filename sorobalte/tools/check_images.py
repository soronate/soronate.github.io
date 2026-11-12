#!/usr/bin/env python3
"""Teste chaque image de tools/build.py et liste celles qui répondent en erreur (404...). À lancer sur un poste connecté : python3 tools/check_images.py"""
import re, sys, pathlib, urllib.request, urllib.error
src = (pathlib.Path(__file__).parent / "build.py").read_text(encoding="utf-8")
ns = {}
exec(src.split("import html")[0].replace("R = pathlib", "R = None #"), ns)   # IMG, url()
bad = 0
for k, (f, w, *_ ) in ns["IMG"].items():
    u = ns["url"](f, w)
    try:
        r = urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "sorobalte-check/1.0"}), timeout=30); ok = r.status == 200
    except urllib.error.HTTPError as e: ok, r = False, e
    except Exception as e: ok, r = False, e
    if not ok: bad += 1; print(f"✗ {k:9} {f}  ->  {getattr(r, 'code', r)}")
print("Toutes les images répondent." if not bad else f"{bad} image(s) à remplacer dans IMG (tools/build.py) puis : python3 tools/build.py")
sys.exit(1 if bad else 0)
