import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./Icons";
import styles from "./Button.module.css";

export type ButtonVariant = "fillLight" | "fillDark" | "outlineLight" | "outlineDark";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  /** Use the compact "Phone" button style from this breakpoint down (default: phone only) */
  compactFrom?: "tablet" | "phone" | "never";
  onClick?: () => void;
};

/**
 * Primary CTA button. On hover the background turns olive, the label turns white and the
 * arrow slides out to the top-right while a second arrow slides in from the bottom-left.
 */
export default function Button({
  href,
  children,
  variant = "fillLight",
  arrow = false,
  className,
  type = "button",
  fullWidth = false,
  compactFrom = "phone",
  onClick,
}: Props) {
  const cls = [styles.button, styles[variant], fullWidth ? styles.full : "", compactFrom === "tablet" ? styles.compactTablet : "", compactFrom === "never" ? styles.noCompact : "", className ?? ""].join(" ");
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.suffix} aria-hidden>
          <span className={`${styles.icon} ${styles.iconA}`}>
            <ArrowUpRight width="100%" height="100%" />
          </span>
          <span className={`${styles.icon} ${styles.iconB}`}>
            <ArrowUpRight width="100%" height="100%" />
          </span>
        </span>
      )}
    </>
  );

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={cls}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {content}
    </button>
  );
}
