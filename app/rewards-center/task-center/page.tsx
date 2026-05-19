"use client"

import {useState} from "react"
import Image from "next/image"
import { Button, ButtonLink } from "@/components/elements/button"
import {cn} from "@/lib/utils"
import {ArrowRight01Icon, ShoppingBag01Icon} from "@hugeicons-pro/core-stroke-sharp";
import {HugeiconsIcon} from "@/lib/icons";
import {CheckmarkCircle02Icon} from "@hugeicons-pro/core-solid-sharp";
import {Rocket01Icon} from "@hugeicons-pro/core-solid-rounded";
import {Calendar04Icon, InformationCircleIcon} from "@hugeicons-pro/core-stroke-rounded";

type DayStatus = "claimed" | "active" | "locked"

const days: { day: number; points: number; status: DayStatus; bonus?: boolean }[] = [
    {day: 1, points: 100, status: "claimed"},
    {day: 2, points: 100, status: "active"},
    {day: 3, points: 100, status: "active", bonus: true},
    {day: 4, points: 100, status: "locked"},
    {day: 5, points: 100, status: "locked"},
    {day: 6, points: 100, status: "locked"},
    {day: 7, points: 100, status: "locked"},
]

const tasks = [
    {
        id: 1,
        title: "100TRY Yatır",
        desc: "İsteğe bağlı",
        status: "pending" as const,
        date: "17 Ağu 2026 00:00",
        points: 10000
    },
    {
        id: 2,
        title: "200TRY Yatır",
        desc: "İsteğe bağlı",
        status: "collect" as const,
        date: "17 Ağu 2026 00:00",
        points: 10000
    },
    {
        id: 3,
        title: "500TRY slot oyna",
        desc: "Zorunlu Görev",
        status: "claimed" as const,
        date: "17 Ağu 2026 00:00",
        points: 10000
    },
]

