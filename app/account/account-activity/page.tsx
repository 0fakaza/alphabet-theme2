"use client"

import { useMemo, useState, type ReactNode } from "react"
import Image from "next/image"
import { Activity01Icon, Folder02Icon, HugeiconsIcon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TabList } from "@/components/elements/tab-list"
import { DatePicker } from "@/components/elements/date-picker"
import {
  isTransactionInRange,
  type DateRangeValue,
} from "@/lib/date"
import { cn } from "@/lib/utils"

type ActivityTab = "spor" | "casino" | "hareketler"
type ActivityStatus = "active" | "past"
type BrowserKind = "chrome" | "safari" | "unknown"

type ActivityRow = {
  tab: ActivityTab
  id: string
  browser: BrowserKind
  bolge: string
  ip: string
  tarih: string
  status: ActivityStatus
}

const tabs = [
  { value: "spor", label: "Spor" },
  { value: "casino", label: "Casino" },
  { value: "hareketler", label: "Hesap Hareketleri" },
]

const rows: ActivityRow[] = [
  {
    tab: "hareketler",
    id: "Chrome",
    browser: "chrome",
    bolge: "CA, Toronto",
    ip: "192.241.525.15",
    tarih: "14.02.2025 14:30",
    status: "active",
  },
  {
    tab: "hareketler",
    id: "Safari",
    browser: "safari",
    bolge: "TR, Istanbul",
    ip: "192.241.525.15",
    tarih: "14.02.2025 14:30",
    status: "past",
  },
  {
    tab: "hareketler",
    id: "Bilinmiyor",
    browser: "unknown",
    bolge: "TR, Istanbul",
    ip: "192.241.525.15",
    tarih: "14.02.2025 14:30",
    status: "past",
  },
  {
    tab: "spor",
    id: "Chrome",
    browser: "chrome",
    bolge: "TR, Istanbul",
    ip: "192.241.525.15",
    tarih: "12.02.2025 11:20",
    status: "past",
  },
  {
    tab: "spor",
    id: "Safari",
    browser: "safari",
    bolge: "DE, Berlin",
    ip: "192.241.525.16",
    tarih: "14.02.2025 10:05",
    status: "active",
  },
  {
    tab: "casino",
    id: "Chrome",
    browser: "chrome",
    bolge: "CA, Toronto",
    ip: "192.241.525.17",
    tarih: "10.02.2025 18:45",
    status: "past",
  },
  {
    tab: "casino",
    id: "Bilinmiyor",
    browser: "unknown",
    bolge: "TR, Istanbul",
    ip: "192.241.525.18",
    tarih: "14.02.2025 22:10",
    status: "past",
  },
]

const defaultDateRange: DateRangeValue = {
  start: "2025-02-01",
  end: "2025-02-28",
}

const browserIcons: Record<BrowserKind, string> = {
  chrome: "/images/icons/browser-chrome.svg",
  safari: "/images/icons/browser-safari.svg",
  unknown: "/images/icons/browser-unknown.svg",
}

const tableClass = "w-full min-w-[900px] border-separate border-spacing-y-3"
const headCellClass =
  "px-3 pb-0 text-left text-xs font-medium text-text-subtext whitespace-nowrap"
const rowClass =
  "transition-colors [&>td]:h-16 [&>td]:bg-neutral-300 [&>td]:px-3 [&>td]:py-2 hover:[&>td]:bg-neutral-500 [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-lg"

function BrowserCell({ row }: { row: ActivityRow }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <Image
        src={browserIcons[row.browser]}
        alt=""
        width={24}
        height={24}
        className="size-6 shrink-0"
      />
      <span className="text-sm font-medium tracking-wide text-text-main">
        {row.id}
      </span>
    </div>
  )
}

function StatusBadge({ status }: { status: ActivityStatus }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide text-semantic-success">
        <span className="flex size-5 items-center justify-center rounded-[5px] border border-semantic-success text-[11px] leading-none">
          ✓
        </span>
        Etkin
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide text-white/30">
      <span className="flex size-5 items-center justify-center">
        <span className="size-1.5 rounded-full bg-white/30" />
      </span>
      Geçmiş
    </span>
  )
}

function ActivityEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center md:py-20">
      <div
        className="mb-5 flex size-20 items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #872aff 0%, #a350ff 45%, #7ab8ff 100%)",
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

function TableScroll({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
      {children}
    </div>
  )
}

function ActivityTable({ rows }: { rows: ActivityRow[] }) {
  if (rows.length === 0) {
    return <ActivityEmptyState message="Hareket bulunmuyor" />
  }

  return (
    <TableScroll>
      <table className={tableClass}>
        <colgroup>
          <col className="w-[28%]" />
          <col className="w-[28%]" />
          <col className="w-[180px]" />
          <col className="w-[180px]" />
          <col className="w-[128px]" />
        </colgroup>
        <thead>
          <tr>
            <th className={headCellClass}>ID</th>
            <th className={headCellClass}>Bölge</th>
            <th className={headCellClass}>IP</th>
            <th className={headCellClass}>TARİH</th>
            <th className={headCellClass} aria-label="Durum" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.tab}-${row.id}-${index}`} className={rowClass}>
              <td>
                <BrowserCell row={row} />
              </td>
              <td className="whitespace-nowrap text-sm font-medium tracking-wide text-text-subtext">
                {row.bolge}
              </td>
              <td className="whitespace-nowrap text-sm font-medium tracking-wide text-text-subtext">
                {row.ip}
              </td>
              <td className="whitespace-nowrap text-sm font-medium tracking-wide text-text-subtext">
                {row.tarih}
              </td>
              <td>
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableScroll>
  )
}

export default function HesapHareketlerimPage() {
  const [activeTab, setActiveTab] = useState<ActivityTab>("hareketler")
  const [dateRange, setDateRange] =
    useState<DateRangeValue>(defaultDateRange)

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) =>
          row.tab === activeTab && isTransactionInRange(row.tarih, dateRange)
      ),
    [activeTab, dateRange]
  )

  return (
    <AccountPageLayout title="Hesap Hareketlerim" icon={Activity01Icon}>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ActivityTab)}
      >
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <TabList tabs={tabs} />
          <DatePicker
            mode="range"
            value={dateRange}
            onChange={setDateRange}
            aria-label="Tarih aralığı"
            triggerClassName="h-12 w-full bg-background-elements/60 text-text-subtext md:w-[326px]"
            contentClassName="z-50"
          />
        </div>

        <TabsContent value="spor" className="mt-0">
          <ActivityTable rows={filteredRows} />
        </TabsContent>
        <TabsContent value="casino" className="mt-0">
          <ActivityTable rows={filteredRows} />
        </TabsContent>
        <TabsContent value="hareketler" className="mt-0">
          <ActivityTable rows={filteredRows} />
        </TabsContent>
      </Tabs>
    </AccountPageLayout>
  )
}
