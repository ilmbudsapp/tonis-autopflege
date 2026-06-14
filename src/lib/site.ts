export const CANONICAL_ORIGIN = "https://www.tonis-autopflege-goeppingen.de";

export const SITE_NAME = "Toni's Autopflege";

/** Document title for homepage (browser tab / SERP). */
export const HOME_PAGE_TITLE = "Autopflege Göppingen | Lackaufbereitung, Keramik & Innenraum — Toni's Autopflege";

/** Single homepage H1 — contains primary local keyword. */
export const HOME_H1 = "Autopflege Göppingen — professionelle Fahrzeugaufbereitung bei Toni";

export const ROUTES = {
  home: "/",
  autopflegeGoeppingen: "/autopflege-goeppingen",
  leistungen: "/leistungen",
  ueberMich: "/ueber-mich",
  faq: "/faq",
  partner: "/partner",
  bewertungen: "/bewertungen",
  kontakt: "/kontakt",
  impressum: "/impressum",
  datenschutz: "/datenschutz",
  agb: "/agb",
  gutscheine: "/gutscheine",
  galerie: "/galerie",
  video: "/video",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_LINKS: { to: RoutePath; label: string }[] = [
  { to: ROUTES.leistungen, label: "Leistungen" },
  { to: ROUTES.galerie, label: "Galerie" },
  { to: ROUTES.video, label: "Video" },
  { to: ROUTES.gutscheine, label: "Gutscheine" },
  { to: ROUTES.partner, label: "Partner" },
  { to: ROUTES.ueberMich, label: "Über mich" },
  { to: ROUTES.bewertungen, label: "Bewertungen" },
  { to: ROUTES.faq, label: "FAQ" },
  { to: ROUTES.kontakt, label: "Kontakt" },
];

export const FIRMENFOOTER = {
  firma: "Toni's Autopflege",
  inhaber: "Jeton Shala — Toni",
  branche: "Autoaufbereitung",
  strasse: "Boschstr. 23/1",
  ort: "73119 Zell unter Aichelberg",
  telefonLabel: "+49 174 8564830",
  telefonHref: "tel:+491748564830",
  email: "tonis-autopflege@gmx.de",
  facebook: { label: "Toni's Autopflege", href: "https://www.facebook.com/TonisAutopflege" },
  instagram: { label: "tonisautopflege1", href: "https://www.instagram.com/tonisautopflege1/" },
  tiktok: { label: "toni03_3", href: "https://www.tiktok.com/@toni03_3" },
} as const;

export const KLEINUNTERNEHMER_STEUERNUMMER = "6339616878";

export const GOOGLE_MAPS_BUSINESS_URL =
  "https://www.google.com/maps/search/?api=1&query=Tonis+Autopflege+Boschstr+23%2F1+73119+Zell+unter+Aichelberg";

export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Boschstr.+23%2F1%2C+73119+Zell+unter+Aichelberg&z=15&hl=de&output=embed";

export const AGR_SITE_URL = import.meta.env.VITE_AGR_SITE_URL ?? "https://agrmultimedia.eu";

export type PageMetaConfig = {
  title: string;
  description: string;
  path: RoutePath;
};

export const PAGE_META: Record<string, PageMetaConfig> = {
  home: {
    path: ROUTES.home,
    title: HOME_PAGE_TITLE,
    description:
      "Autopflege Göppingen: Toni's Autopflege in Zell unter Aichelberg — Autoaufbereitung, Lackaufbereitung, Keramikversiegelung & Innenraumreinigung. Termin per WhatsApp.",
  },
  autopflegeGoeppingen: {
    path: ROUTES.autopflegeGoeppingen,
    title: "Autopflege Göppingen — Autoaufbereitung & Fahrzeugpflege | Toni's Autopflege",
    description:
      "Autopflege Göppingen: professionelle Autoaufbereitung, Lackaufbereitung, Keramikversiegelung und Innenraumreinigung. Werkstatt in Zell unter Aichelberg — Termin bei Toni's Autopflege.",
  },
  leistungen: {
    path: ROUTES.leistungen,
    title: "Leistungen Politur & Reinigung - Toni's Autopflege",
    description:
      "Außenaufbereitung, Lackpolitur, Keramikversiegelung, Innenraumreinigung und Spezial-Services — professionelle Autoaufbereitung in Zell unter Aichelberg.",
  },
  ueberMich: {
    path: ROUTES.ueberMich,
    title: "Über Toni - Toni's Autopflege Göppingen",
    description:
      "Jeton Shala (Toni) — über 10 Jahre Erfahrung in Fahrzeugaufbereitung, Koch-Chemie, Sonax und handwerkliche Qualität in Zell unter Aichelberg.",
  },
  faq: {
    path: ROUTES.faq,
    title: "FAQ Autoaufbereitung - Toni's Autopflege",
    description:
      "Häufige Fragen zu Dauer, Keramikversiegelung, Marken und mobilem Service — Toni's Autopflege Göppingen / Zell unter Aichelberg.",
  },
  partner: {
    path: ROUTES.partner,
    title: "Partner & Premium-Marken - Toni's Autopflege",
    description:
      "Koch-Chemie, Sonax, Gyeon, CarPro, HYLA und starkes Partnernetzwerk — Premium-Produkte für reproduzierbare Aufbereitungsergebnisse.",
  },
  bewertungen: {
    path: ROUTES.bewertungen,
    title: "Kundenbewertungen - Toni's Autopflege",
    description:
      "Google-Rezensionen und Kundenstimmen zu Lackpolitur, Keramik und Innenraum — Toni's Autopflege in Zell unter Aichelberg.",
  },
  kontakt: {
    path: ROUTES.kontakt,
    title: "Kontakt & Termin - Toni's Autopflege",
    description:
      "Termin anfragen: Boschstr. 23/1, 73119 Zell unter Aichelberg. Telefon, E-Mail, WhatsApp und Karte — Toni's Autopflege.",
  },
  impressum: {
    path: ROUTES.impressum,
    title: "Impressum - Toni's Autopflege",
    description: "Impressum und Anbieterkennzeichnung — Toni's Autopflege, Jeton Shala, Boschstr. 23/1, 73119 Zell unter Aichelberg.",
  },
  datenschutz: {
    path: ROUTES.datenschutz,
    title: "Datenschutz - Toni's Autopflege",
    description: "Datenschutzerklärung — Toni's Autopflege. Informationen zur Verarbeitung personenbezogener Daten (DSGVO).",
  },
  gutscheine: {
    path: ROUTES.gutscheine,
    title: "Gutscheine Autopflege - Toni's Autopflege",
    description:
      "Geschenkgutscheine für Autoaufbereitung — wählen Sie einen Wert und kontaktieren Sie Toni's Autopflege per WhatsApp.",
  },
  galerie: {
    path: ROUTES.galerie,
    title: "Galerie - Toni's Autopflege Göppingen",
    description:
      "Unsere Ergebnisse: Vorher-Nachher Bilder der professionellen Autoaufbereitung.",
  },
  video: {
    path: ROUTES.video,
    title: "Videos - Toni's Autopflege Göppingen",
    description:
      "Einblicke in unsere Arbeit: Professionelle Fahrzeugpflege im Video-Format.",
  },
  agb: {
    path: ROUTES.agb,
    title: "AGB - Toni's Autopflege",
    description:
      "Allgemeine Geschäftsbedingungen (AGB) für Leistungen und Termine bei Toni's Autopflege in Göppingen / Zell unter Aichelberg.",
  },
};
