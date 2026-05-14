import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode, type SVGProps } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  AirVent,
  Armchair,
  BrushCleaning,
  Building2,
  Car,
  Check,
  Droplets,
  FileCheck,
  Focus,
  Hammer,
  Mail,
  MapPin,
  Music2,
  Phone,
  Shield,
  Sparkles,
  Star,
  Sun,
  Tags,
  TrendingUp,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { WHATSAPP_E164_DIGITS } from "@/lib/contact";
import { GALLERY_WEBP_FILENAMES } from "@/generated/galleryWebp";
import { WORK_VIDEO_CLIPS } from "@/generated/workVideos";
import { PREMIUM_BRANDS } from "@/data/premiumBrands";

const BASE = import.meta.env.BASE_URL;
const asset = (dir: string, file: string) => `${BASE}assets/${dir}/${encodeURIComponent(file)}`;
const LOGO_HEADER_SRC = asset("images", "TONY LOGO ISECEN.webp");
const LOGO_HERO_SRC = asset("images", "TONY LOGO SA BELIM SLOVIMA.webp");

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

const TONI_WA_DIGITS_RAW = digitsOnly(String(import.meta.env.VITE_TONI_WHATSAPP_E164 ?? ""));
/** Toni's number in .env (VITE_TONI_WHATSAPP_E164); until set, main site WhatsApp is used as fallback. */
const TONI_WA_DIGITS = TONI_WA_DIGITS_RAW.length >= 10 ? TONI_WA_DIGITS_RAW : WHATSAPP_E164_DIGITS;
const TONI_WA_HREF = `https://wa.me/${TONI_WA_DIGITS}`;
const HERO_VIDEO_PRIMARY = asset("videos", "Tony Video Klip kompresovan.mp4");
const HERO_POSTER = `${BASE}assets/images/hero-poster.webp`;

const AGR_SITE_URL = import.meta.env.VITE_AGR_SITE_URL ?? "https://agrmultimedia.eu";
const GALLERY = GALLERY_WEBP_FILENAMES.map((f) => `${BASE}assets/gallery-webp/${f}`);

type LeistungKategorie = {
  id: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  listLabel: "Leistungen" | "Vorteile";
  items: readonly string[];
  highlight?: boolean;
};

const LEISTUNGEN_CATEGORIES: readonly LeistungKategorie[] = [
  {
    id: "aussen",
    Icon: Droplets,
    title: "Außenaufbereitung",
    subtitle: "Handwäsche & Lackreinigung",
    description:
      "Schonende Handwäsche für eine kratzfreie und gründliche Reinigung Ihres Fahrzeugs. Hartnäckiger Schmutz, Insektenreste und Ablagerungen werden professionell entfernt.",
    listLabel: "Leistungen",
    items: [
      "Premium Handwäsche",
      "Tiefenwirksame Felgenreinigung",
      "Reifenpflege & Glanzfinish",
      "Flugrostentfernung & Lackdekontamination",
      "Kunststoffpflege im Außenbereich",
    ],
  },
  {
    id: "lack",
    Icon: Sparkles,
    title: "Lackpolitur & Glanzaufbereitung",
    subtitle: "Professionelle Lackveredelung",
    description:
      "Professionelle Politur zur Entfernung feiner Kratzer, Hologramme und matter Stellen. Wir verleihen Ihrem Lack neuen Tiefenglanz und ein hochwertiges Finish.",
    listLabel: "Vorteile",
    items: [
      "Spiegelnder Hochglanz",
      "Maximale Farbauffrischung",
      "Beseitigung von Lackdefekten",
      "Langfristige Lackveredelung",
    ],
  },
  {
    id: "keramik",
    Icon: Shield,
    title: "Keramikversiegelung",
    subtitle: "Das Premium-Highlight",
    description:
      "Langfristiger Schutz durch modernste Keramikbeschichtung. Diese High-End-Versiegelung schützt vor UV-Strahlen, Umwelteinflüssen und sorgt für den ultimativen Wasserabperleffekt (Beading).",
    listLabel: "Vorteile",
    items: [
      "Ultimativer Langzeitschutz",
      "Extremer Tiefenglanz",
      "Easy-to-Clean Effekt (leichtere Wäsche)",
      "Schutz vor aggressiven Umwelteinflüssen",
    ],
    highlight: true,
  },
];

const WARUM_TONIS_ITEMS = [
  "Professionelle Pflegeprodukte",
  "Hochwertige Fahrzeugaufbereitung",
  "Liebe zum Detail",
  "Schonende Handarbeit",
  "Faire Preise",
  "Individuelle Beratung",
  "Perfekter Glanz & Werterhalt",
] as const;

type InnenraumKategorie = {
  id: string;
  Icon: LucideIcon;
  title: string;
  description: string;
};

const INNENRAUM_CATEGORIES: readonly InnenraumKategorie[] = [
  {
    id: "tiefenreinigung",
    Icon: BrushCleaning,
    title: "Innenraum-Tiefenreinigung",
    description:
      "Staubsaugen, Teppich- & Polsterreinigung, Leder- & Kunststoffpflege, Kofferraum- & Scheibenreinigung.",
  },
  {
    id: "polster-leder",
    Icon: Armchair,
    title: "Polster- & Lederpflege",
    description:
      "Schonende Reinigung für Stoff, Alcantara und Leder. Ideal bei Flecken, Gebrauchsspuren und Tierhaaren.",
  },
  {
    id: "geruch-ozon",
    Icon: AirVent,
    title: "Geruchsentfernung & Ozonbehandlung",
    description: "Professionelle Neutralisierung von Rauch, Tiergerüchen und Feuchtigkeit.",
  },
];

type ReparaturSpezialItem = {
  id: string;
  Icon: LucideIcon;
  title: string;
  text: string;
};

const REPARATUR_SPEZIAL_SERVICES: readonly ReparaturSpezialItem[] = [
  {
    id: "smart-repair",
    Icon: Hammer,
    title: "Smart Repair",
    text: "Punktuelle Beseitigung von Lackkratzern und Schrammen – kosteneffizient und schnell, ohne teure Komplettlackierung.",
  },
  {
    id: "dellenentfernung",
    Icon: Focus,
    title: "Dellenentfernung",
    text: "Sanfte Ausbeultechnik ohne Lackieren. Professionelle Entfernung von Parkdellen, wobei der Originallack vollständig erhalten bleibt.",
  },
  {
    id: "steinschlag-scheiben",
    Icon: Car,
    title: "Steinschlag & Scheibenservice",
    text: "Fachgerechte Reparatur von Steinschlägen und Rissen. Bei Bedarf führen wir einen kompletten Scheibenaustausch durch.",
  },
  {
    id: "scheibentoenung",
    Icon: Sun,
    title: "Scheibentönung",
    text: "Hochwertige Tönungsfolien für Hitze- und UV-Schutz. Verleiht dem Fahrzeug eine sportliche Optik und sorgt für Privatsphäre.",
  },
  {
    id: "fahrzeugbeschriftung",
    Icon: Tags,
    title: "Fahrzeugbeschriftung",
    text: "Individuelle Werbe- und Designbeschriftungen für Firmen- und Privatautos. Hochwertige Folienlösungen nach Maß.",
  },
  {
    id: "geruchsentfernung-ozon-spezial",
    Icon: Wind,
    title: "Geruchsentfernung & Ozonbehandlung",
    text: "Professionelle Neutralisierung unangenehmer Gerüche wie Rauch, Tiergeruch oder Feuchtigkeit mittels Ozonbehandlung. Ideal für Gebrauchtwagen und Raucherfahrzeuge.",
  },
];

