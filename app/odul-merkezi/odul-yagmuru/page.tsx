"use client"

import {useState} from "react"
import Image from "next/image"
import {cn} from "@/lib/utils"
import {HugeiconsIcon} from "@/lib/icons"
import {
    Calendar01Icon,
    Clock01Icon,
    CheckmarkCircle01Icon,
    Cancel01Icon,
} from "@/lib/icons"
import {Button} from "@/components/elements/button"
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {TabList} from "@/components/elements/tab-list"
import {MoneyBag01Icon} from "@hugeicons-pro/core-stroke-rounded";
import {ArrowRight01Icon} from "@hugeicons-pro/core-stroke-standard";

type Tab = "active" | "past"

type Tournament = {
    id: number
    imageLabel: string
    title: string
    start: string
    end: string
    minDeposit: string
    tab: string
    joined: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tournaments = [
    {
        id: 1,
        imageLabel: "450TRY Yazın görevin",
        title: "10 Kişiye ödül! 500.000TRY ödül havuzu",
        start: "17 Ağu 2026 00:00",
        end: "17 Ağu 2026 00:00",
        minDeposit: "500TRY",
        tab: "active",
        joined: true
    },
    {
        id: 2,
        imageLabel: "450TRY Yazın görevin",
        title: "10 Kişiye ödül! 500.000TRY ödül havuzu",
        start: "17 Ağu 2026 00:00",
        end: "17 Ağu 2026 00:00",
        minDeposit: "500TRY",
        tab: "active",
        joined: false
    },
    {
        id: 3,
        imageLabel: "450TRY Yazın görevin",
        title: "10 Kişiye ödül! 500.000TRY ödül havuzu",
        start: "17 Ağu 2026 00:00",
        end: "17 Ağu 2026 00:00",
        minDeposit: "500TRY",
        tab: "active",
        joined: true
    },
    {
        id: 4,
        imageLabel: "450TRY Yazın görevin",
        title: "10 Kişiye ödül! 500.000TRY ödül havuzu",
        start: "17 Ağu 2026 00:00",
        end: "17 Ağu 2026 00:00",
        minDeposit: "500TRY",
        tab: "past",
        joined: true
    },
]

export default function OdulYagmuruPage() {
    const [onlyJoined, setOnlyJoined] = useState(false)
    const [detailTournament, setDetailTournament] = useState<Tournament | null>(null)

    return (
        <main className="min-h-screen bg-background-body">
            {/* Hero — şans çarkı ile aynı stil */}
            <div className="bg-background-main py-7">
                <div className="container">
                    <div className="flex flex-col md:flex-row text-center md:text-left  items-center gap-4">
                        <Image
                            src="/images/taskcenterGift.svg"
                            alt=""
                            width={85}
                            height={74}
                            className="shrink-0 object-contain"
                        />
                        <div>
                            <h1 className="text-lg font-bold text-text-title">Ödül Yağmuru</h1>
                            <p className="mt-1 max-w-[380px] md:max-w-[460px] text-xs text-text-subtext">
                                Büyük ödülü yakalamak için; yatırım görevlerini yap ve katıl. Sonuçları bekle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-6">
                <Tabs defaultValue="active">
                    {/* Tab listesi + checkbox */}
                    <div className="mb-5 flex flex-wrap items-center  gap-3">
                        <TabList
                            tabs={[
                                {value: "active", label: "Aktif Görevler", icon: CheckmarkCircle01Icon},
                                {value: "past", label: "Geçmiş Görevler", icon: Clock01Icon},
                            ]}
                        />

                        <label
                            className="flex ml-0 md:ml-4 mt-2 md:mt-0 cursor-pointer items-center gap-2 text-sm text-text-subtext"
                            onClick={() => setOnlyJoined((p) => !p)}
                        >
              <span
                  className={cn(
                      "flex size-4 items-center justify-center rounded border transition-colors",
                      onlyJoined ? "border-primary bg-primary" : "border-divider-100 bg-background-elements",
                  )}
              >
                {onlyJoined && <span className="text-[10px] text-white">✓</span>}
              </span>
                            Yalnızca katıldıklarım
                        </label>
                    </div>

                    {(["active", "past"] as Tab[]).map((tabValue) => (
                        <TabsContent key={tabValue} value={tabValue}>
                            <div className="flex flex-col gap-4">
                                {tournaments
                                    .filter((t) => t.tab === tabValue && (!onlyJoined || t.joined))
                                    .map((t) => (
                                        <div
                                            key={t.id}
                                            className="flex flex-col md:flex-row overflow-hidden rounded-xl hover:bg-background-modal p-3 ring-1 ring-divider-100"
                                        >
                                            {/* Sol: Görsel */}
                                            <div
                                                className="relative h-[200px] w-full md:w-2/5  max-w-[430px] shrink-0 rounded-2xl">
                                                <Image src="/images/awars-card.jpg" alt={t.title} fill
                                                       className="object-cover rounded-xl"/>
                                                <div className="absolute pt-3 top-1/2 -translate-y-1/2 left-7">
                                                    <span className=" text-[12px]  text-white">{t.imageLabel}</span>
                                                    <div className=" pb-4 pt-5">
                                                        <p className=" text-[20px] font-bold leading-tight text-white max-w-[265px]">10
                                                            Kişiye ödül! 500.000TRY ödül havuzu</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sağ: Bilgi */}
                                            <div
                                                className="flex flex-1 flex-col justify-center gap-5  px-3 md:px-7 py-6 relative">
                                                <h3 className="text-base font-semibold text-text-title">{t.title}</h3>

                                                <div className="flex flex-wrap md:flex-nowrap items-center gap-6">

                                                    <div className="w-[38%] md:w-auto flex flex-col gap-1">
                                                        <div
                                                            className="flex items-center gap-1.5 text-xs text-text-subtext">
                                                            <HugeiconsIcon icon={Calendar01Icon}
                                                                           className="size-4 text-icon"/>
                                                            <span>Başlangıç Tarihi</span>
                                                        </div>
                                                        <p className="text-sm font-medium text-text-main">{t.start}</p>
                                                    </div>

                                                    <HugeiconsIcon icon={ArrowRight01Icon}
                                                                   className="size-6 shrink-0 text-icon"/>

                                                    <div className="w-[38%] md:w-auto flex flex-col gap-1">
                                                        <div
                                                            className="flex items-center gap-1.5 text-xs text-text-subtext">
                                                            <HugeiconsIcon icon={Calendar01Icon}
                                                                           className="size-4 text-icon"/>
                                                            <span>Bitiş Tarihi</span>
                                                        </div>
                                                        <p className="text-sm font-medium text-text-main">{t.end}</p>
                                                    </div>

                                                    <div
                                                        className="flex items-center gap-3 pt-4 md:pt-0 md:border-0 border-t border-divider-100 w-full md:w-auto">
                                                        <div
                                                            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background-elements">
                                                            <HugeiconsIcon icon={MoneyBag01Icon}
                                                                           className="size-6 text-icon"/>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-xs text-text-subtext">Minimum Yatırım
                                                                Şartı</p>
                                                            <p className="text-sm font-semibold text-text-main">{t.minDeposit}</p>
                                                        </div>
                                                    </div>

                                                </div>

                                                <Button
                                                    variant="tertiary"
                                                    size="sm"
                                                    className="md:relative absolute right-6 w-fit bottom-5 md:right-auto md:bottom-auto"
                                                    onClick={() => setDetailTournament(t)}
                                                >
                                                    Detaylı Bilgi
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                {tournaments.filter((t) => t.tab === tabValue && (!onlyJoined || t.joined)).length === 0 && (
                                    <div
                                        className="flex items-center justify-center rounded-2xl bg-background-modal py-16 text-sm text-text-subtext">
                                        Bu sekme için görev bulunmuyor.
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            {/* Ödül Detayları Popup */}
            {detailTournament && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={(e) => { if (e.target === e.currentTarget) setDetailTournament(null) }}
                >
                    <div className="w-full max-w-[626px] rounded-2xl bg-background-modal p-5 flex flex-col gap-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-text-title">Ödül Detayları</h2>
                            <button
                                onClick={() => setDetailTournament(null)}
                                className="flex size-8 items-center justify-center rounded-lg bg-background-elements transition-colors hover:bg-neutral-400"
                            >
                                <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-text-main" />
                            </button>
                        </div>

                        {/* Hero image */}
                        <div className="relative h-[200px] w-full overflow-hidden rounded-2xl">
                            <Image
                                src="/images/awars-card.jpg"
                                alt={detailTournament.title}
                                fill
                                className="object-cover"
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(-90deg, rgba(27,30,45,0) 0%, rgb(27,30,45) 120%)" }}
                            />
                            <div className="absolute inset-0 flex flex-col justify-center pl-10">
                                <p className="text-sm text-white/80">{detailTournament.imageLabel}</p>
                                <p className="mt-4 text-2xl font-extrabold leading-tight text-white max-w-[280px]">
                                    10 Kişiye ödül!<br />500.000TRY ödül havuzu
                                </p>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-4 px-3 pt-2">
                            {/* Dates + min deposit */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-xs text-text-subtext">
                                        <HugeiconsIcon icon={Calendar01Icon} className="size-4 text-icon" />
                                        <span>Başlangıç Tarihi</span>
                                    </div>
                                    <p className="text-sm text-text-main">{detailTournament.start}</p>
                                </div>

                                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3 shrink-0 text-icon" />

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-xs text-text-subtext">
                                        <HugeiconsIcon icon={Calendar01Icon} className="size-4 text-icon" />
                                        <span>Bitiş Tarihi</span>
                                    </div>
                                    <p className="text-sm text-text-main">{detailTournament.end}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background-elements">
                                        <HugeiconsIcon icon={MoneyBag01Icon} className="size-6 text-icon" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs text-text-subtext">Minimum Yatırım Şartı</p>
                                        <p className="text-sm font-semibold text-text-main">{detailTournament.minDeposit}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-divider-100" />

                            {/* Title */}
                            <h3 className="text-xl font-semibold text-text-title">{detailTournament.title}</h3>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-text-subtext">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it
                            </p>

                            {/* Kapat */}
                            <div className="flex justify-center pt-1">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setDetailTournament(null)}
                                >
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
