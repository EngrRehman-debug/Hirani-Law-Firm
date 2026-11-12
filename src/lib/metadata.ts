import type { Metadata } from "next";
import { getContent, setRequestLocale, type Content } from "@/content";

export type SeoRoute = {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  type: string;
  image: { url: string; type: string; width: number; height: number; alt: string };
  article: null | { publishedTime: string; modifiedTime: string; author: string; section: string; tags: string[] };
  feed: boolean;
  jsonLd: string;
};

/** SEO entry for a route (content seo.routes), undefined for routes the original site does not have. */
export const getSeoRoute = (seo: Content["seo"], route: string) =>
  (seo.routes as unknown as Record<string, SeoRoute | undefined>)[route];

/**
 * SEO for a route, identical to the original site (title, description, canonical, Open Graph, Twitter,
 * article tags, RSS link). The values come from content `seo.routes` (built from the original
 * SEO.jsx / generate-social-pages.mjs); JSON-LD and og:logo are rendered by <RouteSeo>.
 */
export async function routeMetadata(params: Promise<{ lang: string }>, route: string): Promise<Metadata> {
  const { seo } = getContent(setRequestLocale((await params).lang));
  const s = getSeoRoute(seo, route);
  if (!s) return {};
  const image = { url: s.image.url, secureUrl: s.image.url, type: s.image.type, width: s.image.width, height: s.image.height, alt: s.image.alt };
  const article = s.article;
  // Next drops the trailing slash of the root URL; <RouteSeo> writes those two tags for "/" instead
  const exactUrl = s.canonical.endsWith("/");
  return {
    title: { absolute: s.title },
    description: s.description,
    ...(s.keywords ? { keywords: s.keywords } : {}),
    ...(s.type === "article" ? { robots: "index, follow, max-image-preview:large, max-snippet:-1" } : {}),
    alternates: {
      ...(exactUrl ? {} : { canonical: s.canonical }),
      ...(s.feed ? { types: { "application/rss+xml": [{ url: seo.feed.url, title: seo.feed.title }] } } : {}),
    },
    openGraph: {
      locale: "en_US",
      siteName: seo.siteName,
      title: s.title,
      description: s.description,
      ...(exactUrl ? {} : { url: s.canonical }),
      images: [image],
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [article.author],
            section: article.section,
            tags: article.tags,
          }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.description,
      images: [{ url: s.image.url, alt: s.image.alt }],
    },
  };
}
