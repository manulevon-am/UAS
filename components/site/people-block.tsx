import Link from "next/link";

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
    <Card className="grid gap-5 md:grid-cols-[88px_1fr]">
      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[22px] bg-[var(--color-green-soft)] text-xl font-semibold text-[var(--color-green)]">
        {initials}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-graphite)]">
          {person.name}
        </h3>
        <div className="mt-2 text-sm text-[var(--color-gold)]">{person.role}</div>
        <div className="mt-3 text-sm text-[var(--color-graphite-soft)]">
          {person.country}, {person.city}
        </div>
        <p className="mt-4 text-sm leading-7 text-[var(--color-graphite-soft)]">
          {person.bio}
        </p>
        {person.status === "candidate" ? (
          <div className="mt-4 flex gap-4 text-sm text-[var(--color-graphite-soft)]">
            <span>За: {person.votesFor ?? 0}</span>
            <span>Против: {person.votesAgainst ?? 0}</span>
          </div>
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
        <div className="grid gap-4">
          {people.map((person) => (
            <PersonCardView key={person.id} person={person} />
          ))}
        </div>
      )}
    </section>
  );
}
