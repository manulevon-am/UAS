"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFreeSeats, mandateDistributionSections } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

export function MandateDistributionAccordion({ locale }: { locale: Locale }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="divide-y divide-[var(--color-border)]">
        {mandateDistributionSections.map((section) => {
          const freeSeats = getFreeSeats(section);

          return (
          <details key={section.id} className="group bg-white">
            <summary className="list-none cursor-pointer px-4 py-4 sm:px-5">
              <div className="grid gap-4 lg:grid-cols-[56px_minmax(0,1fr)_96px_96px_96px_96px_150px] lg:items-center">
                <div className="text-lg font-semibold text-[var(--color-gold)]">
                  {section.index}
                </div>
                <div className="min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 text-base font-semibold leading-6 text-[var(--color-graphite)] sm:text-lg">
                      {section.title[locale]}
                    </div>
                    <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[var(--color-graphite-soft)] transition-transform group-open:rotate-180" />
                  </div>
                </div>
                <Stat value={section.seatsTotal} label={locale === "ru" ? "Всего" : locale === "en" ? "Total" : "Ընդամենը"} />
                <Stat value={freeSeats} label={locale === "ru" ? "Свободно" : locale === "en" ? "Free" : "Ազատ"} accent />
                <Stat value={section.seatsOccupied} label={locale === "ru" ? "Избрано" : locale === "en" ? "Elected" : "Ընտրված"} />
                <Stat value={section.candidates} label={locale === "ru" ? "Кандидаты" : locale === "en" ? "Candidates" : "Թեկնածուներ"} />
                <div className="lg:text-right">
                  <Link href={`/${locale}/distribution/${section.id}`} className="inline-flex">
                    <Button variant="secondary" size="sm">
                      {locale === "ru" ? "Подробнее" : locale === "en" ? "Details" : "Մանրամասն"}
                    </Button>
                  </Link>
                </div>
              </div>
            </summary>

            <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-4 sm:px-5">
              <div className="grid gap-3">
                {section.entries.map((entry, index) => (
                  <div
                    key={`${section.id}-${index}`}
                    className="grid gap-2 rounded-2xl bg-white px-4 py-3 sm:grid-cols-[1fr_140px] sm:items-start"
                  >
                    <div className="text-sm leading-7 text-[var(--color-graphite)]">
                      {entry.label[locale]}
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-gold)] sm:text-right">
                      {entry.seats[locale] || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </details>
        )})}
      </div>
    </Card>
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
