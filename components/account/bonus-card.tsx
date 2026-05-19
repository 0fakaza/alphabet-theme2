"use client"

import Image from "next/image"
import { Button } from "@/components/elements/button"

export type BonusStatus = "reviewing" | "requested" | "received"

export interface BonusCard {
  id: number
  image: string
  badge?: string
  date: string
  type: string
  title: string
  status: BonusStatus
  expired?: boolean
}

export const bonusCards: BonusCard[] = [
  {
    id: 1,
    image: "/images/promos/promo1.jpg",
    badge: "Papara Özel",
    date: "14 Ağu 2025 22:10",
    type: "Casino Bonusu",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "reviewing",
    expired: true,
  },
  {
    id: 2,
    image: "/images/promos/promo2.jpg",
    date: "14 Ağu 2025 22:10",
    type: "Casino Bonusu",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "requested",
  },
  {
    id: 3,
    image: "/images/promos/promo3.jpg",
    badge: "Papara Özel",
    date: "14 Ağu 2025 22:10",
    type: "Casino Bonusu",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "requested",
  },
  {
    id: 4,
    image: "/images/promos/promo2.jpg",
    date: "14 Ağu 2025 22:10",
    type: "Casino Bonusu",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "requested",
  },
  {
    id: 5,
    image: "/images/promos/promo1.jpg",
    date: "14 Ağu 2025 22:10",
    type: "Casino Bonusu",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "received",
  },
  {
    id: 6,
    image: "/images/promos/promo3.jpg",
    date: "14 Ağu 2025 22:10",
    type: "Casino Bonusu",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "received",
  },
  {
    id: 7,
    image: "/images/promos/promo2.jpg",
    date: "14 Ağu 2025 22:10",
    type: "Casino Bonusu",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "requested",
  },
  {
    id: 8,
    image: "/images/promos/promo1.jpg",
    date: "14 Ağu 2025 22:10",
    type: "Casino Bonusu",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "received",
  },
]

export function BonusStatusBadge({
  status,
  onRequest,
}: {
  status: BonusStatus
  onRequest?: () => void
}) {
  if (status === "reviewing") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-text-subtext">
        <div className="size-2 animate-pulse rounded-full bg-amber-400" />
        İnceleniyor
      </div>
    )
  }
  if (status === "requested") {
    return (
      <Button variant="secondary" size="sm" className="w-full" onClick={onRequest}>
        Talep edildi
      </Button>
    )
  }
  return (
    <div className="flex items-center justify-center gap-1.5 rounded-xl bg-green-500/15 px-3 py-2 text-sm font-medium text-green-500">
      Alındı
      <span className="size-2 rounded-full bg-green-500" />
    </div>
  )
}

export function BonusCardItem({
  card,
  onRequest,
}: {
  card: BonusCard
  onRequest?: () => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-element-border bg-background-main">
      <div className="relative h-[130px] w-full bg-background-elements">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = "none"
          }}
        />
        {card.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
            {card.badge}
          </span>
        )}
        {card.expired && (
          <div className="absolute inset-x-2 bottom-2 rounded-lg bg-red-500/90 px-2 py-0.5 text-center text-[10px] font-semibold text-white">
            Süre Doldu - 15 HAZ 2024
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-1 text-[10px] text-text-subtext">
          <span>Son Tarih: {card.date}</span>
          <span className="mx-1 h-3 w-px bg-divider-100" />
          <span>{card.type}</span>
        </div>
        <p className="text-sm font-semibold leading-tight text-text-title">{card.title}</p>
        <BonusStatusBadge status={card.status} onRequest={onRequest} />
      </div>
    </div>
  )
}
