"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useAppear } from "@/lib/useAppear";
import styles from "./ParallaxImage.module.css";

type Props = {
  src: string;
  alt: string;
  /** Same "intensity" as the original Parallax component (default 20) */
  intensity?: number;
  /** Inner zoom applied to the image wrapper (original uses 1.2) */
  zoom?: number;
  className?: string;
  priority?: boolean;
  /** Re-run the zoom whenever the image re-enters the viewport */
  replayZoom?: boolean;
  /** Size the parallax layer at 120% of the frame height instead of the fixed 0.6856 aspect (attorneys hero) */
  fillHeight?: boolean;
  /** Phone layout shows the photo without the zoom-in (home / About founder) */
  noPhoneZoom?: boolean;
};

/**
 * Image that drifts vertically while the page scrolls.
 * offset = (elementTop / viewportHeight) * intensity * -5  (identical formula to the original).
 * The layer also zooms from 1.2× to 1× the first time it scrolls into view.
 */
export default function ParallaxImage({
  src,
  alt,
  intensity = 20,
  zoom = 1.2,
  className,
  priority,
  replayZoom = false,
  fillHeight = false,
  noPhoneZoom = false,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  // the zoom is triggered by the (unscaled) frame being half visible, as on the original
  const zoomRef = useRef<HTMLDivElement>(null);
  const zoomed = useAppear(zoomRef, { amount: 0.5, once: !replayZoom });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (!box.current || !img.current) return;
      const top = box.current.getBoundingClientRect().top;
      const y = (top / window.innerHeight) * intensity * -5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (img.current) img.current.style.transform = `translateY(${y}px)`;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div ref={zoomRef} className={`${styles.frame} ${noPhoneZoom ? styles.noPhoneZoom : ""} ${className ?? ""}`}>
      <motion.div
        className={`${styles.zoom} ${fillHeight ? styles.fillZoom : ""}`}
        initial={{ scale: zoom }}
        animate={zoomed ? { scale: 1 } : { scale: zoom, transition: { duration: 0 } }}
        transition={{ type: "spring", bounce: 0, duration: 0.7 }}
      >
        <div ref={box} className={styles.box}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={img} src={src} alt={alt} className={styles.img} loading={priority ? "eager" : "lazy"} />
        </div>
      </motion.div>
    </div>
  );
}
