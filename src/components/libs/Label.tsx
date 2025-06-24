import React from "react";
import { cn } from "@/utils/cn";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={cn("block text-sm text-[#6F767E] font-bold mb-2", className)}
      style={{ fontFamily: "Open Sans" }}
    >
      {children}
    </label>
  );
}

Label.displayName = "Label";