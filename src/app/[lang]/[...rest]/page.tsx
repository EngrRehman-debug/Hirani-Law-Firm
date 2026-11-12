import { notFound } from "next/navigation";
import { setRequestLocale } from "@/content";

/** Any URL without a page renders the site's 404 page (inside the language layout). */
export default async function CatchAll({ params }: PageProps<"/[lang]/[...rest]">) {
  setRequestLocale((await params).lang);
  notFound();
}
