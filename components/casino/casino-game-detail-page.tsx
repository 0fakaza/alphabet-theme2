"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { cn } from "@/lib/utils"
import type { CasinoLobbyGame } from "@/lib/casino-lobby-filters"
import {
  getGameDetailDefaults,
  getProviderDisplayNameForGame,
  getProviderLogoForGame,
  type GameTopRecord,
} from "@/lib/casino-game-detail"
import { TabList } from "@/components/elements/tab-list"
import { DataTable, type Column } from "@/components/elements/data-table"
import { IconButton } from "@/components/elements/button"
import { SliderNav } from "@/components/elements/slider-nav"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  Cards01Icon,
  Crown02Icon,
  DashboardSpeed01Icon,
  HugeiconsIcon,
  KnightShieldIcon,
  LinkForwardIcon,
  Maximize01Icon,
  Money01Icon,
  PieChart01Icon,
  Search01Icon,
  StarIcon,
  Target01Icon,
  User02Icon,
  MoneyBag01Icon,
  SmileIcon,
  type IconSvgElement,
} from "@/lib/icons"

import "swiper/css"
import "swiper/css/navigation"
 
type PlayMode = "real" | "fun"
type RecordPeriod = "today" | "7d" | "30d"

const recordPeriodTabs: { id: RecordPeriod; label: string }[] = [
  { id: "today", label: "Bugün" },
  { id: "7d", label: "7 Gün" },
  { id: "30d", label: "30 Gün" },
] as const

const playModeTabs: { value: PlayMode; label: string; icon: IconSvgElement }[] = [
  { value: "real", label: "Gerçek oyun", icon: MoneyBag01Icon },
  { value: "fun", label: "Eğlence Oyunu", icon: SmileIcon },
]

type CasinoGameDetailPageProps = {
  game: CasinoLobbyGame
  recentGames: CasinoLobbyGame[]
}

const STAT_ICONS = {
  rtp: PieChart01Icon,
  paylines: Cards01Icon,
  bet: Money01Icon,
  hit: Target01Icon,
  risk: DashboardSpeed01Icon,
} as const


function recordBadgeIcon(badge: GameTopRecord["badge"]) {
  const base = "size-5 shrink-0"
  switch (badge) {
    case "crown":
      return <HugeiconsIcon icon={Crown02Icon} className={`${base} text-primary`} strokeWidth={1.5} />
    case "shield":
      return <HugeiconsIcon icon={KnightShieldIcon} className={`${base} text-primary`} strokeWidth={1.5} />
    default:
      return <HugeiconsIcon icon={User02Icon} className="size-5 shrink-0 text-icon" strokeWidth={1.5} />
  }
}

const topRecordsColumns: Column<GameTopRecord>[] = [
  {
    key: "user",
    label: "Kullanıcı",
    width: "32%",
    cellClassName: "pl-3",
    render: (row) => (
      <div className="flex min-w-0 items-center gap-2">
        {recordBadgeIcon(row.badge)}
        <span className="truncate text-xs text-text-subtitle">{row.user}</span>
      </div>
    ),
  },
  {
    key: "bet",
    label: "Bet",
    width: "22%",
    render: (row) => (
      <div className="flex items-center gap-1.5">
        <Image src="/images/currency/try.svg" alt="TRY" width={16} height={16} className="size-4 shrink-0" />
        <span className="text-xs text-text-subtitle">{row.bet}</span>
      </div>
    ),
  },
  {
    key: "multiplier",
    label: "Multiplier",
    width: "18%",
    render: (row) => (
      <span className="inline-flex items-center justify-center rounded-full bg-neutral-400 px-2.5 py-1 text-xs text-text-subtitle">
        {row.multiplier}
      </span>
    ),
  },
  {
    key: "payout",
    label: "Payout",
    width: "28%",
    headerClassName: "pr-4",
    cellClassName: "pr-4",
    render: (row) => (
      <div className="flex items-center gap-1.5">
        <Image src="/images/currency/try.svg" alt="TRY" width={16} height={16} className="size-4 shrink-0" />
        <span className="text-xs font-medium" style={{ color: "#42BE49" }}>
          {row.payout}
        </span>
      </div>
    ),
  },
]

function TopRecordsTable({ rows }: { rows: readonly GameTopRecord[] }) {
  return (
    <DataTable
      className="w-full"
      columns={topRecordsColumns}
      data={[...rows]}
      emptyMessage="Kayıt yok."
    />
  )
}

