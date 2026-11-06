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

---

## Stap 6 – Achtergrondgloed (2026-11-04)

**Wat:** Subtiele achtergrondgloed in Italiaanse kleuren toegevoegd.

**Gewijzigde bestanden:**
- `src/styles.css` – Radial gradients op de body (oranje linksboven, groen rechtsonder), gloed-variabelen voor light en dark mode

**Resultaat:** De achtergrond heeft een warme, subtiele gloed in oranje en groen — een knipoog naar de Italiaanse vlag. Werkt in zowel light als dark mode.

---

## Stap 7 – Hoofdstukken als startpagina (2026-11-04)

**Wat:** De lay-out geherstructureerd zodat hoofdstukken als knoppen op de startpagina verschijnen, in plaats van een dropdown.

**Gewijzigde bestanden:**
- `src/App.tsx` – Dropdown-selector vervangen door hoofdstuk-knoppen op de startpagina. Klik op een hoofdstuk → oefentabs verschijnen. "← Hoofdstukken" terugknop om terug te gaan naar het overzicht.
- `src/styles.css` – Styling voor hoofdstuk-knoppen (nummer, titel, info), terugknop en lestitel.

**Resultaat:** De startpagina toont elk hoofdstuk als een grote, klikbare kaart met het hoofdstuknummer, de titel en het aantal woorden/vragen. Na het klikken verschijnen de oefentabs (Woorden, Flashcards, Meerkeuze, Invullen, Vertalen, Grammatica) met een terugknop naar het overzicht.

---

## Stap 8 – Leerpad-layout (2026-11-05)

**Wat:** De rechthoekige hoofdstukkaarten vervangen door een game-achtig leerpad met bolletjes op een slingerende weg.

**Gewijzigde bestanden:**
- `src/App.tsx` – Hoofdstukken worden nu als cirkels (bolletjes) getoond die zigzaggen over het scherm. SVG-connectoren tekenen gebogen stippellijnen tussen de bolletjes. Een vervaagd vraagteken-bolletje ("Binnenkort...") hint naar toekomstige hoofdstukken.
- `src/styles.css` – Nieuwe leerpad-styling: ronde bolletjes met gloed-effect, hover-animatie (schaalvergroting), zigzag-positionering (links/rechts), vergrendeld-stijl voor toekomstige hoofdstukken.

**Resultaat:** De startpagina ziet eruit als een leerpad uit een game. Hoofdstuk 1 is een oranje bolletje met het nummer "1", verbonden via een gebogen stippellijn naar een grijs vraagteken dat aangeeft dat er meer hoofdstukken komen. Bij het toevoegen van meer hoofdstukken slingert het pad automatisch heen en weer.

---

## Stap 9 – Italiaanse vlag als app-icoon (2026-11-05)

**Wat:** Het PWA-icoon gewijzigd van een blauw "IT"-blok naar de Italiaanse vlag.

