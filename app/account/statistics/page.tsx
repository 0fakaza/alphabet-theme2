"use client"

import { useCallback, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import {
  HugeiconsIcon,
  Analytics01Icon,
  Exchange01Icon,
  MoneyAdd01Icon,
  MoneyBag01Icon,
  BankIcon,
  type IconSvgElement,
} from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { CurrencyBadge } from "@/components/elements/currency-badge"
import { Tabs } from "@/components/ui/tabs"
import { TabList } from "@/components/elements/tab-list"
import {
  aggregateStatistics,
  formatGameAmount,
  formatMoneyDisplay,
  formatStatNumber,
  getPresetDateRange,
  statisticsDailyEntries,
  statisticsPresets,
  type CategoryKey,
  type GameStat,
  type StatSummary,
  type StatisticsBundle,
  type TimeRangeKey,
} from "@/data/statistics"
import { toDateInputValue } from "@/lib/date"
import { DatePicker } from "@/components/elements/date-picker"

const timeRangeTabs = [
  { value: "all", label: "Tüm Zamanlar" },
  { value: "week", label: "Bu Hafta" },
  { value: "month", label: "Bu Ay" },
  { value: "3month", label: "3 Ay" },
]

const categoryTabs = [
  { value: "casino", label: "Casino" },
  { value: "live-casino", label: "Canlı Casino" },
  { value: "other", label: "Diğer" },
]

const categoryTitles: Record<CategoryKey, string> = {
  casino: "Casino Net Kazanç'ta TOP6",
  "live-casino": "Canlı Casino Net Kazanç'ta TOP6",
  other: "Diğer Net Kazanç'ta TOP6",
}

function SummaryStatCard({
  icon,
  label,
  value,
  showCurrency,
  negative,
}: {
  icon: IconSvgElement
  label: string
  value: string
  showCurrency?: boolean
  negative?: boolean
}) {
  return (
    <div className="flex min-h-[87px] items-center gap-3 rounded-xl bg-background-main px-6 py-5">
      <HugeiconsIcon icon={icon} className="size-8 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-xs leading-4 text-text-subtext">{label}</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <p
            className={cn(
              "text-lg leading-5",
              negative ? "font-bold text-semantic-error" : "text-text-main"
            )}
          >
            {value}
          </p>
          {showCurrency && <CurrencyBadge currency="TRY" />}
        </div>
      </div>
    </div>
  )
}

function StatCards({ stats }: { stats: StatSummary }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-[19px] lg:grid-cols-4">
      <SummaryStatCard
        icon={Exchange01Icon}
        label="Toplam Çevrim"
        value={formatStatNumber(stats.turnover)}
      />
      <SummaryStatCard
        icon={MoneyAdd01Icon}
        label="Toplam Yatırım"
        value={formatStatNumber(stats.deposit)}
        showCurrency
      />
      <SummaryStatCard
        icon={MoneyBag01Icon}
        label="Oynanan Bahis"
        value={formatStatNumber(stats.betsPlayed)}
        showCurrency
      />
      <SummaryStatCard
        icon={BankIcon}
        label="Net Kazanç"
        value={formatMoneyDisplay(stats.netProfit)}
        showCurrency
        negative={stats.netProfit < 0}
      />
    </div>
  )
}

