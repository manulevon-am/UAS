import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFreeSeats, mandateRegions, type MandateBlock } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

export function MandateDistributionAccordion({ locale }: { locale: Locale }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="divide-y divide-[var(--color-border)]">
        {mandateRegions.map((region, index) => {
          const expandable = Boolean(region.subRegions?.length);

          if (!expandable) {
            return (
              <div key={region.id} className="bg-white px-4 py-4 sm:px-5">
                <RegionRow region={region} index={index} locale={locale} expandable={false} />
              </div>
            );
          }

          return (
            <details key={region.id} className="group bg-white">
              <summary className="list-none cursor-pointer px-4 py-4 sm:px-5">
                <RegionRow region={region} index={index} locale={locale} expandable />
              </summary>

              <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-4 sm:px-5">
                <div className="grid gap-3">
                  {region.subRegions?.map((sub, subIndex) => (
                    <div
                      key={`${region.id}-${subIndex}`}
                      className="grid gap-2 rounded-2xl bg-white px-4 py-3 sm:grid-cols-[1fr_140px] sm:items-start"
                    >
                      <div className="text-sm leading-7 text-[var(--color-graphite)]">
                        {sub.label[locale]}
                      </div>
                      <div className="text-sm font-semibold text-[var(--color-gold)] sm:text-right">
                        {sub.seats}{" "}
                        {locale === "ru" ? "мандатов" : locale === "en" ? "mandates" : "մանդատ"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </Card>
  );
}

function RegionRow({
  region,
  index,
  locale,
  expandable,
}: {
  region: MandateBlock;
  index: number;
  locale: Locale;
  expandable: boolean;
}) {
  const freeSeats = getFreeSeats(region);

  return (
    <>
      <div className="hidden gap-4 lg:grid lg:grid-cols-[56px_minmax(0,1fr)_96px_96px_96px_96px_150px] lg:items-center">
        <div className="text-lg font-semibold text-[var(--color-gold)]">{index + 1}</div>
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <div className="min-w-0">
              <div className="text-base font-semibold leading-6 text-[var(--color-graphite)] sm:text-lg">
                {region.title[locale]}
              </div>
              {!expandable ? (
                <div className="mt-1 text-xs leading-5 text-[var(--color-graphite-soft)]">
                  {region.description[locale]}
                </div>
              ) : null}
            </div>
            {expandable ? (
              <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[var(--color-graphite-soft)] transition-transform group-open:rotate-180" />
            ) : null}
          </div>
        </div>
        <Stat value={region.seatsTotal} label={locale === "ru" ? "Всего" : locale === "en" ? "Total" : "Ընդամենը"} />
        <Stat value={freeSeats} label={locale === "ru" ? "Свободно" : locale === "en" ? "Free" : "Ազատ"} accent />
        <Stat value={region.seatsOccupied} label={locale === "ru" ? "Избрано" : locale === "en" ? "Elected" : "Ընտրված"} />
        <Stat value={region.candidates} label={locale === "ru" ? "Кандидаты" : locale === "en" ? "Candidates" : "Թեկնածուներ"} />
        <div className="lg:text-right">
          <Link href={`/${locale}/regions/${region.id}`} className="inline-flex">
            <Button variant="secondary" size="sm">
              {locale === "ru" ? "Подробнее" : locale === "en" ? "Details" : "Մանրամասն"}
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {index + 1}
            </div>
            <div className="mt-2 text-base font-semibold leading-6 text-[var(--color-graphite)]">
              {region.title[locale]}
            </div>
            {!expandable ? (
              <div className="mt-1 text-xs leading-5 text-[var(--color-graphite-soft)]">
                {region.description[locale]}
              </div>
            ) : null}
          </div>
          {expandable ? (
            <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[var(--color-graphite-soft)] transition-transform group-open:rotate-180" />
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Stat value={region.seatsTotal} label={locale === "ru" ? "Всего" : locale === "en" ? "Total" : "Ընդամենը"} />
          <Stat value={freeSeats} label={locale === "ru" ? "Свободно" : locale === "en" ? "Free" : "Ազատ"} accent />
          <Stat value={region.seatsOccupied} label={locale === "ru" ? "Избрано" : locale === "en" ? "Elected" : "Ընտրված"} />
          <Stat value={region.candidates} label={locale === "ru" ? "Кандидаты" : locale === "en" ? "Candidates" : "Թեկնածուներ"} />
        </div>

        <div>
          <Link href={`/${locale}/regions/${region.id}`} className="inline-flex">
            <Button variant="secondary" size="sm">
              {locale === "ru" ? "Подробнее" : locale === "en" ? "Details" : "Մանրամասն"}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

function Stat({
  value,
  label,
  accent = false,
}: {
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface-muted)] px-3 py-2 text-center">
      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-graphite-soft)]">
        {label}
      </div>
      <div className={`mt-1 text-sm font-semibold ${accent ? "text-[var(--color-green)]" : "text-[var(--color-graphite)]"}`}>
        {value}
      </div>
    </div>
  );
}
