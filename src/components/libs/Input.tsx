import * as React from "react";
import { cn } from "@/utils/cn";
import { Label } from "./Label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconAlignment?: "start" | "end";
  containerClassName?: string;
  label?: string;
  labelClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type,
      icon,
      iconAlignment = "start",
      label,
      labelClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative", containerClassName)}>
        {label && <Label className={labelClassName}>{label}</Label>}
        {icon && iconAlignment === "start" && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            // fixed height at 40px and no vertical padding so the text is centered
            "block w-full h-[40px] rounded-md border border-[#33383F] bg-transparent px-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-white appearance-none",
            // Add extra left/right padding if there is an icon
            icon && iconAlignment === "start" && "pl-10",
            icon && iconAlignment === "end" && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && iconAlignment === "end" && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";