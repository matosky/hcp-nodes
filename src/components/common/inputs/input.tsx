import { cn } from "@/lib/utils";
import React from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
  iconAlignment?: "start" | "end";
};

export function Input({
  value,
  onChange,
  placeholder = "Search Segments",
  className,
  icon,
  iconAlignment = "start",
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full sm:w-64", className)}>
      {icon && iconAlignment === "start" && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border border-gray-800 bg-transparent py-2 text-xs text-white placeholder-gray-500 hover:border-gray-600 focus:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 transition delay-100",
          icon && iconAlignment === "start" ? "pl-9" : "pl-3",
          icon && iconAlignment === "end" ? "pr-9" : "pr-3",
          className
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {icon && iconAlignment === "end" && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </span>
      )}
    </div>
  );
}
