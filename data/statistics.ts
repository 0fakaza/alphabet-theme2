export type TimeRangeKey = "all" | "week" | "month" | "3month"
export type CategoryKey = "casino" | "live-casino" | "other"

export type StatSummary = {
  turnover: number
  deposit: number
  betsPlayed: number
  netProfit: number
}

export type GameStat = {
  name: string
  amount: number
  highlight?: boolean
}

export type StatisticsBundle = {
  stats: StatSummary
  games: GameStat[]
}

export const statisticsPresets: Record<
  TimeRangeKey,
  Record<CategoryKey, StatisticsBundle>
> = {
  all: {
    casino: {
      stats: { turnover: 1252, deposit: 26125, betsPlayed: 162520, netProfit: -26520 },
      games: [
        { name: "Gates of Olympus", amount: 106120 },
        { name: "Sweet Bonanza 1000", amount: 106120 },
        { name: "Sugar Rush", amount: 106120, highlight: true },
        { name: "Jeffs Gems", amount: 106120 },
        { name: "Spell Binding Mystrey", amount: 106120 },
        { name: "Barn Festival", amount: 106120 },
      ],
    },
    "live-casino": {
      stats: { turnover: 980, deposit: 18400, betsPlayed: 124300, netProfit: -15200 },
      games: [
        { name: "Crazy Time", amount: 88200 },
        { name: "Lightning Roulette", amount: 76500 },
        { name: "Monopoly Live", amount: 61200, highlight: true },
        { name: "Blackjack VIP", amount: 45800 },
        { name: "Dream Catcher", amount: 32100 },
        { name: "Baccarat Squeeze", amount: 18900 },
      ],
    },
    other: {
      stats: { turnover: 420, deposit: 9200, betsPlayed: 45200, netProfit: 8400 },
      games: [
        { name: "Aviator", amount: 52400 },
        { name: "Spaceman", amount: 48100 },
        { name: "Plinko", amount: 39200, highlight: true },
        { name: "Mines", amount: 28500 },
        { name: "Dice", amount: 19800 },
        { name: "Keno", amount: 11200 },
      ],
    },
  },
  week: {
    casino: {
      stats: { turnover: 312, deposit: 6800, betsPlayed: 42100, netProfit: -6200 },
      games: [
        { name: "Gates of Olympus", amount: 28400 },
        { name: "Sweet Bonanza 1000", amount: 24100 },
        { name: "Sugar Rush", amount: 19800, highlight: true },
        { name: "Jeffs Gems", amount: 15200 },
        { name: "Spell Binding Mystrey", amount: 9800 },
        { name: "Barn Festival", amount: 4200 },
      ],
    },
    "live-casino": {
      stats: { turnover: 245, deposit: 5100, betsPlayed: 31800, netProfit: -4100 },
      games: [
        { name: "Crazy Time", amount: 22100 },
        { name: "Lightning Roulette", amount: 19400 },
        { name: "Monopoly Live", amount: 16800, highlight: true },
        { name: "Blackjack VIP", amount: 11200 },
        { name: "Dream Catcher", amount: 7400 },
        { name: "Baccarat Squeeze", amount: 3900 },
      ],
    },
    other: {
      stats: { turnover: 98, deposit: 2400, betsPlayed: 11200, netProfit: 2100 },
      games: [
        { name: "Aviator", amount: 14200 },
        { name: "Spaceman", amount: 11800 },
        { name: "Plinko", amount: 9600, highlight: true },
        { name: "Mines", amount: 6200 },
        { name: "Dice", amount: 4100 },
        { name: "Keno", amount: 2800 },
      ],
    },
  },
  month: {
    casino: {
      stats: { turnover: 890, deposit: 19200, betsPlayed: 118400, netProfit: -18400 },
      games: [
        { name: "Gates of Olympus", amount: 72400 },
        { name: "Sweet Bonanza 1000", amount: 68100 },
        { name: "Sugar Rush", amount: 55200, highlight: true },
        { name: "Jeffs Gems", amount: 41800 },
        { name: "Spell Binding Mystrey", amount: 28400 },
        { name: "Barn Festival", amount: 12100 },
      ],
    },
    "live-casino": {
      stats: { turnover: 640, deposit: 12400, betsPlayed: 86200, netProfit: -9800 },
      games: [
        { name: "Crazy Time", amount: 59800 },
        { name: "Lightning Roulette", amount: 51200 },
        { name: "Monopoly Live", amount: 44600, highlight: true },
        { name: "Blackjack VIP", amount: 32100 },
        { name: "Dream Catcher", amount: 19800 },
        { name: "Baccarat Squeeze", amount: 11200 },
      ],
    },
    other: {
      stats: { turnover: 280, deposit: 6800, betsPlayed: 32400, netProfit: 5200 },
      games: [
        { name: "Aviator", amount: 38200 },
        { name: "Spaceman", amount: 34100 },
        { name: "Plinko", amount: 29800, highlight: true },
        { name: "Mines", amount: 21400 },
        { name: "Dice", amount: 14200 },
        { name: "Keno", amount: 8600 },
      ],
    },
  },
  "3month": {
    casino: {
      stats: { turnover: 1180, deposit: 24800, betsPlayed: 148200, netProfit: -22100 },
      games: [
        { name: "Gates of Olympus", amount: 98200 },
        { name: "Sweet Bonanza 1000", amount: 91400 },
        { name: "Sugar Rush", amount: 76800, highlight: true },
        { name: "Jeffs Gems", amount: 59200 },
        { name: "Spell Binding Mystrey", amount: 38400 },
        { name: "Barn Festival", amount: 16800 },
      ],
    },
    "live-casino": {
      stats: { turnover: 920, deposit: 16800, betsPlayed: 112600, netProfit: -12800 },
      games: [
        { name: "Crazy Time", amount: 82400 },
        { name: "Lightning Roulette", amount: 71200 },
        { name: "Monopoly Live", amount: 58400, highlight: true },
        { name: "Blackjack VIP", amount: 42800 },
        { name: "Dream Catcher", amount: 28600 },
        { name: "Baccarat Squeeze", amount: 14200 },
      ],
    },
    other: {
      stats: { turnover: 380, deposit: 8600, betsPlayed: 41800, netProfit: 6900 },
      games: [
        { name: "Aviator", amount: 46800 },
        { name: "Spaceman", amount: 41200 },
        { name: "Plinko", amount: 35600, highlight: true },
        { name: "Mines", amount: 24800 },
        { name: "Dice", amount: 17200 },
        { name: "Keno", amount: 9800 },
      ],
    },
  },
}

