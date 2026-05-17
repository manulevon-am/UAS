import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { documents } from "@/data/site-content";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { withBasePath } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  return buildMetadata(locale, "documents");
}

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div>
      <PageHero
        eyebrow={locale === "ru" ? "Документы" : locale === "en" ? "Documents" : "Փաստաթղթեր"}
        title={locale === "ru" ? "Основные документы Сената" : locale === "en" ? "Core Senate documents" : "Սենատի հիմնական փաստաթղթերը"}
        description={locale === "ru" ? "Пока на странице собраны ключевые программные документы организации." : locale === "en" ? "For now, the page contains the key programmatic documents of the organization." : "Այս էջում հավաքված են կազմակերպության հիմնական ծրագրային փաստաթղթերը։"}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <AnimatedSection>
          <div className="grid gap-5 lg:grid-cols-2">
            {documents.map((document) => {
              const fileUrl = withBasePath(document.fileUrl);

              return (
                <Card key={document.id}>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                    {document.category[locale]}
                  </div>
                  <div className="text-xs uppercase tracking-[0.24em] text-[var(--color-graphite-soft)]">
                    {document.language}
                  </div>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-[var(--color-graphite)]">
                  {document.title[locale]}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-graphite-soft)]">
                  {document.description[locale]}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="secondary">
                    <Link href={fileUrl} target="_blank">
                      <FileText className="h-4 w-4" />
                      {locale === "ru" ? "Читать" : locale === "en" ? "Read" : "Կարդալ"}
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={fileUrl} download>
                      <Download className="h-4 w-4" />
                      {locale === "ru" ? "Скачать" : locale === "en" ? "Download" : "Ներբեռնել"}
                    </a>
                  </Button>
                </div>
                </Card>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
