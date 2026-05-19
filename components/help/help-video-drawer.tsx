"use client"

import {useEffect, useState} from "react"
import Image from "next/image"
import {createPortal} from "react-dom"
import {HugeiconsIcon, Cancel01Icon} from "@/lib/icons"
import {cn} from "@/lib/utils"
import type { HelpDepositMethod } from "@/data/help"
import {PlayCircleIcon} from "@hugeicons-pro/core-solid-sharp";

type HelpVideoDrawerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    method: HelpDepositMethod | null
}

function embedUrlWithAutoplay(url: string) {
    try {
        const u = new URL(url)
        if (!u.searchParams.has("autoplay")) u.searchParams.set("autoplay", "1")
        return u.toString()
    } catch {
        return url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`
    }
}

export function HelpVideoDrawer({open, onOpenChange, method}: HelpVideoDrawerProps) {
    const [videoPopupOpen, setVideoPopupOpen] = useState(false)

    useEffect(() => {
        if (!open) setVideoPopupOpen(false)
    }, [open])

    useEffect(() => {
        setVideoPopupOpen(false)
    }, [method?.id])

    useEffect(() => {
        if (typeof document === "undefined") return
        if (!open) return
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = prev
        }
    }, [open])

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return
            if (videoPopupOpen) setVideoPopupOpen(false)
            else onOpenChange(false)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open, onOpenChange, videoPopupOpen])

    if (typeof document === "undefined") return null
    if (!open || !method) return null

    return createPortal(
        <>
            <div className="fixed inset-0 z-[90]">
                <button
                    type="button"
                    className="absolute inset-0 bg-background-modal-alpha"
                    aria-label="Kapat"
                    onClick={() => onOpenChange(false)}
                />
                <aside
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="help-drawer-title"
                    className={cn(
                        "absolute right-0 top-[58px] flex h-[calc(100dvh-58px-env(safe-area-inset-bottom,0px))] w-full max-w-[min(100%,440px)] flex-col",
                        "overflow-hidden rounded-3xl",
                        "shadow-[-8px_0_24px_rgba(0,0,0,0.25)]",
                        "animate-in slide-in-from-right duration-300",
                        "bg-background-modal-100",
                    )}
                >
                    <div
                        className="flex shrink-0 items-start justify-between gap-4 border-b border-divider-100 p-5 pr-4">
                        <div className="flex min-w-0 flex-1 gap-3">
                            <div
                                className="flex  shrink-0 items-center justify-center rounded-full "
                                aria-hidden
                            >
                                <Image
                                    src={method.videoCardIcon}
                                    alt=""
                                    width={52}
                                    height={52}
                                    className=" object-contain"
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-text-subtext">{method.drawerEyebrow}</p>
                                <h2 id="help-drawer-title"
                                    className="mt-1 text-lg font-semibold tracking-wide text-text-main">
                                    {method.title}
                                </h2>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-action-teritory-default text-action-teritory-on-teritory transition-colors hover:bg-action-teritory-hover"
                            aria-label="Kapat"
                        >
                            <HugeiconsIcon icon={Cancel01Icon} className="size-5"/>
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-5">
                        <div className="relative min-h-[196px] overflow-hidden rounded-2xl px-4 py-4">
                            <Image
                                src="/images/payments/bg-payments1.jpg"
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw, 440px"
                                className="object-cover object-center"
                                aria-hidden
                            />
                            <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" aria-hidden/>
                            <div className="relative z-[2]">
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5">
                                    <Image
                                        src={method.videoCardIcon}
                                        alt=""
                                        width={100}
                                        height={100}
                                        className="size-[100px] shrink-0 object-contain"
                                    />
                                    <p className="min-w-0 flex-1 text-center text-base font-medium leading-snug text-white sm:text-left">
                                        {method.videoCardTitle}
                                    </p>
                                </div>
                                <div className="mt-6 flex items-end justify-between gap-3 pl-1">
                                    <div className=" gap-2 pl-3">
                                        <Image src="/images/logo-light.svg" alt="" width={72} height={16}
                                               className="h-4 w-auto "/>
                                        <span
                                            className="text-xs font-medium text-white/85">Yatırım / çekim çok kolay!</span>
                                    </div>
                                    {method.videoEmbedUrl ? (
                                        <button
                                            type="button"
                                            onClick={() => setVideoPopupOpen(true)}
                                            className=" cursor-pointer inline-flex grup hover:text-primary shrink-0 items-center gap-2  px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors "
                                        >
                    <HugeiconsIcon icon={PlayCircleIcon} className="size-10 group-hover:text-primary"/>
                                            Video izle
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-8">
                            {method.steps.map((step, i) => (
                                <div key={i}>
                                    <h3 className="text-base font-semibold text-text-main">{step.title}</h3>
                                    <p className="mt-2 text-sm font-medium leading-relaxed tracking-wide text-text-subtitle">
                                        {step.body}
                                    </p>
                                    {step.imageSrc ? (
                                        <Image
                                            src={step.imageSrc}
                                            alt=""
                                            width={1200}
                                            height={800}
                                            className="mt-4 h-auto w-full rounded-lg opacity-90"
                                        />
                                    ) : (
                                        <div
                                            className="mt-4 h-36 w-full rounded-lg bg-neutral-800/80 ring-1 ring-white/5"
                                            aria-hidden
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {videoPopupOpen && method.videoEmbedUrl ? (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
                    role="presentation"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        aria-label="Video penceresini kapat"
                        onClick={() => setVideoPopupOpen(false)}
                    />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={method.videoCardTitle}
                        className="relative z-[1] w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10 animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setVideoPopupOpen(false)}
                            className="absolute right-3 top-3 z-[2] flex size-9 items-center justify-center rounded-md bg-black/60 text-white transition-colors hover:bg-black/80"
                            aria-label="Kapat"
                        >
                            <HugeiconsIcon icon={Cancel01Icon} className="size-4"/>
                        </button>
                        <div className="aspect-video w-full">
                            <iframe
                                title={method.videoCardTitle}
                                src={embedUrlWithAutoplay(method.videoEmbedUrl)}
                                className="size-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </>,
        document.body,
    )
}
