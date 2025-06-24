import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      fromDate={new Date(2025, 3, 1)}
      toDate={new Date(2025, 11, 31)}
      className={cn("w-full p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row sm:space-x-4 w-full",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center text-gray-200",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 text-white hover:text-yellow-400"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-separate border-spacing-1 table-fixed",
        head_row: "flex w-full",
        head_cell: "text-gray-400 w-full text-center font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-full",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 font-normal text-gray-200 bg-gray-800 hover:bg-yellow-400 hover:text-black mx-auto"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-yellow-500 text-black hover:bg-yellow-600 hover:text-black focus:bg-yellow-600 focus:text-black",
        day_today: "bg-green-600 text-white",
        day_outside:
          "day-outside text-gray-500 aria-selected:bg-yellow-100 aria-selected:text-gray-500",
        day_disabled: "text-gray-500 opacity-50",
        day_range_middle:
          "aria-selected:bg-yellow-200 aria-selected:text-black",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
