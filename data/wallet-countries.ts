export type WalletCountry = {
  id: string
  name: string
  flag: string
  currencyCode: string
  currencyLabel: string
  currencySymbol: string
}

export const WALLET_COUNTRIES: WalletCountry[] = [
  {
    id: "tr",
    name: "Türkiye",
    flag: "/images/flags/154-turkey.svg",
    currencyCode: "TRY",
    currencyLabel: "Türk Lirası",
    currencySymbol: "₺",
  },
  {
    id: "de",
    name: "Almanya",
    flag: "/images/flags/208-germany.svg",
    currencyCode: "EUR",
    currencyLabel: "Euro",
    currencySymbol: "€",
  },
  {
    id: "gb",
    name: "İngiltere",
    flag: "/images/flags/110-united kingdom.svg",
    currencyCode: "GBP",
    currencyLabel: "İngiliz Sterlini",
    currencySymbol: "£",
  },
  {
    id: "fr",
    name: "Fransa",
    flag: "/images/flags/197-france.svg",
    currencyCode: "EUR",
    currencyLabel: "Euro",
    currencySymbol: "€",
  },
  {
    id: "nl",
    name: "Hollanda",
    flag: "/images/flags/077-netherlands.svg",
    currencyCode: "EUR",
    currencyLabel: "Euro",
    currencySymbol: "€",
  },
]

export const DEFAULT_WALLET_COUNTRY_ID = "tr"


export function isFiatCountry(countryId: string): boolean {
  return countryId === "tr"
}


const CRYPTO_TO_FIAT: Record<string, Record<string, number>> = {
  tether: { TRY: 34.2, EUR: 0.92, GBP: 0.79 },
  usdc: { TRY: 34.2, EUR: 0.92, GBP: 0.79 },
  tron: { TRY: 11.5, EUR: 0.31, GBP: 0.27 },
  bitcoin: { TRY: 2_450_000, EUR: 66_000, GBP: 56_000 },
  ethereum: { TRY: 125_000, EUR: 3_350, GBP: 2_850 },
  ton: { TRY: 185, EUR: 4.98, GBP: 4.25 },
  matic: { TRY: 28, EUR: 0.75, GBP: 0.64 },
}

const DEFAULT_RATE = { TRY: 34.2, EUR: 0.92, GBP: 0.79 }

export function getCryptoToFiatRate(
  methodId: string,
  currencyCode: string
): number {
  return (
    CRYPTO_TO_FIAT[methodId]?.[currencyCode] ??
    DEFAULT_RATE[currencyCode as keyof typeof DEFAULT_RATE] ??
    1
  )
}
