"use client";

import Image from "next/image";
import { useState } from "react";
import { useContent } from "@/content/client";
import styles from "./ProcessStepper.module.css";

type Step = { title: string; text: string; image: string; /** the original tablet layout shows other copy */ tabletText?: string };

/**
 * Three process steps. On desktop the hovered step expands to double width and reveals its photo;
 * on tablet/phone every step is shown "open".
 */
export default function ProcessStepper() {
  const steps: Step[] = useContent().sections.process.steps;
  const [active, setActive] = useState(0);
  return (
    <div className={styles.stepper}>
      {steps.map((s, i) => (
        <div
          key={s.title}
          className={`${styles.step} ${active === i ? styles.open : ""}`}
          onMouseEnter={() => setActive(i)}
        >
          <div className={styles.number}>
            <p className="p14">{String(i + 1).padStart(2, "0")}</p>
          </div>
          <div className={styles.text}>
            <p className={`h5 ${styles.title}`}>{s.title}</p>
            <p className={`p18 balance ${styles.body}`}>
              {s.tabletText ? (
                <>
                  <span className={styles.desktopOnly}>{s.text}</span>
                  <span className={styles.tabletOnly}>{s.tabletText}</span>
                  <span className={styles.phoneOnly}>{s.text}</span>
                </>
              ) : (
                s.text
              )}
            </p>
          </div>
          <div className={styles.image}>
            <Image src={s.image} alt="" fill sizes="820px" className={styles.img} />
          </div>
          <div className={styles.overlay} />
        </div>
      ))}
    </div>
  );
}
