import { Fragment, useMemo, useState } from "react";
import { lesSchema, type Les } from "./schema/les";
import { isJuist } from "./lib/normaliseer";
import {
  beoordeelKaart,
  isVandaagAan,
  nieuweVoortgang,
  type Beoordeling,
  type KaartVoortgang
} from "./lib/srs";

const STORAGE_SLEUTEL = "italiano-voortgang";

interface Leerpad {
  id: string;
  naam: string;
  lessen: Les[];
}

const lessenBestanden = import.meta.glob("./data/**/*.json", {
  eager: true,
  import: "default"
});

const LEERPADEN_CONFIG: { id: string; naam: string; map: string }[] = [
  { id: "allegro-1", naam: "Allegro 1", map: "allegro-1" },
  { id: "dieci", naam: "Dieci", map: "dieci" },
];

function laadLeerpaden(): { leerpaden: Leerpad[]; fouten: string[] } {
  const fouten: string[] = [];
  const leerpaden: Leerpad[] = LEERPADEN_CONFIG.map((cfg) => {
    const lessen: Les[] = [];
    for (const [pad, data] of Object.entries(lessenBestanden)) {
      if (!pad.includes(`/${cfg.map}/`)) continue;
      const resultaat = lesSchema.safeParse(data);
      if (resultaat.success) {
        lessen.push(resultaat.data);
      } else {
        const details = resultaat.error.issues
          .map((i) => `${i.path.join(".") || "root"}: ${i.message}`)
          .join("; ");
        fouten.push(`${pad}: ${details}`);
      }
    }
    return { id: cfg.id, naam: cfg.naam, lessen: lessen.sort((a, b) => a.id - b.id) };
  });
  return { leerpaden, fouten };
}

function laadVoortgang(): Record<string, KaartVoortgang> {
  try {
    const ruw = localStorage.getItem(STORAGE_SLEUTEL);
    return ruw ? JSON.parse(ruw) : {};
  } catch {
    return {};
  }
}

function bewaarVoortgang(voortgang: Record<string, KaartVoortgang>): void {
  try {
    localStorage.setItem(STORAGE_SLEUTEL, JSON.stringify(voortgang));
  } catch {
    // Opslag niet beschikbaar: de app werkt gewoon door, alleen de voortgang gaat niet bewaard
  }
}

type Tab = "woorden" | "flashcards" | "meerkeuze" | "invul" | "vertalen" | "grammatica";

