"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, HeadsetIcon, Cancel01Icon } from "@/lib/icons"
import { Button } from "@/components/elements/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {Cards01Icon, CherryIcon, ManagerIcon, PoolTableIcon} from "@hugeicons-pro/core-solid-rounded";

const categories = [
  { id: "all",       label: "Tümü",    icon: CherryIcon },
  { id: "freespin",  label: "Freespin", icon: ManagerIcon },
  { id: "freebet",   label: "Freebet",  icon: Cards01Icon },
  { id: "diger",     label: "Diğer",    icon: PoolTableIcon },
]

const items = [
  { id: 1,  name: "Gates of Olympus", price: 100, category: "freespin" },
  { id: 2,  name: "Gates of Olympus", price: 100, category: "freespin" },
  { id: 3,  name: "Gates of Olympus", price: 100, category: "freespin" },
  { id: 4,  name: "Gates of Olympus", price: 100, category: "freespin" },
  { id: 5,  name: "Gates of Olympus", price: 100, category: "freebet" },
  { id: 6,  name: "Gates of Olympus", price: 100, category: "freebet" },
  { id: 7,  name: "Gates of Olympus", price: 100, category: "freebet" },
  { id: 8,  name: "Gates of Olympus", price: 100, category: "freebet" },
  { id: 9,  name: "Gates of Olympus", price: 100, category: "diger" },
  { id: 10, name: "Gates of Olympus", price: 100, category: "diger" },
  { id: 11, name: "Gates of Olympus", price: 100, category: "diger" },
  { id: 12, name: "Gates of Olympus", price: 100, category: "diger" },
]

const faqItems = [
  { id: "1", q: "Komisyon oranları yükseltilebilir mi?", a: "Bonus tutarının belirli bir çarpanla oyunlarda kullanılması istenen tutardır. Her promosyonun çevrim şartı kampanya detayında yazar." },
  { id: "2", q: "Bonus talebini nasıl oluştururum?", a: "Bonus tutarının belirli bir çarpanla oyunlarda kullanılması istenen tutardır. Her promosyonun çevrim şartı kampanya detayında yazar." },
  { id: "3", q: "Bonus iptal edilebilir mi?", a: "Bonus tutarının belirli bir çarpanla oyunlarda kullanılması istenen tutardır. Her promosyonun çevrim şartı kampanya detayında yazar." },
  { id: "4", q: "Puan ile ne satın alabilirim?", a: "Bonus tutarının belirli bir çarpanla oyunlarda kullanılması istenen tutardır. Her promosyonun çevrim şartı kampanya detayında yazar." },
  { id: "5", q: "Puanlarım ne zaman geçersiz olur?", a: "Bonus tutarının belirli bir çarpanla oyunlarda kullanılması istenen tutardır. Her promosyonun çevrim şartı kampanya detayında yazar." },
]

const TOTAL_POINTS = 15600
const RATE = 100

