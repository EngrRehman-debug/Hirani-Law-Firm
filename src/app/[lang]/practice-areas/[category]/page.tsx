import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import PageHero from "@/components/sections/shared/PageHero";
import ConsultationSection from "@/components/sections/shared/ConsultationSection";
import ImageCta from "@/components/sections/shared/ImageCta";
import TopResults from "@/components/sections/shared/TopResults";
import Button from "@/components/ui/Button";
import PracticeCard from "@/components/ui/PracticeCard";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent, setRequestLocale } from "@/content";
import { getPracticeAreas } from "@/data/practiceAreas";
import { routeMetadata } from "@/lib/metadata";
import extra from "@/components/sections/shared/HiraniPages.module.css";
import styles from "../practice-areas.module.css";
import RouteSeo from "@/components/layout/RouteSeo";

/** Category landing pages of the original site: /practice-areas/family-law and /practice-areas/personal-injury. */
const CATEGORIES = {
  "family-law": "familyLaw",
  "personal-injury": "personalInjury",
} as const;
/** hero title width per page so each heading breaks into 3 lines on desktop */
const HERO_WIDTH = { "family-law": true, "personal-injury": "medium" } as const;
type Category = keyof typeof CATEGORIES;
const isCategory = (c: string): c is Category => c in CATEGORIES;

type Props = PageProps<"/[lang]/practice-areas/[category]">;

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  return routeMetadata(params, `/practice-areas/${category}`);
}

/** Turns the phrases listed in `links` into links (as the original did), keeping the copy as plain strings. */
function withLinks(text: string, links: { text: string; href: string }[]): ReactNode {
  if (links.length === 0) return text;
  const escaped = links.map((l) => l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return text.split(new RegExp(`(${escaped.join("|")})`, "g")).map((part, i) => {
    const link = links.find((l) => l.text === part);
    return link ? (
      <Link key={i} href={link.href}>
        {part}
      </Link>
    ) : (
      part
    );
  });
}

export default async function PracticeCategoryPage({ params }: Props) {
  const { lang, category } = await params;
  setRequestLocale(lang);
  if (!isCategory(category)) notFound();
  const t = getContent().pages[CATEGORIES[category]];
  const areas = getPracticeAreas().filter((a) => a.category === category);

  return (
    <main className="page">
      <RouteSeo route={`/practice-areas/${category}`} />
      <PageHero eyebrow={t.eyebrow} title={t.title} image={t.image} imagePosition="50% 50%" height={90} wide={HERO_WIDTH[category]}>
        <Reveal onMount y={20} delay={0.5}>
          <p className={`p18 balance ${extra.heroText}`}>{t.subtitle}</p>
        </Reveal>
      </PageHero>

      <section className={`${styles.white} ${styles.areas}`}>
        <div className={styles.wrapper}>
          <div className={extra.intro}>
            {t.paragraphs.map((p) => (
              <p key={p} className="p18">
                {withLinks(p, t.paragraphLinks)}
              </p>
            ))}
          </div>
          <TopResults variant="page" data={{ items: t.stats }} />

          <div className={styles.titleRow}>
            <div className={styles.title}>
              <SectionLabel>{t.eyebrow}</SectionLabel>
              <h2 className={`h2 ${styles.heading}`}>{t.areasTitle}</h2>
            </div>
            {t.reviewCta.label && (
              <Button href={t.reviewCta.href} variant="fillDark" arrow>
                {t.reviewCta.label}
              </Button>
            )}
          </div>

          <div className={styles.areasCta}>
            <div className={styles.grid}>
              {areas.map((a) => (
                <Reveal key={a.href} y={20} amount={0.5} delay={0.22} once={false} className={styles.cell}>
                  <PracticeCard area={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.white} ${styles.founder}`}>
        <div className={styles.founderWrapper}>
          <ImageCta image={t.attorney.image} copy={{ ...t.attorney, imageAlt: t.attorney.imageAlt }} />
        </div>
      </section>

      <ConsultationSection />
    </main>
  );
}
