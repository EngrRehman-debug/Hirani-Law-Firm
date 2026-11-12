/* FAQ items — read from src/content/<locale>.json (collections.faqs). */
import { getContent, type Content } from "@/content";

export type Faq = { question: string; answer: string };

export const getFaqs = (c: Content = getContent()): Faq[] => c.collections.faqs;
