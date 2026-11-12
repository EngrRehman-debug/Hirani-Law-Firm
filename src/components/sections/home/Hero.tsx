"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import ArrowLink from "@/components/ui/ArrowLink";
import LineDraw from "@/components/ui/LineDraw";
import Reveal from "@/components/ui/Reveal";
import { ChevronDown } from "@/components/ui/Icons";
import { useContent } from "@/content/client";
import { EASE_HERO_IMAGE } from "@/lib/motion";
import styles from "./Hero.module.css";

/**
 * Home hero. Background image: appear zoom 1.2 → 1, then while scrolling it drifts down at 10% of the
 * scroll speed (parallax "speed 90") and scales up to 1.15 across the height of the following section.
 */
export default function Hero() {
  const t = useContent().pages.home.hero;
  const { scrollY: pageY } = useScroll();
  const [nextHeight, setNextHeight] = useState(1495);
  useEffect(() => {
    const measure = () => {
      const next = document.getElementById("hero-next");
      if (next) setNextHeight(next.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const scrollScale = useTransform(pageY, [0, nextHeight], [1, 1.15], { clamp: true });
  const scrollY = useTransform(pageY, (v) => v * 0.1);

  return (
    <section className={styles.hero} data-nav-hero>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.bg}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: EASE_HERO_IMAGE }}
        >
          <motion.div className={styles.bgScroll} style={{ scale: scrollScale, y: scrollY }}>
          <Image
            src={t.image}
            alt={t.imageAlt}
            fill
            priority
            sizes="100vw"
            className={styles.bgImg}
          />
          <div className={styles.overlay} />
          <div className={styles.gradient} />
          </motion.div>
        </motion.div>

        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.headline}>
              <Reveal onMount delay={0.4}>
                <h1 className={`h1 ${styles.title}`}>{t.title}</h1>
              </Reveal>
              <Reveal onMount delay={0.4}>
                <p className={`p18 balance ${styles.lead}`}>{t.text}</p>
              </Reveal>
              <Reveal onMount y={20} delay={0.4} duration={1.4} className={styles.ctas}>
                <Button href={t.primaryCta.href} variant="fillLight" arrow>
                  <span className={styles.labelFull}>{t.primaryCta.label}</span>
                  <span className={styles.labelShort}>{t.primaryCta.shortLabel}</span>
                </Button>
                <Button href={t.secondaryCta.href} variant="outlineLight">
                  <span className={styles.labelFull}>{t.secondaryCta.label}</span>
                  <span className={styles.labelShort}>{t.secondaryCta.shortLabel}</span>
                </Button>
              </Reveal>
            </div>

            <div className={styles.moving}>
              <div className={styles.movingText}>
                <Reveal onMount y={20} delay={0.2}>
                  <p className={`serif ${styles.tagline}`}>{t.tagline}</p>
                </Reveal>
              </div>
              <LineDraw tone="light" onMount delay={2} duration={1} />
              <div className={styles.data}>
                <Reveal onMount y={20} delay={0.2} className={styles.links}>
                  {t.links.map((l) => (
                    <ArrowLink key={l.href} href={l.href}>
                      {l.label}
                    </ArrowLink>
                  ))}
                </Reveal>
                <div className={styles.spacer} />
                <div className={styles.right}>
                  <Reveal onMount y={20} delay={0.2}>
                    <p className={`p16 ${styles.note}`}>{t.note}</p>
                  </Reveal>
                  <Reveal onMount y={20} delay={0.2} className={styles.scroll}>
                    <span className={`p14 ${styles.scrollText}`}>{t.scroll}</span>
                    <span className={styles.scrollIconBox}>
                      <motion.span
                        className={styles.scrollIcon}
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
                      >
                        <ChevronDown width={34} height={34} />
                      </motion.span>
                    </span>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
