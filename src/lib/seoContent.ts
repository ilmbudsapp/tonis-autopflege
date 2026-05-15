/** Shared copy for AEO/GEO (process steps, service definitions, freshness). */

export const LAST_UPDATED_LABEL = "Letzte Aktualisierung: Mai 2026";

export const WORKFLOW_STEPS = [
  {
    step: "Beratung & Termin",
    text: "Ich bespreche mit Ihnen Zustand, Wünsche und Budget — unser Team bestätigt den Termin per WhatsApp.",
  },
  {
    step: "Vorwäsche & Dekontamination",
    text: "Wir reinigen schonend per Handwäsche und entfernen Flugrost sowie Beläge, bevor wir Politur oder Versiegelung planen.",
  },
  {
    step: "Politur & Finish",
    text: "Ich poliere nach Lackzustand — mein Team dokumentiert jeden Schritt für ein reproduzierbares Ergebnis.",
  },
  {
    step: "Keramik oder Versiegelung",
    text: "Wir versiegeln auf Wunsch mit Profi-Systemen; ich erkläre Ihnen Pflege und Intervalle für zu Hause.",
  },
  {
    step: "Innenraum & Übergabe",
    text: "Ich übergebe Ihr Fahrzeug mit Pflegehinweisen — unser Team in Göppingen steht für Nachfragen bereit.",
  },
] as const;

export const SERVICE_DEFINITIONS = [
  {
    term: "Außenaufbereitung",
    definition:
      "Ich biete schonende Handwäsche, Felgenreinigung und Lackdekontamination — unser Team arbeitet materialschonend in Göppingen.",
  },
  {
    term: "Lackpolitur & Glanz",
    definition:
      "Mein Team und ich reduzieren Kratzer und Hologramme; wir garantieren spiegelnden Hochglanz nach Lackzustand.",
  },
  {
    term: "Keramikversiegelung",
    definition:
      "Ich versiegeln mit Profi-Systemen für Langzeitschutz; wir beraten, ob Keramik zu Ihrem Nutzungsprofil passt.",
  },
  {
    term: "Innenraumaufbereitung",
    definition:
      "Ich reinige Innenräume mit Dampf und Tornado — unser Team behandelt Leder, Stoff und Gerüche individuell.",
  },
] as const;

export const KERAMIK_MULTIPERSPECTIVE =
  "Einerseits ist eine Keramikversiegelung eine Investition in den Lackschutz, andererseits spart sie langfristig Kosten durch weniger Wäschen und besseren Werterhalt. Auf der einen Seite schützen wir vor UV und Umwelt — auf der anderen Seite erhalten Sie einen messbaren Tiefenglanz.";

export const INNENRAUM_MULTIPERSPECTIVE =
  "Einerseits braucht ein starker Innenraum mehr Zeit und Material, andererseits lohnt sich die Tiefenreinigung bei Gerüchen und Flecken deutlich. Auf der einen Seite reinigen wir sichtbare Flächen — auf der anderen Seite auch Lüftung, Matten und schwer erreichbare Zonen.";
