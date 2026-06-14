import { motion } from "framer-motion";
import { GALLERY_IMAGE_URLS } from "@/lib/media";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { SectionSummary } from "@/components/ui/SectionSummary";
import { galleryImageAlt } from "@/lib/galleryAlt";

export function GalerieSection() {
  const { reduceMotion } = useMotionVariants();
  const { fontDisplay } = useSiteTypography();

  return (
    <section id="galerie" className="border-t border-white/[0.06] py-24 md:py-32">
      <motion.div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
          className="mb-10 text-center md:mb-14"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Portfolio</p>
          <h1
            className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight lg:text-5xl"
            style={{ fontFamily: fontDisplay }}
          >
            Galerie - Toni&apos;s Autopflege Göppingen
          </h1>
          <SectionSummary>
            Referenzbilder aus meiner Profi-Aufbereitung in Göppingen — Vorher-Nachher aus Politur, Innenraum und Finish.
          </SectionSummary>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
            Vorher-Nachher und Referenzbilder aus meiner professionellen Autoaufbereitung in Göppingen und Zell unter
            Aichelberg. Zudem zeigen die Aufnahmen Lackpolitur, Innenraum und Finish — des Weiteren sind alle Bilder für
            schnelles Laden optimiert. Zusätzlich dokumentiert unser Team echte Kundenfahrzeuge; dennoch bleibt jedes
            Ergebnis individuell, weil Zustand und Wünsche unterschiedlich sind.
          </p>
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY_IMAGE_URLS.map((src, i) => (
            <figure key={src} className="mb-4 break-inside-avoid">
              <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/40 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <img
                  src={src}
                  alt={galleryImageAlt(i)}
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  loading={i < 8 ? "eager" : "lazy"}
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <figcaption className="border-t border-white/[0.06] bg-black/50 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-[#d4b84a]">
                  Referenz {i + 1}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
