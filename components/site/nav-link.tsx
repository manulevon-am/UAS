"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-[var(--color-green-soft)] text-[var(--color-green)]"
          : "text-[var(--color-graphite-soft)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-graphite)]",
      )}
    >
      {label}
    </Link>
  );
}
