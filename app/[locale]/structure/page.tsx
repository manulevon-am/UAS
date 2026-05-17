import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { BodiesGrid } from "@/components/site/bodies-grid";
import { MandateMap } from "@/components/site/mandate-map";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { structurePageContent, homePageContent } from "@/data/site-content";
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
