"use client"

import { useState } from "react"
import { HugeiconsIcon, Search01Icon, ViewIcon, ViewOffIcon, ArrowLeft01Icon, ArrowRight01Icon } from "@/lib/icons"
import { CurrencyBadge } from "@/components/elements/currency-badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type CurrencyCode = "TRY" | "EUR" | "USD" | "BTC" | "ETH" | "USDT" | "BNB" | "ADA" | "JPY" | "PLN" | "AED"

interface WalletBalance {
  code: CurrencyCode
  label: string
  balance: string
}

const walletBalances: WalletBalance[] = [
  { code: "TRY", label: "TRY", balance: "TRY0,88" },
  { code: "BTC", label: "Bitcoin", balance: "TRY0,88" },
  { code: "ETH", label: "Etherium", balance: "TRY0,88" },
  { code: "USDT", label: "USDT", balance: "TRY0,00" },
  { code: "BNB", label: "Binance", balance: "TRY0,01" },
  { code: "ADA", label: "Cardano (ADA)", balance: "TRY0,23" },
]

const betCurrencies: CurrencyCode[] = ["TRY", "EUR", "USD", "JPY", "PLN", "AED"]

interface WalletDropdownProps {
  children: React.ReactNode
  hideBalances: boolean
  onToggleHide: () => void
}

const bonusBalances = [
  { label: "Freebet",   value: "TRY0,88" },
  { label: "Bonus",     value: "TRY 450,21" },
  { label: "Freespin",  value: "4 Adet" },
  { label: "Freechips", value: "0 Adet" },
]

export function WalletDropdown({ children, hideBalances, onToggleHide }: WalletDropdownProps) {
  const [search, setSearch] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("TRY")
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>("BTC")
  const [showBonus, setShowBonus] = useState(false)

  const filtered = walletBalances.filter(
    (w) =>
      w.label.toLowerCase().includes(search.toLowerCase()) ||
      w.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={15}
        className="w-[291px] gap-0 rounded-xl bg-background-elements p-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_3px_3px_rgba(0,0,0,0.02),0px_6px_6px_rgba(0,0,0,0.04),0px_12px_12px_rgba(0,0,0,0.04),0px_24px_24px_rgba(0,0,0,0.04),0px_48px_48px_rgba(0,0,0,0.04)]"
      >
        {/* ── Bonus Bakiyeleri görünümü ── */}
        {showBonus ? (
          <div className="flex flex-col gap-4 p-1">
            <button
              onClick={() => setShowBonus(false)}
              className="flex items-center gap-1.5 text-xs font-medium text-text-subtext transition-colors hover:text-text-main"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
              Geri Dön
            </button>
            <p className="text-xs font-medium text-text-subtext">Bonus Bakiyelerim</p>
            <div className="flex flex-col">
              {bonusBalances.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5">
                  <span className="text-sm font-semibold text-text-main">{item.label}</span>
                  <span className="text-sm text-text-subtext">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
        <div className="flex flex-col gap-2">
          {/* Header: Bakiyeleri Gizle */}
          <div className="flex items-center justify-center gap-1 py-2">
            <span className="text-xs font-medium text-text-subtext">
              Bakiyeleri Gizle
            </span>
            <button
              onClick={onToggleHide}
              className="cursor-pointer text-icon transition-colors hover:text-text-main"
            >
              <HugeiconsIcon
                icon={hideBalances ? ViewOffIcon : ViewIcon}
                className="size-4"
              />
            </button>
          </div>

          {/* Search */}
          <div className="flex h-12 items-center gap-1.5 rounded-lg border border-element-border bg-background-elements px-4">
            <HugeiconsIcon
              icon={Search01Icon}
              className="size-5 shrink-0 text-text-subtext"
            />
            <input
              type="text"
              placeholder="Ara"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium tracking-wide text-text-main outline-none placeholder:text-text-subtext"
            />
          </div>

          {/* Currency List */}
          <div className="max-h-[240px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-element-border">
            {filtered.map((wallet) => (
              <button
                key={wallet.code}
                onClick={() => setActiveCurrency(wallet.code)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                  activeCurrency === wallet.code
                    ? "bg-background-body"
                    : "hover:bg-background-body/50"
                }`}
              >
                <div className="flex items-center gap-1">
                  <CurrencyBadge currency={wallet.code} />
                  <span className="text-xs font-medium text-text-main">
                    {wallet.label}
                  </span>
                </div>
                <span className="text-xs font-medium text-text-subtext">
                  {hideBalances ? "••••" : wallet.balance}
                </span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-element-border" />

          {/* Bahis para birimi */}
          <div className="flex flex-col gap-3 px-3 pb-3">
            <span className="text-xs font-medium text-text-subtext">
              Bahis para birimi
            </span>
            <div className="grid grid-cols-3 gap-x-6 gap-y-3">
              {betCurrencies.map((code) => (
                <label
                  key={code}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <span
                    className={`flex size-[22px] items-center justify-center rounded-full border-2 transition-colors ${
                      selectedCurrency === code
                        ? "border-action-primary-default bg-action-primary-default"
                        : "border-element-border bg-background-elements"
                    }`}
                    onClick={() => setSelectedCurrency(code)}
                  >
                    {selectedCurrency === code && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5L4 7L8 3"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-sm font-medium tracking-wide ${
                      selectedCurrency === code
                        ? "text-text-main"
                        : "text-text-subtext"
                    }`}
                  >
                    {code}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-element-border" />

          {/* Bonus Bakiyeleri */}
          <button
            onClick={() => setShowBonus(true)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-background-body/50"
          >
            <span className="text-xs font-medium text-text-subtext">
              Bonus Bakiyelerini gör
            </span>
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 text-text-subtext" />
          </button>
        </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
