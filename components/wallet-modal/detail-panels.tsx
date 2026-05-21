"use client"

import { useState } from "react"
import type { PaymentMethod } from "@/data/wallet"
import {
  AmountPercentChips,
  DetailInput,
  DetailPanelShell,
  DetailSubmitButton,
  FormField,
  WithdrawDetailHeader,
  WithdrawDetailHelpLink,
} from "./shared"
import { DepositDetailPanel } from "./deposit-detail-panel"
import { WithdrawCryptoDetailPanel } from "./withdraw-crypto-panel"

export { WithdrawCryptoDetailPanel, DepositDetailPanel }

export function WithdrawFiatDetailPanel({
  method,
  onBack,
  mobileSheet,
}: {
  method: PaymentMethod
  onBack?: () => void
  mobileSheet?: boolean
}) {
  const [amount, setAmount] = useState("")

  const applyPercent = (pct: number) => {
    const numeric = 15_520_125.52
    const value = (numeric * pct) / 100
    setAmount(
      value.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    )
  }

  return (
    <DetailPanelShell mobileSheet={mobileSheet}>
      <div className="flex min-h-full w-full flex-1 flex-col gap-2">
        <WithdrawDetailHeader
          method={method}
          mode="withdraw"
          onBack={onBack}
        />

        <FormField label="Çekmek istediğiniz tutar" required>
          <DetailInput
            type="text"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <AmountPercentChips onSelect={applyPercent} />
        </FormField>

        <p className="text-[13px] text-text-main">
          Çekilebilir:{" "}
          <span className="font-normal text-primary">24.520₺</span>
        </p>

        <DetailSubmitButton disabled={!amount}>Para Çek</DetailSubmitButton>

        {mobileSheet && <div className="min-h-0 flex-1 md:hidden" aria-hidden />}

        {mobileSheet && (
          <div className="mt-auto flex justify-center pb-2 pt-6 md:hidden">
            <WithdrawDetailHelpLink mode="withdraw" />
          </div>
        )}
      </div>
    </DetailPanelShell>
  )
}
