"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { useAppear } from "@/lib/useAppear";
import styles from "./ZoomImage.module.css";

/** 3:2 image that zooms from 1.2× to 1× the first time it scrolls into view. */
type Props = {
  src: string;
  alt: string;
  className?: string;
  ratio?: number;
  sizes?: string;
  priority?: boolean;
  /** Re-run the zoom whenever the image re-enters the viewport (case study gallery) */
  replay?: boolean;
};

export default function ZoomImage({ src, alt, className, ratio, sizes, priority, replay = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const zoomed = useAppear(ref, { amount: 0.5, once: !replay });
  return (
    <div className={`${styles.frame} ${className ?? ""}`} style={ratio ? { aspectRatio: `${ratio} / 1` } : undefined}>
      <motion.div
        ref={ref}
        className={styles.inner}
        initial={{ scale: 1.2 }}
        animate={zoomed ? { scale: 1 } : { scale: 1.2, transition: { duration: 0 } }}
        transition={{ type: "spring", bounce: 0, duration: 0.7 }}
      >
        <Image src={src} alt={alt} fill sizes={sizes ?? "(max-width: 809px) 100vw, 680px"}
          priority={priority} className={styles.img} />
      </motion.div>
    </div>
  );
}
