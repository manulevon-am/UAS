import Link from "next/link";
import { ArrowRight, Building2, CircleDot, Landmark, Users2 } from "lucide-react";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { HeroCobeGlobe } from "@/components/site/hero-cobe-globe";
import { MandateMap } from "@/components/site/mandate-map";
import { SectionHeading } from "@/components/site/section-heading";
import { UasSystemDiagram } from "@/components/site/uas-system-diagram";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";
import { getLocalizedPath } from "@/lib/site";
import { isLocale } from "@/lib/i18n";
import { homePageContent } from "@/data/site-content";

const becomeIcons = [CircleDot, Users2, Building2, Landmark];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return buildMetadata(locale, "home");
}

export default async function HomePage({
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
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f7faf8_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,138,55,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(25,135,84,0.08),transparent_24%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:py-18">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-graphite)] sm:text-[3.4rem]">
              United Armenian Senate
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-graphite)] sm:text-xl">
              {homePageContent.heroSubtitle[locale]}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-graphite-soft)] sm:text-lg">
              {homePageContent.heroText[locale]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={getLocalizedPath(locale, "structure")}>
                <Button>
                  {locale === "ru" ? "Смотреть структуру" : locale === "en" ? "View structure" : "Տեսնել կառուցվածքը"}
                </Button>
              </Link>
              <Link href={getLocalizedPath(locale, "join")}>
                <Button variant="secondary">
                  {locale === "ru" ? "Стать сенатором" : locale === "en" ? "Become a Senator" : "Դառնալ սենատոր"}
                </Button>
              </Link>
              <Link href={getLocalizedPath(locale, "documents")}>
                <Button variant="outline">
                  {locale === "ru" ? "Документы" : locale === "en" ? "Documents" : "Փաստաթղթեր"}
                </Button>
              </Link>
            </div>
          </div>

          <HeroCobeGlobe locale={locale} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <AnimatedSection>
          <SectionHeading title={homePageContent.aboutTitle[locale]} align="center" />
          <div className="mt-6">
            <UasSystemDiagram locale={locale} />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading
            title={homePageContent.structureTitle[locale]}
            description={homePageContent.structureText[locale]}
          />
          <MandateMap locale={locale} className="mt-8" />
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading
            title={homePageContent.becomeTitle[locale]}
            description={homePageContent.becomeText[locale]}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homePageContent.becomeCards.map((card, index) => {
              const Icon = becomeIcons[index];
              return (
                <Card key={card.ru}>
                  <Icon className="h-5 w-5 text-[var(--color-gold)]" />
                  <div className="mt-4 text-lg font-semibold text-[var(--color-graphite)]">
                    {card[locale]}
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="mt-8">
            <Link href={getLocalizedPath(locale, "join")}>
              <Button size="lg">
                {locale === "ru" ? "Подать заявку" : locale === "en" ? "Submit application" : "Ուղարկել հայտ"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
