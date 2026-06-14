import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PageMeta from "@/components/layout/PageMeta";
import {
  AutopflegeLandingJsonLd,
} from "@/components/seo/JsonLd";
import {
  AUTOPFLEGE_LANDING_FAQ,
  AUTOPFLEGE_LANDING_H1,
  AUTOPFLEGE_LANDING_SECTIONS,
} from "@/data/autopflegeGoeppingenContent";
import { PAGE_META, ROUTES } from "@/lib/site";
import { useSiteTypography } from "@/hooks/useSiteTypography";

export default function AutopflegeGoeppingenPage() {
  const meta = PAGE_META.autopflegeGoeppingen;
  const { fontDisplay } = useSiteTypography();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageMeta {...meta} />
      <AutopflegeLandingJsonLd />

      <article className="border-t border-white/[0.06] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 md:px-8">
          <header className="mb-12 text-center md:mb-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/80">
              Fahrzeugaufbereitung · Göppingen
            </p>
            <h1
              className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight lg:text-[2.65rem]"
              style={{ fontFamily: fontDisplay }}
            >
              {AUTOPFLEGE_LANDING_H1}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              Autoaufbereitung, Lackaufbereitung, Keramikversiegelung und Innenraumreinigung — persönlich betreut in
              Zell unter Aichelberg für Kunden aus Göppingen und der Region.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to={ROUTES.kontakt}
                className="rounded-full bg-gradient-to-r from-[#c9a227] via-[#f0d78c] to-[#c9a227] px-8 py-3 text-sm font-bold text-black"
              >
                Termin anfragen
              </Link>
              <Link
                to={ROUTES.leistungen}
                className="rounded-full border border-white/15 px-8 py-3 text-sm font-semibold text-white hover:border-[#c9a227]/40"
              >
                Alle Leistungen
              </Link>
            </div>
          </header>

          <div className="prose-tonis space-y-14 text-zinc-300">
            {AUTOPFLEGE_LANDING_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2
                  id={`${section.id}-heading`}
                  className="text-balance text-xl font-bold leading-snug text-white md:text-2xl"
                  style={{ fontFamily: fontDisplay }}
                >
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-4 text-sm leading-relaxed md:text-base">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm md:text-base">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section
            id="autopflege-faq"
            className="mt-16 border-t border-white/[0.08] pt-14"
            aria-labelledby="autopflege-faq-heading"
          >
            <h2
              id="autopflege-faq-heading"
              className="text-center text-xl font-bold text-white md:text-2xl"
              style={{ fontFamily: fontDisplay }}
            >
              Häufige Fragen zur Autopflege in Göppingen
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-zinc-500 md:text-base">
              Antworten zu Kosten, Dauer, Keramikversiegelung, Leasingrückgabe und Terminvereinbarung.
            </p>
            <dl className="mt-10 space-y-3">
              {AUTOPFLEGE_LANDING_FAQ.map((item, i) => {
                const open = faqOpenIndex === i;
                const panelId = `autopflege-faq-panel-${i}`;
                const btnId = `autopflege-faq-trigger-${i}`;
                return (
                  <div
                    key={item.question}
                    className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40"
                  >
                    <dt className="m-0">
                      <button
                        type="button"
                        id={btnId}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setFaqOpenIndex(open ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-base font-semibold text-white hover:bg-white/[0.04] md:px-5"
                      >
                        {item.question}
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-[#c9a227] transition ${open ? "rotate-180" : ""}`}
                          aria-hidden
                        />
                      </button>
                    </dt>
                    <dd
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      hidden={!open}
                      className="border-t border-white/[0.06] px-4 py-4 text-sm leading-relaxed text-zinc-400 md:px-5 md:text-base"
                    >
                      {item.answer}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>

          <div className="mt-14 rounded-2xl border border-[#c9a227]/30 bg-[#0a0a0e] p-6 text-center md:p-8">
            <h2 className="text-lg font-bold text-white md:text-xl" style={{ fontFamily: fontDisplay }}>
              Bereit für professionelle Autopflege in Göppingen?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 md:text-base">
              Schicken Sie uns eine kurze Nachricht — wir beraten Sie zu Autoaufbereitung, Lackpflege und
              Innenraumreinigung.
            </p>
            <Link
              to={ROUTES.kontakt}
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#c9a227] to-[#f0d78c] px-8 py-3 text-sm font-bold text-black"
            >
              Jetzt Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
