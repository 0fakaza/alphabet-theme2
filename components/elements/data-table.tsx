import type { ReactNode } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type Column<T> = {
  key: string
  label: string
  width?: string
  headerClassName?: string
  cellClassName?: string
  hideOnMobile?: boolean
  render: (row: T, index: number) => ReactNode
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  className?: string
}

export function DataTable<T>({
  columns,
  data,
  emptyMessage = "Veri bulunamadı.",
  className,
}: DataTableProps<T>) {
  const defaultWidth = `${100 / columns.length}%`

  const visibleColumns = columns.filter((c) => !c.hideOnMobile)

  return (
    <Table className={cn("border-separate border-spacing-y-1 md:table-fixed", className)}>
      <TableHeader>
        <TableRow className="border-0">
          {columns.map((col) => (
            <TableHead
              key={col.key}
              style={{ width: col.width ?? defaultWidth }}
              className={cn(
                "text-[11px] uppercase tracking-wider text-text-subtext",
                col.hideOnMobile && "hidden md:table-cell",
                col.headerClassName,
              )}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => {
          const isFirst = i === 0
          const isLast = i === data.length - 1
          return (
            <TableRow
              key={i}
              className={`h-12 border-0 hover:bg-neutral-300 ${i % 2 === 0 ? "bg-neutral-200" : "bg-neutral-300"}`}
            >
              {columns.map((col, colIdx) => {
                const visibleIdx = visibleColumns.indexOf(col)
                const isFirstVisible = visibleIdx === 0
                const isLastVisible = visibleIdx === visibleColumns.length - 1
                let radius = ""
                if (isFirst && isFirstVisible) radius = "rounded-tl-lg"
                if (isFirst && isLastVisible) radius += " rounded-tr-lg"
                if (isLast && isFirstVisible) radius += " rounded-bl-lg"
                if (isLast && isLastVisible) radius += " rounded-br-lg"

                return (
                  <TableCell
                    key={col.key}
                    className={cn(
                      radius,
                      col.hideOnMobile && "hidden md:table-cell",
                      col.cellClassName,
                    )}
                  >
                    {col.render(row, i)}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
        {data.length === 0 && (
          <TableRow className="border-zinc-800/50 hover:bg-transparent">
            <TableCell colSpan={columns.length} className="rounded-lg py-8 text-center text-xs text-zinc-500">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
