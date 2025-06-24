import React from "react";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none cursor-pointer hover:opacity-75 select-none";

    const variantStyles = {
      default: "bg-transparent border border-[#33383F] text-white",
      primary:
        "bg-blue-600 hover:bg-blue-700 text-white border border-transparent active:bg-blue-800",
      secondary:
        "bg-gray-200 hover:bg-gray-300 text-gray-800 border border-transparent active:bg-gray-400",
      danger:
        "bg-red-600 hover:bg-red-700 text-white border border-transparent active:bg-red-800",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-5 py-2.5",
    };

    const disabledStyles = "opacity-60 cursor-not-allowed";
    const fullWidthStyles = "w-full";

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && fullWidthStyles,
          disabled && disabledStyles,
          className
        )}
        disabled={disabled}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span
            className={cn(
              "mr-2",
              size === "sm"
                ? "text-xs"
                : size === "lg"
                ? "text-base"
                : "text-sm"
            )}
          >
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span
            className={cn(
              "ml-2",
              size === "sm"
                ? "text-xs"
                : size === "lg"
                ? "text-base"
                : "text-sm"
            )}
          >
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";