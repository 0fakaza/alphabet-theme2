"use client"

import { HugeiconsIcon, Search01Icon } from "@/lib/icons"

export function HelpPanelToolbar({
  title,
  searchValue,
  onSearchChange,
  placeholder,
  ariaLabel,
}: {
  title: string
  searchValue: string
  onSearchChange: (v: string) => void
  placeholder: string
  ariaLabel: string
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <h2 className="shrink-0 text-lg font-medium leading-tight tracking-[0.28px] text-text-main sm:text-[23px]">
        {title}
      </h2>
      <div className="relative w-full max-w-[220px] sm:max-w-none sm:w-[220px] sm:shrink-0">
        <HugeiconsIcon
          icon={Search01Icon}
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-subtitle"
          aria-hidden
        />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl bg-background-elements py-2 pl-10 pr-3 text-sm font-medium text-text-main shadow-none outline-none placeholder:text-text-subtext focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
          aria-label={ariaLabel}
        />
      </div>
    </div>
  )
}
