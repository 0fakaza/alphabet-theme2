"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, StarIcon } from "@/lib/icons"
import { User03Icon } from "@hugeicons-pro/core-solid-rounded"
import type { CasinoLobbyGame } from "@/lib/casino-lobby-filters"

export function CasinoGameTile({
  game,
  favorited,
  onToggleFavorite,
}: {
  game: CasinoLobbyGame
  favorited: boolean
  onToggleFavorite: () => void
}) {
  return (
    <Link
      href={game.href ?? `/casino/${game.id}`}
      className="group mb-3 flex w-full min-w-0 flex-col"
    >
      <div className="relative aspect-[190/148] w-full overflow-hidden rounded-2xl">
        <Image
          src={game.image}
          alt={game.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 14vw"
          className="object-cover transition-all duration-300 ease-in-out [transition-property:transform,filter] group-hover:scale-105 group-hover:blur-[3px]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-black/0 transition-opacity duration-300 ease-in-out group-hover:bg-black/15"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-2">
          <span
            className="flex size-[52px] scale-90 items-center justify-center rounded-full bg-[#a78bfa] text-white opacity-0 shadow-md transition-all duration-300 ease-in-out [transition-property:transform,opacity] group-hover:scale-100 group-hover:opacity-100"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 size-6" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        {game.isNew && (
          <span className="absolute left-2 top-2 z-20 flex items-center gap-0.5 rounded bg-white px-1.5 py-1 shadow-sm">
            <Image src="/images/new-badge-icon.png" alt="" width={10} height={10} className="size-2.5" />
            <span className="text-[9px] font-medium tracking-wide text-[#ea762e]">Yeni</span>
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleFavorite()
          }}
          className={cn(
            "absolute right-2 top-2 z-20 cursor-pointer rounded-md bg-black/40 p-1 transition-all duration-300 ease-in-out",
            "opacity-0 group-hover:opacity-100 hover:bg-black/60",
            "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary/60",
            favorited && "opacity-100",
          )}
          aria-label={favorited ? "Favorilerden çıkar" : "Favorilere ekle"}
        >
          <HugeiconsIcon
            icon={StarIcon}
            className={cn("size-4 text-white", favorited && "text-primary")}
            fill={favorited ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div className="mt-2.5 flex w-full min-w-0 items-start justify-between gap-2 px-0.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-left text-sm font-medium leading-tight text-main">{game.name}</p>
          <p className="mt-0.5 truncate text-left text-xs leading-tight text-text-subtext">{game.provider}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 pt-0.5">
          <HugeiconsIcon icon={User03Icon} className="size-3.5 text-green-400" />
          <span className="text-sm font-medium tabular-nums text-white">{game.players}</span>
        </div>
      </div>
    </Link>
  )
}

const TILE_GRID_LAYOUT = {
  lobby:
    "grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7",
  modal:
    "grid max-w-[658px] grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 sm:gap-3",
} as const

export type CasinoGameTileGridLayout = keyof typeof TILE_GRID_LAYOUT

export function CasinoGameTileGrid({
  games,
  favoriteIds,
  onToggleFavorite,
  layout,
  className,
}: {
  games: readonly CasinoLobbyGame[]
  favoriteIds: ReadonlySet<string>
  onToggleFavorite: (gameId: string) => void
  layout: CasinoGameTileGridLayout
  className?: string
}) {
  return (
    <div className={cn(TILE_GRID_LAYOUT[layout], className)}>
      {games.map((game) => (
        <CasinoGameTile
          key={game.id}
          game={game}
          favorited={favoriteIds.has(game.id)}
          onToggleFavorite={() => onToggleFavorite(game.id)}
        />
      ))}
    </div>
  )
}
