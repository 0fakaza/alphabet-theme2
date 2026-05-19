"use client"

import { useMemo, useState } from "react"
import { PromotionsFilterBar } from "@/components/promotions/promotions-filter-bar"
import { PromotionCard } from "@/components/promotions/promotion-card"
import { PromotionDetailModal } from "@/components/promotions/promotion-detail-modal"
import { PROMOTION_ITEMS, type PromotionCategoryId, type PromotionListItem } from "@/data/promotions"

export function PromotionsPageContent() {
  const [categoryId, setCategoryId] = useState<PromotionCategoryId>("all")
  const [detailItem, setDetailItem] = useState<PromotionListItem | null>(null)

  const filtered = useMemo(() => {
    return PROMOTION_ITEMS.filter((item) => {
      if (categoryId === "all") return true
      return item.categoryId === categoryId
    })
  }, [categoryId])

  return (
    <>
      <PromotionDetailModal open={detailItem !== null} onOpenChange={(o) => !o && setDetailItem(null)} item={detailItem} />

      <section className=" md:pb-20">
        <div className="relative px-4 pt-4 md:px-6 md:pt-6 before:pointer-events-none before:absolute before:bottom-[4] before:z-[-1] before:left-0 before:h-px before:w-full before:bg-divider-100 before:content-['']">
          <PromotionsFilterBar activeId={categoryId} onSelect={setCategoryId} />
        </div>
        <div className="container">
          <div className="py-8  md:py-10">
            {filtered.length === 0 ? (
              <p className="text-center text-sm font-medium text-text-subtext">
                Bu filtrelerle eşleşen promosyon bulunamadı.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12 lg:gap-x-4">
                {filtered.map((item) => (
                  <PromotionCard key={item.id} item={item} onOpen={setDetailItem} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
