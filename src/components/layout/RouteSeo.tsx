import { getContent } from "@/content";
import { getSeoRoute } from "@/lib/metadata";

/**
 * Per-route structured data (JSON-LD) and og:logo, as on the original site.
 * React hoists the <meta> into <head>. Call after setRequestLocale().
 */
export default function RouteSeo({ route }: { route: string }) {
  const { seo } = getContent();
  const s = getSeoRoute(seo, route);
  return (
    <>
      <meta property="og:logo" content={seo.logo} />
      {/* root URL keeps its trailing slash, as on the original (Next's metadata would drop it) */}
      {s?.canonical.endsWith("/") && (
        <>
          <link rel="canonical" href={s.canonical} />
          <meta property="og:url" content={s.canonical} />
        </>
      )}
      {s?.jsonLd && (
        <script
          type="application/ld+json"
          // escaped like the original generator so the JSON can't close the script tag
          dangerouslySetInnerHTML={{ __html: s.jsonLd.replaceAll("<", "\\u003c") }}
        />
      )}
    </>
  );
}
