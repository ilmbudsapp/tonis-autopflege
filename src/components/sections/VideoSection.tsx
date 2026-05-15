import { motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { FIRMENFOOTER } from "@/lib/site";
import { WORK_VIDEOS } from "@/lib/media";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";
import { GoldIconFrame, SvgInstagramGold } from "@/components/ui/GoldIcons";

const SOCIAL_VIDEO_LINKS = [
  {
    label: "Instagram Reels",
    handle: FIRMENFOOTER.instagram.label,
    href: FIRMENFOOTER.instagram.href,
    hint: "Kurzclips und Ergebnisse auf Instagram",
  },
  {
    label: "TikTok",
    handle: FIRMENFOOTER.tiktok.label,
    href: FIRMENFOOTER.tiktok.href,
    hint: "Behind the Scenes und Aufbereitung im Feed",
  },
] as const;

export function VideoSection() {
  const { reduceMotion } = useMotionVariants();
  const { fontDisplay } = useSiteTypography();

  return (
    <section id="video" className="border-t border-white/[0.06] py-24 md:py-32">
      <motion.div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
          className="mb-10 text-center md:mb-14"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#c9a227]/80">Einblicke</p>
          <h1
            className="text-balance break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl md:leading-tight lg:text-5xl"
            style={{ fontFamily: fontDisplay }}
          >
            Videos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-500 md:text-base">
            Professionelle Fahrzeugpflege im Video — optimiert für Mobilgeräte mit Vorschaubild und nativen Steuerelementen.
          </p>
        </motion.div>

        {WORK_VIDEOS.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2">
            {WORK_VIDEOS.map((v) => (
              <article
                key={v.src}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/60 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
              >
                <div className="aspect-video w-full bg-black">
                  <video
                    className="h-full w-full max-h-[min(70vh,520px)] object-contain sm:object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster={v.poster}
                    aria-label={v.title}
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                </div>
                <div className="border-t border-white/[0.06] p-5">
                  <h2 className="text-lg font-bold text-white" style={{ fontFamily: fontDisplay }}>
                    {v.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{v.text}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-white/[0.08] bg-black/40 px-5 py-8 text-center text-sm text-zinc-500">
            Noch keine Clips online — MP4/MOV in{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">public/VIDEO 1/</code>, dann{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-[#c9a227]">npm run videos:work</code>.
          </p>
        )}

        <div className="mt-16 border-t border-white/[0.06] pt-12">
          <h2
            className="mb-6 text-center text-lg font-bold text-white md:text-xl"
            style={{ fontFamily: fontDisplay }}
          >
            Reels &amp; Social Media
          </h2>
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {SOCIAL_VIDEO_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-black/35 px-5 py-6 text-center transition hover:border-[#c9a227]/35 hover:bg-black/50"
              >
                <GoldIconFrame className="transition-transform duration-200 group-hover:-translate-y-0.5">
                  {item.label.startsWith("Instagram") ? (
                    <SvgInstagramGold className="h-5 w-5" />
                  ) : (
                    <Music2 className="h-5 w-5 text-[#f0d78c]" strokeWidth={1.75} aria-hidden />
                  )}
                </GoldIconFrame>
                <span className="text-sm font-semibold text-white">{item.label}</span>
                <span className="text-xs text-[#c9a227]/90">@{item.handle}</span>
                <span className="text-xs text-zinc-500">{item.hint}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
