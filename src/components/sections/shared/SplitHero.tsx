"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { EASE_HERO_IMAGE } from "@/lib/motion";
import styles from "./SplitHero.module.css";

type Props = {
  title: string;
  text: string;
  image: string;
  /** CTA buttons */
  children?: ReactNode;
  /** Extra layer rendered above the background (e.g. bottom fade) */
  extra?: ReactNode;
};

/** Full-viewport hero with left-aligned headline, intro and buttons (Case Studies, Attorneys). */
export default function SplitHero({ title, text, image, children, extra }: Props) {
  return (
    <section className={styles.hero} data-nav-hero>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.bg}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: EASE_HERO_IMAGE }}
        >
          <Image src={image} alt="" fill priority sizes="100vw" className={styles.img} />
          <div className={styles.overlay} />
          <div className={styles.gradient} />
        </motion.div>
        {extra}
        <div className={styles.inner}>
          <div className={styles.headline}>
            <Reveal onMount delay={0.4}>
              <h1 className={`h1 balance ${styles.title}`}>{title}</h1>
            </Reveal>
            <Reveal onMount y={20} delay={0.2}>
              <p className={`p18 balance ${styles.text}`}>{text}</p>
            </Reveal>
            {children && (
              <Reveal onMount y={20} delay={0.3} className={styles.ctas}>
                {children}
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
