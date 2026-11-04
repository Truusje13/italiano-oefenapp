// Eenvoudig herhalingsalgoritme (SM-2-achtig).
// Een kaart komt terug na een interval dat groeit bij goede antwoorden
// en weer op 1 dag wordt gezet bij fout antwoorden.

export type Beoordeling = "fout" | "moeilijk" | "goed" | "makkelijk";

export interface KaartVoortgang {
  id: string;
  interval: number;        // in dagen
  herhaling: number;       // aantal keer correct achter elkaar
  gemakkelijkheid: number; // factor, begint op 2.5
  volgende: number;        // timestamp (ms) wanneer de kaart weer moet
}

const DAG_MS = 24 * 60 * 60 * 1000;

export function nieuweVoortgang(id: string, nu = Date.now()): KaartVoortgang {
  return { id, interval: 0, herhaling: 0, gemakkelijkheid: 2.5, volgende: nu };
}

export function beoordeelKaart(
  kaart: KaartVoortgang,
  beoordeling: Beoordeling,
  nu = Date.now()
): KaartVoortgang {
  if (beoordeling === "fout") {
    return {
      ...kaart,
      herhaling: 0,
      interval: 1,
      gemakkelijkheid: Math.max(1.3, kaart.gemakkelijkheid - 0.2),
      volgende: nu + DAG_MS
    };
  }

  const kwaliteit = { moeilijk: 3, goed: 4, makkelijk: 5 }[beoordeling];
  const gemak = Math.max(
    1.3,
    kaart.gemakkelijkheid + (0.1 - (5 - kwaliteit) * (0.08 + (5 - kwaliteit) * 0.02))
  );
  const herhaling = kaart.herhaling + 1;
  let interval: number;
  if (herhaling === 1) interval = 1;
  else if (herhaling === 2) interval = 3;
  else interval = Math.round(kaart.interval * gemak);

  return {
    ...kaart,
    herhaling,
    interval,
    gemakkelijkheid: gemak,
    volgende: nu + interval * DAG_MS
  };
}

export function isVandaagAan(kaart: KaartVoortgang, nu = Date.now()): boolean {
  return kaart.volgende <= nu;
}
