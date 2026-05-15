import { useDemoFonts } from "@/hooks/useDemoFonts";

export function useSiteTypography() {
  const fontsReady = useDemoFonts();
  const fontSans = fontsReady ? '"Plus Jakarta Sans", system-ui, sans-serif' : "system-ui, sans-serif";
  const fontDisplay = fontsReady ? '"Syne", system-ui, sans-serif' : "system-ui, sans-serif";
  const fontHeroHeadline = '"Eurostile Extd", "Orbitron", system-ui, sans-serif';
  return { fontsReady, fontSans, fontDisplay, fontHeroHeadline };
}
