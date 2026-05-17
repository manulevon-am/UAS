import { Card } from "@/components/ui/card";
import { senateBodies } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

export function BodiesGrid({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {senateBodies.map((body) => (
        <Card key={body.title.ru}>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
            {body.subtitle[locale]}
          </div>
          <h3 className="mt-3 text-xl font-semibold text-[var(--color-graphite)]">
            {body.title[locale]}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-graphite-soft)]">
            {body.description[locale]}
          </p>
          <div className="mt-5 text-sm text-[var(--color-green)]">
            {body.members} {locale === "ru" ? "членов" : locale === "en" ? "members" : "անդամ"}
          </div>
        </Card>
      ))}
    </div>
  );
}
