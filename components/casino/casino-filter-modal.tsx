"use client"

import { useCallback, useEffect, useId, useMemo, useState } from "react"
import Image from "next/image"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/elements/button"
import { HugeiconsIcon } from "@/lib/icons"
import type { IconSvgElement } from "@/lib/icons"
import { Search01Icon, StarIcon, Cancel01Icon } from "@/lib/icons"

type ProviderRow = {
  id: string
  name: string
  games: number
  logo: string
}

export type FeatureFilterDef = {
  id: string
  label: string
  /** 2 sütun gridde tam satır (Figma: Çok Konuşuanlar) */
  fullWidth?: boolean
  icon: IconSvgElement
}

type CasinoFilterModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  features: readonly FeatureFilterDef[]
  /** Başka sekmede seçili özellikler (çoklu) */
  selectedFeatures: Set<string>
  onSelectedFeaturesChange: (s: Set<string>) => void
  providers: readonly ProviderRow[]
  providerQuery: string
  onProviderQueryChange: (q: string) => void
  selectedProviderIds: Set<string>
  onSelectedProviderIdsChange: (s: Set<string>) => void
  /**
   * Taslak özellik + sağlayıcı setleriyle eşleşen oyun sayısı
   * (üst barda arama, aktif lobby sekmesi, favori listesi aynı kalmalı).
   */
  getResultCount: (draftFeatures: Set<string>, draftProviders: Set<string>) => number
  onApply: () => void
}

