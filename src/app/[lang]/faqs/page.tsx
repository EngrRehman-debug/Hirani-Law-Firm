import type { Metadata } from "next";
import { Fragment } from "react";
import PageHero from "@/components/sections/shared/PageHero";
import ConsultationSection from "@/components/sections/shared/ConsultationSection";
import Accordion from "@/components/ui/Accordion";
import LineDraw from "@/components/ui/LineDraw";
import NavLink from "@/components/ui/NavLink";
import Reveal from "@/components/ui/Reveal";
import { getContent, setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import extra from "@/components/sections/shared/HiraniPages.module.css";
import styles from "../practice-areas/[category]/[slug]/detail.module.css";
import StickyAside from "@/components/ui/StickyAside";
import RouteSeo from "@/components/layout/RouteSeo";

export async function generateMetadata({ params }: PageProps<"/[lang]/faqs">): Promise<Metadata> {
  return routeMetadata(params, "/faqs");
}

export default async function FaqsPage({ params }: PageProps<"/[lang]/faqs">) {
  setRequestLocale((await params).lang);
  const t = getContent().pages.faqs;
  const categories = t.groups.flatMap((g) => g.categories);
  return (
    <main className="page">
      <RouteSeo route={"/faqs"} />
      <PageHero title={t.hero.title} image={t.hero.image} imagePosition="50% 50%">
        <Reveal onMount y={20} delay={0.5}>
          <p className={`p18 balance ${extra.heroText}`}>{t.hero.text}</p>
        </Reveal>
      </PageHero>

      <section className={styles.section}>
        <div className={styles.wrapper}>
          <StickyAside className={styles.sidebar}>
            {t.groups.map((group) => (
              <div key={group.label} className={styles.links}>
                <h6 className={`h6 ${styles.linksTitle}`}>{group.label}</h6>
                <ul className={styles.linkList}>
                  {group.categories.map((cat) => (
                    <li key={cat.id}>
                      <NavLink href={`#${cat.id}`} tone="dark">
                        {cat.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StickyAside>
          <div className={styles.spacer} />
          <article className={styles.content}>
            {categories.map((cat, i) => (
              <Fragment key={cat.id}>
                {i > 0 && <LineDraw />}
                <div id={cat.id} className={`${styles.block} ${extra.anchor}`}>
                  <h2 className={`h6 ${styles.blockTitle}`}>{cat.title}</h2>
                  <Accordion items={cat.items} defaultOpen={-1} />
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
