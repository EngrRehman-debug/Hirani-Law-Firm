import { Star } from "@/components/ui/Icons";
import GoogleMark from "@/components/ui/GoogleMark";
import Reveal from "@/components/ui/Reveal";
import styles from "./ValuesGrid.module.css";
import extra from "./HiraniPages.module.css";

type Review = { name: string; when: string; rating: number; text: string; verified: boolean };

/** Blue verified tick shown next to the stars for verified Google reviews. */
function VerifiedBadge() {
  return (
    <svg className={extra.verified} viewBox="0 0 24 24" role="img" aria-label="Verified review">
      <circle cx="12" cy="12" r="11" fill="#1a73e8" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7 12.3 3.3 3.3L17 8.9"
      />
    </svg>
  );
}

/** Client reviews in the same bordered 3-column grid the firm values use. */
export default function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  return (
    <div className={styles.grid}>
      {reviews.map((r) => (
        <Reveal key={r.name} className={styles.cell}>
          <div className={`${styles.card} ${extra.cardTop}`}>
            <div className={extra.reviewMeta}>
              <span className={extra.stars} aria-label={`${r.rating} / 5`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} width={16} height={15} />
                ))}
              </span>
              {r.verified && <VerifiedBadge />}
              <span className={`p14 ${extra.when}`}>{r.when}</span>
              <GoogleMark className={extra.google} />
            </div>
            <div className={styles.cardText}>
              <p className={`h5 ${styles.cardTitle}`}>{r.name}</p>
              <p className={`p16 ${styles.cardBody}`}>{r.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
