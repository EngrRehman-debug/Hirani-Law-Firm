"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import styles from "./LineDraw.module.css";

type Props = {
  /** "light" = rgba(233,233,230,.25) for dark backgrounds, "dark" = #e9e9e6 for light backgrounds */
  tone?: "light" | "dark";
  delay?: number;
  duration?: number;
  /** Animate on mount instead of when scrolled into view */
  onMount?: boolean;
  className?: string;
};

/**
 * 1px horizontal divider that "draws" itself from left to right
 * (Framer "Moving Line" component: line width animates from ~1% to 110%).
 */
export default function LineDraw({ tone = "dark", delay = 0.2, duration = 1, onMount = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });
  const active = onMount || inView;
  return (
    <div ref={ref} className={`${styles.container} ${className ?? ""}`} aria-hidden>
      <div className={styles.wrap}>
        <motion.div
          className={`${styles.line} ${styles[tone]}`}
          initial={{ width: "1%" }}
          animate={{ width: active ? "100%" : "1%" }}
          transition={active ? { duration, delay, ease: [0.33, 0.66, 0.5, 1] } : { duration: 0 }}
        />
      </div>
    </div>
  );
}
