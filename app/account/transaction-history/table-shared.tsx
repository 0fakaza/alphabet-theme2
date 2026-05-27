"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  HugeiconsIcon,
  ArrowUpRight01Icon,
  Folder02Icon,
} from "@/lib/icons"
import type { KuponStatus, KuponType } from "./types"
import { KuponStatusBadge, KuponTypeCell } from "./badges"

export type SporKuponRow = {
  id: string
  type: KuponType
  tarih: string
  bahis: number
  oran: number
  maxKazanc: number
  status: KuponStatus
}

export const historyTableClass =
  "w-full border-separate border-spacing-y-2 max-md:[&_th]:whitespace-nowrap max-md:[&_td]:whitespace-nowrap"
export const historyTableCellNowrap = "max-md:whitespace-nowrap"
export const historyTableBodyRowClass =
  "cursor-pointer transition-colors [&>td]:bg-neutral-300 [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-lg hover:[&>td]:bg-neutral-500"
export const historyTableBodyRowStaticClass =
  "transition-colors [&>td]:bg-neutral-300 [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-lg hover:[&>td]:bg-neutral-500"

export const sporTableHeadLabel = cn(
  "text-left text-[12px] font-medium text-text-subtitle",
  historyTableCellNowrap
)
export const sporTableLeftGroup =
  "flex w-max max-w-full items-center gap-x-6 max-md:whitespace-nowrap"
export const sporTableLeftColId = "flex min-w-[148px] shrink-0 items-center gap-2"
export const sporTableLeftColType = "min-w-[100px] shrink-0 text-left"
export const sporTableLeftColDate =
  "min-w-[120px] shrink-0 text-left text-xs text-text-subtext whitespace-nowrap"
export const sporTableHeadColDate = cn(sporTableHeadLabel, "block min-w-[120px] text-left")
export const sporTableRightGroup =
  "flex items-center gap-x-8 max-md:whitespace-nowrap"
export const sporTableRightCol = "flex min-w-[72px] justify-end"
export const historyTableScrollWrap =
  "overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]"
export const sporHistoryTableClass = cn(
  historyTableClass,
  "w-full min-w-[820px] md:min-w-0 md:table-fixed"
)
export const casinoHistoryTableClass = cn(historyTableClass, "w-full min-w-[640px]")
export const odemeHistoryTableClass = cn(historyTableClass, "w-full min-w-[560px]")

const statCardLabelToneClass = {
  kazanc: "text-[#9BBC14]",
  kayip: "text-[#F82E2E]",
  satildi: "text-[#FB8C4B]",
  iade: "text-[#AC96FD]",
  karZarar: "text-text-main",
  default: "text-text-subtext",
} as const

type StatCardLabelTone = keyof typeof statCardLabelToneClass

export function Coin({ amount }: { amount: number }) {
  return (
    <div className={cn("flex items-center gap-1", historyTableCellNowrap)}>
      <Image
        src="/images/currency/try.svg"
        alt="TRY"
        width={16}
        height={16}
        className="size-4 shrink-0"
      />
      <span className="text-sm font-medium text-text-main">
        {amount.toLocaleString()}
      </span>
    </div>
  )
}

export function getOranPillClass(status: KuponStatus) {
  const base = cn(
    "inline-flex items-center rounded-[30px] px-2.5 py-0.5 text-sm font-medium",
    historyTableCellNowrap
  )
  if (status === "kaybetti") {
    return cn(base, "bg-semantic-error-bg text-semantic-error")
  }
  return cn(base, "bg-semantic-success-bg text-semantic-success")
}

export function StatCard({
  label,
  amount,
  sub,
  green,
  labelTone = "default",
  className,
}: {
  label: string
  amount: string
  sub?: string
  green?: boolean
  labelTone?: StatCardLabelTone
  className?: string
}) {
  return (
    <div
      className={cn(
        "min-w-[120px] rounded-md bg-background-elements px-4 py-5",
        className
      )}
    >
      <p className={cn("mb-1 text-xs", statCardLabelToneClass[labelTone])}>
        {label}
      </p>
      <p
        className={cn(
          "text-sm font-bold",
          green ? "text-[#9BBC14]" : "text-text-title"
        )}
      >
        {amount}
      </p>
      {sub && <p className="mt-0.5 text-[10px] text-text-subtext">{sub}</p>}
    </div>
  )
}

