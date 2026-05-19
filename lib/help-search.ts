import type { HelpDepositMethod } from "@/data/help"

export function matchesQuery(text: string, q: string) {
  if (!q.trim()) return true
  return text.toLowerCase().includes(q.trim().toLowerCase())
}

export function depositMethodMatches(method: HelpDepositMethod, q: string) {
  if (!q) return true
  return (
    matchesQuery(method.title, q) ||
    method.steps.some((s) => matchesQuery(s.body, q) || matchesQuery(s.title, q))
  )
}

export function faqItemMatches(item: { title: string; content: string }, q: string) {
  if (!q) return true
  return matchesQuery(item.title, q) || matchesQuery(item.content, q)
}

/** Tailwind `lg` ile uyumlu mobil üst sınır */
export const HELP_MOBILE_MEDIA = "(max-width: 1023px)"

export function isHelpMobileViewport() {
  if (typeof window === "undefined") return false
  return window.matchMedia(HELP_MOBILE_MEDIA).matches
}
