"use client";

import { useContent } from "@/content/client";
import { OPEN_COOKIE_SETTINGS } from "@/lib/analytics";

/** Footer link that reopens the cookie consent banner in its settings view. */
export default function CookieSettingsButton({ className }: { className?: string }) {
  const t = useContent().site.cookieConsent;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}>
      {t.footerLink}
    </button>
  );
}
