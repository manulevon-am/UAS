import Image from "next/image";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { BodiesGrid } from "@/components/site/bodies-grid";
import { MandateMap } from "@/components/site/mandate-map";
import { MandateDistributionAccordion } from "@/components/site/mandate-distribution-accordion";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { structurePageContent, homePageContent } from "@/data/site-content";
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
  return buildMetadata(locale, "structure");
}

export default async function StructurePage({
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
        eyebrow={structurePageContent.eyebrow[locale]}
        title={structurePageContent.title[locale]}
        description={structurePageContent.description[locale]}
      />
      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <AnimatedSection>
          <SectionHeading
            title={homePageContent.structureTitle[locale]}
            description={homePageContent.structureText[locale]}
          />
          <MandateMap locale={locale} className="mt-8" />
          <div className="mt-6">
            <MandateDistributionAccordion locale={locale} />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading
            title={homePageContent.lifetimeTitle[locale]}
            description={homePageContent.lifetimeText[locale]}
            align="center"
          />
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {homePageContent.lifetimeSenators.map((senator) => {
              const initials = senator.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("");
              return (
                <div
                  key={senator.name}
                  className="flex flex-col items-center rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-center shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(142,106,42,0.12)]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-gold),var(--color-gold-soft))] text-lg font-semibold text-white shadow-[0_8px_18px_rgba(142,106,42,0.25)]">
                    {initials}
                  </div>
                  <div className="mt-3 text-sm font-semibold leading-5 text-[var(--color-graphite)]">
                    {senator.name}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 rounded-full bg-[var(--color-surface-muted)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-graphite-soft)]">
                    <Image
                      src={withBasePath(`/flags/${senator.flag}.svg`)}
                      alt=""
                      width={20}
                      height={14}
                      className="h-3 w-[18px] rounded-[2px] object-cover ring-1 ring-black/5"
                    />
                    {senator.country}
                  </div>
                </div>
              );
            })}
            {Array.from({
              length: 12 - homePageContent.lifetimeSenators.length,
            }).map((_, index) => (
              <div
                key={`reserved-${index}`}
                className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[var(--color-border)] text-lg font-semibold text-[var(--color-graphite-soft)]">
                  —
                </div>
                <div className="mt-3 text-xs leading-5 text-[var(--color-graphite-soft)]">
                  {locale === "ru"
                    ? "Свободное место"
                    : locale === "en"
                      ? "Vacant seat"
                      : "Ազատ տեղ"}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading
            title={homePageContent.bodiesTitle[locale]}
            description={homePageContent.bodiesText[locale]}
          />
          <div className="mt-8">
            <BodiesGrid locale={locale} />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
