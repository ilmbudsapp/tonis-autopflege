import {
  AirVent,
  Armchair,
  BrushCleaning,
  Car,
  Droplets,
  FileCheck,
  Focus,
  Hammer,
  Shield,
  Sparkles,
  Sun,
  Tags,
  TrendingUp,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const GUTSCHEIN_BETRAEGE = [
  { label: "5,00€", text: "Hallo Toni, ich habe Interesse an einem Gutschein im Wert von 5,00€." },
  { label: "10,00€", text: "Hallo Toni, ich habe Interesse an einem Gutschein im Wert von 10,00€." },
  { label: "15,00€", text: "Hallo Toni, ich habe Interesse an einem Gutschein im Wert von 15,00€." },
  { label: "20,00€", text: "Hallo Toni, ich habe Interesse an einem Gutschein im Wert von 20,00€." },
  { label: "30,00€", text: "Hallo Toni, ich habe Interesse an einem Gutschein im Wert von 30,00€." },
  { label: "50,00€", text: "Hallo Toni, ich habe Interesse an einem Gutschein im Wert von 50,00 €." },
  { label: "100,00€", text: "Hallo Toni, ich habe Interesse an einem Gutschein im Wert von 100,00 €." },
  { label: "200,00€", text: "Hallo Toni, ich habe Interesse an einem Gutschein im Wert von 200,00 €." },
] as const;

export type LeistungKategorie = {
  id: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  listLabel: "Leistungen" | "Vorteile";
  items: readonly string[];
  highlight?: boolean;
};

export const LEISTUNGEN_CATEGORIES: readonly LeistungKategorie[] = [
  {
    id: "aussen",
    Icon: Droplets,
    title: "Außenaufbereitung",
    subtitle: "Handwäsche & Lackreinigung",
    description:
      "Schonende Handwäsche für eine kratzfreie und gründliche Reinigung Ihres Fahrzeugs. Hartnäckiger Schmutz, Insektenreste und Ablagerungen werden professionell entfernt.",
    listLabel: "Leistungen",
    items: [
      "Premium Handwäsche",
      "Tiefenwirksame Felgenreinigung",
      "Reifenpflege & Glanzfinish",
      "Flugrostentfernung & Lackdekontamination",
      "Kunststoffpflege im Außenbereich",
    ],
  },
  {
    id: "lack",
    Icon: Sparkles,
    title: "Lackpolitur & Glanzaufbereitung",
    subtitle: "Professionelle Lackveredelung",
    description:
      "Professionelle Politur zur Entfernung feiner Kratzer, Hologramme und matter Stellen. Wir verleihen Ihrem Lack neuen Tiefenglanz und ein hochwertiges Finish.",
    listLabel: "Vorteile",
    items: [
      "Spiegelnder Hochglanz",
      "Maximale Farbauffrischung",
      "Beseitigung von Lackdefekten",
      "Langfristige Lackveredelung",
    ],
  },
  {
    id: "keramik",
    Icon: Shield,
    title: "Keramikversiegelung",
    subtitle: "Das Premium-Highlight",
    description:
      "Langfristiger Schutz durch modernste Keramikbeschichtung. Diese High-End-Versiegelung schützt vor UV-Strahlen, Umwelteinflüssen und sorgt für den ultimativen Wasserabperleffekt (Beading).",
    listLabel: "Vorteile",
    items: [
      "Ultimativer Langzeitschutz",
      "Extremer Tiefenglanz",
      "Easy-to-Clean Effekt (leichtere Wäsche)",
      "Schutz vor aggressiven Umwelteinflüssen",
    ],
    highlight: true,
  },
];

export const LEISTUNGEN_ALLE_LINIEN = LEISTUNGEN_CATEGORIES.flatMap((cat) =>
  cat.items.map((line) => `${cat.title}: ${line}`),
);

export const WARUM_TONIS_ITEMS = [
  "Professionelle Pflegeprodukte",
  "Hochwertige Fahrzeugaufbereitung",
  "Liebe zum Detail",
  "Schonende Handarbeit",
  "Faire Preise",
  "Individuelle Beratung",
  "Perfekter Glanz & Werterhalt",
] as const;

export const INNENRAUM_CATEGORIES = [
  {
    id: "tiefenreinigung",
    Icon: BrushCleaning,
    title: "Innenraum-Tiefenreinigung",
    description:
      "Staubsaugen, Teppich- & Polsterreinigung, Leder- & Kunststoffpflege, Kofferraum- & Scheibenreinigung.",
  },
  {
    id: "polster-leder",
    Icon: Armchair,
    title: "Polster- & Lederpflege",
    description:
      "Schonende Reinigung für Stoff, Alcantara und Leder. Ideal bei Flecken, Gebrauchsspuren und Tierhaaren.",
  },
  {
    id: "geruch-ozon",
    Icon: AirVent,
    title: "Geruchsentfernung & Ozonbehandlung",
    description: "Professionelle Neutralisierung von Rauch, Tiergerüchen und Feuchtigkeit.",
  },
] as const;

export const REPARATUR_SPEZIAL_SERVICES = [
  {
    id: "smart-repair",
    Icon: Hammer,
    title: "Smart Repair",
    text: "Punktuelle Beseitigung von Lackkratzern und Schrammen – kosteneffizient und schnell, ohne teure Komplettlackierung.",
  },
  {
    id: "dellenentfernung",
    Icon: Focus,
    title: "Dellenentfernung",
    text: "Sanfte Ausbeultechnik ohne Lackieren. Professionelle Entfernung von Parkdellen, wobei der Originallack vollständig erhalten bleibt.",
  },
  {
    id: "steinschlag-scheiben",
    Icon: Car,
    title: "Steinschlag & Scheibenservice",
    text: "Fachgerechte Reparatur von Steinschlägen und Rissen. Bei Bedarf führen wir einen kompletten Scheibenaustausch durch.",
  },
  {
    id: "scheibentoenung",
    Icon: Sun,
    title: "Scheibentönung",
    text: "Hochwertige Tönungsfolien für Hitze- und UV-Schutz. Verleiht dem Fahrzeug eine sportliche Optik und sorgt für Privatsphäre.",
  },
  {
    id: "fahrzeugbeschriftung",
    Icon: Tags,
    title: "Fahrzeugbeschriftung",
    text: "Individuelle Werbe- und Designbeschriftungen für Firmen- und Privatautos. Hochwertige Folienlösungen nach Maß.",
  },
  {
    id: "geruchsentfernung-ozon-spezial",
    Icon: Wind,
    title: "Geruchsentfernung & Ozonbehandlung",
    text: "Professionelle Neutralisierung unangenehmer Gerüche wie Rauch, Tiergeruch oder Feuchtigkeit mittels Ozonbehandlung. Ideal für Gebrauchtwagen und Raucherfahrzeuge.",
  },
] as const;

export const PREMIUM_SERVICES = [
  {
    id: "leasing",
    Icon: FileCheck,
    title: "Leasingrückgabe-Aufbereitung",
    text: "Optimale Vorbereitung für den Verkauf oder die Rückgabe.",
    vorteile: "Werterhalt, höhere Verkaufschancen",
  },
  {
    id: "motorraum",
    Icon: Wrench,
    title: "Motorraumreinigung",
    text: "Schonende Reinigung für ein gepflegtes Gesamtbild.",
  },
  {
    id: "verkauf",
    Icon: TrendingUp,
    title: "Fahrzeugaufbereitung für Verkauf",
    text: "Perfekter erster Eindruck für maximalen Fahrzeugwert.",
  },
] as const;

export const PRODUKTE = [
  {
    name: "Koch-Chemie",
    text: "Systempflege für Felgen, Innenraum und Lack — entwickelt und produziert in Deutschland. Ideal für professionelle Vorreinigung und schonende Materialien.",
  },
  {
    name: "Sonax",
    text: "Bewährte Profi-Produkte für Felgenreinigung, Politur und Glanzfinish — im Alltag und bei der Feinaufbereitung zuverlässig einsetzbar.",
  },
  {
    name: "HYLA",
    text: "Filtration und Reinigungstechnik für saubere Arbeitsumgebungen — ergänzend zu unserer Innenraum- und Hygienepflege.",
  },
  {
    name: "Menzerna",
    text: "High-End-Politursysteme für Washline, Hologramme und langanhaltenden Tiefenglanz.",
  },
  { name: "Gyeon", text: "Keramik-Versiegelungen und hydrophobe Schichten mit starker Perle." },
  { name: "CarPro", text: "Ceramic Coatings und Detailing-Chemie auf professionellem Niveau." },
  { name: "Cartec", text: "Effiziente Vorreiniger und Spezialprodukte für gewerbliche Aufbereitung." },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Wie lange dauert eine Aufbereitung?",
    answer:
      "Ich kläre die Dauer mit Ihnen vorab — sie hängt vom Zustand, den Leistungen und der Fahrzeuggröße ab. Mein Team und ich nennen eine realistische Zeiteinschätzung per WhatsApp oder in Zell unter Aichelberg. Demzufolge planen Sie Ihren Tag sicher; gleichermaßen vermeiden wir unnötige Wartezeiten.",
  },
  {
    question: "Was kostet eine Keramikversiegelung?",
    answer:
      "Ich berate Sie ehrlich, ob Keramik zu Ihrem Nutzungsprofil passt. Der Preis richtet sich nach Lackzustand, Größe und Systemwahl — folglich nennen wir nach Fotos ein transparentes Angebot. Mein Team und ich vermeiden versteckte Zusatzkosten; infolgedessen bleibt Ihr Budget planbar.",
  },
  {
    question: "Welche Marken und Systeme nutzen Sie konkret?",
    answer:
      "Ich setze auf Koch-Chemie und Sonax für Reinigung und Finish. Mein Team arbeitet mit Keramiksystemen führender Hersteller; ebenso nutzen wir Partner wie HYLA Germany GmbH für Hygiene. Infolgedessen bleiben unsere Prozesse reproduzierbar — demzufolge ist das Ergebnis planbar.",
  },
  {
    question: "Bieten Sie einen mobilen Service in der Region an?",
    answer:
      "Ich plane mobile Einsätze in Göppingen, Zell unter Aichelberg und Umgebung nach Absprache. Mein Team prüft Kapazität, Wasser und Strom vorab. Folglich wissen Sie, ob ein Termin bei Ihnen vor Ort machbar ist — ich bestätige alles persönlich per WhatsApp.",
  },
  {
    question: "Warum sollte ich Toni's Autopflege in Göppingen wählen?",
    answer:
      "Ich, Jeton Shala (Toni), führe die Aufbereitung mit über zehn Jahren Erfahrung. Mein Team und ich setzen auf Koch-Chemie, Sonax und handwerkliche Präzision. Folglich erhalten Sie ehrliche Beratung ohne unnötige Pakete — gleichermaßen dokumentieren wir jeden Schritt in Zell unter Aichelberg.",
  },
  {
    question: "Was beinhaltet eine Komplettaufbereitung bei Ihnen?",
    answer:
      "Ich passe den Umfang mit Ihnen ab: Außenwäsche, Dekontamination, Politur oder Versiegelung plus Innenraum. Mein Team nennt vorab Dauer und Kosten. Demzufolge wissen Sie genau, was enthalten ist; ebenso können wir mobile Termine in Göppingen planen.",
  },
  {
    question: "Wie bereite ich mein Fahrzeug auf den Termin vor?",
    answer:
      "Ich berate Sie per WhatsApp, welche Fotos und Angaben helfen. Bitte entfernen Sie lose Gegenstände und nennen Sie Kratzer oder Gerüche. Mein Team klärt Material und Zugang vorab — infolgedessen starten wir effizient bei Ihnen oder in meiner Werkstatt.",
  },
] as const;

