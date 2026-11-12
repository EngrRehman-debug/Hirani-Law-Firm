import { HIDDEN } from "@/lib/hidden";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CaseTile from "@/components/ui/CaseTile";
import HeroZoom from "@/components/ui/HeroZoom";
import LineDraw from "@/components/ui/LineDraw";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ZoomImage from "@/components/ui/ZoomImage";
import { getContent, setRequestLocale } from "@/content";
import { getCaseStudies, getCaseStudy } from "@/data/caseStudies";
import { getCaseStudyDetail, type CaseBlock } from "@/data/caseStudyDetails";
import styles from "./case.module.css";

export function generateStaticParams() {
  return getCaseStudies(getContent("en")).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/case-studies/[slug]">): Promise<Metadata> {
  const { slug, lang } = await params;
  setRequestLocale(lang);
  return {
    title: getCaseStudy(slug)?.title ?? getContent().meta.pageTitles.caseStudyFallback,
  };
}

/** Label on the left half, heading + paragraphs on the right half. */
function Block({ label, block }: { label: string; block: CaseBlock }) {
  return (
    <div className={styles.row}>
      <SectionLabel className={styles.label}>{label}</SectionLabel>
      <div className={styles.rowContent}>
        <h6 className={`h6 ${styles.rowHeading}`}>{block.heading}</h6>
        {block.text.map((t) => (
          <p key={t} className={`p18 ${styles.rowText}`}>
            {t.trimEnd()}
            {/* a trailing line break in the CMS text leaves an empty last line, as in the original */}
            {t.endsWith("\n") && (
              <>
                <br />
                <br />
              </>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/case-studies/[slug]">) {
  if (HIDDEN.caseStudies) notFound(); // template-only page, hidden until the client decides
  const { slug, lang } = await params;
  setRequestLocale(lang);
  const labels = getContent().pages.caseStudyDetail;
  const item = getCaseStudy(slug);
  const d = getCaseStudyDetail(slug);
  if (!item || !d) notFound();
  const more = getCaseStudies()
    .filter((c) => c.slug !== slug)
    .slice(0, 3);

  return (
    <main className="page">
      <section className={styles.hero} data-nav-hero>
        <HeroZoom className={styles.heroBg}>
          <Image src={item.image} alt="" fill priority sizes="100vw" className={styles.heroImg} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroGradient} />
        </HeroZoom>
        <div className={styles.heroInner}>
          <Reveal onMount y={40} delay={0.2} className={styles.card}>
            <div className={styles.cardTitle}>
              <div className={styles.tags}>
                <span className={`p12 ${styles.tag}`}>{item.category}</span>
                <span className={`p12 ${styles.tag} ${styles.verdict}`}>{item.verdict}</span>
              </div>
              <h1 className={`h6 ${styles.cardHeading}`}>{item.title}</h1>
            </div>
            <div className={styles.cardDescription}>
              <div className={styles.divider} />
              <p className={`p16 ${styles.cardText}`}>{item.excerpt}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.wrapper}>
          <Block label={labels.overview} block={d.overview} />
          <LineDraw />
          <div className={styles.strategy}>
            <Block label={labels.strategy} block={d.strategy} />
            <div className={styles.images}>
              {d.images.map((im) => (
                <ZoomImage key={im.src} src={im.src} alt={im.alt} replay />
              ))}
            </div>
          </div>
          <LineDraw />
          <Block label={labels.results} block={d.result} />
          <LineDraw />
        </div>
      </section>

      <section className={styles.more}>
        <div className={styles.moreWrapper}>
          <h2 className={`h2 ${styles.moreHeading}`}>{getContent().common.youMightLike}</h2>
          <div className={styles.moreGrid}>
            {more.map((c) => (
              <Reveal key={c.slug} y={20} amount={0.5} delay={0.22} once={false} className={styles.moreCell}>
                <CaseTile item={c} compactFrom="tablet" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
