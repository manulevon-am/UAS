import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafb_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,138,55,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(25,135,84,0.08),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-[var(--color-graphite)] sm:text-[2.8rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--color-graphite-soft)] sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
