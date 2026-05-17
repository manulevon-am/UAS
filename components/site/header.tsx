import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { MobileNav } from "@/components/site/mobile-nav";
import { NavLink } from "@/components/site/nav-link";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPath, type RouteKey, withBasePath } from "@/lib/site";

export function Header({
  locale,
  navigation,
}: {
  locale: Locale;
  navigation: {
    items: { key: RouteKey; label: string }[];
    cta: string;
  };
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(252,252,250,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={getLocalizedPath(locale, "home")} className="flex shrink-0 items-center gap-3">
          <Image
            src={withBasePath("/uas.avif")}
            alt="United Armenian Senate"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
            priority
          />
          <div className="text-sm font-extrabold tracking-[0.08em] text-[var(--color-gold)] sm:text-base">
            {locale === "ru"
              ? "Всеармянский Сенат"
              : locale === "hy"
                ? "Համահայկական Սենատ"
                : "United Armenian Senate"}
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.items.map((item) => (
            <NavLink
              key={item.key}
              href={getLocalizedPath(locale, item.key)}
              label={item.label}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <Link href={getLocalizedPath(locale, "join")}>
            <Button>{navigation.cta}</Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitcher />
          <MobileNav locale={locale} items={navigation.items} ctaLabel={navigation.cta} />
        </div>
      </div>
    </header>
  );
}
