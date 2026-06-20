import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircleDot,
  Landmark,
  MapPin,
  Scale,
  Users2,
} from "lucide-react";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { HeroCobeGlobe } from "@/components/site/hero-cobe-globe";
import { MandateMap } from "@/components/site/mandate-map";
import { MandateDistributionAccordion } from "@/components/site/mandate-distribution-accordion";
import { SectionHeading } from "@/components/site/section-heading";
import { UasSystemDiagram } from "@/components/site/uas-system-diagram";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";
import { getLocalizedPath, withBasePath } from "@/lib/site";
import { isLocale } from "@/lib/i18n";
import { homePageContent } from "@/data/site-content";

const becomeIcons = [CircleDot, Users2, Building2, Landmark];
const legalBasisIcons = [Landmark, Scale];

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
                  {locale === "ru" ? "Присоединиться" : locale === "en" ? "Join" : "Միանալ"}
                </Button>
              </Link>
            </div>
          </div>

          <HeroCobeGlobe locale={locale} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <AnimatedSection className="relative z-20">
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
          <div className="mt-6">
            <MandateDistributionAccordion locale={locale} />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading
            title={homePageContent.becomeTitle[locale]}
            description={homePageContent.becomeText[locale]}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
          <div className="mt-6 rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
              {locale === "ru" ? "Условие избрания" : locale === "en" ? "Condition for election" : "Ընտրվելու պայմանը"}
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--color-graphite-soft)]">
              {homePageContent.becomeCondition[locale]}
            </p>
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

        <AnimatedSection>
          <SectionHeading
            title={homePageContent.legalBasisTitle[locale]}
            description={homePageContent.legalBasisText[locale]}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {homePageContent.legalBasisCards.map((card, index) => {
              const Icon = legalBasisIcons[index] ?? Landmark;
              return (
                <Card key={card.title.ru} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(142,106,42,0.09)] text-[var(--color-gold)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                      {card.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-graphite)]">
                      {card.title[locale]}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-graphite-soft)]">
                      {card.description[locale]}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading
            title={homePageContent.commissionsTitle[locale]}
            align="center"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homePageContent.commissions.map((commission) => (
              <Card key={commission.flag} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Image
                    src={withBasePath(`/flags/${commission.flag}.svg`)}
                    alt=""
                    width={40}
                    height={27}
                    className="h-7 w-10 rounded-[3px] object-cover ring-1 ring-black/5"
                  />
                  <MapPin className="h-4 w-4 text-[var(--color-green)]" />
                </div>
                <div>
                  <div className="text-base font-semibold text-[var(--color-graphite)]">
                    {commission.country[locale]}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-[var(--color-graphite-soft)]">
                    {commission.office[locale]}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
