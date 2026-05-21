"use client"

import { useEffect, useState } from "react"
import { useWalletModal } from "@/components/providers/wallet-modal-provider"
import {
  PICKER_CRYPTO_METHODS,
  PICKER_FIAT_METHODS,
  filterPickerMethods,
  isFiatMethod,
  type PaymentMethod,
} from "@/data/wallet"
import {
  DEFAULT_WALLET_COUNTRY_ID,
  isFiatCountry,
  WALLET_COUNTRIES,
  type WalletCountry,
} from "@/data/wallet-countries"
import { WalletModalHeader } from "./shared"
import { MethodPickerPanel } from "./method-picker-panel"
import {
  DepositDetailPanel,
  WithdrawCryptoDetailPanel,
  WithdrawFiatDetailPanel,
} from "./detail-panels"

const DEFAULT_DEPOSIT =
  PICKER_CRYPTO_METHODS.find((m) => m.id === "tether") ??
  PICKER_CRYPTO_METHODS[0]

const defaultCountry =
  WALLET_COUNTRIES.find((c) => c.id === DEFAULT_WALLET_COUNTRY_ID) ??
  WALLET_COUNTRIES[0]

export function WalletModal() {
  const { isOpen, mode, close } = useWalletModal()
  const [hideMain, setHideMain] = useState(false)
  const [hideBonus, setHideBonus] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedCountry, setSelectedCountry] =
    useState<WalletCountry>(defaultCountry)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  )

  useEffect(() => {
    if (!isOpen) return
    setSearch("")
    setSelectedCountry(defaultCountry)
    if (mode === "deposit") {
      setSelectedMethod(DEFAULT_DEPOSIT)
    } else {
      setSelectedMethod(null)
    }
  }, [isOpen, mode])

  const fiatSource = isFiatCountry(selectedCountry.id)
    ? PICKER_FIAT_METHODS
    : []

  const cryptoMethods = filterPickerMethods(PICKER_CRYPTO_METHODS, search)
  const fiatMethods = filterPickerMethods(fiatSource, search)

  const showDetail = selectedMethod !== null
  const isFiat = selectedMethod ? isFiatMethod(selectedMethod) : false
  const isCrypto = selectedMethod ? !isFiat : false
  const isCompactPicker = mode === "withdraw" && !showDetail

  const modalWidth = isCompactPicker ? 421 : 775

  const handleCountryChange = (country: WalletCountry) => {
    setSelectedCountry(country)
    if (selectedMethod && isFiatMethod(selectedMethod) && !isFiatCountry(country.id)) {
      setSelectedMethod(null)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative flex w-full flex-col overflow-hidden rounded-[20px] bg-background-modal shadow-2xl"
        style={{
          maxWidth: modalWidth,
          maxHeight: "calc(100dvh - 32px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <WalletModalHeader
          hideMain={hideMain}
          hideBonus={hideBonus}
          onToggleMain={() => setHideMain((v) => !v)}
          onToggleBonus={() => setHideBonus((v) => !v)}
          onClose={close}
        />

        <div className="flex min-h-0 flex-1 overflow-hidden max-h-[737px]">
          <MethodPickerPanel
            mode={mode}
            compact={isCompactPicker}
            search={search}
            onSearchChange={setSearch}
            countries={WALLET_COUNTRIES}
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
            cryptoMethods={cryptoMethods}
            fiatMethods={fiatMethods}
            selectedId={selectedMethod?.id}
            onSelect={setSelectedMethod}
            dimCrypto={showDetail && isFiat}
            dimFiat={showDetail && isCrypto}
          />

          {showDetail && selectedMethod && (
            <>
              {mode === "deposit" && (
                <DepositDetailPanel method={selectedMethod} />
              )}
              {mode === "withdraw" && isCrypto && (
                <WithdrawCryptoDetailPanel
                  method={selectedMethod}
                  country={selectedCountry}
                />
              )}
              {mode === "withdraw" && isFiat && (
                <WithdrawFiatDetailPanel method={selectedMethod} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
