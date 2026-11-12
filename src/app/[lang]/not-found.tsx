import Image from "next/image";
import Button from "@/components/ui/Button";
import { getContent } from "@/content";
import styles from "./not-found.module.css";



export default function NotFound() {
  const t = getContent().pages.notFound;
  return (
    <main className="page">
      <title>{getContent().meta.pageTitles.notFound}</title>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <h1 className={`h1 ${styles.title}`}>{t.title}</h1>
            <p className={`p18 ${styles.text}`}>{t.text}</p>
            <div className={styles.ctas}>
              <Button href={t.cta.href} variant="fillDark" arrow>
                {t.cta.label}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.lady} aria-hidden>
          <Image src="/images/4FpB4qMXeILhoNcYuDLXRDqTs.png" alt="" fill sizes="600px" />
        </div>
      </section>
    </main>
  );
}
