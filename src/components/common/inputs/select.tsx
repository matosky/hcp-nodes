import { cn } from "@/lib/utils"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { Fragment } from "react"
import { FiChevronDown } from "react-icons/fi"

type Primitive = string | number

type Option<V extends Primitive> = {
  label: string
  value: V
}

type RawOption<V extends Primitive> = V | Option<V>

export type SelectProps<V extends Primitive> = {
  options: RawOption<V>[]
  value: V
  onChange: (value: V) => void
  className?: string
  query?: string
  setQuery?: (query: string) => void
  placeholder?: string
  isLoading?: boolean
  isSearchable?: boolean
  buttonClassName?: string
  dropIconClassName?: string;
}

export function Select<V extends Primitive>({
  options,
  value,
  onChange,
  className = "",
  query,
  setQuery,
  placeholder = "Select...",
  isLoading,
  isSearchable,
  buttonClassName,
  dropIconClassName
}: SelectProps<V>) {
  // Normalize every raw option into { label, value }
  const norm: Option<V>[] = options.map(opt =>
    typeof opt === "object" ? opt : { label: String(opt), value: opt }
  )

  const filtered =
    isSearchable && query
      ? norm.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
      : norm

  // Find the current label (or fallback to placeholder)
  const selected = norm.find(o => o.value === value)

  return (
    <div className={cn("w-full relative", className)}>
      <Listbox
        value={value}
        onChange={val => {
          onChange(val)
          setQuery?.("")
        }}
      >
        <ListboxButton
          className={cn(
            "relative w-full cursor-default rounded-md bg-transparent py-2 pl-3 pr-10 text-left text-white border border-gray-800 shadow-sm focus:outline-none text-sm",
            buttonClassName
          )}
        >
          <span className="block truncate">
            {selected?.label ?? placeholder}
          </span>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FiChevronDown className={cn("pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300", dropIconClassName)} />
          </span>
        </ListboxButton>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-secondary border border-gray-800 py-1 text-sm text-white shadow-lg focus:outline-none">
            {isSearchable && (
              <div className="sticky top-0 bg-secondary px-3 py-3">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery?.(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-md border border-gray-800 bg-gray-800 px-2 py-1 text-xs text-white focus:outline-none"
                />
              </div>
            )}

            {isLoading && (
              <p className="animate-pulse px-4 py-2 text-gray-400 text-xxs">
                Loading...
              </p>
            )}

            {filtered.length === 0 ? (
              <div className="px-4 py-2 text-gray-400 text-xs">
                No options found
              </div>
            ) : (
              filtered.map((option, index) => (
                <ListboxOption
                  key={index}
                  value={option.value}
                  className={({ selected }) =>
                    cn(
                      "cursor-pointer select-none px-4 py-2 text-sm",
                      selected
                        ? "bg-primary text-black"
                        : "text-white hover:bg-info/10"
                    )
                  }
                >
                  {option.label}
                </ListboxOption>
              ))
            )}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  )
}
