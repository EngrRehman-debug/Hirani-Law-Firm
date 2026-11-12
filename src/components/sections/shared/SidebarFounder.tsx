import Image from "next/image";
import ContactChip from "@/components/ui/ContactChip";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { getContent } from "@/content";
import styles from "./SidebarFounder.module.css";
import { HIDDEN } from "@/lib/hidden";

/** Founder card used in detail-page sidebars: portrait, name + signature, contact chips. */
type Props = {
  /** "boxed" (detail sidebars) or "plainDark" (contact page, Style 2 chips) */
  chips?: "boxed" | "plainDark";
  className?: string;
};

export default function SidebarFounder({ chips = "boxed", className }: Props) {
  const founder = getContent().site.founder;
  return (
    <div className={`${styles.founder} ${className ?? ""}`}>
      <ParallaxImage className={styles.image} src={founder.portrait} alt={founder.portraitAltShort} zoom={1} />
      <div className={styles.data}>
        <p className={`p14 ${styles.role}`}>{founder.role}</p>
        <p className={`p18 ${styles.name}`}>{founder.name}</p>
        {!HIDDEN.founderSignature && (
          <div className={styles.signature}>
            <Image src={founder.signature} alt="" fill sizes="171px" />
          </div>
        )}
      </div>
      <div className={styles.contacts}>
        <ContactChip
          type="mail"
          value={founder.email}
          href={`mailto:${founder.email}`}
          variant={chips}
          compactFrom="phone"
        />
        <ContactChip
          type="phone"
          value={founder.phone}
          href={`tel:${founder.phone}`}
          variant={chips}
          compactFrom="phone"
        />
      </div>
    </div>
  );
}
