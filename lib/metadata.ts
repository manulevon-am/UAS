import type { Metadata } from "next";

import { getAlternates, routeMeta, type StaticRoute } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function buildMetadata(locale: Locale, route: StaticRoute): Metadata {
  const data = routeMeta[locale][route];

  return {
    title: data.title,
    description: data.description,
    metadataBase: new URL(SITE_URL),
    alternates: getAlternates(locale, route),
    openGraph: {
      title: data.title,
      description: data.description,
      url: getAlternates(locale, route).canonical,
      siteName: SITE_NAME,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}
