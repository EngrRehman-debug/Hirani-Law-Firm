import type { Metadata } from "next";
import PageHero from "@/components/sections/shared/PageHero";
import ConsultationSection from "@/components/sections/shared/ConsultationSection";
import ReviewsGrid from "@/components/sections/shared/ReviewsGrid";
import TopResults from "@/components/sections/shared/TopResults";
import ValuesGrid from "@/components/sections/shared/ValuesGrid";
import Reveal from "@/components/ui/Reveal";
import { getContent, setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import extra from "@/components/sections/shared/HiraniPages.module.css";
import styles from "../practice-areas/practice-areas.module.css";
import RouteSeo from "@/components/layout/RouteSeo";

export async function generateMetadata({ params }: PageProps<"/[lang]/reviews">): Promise<Metadata> {
  return routeMetadata(params, "/reviews");
}

export default async function ReviewsPage({ params }: PageProps<"/[lang]/reviews">) {
  setRequestLocale((await params).lang);
  const t = getContent().pages.reviews;
  return (
    <main className="page">
      <RouteSeo route={"/reviews"} />
      <PageHero title={t.hero.title} image={t.hero.image} imagePosition="50% 50%">
        <Reveal onMount y={20} delay={0.5}>
          <p className={`p18 balance ${extra.heroText}`}>{t.hero.text}</p>
        </Reveal>
      </PageHero>

      <section className={`${styles.white} ${styles.areas}`}>
        <div className={styles.wrapper}>
          <TopResults variant="page" data={t.mention} />
        </div>
      </section>

      <section className={`${styles.white} ${styles.founder}`}>
        <div className={styles.wrapper}>
          <div className={styles.titleRow}>
            <div className={styles.title}>
              <h2 className={`h2 ${styles.heading}`}>{t.listTitle}</h2>
            </div>
          </div>
          <ReviewsGrid reviews={t.reviews} />
        </div>
      </section>

      <section className={`${styles.white} ${styles.founder}`}>
        <div className={styles.wrapper}>
          <ValuesGrid
            label={t.themes.label}
            heading={t.themes.heading}
            items={t.themes.items}
            showCta={false}
            showLadyJustice={false}
          />
        </div>
      </section>

      <ConsultationSection />
    </main>
  );
}
