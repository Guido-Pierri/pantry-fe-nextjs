import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, languages } from "@/app/i18n/settings";
import { auth } from "@/auth";

let locales = ["en", "sv"];

function getLocale(request: NextRequest): string {
  const urlLocale = request.nextUrl.pathname.split("/")[1];
  if (languages.includes(urlLocale)) {
    return urlLocale;
  }
  const acceptLanguageHeader = request.headers.get("accept-language");
  if (acceptLanguageHeader) {
    const requestedLocales = acceptLanguageHeader
      .split(",")
      .map((lang) => lang.split(";")[0]);
    for (const locale of requestedLocales) {
      if (languages.includes(locale)) {
        return locale;
      }
    }
  }
  return fallbackLng;
}

const middleware = (request: NextRequest): NextResponse | void => {
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const newPathname = `/${locale}${pathname}`;
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = newPathname;

  return NextResponse.redirect(newUrl);
};

export default auth(middleware);

export const config = {
  matcher: ["/((?!_next).*)"],
};
