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
  asset,
  BASE, HERO_POSTER, HERO_VIDEO_PRIMARY, KONTAKT_TERMIN_ANFRAGE_WA_TEXT,
  LOGO_HERO_SRC, TONI_WA_HREF, toniWaHrefWithPrefill,
} from "@/lib/assets";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import { ROUTES } from "@/lib/site";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { GoldIconFrame, LucideInGold, SvgGoogleGCorner } from "@/components/ui/GoldIcons";
import { SectionSummary } from "@/components/ui/SectionSummary";

const GALLERY = GALLERY_WEBP_FILENAMES.map((f) => `${BASE}assets/gallery-webp/${f}`);
const WORK_VIDEO_BASE = `${BASE}assets/videos/work/`;
const WORK_VIDEOS = WORK_VIDEO_CLIPS.map((c, i) => ({
  src: `${WORK_VIDEO_BASE}${c.file}`,
  poster: `${WORK_VIDEO_BASE}posters/${c.poster}`,
  title: `Referenzvideo ${i + 1}`,
  text: "Ausschnitt aus der Aufbereitung — Politur, Innenraum oder Finish.",
}));


export function PremiumPartnerSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();
  const [premiumCardTap, setPremiumCardTap] = useState<string | null>(null);
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

  return (
    <>
      <section
        id="premium-partner-produkte"
        className="border-t border-white/[0.06] bg-[#06060b] py-24 md:py-32"
        aria-labelledby="premium-partner-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
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
              className="mx-auto max-w-4xl text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Qualität ohne Kompromisse
            </h2>
            <SectionSummary>
              Ich setze auf Premium-Marken — unser Team vertraut Koch-Chemie, Sonax, Gyeon und weiteren Profi-Systemen.
            </SectionSummary>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Darüber hinaus arbeiten wir ausschließlich mit führenden Herstellern der Fahrzeugpflege. Zusätzlich testen
              wir Produkte vorab — im Gegensatz dazu zu Hausmarken bleiben Ergebnisse reproduzierbar. Ich wähle Systeme,
              die zu Lack und Material passen; unser Team in Göppingen garantiert sachgerechte Anwendung.
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

    </>
  );
}
