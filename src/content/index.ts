/*
 * Site content entry point.
 *
 * ALL copy and data shown on the website lives in one JSON file per language: `src/content/<locale>.json`
 * (English and Spanish, generated from the original Hirani Law Firm site content).
 *
 * The language is chosen by the `hl-lang` cookie, not by the URL: `src/proxy.ts` rewrites every page request
 * to the internal `/[lang]/…` route, so public URLs stay exactly the same as the original site.
 *
 * - Server components call `getContent()`; the page/layout first calls `setRequestLocale(lang)`.
 * - Client components call `useContent()` from `@/content/client`.
 */
import { cache } from "react";
import en from "./en.json";
import es from "./es.json";

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
/** Cookie that stores the visitor's language choice (read by src/proxy.ts). */
export const LOCALE_COOKIE = "hl-lang";

/** Shape of a language file. Every locale must provide exactly the same keys as `en.json`. */
export type Content = typeof en;

export const dictionaries: Record<Locale, Content> = { en, es };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Per-request locale store for server components. */
const requestLocale = cache(() => ({ locale: DEFAULT_LOCALE as Locale }));

/** Sets the language for the current server render. Call it at the top of every layout, page and generateMetadata. */
export function setRequestLocale(lang: string): Locale {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  requestLocale().locale = locale;
  return locale;
}

export function getLocale(): Locale {
  return requestLocale().locale;
}

/** Returns the content for a locale (defaults to the current request's language). */
export function getContent(locale: Locale = getLocale()): Content {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

/** Fills `{name}` placeholders in a content string, e.g. `format("Go to slide {n}", { n: 2 })`. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
