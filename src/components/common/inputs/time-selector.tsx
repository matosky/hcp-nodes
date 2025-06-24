import { cn } from "@/lib/utils"
import { Timer } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const hours12 = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
)
const hours24 = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))
const periods = ["AM", "PM"]

type TimePickerProps = {
  is24Hour?: boolean
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
}

export const TimePicker = ({
  value,
  onChange,
  className = "",
  is24Hour = false,
  disabled = false,
}: TimePickerProps) => {
  const parseTime = (val: string) => {
    if (!val) {
      return {
        hour: is24Hour ? "00" : "12",
        minute: "00",
        period: "AM",
      }
    }

    if (is24Hour) {
      const [h = "00", m = "00"] = val.split(":")
      return {
        hour: h.padStart(2, "0"),
        minute: m.padStart(2, "0"),
        period: "",
      }
    } else {
      const [time, p = "AM"] = val.split(" ")
      const [h = "12", m = "00"] = (time || "").split(":")
      return { hour: h.padStart(2, "0"), minute: m.padStart(2, "0"), period: p }
    }
  }
  const ref = useRef<HTMLDivElement>(null)
  const initial = parseTime(value)
  const [hour, setHour] = useState(initial.hour)
  const [minute, setMinute] = useState(initial.minute)
  const [period, setPeriod] = useState(initial.period)
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    if (!disabled) setOpen(prev => !prev)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const parsed = parseTime(value)
    setHour(parsed.hour)
    setMinute(parsed.minute)
    setPeriod(parsed.period)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, is24Hour])

  useEffect(() => {
    const time = is24Hour ? `${hour}:${minute}` : `${hour}:${minute} ${period}`
    onChange(time)
  }, [hour, minute, period, is24Hour, onChange])

  const hourOptions = is24Hour ? hours24 : hours12

  return (
    <div className={cn("w-full relative", className)} ref={ref}>
      <button
        type="button"
        onClick={toggleOpen}
        disabled={disabled}
        className={cn(
          "relative w-full cursor-pointer rounded-md border bg-transparent py-3 pl-3 pr-10 text-left text-xs shadow-sm focus:outline-none focus:ring-1 hover:bg-gray-800",
          disabled
            ? "text-gray-400 border-gray-700 cursor-not-allowed opacity-60"
            : "border-gray-800 text-gray-300 hover:bg-muted focus:ring-primary"
        )}
      >
        <span className="block truncate">{value || "Select time"}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <Timer className="h-4 w-4 text-gray-400" />
        </span>
      </button>

      {open && (
        <div className="absolute w-full max-w-sm mx-auto p-2 bg-secondary mt-1 rounded-md shadow-md flex justify-between items-center space-x-2 text-sm z-50">
          {/* Hour Picker */}
          <ul className="flex-1 h-40 overflow-y-scroll scroll-smooth thin-scrollbar  text-center">
            {hourOptions.map(h => (
              <li
                key={h}
                onClick={() => setHour(h)}
                className={cn(
                  "py-2 cursor-pointer rounded-md hover:bg-info/10 transition duration-100 ease-linear",
                  h === hour
                    ? "bg-primary text-black hover:bg-primary"
                    : "text-gray-400"
                )}
              >
                {h}
              </li>
            ))}
          </ul>

          {/* Minute Picker */}
          <ul className="flex-1 h-40 overflow-y-scroll scroll-smooth thin-scrollbar  text-center">
            {minutes.map(m => (
              <li
                key={m}
                onClick={() => setMinute(m)}
                className={cn(
                  "py-2 cursor-pointer rounded-md hover:bg-info/10 transition duration-100 ease-linear",
                  m === minute
                    ? "bg-primary text-black hover:bg-primary"
                    : "text-gray-400"
                )}
              >
                {m}
              </li>
            ))}
          </ul>

          {/* AM/PM Picker */}
          <ul className="flex-1 h-40 overflow-y-scroll scroll-smooth thin-scrollbar  text-center">
            {periods.map(p => (
              <li
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "py-2 cursor-pointer rounded-md hover:bg-info/10 transition duration-100 ease-linear",
                  p === period
                    ? "bg-primary text-black hover:bg-primary"
                    : "text-gray-400"
                )}
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
