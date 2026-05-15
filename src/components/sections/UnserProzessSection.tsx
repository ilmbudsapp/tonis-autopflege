import { motion } from "framer-motion";
import { WORKFLOW_STEPS } from "@/lib/seoContent";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { SectionSummary } from "@/components/ui/SectionSummary";

export function UnserProzessSection() {
  const { reduceMotion } = useMotionVariants();
  const { fontDisplay } = useSiteTypography();

  return (
    <section
      id="unser-prozess"
      lang="de"
      aria-labelledby="unser-prozess-heading"
      className="border-t border-white/[0.06] bg-[#020203] py-24 md:py-32"
    >
      <article className="mx-auto max-w-3xl px-5 sm:px-6 md:px-8">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a227]/75">Ablauf</p>
          <h2
            id="unser-prozess-heading"
            className="text-balance text-2xl font-extrabold leading-tight text-white md:text-4xl"
            style={{ fontFamily: fontDisplay }}
          >
            Unser Prozess — Schritt für Schritt
          </h2>
          <SectionSummary>
            Ich führe Sie in fünf klaren Schritten von der Beratung bis zur Übergabe — transparent in Göppingen.
          </SectionSummary>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
            In meiner Werkstatt in Zell unter Aichelberg plane ich jeden Auftrag persönlich. Mein Team und ich
            dokumentieren die Schritte; wir garantieren, dass Sie vorab wissen, was passiert. Folglich bleibt die
            Qualität planbar.
          </p>
        </motion.header>

        <motion.ol
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          className="space-y-5 rounded-2xl border border-white/[0.08] bg-black/35 px-5 py-6 md:px-8 md:py-8"
        >
          {WORKFLOW_STEPS.map((step, i) => (
            <li key={step.step} className="flex gap-4 border-b border-white/[0.06] pb-5 last:border-0 last:pb-0">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c9a227]/45 bg-[#c9a227]/10 text-sm font-bold text-[#f0d78c]"
                aria-hidden
              >
                {i + 1}
              </span>
              <motion.div className="min-w-0">
                <strong className="block text-base font-semibold text-white">{step.step}</strong>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{step.text}</p>
              </motion.div>
            </li>
          ))}
        </motion.ol>
      </article>
    </section>
  );
}