export const PARTNER_NETZWERK_NAMEN = [
  "Autohaus Gross und Geis GmbH",
  "KRAFT Lackmanufaktur",
  "Waschkraft",
  "HYLA Germany GmbH",
  "MH-CARCOLLECTION",
  "Edi's Smart Repair",
  "Marinkovic Zoran Karosserie und Lackierungen",
  "vip-shuttle.com GmbH",
] as const;

export const KUNDEN_TESTIMONIALS = [
  {
    name: "Andreas Steeg",
    text: 'Auto ist perfekt geworden. Fast schon zu schön für mein altes Auto. Wirklich hammer Service. Pünktlich wie ausgemacht fertig. Völlig zufrieden, wird definitiv weiterempfohlen.',
  },
  {
    name: "VD Tran",
    text: "BMW innen und außen wieder perfekt — Lack top, Innenraum kaum wiederzuerkennen. Saubere Arbeit zum fairen Preis. 100% Empfehlung!",
  },
  {
    name: "Amel Mujic",
    text: "Auto zur Keramikversiegelung abgegeben und war vom Ergebnis einfach nur begeistert. Das Auto sieht aus wie ein Neuwagen. Sehr gute und professionelle Arbeit. Nur zu empfehlen!",
  },
  {
    name: "Davide Gesia",
    text: "Wer professionelle Aufbereitung fürs eigene Auto sucht, wird hier mehr als zufrieden sein! Die Terminvereinbarung erfolgt schnell und unkompliziert. Großes Lob an Toni!",
  },
] as const;
