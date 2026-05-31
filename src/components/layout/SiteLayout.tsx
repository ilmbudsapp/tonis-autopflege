import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { BASE, TONI_WA_HREF } from "@/lib/assets";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import CookieConsent from "@/components/CookieConsent";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { BreadcrumbListJsonLd } from "@/components/seo/JsonLd";
export default function SiteLayout() {
  const reduceMotion = useReducedMotion();
  const { fontSans } = useSiteTypography();

  useEffect(() => {
    document.documentElement.classList.add("tonis-app-ready");
    const prevLang = document.documentElement.lang;
    document.documentElement.lang = "de";
    return () => {
      document.documentElement.classList.remove("tonis-app-ready");
      document.documentElement.lang = prevLang;
    };
  }, []);
  return (
    <div
      className="tonis-site-shell relative min-h-[100dvh] overflow-x-hidden bg-[#030306] text-[#ece8e2] antialiased selection:bg-[#c9a227]/35 selection:text-white"
      style={{ fontFamily: fontSans }}
    >
      <style>{`
        @font-face {
          font-family: 'Eurostile Extd';
          font-style: normal;
          font-weight: 900;
          font-display: swap;
          src:
            local('Eurostile Extended Black'),
            local('Eurostile T OT Condensed Bold'),
            local('Eurostile Bold Extended'),
            local('Eurostile Extended'),
            url('${BASE}assets/fonts/EurostileExtd-Black.woff2') format('woff2');
        }
        @keyframes tonis-orbit {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(12px, -18px) scale(1.05); }
          66% { transform: translate(-10px, 10px) scale(0.98); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .tonis-grain {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 1;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .tonis-hero-video {
          filter: contrast(1.05) saturate(1.08) brightness(1.18);
        }
        .tonis-hero-cinema-mesh {
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.07) 1px, transparent 1px);
          background-size: 9px 9px;
        }
      `}</style>
      <div className="tonis-grain" aria-hidden="true" />
      <motion.div
        className="pointer-events-none fixed -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#c9a227]/12 blur-[120px]"
        style={{ animation: reduceMotion ? undefined : "tonis-orbit 18s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed -right-32 bottom-32 h-[380px] w-[380px] rounded-full bg-amber-600/10 blur-[100px]"
        style={{ animation: reduceMotion ? undefined : "tonis-orbit 22s ease-in-out infinite reverse" }}
        aria-hidden="true"
      />

      <BreadcrumbListJsonLd />
      <SiteHeader />

      <main        id="main-content"
        role="main"
        aria-label="Hauptinhalt"
        className="relative z-[2] pt-24 lg:pt-20"
      >
        <Outlet />
      </main>

      <SiteFooter />

      <CookieConsent />

      <motion.a
        href={TONI_WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={reduceMotion ? {} : { scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-transparent text-[#25D366] shadow-[0_4px_18px_rgba(0,0,0,0.45)] transition [bottom:calc(1rem+env(safe-area-inset-bottom,0px))] [right:calc(1rem+env(safe-area-inset-right,0px))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] md:[bottom:calc(1.5rem+env(safe-area-inset-bottom,0px))] md:[right:calc(1.5rem+env(safe-area-inset-right,0px))]"
        aria-label="WhatsApp"
      >
        <span className="sr-only">WhatsApp</span>
        <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor" className="block drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
