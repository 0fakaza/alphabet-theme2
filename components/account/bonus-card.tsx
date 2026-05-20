"use client"

import Image from "next/image"
import { Button } from "@/components/elements/button"
import { Cards02Icon, Clock01Icon, HugeiconsIcon } from "@/lib/icons"
import {
  CheckmarkSquare02Icon,
} from "@hugeicons-pro/core-solid-rounded"

export type BonusStatus = "reviewing" | "requested" | "received"

export interface BonusCard {
  id: number
  image: string
  imageBadge?: string
  countdown?: string
  deadline: string
  categoryLabel: string
  title: string
  status: BonusStatus
}

export const bonusCards: BonusCard[] = [
  {
    id: 1,
    image: "/images/promo/promo-card.jpg",
    imageBadge: "Pazara özel",
    countdown: "Kalan Süre : 1S 14DK 22SN",
    deadline: "14 Ağu 2025 23:59",
    categoryLabel: "Casino Bonusları",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "reviewing",
  },
  {
    id: 2,
    image: "/images/promo/promo-card.jpg",
    deadline: "14 Ağu 2025 23:59",
    categoryLabel: "Casino Bonusları",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "requested",
  },
  {
    id: 3,
    image: "/images/promo/promo-card.jpg",
    deadline: "14 Ağu 2025 23:59",
    categoryLabel: "Casino Bonusları",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "received",
  },
  {
    id: 4,
    image: "/images/promo/promo-card.jpg",
    imageBadge: "Pazara özel",
    countdown: "Kalan Süre : 1S 14DK 22SN",
    deadline: "14 Ağu 2025 23:59",
    categoryLabel: "Casino Bonusları",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "requested",
  },
  {
    id: 5,
    image: "/images/promo/promo-card.jpg",
    deadline: "14 Ağu 2025 23:59",
    categoryLabel: "Casino Bonusları",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "received",
  },
  {
    id: 6,
    image: "/images/promo/promo-card.jpg",
    deadline: "14 Ağu 2025 23:59",
    categoryLabel: "Casino Bonusları",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "requested",
  },
  {
    id: 7,
    image: "/images/promo/promo-card.jpg",
    deadline: "14 Ağu 2025 23:59",
    categoryLabel: "Casino Bonusları",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "received",
  },
  {
    id: 8,
    image: "/images/promo/promo-card.jpg",
    deadline: "14 Ağu 2025 23:59",
    categoryLabel: "Casino Bonusları",
    title: "Arkadaşını getir, %20 discount kazan",
    status: "requested",
  },
]

function BonusCardFooter({
  status,
  onRequest,
}: {
  status: BonusStatus
  onRequest?: () => void
}) {
  if (status === "received") {
    return (
      <div className="flex items-center justify-end gap-2">
        <span className="text-sm font-semibold tracking-wide text-semantic-success">
          Alındı
        </span>
        <HugeiconsIcon
          icon={CheckmarkSquare02Icon}
          className="size-6 text-semantic-success"
        />
      </div>
    )
  }

  if (status === "reviewing") {
    return (
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] text-text-main/70">İnceleniyor</span>
          <HugeiconsIcon icon={Clock01Icon} className="size-4 text-icon" />
        </div>
        <Button
          variant="tertiary"
          size="sm"
          className="pointer-events-none shrink-0 opacity-50"
          disabled
        >
          Talep edildi
        </Button>
      </div>
    )
  }

  return (
    <div className="flex justify-end">
      <Button variant="secondary" size="sm" className="shrink-0" onClick={onRequest}>
        Talep edildi
      </Button>
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
    <article className="flex flex-col gap-5 rounded-xl bg-neutral-500 p-4">
      <div className="relative h-[154px] w-full rounded-lg border border-white/[0.08] bg-background-elements">
        <Image
          src={card.image}
          alt=""
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, 350px"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_3px_rgba(255,255,255,0.1)]"
          aria-hidden
        />

        {card.imageBadge && (
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xxl px-2.5 py-1 text-[11px] font-semibold text-white"
            style={{ backgroundColor: "#F51C1C" }}
          >
            {card.imageBadge}
          </span>
        )}

        {card.countdown && (
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-black"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.80)" }}
          >
            {card.countdown}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 text-xs leading-[1.3] font-medium">
          <div className="flex min-w-0 items-center gap-1 whitespace-nowrap">
            <span className="text-text-main">Son Tarihi</span>
            <span className="text-text-subtext">{card.deadline}</span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <HugeiconsIcon
              icon={Cards02Icon}
              className="size-5 shrink-0 text-[#C860F5]"
              aria-hidden
            />
            <span className="text-text-main">{card.categoryLabel}</span>
          </div>
        </div>
        <h3 className="text-base font-bold tracking-wide text-text-main">
          {card.title}
        </h3>
      </div>

      <BonusCardFooter status={card.status} onRequest={onRequest} />
    </article>
  )
}
