"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
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

function isMobileViewport() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(max-width: 767px)").matches
}

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
      // Mobil: önce yöntem listesi; masaüstü: varsayılan Tether ile split görünüm
      setSelectedMethod(isMobileViewport() ? null : DEFAULT_DEPOSIT)
    } else {
      setSelectedMethod(null)
    }
  }, [isOpen, mode])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const fiatSource = isFiatCountry(selectedCountry.id)
    ? PICKER_FIAT_METHODS
    : []

  const cryptoMethods = filterPickerMethods(PICKER_CRYPTO_METHODS, search)
  const fiatMethods = filterPickerMethods(fiatSource, search)

  const showDetail = selectedMethod !== null
  const isFiat = selectedMethod ? isFiatMethod(selectedMethod) : false
  const isCrypto = selectedMethod ? !isFiat : false
  const isWithdrawFlow = mode === "withdraw"
  const isDepositFlow = mode === "deposit"
  const isMobileSheetFlow = isWithdrawFlow || isDepositFlow
  const isCompactPicker =
    (isWithdrawFlow || isDepositFlow) && !showDetail
  const isSplitDetail = showDetail && (isWithdrawFlow || isDepositFlow)
  const isMobileDetailSheet = isMobileSheetFlow && showDetail
  /** Bakiye popover hariç — wallet modal mobil sheet’leri yüksek */
  const isMobileTallSheet =
    isMobileSheetFlow && (isCompactPicker || isMobileDetailSheet)

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
      className={cn(
        "fixed inset-0 z-[200] flex bg-black/60 backdrop-blur-sm",
        isMobileSheetFlow
          ? "items-end p-0 md:items-center md:justify-center md:p-4"
          : "items-center justify-center p-4"
      )}
      onClick={close}
    >
      <div
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-background-modal shadow-2xl",
          isMobileSheetFlow &&
            "rounded-t-2xl md:max-h-[calc(100dvh-32px)] md:rounded-[20px]",
          isMobileTallSheet &&
            "max-md:min-h-[80dvh] max-md:max-h-[96dvh]",
          isCompactPicker && "md:max-w-[421px]",
          isSplitDetail && "md:max-w-[775px]",
          !isMobileSheetFlow && "rounded-[20px]"
        )}
        style={
          isMobileSheetFlow
            ? undefined
            : {
                maxWidth: modalWidth,
                maxHeight: "calc(100dvh - 32px)",
              }
        }
        onClick={(e) => e.stopPropagation()}
      >
        <WalletModalHeader
          compact={isMobileSheetFlow}
          hideMain={hideMain}
          hideBonus={hideBonus}
          onToggleMain={() => setHideMain((v) => !v)}
          onToggleBonus={() => setHideBonus((v) => !v)}
          onClose={close}
        />

        <div
          className={cn(
            "flex flex-1 flex-col",
            isMobileSheetFlow
              ? cn(
                  "min-h-0 overflow-y-auto md:max-h-[737px] md:flex-row md:overflow-hidden",
                  isMobileTallSheet && "max-md:min-h-0"
                )
              : "max-h-[737px] overflow-hidden"
          )}
        >
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
            className={cn(isSplitDetail && "hidden md:flex")}
          />

          {showDetail && selectedMethod && (
            <>
              {mode === "deposit" && (
                <DepositDetailPanel
                  method={selectedMethod}
                  mobileSheet
                  onBack={() => setSelectedMethod(null)}
                />
              )}
              {mode === "withdraw" && isCrypto && (
                <WithdrawCryptoDetailPanel
                  method={selectedMethod}
                  country={selectedCountry}
                  mobileSheet
                  onBack={() => setSelectedMethod(null)}
                />
              )}
              {mode === "withdraw" && isFiat && (
                <WithdrawFiatDetailPanel
                  method={selectedMethod}
                  mobileSheet
                  onBack={() => setSelectedMethod(null)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
