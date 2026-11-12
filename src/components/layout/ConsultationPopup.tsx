"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ContactForm from "@/components/ui/ContactForm";
import SectionLabel from "@/components/ui/SectionLabel";
import { useContent } from "@/content/client";
import styles from "./ConsultationPopup.module.css";

/* Same behaviour as the original site: opens once per browser session, 25 seconds after the first page load. */
const POPUP_KEY = "hl-consultation-popup-shown";
const POPUP_DELAY_MS = 25000;

/** Timed "Need a consultation?" modal. Closes on ×, Escape or a click on the backdrop. */
export default function ConsultationPopup() {
  const t = useContent().site.consultationPopup;
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(POPUP_KEY)) return undefined;
    } catch {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setOpen(true);
      try {
        window.sessionStorage.setItem(POPUP_KEY, "true");
      } catch {
        // storage unavailable: the popup may show again on the next visit
      }
    }, POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onMouseDown={() => setOpen(false)}>
      <section
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-popup-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={t.close}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.imageWrap}>
          <Image src={t.image} alt={t.imageAlt} fill sizes="(max-width: 767px) 100vw, 360px" className={styles.image} />
          <div className={styles.caption}>{t.caption}</div>
        </div>

        <div className={styles.content}>
          <SectionLabel>{t.eyebrow}</SectionLabel>
          <h2 id="consult-popup-title" className={`h4 ${styles.title}`}>
            {t.title}
          </h2>
          <p className={`p16 ${styles.body}`}>{t.body}</p>
          <ContactForm showTitle={false} />
        </div>
      </section>
    </div>
  );
}
