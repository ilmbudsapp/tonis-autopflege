/** German ALT texts for gallery images — service + location, no spam. */
const SERVICE_LABELS = [
  "Lackaufbereitung Göppingen",
  "Keramikversiegelung Göppingen",
  "Innenraumreinigung Göppingen",
  "Autoaufbereitung Göppingen",
  "Fahrzeugpflege Göppingen",
  "Lackpolitur Göppingen",
] as const;

export function galleryImageAlt(index: number): string {
  const service = SERVICE_LABELS[index % SERVICE_LABELS.length];
  return `${service} — Referenzbild ${index + 1} bei Toni's Autopflege`;
}
