import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { LOGO_HEADER_SRC } from "@/lib/assets";
import { NAV_LINKS, ROUTES } from "@/lib/site";

export default function SiteHeader() {
  const reduceMotion = useReducedMotion();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileNavOpen]);

  return (
    <>
      <header
        id="site-header"
        role="banner"
        className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/90 bg-zinc-100/95 shadow-[0_1px_0_rgba(255,255,255,0.8),0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150"
      >
        <motion.div
          className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 md:gap-3 md:px-8 md:py-3.5"
          initial={false}
        >
          <motion.div whileHover={reduceMotion ? {} : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to={ROUTES.home}
              onClick={() => setMobileNavOpen(false)}
              className="group block rounded-sm pb-2.5 outline-none ring-offset-2 ring-offset-zinc-100 transition focus-visible:ring-2 focus-visible:ring-[#c9a227]/80 md:pb-1"
              title="Zur Startseite"
            >
              <img
                src={LOGO_HEADER_SRC}
                width={320}
                height={96}
                alt="Toni's Autopflege"
                className="h-[68px] w-auto object-contain object-left md:h-[60px] md:min-h-[60px]"
                decoding="async"
                fetchPriority="high"
              />
              <span className="sr-only">Zur Startseite — Toni&apos;s Autopflege</span>
            </Link>
          </motion.div>
          <motion.div className="flex min-w-0 flex-1 items-center justify-end gap-3 md:gap-4">
            <nav
              role="navigation"
              className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-950 lg:flex"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="group relative text-zinc-950 transition hover:text-black"
                >
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#b8860b] to-[#c9a227] transition-all duration-300 group-hover:w-full" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <motion.div whileHover={reduceMotion ? {} : { scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={ROUTES.kontakt}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-full bg-gradient-to-r from-[#c9a227] via-[#e8cf72] to-[#c9a227] px-2.5 py-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-black shadow-[0_0_28px_rgba(201,162,39,0.35)] sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-wider"
                >
                  Anfrage
                </Link>
              </motion.div>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300/90 bg-white text-zinc-900 shadow-sm outline-none transition hover:border-[#c9a227]/50 hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-[#c9a227]/70"
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-nav-panel"
                aria-label={mobileNavOpen ? "Menü schließen" : "Menü öffnen"}
                onClick={() => setMobileNavOpen((o) => !o)}
              >
                {mobileNavOpen ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {mobileNavOpen && (
        <motion.div
          className="fixed inset-x-0 bottom-0 top-24 z-[55] flex flex-col lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            type="button"
            className="min-h-0 flex-1 bg-black/45 backdrop-blur-[2px]"
            aria-label="Menü schließen"
            onClick={() => setMobileNavOpen(false)}
          />
          <nav
            id="mobile-nav-panel"
            role="navigation"
            aria-label="Main navigation"
            className="relative z-10 mt-auto flex max-h-[min(82dvh,calc(100dvh-6rem))] w-full flex-col overflow-hidden rounded-t-2xl border border-b-0 border-zinc-200 bg-zinc-50 shadow-[0_-12px_48px_rgba(0,0,0,0.2)]"
          >
            <ul className="max-h-[min(70dvh,520px)] space-y-0.5 overflow-y-auto overscroll-contain px-3 py-4">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMobileNavOpen(false)}
                    className="block w-full rounded-xl border border-transparent px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-[0.14em] text-zinc-900 transition active:bg-zinc-200/90"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="border-t border-zinc-200 px-4 py-2.5 text-center text-[11px] text-zinc-500">
              Tippen Sie außerhalb oder ESC zum Schließen
            </p>
          </nav>
        </motion.div>
      )}
    </>
  );
}
