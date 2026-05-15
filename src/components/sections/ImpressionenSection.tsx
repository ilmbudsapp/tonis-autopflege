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


export function ImpressionenSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();
  const [impressionTab, setImpressionTab] = useState<"fotos" | "videos">("fotos");

  return (
    <>
      <section id="impressionen" className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="mb-10 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Portfolio</p>
            <h2
              className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Impressionen
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500 md:text-base">
              Fotos und Videos aus der Aufbereitung — optimiert für schnelles Laden.
            </p>
          </motion.div>

          <div
            className="mx-auto mb-10 flex max-w-md justify-center gap-2 rounded-2xl border border-white/[0.08] bg-black/40 p-1.5"
            role="tablist"
            aria-label="Impressionen Medien"
          >
            <button
              type="button"
              role="tab"
              aria-selected={impressionTab === "fotos"}
              aria-controls="impressionen-panel-fotos"
              id="impressionen-tab-fotos"
              onClick={() => setImpressionTab("fotos")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition ${
                impressionTab === "fotos"
                  ? "bg-gradient-to-r from-[#c9a227] to-[#a67c00] text-black shadow-[0_0_24px_rgba(201,162,39,0.25)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Fotos
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={impressionTab === "videos"}
              aria-controls="impressionen-panel-videos"
              id="impressionen-tab-videos"
              onClick={() => setImpressionTab("videos")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition ${
                impressionTab === "videos"
                  ? "bg-gradient-to-r from-[#c9a227] to-[#a67c00] text-black shadow-[0_0_24px_rgba(201,162,39,0.25)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Videos
            </button>
          </div>

          {impressionTab === "fotos" && (
            <div
              id="impressionen-panel-fotos"
              role="tabpanel"
              aria-labelledby="impressionen-tab-fotos"
              className="tonis-impressionen-panel columns-1 gap-4 sm:columns-2 lg:columns-3"
            >
              {GALLERY.map((src, i) => (
                <figure key={src} className="mb-4 break-inside-avoid">
                  <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/40 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                    <img
                      src={src}
                      alt={`Referenz ${i + 1}`}
                      width={900}
                      height={1200}
                      className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      loading={i < 8 ? "eager" : "lazy"}
                      decoding="async"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <figcaption className="border-t border-white/[0.06] bg-black/50 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-[#d4b84a]">
                      Referenz {i + 1}
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          )}

          {impressionTab === "videos" && (
            <div
              id="impressionen-panel-videos"
              role="tabpanel"
              aria-labelledby="impressionen-tab-videos"
              className="grid gap-10 md:grid-cols-2"
            >
              {WORK_VIDEOS.map((v) => (
                <div
                  key={v.src}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/60 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                >
                  <div className="aspect-video w-full bg-black">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      poster={v.poster}
                      aria-label={v.title}
                    >
                      <source src={v.src} type="video/mp4" />
                    </video>
                  </div>
                  <div className="border-t border-white/[0.06] p-5">
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: fontDisplay }}>
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{v.text}</p>
                  </div>
                </div>
              ))}
              {WORK_VIDEOS.length === 0 && (
                <p className="text-sm text-zinc-500 md:col-span-2">
                  Noch keine Clips — lege MP4/MOV in{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">public/VIDEO 1/</code> und
                  führe lokal{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">npm run videos:work</code>{" "}
                  aus (komprimiert mit hoher Qualität, ohne Byte-Duplikate).
                </p>
              )}
              {WORK_VIDEOS.length > 0 && (
                <p className="text-sm text-zinc-500 md:col-span-2">
                  Weitere Clips: Dateien in{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">public/VIDEO 1/</code>, dann{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">npm run videos:work</code>.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

    </>
  );
}