export function HistoryTableScroll({ children }: { children: React.ReactNode }) {
  return <div className={historyTableScrollWrap}>{children}</div>
}

export function HistoryTableEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center ">
      <div
        className="mb-5 flex size-20 items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #872aff 0%, #a350ff 40%, #5eb3ff 100%)",
        }}
      >
        <HugeiconsIcon
          icon={Folder02Icon}
          className="size-9 text-white"
          strokeWidth={1.5}
        />
      </div>
      <p className="text-base font-semibold text-text-title">Buralar boş</p>
      <p className="mt-1.5 text-sm text-text-subtext">{message}</p>
    </div>
  )
}

export function HistoryIdCell({
  id,
  ariaLabel = "Detaya git",
}: {
  id: string
  ariaLabel?: string
}) {
  return (
    <div className={sporTableLeftColId}>
      <a
        href="#"
        onClick={(e) => e.stopPropagation()}
        className="truncate font-mono text-xs text-text-subtext underline decoration-solid underline-offset-2 hover:text-text-main"
      >
        {id}
      </a>
      <button
        type="button"
        onClick={(e) => e.stopPropagation()}
        className="shrink-0 text-[#6781FF]"
        aria-label={ariaLabel}
      >
        <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-3.5" />
      </button>
    </div>
  )
}

export function SporKuponTableHead() {
  return (
    <thead>
      <tr>
        <th className="w-px whitespace-nowrap px-4 pb-2 align-bottom">
          <div className={sporTableLeftGroup}>
            <span
              className={cn(
                sporTableHeadLabel,
                "block min-w-[148px] text-left"
              )}
            >
              KUPON ID
            </span>
            <span
              className={cn(
                sporTableHeadLabel,
                "block min-w-[100px] text-left"
              )}
            >
              TYPE
            </span>
            <span className={sporTableHeadColDate}>TARİH</span>
          </div>
        </th>
        <th className="w-full px-4 pb-2 align-bottom">
          <div className={cn(sporTableRightGroup, "ml-auto justify-end")}>
            <span className={cn(sporTableHeadLabel, sporTableRightCol)}>
              BAHİS
            </span>
            <span className={cn(sporTableHeadLabel, sporTableRightCol)}>
              ORAN
            </span>
            <span className={cn(sporTableHeadLabel, sporTableRightCol)}>
              MAX KAZANÇ
            </span>
            <span className={cn(sporTableHeadLabel, sporTableRightCol)}>
              DURUM
            </span>
          </div>
        </th>
      </tr>
    </thead>
  )
}

export function SporKuponTableRow({
  kupon,
  onRowClick,
}: {
  kupon: SporKuponRow
  onRowClick: () => void
}) {
  return (
    <tr className={historyTableBodyRowClass} onClick={onRowClick}>
      <td className="w-px whitespace-nowrap px-4 py-3">
        <div className={sporTableLeftGroup}>
          <HistoryIdCell id={kupon.id} ariaLabel="Kupon detayına git" />
          <div className={sporTableLeftColType}>
            <KuponTypeCell t={kupon.type} />
          </div>
          <span className={sporTableLeftColDate}>{kupon.tarih}</span>
        </div>
      </td>
      <td className={cn("w-full px-4 py-3", historyTableCellNowrap)}>
        <div className={cn(sporTableRightGroup, "ml-auto justify-end")}>
          <div className={sporTableRightCol}>
            <Coin amount={kupon.bahis} />
          </div>
          <div className={sporTableRightCol}>
            <span className={getOranPillClass(kupon.status)}>x {kupon.oran}</span>
          </div>
          <div className={sporTableRightCol}>
            <Coin amount={kupon.maxKazanc} />
          </div>
          <div className={cn(sporTableRightCol, "flex justify-end")}>
            <KuponStatusBadge s={kupon.status} />
          </div>
        </div>
      </td>
    </tr>
  )
}
