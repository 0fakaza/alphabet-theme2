"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { cn } from "@/lib/utils"
import { Button, ButtonLink, IconButton } from "@/components/elements/button"
import { SliderNav } from "@/components/elements/slider-nav"
import {
  pillPagination,
  swiperPillPaginationClassName,
  swiperPillPaginationRootProps,
} from "@/components/elements/swiper-pill-pagination"
import {
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Cards01Icon,
  FilterHorizontalIcon,
  GiftIcon,
  HugeiconsIcon,
  Search01Icon,
  SparklesIcon,
  Tick02Icon,
} from "@/lib/icons"
import {
  Cards01Icon as NavCards01Icon,
  Cards02Icon,
  CherryIcon,
  Home04Icon,
  MenuCircleIcon,
  PoolTableIcon,
  StarIcon as NavStarIcon,
  Target01Icon,
  UserFullViewIcon,
} from "@hugeicons-pro/core-solid-rounded"
import { CasinoFilterModal, type FeatureFilterDef } from "@/components/casino/casino-filter-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { CasinoLeftPromoSlide } from "@/data/casino-left-promo-slides"
import { defaultCasinoLeftPromoSlides } from "@/data/casino-left-promo-slides"
import { casinoProviderRows, CASINO_PROVIDERS_PLACEHOLDER_TOTAL } from "@/data/casino-providers"
import { CasinoProviderTile } from "@/components/casino/casino-provider-tiles"
import { CasinoGameTileGrid } from "@/components/casino/casino-game-tile"
import { CASINO_LOBBY_CATALOG } from "@/data/casino-lobby-catalog"
import {
  countForDraftFilters,
  filterCasinoLobbyGames,
  type CasinoLobbyGame,
} from "@/lib/casino-lobby-filters"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

/** Lobby üst sekmeleri (oyun listesi filtreleri). Sağlayıcılar ayrı sayfa linki. Tümü @hugeicons-pro/core-solid-rounded. */
const lobbyFilterTabs = [
  { id: "lobby", label: "Lobby", icon: Home04Icon },
  { id: "favorites", label: "Favoriler(12)", icon: NavStarIcon },
  { id: "slots", label: "Slotlar", icon: CherryIcon },
  { id: "live", label: "Canlı Krupiye", icon: UserFullViewIcon },
  { id: "poker", label: "Poker", icon: NavCards01Icon },
  { id: "baccarat", label: "Baccarat", icon: PoolTableIcon },
  { id: "blackjack", label: "Blackjack", icon: Cards02Icon },
  { id: "roulette", label: "Rulet", icon: Target01Icon },
] as const

const CASINO_PROVIDERS_PAGE_HREF = "/casino/providers" as const

/** Figma 5521:7573 — Filtrele sol kolon (2 sütun + altta tam genişlik) */
const casinoFeatureFilters: FeatureFilterDef[] = [
  { id: "rtp", label: "Yüksek RTP", icon: SparklesIcon },
  { id: "bonus", label: "Bonus Turlar", icon: GiftIcon },
  { id: "buy", label: "Buy Bonus", icon: SparklesIcon },
  { id: "feature", label: "Özellik satın alma", icon: Cards01Icon },
  { id: "high", label: "Yüksek Oynayanlar", icon: Cards01Icon },
  { id: "new", label: "Yeni", icon: NavCards01Icon },
  { id: "trending", label: "Çok Konuşulanlar", fullWidth: true, icon: SparklesIcon },
]

/** Araç çubukundaki hızlı chip’ler: modal’daki id + ikon (solda) */
const TOOLBAR_QUICK_IDS = ["rtp", "buy", "new", "high", "feature"] as const
const toolbarQuickChips = TOOLBAR_QUICK_IDS.map((id) => {
  const f = casinoFeatureFilters.find((x) => x.id === id)
  if (!f) {
    throw new Error(`Unknown feature id: ${id}`)
  }
  const label = id === "feature" ? "Özellik Satın alma" : f.label
  return { id: f.id, label, icon: f.icon }
})

/** Figma: Tüm sağlayıcılar dropdown — üst hızlı sekmeler */
const PROVIDER_CATEGORY_TABS = [
  { id: "all" as const, label: "Tümü" },
  { id: "slot" as const, label: "Slot" },
  { id: "live" as const, label: "Canlı Casino" },
  { id: "crash" as const, label: "Crash" },
] as const

