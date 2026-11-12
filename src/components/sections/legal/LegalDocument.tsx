import SectionLabel from "@/components/ui/SectionLabel";
import type { LegalPage } from "@/data/legal";
import styles from "./LegalDocument.module.css";

/** Legal page: "Last updated" label + title header, then the rich text in the right half. */
export default function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <main className="page">
      <section className={styles.hero}>
        <div className={styles.heroWrapper}>
          <div className={styles.heading}>
            <SectionLabel className={styles.label}>{page.updated}</SectionLabel>
            <h1 className={`h1 ${styles.title}`}>{page.title}</h1>
          </div>
        </div>
      </section>
      <section className={styles.body}>
        <div className={styles.wrapper}>
          <div className={styles.spacer} />
          <div className={styles.richText}>
            {page.blocks.map((b, i) => {
              if (b.type === "heading")
                return (
                  <h2 key={i} className={`h6 ${styles.h}`}>
                    <strong>{b.text}</strong>
                  </h2>
                );
              if (b.type === "list")
                return (
                  <ul key={i} className={styles.list}>
                    {b.items.map((it) => (
                      <li key={it} className={`p18 ${styles.li}`}>
                        <p>{it}</p>
                      </li>
                    ))}
                  </ul>
                );
              return (
                <p key={i} className={`p18 ${styles.p}`}>
                  {b.text}
                </p>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
