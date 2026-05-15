import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/data/siteContent";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionSummary } from "@/components/ui/SectionSummary";

type FaqSectionProps = {
  pageTitle?: string;
};

export function FaqSection({ pageTitle }: FaqSectionProps) {
  const { reduceMotion } = useMotionVariants();
  const { fontDisplay } = useSiteTypography();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      lang="de"
      className="border-t border-white/[0.06] bg-[#030306] py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <motion.div
        className="mx-auto max-w-3xl px-5 sm:px-6 md:px-8"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
      >
        <header className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/75">AEO / FAQ</p>
          <SectionHeading
            pageTitle={pageTitle}
            defaultText="Häufig gestellte Fragen"
            id="faq-heading"
            className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight md:tracking-normal"
            style={{ fontFamily: fontDisplay }}
          />
          <SectionSummary>
            Ich beantworte die häufigsten Fragen zu Dauer, Keramik und Terminen — unser Team in Göppingen hilft
            persönlich.
          </SectionSummary>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-500 md:text-base">
            Darüber hinaus finden Sie hier meine Antworten in Kurzform. Zusätzlich können Sie mich jederzeit per
            WhatsApp kontaktieren — im Gegensatz dazu zu allgemeinen Ratgebern berate ich Sie konkret zu Ihrem Fahrzeug.
            Mein Team in Göppingen antwortet persönlich; ich prüfe Sonderfälle vorab, damit Termine realistisch bleiben.
          </p>
        </header>

        <dl className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const open = faqOpenIndex === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-trigger-${i}`;
            return (
              <motion.div
                key={item.question}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.04, ease: EASE_OUT_CUBIC }}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <dt className="m-0">
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setFaqOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-base font-semibold text-white transition hover:bg-white/[0.04] md:px-5 md:text-lg"
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
                </dt>
                <dd
                  id={panelId}
                  aria-labelledby={btnId}
                  className={`m-0 border-white/[0.06] transition-[max-height,opacity,border] duration-300 ${
                    open ? "border-t opacity-100" : "max-h-0 overflow-hidden border-t-0 opacity-70"
                  }`}
                >
                  <p className="px-4 pb-4 pt-3 text-sm leading-relaxed text-zinc-400 md:px-5 md:text-[15px]">
                    {item.answer}
                  </p>
                </dd>
              </motion.div>
            );
          })}
        </dl>
      </motion.div>
    </section>
  );
}
