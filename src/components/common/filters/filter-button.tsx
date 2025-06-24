import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import clsx from "clsx"
import { ListFilter } from "lucide-react"
import React from "react"
import { FiCheck } from "react-icons/fi"

type ListItem = string | { label: string; value: string }

export function FilterButton({
  onClick,
  list,
  statusFilter,
  setStatusFilter,
}: {
  onClick?: () => void
  list: ListItem[]
  statusFilter: string
  setStatusFilter: (s: string) => void
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        onClick={onClick}
        className="flex items-center gap-4 rounded-md bg-transparent border border-gray-800 px-4 py-2 text-xs text-gray-500 hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out focus:ring-0 focus:outline-none"
      >
        Filter{" "}
        {
          // Display the label if it's an object, otherwise display the string
          list.find(item => {
            if (typeof item === "object" && item.value === statusFilter) {
              return true
            }
            return item === statusFilter
          })
            ? typeof list.find(item => {
                if (typeof item === "object" && item.value === statusFilter) {
                  return true
                }
                return item === statusFilter
              }) === "object"
              ? (
                  list.find(item => {
                    if (
                      typeof item === "object" &&
                      item.value === statusFilter
                    ) {
                      return true
                    }
                    return item === statusFilter
                  }) as { label: string; value: string }
                ).label
              : statusFilter
            : statusFilter
        }
        <ListFilter className="h-4 w-4 text-gray-600" />
      </MenuButton>

      <Transition
        as={React.Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems className="absolute z-20 mt-1 w-32 origin-top-left rounded-md border border-gray-800 bg-secondary text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {list.map((s, idx) => {
            const value = typeof s === "object" ? s.value : s
            const label = typeof s === "object" ? s.label : s

            return (
              <MenuItem key={idx}>
                {({ focus }) => (
                  <button
                    onClick={() => setStatusFilter(value)}
                    className={clsx(
                      "flex w-full items-center px-3 py-2 text-xs",
                      focus ? "bg-primary text-black" : "",
                      statusFilter === s ? "font-semibold" : ""
                    )}
                  >
                    {statusFilter === s && (
                      <FiCheck className="mr-2 h-4 w-4 text-yellow-500" />
                    )}
                    {label}
                  </button>
                )}
              </MenuItem>
            )
          })}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
