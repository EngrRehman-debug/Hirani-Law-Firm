import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./NavLink.module.css";

type Props = {
  href: string;
  children: ReactNode;
  current?: boolean;
  /** "light" = white text (dark backgrounds), "dark" = near-black text */
  tone?: "light" | "dark";
  className?: string;
};

/** Text link whose underline fades in on hover (and stays visible for the current page). */
export default function NavLink({ href, children, current = false, tone = "light", className }: Props) {
  return (
    <Link
      href={href}
      className={`${styles.link} ${styles[tone]} ${current ? styles.current : ""} ${className ?? ""}`}
      aria-current={current ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
