import { WHATSAPP_E164_DIGITS } from "@/lib/contact";

export const BASE = import.meta.env.BASE_URL;

export function asset(dir: string, file: string): string {
  return `${BASE}assets/${dir}/${encodeURIComponent(file)}`;
}

export const LOGO_HEADER_SRC = asset("images", "TONY LOGO ISECEN.webp");
export const LOGO_HERO_SRC = asset("images", "TONY LOGO SA BELIM SLOVIMA.webp");
export const HERO_POSTER = `${BASE}assets/images/hero-poster.webp`;
export const HERO_VIDEO_PRIMARY = asset("videos", "Tony Video Klip kompresovan.mp4");

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

const TONI_WA_DIGITS_RAW = digitsOnly(String(import.meta.env.VITE_TONI_WHATSAPP_E164 ?? ""));
export const TONI_WA_DIGITS =
  TONI_WA_DIGITS_RAW.length >= 10 ? TONI_WA_DIGITS_RAW : WHATSAPP_E164_DIGITS;
export const TONI_WA_HREF = `https://wa.me/${TONI_WA_DIGITS}`;

export function toniWaHrefWithPrefill(message: string): string {
  return `https://wa.me/${TONI_WA_DIGITS}?text=${encodeURIComponent(message)}`;
}

export const KONTAKT_TERMIN_ANFRAGE_WA_TEXT =
  "Hallo Toni, ich würde gerne einen Termin für eine Beratung oder Reinigung vereinbaren.";
