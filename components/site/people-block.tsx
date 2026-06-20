import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { PersonCard } from "@/data/site-content";

function PersonCardView({
  person,
}: {
  person: PersonCard;
}) {
  const initials = person.name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2);

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative aspect-[4/5] bg-[var(--color-green-soft)]">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-[var(--color-green)]">
            {initials}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[var(--color-graphite)]">
          {person.name}
        </h3>
        <div className="mt-2 text-sm font-medium text-[var(--color-gold)]">{person.role}</div>
        <div className="mt-3 text-sm leading-6 text-[var(--color-graphite-soft)]">
          {person.city ? `${person.country}, ${person.city}` : person.country}
        </div>
        {person.bio ? (
          <p className="mt-4 text-sm leading-6 text-[var(--color-graphite-soft)]">
            {person.bio}
          </p>
        ) : null}
        {person.status === "candidate" ? (
          <div className="mt-4 flex gap-4 text-sm text-[var(--color-graphite-soft)]">
            <span>За: {person.votesFor ?? 0}</span>
            <span>Против: {person.votesAgainst ?? 0}</span>
          </div>
        ) : null}
        {person.socialUrl ? (
          <a
            href={person.socialUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gold)]"
          >
            <ExternalLink className="h-4 w-4" />
            Профиль
          </a>
        ) : null}
      </div>
    </Card>
  );
}

export function PeopleBlock({
  title,
  emptyText,
  people,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  emptyText: string;
  people: PersonCard[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-[var(--color-graphite)]">
          {title}
        </h2>
        {ctaHref && ctaLabel ? (
          <Link href={ctaHref}>
            <Button>{ctaLabel}</Button>
          </Link>
        ) : null}
      </div>

      {people.length === 0 ? (
        <Card className="text-sm leading-7 text-[var(--color-graphite-soft)]">
          {emptyText}
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {people.map((person) => (
            <PersonCardView key={person.id} person={person} />
          ))}
        </div>
      )}
    </section>
  );
}
