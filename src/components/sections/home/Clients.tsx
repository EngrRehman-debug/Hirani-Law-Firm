"use client";

import { motion, useAnimationFrame, useInView, useMotionValue } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/content/client";
import { cardSpring } from "@/lib/motion";
import styles from "./Clients.module.css";

const ITEM_W = 276;
const SPEED = 50; // px per second (matches the original ticker)

/** Infinite, left-scrolling ticker of client logos. */
export default function Clients() {
  const t = useContent().sections.clients;
  const LOGOS = t.logos;
  const x = useMotionValue(0);
  const setW = LOGOS.length * ITEM_W;
  const last = useRef<number | null>(null);
  const view = useRef<HTMLDivElement>(null);
  // like Framer's Ticker, the track only moves while it is on screen
  const inView = useInView(view);

  useAnimationFrame((t) => {
    const prev = last.current ?? t;
    last.current = t;
    if (!inView) return;
    let next = x.get() - ((t - prev) / 1000) * SPEED;
    if (next <= -setW) next += setW;
    x.set(next);
  });

  return (
    <section className={styles.section} aria-label={t.ariaLabel}>
      <div className={styles.wrapper} ref={view}>
        <Reveal y={0} transition={cardSpring} once={false} className={styles.viewport}>
          <motion.ul className={styles.track} style={{ x }}>
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
              <li key={i} className={`${styles.item} ${i % 2 === 0 ? styles.boxed : styles.middle}`} aria-hidden={i >= LOGOS.length}>
                <div className={styles.content}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt={i < LOGOS.length ? logo.alt : ""} className={styles.logo} />
                </div>
              </li>
            ))}
          </motion.ul>
        </Reveal>
      </div>
    </section>
  );
}
