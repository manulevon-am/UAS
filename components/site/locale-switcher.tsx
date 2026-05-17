"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getLocaleLabel, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const activeLocale = locales.find((locale) => locale === segments[0]) ?? "ru";
  const rest = segments.slice(1).join("/");

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-white p-1">
      {locales.map((locale) => {
        const href = rest ? `/${locale}/${rest}` : `/${locale}`;
        return (
          <Link
            key={locale}
            href={href}
            className={cn(
              "rounded-full px-3 py-2 text-xs font-semibold tracking-[0.22em] transition",
              locale === activeLocale
                ? "bg-[var(--color-green-soft)] text-[var(--color-green)]"
                : "text-[var(--color-graphite-soft)] hover:text-[var(--color-graphite)]",
            )}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </div>
  );
}
