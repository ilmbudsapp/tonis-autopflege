import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Mail, MapPin, Music2, Phone } from "lucide-react";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import { AGR_SITE_URL, CANONICAL_ORIGIN, FIRMENFOOTER, NAV_LINKS, ROUTES } from "@/lib/site";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { GoldIconFrame, LucideInGold, SvgFacebookGold, SvgInstagramGold } from "@/components/ui/GoldIcons";

export default function SiteFooter() {
  const { reduceMotion } = useMotionVariants();
  const { fontDisplay } = useSiteTypography();

  return (
    <footer className="border-t border-white/[0.06] bg-[#020208] py-14 md:py-16">
      <motion.div
        className="mx-auto max-w-4xl px-5 sm:px-6 md:px-8"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
      >
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/70">Impressum &amp; Anfahrt</p>
          <h2
            className="text-balance break-words text-lg font-bold leading-tight tracking-tight text-white md:text-xl lg:text-2xl"
            style={{ fontFamily: fontDisplay }}
          >
            Toni&apos;s Autopflege
          </h2>
        </div>

        <blockquote
          cite={`${CANONICAL_ORIGIN}${ROUTES.ueberMich}`}
          className="mx-auto mb-10 max-w-2xl border-l-2 border-[#c9a227]/50 pl-4 text-left text-sm italic text-zinc-400 md:text-base"
        >
          <p>Unsere Leidenschaft ist Ihr Glanz. Wir setzen auf Premium-Produkte von Koch-Chemie und Sonax.</p>
          <footer className="mt-2 text-xs not-italic text-zinc-500">— Toni, Toni&apos;s Autopflege Zell unter Aichelberg</footer>
        </blockquote>

        <article className="space-y-5 rounded-2xl border border-[#c9a227]/20 bg-black/35 px-4 py-8 shadow-[inset_0_1px_0_rgba(201,162,39,0.06)] md:px-8">
          <div className="flex gap-4">
            <LucideInGold Icon={Building2} />
            <div className="min-w-0 text-left">
              <p className="text-base font-bold text-white" style={{ fontFamily: fontDisplay }}>
                {FIRMENFOOTER.firma}
              </p>
              <p className="mt-1 text-sm text-zinc-400">{FIRMENFOOTER.inhaber}</p>
              <p className="text-sm font-medium text-[#c9a227]/90">{FIRMENFOOTER.branche}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <LucideInGold Icon={MapPin} />
            <div className="min-w-0 text-left text-sm leading-relaxed text-zinc-300">
              <p className="font-medium text-zinc-200">{FIRMENFOOTER.strasse}</p>
              <p>{FIRMENFOOTER.ort}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <LucideInGold Icon={Phone} />
            <div className="min-w-0 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Telefon</p>
              <a
                href={FIRMENFOOTER.telefonHref}
                className="text-sm font-semibold text-[#f0d78c] underline-offset-2 hover:text-white hover:underline"
              >
                {FIRMENFOOTER.telefonLabel}
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <LucideInGold Icon={Mail} />
            <div className="min-w-0 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">E-Mail</p>
              <a
                href={`mailto:${FIRMENFOOTER.email}`}
                className="break-all text-sm font-semibold text-[#f0d78c] underline-offset-2 hover:text-white hover:underline"
              >
                {FIRMENFOOTER.email}
              </a>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6">
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Social Media
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <a
                href={FIRMENFOOTER.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/s flex flex-col items-center gap-2 text-center"
              >
                <GoldIconFrame className="transition-transform duration-200 group-hover/s:-translate-y-0.5">
                  <SvgFacebookGold className="h-5 w-5" />
                </GoldIconFrame>
                <span className="max-w-[10rem] text-xs font-medium text-zinc-400">
                  Facebook · {FIRMENFOOTER.facebook.label}
                </span>
              </a>
              <a
                href={FIRMENFOOTER.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/s flex flex-col items-center gap-2 text-center"
              >
                <GoldIconFrame className="transition-transform duration-200 group-hover/s:-translate-y-0.5">
                  <SvgInstagramGold className="h-5 w-5" />
                </GoldIconFrame>
                <span className="max-w-[10rem] text-xs font-medium text-zinc-400">
                  Instagram · {FIRMENFOOTER.instagram.label}
                </span>
              </a>
              <a
                href={FIRMENFOOTER.tiktok.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/s flex flex-col items-center gap-2 text-center"
              >
                <div className="transition-transform duration-200 group-hover/s:-translate-y-0.5">
                  <LucideInGold Icon={Music2} />
                </div>
                <span className="max-w-[10rem] text-xs font-medium text-zinc-400">
                  TikTok · {FIRMENFOOTER.tiktok.label}
                </span>
              </a>
            </div>
          </div>
        </article>

        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 border-t border-white/[0.05] pt-6 text-center text-[11px] text-zinc-500 sm:text-xs"
          aria-label="Schnellzugriff"
        >
          {NAV_LINKS.map(({ to, label }, i) => (
            <span key={to} className="inline-flex items-center gap-x-2">
              {i > 0 ? (
                <span className="select-none text-zinc-700" aria-hidden>
                  |
                </span>
              ) : null}
              <Link to={to} className="underline-offset-2 transition hover:text-zinc-300 hover:underline">
                {label}
              </Link>
            </span>
          ))}
        </nav>

        <nav
          className="mt-4 flex flex-wrap items-center justify-center gap-x-2 text-center text-[11px] text-zinc-500 sm:text-xs"
          aria-label="Rechtliches"
        >
          <Link to={ROUTES.impressum} className="underline-offset-2 transition hover:text-zinc-300 hover:underline">
            Impressum
          </Link>
          <span className="select-none text-zinc-700" aria-hidden>
            |
          </span>
          <Link to={ROUTES.datenschutz} className="underline-offset-2 transition hover:text-zinc-300 hover:underline">
            Datenschutz
          </Link>
          <span className="select-none text-zinc-700" aria-hidden>
            |
          </span>
          <Link to={ROUTES.agb} className="underline-offset-2 transition hover:text-zinc-300 hover:underline">
            AGB
          </Link>
        </nav>

        <p className="mt-3 text-center text-[10px] text-zinc-600 sm:text-[11px]">
          <a
            href={AGR_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 underline-offset-2 transition hover:text-zinc-400 hover:underline"
          >
            Web Design by AGRMULTIMEDIA
          </a>
        </p>
      </motion.div>
    </footer>
  );
}
