import Counter from "@/components/ui/Counter";
import ListHeader from "@/components/ui/ListHeader";
import Reveal from "@/components/ui/Reveal";
import { getContent } from "@/content";
import styles from "./TopResults.module.css";

/** "Top verdicts and settlements" – four animated counters. */
/**
 * variant "home": header and counter row both have their own appear (home page instance);
 * variant "page": only the titles and the individual cards animate (about / case studies).
 */
export type ResultsData = {
  title?: string;
  subtitle?: string;
  prefix?: string;
  suffix?: string;
  items: { value: number | string; text: string; label: string }[];
};

export default function TopResults({ variant = "home", data }: { variant?: "home" | "page"; data?: ResultsData }) {
  const t: ResultsData = data ?? getContent().sections.topResults;
  const home = variant === "home";
  const Row = home ? Reveal : "div";
  return (
    <div className={styles.results}>
      {t.title && <ListHeader title={t.title} subtitle={t.subtitle ?? ""} reveal={home} replay={!home} />}
      <Row className={styles.counters}>
        {t.items.map((r) => (
          <Reveal key={r.text} y={20} once={home} className={styles.cell}>
            <div className={styles.card}>
              <div className={styles.content}>
                {typeof r.value === "number" ? (
                  <Counter end={r.value} prefix={t.prefix} suffix={t.suffix} className={`h3 ${styles.number}`} />
                ) : (
                  <span className={`h3 ${styles.number}`}>{r.value}</span>
                )}
                <p className={`p16 balance ${styles.text}`}>{r.text}</p>
              </div>
              {r.label && <p className={`serif ${styles.label}`}>{r.label}</p>}
            </div>
          </Reveal>
        ))}
      </Row>
    </div>
  );
}
