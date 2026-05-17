import * as React from "react";

import { cn } from "@/lib/utils";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-12 w-full appearance-none rounded-2xl border border-[var(--color-border)] bg-white px-4 text-sm text-[var(--color-graphite)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)]",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = "Select";
