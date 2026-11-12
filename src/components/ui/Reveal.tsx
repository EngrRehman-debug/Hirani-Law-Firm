"use client";

import { motion, type Transition } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useAppear } from "@/lib/useAppear";
import { revealTransition } from "@/lib/motion";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Starting offset; defaults to the site-wide 40px rise. */
  y?: number;
  x?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  transition?: Transition;
  /** Animate on mount (hero "appear") instead of when scrolled into view. */
  onMount?: boolean;
  /**
   * Play once (default). Pass `once={false}` for the elements whose Framer effect has "replay" on:
   * they reset when they leave the viewport and animate again on re-entry.
   */
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
  amount?: number;
};

/**
 * Fade/slide-in wrapper reproducing Framer's "Appear" scroll effect.
 * Starts at opacity 0.001 + offset and animates to rest when in view.
 */
export default function Reveal({
  children,
  className,
  style,
  y = 40,
  x = 0,
  scale = 1,
  delay = 0.4,
  duration = 1.2,
  transition,
  onMount = false,
  once = true,
  as = "div",
  amount = 0,
}: Props) {
  const Comp = motion[as];
  const hidden = { opacity: 0.001, x, y, scale };
  const shown = { opacity: 1, x: 0, y: 0, scale: 1 };
  const t = transition ?? revealTransition(delay, duration);
  const ref = useRef<HTMLElement>(null);
  const inView = useAppear(ref, { amount, once });

  if (onMount) {
    return (
      <Comp className={className} style={style} initial={hidden} animate={shown} transition={t}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      className={className}
      style={style}
      ref={ref as never}
      initial={hidden}
      // replays reset instantly (like Framer), the entrance uses the measured transition
      animate={inView ? shown : { ...hidden, transition: { duration: 0 } }}
      transition={t}
    >
      {children}
    </Comp>
  );
}