function TopGamesList({ games }: { games: GameStat[] }) {
  const maxAmount = Math.max(...games.map((g) => g.amount), 1)

  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-background-elements py-12 text-sm text-text-subtext">
        Seçilen tarih aralığında oyun verisi bulunamadı.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5 pr-13">
      {games.map((game, i) => (
        <div
          key={`${game.name}-${i}`}
          className={cn(
            "flex items-center gap-3 rounded-lg p-2 px-0 md:px-2",
            game.highlight && "bg-action-secondary-alpha"
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="w-[140px] shrink-0 truncate text-xs font-medium text-text-main md:w-[170px]">
              {game.name}
            </span>
            <div className="h-[12px] md:h-[18px] relative min-w-0 flex-1">
              <div
                className="absolute inset-y-0 left-0 rounded-md bg-action-secondary-default"
                style={{ width: `${(game.amount / maxAmount) * 100}%` }}
              />
              <span
                className="absolute top-1/2 shrink-0 translate-x-[10px] -translate-y-1/2 text-xs font-medium text-text-main"
                style={{ left: `${(game.amount / maxAmount) * 100}%` }}
              >
                ₺{formatGameAmount(game.amount)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("all")
  const [category, setCategory] = useState<CategoryKey>("casino")
  const [useCustomRange, setUseCustomRange] = useState(false)

  const initialRange = getPresetDateRange("all")
  const [startDate, setStartDate] = useState(initialRange.start)
  const [endDate, setEndDate] = useState(initialRange.end)

  const startInput = toDateInputValue(startDate)
  const endInput = toDateInputValue(endDate)

  const handleTimeRangeChange = useCallback((value: string) => {
    const key = value as TimeRangeKey
    setTimeRange(key)
    setUseCustomRange(false)
    const { start, end } = getPresetDateRange(key)
    setStartDate(start)
    setEndDate(end)
  }, [])

  const handleStartChange = useCallback(
    (iso: string) => {
      const [y, m, d] = iso.split("-").map(Number)
      if (!y || !m || !d) return
      const parsed = new Date(y, m - 1, d)
      setUseCustomRange(true)
      setStartDate(parsed)
      if (parsed > endDate) setEndDate(parsed)
    },
    [endDate]
  )

  const handleEndChange = useCallback(
    (iso: string) => {
      const [y, m, d] = iso.split("-").map(Number)
      if (!y || !m || !d) return
      const parsed = new Date(y, m - 1, d)
      setUseCustomRange(true)
      setEndDate(parsed)
      if (parsed < startDate) setStartDate(parsed)
    },
    [startDate]
  )

  const handleReset = useCallback(() => {
    setTimeRange("all")
    setUseCustomRange(false)
    setCategory("casino")
    const { start, end } = getPresetDateRange("all")
    setStartDate(start)
    setEndDate(end)
  }, [])

  const filteredData: StatisticsBundle = useMemo(() => {
    if (!useCustomRange) {
      return statisticsPresets[timeRange][category]
    }
    const start = startDate <= endDate ? startDate : endDate
    const end = startDate <= endDate ? endDate : startDate
    return aggregateStatistics(statisticsDailyEntries, start, end, category)
  }, [useCustomRange, timeRange, category, startDate, endDate])

  const isCustomEmpty =
    useCustomRange &&
    filteredData.stats.turnover === 0 &&
    filteredData.games.length === 0

  return (
    <AccountPageLayout title="İstatistikler" icon={Analytics01Icon}>
      <Tabs value={timeRange} onValueChange={handleTimeRangeChange}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <TabList tabs={timeRangeTabs} />
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <DatePicker
              aria-label="Başlangıç tarihi"
              value={startInput}
              max={endInput}
              onChange={handleStartChange}
              triggerClassName="sm:w-[161px]"
              className="flex-1 md:flex-auto"
            />
            <DatePicker
              aria-label="Bitiş tarihi"
              value={endInput}
              min={startInput}
              onChange={handleEndChange}
              triggerClassName="sm:w-[161px]"
              className="flex-1 md:flex-auto"
            />
          </div>
        </div>
      </Tabs>

      {useCustomRange && (
        <p className="mb-3 text-xs text-text-subtext">
          Özel tarih aralığı: {startInput.split("-").reverse().join("/")} –{" "}
          {endInput.split("-").reverse().join("/")}
        </p>
      )}

      <StatCards stats={filteredData.stats} />

      <Tabs
        value={category}
        onValueChange={(v) => setCategory(v as CategoryKey)}
      >
        <div className="rounded-xl bg-background-main p-5 px-4 md:px-5">
          <TabList tabs={categoryTabs} />

          <div className="mt-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-base font-bold tracking-wide text-text-main">
                {categoryTitles[category]}
              </h3>
              <button
                type="button"
                onClick={handleReset}
                className="shrink-0 text-[13px] font-semibold text-text-subtext underline decoration-solid underline-offset-2"
              >
                Sıfırla
              </button>
            </div>

            <div className="mb-5 h-px bg-element-border" />

            {isCustomEmpty ? (
              <div className="flex items-center justify-center rounded-lg bg-background-elements py-12 text-sm text-text-subtext">
                Bu tarih aralığında istatistik bulunamadı.
              </div>
            ) : (
              <TopGamesList games={filteredData.games} />
            )}
          </div>
        </div>
      </Tabs>
    </AccountPageLayout>
  )
}
