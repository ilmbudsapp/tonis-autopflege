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


export function KontaktSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();

  return (
    <>
      <section id="kontakt" className="border-t border-white/[0.06] bg-[#030306] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
          >
            <h2
              className="mb-2 text-balance break-words text-center text-3xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Kontakt
            </h2>
            <p className="mb-12 text-center text-zinc-500">
              Unverbindliche Anfrage — wir melden uns mit Terminvorschlägen. Alle Angaben können vor dem Livegang
              finalisiert werden.
            </p>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#c9a227]/90">Standort</h3>
                  <div className="aspect-[4/3] w-full max-h-[320px] overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-900/50 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                    <iframe
                      title="Karte — Toni's Autopflege, Zell unter Aichelberg"
                      className="h-full min-h-[240px] w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=Boschstr.+23%2F1%2C+73119+Zell+unter+Aichelberg&z=15&hl=de&output=embed"
                    />
                  </div>
                  <p className="mt-3 text-xs text-zinc-500">
                    Boschstr. 23/1, 73119 Zell unter Aichelberg — Standort der Autopflege.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#c9a227]/90">
                    Öffnungszeiten
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Termine ausschließlich nach vorheriger Vereinbarung.
                  </p>
                  <a
                    href={toniWaHrefWithPrefill(KONTAKT_TERMIN_ANFRAGE_WA_TEXT)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-[#c9a227]/35 bg-black/50 px-4 py-2.5 text-xs font-semibold text-[#f0d78c] shadow-[inset_0_1px_0_rgba(201,162,39,0.08),0_0_20px_rgba(201,162,39,0.08)] transition hover:border-[#25D366]/50 hover:bg-[#25D366]/10 hover:text-white hover:shadow-[0_0_24px_rgba(37,211,102,0.18)] sm:text-sm"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" strokeWidth={2.25} aria-hidden />
                    Jetzt Termin anfragen
                  </a>
                </div>

                <div className="rounded-2xl border border-[#c9a227]/25 bg-gradient-to-br from-[#c9a227]/10 to-black/60 p-6">
                  <p className="text-sm font-semibold text-[#f5e6b8]">Direkt per WhatsApp</p>
                  <p className="mt-2 text-sm text-zinc-400">Kurze Fragen, Fotos vom Fahrzeug oder Terminwunsch — wir antworten zeitnah.</p>
                  <a
                    href={TONI_WA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#20bd5a]"
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp öffnen
                  </a>
                </div>
              </div>

              <motion.form
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/30 p-8 shadow-[0_0_80px_rgba(201,162,39,0.06)] backdrop-blur-xl"
                initial={reduceMotion ? false : { opacity: 0, rotateX: 8 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                style={{ transformPerspective: 1200 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const name = String(fd.get("name") ?? "").trim();
                  const email = String(fd.get("email") ?? "").trim();
                  const msg = String(fd.get("message") ?? "").trim();
                  const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${msg}`);
                  window.location.href = `mailto:kontakt@tonis-autopflege.de?subject=${encodeURIComponent("Anfrage Autopflege")}&body=${body}`;
                }}
              >
                {!reduceMotion && (
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-50"
                    style={{
                      background: "conic-gradient(from 0deg, transparent, rgba(201,162,39,0.35), transparent 40%)",
                      animation: "tonis-border-spin 8s linear infinite",
                    }}
                  />
                )}
                <div className="relative space-y-5">
                  <h3 className="text-center text-sm font-bold uppercase tracking-wider text-zinc-400">E-Mail-Anfrage</h3>
                  <div>
                    <label htmlFor="tonis-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Name
                    </label>
                    <input
                      id="tonis-name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#030306]/80 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]/50 focus:ring-2 focus:ring-[#c9a227]/20"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="tonis-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      E-Mail
                    </label>
                    <input
                      id="tonis-email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#030306]/80 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]/50 focus:ring-2 focus:ring-[#c9a227]/20"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="tonis-msg" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Nachricht / Fahrzeug
                    </label>
                    <textarea
                      id="tonis-msg"
                      name="message"
                      required
                      rows={4}
                      className="w-full resize-y rounded-xl border border-white/10 bg-[#030306]/80 px-4 py-3 text-white outline-none transition focus:border-[#c9a227]/50 focus:ring-2 focus:ring-[#c9a227]/20"
                      placeholder="Modell, Zustand, gewünschte Leistungen …"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={reduceMotion ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#c9a227] to-[#a67c00] py-3.5 text-sm font-bold text-black"
                  >
                    Anfrage senden
                  </motion.button>
                  <p className="text-center text-xs text-zinc-600">Öffnet Ihr E-Mail-Programm.</p>
                </div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
