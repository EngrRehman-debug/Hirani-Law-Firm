import type { Metadata } from "next";
import FaqBlock from "@/components/sections/shared/FaqBlock";
import ValuesGrid from "@/components/sections/shared/ValuesGrid";
import extra from "@/components/sections/shared/HiraniPages.module.css";
import SidebarFounder from "@/components/sections/shared/SidebarFounder";
import ContactForm from "@/components/ui/ContactForm";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent, setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import { slideSpring } from "@/lib/motion";
import styles from "./contact.module.css";
import RouteSeo from "@/components/layout/RouteSeo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  return routeMetadata(params, "/contact");
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  setRequestLocale((await params).lang);
  const { pages, site } = getContent();
  const t = pages.contact;
  const info = t.info;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(t.map)}`;
  return (
    <main className="page">
      <RouteSeo route={"/contact"} />
      <section className={styles.hero}>
        <div className={styles.heroWrapper}>
          <div className={styles.heading}>
            <SectionLabel className={styles.label}>{t.label}</SectionLabel>
            <h1 className={`h1 ${styles.title}`}>{t.title}</h1>
          </div>
        </div>
      </section>

      <section className={styles.consultation}>
        <div className={styles.wrapper}>
          <div className={styles.contacts}>
            <Reveal x={-50} y={0} transition={slideSpring} amount={0.5} className={styles.textCta}>
              <SidebarFounder chips="plainDark" />
              <p className={`p18 ${styles.text}`}>{t.text}</p>
              {/* office address, directions and hours (original contact page) */}
              <div className={`p16 ${extra.contactRows}`}>
                <div>
                  <p className={extra.contactLabel}>{info.addressLabel}</p>
                  {info.address.map((a) => (
                    <p key={a}>{a}</p>
                  ))}
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={extra.directions}>
                    {info.directionsLabel} →
                  </a>
                </div>
                <div>
                  <p className={extra.contactLabel}>{info.hoursLabel}</p>
                  {info.hours.map((h) => (
                    <p key={h.day} className={extra.hoursRow}>
                      <span>{h.day}</span>
                      <span>{h.time}</span>
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className={styles.spacer} />
            <Reveal x={50} y={0} transition={slideSpring} amount={0.5} className={styles.form}>
              <ContactForm variant="bordered" />
            </Reveal>
          </div>
          {/* office location (same embed as the original contact page) */}
          <iframe
            className={`${extra.map} ${extra.mapWide}`}
            title="Hirani Law Firm location"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(t.map)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <ValuesGrid
            label={t.whyApart.label}
            heading={t.whyApart.heading}
            items={t.whyApart.items}
            showCta={false}
            showLadyJustice={false}
            columns={2}
          />
          <FaqBlock askHref={`mailto:${site.founder.email}`} fullButton variant="page" />
        </div>
      </section>
    </main>
  );
}
