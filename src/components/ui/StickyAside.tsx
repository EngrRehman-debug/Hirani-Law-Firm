"use client";

import { useEffect, useRef, type ReactNode } from "react";

const TOP = 120; // clears the fixed header
const BOTTOM = 40;

/**
 * Sidebar that stays in view while the main column scrolls (position: sticky comes from the CSS class).
 * A sidebar taller than the window gets a negative `top`, so it first scrolls to its end and then
 * stays put with its bottom in view — nothing in it becomes unreachable.
 */
export default function StickyAside({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const room = window.innerHeight - TOP - BOTTOM;
      const height = el.offsetHeight;
      el.style.top = height > room ? `${window.innerHeight - height - BOTTOM}px` : `${TOP}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <aside ref={ref} className={className}>
      {children}
    </aside>
  );
}
