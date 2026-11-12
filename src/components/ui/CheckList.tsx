import { Fragment } from "react";
import LineDraw from "./LineDraw";
import MaskIcon from "./MaskIcon";
import Reveal from "./Reveal";
import RichText from "./RichText";
import styles from "./CheckList.module.css";

/** Feature list with round check icons separated by drawing lines. */
type Props = { items: string[]; className?: string; /** fade/slide the list in on scroll (default true) */ reveal?: boolean };

export default function CheckList({ items, className, reveal = true }: Props) {
  const Wrap = reveal ? Reveal : "div";
  return (
    <Wrap className={`${styles.list} ${className ?? ""}`}>
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && <LineDraw />}
          <div className={styles.item}>
            <span className={styles.check}>
              <MaskIcon src="/icons/check.svg" size={16} />
            </span>
            <p className={`p18 ${styles.text}`}>
              <RichText text={item} />
            </p>
          </div>
        </Fragment>
      ))}
    </Wrap>
  );
}