export function  CasinoGameDetailPage({ game, recentGames }: CasinoGameDetailPageProps) {
  const { stats, topRecords, onlinePlayerCount, seoBlocks } = getGameDetailDefaults(game)
  const [playMode, setPlayMode] = useState<PlayMode>("real")
  const [recordPeriod, setRecordPeriod] = useState<RecordPeriod>("today")
  const [favorited, setFavorited] = useState(false)
  const [playerSearch, setPlayerSearch] = useState("")

  const providerLogo = getProviderLogoForGame(game.providerId)
  const providerName = getProviderDisplayNameForGame(game.providerId, game.provider)
  const playerFilter = playerSearch.trim().toLowerCase()

  const topSectionTitle = useMemo(() => {
    const n = game.name
    if (playerFilter) return { lead: "Oyuncu sonuçları:", highlight: `“${playerFilter}”` }
    return { lead: "TOP 3 Records for", highlight: n }
  }, [game.name, playerFilter])

  const idPrefix = "casino-recent"
  return (
    <div className="w-full">
      <section className="pt-4 md:pt-6">
        <div className="container max-w-[1400px]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden  md:size-[50px]">
                <Image
                  src={providerLogo}
                  alt=""
                  width={50}
                  height={50}
                  className="size-full object-contain p-1.5"
                />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-base font-semibold text-text-title md:text-[15px]">{game.name}</h1>
                <p className="mt-0.5 truncate text-xs text-text-subtitle md:text-xs">{providerName}</p>
              </div>
            </div>
            <div className="relative w-full min-w-0 max-w-md md:max-w-[419px] md:shrink-0">
              <HugeiconsIcon
                icon={Search01Icon}
                className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-text-subtitle"
                aria-hidden
              />
              <input
                type="search"
                value={playerSearch}
                onChange={(e) => setPlayerSearch(e.target.value)}
                placeholder={`${onlinePlayerCount} oyuncu ara`}
                className="h-12 w-full rounded-lg border border-element-border bg-background-elements pl-10 pr-3 text-sm text-text-main outline-none placeholder:text-text-subtitle focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                aria-label="Oyuncu ara"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="container max-w-[1400px]">
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-background-main">
            <div className="relative aspect-[990/557] w-full min-h-[200px] md:min-h-[320px]">
              <Image
                src={game.image}
                alt={game.name}
                fill
                className="object-contain p-2 md:p-3"
                priority
                sizes="(min-width: 1200px) 1373px, 100vw"
              />
            </div>
            <div className="flex items-center justify-between gap-2  px-3 py-2.5 md:px-6">
              <div className="flex items-center gap-1.5 md:gap-2">
                <IconButton
                  type="button"
                  variant="outline"
                  size="md"
                  aria-label={favorited ? "Favorilerden çıkar" : "Favorilere ekle"}
                  className="h-9 w-9 border-element-border bg-black/20 md:h-10 md:w-10 cursor-pointer"
                  onClick={() => setFavorited((f) => !f)}
                  icon={
                    <HugeiconsIcon
                      icon={StarIcon}
                      className={cn("size-5", favorited && "text-primary")}
                      fill={favorited ? "currentColor" : "none"}
                    />
                  }
                />
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-md cursor-pointer border border-element-border bg-black/20 text-text-main transition-colors hover:text-primary md:size-10"
                  aria-label="Küçült / pencere"
                >
                  <HugeiconsIcon icon={Maximize01Icon} className="size-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-md cursor-pointer border border-element-border bg-black/20 text-text-main transition-colors hover:text-primary md:size-10"
                  aria-label="Paylaş"
                >
                  <HugeiconsIcon icon={LinkForwardIcon} className="size-5" strokeWidth={1.5} />
                </button>
              </div>
              <Tabs
                value={playMode}
                onValueChange={(v) => setPlayMode(v as PlayMode)}
                className="w-auto shrink-0"
              >
                <TabList
                  tabs={playModeTabs.map((t) => ({
                    value: t.value,
                    label: t.label,
                    icon: t.icon,
                  }))}
                />
                <TabsContent value="real" className="sr-only" tabIndex={-1} />
                <TabsContent value="fun" className="sr-only" tabIndex={-1} />
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="container max-w-[1400px]">
          <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 md:grid-cols-5 md:gap-2">
            {(
              [
                { key: "rtp", label: "RTP", value: stats.rtp, icon: STAT_ICONS.rtp },
                { key: "lines", label: "Ödeme çizgileri", value: stats.paylines, icon: STAT_ICONS.paylines },
                { key: "bet", label: "Min / maks bahis", value: stats.minMaxBet, icon: STAT_ICONS.bet },
                { key: "hit", label: "İsabet oranı", value: stats.hitRate, icon: STAT_ICONS.hit },
                { key: "risk", label: "Risk", value: stats.risk, icon: STAT_ICONS.risk },
              ] as const
            ).map((s) => (
              <li
                key={s.key}
                className="flex min-w-0 items-center gap-3 rounded-xl border border-white/5 bg-neutral-300 px-3 py-2.5 md:px-4 md:py-5"
              >
                <HugeiconsIcon
                  icon={s.icon}
                  className="size-8 shrink-0 text-icon md:size-9"
                  strokeWidth={1.25}
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-text-subtext md:text-xs">{s.label}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-text-main ">
                    {s.value}
                    {s.key === "risk" && (
                      <span className="inline-block size-1.5 rounded-full bg-red-400" aria-hidden />
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {recentGames.length > 0 && (
        <section className="mt-10 w-full">
          <div className="container max-w-[1400px] py-2">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-[16px] font-semibold text-text-title md:text-[18px]">Son oynadıklarım</h2>
              <SliderNav
                id={idPrefix}
                buttonGapClassName="gap-3"
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-action-teritory-default text-icon shadow-sm transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30"
              />
            </div>
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: `.${idPrefix}-prev`, nextEl: `.${idPrefix}-next` }}
              slidesPerView="auto"
              spaceBetween={12}
              watchOverflow
              className="w-full overflow-hidden pb-0.5"
              onInit={(swiper) => {
                swiper.navigation.init()
                swiper.navigation.update()
              }}
            >
              {recentGames.map((g) => (
                <SwiperSlide key={g.id} className="!h-auto !w-[148px] shrink-0 sm:!w-[169px]">
                  <Link
                    href={g.href ?? `/casino/${g.id}`}
                    className="group flex w-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-body rounded-xl"
                  >
                    <div className="relative aspect-[169/248] w-full overflow-hidden rounded-xl bg-background-elements">
                      <Image
                        src={g.image}
                        alt={g.name}
                        fill
                        sizes="(max-width: 640px) 148px, 169px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {g.isNew && (
                        <span className="absolute left-2 top-2 z-10 flex items-center gap-0.5 rounded bg-white px-1.5 py-1 shadow-sm">
                          <Image src="/images/new-badge-icon.png" alt="" width={10} height={10} className="size-2.5" />
                          <span className="text-[9px] font-medium tracking-wide text-[#ea762e]">Yeni</span>
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 w-full px-1">
                      <p className="truncate text-center text-xs font-semibold text-text-main ">{g.name}</p>
                      <div className="mt-1 flex items-center justify-center gap-1.5">
                        <span className="size-1.5 shrink-0 rounded-full bg-green-400" aria-hidden />
                        <p className="text-[10px] text-text-subtext">
                          <span className="tabular-nums text-text-main">{g.players}</span> kişi oynuyor
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      <section className="mt-10">
        <div className="container max-w-[1400px]">
          <Tabs
            value={recordPeriod}
            onValueChange={(v) => setRecordPeriod(v as RecordPeriod)}
            className="w-full"
          >
            <div className="mb-3 flex flex-col gap-2   sm:gap-4">
              <h2 className="text-left text-sm font-medium text-text-title sm:text-base">
                <span className="text-text-subtitle">{topSectionTitle.lead}</span>{" "}
                <span className="font-semibold text-primary">{topSectionTitle.highlight}</span>
              </h2>
              <div className="w-full overflow-x-auto sm:w-auto sm:shrink-0 sm:overflow-visible">
                <TabList
                  className="w-max min-w-0"
                  tabs={recordPeriodTabs.map((t) => ({ value: t.id, label: t.label }))}
                />
              </div>
            </div>
            {recordPeriodTabs.map((t) => (
              <TabsContent key={t.id} value={t.id} className="m-0 mt-0 p-0 outline-none">
                <TopRecordsTable rows={topRecords} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="mb-3 md:mb-18 mt-10">
        <div className="container max-w-[1400px]">
          <div className="space-y-5 rounded-2xl border border-white/5 bg-neutral-500 px-4 py-6 md:px-6">
            {seoBlocks.map((block, i) => (
              <div key={i} className="text-sm leading-relaxed text-text-subtext">
                <h3 className="mb-2 text-lg font-medium text-text-subtitle">Seo text</h3>
                <p className="text-balance text-[13px] leading-6 text-text-subtext md:text-sm">{block}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
