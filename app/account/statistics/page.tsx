"use client"

import { useState } from "react"
import { HugeiconsIcon, Analytics01Icon, Exchange01Icon, MoneyAdd01Icon, MoneyRemove01Icon, BankIcon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TabList } from "@/components/elements/tab-list"

type TimeRange = "all" | "week" | "month" | "3month"

const timeRangeTabs = [
  { value: "all", label: "Tüm Zamanlar" },
  { value: "week", label: "Bu Hafta" },
  { value: "month", label: "Bu Ay" },
  { value: "3month", label: "3 Ay" },
]

const topGames = [
  { name: "Gates of Olympus", amount: 105120, max: 105120 },
  { name: "Sweet Bonanza 1000", amount: 105120, max: 105120 },
  { name: "Sugar Rush", amount: 101020, max: 105120 },
  { name: "Jaffa Game", amount: 105120, max: 105120 },
  { name: "Spell Binding Mystery", amount: 108170, max: 108170 },
  { name: "Barn Festival", amount: 106120, max: 108170 },
]

const inputCls =
  "rounded-xl border border-element-border bg-background-elements px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary"

function StatCards() {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="flex items-center gap-3 rounded-2xl bg-background-main p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15">
          <HugeiconsIcon icon={Exchange01Icon} className="size-5 text-blue-500" />
        </div>
        <div>
          <p className="text-xs text-text-subtext">Toplam Çeviri</p>
          <p className="text-base font-bold text-text-title">1252</p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-background-main p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
          <HugeiconsIcon icon={MoneyAdd01Icon} className="size-5 text-amber-500" />
        </div>
        <div>
          <p className="text-xs text-text-subtext">Toplam Yatırım</p>
          <div className="flex items-baseline gap-1">
            <p className="text-base font-bold text-text-title">26.125</p>
            <span className="text-xs text-amber-500">🪙</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-background-main p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
          <HugeiconsIcon icon={MoneyRemove01Icon} className="size-5 text-orange-500" />
        </div>
        <div>
          <p className="text-xs text-text-subtext">Olumsuz Bakiye</p>
          <div className="flex items-baseline gap-1">
            <p className="text-base font-bold text-text-title">162.520</p>
            <span className="text-xs text-orange-500">🪙</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-background-main p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-500/15">
          <HugeiconsIcon icon={BankIcon} className="size-5 text-green-500" />
        </div>
        <div>
          <p className="text-xs text-text-subtext">Net Kazanç</p>
          <div className="flex items-baseline gap-1">
            <p className="text-base font-bold text-text-title">28.520</p>
            <span className="text-xs text-green-500">🏅</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopGamesPanel() {
  return (
    <Tabs defaultValue="casino" className="rounded-2xl bg-background-main p-5">
      <div className="mb-5 flex items-center justify-between">
        <TabList
          tabs={[
            { value: "casino", label: "Casino" },
            { value: "live-casino", label: "Canlı Casino" },
            { value: "other", label: "Diğer" },
          ]}
        />
        <button className="text-sm text-primary hover:underline">Sıfırla</button>
      </div>

      {["casino", "live-casino", "other"].map((cat) => (
        <TabsContent key={cat} value={cat}>
          <h3 className="mb-4 text-sm font-semibold text-text-title">
            {cat === "casino" ? "Casino" : cat === "live-casino" ? "Canlı Casino" : "Diğer"} Net Kazanç&apos;ta TOP6
          </h3>
          <div className="flex flex-col gap-3">
            {topGames.map((game, i) => {
              const pct = (game.amount / topGames[0].amount) * 100
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-[140px] shrink-0 truncate text-xs text-text-subtext">{game.name}</span>
                  <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-background-elements">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-[70px] shrink-0 text-right text-xs font-medium text-text-main">
                    ${game.amount.toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default function IstatistiklerPage() {
  const [startDate, setStartDate] = useState("14/12/24")
  const [endDate, setEndDate] = useState("14/03/24")

  return (
    <AccountPageLayout title="İstatistikler" icon={Analytics01Icon}>
      <Tabs defaultValue="all">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <TabList tabs={timeRangeTabs} />
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputCls}
              placeholder="14/12/24"
            />
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={inputCls}
              placeholder="14/03/24"
            />
          </div>
        </div>

        {timeRangeTabs.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            <StatCards />
            <TopGamesPanel />
          </TabsContent>
        ))}
      </Tabs>
    </AccountPageLayout>
  )
}
