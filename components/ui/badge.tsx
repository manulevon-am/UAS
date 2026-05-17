import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[rgba(183,138,55,0.18)] bg-[rgba(183,138,55,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
