import { useState } from "react"
import clsx from "clsx"

type FilterChipsProps = {
  activeBg?: string
  options: string[]
  defaultSelected?: string
  onChange?: (selected: string) => void
}

export function FilterChips({
  options,
  defaultSelected,
  activeBg,
  onChange,
}: FilterChipsProps) {
  const [selected, setSelected] = useState(defaultSelected ?? options[0])

  const handleClick = (opt: string) => {
    setSelected(opt)
    onChange?.(opt)
  }

  return (
    <div className="w-full overflow-hidden py-2">
      <div className="inline-flex no-scrollbar overflow-x-auto space-x-2 px-2">
        {options.map(opt => {
          const isActive = opt === selected
          return (
            <button
              key={opt}
              onClick={() => handleClick(opt)}
              className={clsx(
                "flex-shrink-0 px-1.5 md:px-3 py-2 text-xs font-medium rounded-md transition border border-gray-800 capitalize",
                isActive
                  ? `${
                      activeBg ? activeBg : "bg-secondary"
                    } text-gray-300 font-bold` // active styles
                  : "bg-transparent text-gray-300 hover:bg-secondary/50 hover:text-white" // inactive
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
