import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, setRequestLocale } from "@/content";
import { getAttorneys } from "@/data/attorneys";
import AttorneyProfile from "../../AttorneyProfile";
import { routeMetadata } from "@/lib/metadata";

/** Team members live under /about/our-team/<slug>; Sehar Hirani has her own page at /about/sehar-hirani. */
const isTeamMember = (href: string, slug: string) => href === `/about/our-team/${slug}`;

export function generateStaticParams() {
  return getAttorneys(getContent("en"))
    .filter((a) => isTeamMember(a.href, a.slug))
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/about/our-team/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return routeMetadata(params, `/about/our-team/${slug}`);
}

export default async function TeamMemberPage({ params }: PageProps<"/[lang]/about/our-team/[slug]">) {
  const { slug, lang } = await params;
  setRequestLocale(lang);
  const member = getAttorneys().find((a) => a.slug === slug);
  if (!member || !isTeamMember(member.href, member.slug)) notFound();
  return <AttorneyProfile slug={slug} />;
}
