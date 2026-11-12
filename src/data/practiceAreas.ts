/* Practice areas collection — read from src/content/<locale>.json (collections.practiceAreas). */
import { getContent, type Content } from "@/content";

export type PracticeArea = Content["collections"]["practiceAreas"][number];
export type PracticeAreaDetail = PracticeArea["detail"];

export const getPracticeAreas = (c: Content = getContent()): PracticeArea[] => c.collections.practiceAreas;

export const getPracticeArea = (category: string, slug: string, c: Content = getContent()) =>
  getPracticeAreas(c).find((p) => p.category === category && p.slug === slug);

/** The six areas shown in the home page scroller. */
export const getFeaturedPracticeAreas = (c: Content = getContent()): PracticeArea[] =>
  c.collections.featuredPracticeAreas
    .map((slug) => getPracticeAreas(c).find((p) => p.slug === slug))
    .filter((p): p is PracticeArea => Boolean(p));
