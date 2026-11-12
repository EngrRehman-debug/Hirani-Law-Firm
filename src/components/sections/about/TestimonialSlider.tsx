"use client";

import Image from "next/image";
import { animate, motion, useInView, useMotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import LineDraw from "@/components/ui/LineDraw";
import GoogleMark from "@/components/ui/GoogleMark";
import MaskIcon from "@/components/ui/MaskIcon";
import { Star } from "@/components/ui/Icons";
import { format } from "@/content";
import { useContent } from "@/content/client";
import styles from "./TestimonialSlider.module.css";

const GAP = 10;
const INTERVAL = 3500;
const SPRING = { type: "spring" as const, stiffness: 200, damping: 30, mass: 1 };

/**
 * Infinite autoplaying slideshow (Framer Slideshow): one card per view, advances every ~3.5s with a
 * spring. Desktop shows prev/next buttons on hover, tablet/phone show pagination dots.
 */
export default function TestimonialSlider({ bordered = true }: { bordered?: boolean }) {
  const { sections, common } = useContent();
  const copy = sections.testimonials;
  const ITEMS = copy.items;
  const count = ITEMS.length;
  const viewport = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(count); // start on the middle copy
  const x = useMotionValue(0);
  const hovering = useRef(false);
  const inView = useInView(viewport);

  useEffect(() => {
    const measure = () => setWidth(viewport.current?.offsetWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const step = width + GAP;

  // position without animation when width changes
  useEffect(() => {
    x.set(-index * step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const go = useCallback(
    (next: number) => {
      setIndex(next);
      animate(x, -next * step, {
        ...SPRING,
        onComplete: () => {
          // wrap around silently to the middle copy
          const n = count;
          if (next >= 2 * n || next < n) {
            const wrapped = ((next % n) + n) % n + n;
            x.set(-wrapped * step);
            setIndex(wrapped);
          }
        },
      });
    },
    [step, x, count],
  );

  useEffect(() => {
    if (!width || !inView) return;
    const t = setInterval(() => {
      if (!hovering.current) go(index + 1);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [go, index, width, inView]);

  const all = [...ITEMS, ...ITEMS, ...ITEMS];
  const active = index % ITEMS.length;

  return (
    <div
      className={`${styles.slider} ${bordered ? styles.bordered : ""}`}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div className={styles.viewport} ref={viewport}>
        <motion.ul className={styles.track} style={{ x }}>
          {all.map((t, i) => (
            <li key={i} className={styles.card} style={{ width: width || "100%" }} aria-hidden={i !== index}>
              <div className={styles.text}>
                <div className={styles.quoteText}>
                  <div className={styles.rate}>
                    <p className={`p16 ${styles.score}`}>{common.rating}</p>
                    <div className={styles.stars}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} width={16} height={15} />
                      ))}
                    </div>
                    {/* Google mark only on reviews that came from Google */}
                    {t.source === "Google" && <GoogleMark className={styles.google} />}
                  </div>
                  <h4 className={`h4 ${styles.quote}`}>{t.quote}</h4>
                </div>
                <div className={styles.client}>
                  <LineDraw />
                  <div className={styles.details}>
                    <p className={`p18 ${styles.name}`}>
                      <strong>{t.name}</strong>
                    </p>
                    <p className={`p14 ${styles.result}`}>{t.result}</p>
                  </div>
                </div>
              </div>
              <div className={styles.image}>
                <Image src={t.image} alt="" fill sizes="(max-width: 809px) 100vw, 680px" className={styles.img} />
                <div className={styles.cta}>
                  <MaskIcon src={t.icon} size={64} />
                  <p className={`serif20 ${styles.ctaText}`}>{copy.cardText}</p>
                </div>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>

      <div className={styles.arrows}>
        <button type="button" className={styles.arrow} aria-label={common.previous} onClick={() => go(index - 1)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg" alt={common.previousArrowAlt} />
        </button>
        <button type="button" className={styles.arrow} aria-label={common.next} onClick={() => go(index + 1)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg" alt={common.nextArrowAlt} />
        </button>
      </div>

      <div className={styles.dots}>
        {ITEMS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={format(common.goToSlide, { n: i + 1 })}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => go(ITEMS.length + i)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
