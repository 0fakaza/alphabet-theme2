"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const RECIPIENT_CRYPTOS = [
  { id: "tron", label: "TRON", unit: "TRON", currency: "TRX" as const, available: "8214 Tron" },
  { id: "tether", label: "USDT", unit: "USDT", currency: "USDT" as const, available: "1200 USDT" },
  { id: "usdc", label: "USDC", unit: "USDC", currency: "USDC" as const, available: "800 USDC" },
  { id: "bitcoin", label: "BITCOIN", unit: "BTC", currency: "BTC" as const, available: "0,12 BTC" },
  { id: "ethereum", label: "ETHERIUM", unit: "ETH", currency: "ETH" as const, available: "2,4 ETH" },
] as const

export type RecipientCryptoId = (typeof RECIPIENT_CRYPTOS)[number]["id"]

export function RecipientCryptoSelect({
  value,
  onValueChange,
}: {
  value: RecipientCryptoId
  onValueChange: (id: RecipientCryptoId) => void
}) {
  const selected = RECIPIENT_CRYPTOS.find((c) => c.id === value) ?? RECIPIENT_CRYPTOS[0]

  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v as RecipientCryptoId)}
    >
      <SelectTrigger
        aria-label="Alıcı kripto para birimi"
        className={cn(
          "h-auto w-auto gap-2 rounded-none border-0 bg-transparent p-0 shadow-none",
          "text-sm font-bold tracking-[0.28px] text-text-subtext",
          "hover:bg-transparent focus-visible:border-0 focus-visible:ring-0",
          "[&_svg]:size-4 [&_svg]:text-icon"
        )}
      >
        <SelectValue>{selected.label}</SelectValue>
      </SelectTrigger>
      <SelectContent align="end" position="popper" className="z-[70] min-w-[168px]">
        {RECIPIENT_CRYPTOS.map((item) => (
          <SelectItem key={item.id} value={item.id} className="gap-2 py-2.5">
            <Image
              src={`/images/currency/${item.currency.toLowerCase()}.svg`}
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0"
            />
            <span>{item.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
