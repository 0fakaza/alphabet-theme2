"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Cancel01Icon, HugeiconsIcon } from "@/lib/icons"
import { Button } from "@/components/elements/button"
import {Calendar04Icon} from "@hugeicons-pro/core-stroke-rounded";

const prizes = [
  { id: 1, label: "Çevrimsiz bonusu",      tag: "Casino Bonusu", img: "/images/luckyCard/1.jpg" },
  { id: 2, label: "%100 hoşgeldin bonusu", tag: "CASINO",        img: "/images/luckyCard/2.jpg" },
  { id: 3, label: "%100 hoşgeldin bonusu", tag: "CASINO",        img: "/images/luckyCard/3.jpg" },
  { id: 4, label: "%100 hoşgeldin bonusu", tag: "CASINO",        img: "/images/luckyCard/4.jpg" },
  { id: 5, label: "%100 hoşgeldin bonusu", tag: "CASINO",        img: "/images/luckyCard/5.jpg" },
  { id: 6, label: "%100 hoşgeldin bonusu", tag: "CASINO",        img: "/images/luckyCard/6.jpg" },
  { id: 7, label: "%11 Kayıp bonusu",      tag: "CASINO",        img: "/images/luckyCard/7.jpg" },
]

const poolPrizes = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  img: `/images/luckyCard/${(i % 10) + 1}.jpg`,
  label: "%100 hoşgeldin bonusu",
  tag: ["SPOR", "CASINO", "POKER"][i % 3],
}))

const CARD_WIDTH = 180
const CARD_GAP = 12
const CARD_TOTAL = CARD_WIDTH + CARD_GAP
// 20 tekrar — animasyon sırasında asla bitmeyecek kadar
const REPEAT = 20
const extendedPrizes = Array.from({ length: REPEAT }, () => prizes).flat()
// Başlangıç: ortadan başla (ilk 10 tur yeterli)
const INITIAL_POS = prizes.length * (REPEAT / 2) * CARD_TOTAL

