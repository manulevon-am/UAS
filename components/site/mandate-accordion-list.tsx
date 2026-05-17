"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFreeSeats, type MandateBlock } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

const labels = {
  region: {
    ru: "Регион",
    en: "Region",
    hy: "Տարածաշրջան",
  },
  institution: {
    ru: "Квота",
    en: "Quota",
    hy: "Քվոտա",
  },
  total: {
    ru: "Всего",
    en: "Total",
    hy: "Ընդամենը",
  },
  occupied: {
    ru: "Избрано",
    en: "Elected",
    hy: "Ընտրված",
  },
  candidates: {
    ru: "Кандидаты",
    en: "Candidates",
    hy: "Թեկնածուներ",
  },
  free: {
    ru: "Свободно",
    en: "Free",
    hy: "Ազատ",
  },
  details: {
    ru: "Подробнее",
    en: "Details",
    hy: "Մանրամասն",
  },
};

export function MandateAccordionList({
  locale,
  blocks,
  basePath,
  type = "region",
}: {
  locale: Locale;
  blocks: MandateBlock[];
  basePath: string;
  type?: "region" | "institution";
}) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="divide-y divide-[var(--color-border)]">
        {blocks.map((block) => {
          const freeSeats = getFreeSeats(block);

          return (
            <details key={block.id} className="group bg-white">
              <summary className="list-none cursor-pointer px-4 py-4 sm:px-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-graphite-soft)]">
                      {labels[type][locale]}
                    </div>
                    <div className="mt-2 flex items-start gap-3">
                      <div className="min-w-0">
                        <div className="text-base font-semibold text-[var(--color-graphite)] sm:text-lg">
                          {block.title[locale]}
                        </div>
                      </div>
                      <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-graphite-soft)] transition-transform group-open:rotate-180" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[420px]">
                    <StatCell label={labels.total[locale]} value={block.seatsTotal} />
                    <StatCell label={labels.occupied[locale]} value={block.seatsOccupied} />
                    <StatCell label={labels.candidates[locale]} value={block.candidates} />
                    <StatCell label={labels.free[locale]} value={freeSeats} accent />
                  </div>
                </div>
              </summary>

              <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-4 sm:px-5">
                <div className="max-w-3xl text-sm leading-7 text-[var(--color-graphite-soft)]">
                  {block.description[locale]}
                </div>
                <Link href={`${basePath}/${block.id}`} className="mt-4 inline-flex">
                  <Button variant="secondary" size="sm">
                    {labels.details[locale]}
                  </Button>
                </Link>
              </div>
            </details>
          );
        })}
      </div>
    </Card>
  );
}

function StatCell({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface-muted)] px-3 py-2 text-center">
      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-graphite-soft)]">
        {label}
      </div>
      <div
        className={`mt-1 text-sm font-semibold ${accent ? "text-[var(--color-green)]" : "text-[var(--color-graphite)]"}`}
      >
        {value}
      </div>
    </div>
  );
}
