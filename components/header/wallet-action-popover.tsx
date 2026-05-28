"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, Cancel01Icon } from "@/lib/icons"
import { Button } from "@/components/elements/button"
import { useWalletModal, type WalletMode } from "@/components/providers/wallet-modal-provider"
import { WALLET_POPOVER_BALANCES, WalletBalanceHeader } from "./wallet/balance-display"
import { WalletActionCard } from "./wallet/action-cards"
import { WalletOverviewRow } from "./wallet/overview-row"
import { WalletTransferModal } from "./wallet/transfer-modal"

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
  const [transferOpen, setTransferOpen] = useState(false)
  const [hideBonus, setHideBonus] = useState(false)
  const [hideFreebet, setHideFreebet] = useState(false)
  const { open: openWalletModal } = useWalletModal()

  const hiddenByKey = {
    main: hideMain,
    bonus: hideBonus,
    freebet: hideFreebet,
  } as const

  const toggleHidden = (key: string) => {
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
    setTransferOpen(false)
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
          "inset-x-0 top-auto bottom-0 max-h-[min(580px,92dvh)] rounded-t-2xl",
          "md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:max-h-[calc(100dvh-32px)] md:w-[min(773px,calc(100vw-24px))] md:-translate-x-1/2 " +
            "md:-translate-y-1/2 md:rounded-2xl"
        )}
      >
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

        <WalletBalanceHeader
          items={WALLET_POPOVER_BALANCES}
          hiddenByKey={hiddenByKey}
          onToggle={toggleHidden}
          onClose={close}
        />

        <div className="flex flex-col gap-4 px-3 pt-4 pb-4 md:mx-auto md:w-full md:flex-row md:items-stretch md:justify-center md:gap-4 md:px-6 md:pt-6 md:pb-5">
          <WalletActionCard
            mode="deposit"
            onSelect={() => handleSelectMode("deposit")}
          />
          <WalletActionCard
            mode="withdraw"
            onSelect={() => handleSelectMode("withdraw")}
          />
        </div>

        <div className="px-3 pb-4 md:px-6 md:pb-5">
          <WalletOverviewRow onOpenTransfer={() => setTransferOpen(true)} />
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
      <span
        role="button"
        tabIndex={0}
        className="inline-flex cursor-pointer outline-none"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        {children}
      </span>
      {typeof document !== "undefined" && createPortal(panel, document.body)}
      <WalletTransferModal
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        hideMain={hideMain}
        hideBonus={hideBonus}
        onToggleMain={onToggleMain}
        onToggleBonus={() => setHideBonus((v) => !v)}
      />
    </>
  )
}
