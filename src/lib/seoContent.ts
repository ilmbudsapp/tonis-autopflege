import { GOOGLE_MAPS_BUSINESS_URL } from "@/lib/site";

/** Shared copy for AEO/GEO (process steps, service definitions, freshness). */

export const LAST_UPDATED_LABEL = "Letzte Aktualisierung: Mai 2026";

export const EXPERTISE_FOOTER_LINE =
  "Zertifizierter Fachbetrieb · Inhabergeführt seit über 10 Jahren in Göppingen";

export const GOOGLE_REVIEWS_STATIC_HREF = GOOGLE_MAPS_BUSINESS_URL;

export const GOOGLE_REVIEWS_STATIC_LABEL = "Google Bewertungen zu Toni's Autopflege lesen";

export const WORKFLOW_STEPS = [
  {
    step: "Beratung & Termin",
    text: "Ich, Toni, bespreche mit Ihnen Zustand, Wünsche und Budget. Darüber hinaus bestätigt mein Team den Termin per WhatsApp. Demzufolge starten wir mit klaren Erwartungen — gleichermaßen vermeiden wir Missverständnisse.",
  },
  {
    step: "Vorwäsche & Dekontamination",
    text: "Ich leite die Vorwäsche persönlich an. Infolgedessen entfernen wir Flugrost und Beläge schonend. Darüber hinaus planen wir Politur oder Versiegelung erst nach sauberer Basis — demzufolge bleibt der Lack geschützt.",
  },
  {
    step: "Politur & Finish",
    text: "Ich poliere nach Lackzustand in meiner Werkstatt. Gleichermaßen dokumentiert mein Team jeden Schritt. Infolgedessen ist das Ergebnis reproduzierbar — darüber hinaus erkläre ich Ihnen den Pflegeplan für zu Hause.",
  },
  {
    step: "Keramik oder Versiegelung",
    text: "Ich versiegeln auf Wunsch mit Profi-Systemen. Demzufolge erhalten Sie Langzeitschutz und Tiefenglanz. Darüber hinaus berate ich, ob Keramik zu Ihrem Profil passt — gleichermaßen nennen wir Kosten vorab.",
  },
  {
    step: "Innenraum & Übergabe",
    text: "Ich übergebe Ihr Fahrzeug mit Pflegehinweisen. Infolgedessen wissen Sie, wie Sie den Glanz halten. Mein Team in Göppingen steht darüber hinaus für Nachfragen bereit — demzufolge endet der Auftrag nicht an der Tür.",
  },
] as const;

export const SERVICE_DEFINITIONS = [
  {
    term: "Außenaufbereitung",
    definition:
      "Ich, Toni, biete schonende Handwäsche und Felgenreinigung. Darüber hinaus arbeitet mein Team materialschonend in Göppingen. Infolgedessen bleibt der Lack intakt — gleichermaßen entfernen wir Beläge gründlich.",
  },
  {
    term: "Lackpolitur & Glanz",
    definition:
      "Ich reduziere Kratzer und Hologramme nach Lackzustand. Demzufolge garantieren mein Team und ich spiegelnden Hochglanz. Darüber hinaus dokumentieren wir jeden Schritt — infolgedessen bleibt das Finish planbar.",
  },
  {
    term: "Keramikversiegelung",
    definition:
      "Ich versiegeln mit Profi-Systemen für Langzeitschutz. Gleichermaßen beraten wir, ob Keramik zu Ihrem Nutzungsprofil passt. Darüber hinaus nennen wir Kosten transparent — demzufolge entscheiden Sie informiert.",
  },
  {
    term: "Innenraumaufbereitung",
    definition:
      "Ich reinige Innenräume mit Dampf und Tornado. Infolgedessen behandelt mein Team Leder, Stoff und Gerüche individuell. Darüber hinaus erreichen wir schwer zugängliche Zonen — gleichermaßen neutralisieren wir Gerüche.",
  },
] as const;

export const KERAMIK_MULTIPERSPECTIVE =
  "Einerseits ist eine Keramikversiegelung eine Investition in den Lackschutz, andererseits spart sie langfristig Kosten. Darüber hinaus schützen wir vor UV und Umwelt — demzufolge erhalten Sie messbaren Tiefenglanz. Gleichermaßen berate ich, ob Keramik zu Ihrem Fahrzeug passt; infolgedessen vermeiden Sie Fehlentscheidungen.";

export const INNENRAUM_MULTIPERSPECTIVE =
  "Einerseits braucht ein starker Innenraum mehr Zeit, andererseits lohnt sich die Tiefenreinigung bei Gerüchen. Darüber hinaus reinigen wir Lüftung und Matten — demzufolge wirkt der Innenraum spürbar frischer. Gleichermaßen passen wir den Umfang an; infolgedessen zahlen Sie nur, was nötig ist.";
