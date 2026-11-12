"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { useContent } from "@/content/client";
import { useAppear } from "@/lib/useAppear";
import Reveal from "./Reveal";
import styles from "./TrustAvatars.module.css";

const OFFSETS = [0, -24, -48, -73];
/** Note slide-in measured on the original: critically damped spring, 0.6s delay. */
const NOTE_SPRING = { type: "spring" as const, stiffness: 64, damping: 16, mass: 1, delay: 0.6 };

/** Overlapping client avatars that fan out when scrolled into view + satisfaction note. */
export default function TrustAvatars({
  text,
  tone = "dark",
  textReveal = false,
}: {
  /** Defaults to the shared satisfaction note from the content JSON */
  text?: string;
  tone?: "dark" | "light";
  /** Practice Areas instance: the note slides in 20px from the left */
  textReveal?: boolean;
}) {
  const { common } = useContent();
  const imgsRef = useRef<HTMLDivElement>(null);
  const fanned = useAppear(imgsRef, { once: !textReveal });
  const note = <p className={`p14 ${styles.text}`}>{text ?? common.satisfactionNote}</p>;
  return (
    <div className={`${styles.trust} ${tone === "light" ? styles.light : ""}`}>
      <div className={styles.imgs} ref={imgsRef}>
        {common.clientAvatars.map((src, i) => (
          <motion.div
            key={src}
            className={styles.avatar}
            style={{ left: i * 24 }}
            initial={{ x: OFFSETS[i] }}
            animate={fanned ? { x: 0 } : { x: OFFSETS[i], transition: { duration: 0 } }}
            transition={{ type: "spring", bounce: 0, duration: 1.2, delay: 0.4 }}
          >
            <Image src={src} alt={common.clientPhotoAlt} fill sizes="36px" className={styles.img} />
          </motion.div>
        ))}
      </div>
      {textReveal ? (
        <Reveal x={-20} y={0} transition={NOTE_SPRING} once={false} className={styles.textWrap}>
          {note}
        </Reveal>
      ) : (
        note
      )}
    </div>
  );
}
