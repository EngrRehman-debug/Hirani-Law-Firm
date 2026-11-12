"use client";

import Image from "next/image";
import { motion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useContent } from "@/content/client";
import { useScrollTarget } from "@/lib/useScrollTarget";
import styles from "./VideoGallery.module.css";

/**
 * Four portrait images around a video. The video starts zoomed to 3.2× (covering the screen) and
 * scales down to its slot as the section scrolls in. Phones show a simple stacked layout.
 */
export default function VideoGallery() {
  const t = useContent().sections.videoGallery;
  const [img1, img2, img3, img4] = t.images;
  const trigger = useRef<HTMLDivElement>(null);
  const progress = useScrollTarget(trigger, { stiffness: 400, damping: 60 });
  const scale = useTransform(progress, [0, 1], [3.2, 1]);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 809px)");
    const set = () => setIsPhone(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.row}>
        <div className={`${styles.image} ${styles.outer}`}>
          <Image src={img1} alt={t.imageAlt} fill sizes="232px" className={styles.img} />
        </div>
        <div className={styles.image}>
          <Image src={img2} alt={t.imageAlt} fill sizes="(max-width: 809px) 100vw, 250px" className={styles.img} />
        </div>
        <motion.div className={styles.video} style={{ scale: isPhone ? 1 : scale }}>
          <video
            className={styles.videoEl}
            src={t.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </motion.div>
        <div className={styles.image}>
          <Image src={img3} alt={t.imageAlt} fill sizes="(max-width: 809px) 100vw, 250px" className={styles.img} />
        </div>
        <div className={`${styles.image} ${styles.outer}`}>
          <Image src={img4} alt={t.imageAlt} fill sizes="232px" className={styles.img} />
        </div>
      </div>
      <div ref={trigger} className={styles.trigger} aria-hidden />
    </section>
  );
}
