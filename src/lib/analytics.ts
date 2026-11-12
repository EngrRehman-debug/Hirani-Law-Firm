/* Google Consent Mode + Tag Manager, ported from the original site (src/utils/analytics.js).
   Tags only load after the visitor accepts analytics or advertising in the cookie banner. */

const GTM_CONTAINER_ID = "GTM-T8KPC6ZH";
const SCRIPT_ID = "hl-google-tag-manager";
const IFRAME_ID = "hl-google-tag-manager-iframe";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: Gtag;
  }
}

/** Inline script for <head>: consent defaults (everything optional denied) before any tag can run. */
export const CONSENT_DEFAULTS_SCRIPT = `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`;

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  return window.gtag;
}

function loadGoogleTagManager() {
  if (!document.getElementById(SCRIPT_ID)) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
    document.head.appendChild(script);
  }
  if (!document.getElementById(IFRAME_ID)) {
    const iframe = document.createElement("iframe");
    iframe.id = IFRAME_ID;
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    iframe.title = "Google Tag Manager";
    document.body.appendChild(iframe);
  }
}

function clearGoogleCookies({ analytics, advertising }: Consent) {
  const names = document.cookie.split(";").map((item) => item.split("=")[0].trim());
  const googleNames = names.filter(
    (name) =>
      (!analytics && (name === "_ga" || name === "_gid" || name === "_gat" || name.startsWith("_ga_"))) ||
      (!advertising && (name.startsWith("_gcl_") || name === "_gac")),
  );
  const domains = ["", window.location.hostname, `.${window.location.hostname}`, ".hiranilawfirm.com", ".hiranilawfirm.co"];
  for (const name of googleNames) {
    for (const domain of domains) {
      const domainPart = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`;
    }
  }
}

type Consent = { analytics: boolean; advertising: boolean };

export function applyGoogleConsent({ analytics, advertising }: Consent) {
  const gtag = ensureGtag();
  gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: advertising ? "granted" : "denied",
    ad_user_data: advertising ? "granted" : "denied",
    ad_personalization: advertising ? "granted" : "denied",
  });
  if (analytics || advertising) loadGoogleTagManager();
  else document.getElementById(IFRAME_ID)?.remove();
  clearGoogleCookies({ analytics, advertising });
}

/** Event the footer "Cookie Settings" link fires to reopen the banner. */
export const OPEN_COOKIE_SETTINGS = "hl:open-cookie-settings";
