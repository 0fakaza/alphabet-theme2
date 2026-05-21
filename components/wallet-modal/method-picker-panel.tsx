"use client"

import { Search01Icon, HugeiconsIcon } from "@/lib/icons"
import type { PaymentMethod } from "@/data/wallet"
import type { WalletCountry } from "@/data/wallet-countries"
import type { WalletMode } from "@/components/providers/wallet-modal-provider"
import { CountrySelector } from "./country-selector"
import { MethodChip } from "./shared"

export function MethodPickerPanel({
  mode,
  compact,
  search,
  onSearchChange,
  countries,
  selectedCountry,
  onCountryChange,
  cryptoMethods,
  fiatMethods,
  selectedId,
  onSelect,
  dimCrypto,
  dimFiat,
}: {
  mode: WalletMode
  compact?: boolean
  search: string
  onSearchChange: (v: string) => void
  countries: WalletCountry[]
  selectedCountry: WalletCountry
  onCountryChange: (country: WalletCountry) => void
  cryptoMethods: PaymentMethod[]
  fiatMethods: PaymentMethod[]
  selectedId?: string
  onSelect: (method: PaymentMethod) => void
  dimCrypto?: boolean
  dimFiat?: boolean
}) {
  const cryptoTitle =
    mode === "withdraw" ? "Kripto Paralar ile çek" : "Kripto Paralar"
  const fiatTitle =
    mode === "withdraw" ? "Havale / EFT ile çek" : "Havale / EFT"

  return (
    <div
      className={
        compact
          ? "flex w-full shrink-0 flex-col gap-[33px] overflow-y-auto px-[23px] pb-6 pt-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-element-border"
          : "flex w-[424px] shrink-0 flex-col gap-8 overflow-y-auto px-[23px] pb-6 pt-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-element-border"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-[203px] shrink-0">
          <HugeiconsIcon
            icon={Search01Icon}
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-subtext"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Yöntem Ara"
            className="h-12 w-full rounded-xl border border-element-border bg-background-elements pl-11 pr-4 text-sm font-medium text-text-main outline-none placeholder:text-text-subtext focus:border-primary"
          />
        </div>
        <CountrySelector
          countries={countries}
          selected={selectedCountry}
          onSelect={onCountryChange}
        />
      </div>

      {cryptoMethods.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-[15px] font-medium tracking-wide text-text-main">
            {cryptoTitle}
          </h3>
          <div className="flex flex-col gap-2">
            {chunkPairs(cryptoMethods).map((pair, i) => (
              <div key={i} className="flex gap-2">
                {pair.map((method) => (
                  <MethodChip
                    key={method.id}
                    method={method}
                    selected={selectedId === method.id}
                    dimmed={dimCrypto}
                    onSelect={() => onSelect(method)}
                  />
                ))}
                {pair.length === 1 && <div className="flex-1" />}
              </div>
            ))}
          </div>
        </section>
      )}

      {fiatMethods.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="text-[15px] font-medium tracking-wide text-text-main">
            {fiatTitle}
          </h3>
          <div className="flex flex-col gap-2">
            {chunkPairs(fiatMethods).map((pair, i) => (
              <div key={i} className="flex gap-2">
                {pair.map((method) => (
                  <MethodChip
                    key={method.id}
                    method={method}
                    selected={selectedId === method.id}
                    dimmed={dimFiat}
                    onSelect={() => onSelect(method)}
                  />
                ))}
                {pair.length === 1 && <div className="flex-1" />}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function chunkPairs<T>(items: T[]): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }
  return rows
}
