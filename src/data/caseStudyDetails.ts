/* Case study detail pages — read from src/content/<locale>.json (collections.caseStudies[].detail). */
import { getContent, type Content } from "@/content";

export type CaseBlock = { heading: string; text: string[] };
export type CaseStudyDetail = {
  overview: CaseBlock;
  strategy: CaseBlock;
  result: CaseBlock;
  images: { src: string; alt: string }[];
};

export const getCaseStudyDetail = (slug: string, c: Content = getContent()): CaseStudyDetail | undefined =>
  c.collections.caseStudies.find((cs) => cs.slug === slug)?.detail;
