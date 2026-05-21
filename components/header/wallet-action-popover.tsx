"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import {
  HugeiconsIcon,
  Cancel01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@/lib/icons"
import { Button } from "@/components/elements/button"
import { useWalletModal, type WalletMode } from "@/components/providers/wallet-modal-provider"

const DEPOSIT_ACTION_ICON = "/images/icons/depozit.svg"
const WITHDRAW_ACTION_ICON = "/images/icons/withdrawal.svg"

const balances = [
  { key: "main" as const, label: "Bakiye", value: "₺15.520.125,52" },
  { key: "bonus" as const, label: "Bonus Bakiye", value: "₺100" },
  {
    key: "freebet" as const,
    label: "Freebet Bakiye",
    shortLabel: "Freebet",
    value: "₺100",
  },
]

function BalanceValue({
  value,
  hidden,
}: {
  value: string
  hidden: boolean
}) {
  return (
    <span className="relative block text-sm font-bold leading-5 text-text-main md:text-text-title">
      <span
        aria-hidden={hidden}
        className={cn(hidden && "invisible select-none")}
      >
        {value}
      </span>
      {hidden && (
        <span className="absolute left-0 top-0 whitespace-nowrap">••••••</span>
      )}
    </span>
  )
}

type WalletActionCardProps = {
  mode: WalletMode
  onSelect: () => void
}

function CardIconDecor({ isDeposit }: { isDeposit: boolean }) {
  const accent = isDeposit ? "#9bbc14" : "#f40000"
  const shadow = isDeposit
    ? "rgba(155,188,20,0.45)"
    : "rgba(244,0,0,0.45)"

  return (
    <div className="relative size-[52px] shrink-0 md:size-[80px]">
      <span
        className="absolute -top-1.5 -right-1 size-8 rounded-full opacity-60 blur-md md:size-10"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      <span
        className="absolute bottom-0 left-1 size-8 rounded-full opacity-50 blur-md md:size-10"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      <div
        className="relative flex size-[52px] items-center justify-center rounded-full md:size-[80px]"
        style={{
          backgroundColor: accent,
          boxShadow: `0 12px 32px ${shadow}`,
        }}
      >
        <Image
          src={isDeposit ? DEPOSIT_ACTION_ICON : WITHDRAW_ACTION_ICON}
          alt=""
          width={40}
          height={40}
          className="size-10 object-contain md:size-10"
        />
      </div>
    </div>
  )
}

/** Mobil: yatay kart (Figma 5062-13782) */
function WalletActionCardMobile({ mode, onSelect }: WalletActionCardProps) {
  const isDeposit = mode === "deposit"

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex min-h-[97px] w-full items-center overflow-hidden rounded-lg border border-white/10 bg-[#22272c] text-left outline-none transition-all md:hidden",
        "shadow-[inset_1px_1px_1px_rgba(255,255,255,0.1)]",
        "ring-0 ring-transparent focus-visible:ring-0",
        "hover:ring-2",
        isDeposit ? "hover:ring-[#9bbc14]" : "hover:ring-[#f40000]"
      )}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-[162px] opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-20",
          isDeposit
            ? "bg-[radial-gradient(ellipse_at_0%_50%,#9bbc14_0%,transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_0%_50%,#e94b4b_0%,transparent_60%)]"
        )}
        aria-hidden
      />

      <div className="relative z-10 flex shrink-0 items-center pl-[17px] pr-3">
        <CardIconDecor isDeposit={isDeposit} />
      </div>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center gap-1 py-4 pr-4">
        <p className="text-[15px] font-medium leading-snug text-white">
          {isDeposit ? "Para yatırmak istiyorum" : "Para çekmek istiyorum"}
        </p>
        <p className="text-xs leading-4 text-white/60">
          {isDeposit
            ? "20sn'ye varan yatırım süreleri ile hemen yatır bonuslar ile kazançları katlayarak başla."
            : "Hızlı, kolay, zahmetsiz çekim yapın."}
        </p>
      </div>
    </button>
  )
}

/** Masaüstü: dikey kart */
function WalletActionCardDesktop({ mode, onSelect }: WalletActionCardProps) {
  const isDeposit = mode === "deposit"

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative hidden min-h-[227px] min-w-0 flex-1 cursor-pointer flex-col items-center overflow-hidden rounded-2xl border " +
        "border-white/10 px-4 pb-5 pt-1.5 text-center outline-none transition-all md:flex md:max-w-[341px]",
        "bg-[#22272c] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.1)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-20",
        "ring-0 ring-transparent focus-visible:ring-0",
        isDeposit
          ? "before:bg-[radial-gradient(ellipse_at_20%_0%,#9bbc14_0%,transparent_55%)] hover:ring-2 hover:ring-[#9bbc14]"
          : "before:bg-[radial-gradient(ellipse_at_20%_0%,#e94b4b_0%,transparent_55%)] hover:ring-2 hover:ring-[#f40000]"
      )}
    >
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

      <div className="relative z-10 mt-6">
        <CardIconDecor isDeposit={isDeposit} />
      </div>

      <div className="relative z-10 mt-6 flex max-w-[270px] flex-col gap-1.5">
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

