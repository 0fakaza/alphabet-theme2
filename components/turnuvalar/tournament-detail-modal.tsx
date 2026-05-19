"use client"

import { useEffect, useId, useState } from "react"
import Image from "next/image"
import { createPortal } from "react-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CasinoGameTileGrid } from "@/components/casino/casino-game-tile"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, Cancel01Icon, Search01Icon } from "@/lib/icons"
import {
  getTournamentDetail,
  type LeaderboardRow,
  type Tournament,
  type TournamentState,
} from "@/data/turnuvalar"

const MODAL_TABS = [
  { value: "description", label: "Açıklama" },
  { value: "games", label: "Geçerli Oyunlar" },
  { value: "leaderboard", label: "Mevcut Sıralama" },
] as const

const pillTabTriggerClass =
  "h-9 shrink-0 rounded-full border-0 bg-transparent px-3 text-xs text-text-subtitle shadow-none ring-0 transition-colors hover:text-text-main data-[state=active]:border-0 data-[state=active]:bg-background-elements data-[state=active]:text-text-main data-[state=active]:shadow-none"

function ModalStatusChip({ state }: { state: TournamentState }) {
  if (state === "ongoing") {
    return (
      <div className="flex w-fit items-center rounded-[44px] bg-[#605329] px-3 py-1">
        <span className="text-sm font-medium tracking-wide text-[#eddaa6]">Devam ediyor</span>
      </div>
    )
  }
  if (state === "planned") {
    return (
      <div className="flex w-fit items-center rounded-[47px] bg-[#2e581a] px-3 py-1">
        <span className="text-sm font-medium tracking-wide text-[#a5e680]">Planlanmış</span>
      </div>
    )
  }
  return (
    <div className="flex w-fit items-center rounded-[34px] bg-[#973637] px-3 py-1">
      <span className="text-sm font-medium tracking-wide text-[#f0c2c2]">Tamamlandı</span>
    </div>
  )
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-amber-300 to-amber-700 text-[11px] font-bold text-white shadow-sm">
        {rank}
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-slate-200 to-slate-500 text-[11px] font-bold text-white shadow-sm">
        {rank}
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-amber-700 to-amber-950 text-[11px] font-bold text-amber-100 shadow-sm">
        {rank}
      </div>
    )
  }
  return (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#575a6c] text-[11px] font-bold text-[#c4c6d0]">
      {rank}
    </div>
  )
}

