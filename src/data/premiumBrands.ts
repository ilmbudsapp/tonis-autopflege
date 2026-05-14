export const PREMIUM_BRAND_SLUGS = [
  "swissvax",
  "koch-chemie",
  "rupes",
  "servfaces",
  "3m",
  "colourlock",
] as const;

export type PremiumBrandSlug = (typeof PREMIUM_BRAND_SLUGS)[number];

export const PREMIUM_BRANDS: readonly {
  slug: PremiumBrandSlug;
  brandName: string;
  text: string;
}[] = [
  {
    slug: "swissvax",
    brandName: "Swissvax",
    text: "Exklusive Manufaktur-Pflege aus der Schweiz. Perfektion für Lackoberflächen und hochwertiges Carnauba-Wachs.",
  },
  {
    slug: "koch-chemie",
    brandName: "Koch-Chemie",
    text: "Herausragende Reinigungschemie und Polituren – Made in Germany. Die erste Wahl für Profis.",
  },
  {
    slug: "rupes",
    brandName: "Rupes",
    text: "Italienische Präzisionstechnik bei Poliermaschinen. Für ein hologrammfreies und perfektes Lackfinish.",
  },
  {
    slug: "servfaces",
    brandName: "ServFaces",
    text: "High-End Keramikversiegelungen und Oberflächenschutz der nächsten Generation.",
  },
  {
    slug: "3m",
    brandName: "3M",
    text: "Weltweit führend in der Schleifmittel- und Poliertechnologie für makellose Ergebnisse.",
  },
  {
    slug: "colourlock",
    brandName: "Colourlock",
    text: "Der Spezialist für Lederpflege und -reparatur. Sorgt für langlebige und geschmeidige Lederausstattungen.",
  },
];
