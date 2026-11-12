import LineDraw from "./LineDraw";
import Reveal from "./Reveal";
import styles from "./ListHeader.module.css";

/** Title/subtitle rise (24px) measured on the original: ~0.12s delay, critically damped ~0.45s. */
const TEXT_SPRING = { type: "spring" as const, stiffness: 154, damping: 25, mass: 1, delay: 0.1 };

type Props = {
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  /** Keep the two-column title/subtitle row on phones (some pages do) */
  splitOnPhone?: boolean;
  /** Wrap the whole header in the 40px "appear" (home page instances); inner pages only animate the texts */
  reveal?: boolean;
  /** Re-run the appear each time the header re-enters the viewport */
  replay?: boolean;
};

/**
 * Header row used above lists (stats, awards, FAQs):
 * serif title on the left, small olive subtitle + divider on the right, and a drawing line below.
 */
export default function ListHeader({ title, subtitle, tone = "dark", splitOnPhone = false, reveal = true, replay = false }: Props) {
  const Outer = reveal ? Reveal : "div";
  const outerProps = reveal ? { once: !replay } : {};
  // with an outer appear only the wrapper replays; without it the texts themselves replay
  const innerOnce = !(replay && !reveal);
  return (
    <Outer {...outerProps} className={`${styles.header} ${tone === "light" ? styles.light : ""} ${splitOnPhone ? styles.split : ""}`}>
      <div className={styles.row}>
        <Reveal y={24} transition={TEXT_SPRING} once={innerOnce} className={styles.title}>
          <h6 className={`h6 ${styles.titleText}`}>{title}</h6>
        </Reveal>
        {subtitle && (
          <div className={styles.subtitle}>
            <Reveal y={24} transition={TEXT_SPRING} once={innerOnce} className={styles.subtitleText}>
              <p className="p14">{subtitle}</p>
            </Reveal>
            <span className={styles.divider} />
          </div>
        )}
      </div>
      <LineDraw tone={tone === "light" ? "light" : "dark"} />
    </Outer>
  );
}