export default function SansCarki() {
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState<typeof prizes[0] | null>(null)
  const [spinCount, setSpinCount] = useState(1)
  const stripRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number | null>(null)
  const posRef = useRef(INITIAL_POS)

  // İlk render'da başlangıç pozisyonunu uygula
  useEffect(() => {
    if (stripRef.current) {
      stripRef.current.style.transform = `translateX(-${INITIAL_POS}px)`
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  const handleSpin = () => {
    if (spinning || spinCount <= 0) return
    setSpinning(true)
    setWinner(null)

    const winIndex = Math.floor(Math.random() * prizes.length)
    const winnerPrize = prizes[winIndex]

    const startPos = posRef.current
    // paddingLeft = 50% - CARD_WIDTH/2 sayesinde card[N] ortalamak için
    // translateX = N * CARD_TOTAL yeterli.
    // Şu an hangi karttayız (loop içinde)?
    const currentCardOffset = startPos % (prizes.length * CARD_TOTAL)
    const targetCardOffset  = winIndex * CARD_TOTAL
    // Kazanana kalan mesafe — her zaman ileri gider
    const toWinner = ((targetCardOffset - currentCardOffset) + prizes.length * CARD_TOTAL) % (prizes.length * CARD_TOTAL)
    const totalDistance = 4 * prizes.length * CARD_TOTAL + toWinner

    let startTime: number | null = null
    const duration = 4000

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)

      const currentPos = startPos + totalDistance * eased
      posRef.current = currentPos

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(-${currentPos}px)`
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setSpinning(false)
        setSpinCount((c) => c - 1)
        setTimeout(() => setWinner(winnerPrize), 200)
      }
    }

    animRef.current = requestAnimationFrame(animate)
  }

  return (
    <main className="min-h-screen bg-background-body">
      {/* Hero */}
      <div className="bg-background-main py-7">
        <div className="container ">
          <div className=" flex flex-col md:flex-row items-center gap-4    ">
            <div className="flex flex-col md:flex-row   items-center text-center md:text-left">
              <Image src="/images/taskcenterGift.svg" alt="" width={85} height={74} className="object-contain"/>
              <div className="flex-1  md:pl-5">

                <h1 className="text-lg font-bold text-text-title">Bonus kartını almak için çevir</h1>
                <p className="mt-1 text-xs text-text-subtext max-w-[370px] md:max-w-[460px]">
                  1052 üyemiz, toplamda 14.520 kişiye referans oldu ve ortalama %21,62 oran ile kayıplardan ₺15.520.5120,42 kazandı.
                </p>

              </div>
            </div>


          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-6">



        {/* Wheel / Strip */}
        <div className="mb-4  ">
          {/* Arrow indicator */}
          <div className="relative  flex justify-center z-20">
            <div className="flex flex-col items-center translate-y-6">
             <Image src="/images/icons/point.svg" alt={""} width="40" height="59" className="object-contain"  />
            </div>
          </div>

          {/* Strip container */}
          <div className="relative overflow-hidden">
            {/* Sol gölge */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background-body to-transparent" />
            {/* Sağ gölge */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background-body to-transparent" />

            {/*
              paddingLeft = 50% - CARD_WIDTH/2
              → kart[N] ortalamak için translateX = N * CARD_TOTAL yeterli,
                modulo veya container width ölçümüne gerek yok.
            */}
            <div
              className="overflow-hidden"
              style={{ paddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)` }}
            >
              <div
                ref={stripRef}
                className="flex gap-3 transition-none will-change-transform"
                style={{ width: `${extendedPrizes.length * CARD_TOTAL}px` }}
              >
                {extendedPrizes.map((prize, idx) => (
                  <div
                    key={idx}
                    className="relative shrink-0 overflow-hidden rounded-md"
                    style={{ width: CARD_WIDTH, height: 120 }}
                  >
                    <Image
                      src={prize.img}
                      alt={prize.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>{/* overflow-hidden + paddingLeft */}
          </div>{/* relative */}

          {/* Spin Button */}
          <div className="mt-5 flex flex-col items-center gap-1.5">
            <button
              onClick={handleSpin}
              disabled={spinning || spinCount <= 0}
              className={cn(
                "flex h-13 items-center cursor-pointer gap-2 rounded-xl px-6 text-sm font-bold text-white transition-all",
                spinning || spinCount <= 0
                  ? "cursor-not-allowed bg-background-elements text-text-subtext"
                  : "bg-primary hover:opacity-90 active:scale-95",
              )}
            >
              {spinning ? "Çevriliyor..." : `Hemen Çevir (${spinCount})`}
            </button>
            <p className="text-xs text-text-subtext">{spinCount} Hakkın bulunuyor</p>
          </div>
        </div>

        {/* Ödül Havuzu */}
        <div className="">
          <h2 className="mb-4 text-base font-bold text-text-title">Ödül Havuzu</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-6 md:grid-cols-7">
            {poolPrizes.map((prize) => (
              <div
                key={prize.id}
                className="relative overflow-hidden rounded-md"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={prize.img}
                  alt={prize.label}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kazandınız Popup */}
      {winner && (
        <div className="fixed inset-0 p-4 z-[300] flex items-center justify-center bg-black/50 backdrop-blur-xs" onClick={() => setWinner(null)}>

          <div className="w-full max-w-[420px] overflow-hidden rounded-2xl bg-background-modal shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-base font-bold text-text-title">Kazandınız</h2>
              <button onClick={() => setWinner(null)} className="text-text-subtext hover:text-text-main cursor-pointer">
                <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
              </button>
            </div>

            {/* Prize Card */}
            <div className="relative mx-4 overflow-hidden rounded-2xl" style={{ aspectRatio: "3/2" }}>
              <Image
                src={winner.img}
                alt={winner.label}
                fill
                className="object-cover"
              />
            </div>

            <div className="px-8 py-5">
              <div className="mb-3 flex items-center justify-center md:justify-start text-center md:text-left gap-2 text-xs text-text-subtext">
                <HugeiconsIcon size={16} className="text-icon" icon={Calendar04Icon} />
                <span>Son geçerlilik tarihi</span>
                <span className=" text-text-main">17 Ağu 2026 00:00</span>
              </div>
              <p className="mb-4 text-sm font-semibold text-text-title text-center md:text-left">
                Casinoda geçerli {winner.label} kazandınız
              </p>
              <div className="flex items-center justify-center">
                <Button variant="tertiary" size="sm" className="w-fit " onClick={() => setWinner(null)}>
                  Kapat
                </Button>
              </div>
            </div>
          </div>

        </div>
      )}
    </main>
  )
}
