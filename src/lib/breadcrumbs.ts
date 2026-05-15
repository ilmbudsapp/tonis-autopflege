import { CANONICAL_ORIGIN, ROUTES, type RoutePath } from "@/lib/site";

export type BreadcrumbItem = {
  name: string;
  path: RoutePath | "/";
};

const PAGE_LABELS: Record<string, string> = {
  [ROUTES.leistungen]: "Leistungen",
  [ROUTES.galerie]: "Galerie",
  [ROUTES.video]: "Videos",
  [ROUTES.gutscheine]: "Gutscheine",
  [ROUTES.partner]: "Partner",
  [ROUTES.ueberMich]: "Über mich",
  [ROUTES.bewertungen]: "Bewertungen",
  [ROUTES.faq]: "FAQ",
  [ROUTES.kontakt]: "Kontakt",
  [ROUTES.impressum]: "Impressum",
  [ROUTES.datenschutz]: "Datenschutz",
  [ROUTES.agb]: "AGB",
};

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ name: "Start", path: ROUTES.home }];
  if (pathname === ROUTES.home || pathname === "") return items;

  const label = PAGE_LABELS[pathname];
  if (label) {
    items.push({ name: label, path: pathname as RoutePath });
  }
  return items;
}

export function breadcrumbListSchema(pathname: string) {
  const items = getBreadcrumbItems(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${item.path}`,
    })),
  };
}
