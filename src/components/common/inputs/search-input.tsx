import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search Segments",
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "relative w-full border border-gray-800 rounded-md sm:w-64 hover:border-gray-600 focus:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 transition delay-100",
        className
      )}
    >
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full bg-transparent py-2 pl-9 pr-3 text-xs text-white placeholder-gray-500 border-0 focus:ring-0 focus:outline-none",
          className
        )}
        value={value}
        onChange={e => {
          onChange(e.target.value)
        }}
      />

      {value && (
        <X
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-200 bg-gray-700 rounded-full p-[0.2rem] cursor-pointer"
          onClick={() => onChange("")}
        />
      )}
    </div>
  )
}
