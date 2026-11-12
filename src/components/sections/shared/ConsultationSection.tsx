import Image from "next/image";
import Button from "@/components/ui/Button";
import ContactChip from "@/components/ui/ContactChip";
import ContactForm from "@/components/ui/ContactForm";
import LineDraw from "@/components/ui/LineDraw";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent } from "@/content";
import { slideSpring } from "@/lib/motion";
import styles from "./ConsultationSection.module.css";

/** Dark image section with the intro on the left and the consultation form on the right. */
export default function ConsultationSection({ id }: { id?: string }) {
  const { sections, site } = getContent();
  const t = sections.consultation;
  const CONTACT = site.contact;
  return (
    <section className={styles.section} id={id}>
      <div className={styles.wrapper}>
        <div className={styles.contacts}>
          <Reveal x={-50} y={0} transition={slideSpring} amount={0.5} className={styles.textCta}>
            <div className={styles.text}>
              <div className={styles.title}>
                <SectionLabel tone="light">{t.label}</SectionLabel>
                <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
              </div>
              <div className={styles.intro}>
                <p className={`p18 ${styles.para}`}>{t.intro}</p>
                <div>
                  <Button href={t.cta.href} variant="fillLight" arrow>
                    {t.cta.label}
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.contactInfo}>
              <p className={`p18 ${styles.para}`}>{t.contactText}</p>
              <LineDraw tone="light" />
              <div className={styles.chips}>
                <ContactChip type="mail" variant="plain" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
                <ContactChip type="phone" variant="plain" value={CONTACT.phone} href={`tel:${CONTACT.phone}`} />
              </div>
            </div>
          </Reveal>
          <div className={styles.spacer} />
          <Reveal x={50} y={0} transition={slideSpring} amount={0.5} className={styles.form}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
      <div className={styles.bg} aria-hidden>
        <Image src={t.image} alt="" fill sizes="100vw" className={styles.bgImg} />
        <div className={styles.overlay} />
        <div className={styles.gradient} />
      </div>
    </section>
  );
}
