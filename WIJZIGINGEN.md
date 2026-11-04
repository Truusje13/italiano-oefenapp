# Wijzigingslog – Italiano oefenapp

Elke stap staat hieronder beschreven. Als iets niet werkt, kun je teruggaan naar een eerdere stap door de genoemde commit te herstellen met:
```
git checkout <commit-hash> -- .
```

---

## Stap 1 – Hoofdstuk 1 content en meerkeuzevragen (2026-11-04)

**Wat:** De placeholder-les vervangen door echte oefenstof uit hoofdstuk 1 "IMPARARE".

**Gewijzigde bestanden:**
- `src/schema/les.ts` – `meerkeuzeSchema` toegevoegd aan het datamodel
- `src/App.tsx` – Meerkeuze-tab en component toegevoegd (4e tab naast Flashcards, Invullen, Vertalen)
- `src/data/les-01.json` – 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen, 8 grammatica-uitleg
- `src/styles.css` – Styling voor meerkeuze-opties (groen/rood feedback, uitleg)

**Content omvat:**
- Grammatica: superlativo -issimo, ottimo/pessimo/massimo/minimo, prima di + infinito, da/per voor tijdsduur, passato prossimo riflessivi/modali, sapere + infinito, mai/sempre/non...ancora, sia...che...
- Woordenschat: tijdsuitdrukkingen, per-formules, suonare vs giocare, vrije tijd, onderwijs
- Communicatie: praten over taalervaring, tijdsduur aangeven, vaardigheden beschrijven

---

## Stap 2 – PWA-deployment voor telefoon (2026-11-04)

**Wat:** De app beschikbaar gemaakt op telefoon via GitHub Pages als installeerbare PWA.

**Gewijzigde bestanden:**
- `vite.config.ts` – base path ingesteld voor GitHub Pages
- `index.html` – PWA-icoon link toegevoegd
- PWA-iconen gegenereerd (192x192 en 512x512)
- `.github/workflows/deploy.yml` – Automatische deployment bij elke push
- GitHub repository aangemaakt en code gepusht

**Resultaat:** De app is bereikbaar op je telefoon via de GitHub Pages URL en kan als app op je homescreen worden geinstalleerd.
