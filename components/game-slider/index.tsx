"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { HugeiconsIcon, StarIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { SliderNav } from "@/components/elements/slider-nav"
import { ButtonLink } from "@/components/elements/button"

import "swiper/css"
import "swiper/css/navigation"

export type Game = {
  name: string
  provider: string
  image: string
  players: number
  href?: string
  isNew?: boolean
  /** Katalog / filtre: favori ve listeler için */
  id?: string
}

type GameSliderProps = {
  title: string
  totalCount?: number
  allHref?: string
  games: Game[]
  id: string
  variant?: "default" | "compact"
  showName?: boolean
  showFavorite?: boolean
}

const GameSlider = ({ title, totalCount, allHref = "#", games, id, variant = "default", showName = false, showFavorite = false }: GameSliderProps) => {
  const [ready, setReady] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  return (
    <section className="w-full">
      <div className="container py-6 md:py-10">
        <div className="mb-8  flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-text-title">{title}</h2>
          <div className="flex items-center gap-2">
            {totalCount && (
              <ButtonLink href={allHref} variant="link" className="text-[13px] mr-2">
                Tümü ({totalCount})
              </ButtonLink>
            )}
            <SliderNav id={id} />
          </div>
        </div>

        {!ready && (
          <div className={`flex gap-3`}>
            {Array.from({ length: variant === "compact" ? 6 : 8 }).map((_, i) =>
              variant === "compact" ? (
                <div key={i} className="flex shrink-0 flex-col items-center gap-1.5 md:flex-row md:items-center md:gap-3 md:rounded-xl md:bg-neutral-500 md:px-3 md:py-2.5">
                  <div className="aspect-square w-[72px] animate-pulse rounded-lg bg-neutral-500 md:size-10 md:w-auto" />
                  <div className="flex flex-col items-center gap-1 md:items-start md:gap-1.5">
                    <div className="h-2.5 w-12 animate-pulse rounded bg-neutral-500 md:h-3 md:w-16" />
                    <div className="h-2 w-10 animate-pulse rounded bg-neutral-500 md:w-24" />
                  </div>
                </div>
              ) : (
                <div key={i} className="flex flex-1 flex-col gap-1.5">
                  <div className="aspect-[169/248] w-full animate-pulse rounded-xl bg-neutral-500" />
                  <div className="mx-auto h-2 w-12 animate-pulse rounded bg-neutral-500" />
                </div>
              )
            )}
          </div>
        )}

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: `.${id}-next`,
            prevEl: `.${id}-prev`,
          }}
          onSwiper={() => setReady(true)}
          {...(variant === "compact"
            ? {
                slidesPerView: 2.2,
                spaceBetween: 8,
                breakpoints: {
                  480: { slidesPerView: 3, spaceBetween: 8 },
                  640: { slidesPerView: 4, spaceBetween: 8 },
                  768: { slidesPerView: 5, spaceBetween: 10 },
                  1024: { slidesPerView: 6, spaceBetween: 10 },
                },
              }
            : {
                spaceBetween: 12,
                slidesPerView: 3,
                breakpoints: { 
                  640: { slidesPerView: 4 },
                  768: { slidesPerView: 5 },
                  1024: { slidesPerView: 7 },
                  1280: { slidesPerView: 8 },
                },
              }
          )}
          className={`w-full overflow-hidden transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          {games.map((game) => (
            <SwiperSlide key={game.name}>
              {variant === "compact" ? (
                <Link
                  href={game.href ?? `/game/${game.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex min-w-0 w-full flex-col items-center gap-1.5 md:flex-row md:items-center md:gap-2 md:rounded-xl md:bg-neutral-100 md:px-2 md:py-2.5 lg:gap-3 lg:px-3
                  md:transition-colors md:hover:bg-neutral-200"
                >
                  <div className="w-full shrink-0 overflow-hidden rounded-lg md:w-auto">
                    <Image
                      src={game.image}
                      alt={game.name}
                      width={80}
                      height={80}
                      className="aspect-square w-full object-cover md:size-10 md:w-auto"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col items-center md:items-start">
                    <span className="w-full truncate text-center text-[12px] font-medium text-text-main md:text-left md:text-xs md:font-semibold">
                      {game.name}
                    </span>
                    <div className="mt-0.5 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-green-400" />
                      <span className="text-[9px] text-text-main md:text-[10px] md:text-zinc-500">
                        {game.players}<span className="hidden md:inline"> kişi oynuyor</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  href={game.href ?? (game.id ? `/casino/${game.id}` : `/slot/${game.name.toLowerCase().replace(/\s+/g, "-")}`)}
                  className="group flex w-full max-w-[169px] flex-col"
                >
                  <div className="relative aspect-[169/248] w-full overflow-hidden rounded-[12px]">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 169px"
                      className="object-cover transition-all duration-300 ease-in-out [transition-property:transform,filter] group-hover:scale-105 group-hover:blur-[3px]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-black/0 transition-opacity duration-300 ease-in-out group-hover:bg-black/15"
                      aria-hidden
                    />
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-2">
                      <span
                        className="flex size-[52px] items-center justify-center rounded-full bg-[#a78bfa] text-white shadow-md opacity-0 scale-90 transition-all duration-300 ease-in-out [transition-property:transform,opacity] group-hover:scale-100 group-hover:opacity-100"
                        aria-hidden
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="ml-0.5 size-6"
                          fill="currentColor"
                          aria-hidden
                        >
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
                    {showFavorite && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setFavorites((prev) => {
                            const next = new Set(prev)
                            if (next.has(game.name)) next.delete(game.name)
                            else next.add(game.name)
                            return next
                          })
                        }}
                        className={cn(
                          "absolute right-2 top-2 z-20 cursor-pointer rounded-md bg-black/40 p-1 transition-all duration-300 ease-in-out",
                          "opacity-0 group-hover:opacity-100 hover:bg-black/60",
                          "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary/60",
                          favorites.has(game.name) && "opacity-100",
                        )}
                        aria-label={favorites.has(game.name) ? "Favorilerden çıkar" : "Favorilere ekle"}
                      >
                        <HugeiconsIcon
                          icon={StarIcon}
                          className={cn("size-4 text-white", favorites.has(game.name) && "text-primary")}
                          fill={favorites.has(game.name) ? "currentColor" : "none"}
                        />
                      </button>
                    )}
                  </div>
                  <div className="mt-1.5 px-1">
                    {showName && (
                      <p className="truncate text-xs text-center font-semibold text-white">{game.name}</p>
                    )}
                    <div className={`flex items-center  justify-center gap-1.5 ${showName ? "mt-1" : ""}`}>
                      <span className="size-1.5 rounded-full bg-green-400" />
                      <p className="text-[10px] text-text-subtext ">
                        <span className="text-text-main">{game.players}</span> kişi oynuyor
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default GameSlider
