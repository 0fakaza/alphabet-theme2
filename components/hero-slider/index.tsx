"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation, Autoplay, Pagination, EffectFade} from "swiper/modules"
import {
    HugeiconsIcon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    UserGroupIcon,
} from "@/lib/icons"
import {SliderNav} from "@/components/elements/slider-nav"
import {buttonVariants, ButtonLink} from "@/components/elements/button"
import {cn} from "@/lib/utils"
import {
  pillPagination,
  swiperPillPaginationClassName,
  swiperPillPaginationRootProps,
} from "@/components/elements/swiper-pill-pagination"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const slides = [
    {
        id: 1,
        badge: "/images/pragmatic.png",
        titleParts: [
            {text: "Hemen yatır ", className: "font-normal text-[28px] md:text-[50px]"},
            {text: "60", className: "font-bold text-white text-[40px] md:text-[72px]", icon: true},
            {text: "\nYatırım Bonusunu al", className: "font-bold text-[22px] md:text-[44px]"},
        ],
        description:
            "Yalnızca Pragmatic Play oyunlarında geçerli %60'a varan yatırım Bonusundan faydalanın! Son gün 14 Ağustos!",
        cta: "Yatırım yap",
        ctaHref: "/yatirim",
        image: "/images/slides/slide-1.jpg",
    },
    {
        id: 2,
        badge: "/images/pragmatic.png",
        titleParts: [
            {text: "Hemen yatır ", className: "font-normal text-[28px] md:text-[50px]"},
            {text: "60", className: "font-bold text-white text-[40px] md:text-[72px]", icon: true},
            {text: "\nYatırım Bonusunu al", className: "font-bold text-[22px] md:text-[44px]"},
        ],
        description:
            "Yalnızca Pragmatic Play oyunlarında geçerli %60'a varan yatırım Bonusundan faydalanın! Son gün 14 Ağustos!",
        cta: "Yatırım yap",
        ctaHref: "/yatirim",
        image: "/images/slides/slide-1.jpg",
    },
    {
        id: 3,
        badge: "/images/pragmatic.png",
        titleParts: [
            {text: "Hemen yatır ", className: "font-normal text-[28px] md:text-[50px]"},
            {text: "60", className: "font-bold text-white text-[40px] md:text-[72px]", icon: true},
            {text: "\nYatırım Bonusunu al", className: "font-bold text-[22px] md:text-[44px]"},
        ],
        description:
            "Yalnızca Pragmatic Play oyunlarında geçerli %60'a varan yatırım Bonusundan faydalanın! Son gün 14 Ağustos!",
        cta: "Yatırım yap",
        ctaHref: "/yatirim",
        image: "/images/slides/slide-1.jpg",
    },
]

