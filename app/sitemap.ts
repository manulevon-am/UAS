import type { MetadataRoute } from "next";

import {
  institutionBlocks,
  mandateDistributionSections,
  mandateRegions,
} from "@/data/site-content";
import { locales } from "@/lib/i18n";
import { routeKeys, routePaths, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localizedEntries = locales.flatMap((locale) =>
    routeKeys.map((route) => {
      const suffix = routePaths[route];
      const url = suffix ? `${SITE_URL}/${locale}/${suffix}` : `${SITE_URL}/${locale}`;

      return {
        url,
        lastModified: now,
        changeFrequency: route === "home" ? "weekly" : "monthly",
        priority: route === "home" ? 1 : 0.7,
      } satisfies MetadataRoute.Sitemap[number];
    }),
  );

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...localizedEntries,
    ...locales.flatMap((locale) =>
      mandateRegions.map((region) => ({
        url: `${SITE_URL}/${locale}/regions/${region.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ),
    ...locales.flatMap((locale) =>
      institutionBlocks.map((block) => ({
        url: `${SITE_URL}/${locale}/institutions/${block.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.65,
      })),
    ),
    ...locales.flatMap((locale) =>
      mandateDistributionSections.map((section) => ({
        url: `${SITE_URL}/${locale}/distribution/${section.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.65,
      })),
    ),
  ];
}
