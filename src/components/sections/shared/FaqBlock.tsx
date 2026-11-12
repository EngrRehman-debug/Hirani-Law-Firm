import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import ListHeader from "@/components/ui/ListHeader";
import Reveal from "@/components/ui/Reveal";
import { getContent } from "@/content";
import { getFaqs } from "@/data/faqs";
import styles from "./FaqBlock.module.css";

/** "Help & FAQs" header, intro + CTA on the left and the accordion on the right. */
type Props = {
  id?: string;
  askHref?: string;
  /** Keep the full-size "Desktop" CTA button on phones (contact page) */
  fullButton?: boolean;
  /** "home": header/accordion wrappers animate as on the home page; "page": contact page timings */
  variant?: "home" | "page";
};

export default function FaqBlock({ id, askHref = "/contact", fullButton = false, variant = "home" }: Props) {
  const t = getContent().sections.faq;
  const home = variant === "home";
  const accordion = (
    <Reveal y={30} once={home} className={home ? undefined : styles.accordion}>
      <Accordion items={getFaqs()} replay={!home} />
    </Reveal>
  );
  return (
    <div className={styles.faqs} id={id}>
      <ListHeader title={t.title} subtitle={t.subtitle} reveal={home} replay={!home} />
      <div className={styles.row}>
        <Reveal y={home ? 40 : 64} once={home} className={styles.cta}>
          <p className={`p18 ${styles.intro}`}>{t.intro}</p>
          <div className={styles.button}>
            <p className={`p16 ${styles.still}`}>{t.still}</p>
            <Button href={askHref} variant="fillDark" arrow compactFrom={fullButton ? "never" : "phone"}>
              {t.cta}
            </Button>
          </div>
        </Reveal>
        <div className={styles.spacer} />
        {home ? <Reveal className={styles.accordion}>{accordion}</Reveal> : accordion}
      </div>
    </div>
  );
}
