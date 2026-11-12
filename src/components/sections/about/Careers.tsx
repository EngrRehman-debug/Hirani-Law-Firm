import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent } from "@/content";
import styles from "./Careers.module.css";

export default function Careers() {
  const t = getContent().sections.careers;
  return (
    <section className={styles.section} id="careers">
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>
            <SectionLabel tone="light" className={styles.label}>
              {t.label}
            </SectionLabel>
            <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
          </div>
          <div className={styles.list}>
            {t.jobs.map((j) => (
              <div key={j.title} className={styles.job}>
                <h6 className={`h6 ${styles.jobTitle}`}>
                  <a href={j.href} target="_blank" rel="noopener" className={styles.jobLink}>
                    {j.title}
                  </a>
                </h6>
                <div className={styles.details}>
                  <div className={styles.data}>
                    <p className={`p14 ${styles.meta}`}>{j.type}</p>
                    <p className={`p14 ${styles.meta}`}>{j.location}</p>
                  </div>
                  <div className={styles.button}>
                    <Button href={j.href} variant="fillLight" arrow>
                      {t.cta}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
