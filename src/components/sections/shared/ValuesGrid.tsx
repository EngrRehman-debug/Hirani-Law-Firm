import Image from "next/image";
import type { ComponentType } from "react";
import Button from "@/components/ui/Button";
import {
  BadgeCheckIcon,
  ChatIcon,
  MegaphoneIcon,
  ScrollIcon,
  TargetIcon,
  UsersIcon,
  type IconProps,
} from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { getContent } from "@/content";
import styles from "./ValuesGrid.module.css";

/** Icon names used in content JSON (sections.values.items[].icon). */
const ICONS: Record<string, ComponentType<IconProps>> = {
  badgeCheck: BadgeCheckIcon,
  users: UsersIcon,
  target: TargetIcon,
  scroll: ScrollIcon,
  megaphone: MegaphoneIcon,
  chat: ChatIcon,
};

type Props = {
  label?: string;
  heading?: string;
  showLadyJustice?: boolean;
  /** Home places the statue 40px outside the wrapper, the About page flush with it */
  ladyInset?: boolean;
  /** About page uses a 120px gap between the title and the grid */
  spacious?: boolean;
  /** About page: every block re-animates each time it re-enters the viewport */
  replay?: boolean;
  /** Cards to show instead of the firm values (e.g. review themes) */
  items?: { icon: string; title: string; text: string }[];
  /** Show the closing text + buttons row */
  showCta?: boolean;
  /** 2 columns on desktop (for 4 cards); default 3 */
  columns?: 2 | 3;
};

/** Six firm values in a bordered 3×2 grid, followed by a short CTA. */
export default function ValuesGrid({
  label,
  heading,
  showLadyJustice = true,
  ladyInset = false,
  spacious = false,
  replay = false,
  items,
  showCta = true,
  columns = 3,
}: Props) {
  const t = getContent().sections.values;
  const cards = items ?? t.items;
  const once = !replay;
  return (
    <div className={`${styles.block} ${spacious ? styles.spacious : ""} ${columns === 2 ? styles.twoCol : ""}`}>
      <div className={styles.titleRow}>
        <Reveal once={once} className={styles.title}>
          <SectionLabel>{label ?? t.label}</SectionLabel>
          <h2 className={`h2 ${styles.heading}`}>{heading ?? t.heading}</h2>
        </Reveal>
      </div>

      <div className={styles.features}>
        <div className={styles.grid}>
          {cards.map(({ title, text, icon }) => {
            const Icon = ICONS[icon] ?? BadgeCheckIcon;
            return (
              <Reveal key={title} once={once} className={styles.cell}>
                <div className={styles.card}>
                  <Icon className={styles.icon} width={32} height={32} />
                  <div className={styles.cardText}>
                    <p className={`h5 ${styles.cardTitle}`}>{title}</p>
                    <p className={`p16 balance ${styles.cardBody}`}>{text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {showCta && (
          <div className={styles.ctaRow}>
            <div className={styles.ctaSpacer} />
            <Reveal once={once} className={styles.cta}>
              <p className={`p18 balance ${styles.ctaText}`}>{t.ctaText}</p>
              <Reveal y={20} amount={0.5} once={once} className={styles.ctaButtons}>
                <Button href={t.primaryCta.href} variant="fillDark" arrow>
                  {t.primaryCta.label}
                </Button>
                <Button href={t.secondaryCta.href} variant="outlineDark">
                  {t.secondaryCta.label}
                </Button>
              </Reveal>
            </Reveal>
          </div>
        )}
      </div>

      {showLadyJustice && (
        <Reveal amount={0.5} once={once} className={`${styles.lady} ${ladyInset ? styles.ladyInset : ""}`}>
          <Image src="/images/4FpB4qMXeILhoNcYuDLXRDqTs.png" alt="" fill sizes="448px" className={styles.ladyImg} />
        </Reveal>
      )}
    </div>
  );
}
