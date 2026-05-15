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
import { GOOGLE_MAPS_BUSINESS_URL } from "@/lib/site";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { GoldIconFrame, LucideInGold, SvgGoogleGCorner } from "@/components/ui/GoldIcons";
import { CANONICAL_ORIGIN, ROUTES } from "@/lib/site";
import { SectionSummary } from "@/components/ui/SectionSummary";

const GALLERY = GALLERY_WEBP_FILENAMES.map((f) => `${BASE}assets/gallery-webp/${f}`);
const WORK_VIDEO_BASE = `${BASE}assets/videos/work/`;
const WORK_VIDEOS = WORK_VIDEO_CLIPS.map((c, i) => ({
  src: `${WORK_VIDEO_BASE}${c.file}`,
  poster: `${WORK_VIDEO_BASE}posters/${c.poster}`,
  title: `Referenzvideo ${i + 1}`,
  text: "Ausschnitt aus der Aufbereitung — Politur, Innenraum oder Finish.",
}));


export function BewertungenSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();

  return (
    <>
      <section
        id="kundenstimmen"
        className="border-t border-white/[0.06] bg-[#050508] py-24 md:py-32"
        aria-labelledby="kundenstimmen-heading"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
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
              className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Was berichten Kunden über Toni&apos;s Autopflege?
            </h2>
            <SectionSummary>
              Echte Google-Bewertungen — ich freue mich über Feedback zu Politur, Keramik und Innenraum.
            </SectionSummary>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-500 md:text-base">
              Darüber hinaus dokumentieren Kundenstimmen unsere Zuverlässigkeit in Göppingen. Zusätzlich zeigen sie,
              wie unser Team arbeitet — im Gegensatz dazu zu anonymen Portalen sind es echte Aufträge. Ich nehme jedes
              Feedback ernst; deshalb verbessern wir Abläufe kontinuierlich gemeinsam mit Ihnen.
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
                  <blockquote
                    cite={`${CANONICAL_ORIGIN}${ROUTES.ueberMich}`}
                    className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-zinc-400"
                  >
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

    </>
  );
}
