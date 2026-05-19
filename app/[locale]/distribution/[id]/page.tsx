import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { PageHero } from "@/components/site/page-hero";
import { PeopleBlock } from "@/components/site/people-block";
import { Card } from "@/components/ui/card";
import {
  findDistributionSectionById,
  getFreeSeats,
  mandateDistributionSections,
  regionSenators,
} from "@/data/site-content";
import { isLocale } from "@/lib/i18n";

export async function generateStaticParams() {
  return mandateDistributionSections.flatMap((section) => [
    { locale: "ru", id: section.id },
    { locale: "en", id: section.id },
    { locale: "hy", id: section.id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const section = findDistributionSectionById(id);

  return {
    title: section?.title.ru ?? "Mandate section",
  };
}

export default async function DistributionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const section = findDistributionSectionById(id);
  if (!section) {
    notFound();
  }

  const freeSeats = getFreeSeats(section);
  const mandateHolders = regionSenators.filter(
    (item) => item.distributionSectionId === id,
  );

  return (
    <div>
      <PageHero
        eyebrow={locale === "ru" ? "Раздел распределения" : locale === "en" ? "Distribution section" : "Բաշխման բաժին"}
        title={section.title[locale]}
        description={
          locale === "ru"
            ? "Детализация распределения мандатов внутри выбранного раздела."
            : locale === "en"
              ? "Detailed mandate allocation for the selected section."
              : "Ընտրված բաժնի մանդատների բաշխման մանրամասները։"
        }
      />
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: locale === "ru" ? "Всего" : locale === "en" ? "Total" : "Ընդամենը",
                value: section.seatsTotal,
                color: "text-[var(--color-graphite)]",
              },
              {
                label: locale === "ru" ? "Свободно" : locale === "en" ? "Free" : "Ազատ",
                value: freeSeats,
                color: "text-[var(--color-green)]",
              },
              {
                label: locale === "ru" ? "Избрано" : locale === "en" ? "Elected" : "Ընտրված",
                value: section.seatsOccupied,
                color: "text-[var(--color-graphite)]",
              },
              {
                label: locale === "ru" ? "Кандидаты" : locale === "en" ? "Candidates" : "Թեկնածուներ",
                value: section.candidates,
                color: "text-[var(--color-graphite)]",
              },
            ].map((item) => (
              <Card key={item.label}>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-graphite-soft)]">
                  {item.label}
                </div>
                <div className={`mt-3 text-4xl font-semibold ${item.color}`}>
                  {item.value}
                </div>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Card>
            <h2 className="text-2xl font-semibold text-[var(--color-graphite)]">
              {locale === "ru" ? "Подразделы" : locale === "en" ? "Subsections" : "Ենթաբաժիններ"}
            </h2>
            <div className="mt-6 grid gap-3">
              {section.entries.map((entry, index) => (
                <div
                  key={`${section.id}-${index}`}
                  className="grid gap-2 rounded-2xl bg-[var(--color-surface-muted)] px-4 py-4 sm:grid-cols-[1fr_180px] sm:items-start"
                >
                  <div className="text-sm leading-7 text-[var(--color-graphite)]">
                    {entry.label[locale]}
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-gold)] sm:text-right">
                    {entry.seats[locale]}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection>
          <PeopleBlock
            title={locale === "ru" ? "Избранные сенаторы" : locale === "en" ? "Elected senators" : "Ընտրված սենատորներ"}
            people={mandateHolders}
            emptyText={
              locale === "ru"
                ? "В этом разделе пока нет опубликованных избранных сенаторов."
                : locale === "en"
                  ? "No elected senators have been published for this section yet."
                  : "Այս բաժնում դեռ հրապարակված ընտրված սենատորներ չկան։"
            }
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
