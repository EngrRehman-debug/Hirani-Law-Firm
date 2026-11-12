import { getContent } from "@/content";
import type { PracticeArea } from "@/data/practiceAreas";
import Button from "./Button";
import MaskIcon from "./MaskIcon";
import styles from "./PracticeCard.module.css";

/** White practice area card ("Style 3") used on the Practice Areas page. */
export default function PracticeCard({ area }: { area: PracticeArea }) {
  return (
    <article className={styles.card}>
      <div className={styles.inner}>
        <span className={styles.icon}>
          <MaskIcon src={area.icon} size={64} />
        </span>
        <div className={styles.text}>
          <h6 className={`h6 ${styles.title}`}>{area.title}</h6>
          <div className={styles.divider} />
          <div className={styles.description}>
            <p className={`p18 ${styles.excerpt}`}>{area.excerpt}</p>
            <Button href={area.href} variant="fillDark" arrow compactFrom="tablet">
              {getContent().common.readMore}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
