import { SITE_NAME, SITE_NAME_RU, SITE_URL } from "@/lib/site";

export function SchemaOrg({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: SITE_NAME_RU,
    url: SITE_URL,
    areaServed: "Worldwide",
    availableLanguage: ["hy", "ru", "en"],
    description:
      locale === "ru"
        ? "Международная платформа представительства армян мира."
        : locale === "en"
          ? "An international platform for representing Armenians worldwide."
          : "Աշխարհասփյուռ հայության ներկայացուցչության միջազգային հարթակ։",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
