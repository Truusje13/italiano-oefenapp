// Tekst-naar-spraak via de ingebouwde browserfunctie (Italiaanse stem, it-IT).
// Werkt alleen als het apparaat een Italiaanse stem heeft.

export function italiaanseStemBeschikbaar(): boolean {
  try {
    if (!("speechSynthesis" in window)) return false;
    return window.speechSynthesis
      .getVoices()
      .some((stem) => stem.lang.toLowerCase().startsWith("it"));
  } catch {
    return false;
  }
}

export function spreekUit(tekst: string): void {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const uiting = new SpeechSynthesisUtterance(tekst);
    uiting.lang = "it-IT";
    uiting.rate = 0.9;
    window.speechSynthesis.speak(uiting);
  } catch {
    // Geen spraak beschikbaar: stil negeren, de tekst staat toch op het scherm
  }
}