type PremiumService = {
  id: string;
  Icon: LucideIcon;
  title: string;
  text: string;
  vorteile?: string;
};

const PREMIUM_SERVICES: readonly PremiumService[] = [
  {
    id: "leasing",
    Icon: FileCheck,
    title: "Leasingrückgabe-Aufbereitung",
    text: "Optimale Vorbereitung für den Verkauf oder die Rückgabe.",
    vorteile: "Werterhalt, höhere Verkaufschancen",
  },
  {
    id: "motorraum",
    Icon: Wrench,
    title: "Motorraumreinigung",
    text: "Schonende Reinigung für ein gepflegtes Gesamtbild.",
  },
  {
    id: "verkauf",
    Icon: TrendingUp,
    title: "Fahrzeugaufbereitung für Verkauf",
    text: "Perfekter erster Eindruck für maximalen Fahrzeugwert.",
  },
];

const PRODUKTE = [
  {
    name: "Koch-Chemie",
    text: "Systempflege für Felgen, Innenraum und Lack — entwickelt und produziert in Deutschland.",
  },
  {
    name: "Sonax",
    text: "Bewährte Produkte für Felgenreinigung, Politur und Glanzfinish im täglichen Einsatz.",
  },
  {
    name: "Menzerna",
    text: "High-End-Politursysteme für Washline, Hologramme und langanhaltenden Tiefenglan.",
  },
  { name: "Gyeon", text: "Keramik-Versiegelungen und hydrophobe Schichten mit starker Perle." },
  { name: "CarPro", text: "Ceramic Coatings und Detailing-Chemie auf professionellem Niveau." },
  { name: "Cartec", text: "Effiziente Vorreiniger und Spezialprodukte für gewerbliche Aufbereitung." },
] as const;

const PARTNER = [
  { name: "Autohaus-Partner", hint: "Fahrzeugübergabe & Beratung vor Ort" },
  { name: "Scheiben & Folierung", hint: "Tönung & Steinschlagschutz" },
  { name: "Werkstatt-Netzwerk", hint: "Mechanik & Vorbereitung" },
  { name: "Logistik regional", hint: "Abholung nach Vereinbarung" },
] as const;

/** Kooperationspartner — Textkarten bis Logos vorliegen (Unser Partner-Netzwerk). */
const PARTNER_NETZWERK = [
  "DB Avantgarde GmbH",
  "vip-shuttle.com GmbH",
  "Gebr. Welchner GmbH",
  "SSK-Fahrzeugservice GbR (Mühlhäuser & Weil)",
  "Waschkraft",
  "Gross u. Geis GmbH",
  "KRAFT Lackmanufaktur",
  "Edis Smart Repair",
  "Hyla Germany GmbH",
  "MH Carcollection",
] as const;

const WORK_VIDEO_BASE = `${BASE}assets/videos/work/`;
const WORK_VIDEOS = WORK_VIDEO_CLIPS.map((c, i) => ({
  src: `${WORK_VIDEO_BASE}${c.file}`,
  poster: `${WORK_VIDEO_BASE}posters/${c.poster}`,
  title: `Referenzvideo ${i + 1}`,
  text: "Ausschnitt aus der Aufbereitung — Politur, Innenraum oder Finish.",
}));

const OEFFNUNGSZEITEN = [
  { tag: "Montag – Freitag", zeit: "09:00 – 18:00" },
  { tag: "Samstag", zeit: "nach Vereinbarung" },
  { tag: "Sonntag", zeit: "geschlossen" },
] as const;

const EASE_OUT_CUBIC = [0.16, 1, 0.3, 1] as const;

const NAV_LINKS = [
  ["leistungen", "Leistungen"],
  ["produkte", "Produkte"],
  ["impressionen", "Impressionen"],
  ["ueber-uns", "Über uns"],
  ["kontakt", "Kontakt"],
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Gold „3D“ tile behind Lucide icons (depth via gradient + bottom shadow). */
function GoldIconFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#4a4a55] via-[#2a2a32] to-[#14141c] text-[#f2dc98] shadow-[0_5px_0_rgb(6,6,8),0_12px_28px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.16)] ring-1 ring-[#c9a227]/40 md:h-12 md:w-12 ${className}`}
      aria-hidden
    >
      {children}
    </span>
  );
}

function LucideInGold({ Icon }: { Icon: LucideIcon }) {
  return (
    <GoldIconFrame>
      <Icon className="h-5 w-5" strokeWidth={1.85} />
    </GoldIconFrame>
  );
}

function SvgFacebookGold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073C24 5.405 18.627.073 12 .073S0 5.405 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SvgInstagramGold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM16.396 5.02a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
    </svg>
  );
}

const FIRMENFOOTER = {
  firma: "Toni's Autopflege",
  inhaber: "Jeton Shala — Toni",
  branche: "Autoaufbereitung",
  strasse: "Boschstraße 23/1",
  ort: "73119 Zell unter Aichelberg",
  telefonLabel: "0176 22887384",
  telefonHref: "tel:+4917622887384",
  email: "info.tonisautopflege@gmx.de",
  facebook: { label: "Toni's Autopflege", href: "https://www.facebook.com/TonisAutopflege" },
  instagram: { label: "tonisautopflege1", href: "https://www.instagram.com/tonisautopflege1/" },
  tiktok: { label: "toni03_3", href: "https://www.tiktok.com/@toni03_3" },
} as const;

/** Google Maps (Unternehmensprofil) — Suche nach Standort; Rezensionen dort einsehbar. */
const GOOGLE_MAPS_BUSINESS_URL =
  "https://www.google.com/maps/search/?api=1&query=Tonis+Autopflege+Boschstra%C3%9Fe+23%2F1+73119+Zell+unter+Aichelberg";

const KUNDEN_TESTIMONIALS = [
  {
    name: "Andreas Steeg",
    text: 'Auto ist perfekt geworden. Fast schon zu schön für mein altes Auto. Wirklich hammer Service. Pünktlich wie ausgemacht fertig. Völlig zufrieden, wird definitiv weiterempfohlen.',
  },
  {
    name: "VD Tran",
    text: "BMW innen und außen wieder perfekt — Lack top, Innenraum kaum wiederzuerkennen. Saubere Arbeit zum fairen Preis. 100% Empfehlung!",
  },
  {
    name: "Amel Mujic",
    text: "Auto zur Keramikversiegelung abgegeben und war vom Ergebnis einfach nur begeistert. Das Auto sieht aus wie ein Neuwagen. Sehr gute und professionelle Arbeit. Nur zu empfehlen!",
  },
  {
    name: "Davide Gesia",
    text: "Wer professionelle Aufbereitung fürs eigene Auto sucht, wird hier mehr als zufrieden sein! Die Terminvereinbarung erfolgt schnell und unkompliziert. Großes Lob an Toni!",
  },
] as const;

/** Kleines mehrfarbiges Google-„G“ für die Ecke der Rezensionskarten. */
function SvgGoogleGCorner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function useDemoFonts() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const googleHref =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@500;600;700;800&family=Orbitron:wght@700;800;900&display=swap";
    const id = "tonis-demo-fonts-v2";

    const markReady = () => setReady(true);

    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = googleHref;
      link.onload = markReady;
      link.onerror = markReady;
      document.head.appendChild(link);
    } else {
      markReady();
    }
  }, []);
  return ready;
}

