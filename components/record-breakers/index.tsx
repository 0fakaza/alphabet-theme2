"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { HugeiconsIcon, ArrowLeft01Icon, ArrowRight01Icon, Video01Icon, PlayCircleIcon } from "@/lib/icons"
import { SliderNav } from "@/components/elements/slider-nav"

import "swiper/css"
import "swiper/css/navigation"

type Record = {
  game: string
  provider: string
  image: string
  winAmount: number
  betAmount: number
  multiplier: number
  href?: string
}

const records: Record[] = [
  {
    game: "Duel at Dawn",
    provider: "HACKSAW",
    image: "/images/games/olympus.jpg",
    winAmount: 14520124,
    betAmount: 12000,
    multiplier: 4.521,
  },
  {
    game: "Duel at Dawn",
    provider: "HACKSAW",
    image: "/images/games/olympus.jpg",
    winAmount: 14520124,
    betAmount: 12000,
    multiplier: 4.521,
  },
  {
    game: "Duel at Dawn",
    provider: "HACKSAW",
    image: "/images/games/olympus.jpg",
    winAmount: 14520124,
    betAmount: 12000,
    multiplier: 4.521,
  },
  {
    game: "Duel at Dawn",
    provider: "HACKSAW",
    image: "/images/games/olympus.jpg",
    winAmount: 14520124,
    betAmount: 12000,
    multiplier: 4.521,
  },
  {
    game: "Duel at Dawn",
    provider: "HACKSAW",
    image: "/images/games/olympus.jpg",
    winAmount: 14520124,
    betAmount: 12000,
    multiplier: 4.521,
  },
]

const formatAmount = (n: number) =>
  n.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })

const RecordBreakers = () => {
  const [ready, setReady] = useState(false)
  return (
    <section className="w-full">
      <div className="container py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Rekor kıranlar</h2>
          <div className="flex items-center gap-3">
            <SliderNav
              id="records"
              prevIcon={ArrowLeft01Icon}
              nextIcon={ArrowRight01Icon}
              className="flex size-8 items-center justify-center rounded-full border border-zinc-700 cursor-pointer text-zinc-400 transition-colors hover:text-white"
            />
          </div>
        </div>

        {!ready && (
          <div className="flex gap-2.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full max-w-[370px] animate-pulse overflow-hidden rounded-[20px] bg-neutral-100 md:flex md:max-w-[460px] md:gap-[19px] md:p-3">
                <div className="aspect-square w-full shrink-0 bg-neutral-300 md:size-[134px] md:w-auto md:rounded-[12px]" />
                <div className="flex flex-1 flex-col justify-center gap-3 p-3 md:p-0">
                  <div className="h-4 w-24 rounded bg-neutral-300" />
                  <div className="h-3 w-16 rounded bg-neutral-300" />
                  <div className="h-px w-full bg-neutral-300" />
                  <div className="h-4 w-20 rounded bg-neutral-300" />
                </div>
              </div>
            ))}
          </div>
        )}

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".records-next",
            prevEl: ".records-prev",
          }}
          onSwiper={() => setReady(true)}
          slidesPerView={2.3}
          spaceBetween={10}
          breakpoints={{
            768: {
              slidesPerView: "auto",
              spaceBetween: 10,
            },
          }}
          className={`w-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          {records.map((record, i) => (
            <SwiperSlide key={`${record.game}-${i}`} className="md:max-w-[460px]" style={{ width: "100%" }}>
              
              <div className="overflow-hidden rounded-[16px] bg-neutral-100 md:hidden">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image src={record.image} alt={record.game} fill className="object-cover" />
                  <span className="absolute left-2.5 top-2.5 flex items-center justify-center rounded-md bg-white p-1.5">
                    <HugeiconsIcon icon={Video01Icon} className="size-3 text-zinc-800" />
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 p-3">
                  <div>
                    <p className="text-[14px] font-medium tracking-[0.6px] text-text-main">{record.game}</p>
                    <p className="text-[10px] font-medium tracking-[0.2px] text-text-subtext">{record.provider}</p>
                  </div>
                  <hr className="border-divider-100" />
                  <div>
                    <p className="text-[11px] font-medium text-text-main">Kazanç</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-medium tracking-[0.28px] text-text-subtext">{formatAmount(record.winAmount)}</span>
                      <Image src="/images/currency/try.svg" alt="TRY" width={18} height={18} className="size-[18px] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="hidden w-full gap-[19px] overflow-hidden rounded-[20px] bg-neutral-100 p-3 md:flex">
                <div className="relative size-[134px] shrink-0 overflow-hidden rounded-[12px]">
                  <Image src={record.image} alt={record.game} fill className="object-cover" />
                  <span className="absolute left-2.5 top-2.5 flex items-center justify-center rounded-md bg-white p-1.5">
                    <HugeiconsIcon icon={Video01Icon} className="size-3 text-zinc-800" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[15px] font-medium tracking-[0.6px] text-text-main">{record.game}</p>
                      <p className="text-[10px] font-medium tracking-[0.2px] text-text-subtext">{record.provider}</p>
                    </div>
                    <Link
                      href={record.href ?? "#"}
                      className="flex items-center gap-1 text-[13px] font-medium text-text-subtext transition-colors duration-400 hover:text-text-main"
                    >
                      <HugeiconsIcon icon={PlayCircleIcon} className="size-[18px]" />
                      Hemen oyna
                    </Link>
                  </div>
                  <hr className="border-divider-100" />
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="text-[12px] font-medium text-text-main">Kazanç</p>
                      <div className="flex min-w-0 items-center gap-1.5">
                        <span className="min-w-0 truncate text-[14px] font-medium tracking-[0.28px] text-text-subtext">{formatAmount(record.winAmount)}</span>
                        <Image src="/images/currency/try.svg" alt="TRY" width={22} height={22} className="size-[22px] shrink-0" />
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="text-[12px] font-medium text-text-main">Bahis</p>
                      <div className="flex min-w-0 items-center gap-1.5">
                        <span className="min-w-0 truncate text-[14px] font-medium tracking-[0.28px] text-text-subtext">{formatAmount(record.betAmount)}</span>
                        <Image src="/images/currency/try.svg" alt="TRY" width={22} height={22} className="size-[22px] shrink-0" />
                      </div>
                    </div>
                    <div className="flex min-w-0 shrink-0 flex-col gap-0.5">
                      <p className="text-[12px] font-medium text-text-main">Çarpan</p>
                      <span className="text-[14px] font-medium tracking-[0.28px] text-text-subtext">{record.multiplier.toFixed(3)} x</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default RecordBreakers