type DailyEntry = {
  date: string
  category: CategoryKey
  stats: StatSummary
  games: GameStat[]
}


export const statisticsDailyEntries: DailyEntry[] = (() => {
  const entries: DailyEntry[] = []
  const categories: CategoryKey[] = ["casino", "live-casino", "other"]
  const base = new Date(2024, 11, 1)
  const presets = statisticsPresets.month

  for (let i = 0; i < 120; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const iso = d.toISOString().slice(0, 10)
    const factor = 0.4 + (i % 7) * 0.12

    for (const category of categories) {
      const p = presets[category]
      entries.push({
        date: iso,
        category,
        stats: {
          turnover: Math.round(p.stats.turnover * factor * 0.08),
          deposit: Math.round(p.stats.deposit * factor * 0.06),
          betsPlayed: Math.round(p.stats.betsPlayed * factor * 0.05),
          netProfit: Math.round(p.stats.netProfit * factor * 0.05),
        },
        games: p.games.map((g, idx) => ({
          name: g.name,
          amount: Math.round(g.amount * factor * (0.04 + idx * 0.008)),
          highlight: g.highlight,
        })),
      })
    }
  }
  return entries
})()

export function getPresetDateRange(key: TimeRangeKey, ref = new Date()): {
  start: Date
  end: Date
} {
  const end = new Date(ref)
  end.setHours(23, 59, 59, 999)
  const start = new Date(ref)
  start.setHours(0, 0, 0, 0)

  switch (key) {
    case "week":
      start.setDate(start.getDate() - 6)
      break
    case "month":
      start.setMonth(start.getMonth() - 1)
      start.setDate(start.getDate() + 1)
      break
    case "3month":
      start.setMonth(start.getMonth() - 3)
      start.setDate(start.getDate() + 1)
      break
    case "all":
      start.setFullYear(2024, 0, 1)
      break
  }
  return { start, end }
}

export function aggregateStatistics(
  entries: DailyEntry[],
  start: Date,
  end: Date,
  category: CategoryKey
): StatisticsBundle {
  const startMs = startOfDay(start).getTime()
  const endMs = endOfDay(end).getTime()

  const filtered = entries.filter(
    (e) =>
      e.category === category &&
      new Date(e.date).getTime() >= startMs &&
      new Date(e.date).getTime() <= endMs
  )

  if (filtered.length === 0) {
    return {
      stats: { turnover: 0, deposit: 0, betsPlayed: 0, netProfit: 0 },
      games: [],
    }
  }

  const stats = filtered.reduce<StatSummary>(
    (acc, e) => ({
      turnover: acc.turnover + e.stats.turnover,
      deposit: acc.deposit + e.stats.deposit,
      betsPlayed: acc.betsPlayed + e.stats.betsPlayed,
      netProfit: acc.netProfit + e.stats.netProfit,
    }),
    { turnover: 0, deposit: 0, betsPlayed: 0, netProfit: 0 }
  )

  const gameMap = new Map<string, number>()
  for (const entry of filtered) {
    for (const g of entry.games) {
      gameMap.set(g.name, (gameMap.get(g.name) ?? 0) + g.amount)
    }
  }

  const games = [...gameMap.entries()]
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6)
    .map((g, i) => ({ ...g, highlight: i === 2 }))

  return { stats, games }
}

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function endOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(23, 59, 59, 999)
  return x
}

export function formatStatNumber(n: number, decimals = 0): string {
  return n.toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatMoneyDisplay(n: number): string {
  const abs = Math.abs(n)
  const formatted = abs.toLocaleString("tr-TR", { maximumFractionDigits: 0 })
  return n < 0 ? `-${formatted}` : formatted
}

export function formatGameAmount(n: number): string {
  return n.toLocaleString("tr-TR", { maximumFractionDigits: 0 })
}

export { parseDateInputValue, toDateInputValue } from "@/lib/date"
