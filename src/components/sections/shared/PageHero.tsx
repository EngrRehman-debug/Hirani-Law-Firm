"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { EASE_HERO_IMAGE } from "@/lib/motion";
import styles from "./PageHero.module.css";

type Props = {
  title: ReactNode;
  image: string;
  imagePosition?: string;
  /** Small line above the title */
  eyebrow?: string;
  /** Section height as a percentage of the viewport height (original: 60vh by default) */
  height?: number;
  /** Wider title block so headings sit on ~3 lines on desktop ("medium" for shorter headings) */
  wide?: boolean | "medium";
  /** Extra content below the title (subtitle, buttons…) */
  children?: ReactNode;
  className?: string;
};

/** Inner-page hero: darkened photo background (zooms in on load) with a centred serif title. */
export default function PageHero({
  title,
  image,
  imagePosition = "50% 0%",
  eyebrow,
  height,
  wide = false,
  children,
  className,
}: Props) {
  return (
    <section
      className={`${styles.hero} ${className ?? ""}`}
      style={height ? ({ "--hero-h": `${height}vh` } as CSSProperties) : undefined}
      data-nav-hero
    >
      <div className={styles.wrapper}>
        <motion.div
          className={styles.bg}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: EASE_HERO_IMAGE }}
        >
          <Image src={image} alt="" fill priority sizes="100vw" className={styles.img} style={{ objectPosition: imagePosition }} />
          <div className={styles.overlay} />
          <div className={styles.gradient} />
        </motion.div>
        <div className={styles.inner}>
          <div className={`${styles.headline} ${eyebrow ? styles.withEyebrow : ""} ${wide === "medium" ? styles.wideMedium : wide ? styles.wide : ""}`}>
            {eyebrow && (
              <Reveal onMount delay={0.4}>
                <p className={`p16 ${styles.eyebrow}`}>{eyebrow}</p>
              </Reveal>
            )}
            <Reveal onMount delay={0.4}>
              <h1 className={`h1 balance ${styles.title}`}>{title}</h1>
            </Reveal>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
