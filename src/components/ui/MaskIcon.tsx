import type { CSSProperties } from "react";

type Props = { src: string; size: number; color?: string; className?: string };

/** Single-colour icon rendered through a CSS mask (same technique as the original). */
export default function MaskIcon({ src, size, color = "var(--c-accent)", className }: Props) {
  const style: CSSProperties = {
    display: "block",
    flex: "none",
    width: size,
    height: size,
    backgroundColor: color,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };
  return <span className={className} style={style} aria-hidden />;
}
