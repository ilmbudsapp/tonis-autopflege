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
  LEISTUNGEN_CATEGORIES, PARTNER_NETZWERK_NAMEN,
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


export function LeistungenSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();

  return (
    <>
      <section id="leistungen" className="border-t border-white/[0.06] bg-[#020203] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-14 text-center md:mb-16"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Premium</p>
            <h2
              className="mx-auto max-w-4xl text-pretty px-1 text-[13px] font-extrabold leading-[1.22] tracking-tight text-white min-[361px]:text-base sm:text-lg md:px-0 md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Welche Leistungen bietet Toni&apos;s Autopflege?
            </h2>
            <SectionSummary>
              Außen, Lack, Keramik und Innenraum — ich biete strukturierte Pakete mit Profi-Produkten in Göppingen.
            </SectionSummary>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Ich biete professionelle Fahrzeugpflege auf höchstem Niveau — für maximalen Glanz, Werterhalt und einen
              perfekten ersten Eindruck. Mein Team und ich kombinieren hochwertige Pflegeprodukte mit modernen Techniken.
              Wir garantieren Liebe zum Detail bei jeder Aufbereitung. Darüber hinaus setzen wir auf{" "}
              <strong className="font-semibold text-zinc-200">Koch-Chemie</strong> und{" "}
              <strong className="font-semibold text-zinc-200">Sonax</strong>; zudem ergänzt unser Netzwerk u. a.{" "}
              <strong className="font-semibold text-zinc-200">HYLA Germany GmbH</strong> für Hygiene. Folglich bleiben
              Prozesse reproduzierbar. Ebenso passen wir jedes Paket an Ihr Fahrzeug an — infolgedessen zahlen Sie nur,
              was Sie wirklich brauchen.
            </p>
            <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/[0.08] bg-black/35 px-4 py-6 sm:px-6 md:py-8">
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.28em] text-[#c9a227]/80">
                Alle Leistungen im Überblick (Tabelle)
              </p>
              <div className="mx-auto overflow-x-auto rounded-xl border border-white/[0.08] bg-black/20">
                <table className="w-full min-w-[min(100%,520px)] border-collapse text-left text-sm text-zinc-300 md:text-[15px]">
                  <caption className="caption-bottom px-3 pb-3 pt-2 text-center text-xs leading-snug text-zinc-500">
                    Strukturierte Leistungsliste (Kategorie und Einzelleistung) für Suchmaschinen und KI-Auswertung.
                  </caption>
                  <thead>
                    <tr className="border-b border-white/[0.12] bg-black/45 text-[11px] font-bold uppercase tracking-wider text-[#c9a227]/90">
                      <th scope="col" className="px-3 py-3">
                        Kategorie
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Leistung
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {LEISTUNGEN_CATEGORIES.flatMap((cat) =>
                      cat.items.map((line) => (
                        <tr key={`${cat.id}-${line}`} className="border-b border-white/[0.06] last:border-b-0">
                          <th scope="row" className="align-top px-3 py-2 font-semibold text-[#c9a227]/85">
                            {cat.title}
                          </th>
                          <td className="px-3 py-2">{line}</td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
            }}
          >
            {LEISTUNGEN_CATEGORIES.map((cat) => {
              const Icon = cat.Icon;
              return (
                <motion.article
                  key={cat.id}
                  variants={cardPop}
                  whileHover={reduceMotion ? {} : { y: -8 }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[#050508] p-6 shadow-[inset_0_1px_0_rgba(201,162,39,0.1)] transition-[background-color,border-color,box-shadow] duration-300 hover:bg-[#0c0c10] hover:shadow-[0_24px_56px_rgba(0,0,0,0.55)] md:p-7 ${
                    cat.highlight
                      ? "border-[#c9a227]/55 ring-1 ring-[#c9a227]/25 hover:border-[#e8c766]/80 hover:ring-[#c9a227]/40"
                      : "border-[#c9a227]/40 hover:border-[#d4af37]/70"
                  }`}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c9a227]/10 opacity-80 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#c9a227]/12 text-[#f0d78c] shadow-[0_0_24px_rgba(201,162,39,0.15)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="min-w-0 text-left">
                      <h3
                        className="text-lg font-bold leading-snug text-white md:text-xl"
                        style={{ fontFamily: fontDisplay }}
                      >
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]/90">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="relative mb-6 text-sm leading-relaxed text-zinc-400">{cat.description}</p>
                  <p className="relative mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#c9a227]/75">
                    {cat.listLabel}
                  </p>
                  <ul className="relative mt-auto space-y-3">
                    {cat.items.map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-snug text-zinc-200">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a227]"
                          strokeWidth={2.75}
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
            className="mt-16 border-t border-white/[0.06] pt-14 text-center md:mt-20 md:pt-16"
            aria-labelledby="reparatur-spezial-heading"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/75">Spezial</p>
            <h3
              id="reparatur-spezial-heading"
              className="text-balance break-words text-xl font-extrabold leading-tight tracking-tight text-white md:text-3xl md:tracking-normal lg:text-4xl"
              style={{ fontFamily: fontDisplay }}
            >
              Reparatur &amp; Spezial-Services
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
              Punktuelle Reparaturen und Speziallösungen — präzise, wertbewusst und ohne unnötige Komplettarbeiten.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-7 md:mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
            }}
          >
            {REPARATUR_SPEZIAL_SERVICES.map((svc) => {
              const Icon = svc.Icon;
              return (
                <motion.article
                  key={svc.id}
                  variants={cardPop}
                  whileHover={reduceMotion ? {} : { y: -8 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#c9a227]/40 bg-[#050508] p-6 shadow-[inset_0_1px_0_rgba(201,162,39,0.1)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#d4af37]/70 hover:bg-[#0c0c10] hover:shadow-[0_0_36px_rgba(201,162,39,0.18),0_24px_56px_rgba(0,0,0,0.55)] md:p-7"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c9a227]/10 opacity-80 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#c9a227]/12 text-[#f0d78c] shadow-[0_0_24px_rgba(201,162,39,0.15)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h4
                      className="min-w-0 text-left text-lg font-bold leading-snug text-white md:text-xl"
                      style={{ fontFamily: fontDisplay }}
                    >
                      {svc.title}
                    </h4>
                  </div>
                  <p className="relative text-sm leading-relaxed text-zinc-400">{svc.text}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

    </>
  );
}
