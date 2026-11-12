import BlogCard from "@/components/ui/BlogCard";
import Reveal from "@/components/ui/Reveal";
import { getContent } from "@/content";
import { getPosts } from "@/data/blog";
import styles from "./HomeBlog.module.css";

export default function HomeBlog() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.titleRow}>
          <Reveal once={false} className={styles.title}>
            <h2 className={`h2 ${styles.heading}`}>{getContent().sections.homeBlog.heading}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.3} once={false} className={styles.grid}>
          {getPosts().slice(0, 4).map((p, i) => (
            <div key={p.slug} className={i === 3 ? styles.tabletOnly : undefined}>
              <BlogCard post={p} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
