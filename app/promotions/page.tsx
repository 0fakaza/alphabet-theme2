import type { Metadata } from "next"
import { PromotionsHero } from "@/components/promotions/promotions-hero"
import { PromotionsPageContent } from "@/components/promotions/promotions-page-content"

export const metadata: Metadata = {
  title: "Promosyonlar",
  description: "Casino ve spor bonusları, etkinlik kampanyaları ve promosyonlar.",
}

export default function PromotionsPage() {
  return (
    <main>
      <PromotionsHero />
      <PromotionsPageContent />
    </main>
  )
}
