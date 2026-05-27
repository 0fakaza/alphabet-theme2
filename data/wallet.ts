export type PaymentCategory = "kripto" | "havale-eft" | "qr" | "kredi-karti" | "mobil"

export interface PaymentMethod {
  id: string
  name: string
  category: PaymentCategory
  categoryLabel: string
  iconSrc: string
  duration: string
  min: string
  max: string
  networks?: string[]
  simpleForm?: boolean
  disabled?: boolean
  comingSoon?: boolean
  iconBg?: string
  
  cryptoSymbol?: string
  
  withdrawable?: string
}

const CRYPTO_PICKER: PaymentMethod[] = [
  {
    id: "tether",
    name: "Tether",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/usdt.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    networks: ["TRC20 - TRX", "ETH – Ethereum (ERC20)", "BEP20 - BNB Smart Chain"],
    cryptoSymbol: "USDT (TETHER)",
    withdrawable: "252$",
  },
  {
    id: "usdc",
    name: "USDC",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/usdc.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    networks: ["ETH – Ethereum (ERC20)", "BEP20 - BNB Smart Chain"],
    cryptoSymbol: "USDC",
    withdrawable: "252$",
  },
  {
    id: "tron",
    name: "TRX",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/trx.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    networks: ["TRC20 - TRX"],
    cryptoSymbol: "TRX",
    withdrawable: "252$",
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/btc.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    networks: ["Bitcoin Network"],
    cryptoSymbol: "BTC",
    withdrawable: "252$",
  },
  {
    id: "ethereum",
    name: "Etherium",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/eth.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    networks: ["ETH – Ethereum (ERC20)"],
    cryptoSymbol: "ETH",
    withdrawable: "252$",
  },
  {
    id: "ton",
    name: "Ton",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/ton.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    networks: ["TON Network"],
    cryptoSymbol: "TON",
    withdrawable: "252$",
  },
  {
    id: "matic",
    name: "Matic",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/matic.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    networks: ["Polygon Network"],
    cryptoSymbol: "MATIC",
    withdrawable: "252$",
  },
  {
    id: "dai",
    name: "Dai",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/usdc.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    disabled: true,
    comingSoon: true,
  },
]

const FIAT_PICKER: PaymentMethod[] = [
  {
    id: "hizli-havale",
    name: "Hızlı Havale",
    category: "havale-eft",
    categoryLabel: "Havale / EFT",
    iconSrc: "/images/currency/havale.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    simpleForm: true,
  },
  {
    id: "peppara",
    name: "Peppara",
    category: "havale-eft",
    categoryLabel: "Havale / EFT",
    iconSrc: "/images/currency/pep.svg",
    duration: "1 Dakikadan Az",
    min: "50 TRY",
    max: "₺10.000.000",
    simpleForm: true,
    iconBg: "#049e89",
  },
  {
    id: "tosla",
    name: "Tosla",
    category: "havale-eft",
    categoryLabel: "Havale / EFT",
    iconSrc: "/images/currency/tosla.svg",
    duration: "1 Dakikadan Az",
    min: "50 TRY",
    max: "₺10.000.000",
    simpleForm: true,
    iconBg: "#f3cdcd",
  },
]

export const PICKER_CRYPTO_METHODS = CRYPTO_PICKER
export const PICKER_FIAT_METHODS = FIAT_PICKER
export const DEPOSIT_METHODS = [...CRYPTO_PICKER, ...FIAT_PICKER]
export const WITHDRAW_METHODS = [
  ...CRYPTO_PICKER.map((m) => ({
    ...m,
    min: m.category === "kripto" ? "10 Tether (10$)" : m.min,
  })),
  ...FIAT_PICKER,
]

export const FILTER_TABS = [
  { id: "all", label: "Tümü" },
  { id: "havale-eft", label: "Havale / EFT" },
  { id: "kripto", label: "Kripto Paralar" },
  { id: "qr", label: "QR" },
  { id: "kredi-karti", label: "Kredi Kartı" },
  { id: "mobil", label: "Mobil" },
] as const

export type FilterTab = (typeof FILTER_TABS)[number]["id"]

export function filterPickerMethods(
  methods: PaymentMethod[],
  search: string
): PaymentMethod[] {
  const q = search.trim().toLowerCase()
  if (!q) return methods
  return methods.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.categoryLabel.toLowerCase().includes(q)
  )
}

export function isFiatMethod(method: PaymentMethod): boolean {
  return method.category === "havale-eft" || Boolean(method.simpleForm)
}
