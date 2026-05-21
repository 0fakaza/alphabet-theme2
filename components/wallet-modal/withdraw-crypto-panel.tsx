"use client"

import { useEffect, useState } from "react"
import type { PaymentMethod } from "@/data/wallet"
import type { WalletCountry } from "@/data/wallet-countries"
import { getCryptoToFiatRate } from "@/data/wallet-countries"
import {
  formatCryptoAmount,
  formatFiatAmount,
  parseAmountInput,
} from "@/lib/wallet-calc"
import {
  DetailPanelShell,
  DetailInput,
  DetailSubmitButton,
  FormField,
  FormSelect,
  WalletConfirmCheckbox,
  WithdrawDetailHeader,
} from "./shared"

export function WithdrawCryptoDetailPanel({
  method,
  country,
}: {
  method: PaymentMethod
  country: WalletCountry
}) {
  const networks = method.networks ?? []
  const [network, setNetwork] = useState(networks[0] ?? "")
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [cryptoCalc, setCryptoCalc] = useState("")
  const [fiatCalc, setFiatCalc] = useState("")
  const [accepted, setAccepted] = useState(false)

  const cryptoLabel = method.cryptoSymbol ?? method.name.toUpperCase()
  const fiatLabel = country.currencyLabel
  const withdrawable = method.withdrawable ?? "252$"
  const rate = getCryptoToFiatRate(method.id, country.currencyCode)

  useEffect(() => {
    setNetwork(method.networks?.[0] ?? "")
    setAddress("")
    setAmount("")
    setCryptoCalc("")
    setFiatCalc("")
    setAccepted(false)
  }, [method.id])

  useEffect(() => {
    setCryptoCalc("")
    setFiatCalc("")
  }, [country.id])

  const handleCryptoCalcChange = (value: string) => {
    setCryptoCalc(value)
    const num = parseAmountInput(value)
    if (num === null) {
      setFiatCalc("")
      return
    }
    setFiatCalc(formatFiatAmount(num * rate, country.currencySymbol))
  }

  const handleFiatCalcChange = (raw: string) => {
    setFiatCalc(raw)
    const num = parseAmountInput(raw)
    if (num === null) {
      if (!raw.trim()) setCryptoCalc("")
      return
    }
    setCryptoCalc(formatCryptoAmount(num / rate))
  }

  return (
    <DetailPanelShell>
      <div className="flex w-full flex-col gap-2">
        <WithdrawDetailHeader method={method} mode="withdraw" />

        <div className="flex w-full flex-col gap-2">
          {networks.length > 0 && (
            <FormField label="Ağ seçin" required>
              <FormSelect
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                {networks.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </FormSelect>
            </FormField>
          )}

          <FormField label="Cüzdan Adresi" required>
            <DetailInput
              placeholder="Cüzdan adresinizi girin"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormField>

          <FormField label="Tutar" required>
            <DetailInput
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormField>

          <p className="text-[13px] text-text-main">
            Çekilebilir:{" "}
            <span className="font-normal text-primary">{withdrawable}</span>
          </p>
        </div>

        <div className="my-2 h-px w-full bg-white/5" />

        <div className="flex w-full flex-col gap-1.5">
          <p className="text-[13px] text-text-subtext">Hesaplama</p>
          <div className="flex w-full items-end gap-2">
            <FormField label={cryptoLabel} className="min-w-0 flex-1">
              <DetailInput
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={cryptoCalc}
                onChange={(e) => handleCryptoCalcChange(e.target.value)}
              />
            </FormField>
            <span className="mb-3 shrink-0 text-[13px] text-white/30">=</span>
            <FormField label={fiatLabel} className="min-w-0 flex-1">
              <DetailInput
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={fiatCalc}
                onChange={(e) => handleFiatCalcChange(e.target.value)}
              />
            </FormField>
          </div>
        </div>

        <WalletConfirmCheckbox
          checked={accepted}
          onChange={setAccepted}
          label="Çekim işlemini onaylıyorum."
        />

        <DetailSubmitButton
          disabled={
            !accepted ||
            !address ||
            !amount ||
            (networks.length > 0 && !network)
          }
        >
          Para Çek
        </DetailSubmitButton>
      </div>
    </DetailPanelShell>
  )
}