type ProviderCategoryId = (typeof PROVIDER_CATEGORY_TABS)[number]["id"]

/** Arka plan sabit; alanlar slide ile değişir (ileride data’ya taşınabilir) */
const RIGHT_PROMO_BACK_IMAGE = "/images/jackpot-back.jpg"
/** Sağ slider tutar satırı — 243×64 (Figma) */
const JACKPOT_MONEY_BADGE = "/images/jackpot-money-back.svg"

const rightPromoSlides = [
  { id: "r1", game: "FRUIT PARTY", subtitle: "Jackpot Ödülü", amount: "₺1.415.210,00", mult: "24.520X" },
  { id: "r2", game: "GATES OF OLYMPUS", subtitle: "Mega ödül", amount: "₺892.400,00", mult: "18.200X" },
  { id: "r3", game: "SWEET BONANZA", subtitle: "Jackpot Ödülü", amount: "₺2.100.000,00", mult: "32.100X" },
] as const

const LOBBY_SECTION_TITLES: Record<string, string> = {
  lobby: "Tüm oyunlar",
  favorites: "Favori oyunlarınız",
  slots: "Pragmatic Play Oyunları",
  live: "Canlı casino",
  poker: "Poker",
  baccarat: "Baccarat",
  blackjack: "Blackjack",
  roulette: "Rulet",
}

type CasinoLobbyProps = {
  gamesSource?: CasinoLobbyGame[]
  /** Sol promosyon slider; verilmezse `defaultCasinoLeftPromoSlides` (API’den de geçirilebilir) */
  leftPromoSlides?: CasinoLeftPromoSlide[]
  /**
   * `providers`: Figma 5102:23660 — aynı promos + sekmeler (Sağlayıcılar mor), oyun aracı yok;
   * tam genişlik “N sağlayıcı içinden ara” + 7 sütun sağlayıcı ızgarası; oyun listesi yok.
   */
  variant?: "default" | "providers"
}

