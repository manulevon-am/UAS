import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { PeopleBlock } from "@/components/site/people-block";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  findRegionById,
  getFreeSeats,
  mandateRegions,
  regionCandidates,
  regionSenators,
} from "@/data/site-content";
import { isLocale } from "@/lib/i18n";

export async function generateStaticParams() {
  return mandateRegions.flatMap((region) => [
    { locale: "ru", id: region.id },
    { locale: "en", id: region.id },
    { locale: "hy", id: region.id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const region = findRegionById(id);

  return {
    title: region?.title.ru ?? "Регион",
  };
}

export default async function RegionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const region = findRegionById(id);
  if (!region) {
    notFound();
  }

  const freeSeats = getFreeSeats(region);
  const regionMandateHolders = regionSenators.filter((item) => item.regionId === id);
  const regionCandidateList = regionCandidates.filter((item) => item.regionId === id);

  return (
    <div>
      <PageHero
        eyebrow={locale === "ru" ? "Региональный блок" : locale === "en" ? "Regional block" : "Տարածաշրջանային բլոկ"}
        title={region.title[locale]}
        description={region.description[locale]}
      />
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: locale === "ru" ? "Всего мандатов" : locale === "en" ? "Total mandates" : "Ընդհանուր մանդատներ",
                value: region.seatsTotal,
                color: "text-[var(--color-graphite)]",
              },
              {
                label: locale === "ru" ? "Занято" : locale === "en" ? "Occupied" : "Զբաղված",
                value: region.seatsOccupied,
                color: "text-[var(--color-graphite)]",
              },
              {
                label: locale === "ru" ? "Кандидаты" : locale === "en" ? "Candidates" : "Թեկնածուներ",
                value: region.candidates,
                color: "text-[var(--color-graphite)]",
              },
              {
                label: locale === "ru" ? "Свободно" : locale === "en" ? "Free" : "Ազատ",
                value: freeSeats,
                color: "text-[var(--color-green)]",
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
              {locale === "ru" ? "Мандаты региона" : locale === "en" ? "Region mandates" : "Տարածաշրջանի մանդատները"}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-[var(--color-surface-muted)] p-4 text-sm">
                <div className="text-[var(--color-graphite-soft)]">
                  {locale === "ru" ? "Общее количество мест" : locale === "en" ? "Total seats" : "Ընդհանուր տեղեր"}
                </div>
                <div className="mt-2 text-2xl font-semibold text-[var(--color-graphite)]">
                  {region.seatsTotal}
                </div>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface-muted)] p-4 text-sm">
                <div className="text-[var(--color-graphite-soft)]">
                  {locale === "ru" ? "Занятые места" : locale === "en" ? "Occupied seats" : "Զբաղված տեղեր"}
                </div>
                <div className="mt-2 text-2xl font-semibold text-[var(--color-graphite)]">
                  {region.seatsOccupied}
                </div>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface-muted)] p-4 text-sm">
                <div className="text-[var(--color-graphite-soft)]">
                  {locale === "ru" ? "Кандидаты на рассмотрении" : locale === "en" ? "Candidates under review" : "Քննարկվող թեկնածուներ"}
                </div>
                <div className="mt-2 text-2xl font-semibold text-[var(--color-graphite)]">
                  {region.candidates}
                </div>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface-muted)] p-4 text-sm">
                <div className="text-[var(--color-graphite-soft)]">
                  {locale === "ru" ? "Свободные места" : locale === "en" ? "Free seats" : "Ազատ տեղեր"}
                </div>
                <div className="mt-2 text-2xl font-semibold text-[var(--color-green)]">
                  {freeSeats}
                </div>
              </div>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection>
          <PeopleBlock
            title={locale === "ru" ? "Сенаторы региона" : locale === "en" ? "Regional senators" : "Տարածաշրջանի սենատորներ"}
            people={regionMandateHolders}
            emptyText={locale === "ru" ? "В этом регионе пока нет опубликованных сенаторов." : locale === "en" ? "No published senators in this region yet." : "Այս տարածաշրջանում դեռ հրապարակված սենատորներ չկան։"}
          />
        </AnimatedSection>

        <AnimatedSection>
          <PeopleBlock
            title={locale === "ru" ? "Кандидаты" : locale === "en" ? "Candidates" : "Թեկնածուներ"}
            people={regionCandidateList}
            emptyText={locale === "ru" ? "В этом регионе пока нет опубликованных кандидатов." : locale === "en" ? "No published candidates in this region yet." : "Այս տարածաշրջանում դեռ հրապարակված թեկնածուներ չկան։"}
          />
        </AnimatedSection>

        <AnimatedSection>
          <Card className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--color-graphite)]">
                {locale === "ru" ? "Свободные места" : locale === "en" ? "Available seats" : "Ազատ տեղեր"}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-graphite-soft)]">
                {locale === "ru"
                  ? `В регионе доступно ${freeSeats} свободных мандатов.`
                  : locale === "en"
                    ? `${freeSeats} mandates are currently available in this region.`
                    : `Տարածաշրջանում հասանելի է ${freeSeats} ազատ մանդատ։`}
              </p>
            </div>
            <Link href={`/${locale}/join`}>
              <Button>
                {locale === "ru" ? "Подать заявку на мандат" : locale === "en" ? "Apply for a mandate" : "Դիմել մանդատի համար"}
              </Button>
            </Link>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