export function CasinoFilterModal({
  open,
  onOpenChange,
  features,
  selectedFeatures,
  onSelectedFeaturesChange,
  providers,
  providerQuery,
  onProviderQueryChange,
  selectedProviderIds,
  onSelectedProviderIdsChange,
  getResultCount,
  onApply,
}: CasinoFilterModalProps) {
  const [mounted, setMounted] = useState(false)
  const titleId = useId()
  const descriptionId = useId()

  const [draftFeatures, setDraftFeatures] = useState<Set<string>>(() => new Set(selectedFeatures))
  const [draftProviders, setDraftProviders] = useState<Set<string>>(() => new Set(selectedProviderIds))
  const [localProviderQ, setLocalProviderQ] = useState(providerQuery)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      setDraftFeatures(new Set(selectedFeatures))
      setDraftProviders(new Set(selectedProviderIds))
      setLocalProviderQ(providerQuery)
    }
  }, [open, selectedFeatures, selectedProviderIds, providerQuery])

  const toggleFeature = useCallback(
    (id: string) => {
      setDraftFeatures((prev) => {
        const n = new Set(prev)
        if (n.has(id)) n.delete(id)
        else n.add(id)
        return n
      })
    },
    [],
  )

  const toggleProvider = useCallback(
    (id: string) => {
      setDraftProviders((prev) => {
        const n = new Set(prev)
        if (n.has(id)) n.delete(id)
        else n.add(id)
        return n
      })
    },
    [],
  )

  const clearAll = useCallback(() => {
    setDraftFeatures(new Set())
    setDraftProviders(new Set())
  }, [])

  const filteredProviders = providers.filter(
    (p) =>
      !localProviderQ.trim() || p.name.toLowerCase().includes(localProviderQ.trim().toLowerCase()),
  )

  const applyPreviewCount = useMemo(
    () => getResultCount(draftFeatures, draftProviders),
    [getResultCount, draftFeatures, draftProviders],
  )

  const handleCancel = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const handleApply = useCallback(() => {
    onSelectedFeaturesChange(draftFeatures)
    onSelectedProviderIdsChange(draftProviders)
    onProviderQueryChange(localProviderQ)
    onApply()
    onOpenChange(false)
  }, [
    draftFeatures,
    draftProviders,
    localProviderQ,
    onApply,
    onOpenChange,
    onProviderQueryChange,
    onSelectedFeaturesChange,
    onSelectedProviderIdsChange,
  ])

  useEffect(() => {
    if (typeof document === "undefined") return
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  if (!mounted || !open) return null

  return createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
            <button
              type="button"
              className="absolute inset-0 bg-black/50"
              tabIndex={-1}
              aria-label="Filtre penceresini kapat"
              onClick={handleCancel}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="relative z-10 flex max-h-[min(90vh,700px)] w-full max-w-[min(100vw-1.5rem,820px)] flex-col overflow-hidden rounded-[20px] border border-[#3f454a] bg-[#23282C] text-text-main shadow-[0px_2px_3px_0px_rgba(0,0,0,0.05)]"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-divider-100 px-5 py-3 pr-2 md:px-6 md:py-4">
                <h2 id={titleId} className="text-sm font-medium tracking-wide text-text-main">
                  Filtrele
                </h2>
                <p id={descriptionId} className="sr-only">
                  Oyun filtrelerini ve sağlayıcıları seçin
                </p>
                <button
                  type="button"
                  className="flex size-8 shrink-0 items-center justify-center rounded-md border border-element-border p-2 text-text-title transition-colors hover:bg-action-primary-alpha"
                  onClick={handleCancel}
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
                </button>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 divide-y divide-divider-100 overflow-hidden md:grid-cols-2 md:divide-x md:divide-y-0">
                {/* Sol: özellik karo grid */}
                <div className="min-h-0 min-w-0 space-y-3 overflow-y-auto p-4 md:max-h-[min(50vh,420px)]">
                  <p className="text-sm font-medium tracking-wide text-text-main">Özellikler</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {features.map((f) => {
                      const on = draftFeatures.has(f.id)
                      const Ic = f.icon
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => toggleFeature(f.id)}
                          className={cn(
                            "flex flex-col items-center justify-center gap-1.5 rounded-xl p-3 text-center transition-colors",
                            f.fullWidth && "col-span-2",
                            on
                              ? "border-2 border-primary bg-primary/15 text-primary"
                              : "bg-[#2d3236] text-text-subtitle",
                          )}
                        >
                          <HugeiconsIcon
                            icon={Ic}
                            className={cn("size-6", on ? "text-primary" : "text-[#aab0b4]")}
                          />
                          <span className="text-[10px] font-medium leading-tight tracking-wide">{f.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Sağ: sağlayıcılar */}
                <div className="flex min-h-0 min-w-0 flex-col gap-3 p-4 md:max-h-[min(50vh,420px)]">
                  <p className="text-sm font-medium tracking-wide text-text-main">Sağlayıcılar</p>
                  <div className="relative shrink-0">
                    <HugeiconsIcon
                      icon={Search01Icon}
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-subtitle"
                    />
                    <input
                      type="search"
                      value={localProviderQ}
                      onChange={(e) => setLocalProviderQ(e.target.value)}
                      placeholder="Sağlayıcı"
                      className="h-12 w-full rounded-xl border border-element-border bg-background-elements pl-9 pr-3 text-sm text-text-main outline-none placeholder:text-text-subtitle focus-visible:border-primary"
                      aria-label="Sağlayıcıda ara"
                    />
                  </div>
                  <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
                    <div className="grid grid-cols-2 gap-2">
                      {filteredProviders.map((p) => {
                        const on = draftProviders.has(p.id)
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => toggleProvider(p.id)}
                            className={cn(
                              "flex min-h-14 items-center gap-2 rounded-lg border border-divider-100 px-2.5 py-2.5 text-left transition-colors",
                              on
                                ? "border-[#5263ff] bg-[rgba(82,99,255,0.08)]"
                                : "hover:border-neutral-500",
                            )}
                          >
                            <div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-[#f0f3f6]">
                              <Image
                                src={p.logo}
                                alt=""
                                width={32}
                                height={32}
                                className="size-full object-contain p-0.5"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-text-main">{p.name}</p>
                              <p className="text-[10px] text-text-subtitle underline decoration-solid">
                                {p.games} games
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 border-t border-divider-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 md:px-6">
                <button
                  type="button"
                  onClick={clearAll}
                  className="self-start text-left text-[13px] font-semibold text-text-subtitle underline decoration-solid transition-colors hover:text-text-main"
                >
                  Seçimleri temizle
                </button>
                <div className="flex flex-1 items-center justify-end gap-2 sm:flex-initial sm:gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="h-[38px] min-w-24 border-neutral-500 px-4"
                    onClick={handleCancel}
                  >
                    Vazgeç
                  </Button>
                  <Button variant="primary" type="button" className="h-[38px] min-w-28 px-4" onClick={handleApply}>
                    Uygula | {applyPreviewCount.toLocaleString("tr-TR")} oyun
                  </Button>
                </div>
              </div>
            </div>
          </div>,
    document.body,
  )
}