export default function MarketPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [convertOpen, setConvertOpen] = useState(false)
  const [convertAmount, setConvertAmount] = useState("")

  const filteredItems = activeCategory === "all"
    ? items
    : items.filter((item) => item.category === activeCategory)

  const tryValue = convertAmount ? (Number(convertAmount) / RATE).toFixed(2) : (TOTAL_POINTS / RATE).toFixed(2)

  return (
    <main className="min-h-screen bg-background-body">
      
      <div className=" pt-6 pb-0">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <div>
            <h1 className="text-lg font-bold text-text-title">Market</h1>
            <p className="mt-1 max-w-[460px] text-xs text-text-subtext">
              Kazandığınız puanları; nakite çevirebilir veya mağazadan dilediğiniz bonusu satın alabilirsiniz.
            </p>
          </div>

          
          <div className="flex items-center justify-between gap-4 rounded-xl bg-background-main p-6  md:min-w-[420px]">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-text-main">Kazanılan Puan</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">P</span>
                <span className="text-xl font-bold text-text-title">10.500P</span>
                <span className="text-sm text-primary">/ 105TRY</span>
              </div>
              <p className="mt-2 text-[11px] text-text-subtext max-w-[370px]">
                Kazandığınız puanı nakite çevirebilir veya marketten dilediğinizi satın alabilirsiniz.
              </p>
            </div>
            <Button variant="primary" size="sm" className="shrink-0" onClick={() => setConvertOpen(true)}>
              Nakite Çevir
            </Button>
          </div>
        </div>
      </div>

      
      {convertOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setConvertOpen(false) }}
        >
          <div className="w-full max-w-[532px] rounded-2xl bg-background-modal p-5">
            
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-bold text-text-title">Nakite Çevir</h2>
              <button
                onClick={() => setConvertOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg bg-background-elements transition-colors hover:bg-neutral-400"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-text-main" />
              </button>
            </div>

            
            <div className="mb-5 flex items-start gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium text-text-subtext">Toplum Puanınız</span>
                <div className="flex items-center gap-1.5">
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary">P</span>
                  <span className="text-[13px] text-text-main">{TOTAL_POINTS.toLocaleString()}</span>
                </div>
              </div>
              <div className="h-9 w-px bg-divider-100" />
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium text-text-subtext">TRY Karşılığı</span>
                <span className="text-[13px] text-text-main">{(TOTAL_POINTS / RATE).toFixed(0)} TRY</span>
              </div>
            </div>

            
            <div className="mb-3 flex items-end gap-3">
              <div className="relative flex-1">
                <label className="mb-1 block pl-1 text-[10px] font-medium text-text-subtext">
                  Çevirmek istediğiniz tutar
                </label>
                <div className="relative flex h-12 items-center rounded-xl border border-element-border bg-background-elements px-4">
                  <input
                    type="number"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    placeholder="Giriniz"
                    className="flex-1 bg-transparent text-sm text-text-main placeholder:text-text-subtext focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => setConvertAmount(String(TOTAL_POINTS))}
                    className="text-[13px] font-semibold text-text-subtext underline underline-offset-2 transition-colors hover:text-text-main"
                  >
                    Tüm puan
                  </button>
                </div>
              </div>
              <Button variant="secondary" className="h-12 shrink-0 px-6">
                Çevir
              </Button>
            </div>

            
            <p className="text-[12px] text-text-subtext">
              <span className="font-medium">100 Puan</span>{" "}
              <span className="text-[13px] text-text-main">1 TRY</span>
            </p>
          </div>
        </div>
      )}

      
      <section className="py-5 md:py-4">
        <div className="container">
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex h-[72px] min-w-[91px] shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl bg-background-elements px-7 py-2 transition-colors",
                  activeCategory === cat.id
                    ? "bg-primary text-text-main"
                    : "text-text-subtitle hover:bg-neutral-100/60",
                )}
              >
                <HugeiconsIcon icon={cat.icon} className="size-6" />
                <span className="text-center text-xs font-medium leading-tight mt-0.5">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-6">

        
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl bg-background-main  p-3.5">
              <div className="relative aspect-[2/1] w-full rounded-xl">
                <Image
                  src="/images/market.jpg"
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="p-2.5">
                <p className="mb-2 text-[16px] font-semibold text-center text-text-title">{item.name}</p>
                <Button variant="secondary" size="sm" className="w-full">
                  {item.price}P İle
                </Button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="max-w-[1100px] mx-auto">
          <h2 className="mb-4 text-base font-semibold text-text-title">Merak edilenler</h2>
          <Accordion type="single" collapsible className="flex w-full flex-col gap-3">
            {faqItems.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="group rounded-xl border border-transparent bg-neutral-500 data-[state=open]:border-primary data-[state=open]:shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]"
              >
                <AccordionTrigger className="min-h-14 cursor-pointer items-center px-4 py-4 text-left text-sm font-semibold text-text-main hover:no-underline focus-visible:ring-offset-0 group-data-[state=open]:text-primary [&_[data-slot=accordion-trigger-icon]]:ml-auto [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-trigger-icon]]:text-icon group-data-[state=open]:[&_[data-slot=accordion-trigger-icon]]:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0 text-sm font-medium leading-relaxed tracking-wide text-text-subtitle">
                  <p>{faq.a}</p>
                  <a
                    href="/destek"
                    className="mt-4 flex w-fit items-center gap-3 rounded-lg bg-action-secondary-default px-4 py-3.5 text-primary-foreground transition-colors hover:bg-action-secondary-disable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <HugeiconsIcon icon={HeadsetIcon} className="size-5 shrink-0" strokeWidth={2} />
                    <span className="text-sm font-medium leading-snug">
                      Bu cevap yeterli gelmedi mi?{" "}
                      <span className="underline underline-offset-2">Canlı Desteğe Bağlanın</span>
                    </span>
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>



      </div>
    </main>
  )
}
