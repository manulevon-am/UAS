import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-32 w-full rounded-3xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-graphite)] placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)]",
      className,
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
