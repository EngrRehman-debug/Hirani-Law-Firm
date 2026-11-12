import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";
import styles from "./ArrowLink.module.css";

type Props = { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string };

/** Text link with a right arrow. On hover an underline grows in and the arrow tilts up-right. */
export default function ArrowLink({ href, children, tone = "light", className }: Props) {
  return (
    <Link href={href} className={`${styles.link} ${styles[tone]} ${className ?? ""}`}>
      <span className={styles.text}>
        <span className={styles.label}>{children}</span>
        <ArrowRight className={styles.arrow} width={16} height={16} strokeWidth={1.5} />
      </span>
      <span className={styles.line}>
        <span className={styles.lineFill} />
      </span>
    </Link>
  );
}
