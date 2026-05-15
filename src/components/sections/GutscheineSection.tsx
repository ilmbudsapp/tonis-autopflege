import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { GUTSCHEIN_BETRAEGE } from "@/data/siteContent";
import { toniWaHrefWithPrefill } from "@/lib/assets";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionSummary } from "@/components/ui/SectionSummary";

type GutscheineSectionProps = { pageTitle?: string };

export function GutscheineSection({ pageTitle }: GutscheineSectionProps) {
  const { reduceMotion } = useMotionVariants();
  const { fontDisplay } = useSiteTypography();

  return (
    <section
      id="gutschein-service"
      lang="de"
      className="relative overflow-hidden border-t border-[#c9a227]/20 bg-gradient-to-b from-[#06060c] via-[#04040a] to-[#030306] py-24 md:py-32"
      aria-labelledby="gutschein-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/25 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
          className="mb-12 text-center md:mb-14"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#c9a227]/85 sm:tracking-[0.38em]">
            Gutschein-Service
          </p>
          <div className="mx-auto mb-5 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a227]/45 bg-[#c9a227]/10 text-[#f0d78c] shadow-[0_0_28px_rgba(201,162,39,0.2)]">
              <Gift className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <SectionHeading
              pageTitle={pageTitle}
              defaultText="Verschenken Sie Glanz: Unsere Gutscheine"
              id="gutschein-heading"
              className="max-w-4xl text-pretty font-extrabold leading-[1.15] tracking-tight text-white max-md:px-0.5 max-md:text-[clamp(13px,3.5vw,1.25rem)] md:text-4xl md:leading-tight lg:text-5xl"
              style={{ fontFamily: fontDisplay }}
            />
          </div>
          <SectionSummary>
            Ich berate Sie zum passenden Gutscheinwert — alle Beträge gelten für unsere komplette Autopflege.
          </SectionSummary>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-400 md:text-base">
            Das perfekte Geschenk für Autoliebhaber. Zudem berate ich Sie persönlich, welcher Gutscheinwert passt — des
            Weiteren können Sie im Folgenden einen Betrag wählen und uns direkt per WhatsApp kontaktieren. Zusätzlich gilt
            der Gutschein für alle unsere Leistungen; dennoch empfehle ich eine kurze Abstimmung, damit der Beschenkte
            genau die richtige Aufbereitung erhält.
          </p>
          <div className="mx-auto mt-8 max-w-lg overflow-x-auto rounded-xl border border-white/[0.08] bg-black/25">
            <table className="w-full min-w-[280px] border-collapse text-left text-sm text-zinc-300">
              <caption className="caption-top px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#c9a227]/80">
                Gutscheinwerte
              </caption>
              <thead>
                <tr className="border-b border-white/[0.1] text-[11px] uppercase tracking-wider text-zinc-500">
                  <th scope="col" className="px-4 py-2 font-semibold">
                    Betrag
                  </th>
                  <th scope="col" className="px-4 py-2 font-semibold">
                    Anfrage
                  </th>
                </tr>
              </thead>
              <tbody>
                {GUTSCHEIN_BETRAEGE.map((g) => (
                  <tr key={g.label} className="border-b border-white/[0.06] last:border-b-0">
                    <th scope="row" className="px-4 py-2.5 font-medium text-zinc-200">
                      Gutschein {g.label}
                    </th>
                    <td className="px-4 py-2.5 text-right text-zinc-400">per WhatsApp anfragen</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mx-auto grid w-full max-w-sm grid-cols-2 justify-items-stretch gap-x-3 gap-y-4 sm:max-w-md sm:gap-x-4 sm:gap-y-5 md:max-w-5xl md:grid-cols-4 md:gap-x-5 md:gap-y-6">
          {GUTSCHEIN_BETRAEGE.map((g, i) => (
            <motion.a
              key={g.label}
              href={toniWaHrefWithPrefill(g.text)}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, ease: EASE_OUT_CUBIC, delay: reduceMotion ? 0 : i * 0.06 }}
              whileHover={reduceMotion ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`WhatsApp: Gutschein ${g.label}`}
              className="group @container relative mx-auto flex aspect-square w-full max-w-[156px] min-w-0 flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/12 bg-black/40 px-1.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#c9a227]/50 hover:bg-black/50 hover:shadow-[0_0_42px_rgba(201,162,39,0.42),0_0_96px_rgba(201,162,39,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] sm:max-w-[170px] sm:px-2 sm:py-3 md:max-w-[190px] md:px-2.5"
            >
              <span
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(closest-side, rgba(201,162,39,0.35), transparent 70%)",
                }}
                aria-hidden
              />
              <span
                className="relative w-full min-w-0 max-w-full px-0.5 text-center font-extrabold tabular-nums tracking-tight leading-none text-[#f0d78c] [font-size:clamp(0.82rem,min(14.5cqw,5.4vw),1.44rem)] sm:[font-size:clamp(0.9rem,min(13.5cqw,4.85vw),1.56rem)] md:[font-size:clamp(0.93rem,min(12cqw,3.9vw),1.62rem)]"
                style={{ fontFamily: fontDisplay }}
              >
                {g.label}
              </span>
              <span className="relative mt-1.5 shrink-0 text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-500 transition group-hover:text-[#c9a227]/90">
                WhatsApp
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
