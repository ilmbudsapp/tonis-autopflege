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

const GALLERY = GALLERY_WEBP_FILENAMES.map((f) => `${BASE}assets/gallery-webp/${f}`);
const WORK_VIDEO_BASE = `${BASE}assets/videos/work/`;
const WORK_VIDEOS = WORK_VIDEO_CLIPS.map((c, i) => ({
  src: `${WORK_VIDEO_BASE}${c.file}`,
  poster: `${WORK_VIDEO_BASE}posters/${c.poster}`,
  title: `Referenzvideo ${i + 1}`,
  text: "Ausschnitt aus der Aufbereitung — Politur, Innenraum oder Finish.",
}));


export function TerminCtaSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();

  return (
    <>
      <section
        id="termin-cta"
        className="border-t border-[#c9a227]/25 bg-gradient-to-b from-[#0a0a0f] via-[#050508] to-[#030306] py-20 md:py-28"
        aria-label="Termin per WhatsApp"
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-6 text-center md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
            className="rounded-3xl border border-[#c9a227]/30 bg-black/35 px-6 py-10 shadow-[0_0_60px_rgba(201,162,39,0.08)] backdrop-blur-sm md:px-12 md:py-12"
          >
            <h2
              className="mb-4 text-balance text-xl font-bold text-white md:text-2xl"
              style={{ fontFamily: fontDisplay }}
            >
              Wie sichere ich meinen Termin?
            </h2>
            <p className="text-pretty text-base font-medium leading-relaxed text-zinc-200 md:text-lg">
              Schreiben Sie uns per WhatsApp — ich berate Sie persönlich zu Innenraum, Lackaufbereitung oder
              Keramikversiegelung. Zudem kann unser Team Termine flexibel abstimmen; des Weiteren erhalten Sie im
              Folgenden eine klare Einschätzung zu Dauer und Kosten.
            </p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-zinc-400 md:text-base">
              Zusätzlich helfen Fotos von Schäden oder Problemzonen bei der Planung. Dennoch gilt: Qualität braucht Zeit
              — deshalb planen wir realistische Fenster, damit Politur, Trocknung und Versiegelung sauber ablaufen.
              Gemeinsam bringen wir Ihr Fahrzeug wieder auf Hochglanz.
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

    </>
  );
}
