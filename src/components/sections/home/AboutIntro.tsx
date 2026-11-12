import Button from "@/components/ui/Button";
import CheckList from "@/components/ui/CheckList";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import TopResults from "@/components/sections/shared/TopResults";
import { getContent } from "@/content";
import styles from "./AboutIntro.module.css";
import { HIDDEN } from "@/lib/hidden";

export default function AboutIntro() {
  const t = getContent().sections.aboutIntro;
  return (
    <section className={styles.section} id="hero-next">
      <div className={styles.wrapper}>
        <div className={styles.imageText}>
          <div className={styles.textCol}>
            <Reveal className={styles.text}>
              <div className={styles.title}>
                <SectionLabel>{t.label}</SectionLabel>
                <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
              </div>
              <div className={styles.body}>
                <div className={styles.copy}>
                  <p className={`serif20 ${styles.intro}`}>{t.intro}</p>
                  <p className={`p18 ${styles.para}`}>{t.text}</p>
                </div>
                <Reveal y={20} amount={0.5} className={styles.ctas}>
                  <Button href={t.primaryCta.href} variant="fillDark" arrow>
                    {t.primaryCta.label}
                  </Button>
                  <Button href={t.secondaryCta.href} variant="outlineDark">
                    {t.secondaryCta.label}
                  </Button>
                </Reveal>
              </div>
            </Reveal>
            <CheckList className={styles.features} items={t.features} />
          </div>
          <div className={styles.spacer} />
          <ParallaxImage className={styles.image} src={t.image} alt={t.imageAlt} />
        </div>
        {!HIDDEN.verdicts && <TopResults />}
      </div>
    </section>
  );
}
