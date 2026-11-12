import type { ReactNode } from "react";
import styles from "./SectionLabel.module.css";

type Props = {
  children: ReactNode;
  /** "accent" = olive text/divider (light bg), "light" = white divider + gray text (dark bg) */
  tone?: "accent" | "light";
  /** Divider placed after the text (right-aligned subtitles) */
  align?: "left" | "right";
  className?: string;
};

/** Small eyebrow label: 32px divider + 14px text. */
export default function SectionLabel({ children, tone = "accent", align = "left", className }: Props) {
  return (
    <div className={`${styles.label} ${styles[tone]} ${align === "right" ? styles.right : ""} ${className ?? ""}`}>
      {align === "left" && <span className={styles.divider} />}
      <p className={`p14 ${styles.text}`}>{children}</p>
      {align === "right" && <span className={styles.divider} />}
    </div>
  );
}
