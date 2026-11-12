import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";
import styles from "./CaseTile.module.css";

/** White case study tile ("Style 2"): image on top (zooms on hover), tags and title below. */
export default function CaseTile({
  item,
  compactFrom = "phone",
}: {
  item: CaseStudy;
  /** Breakpoint from which the compact ("Phone - Style 2") padding is used */
  compactFrom?: "tablet" | "phone";
}) {
  return (
    <Link
      href={`/case-studies/${item.slug}`}
      className={`${styles.card} ${compactFrom === "tablet" ? styles.compactTablet : ""}`}
    >
      <div className={styles.imageWrap}>
        <div className={styles.image}>
          <Image src={item.image} alt="" fill sizes="(max-width: 809px) 100vw, 466px" className={styles.img} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.tags}>
            <span className={`p12 ${styles.tag}`}>{item.category}</span>
            <span className={`p12 ${styles.tag} ${styles.verdict}`}>{item.verdict}</span>
          </div>
          <h6 className={`h6 ${styles.heading}`}>{item.title}</h6>
        </div>
      </div>
    </Link>
  );
}
