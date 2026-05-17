import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SchemaOrg } from "@/components/site/schema-org";
import { SiteShell } from "@/components/site/site-shell";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return buildMetadata(locale, "home");
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div lang={locale} className="flex min-h-full flex-1 flex-col">
      <SchemaOrg locale={locale} />
      <SiteShell locale={locale as Locale}>{children}</SiteShell>
    </div>
  );
}
