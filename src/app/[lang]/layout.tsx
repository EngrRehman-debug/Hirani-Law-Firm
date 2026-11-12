import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultationPopup from "@/components/layout/ConsultationPopup";
import CookieConsent from "@/components/layout/CookieConsent";
import { CONSENT_DEFAULTS_SCRIPT } from "@/lib/analytics";
import { LOCALES, getContent, setRequestLocale } from "@/content";
import { LocaleProvider } from "@/content/client";
import "../globals.css";

/* The exact font files served by the original site (Google Fonts static instances). */
const dmSans = localFont({
  variable: "--font-dm-sans",
  display: "swap",
  src: [
    { path: "../../fonts/DMSans-400.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/DMSans-500.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/DMSans-700.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/DMSans-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../../fonts/DMSans-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../../fonts/DMSans-700-italic.woff2", weight: "700", style: "italic" },
  ],
});

const fraunces = localFont({
  variable: "--font-fraunces",
  display: "swap",
  src: [
    { path: "../../fonts/Fraunces-200.woff2", weight: "200", style: "normal" },
    { path: "../../fonts/Fraunces-300.woff2", weight: "300", style: "normal" },
    { path: "../../fonts/Fraunces-400.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/Fraunces-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../../fonts/Fraunces-400-italic.woff2", weight: "400", style: "italic" },
  ],
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const content = getContent(setRequestLocale((await params).lang));
  return {
    metadataBase: new URL("https://www.hiranilawfirm.com"),
    title: { default: content.meta.titleDefault, template: content.meta.titleTemplate },
    description: content.meta.description,
    // same head tags as the original index.html
    icons: { icon: [{ url: "/favicon.png", type: "image/png" }] },
    other: { "gridinsoft-key": content.seo.verification.gridinsoft },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e0e0e",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const locale = setRequestLocale((await params).lang);
  const content = getContent(locale);
  return (
    <html lang={content.locale} dir={content.dir} className={`${dmSans.variable} ${fraunces.variable}`}>
      <head>
        {/* Google Consent Mode defaults (all optional storage denied) before any tag loads */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <LocaleProvider locale={locale}>
          <Navbar />
          {children}
          <Footer />
          <ConsultationPopup />
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
