// Maakt antwoorden vergelijkbaar: accenten, hoofdletters, leestekens en
// dubbele spaties worden genegeerd. Kleine typfouten worden getolereerd.

export function normaliseer(tekst: string): string {
  return tekst
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // accenten weg (è -> e)
    .toLowerCase()
    .replace(/['’`]/g, " ")          // dov'è -> dov e
    .replace(/[.,!?;:"()«»]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  const rij = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let vorige = rij[0];
    rij[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tijdelijk = rij[j];
      rij[j] = Math.min(
        rij[j] + 1,
        rij[j - 1] + 1,
        vorige + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      vorige = tijdelijk;
    }
  }
  return rij[b.length];
}

// Toegestane fouten: 0 voor korte antwoorden, 1 voor middellange, 2 voor lange.
function toegestaneFouten(juist: string): number {
  if (juist.length <= 4) return 0;
  if (juist.length <= 10) return 1;
  return 2;
}

export function isJuist(invoer: string, juist: string): boolean {
  const a = normaliseer(invoer);
  const b = normaliseer(juist);
  if (a === b) return true;
  return levenshtein(a, b) <= toegestaneFouten(b);
}
