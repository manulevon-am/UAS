import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/site";

export function Footer({
  locale,
  content,
  navigation,
}: {
  locale: Locale;
  content: {
    description: string;
    contactsTitle: string;
    email: string;
    phone: string;
  };
  navigation: { key: "home" | "structure" | "documents" | "news"; label: string }[];
}) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
            United Armenian Senate
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--color-graphite-soft)]">
            {content.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-graphite)]">
            {locale === "ru"
              ? "Навигация"
              : locale === "en"
                ? "Navigation"
                : "Նավիգացիա"}
          </h3>
          <div className="mt-5 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={getLocalizedPath(locale, item.key)}
                className="text-sm text-[var(--color-graphite-soft)] transition hover:text-[var(--color-graphite)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-graphite)]">
            {content.contactsTitle}
          </h3>
          <div className="mt-5 space-y-3 text-sm text-[var(--color-graphite-soft)]">
            <p>{content.email}</p>
            <p>{content.phone}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
