export type AutopflegeFaqItem = {
  question: string;
  answer: string;
};

export type AutopflegeContentSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const AUTOPFLEGE_LANDING_H1 = "Autopflege Göppingen — professionelle Fahrzeugaufbereitung bei Toni";

export const AUTOPFLEGE_LANDING_SECTIONS: AutopflegeContentSection[] = [
  {
    id: "einleitung",
    title: "Autopflege Göppingen: wenn Ihr Fahrzeug den ersten Eindruck zählen lässt",
    paragraphs: [
      "Ob Geschäftstermin, Familienausflug oder die Übergabe nach einem Verkauf — ein gepflegtes Auto wirkt sofort seriöser. In der Region Göppingen suchen viele Fahrzeughalter gezielt nach zuverlässiger Autopflege, die mehr leistet als eine schnelle Waschanlage. Bei Toni's Autopflege in Zell unter Aichelberg erhalten Sie eine strukturierte Fahrzeugaufbereitung mit Profi-Produkten, klarer Beratung und einem Ergebnis, das Sie sehen und fühlen können.",
      "Als inhabergeführter Betrieb stehe ich, Toni (Jeton Shala), persönlich für jeden Auftrag. Mein Team und ich kombinieren Handarbeit mit bewährten Systemen von Koch-Chemie, Sonax und weiteren Premium-Marken. So entsteht keine oberflächliche Politur, sondern eine Aufbereitung, die Lack, Felgen, Glas und Innenraum gleichermaßen berücksichtigt — abgestimmt auf den Zustand Ihres Fahrzeugs und Ihr Budget.",
      "Diese Seite gibt Ihnen einen ehrlichen Überblick über Autoaufbereitung in Göppingen: welche Leistungen sinnvoll sind, wie ein Termin abläuft und wann sich eine professionelle Fahrzeugpflege besonders lohnt. Wenn Sie direkt starten möchten, finden Sie unten Antworten auf häufige Fragen oder kontaktieren Sie uns per WhatsApp.",
    ],
  },
  {
    id: "autoaufbereitung",
    title: "Autoaufbereitung Göppingen: mehr als Waschen und Staubsaugen",
    paragraphs: [
      "Unter Autoaufbereitung verstehen wir bei Toni's Autopflege ein Gesamtkonzept. Zuerst analysieren wir den Ist-Zustand: Wo sitzen Verschmutzungen? Gibt es Kratzer, matte Stellen oder Verkalkungen? Erst danach legen wir die Reihenfolge fest — von der gründlichen Vorwäsche über die Lackbearbeitung bis zur Versiegelung oder Innenraumpflege.",
      "Für Kunden aus Göppingen, Geislingen, Süßen und der weiteren Umgebung ist unsere Werkstatt in der Boschstraße in Zell unter Aichelberg gut erreichbar. Viele holen ihr Fahrzeug nach dem Termin mit einem sichtbar frischeren Auftritt ab; andere nutzen unsere Beratung gezielt vor einer Leasingrückgabe oder einem Verkauf. In beiden Fällen geht es um Werterhalt und einen gepflegten Gesamteindruck.",
      "Wer nach „Autopflege Göppingen“ sucht, möchte meist zwei Dinge: Qualität ohne Überraschungen und einen Ansprechpartner, der die Arbeit erklärt. Genau darauf ist unser Ablauf ausgelegt — transparent, ohne unnötige Zusatzpakete.",
    ],
    list: [
      "Strukturierte Außenwäsche mit Felgen- und Türgriffen-Detail",
      "Lackinspektion vor jeder Politur",
      "Innenraumreinigung mit materialschonenden Verfahren",
      "Dokumentation des Ergebnisses auf Wunsch für Leasing oder Verkauf",
    ],
  },
  {
    id: "fahrzeugaufbereitung",
    title: "Fahrzeugaufbereitung für unterschiedliche Ansprüche",
    paragraphs: [
      "Nicht jedes Auto braucht das gleiche Paket. Ein Alltagsfahrzeug profitiert oft von einer gründlichen Außenpflege und Innenraumreinigung. Ein Premium-Fahrzeug oder ein Oldtimer verlangt hingegen mehr Zeit für Lackkorrektur und Schutz. Wir passen Umfang und Dauer an — statt pauschal das teuerste Paket zu verkaufen.",
      "Die Fahrzeugaufbereitung umfasst bei uns unter anderem Handwäsche, Dekontamination, Politurstufen, Versiegelungen und die Pflege von Kunststoffen, Gummi und Felgen. Bei Bedarf koordinieren wir auch Spezialthemen wie Geruchsneutralisation oder die Vorbereitung auf eine Leasingrückgabe Aufbereitung, damit Sie unnötige Nachforderungen vermeiden.",
      "Kunden schätzen, dass wir realistische Zeitfenster nennen und vorab kommunizieren, was in einem Tag machbar ist und was ein zweiter Termin sinnvoller macht. So bleibt die Planung für Sie überschaubar.",
    ],
  },
  {
    id: "lackaufbereitung",
    title: "Lackaufbereitung Göppingen: Glanz, Tiefe und Schutz",
    paragraphs: [
      "Lackaufbereitung ist der Kern vieler Anfragen nach Autopflege in Göppingen. Mit der Zeit entstehen Waschstraßenkratzer, Wasserflecken, Vogelkot-Reste und eine allgemeine Mattigkeit. Eine professionelle Politur entfernt oder mildert viele dieser Spuren kontrolliert — nicht mit aggressiven Mitteln, sondern mit passenden Pads, Polituren und Erfahrung.",
      "Vor jeder Lackbearbeitung reinigen wir den Untergrund gründlich. Nur so lassen sich hologrammfreie Ergebnisse erzielen. Je nach Lackzustand arbeiten wir in ein oder mehreren Stufen. Das Ergebnis ist nicht nur „mehr Glanz“, sondern oft auch ein gleichmäßigeres Farbbild und ein besser geschützter Lack — besonders wenn anschließend eine Versiegelung folgt.",
      "Wenn Sie unsicher sind, ob eine einstufige Politur reicht oder eine Mehrstufen-Korrektur sinnvoll ist, schicken Sie uns gerne Fotos per WhatsApp. So können wir erste Einschätzung geben, bevor Sie das Fahrzeug vorbeibringen.",
    ],
  },
  {
    id: "keramik",
    title: "Keramikversiegelung: Langzeitschutz für den Lack",
    paragraphs: [
      "Eine Keramikversiegelung bündelt die Vorteile professioneller Fahrzeugpflege: Der Lack erhält eine harte, hydrophobe Schicht, die Schmutz weniger anhaften lässt und die Reinigung im Alltag erleichtert. In der Region Göppingen fragen immer mehr Kunden danach — oft nach einer vorherigen Lackaufbereitung, weil nur ein sauber korrigierter Untergrund das volle Potenzial der Versiegelung ausschöpft.",
      "Wir erklären Ihnen vorab, welche Haltbarkeit realistisch ist, wie Sie die Beschichtung pflegen sollten und welche Pflegeprodukte sich eignen. Keramik ist kein „einmal und vergessen“-Produkt, aber mit der richtigen Nachpflege ein sehr lohnender Schutz — besonders für Fahrzeuge, die viel draußen stehen oder regelmäßig lange Strecken fahren.",
    ],
    list: [
      "Hydrophober Effekt erleichtert die Handwäsche",
      "Schutz vor Umwelteinflüssen und leichten Verschmutzungen",
      "Optische Tiefe und intensiverer Glanz",
      "Ideal nach einer mehrstufigen Lackkorrektur",
    ],
  },
  {
    id: "innenraum",
    title: "Innenraumreinigung: sauber, frisch und materialschonend",
    paragraphs: [
      "Ein gepflegter Innenraum ist spürbar — beim Einsteigen, bei Fahrten mit Gästen und bei der Fahrzeugübergabe. Unsere Innenraumreinigung umfasst das Saugen aller Bereiche, die Reinigung von Polstern, Alcantara oder Leder sowie die Pflege von Kunststoffen, Displays und Glas. Wo nötig, setzen wir Dampf- oder Tornadotechnik ein, immer abgestimmt auf das Material.",
      "Gerüche von Rauch, Feuchtigkeit oder Transporttieren lassen sich in vielen Fällen deutlich reduzieren. Wir sprechen offen aus, wenn ein Geruch tief im Material sitzt und mehrere Behandlungen nötig sein können. Ehrlichkeit vor schnellem Versprechen — das passt zu unserer Arbeitsweise in Göppingen und Umgebung.",
    ],
  },
  {
    id: "leasing",
    title: "Leasingrückgabe Aufbereitung: stressfrei zurückgeben",
    paragraphs: [
      "Vor einer Leasingrückgabe lohnt sich eine gezielte Aufbereitung. Kleine Kratzer, verschmutzte Polster oder stark abgenutzte Kunststoffe können sonst zu Nachzahlungen führen. Wir kennen die typischen Prüfpunkte und bereiten Ihr Fahrzeug so vor, dass es optisch überzeugt — ohne unnötige Arbeiten, die den Aufwand sprengen.",
      "Gemeinsam priorisieren wir: Was muss sein, was ist optional? Oft reicht eine Kombination aus Innenraumreinigung, Lackaufbereitung an sichtbaren Stellen und der Pflege von Einstiegen und Felgen. Auf Wunsch dokumentieren wir den Zustand, damit Sie zur Übergabe sicherer auftreten.",
    ],
  },
  {
    id: "vorteile",
    title: "Vorteile professioneller Fahrzeugpflege",
    paragraphs: [
      "Professionelle Fahrzeugpflege spart auf lange Sicht Zeit und oft auch Geld. Wer sein Auto regelmäßig sachgerecht pflegt, reduziert das Risiko von eingetrocknetem Schmutz, Korrosion an Felgen und tief sitzenden Flecken im Innenraum. Der Wiederverkaufswert bleibt stabiler, und Sie fahren einfach gerne ein sauberes Fahrzeug.",
      "Bei Toni's Autopflege profitieren Sie zusätzlich von erfahrenen Abläufen, Premium-Produkten und einer persönlichen Beratung. Wir sind kein anonymer Waschbetrieb, sondern ein Spezialist für Autoaufbereitung mit festen Qualitätsstandards — für Kunden aus Göppingen und der gesamten Region.",
    ],
    list: [
      "Werterhalt und besserer Gesamteindruck",
      "Schonende Methoden statt aggressiver Kurzpflege",
      "Transparente Pakete und realistische Zeitplanung",
      "Persönlicher Ansprechpartner: Toni und Team",
      "Premium-Produkte (u. a. Koch-Chemie, Sonax)",
      "Mobiler Service nach Absprache in der Region",
    ],
  },
  {
    id: "ablauf",
    title: "So läuft Ihr Termin bei Toni's Autopflege ab",
    paragraphs: [
      "Starten Sie mit einer kurzen Anfrage per WhatsApp, Telefon oder Kontaktformular. Beschreiben Sie Fahrzeugtyp, Zustand und Wunsch (z. B. Keramikversiegelung, Innenraumreinigung oder Leasingvorbereitung). Wir melden uns in der Regel schnell mit Rückfragen oder einem Terminvorschlag.",
      "Beim Termin gehen wir den Plan noch einmal durch. Während der Aufbereitung halten wir Sie bei Bedarf auf dem Laufenden. Nach Abschluss besprechen wir Pflegehinweise für die nächsten Wochen — damit Sie das Ergebnis der Autopflege in Göppingen möglichst lange behalten.",
      "Alle Leistungen im Detail finden Sie auf unserer Leistungsseite. Referenzbilder und Videos zeigen, wie unterschiedliche Fahrzeuge nach der Aufbereitung aussehen können.",
    ],
  },
];

