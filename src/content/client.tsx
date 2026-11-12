"use client";
/* Client-side access to the site content: the root layout wraps the app in <LocaleProvider>. */
import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE, dictionaries, type Content, type Locale } from "./index";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useContent(): Content {
  return dictionaries[useContext(LocaleContext)];
}

/** Saves the language choice and reloads, so the whole page renders in one language (same URL). */
export function switchLocale(next: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  window.location.reload();
}
