import type { Metadata } from "next";
import PageHero from "@/components/sections/shared/PageHero";
import ImageCta from "@/components/sections/shared/ImageCta";
import FounderQuote from "@/components/sections/shared/FounderQuote";
import TestimonialSlider from "@/components/sections/about/TestimonialSlider";
import Button from "@/components/ui/Button";
import ListHeader from "@/components/ui/ListHeader";
import PracticeCard from "@/components/ui/PracticeCard";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import TrustAvatars from "@/components/ui/TrustAvatars";
import { getContent, setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import { getPracticeAreas } from "@/data/practiceAreas";
import styles from "./practice-areas.module.css";
import { HIDDEN } from "@/lib/hidden";
import RouteSeo from "@/components/layout/RouteSeo";

export async function generateMetadata({ params }: PageProps<"/[lang]/practice-areas">): Promise<Metadata> {
  return routeMetadata(params, "/practice-areas");
}

export default async function PracticeAreasPage({ params }: PageProps<"/[lang]/practice-areas">) {
  setRequestLocale((await params).lang);
  const { pages, sections } = getContent();
  const t = pages.practiceAreas;
  return (
    <main className="page">
      <RouteSeo route={"/practice-areas"} />
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        image={t.hero.image}
        imagePosition="50% 50%"
        height={90}
        wide
      />

      <section className={`${styles.white} ${styles.areas}`}>
        <div className={styles.wrapper}>
          <div className={styles.titleRow}>
            <div className={styles.title}>
              <SectionLabel>{t.label}</SectionLabel>
              <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
            </div>
            <div className={styles.trust}>{!HIDDEN.trustAvatars && <TrustAvatars tone="light" textReveal />}</div>
          </div>

          <div className={styles.areasCta}>
            {/* family law first, then personal injury (as on the original index page) */}
            {t.groups.map((g) => (
              <div key={g.category} className={styles.group}>
                <div className={styles.groupHead}>
                  <div className={styles.groupText}>
                    <h3 className={`h3 ${styles.heading}`}>{g.title}</h3>
                    <p className={`p18 ${styles.ctaText}`}>{g.description}</p>
                  </div>
                  <Button href={g.cta.href} variant="outlineDark" arrow>
                    {g.cta.label}
                  </Button>
                </div>
                <div className={styles.grid}>
                  {getPracticeAreas()
                    .filter((a) => a.category === g.category)
                    .map((a) => (
                      <Reveal key={a.href} y={20} amount={0.5} delay={0.22} once={false} className={styles.cell}>
                        <PracticeCard area={a} />
                      </Reveal>
                    ))}
                </div>
              </div>
            ))}
            <div className={styles.ctaRow}>
              <div className={styles.ctaSpacer} />
              <div className={styles.cta}>
                <Reveal onMount y={20} delay={0.2}>
                  <p className={`p18 balance ${styles.ctaText}`}>{t.ctaText}</p>
                </Reveal>
                <Reveal onMount y={20} delay={0.3} className={styles.ctaButtons}>
                  <Button href={t.primaryCta.href} variant="fillDark" arrow>
                    {t.primaryCta.label}
                  </Button>
                  <Button href={t.secondaryCta.href} variant="outlineDark">
                    {t.secondaryCta.label}
                  </Button>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.white} ${styles.founder}`}>
        <div className={styles.founderWrapper}>
          <ImageCta image={t.imageCta} replayText fullImage />
          <FounderQuote emailLabel={t.founderEmailLabel} animate={false} />
          <div className={styles.testimonials}>
            <ListHeader
              title={sections.testimonials.listTitle}
              subtitle={sections.testimonials.listSubtitle}
              reveal={false}
              replay
            />
            <TestimonialSlider bordered={false} />
          </div>
        </div>
      </section>
    </main>
  );
}
