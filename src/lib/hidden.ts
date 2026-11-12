/**
 * Template-only pages and sections that the original Hirani site does not have.
 * They are hidden (not deleted) until the client decides — set a flag to false to bring one back.
 */
export const HIDDEN = {
  /** /case-studies, /case-studies/[slug] and the home "case studies" section */
  caseStudies: false, // shown again 2026-11-12 — pending client confirmation
  /** /legal/terms */
  terms: true,
  /** "Top verdicts and settlements" counters (home, about) */
  verdicts: true,
  /** Careers / job listings (about) */
  careers: true,
  /** Template video gallery (home, about) */
  videoGallery: false, // shown again 2026-11-12 — pending client confirmation
  /** Stock "trusted by" avatars (practice areas) */
  trustAvatars: true,
  /** Template signature image under the founder's name */
  founderSignature: true,
} as const;
