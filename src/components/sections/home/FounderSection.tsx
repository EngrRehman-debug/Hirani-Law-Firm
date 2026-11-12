import Awards from "@/components/sections/shared/Awards";
import FounderQuote from "@/components/sections/shared/FounderQuote";
import ImageCta from "@/components/sections/shared/ImageCta";
import ValuesGrid from "@/components/sections/shared/ValuesGrid";
import styles from "./FounderSection.module.css";

export default function FounderSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <FounderQuote />
        <Awards />
        <ImageCta />
        <ValuesGrid />
      </div>
    </section>
  );
}
