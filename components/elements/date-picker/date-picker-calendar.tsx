"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import {
  getCalendarDays,
  isDateDisabled,
  isInDateRange,
  isSameDay,
  isToday,
  parseDateInputValue,
  toDateInputValue,
} from "@/lib/date"
import { HugeiconsIcon, ArrowLeft01Icon, ArrowRight01Icon } from "@/lib/icons"

const WEEKDAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"] as const

const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
] as const

type DatePickerCalendarBaseProps = {
  viewMonth: Date
  onViewMonthChange: (month: Date) => void
  onSelect: (iso: string) => void
  min?: string
  max?: string
  className?: string
}

export type DatePickerCalendarSingleProps = DatePickerCalendarBaseProps & {
  mode?: "single"
  value: string
}

export type DatePickerCalendarRangeProps = DatePickerCalendarBaseProps & {
  mode: "range"
  rangeStart: string
  rangeEnd: string
}

export type DatePickerCalendarProps =
  | DatePickerCalendarSingleProps
  | DatePickerCalendarRangeProps

export function DatePickerCalendar(props: DatePickerCalendarProps) {
  const {
    viewMonth,
    onViewMonthChange,
    onSelect,
    min,
    max,
    className,
  } = props

  const isRangeMode = props.mode === "range"
  const selected = !isRangeMode
    ? parseDateInputValue(props.value) ?? new Date()
    : null

  const rangeStart = isRangeMode
    ? parseDateInputValue(props.rangeStart)
    : null
  const rangeEnd = isRangeMode
    ? parseDateInputValue(props.rangeEnd)
    : null

  const calendarDays = useMemo(
    () => getCalendarDays(viewMonth.getFullYear(), viewMonth.getMonth()),
    [viewMonth]
  )

  const goPrevMonth = () => {
    onViewMonthChange(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
  }

  const goNextMonth = () => {
    onViewMonthChange(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
  }

  const handleSelect = (date: Date) => {
    if (isDateDisabled(date, min, max)) return
    onSelect(toDateInputValue(date))
  }

  const getDayState = (date: Date) => {
    if (!isRangeMode && selected) {
      return {
        isSelected: isSameDay(date, selected),
        isRangeStart: false,
        isRangeEnd: false,
        inRange: false,
      }
    }

    const isRangeStart = !!(rangeStart && isSameDay(date, rangeStart))
    const isRangeEnd = !!(rangeEnd && isSameDay(date, rangeEnd))
    const inRange =
      isRangeMode &&
      props.rangeStart &&
      props.rangeEnd &&
      isInDateRange(date, props.rangeStart, props.rangeEnd)

    return {
      isSelected: isRangeStart || isRangeEnd,
      isRangeStart,
      isRangeEnd,
      inRange: inRange && !isRangeStart && !isRangeEnd,
    }
  }

  return (
    <div className={cn("w-[256px]", className)}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={goPrevMonth}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-element-border bg-background-elements text-icon transition-colors hover:border-primary hover:text-primary"
          aria-label="Önceki ay"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
        </button>
        <p className="text-sm font-semibold text-text-main">
          {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
        </p>
        <button
          type="button"
          onClick={goNextMonth}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-element-border bg-background-elements text-icon transition-colors hover:border-primary hover:text-primary"
          aria-label="Sonraki ay"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
        </button>
      </div>

      {isRangeMode && (
        <p className="mb-3 text-center text-[11px] text-text-subtext">
          {!props.rangeEnd
            ? "Bitiş tarihini seçin"
            : "Yeni aralık için başlangıç tarihini seçin"}
        </p>
      )}

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="flex h-8 items-center justify-center text-[11px] font-medium text-text-subtext"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, i) =>
          date ? (
            (() => {
              const { isSelected, isRangeStart, isRangeEnd, inRange } =
                getDayState(date)
              return (
                <button
                  key={`${date.toISOString()}-${i}`}
                  type="button"
                  disabled={isDateDisabled(date, min, max)}
                  onClick={() => handleSelect(date)}
                  className={cn(
                    "flex h-9 cursor-pointer items-center justify-center text-sm font-medium transition-colors",
                    isSelected &&
                      "bg-primary text-action-primary-on-primary",
                    isRangeStart && !isRangeEnd && "rounded-lg",
                    isRangeEnd && !isRangeStart && "rounded-lg",
                    isRangeStart && isRangeEnd && "rounded-lg",
                    inRange && "rounded-none bg-primary/15 text-text-main",
                    !isSelected &&
                      !inRange &&
                      !isDateDisabled(date, min, max) &&
                      "rounded-lg text-text-main hover:bg-background-elements",
                    isToday(date) &&
                      !isSelected &&
                      !inRange &&
                      "ring-1 ring-primary ring-inset",
                    isDateDisabled(date, min, max) &&
                      "cursor-not-allowed rounded-lg text-text-subtext opacity-40"
                  )}
                >
                  {date.getDate()}
                </button>
              )
            })()
          ) : (
            <span key={`empty-${i}`} className="h-9" aria-hidden />
          )
        )}
      </div>
    </div>
  )
}
