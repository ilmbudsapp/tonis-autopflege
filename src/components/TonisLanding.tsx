import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { WHATSAPP_E164_DIGITS } from "@/lib/contact";
import { GALLERY_WEBP_FILENAMES } from "@/generated/galleryWebp";

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

const LEISTUNGEN = [
  {
    title: "Innenreinigung & Hygiene",
    text: "Tiefenreinigung von Cockpit, Sitzen, Teppichen und Verkleidungen — inklusive Geruchsbeseitigung und schonender Materialpflege.",
  },
  {
    title: "Außenwäsche & Vorbehandlung",
    text: "pH-neutrale Reinigung, Felgenreinigung und sorgfältige Vorbehandlung von Insekten und Umweltverschmutzung vor der Lackpflege.",
  },
  {
    title: "Lackaufbereitung & Politur",
    text: "Entfernung von Washline, Feinkratzern und Oxidation — mehrschichtige Politur für wiederkehrenden Tiefenglan.",
  },
  {
    title: "Keramikversiegelung",
    text: "Langanhaltender Schutz mit hydrophober Oberfläche: weniger Verschmutzung, bessere Perleffekt und UV-Stabilität.",
  },
  {
    title: "Detailing & Feinarbeit",
    text: "Einstiegsleisten, Tankdeckel, Motorraum-Optikpflege und Finisharbeiten für ein durchgängig hochwertiges Erscheinungsbild.",
  },
  {
    title: "Tierhaarentfernung & Spezial",
    text: "Gezielte Entfernung von Tierhaaren sowie Aufbereitung von Cabrio-Verdeck und Kunststoffoberflächen auf Wunsch.",
  },
] as const;

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

const WORK_VIDEOS = [
  {
    src: HERO_VIDEO_PRIMARY,
    poster: HERO_POSTER,
    title: "Arbeitsausschnitt",
    text: "Politur, Finish und Lichtspiel am Lack — Platzhalter bis weitere Clips ergänzt werden.",
  },
] as const;

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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 md:px-8">
          <motion.div whileHover={reduceMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href={BASE}
              onClick={onHomeLogoClick}
              className="group block rounded-sm outline-none ring-offset-2 ring-offset-zinc-100 transition focus-visible:ring-2 focus-visible:ring-[#c9a227]/80"
              title="Zur Startseite (Diese Seite)"
            >
              <HeaderLogoImg className="h-[52px] w-auto object-contain object-left md:h-[60px] md:min-h-[60px]" />
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
                className="rounded-full bg-gradient-to-r from-[#c9a227] via-[#e8cf72] to-[#c9a227] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black shadow-[0_0_28px_rgba(201,162,39,0.35)] sm:px-5 sm:text-xs"
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
          className="fixed inset-x-0 bottom-0 top-[4.75rem] z-[55] flex flex-col lg:hidden"
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
            className="relative z-10 mt-auto flex max-h-[min(82dvh,calc(100dvh-4.75rem))] w-full flex-col overflow-hidden rounded-t-2xl border border-b-0 border-zinc-200 bg-zinc-50 shadow-[0_-12px_48px_rgba(0,0,0,0.2)]"
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
        className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#030306] pt-20"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#030306]" aria-hidden="true" />

        <motion.div
          className="pointer-events-none absolute left-0 right-0 top-[4.5rem] z-0 flex justify-center px-2 sm:px-4 md:top-[4.75rem] md:px-6 lg:px-10"
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

      <section id="leistungen" className="scroll-mt-24 border-t border-white/[0.06] bg-[#030306] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Service</p>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl" style={{ fontFamily: fontDisplay }}>
              Leistungen
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500 md:text-base">
              Hochwertige Aufbereitung mit klarer Systematik — Schwarz, Gold und Ruhe im Auftritt.
            </p>
          </motion.div>
          <motion.div
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
            }}
          >
            {LEISTUNGEN.map((item, i) => (
              <motion.article
                key={item.title}
                variants={cardPop}
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        y: -10,
                        boxShadow: "0 28px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,162,39,0.35)",
                      }
                }
                className="relative overflow-hidden rounded-2xl border border-[#c9a227]/20 bg-gradient-to-br from-[#050508] via-zinc-950/98 to-black p-7 shadow-[inset_0_1px_0_rgba(201,162,39,0.12)] ring-1 ring-black/60"
              >
                <div
                  className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#c9a227]/12 blur-3xl"
                  aria-hidden="true"
                />
                <div className="mb-4 inline-flex rounded-full border border-[#c9a227]/35 bg-[#c9a227]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#f0d78c]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white" style={{ fontFamily: fontDisplay }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-300">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
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
                className="rounded-2xl border border-[#c9a227]/20 bg-black/50 px-6 py-6 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] transition hover:border-[#c9a227]/45 hover:bg-[#08080c]"
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
                  key={v.title}
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
              <p className="text-sm text-zinc-500 md:col-span-2">
                Weitere Arbeitsvideos können ergänzt werden — bitte MP4-Dateien nach Rücksprache in{" "}
                <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">public/assets/videos/</code>{" "}
                ablegen und im Code verknüpfen.
              </p>
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
                      title="Karte — Platzhalter Göppingen"
                      className="h-full min-h-[240px] w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=G%C3%B6ppingen%2C%20Baden-W%C3%BCrttemberg&z=13&hl=de&output=embed"
                    />
                  </div>
                  <p className="mt-3 text-xs text-zinc-500">
                    Platzhalter-Karte (Göppingen). Exakte Adresse und Google-Business-Einbindung folgen bei Bedarf.
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

      <footer className="border-t border-white/[0.06] py-12 text-center text-sm text-zinc-600">
        <p>
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
