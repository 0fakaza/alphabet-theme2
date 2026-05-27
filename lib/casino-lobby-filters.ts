import type { Game } from "@/components/game-slider"

export type CasinoLobbyGame = Game & {
  id: string
  
  providerId: string
  
  categories: string[]
  
  featureTags: string[]
}

export type CasinoFilterSets = {
  search: string
  activeLobby: string
  featureIds: Set<string>
  providerIds: Set<string>
  
  favoriteIds: Set<string>
}

const ALL_GAMES_TABS = new Set(["lobby"])


export function filterCasinoLobbyGames(games: readonly CasinoLobbyGame[], s: CasinoFilterSets): CasinoLobbyGame[] {
  const q = s.search.trim().toLowerCase()
  return games.filter((g) => {
    if (q) {
      const inName = g.name.toLowerCase().includes(q)
      const inProv = g.provider.toLowerCase().includes(q)
      if (!inName && !inProv) return false
    }

    if (s.activeLobby === "favorites") {
      if (!s.favoriteIds.has(g.id)) return false
    } else if (ALL_GAMES_TABS.has(s.activeLobby)) {

    } else {
      if (!g.categories.includes(s.activeLobby)) return false
    }

    if (s.featureIds.size > 0) {
      const hasAny = g.featureTags.some((t) => s.featureIds.has(t))
      if (!hasAny) return false
    }

    if (s.providerIds.size > 0) {
      if (!s.providerIds.has(g.providerId)) return false
    }

    return true
  })
}

export function countForDraftFilters(
  games: readonly CasinoLobbyGame[],
  base: { search: string; activeLobby: string; favoriteIds: Set<string> },
  draftFeatureIds: Set<string>,
  draftProviderIds: Set<string>,
): number {
  return filterCasinoLobbyGames(games, {
    search: base.search,
    activeLobby: base.activeLobby,
    featureIds: draftFeatureIds,
    providerIds: draftProviderIds,
    favoriteIds: base.favoriteIds,
  }).length
}
