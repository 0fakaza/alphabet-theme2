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
} from "./shared"
import { DepositDetailPanel } from "./deposit-detail-panel"
import { WithdrawCryptoDetailPanel } from "./withdraw-crypto-panel"

export { WithdrawCryptoDetailPanel, DepositDetailPanel }

export function WithdrawFiatDetailPanel({ method }: { method: PaymentMethod }) {
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
    <DetailPanelShell>
      <div className="flex w-full flex-col gap-2">
        <WithdrawDetailHeader method={method} mode="withdraw" />

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
      </div>
    </DetailPanelShell>
  )
}