export default function App() {
  const { leerpaden, fouten } = useMemo(laadLeerpaden, []);
  const [gekozenPad, setGekozenPad] = useState<Leerpad | null>(null);
  const [gekozenLes, setGekozenLes] = useState<Les | null>(null);
  const [tab, setTab] = useState<Tab>("woorden");
  const [voortgang, setVoortgang] = useState(laadVoortgang);

  function openPad(pad: Leerpad) {
    setGekozenPad(pad);
  }

  function openLes(les: Les) {
    setGekozenLes(les);
    setTab("woorden");
  }

  function terugNaarPad() {
    setGekozenLes(null);
  }

  function terugNaarOverzicht() {
    setGekozenLes(null);
    setGekozenPad(null);
  }

  return (
    <div className="app">
      <header>
        <h1>Italiano oefenen</h1>
      </header>

      {fouten.length > 0 && (
        <div className="fout" role="alert">
          <strong>Sommige lesbestanden zijn ongeldig en worden overgeslagen:</strong>
          <ul>
            {fouten.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {!gekozenPad ? (
        <section className="leerpaden-overzicht">
          {leerpaden.map((pad) => (
            <button key={pad.id} className="leerpad-kaart" onClick={() => openPad(pad)}>
              <span className="leerpad-kaart-naam">{pad.naam}</span>
              <span className="leerpad-kaart-info">
                {pad.lessen.length > 0
                  ? `${pad.lessen.length} ${pad.lessen.length === 1 ? "les" : "lessen"}`
                  : "Binnenkort..."}
              </span>
            </button>
          ))}
        </section>
      ) : !gekozenLes ? (
        <section className="leerpad">
          <button className="terug-knop" onClick={terugNaarOverzicht}>
            ← Leerpaden
          </button>
          <h2 className="leerpad-naam">{gekozenPad.naam}</h2>
          {gekozenPad.lessen.length === 0 && <p className="pad-gedempt">Nog geen lessen.</p>}
          {gekozenPad.lessen.map((l, i) => (
            <Fragment key={l.id}>
              {i > 0 && (
                <svg className="pad-connector" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d={i % 2 === 1
                      ? "M 60 0 C 60 30, 140 30, 140 60"
                      : "M 140 0 C 140 30, 60 30, 60 60"}
                    stroke="var(--accent)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8 6"
                    opacity="0.4"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              <div className={`pad-stap ${i % 2 === 0 ? "pad-links" : "pad-rechts"}`}>
                <button className="pad-bolletje" onClick={() => openLes(l)}>
                  {l.id}
                </button>
                <span className="pad-titel">{l.titel.replace(/^Hoofdstuk \d+ – /, "")}</span>
                <span className="pad-detail">
                  {l.woorden.length} woorden · {l.meerkeuzevragen.length} vragen
                </span>
              </div>
            </Fragment>
          ))}
          {gekozenPad.lessen.length > 0 && (
            <>
              <svg className="pad-connector" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                <path
                  d={gekozenPad.lessen.length % 2 === 1
                    ? "M 60 0 C 60 30, 140 30, 140 60"
                    : "M 140 0 C 140 30, 60 30, 60 60"}
                  stroke="var(--accent)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8 6"
                  opacity="0.2"
                  strokeLinecap="round"
                />
              </svg>
              <div className={`pad-stap ${gekozenPad.lessen.length % 2 === 0 ? "pad-links" : "pad-rechts"}`}>
                <div className="pad-bolletje pad-vergrendeld">?</div>
                <span className="pad-titel pad-gedempt">Binnenkort...</span>
              </div>
            </>
          )}
        </section>
      ) : (
        <>
          <button className="terug-knop" onClick={terugNaarPad}>
            ← {gekozenPad.naam}
          </button>
          <h2 className="les-titel">{gekozenLes.titel}</h2>
          <nav>
            <button className={tab === "woorden" ? "actief" : ""} onClick={() => setTab("woorden")}>
              Woorden
            </button>
            <button className={tab === "flashcards" ? "actief" : ""} onClick={() => setTab("flashcards")}>
              Flashcards
            </button>
            <button className={tab === "meerkeuze" ? "actief" : ""} onClick={() => setTab("meerkeuze")}>
              Meerkeuze
            </button>
            <button className={tab === "invul" ? "actief" : ""} onClick={() => setTab("invul")}>
              Invullen
            </button>
            <button className={tab === "vertalen" ? "actief" : ""} onClick={() => setTab("vertalen")}>
              Vertalen
            </button>
            <button className={tab === "grammatica" ? "actief" : ""} onClick={() => setTab("grammatica")}>
              Grammatica
            </button>
          </nav>

          {tab === "woorden" && <Woorden lessen={[gekozenLes]} />}
          {tab === "flashcards" && (
            <Flashcards lessen={[gekozenLes]} voortgang={voortgang} setVoortgang={setVoortgang} />
          )}
          {tab === "meerkeuze" && <Meerkeuze lessen={[gekozenLes]} />}
          {tab === "invul" && <Invullen lessen={[gekozenLes]} />}
          {tab === "vertalen" && <Vertalen lessen={[gekozenLes]} />}
          {tab === "grammatica" && <Grammatica lessen={[gekozenLes]} />}
        </>
      )}
    </div>
  );
}

// ---------- Woorden ----------

function Woorden({ lessen }: { lessen: Les[] }) {
  const woorden = useMemo(
    () => lessen.flatMap((l) => l.woorden),
    [lessen]
  );
  const [zoek, setZoek] = useState("");

  const gefilterd = zoek.trim()
    ? woorden.filter(
        (w) =>
          w.it.toLowerCase().includes(zoek.toLowerCase()) ||
          w.nl.toLowerCase().includes(zoek.toLowerCase())
      )
    : woorden;

  if (woorden.length === 0) return <p>Geen woorden in deze selectie.</p>;

  return (
    <section className="woorden-sectie">
      <input
        className="woorden-zoek"
        value={zoek}
        onChange={(e) => setZoek(e.target.value)}
        placeholder="Zoek een woord..."
      />
      <p className="teller">{gefilterd.length} woorden</p>
      <div className="woorden-lijst">
        {gefilterd.map((w, i) => (
          <div key={i} className="woord-kaart">
            <div className="woord-kop">
              <span className="woord-it">{w.it}</span>
              {w.woordsoort && <span className="woord-soort">{w.woordsoort}</span>}
            </div>
            <div className="woord-nl">{w.nl}</div>
            {w.voorbeeld && <div className="woord-voorbeeld">{w.voorbeeld}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Flashcards ----------

interface Kaart {
  id: string;
  voor: string;
  achter: string;
  voorbeeld?: string;
}

function maakKaarten(lessen: Les[]): Kaart[] {
  // Elk woord krijgt twee kaarten: IT->NL en NL->IT
  return lessen.flatMap((l) =>
    l.woorden.flatMap((w, i) => [
      { id: `${l.id}-${i}-it`, voor: w.it, achter: w.nl, voorbeeld: w.voorbeeld },
      { id: `${l.id}-${i}-nl`, voor: w.nl, achter: w.it, voorbeeld: w.voorbeeld }
    ])
  );
}

function schudKaarten(kaarten: Kaart[]): Kaart[] {
  const geschud = [...kaarten];
  for (let i = geschud.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [geschud[i], geschud[j]] = [geschud[j], geschud[i]];
  }
  return geschud;
}

function Flashcards({
  lessen,
  voortgang,
  setVoortgang
}: {
  lessen: Les[];
  voortgang: Record<string, KaartVoortgang>;
  setVoortgang: (v: Record<string, KaartVoortgang>) => void;
}) {
  const kaarten = useMemo(() => maakKaarten(lessen), [lessen]);
  const [rij, setRij] = useState<Kaart[]>(() => {
    const teDoen = kaarten.filter((k) =>
      isVandaagAan(voortgang[k.id] ?? nieuweVoortgang(k.id))
    );
    return schudKaarten(teDoen);
  });
  const [toon, setToon] = useState(false);
  const huidige = rij[0] ?? null;

  function beoordeel(beoordeling: Beoordeling) {
    if (!huidige) return;
    const kaart = voortgang[huidige.id] ?? nieuweVoortgang(huidige.id);
    const nieuw = { ...voortgang, [huidige.id]: beoordeelKaart(kaart, beoordeling) };
    setVoortgang(nieuw);
    bewaarVoortgang(nieuw);
    setToon(false);
    if (beoordeling === "fout") {
      setRij((r) => [...r.slice(1), r[0]]);
    } else {
      setRij((r) => r.slice(1));
    }
  }

  if (kaarten.length === 0) return <p>Geen woorden in deze selectie.</p>;
  if (!huidige) return <p>Klaar voor vandaag. Goed gedaan!</p>;

  return (
    <section className="kaart-sectie">
      <p className="teller">Nog te doen: {rij.length}</p>
      <div className="flashcard">
        <p className="voorkant">{huidige.voor}</p>
        {toon ? (
          <>
            <p className="achterkant">{huidige.achter}</p>
            {huidige.voorbeeld && <p className="voorbeeld">{huidige.voorbeeld}</p>}
            <div className="beoordeling">
              <button onClick={() => beoordeel("fout")}>Fout</button>
              <button onClick={() => beoordeel("moeilijk")}>Moeilijk</button>
              <button onClick={() => beoordeel("goed")}>Goed</button>
              <button onClick={() => beoordeel("makkelijk")}>Makkelijk</button>
            </div>
          </>
        ) : (
          <button className="primair" onClick={() => setToon(true)}>
            Toon antwoord
          </button>
        )}
      </div>
    </section>
  );
}

// ---------- Meerkeuze ----------

function Meerkeuze({ lessen }: { lessen: Les[] }) {
  const vragen = useMemo(
    () =>
      lessen.flatMap((l) =>
        (l.meerkeuzevragen ?? []).map((v, i) => ({ id: `${l.id}-mk-${i}`, ...v }))
      ),
    [lessen]
  );
  const [index, setIndex] = useState(0);
  const [gekozenOptie, setGekozenOptie] = useState<string | null>(null);
  const [score, setScore] = useState({ goed: 0, totaal: 0 });

  if (vragen.length === 0) return <p>Geen meerkeuzevragen in deze selectie.</p>;

  const huidige = vragen[index % vragen.length];
  const beantwoord = gekozenOptie !== null;
  const isGoed = gekozenOptie === huidige.antwoord;

  function kiesOptie(optie: string) {
    if (beantwoord) return;
    setGekozenOptie(optie);
    setScore((s) => ({
      goed: s.goed + (optie === huidige.antwoord ? 1 : 0),
      totaal: s.totaal + 1
    }));
  }

  function volgende() {
    setIndex((i) => i + 1);
    setGekozenOptie(null);
  }

  return (
    <section>
      <p className="teller">
        Score: {score.goed} / {score.totaal}
      </p>
      <div className="oefening">
        <p className="zin">{huidige.vraag}</p>
        <div className="mk-opties">
          {huidige.opties.map((optie) => {
            let klasse = "mk-optie";
            if (beantwoord) {
              if (optie === huidige.antwoord) klasse += " mk-goed";
              else if (optie === gekozenOptie) klasse += " mk-fout";
            }
            return (
              <button
                key={optie}
                className={klasse}
                onClick={() => kiesOptie(optie)}
                disabled={beantwoord}
              >
                {optie}
              </button>
            );
          })}
        </div>
        {beantwoord && (
          <>
            <p className={isGoed ? "goed" : "fout-tekst"}>
              {isGoed ? "Goed!" : `Helaas. Het juiste antwoord is: ${huidige.antwoord}`}
            </p>
            {huidige.uitleg && <p className="mk-uitleg">{huidige.uitleg}</p>}
            <button className="primair" onClick={volgende}>
              Volgende
            </button>
          </>
        )}
      </div>
    </section>
  );
}

// ---------- Invullen ----------

function Invullen({ lessen }: { lessen: Les[] }) {
  const oefeningen = useMemo(
    () =>
      lessen.flatMap((l) =>
        l.invuloefeningen.map((o, i) => ({ id: `${l.id}-${i}`, ...o }))
      ),
    [lessen]
  );
  const [index, setIndex] = useState(0);
  const [invoer, setInvoer] = useState("");
  const [resultaat, setResultaat] = useState<"juist" | "fout" | null>(null);
  const [score, setScore] = useState({ goed: 0, totaal: 0 });

  if (oefeningen.length === 0) return <p>Geen invulopdrachten in deze selectie.</p>;

  const huidige = oefeningen[index % oefeningen.length];
  const [voor, na] = huidige.zin.split("___");

  function controleer() {
    if (resultaat || !invoer.trim()) return;
    const juist = isJuist(invoer, huidige.antwoord);
    setResultaat(juist ? "juist" : "fout");
    setScore((s) => ({ goed: s.goed + (juist ? 1 : 0), totaal: s.totaal + 1 }));
  }

  function volgende() {
    setIndex((i) => i + 1);
    setInvoer("");
    setResultaat(null);
  }

  return (
    <section>
      <p className="teller">
        Score: {score.goed} / {score.totaal}
      </p>
      <div className="oefening">
        <p className="zin">
          {voor}
          <span className="gat">___</span>
          {na}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (resultaat) volgende();
            else controleer();
          }}
        >
          <input
            value={invoer}
            onChange={(e) => setInvoer(e.target.value)}
            disabled={resultaat !== null}
            placeholder="Vul het woord in"
            autoFocus
          />
          {resultaat === null ? (
            <button type="submit" className="primair">
              Controleer
            </button>
          ) : (
            <button type="submit" className="primair">
              Volgende
            </button>
          )}
        </form>
        {resultaat === "juist" && <p className="goed">Goed!</p>}
        {resultaat === "fout" && (
          <p className="fout-tekst">
            Helaas. Het juiste antwoord is: <strong>{huidige.antwoord}</strong>
          </p>
        )}
      </div>
    </section>
  );
}

// ---------- Vertalen ----------

function Vertalen({ lessen }: { lessen: Les[] }) {
  const zinnen = useMemo(() => lessen.flatMap((l) => l.zinnen), [lessen]);
  const [richting, setRichting] = useState<"nl-it" | "it-nl">("nl-it");
  const [index, setIndex] = useState(0);
  const [invoer, setInvoer] = useState("");
  const [toonAntwoord, setToonAntwoord] = useState(false);
  const [resultaat, setResultaat] = useState<"juist" | "fout" | null>(null);

  if (zinnen.length === 0) return <p>Geen zinnen in deze selectie.</p>;

  const zin = zinnen[index % zinnen.length];
  const vraag = richting === "nl-it" ? zin.nl : zin.it;
  const antwoord = richting === "nl-it" ? zin.it : zin.nl;

  function controleer() {
    if (!invoer.trim()) return;
    setResultaat(isJuist(invoer, antwoord) ? "juist" : "fout");
  }

  function volgende() {
    setIndex((i) => i + 1);
    setInvoer("");
    setToonAntwoord(false);
    setResultaat(null);
  }

  function wisselRichting(nieuw: "nl-it" | "it-nl") {
    setRichting(nieuw);
    setInvoer("");
    setToonAntwoord(false);
    setResultaat(null);
  }

  return (
    <section>
      <div className="richting">
        <button
          className={richting === "nl-it" ? "actief" : ""}
          onClick={() => wisselRichting("nl-it")}
        >
          NL → IT
        </button>
        <button
          className={richting === "it-nl" ? "actief" : ""}
          onClick={() => wisselRichting("it-nl")}
        >
          IT → NL
        </button>
      </div>
      <div className="oefening">
        <p className="zin">
          {vraag}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (resultaat) volgende();
            else controleer();
          }}
        >
          <input
            value={invoer}
            onChange={(e) => setInvoer(e.target.value)}
            disabled={resultaat !== null}
            placeholder="Typ je vertaling"
            autoFocus
          />
          <button type="submit" className="primair">
            {resultaat === null ? "Controleer" : "Volgende"}
          </button>
        </form>
        {resultaat === null && !toonAntwoord && (
          <button onClick={() => setToonAntwoord(true)}>Toon antwoord</button>
        )}
        {toonAntwoord && resultaat === null && <p>Antwoord: {antwoord}</p>}
        {resultaat === "juist" && <p className="goed">Goed!</p>}
        {resultaat === "fout" && (
          <p className="fout-tekst">
            Niet helemaal. Het antwoord is: <strong>{antwoord}</strong>
          </p>
        )}
      </div>
    </section>
  );
}

// ---------- Grammatica ----------

function Grammatica({ lessen }: { lessen: Les[] }) {
  const regels = useMemo(
    () => lessen.flatMap((l) => l.grammatica ?? []),
    [lessen]
  );

  if (regels.length === 0) return <p>Geen grammatica-uitleg in deze selectie.</p>;

  return (
    <section className="grammatica-sectie">
      {regels.map((r, i) => (
        <details key={i} className="grammatica-kaart">
          <summary className="grammatica-titel">{r.titel}</summary>
          <p className="grammatica-uitleg">{r.uitleg}</p>
        </details>
      ))}
    </section>
  );
}
