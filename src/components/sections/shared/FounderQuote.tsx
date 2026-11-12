import Image from "next/image";
import ContactChip from "@/components/ui/ContactChip";
import { QuoteMark } from "@/components/ui/Icons";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import { getContent } from "@/content";
import { slideSpring } from "@/lib/motion";
import styles from "./FounderQuote.module.css";
import { HIDDEN } from "@/lib/hidden";

/** Founder portrait + signature on the left, values statement and quote on the right. */
type Props = {
  emailLabel?: string;
  /** Phone layout shows the statement above the founder portrait (About page) */
  contentFirstOnPhone?: boolean;
  /** Side slide-ins (About page); the Practice Areas instance is static */
  animate?: boolean;
};

export default function FounderQuote({ emailLabel, contentFirstOnPhone = false, animate = true }: Props) {
  const content = getContent();
  const t = content.sections.founderQuote;
  const founder = content.site.founder;
  const Left = animate ? Reveal : "div";
  const Right = animate ? Reveal : "div";
  const leftProps = animate ? { x: -50, y: 0, transition: slideSpring, amount: 0.3 } : {};
  const rightProps = animate ? { x: 50, y: 0, transition: slideSpring, amount: 0.5 } : {};
  return (
    <div className={`${styles.row} ${contentFirstOnPhone ? styles.contentFirst : ""}`}>
      <Left {...leftProps} className={styles.founder}>
        <div className={styles.data}>
          <p className={`p18 ${styles.name}`}>{founder.name}</p>
          <p className={`p14 ${styles.role}`}>{founder.role}</p>
          {!HIDDEN.founderSignature && (
            <div className={styles.signature}>
              <Image src={founder.signature} alt="" fill sizes="171px" />
            </div>
          )}
        </div>
        <ParallaxImage
          className={styles.portrait}
          src={founder.portrait}
          alt={founder.portraitAlt}
          replayZoom={!animate}
          noPhoneZoom={animate}
        />
      </Left>
      <div className={styles.spacer} />
      <Right {...rightProps} className={styles.content}>
        <h2 className={`h2 balance ${styles.heading}`}>{t.heading}</h2>
        <div className={styles.quote}>
          <div className={styles.divider} />
          <div className={styles.quoteRow}>
            <div className={styles.quoteText}>
              <p className={`serif20 ${styles.quoteLead}`}>{t.lead}</p>
              <p className={`p18 ${styles.quoteBody}`}>{t.text}</p>
            </div>
            <QuoteMark className={styles.mark} />
          </div>
          <div className={styles.contacts}>
            <ContactChip type="mail" value={emailLabel ?? t.emailLabel} href={`mailto:${founder.email}`} />
            <ContactChip type="phone" value={founder.phone} href={`tel:${founder.phone}`} />
          </div>
        </div>
      </Right>
    </div>
  );
}
