/* Legal pages (privacy / terms) — read from src/content/<locale>.json (collections.legal). */
import { getContent, type Content } from "@/content";

export type LegalBlock =
  | { type: "text"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type LegalPage = { title: string; updated: string; blocks: LegalBlock[] };

export const getLegalPages = (c: Content = getContent()) => c.collections.legal as Record<"privacy" | "terms", LegalPage>;
