import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { PeopleBlock } from "@/components/site/people-block";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  findInstitutionById,
  getFreeSeats,
  institutionBlocks,
  institutionCandidates,
  institutionMandateHolders,
} from "@/data/site-content";
import { isLocale } from "@/lib/i18n";

export async function generateStaticParams() {
  return institutionBlocks.flatMap((block) => [
    { locale: "ru", id: block.id },
    { locale: "en", id: block.id },
    { locale: "hy", id: block.id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const block = findInstitutionById(id);
  return {
    title: block?.title.ru ?? "Institution",
  };
}

export default async function InstitutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const block = findInstitutionById(id);
  if (!block) {
    notFound();
  }

  const freeSeats = getFreeSeats(block);
  const mandateHolders = institutionMandateHolders.filter((item) => item.institutionId === id);
  const candidates = institutionCandidates.filter((item) => item.institutionId === id);

  return (
    <div>
      <PageHero
        eyebrow={locale === "ru" ? "Институциональная квота" : locale === "en" ? "Institutional quota" : "Ինստիտուցիոնալ քվոտա"}
        title={block.title[locale]}
        description={block.description[locale]}
      />
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: locale === "ru" ? "Всего мандатов" : locale === "en" ? "Total mandates" : "Ընդհանուր մանդատներ",
                value: block.seatsTotal,
                color: "text-[var(--color-graphite)]",
              },
              {
                label: locale === "ru" ? "Занято" : locale === "en" ? "Occupied" : "Զբաղված",
                value: block.seatsOccupied,
                color: "text-[var(--color-graphite)]",
              },
              {
                label: locale === "ru" ? "Кандидаты" : locale === "en" ? "Candidates" : "Թեկնածուներ",
                value: block.candidates,
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
          <PeopleBlock
            title={locale === "ru" ? "Лица с мандатом" : locale === "en" ? "Mandate holders" : "Մանդատ ունեցող անձինք"}
            people={mandateHolders}
            emptyText={locale === "ru" ? "В этом блоке пока нет опубликованных лиц с мандатом." : locale === "en" ? "No published mandate holders in this block yet." : "Այս բլոկում դեռ հրապարակված մանդատ ունեցող անձինք չկան։"}
          />
        </AnimatedSection>

        <AnimatedSection>
          <PeopleBlock
            title={locale === "ru" ? "Кандидаты" : locale === "en" ? "Candidates" : "Թեկնածուներ"}
            people={candidates}
            emptyText={locale === "ru" ? "В этом блоке пока нет опубликованных кандидатов." : locale === "en" ? "No published candidates in this block yet." : "Այս բլոկում դեռ հրապարակված թեկնածուներ չկան։"}
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
                  ? `В блоке доступно ${freeSeats} свободных мандатов.`
                  : locale === "en"
                    ? `${freeSeats} mandates are currently available in this block.`
                    : `Բլոկում հասանելի է ${freeSeats} ազատ մանդատ։`}
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
