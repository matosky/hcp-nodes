import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define badge variants with cva
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string; // Allow any string for hex colors or predefined variants
}

function Badge({ className, variant, ...props }: BadgeProps) {
  // Check if variant is a hex color (starts with # and has 7 characters)
  const isHexColor = typeof variant === "string" && variant.startsWith("#") && variant.length === 7;
  // Only pass predefined variants or undefined to badgeVariants
  const effectiveVariant: "default" | "secondary" | "destructive" | "outline" | undefined = isHexColor
    ? undefined
    : variant === "default" || variant === "secondary" || variant === "destructive" || variant === "outline"
      ? variant
      : "default";

  return (
    <div
      className={cn(badgeVariants({ variant: effectiveVariant }), className)}
      style={
        isHexColor && variant
          ? { backgroundColor: variant, color: getTextColor(variant) }
          : {}
      }
      {...props}
    />
  );
}

// Helper function to determine text color based on background for readability
const getTextColor = (bgColor: string) => {
  // Convert hex to RGB
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance to determine if light or dark text is better
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF"; // Black for light backgrounds, white for dark
};

export { Badge, badgeVariants };