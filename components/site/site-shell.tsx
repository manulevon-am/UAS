import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { footerContent, navigationLabels } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

const navKeys = ["home", "structure", "documents", "join"] as const;

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const items = navKeys.map((key) => ({
    key,
    label: navigationLabels[locale][key],
  }));

  return (
    <>
      <Header
        locale={locale}
        navigation={{ items, cta: navigationLabels[locale].cta }}
      />
      <main className="flex-1">{children}</main>
      <Footer
        locale={locale}
        navigation={items}
        content={{
          description: footerContent.description[locale],
          contactsTitle: footerContent.contactsTitle[locale],
          email: footerContent.email,
          phone: footerContent.phone,
        }}
      />
    </>
  );
}
