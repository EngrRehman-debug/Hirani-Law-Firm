"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { useAppear } from "@/lib/useAppear";
import Button from "@/components/ui/Button";
import { Star } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/content/client";
import styles from "./ImageCta.module.css";

/** Large image with a frosted CTA card on the right ("We take cases personally…"). */
export default function ImageCta({
  image,
  replayText = false,
  copy,
  fullImage = false,
}: {
  image?: string;
  /** Practice Areas instance: the card text re-animates on every entry */
  replayText?: boolean;
  /** Card copy instead of the default (category pages: attorney band) */
  copy?: {
    title: string;
    text: string;
    cta: { label: string; href: string };
    imageAlt: string;
  };
  /** Size the block to the photo's 3:2 ratio so the whole photo shows (no top/bottom crop) */
  fullImage?: boolean;
}) {
  const content = useContent();
  const t = { ...content.sections.imageCta, ...copy };
  const imageRef = useRef<HTMLDivElement>(null);
  // the photo zoom replays every time the block comes back into view
  const zoomed = useAppear(imageRef, { amount: 0.5, once: false });
  return (
    <div className={`${styles.block} ${fullImage ? styles.fullImage : ""}`}>
      <div className={styles.card}>
        <Reveal amount={0.5} once={!replayText} className={styles.text}>
          <h6 className={`h6 ${styles.title}`}>{t.title}</h6>
          <p className={`p16 ${styles.body}`}>{t.text}</p>
          <div>
            <Button href={t.cta.href} variant="fillLight" arrow>
              {t.cta.label}
            </Button>
          </div>
        </Reveal>
        <div className={styles.rating}>
          <div className={styles.rate}>
            <p className={`p16 ${styles.score}`}>{content.common.rating}</p>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  className={styles.star}
                  initial={{ rotate: 45, y: 20 }}
                  whileInView={{ rotate: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.7,
                    delay: 0.3 + i * 0.1,
                  }}
                >
                  <Star width={14} height={14} />
                </motion.span>
              ))}
            </div>
          </div>
          <p className={`p14 ${styles.testimonial}`}>{t.testimonial}</p>
        </div>
      </div>
      <motion.div
        ref={imageRef}
        className={styles.image}
        initial={{ scale: 1.2 }}
        animate={zoomed ? { scale: 1 } : { scale: 1.2, transition: { duration: 0 } }}
        transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
        style={{ transformPerspective: 1200 }}
      >
        <Image src={image ?? t.image} alt={t.imageAlt} fill sizes="100vw" className={styles.img} />
      </motion.div>
    </div>
  );
}