function WalletActionCard(props: WalletActionCardProps) {
  return (
    <>
      <WalletActionCardMobile {...props} />
      <WalletActionCardDesktop {...props} />
    </>
  )
}

export type WalletActionPopoverProps = {
  children: React.ReactNode
  hideMain: boolean
  onToggleMain: () => void
}

export function WalletActionPopover({
  children,
  hideMain,
  onToggleMain,
}: WalletActionPopoverProps) {
  const [open, setOpen] = useState(false)
  const [hideBonus, setHideBonus] = useState(false)
  const [hideFreebet, setHideFreebet] = useState(false)
  const { open: openWalletModal } = useWalletModal()

  const hiddenByKey = {
    main: hideMain,
    bonus: hideBonus,
    freebet: hideFreebet,
  } as const

  const toggleHidden = (key: keyof typeof hiddenByKey) => {
    if (key === "main") onToggleMain()
    if (key === "bonus") setHideBonus((v) => !v)
    if (key === "freebet") setHideFreebet((v) => !v)
  }

  const handleSelectMode = (mode: WalletMode) => {
    setOpen(false)
    openWalletModal(mode)
  }

  const close = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const panel = open ? (
    <>
      <div
        className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm"
        aria-hidden
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Bakiye"
        className={cn(
          "fixed z-[60] flex w-full flex-col overflow-y-auto bg-background-modal shadow-2xl",
          "inset-x-0 top-auto bottom-0 max-h-[min(467px,90dvh)] rounded-t-2xl",
          "md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:max-h-[calc(100dvh-32px)] md:w-[min(773px,calc(100vw-24px))] md:-translate-x-1/2 " +
            "md:-translate-y-1/2 md:rounded-2xl"
        )}
      >
        {/* Mobil: başlık + kapat */}
        <div className="flex items-center justify-between border-b border-divider-100 bg-neutral-100 px-3 py-5 md:hidden">
          <h2 className="text-lg font-medium text-text-main">Bakiye</h2>
          <button
            type="button"
            onClick={close}
            className="flex size-8 items-center justify-center rounded-lg border border-element-border bg-background-elements text-text-subtext"
            aria-label="Kapat"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </button>
        </div>

        {/* Bakiyeler */}
        <div className="relative bg-neutral-100 p-3 md:px-10 md:py-6">
          <div className="flex flex-wrap gap-x-8 gap-y-3 md:gap-x-[61px] md:pr-10">
            {balances.map((item) => {
              const hidden = hiddenByKey[item.key]
              return (
                <div key={item.key} className="flex min-w-0 flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-text-subtext">
                      <span className="md:hidden">
                        {"shortLabel" in item ? item.shortLabel : item.label}
                      </span>
                      <span className="hidden md:inline">{item.label}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleHidden(item.key)}
                      className="text-text-subtext transition-colors hover:text-text-main"
                      aria-label={
                        hidden ? `${item.label} göster` : `${item.label} gizle`
                      }
                    >
                      <HugeiconsIcon
                        icon={hidden ? ViewOffIcon : ViewIcon}
                        className="size-4"
                      />
                    </button>
                  </div>
                  <BalanceValue value={item.value} hidden={hidden} />
                </div>
              )
            })}
          </div>

          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 hidden size-8 items-center justify-center rounded-lg border border-element-border bg-background-elements text-icon transition-colors hover:border-primary hover:text-text-main md:top-6 md:right-6 md:flex"
            aria-label="Kapat"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </button>
        </div>

        {/* Kartlar */}
        <div className="flex flex-col gap-4 px-3 pt-4 pb-6 md:mx-auto md:w-full md:flex-row md:items-stretch md:justify-center md:gap-4 md:px-6 md:pt-6 md:pb-6">
          <WalletActionCard
            mode="deposit"
            onSelect={() => handleSelectMode("deposit")}
          />
          <WalletActionCard
            mode="withdraw"
            onSelect={() => handleSelectMode("withdraw")}
          />
        </div>

        <div className="hidden justify-center pb-6 md:flex">
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
