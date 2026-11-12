import type { Metadata } from "next";
import Awards from "@/components/sections/shared/Awards";
import AttorneyCard from "@/components/ui/AttorneyCard";
import Button from "@/components/ui/Button";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent, setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import { getAttorneys } from "@/data/attorneys";
import styles from "./attorneys.module.css";
import RouteSeo from "@/components/layout/RouteSeo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about/our-team">): Promise<Metadata> {
  return routeMetadata(params, "/about/our-team");
}

export default async function AttorneysPage({ params }: PageProps<"/[lang]/about/our-team">) {
  setRequestLocale((await params).lang);
  const t = getContent().pages.attorneys;
  const { hero } = t;
  return (
    <main className="page">
      <RouteSeo route={"/about/our-team"} />
      <section className={styles.hero} data-nav-hero>
        <div className={styles.band} />
        <div className={styles.heroWrapper}>
          <div className={styles.textImage}>
            <div className={styles.headline}>
              <Reveal onMount delay={0.4}>
                <h1 className={`h1 balance ${styles.title}`}>{hero.title}</h1>
              </Reveal>
              <Reveal onMount delay={0.4}>
                <p className={`p18 balance ${styles.text}`}>{hero.text}</p>
              </Reveal>
              <Reveal onMount y={20} delay={0.3} className={styles.ctas}>
                <Button href={hero.primaryCta.href} variant="fillLight" arrow>
                  {hero.primaryCta.label}
                </Button>
                <Button href={hero.secondaryCta.href} variant="outlineLight">
                  {hero.secondaryCta.label}
                </Button>
              </Reveal>
            </div>
            <div className={styles.spacer} />
            {/* whole team photo at its own 3:2 ratio, so nobody is cropped */}
            <ZoomImage
              className={styles.image}
              src={hero.image}
              alt={hero.imageAlt}
              ratio={1536 / 1024}
              sizes="(max-width: 809px) 100vw, 680px"
              priority
            />
          </div>
          <Reveal onMount y={60} delay={0.6} className={styles.wordmark}>
            <svg viewBox="0 0 1392.6 280" role="img" aria-label={hero.wordmark}>
              <foreignObject width="100%" height="100%" style={{ overflow: "visible" }}>
                <div className={styles.wordmarkText}>{hero.wordmark}</div>
              </foreignObject>
            </svg>
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.attorneys}>
            <div className={styles.titleRow}>
              <SectionLabel className={styles.label}>{t.label}</SectionLabel>
              <h2 className={`h2 ${styles.heading}`}>{t.heading}</h2>
            </div>
            <div className={styles.grid}>
              {getAttorneys().map((a, i) => (
                <Reveal key={a.slug} y={20} amount={0.5} delay={i < 3 ? 0.22 : 0.5} once={false}>
                  <AttorneyCard attorney={a} size="responsive" />
                </Reveal>
              ))}
            </div>
          </div>
          <Awards splitOnPhone variant="page" />
        </div>
      </section>
    </main>
  );
}