export function CasinoLobby({
  gamesSource: gamesSourceProp,
  leftPromoSlides: leftPromoSlidesProp,
  variant: variantProp = "default",
}: CasinoLobbyProps) {
  const isProvidersView = variantProp === "providers"
  const leftPromoSlides = leftPromoSlidesProp ?? defaultCasinoLeftPromoSlides
  const gamesSource = gamesSourceProp ?? CASINO_LOBBY_CATALOG
  const [activeLobby, setActiveLobby] = useState<string>("lobby")
  const [gameSearch, setGameSearch] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set())
  const [providerFilter, setProviderFilter] = useState("")
  const [selectedProviders, setSelectedProviders] = useState<Set<string>>(() => new Set())
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [visibleGames, setVisibleGames] = useState(42)
  const [promoLeftReady, setPromoLeftReady] = useState(false)
  const [promoRightReady, setPromoRightReady] = useState(false)
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [providerMenuOpen, setProviderMenuOpen] = useState(false)
  const [providerCategory, setProviderCategory] = useState<ProviderCategoryId>("all")

  const filteredGames = useMemo(
    () =>
      filterCasinoLobbyGames(gamesSource, {
        search: gameSearch,
        activeLobby,
        featureIds: selectedFeatures,
        providerIds: selectedProviders,
        favoriteIds: favorites,
      }),
    [gamesSource, gameSearch, activeLobby, selectedFeatures, selectedProviders, favorites],
  )

  const displayedGames = useMemo(
    () => filteredGames.slice(0, visibleGames),
    [filteredGames, visibleGames],
  )

  const getResultCount = useCallback(
    (draftFeatures: Set<string>, draftProviders: Set<string>) =>
      countForDraftFilters(
        gamesSource,
        { search: gameSearch, activeLobby, favoriteIds: favorites },
        draftFeatures,
        draftProviders,
      ),
    [gamesSource, gameSearch, activeLobby, favorites],
  )

  const featureSig = useMemo(() => [...selectedFeatures].sort().join("\0"), [selectedFeatures])
  const providerSig = useMemo(() => [...selectedProviders].sort().join("\0"), [selectedProviders])

  useEffect(() => {
    setVisibleGames(42)
  }, [activeLobby, gameSearch, featureSig, providerSig])

  const sectionTitle = useMemo(() => {
    if (isProvidersView) {
      const q = gameSearch.trim()
      if (q) return `“${q}” sağlayıcı sonuçları`
      return ""
    }
    const q = gameSearch.trim()
    if (q) return `“${q}” sonuçları`
    return LOBBY_SECTION_TITLES[activeLobby] ?? "Oyunlar"
  }, [isProvidersView, gameSearch, activeLobby])

  const selectedProviderList = useMemo(
    () => casinoProviderRows.filter((p) => selectedProviders.has(p.id)),
    [selectedProviders],
  )

  const providerTriggerAria = useMemo(() => {
    if (selectedProviders.size === 0) return "Tüm sağlayıcılar, menüyü aç"
    return `${selectedProviders.size} sağlayıcı seçili, menüyü aç`
  }, [selectedProviders.size])

  const toggleProvider = (id: string) => {
    setSelectedProviders((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleToolbarFeature = (id: (typeof casinoFeatureFilters)[number]["id"]) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredProviders = useMemo(() => {
    const q = providerFilter.trim().toLowerCase()
    const inCategory = casinoProviderRows.filter((p) => {
      if (providerCategory === "all") return true
      if (providerCategory === "slot") return p.slot
      if (providerCategory === "live") return p.live
      return p.crash
    })
    if (!q) return inCategory
    return inCategory.filter((p) => p.name.toLowerCase().includes(q))
  }, [providerFilter, providerCategory])

  const filteredProviderRows = useMemo(() => {
    if (!isProvidersView) return [] as (typeof casinoProviderRows)[number][]
    const q = gameSearch.trim().toLowerCase()
    if (!q) return [...casinoProviderRows]
    return casinoProviderRows.filter((p) => p.name.toLowerCase().includes(q))
  }, [isProvidersView, gameSearch])


  return (
    <div className="w-full">
      {/* Promosyonlar: lg’de 2 sütunlu grid — başlık+sol nav yalnızca sol kolonda; sağ üst hücre boş */}
      <section
        className={cn(
          "md:pb-6 pt-4 md:pt-6",
          isProvidersView ? "border-0" : "border-b border-divider-100/60",
        )}
      >
        <div className="container">
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 lg:grid-cols-[minmax(0,1fr)_min(100%,456px)] lg:items-start">
            <div className="flex min-h-9 min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <h1 className="text-[15px] font-semibold leading-none text-text-title">Promosyonlar</h1>
              <div className="flex shrink-0 items-center gap-7">
                <ButtonLink href="/promotions" variant="link" className="whitespace-nowrap text-[13px] font-medium">
                  Tümü(182)
                </ButtonLink>
                <SliderNav
                  id="promo-left"
                  buttonGapClassName="gap-3"
                  className="flex size-8 shrink-0 items-center justify-center rounded-md bg-action-teritory-default text-icon shadow-sm transition-colors hover:text-white"
                />
              </div>
            </div>
            <div className="hidden min-h-9 lg:block" aria-hidden />

            <div className="relative min-w-0">
              {!promoLeftReady && (
                <div
                  className="pointer-events-none absolute inset-0 z-[1] flex gap-3"
                  aria-hidden
                >
                  <div className="min-h-[200px] min-w-0 flex-1 animate-pulse rounded-2xl bg-neutral-500 md:min-h-[220px]" />
                  <div className="hidden min-h-[200px] min-w-0 flex-1 animate-pulse rounded-2xl bg-neutral-500 md:block md:min-h-[220px]" />
                </div>
              )}
              <Swiper
                {...swiperPillPaginationRootProps("desktop", { bottom: 0 })}
                modules={[Navigation, Pagination]}
                navigation={{ prevEl: ".promo-left-prev", nextEl: ".promo-left-next" }}
                pagination={pillPagination}
                slidesPerView={1.15}
                spaceBetween={12}
                breakpoints={{
                  768: { slidesPerView: 2, spaceBetween: 16 },
                }}
                onSwiper={() => setPromoLeftReady(true)}
                className={swiperPillPaginationClassName(
                  "casino-promo-left w-full min-w-0",
                  "transition-opacity duration-300",
                  promoLeftReady ? "opacity-100" : "opacity-0",
                )}
              >
                {leftPromoSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <Link
                      href={slide.href}
                      className="group relative block h-[200px] overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:h-[220px]"
                    >
                      <Image
                        src={slide.image}
                        alt={slide.alt ?? "Promosyon"}
                        fill
                        className="object-cover object-left transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(min-width: 768px) 45vw, 100vw"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="relative min-w-0">
              {!promoRightReady && (
                <div
                  className="pointer-events-none absolute inset-0 z-[1] min-h-[200px] animate-pulse rounded-2xl bg-neutral-500 md:min-h-[220px]"
                  aria-hidden
                />
              )}
              <Swiper
                {...swiperPillPaginationRootProps("desktop", { bottom: 0 })}
                modules={[Navigation, Pagination]}
                navigation={{ prevEl: ".promo-right-prev", nextEl: ".promo-right-next" }}
                pagination={pillPagination}
                slidesPerView={1}
                spaceBetween={12}
                onSwiper={() => setPromoRightReady(true)}
                className={swiperPillPaginationClassName(
                  "casino-promo-right w-full min-w-0",
                  "transition-opacity duration-300",
                  promoRightReady ? "opacity-100" : "opacity-0",
                )}
              >
                {rightPromoSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative h-[200px] overflow-hidden rounded-2xl bg-zinc-950 md:h-[220px]">
                      <Image
                        src={RIGHT_PROMO_BACK_IMAGE}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(min-width:1024px) 456px, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-amber-100/90">{slide.game}</p>
                        <p className="mt-1 text-lg font-semibold text-white">{slide.subtitle}</p>
                        <div className="relative mt-2 flex h-16 w-[min(100%,243px)] max-w-full shrink-0 items-center justify-center">
                          <Image
                            src={JACKPOT_MONEY_BADGE}
                            alt=""
                            width={243}
                            height={64}
                            className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-[243px] max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
                          />
                          <p className="relative z-10 px-2 text-center text-base font-bold leading-tight text-stone-900 sm:text-lg">
                            {slide.amount}
                          </p>
                        </div>
                        <p className="mt-1 text-[10px] font-medium text-amber-200/80">{slide.mult}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 md:px-3">
                <button
                  type="button"
                  className="promo-right-prev pointer-events-auto mb-7 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:size-11"
                  aria-label="Önceki slayt"
                >
                  <HugeiconsIcon icon={ArrowLeft02Icon} className="size-4" />
                </button>
                <button
                  type="button"
                  className="promo-right-next pointer-events-auto mb-7 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:size-11"
                  aria-label="Sonraki slayt"
                >
                  <HugeiconsIcon icon={ArrowRight02Icon} className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lobby sekmeleri */}
      <section
        className={cn(
          isProvidersView
            ? "pt-3 pb-1.5 md:pt-4 md:pb-1.5"
            : "md:py-4 py-5",
          isProvidersView ? "border-0" : "border-b border-divider-100/60",
        )}
      >
        <div className="container">
          {!isProvidersView && (
            <div className="mb-3 flex items-center justify-between gap-2 md:hidden">
              <h2 className="text-base font-semibold text-text-title">Filtreler</h2>
              <IconButton
                variant="outline"
                size="md"
                type="button"
                className="shrink-0 h-11 w-11"
                aria-label="Filtrele"
                onClick={() => setFilterModalOpen(true)}
                icon={<HugeiconsIcon icon={FilterHorizontalIcon} className="size-5" />}
              />
            </div>
          )}
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            {isProvidersView
              ? lobbyFilterTabs.map((tab) => {
                  const label = tab.id === "favorites" ? `Favoriler(${favorites.size})` : tab.label
                  return (
                    <Link
                      key={tab.id}
                      href="/casino"
                      className="flex h-[72px] min-w-[88px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl bg-background-elements px-7 py-2 text-text-subtitle transition-colors hover:bg-neutral-100/60"
                    >
                      <HugeiconsIcon icon={tab.icon} className="size-6" />
                      <span className="text-center text-xs font-medium leading-tight">{label}</span>
                    </Link>
                  )
                })
              : lobbyFilterTabs.map((tab) => {
                  const active = activeLobby === tab.id
                  const label = tab.id === "favorites" ? `Favoriler(${favorites.size})` : tab.label
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveLobby(tab.id)}
                      className={cn(
                        "flex min-w-[88px] h-[72px]  cursor-pointer shrink-0 flex-col justify-center bg-background-elements items-center gap-1 rounded-xl px-7 py-2 transition-colors",
                        active ? "bg-primary text-text-main" : "text-text-subtitle hover:bg-neutral-100/60",
                      )}
                    >
                      <HugeiconsIcon icon={tab.icon} className="size-6" />
                      <span className="text-center text-xs font-medium leading-tight">{label}</span>
                    </button>
                  )
                })}
            {isProvidersView ? (
              <div
                className="flex h-[72px] min-w-[88px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl bg-primary px-7 py-2 text-text-main"
                aria-current="page"
              >
                <HugeiconsIcon icon={MenuCircleIcon} className="size-6" />
                <span className="text-center text-xs font-medium leading-tight">Sağlayıcılar</span>
              </div>
            ) : (
              <Link
                href={CASINO_PROVIDERS_PAGE_HREF}
                className="flex h-[72px] min-w-[88px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl bg-background-elements px-7 py-2 text-text-subtitle transition-colors hover:bg-neutral-100/60"
              >
                <HugeiconsIcon icon={MenuCircleIcon} className="size-6" />
                <span className="text-center text-xs font-medium leading-tight">Sağlayıcılar</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Sağlayıcılar sayfası (Figma): sekmelerin altında yalnızca tam geniş arama — oyun aracı yok */}
      {isProvidersView && (
        <section className="border-b border-divider-100/60 pt-1.5 pb-3 md:pt-2 md:pb-4">
          <div className="container max-w-[1400px]">
            <div className="relative w-full min-w-0 max-w-[320px]">
              <HugeiconsIcon
                icon={Search01Icon}
                className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-text-subtitle"
                aria-hidden
              />
              <input
                type="search"
                value={gameSearch}
                onChange={(e) => setGameSearch(e.target.value)}
                placeholder={`${CASINO_PROVIDERS_PLACEHOLDER_TOTAL} sağlayıcı içinden ara`}
                className="h-12 w-full rounded-lg border border-element-border bg-background-elements pl-10 pr-3 text-sm text-text-main outline-none placeholder:text-text-subtitle focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                aria-label="Sağlayıcılarda ara"
              />
            </div>
          </div>
        </section>
      )}

      {/* Araç çubuğu: arama, ikonlar, hızlı chip’ler, sağda sağlayıcılar + Figma filtre modal (LayoutGrid) */}
      {!isProvidersView && (
      <section className="border-b border-divider-100/60 py-4">
        <div className="container">
          <div
            className={cn(
              "grid w-full max-md:grid-cols-[minmax(0,1fr)_auto] max-md:items-center max-md:gap-y-3 max-md:gap-x-2",
              "md:grid-cols-[minmax(0,318px)_minmax(0,1fr)_auto] md:items-center md:gap-x-3",
            )}
          >
            <div className="min-w-0 max-md:row-start-1 max-md:col-start-1 md:row-start-1 md:col-start-1">
              <div className="flex min-w-0 items-center gap-2">
                <div className="relative min-w-0 flex-1">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-text-subtitle"
                  />
                  <input
                    type="search"
                    value={gameSearch}
                    onChange={(e) => setGameSearch(e.target.value)}
                    placeholder="Oyun ara..."
                    className="h-[44px] w-full min-w-0 rounded-lg border border-element-border bg-background-elements pl-10 pr-3 text-sm text-text-main outline-none placeholder:text-text-subtitle focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary md:min-w-[180px]"
                    aria-label="Oyun ara"
                  />
                </div>
                <IconButton
                  variant="outline"
                  size="md"
                  type="button"
                  className="hidden h-[44px] w-[44px] shrink-0 md:inline-flex"
                  aria-label="Filtrele"
                  onClick={() => setFilterModalOpen(true)}
                  icon={<HugeiconsIcon icon={FilterHorizontalIcon} className="size-5" />}
                />
              </div>
            </div>

            <div className="min-w-0 max-md:col-span-3 max-md:row-start-2 max-md:col-start-1 flex items-center gap-2 overflow-x-auto pb-0.5 md:col-start-2 md:row-1 md:min-w-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
              {toolbarQuickChips.map((c) => {
                const on = selectedFeatures.has(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleToolbarFeature(c.id)}
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 cursor-pointer rounded-lg border h-[44px] px-2.5 py-2.5 pl-2 text-left text-xs font-medium transition-colors",
                      on
                        ? " bg-background-main text-primary"
                        : "border-element-border bg-background-elements text-text-subtitle hover:border-neutral-600",
                    )}
                  >
                    <HugeiconsIcon
                      icon={c.icon}
                      className={cn("size-3.5 shrink-0", on ? "text-primary" : "text-text-subtitle")}
                    />
                    <span className="whitespace-nowrap">{c.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="min-w-0 max-md:row-start-1 max-md:col-start-2 flex shrink-0 items-center justify-end md:col-start-3 md:row-start-1">
              <DropdownMenu open={providerMenuOpen} onOpenChange={setProviderMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="md"
                    type="button"
                    aria-label={providerTriggerAria}
                    className={cn(
                      "h-11 w-full min-w-0 max-w-[9.75rem] justify-between gap-1.5 px-2 text-sm font-medium md:h-12 md:w-auto md:min-w-[160px] md:max-w-[min(100vw-2rem,280px)] md:px-2.5 md:gap-2",
                    )}
                  >
                    <span className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden md:gap-2">
                      {selectedProviders.size === 0 ? (
                        <span className="truncate">Tüm sağlayıcılar</span>
                      ) : (
                        <>
                          <span className="flex shrink-0 items-center">
                            {selectedProviderList.slice(0, 4).map((p, i) => (
                              <span
                                key={p.id}
                                className={cn(
                                  "relative size-7 overflow-hidden rounded-full",
                                  i > 0 && "-ml-2.5",
                                )}
                                style={{ zIndex: i + 1 }}
                              >
                                <Image
                                  src={p.logo}
                                  alt=""
                                  width={28}
                                  height={28}
                                  className="size-full object-contain"
                                />
                              </span>
                            ))}
                          </span>
                          {selectedProviderList.length > 4 ? (
                            <span className="min-w-0 flex-1 basis-0 truncate text-left text-sm text-text-subtitle">
                              +{selectedProviderList.length - 4} seçildi
                            </span>
                          ) : selectedProviderList.length === 1 ? (
                            <span className="min-w-0 flex-1 basis-0 truncate text-left text-sm font-medium text-text-main">
                              {selectedProviderList[0].name}
                            </span>
                          ) : null}
                        </>
                      )}
                    </span>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 shrink-0 text-text-subtitle" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-[min(calc(100vw-1.5rem),480px)] min-w-[300px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-2xl  bg-background-main p-0 shadow-lg"
                >
                  <div className="max-h-[min(72vh,560px)] overflow-y-auto p-4">
                    <div
                      className="flex w-fit max-w-full flex-wrap gap-1 rounded-full bg-neutral-300 p-[3px]"
                      role="tablist"
                      aria-label="Sağlayıcı türü"
                    >
                      {PROVIDER_CATEGORY_TABS.map((tab) => {
                        const active = providerCategory === tab.id
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => setProviderCategory(tab.id)}
                            className={cn(
                              "h-9 min-w-fit text-nowrap flex-1 rounded-full px-1.5 text-center text-[10px] font-medium leading-tight sm:px-2.5 sm:text-xs",
                              active
                                ? "border border-element-border bg-background-elements text-text-main"
                                : "text-text-subtitle transition-colors hover:text-text-main",
                            )}
                          >
                            {tab.label}
                          </button>
                        )
                      })}
                    </div>
                    <div className="mt-4">
                      <div className="relative">
                        <HugeiconsIcon
                          icon={Search01Icon}
                          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-subtitle"
                        />
                        <input
                          type="search"
                          value={providerFilter}
                          onChange={(e) => setProviderFilter(e.target.value)}
                          placeholder="Sağlayıcılarda ara"
                          className="h-12 w-full rounded-xl border border-element-border bg-background-elements pl-9 pr-3 text-sm text-text-main outline-none placeholder:text-text-subtitle focus-visible:border-primary"
                          aria-label="Sağlayıcılarda ara"
                        />
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {filteredProviders.length === 0 ? (
                        <p
                          className="col-span-2 py-6 text-center text-sm text-text-subtitle"
                          role="status"
                        >
                          Eşleşen sağlayıcı yok
                        </p>
                      ) : (
                        filteredProviders.map((p) => {
                          const checked = selectedProviders.has(p.id)
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => toggleProvider(p.id)}
                              className={cn(
                                "group cursor-pointer flex min-h-14 w-full min-w-0 items-center gap-2 rounded-lg border-2 px-2.5 py-2 text-left transition-colors",
                                checked
                                  ? "border-action-secondary-default"
                                  : "border-divider-100 hover:border-element-border",
                              )}
                            >
                              <div className="relative size-9 shrink-0 overflow-hidden rounded-full ">
                                <Image
                                  src={p.logo}
                                  alt=""
                                  width={36}
                                  height={36}
                                  className="size-full object-contain "
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font- text-text-main sm:text-sm">{p.name}</p>
                                <p className="text-[10px] text-text-subtitle sm:text-xs">{p.games} oyun</p>
                              </div>
                              <span
                                className={cn(
                                  "flex size-5 shrink-0 items-center justify-center rounded border",
                                  checked
                                    ? "border-action-secondary-default/15 bg-action-secondary-default text-white"
                                    : "border-divider-100 ",
                                )}
                                aria-hidden
                              >
                                {checked && <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={2.5} />}
                              </span>
                            </button>
                          )
                        })
                      )}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>
      )}

      <CasinoFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        features={casinoFeatureFilters}
        selectedFeatures={selectedFeatures}
        onSelectedFeaturesChange={setSelectedFeatures}
        providers={casinoProviderRows}
        providerQuery={providerFilter}
        onProviderQueryChange={setProviderFilter}
        selectedProviderIds={selectedProviders}
        onSelectedProviderIdsChange={setSelectedProviders}
        getResultCount={getResultCount}
        onApply={() => {
          setVisibleGames(42)
        }}
      />

      <div className="container max-w-[1400px] pb-10">
        <div
          className={cn(
            "w-full min-w-0",
            isProvidersView ? "pt-6 md:pt-7" : "pt-6",
          )}
        >
          {(!isProvidersView || gameSearch.trim()) && sectionTitle && (
            <h2 className="mb-4 text-[18px] font-semibold text-text-title md:text-[20px]">
              {sectionTitle}
            </h2>
          )}

          {isProvidersView ? (
            filteredProviderRows.length === 0 ? (
              <p className="py-12 text-center text-sm text-text-subtitle" role="status">
                Eşleşen sağlayıcı yok
              </p>
            ) : (
              <ul className="m-0 list-none p-0 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                {filteredProviderRows.map((p) => (
                  <li key={p.id} className="min-w-0">
                    <CasinoProviderTile p={p} />
                  </li>
                ))}
              </ul>
            )
          ) : filteredGames.length === 0 ? (
            <p className="py-12 text-center text-sm text-text-subtitle">
              {activeLobby === "favorites" && favorites.size === 0
                ? "Henüz favori oyun eklemediniz."
                : "Bu filtrelere uygun oyun bulunamadı."}
            </p>
          ) : (
            <>
              <CasinoGameTileGrid
                games={displayedGames}
                favoriteIds={favorites}
                onToggleFavorite={(gid) =>
                  setFavorites((prev) => {
                    const n = new Set(prev)
                    if (n.has(gid)) n.delete(gid)
                    else n.add(gid)
                    return n
                  })
                }
                layout="lobby"
              />

              <hr className="my-8 border-divider-100" />

              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  className="min-w-[251px] border-neutral-600 text-text-subtitle hover:bg-neutral-100"
                  onClick={() => setVisibleGames((v) => Math.min(v + 42, filteredGames.length))}
                  disabled={displayedGames.length >= filteredGames.length}
                >
                  Daha fazla oyun görüntüle
                </Button>
                <p className="text-center text-[11px] text-text-subtitle">
                  <span>{filteredGames.length.toLocaleString("tr-TR")} oyun eşleşiyor</span>
                  <span className="mx-2 text-neutral-600">·</span>
                  <span>{displayedGames.length} gösteriliyor</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