function LeaderboardTable({ rows }: { rows: LeaderboardRow[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <div className="flex min-w-[320px] items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="px-3 py-2">
            <span className="text-[10px] font-medium text-text-subtitle">KULLANICI</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.rank}
              className="flex h-16 items-center border-b border-divider-100 px-3 py-2 last:border-b-0"
            >
              <div className="flex min-w-0 items-center gap-1.5">
                <RankBadge rank={row.rank} />
                <span
                  className={cn(
                    "truncate text-sm font-medium tracking-wide text-text-main",
                  )}
                >
                  {row.user}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-[72px] shrink-0 flex-col">
          <div className="px-3 py-2">
            <span className="text-[10px] font-medium text-text-subtitle">PUAN</span>
          </div>
          {rows.map((row) => (
            <div
              key={`p-${row.rank}`}
              className="flex h-16 items-center border-b border-divider-100 px-3 py-2 last:border-b-0"
            >
              <span
                className={cn(
                  "whitespace-nowrap text-sm font-medium tracking-wide text-text-subtext",
                )}
              >
                {row.points}
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-[120px] shrink-0 flex-col">
          <div className="px-3 py-2">
            <span className="text-[10px] font-medium text-text-subtitle">ÖDÜL</span>
          </div>
          {rows.map((row) => (
            <div
              key={`r-${row.rank}`}
              className="flex h-16 items-center gap-2 border-b border-divider-100 px-3 py-2 last:border-b-0"
            >
              <Image src="/images/currency/try.svg" alt="" width={20} height={20} className="size-5 shrink-0" />
              <span
                className={cn(
                  "truncate text-sm font-medium tracking-wide text-text-subtext",
                )}
              >
                {row.reward}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type TournamentDetailModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  tournament: Tournament | null
}

export function TournamentDetailModal({ open, onOpenChange, tournament }: TournamentDetailModalProps) {
  const [mounted, setMounted] = useState(false)
  const [detailTab, setDetailTab] = useState<string>("description")
  const [gameQuery, setGameQuery] = useState("")
  const [tileFavorites, setTileFavorites] = useState<Set<string>>(() => new Set())
  const titleId = useId()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (open) setDetailTab("description")
  }, [open, tournament?.id])

  useEffect(() => {
    if (!open) {
      setGameQuery("")
      setTileFavorites(new Set())
    }
  }, [open])

  useEffect(() => {
    if (typeof document === "undefined") return
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(min-width: 1024px)")
    const sync = () => {
      if (mq.matches && detailTab === "leaderboard") setDetailTab("description")
    }
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [detailTab])

  if (!mounted || !open || !tournament) return null

  const detail = getTournamentDetail(tournament)
  const gameSearchQ = gameQuery.trim().toLowerCase()
  const filteredEligibleGames = !gameSearchQ
    ? detail.eligibleGames
    : detail.eligibleGames.filter(
        (g) =>
          g.name.toLowerCase().includes(gameSearchQ) ||
          g.provider.toLowerCase().includes(gameSearchQ),
      )

  return createPortal(
    <div className="fixed inset-0 z-[100] flex max-lg:items-end max-lg:p-0 lg:items-center lg:justify-center lg:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-background-modal-alpha"
        aria-label="Kapat"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 flex w-full min-h-0 flex-col overflow-hidden bg-background-modal",
          "max-lg:h-[calc(100dvh-58px)] max-lg:max-h-[calc(100dvh-58px)] max-lg:w-full max-lg:max-w-none max-lg:rounded-t-[26px] max-lg:rounded-b-none max-lg:pb-[env(safe-area-inset-bottom,0px)]",
          "lg:max-h-[min(90vh,860px)] lg:max-w-[1223px] lg:rounded-[20px]",
          "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_24px_48px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/5",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 shadow-[inset_0px_-1px_1px_-0.5px_rgba(0,0,0,0.06)]",
            "max-lg:rounded-t-[26px] max-lg:rounded-b-none lg:rounded-[20px]",
          )}
        />

        {/* Üst başlık — mobil: sadece metin (Figma 4973:8394); masaüstü: görsel + bilgi */}
        <div className="relative shrink-0 bg-background-modal-100 px-5  pb-7 pt-6 sm:px-4 lg:px-7 lg:pb-6 lg:pt-7">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 z-20 flex size-8 items-center justify-center rounded-md bg-action-teritory-default p-2 text-action-teritory-on-teritory transition-colors hover:bg-action-teritory-hover lg:right-6 lg:top-6"
            aria-label="Kapat"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </button>

          <div className="flex flex-col gap-4 pr-10 lg:flex-row lg:items-start lg:gap-6 lg:pr-12">
            <div className="relative mx-auto hidden h-[200px] w-full max-w-[427px] shrink-0 overflow-hidden rounded-xl sm:h-[224px] lg:mx-0 lg:block">
              <Image
                src={tournament.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 427px"
                priority
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <h2
                id={titleId}
                className="text-lg font-medium leading-5 tracking-[0.36px] text-text-main lg:text-xl lg:font-bold lg:tracking-wide"
              >
                {tournament.title}
              </h2>
              <div className="hidden lg:block">
                <ModalStatusChip state={tournament.state} />
              </div>
              <div className="flex gap-10 text-[13px] font-medium tracking-[0.26px] lg:flex-wrap lg:gap-10 lg:tracking-wide">
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-text-main">Başlangıç</span>
                  <span className="text-text-subtext">{tournament.startLabel}</span>
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-text-main">Bitiş</span>
                  <span className="text-text-subtext">{tournament.endLabel}</span>
                </div>
              </div>
              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#ffc828] p-1.5">
                  <Image src="/images/currency/try.svg" alt="" width={20} height={20} className="size-5" />
                </div>
                <div className="min-w-0 leading-tight">
                  <p className="text-xs font-medium tracking-wide text-text-subtext">Havuz Ödülü</p>
                  <p className="text-lg font-bold tracking-wide text-text-main">{tournament.pool}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gövde */}
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col lg:max-h-[min(56vh,520px)] lg:flex-row lg:overflow-hidden",
            "bg-background-modal",
          )}
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:border-divider-100 lg:border-r">
            <div className="flex min-h-0 flex-1 flex-col px-3 pt-3 sm:px-4 lg:px-7 lg:pt-5">
              <Tabs value={detailTab} onValueChange={setDetailTab} className="flex min-h-0 w-full flex-col">
                <div className="mb-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <TabsList className="inline-flex h-auto w-max min-w-0 rounded-full bg-neutral-300 p-[3px]">
                      {MODAL_TABS.map((t) => (
                        <TabsTrigger
                          key={t.value}
                          value={t.value}
                          className={cn(pillTabTriggerClass, t.value === "leaderboard" && "lg:hidden")}
                        >
                          {t.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  {detailTab === "games" && (
                    <div className="relative w-full shrink-0 sm:w-[246px]">
                      <HugeiconsIcon
                        icon={Search01Icon}
                        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-subtitle"
                        aria-hidden
                      />
                      <input
                        type="search"
                        value={gameQuery}
                        onChange={(e) => setGameQuery(e.target.value)}
                        placeholder="Oyun ara..."
                        className="h-12 w-full rounded-xl border border-element-border bg-background-elements py-2 pl-12 pr-3 text-sm font-medium text-text-main outline-none placeholder:text-text-subtext focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        aria-label="Geçerli oyunlarda ara"
                      />
                    </div>
                  )}
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto lg:overflow-visible">
                  <TabsContent value="description" className="mt-0 pb-6 outline-none">
                    <div className="max-w-[658px] space-y-4 text-sm font-medium leading-5 tracking-wide text-text-subtitle">
                      <p>{detail.description}</p>
                      <ul className="list-disc space-y-2 pl-5">
                        {detail.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="games" className="mt-0 pb-6 outline-none">
                    {filteredEligibleGames.length === 0 ? (
                      <p className="max-w-[658px] text-sm text-text-subtext">
                        Aramanızla eşleşen oyun bulunamadı.
                      </p>
                    ) : (
                      <CasinoGameTileGrid
                        games={filteredEligibleGames}
                        favoriteIds={tileFavorites}
                        onToggleFavorite={(gid) =>
                          setTileFavorites((prev) => {
                            const n = new Set(prev)
                            if (n.has(gid)) n.delete(gid)
                            else n.add(gid)
                            return n
                          })
                        }
                        layout="modal"
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="leaderboard" className="mt-0 pb-6 outline-none lg:hidden">
                    <LeaderboardTable rows={detail.leaderboard} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          <div className="relative hidden w-full shrink-0 flex-col lg:flex lg:w-[min(100%,441px)] lg:overflow-y-auto">
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-[200px] bg-gradient-to-t from-transparent to-background-body"
              aria-hidden
            />
            <div className="relative z-10 p-4 sm:p-6 lg:pl-5 lg:pr-6 lg:pt-8">
              <p className="mb-5 text-base font-bold tracking-wide text-text-main">MEVCUT SIRALAMA</p>
              <LeaderboardTable rows={detail.leaderboard} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
