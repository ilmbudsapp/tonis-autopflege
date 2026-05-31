import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  consentNeedsPrompt,
  hasExternalMediaConsent,
  setConsent,
  type ConsentChoice,
} from "@/lib/consent";
import { ROUTES } from "@/lib/site";

export function ConsentGate({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const [allowed, setAllowed] = useState(hasExternalMediaConsent);

  useEffect(() => {
    const sync = () => setAllowed(hasExternalMediaConsent());
    window.addEventListener("tonis-consent-change", sync);
    return () => window.removeEventListener("tonis-consent-change", sync);
  }, []);

  return allowed ? children : fallback;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(consentNeedsPrompt());
  }, []);

  function choose(choice: ConsentChoice) {
    setConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-5"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      aria-modal="true"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#c9a227]/30 bg-[#0a0a10]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-6">
        <h2 id="cookie-consent-title" className="text-base font-bold text-white sm:text-lg">
          Cookies &amp; Datenschutz
        </h2>
        <p id="cookie-consent-desc" className="mt-3 text-sm leading-relaxed text-zinc-400">
          Wir speichern Ihre Einwilligung lokal im Browser (technisch notwendig). Die eingebettete
          Google-Maps-Karte laden wir nur nach Ihrer Zustimmung. Es gibt kein Google Analytics oder
          vergleichbares Tracking auf dieser Website. Details in der{" "}
          <Link to={ROUTES.datenschutz} className="text-[#f0d78c] underline-offset-2 hover:underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-full border border-white/15 bg-black/40 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-white/25 hover:text-white"
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="rounded-full border border-[#c9a227]/40 bg-[#c9a227]/15 px-5 py-2.5 text-sm font-semibold text-[#f0d78c] transition hover:border-[#c9a227]/60 hover:bg-[#c9a227]/25"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
