"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Viewport trigger that mirrors Framer's "Appear" scroll effect.
 *
 * - Becomes `true` once the element is in view (`amount` = visible fraction, 0 = any pixel).
 * - With `once` (default) it then stays `true`.
 * - With `once: false` ("replay" in Framer) it resets only when the element leaves the viewport
 *   through the bottom edge, i.e. when the visitor scrolls back up past it. Scrolling down past an
 *   element (leaving through the top) keeps it in its revealed state, exactly like the original.
 */
export function useAppear(ref: RefObject<Element | null>, { amount = 0, once = true }: { amount?: number; once?: boolean } = {}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const visible = e.isIntersecting && (amount <= 0 || e.intersectionRatio >= amount - 0.001);
          if (visible) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once && !e.isIntersecting && e.boundingClientRect.top > 0) {
            setShown(false);
          }
        }
      },
      { threshold: amount > 0 ? [0, amount] : [0] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount, once]);

  return shown;
}
