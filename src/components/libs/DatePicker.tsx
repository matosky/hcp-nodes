import React from "react";
import { format } from "date-fns";
import { cn } from "@/utils/cn";
import { Label } from "./Label";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
}

export function DatePicker({
  date,
  setDate,
  className,
  placeholder = "Pick a date",
  label,
  labelClassName,
}: DatePickerProps) {
  // HTML date inputs require ISO formatted dates (yyyy-MM-dd)
  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : undefined;
    setDate(newDate);
  };

  return (
    <div className={cn("relative", className)}>
      {label && <Label className={labelClassName}>{label}</Label>}
      <input
        type="date"
        value={formattedDate}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "block w-full h-[40px] rounded-md border border-[#33383F] bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-white appearance-none"
        )}
      />
    </div>
  );
}

DatePicker.displayName = "DatePicker";
