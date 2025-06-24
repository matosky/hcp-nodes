import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import clsx from "clsx"
import { ListFilter } from "lucide-react"
import { Fragment } from "react"
import { FiCheck } from "react-icons/fi"

export type SortOption = {
  label: string
  value: string
}

type SortDropdownProps = {
  value?: string
  onChange?: (value: string) => void
  options?: SortOption[]
  className?: string
}

export function SortFilterDropdown({
  value,
  onChange,
  options = [],
  className,
}: SortDropdownProps) {
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <Menu
      as="div"
      className={`relative inline-block text-left sm:w-36 lg:w-48 ${className}`}
    >
      <MenuButton className="inline-flex justify-between w-full items-center rounded-md border border-gray-800 bg-transparent px-4 py-2 text-xs text-gray-500 shadow-sm hover:bg-gray-800 hover:text-white focus:outline-none">
        <span>{selectedOption?.label ?? "Sort by"}</span>
        <ListFilter className="h-4 w-4 text-gray-600" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems className="absolute z-50 mt-2 w-full origin-top-right rounded-md bg-secondary border border-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="text-xs text-gray-400">
            {options.map(opt => (
              <MenuItem key={opt.value}>
                {({ focus }) => (
                  <button
                    onClick={() => onChange?.(opt.value)}
                    className={clsx(
                      "group flex w-full items-center px-4 py-2 text-left",
                      focus ? "bg-yellow-500 text-black" : "",
                      opt.value === value
                        ? "font-semibold text-gray-200"
                        : "font-normal"
                    )}
                  >
                    {opt.value === value && (
                      <FiCheck className="mr-2 h-4 w-4 text-yellow-400" />
                    )}
                    {opt.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