export const AUTOPFLEGE_LANDING_FAQ: AutopflegeFaqItem[] = [
  {
    question: "Was kostet Autopflege in Göppingen bei Toni's Autopflege?",
    answer:
      "Der Preis hängt vom Fahrzeugzustand, der Größe und dem gewünschten Umfang ab — von der gründlichen Außen- und Innenpflege bis zur mehrstufigen Lackkorrektur mit Keramikversiegelung. Nach einer kurzen Beschreibung oder Fotos nennen wir Ihnen ein realistisches Paket. So vermeiden Sie Pauschalpreise, die nicht zu Ihrem Fahrzeug passen.",
  },
  {
    question: "Wo befindet sich Toni's Autopflege für Kunden aus Göppingen?",
    answer:
      "Unsere Werkstatt liegt in der Boschstraße 23/1 in 73119 Zell unter Aichelberg — gut erreichbar aus Göppingen, Geislingen und der Umgebung. Den genauen Standort finden Sie auf der Kontaktseite mit Karte und Navigation.",
  },
  {
    question: "Wie lange dauert eine professionelle Autoaufbereitung?",
    answer:
      "Eine Innenraumreinigung oder Außenaufbereitung kann oft an einem Tag erledigt werden. Mehrstufige Lackkorrektur und Keramikversiegelung benötigen in der Regel mehr Zeit. Wir nennen Ihnen vorab eine realistische Dauer, damit Sie planen können.",
  },
  {
    question: "Lohnt sich eine Keramikversiegelung nach der Lackaufbereitung?",
    answer:
      "Ja, wenn der Lack zuvor sauber vorbereitet wurde. Die Versiegelung schützt das Ergebnis der Politur und erleichtert die Pflege im Alltag. Wir beraten, ob eine Keramikversiegelung für Ihr Nutzungsprofil sinnvoll ist.",
  },
  {
    question: "Bieten Sie Aufbereitung vor der Leasingrückgabe an?",
    answer:
      "Ja. Wir bereiten Fahrzeuge gezielt auf die Leasingrückgabe vor — mit Fokus auf sichtbare Mängel, Innenraum, Felgen und Lack. So reduzieren Sie das Risiko von Nachforderungen durch den Leasinggeber.",
  },
  {
    question: "Kommen Sie für Autopflege auch mobil nach Göppingen?",
    answer:
      "Mobiler Service ist nach Absprache möglich, wenn Logistik und Ausrüstung passen. Viele Kunden bringen das Fahrzeug direkt in unsere Werkstatt in Zell unter Aichelberg — fragen Sie einfach an, was für Ihren Fall besser ist.",
  },
  {
    question: "Welche Produkte verwenden Sie bei der Fahrzeugpflege?",
    answer:
      "Wir arbeiten mit professionellen Marken wie Koch-Chemie und Sonax sowie weiteren Premium-Herstellern aus unserem Partnernetzwerk. Die Produktwahl richtet sich nach Lack, Material und gewünschtem Ergebnis.",
  },
  {
    question: "Wie vereinbare ich einen Termin für Autopflege in Göppingen?",
    answer:
      "Am schnellsten per WhatsApp oder Telefon unter +49 174 8564830. Alternativ nutzen Sie das Kontaktformular auf der Website. Beschreiben Sie kurz Fahrzeug und Wunschleistung — wir melden uns mit dem nächsten Schritt.",
  },
];