export default function GorevMerkeziPage() {
    const [collected, setCollected] = useState<number[]>([])

    return (
        <main className="min-h-screen bg-background-header-menu">
            <div className="bg-background-main">
                {/* Hero */}
                <div className="border-divider-100 border-b">
                    <div className="container ">
                        <div className=" flex flex-col md:flex-row items-center gap-4   py-6 ">
                            <div className="flex flex-col md:flex-row   items-center text-center md:text-left">
                                <Image src="/images/taskcenterGift.svg" alt="" width={85} height={74} className="object-contain"/>
                                <div className="flex-1  md:pl-5">

                                    <h1 className="text-lg font-bold text-text-title">Görev Merkezi</h1>
                                    <p className="mt-1 text-xs text-text-subtext max-w-[370px] md:max-w-[460px]">

                                        Her gün giriş yap, puanları topla. Son gün büyük ödül için oraya git. Ekstra
                                        görevler ile istersen puanını daha da artırabilirsin.
                                    </p>

                                </div>
                            </div>

                            <div className="md:block hidden  shrink-0 text-right ml-auto">

                                <p className="text-[10px] font-medium uppercase tracking-wider text-text-subtext">Kazanılan Puan</p>

                                <div className="mt-1 flex items-center gap-1.5">
                                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">P</span>
                                    <span className="text-lg font-bold text-text-title">10.500P</span>
                                    <span className="text-xs text-primary pt-1">/ 105TRY</span>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                {/* Market Banner */}
                <div className="container">
                    <div className="mb-6 flex items-center justify-between   py-5 ">
                        <div className="flex items-center gap-2.5">
                           <HugeiconsIcon icon={ShoppingBag01Icon} className="text-primary size-9" />
                            <p className="text-xs md: text-sm font-medium text-text-main">Kazandığınız Puanları markette özgürce değerlendirin</p>
                        </div>
                        <ButtonLink href="/rewards-center/market" variant="primary"  size="sm" className=""><span className="hidden md:block">Markete git</span>  <HugeiconsIcon className="md:hidden" icon={ArrowRight01Icon} /></ButtonLink>
                    </div>
                </div>


            </div>
            <div className="container mx-auto px-4 md:py-6 py-3">

                {/* Streak */}
                <div className="mb-12  text-center md:text-left ">
                    <h2 className="mb-1.5 text-base font-bold text-text-title">İstikrarlı bir duruş sergile, ödüllerini al</h2>
                    <p className=" text-xs text-text-subtext max-w-[460px]">Ödüleri almak için her gün düzenli giriş yapman
                        gerekiyor. Her gün giriş yap, büyük hedefe emin adımlarla ilerle.</p>

                    <div className="flex pt-8 md:grid grid-cols-7 gap-4 md:overflow-hidden overflow-x-scroll ">
                        {days.map((d) => (
                            <div key={d.day} className={cn(
                                    "relative flex flex-col items-center bg-background-main rounded-xl p-5 md:min-w-auto min-w-[160px]   h-[250px]",
                                )}
                            >
                                {d.bonus && (
                                    <span className="flex items-center gap-1.5 absolute top-0 left-1/2 -translate-1/2 rounded-full bg-background-body border-background-main border-b border-3  px-2 py-1 text-[11px] font-bold text-white">
                                   <HugeiconsIcon icon={Rocket01Icon} />    2x
                                    </span>
                                )}
                                <p className="mb-1 text-[16px] font-medium text-text-main">Gün {d.day}</p>
                                <p className="mb-2 text-[10px] text-text-subtext">{d.points} Puan kazan</p>

                                <div className="my-2 flex  items-center justify-center ">
                                    <Image
                                        src={d.day === 7 ? "/images/gift.svg" : "/images/award-point.svg"}
                                        alt=""
                                        width={94}
                                        height={94}
                                        className={cn("object-contain", d.status === "locked" && "opacity-50")}
                                    />
                                </div>

                                <div className="mt-auto ">
                                    {d.status === "claimed" && (
                                        <span className="flex items-center justify-center gap-1 text-[13px] mb-1 font-semibold text-semantic-success">
                                            <HugeiconsIcon className="size-5" icon={CheckmarkCircle02Icon} /> Ödül alındı
                                        </span>
                                    )}
                                    {d.status === "active" && (
                                        <Button variant="secondary" size="sm" className="">
                                            Ödülü topla
                                        </Button>
                                    )}
                                    {d.status === "locked" && (
                                        <p className="text-center text-[13px] text-text-main opacity-50 mb-2">Kilit açılış: 17 Oca</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>


                </div>

                {/* Günlük Görevler */}
                <div className=" md:mb-10">

                    <h2 className="mb-4 text-lg font-medium text-text-main text-center md:text-left">Günlük görevler</h2>

                    <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
                        {tasks.map((task) => {
                            const isDone = collected.includes(task.id)
                            const isClaimed = task.status === "claimed" || isDone
                            return (
                                <div key={task.id} className="flex flex-col justify-center gap-5 rounded-xl bg-background-main px-5.5 py-5">

                                    {/* Top row: title + status */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-lg font-medium leading-tight text-text-main">{task.title}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-text-subtext">{task.desc}</span>
                                                {task.desc === "Zorunlu Görev" && (
                                                    <HugeiconsIcon className="size-4 text-icon" icon={InformationCircleIcon} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="shrink-0 pt-0.5">
                                            {task.status === "pending" && !isDone && (
                                                <span className="text-sm text-text-subtext">Görev yapılmadı</span>
                                            )}
                                            {task.status === "collect" && !isDone && (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => setCollected((p) => [...p, task.id])}
                                                >
                                                    Ödülü topla
                                                </Button>
                                            )}
                                            {isClaimed && (
                                                <span className="flex items-center justify-center gap-1 text-[13px] mb-1 font-semibold text-semantic-success">
                                            <HugeiconsIcon className="size-5" icon={CheckmarkCircle02Icon} /> Ödül alındı
                                        </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-divider-100"/>

                                    {/* Bottom row: date + points */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1 text-xs text-text-subtext">
                                                <HugeiconsIcon icon={Calendar04Icon} />
                                                <span>Bitiş Tarihi</span>
                                            </div>
                                            <p className="text-[13px] text-text-main">{task.date}</p>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Image src="/images/currency/try.svg" alt="TRY" width={18} height={18} className="size-[18px] shrink-0" />
                                            <span
                                                className="text-sm font-medium text-text-main">{task.points.toLocaleString("tr-TR")}</span>
                                        </div>
                                    </div>


                                </div>
                            )
                        })}
                    </div>


                </div>
            </div>
        </main>
    )
}
