"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TabList } from "@/components/elements/tab-list"
import { DataTable, type Column } from "@/components/elements/data-table"
import { FilterSelect } from "@/components/elements/filter-select"
import type { IconSvgElement } from "@/lib/icons"
import {
  HugeiconsIcon,
  Cards02Icon,
  DiceIcon,
  CandyIcon,
  DiceFaces01Icon,
  Target01Icon,
  AircraftGameIcon,
  BlockGameIcon,
  SpadesIcon,
} from "@/lib/icons"

type Win = {
  game: string
  category: string
  user: string
  time: string
  bet: number
  odds: number
  win: number
}

const recentWins: Win[] = [
  { game: "Blackjack", category: "Canlı Oyunlar", user: "Demir22", time: "14:44:12", bet: 10000, odds: 3.25, win: 10000 },
  { game: "Gates of Olympus", category: "Slot", user: "Hakanyurt", time: "14:44:12", bet: 10000, odds: 3.25, win: 10000 },
  { game: "Sugar Rush", category: "Slot", user: "C******", time: "14:44:12", bet: 10000, odds: 3.25, win: 10000 },
  { game: "Keno", category: "Slot", user: "Tali7", time: "14:44:12", bet: 10000, odds: 3.25, win: 10000 },
  { game: "Million Roulette", category: "Canlı Oyunlar", user: "B*******", time: "14:44:12", bet: 10000, odds: 3.25, win: 10000 },
  { game: "Roulette", category: "Canlı Oyunlar", user: "M*******", time: "14:44:12", bet: 10000, odds: 3.25, win: 10000 },
]

const highestWins: Win[] = [
  { game: "Sweet Bonanza", category: "Slot", user: "Lucky99", time: "12:30:45", bet: 50000, odds: 12.5, win: 625000 },
  { game: "Blackjack VIP", category: "Canlı Oyunlar", user: "A*******", time: "11:22:08", bet: 100000, odds: 5.0, win: 500000 },
  { game: "Mega Roulette", category: "Canlı Oyunlar", user: "ProPlayer", time: "09:15:33", bet: 25000, odds: 18.0, win: 450000 },
  { game: "Gates of Olympus", category: "Slot", user: "Zeus42", time: "08:44:21", bet: 20000, odds: 15.75, win: 315000 },
  { game: "Crash", category: "Crash", user: "R*******", time: "07:55:10", bet: 30000, odds: 8.5, win: 255000 },
  { game: "Plinko", category: "Crash", user: "K*******", time: "06:30:00", bet: 15000, odds: 10.0, win: 150000 },
]

const formatNumber = (n: number) =>
  n.toLocaleString("tr-TR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })

const gameIcons: Record<string, IconSvgElement> = {
  Blackjack: Cards02Icon,
  "Gates of Olympus": DiceIcon,
  "Sugar Rush": CandyIcon,
  Keno: DiceFaces01Icon,
  "Million Roulette": Target01Icon,
  Roulette: Target01Icon,
  "Sweet Bonanza": CandyIcon,
  "Blackjack VIP": Cards02Icon,
  "Mega Roulette": Target01Icon,
  Crash: AircraftGameIcon,
  Plinko: BlockGameIcon,
}

const winsColumns: Column<Win>[] = [
  {
    key: "game",
    label: "Oyun",
    width: "42%",
    cellClassName: "pl-3",
    render: (row) => (
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={gameIcons[row.game] ?? SpadesIcon} className="size-5 shrink-0 text-icon" />
        <span className="text-xs text-text-subtitle">{row.game}</span>
      </div>
    ),
  },
  {
    key: "user",
    label: "Kullanıcı",
    width: "14%",
    hideOnMobile: true,
    render: (row) => <span className="text-xs text-text-subtitle">{row.user}</span>,
  },
  {
    key: "time",
    label: "Tarih",
    width: "11%",
    hideOnMobile: true,
    render: (row) => <span className="text-xs text-text-subtitle">{row.time}</span>,
  },
  {
    key: "bet",
    label: "Bahis",
    width: "11%",
    hideOnMobile: true,
    render: (row) => (
      <div className="flex items-center gap-1.5">
        <Image src="/images/currency/try.svg" alt="TRY" width={16} height={16} className="size-4 shrink-0" />
        <span className="text-xs text-text-subtitle">{formatNumber(row.bet)}</span>
      </div>
    ),
  },
  {
    key: "odds",
    label: "Oran",
    width: "10%",
    render: (row) => (
      <span className="inline-flex items-center justify-center rounded-full bg-neutral-400 px-2.5 py-1 text-xs text-text-subtitle">
        x {row.odds.toFixed(2)}
      </span>
    ),
  },
  {
    key: "win",
    label: "Kazanç",
    width: "12%",
    headerClassName: "pr-4",
    cellClassName: "pr-4",
    render: (row) => (
      <div className="flex items-center gap-1.5">
        <Image src="/images/currency/try.svg" alt="TRY" width={16} height={16} className="size-4 shrink-0" />
        <span className="text-xs font-medium" style={{ color: "#42BE49" }}>{formatNumber(row.win)}</span>
      </div>
    ),
  },
]

function WinsTableContent({ data, filter }: { data: Win[]; filter: string }) {
  const filtered = useMemo(
    () => (filter === "all" ? data : data.filter((w) => w.category === filter)),
    [data, filter],
  )

  return (
    <DataTable
      columns={winsColumns}
      data={filtered}
      emptyMessage="Bu kategoride kazanç bulunamadı."
    />
  )
}

const WinsTable = () => {
  const [filter, setFilter] = useState("all")

  return (
    <section className="w-full">
      <div className="container py-6">
        <div className="mb-4 flex items-center justify-between md:hidden">
          <h2 className="text-[18px] font-semibold text-text-title">Son Kazananlar</h2>
          <FilterSelect
            value={filter}
            onValueChange={setFilter}
            label="Gösterim"
            hideLabel
            options={[
              { value: "all", label: "Tümü" },
              { value: "Slot", label: "Slot" },
              { value: "Canlı Oyunlar", label: "Canlı Oyunlar" },
              { value: "Crash", label: "Crash" },
            ]}
            className="!h-[48px] w-[133px]"
          />
        </div>
        <Tabs defaultValue="recent">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <TabList
              tabs={[
                { value: "recent", label: "Son Kazananlar", icon: Cards02Icon },
                { value: "highest", label: "En Yüksek Kazanç", icon: Cards02Icon },
              ]}
            />

            <FilterSelect
              value={filter}
              onValueChange={setFilter}
              label="Gösterim"
              options={[
                { value: "all", label: "Tümü" },
                { value: "Slot", label: "Slot" },
                { value: "Canlı Oyunlar", label: "Canlı Oyunlar" },
                { value: "Crash", label: "Crash" },
              ]}
              className="!h-[48px] w-[246px] hidden md:flex"
            />
          </div>

          <TabsContent value="recent">
            <WinsTableContent data={recentWins} filter={filter} />
          </TabsContent>
          <TabsContent value="highest">
            <WinsTableContent data={highestWins} filter={filter} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default WinsTable
