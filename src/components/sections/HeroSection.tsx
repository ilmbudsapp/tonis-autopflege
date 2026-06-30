import { useEffect, useMemo, useRef, useState } from "react";
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
import { SEO_DATA_POINTS, TONIS_TIPS } from "@/lib/seoContent";
import { ROUTES } from "@/lib/site";
import { TonisTip } from "@/components/ui/TonisTip";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { GoldIconFrame, LucideInGold, SvgGoogleGCorner } from "@/components/ui/GoldIcons";

const GALLERY = GALLERY_WEBP_FILENAMES.map((f) => `${BASE}assets/gallery-webp/${f}`);
const WORK_VIDEO_BASE = `${BASE}assets/videos/work/`;
const WORK_VIDEOS = WORK_VIDEO_CLIPS.map((c, i) => ({
  src: `${WORK_VIDEO_BASE}${c.file}`,
  poster: `${WORK_VIDEO_BASE}posters/${c.poster}`,
  title: `Referenzvideo ${i + 1}`,
  text: "Ausschnitt aus der Aufbereitung — Politur, Innenraum oder Finish.",
}));


export function HeroSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontHeroHeadline } = useSiteTypography();
  const HeroLogoImg = ({ className }: { className?: string }) => (
    <img src={LOGO_HERO_SRC} width={480} height={140} alt="Toni's Autopflege — Autopflege Göppingen" className={className} decoding="async" fetchPriority="high" />
  );

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
    heroParallaxDesktopRef.current && !reduceMotionRef.current ? `${v * 22}%` : "0%",
  );
  const videoY = useSpring(rawParallax, { stiffness: 100, damping: 28, mass: 0.6 });

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#030306] pt-24 lg:pt-20"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#030306]" aria-hidden="true" />

        <motion.div
          className="tonis-hero-parallax-layer pointer-events-none absolute left-0 right-0 top-24 z-0 flex justify-center px-2 sm:px-4 md:px-6 lg:top-[4.75rem] lg:px-10 max-md:will-change-transform md:will-change-auto"
          style={reduceMotion || !heroParallaxDesktop ? undefined : { y: videoY }}
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
                className="tonis-hero-cinema-mesh pointer-events-none absolute inset-0 z-[2] opacity-[0.26] mix-blend-overlay"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-black/12 via-transparent to-black/20"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[4] shadow-[inset_0_0_80px_rgba(0,0,0,0.22),inset_0_0_28px_rgba(0,0,0,0.12)]"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030306]/58 via-[#030306]/26 to-[#030306]/72"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_55%_at_50%_18%,rgba(201,162,39,0.12),transparent_62%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-24 pt-6 text-center sm:px-6 md:px-10 md:pt-10">
          <motion.div
            className="mb-6 md:mb-10"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT_CUBIC }}
          >
            <Link to={ROUTES.home}
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
            </Link>
          </motion.div>

          <motion.div
            variants={containerSlow}
            initial="hidden"
            animate="visible"
            className="max-w-3xl md:max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-[#d4b84a] md:text-sm"
            >
              Premium Autopflege · Göppingen
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="tonis-hero-h1 text-pretty font-extrabold leading-tight tracking-tight text-white"
              style={{
                fontWeight: 800,
                textShadow:
                  "0 2px 3px rgba(0,0,0,0.85), 0 12px 48px rgba(0,0,0,0.75), 0 0 1px rgba(0,0,0,1)",
              }}
            >
              <span className="tonis-hero-h1__line">Autopflege Göppingen —</span>
              <span className="tonis-hero-h1__line">professionelle Fahrzeugaufbereitung</span>
              <span className="tonis-hero-h1__line">bei Toni</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-balance text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl md:mt-5 md:text-6xl md:leading-[1.08] md:tracking-[0.02em] lg:text-7xl"
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
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-300 [text-shadow:0_1px_14px_rgba(0,0,0,0.78)] md:text-lg"
            >
              Als Spezialist für Autopflege in Göppingen biete ich Autoaufbereitung, Fahrzeugpflege und Lackaufbereitung
              in unserer Werkstatt in Zell unter Aichelberg — mit Koch-Chemie, Sonax und persönlicher Beratung.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-300 [text-shadow:0_1px_14px_rgba(0,0,0,0.78)] md:text-lg"
            >
              Ob Keramikversiegelung, Innenraumreinigung oder Vorbereitung auf die Leasingrückgabe: Mein Team und ich
              planen jeden Auftrag transparent.{" "}
              <Link to={ROUTES.autopflegeGoeppingen} className="font-medium text-[#f0d78c] underline-offset-2 hover:underline">
                Mehr zur Autopflege in Göppingen
              </Link>
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-pretty text-sm font-medium text-[#e8cf7a] md:text-base"
            >
              {SEO_DATA_POINTS.customers} · {SEO_DATA_POINTS.experience}
            </motion.p>
            <motion.div variants={fadeUp} className="mx-auto mt-6 max-w-xl">
              <TonisTip>{TONIS_TIPS.hero}</TonisTip>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <motion.div whileHover={reduceMotion ? {} : { scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={ROUTES.kontakt}
                  className="relative inline-block overflow-hidden rounded-full bg-gradient-to-r from-[#c9a227] via-[#f0d78c] to-[#c9a227] px-10 py-3.5 text-sm font-bold text-black shadow-[0_0_32px_rgba(201,162,39,0.25)]"
                >
                  <span className="relative">Termin anfragen</span>
                </Link>
              </motion.div>
              <motion.div whileHover={reduceMotion ? {} : { scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={ROUTES.leistungen}
                  className="inline-block rounded-full border border-white/15 bg-white/[0.04] px-9 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#c9a227]/40 hover:text-[#f5e6b8]"
                >
                  Leistungen
                </Link>
              </motion.div>
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
    </>
  );
}
