import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
