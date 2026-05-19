import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
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
  return buildMetadata(locale, "news");
}

export default async function NewsPage({
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
        eyebrow={locale === "ru" ? "Новости" : locale === "en" ? "News" : "Նորություններ"}
        title={
          locale === "ru"
            ? "Новости United Armenian Senate"
            : locale === "en"
              ? "United Armenian Senate News"
              : "United Armenian Senate-ի նորություններ"
        }
        description={
          locale === "ru"
            ? "Раздел для официальных новостей, объявлений и обновлений Сената."
            : locale === "en"
              ? "Official Senate news, announcements, and updates."
              : "Սենատի պաշտոնական նորությունների, հայտարարությունների և թարմացումների բաժին։"
        }
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <AnimatedSection>
          <Card className="text-sm leading-7 text-[var(--color-graphite-soft)]">
            {locale === "ru"
              ? "Новости будут опубликованы после подготовки материалов."
              : locale === "en"
                ? "News items will be published after the materials are prepared."
                : "Նորությունները կհրապարակվեն նյութերի պատրաստումից հետո։"}
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
