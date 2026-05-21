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
