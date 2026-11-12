"use client";

import { useScroll, useSpring, type MotionValue } from "motion/react";
import type { RefObject } from "react";

type Spring = { stiffness: number; damping: number; mass?: number };

/**
 * Reproduces Framer's "Scroll Target" transform trigger:
 * progress goes 0 → 1 while the target element travels from "its top touches the viewport bottom"
 * to "its bottom touches the viewport bottom", smoothed with the same spring Framer applies.
 */
export function useScrollTarget(
  target: RefObject<HTMLElement | null>,
  spring: Spring = { stiffness: 400, damping: 60, mass: 1 },
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end end"] });
  return useSpring(scrollYProgress, spring);
}
