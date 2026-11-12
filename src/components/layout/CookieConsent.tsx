"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import RichText from "@/components/ui/RichText";
import { useContent } from "@/content/client";
import { OPEN_COOKIE_SETTINGS, applyGoogleConsent } from "@/lib/analytics";
import styles from "./CookieConsent.module.css";

/* Same storage key, version and 180-day expiry as the original site, so existing choices carry over. */
const STORAGE_KEY = "hl-cookie-consent";
const CONSENT_VERSION = 3;
const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

type StoredConsent = { version: number; analytics: boolean; advertising: boolean; timestamp: string };

function readConsent(): StoredConsent | null {
  try {
    const consent = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as StoredConsent | null;
    if (consent?.version !== CONSENT_VERSION) return null;
    if (!consent.timestamp || Date.now() - new Date(consent.timestamp).getTime() > MAX_AGE_MS) return null;
    return consent;
  } catch {
    return null;
  }
}

/** Cookie consent banner (bottom of the screen) with Accept / Reject / Customize, as on the original site. */
export default function CookieConsent() {
  const t = useContent().site.cookieConsent;
  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    /* eslint-disable react-hooks/set-state-in-effect -- the stored choice is only readable on the client */
    if (consent) {
      setAnalytics(Boolean(consent.analytics));
      setAdvertising(Boolean(consent.advertising));
      applyGoogleConsent({ analytics: Boolean(consent.analytics), advertising: Boolean(consent.advertising) });
    } else {
      setShow(true);
    }
    /* eslint-enable react-hooks/set-state-in-effect */

    const openSettings = () => {
      const current = readConsent();
      setAnalytics(Boolean(current?.analytics));
      setAdvertising(Boolean(current?.advertising));
      setSettings(true);
      setShow(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, openSettings);
  }, []);

  const save = (analyticsAllowed: boolean, advertisingAllowed: boolean, decision: string) => {
    const consent = {
      version: CONSENT_VERSION,
      essential: true,
      analytics: analyticsAllowed,
      advertising: advertisingAllowed,
      decision,
      timestamp: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // Consent still applies for this page view if storage is unavailable.
    }
    applyGoogleConsent({ analytics: analyticsAllowed, advertising: advertisingAllowed });
    setAnalytics(analyticsAllowed);
    setAdvertising(advertisingAllowed);
    setSettings(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className={`${styles.banner} ${settings ? styles.isSettings : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hl-cookie-title"
    >
      <div className={styles.content}>
        <h2 id="hl-cookie-title" className={`serif ${styles.title}`}>
          {t.title}
        </h2>
        {!settings ? (
          <p className={styles.text}>
            {t.text} <Link href="/privacy-policy">{t.privacyLink}</Link>
          </p>
        ) : (
          <div className={styles.settings}>
            <p className={styles.text}>{t.settingsText}</p>
            <div className={styles.category}>
              <div>
                <strong>{t.essential.title}</strong>
                <small>{t.essential.text}</small>
              </div>
              <span className={styles.always}>{t.essential.always}</span>
            </div>
            <label className={styles.category} htmlFor="hl-analytics-consent">
              <div>
                <strong>{t.analytics.title}</strong>
                <small>
                  <RichText text={t.analytics.text} />
                </small>
              </div>
              <input
                id="hl-analytics-consent"
                type="checkbox"
                role="switch"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
            </label>
            <label className={styles.category} htmlFor="hl-advertising-consent">
              <div>
                <strong>{t.advertising.title}</strong>
                <small>{t.advertising.text}</small>
              </div>
              <input
                id="hl-advertising-consent"
                type="checkbox"
                role="switch"
                checked={advertising}
                onChange={(e) => setAdvertising(e.target.checked)}
              />
            </label>
            <p className={styles.policyNote}>
              {t.policyNote}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                {t.googlePolicy}
              </a>
              . <Link href="/privacy-policy">{t.ourPolicy}</Link>.
            </p>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {settings ? (
          <>
            <Button variant="fillLight" compactFrom="never" onClick={() => save(analytics, advertising, "custom")}>
              {t.save}
            </Button>
            <Button variant="outlineLight" compactFrom="never" onClick={() => save(false, false, "rejected")}>
              {t.rejectAll}
            </Button>
          </>
        ) : (
          <>
            <Button variant="fillLight" compactFrom="never" onClick={() => save(true, true, "accepted")}>
              {t.acceptAll}
            </Button>
            <Button variant="outlineLight" compactFrom="never" onClick={() => save(false, false, "rejected")}>
              {t.rejectAll}
            </Button>
            <button type="button" className={styles.customize} onClick={() => setSettings(true)}>
              {t.customize}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
