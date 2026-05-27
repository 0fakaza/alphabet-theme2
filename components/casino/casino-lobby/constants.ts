import {
  Cards01Icon,
  GiftIcon,
  SparklesIcon,
} from "@/lib/icons"
import {
  Cards01Icon as NavCards01Icon,
  Cards02Icon,
  CherryIcon,
  Home04Icon,
  PoolTableIcon,
  StarIcon as NavStarIcon,
  Target01Icon,
  UserFullViewIcon,
} from "@hugeicons-pro/core-solid-rounded"
import type { FeatureFilterDef } from "@/components/casino/casino-filter-modal"

export const lobbyFilterTabs = [
  { id: "lobby", label: "Lobby", icon: Home04Icon },
  { id: "favorites", label: "Favoriler(12)", icon: NavStarIcon },
  { id: "slots", label: "Slotlar", icon: CherryIcon },
  { id: "live", label: "Canlı Krupiye", icon: UserFullViewIcon },
  { id: "poker", label: "Poker", icon: NavCards01Icon },
  { id: "baccarat", label: "Baccarat", icon: PoolTableIcon },
  { id: "blackjack", label: "Blackjack", icon: Cards02Icon },
  { id: "roulette", label: "Rulet", icon: Target01Icon },
] as const

export const CASINO_PROVIDERS_PAGE_HREF = "/casino/providers" as const

export const casinoFeatureFilters: FeatureFilterDef[] = [
  { id: "rtp", label: "Yüksek RTP", icon: SparklesIcon },
  { id: "bonus", label: "Bonus Turlar", icon: GiftIcon },
  { id: "buy", label: "Buy Bonus", icon: SparklesIcon },
  { id: "feature", label: "Özellik satın alma", icon: Cards01Icon },
  { id: "high", label: "Yüksek Oynayanlar", icon: Cards01Icon },
  { id: "new", label: "Yeni", icon: NavCards01Icon },
  { id: "trending", label: "Çok Konuşulanlar", fullWidth: true, icon: SparklesIcon },
]

export const TOOLBAR_QUICK_IDS = ["rtp", "buy", "new", "high", "feature"] as const

export const toolbarQuickChips = TOOLBAR_QUICK_IDS.map((id) => {
  const f = casinoFeatureFilters.find((x) => x.id === id)
  if (!f) {
    throw new Error(`Unknown feature id: ${id}`)
  }
  const label = id === "feature" ? "Özellik Satın alma" : f.label
  return { id: f.id, label, icon: f.icon }
})

export const PROVIDER_CATEGORY_TABS = [
  { id: "all" as const, label: "Tümü" },
  { id: "slot" as const, label: "Slot" },
  { id: "live" as const, label: "Canlı Casino" },
  { id: "crash" as const, label: "Crash" },
] as const

export type ProviderCategoryId = (typeof PROVIDER_CATEGORY_TABS)[number]["id"]

export const RIGHT_PROMO_BACK_IMAGE = "/images/jackpot-back.jpg"

export const JACKPOT_MONEY_BADGE = "/images/jackpot-money-back.svg"

export const rightPromoSlides = [
  { id: "r1", game: "FRUIT PARTY", subtitle: "Jackpot Ödülü", amount: "₺1.415.210,00", mult: "24.520X" },
  { id: "r2", game: "GATES OF OLYMPUS", subtitle: "Mega ödül", amount: "₺892.400,00", mult: "18.200X" },
  { id: "r3", game: "SWEET BONANZA", subtitle: "Jackpot Ödülü", amount: "₺2.100.000,00", mult: "32.100X" },
] as const

export const LOBBY_SECTION_TITLES: Record<string, string> = {
  lobby: "Tüm oyunlar",
  favorites: "Favori oyunlarınız",
  slots: "Pragmatic Play Oyunları",
  live: "Canlı casino",
  poker: "Poker",
  baccarat: "Baccarat",
  blackjack: "Blackjack",
  roulette: "Rulet",
}
