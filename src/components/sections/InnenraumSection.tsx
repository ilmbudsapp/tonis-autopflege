import { motion } from "framer-motion";
import { INNENRAUM_CATEGORIES } from "@/data/siteContent";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import {
  INNENRAUM_MULTIPERSPECTIVE,
  INNENRAUM_SUBSECTIONS,
  SEO_DATA_POINTS,
  TONIS_TIPS,
} from "@/lib/seoContent";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { SectionSummary } from "@/components/ui/SectionSummary";
import { TonisTip } from "@/components/ui/TonisTip";

export function InnenraumSection() {
  const { reduceMotion, cardPop } = useMotionVariants();
  const { fontDisplay } = useSiteTypography();

  return (
    <section id="innenraum" className="border-t border-white/[0.06] bg-[#020203] py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
      >
        <header className="mb-14 text-center md:mb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Innenraum</p>
          <h2
            className="text-pretty font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: fontDisplay }}
          >
            Innenraumaufbereitung
          </h2>
          <SectionSummary>
            Ich reinige Innenräume gründlich — unser Team nutzt Dampf, Tornado und materialschonende Pflege.
          </SectionSummary>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500 md:text-base">
            {SEO_DATA_POINTS.experience}. {SEO_DATA_POINTS.customers}. Ich plane den Umfang mit Ihnen — unser Team in
            Göppingen setzt auf Koch-Chemie und ruhige Handarbeit.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500 md:text-base">
            {INNENRAUM_MULTIPERSPECTIVE}
          </p>
          <TonisTip className="mx-auto mt-6 max-w-2xl">{TONIS_TIPS.innenraum}</TonisTip>
        </header>

        <motion.div
          className="mb-14 space-y-10 rounded-2xl border border-white/[0.08] bg-black/30 px-5 py-8 md:px-10"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
        >
          {INNENRAUM_SUBSECTIONS.map((sub) => {
            const Tag = sub.level;
            return (
              <article key={sub.id} id={sub.id} className="border-b border-white/[0.06] pb-8 last:border-0 last:pb-0">
                <Tag
                  className={`mb-3 font-bold text-white ${sub.level === "h3" ? "text-xl md:text-2xl" : "text-lg md:text-xl"}`}
                  style={{ fontFamily: fontDisplay }}
                >
                  {sub.heading}
                </Tag>
                <p className="text-sm leading-relaxed text-zinc-400 md:text-base">{sub.text}</p>
                <TonisTip className="mt-4">{sub.tip}</TonisTip>
              </article>
            );
          })}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
          }}
        >
          {INNENRAUM_CATEGORIES.map((cat) => {
            const Icon = cat.Icon;
            return (
              <motion.article
                key={cat.id}
                variants={cardPop}
                whileHover={reduceMotion ? {} : { y: -8 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#c9a227]/40 bg-[#050508] p-6 md:p-7"
              >
                <motion.div className="relative mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a227]/50 bg-[#c9a227]/12 text-[#f0d78c]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h4
                    className="min-w-0 text-left text-lg font-bold text-white md:text-xl"
                    style={{ fontFamily: fontDisplay }}
                  >
                    {cat.title}
                  </h4>
                </motion.div>
                <p className="relative text-sm leading-relaxed text-zinc-400">{cat.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
