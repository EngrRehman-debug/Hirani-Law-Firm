import { notFound } from "next/navigation";
import { HIDDEN } from "@/lib/hidden";
import type { Metadata } from "next";
import SplitHero from "@/components/sections/shared/SplitHero";
import TopResults from "@/components/sections/shared/TopResults";
import Button from "@/components/ui/Button";
import CaseTile from "@/components/ui/CaseTile";
import Reveal from "@/components/ui/Reveal";
import { getContent, setRequestLocale } from "@/content";
import { getCaseStudies } from "@/data/caseStudies";
import styles from "./case-studies.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/case-studies">): Promise<Metadata> {
  // template-only page (not on the original site, so no SEO entry): plain title + canonical
  const { meta } = getContent(setRequestLocale((await params).lang));
  return { title: meta.pageTitles.caseStudies, alternates: { canonical: "/case-studies" } };
}

export default async function CaseStudiesPage({ params }: PageProps<"/[lang]/case-studies">) {
  if (HIDDEN.caseStudies) notFound(); // template-only page, hidden until the client decides
  setRequestLocale((await params).lang);
  const { hero } = getContent().pages.caseStudies;
  return (
    <main className="page">
      <SplitHero title={hero.title} text={hero.text} image={hero.image}>
        <Button href={hero.primaryCta.href} variant="fillLight" arrow>
          {hero.primaryCta.label}
        </Button>
        <Button href={hero.secondaryCta.href} variant="outlineLight">
          {hero.secondaryCta.label}
        </Button>
      </SplitHero>

      <section className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            {getCaseStudies().map((c, i) => (
              <Reveal key={c.slug} y={20} amount={0.5} delay={i < 3 ? 0.22 : 0.5} once={false} className={styles.cell}>
                <CaseTile item={c} />
              </Reveal>
            ))}
          </div>
          {!HIDDEN.verdicts && <TopResults variant="page" />}
        </div>
      </section>
    </main>
  );
}
