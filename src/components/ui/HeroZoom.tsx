"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_HERO_IMAGE } from "@/lib/motion";

/** Hero background "appear": zooms from 1.2× to 1× on page load (1.2s, same curve as the original). */
export default function HeroZoom({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.2, ease: EASE_HERO_IMAGE }}
    >
      {children}
    </motion.div>
  );
}
