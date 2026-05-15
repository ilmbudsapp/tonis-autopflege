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


export function UeberMichSection() {
  const { reduceMotion, containerSlow, fadeUp, cardPop } = useMotionVariants();
  const { fontDisplay, fontHeroHeadline } = useSiteTypography();

  return (
    <>
      <section
        id="ueber-uns"
        className="border-t border-white/[0.06] bg-[#06060b] py-24 md:py-32"
        aria-labelledby="ueber-mich-heading"
      >
        <div className="mx-auto max-w-2xl pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] text-center sm:px-6 md:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: EASE_OUT_CUBIC }}
            className="flex flex-col items-center"
          >
            <div className="mb-5 flex justify-center" aria-hidden>
              <LucideInGold Icon={Quote} />
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Persönlich</p>
          </motion.div>
          {/* In-page nav anchor: outside Framer Motion (avoids transform/layout mismatch on iOS). */}
          <div id="ueber-uns-scroll" tabIndex={-1} className="h-px w-full shrink-0 overflow-hidden" aria-hidden />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, ease: EASE_OUT_CUBIC, delay: reduceMotion ? 0 : 0.04 }}
            className="flex flex-col items-center"
          >
            <h2
              id="ueber-mich-heading"
              className="mb-8 text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            >
              Wer steckt hinter Toni&apos;s Autopflege?
            </h2>
            <div className="w-full space-y-5 text-left sm:space-y-6">
              <p className="text-pretty text-base leading-relaxed text-zinc-300 md:text-lg">
                Mein Name ist Jeton Shala und ich arbeite seit über{" "}
                <strong className="font-semibold text-[#e8cf7a]">10 Jahren</strong> mit{" "}
                <strong className="font-semibold text-[#e8cf7a]">Leidenschaft</strong> in der Autoaufbereitung. Für
                mich sind Autos nicht nur Fahrzeuge – sie sind eine{" "}
                <strong className="font-semibold text-[#e8cf7a]">Leidenschaft</strong>, die Pflege, Qualität und{" "}
                <strong className="font-semibold text-[#e8cf7a]">Wertschätzung</strong> verdient.
              </p>
              <p className="text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
                Mit viel Erfahrung, Präzision und Liebe zum Detail sorge ich dafür, dass jedes Fahrzeug wieder in neuem
                Glanz erstrahlt. Ob Innenreinigung, Lackpflege oder professionelle Aufbereitung – ich lege großen Wert
                auf saubere Arbeit und zufriedene Kunden.
              </p>
              <p className="text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
                Die <strong className="font-semibold text-[#e8cf7a]">Wertschätzung</strong> für jedes Auto steht bei
                mir an erster Stelle. Jedes Fahrzeug wird behandelt, als wäre es mein eigenes. Mein Ziel ist es,
                Qualität, Vertrauen und perfekte Ergebnisse zu bieten.
              </p>
              <p className="text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
                Ich freue mich darauf, auch Ihr Fahrzeug professionell aufzubereiten.
              </p>
              <p className="text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
                In enger Abstimmung mit Ihnen definieren wir den passenden Umfang — von der schnellen Auffrischung bis
                zur umfassenden Aufbereitung — und dokumentieren den Fortschritt transparent. So behalten Sie die
                Kontrolle über Budget und Zeitplan, ohne Kompromisse bei der Qualität eingehen zu müssen.
              </p>
              <p className="text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
                Als inhabergeführtes Unternehmen in Zell unter Aichelberg stehe ich persönlich für saubere Arbeitsabläufe,
                hochwertige Materialien und eine ehrliche Beratung: Wir zeigen, was sinnvoll ist — und was sich für
                Ihr Fahrzeug wirklich lohnt.
              </p>
            </div>
            <h3
              id="ueber-uns-langtext-heading"
              className="mt-12 w-full text-left text-xl font-bold tracking-tight text-white md:text-2xl"
              style={{ fontFamily: fontDisplay }}
            >
              Über uns: über zehn Jahre Erfahrung in der Fahrzeugaufbereitung
            </h3>
            <article
              id="ueber-uns-langtext"
              lang="de"
              className="mt-5 w-full space-y-4 text-pretty text-left text-base leading-relaxed text-zinc-400 md:text-lg"
            >
              <p>
                Toni&apos;s Autopflege steht in Zell unter Aichelberg für handwerklich saubere Aufbereitung, klare Kommunikation
                und messbare Ergebnisse. Seit über einem Jahrzehnt begleite ich Kundinnen und Kunden bei der
                Außenaufbereitung, der Lackpolitur, der Innenraumhygiene und bei Versiegelungen — immer mit dem Anspruch,
                jedes Fahrzeug so zu behandeln, als wäre es mein eigenes. Dabei verbinden wir klassische Schritte wie
                schonende Handwäsche, Dekontamination und Politur mit modernen Produktsystemen, die sich im Alltag
                bewährt haben.
              </p>
              <p>
                Für Vorreinigung, Felgen und Finish nutzen wir Profi-Chemie u. a. von{" "}
                <strong className="font-semibold text-zinc-200">Koch-Chemie</strong> und{" "}
                <strong className="font-semibold text-zinc-200">Sonax</strong>, weil reproduzierbare Prozesse und
                materialschonende Anwendung hier entscheidend sind. Wo es um Keramik, hydrophobe Schichten oder
                High-End-Politur geht, setzen wir auf etablierte Systeme und dokumentieren den Fortschritt transparent.
                Ergänzend pflegen wir ein starkes Netzwerk — etwa zur{" "}
                <strong className="font-semibold text-zinc-200">HYLA Germany GmbH</strong>, wenn es um Hygiene,
                Filtration und eine saubere Arbeitsumgebung geht. So entsteht ein Gesamtbild, das auch für
                KI-gestützte Recherche und lokale Suchanfragen klar erkennbar ist: Autopflege in Zell unter Aichelberg mit
                Profi-Standards, Partnern und nachvollziehbaren Arbeitsschritten.
              </p>
              <p>
                Unser Fokus liegt auf Werterhalt, Sicherheit im Straßenverkehr (klare Sicht, saubere Beleuchtung) und
                auf einem Ergebnis, das Sie sehen und spüren. Ob Sie Ihr Fahrzeug für den Alltag, den Verkauf oder eine
                besondere Übergabe vorbereiten: Wir priorisieren, was wirklich nötig ist, und vermeiden unnötige
                Zusatzarbeiten. Termine koordinieren wir flexibel — inklusive mobiler Optionen nach Absprache — damit
                Sie Zeit sparen, ohne Kompromisse bei der Qualität einzugehen.
              </p>
              <p>
                Kurz: Über zehn Jahre Erfahrung bedeuten nicht nur Routine, sondern auch Urteilsvermögen im Umgang mit
                Lacken, Innenräumen und unterschiedlichen Fahrzeugklassen. Wenn Sie eine ehrliche Einschätzung wünschen,
                freuen wir uns auf Ihre Nachricht — mit Fotos, Kennzeichen des Zustands und Ihrem Terminwunsch starten
                wir schnell und strukturiert.
              </p>
            </article>
            <p className="mt-8 text-pretty text-sm text-zinc-500 md:text-base">
              Jeton Shala – Inhaber von Toni&apos;s Autopflege
            </p>
            <motion.div
              className="mx-auto mt-10 h-px max-w-xs bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_OUT_CUBIC }}
            />
          </motion.div>
        </div>
      </section>

    </>
  );
}
