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
- `public/icon.svg` – App-icoon
- GitHub repository aangemaakt en code gepusht

**Deployment:** Via `npm run deploy` (bouwt de app en pusht naar de `gh-pages` branch).

**Resultaat:** De app is bereikbaar op je telefoon via https://truusje13.github.io/italiano-oefenapp/ en kan als app op je homescreen worden geinstalleerd.

---

## Stap 3 – Grammatica-tab (2026-11-04)

**Wat:** Een vijfde tab "Grammatica" toegevoegd met uitklapbare kaarten per grammaticaregel.

**Gewijzigde bestanden:**
- `src/App.tsx` – Grammatica-tab en component toegevoegd (uitklapbare `<details>` kaarten)
- `src/styles.css` – Styling voor grammatica-kaarten (uitklapbaar, accent-pijltje, uitleg)

**Resultaat:** Onder de tab "Grammatica" staan 8 uitklapbare kaarten met uitleg over de grammatica van hoofdstuk 1: superlativo, prima di + infinito, da/per, passato prossimo, sapere + infinito, mai/sempre/ancora, sia...che...

---

## Stap 4 – Speelse look-and-feel (2026-11-04)

**Wat:** De hele app een nieuwe, warmere en speelsere uitstraling gegeven.

**Gewijzigde bestanden:**
- `src/styles.css` – Volledig vernieuwd kleurenpalet (warm oranje accent), rondere knoppen met schaduw, hover-animaties, betere typografie, Italiaanse vlag-emoji in de titel
- `src/App.tsx` – Subtitel toegevoegd onder de titel

**Wijzigingen:**
- Kleurenpalet: van koel blauw naar warm oranje/terracotta (#e85d26), met crèmekleurige achtergrond
- Knoppen: pill-shaped (border-radius: 20px) met schaduw en hover-effecten
- Kaarten: grotere padding, geen rand maar schaduw, rondere hoeken
- Feedback: goed/fout-meldingen met gekleurde achtergrond-pills
- Meerkeuze-uitleg: zachtoranje achtergrondblok
- Input: dikkere rand die oranje kleurt bij focus
- Beoordeling-knoppen: kleurcodering (rood/groen)
- NL↔IT richtingkiezer: segmented control stijl
- Dark mode: aangepast aan het warme kleurenpalet

---

## Stap 5 – Woorden-tab (2026-11-04)

**Wat:** Een zesde tab "Woorden" toegevoegd met een zoekbare woordenlijst.

**Gewijzigde bestanden:**
- `src/App.tsx` – Woorden-tab en component toegevoegd (zoekbalk, kaartjes per woord met woordsoort-label en voorbeeldzin)
- `src/styles.css` – Styling voor woordenlijst (zoekbalk, woord-kaartjes, woordsoort-labels)

**Resultaat:** De tab "Woorden" toont alle 30 woorden van hoofdstuk 1 als overzichtelijke kaartjes. Je kunt zoeken op Italiaans of Nederlands. Elk woord toont: Italiaans woord, woordsoort, Nederlandse vertaling en een voorbeeldzin.
