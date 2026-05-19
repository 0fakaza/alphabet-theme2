import { CASINO_LOBBY_CATALOG } from "@/data/casino-lobby-catalog"
import { HOME_POPULAR_SLOTS } from "@/data/home-popular-slots"
import type { CasinoLobbyGame } from "@/lib/casino-lobby-filters"

function nameSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
}

/**
 * Recently played: popular slot images from the home page; catalog matches by game name
 * go via `/casino/{id}`, others use `href` (slot).
 */
export function getRecentlyPlayedGames(excludeGameId: string): CasinoLobbyGame[] {
  const byName = new Map(CASINO_LOBBY_CATALOG.map((g) => [g.name, g] as const))
  const out: CasinoLobbyGame[] = []

  for (const row of HOME_POPULAR_SLOTS) {
    const fromCatalog = byName.get(row.name)
    if (fromCatalog) {
      if (fromCatalog.id === excludeGameId) continue
      out.push({
        ...fromCatalog,
        image: row.image,
        players: row.players,
        isNew: row.isNew ?? fromCatalog.isNew,
      })
      continue
    }
    const id = `home-${nameSlug(row.name)}`
    if (id === excludeGameId) continue
    out.push({
      id,
      name: row.name,
      provider: row.provider,
      image: row.image,
      players: row.players,
      isNew: row.isNew,
      providerId: "pp",
      categories: ["slots"],
      featureTags: [],
      href: `/slot/${nameSlug(row.name)}`,
    })
  }

  return out
}
