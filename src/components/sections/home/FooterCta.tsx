"use client";

import Image from "next/image";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/content/client";
import { useScrollTarget } from "@/lib/useScrollTarget";
import styles from "./FooterCta.module.css";

/**
 * Sticky full-screen block: the background video starts at half size and grows past full-bleed
 * (0.5 → 1.2) while the user scrolls through the 2×viewport-tall section.
 */
export default function FooterCta() {
  const t = useContent().sections.footerCta;
  const target = useRef<HTMLElement>(null);
  const progress = useScrollTarget(target, { stiffness: 400, damping: 60 });
  const scale = useTransform(progress, [0, 1], [0.5, 1.2]);

  return (
    <section className={styles.section} ref={target}>
      <div className={styles.sticky}>
        <motion.div className={styles.media} style={{ scale, transformPerspective: 1200 }}>
          {/* video when the client provides one; until then the team photo (poster) is shown */}
          {t.video ? (
            <video className={styles.video} src={t.video} poster={t.poster} autoPlay muted loop playsInline />
          ) : (
            <Image src={t.poster} alt={t.posterAlt} fill sizes="100vw" className={styles.video} />
          )}
        </motion.div>
        <motion.div className={styles.overlay} style={{ scale, transformPerspective: 1200 }} />
        <div className={styles.content}>
          <div className={styles.mark}>
            <Image src={t.icon} alt="" fill sizes="120px" className={styles.markImg} />
          </div>
          <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
          <Reveal y={20} delay={0.3} className={styles.cta}>
            <Button href={t.cta.href} variant="fillLight" arrow>
              {t.cta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
