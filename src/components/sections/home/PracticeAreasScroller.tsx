"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import MaskIcon from "@/components/ui/MaskIcon";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { useContent } from "@/content/client";
import { getFeaturedPracticeAreas } from "@/data/practiceAreas";
import styles from "./PracticeAreasScroller.module.css";

const TRIGGER_HEIGHT = 300;

/**
 * Sticky, scroll-linked practice area cards.
 * Every 400px of scroll one more card slides left and "stacks" on the previous one,
 * leaving only a narrow strip (142px desktop / 42px tablet) visible. Phones get a simple list.
 */
export default function PracticeAreasScroller() {
  const content = useContent();
  const t = content.sections.practiceScroller;
  const { readMore } = content.common;
  const PRACTICE_AREAS = getFeaturedPracticeAreas(content);
  const rowRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const row = rowRef.current;
      const triggers = triggersRef.current;
      if (!row || !triggers) return;
      const items = Array.from(row.children) as HTMLElement[];
      if (window.innerWidth < 810) {
        items.forEach((el) => (el.style.transform = ""));
        return;
      }
      const step = window.innerWidth >= 1280 ? 142 : 42;
      const vh = window.innerHeight;
      const cardW = items[0]?.offsetWidth ?? 0;
      const trig = Array.from(triggers.children) as HTMLElement[];
      let shift = 0;
      items.forEach((el, i) => {
        if (i > 0) {
          const t = trig[i - 1];
          const top = t ? t.getBoundingClientRect().top : Infinity;
          const p = Math.min(1, Math.max(0, (vh - top) / TRIGGER_HEIGHT));
          shift += (cardW - step) * p;
        }
        el.style.transform = `translateX(${-shift}px)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.titleRow}>
        <Reveal className={styles.title}>
          <SectionLabel tone="light">{t.label}</SectionLabel>
          <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
        </Reveal>
        <Reveal className={styles.titleCta}>
          <Button href={t.cta.href} variant="fillLight" arrow>
            {t.cta.label}
          </Button>
        </Reveal>
      </div>

      <div className={styles.cardsSticky}>
        <div className={styles.row} ref={rowRef}>
          {PRACTICE_AREAS.map((area, i) => (
            <div className={styles.item} key={area.slug} style={{ zIndex: i + 1 }}>
              <Reveal className={styles.mobileReveal} once={false}>
                <article className={styles.card}>
                  <div className={styles.cardInner}>
                    <MaskIcon src={area.icon} size={64} className={styles.icon} />
                    <div className={styles.text}>
                      <h6 className={`h6 ${styles.cardTitle}`}>{area.title}</h6>
                      <div className={styles.divider} />
                      <div className={styles.description}>
                        <p className={`p18 ${styles.cardText}`}>{area.excerpt}</p>
                        <Button href={area.href} variant="fillLight" arrow>
                          {readMore}
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
          <div className={`${styles.item} ${styles.ctaItem}`} style={{ zIndex: 7 }}>
            <Reveal className={styles.mobileReveal}>
            <article className={`${styles.card} ${styles.ctaCard}`}>
              <div className={styles.cardInner}>
                <div className={styles.ctaText}>
                  <h4 className={`h4 ${styles.ctaTitle}`}>{t.ctaCard.title}</h4>
                  <div className={styles.description}>
                    <p className={`p18 ${styles.cardText}`}>{t.ctaCard.text}</p>
                    <Button href={t.ctaCard.cta.href} variant="fillLight" arrow>
                      {t.ctaCard.cta.label}
                    </Button>
                  </div>
                </div>
              </div>
            </article>
            </Reveal>
          </div>
        </div>
      </div>

      <div className={styles.triggers} ref={triggersRef} aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={styles.trigger} />
        ))}
      </div>

      <div className={styles.bg} aria-hidden>
        <div className={styles.gradient} />
        <div className={styles.overlay} />
        <div className={styles.bgSticky}>
          <Image src="/images/EbsUm8k6mAUCRV2rTnKd3714o.webp" alt="" fill sizes="100vw" className={styles.bgImg} />
        </div>
      </div>
    </section>
  );
}
