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


export function MobilerServiceSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();

  return (
    <>
      <section
        id="mobiler-service"
        lang="de"
        className="relative overflow-hidden border-y border-[#c9a227]/25 bg-gradient-to-b from-[#0c0a06] via-[#050508] to-[#020204] py-24 shadow-[inset_0_0_100px_rgba(201,162,39,0.07),0_0_80px_rgba(201,162,39,0.1)] md:py-32"
        aria-labelledby="mobiler-service-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_55%_at_50%_-10%,rgba(201,162,39,0.18),transparent_58%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/35 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-[#c9a227]/85 sm:tracking-[0.35em]">
              Flexibilität ohne Grenzen
            </p>
            <div className="mx-auto mb-8 flex max-w-4xl flex-col items-center justify-center gap-4 md:flex-row md:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#c9a227]/12 text-[#f0d78c] shadow-[0_0_32px_rgba(201,162,39,0.28)]">
                <MapPin className="h-7 w-7" strokeWidth={1.75} aria-hidden />
              </div>
              <h2
                id="mobiler-service-heading"
                className="text-pretty font-extrabold leading-[1.18] tracking-tight text-white max-md:px-0.5 max-md:text-[clamp(13px,3.6vw,1.25rem)] md:text-4xl md:leading-tight lg:text-5xl"
                style={{ fontFamily: fontDisplay }}
              >
                Kommen wir auch mobil zu Ihnen?
              </h2>
            </div>
            <SectionSummary className="max-w-3xl">
              Ja — ich bringe Premium-Aufbereitung zu Ihnen; unser Team plant Einsätze in Göppingen und nach Absprache deutschlandweit.
            </SectionSummary>
            <div className="mx-auto max-w-3xl space-y-5 text-pretty text-sm leading-relaxed text-zinc-300 md:text-base md:leading-relaxed">
              <p>
                Ich bringe unsere{" "}
                <span className="whitespace-nowrap">Premium-Fahrzeugpflege</span> direkt zu Ihnen. Mein Team und ich planen
                jeden mobilen Einsatz so, dass Qualität und Logistik zusammenpassen. Wir garantieren dieselbe Sorgfalt wie
                in unserer Werkstatt — folglich müssen Sie nicht zu uns fahren.
              </p>
              <p>
                Ich bin für Göppingen, Zell unter Aichelberg und die Region da. Mein Team und ich fahren nach Absprache auch
                deutschlandweit. Demzufolge prüfen wir Wasser, Strom und Witterung vorab. Gleichermaßen stimmen wir den
                Ablauf mit Ihnen ab — ebenso bringt unser Team die passende Ausstattung mit.
              </p>
              <p>
                Ich koordiniere Termine persönlich und kommuniziere klar per WhatsApp. Infolgedessen sparen Sie Zeit ohne
                Qualitätsverlust. Folglich bleiben unsere Standards identisch — mein Team garantiert Profi-Ergebnisse bei
                Ihnen vor Ort.
              </p>
            </div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT_CUBIC, delay: reduceMotion ? 0 : 0.08 }}
              className="mt-10 flex justify-center"
            >
              <motion.a
                href={TONI_WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? {} : { scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex max-w-[min(100%,22rem)] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#25D366] via-[#20c55e] to-[#128C7E] px-5 py-3.5 text-center text-sm font-bold leading-snug text-white shadow-[0_0_36px_rgba(37,211,102,0.35)] transition hover:shadow-[0_0_48px_rgba(37,211,102,0.45)] sm:max-w-none sm:px-8 sm:text-base"
              >
                <MessageCircle className="h-5 w-5 shrink-0 opacity-95" strokeWidth={2.25} aria-hidden />
                Mobilen Termin vereinbaren
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
