import Image from "next/image"
import { cn } from "@/lib/utils"

const currencies = {
  TRY: "/images/currency/try.svg",
  EUR: "/images/currency/eur.svg",
  USD: "/images/currency/usd.svg",
  BTC: "/images/currency/btc.svg",
  ETH: "/images/currency/eth.svg",
  USDT: "/images/currency/usdt.svg",
  USDC: "/images/currency/usdc.svg",
  TON: "/images/currency/ton.svg",
  ADA: "/images/currency/ada.svg",
  MATIC: "/images/currency/matic.svg",
  TRX: "/images/currency/trx.svg",
  BNB: "/images/currency/bnb.svg",
  SOL: "/images/currency/sol.svg",
  DOGE: "/images/currency/doge.svg",
  XRP: "/images/currency/xrp.svg",
  LTC: "/images/currency/ltc.svg",
  JPY: "/images/currency/jpy.svg",
  PLN: "/images/currency/pln.svg",
  INR: "/images/currency/inr.svg",
  KRW: "/images/currency/krw.svg",
  NZD: "/images/currency/nzd.svg",
  NGN: "/images/currency/ngn.svg",
  RUB: "/images/currency/rub.svg",
  CZK: "/images/currency/czk.svg",
  CAD: "/images/currency/cad.svg",
  AED: "/images/currency/di.svg",
} as const

type CurrencyCode = keyof typeof currencies

interface CurrencyBadgeProps {
  currency?: CurrencyCode
  className?: string
}

export function CurrencyBadge({ currency = "TRY", className }: CurrencyBadgeProps) {
  return (
    <Image
      src={currencies[currency]}
      alt={currency}
      width={24}
      height={24}
      className={cn("size-6", className)}
    />
  )
}
