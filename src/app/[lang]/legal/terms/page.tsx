import { notFound } from "next/navigation";
import { HIDDEN } from "@/lib/hidden";
import type { Metadata } from "next";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import { getLegalPages } from "@/data/legal";

export async function generateMetadata({ params }: PageProps<"/[lang]/legal/terms">): Promise<Metadata> {
  return routeMetadata(params, "/legal/terms");
}

export default async function TermsPage({ params }: PageProps<"/[lang]/legal/terms">) {
  if (HIDDEN.terms) notFound(); // template-only page, hidden until the client decides
  setRequestLocale((await params).lang);
  return <LegalDocument page={getLegalPages().terms} />;
}
