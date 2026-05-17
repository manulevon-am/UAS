import { MandateAccordionList } from "@/components/site/mandate-accordion-list";
import { institutionBlocks } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

export function InstitutionGrid({ locale }: { locale: Locale }) {
  return (
    <MandateAccordionList
      locale={locale}
      blocks={institutionBlocks}
      basePath={`/${locale}/institutions`}
      type="institution"
    />
  );
}
