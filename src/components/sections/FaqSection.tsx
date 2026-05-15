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


export function FaqSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section
        id="faq"
        lang="de"
        className="border-t border-white/[0.06] bg-[#030306] py-24 md:py-32"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
            className="mb-10 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/75">AEO / FAQ</p>
            <h2
              id="faq-heading"
              className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal"
              style={{ fontFamily: fontDisplay }}
            >
              Häufig gestellte Fragen
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-zinc-500 md:text-base">
              Antworten auf typische Fragen zu Dauer, Kosten, Marken und mobilem Service — für schnelle Orientierung.
            </p>
          </motion.div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const open = faqOpenIndex === i;
              const panelId = `faq-panel-${i}`;
              const btnId = `faq-trigger-${i}`;
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <h3 className="m-0 text-base font-semibold text-white md:text-lg">
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setFaqOpenIndex(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.04] md:px-5 md:py-4"
                    >
                      <span className="text-pretty pr-2">{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#c9a227]/90 transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.25}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    hidden={!open}
                    className="border-t border-white/[0.06]"
                  >
                    {open ? (
                      <p className="px-4 pb-4 pt-3 text-sm leading-relaxed text-zinc-400 md:px-5 md:text-[15px]">
                        {item.answer}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
