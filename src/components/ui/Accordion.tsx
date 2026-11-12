"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { useAppear } from "@/lib/useAppear";
import type { Faq } from "@/data/faqs";
import styles from "./Accordion.module.css";

/* Springs measured on the original: height ~0.25s (slightly underdamped), answer fades/rises after ~90ms. */
const HEIGHT_SPRING = { type: "spring" as const, stiffness: 529, damping: 38, mass: 1 };
const TEXT_SPRING = { type: "spring" as const, stiffness: 218, damping: 29.5, mass: 1, delay: 0.09 };

const ITEM_REVEAL = { duration: 0.8, ease: [0.12, 0.23, 0, 0.99] as [number, number, number, number], delay: 0.62 };

/** One FAQ row: fades/rises 10px when it enters the viewport. */
function Item({ replay, children }: { replay: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useAppear(ref, { once: !replay });
  return (
    <motion.div
      ref={ref}
      className={styles.item}
      initial={{ opacity: 0, y: 10 }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 10, transition: { duration: 0 } }}
      transition={ITEM_REVEAL}
    >
      {children}
    </motion.div>
  );
}

/** Answer text: rises 20px when visible (on page appear and whenever it is opened). */
function Answer({ replay, children }: { replay: boolean; children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shown = useAppear(ref, { once: !replay });
  return (
    <motion.p
      ref={ref}
      className={`p16 ${styles.aText}`}
      initial={{ opacity: 0, y: 20 }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, transition: { duration: 0 } }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={TEXT_SPRING}
    >
      {children}
    </motion.p>
  );
}

/** FAQ accordion – items toggle independently (as on the original), the first one open by default. */
type Props = {
  items: Faq[];
  defaultOpen?: number;
  /** Items and answers re-animate every time they re-enter the viewport (contact page) */
  replay?: boolean;
};

export default function Accordion({ items, defaultOpen = 0, replay = false }: Props) {
  // the default-open answer is rendered at full height; only later toggles animate the height
  const [interacted, setInteracted] = useState(false);
  const [open, setOpen] = useState<Set<number>>(() => new Set([defaultOpen]));
  const toggle = (i: number) => {
    setInteracted(true);
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <Item key={item.question} replay={replay}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
            >
              <span className={`serif20 ${styles.qText}`}>{item.question}</span>
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden>
                <span className={styles.barH} />
                <span className={styles.barV} />
              </span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="answer"
                  className={styles.answerWrap}
                  initial={interacted ? { height: 0 } : false}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={HEIGHT_SPRING}
                >
                  <div className={styles.answer}>
                    <Answer replay={replay}>{item.answer}</Answer>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Item>
        );
      })}
    </div>
  );
}
