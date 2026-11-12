import type { Metadata } from "next";
import { setRequestLocale } from "@/content";
import AttorneyProfile from "../AttorneyProfile";
import { routeMetadata } from "@/lib/metadata";

const SLUG = "sehar-hirani";

export async function generateMetadata({ params }: PageProps<"/[lang]/about/sehar-hirani">): Promise<Metadata> {
  return routeMetadata(params, "/about/sehar-hirani");
}

export default async function SeharHiraniPage({ params }: PageProps<"/[lang]/about/sehar-hirani">) {
  setRequestLocale((await params).lang);
  return <AttorneyProfile slug={SLUG} />;
}
