"use client"

import { HugeiconsIcon, ArrowDown01Icon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { HELP_CATEGORIES, type HelpCategoryId } from "@/data/help"

type HelpCategoryNavProps = {
  activeId: HelpCategoryId
  onSelect: (id: HelpCategoryId) => void
  className?: string
}

export function HelpCategoryNav({ activeId, onSelect, className }: HelpCategoryNavProps) {
  return (
    <nav className={cn("overflow-hidden", className)} aria-label="Yardım kategorileri">
      {HELP_CATEGORIES.map((cat, index) => {
        const active = cat.id === activeId
        const isLast = index === HELP_CATEGORIES.length - 1
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={cn(
              "group flex w-full cursor-pointer px-5 py-5 text-left transition-colors max-lg:px-3 lg:px-4 lg:py-4",
              active ? "border-b-2 border-primary" : cn("border-b border-divider-100", isLast && "border-b-0"),
            )}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1">
                  <span
                    className={cn(
                      "text-base font-semibold transition duration-300 group-hover:text-primary lg:text-sm",
                      active ? "text-primary" : "text-text-main",
                    )}
                  >
                    {cat.title}
                  </span>
                  {cat.videoCount != null ? (
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.09em]",
                        active ? "bg-background-elements text-text-subtext" : "bg-neutral-100 text-text-subtext",
                      )}
                    >
                      {cat.videoCount} Video
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-[10px] font-medium leading-[17px] tracking-wide text-text-subtext">
                  {cat.subtitle}
                </p>
              </div>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className="size-6 shrink-0 -rotate-90 text-icon group-hover:text-primary lg:size-5"
                aria-hidden
              />
            </div>
          </button>
        )
      })}
    </nav>
  )
}
