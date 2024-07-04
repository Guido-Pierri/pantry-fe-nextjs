import { acceptLanguage } from "next/dist/server/accept-header";
import { fallbackLng, languages } from "@/app/i18n/settings";
import { NextResponse } from "next/server";
export {auth as middleware} from "@/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// Define cookieName with the actual cookie name you're using for language settings
const cookieName = "YOUR_COOKIE_NAME_HERE";

export function middleware(req: {
  cookies: {
    has: (name: string) => boolean;
    get: (name: string) => string | undefined;
  };
  headers: {
    get: (name: string) => string | null;
    has: (name: string) => boolean;
  };
  nextUrl: { pathname: string };
  url: string | URL;
}) {
  let lng;
  if (req.cookies.has(cookieName)) {
    const cookieValue = req.cookies.get(cookieName);
    if (cookieValue) {
      const cookieValueStr = String(cookieValue);

      lng = acceptLanguage(cookieValueStr, languages);
    }
  }
  if (!lng)
    lng = acceptLanguage(req.headers.get("Accept-Language") || "", languages);
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url.toString()),
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") || "");
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
