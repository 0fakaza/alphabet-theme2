"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import {
  HugeiconsIcon,
  Cancel01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@/lib/icons"
import { Invoice04Icon, ReverseWithdrawal01Icon } from "@hugeicons-pro/core-solid-sharp"
import { Button } from "@/components/elements/button"
import { useWalletModal, type WalletMode } from "@/components/providers/wallet-modal-provider"

const balances = [
  { key: "main", label: "Bakiye", value: "₺15.520.125,52" },
  { key: "bonus", label: "Bonus Bakiye", value: "₺100" },
  { key: "freebet", label: "Freebet Bakiye", value: "₺100" },
] as const

type WalletActionCardProps = {
  mode: WalletMode
  selected: boolean
  onSelect: () => void
}

function WalletActionCard({ mode, selected, onSelect }: WalletActionCardProps) {
  const isDeposit = mode === "deposit"

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative cursor-pointer flex min-h-[227px] w-full min-w-0 flex-1 flex-col items-center overflow-hidden rounded-2xl border border-white/10 px-4 pb-6 pt-4 text-center transition-all sm:max-w-[341px]",
        "bg-[#22272c] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.1)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-20",
        isDeposit
          ? "before:bg-[radial-gradient(ellipse_at_20%_0%,#9bbc14_0%,transparent_55%)] hover:ring-2 hover:ring-[#9bbc14]/40"
          : "before:bg-[radial-gradient(ellipse_at_20%_0%,#e94b4b_0%,transparent_55%)] hover:ring-2 hover:ring-[#f40000]/40",
        selected &&
          (isDeposit ? "ring-2 ring-[#9bbc14]" : "ring-2 ring-[#f40000]")
      )}
    >
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[129px] w-[183px] -translate-x-1/2 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
        aria-hidden
      />

      {!isDeposit && (
        <p className="absolute right-3 top-3 text-[11px] tracking-wide text-white/60">
          Tahmini süreler <span className="text-white">5dk</span>
        </p>
      )}

      <div
        className={cn(
          "relative z-10 mt-6 flex size-20 items-center justify-center rounded-full",
          isDeposit
            ? "bg-[#9bbc14] shadow-[0_24px_54px_rgba(155,188,20,0.4)]"
            : "bg-[#f40000] shadow-[0_24px_54px_rgba(244,0,0,0.4)]"
        )}
      >
        <HugeiconsIcon
          icon={isDeposit ? Invoice04Icon : ReverseWithdrawal01Icon}
          className="size-10 text-white"
        />
      </div>

      <div className="relative z-10 mt-6 flex max-w-[263px] flex-col gap-1.5">
        <p className="text-[15px] font-medium tracking-wide text-white">
          {isDeposit ? "Para yatırmak istiyorum" : "Para çekmek istiyorum"}
        </p>
        <p className="text-xs leading-[17px] tracking-wide text-white/60">
          {isDeposit ? (
            <>
              20sn&apos;ye varan yatırım süreleri ile hemen yatır
              <br />
              bonuslar ile kazançları katlayarak başla.
            </>
          ) : (
            "Hızlı, kolay, zahmetsiz çekim yapın."
          )}
        </p>
      </div>
    </button>
  )
}

export type WalletActionPopoverProps = {
  children: React.ReactNode
  hideBalances: boolean
  onToggleHide: () => void
}

export function WalletActionPopover({
  children,
  hideBalances,
  onToggleHide,
}: WalletActionPopoverProps) {
  const [open, setOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState<WalletMode | null>(null)
  const { open: openWalletModal } = useWalletModal()

  const handleSelectMode = (mode: WalletMode) => {
    setSelectedMode(mode)
    setOpen(false)
    openWalletModal(mode)
  }

  const close = () => {
    setOpen(false)
    setSelectedMode(null)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const panel = open ? (
    <>
      <div
        className="fixed inset-0 z-[59] bg-black/40"
        aria-hidden
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Para yatır veya çek"
        className="fixed left-1/2 top-1/2 z-[60] max-h-[calc(100dvh-32px)] w-[min(773px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-divider-100 bg-background-modal p-6 shadow-2xl md:p-10"
      >
        {/* Üst: bakiyeler + kapat */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {balances.map((item) => (
              <div key={item.key} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-subtext">{item.label}</span>
                  {item.key === "main" && (
                    <button
                      type="button"
                      onClick={onToggleHide}
                      className="text-icon transition-colors hover:text-text-main"
                      aria-label={hideBalances ? "Bakiyeleri göster" : "Bakiyeleri gizle"}
                    >
                      <HugeiconsIcon
                        icon={hideBalances ? ViewOffIcon : ViewIcon}
                        className="size-4"
                      />
                    </button>
                  )}
                </div>
                <p className="text-sm font-semibold text-text-title">
                  {hideBalances ? "••••••" : item.value}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={close}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-element-border bg-background-elements text-icon transition-colors hover:border-primary hover:text-text-main"
            aria-label="Kapat"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </button>
        </div>

        {/* Kartlar — Figma: 697px satır, iki 341px kart */}
        <div className="mx-auto flex w-full max-w-[697px] flex-col justify-center gap-4 sm:flex-row">
          <WalletActionCard
            mode="deposit"
            selected={selectedMode === "deposit"}
            onSelect={() => handleSelectMode("deposit")}
          />
          <WalletActionCard
            mode="withdraw"
            selected={selectedMode === "withdraw"}
            onSelect={() => handleSelectMode("withdraw")}
          />
        </div>

        {/* Kapat */}
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-w-[69px] border-neutral-700 text-text-subtitle"
            onClick={close}
          >
            Kapat
          </Button>
        </div>
      </div>
    </>
  ) : null

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="cursor-pointer outline-none"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        {children}
      </div>
      {typeof document !== "undefined" && createPortal(panel, document.body)}
    </>
  )
}

/** @deprecated Use `WalletActionPopover` */
export const WalletDropdown = WalletActionPopover
