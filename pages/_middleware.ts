import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { locale, pathname, hostname, origin } = nextUrl;

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents.
  if (pathname.startsWith(`/_sites`)) {
    return NextResponse.redirect("/404");
  }

  if (
    !pathname.includes(".") && // exclude all files in the public folder
    !pathname.startsWith("/api") // exclude all API routes
  ) {
    // rewrite to the current hostname under the pages/sites folder
    // the main logic component will happen in pages/sites/[site]/index.tsx
    const redirectUrl = new URL(`/_sites/test${pathname}`, req.url).toString();
    return NextResponse.rewrite(redirectUrl);
  } else {
    return NextResponse.next();
  }
}
