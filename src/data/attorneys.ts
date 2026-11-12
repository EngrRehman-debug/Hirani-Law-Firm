/* Team / attorneys collection — read from src/content/<locale>.json (collections.attorneys). */
import { getContent, type Content } from "@/content";

export type Attorney = Content["collections"]["attorneys"][number];
export type AttorneyProfile = Attorney["profile"];

export const getAttorneys = (c: Content = getContent()): Attorney[] => c.collections.attorneys;

/** The five members featured in the home page desktop layout. */
export const getFeaturedAttorneys = (c: Content = getContent()): Attorney[] =>
  c.collections.featuredAttorneys
    .map((slug) => getAttorneys(c).find((a) => a.slug === slug))
    .filter((a): a is Attorney => Boolean(a));

export const getAttorney = (slug: string, c: Content = getContent()) => getAttorneys(c).find((a) => a.slug === slug);
