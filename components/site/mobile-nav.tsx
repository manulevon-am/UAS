"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPath, type RouteKey } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav({
  locale,
  items,
  ctaLabel,
}: {
  locale: Locale;
  items: { key: RouteKey; label: string }[];
  ctaLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={cn(
          "pointer-events-none absolute left-4 right-4 top-[76px] rounded-[24px] border border-[var(--color-border)] bg-white p-4 opacity-0 shadow-[0_20px_50px_rgba(15,23,42,0.12)] transition",
          open && "pointer-events-auto opacity-100",
        )}
      >
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <Link
              key={item.key}
              href={getLocalizedPath(locale, item.key)}
              className="rounded-2xl px-4 py-3 text-sm text-[var(--color-graphite-soft)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-graphite)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href={getLocalizedPath(locale, "join")} onClick={() => setOpen(false)}>
            <Button className="mt-2 w-full">{ctaLabel}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
