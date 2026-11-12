import Image from "next/image";
import Link from "next/link";
import type { Attorney } from "@/data/attorneys";
import styles from "./AttorneyCard.module.css";

type Props = { attorney: Attorney; link?: boolean; size?: "desktop" | "tablet" | "responsive" };

/**
 * Portrait card. On hover a white panel grows from the top-right corner revealing the bio,
 * the name overlay fades out and the "+" badge disappears.
 */
export default function AttorneyCard({ attorney, link = true, size = "desktop" }: Props) {
  const body = (
    <div className={`${styles.card} ${styles[size]}`}>
      <span className={styles.plus} aria-hidden>
        <span className={styles.plusH} />
        <span className={styles.plusV} />
      </span>
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <p className={`h5 ${styles.panelName}`}>{attorney.name}</p>
          <p className={`p16 ${styles.panelRole}`}>{attorney.role}</p>
        </div>
        <p className={`p16 ${styles.panelSpeech}`}>{attorney.speech}</p>
      </div>
      <div className={styles.nameRole}>
        <p className={`h5 ${styles.name}`}>{attorney.name}</p>
        <p className={`p16 ${styles.role}`}>{attorney.role}</p>
      </div>
      <figure className={styles.figure}>
        <Image src={attorney.image} alt={attorney.name} fill sizes="(max-width: 809px) 100vw, 466px" className={styles.img} />
        <div className={styles.gradient} />
      </figure>
    </div>
  );
  if (!link) return body;
  return (
    <Link href={attorney.href} className={styles.link}>
      {body}
    </Link>
  );
}
