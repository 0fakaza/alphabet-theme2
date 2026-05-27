"use client"

import { useEffect, useId, useState } from "react"
import Image from "next/image"
import { createPortal } from "react-dom"
import {
  Calendar03Icon,
  Cards02Icon,
  Cancel01Icon,
  FootballIcon,
  HugeiconsIcon,
  Wallet01Icon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import {
  formatPromotionDeadline,
  type PromotionCategoryId,
  type PromotionListItem,
} from "@/data/promotions"
import type { IconSvgElement } from "@hugeicons/react"


const PROMOTION_DETAIL_MODAL_BACKGROUND =
  "radial-gradient(74.68% 73.31% at 84.54% -6.81%, var(--action-primary-default) 0%, var(--action-primary-alpha) 70%), #F5F0FB"

const categoryIcons: Record<Exclude<PromotionCategoryId, "all">, IconSvgElement> = {
  casino: Cards02Icon,
  sport: FootballIcon,
  deposit: Wallet01Icon,
  event: Calendar03Icon,
}

type PromotionDetailModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: PromotionListItem | null
}

export function PromotionDetailModal({ open, onOpenChange, item }: PromotionDetailModalProps) {
  const [mounted, setMounted] = useState(false)
  const titleId = useId()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (typeof document === "undefined") return
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  if (!mounted || !open || !item) return null

  const CategoryIcon = categoryIcons[item.categoryId] ?? Cards02Icon
  const deadlineValue = formatPromotionDeadline(item.deadlineLabel)

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-background-modal-alpha backdrop-blur-[6px]"
        aria-label="Kapat"
        onClick={() => onOpenChange(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{ background: PROMOTION_DETAIL_MODAL_BACKGROUND }}
        className={cn(
          "relative z-10 flex w-full max-h-[min(92dvh,720px)] flex-col overflow-hidden  shadow-[0px_24px_48px_-12px_rgba(0,0,0,0.28)]",
          "rounded-t-[24px] sm:max-h-[min(90dvh,602px)] sm:max-w-[689px] sm:rounded-[24px]",
        )}
      >
        <div className="shrink-0 bg-transparent px-4 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-6">
          <div className="relative min-h-0 rounded-[16px] bg-white/30 p-3 sm:min-h-[138px] sm:p-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "absolute right-3 top-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-lg bg-white text-neutral-100",
                "transition duration-400 ",
                "hover:bg-neutral-600 hover:text-white",
              )}
              aria-label="Kapat"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-[18px]" />
            </button>

            <div className="flex flex-col gap-4 pr-12 pt-0.5 sm:flex-row sm:items-start sm:gap-6 sm:pr-14">
              <div className="relative mx-auto hidden h-[115px] w-full max-w-[237px] shrink-0 overflow-hidden rounded-lg sm:mx-0 sm:block">
                <Image
                  src={item.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="237px"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_3px_rgba(255,255,255,0.1)]"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1 sm:space-y-2">
                <p className="flex flex-wrap items-center gap-2 text-xs font-medium leading-[1.3] tracking-wide">
                  <span className="text-black/60">Son Tarihi</span>
                  <span className="text-[#23282c]">{deadlineValue}</span>
                </p>
                <h2
                  id={titleId}
                  className="text-lg font-semibold leading-normal tracking-[0.4px] text-[#23282c] sm:text-xl sm:leading-tight"
                >
                  {item.detail.modalTitle ?? item.title}
                </h2>
                <div className="flex items-center gap-[7px] pt-0.5">
                  <HugeiconsIcon icon={CategoryIcon} className="size-6 shrink-0 text-primary" aria-hidden />
                  <span className="text-xs font-medium leading-[1.3] text-[#23282c] sm:text-sm">{item.categoryLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden  bg-transparent">
            <div
              className={cn(
                "min-h-0 flex-1 overflow-y-auto pl-5 pr-3 pb-6  [scrollbar-width:thin]",
                "[scrollbar-color:var(--action-primary-default)_transparent]",
                "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-action-primary-default",
              )}
            >
              <div className="space-y-6">
                {item.detail.sections.map((section) => (
                  <section key={section.title}>
                    <h3 className="mb-2 text-base font-bold tracking-wide text-[#0a0e1a]">{section.title}</h3>
                    <div className="space-y-3 text-sm font-medium leading-relaxed text-text-subtext">
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
                {item.detail.gamesSection ? (
                  <section>
                    <h3 className="mb-2 text-base font-bold tracking-wide text-[#0a0e1a]">
                      {item.detail.gamesSection.title}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-text-subtext">{item.detail.gamesSection.body}</p>
                  </section>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
