import Button from "@/components/ui/Button";
import CaseCard from "@/components/ui/CaseCard";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import TrustAvatars from "@/components/ui/TrustAvatars";
import { HIDDEN } from "@/lib/hidden";
import { getContent } from "@/content";
import { getFeaturedCases } from "@/data/caseStudies";
import styles from "./HomeCaseStudies.module.css";

/** Dark section with case study cards that stack on top of each other while scrolling. */
export default function HomeCaseStudies() {
  const t = getContent().sections.homeCaseStudies;
  const FEATURED_CASES = getFeaturedCases();
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.titleRow}>
          <Reveal className={styles.title}>
            <SectionLabel tone="light">{t.label}</SectionLabel>
            <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
          </Reveal>
          <Reveal className={styles.trust}>
            {!HIDDEN.trustAvatars && <TrustAvatars />}
          </Reveal>
        </div>

        <div className={styles.casesCta}>
          <div className={styles.cases}>
            {FEATURED_CASES.map((c, i) => (
              <div
                key={c.slug}
                className={`${styles.cardWrap} ${i < FEATURED_CASES.length - 1 ? styles.sticky : ""}`}
                style={{ zIndex: i + 1 }}
              >
                <CaseCard item={c} />
              </div>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <div className={styles.ctaSpacer} />
            <Reveal className={styles.cta}>
              <p className={`p18 balance ${styles.ctaText}`}>{t.ctaText}</p>
              <Reveal y={20} amount={0.5} className={styles.ctaButtons}>
                <Button href={t.primaryCta.href} variant="fillLight" arrow>
                  {t.primaryCta.label}
                </Button>
                <Button href={t.secondaryCta.href} variant="outlineLight">
                  {t.secondaryCta.label}
                </Button>
              </Reveal>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
