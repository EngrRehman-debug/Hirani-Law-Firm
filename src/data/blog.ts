/* Blog collection — read from src/content/<locale>.json (collections.blog). */
import { getContent, type Content } from "@/content";

export type BlogPost = Content["collections"]["blog"][number];
export type BlogContent = BlogPost["content"];

export const getPosts = (c: Content = getContent()): BlogPost[] => c.collections.blog;

export const getPost = (slug: string, c: Content = getContent()) => getPosts(c).find((p) => p.slug === slug);
