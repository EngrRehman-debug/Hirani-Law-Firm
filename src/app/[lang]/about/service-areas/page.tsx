import type { Metadata } from "next";
import { Fragment } from "react";
import PageHero from "@/components/sections/shared/PageHero";
import ConsultationSection from "@/components/sections/shared/ConsultationSection";
import Button from "@/components/ui/Button";
import CheckList from "@/components/ui/CheckList";
import LineDraw from "@/components/ui/LineDraw";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent, setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import extra from "@/components/sections/shared/HiraniPages.module.css";
import styles from "../../practice-areas/[category]/[slug]/detail.module.css";
import StickyAside from "@/components/ui/StickyAside";
import RouteSeo from "@/components/layout/RouteSeo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about/service-areas">): Promise<Metadata> {
  return routeMetadata(params, "/about/service-areas");
}

export default async function ServiceAreasPage({ params }: PageProps<"/[lang]/about/service-areas">) {
  setRequestLocale((await params).lang);
  const t = getContent().pages.serviceAreas;
  const card = t.contactCard;
  return (
    <main className="page">
      <RouteSeo route={"/about/service-areas"} />
      <PageHero title={t.hero.title} image={t.hero.image} imagePosition="50% 50%">
        <Reveal onMount y={20} delay={0.5}>
          <p className={`p18 balance ${extra.heroText}`}>{t.hero.text}</p>
        </Reveal>
      </PageHero>

      <section className={styles.section}>
        <div className={styles.wrapper}>
          <StickyAside className={styles.sidebar}>
            <div className={styles.links}>
              <h6 className={`h6 ${styles.linksTitle}`}>{card.eyebrow}</h6>
              <div className={`p16 ${extra.contactRows}`}>
                <div>
                  <p className={extra.contactLabel}>{card.phoneLabel}</p>
                  <a href={card.phoneHref}>{card.phone}</a>
                </div>
                <div>
                  <p className={extra.contactLabel}>{card.addressLabel}</p>
                  {card.address.map((a) => (
                    <p key={a}>{a}</p>
                  ))}
                </div>
                <div>
                  <p className={extra.contactLabel}>{card.hoursLabel}</p>
                  {card.hours.map((h) => (
                    <p key={h}>{h}</p>
                  ))}
                </div>
                <div>
                  <p className={extra.contactLabel}>{card.emailLabel}</p>
                  <a href={`mailto:${card.email}`}>{card.email}</a>
                </div>
              </div>
              <Button href={card.cta.href} variant="fillDark" arrow fullWidth>
                {card.cta.label}
              </Button>
            </div>
          </StickyAside>
          <div className={styles.spacer} />
          <article className={styles.content}>
            <div className={styles.block}>
              <h2 className={`h6 ${styles.overviewText}`}>{t.intro.eyebrow}</h2>
              <div className={styles.rich}>
                {t.intro.paragraphs.map((p) => (
                  <p key={p} className="p18">
                    {p}
                  </p>
                ))}
              </div>
              <h3 className={`h6 ${styles.blockTitle}`}>{t.intro.citiesLabel}</h3>
              <CheckList items={t.intro.cities} reveal={false} />
            </div>

            <LineDraw />
            <div className={styles.block}>
              <SectionLabel>{t.areas.eyebrow}</SectionLabel>
              <h2 className={`h6 ${styles.overviewText}`}>{t.areas.title}</h2>
            </div>

            {t.areas.counties.map((county) => (
              <Fragment key={county.name}>
                <LineDraw />
                <div className={styles.block}>
                  <h3 className={`h6 ${styles.blockTitle}`}>{county.name}</h3>
                  <div className={styles.rich}>
                    <p className="p18">{county.description}</p>
                  </div>
                  <CheckList items={county.cities} reveal={false} />
                  <iframe
                    className={extra.map}
                    title={`Map of ${county.map}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(county.map)}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Fragment>
            ))}
          </article>
        </div>
      </section>

      <ConsultationSection />
    </main>
  );
}
