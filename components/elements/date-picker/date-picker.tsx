"use client"

import { useId, useState } from "react"
import { cn } from "@/lib/utils"
import { formatDisplayDate, parseDateInputValue } from "@/lib/date"
import { HugeiconsIcon, Calendar04Icon } from "@/lib/icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DatePickerCalendar } from "./date-picker-calendar"

export type DatePickerProps = {
  /** ISO format: yyyy-MM-dd */
  value: string
  onChange: (value: string) => void
  min?: string
  max?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  id?: string
  "aria-label"?: string
}

const defaultTriggerCls =
  "relative flex h-12 w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-xl border border-element-border bg-background-elements pl-4 pr-3 text-left transition-colors hover:border-primary/50 focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"

export function DatePicker({
  value,
  onChange,
  min,
  max,
  label,
  placeholder = "gg/aa/yy",
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  align = "end",
  side = "bottom",
  id: idProp,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const selected = parseDateInputValue(value) ?? new Date()
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1)
  )

  const displayText = value ? formatDisplayDate(value) : placeholder
  const accessibleName = ariaLabel ?? label ?? "Tarih seç"

  const handleOpenChange = (next: boolean) => {
    if (disabled) return
    setOpen(next)
    if (next) {
      setViewMonth(new Date(selected.getFullYear(), selected.getMonth(), 1))
    }
  }

  const handleSelect = (iso: string) => {
    onChange(iso)
    setOpen(false)
  }

  const field = (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          disabled={disabled}
          aria-label={accessibleName}
          className={cn(defaultTriggerCls, triggerClassName)}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-sm font-medium tracking-wide",
              value ? "text-text-main" : "text-text-subtext"
            )}
          >
            {displayText}
          </span>
          <HugeiconsIcon
            icon={Calendar04Icon}
            className="size-5 shrink-0 text-icon pointer-events-none"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align={align}
        side={side}
        sideOffset={8}
        className={cn(
          "rounded-2xl border border-element-border bg-background-modal p-4 shadow-lg ring-0",
          contentClassName
        )}
      >
        <DatePickerCalendar
          value={value}
          viewMonth={viewMonth}
          onViewMonthChange={setViewMonth}
          onSelect={handleSelect}
          min={min}
          max={max}
        />
      </PopoverContent>
    </Popover>
  )

  if (!label) {
    return <div className={className}>{field}</div>
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-xs font-medium text-text-subtext">
        {label}
      </label>
      {field}
    </div>
  )
}

/** @deprecated Use `DatePicker` instead */
export const DatePickerField = DatePicker