**Gewijzigde bestanden:**
- `public/icon.svg` – Nieuw icoon: Italiaanse driekleur (groen-wit-rood) met afgeronde hoeken en "IT" tekst in het midden.
- `vite.config.ts` – Theme-kleur aangepast van blauw (#1f6feb) naar Italiaans groen (#009246), achtergrondkleur naar warm donker (#1a1412).

**Resultaat:** Op het homescreen van je telefoon verschijnt nu de Italiaanse vlag als app-icoon. Na het opnieuw installeren van de PWA is het nieuwe icoon zichtbaar.

---

## Stap 10 – Hoofdstuk 2 "Come eravamo" (2026-11-06)

**Wat:** Hoofdstuk 2 toegevoegd met oefenstof over de imperfetto, vergelijkingen, uiterlijk en persoonlijkheid.

**Gewijzigde bestanden:**
- `src/data/les-02.json` – Nieuw lesbestand met 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

**Content omvat:**
- Grammatica: imperfetto (regelmatig en onregelmatig), comparativo di maggioranza/minoranza/uguaglianza, presente storico, voorzetsels nel/dal...al + jaar, voegwoorden né...né
- Woordenschat: kindertijd, levensfasen (bambino/ragazzo/giovane/anziano), uiterlijk (alto/basso/magro/grasso), persoonlijkheid (timido/simpatico/allegro), vergelijkingen (più...di, meno...di, così...come)
- Communicatie: gewoontes en herinneringen uit het verleden vertellen, uiterlijk en persoonlijkheid beschrijven, vergelijkingen maken, een biografie schrijven

**Resultaat:** Het leerpad toont nu twee hoofdstukken met een slingerende weg ertussen. Hoofdstuk 2 bevat alle zes oefenvormen: woorden, flashcards, meerkeuze, invullen, vertalen en grammatica.

---

## Stap 11 – Hoofdstuk 3 "Persone che contano" (2026-11-06)

**Wat:** Hoofdstuk 3 toegevoegd met oefenstof over passato prossimo vs. imperfetto, indirecte voornaamwoorden en gevoelens uitdrukken.

**Gewijzigde bestanden:**
- `src/data/les-03.json` – Nieuw lesbestand met 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

**Content omvat:**
- Grammatica: passato prossimo vs. imperfetto, imperfetto con mentre, pronomi tonici, pronomi indiretti, accordo pronome diretto e participio passato, verbi + preposizioni (provare a, cercare di, smettere di, aiutare a), avverbio ecco
- Woordenschat: relaties (coppia, matrimonio, sposi), gevoelens (affetto, entusiasmo, stupore, rammarico), tijdsuitdrukkingen (a un certo punto, improvvisamente, prima, poi), uitroepen (Congratulazioni!, Davvero?, Che peccato!)
- Communicatie: gewoontes en gebeurtenissen in het verleden vertellen, gevoelens uitdrukken, feliciteren, verbazing en teleurstelling uitdrukken

**Resultaat:** Het leerpad slingert nu met drie hoofdstukken. Hoofdstuk 3 bevat alle zes oefenvormen.

---

## Stap 12 – Hoofdstuk 4 "Stare bene" (2026-11-06)

**Wat:** Hoofdstuk 4 toegevoegd met oefenstof over gezondheid, lichaam, sport en de formele gebiedende wijs.

**Gewijzigde bestanden:**
- `src/data/les-04.json` – Nieuw lesbestand met 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

**Content omvat:**
- Grammatica: plurali irregolari (lichaamsdelen: il braccio → le braccia), imperativo con Lei (regelmatig en onregelmatig), imperativo con noi/voi, troppo/tanto (bijvoeglijk naamwoord vs. bijwoord), ne partitivo, indefinito nessuno, non...più, partitivo singolare/plurale, numeri ordinali na decimo
- Woordenschat: lichaamsdelen (testa, schiena, gola, stomaco, braccio, gamba, ginocchio, dito), apotheek en gezondheid (farmacia, ricetta, pastiglia, sciroppo, febbre, tosse, dolore), sport en beweging
- Communicatie: symptomen beschrijven, formele instructies geven (prenda, vada, faccia), hoeveelheden aangeven, naar de eerste hulp gaan

**Resultaat:** Het leerpad slingert nu met vier hoofdstukken. Hoofdstuk 4 bevat alle zes oefenvormen.

---

## Stap 13 – Hoofdstuk 5 "Servizi" (2026-11-06)

**Wat:** Hoofdstuk 5 toegevoegd met oefenstof over winkelen, kleding, postkantoor en politiebureau.

**Gewijzigde bestanden:**
- `src/data/les-05.json` – Nieuw lesbestand met 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

**Content omvat:**
- Grammatica: stare + gerundio (progressive vorm), imperativo con tu e pronomi (prendilo!, dimmi!, fallo!), imperativo con Lei/voi/noi e pronomi (lo prenda!), verbo pronominale averci, gerundio onregelmatig (facendo, bevendo, dicendo)
- Woordenschat: markt en kleding (sconto, saldi, taglia, tessuto, cotone, lana, seta), patronen (a righe, a quadri, a tinta unita), postkantoor (pacco, francobollo, raccomandata, spedire), politiebureau (commissariato, furto, denunciare, rubare), accessoires (borsa, portafoglio, occhiali, orologio, cintura)
- Communicatie: korting vragen, kleding passen, aangifte doen van diefstal, pakket versturen

**Resultaat:** Het leerpad slingert nu met vijf hoofdstukken. Hoofdstuk 5 bevat alle zes oefenvormen.

---

## Stap 14 – Hoofdstuk 6 "Ci andiamo?" (2026-11-06)

**Wat:** Hoofdstuk 6 toegevoegd met oefenstof over film, bioscoop, voorstellen doen en gecombineerde voornaamwoorden.

**Gewijzigde bestanden:**
- `src/data/les-06.json` – Nieuw lesbestand met 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

**Content omvat:**
- Grammatica: ne di argomento, da + infinito (passieve waarde), bisogna (onpersoonlijk werkwoord), pronomi combinati (me lo, glielo, etc.), già/non ancora + passato prossimo, pronome diretto + participio passato, infinito per ordini e istruzioni
- Woordenschat: film en bioscoop (regista, attore, commedia, film d'azione, documentario, schermo, biglietto), culturele evenementen (festival, concerto, mostra, spettacolo, rassegna), voorstellen en reageren (Ti va di...?, Che ne dici di...?, D'accordo!)
- Communicatie: voorstellen doen en reageren, films bespreken, culturele meningen geven, openbare instructies begrijpen

**Resultaat:** Het leerpad slingert nu met zes hoofdstukken. Hoofdstuk 6 bevat alle zes oefenvormen.

---

## Stap 15 – Hoofdstuk 7 "Vita e lavoro" (2026-11-06)

**Wat:** Hoofdstuk 7 toegevoegd met oefenstof over werk, beroepen, toekomstplannen en de futuro semplice.

**Gewijzigde bestanden:**
- `src/data/les-07.json` – Nieuw lesbestand met 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

**Content omvat:**
- Grammatica: pronome relativo che, verbo pronominale metterci, futuro semplice (regelmatig, onregelmatig en ingekort), tra/fra (voorzetsels), connettivi (cioè, siccome, insomma, perché), forme difettive beroepen, futuro epistemico
- Woordenschat: beroepen (avvocato, ingegnere, medico, impiegato), werkomgeving (collega, stipendio, riunione, curriculum, colloquio), e-mail/telefoon (Gentile, Cordiali saluti, Distinti saluti, Pronto?), verandering (cambiare, licenziarsi, cambiamento)
- Communicatie: werkdag beschrijven, toekomstplannen maken, formeel telefoneren, formele e-mails schrijven, oorzaken en gevolgen uitdrukken

**Resultaat:** Het leerpad slingert nu met zeven hoofdstukken. Alle hoofdstukken 1 t/m 7 bevatten elk 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

---

## Stap 16 – Hoofdstuk 8 "Mi serve!" (2026-11-06)

**Wat:** Hoofdstuk 8 toegevoegd met oefenstof over huishoudelijke voorwerpen, woningen, het condizionale presente en betrekkelijk voornaamwoord cui.

**Gewijzigde bestanden:**
- `src/data/les-08.json` – Nieuw lesbestand met 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

**Content omvat:**
- Grammatica: pronome relativo cui (na voorzetsels), superlativo relativo, condizionale presente (regelmatig en onregelmatig), bello anteposto al nome, alterati (-ino, -etto, -one), voorzetsel entro, servire (mi serve/servono)
- Woordenschat: huishoudelijke voorwerpen (cacciavite, forbici, apriscatole), huishoudelijke apparaten (frigorifero, lavatrice, lavastoviglie, aspirapolvere), woning (appartamento, affitto, monolocale, bilocale, arredato), afval (raccolta differenziata, buttare, riuso)
- Communicatie: voorwerpen beschrijven, hulp aanbieden (Le serve una mano?), bedanken en reageren (Non c'è di che, Si figuri!), woningadvertenties begrijpen

**Resultaat:** Het leerpad slingert nu met acht hoofdstukken.

---

## Stap 17 – Hoofdstuk 9 "L'Italia cambia" (2026-11-06)

**Wat:** Hoofdstuk 9 toegevoegd met oefenstof over familie, huwelijk, huishoudelijk werk, stereotypen en de onpersoonlijke si-constructie.

**Gewijzigde bestanden:**
- `src/data/les-09.json` – Nieuw lesbestand met 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

**Content omvat:**
- Grammatica: sapere vs. conoscere (ook in passato prossimo), stare per + infinito, avverbi in -mente, forma impersonale con si, indefiniti (alcuni/qualche)
- Woordenschat: moderne familie (coniuge, matrigna, patrigno, fratellastro, sorellastra, famiglia allargata), huishoudelijk werk (faccende domestiche, bucato, stirare, sparecchiare, fare il letto), stereotypen en meningen
- Communicatie: kennis en onwetendheid uitdrukken, huishoudelijke taken bespreken, mening geven over stereotypen, tutoyeren (darci del tu)

**Resultaat:** Het leerpad slingert nu met negen hoofdstukken.

---

## Stap 18 – Hoofdstuk 10 "Buono o cattivo?" (2026-11-06)

**Wat:** Hoofdstuk 10 toegevoegd met oefenstof over eten, smaken, restaurants en Italiaanse voedingscultuur.

**Gewijzigde bestanden:**
- `src/data/les-10.json` – Nieuw lesbestand met 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.

**Content omvat:**
- Grammatica: congiunzioni però/mentre (avversativo), particella ne + passato prossimo (aanpassing participio), constructie che + aggettivo/nome (uitroepen), futuro epistemico (vermoedens)
- Woordenschat: smaken (dolce, amaro, salato, piccante, saporito), restauranttypes (ristorante, trattoria, osteria, tavola calda), maaltijdstructuur (antipasto, primo, secondo, contorno, dolce), ijs (cono, coppetta, panna, gusto), bestellen (menù, conto, ordinare, assaggiare)
- Communicatie: smaken beschrijven, bestellen in een restaurant, ijs bestellen, voorkeuren en afkeer uitdrukken (Non sopporto..., Per me non ha senso), Italiaanse voedingsregels

**Resultaat:** Het leerpad bevat nu alle 10 hoofdstukken van het boek "Dieci lezioni di italiano". Elk hoofdstuk heeft 30 woorden, 20 meerkeuzevragen, 15 invuloefeningen, 15 vertaalzinnen en 10 grammatica-uitleg.
