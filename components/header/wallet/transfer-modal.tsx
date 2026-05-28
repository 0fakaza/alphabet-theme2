"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, Cancel01Icon, Exchange01Icon } from "@/lib/icons"
import { Button } from "@/components/elements/button"
import { CurrencyBadge } from "@/components/elements/currency-badge"
import {
  WALLET_TRANSFER_HEADER_BALANCES,
  WalletBalanceHeader,
} from "./balance-display"
import {
  RECIPIENT_CRYPTOS,
  RecipientCryptoSelect,
  type RecipientCryptoId,
} from "./recipient-crypto-select"

type TransferPartyCardProps = {
  role: "sender" | "recipient"
  amount: string
  subAmount: string
  availableText: string
  showMax?: boolean
  onMax?: () => void
  cryptoSelector?: React.ReactNode
  currencyBadge: React.ReactNode
}

function TransferPartyCard({
  role,
  amount,
  subAmount,
  availableText,
  showMax,
  onMax,
  cryptoSelector,
  currencyBadge,
}: TransferPartyCardProps) {
  return (
    <div className="w-full rounded-xl bg-neutral-500">
      <div className="relative px-6 pt-6 pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-xl font-bold tracking-[0.4px] text-text-main">
              {amount}
            </p>
            <p className="mt-0.5 truncate text-[11px] leading-[17px] font-medium tracking-[0.22px] text-text-subtext">
              {subAmount}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {cryptoSelector}
            {currencyBadge}
          </div>
        </div>
        <p className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-medium tracking-[0.16px] text-text-subtext uppercase">
          {role === "sender" ? "GÖNDEREN" : "ALICI"}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-element-border px-6 py-3">
        <p className="text-[11px] leading-[17px] font-medium tracking-[0.22px] text-text-subtext">
          {availableText}
        </p>
        {showMax ? (
          <button
            type="button"
            onClick={onMax}
            className="text-[11px] leading-[17px] font-medium tracking-[0.22px] text-text-subtext underline underline-offset-2 transition-colors hover:text-text-main"
          >
            Tümü
          </button>
        ) : (
          <span
            className="text-[11px] leading-[17px] font-medium text-transparent"
            aria-hidden
          >
            Tümü
          </span>
        )}
      </div>
    </div>
  )
}

export type WalletTransferModalProps = {
  open: boolean
  onClose: () => void
  hideMain: boolean
  hideBonus: boolean
  onToggleMain: () => void
  onToggleBonus: () => void
}

export function WalletTransferModal({
  open,
  onClose,
  hideMain,
  hideBonus,
  onToggleMain,
  onToggleBonus,
}: WalletTransferModalProps) {
  const [recipientCrypto, setRecipientCrypto] = useState<RecipientCryptoId>("tron")
  const [senderAmount, setSenderAmount] = useState("4.125")
  const [recipientAmount, setRecipientAmount] = useState("0,00")
  const [swapped, setSwapped] = useState(false)

  const crypto =
    RECIPIENT_CRYPTOS.find((c) => c.id === recipientCrypto) ?? RECIPIENT_CRYPTOS[0]

  const hiddenByKey = { main: hideMain, bonus: hideBonus } as const

  const handleSwap = () => {
    setSwapped((v) => !v)
    setSenderAmount(recipientAmount)
    setRecipientAmount(senderAmount)
  }

  const handleMaxRecipient = () => {
    const max = crypto.available.split(" ")[0] ?? "0"
    setRecipientAmount(max)
  }

  const handleToggle = (key: string) => {
    if (key === "main") onToggleMain()
    if (key === "bonus") onToggleBonus()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const senderCard = (
    <TransferPartyCard
      role="sender"
      amount={`${senderAmount} TRY`}
      subAmount="CÜZDAN"
      availableText={`${senderAmount.replace(",", ".")} TRY kullanılabilir.`}
      currencyBadge={<CurrencyBadge currency="TRY" className="size-8" />}
    />
  )

  const recipientCard = (
    <TransferPartyCard
      role="recipient"
      amount={recipientAmount}
      subAmount={`0 ${crypto.unit}`}
      availableText={`${crypto.available} kullanılabilir.`}
      showMax
      onMax={handleMaxRecipient}
      currencyBadge={<CurrencyBadge currency={crypto.currency} className="size-8" />}
      cryptoSelector={
        <RecipientCryptoSelect
          value={recipientCrypto}
          onValueChange={setRecipientCrypto}
        />
      }
    />
  )

  const panel = (
    <>
      <div
        className="fixed inset-0 z-[61] bg-black/60 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cüzdan transferi"
        className={cn(
          "fixed z-[62] flex w-full flex-col overflow-y-auto bg-background-modal shadow-2xl",
          "inset-x-0 top-auto bottom-0 max-h-[min(640px,92dvh)] rounded-t-2xl",
          "md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:max-h-[calc(100dvh-32px)]",
          "md:w-[min(492px,calc(100vw-24px))] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[20px]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-divider-100">
          <WalletBalanceHeader
            items={WALLET_TRANSFER_HEADER_BALANCES}
            hiddenByKey={hiddenByKey}
            onToggle={handleToggle}
            onClose={onClose}
          />
        </div>

        <div className="flex flex-1 flex-col px-6 py-8 md:px-10">
          <div className="relative flex flex-col items-center">
            {swapped ? recipientCard : senderCard}

            <button
              type="button"
              onClick={handleSwap}
              className={cn(
                "relative z-10 -my-3 flex size-14 items-center justify-center cursor-pointer rounded-full",
                "border-[6px] border-background-modal bg-action-secondary-default text-white",
                "transition-colors hover:bg-action-secondary-hover"
              )}
              aria-label="Gönderen ve alıcıyı değiştir"
            >
              <HugeiconsIcon icon={Exchange01Icon} className="size-6" />
            </button>

            {swapped ? senderCard : recipientCard}
          </div>

          <div className="mt-5 flex flex-col items-center gap-4">
            <p className="text-center text-[10px] font-medium leading-[17px] tracking-[0.2px] text-text-subtext">
              İşlem sonrası cüzdan bakiyesi:{" "}
              <span className="text-sm font-bold tracking-[0.28px] text-text-main">
                11.512TRY
              </span>
            </p>
            <Button type="button" variant="secondary" size="md" className="h-11 w-full">
              Transfer et
            </Button>
          </div>
        </div>
      </div>
    </>
  )

  return typeof document !== "undefined" ? createPortal(panel, document.body) : null
}
