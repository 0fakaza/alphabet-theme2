"use client"

import {
  Calendar03Icon,
  Cards02Icon,
  Folder02Icon,
  FootballPitchIcon,
  HugeiconsIcon,
  Wallet01Icon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import {
  countPromotionsByCategory,
  type PromotionCategoryId,
  PROMOTION_FILTERS,
} from "@/data/promotions"
import type { IconSvgElement } from "@hugeicons/react"

const filterIcons: Record<PromotionCategoryId, IconSvgElement> = {
  all: Folder02Icon,
  casino: Cards02Icon,
  sport: FootballPitchIcon,
  deposit: Wallet01Icon,
  event: Calendar03Icon,
}

const filterIconColors: Record<PromotionCategoryId, string> = {
  all: "#AC96FD",
  casino: "#C860F5",
  sport: "#42BE49",
  deposit: "#81A3FF",
  event: "#E2A265",
}

type PromotionsFilterBarProps = {
  activeId: PromotionCategoryId
  onSelect: (id: PromotionCategoryId) => void
}

export function PromotionsFilterBar({ activeId, onSelect }: PromotionsFilterBarProps) {
  return (
    <div className="container">
      <div className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-1 md:mx-0   md:gap-8 md:overflow-visible md:px-0  lg:gap-10 xl:gap-16">
        {PROMOTION_FILTERS.map((f) => {
          const active = activeId === f.id
          const count = countPromotionsByCategory(f.id)
          const Icon = filterIcons[f.id]
          return (
              <button
                  key={f.id}
                  type="button"
                  onClick={() => onSelect(f.id)}
                  className={cn(
                      "flex shrink-0 items-center cursor-pointer gap-4 border-b-1 border-transparent pb-4 text-left transition-colors group",
                      active && "border-primary",
                  )}
              >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-background-main p-3.5">
              <HugeiconsIcon
                icon={Icon}
                className="size-6"
                style={{ color: filterIconColors[f.id] }}
                aria-hidden
              />
            </span>
                <span className="flex min-w-0 flex-col gap-1">
              <span
                  className={cn(
                      "text-sm font-medium tracking-wide group-hover:text-primary transition duration-400",
                      active ? "text-primary" : "text-text-main",
                  )}
              >
                {f.label}
              </span>
              <span className="flex items-center gap-1">
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded bg-neutral-600 text-[10px] font-medium leading-none tracking-wide text-text-main">
                  {count}
                </span>
                <span className="text-[10px] font-medium tracking-wide text-text-subtext">{f.countLabel}</span>
              </span>
            </span>
              </button>
          )
        })}
      </div>
    </div>
  )
}
