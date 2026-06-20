import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { JoinForm } from "@/components/site/join-form";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { joinPageContent, mandateRegions } from "@/data/site-content";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  return buildMetadata(locale, "join");
}

export default async function JoinPage({
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
        eyebrow={joinPageContent.eyebrow[locale]}
        title={joinPageContent.title[locale]}
        description={joinPageContent.description[locale]}
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <AnimatedSection>
          <Card>
            <h2 className="text-2xl font-semibold text-[var(--color-graphite)]">
              {locale === "ru" ? "Что можно подать через форму" : locale === "en" ? "What can be submitted" : "Ինչ կարելի է ուղարկել ձևով"}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {joinPageContent.applicationTypes.map((item) => (
                <span
                  key={item.ru}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-sm text-[var(--color-graphite-soft)]"
                >
                  {item[locale]}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <div className="text-sm font-semibold text-[var(--color-graphite)]">
                  {locale === "ru" ? "Региональные блоки" : locale === "en" ? "Regional blocks" : "Տարածաշրջանային բլոկներ"}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mandateRegions.map((region) => (
                    <span
                      key={region.id}
                      className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-graphite-soft)]"
                    >
                      {region.title[locale]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <JoinForm locale={locale} />
        </AnimatedSection>
      </div>
    </div>
  );
}
