import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_OUT_CUBIC } from "@/lib/motion";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { useSiteTypography } from "@/hooks/useSiteTypography";

type LegalPageShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function LegalPageShell({ title, subtitle, children }: LegalPageShellProps) {
  const { reduceMotion } = useMotionVariants();
  const { fontDisplay } = useSiteTypography();

  return (
    <section className="border-t border-white/[0.06] py-16 md:py-24">
      <motion.div
        className="mx-auto max-w-3xl px-5 sm:px-6 md:px-8"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
      >
        <h1
          className="mb-3 text-2xl font-bold tracking-tight text-white md:text-3xl"
          style={{ fontFamily: fontDisplay }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="mb-8 text-sm text-zinc-500">{subtitle}</p>
        ) : (
          <div className="mb-8" />
        )}
        <motion.div className="space-y-4 rounded-2xl border border-white/[0.08] bg-black/25 px-4 py-8 text-left text-sm leading-relaxed text-zinc-400 md:px-8">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
