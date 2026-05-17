import type { Locale } from "./i18n";

export const SITE_NAME = "United Armenian Senate";
export const SITE_NAME_RU = "Всеармянский Сенат";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://unitedarmeniansenate.org";

export const routeKeys = [
  "home",
  "structure",
  "documents",
  "join",
] as const;

export type RouteKey = (typeof routeKeys)[number];

export const routePaths: Record<RouteKey, string> = {
  home: "",
  structure: "structure",
  documents: "documents",
  join: "join",
};

export function getLocalizedPath(locale: Locale, route: RouteKey) {
  const suffix = routePaths[route];
  return suffix ? `/${locale}/${suffix}` : `/${locale}`;
}

export function getCanonicalUrl(locale: Locale, route: RouteKey) {
  return `${SITE_URL}${getLocalizedPath(locale, route)}`;
}
