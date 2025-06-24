"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, isSameDay, startOfDay } from "date-fns"
import { CalendarFold, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"

export function DateRangePicker({
  dateRange,
  setDateRange,
  className,
  disabled = false,
}: {
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  className?: string
  disabled?: boolean
}) {
  const today = startOfDay(new Date())
  const tomorrow = addDays(today, 1)

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
          <div className="flex justify-between items-center w-full">
            <span className="flex-1">
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "EEEE, d MMMM yyyy")} -{" "}
                    {format(dateRange.to, "EEEE, d MMMM yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "EEEE, d MMMM yyyy")
                )
              ) : (
                "Select date range"
              )}
            </span>
            {dateRange?.from && !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDateRange(undefined);
                }}
                className="ml-2 p-1.5 hover:bg-gray-700 rounded transition-colors duration-200 flex items-center justify-center"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-yellow-400" />
              </button>
            )}
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "max-w-[100%] p-1 bg-secondary text-white rounded-lg shadow-xl border border-gray-600 z-50",
          className
        )}
      >
        <div className="space-y-3">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
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
          {/* {dateRange?.from ? "true" : "false"} */}
          {dateRange?.from && (
            <div className="flex justify-end px-2 clear-dates">
              <Button
                variant="outline"
                className="text-xs text-white border-gray-600 hover:text-yellow-400 hover:border-yellow-400"
                onClick={() => setDateRange(undefined)}
              >
                Clear Dates
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}