/* Case studies collection — read from src/content/<locale>.json (collections.caseStudies). */
import { getContent, type Content } from "@/content";

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  verdict: string;
  excerpt: string;
  image: string;
};

export const getCaseStudies = (c: Content = getContent()): CaseStudy[] => c.collections.caseStudies;

export const getFeaturedCases = (c: Content = getContent()): CaseStudy[] =>
  c.collections.featuredCaseStudies
    .map((slug) => getCaseStudies(c).find((cs) => cs.slug === slug))
    .filter((cs): cs is CaseStudy => Boolean(cs));

export const getCaseStudy = (slug: string, c: Content = getContent()) => getCaseStudies(c).find((cs) => cs.slug === slug);
