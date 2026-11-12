import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import DetailHero from "@/components/sections/shared/DetailHero";
import SidebarFounder from "@/components/sections/shared/SidebarFounder";
import CheckList from "@/components/ui/CheckList";
import LineDraw from "@/components/ui/LineDraw";
import NavLink from "@/components/ui/NavLink";
import RichText from "@/components/ui/RichText";
import ZoomImage from "@/components/ui/ZoomImage";
import { getContent, setRequestLocale } from "@/content";
import { getPracticeArea, getPracticeAreas } from "@/data/practiceAreas";
import styles from "./detail.module.css";
import StickyAside from "@/components/ui/StickyAside";
import { routeMetadata } from "@/lib/metadata";
import RouteSeo from "@/components/layout/RouteSeo";

type Props = PageProps<"/[lang]/practice-areas/[category]/[slug]">;

export function generateStaticParams() {
  return getPracticeAreas(getContent("en")).map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  return routeMetadata(params, `/practice-areas/${category}/${slug}`);
}

export default async function PracticeAreaPage({ params }: Props) {
  const { lang, category, slug } = await params;
  setRequestLocale(lang);
  const labels = getContent().pages.practiceAreaDetail;
  const area = getPracticeArea(category, slug);
  if (!area) notFound();
  const d = area.detail;
  // the first section has no heading: it is the overview shown next to the image
  const [first, ...rest] = d.sections;
  const overview = first && !first.heading ? first : undefined;
  const sections = overview ? rest : d.sections;
  const related = getPracticeAreas().filter((p) => p.category === area.category);

  return (
    <main className="page">
      <RouteSeo route={area.href} />
      <DetailHero title={d.heroTitle} image={d.heroImage} alt={d.heroAlt} />

      <section className={styles.section}>
        <div className={styles.wrapper}>
          <StickyAside className={styles.sidebar}>
            <div className={styles.links}>
              <h6 className={`h6 ${styles.linksTitle}`}>{labels.sidebarTitle}</h6>
              <ul className={styles.linkList}>
                {related.map((p) => (
                  <li key={p.href}>
                    <NavLink href={p.href} tone="dark" current={p.href === area.href}>
                      {p.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <SidebarFounder />
          </StickyAside>
          <div className={styles.spacer} />
          <article className={styles.content}>
            <div className={styles.overview}>
              {overview?.paragraphs[0] && (
                <h6 className={`h6 ${styles.overviewText}`}>
                  <RichText text={overview.paragraphs[0]} />
                </h6>
              )}
              <ZoomImage className={styles.overviewImage} src={d.overviewImage} alt={d.overviewAlt} />
              {overview?.paragraphs.slice(1).map((t) => (
                <p key={t} className="p18">
                  <RichText text={t} />
                </p>
              ))}
            </div>

            {sections.map((s, i) => (
              <Fragment key={`${s.heading}-${i}`}>
                <LineDraw />
                <div className={styles.block}>
                  {s.heading && <h6 className={`h6 ${styles.blockTitle}`}>{s.heading}</h6>}
                  {s.paragraphs.length > 0 && (
                    <div className={styles.rich}>
                      {s.paragraphs.map((t) => (
                        <p key={t} className="p18">
                          <RichText text={t} />
                        </p>
                      ))}
                    </div>
                  )}
                  {s.bullets.length > 0 && <CheckList items={s.bullets} reveal={false} />}
                </div>
              </Fragment>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
