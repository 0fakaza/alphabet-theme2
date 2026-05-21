export function toDateInputValue(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function parseDateInputValue(value: string): Date | null {
  if (!value) return null
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d)
  return Number.isNaN(date.getTime()) ? null : date
}

/** Görüntü: gg/aa/yy (Figma) */
export function formatDisplayDate(iso: string): string {
  const parsed = parseDateInputValue(iso)
  if (!parsed) return "—"
  const d = String(parsed.getDate()).padStart(2, "0")
  const m = String(parsed.getMonth() + 1).padStart(2, "0")
  const y = String(parsed.getFullYear()).slice(-2)
  return `${d}/${m}/${y}`
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

export function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export function getCalendarDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0).getDate()
  const startPad = (first.getDay() + 6) % 7
  const days: (Date | null)[] = Array.from({ length: startPad }, () => null)
  for (let d = 1; d <= lastDay; d++) {
    days.push(new Date(year, month, d))
  }
  return days
}

export function isDateDisabled(
  date: Date,
  min?: string,
  max?: string
): boolean {
  const t = startOfDay(date).getTime()
  if (min) {
    const minDate = parseDateInputValue(min)
    if (minDate && t < startOfDay(minDate).getTime()) return true
  }
  if (max) {
    const maxDate = parseDateInputValue(max)
    if (maxDate && t > startOfDay(maxDate).getTime()) return true
  }
  return false
}

export type DateRangeValue = {
  /** ISO yyyy-MM-dd */
  start: string
  /** ISO yyyy-MM-dd */
  end: string
}

/** Sıralı başlangıç / bitiş (aynı gün dahil) */
export function normalizeDateRange(range: DateRangeValue): {
  start: Date
  end: Date
} | null {
  const start = parseDateInputValue(range.start)
  const end = parseDateInputValue(range.end)
  if (!start || !end) return null
  const a = startOfDay(start).getTime()
  const b = startOfDay(end).getTime()
  if (a <= b) return { start: startOfDay(start), end: startOfDay(end) }
  return { start: startOfDay(end), end: startOfDay(start) }
}

export function isInDateRange(
  date: Date,
  startIso: string,
  endIso: string
): boolean {
  const normalized = normalizeDateRange({ start: startIso, end: endIso })
  if (!normalized) return false
  const t = startOfDay(date).getTime()
  return (
    t >= normalized.start.getTime() && t <= normalized.end.getTime()
  )
}

export function formatDisplayDateRange(range: DateRangeValue): string {
  const { start, end } = range
  if (start && end) {
    return `${formatDisplayDate(start)} – ${formatDisplayDate(end)}`
  }
  if (start) return `${formatDisplayDate(start)} – …`
  if (end) return `… – ${formatDisplayDate(end)}`
  return ""
}

/** Geçmiş işlemler: "14.02.2025 14:30" */
export function parseTransactionDateTime(value: string): Date | null {
  const m = value.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})(?:\s+(\d{2}):(\d{2}))?/)
  if (!m) return null
  const [, d, mo, y, h = "0", mi = "0"] = m
  const date = new Date(
    Number(y),
    Number(mo) - 1,
    Number(d),
    Number(h),
    Number(mi)
  )
  return Number.isNaN(date.getTime()) ? null : date
}

export function isTransactionInRange(
  tarih: string,
  range: DateRangeValue
): boolean {
  const parsed = parseTransactionDateTime(tarih)
  if (!parsed) return true
  if (range.start && range.end) {
    return isInDateRange(parsed, range.start, range.end)
  }
  if (range.start) {
    const start = parseDateInputValue(range.start)
    if (start && startOfDay(parsed).getTime() < startOfDay(start).getTime()) {
      return false
    }
  }
  if (range.end) {
    const end = parseDateInputValue(range.end)
    if (end && startOfDay(parsed).getTime() > startOfDay(end).getTime()) {
      return false
    }
  }
  return true
}
