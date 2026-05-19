"use client"

import Image from "next/image"
import {
  Calendar03Icon,
  Cards02Icon,
  FootballIcon,
  HugeiconsIcon,
  Wallet01Icon,
} from "@/lib/icons"
import { formatPromotionDeadline, type PromotionCategoryId, type PromotionListItem } from "@/data/promotions"
import type { IconSvgElement } from "@hugeicons/react"

const categoryIcons: Record<Exclude<PromotionCategoryId, "all">, IconSvgElement> = {
  casino: Cards02Icon,
  sport: FootballIcon,
  deposit: Wallet01Icon,
  event: Calendar03Icon,
}

type PromotionCardProps = {
  item: PromotionListItem
  onOpen: (item: PromotionListItem) => void
}

export function PromotionCard({ item, onOpen }: PromotionCardProps) {
  const CategoryIcon = categoryIcons[item.categoryId] ?? Cards02Icon

  return (
    <article className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group cursor-pointer relative block aspect-[452/220] w-full overflow-hidden rounded-[15px] text-left outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Image
          src={item.imageSrc}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_3px_rgba(255,255,255,0.1)]"
          aria-hidden
        />

      </button>

      <button
        type="button"
        onClick={() => onOpen(item)}
        className="flex flex-col gap-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <HugeiconsIcon icon={CategoryIcon} className="size-6 shrink-0 text-[#C860F5]" aria-hidden />
          <span className="text-text-main">{item.categoryLabel}</span>
          <span className="size-1.5 shrink-0 rounded-full bg-text-subtext" aria-hidden />
          <span className="text-text-subtext">Son Tarihi</span>
          <span className="text-text-main">{formatPromotionDeadline(item.deadlineLabel)}</span>
        </div>
        <span className="text-base font-bold tracking-wide text-text-main">{item.title}</span>
      </button>
    </article>
  )
}
