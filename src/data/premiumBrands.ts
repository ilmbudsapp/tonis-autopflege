/**
 * Premium brand cards — order is the on-page display order.
 * `logoWebp` is the exact basename under public/assets/images/brands/ (manual visual match).
 * If a logo drifts after re-import, only edit `logoWebp` here (do not rely on filename = slug).
 */
export const PREMIUM_BRAND_SLUGS = [
  "swissvax",
  "rupes",
  "servfaces",
  "koch-chemie",
  "3m",
  "colourlock",
] as const;

export type PremiumBrandSlug = (typeof PREMIUM_BRAND_SLUGS)[number];

export const PREMIUM_BRANDS: readonly {
  slug: PremiumBrandSlug;
  brandName: string;
  /** Basename only; full URL built with asset("images/brands", logoWebp). */
  logoWebp: string;
  text: string;
}[] = [
  {
    slug: "swissvax",
    brandName: "Swissvax",
    logoWebp: "swissvax.webp",
    text: "Exklusive Manufaktur-Pflege aus der Schweiz. Perfektion für Lackoberflächen und hochwertiges Carnauba-Wachs.",
  },
  {
    slug: "rupes",
    brandName: "Rupes",
    logoWebp: "koch-chemie.webp",
    text: "Italienische Präzisionstechnik bei Poliermaschinen. Für ein hologrammfreies und perfektes Lackfinish.",
  },
  {
    slug: "servfaces",
    brandName: "ServFaces",
    logoWebp: "rupes.webp",
    text: "High-End Keramikversiegelungen und Oberflächenschutz der nächsten Generation.",
  },
  {
    slug: "koch-chemie",
    brandName: "Koch-Chemie",
    logoWebp: "servfaces.webp",
    text: "Herausragende Reinigungschemie und Polituren – Made in Germany. Die erste Wahl für Profis.",
  },
  {
    slug: "3m",
    brandName: "3M",
    logoWebp: "colourlock.webp",
    text: "Weltweit führend in der Schleifmittel- und Poliertechnologie für makellose Ergebnisse.",
  },
  {
    slug: "colourlock",
    brandName: "Colourlock",
    logoWebp: "3m.webp",
    text: "Der Spezialist für Lederpflege und -reparatur. Sorgt für langlebige und geschmeidige Lederausstattungen.",
  },
];
