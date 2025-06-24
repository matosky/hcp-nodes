import React from "react"

export interface ITableColumn {
  key: string
  label: string | React.ReactNode
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode
}

export interface TableProps {
  columns: ITableColumn[]
  data: Record<string, unknown>[]
}

export function Table({ columns, data }: TableProps) {
  return (
    <>
      <div className="rounded-lg border bg-card text-card-foreground border-[#33383F]">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b border-[#33383F]">
              <tr className="border-b border-[#33383F]">
                {columns.map(col => (
                  <th
                    key={col.key}
                    className="h-10 px-4 py-3 text-left align-middle font-medium text-[#6F767E] text-sm"
                    style={{ fontFamily: "Open Sans", fontWeight: 700 }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="border-b transition-colors border-[#33383F]"
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className="px-4 py-5 align-middle text-white text-sm"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-[#6F767E]">Page 1 of 10</p>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm border border-[#6F767E] rounded-md text-[#6F767E] transition-colors">
            Previous
          </button>
          <button className="px-3 py-2 text-sm border border-[#6F767E] rounded-md text-[#6F767E] transition-colors">
            Next
          </button>
        </div>
      </div>
    </>
  )
}
