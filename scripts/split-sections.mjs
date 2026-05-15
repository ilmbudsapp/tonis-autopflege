/**
 * Extracts section JSX from TonisLanding.tsx into src/components/sections/
 * Run: node scripts/split-sections.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const lines = fs.readFileSync(path.join(root, "src/components/TonisLanding.tsx"), "utf8").split("\n");
const outDir = path.join(root, "src/components/sections");

const SECTIONS = [
  { file: "HeroSection.tsx", start: 948, end: 1114, export: "HeroSection", hero: true },
  { file: "LeistungenSection.tsx", start: 1116, end: 1312, export: "LeistungenSection" },
  { file: "MobilerServiceSection.tsx", start: 1313, end: 1381, export: "MobilerServiceSection" },
  { file: "PremiumPartnerSection.tsx", start: 1382, end: 1481, export: "PremiumPartnerSection", premium: true },
  { file: "WarumTonisSection.tsx", start: 1482, end: 1532, export: "WarumTonisSection" },
  { file: "InnenraumSection.tsx", start: 1533, end: 1591, export: "InnenraumSection" },
  { file: "PremiumServicesSection.tsx", start: 1592, end: 1650, export: "PremiumServicesSection" },
  { file: "ProdukteSection.tsx", start: 1651, end: 1690, export: "ProdukteSection" },
  { file: "ImpressionenSection.tsx", start: 1691, end: 1830, export: "ImpressionenSection", impression: true },
  { file: "UeberMichSection.tsx", start: 1831, end: 1957, export: "UeberMichSection" },
  { file: "TerminCtaSection.tsx", start: 1958, end: 1988, export: "TerminCtaSection" },
  { file: "BewertungenSection.tsx", start: 1989, end: 2076, export: "BewertungenSection" },
  { file: "GutscheineSection.tsx", start: 2077, end: 2152, export: "GutscheineSection" },
  { file: "PartnerSection.tsx", start: 2154, end: 2197, export: "PartnerSection" },
  { file: "FaqSection.tsx", start: 2198, end: 2272, export: "FaqSection", faq: true },
  { file: "KontaktSection.tsx", start: 2273, end: 2425, export: "KontaktSection" },
];

const IMPORTS = `import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  AirVent, Armchair, BrushCleaning, Building2, Car, Check, ChevronDown, Droplets,
  FileCheck, Focus, Gift, Hammer, Mail, MapPin, MessageCircle, Music2, Phone, Quote,
  Shield, Sparkles, Star, Sun, Tags, TrendingUp, Wind, Wrench,
} from "lucide-react";
import { GALLERY_WEBP_FILENAMES } from "@/generated/galleryWebp";
import { WORK_VIDEO_CLIPS } from "@/generated/workVideos";
import { PREMIUM_BRANDS } from "@/data/premiumBrands";
import {
  FAQ_ITEMS, GUTSCHEIN_BETRAEGE, INNENRAUM_CATEGORIES, KUNDEN_TESTIMONIALS,
  LEISTUNGEN_ALLE_LINIEN, LEISTUNGEN_CATEGORIES, PARTNER_NETZWERK_NAMEN,
  PREMIUM_SERVICES, PRODUKTE, REPARATUR_SPEZIAL_SERVICES, WARUM_TONIS_ITEMS,
} from "@/data/siteContent";
import {
  BASE, HERO_POSTER, HERO_VIDEO_PRIMARY, KONTAKT_TERMIN_ANFRAGE_WA_TEXT,
  LOGO_HERO_SRC, TONI_WA_HREF, toniWaHrefWithPrefill,
} from "@/lib/assets";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import { ROUTES } from "@/lib/site";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { GoldIconFrame, LucideInGold, SvgGoogleGCorner } from "@/components/ui/GoldIcons";

const GALLERY = GALLERY_WEBP_FILENAMES.map((f) => \`\${BASE}assets/gallery-webp/\${f}\`);
const WORK_VIDEO_BASE = \`\${BASE}assets/videos/work/\`;
const WORK_VIDEOS = WORK_VIDEO_CLIPS.map((c, i) => ({
  src: \`\${WORK_VIDEO_BASE}\${c.file}\`,
  poster: \`\${WORK_VIDEO_BASE}posters/\${c.poster}\`,
  title: \`Referenzvideo \${i + 1}\`,
  text: "Ausschnitt aus der Aufbereitung — Politur, Innenraum oder Finish.",
}));
`;

function cleanBody(body) {
  return body
    .replace(/max-md:scroll-mt-\[[^\]]+\]\s*/g, "")
    .replace(/md:scroll-mt-24\s*/g, "")
    .replace(/md:scroll-mt-0\s*/g, "")
    .replace(/scroll-mt-28\s*/g, "")
    .replace(
      /<motion\.a\s+href=\{absoluteInternalHashHref\("kontakt"\)\}\s+onClick=\{[^}]+\}\s+/g,
      '<Link to={ROUTES.kontakt} ',
    )
    .replace(
      /<motion\.a\s+href=\{absoluteInternalHashHref\("leistungen"\)\}\s+onClick=\{[^}]+\}\s+/g,
      '<Link to={ROUTES.leistungen} ',
    )
    .replace(/<\/motion\.a>/g, "</Link>")
    .replace(
      /<a\s+href=\{absoluteHomeHref\(\)\}\s+onClick=\{onHomeLogoClick\}/g,
      "<Link to={ROUTES.home}",
    )
    .replace(/absoluteInternalHashHref\("[^"]+"\)/g, "ROUTES.home");
}

fs.mkdirSync(outDir, { recursive: true });

for (const s of SECTIONS) {
  let body = cleanBody(lines.slice(s.start - 1, s.end).join("\n"));

  let extra = "";
  if (s.hero) {
    extra = `
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroParallaxDesktop, setHeroParallaxDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setHeroParallaxDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const reduceMotionRef = useRef(reduceMotion);
  const heroParallaxDesktopRef = useRef(heroParallaxDesktop);
  reduceMotionRef.current = reduceMotion;
  heroParallaxDesktopRef.current = heroParallaxDesktop;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rawParallax = useTransform(scrollYProgress, (v) =>
    heroParallaxDesktopRef.current && !reduceMotionRef.current ? \`\${v * 22}%\` : "0%",
  );
  const videoY = useSpring(rawParallax, { stiffness: 100, damping: 28, mass: 0.6 });
`;
  }
  if (s.impression) extra += `  const [impressionTab, setImpressionTab] = useState<"fotos" | "videos">("fotos");\n`;
  if (s.faq) extra += `  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);\n`;
  if (s.premium) {
    extra += `  const [premiumCardTap, setPremiumCardTap] = useState<string | null>(null);
  const premiumBrandsGridRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (premiumCardTap === null) return;
    const onPointerDown = (e: PointerEvent) => {
      const root = premiumBrandsGridRef.current;
      if (root && !root.contains(e.target as Node)) setPremiumCardTap(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPremiumCardTap(null); };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [premiumCardTap]);
`;
  }

  const heroLogo = s.hero
    ? `  const HeroLogoImg = ({ className }: { className?: string }) => (
    <img src={LOGO_HERO_SRC} width={480} height={140} alt="Toni's Autopflege" className={className} decoding="async" fetchPriority="high" />
  );
`
    : "";

  fs.writeFileSync(
    path.join(outDir, s.file),
    `${IMPORTS}

export function ${s.export}() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();
${heroLogo}${extra}
  return (
    <>
${body}
    </>
  );
}
`,
  );
  console.log("Wrote", s.file);
}
