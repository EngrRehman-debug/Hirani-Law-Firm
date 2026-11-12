import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";
import styles from "./CaseCard.module.css";

/** Full-width case study card: background photo with an olive content panel on the left. */
export default function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link href={`/case-studies/${item.slug}`} className={styles.card}>
      <div className={styles.bg}>
        <Image src={item.image} alt="" fill sizes="100vw" className={styles.img} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.tags}>
            <span className={`p12 ${styles.tag}`}>{item.category}</span>
            <span className={`p12 ${styles.tag} ${styles.verdict}`}>{item.verdict}</span>
          </div>
          <h6 className={`h6 ${styles.heading}`}>{item.title}</h6>
        </div>
        <div className={styles.description}>
          <div className={styles.divider} />
          <p className={`p16 ${styles.excerpt}`}>{item.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
