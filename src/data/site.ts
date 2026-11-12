/* Global site content helpers (navigation, contact details, footer links) — read from src/content/<locale>.json. */
import { getContent, type Content } from "@/content";

export type SocialIcon = "facebook" | "instagram" | "linkedin" | "tiktok" | "x";
export type NavItem = { label: string; href: string };
export type SocialLink = { label: string; href: string; icon: SocialIcon };

export const getSocialLinks = (c: Content = getContent()) => c.site.social as SocialLink[];
