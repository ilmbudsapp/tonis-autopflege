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


export function PremiumServicesSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();

  return (
    <>
      <section id="premium-services" className="border-t border-white/[0.06] bg-[#030306] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-12 text-center md:mb-14"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Spezial</p>
            <h2
              className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
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
                {"vorteile" in svc && svc.vorteile ? (
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

    </>
  );
}
