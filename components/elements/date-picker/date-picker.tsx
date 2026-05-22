"use client"

import { useId, useState } from "react"
import { cn } from "@/lib/utils"
import {
  formatDisplayDate,
  formatDisplayDateRange,
  normalizeDateRange,
  parseDateInputValue,
  toDateInputValue,
  type DateRangeValue,
} from "@/lib/date"
import { HugeiconsIcon, Calendar04Icon } from "@/lib/icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DatePickerCalendar } from "./date-picker-calendar"

type DatePickerSharedProps = {
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

export type DatePickerSingleProps = DatePickerSharedProps & {
  mode?: "single"
  value: string
  onChange: (value: string) => void
}

export type DatePickerRangeProps = DatePickerSharedProps & {
  mode: "range"
  value: DateRangeValue
  onChange: (value: DateRangeValue) => void
  /** Popover kapanır (varsayılan: true) */
  closeOnRangeComplete?: boolean
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps

export type { DateRangeValue }

const defaultTriggerCls =
  "relative flex h-12 w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-lg border border-element-border bg-background-elements pl-4 pr-3 text-left transition-colors hover:border-primary/50 focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"

function getAnchorDate(props: DatePickerProps): Date {
  if (props.mode === "range") {
    const { start, end } = props.value
    return (
      parseDateInputValue(end) ??
      parseDateInputValue(start) ??
      new Date()
    )
  }
  return parseDateInputValue(props.value) ?? new Date()
}

export function DatePicker(props: DatePickerProps) {
  const {
    min,
    max,
    label,
    disabled = false,
    className,
    triggerClassName,
    contentClassName,
    align = "end",
    side = "bottom",
    id: idProp,
    "aria-label": ariaLabel,
  } = props

  const mode = props.mode ?? "single"
  const isRange = mode === "range"

  const placeholder = isRange
    ? (props.placeholder ?? "gg/aa/yy – gg/aa/yy")
    : (props.placeholder ?? "gg/aa/yy")

  const autoId = useId()
  const id = idProp ?? autoId
  const anchor = getAnchorDate(props)
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(
    () => new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  )

  const displayText =
    props.mode === "range"
      ? formatDisplayDateRange(props.value) || placeholder
      : props.value
        ? formatDisplayDate(props.value)
        : placeholder

  const accessibleName =
    ariaLabel ?? label ?? (isRange ? "Tarih aralığı seç" : "Tarih seç")

  const handleOpenChange = (next: boolean) => {
    if (disabled) return
    setOpen(next)
    if (next) {
      setViewMonth(new Date(anchor.getFullYear(), anchor.getMonth(), 1))
    }
  }

  const handleSelect = (iso: string) => {
    if (props.mode !== "range") {
      props.onChange(iso)
      setOpen(false)
      return
    }

    const { start, end } = props.value
    const closeOnComplete = props.closeOnRangeComplete ?? true

    if (!start || (start && end)) {
      props.onChange({ start: iso, end: "" })
      return
    }

    const normalized = normalizeDateRange({ start, end: iso })
    if (!normalized) return

    props.onChange({
      start: toDateInputValue(normalized.start),
      end: toDateInputValue(normalized.end),
    })

    if (closeOnComplete) {
      setOpen(false)
    }
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
          <span className="min-w-0 flex-1 truncate text-sm font-medium tracking-wide text-text-subtext">
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
        {props.mode === "range" ? (
          <DatePickerCalendar
            mode="range"
            rangeStart={props.value.start}
            rangeEnd={props.value.end}
            viewMonth={viewMonth}
            onViewMonthChange={setViewMonth}
            onSelect={handleSelect}
            min={min}
            max={max}
          />
        ) : (
          <DatePickerCalendar
            mode="single"
            value={props.value}
            viewMonth={viewMonth}
            onViewMonthChange={setViewMonth}
            onSelect={handleSelect}
            min={min}
            max={max}
          />
        )}
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
