"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@/lib/icons"
import { VIP_LEVELS } from "@/data/vip"
import { VipLevelCard } from "@/components/vip/vip-level-card"
import { SliderNav } from "@/components/elements/slider-nav"
import { cn } from "@/lib/utils"

import "swiper/css"
import "swiper/css/navigation"

export function VipLevelsSection() {
  const [ready, setReady] = useState(false)

  return (
    <section className="container px-4 pb-14 md:px-6 md:pb-20">
      {/* Figma Frame 2924 + 3772: başlık + oklar ~1399px içerik */}
      <div className="mx-auto mb-6 flex w-full max-w-[1401px] items-center justify-between gap-4 md:mb-8">
        <h2 className="text-lg font-semibold leading-6 tracking-wide text-text-title md:text-xl">
          Seviyeler
        </h2>
        <SliderNav
          id="vip-levels"
          prevIcon={ArrowLeft01Icon}
          nextIcon={ArrowRight01Icon}
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-lg border border-divider-100 bg-background-main text-text-main shadow-none",
            "hover:bg-neutral-800 hover:text-text-title",
          )}
          iconClassName="size-5"
          buttonGapClassName="gap-3"
        />
      </div>

      <div className="-mr-4 md:mx-0">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".vip-levels-next",
            prevEl: ".vip-levels-prev",
          }}
          watchOverflow
          breakpointsBase="window"
          onSwiper={() => setReady(true)}
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.8 , spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 6, spaceBetween: 14 },
          }}
          className={cn(
            "vip-levels-swiper mx-auto max-w-[1401px] px-4 pb-1 transition-opacity duration-300 md:px-0",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          {VIP_LEVELS.map((level) => (
            <SwiperSlide key={level.id} className="box-border h-auto">
              <div className="mx-auto flex h-full w-full max-w-[216px] justify-center">
                <VipLevelCard level={level} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
