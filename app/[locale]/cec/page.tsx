import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CalendarClock,
  Globe,
  Landmark,
  ListChecks,
  MapPin,
  Scale,
  ShieldCheck,
  Users,
  Vote,
} from "lucide-react";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cecPageContent } from "@/data/site-content";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getLocalizedPath, withBasePath } from "@/lib/site";

const stepIcons = [Vote, ListChecks, Scale];
const factIcons = [Globe, Users, Landmark, CalendarClock, ShieldCheck];
const legalIcons = [Landmark, Scale];

function headLabel(locale: string) {
  return locale === "ru"
    ? "Руководитель — "
    : locale === "en"
      ? "Head — "
      : "Ղեկավար — ";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  return buildMetadata(locale, "cec");
}

export default async function CecPage({
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
        eyebrow={cecPageContent.eyebrow[locale]}
        title={cecPageContent.title[locale]}
        description={cecPageContent.description[locale]}
        icon={Vote}
      />
      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <AnimatedSection>
          <SectionHeading
            title={cecPageContent.stepsTitle[locale]}
            description={cecPageContent.stepsText[locale]}
          />
          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {cecPageContent.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? Vote;
              return (
                <Fragment key={step.title.ru}>
                  <div className="group relative flex-1 overflow-hidden rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(142,106,42,0.12)]">
                    <span className="pointer-events-none absolute right-5 top-2 text-6xl font-bold leading-none text-[var(--color-gold)] opacity-[0.08]">
                      {index + 1}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(142,106,42,0.09)] text-[var(--color-gold)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      {locale === "ru"
                        ? `Шаг ${index + 1}`
                        : locale === "en"
                          ? `Step ${index + 1}`
                          : `Քայլ ${index + 1}`}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-[var(--color-graphite)]">
                      {step.title[locale]}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-graphite-soft)]">
                      {step.description[locale]}
                    </p>
                  </div>
                  {index < cecPageContent.steps.length - 1 && (
                    <div
                      className="flex shrink-0 items-center justify-center text-[var(--color-gold-soft)]"
                      aria-hidden
                    >
                      <ArrowDown className="h-6 w-6 lg:hidden" />
                      <ArrowRight className="hidden h-7 w-7 lg:block" />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading
            title={cecPageContent.factsTitle[locale]}
            description={cecPageContent.factsText[locale]}
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {cecPageContent.facts.map((fact, index) => {
              const Icon = factIcons[index] ?? Globe;
              return (
                <Card
                  key={fact.label.ru}
                  className="flex w-full flex-col gap-3 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-green-soft)] text-[var(--color-green)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-bold leading-tight text-[var(--color-gold)]">
                      {fact.value}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-graphite)]">
                      {fact.label[locale]}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-graphite-soft)]">
                      {fact.description[locale]}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading
            title={cecPageContent.structureTitle[locale]}
            description={cecPageContent.structureText[locale]}
          />
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4 rounded-[22px] border border-[var(--color-gold-soft)] bg-[linear-gradient(135deg,rgba(142,106,42,0.08),rgba(184,144,76,0.04))] p-6">
              <Image
                src={withBasePath(`/flags/${cecPageContent.hq.flag}.svg`)}
                alt=""
                width={48}
                height={32}
                className="h-8 w-12 shrink-0 rounded-[4px] object-cover ring-1 ring-black/5"
              />
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  {cecPageContent.hq.title[locale]}
                </div>
                <div className="mt-1 text-lg font-semibold text-[var(--color-graphite)]">
                  {cecPageContent.hq.city[locale]}
                </div>
                <div className="text-sm text-[var(--color-graphite-soft)]">
                  {headLabel(locale)}
                  {cecPageContent.hq.head[locale]}
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cecPageContent.centers.map((center) => (
                <Card key={center.city.ru} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Image
                      src={withBasePath(`/flags/${center.flag}.svg`)}
                      alt=""
                      width={36}
                      height={24}
                      className="h-6 w-9 rounded-[3px] object-cover ring-1 ring-black/5"
                    />
                    <MapPin className="h-4 w-4 text-[var(--color-green)]" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-[var(--color-graphite)]">
                      {center.city[locale]}
                    </div>
                    <div className="mt-1 text-sm text-[var(--color-graphite-soft)]">
                      {headLabel(locale)}
                      {center.head[locale]}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading
            title={cecPageContent.legalTitle[locale]}
            description={cecPageContent.legalText[locale]}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {cecPageContent.legalCards.map((card, index) => {
              const Icon = legalIcons[index] ?? Landmark;
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
          <div className="rounded-[26px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 text-center sm:p-10">
            <h2 className="text-2xl font-semibold text-[var(--color-graphite)]">
              {cecPageContent.ctaTitle[locale]}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--color-graphite-soft)]">
              {cecPageContent.ctaText[locale]}
            </p>
            <div className="mt-6 flex justify-center">
              <Link href={getLocalizedPath(locale, "join")}>
                <Button size="lg">{cecPageContent.ctaButton[locale]}</Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
