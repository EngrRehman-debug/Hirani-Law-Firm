"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = { end: number; prefix?: string; suffix?: string; className?: string };

/**
 * Animated number (Framer "Animated Number Counter"):
 * counts from 0 → end with a spring (stiffness 300, damping 60, delay .6) once in view.
 * An invisible copy of the final value reserves the width so layout never jumps.
 */
export default function Counter({ end, prefix = "", suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      type: "spring",
      stiffness: 300,
      damping: 60,
      mass: 1,
      delay: 0.6,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, end]);

  return (
    <span ref={ref} className={className} style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
      <span style={{ opacity: 0 }} aria-hidden>
        {prefix}
        {end}
        {suffix}
      </span>
      <span style={{ position: "absolute", inset: 0 }}>
        {prefix}
        {Math.round(value)}
        {suffix}
      </span>
    </span>
  );
}
