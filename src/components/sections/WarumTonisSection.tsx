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


export function WarumTonisSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();

  return (
    <>
      <section
        id="warum-tonis"
        className="border-t border-white/[0.06] bg-[#030306] py-24 md:py-32"
        aria-labelledby="warum-tonis-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
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
              className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Warum vertrauen Kunden in Göppingen auf uns?
            </h2>
            <SectionSummary>
              Ich stehe persönlich für jedes Ergebnis — unser Team in Göppingen verbindet Handarbeit mit Profi-Produkten.
            </SectionSummary>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
              Ich arbeite mit ruhiger Hand und klaren Abläufen. Mein Team und ich setzen auf Profi-Produkte, damit Ihr
              Fahrzeug langfristig glänzt. Wir garantieren transparente Schritte — folglich wissen Sie immer, was als
              Nächstes passiert. Darüber hinaus erkläre ich jeden Arbeitsschritt verständlich.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
              Ich kombiniere bewährte Handarbeit mit modernen Systemen. Wir passen jedes Paket an Ihr Fahrzeug an; zudem
              berate ich ehrlich, welche Leistungen nötig sind. Ebenso setzen wir keine Kompromisse bei Material und Zeit.
              Infolgedessen erhalten Sie ein Ergebnis, das hält — unser Team in Göppingen steht dafür.
            </p>
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

    </>
  );
}
