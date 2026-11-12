import type { Metadata } from "next";
import PageHero from "@/components/sections/shared/PageHero";
import FounderQuote from "@/components/sections/shared/FounderQuote";
import TopResults from "@/components/sections/shared/TopResults";
import ValuesGrid from "@/components/sections/shared/ValuesGrid";
import VideoGallery from "@/components/sections/home/VideoGallery";
import Careers from "@/components/sections/about/Careers";
import TestimonialSlider from "@/components/sections/about/TestimonialSlider";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent, setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import styles from "./about.module.css";
import { HIDDEN } from "@/lib/hidden";
import RouteSeo from "@/components/layout/RouteSeo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  return routeMetadata(params, "/about");
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  setRequestLocale((await params).lang);
  const t = getContent().pages.about;
  return (
    <main className="page">
      <RouteSeo route={"/about"} />
      {/* taller hero, photo anchored lower so the whole team is in view */}
      <PageHero title={t.hero.title} image={t.hero.image} imagePosition="50% 15%" height={92} />

      <section className={`${styles.white} ${styles.founder}`}>
        <div className={styles.wrapper}>
          <FounderQuote contentFirstOnPhone />
          {!HIDDEN.verdicts && <TopResults variant="page" />}
        </div>
      </section>

      {!HIDDEN.videoGallery && <VideoGallery />}

      <section className={`${styles.white} ${styles.features}`}>
        <div className={styles.wrapperValues}>
          <ValuesGrid ladyInset spacious replay />
        </div>
      </section>

      {!HIDDEN.careers && <Careers />}

      <section className={`${styles.white} ${styles.testimonials}`}>
        <div className={styles.wrapperTestimonials}>
          <div className={styles.testimonialsTitle}>
            <SectionLabel>{t.testimonials.label}</SectionLabel>
            <h2 className={`h2 ${styles.heading}`}>{t.testimonials.heading}</h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>
    </main>
  );
}
