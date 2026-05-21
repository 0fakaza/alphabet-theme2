"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import {
  getCalendarDays,
  isDateDisabled,
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

export type DatePickerCalendarProps = {
  value: string
  viewMonth: Date
  onViewMonthChange: (month: Date) => void
  onSelect: (iso: string) => void
  min?: string
  max?: string
  className?: string
}

export function DatePickerCalendar({
  value,
  viewMonth,
  onViewMonthChange,
  onSelect,
  min,
  max,
  className,
}: DatePickerCalendarProps) {
  const selected = parseDateInputValue(value) ?? new Date()

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
            <button
              key={`${date.toISOString()}-${i}`}
              type="button"
              disabled={isDateDisabled(date, min, max)}
              onClick={() => handleSelect(date)}
              className={cn(
                "flex cursor-pointer h-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                isSameDay(date, selected) &&
                  "bg-primary text-action-primary-on-primary",
                !isSameDay(date, selected) &&
                  !isDateDisabled(date, min, max) &&
                  "text-text-main hover:bg-background-elements",
                isToday(date) &&
                  !isSameDay(date, selected) &&
                  "ring-1 ring-primary ring-inset",
                isDateDisabled(date, min, max) &&
                  "cursor-not-allowed text-text-subtext opacity-40"
              )}
            >
              {date.getDate()}
            </button>
          ) : (
            <span key={`empty-${i}`} className="h-9" aria-hidden />
          )
        )}
      </div>
    </div>
  )
}
