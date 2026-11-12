import AttorneyCard from "@/components/ui/AttorneyCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent } from "@/content";
import { getAttorneys, getFeaturedAttorneys } from "@/data/attorneys";
import styles from "./HomeAttorneys.module.css";

/**
 * Desktop: three staggered columns – the founder's card stays sticky on the left while the other
 * columns scroll past with 900px gaps. Tablet/phone: a plain grid with all six attorneys.
 * Column order comes from `collections.featuredAttorneys`: [sticky, col2 top, col2 bottom, col3 top, col3 bottom].
 */
export default function HomeAttorneys() {
  const t = getContent().sections.homeAttorneys;
  const ATTORNEYS = getAttorneys();
  const [lead, ...rest] = getFeaturedAttorneys();
  const columns = [rest.slice(0, 2), rest.slice(2, 4)];
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <Reveal className={styles.title}>
          <SectionLabel className={styles.label}>{t.label}</SectionLabel>
          <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
        </Reveal>

        <div className={styles.body}>
          {/* Desktop staggered layout */}
          <div className={styles.columns}>
            <div className={`${styles.col} ${styles.sticky}`}>
              {lead && (
                <Reveal amount={0.5} delay={0}>
                  <AttorneyCard attorney={lead} />
                </Reveal>
              )}
            </div>
            {columns.map((col, c) => (
              <div key={c} className={styles.col}>
                {col.map((a) => [
                  <div key={`${a.slug}-space`} className={styles.space} />,
                  <Reveal key={a.slug} amount={0.5} delay={0}>
                    <AttorneyCard attorney={a} />
                  </Reveal>,
                ])}
              </div>
            ))}
          </div>

          {/* Tablet / phone grid */}
          <div className={styles.grid}>
            {ATTORNEYS.map((a) => (
              <Reveal key={a.slug} amount={0.5} delay={0}>
                <AttorneyCard attorney={a} link={false} size="tablet" />
              </Reveal>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <div className={styles.ctaSpacer} />
            <Reveal className={styles.cta}>
              <p className={`p18 balance ${styles.ctaText}`}>
                <span className={styles.desktopText}>{t.ctaTextDesktop}</span>
                <span className={styles.mobileText}>{t.ctaTextMobile}</span>
              </p>
              <Reveal y={20} amount={0.5} className={styles.ctaButtons}>
                <Button href={t.primaryCta.href} variant="fillDark" arrow compactFrom="tablet">
                  {t.primaryCta.label}
                </Button>
                <Button href={t.secondaryCta.href} variant="outlineDark" compactFrom="tablet">
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
