import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-green)] bg-[var(--color-green)] px-5 py-3 text-white shadow-sm hover:bg-[#12543d]",
        secondary:
          "border-[var(--color-border)] bg-[var(--color-surface-muted)] px-5 py-3 text-[var(--color-graphite)] hover:bg-[#e8eeea]",
        ghost:
          "border-transparent px-4 py-2 text-[var(--color-graphite-soft)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-graphite)]",
        outline:
          "border-[rgba(183,138,55,0.35)] bg-white px-5 py-3 text-[var(--color-gold)] hover:bg-[rgba(183,138,55,0.08)]",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs uppercase tracking-[0.2em]",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
