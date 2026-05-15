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


export function ProdukteSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();

  return (
    <>
      <section id="produkte" className="border-t border-white/[0.06] bg-[#06060b] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Chemie & Systeme</p>
            <h2
              className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Unsere Premium Produkte
            </h2>
            <SectionSummary>
              Profi-Chemie von Koch-Chemie, Sonax und Partnern — ich wähle Produkte, die zu Ihrem Lack passen.
            </SectionSummary>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
              Darüber hinaus setzen wir auf Marken, die in Deutschland Vertrauen schaffen — u. a.{" "}
              <strong className="font-semibold text-zinc-300">Koch-Chemie</strong>,{" "}
              <strong className="font-semibold text-zinc-300">Sonax</strong> und{" "}
              <strong className="font-semibold text-zinc-300">HYLA</strong> für Hygiene und Systempflege. Wir arbeiten
              bewusst mit Profi-Linien statt No-Name.
            </p>
          </motion.div>
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUKTE.map((p) => (
              <li
                key={p.name}
                className="rounded-2xl border border-[#c9a227]/20 bg-black/50 px-6 py-6 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] transition-[transform,background-color,border-color,box-shadow] duration-300 max-md:border-[#c9a227]/38 max-md:bg-[#0a0a0e] max-md:shadow-[inset_0_1px_0_rgba(201,162,39,0.12),0_0_28px_rgba(201,162,39,0.06)] hover:border-[#c9a227]/45 hover:bg-[#08080c] hover:shadow-[0_0_32px_rgba(201,162,39,0.1)] active:scale-[0.99] active:border-[#c9a227]/55"
              >
                <p className="text-lg font-bold tracking-tight text-[#f5e6b8]" style={{ fontFamily: fontDisplay }}>
                  {p.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}
