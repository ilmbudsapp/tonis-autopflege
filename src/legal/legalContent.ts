import {
  AGR_SITE_URL,
  CANONICAL_ORIGIN,
  FIRMENFOOTER,
  GOOGLE_MAPS_BUSINESS_URL,
  KLEINUNTERNEHMER_STEUERNUMMER,
} from "@/lib/site";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

const OPERATOR = `${FIRMENFOOTER.firma} — ${FIRMENFOOTER.inhaber}`;
const ADDRESS = `${FIRMENFOOTER.strasse}, ${FIRMENFOOTER.ort}, Deutschland`;

export const privacyPolicy = {
  title: "Datenschutzerklärung",
  subtitle: "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO und BDSG",
  lastUpdated: "Mai 2026",
  sections: [
    {
      id: "controller",
      title: "1. Verantwortlicher",
      paragraphs: [
        `${OPERATOR}\n${ADDRESS}\nE-Mail: ${FIRMENFOOTER.email}\nTelefon: ${FIRMENFOOTER.telefonLabel}`,
        `Verantwortlich für die Datenverarbeitung auf ${CANONICAL_ORIGIN.replace("https://", "")} im Sinne der DSGVO.`,
      ],
    },
    {
      id: "overview",
      title: "2. Allgemeine Hinweise",
      paragraphs: [
        "Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Bearbeitung von Termin- und Kontaktanfragen oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.",
        "Diese Erklärung beschreibt den Stand der auf tonis-autopflege-goeppingen.de eingesetzten Technologien (Stand Mai 2026).",
      ],
    },
    {
      id: "hosting",
      title: "3. Hosting",
      paragraphs: [
        "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf werden technisch erforderliche Verbindungsdaten verarbeitet.",
        "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer Bereitstellung). Übermittlungen in Drittländer können auf Standardvertragsklauseln des Anbieters gestützt sein.",
      ],
    },
    {
      id: "logs",
      title: "4. Server-Logfiles",
      paragraphs: [
        "Der Hosting-Anbieter kann automatisch Daten erfassen (IP-Adresse, Zeitpunkt, aufgerufene URL, Browser-Typ, Referrer). Diese dienen Stabilität, Sicherheit und Fehleranalyse.",
        "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Eine Zusammenführung mit anderen Daten erfolgt nicht, sofern nicht gesetzlich erforderlich.",
      ],
    },
    {
      id: "contact",
      title: "5. Kontaktformular, E-Mail & WhatsApp",
      paragraphs: [
        "Wenn Sie uns per E-Mail, Telefon, WhatsApp-Link oder über das Kontaktformular erreichen, verarbeiten wir Ihre Angaben (z. B. Name, E-Mail, Telefon, Nachricht, Fahrzeugdetails) zur Bearbeitung Ihrer Anfrage.",
        "Das Kontaktformular öffnet Ihr E-Mail-Programm per mailto:-Link (kontakt@tonis-autopflege.de). Es werden keine Formulardaten an einen externen Formular-Dienst übermittelt. WhatsApp-Links (wa.me) führen zu WhatsApp/Meta; beim Anklicken gelten die Datenschutzhinweise von Meta.",
        "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Kommunikation) bzw. lit. f DSGVO (allgemeine Kontaktanfragen).",
      ],
    },
    {
      id: "storage-local",
      title: "6. Lokale Speicherung (localStorage)",
      paragraphs: [
        "Wir speichern lokal in Ihrem Browser Ihre Cookie-/Einwilligungsentscheidung (tonis-cookie-consent) als JSON mit choice und updatedAt, damit der Banner nicht bei jedem Besuch erneut erscheint.",
        "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (technisch notwendige Präferenz) bzw. lit. a DSGVO (Einwilligung für externe Medien wie Google Maps).",
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies",
      paragraphs: [
        "Wir setzen keine Marketing- oder Analyse-Cookies ein. Google Analytics, Google Tag Manager, Meta Pixel, Hotjar und Microsoft Clarity werden auf dieser Website nicht verwendet.",
        "Die eingebettete Google-Maps-Karte wird erst geladen, wenn Sie im Cookie-Banner „Alle akzeptieren“ wählen. Bei „Nur notwendige“ sehen Sie eine Platzhalter-Ansicht mit Link zu Google Maps.",
      ],
    },
    {
      id: "analytics",
      title: "8. Webanalyse / Tracking",
      paragraphs: [
        "Auf tonis-autopflege-goeppingen.de ist derzeit kein Google Analytics oder vergleichbares Tracking implementiert. Tracking-Skripte werden nicht geladen — auch nicht nach Cookie-Einwilligung.",
      ],
    },
    {
      id: "fonts",
      title: "9. Schriftarten (lokal gehostet)",
      paragraphs: [
        "Schriftarten (Plus Jakarta Sans, Syne sowie die lokale Eurostile-Extd-Datei) werden aus dem eigenen Website-Bundle bzw. /assets/fonts/ geladen (.woff2). Es erfolgt keine Verbindung zu fonts.googleapis.com oder fonts.gstatic.com beim Seitenaufruf.",
        "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.",
      ],
    },
    {
      id: "external",
      title: "10. Externe Inhalte & Links",
      paragraphs: [
        `Die Website enthält Links zu WhatsApp (wa.me), Facebook, Instagram, TikTok, Google Maps (${GOOGLE_MAPS_BUSINESS_URL}), agrmultimedia.eu (Webdesign-Credit) und Wikipedia/Wikidata (SEO-Referenzen). Beim Anklicken gelten die Datenschutzhinweise des jeweiligen Anbieters.`,
        "Eingebettete Google-Maps-Karten laden nur nach Ihrer Einwilligung über den Cookie-Banner. Videos auf der Website werden selbst gehostet (MP4 aus dem eigenen /assets/-Verzeichnis), nicht über YouTube.",
      ],
    },
    {
      id: "ssl",
      title: "11. SSL-/TLS-Verschlüsselung",
      paragraphs: [
        "Diese Website nutzt SSL-/TLS-Verschlüsselung (https://). Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile.",
      ],
    },
    {
      id: "retention",
      title: "12. Speicherdauer",
      paragraphs: [
        "Anfragedaten aus E-Mails, WhatsApp und Telefon speichern wir nur so lange, wie für die Bearbeitung, gesetzliche Aufbewahrung oder Rechtsverteidigung erforderlich.",
        "Server-Logdaten werden nach den Richtlinien des Hosting-Anbieters rotiert gelöscht. Die Einwilligung in localStorage bleibt gespeichert, bis Sie sie im Browser löschen.",
      ],
    },
    {
      id: "rights",
      title: "13. Rechte der betroffenen Personen",
      paragraphs: [
        "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO). Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen (z. B. durch Löschen von localStorage im Browser).",
        "Beschwerden können Sie bei einer Aufsichtsbehörde einreichen, z. B. beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg (LfDI BW).",
      ],
    },
    {
      id: "objection",
      title: "14. Widerspruchsrecht",
      paragraphs: [
        `Verarbeiten wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO, können Sie aus Gründen Ihrer besonderen Situation Widerspruch einlegen: ${FIRMENFOOTER.email}`,
      ],
    },
    {
      id: "updates",
      title: "15. Aktualität",
      paragraphs: [
        "Wir passen diese Datenschutzerklärung an, wenn sich Rechtslage oder eingesetzte Dienste ändern. Stand: Mai 2026.",
      ],
    },
  ] satisfies LegalSection[],
};

export const impressum = {
  title: "Impressum",
  subtitle: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) und § 18 Abs. 2 MStV",
  sections: [
    {
      id: "operator",
      title: "Diensteanbieter",
      paragraphs: [
        FIRMENFOOTER.firma,
        FIRMENFOOTER.inhaber,
        FIRMENFOOTER.strasse,
        FIRMENFOOTER.ort,
        "Deutschland",
      ],
    },
    {
      id: "contact",
      title: "Kontakt",
      paragraphs: [
        `E-Mail: ${FIRMENFOOTER.email}`,
        `Telefon: ${FIRMENFOOTER.telefonLabel}`,
        `WhatsApp: ${FIRMENFOOTER.telefonLabel} (über wa.me-Link auf der Website)`,
      ],
    },
    {
      id: "representation",
      title: "Vertretungsberechtigt / Inhaber",
      paragraphs: [
        `${FIRMENFOOTER.inhaber} — Inhaber und verantwortlich für den Betrieb.`,
      ],
    },
    {
      id: "tax",
      title: "Steuerliche Angaben",
      paragraphs: [
        `Steuernummer: ${KLEINUNTERNEHMER_STEUERNUMMER}`,
        "Kleinunternehmer gemäß § 19 UStG — es wird keine Umsatzsteuer ausgewiesen.",
        "USt-IdNr.: nicht vorhanden (Kleinunternehmerregelung).",
      ],
    },
    {
      id: "profession",
      title: "Tätigkeit",
      paragraphs: [
        FIRMENFOOTER.branche,
        "Professionelle Fahrzeugaufbereitung, Lackpolitur, Keramikversiegelung und Innenraumreinigung",
        "Verliehen in: Bundesrepublik Deutschland",
      ],
    },
    {
      id: "content",
      title: "Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)",
      paragraphs: [`${FIRMENFOOTER.inhaber}, Anschrift wie oben`],
    },
    {
      id: "dispute",
      title: "EU-Streitschlichtung",
      paragraphs: [
        "Plattform der EU-Kommission zur Online-Streitbeilegung: https://ec.europa.eu/consumers/odr/",
        "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, sofern nicht gesetzlich zwingend.",
      ],
    },
    {
      id: "liability-content",
      title: "Haftung für Inhalte",
      paragraphs: [
        "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte verantwortlich. Nach §§ 8 bis 10 DDG sind wir nicht verpflichtet, übermittelte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
        "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.",
      ],
    },
    {
      id: "liability-links",
      title: "Haftung für Links",
      paragraphs: [
        "Unser Angebot enthält Links zu externen Websites Dritter (z. B. Social Media, Google Maps, WhatsApp). Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.",
      ],
    },
    {
      id: "copyright",
      title: "Urheberrecht",
      paragraphs: [
        "Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung bedürfen der schriftlichen Zustimmung.",
        `Webdesign und technische Umsetzung: AGRMULTIMEDIA (${AGR_SITE_URL}).`,
      ],
    },
  ] satisfies LegalSection[],
};
