import type { Metadata } from "next";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { setRequestLocale } from "@/content";
import { routeMetadata } from "@/lib/metadata";
import RouteSeo from "@/components/layout/RouteSeo";
import { getLegalPages } from "@/data/legal";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy-policy">): Promise<Metadata> {
  return routeMetadata(params, "/privacy-policy");
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy-policy">) {
  setRequestLocale((await params).lang);
  return (
    <>
      <RouteSeo route="/privacy-policy" />
      <LegalDocument page={getLegalPages().privacy} />
    </>
  );
}
