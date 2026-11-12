import { NextResponse, type NextRequest } from "next/server";

/*
 * Language routing without changing URLs.
 * Public URLs are the original Hirani Law Firm URLs (e.g. /about, /practice-areas/family-law/...).
 * Every page request is rewritten internally to /en/... or /es/... based on the `hl-lang` cookie.
 * Direct visits to the internal /en or /es paths are redirected back to the clean URL.
 */
const LOCALES = ["en", "es"];
const COOKIE = "hl-lang";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  const internal = pathname.match(/^\/(en|es)(\/.*)?$/);
  if (internal) {
    url.pathname = internal[2] || "/";
    const res = NextResponse.redirect(url, 308);
    res.cookies.set(COOKIE, internal[1], { path: "/", maxAge: 31536000, sameSite: "lax" });
    return res;
  }

  const cookie = request.cookies.get(COOKIE)?.value;
  const lang = cookie && LOCALES.includes(cookie) ? cookie : "en";
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // skip Next internals, API routes and any file with an extension (images, PDFs, robots.txt, sitemap.xml…)
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
