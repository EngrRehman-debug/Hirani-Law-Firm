import type { Metadata } from "next";
import BlogCard from "@/components/ui/BlogCard";
import Reveal from "@/components/ui/Reveal";
import { getContent, setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import { getPosts } from "@/data/blog";
import styles from "./blog.module.css";
import RouteSeo from "@/components/layout/RouteSeo";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  return routeMetadata(params, "/blog");
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  setRequestLocale((await params).lang);
  const t = getContent().pages.blog;
  return (
    <main className="page">
      <RouteSeo route={"/blog"} />
      <section className={styles.hero}>
        <div className={styles.heroWrapper}>
          <h1 className={`h1 ${styles.title}`}>{t.title}</h1>
        </div>
      </section>

      <section className={styles.posts}>
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            {getPosts().map((post) => (
              <Reveal key={post.slug} y={20} delay={0.5} once={false}>
                <BlogCard post={post} narrowText />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
