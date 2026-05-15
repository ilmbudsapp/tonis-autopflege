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


export function PartnerSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline, fontSans } = useSiteTypography();

  return (
    <>
      <section
        id="partner-netzwerk"
        lang="de"
        className="tonis-partner-wall border-t border-white/[0.06] bg-[#050508] py-24 md:py-32 max-md:will-change-transform md:will-change-auto"
        aria-labelledby="partner-netzwerk-heading"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/75">Netzwerk</p>
            <h2
              id="partner-netzwerk-heading"
              className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Mit wem arbeitet Toni&apos;s Autopflege zusammen?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-zinc-500 md:text-base">
              Partner &amp; Netzwerk — ausgewählte Betriebe rund um Lack, Service und Fahrzeugpflege.
            </p>
          </motion.div>

          <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {PARTNER_NETZWERK_NAMEN.map((name) => (
              <li key={name}>
                <div
                  className="group flex min-h-[4.5rem] items-center justify-center rounded-xl border border-white/[0.08] bg-black/25 px-3 py-3.5 text-center transition duration-300 hover:border-[#c9a227]/35 hover:bg-black/40 sm:min-h-[4.75rem] sm:px-4 sm:py-4"
                  style={{ fontFamily: fontSans }}
                >
                  <span className="text-[11px] font-extralight leading-snug tracking-wide text-zinc-500 transition-colors duration-300 group-hover:text-[#d4b84a] sm:text-xs md:text-[13px] md:leading-tight">
                    {name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}
