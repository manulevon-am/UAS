import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/site/animated-section";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  XIcon,
} from "@/components/site/brand-icons";
import { Badge } from "@/components/ui/badge";
import {
  allPeople,
  findPersonById,
  findRegionById,
} from "@/data/site-content";
import { isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return allPeople.flatMap((person) => [
    { locale: "ru", id: person.id },
    { locale: "en", id: person.id },
    { locale: "hy", id: person.id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const person = findPersonById(id);
  return { title: person?.name ?? "Сенатор" };
}

export default async function SenatorPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const person = findPersonById(id);
  if (!person) {
    notFound();
  }

  const region = person.regionId ? findRegionById(person.regionId) : undefined;
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  const location = person.city
    ? `${person.country}, ${person.city}`
    : person.country;

  const phone = person.phone ?? "+374 00 000 000";
  const email = person.email ?? "info@uas.am";

  const biographyPlaceholder =
    "Здесь будет краткая биография сенатора: несколько предложений о профессиональном пути, общественной деятельности и роли в Сенате. Текст появится после заполнения анкеты.";

  const socials = [
    { label: "LinkedIn", href: person.socialUrl ?? "#", Icon: LinkedInIcon },
    { label: "Facebook", href: "#", Icon: FacebookIcon },
    { label: "Instagram", href: "#", Icon: InstagramIcon },
    { label: "Telegram", href: "#", Icon: TelegramIcon },
    { label: "X", href: "#", Icon: XIcon },
    {
      label: locale === "ru" ? "Сайт" : locale === "en" ? "Website" : "Կայք",
      href: "#",
      Icon: Globe,
    },
  ];

  const t = {
    back:
      locale === "ru"
        ? "Назад к списку"
        : locale === "en"
          ? "Back to the list"
          : "Վերադառնալ ցուցակ",
    bio:
      locale === "ru"
        ? "Биография"
        : locale === "en"
          ? "Biography"
          : "Կենսագրություն",
    contacts:
      locale === "ru" ? "Контакты" : locale === "en" ? "Contacts" : "Կոնտակտներ",
  };

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafb_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,138,55,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(25,135,84,0.08),transparent_34%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {region ? (
            <Link
              href={`/${locale}/regions/${region.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-graphite-soft)] transition hover:text-[var(--color-graphite)]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
          ) : null}

          <div className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="relative h-48 w-40 overflow-hidden rounded-[24px] bg-[var(--color-green-soft)] shadow-[0_18px_44px_rgba(15,23,42,0.12)] ring-1 ring-black/5 sm:h-56 sm:w-44">
              {person.photo ? (
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="180px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl font-semibold text-[var(--color-green)]">
                  {initials}
                </div>
              )}
            </div>

            <div>
              <Badge>{person.role}</Badge>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-graphite)] sm:text-4xl">
                {person.name}
              </h1>
              {person.bio ? (
                <p className="mt-3 text-base font-medium text-[var(--color-graphite)]">
                  {person.bio}
                </p>
              ) : null}
              <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-graphite-soft)]">
                <MapPin className="h-4 w-4 text-[var(--color-gold)]" />
                {location}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold text-[var(--color-graphite)]">
            {t.bio}
          </h2>
          <p
            className={`mt-4 max-w-3xl text-base leading-7 text-[var(--color-graphite-soft)]${
              person.biography ? "" : " italic"
            }`}
          >
            {person.biography ?? biographyPlaceholder}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-2xl font-semibold text-[var(--color-graphite)]">
            {t.contacts}
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-graphite)] transition hover:border-[var(--color-gold-soft)] hover:shadow-[0_10px_24px_rgba(142,106,42,0.12)]"
            >
              <Mail className="h-4 w-4 text-[var(--color-gold)]" />
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-graphite)] transition hover:border-[var(--color-gold-soft)] hover:shadow-[0_10px_24px_rgba(142,106,42,0.12)]"
            >
              <Phone className="h-4 w-4 text-[var(--color-gold)]" />
              {phone}
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-graphite-soft)] transition hover:border-[var(--color-gold-soft)] hover:text-[var(--color-gold)] hover:shadow-[0_10px_24px_rgba(142,106,42,0.12)]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
