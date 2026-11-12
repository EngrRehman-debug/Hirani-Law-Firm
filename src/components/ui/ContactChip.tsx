import { MailIcon, PhoneIcon } from "./Icons";
import styles from "./ContactChip.module.css";

type Props = {
  type: "mail" | "phone";
  value: string;
  href: string;
  /** "boxed" = light square icon box (Style 1), "plain" = white icon on dark (Style 2), "plainDark" = Style 2 on light backgrounds */
  variant?: "boxed" | "plain" | "plainDark";
  /** Breakpoint from which the boxed icon shrinks to 40px (default: tablet) */
  compactFrom?: "tablet" | "phone";
};

export default function ContactChip({ type, value, href, variant = "boxed", compactFrom = "tablet" }: Props) {
  const Icon = type === "mail" ? MailIcon : PhoneIcon;
  return (
    <a href={href} className={`${styles.chip} ${styles[variant]} ${compactFrom === "phone" ? styles.compactPhone : styles.compactTablet}`}>
      <span className={styles.icon}>
        <Icon width={24} height={24} />
      </span>
      <span className={styles.label}>{value}</span>
    </a>
  );
}