const HeroSlider = () => {
    const [ready, setReady] = useState(false)
    return (
        <section className="relative w-full">
            <div className="relative">
                
                <div className="relative overflow-hidden ">
                    {!ready && (
                        <div
                            className="pointer-events-none absolute inset-0 z-20 flex min-h-[311px] flex-col justify-end gap-3 bg-[#23282C] px-4 pb-24 pt-14 md:min-h-[460px] md:justify-center md:px-12 md:pb-16 md:pt-0"
                            aria-hidden
                        >
                            <div className="h-8 w-20 animate-pulse rounded-md bg-neutral-600/80 md:h-12 md:w-28" />
                            <div className="space-y-2.5">
                                <div className="h-9 w-[90%] max-w-[260px] animate-pulse rounded-lg bg-neutral-600/80 md:h-14 md:max-w-xl" />
                                <div className="h-9 w-[65%] max-w-[200px] animate-pulse rounded-lg bg-neutral-600/80 md:h-12" />
                            </div>
                            <div className="hidden h-3 max-w-sm animate-pulse rounded bg-neutral-600/60 md:block" />
                        </div>
                    )}
                    <Swiper
                        {...swiperPillPaginationRootProps("mobile")}
                        modules={[Navigation, Autoplay, Pagination, EffectFade]}
                        effect="fade"
                        fadeEffect={{crossFade: true}}
                        speed={800}
                        navigation={{
                            nextEl: ".hero-next",
                            prevEl: ".hero-prev",
                        }}
                        pagination={pillPagination}
                        autoplay={{delay: 5000, disableOnInteraction: false}}
                        loop
                        onSwiper={() => setReady(true)}
                        className={swiperPillPaginationClassName(
                            "h-full w-full",
                            "transition-opacity duration-300",
                            ready ? "opacity-100" : "opacity-0",
                        )}
                    >
                        {slides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div
                                    className="relative flex  h-[311px] items-center overflow-hidden pt-[52px] md:pt-0 md:h-[460px]">
                                    <Image
                                        src="/images/slider.jpg"
                                        alt={slide.titleParts.map((p) => p.text).join("")}
                                        fill
                                        className="hidden object-cover md:block"
                                        priority
                                    />
                    <Image
                      src="/images/slider-mobile.jpg"
                      alt={slide.titleParts.map((p) => p.text).join("")}
                      fill
                      className="block object-cover md:hidden "
                      priority
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 z-10 h-[150px] md:hidden"
                      style={{
                        background: "linear-gradient(0deg, #23282C 0%,  rgba(35, 40, 44, 0.00) 100%)",
                      }}
                    />

                                    <div className="container relative z-10 flex  w-full flex-col mb-6 md:mb-10">
                                        <Image src={slide.badge} alt="" width={120} height={60}
                                               className="mb-4 hidden w-[80px] object-contain md:mb-9 md:block md:w-[120px]"/>
                                        <h2 className="mb-4 flex max-w-[170px] flex-wrap items-center gap-1.5 text-white md:mb-8 md:max-w-[550px] md:gap-2.5">
                                            {slide.titleParts.map((part, i) =>
                                                    part.icon ? (
                                                        <span key={i}
                                                              className={`relative inline-flex items-baseline gap-1 leading-none ml-4 align-baseline md:ml-5 ${part.className}`}>
                              <Image src="/images/percentage.svg" alt="" width={38} height={35}
                                     className="absolute -left-6  top-1/2 -translate-y-1/2 md:-left-6 w-[30px] h-[27px] md:w-[38px] md:h-[35px]  "/>
                                                            {part.text}
                            </span>
                                                    ) : (
                                                        <span key={i}
                                                              className={`inline leading-[0.9] md:leading-[0.6] align-baseline ${part.className}`}>{part.text}</span>
                                                    )
                                            )}
                                        </h2>
                                        <p className="mb-4 hidden max-w-sm text-sm text-white md:mb-7 md:block">
                                            {slide.description}
                                        </p>
                                        <Link
                                            href={slide.ctaHref}
                                            className={cn(
                                                buttonVariants({variant: "primary", size: "sm"}),
                                                "hidden w-fit hover:brightness-95 md:inline-flex",
                                            )}
                                        >
                                            {slide.cta}
                                        </Link>
                                    </div>


                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    
                    <div className=" container absolute right-0 left-0 top-0 z-40 hidden mt-13 gap-2 md:flex justify-end pr-96">
                        <SliderNav
                            id="hero"
                            prevIcon={ArrowLeft01Icon}
                            nextIcon={ArrowRight01Icon}
                            className="flex size-9 items-center justify-center rounded-full bg-white text-black duration-400 transition-colors shadow-[0_4px_14px_0_rgba(0,0,0,0.10)] hover:bg-primary hover:text-white cursor-pointer"
                        />
                    </div>
                </div>

                <div className="container p-0 md:absolute relative inset-0 z-30   pointer-events-none  " >


                    <div style={{backgroundColor:"#23282C"}} className="md:absolute relative md:right-4 p-[15px] md:p-[0]  right-0 top-1/2 md:-translate-y-1/2 flex md:w-[310px] md:flex-col justify-center gap-0 md:gap-3 pointer-events-auto ">

                        
                        <div className="relative flex-1 flex md:h-[190px]  items-center gap-3  rounded-xl  ">
                            <Image
                                src="/images/slider-mini.png"
                                alt="Arkadaşını Getir"
                                width={132}
                                height={181}
                                className="absolute right-3 bottom-0 z-0 shrink-0 object-contain md:w-[132px] w-[85px]"
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 z-[1]"
                            />
                            <div className="relative z-10 flex flex-1 flex-col justify-center pl-0 p-5">
                                <p className="mb-1 text-xs text-primary">Arkadaşını getir</p>
                                <h3 className="mb-1 text-sm md:text-lg  font-bold text-white">%20 discount al</h3>
                                <p className="mb-3 text-xs text-text-subtext hidden md:block max-w-[150px]">
                                    Hem sen hem arkadaşın discount&apos;ını kayıt linkin ile
                                </p>
                <ButtonLink
                  href="/arkadasini-getir"
                  variant="link"
                  className="text-sm "
                style={{color:"#E1E2E3"}}>
                  Hemen davet et
                </ButtonLink>
                            </div>
                        </div>

                        
                        <div className="flex flex-1  flex-col justify-center rounded-xl h-[120px] md:h-[190px] max-w-[200px] md:max-w-[100%]  pl-3 p-3 md:pl-6 md:p-5 " style={{background: "linear-gradient(236deg, #FAC363 29.86%, #FFE1AE 99.57%)"}}>
                            <div className="mb-1.5 md:mb-2 flex items-center gap-2">

                <span className="flex  size-8 items-center justify-center rounded-[6px]" style={{background: "linear-gradient(180deg, #23282C 0%, #34383C 100%)"}}>
                  <Image src="/images/vip/icon.svg" alt="VIP" width={20} height={21} className="contain-size"/>
                </span>
                                <span className="text-[14px] font-semibold text-black">VIP CLUB</span>
                            </div>

                            <h3 className="mb-2 md:text-2xl text-xl  font-bold text-black leading-5 md:leading-7 md:pl-0 pl-9 max-w-[160px]  md:max-w-[150px]">$10.000 ödül kazan</h3>
                            <p className="text-xs hidden md:block text-zinc-800 max-w-[190px]">
                                Seviye atladıkça Cömert VIP ödüllerini topla!
                            </p>
                        </div>

                    </div>


                </div>
            </div>
        </section>
    )
}

export default HeroSlider
