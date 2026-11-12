import FaqBlock from "@/components/sections/shared/FaqBlock";
import ProcessStepper from "@/components/sections/shared/ProcessStepper";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent } from "@/content";
import styles from "./ProcessSection.module.css";

export default function ProcessSection() {
  const t = getContent().sections.process;
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.process}>
          <Reveal className={styles.title}>
            <SectionLabel className={styles.label}>{t.label}</SectionLabel>
            <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
          </Reveal>
          <Reveal delay={0.1} className={styles.stepper}>
            <ProcessStepper />
          </Reveal>
        </div>
        <FaqBlock />
      </div>
    </section>
  );
}
