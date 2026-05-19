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
  /** Kripto için ek alan: ağ seçimi */
  networks?: string[]
  /** Havale/EFT için cüzdan adresi yerine tutar yeterli mi */
  simpleForm?: boolean
}

export const DEPOSIT_METHODS: PaymentMethod[] = [
  {
    id: "tether",
    name: "Tether",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/usdt.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    networks: ["TRX – Tron (TRC20)", "ETH – Ethereum (ERC20)", "BEP20 – BNB Smart Chain"],
  },
  {
    id: "tron",
    name: "Tron",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/trx.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    networks: ["TRX – Tron (TRC20)"],
  },
  {
    id: "hizli-havale",
    name: "Hızlı Havale / Fast",
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
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    simpleForm: true,
  },
  {
    id: "tosla",
    name: "Tosla",
    category: "havale-eft",
    categoryLabel: "Havale / EFT",
    iconSrc: "/images/currency/tosla.svg",
    duration: "Anında",
    min: "₺1.300",
    max: "₺10.000.000",
    simpleForm: true,
  },
]

export const WITHDRAW_METHODS: PaymentMethod[] = [
  {
    id: "tether",
    name: "Tether",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/usdt.svg",
    duration: "Anında",
    min: "10 Tether (10$)",
    max: "₺10.000.000",
    networks: ["TRX – Tron (TRC20)", "ETH – Ethereum (ERC20)", "BEP20 – BNB Smart Chain"],
  },
  {
    id: "tron",
    name: "Tron",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/trx.svg",
    duration: "Anında",
    min: "10 Tether (10$)",
    max: "₺10.000.000",
    networks: ["TRX – Tron (TRC20)"],
  },
  {
    id: "hizli-havale",
    name: "Hızlı Havale / Fast",
    category: "kripto",
    categoryLabel: "Kripto Paralar",
    iconSrc: "/images/currency/havale.svg",
    duration: "Anında",
    min: "10 Tether (10$)",
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
  },
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
