import { CASINO_LOBBY_CATALOG } from "@/data/casino-lobby-catalog"
import { casinoProviderRows } from "@/data/casino-providers"
import type { CasinoLobbyGame } from "@/lib/casino-lobby-filters"

export type GameDetailStats = {
  rtp: string
  paylines: string
  minMaxBet: string
  hitRate: string
  risk: string
}

export type TopRecordUserBadge = "crown" | "shield" | "default"

export type GameTopRecord = {
  user: string
  badge: TopRecordUserBadge
  bet: string
  multiplier: string
  payout: string
}

const DEFAULT_STATS: GameDetailStats = {
  rtp: "%96,2",
  paylines: "20",
  minMaxBet: "0.2 / 200",
  hitRate: "%45",
  risk: "Yüksek Risk",
}

const DEMO_TOP: readonly GameTopRecord[] = [
  { user: "Gizli üye", badge: "shield", bet: "10.000", multiplier: "x 3,25", payout: "10.000" },
  { user: "Fatihyurdakul", badge: "crown", bet: "10.000", multiplier: "x 3,25", payout: "10.000" },
  { user: "Gizliuye", badge: "default", bet: "10.000", multiplier: "x 3,25", payout: "10.000" },
] as const

function seoParagraph(gameName: string, providerName: string): string {
  return `En hızlı büyüyen kripto casino olan Alphabe, ${gameName} oynayın! 6.300+ heyecan verici oyundan oluşan ve içeriği giderek büyüyen bir kütüphanenin keyfini çıkarın. ${providerName} tarafından geliştirilen ${gameName} gibi oyunlar da buna dâhildir. Bitcoin, Ethereum ve diğer kripto para birimleriyle her türden slot oyununu oynayın veya eğlence modunda ${gameName} oyununu en büyük online oyun topluluğuyla birlikte ücretsiz deneyin. Eğlenceye katılın!`
}

export function getCasinoGameById(id: string): CasinoLobbyGame | undefined {
  return CASINO_LOBBY_CATALOG.find((g) => g.id === id)
}

export function getProviderLogoForGame(providerId: string): string {
  return casinoProviderRows.find((p) => p.id === providerId)?.logo ?? "/images/providers/pp.svg"
}

export function getProviderDisplayNameForGame(providerId: string, fallback: string): string {
  return casinoProviderRows.find((p) => p.id === providerId)?.name ?? fallback
}

export function getGameDetailDefaults(game: CasinoLobbyGame) {
  const pName = getProviderDisplayNameForGame(game.providerId, game.provider)
  return {
    stats: DEFAULT_STATS,
    topRecords: DEMO_TOP,
    onlinePlayerCount: 751,
    seoBlocks: [seoParagraph(game.name, pName), seoParagraph(game.name, pName)] as const,
  }
}
