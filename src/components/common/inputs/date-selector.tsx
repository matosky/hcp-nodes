"use client"

import * as React from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, isSameDay, startOfDay } from "date-fns"
import { CalendarFold } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker";

export function DateRangePicker({
  dateRange,
  setDateRange,
  className,
  disabled = false,
  isDateRangeOnly = false,
}: {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  className?: string;
  disabled?: boolean;
  isDateRangeOnly?: boolean;
}) {
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-full bg-secondary text-xs text-left rounded-md border px-4 py-2 focus:ring-1 hover:bg-gray-800 transition-colors duration-300 flex items-center",
            disabled
              ? "text-gray-400 border-gray-700 cursor-not-allowed opacity-60"
              : "text-white border-gray-500 focus:ring-yellow-400",
            className
          )}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <CalendarFold className="h-4 w-4 mr-2 text-gray-400" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            "Select date range"
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "max-w-[100%] p-1 bg-secondary text-white rounded-lg shadow-xl border border-gray-600 z-50",
          className
        )}
      >
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) => {
            if (isDateRangeOnly) {
              if (range?.from && range?.to) {
                setDateRange(range);
              }
            } else {
              setDateRange(range);
            }
          }}
          numberOfMonths={1}
          fromYear={2024}
          toYear={2025}
          className="bg-secondary text-white rounded-lg"
          modifiers={{
            saturday: (d) => d.getDay() === 6,
            today: (d) => isSameDay(startOfDay(d), today),
            upcoming: (d) => isSameDay(startOfDay(d), tomorrow),
          }}
          modifiersClassNames={{
            selected: "bg-yellow-500 text-black",
            today: "bg-green-600 text-white",
            upcoming: "bg-blue-600 text-white",
            saturday: "bg-pink-500 text-white",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

// Keep the original DatePicker for single date selection
export function DatePicker({
  date,
  setDate,
  className,
  disabled = false,
}: {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  className?: string
  disabled?: boolean
}) {
  const today = startOfDay(new Date())
  const tomorrow = addDays(today, 1)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full bg-secondary text-xs text-left rounded-md border px-4 py-2 focus:ring-1 hover:bg-gray-800 transition-colors duration-300 flex items-center",
            disabled
              ? "text-gray-400 border-gray-700 cursor-not-allowed opacity-60"
              : "text-white border-gray-500 focus:ring-yellow-400",
            className
          )}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={e => {
            if (disabled) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          <CalendarFold className="h-4 w-4 mr-2 text-gray-400" />
          {date ? format(date, "EEEE, d MMMM yyyy") : "Select date"}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "max-w-[100%] p-1 bg-secondary text-white rounded-lg shadow-xl border border-gray-600 z-50",
          className
        )}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromYear={2024}
          toYear={2025}
          className="bg-secondary text-white rounded-lg"
          modifiers={{
            saturday: d => d.getDay() === 6,
            today: d => isSameDay(startOfDay(d), today),
            upcoming: d => isSameDay(startOfDay(d), tomorrow),
          }}
          modifiersClassNames={{
            selected: "bg-yellow-500 text-black",
            today: "bg-green-600 text-white",
            upcoming: "bg-blue-600 text-white",
            saturday: "bg-pink-500 text-white",
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
