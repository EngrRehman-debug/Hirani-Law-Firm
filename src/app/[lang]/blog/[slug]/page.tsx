import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Accordion from "@/components/ui/Accordion";
import BlogCard from "@/components/ui/BlogCard";
import CheckList from "@/components/ui/CheckList";
import LineDraw from "@/components/ui/LineDraw";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import ZoomImage from "@/components/ui/ZoomImage";
import { getContent, setRequestLocale } from "@/content";
import { getPost, getPosts } from "@/data/blog";
import styles from "./post.module.css";
import { routeMetadata } from "@/lib/metadata";
import RouteSeo from "@/components/layout/RouteSeo";

type Props = PageProps<"/[lang]/blog/[slug]">;

export function generateStaticParams() {
  return getPosts(getContent("en")).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return routeMetadata(params, `/blog/${slug}`);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, lang } = await params;
  setRequestLocale(lang);
  const post = getPost(slug);
  if (!post) notFound();
  const content = post.content;
  const [lead, ...intro] = content.intro;
  const more = getPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="page">
      <RouteSeo route={`/blog/${post.slug}`} />
      <section className={styles.hero}>
        <div className={styles.heroWrapper}>
          <div className={styles.heading}>
            <div className={styles.meta}>
              <time className={`p14 ${styles.date}`} dateTime={post.dateISO}>
                {post.date}
              </time>
              <span className={styles.divider} />
              <p className={`p14 ${styles.category}`}>{post.category}</p>
            </div>
            <h1 className={`h2 ${styles.title}`}>{post.title}</h1>
          </div>
          <ZoomImage src={post.image} alt={post.imageAlt} sizes="(max-width: 1440px) 100vw, 1360px" priority />
        </div>
      </section>

      <section className={styles.single}>
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <div className={styles.spacer} />
            <div className={styles.content}>
              {lead && (
                <p className={`h6 ${styles.intro}`}>
                  <RichText text={lead} />
                </p>
              )}
              {intro.map((t) => (
                <p key={t} className={`p18 ${styles.text}`}>
                  <RichText text={t} />
                </p>
              ))}

              {content.sections.map((s) => (
                <div key={s.heading} className={styles.content}>
                  <h2 className={`h6 ${styles.intro}`}>{s.heading}</h2>
                  {s.blocks.map((b, i) =>
                    b.type === "list" ? (
                      <CheckList key={i} items={b.items} reveal={false} />
                    ) : (
                      <p key={i} className={`p18 ${styles.text}`}>
                        <RichText text={b.text} />
                      </p>
                    ),
                  )}
                </div>
              ))}

              {content.cta.title && (
                <div className={styles.content}>
                  <h2 className={`h6 ${styles.intro}`}>{content.cta.title}</h2>
                  {content.cta.paragraphs.map((t) => (
                    <p key={t} className={`p18 ${styles.text}`}>
                      <RichText text={t} />
                    </p>
                  ))}
                </div>
              )}

              {content.faqs.length > 0 && (
                <div className={styles.content}>
                  <h2 className={`h6 ${styles.intro}`}>{getContent().pages.blog.faqTitle}</h2>
                  <Accordion items={content.faqs} />
                </div>
              )}
            </div>
          </div>
          <LineDraw />
        </div>
      </section>

      <section className={styles.more}>
        <div className={styles.moreWrapper}>
          <h2 className={`h2 ${styles.moreTitle}`}>{getContent().common.youMightLike}</h2>
          <div className={styles.grid}>
            {more.map((p) => (
              <Reveal key={p.slug} y={20} delay={0.3} once={false} className={styles.cell}>
                <BlogCard post={p} narrowText />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
