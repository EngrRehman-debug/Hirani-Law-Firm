"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { EASE_HERO_IMAGE } from "@/lib/motion";
import styles from "./DetailHero.module.css";

type Props = { title: string; image: string; alt?: string };

/** Detail-page hero: photo background with the title in the right half (centred on phones). */
export default function DetailHero({ title, image, alt = "" }: Props) {
  return (
    <section className={styles.hero} data-nav-hero>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.bg}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: EASE_HERO_IMAGE }}
        >
          <Image src={image} alt={alt} fill priority sizes="100vw" className={styles.img} />
          <div className={styles.overlay} />
          <div className={styles.gradient} />
        </motion.div>
        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.spacer} />
            <div className={styles.headline}>
              <Reveal onMount delay={0.4}>
                <h1 className={`h1 ${styles.title}`}>{title}</h1>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
