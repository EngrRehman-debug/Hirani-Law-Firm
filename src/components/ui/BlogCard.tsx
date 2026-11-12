import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import styles from "./BlogCard.module.css";

/** Blog teaser: 3:2 image (zooms on hover), date — category, title and excerpt. */
type Props = {
  post: BlogPost;
  /** Keep the 95% title/excerpt width on phones (blog index uses the Desktop card variant at every width) */
  narrowText?: boolean;
};

export default function BlogCard({ post, narrowText = false }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className={`${styles.card} ${narrowText ? styles.narrow : ""}`}>
      <div className={styles.imageWrap}>
        <div className={styles.image}>
          <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 809px) 100vw, 466px" className={styles.img} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <p className={`p14 ${styles.date}`}>{post.date}</p>
          <span className={styles.divider} />
          <p className={`p14 ${styles.category}`}>{post.category}</p>
        </div>
        <div className={styles.text}>
          <h6 className={`h6 ${styles.title}`}>{post.title}</h6>
          <p className={`p16 ${styles.excerpt}`}>{post.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