export default function TonisLanding() {
  const reduceMotion = useReducedMotion();
  const fontsReady = useDemoFonts();
  const heroRef = useRef<HTMLElement | null>(null);
  const [impressionTab, setImpressionTab] = useState<"fotos" | "videos">("fotos");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  /** Touch / coarse UI: which premium brand card mirrors desktop :hover (glow + logo colour). */
  const [premiumCardTap, setPremiumCardTap] = useState<string | null>(null);
  const premiumBrandsGridRef = useRef<HTMLDivElement | null>(null);

  const onHomeLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    scrollToId("hero");
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rawParallax = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const videoY = useSpring(rawParallax, { stiffness: 100, damping: 28, mass: 0.6 });

  useEffect(() => {
    const prevLang = document.documentElement.lang;
    document.documentElement.lang = "de";
    return () => {
      document.documentElement.lang = prevLang;
    };
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (premiumCardTap === null) return;
    const onPointerDown = (e: PointerEvent) => {
      const root = premiumBrandsGridRef.current;
      if (root && !root.contains(e.target as Node)) setPremiumCardTap(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPremiumCardTap(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [premiumCardTap]);

  const navigateToSection = (id: string) => {
    scrollToId(id);
    setMobileNavOpen(false);
  };

  const containerSlow: Variants = useMemo(
    () =>
      reduceMotion
        ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
        : {
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.09, delayChildren: 0.08 },
            },
          },
    [reduceMotion],
  );

  const fadeUp: Variants = useMemo(
    () =>
      reduceMotion
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : {
            hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.75, ease: EASE_OUT_CUBIC },
            },
          },
    [reduceMotion],
  );

  const cardPop: Variants = useMemo(
    () =>
      reduceMotion
        ? { hidden: { opacity: 1, y: 0, scale: 1 }, visible: { opacity: 1, y: 0, scale: 1 } }
        : {
            hidden: { opacity: 0, y: 50, scale: 0.92, rotateX: -6 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              transition: { type: "spring", stiffness: 120, damping: 18 },
            },
          },
    [reduceMotion],
  );

  /** Subtle scroll fade for partner name cards (Partner-Netzwerk). */
  const partnerNetFade: Variants = useMemo(
    () =>
      reduceMotion
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : {
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE_OUT_CUBIC },
            },
          },
    [reduceMotion],
  );

  const fontSans = fontsReady ? '"Plus Jakarta Sans", system-ui, sans-serif' : "system-ui, sans-serif";
  const fontDisplay = fontsReady ? '"Syne", system-ui, sans-serif' : "system-ui, sans-serif";
  /** Eurostile Extended Black: @font-face (local + optional woff2); sonst Orbitron 900 */
  const fontHeroHeadline = '"Eurostile Extd", "Orbitron", system-ui, sans-serif';

  const HeaderLogoImg = ({ className }: { className?: string }) => (
    <img
      src={LOGO_HEADER_SRC}
      width={320}
      height={96}
      alt="Toni's Autopflege"
      className={className}
      decoding="async"
      fetchPriority="high"
    />
  );

  const HeroLogoImg = ({ className }: { className?: string }) => (
    <img
      src={LOGO_HERO_SRC}
      width={480}
      height={140}
      alt="Toni's Autopflege"
      className={className}
      decoding="async"
      fetchPriority="high"
    />
  );

  return (
    <div
      className="relative min-h-[100dvh] overflow-x-hidden bg-[#030306] text-[#ece8e2] antialiased selection:bg-[#c9a227]/35 selection:text-white"
      style={{ fontFamily: fontSans }}
    >
      <style>{`
        @font-face {
          font-family: 'Eurostile Extd';
          font-style: normal;
          font-weight: 900;
          font-display: swap;
          src:
            local('Eurostile Extended Black'),
            local('Eurostile T OT Condensed Bold'),
            local('Eurostile Bold Extended'),
            local('Eurostile Extended'),
            url('${BASE}assets/fonts/EurostileExtd-Black.woff2') format('woff2');
        }
        @keyframes tonis-orbit {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(12px, -18px) scale(1.05); }
          66% { transform: translate(-10px, 10px) scale(0.98); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes tonis-glow-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.08); }
        }
        @keyframes tonis-border-spin {
          to { transform: rotate(360deg); }
        }
        .tonis-grain {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 1;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .tonis-hero-video {
          filter: contrast(1.05) saturate(1.09) brightness(1.1);
        }
        @media (prefers-reduced-motion: reduce) {
          .tonis-hero-video {
            filter: brightness(1.08);
          }
        }
        .tonis-hero-cinema-mesh {
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.07) 1px, transparent 1px);
          background-size: 9px 9px;
        }
      `}</style>
      <div className="tonis-grain" aria-hidden="true" />
      <div
        className="pointer-events-none fixed -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#c9a227]/12 blur-[120px]"
        style={{ animation: reduceMotion ? undefined : "tonis-orbit 18s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -right-32 bottom-32 h-[380px] w-[380px] rounded-full bg-amber-600/10 blur-[100px]"
        style={{ animation: reduceMotion ? undefined : "tonis-orbit 22s ease-in-out infinite reverse" }}
        aria-hidden="true"
      />

      <a
        href="#kontakt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#c9a227] focus:px-4 focus:py-2 focus:text-black focus:outline-none"
      >
        Zum Kontaktformular springen
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/90 bg-zinc-100/95 shadow-[0_1px_0_rgba(255,255,255,0.8),0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 md:gap-3 md:px-8 md:py-3.5">
          <motion.div whileHover={reduceMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href={BASE}
              onClick={onHomeLogoClick}
              className="group block rounded-sm pb-2.5 outline-none ring-offset-2 ring-offset-zinc-100 transition focus-visible:ring-2 focus-visible:ring-[#c9a227]/80 md:pb-1"
              title="Zur Startseite (Diese Seite)"
            >
              <HeaderLogoImg className="h-[68px] w-auto object-contain object-left md:h-[60px] md:min-h-[60px]" />
              <span className="sr-only">Zur Startseite — Toni&apos;s Autopflege Demo</span>
            </a>
          </motion.div>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-3 md:gap-4">
            <nav
              className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-950 lg:flex"
              aria-label="Hauptmenü"
            >
              {NAV_LINKS.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToId(id)}
                  className="group relative text-zinc-950 transition hover:text-black"
                >
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#b8860b] to-[#c9a227] transition-all duration-300 group-hover:w-full" />
                  {label}
                </button>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <motion.button
                type="button"
                onClick={() => navigateToSection("kontakt")}
                whileHover={reduceMotion ? {} : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-gradient-to-r from-[#c9a227] via-[#e8cf72] to-[#c9a227] px-2.5 py-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-black shadow-[0_0_28px_rgba(201,162,39,0.35)] sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-wider"
              >
                Anfrage
              </motion.button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300/90 bg-white text-zinc-900 shadow-sm outline-none transition hover:border-[#c9a227]/50 hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-[#c9a227]/70"
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-nav-panel"
                aria-label={mobileNavOpen ? "Menü schließen" : "Menü öffnen"}
                onClick={() => setMobileNavOpen((o) => !o)}
              >
                {mobileNavOpen ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      d="M6 6l12 12M18 6L6 18"
                    />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      d="M5 7h14M5 12h14M5 17h14"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-24 z-[55] flex flex-col lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
        >
          <button
            type="button"
            className="min-h-0 flex-1 bg-black/45 backdrop-blur-[2px]"
            aria-label="Menü schließen"
            onClick={() => setMobileNavOpen(false)}
          />
          <nav
            id="mobile-nav-panel"
            role="navigation"
            aria-label="Hauptmenü mobil"
            className="relative z-10 mt-auto flex max-h-[min(82dvh,calc(100dvh-6rem))] w-full flex-col overflow-hidden rounded-t-2xl border border-b-0 border-zinc-200 bg-zinc-50 shadow-[0_-12px_48px_rgba(0,0,0,0.2)]"
          >
            <ul className="max-h-[min(70dvh,520px)] space-y-0.5 overflow-y-auto overscroll-contain px-3 py-4">
              {NAV_LINKS.map(([id, label]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => navigateToSection(id)}
                    className="w-full rounded-xl border border-transparent px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-[0.14em] text-zinc-900 transition active:bg-zinc-200/90"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <p className="border-t border-zinc-200 px-4 py-2.5 text-center text-[11px] text-zinc-500">
              Tippen Sie außerhalb oder ESC zum Schließen
            </p>
          </nav>
        </div>
      )}

      <section
        id="hero"
        ref={heroRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#030306] pt-24 lg:pt-20"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#030306]" aria-hidden="true" />

        <motion.div
          className="pointer-events-none absolute left-0 right-0 top-24 z-0 flex justify-center px-2 sm:px-4 md:px-6 lg:top-[4.75rem] lg:px-10"
          style={reduceMotion ? undefined : { y: videoY }}
        >
          <div className="relative w-full max-w-[min(100%,1680px)] overflow-hidden rounded-xl border border-white/[0.07] bg-black shadow-[0_28px_90px_rgba(0,0,0,0.65)] ring-1 ring-black/40 sm:rounded-2xl">
            <div className="relative mx-auto aspect-[21/9] w-full min-h-[220px] max-h-[min(64vh,820px)] sm:min-h-[260px] sm:max-h-[min(68vh,880px)] md:max-h-[min(72vh,920px)]">
              <video
                className="tonis-hero-video absolute inset-0 h-full w-full object-cover object-center"
                autoPlay
                muted
                playsInline
                loop
                poster={HERO_POSTER}
                preload="auto"
                aria-hidden="true"
              >
                <source src={HERO_VIDEO_PRIMARY} type="video/mp4" />
              </video>
              <div
                className="tonis-hero-cinema-mesh pointer-events-none absolute inset-0 z-[2] opacity-[0.38] mix-blend-overlay"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-black/18 via-transparent to-black/32"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[4] shadow-[inset_0_0_80px_rgba(0,0,0,0.38),inset_0_0_28px_rgba(0,0,0,0.22)]"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030306]/85 via-[#030306]/45 to-[#030306]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_55%_at_50%_18%,rgba(201,162,39,0.12),transparent_62%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-24 pt-6 text-center md:px-10 md:pt-10">
          <motion.div
            className="mb-6 md:mb-10"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT_CUBIC }}
          >
            <a
              href={BASE}
              onClick={onHomeLogoClick}
              className="group relative inline-block"
              title="Zur Startseite (Diese Seite)"
            >
              <motion.div
                whileHover={reduceMotion ? {} : { scale: 1.03 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <HeroLogoImg className="mx-auto h-auto w-full max-w-[200px] object-contain drop-shadow-[0_8px_48px_rgba(0,0,0,0.6)] transition duration-500 group-hover:drop-shadow-[0_12px_56px_rgba(201,162,39,0.35)] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[380px]" />
              </motion.div>
              <span className="mt-3 block text-[11px] font-medium uppercase tracking-[0.35em] text-[#c9a227]/70 opacity-0 transition group-hover:opacity-100 md:text-xs">
                Zurück zum Seitenanfang
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={containerSlow}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-[#d4b84a] md:text-sm"
            >
              Premium Autopflege · Göppingen
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-balance text-4xl font-black leading-[1.08] tracking-[0.02em] text-white md:text-6xl lg:text-7xl"
              style={{
                fontFamily: fontHeroHeadline,
                fontWeight: 900,
                textShadow:
                  "0 2px 3px rgba(0,0,0,0.85), 0 12px 48px rgba(0,0,0,0.75), 0 0 1px rgba(0,0,0,1)",
              }}
            >
              Glanz, der bleibt.
              <span className="mt-2 block text-[#f4e4a8] md:text-[#fcefb7]" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 0 40px rgba(201,162,39,0.45)" }}>
                Perfektion im Detail.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 md:text-lg"
            >
              Lackaufbereitung, Innenreinigung, Politur und Keramikversiegelung — mit professionellen Produkten und
              ruhiger Handarbeit.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <motion.button
                type="button"
                onClick={() => scrollToId("kontakt")}
                whileHover={reduceMotion ? {} : { scale: 1.04, boxShadow: "0 0 40px rgba(201,162,39,0.45)" }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#c9a227] via-[#f0d78c] to-[#c9a227] px-10 py-3.5 text-sm font-bold text-black shadow-[0_0_32px_rgba(201,162,39,0.25)]"
              >
                <span className="relative">Termin anfragen</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => scrollToId("leistungen")}
                whileHover={reduceMotion ? {} : { scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border border-white/15 bg-white/[0.04] px-9 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#c9a227]/40 hover:text-[#f5e6b8]"
              >
                Leistungen
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#c9a227]/50"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-hidden="true"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Scroll</span>
          <motion.span
            className="flex h-10 w-5 justify-center rounded-full border border-[#c9a227]/30 pt-2"
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" />
          </motion.span>
        </motion.div>
      </section>

      <section id="leistungen" className="scroll-mt-24 border-t border-white/[0.06] bg-[#020203] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-14 text-center md:mb-16"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Premium</p>
            <h2
              className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Unsere Leistungen – Premium Fahrzeugaufbereitung in Göppingen
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Bei Toni&apos;s Autopflege erhalten Sie professionelle Fahrzeugpflege auf höchstem Niveau – für maximalen
              Glanz, Werterhalt und einen perfekten ersten Eindruck. Wir kombinieren hochwertige Pflegeprodukte mit
              modernsten Techniken und der Liebe zum Detail.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
            }}
          >
            {LEISTUNGEN_CATEGORIES.map((cat) => {
              const Icon = cat.Icon;
              return (
                <motion.article
                  key={cat.id}
                  variants={cardPop}
                  whileHover={reduceMotion ? {} : { y: -8 }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[#050508] p-6 shadow-[inset_0_1px_0_rgba(201,162,39,0.1)] transition-[background-color,border-color,box-shadow] duration-300 hover:bg-[#0c0c10] hover:shadow-[0_24px_56px_rgba(0,0,0,0.55)] md:p-7 ${
                    cat.highlight
                      ? "border-[#c9a227]/55 ring-1 ring-[#c9a227]/25 hover:border-[#e8c766]/80 hover:ring-[#c9a227]/40"
                      : "border-[#c9a227]/40 hover:border-[#d4af37]/70"
                  }`}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c9a227]/10 opacity-80 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#c9a227]/12 text-[#f0d78c] shadow-[0_0_24px_rgba(201,162,39,0.15)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="min-w-0 text-left">
                      <h3
                        className="text-lg font-bold leading-snug text-white md:text-xl"
                        style={{ fontFamily: fontDisplay }}
                      >
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]/90">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="relative mb-6 text-sm leading-relaxed text-zinc-400">{cat.description}</p>
                  <p className="relative mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#c9a227]/75">
                    {cat.listLabel}
                  </p>
                  <ul className="relative mt-auto space-y-3">
                    {cat.items.map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-snug text-zinc-200">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a227]"
                          strokeWidth={2.75}
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
            className="mt-16 border-t border-white/[0.06] pt-14 text-center md:mt-20 md:pt-16"
            aria-labelledby="reparatur-spezial-heading"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/75">Spezial</p>
            <h3
              id="reparatur-spezial-heading"
              className="text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-4xl"
              style={{ fontFamily: fontDisplay }}
            >
              Reparatur &amp; Spezial-Services
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
              Punktuelle Reparaturen und Speziallösungen — präzise, wertbewusst und ohne unnötige Komplettarbeiten.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-7 md:mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
            }}
          >
            {REPARATUR_SPEZIAL_SERVICES.map((svc) => {
              const Icon = svc.Icon;
              return (
                <motion.article
                  key={svc.id}
                  variants={cardPop}
                  whileHover={reduceMotion ? {} : { y: -8 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#c9a227]/40 bg-[#050508] p-6 shadow-[inset_0_1px_0_rgba(201,162,39,0.1)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#d4af37]/70 hover:bg-[#0c0c10] hover:shadow-[0_0_36px_rgba(201,162,39,0.18),0_24px_56px_rgba(0,0,0,0.55)] md:p-7"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c9a227]/10 opacity-80 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#c9a227]/12 text-[#f0d78c] shadow-[0_0_24px_rgba(201,162,39,0.15)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h4
                      className="min-w-0 text-left text-lg font-bold leading-snug text-white md:text-xl"
                      style={{ fontFamily: fontDisplay }}
                    >
                      {svc.title}
                    </h4>
                  </div>
                  <p className="relative text-sm leading-relaxed text-zinc-400">{svc.text}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section
        id="premium-partner-produkte"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#06060b] py-24 md:py-32"
        aria-labelledby="premium-partner-heading"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-14 text-center md:mb-16"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">
              Unsere Premium Partner &amp; Produkte
            </p>
            <h2
              id="premium-partner-heading"
              className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Qualität ohne Kompromisse
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Wir arbeiten ausschließlich mit den weltweit führenden Herstellern der Fahrzeugpflege.
            </p>
          </motion.div>

          <motion.div
            ref={premiumBrandsGridRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
            }}
          >
            {PREMIUM_BRANDS.map((brand) => {
              const logoSrc = asset("images/brands", brand.logoWebp);
              const isTouchActive = premiumCardTap === brand.slug;
              const togglePremiumTap = () => {
                if (typeof window === "undefined") return;
                if (!window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
                setPremiumCardTap((prev) => (prev === brand.slug ? null : brand.slug));
              };
              return (
                <motion.article
                  key={brand.slug}
                  variants={cardPop}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isTouchActive}
                  data-active={isTouchActive ? "true" : undefined}
                  onClick={togglePremiumTap}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      togglePremiumTap();
                    }
                  }}
                  className="group flex cursor-pointer flex-col rounded-2xl border border-[#c9a227]/30 bg-[#050508] p-4 shadow-[inset_0_1px_0_rgba(201,162,39,0.08)] outline-none transition-[border-color,box-shadow,background-color,transform] duration-300 hover:border-[#d4af37]/65 hover:bg-[#0c0c10] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_24px_rgba(201,162,39,0.12)] focus-visible:ring-2 focus-visible:ring-[#c9a227]/50 data-[active=true]:border-[#d4af37]/65 data-[active=true]:bg-[#0c0c10] data-[active=true]:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_24px_rgba(201,162,39,0.12)] active:scale-[0.99] sm:p-6 md:p-7"
                >
                  <div className="relative flex aspect-square w-full items-center justify-center rounded-2xl border-[3px] border-black bg-black px-3 py-5 shadow-[inset_0_0_0_1px_rgba(201,162,39,0.12)] transition duration-300 group-hover:border-[#c9a227]/40 group-hover:shadow-[inset_0_0_40px_rgba(201,162,39,0.06)] group-data-[active=true]:border-[#c9a227]/40 group-data-[active=true]:shadow-[inset_0_0_40px_rgba(201,162,39,0.06)] md:aspect-auto md:min-h-[148px] md:rounded-xl md:border-2 md:border-white/[0.1] md:bg-black/60 md:px-6 md:py-9">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={brand.brandName}
                        width={400}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="max-h-[85%] max-w-[90%] object-contain grayscale transition-[filter,transform,box-shadow] duration-300 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:drop-shadow-[0_0_20px_rgba(201,162,39,0.55)] group-data-[active=true]:scale-[1.03] group-data-[active=true]:grayscale-0 group-data-[active=true]:drop-shadow-[0_0_20px_rgba(201,162,39,0.55)] md:max-h-28 md:max-w-[92%] lg:max-h-32"
                      />
                    ) : (
                      <span
                        className="text-center text-2xl font-bold tracking-tight text-zinc-500 transition group-hover:text-[#c9a227]/80 group-data-[active=true]:text-[#c9a227]/80 sm:text-3xl md:text-lg"
                        style={{ fontFamily: fontDisplay }}
                      >
                        {brand.brandName}
                      </span>
                    )}
                  </div>
                  <h3
                    className="mt-5 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37]"
                    style={{ fontFamily: fontDisplay }}
                  >
                    {brand.brandName}
                  </h3>
                  <p className="mt-3 flex-1 text-pretty text-left text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                    {brand.text}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section
        id="partner-netzwerk"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#04040a] py-20 md:py-28"
        aria-labelledby="partner-netzwerk-heading"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
            className="mb-12 text-center md:mb-14"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/65">
              Unser Partner-Netzwerk
            </p>
            <h2
              id="partner-netzwerk-heading"
              className="text-2xl font-bold leading-snug text-white md:text-3xl lg:text-4xl"
              style={{ fontFamily: fontDisplay }}
            >
              Starke Partner für Ihr Fahrzeug
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500 md:text-base">
              Gemeinsam mit unseren Partnern bieten wir Ihnen einen Rundum-Service auf höchstem Niveau.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06, delayChildren: 0.04 } },
            }}
          >
            {PARTNER_NETZWERK.map((name) => (
              <motion.article
                key={name}
                variants={partnerNetFade}
                className="flex min-h-[4.5rem] items-center justify-center rounded-xl border border-[#c9a227]/20 bg-black/25 px-2 py-3 text-center shadow-[inset_0_1px_0_rgba(201,162,39,0.04)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#c9a227]/32 hover:bg-black/40 md:min-h-[5rem] md:px-3 md:py-4"
              >
                <p
                  className="text-[11px] font-semibold leading-snug tracking-tight text-zinc-400 sm:text-xs md:text-[13px]"
                  style={{ fontFamily: fontDisplay }}
                >
                  {name}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="warum-tonis"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#030306] py-24 md:py-32"
        aria-labelledby="warum-tonis-heading"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-10 text-center md:mb-12"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Vertrauen</p>
            <h2
              id="warum-tonis-heading"
              className="text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Warum Toni&apos;s Autopflege?
            </h2>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
            className="rounded-3xl border-2 border-[#c9a227]/35 bg-[#050508]/90 p-5 shadow-[inset_0_1px_0_rgba(201,162,39,0.14),0_24px_80px_rgba(0,0,0,0.45)] md:p-8"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
              {WARUM_TONIS_ITEMS.map((label, i) => (
                <div
                  key={label}
                  className={`flex items-start gap-3 rounded-2xl border border-[#c9a227]/25 bg-black/40 p-4 transition duration-300 hover:border-[#d4af37]/55 hover:bg-[#0c0c10] md:p-5 ${
                    i < 4 ? "lg:col-span-3" : "lg:col-span-4"
                  }`}
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a227]"
                    strokeWidth={2.75}
                    aria-hidden
                  />
                  <p className="text-left text-sm font-semibold leading-snug text-zinc-100 md:text-base">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="innenraum" className="scroll-mt-24 border-t border-white/[0.06] bg-[#020203] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-14 text-center md:mb-16"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Innenraum</p>
            <h2
              className="text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Innenraumaufbereitung
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
            }}
          >
            {INNENRAUM_CATEGORIES.map((cat) => {
              const Icon = cat.Icon;
              return (
                <motion.article
                  key={cat.id}
                  variants={cardPop}
                  whileHover={reduceMotion ? {} : { y: -8 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#c9a227]/40 bg-[#050508] p-6 shadow-[inset_0_1px_0_rgba(201,162,39,0.1)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#d4af37]/70 hover:bg-[#0c0c10] hover:shadow-[0_24px_56px_rgba(0,0,0,0.55)] md:p-7"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c9a227]/10 opacity-80 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#c9a227]/12 text-[#f0d78c] shadow-[0_0_24px_rgba(201,162,39,0.15)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3
                      className="min-w-0 text-left text-lg font-bold leading-snug text-white md:text-xl"
                      style={{ fontFamily: fontDisplay }}
                    >
                      {cat.title}
                    </h3>
                  </div>
                  <p className="relative text-sm leading-relaxed text-zinc-400">{cat.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="premium-services" className="scroll-mt-24 border-t border-white/[0.06] bg-[#030306] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-12 text-center md:mb-14"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Spezial</p>
            <h2
              className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Premium Services
            </h2>
          </motion.div>

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-5">
            {PREMIUM_SERVICES.map((svc) => {
              const Icon = svc.Icon;
              return (
              <motion.article
                key={svc.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: EASE_OUT_CUBIC }}
                className="group relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#c9a227]/35 bg-[#050508] p-6 shadow-[inset_0_1px_0_rgba(201,162,39,0.1)] transition duration-300 hover:border-[#d4af37]/65 hover:bg-[#0c0c10] md:p-7"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c9a227]/10 opacity-80 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="relative mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#c9a227]/12 text-[#f0d78c] shadow-[0_0_24px_rgba(201,162,39,0.15)]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3
                    className="min-w-0 text-left text-lg font-bold text-white md:text-xl"
                    style={{ fontFamily: fontDisplay }}
                  >
                    {svc.title}
                  </h3>
                </div>
                <p className="relative mt-0 flex-1 text-sm leading-relaxed text-zinc-400">{svc.text}</p>
                {svc.vorteile ? (
                  <p className="mt-4 border-t border-white/[0.06] pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]/85">
                    Vorteile:{" "}
                    <span className="font-medium normal-case tracking-normal text-zinc-300">{svc.vorteile}</span>
                  </p>
                ) : null}
              </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="produkte" className="scroll-mt-24 border-t border-white/[0.06] bg-[#06060b] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Chemie & Systeme</p>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl" style={{ fontFamily: fontDisplay }}>
              Unsere Premium Produkte
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500 md:text-base">
              Marken, die in Deutschland Vertrauen schaffen — wir arbeiten bewusst mit Profi-Linien statt No-Name.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUKTE.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-[#c9a227]/20 bg-black/50 px-6 py-6 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] transition-[transform,background-color,border-color,box-shadow] duration-300 max-md:border-[#c9a227]/38 max-md:bg-[#0a0a0e] max-md:shadow-[inset_0_1px_0_rgba(201,162,39,0.12),0_0_28px_rgba(201,162,39,0.06)] hover:border-[#c9a227]/45 hover:bg-[#08080c] hover:shadow-[0_0_32px_rgba(201,162,39,0.1)] active:scale-[0.99] active:border-[#c9a227]/55"
              >
                <p className="text-lg font-bold tracking-tight text-[#f5e6b8]" style={{ fontFamily: fontDisplay }}>
                  {p.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="impressionen" className="scroll-mt-24 border-t border-white/[0.06] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-10 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Portfolio</p>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl" style={{ fontFamily: fontDisplay }}>
              Impressionen
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500 md:text-base">
              Fotos und Videos aus der Aufbereitung — optimiert für schnelles Laden.
            </p>
          </motion.div>

          <div
            className="mx-auto mb-10 flex max-w-md justify-center gap-2 rounded-2xl border border-white/[0.08] bg-black/40 p-1.5"
            role="tablist"
            aria-label="Impressionen Medien"
          >
            <button
              type="button"
              role="tab"
              aria-selected={impressionTab === "fotos"}
              aria-controls="impressionen-panel-fotos"
              id="impressionen-tab-fotos"
              onClick={() => setImpressionTab("fotos")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition ${
                impressionTab === "fotos"
                  ? "bg-gradient-to-r from-[#c9a227] to-[#a67c00] text-black shadow-[0_0_24px_rgba(201,162,39,0.25)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Fotos
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={impressionTab === "videos"}
              aria-controls="impressionen-panel-videos"
              id="impressionen-tab-videos"
              onClick={() => setImpressionTab("videos")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition ${
                impressionTab === "videos"
                  ? "bg-gradient-to-r from-[#c9a227] to-[#a67c00] text-black shadow-[0_0_24px_rgba(201,162,39,0.25)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Videos
            </button>
          </div>

          {impressionTab === "fotos" && (
            <div
              id="impressionen-panel-fotos"
              role="tabpanel"
              aria-labelledby="impressionen-tab-fotos"
              className="columns-1 gap-4 sm:columns-2 lg:columns-3"
            >
              {GALLERY.map((src, i) => (
                <figure key={src} className="mb-4 break-inside-avoid">
                  <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/40 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                    <img
                      src={src}
                      alt={`Referenz ${i + 1}`}
                      width={900}
                      height={1200}
                      className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      loading={i < 8 ? "eager" : "lazy"}
                      decoding="async"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <figcaption className="border-t border-white/[0.06] bg-black/50 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-[#d4b84a]">
                      Referenz {i + 1}
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          )}

          {impressionTab === "videos" && (
            <div
              id="impressionen-panel-videos"
              role="tabpanel"
              aria-labelledby="impressionen-tab-videos"
              className="grid gap-10 md:grid-cols-2"
            >
              {WORK_VIDEOS.map((v) => (
                <div
                  key={v.src}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/60 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                >
                  <div className="aspect-video w-full bg-black">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      poster={v.poster}
                      aria-label={v.title}
                    >
                      <source src={v.src} type="video/mp4" />
                    </video>
                  </div>
                  <div className="border-t border-white/[0.06] p-5">
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: fontDisplay }}>
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{v.text}</p>
                  </div>
                </div>
              ))}
              {WORK_VIDEOS.length === 0 && (
                <p className="text-sm text-zinc-500 md:col-span-2">
                  Noch keine Clips — lege MP4/MOV in{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">public/VIDEO 1/</code> und
                  führe lokal{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">npm run videos:work</code>{" "}
                  aus (komprimiert mit hoher Qualität, ohne Byte-Duplikate).
                </p>
              )}
              {WORK_VIDEOS.length > 0 && (
                <p className="text-sm text-zinc-500 md:col-span-2">
                  Weitere Clips: Dateien in{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">public/VIDEO 1/</code>, dann{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">npm run videos:work</code>.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <section id="ueber-uns" className="scroll-mt-24 border-t border-white/[0.06] bg-[#06060b] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE_OUT_CUBIC }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Philosophie</p>
            <h2 className="mb-8 text-4xl font-extrabold text-white md:text-5xl" style={{ fontFamily: fontDisplay }}>
              Über uns
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-zinc-300 md:text-xl">
              <strong className="font-semibold text-white">Toni&apos;s Autopflege</strong> lebt von Ruhe, Konzentration
              und Respekt vor dem Material: Jede Kante, jede Naht und jeder Lackfilm wird so behandelt, als bliebe das
              Fahrzeug für Jahre in Ihrer Hand.
            </p>
            <p className="mt-6 text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
              Wir kombinieren klassisches Handwerk mit modernen Produktsystemen — ohne Schnickschnack, ohne
              Druckverkauf. Wenn wir polieren, versiegeln oder den Innenraum hygienisch aufbereiten, geht es um messbare
              Ergebnisse und ein Erlebnis, das man sieht und spürt.
            </p>
            <p className="mt-6 text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
              Ihr Zeitbudget und Ihre Erwartungen sind die Leitplanken: Wir erklären transparent, was sinnvoll ist, was
              wir empfehlen — und was wir bewusst nicht versprechen.
            </p>
            <motion.div
              className="mx-auto mt-10 h-px max-w-xs bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_OUT_CUBIC }}
            />
          </motion.div>
        </div>
      </section>

      <section
        id="termin-cta"
        className="scroll-mt-24 border-t border-[#c9a227]/25 bg-gradient-to-b from-[#0a0a0f] via-[#050508] to-[#030306] py-20 md:py-28"
        aria-label="Termin per WhatsApp"
      >
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
            className="rounded-3xl border border-[#c9a227]/30 bg-black/35 px-6 py-10 shadow-[0_0_60px_rgba(201,162,39,0.08)] backdrop-blur-sm md:px-12 md:py-12"
          >
            <p className="text-pretty text-base font-medium leading-relaxed text-zinc-200 md:text-lg">
              Ihr Fahrzeug verdient die beste Pflege. Ob Innenraumreinigung, Lackaufbereitung oder Keramikversiegelung —
              wir bringen Ihr Fahrzeug wieder auf Hochglanz.
            </p>
            <motion.a
              href={TONI_WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? {} : { scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c9a227] via-[#f0d78c] to-[#c9a227] px-10 py-3.5 text-sm font-bold text-black shadow-[0_0_36px_rgba(201,162,39,0.35)] transition hover:shadow-[0_0_48px_rgba(201,162,39,0.5)]"
            >
              Jetzt Termin sichern
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section
        id="kundenstimmen"
        className="scroll-mt-24 border-t border-white/[0.06] bg-[#050508] py-24 md:py-32"
        aria-labelledby="kundenstimmen-heading"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/75">Google Rezensionen</p>
            <h2
              id="kundenstimmen-heading"
              className="text-4xl font-extrabold text-white md:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Was unsere Kunden sagen
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-zinc-500 md:text-base">
              Echte Stimmen von Google — Qualität und Zuverlässigkeit, die man spürt.
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {KUNDEN_TESTIMONIALS.map((t, i) => (
              <motion.li
                key={t.name}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ duration: 0.5, ease: EASE_OUT_CUBIC, delay: reduceMotion ? 0 : i * 0.06 }}
                className="relative list-none"
              >
                <article className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#08080f] p-5 pt-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(201,162,39,0.2),0_20px_50px_rgba(0,0,0,0.45)]">
                  <div
                    className="pointer-events-none absolute right-3 top-3 opacity-80 transition-opacity group-hover:opacity-100"
                    title="Google Rezension"
                  >
                    <SvgGoogleGCorner className="h-6 w-6 drop-shadow-sm" />
                  </div>
                  <h3 className="pr-10 text-base font-bold text-white" style={{ fontFamily: fontDisplay }}>
                    {t.name}
                  </h3>
                  <div className="mt-2 flex gap-0.5" aria-label="5 von 5 Sternen">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className="h-4 w-4 shrink-0 fill-[#c9a227] text-[#c9a227]"
                        strokeWidth={0}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-zinc-400">
                    <span className="text-zinc-600">&ldquo;</span>
                    {t.text}
                    <span className="text-zinc-600">&rdquo;</span>
                  </blockquote>
                </article>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT_CUBIC, delay: reduceMotion ? 0 : 0.12 }}
            className="mt-12 flex justify-center"
          >
            <motion.a
              href={GOOGLE_MAPS_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9a227]/35 bg-black/50 px-6 py-3.5 text-center text-sm font-semibold text-[#f0d78c] shadow-[0_0_24px_rgba(201,162,39,0.12)] transition hover:border-[#c9a227]/55 hover:bg-[#c9a227]/10 hover:shadow-[0_0_36px_rgba(201,162,39,0.22)] md:px-8 md:text-base"
            >
              <SvgGoogleGCorner className="h-5 w-5 shrink-0" aria-hidden />
              Alle 55 Rezensionen auf Google lesen
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section id="kontakt" className="scroll-mt-24 border-t border-white/[0.06] bg-[#030306] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
          >
            <h2
              className="mb-2 text-center text-4xl font-extrabold text-white md:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Kontakt
            </h2>
            <p className="mb-12 text-center text-zinc-500">
              Unverbindliche Anfrage — wir melden uns mit Terminvorschlägen. Alle Angaben können vor dem Livegang
              finalisiert werden.
            </p>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#c9a227]/90">Standort</h3>
                  <div className="aspect-[4/3] w-full max-h-[320px] overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-900/50 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                    <iframe
                      title="Karte — Toni's Autopflege, Zell unter Aichelberg"
                      className="h-full min-h-[240px] w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=Boschstra%C3%9Fe%2023%2C%2073119%20Zell%20unter%20Aichelberg&z=15&hl=de&output=embed"
                    />
                  </div>
                  <p className="mt-3 text-xs text-zinc-500">
                    Boschstraße 23/1, 73119 Zell unter Aichelberg — Standort der Autopflege.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#c9a227]/90">
                    Öffnungszeiten
                  </h3>
                  <ul className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.08] bg-black/40">
                    {OEFFNUNGSZEITEN.map((row) => (
                      <li key={row.tag} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                        <span className="text-zinc-400">{row.tag}</span>
                        <span className="font-medium text-white">{row.zeit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#c9a227]/25 bg-gradient-to-br from-[#c9a227]/10 to-black/60 p-6">
                  <p className="text-sm font-semibold text-[#f5e6b8]">Direkt per WhatsApp</p>
                  <p className="mt-2 text-sm text-zinc-400">Kurze Fragen, Fotos vom Fahrzeug oder Terminwunsch — wir antworten zeitnah.</p>
                  <a
                    href={TONI_WA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#20bd5a]"
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp öffnen
                  </a>
                </div>
              </div>

              <motion.form
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/30 p-8 shadow-[0_0_80px_rgba(201,162,39,0.06)] backdrop-blur-xl"
                initial={reduceMotion ? false : { opacity: 0, rotateX: 8 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                style={{ transformPerspective: 1200 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const name = String(fd.get("name") ?? "").trim();
                  const email = String(fd.get("email") ?? "").trim();
                  const msg = String(fd.get("message") ?? "").trim();
                  const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${msg}`);
                  window.location.href = `mailto:kontakt@tonis-autopflege.de?subject=${encodeURIComponent("Anfrage Autopflege")}&body=${body}`;
                }}
              >
                {!reduceMotion && (
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-50"
                    style={{
                      background: "conic-gradient(from 0deg, transparent, rgba(201,162,39,0.35), transparent 40%)",
                      animation: "tonis-border-spin 8s linear infinite",
                    }}
                  />
                )}
                <div className="relative space-y-5">
                  <h3 className="text-center text-sm font-bold uppercase tracking-wider text-zinc-400">E-Mail-Anfrage</h3>
                  <div>
                    <label htmlFor="tonis-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Name
                    </label>
                    <input
                      id="tonis-name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#030306]/80 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]/50 focus:ring-2 focus:ring-[#c9a227]/20"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="tonis-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      E-Mail
                    </label>
                    <input
                      id="tonis-email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#030306]/80 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]/50 focus:ring-2 focus:ring-[#c9a227]/20"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="tonis-msg" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Nachricht / Fahrzeug
                    </label>
                    <textarea
                      id="tonis-msg"
                      name="message"
                      required
                      rows={4}
                      className="w-full resize-y rounded-xl border border-white/10 bg-[#030306]/80 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]/50 focus:ring-2 focus:ring-[#c9a227]/20"
                      placeholder="Modell, Zustand, gewünschte Leistungen …"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={reduceMotion ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#c9a227] to-[#a67c00] py-3.5 text-sm font-bold text-black"
                  >
                    Anfrage senden
                  </motion.button>
                  <p className="text-center text-xs text-zinc-600">Öffnet Ihr E-Mail-Programm.</p>
                </div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="partner" className="scroll-mt-24 border-t border-white/[0.06] bg-[#06060b] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Netzwerk</p>
            <h2 className="text-2xl font-extrabold text-white md:text-3xl" style={{ fontFamily: fontDisplay }}>
              Partner
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-500">
              Verlässliche Zusammenarbeit rund ums Fahrzeug — Platzhalter bis finale Logos und Verlinkungen stehen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {PARTNER.map((p) => (
              <div
                key={p.name}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-5 text-center transition hover:border-[#c9a227]/30"
              >
                <p className="text-sm font-bold text-white">{p.name}</p>
                <p className="mt-2 text-[11px] leading-snug text-zinc-500">{p.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] bg-[#020208] py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/70">Impressum &amp; Anfahrt</p>
            <h2 className="text-xl font-bold text-white md:text-2xl" style={{ fontFamily: fontDisplay }}>
              Toni&apos;s Autopflege
            </h2>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, ease: EASE_OUT_CUBIC, delay: reduceMotion ? 0 : 0.05 }}
            className="space-y-5 rounded-2xl border border-[#c9a227]/20 bg-black/35 px-4 py-8 shadow-[inset_0_1px_0_rgba(201,162,39,0.06)] md:px-8"
          >
            <div className="flex gap-4">
              <LucideInGold Icon={Building2} />
              <div className="min-w-0 text-left">
                <p className="text-base font-bold text-white" style={{ fontFamily: fontDisplay }}>
                  {FIRMENFOOTER.firma}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{FIRMENFOOTER.inhaber}</p>
                <p className="text-sm font-medium text-[#c9a227]/90">{FIRMENFOOTER.branche}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <LucideInGold Icon={MapPin} />
              <div className="min-w-0 text-left text-sm leading-relaxed text-zinc-300">
                <p className="font-medium text-zinc-200">{FIRMENFOOTER.strasse}</p>
                <p>{FIRMENFOOTER.ort}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <LucideInGold Icon={Phone} />
              <div className="min-w-0 text-left">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Telefon</p>
                <a
                  href={FIRMENFOOTER.telefonHref}
                  className="text-sm font-semibold text-[#f0d78c] underline-offset-2 hover:text-white hover:underline"
                >
                  {FIRMENFOOTER.telefonLabel}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <LucideInGold Icon={Mail} />
              <div className="min-w-0 text-left">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">E-Mail</p>
                <a
                  href={`mailto:${FIRMENFOOTER.email}`}
                  className="break-all text-sm font-semibold text-[#f0d78c] underline-offset-2 hover:text-white hover:underline"
                >
                  {FIRMENFOOTER.email}
                </a>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-6">
              <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Social Media
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                <a
                  href={FIRMENFOOTER.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/s flex flex-col items-center gap-2 text-center transition hover:opacity-95"
                >
                  <GoldIconFrame className="transition-transform duration-200 group-hover/s:-translate-y-0.5">
                    <SvgFacebookGold className="h-5 w-5" />
                  </GoldIconFrame>
                  <span className="max-w-[10rem] text-xs font-medium text-zinc-400">Facebook · {FIRMENFOOTER.facebook.label}</span>
                </a>
                <a
                  href={FIRMENFOOTER.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/s flex flex-col items-center gap-2 text-center transition hover:opacity-95"
                >
                  <GoldIconFrame className="transition-transform duration-200 group-hover/s:-translate-y-0.5">
                    <SvgInstagramGold className="h-5 w-5" />
                  </GoldIconFrame>
                  <span className="max-w-[10rem] text-xs font-medium text-zinc-400">Instagram · {FIRMENFOOTER.instagram.label}</span>
                </a>
                <a
                  href={FIRMENFOOTER.tiktok.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/s flex flex-col items-center gap-2 text-center transition hover:opacity-95"
                >
                  <div className="transition-transform duration-200 group-hover/s:-translate-y-0.5">
                    <LucideInGold Icon={Music2} />
                  </div>
                  <span className="max-w-[10rem] text-xs font-medium text-zinc-400">TikTok · {FIRMENFOOTER.tiktok.label}</span>
                </a>
              </div>
            </div>
          </motion.div>

          <p className="mt-12 text-center text-sm text-zinc-600">
            Demo-Entwicklung:{" "}
            <a
              href={AGR_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#c9a227]/90 underline-offset-4 hover:text-[#f0d78c] hover:underline"
            >
              AGR Multimedia
            </a>
          </p>
        </div>
      </footer>

      <motion.a
        href={TONI_WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={reduceMotion ? {} : { scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-transparent text-[#25D366] shadow-[0_4px_18px_rgba(0,0,0,0.45)] transition [bottom:calc(1rem+env(safe-area-inset-bottom,0px))] [right:calc(1rem+env(safe-area-inset-right,0px))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] md:[bottom:calc(1.5rem+env(safe-area-inset-bottom,0px))] md:[right:calc(1.5rem+env(safe-area-inset-right,0px))]"
        aria-label="WhatsApp"
      >
        <span className="sr-only">WhatsApp</span>
        <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor" className="block drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
