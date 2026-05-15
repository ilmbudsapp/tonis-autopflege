import { useMemo } from "react";
import { useReducedMotion, type Variants } from "framer-motion";
import { EASE_OUT_CUBIC } from "@/lib/motion";

export function useMotionVariants() {
  const reduceMotion = useReducedMotion();

  const containerSlow: Variants = useMemo(
    () =>
      reduceMotion
        ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
        : {
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
          },
    [reduceMotion],
  );

  const fadeUp: Variants = useMemo(
    () =>
      reduceMotion
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : {
            hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.75, ease: EASE_OUT_CUBIC },
            },
          },
    [reduceMotion],
  );

  const cardPop: Variants = useMemo(
    () =>
      reduceMotion
        ? { hidden: { opacity: 1, y: 0, scale: 1 }, visible: { opacity: 1, y: 0, scale: 1 } }
        : {
            hidden: { opacity: 0, y: 50, scale: 0.92, rotateX: -6 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              transition: { type: "spring", stiffness: 120, damping: 18 },
            },
          },
    [reduceMotion],
  );

  return { reduceMotion, containerSlow, fadeUp, cardPop };
}
