import ListHeader from "@/components/ui/ListHeader";
import Reveal from "@/components/ui/Reveal";
import { getContent } from "@/content";
import styles from "./Awards.module.css";

/** Inner-page instance: list rises 30px on a spring (bounce 0, delay .5, duration .7). */
const pageListSpring = { type: "spring" as const, bounce: 0, delay: 0.5, duration: 0.7 };

export default function Awards({
  splitOnPhone = false,
  variant = "home",
}: {
  splitOnPhone?: boolean;
  variant?: "home" | "page";
}) {
  const t = getContent().sections.awards;
  const home = variant === "home";
  return (
    <div className={styles.awards}>
      <ListHeader title={t.title} subtitle={t.subtitle} splitOnPhone={splitOnPhone} reveal={home} replay />
      <Reveal className={styles.list} once={false} {...(home ? {} : { y: 30, transition: pageListSpring })}>
        {t.items.map((a, i) => (
          <Reveal key={a.title} y={0} once={false} className={styles.row}>
            <div className={styles.content}>
              <div className={styles.number}>
                <p className={`p16 ${styles.index}`}>{String(i + 1).padStart(2, "0")}</p>
              </div>
              <div className={styles.text}>
                <p className={`p18 ${styles.title}`}>{a.title}</p>
                <p className={`p16 ${styles.year}`}>{a.year}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </Reveal>
    </div>
  );
}
