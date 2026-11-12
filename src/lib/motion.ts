/* Animation presets lifted from the original Framer project so timings match 1:1. */
import type { Transition } from "motion/react";

export type Ease = [number, number, number, number];

export const EASE_REVEAL: Ease = [0.12, 0.23, 0, 0.99];
export const EASE_HERO_IMAGE: Ease = [0.44, 0, 0.11, 1];

/** Default "scroll appear" used by most text blocks (opacity 0, y 40 → 0). */
export const revealTransition = (delay = 0.4, duration = 1.2): Transition => ({
  type: "tween",
  ease: EASE_REVEAL,
  duration,
  delay,
});

/** Spring used by the horizontal slide-ins (Founder / Consultation blocks). */
export const slideSpring: Transition = { type: "spring", stiffness: 250, damping: 40, mass: 1 };

/** Framer's default hover transition for component variants. */
export const hoverSpring: Transition = { type: "spring", bounce: 0.2, duration: 0.4 };

/** Critically damped spring measured on the original (card overlays, logo fade-in): ~0.55s. */
export const cardSpring: Transition = { type: "spring", stiffness: 289, damping: 34, mass: 1 };
