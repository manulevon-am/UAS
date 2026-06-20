import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafb_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,138,55,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(25,135,84,0.08),transparent_34%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-18">
        <div>
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-[var(--color-graphite)] sm:text-[2.8rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--color-graphite-soft)] sm:text-lg">
            {description}
          </p>
        </div>
        {Icon && (
          <div className="hidden lg:flex lg:justify-end">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(142,106,42,0.16),rgba(25,135,84,0.10))] ring-1 ring-[rgba(142,106,42,0.25)]">
              <div className="absolute inset-4 rounded-full border border-dashed border-[rgba(142,106,42,0.30)]" />
              <Icon
                className="h-20 w-20 text-[var(--color-gold)]"
                strokeWidth={1.4}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
