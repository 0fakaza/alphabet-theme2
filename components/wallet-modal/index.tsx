"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Cancel01Icon,
  Search01Icon,
  ArrowLeft01Icon,
  ArrowDown01Icon,
  EyeIcon,
  ViewOffIcon,
  HugeiconsIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { useWalletModal } from "@/components/providers/wallet-modal-provider"
import {
  DEPOSIT_METHODS,
  WITHDRAW_METHODS,
  FILTER_TABS,
  type FilterTab,
  type PaymentMethod,
} from "@/data/wallet"
import { Invoice04Icon, PlayCircleIcon, ReverseWithdrawal01Icon } from "@hugeicons-pro/core-solid-sharp"

/* ─────────────────────────────────────────── */
/* ROOT                                         */
/* ─────────────────────────────────────────── */

export function WalletModal() {
  const { isOpen, mode, setMode, close } = useWalletModal()

  const [filter, setFilter] = useState<FilterTab>("all")
  const [search, setSearch] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [hideBalances, setHideBalances] = useState(false)

  if (!isOpen) return null

  const methods = mode === "deposit" ? DEPOSIT_METHODS : WITHDRAW_METHODS

  const filtered = methods.filter((m) => {
    const matchFilter = filter === "all" || m.category === filter
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const grouped = filtered.reduce<Record<string, PaymentMethod[]>>((acc, m) => {
    const key = m.categoryLabel
    if (!acc[key]) acc[key] = []
    acc[key].push(m)
    return acc
  }, {})

  const handleSelectMethod = (m: PaymentMethod) => setSelectedMethod(m)
  const handleBack = () => setSelectedMethod(null)

  const handleModeChange = (newMode: "deposit" | "withdraw") => {
    setMode(newMode)
    setSelectedMethod(null)
    setFilter("all")
    setSearch("")
  }

  /* Deposit + method seçili → geniş split view */
  const isDepositDetail = mode === "deposit" && selectedMethod !== null
  /* Withdraw + method seçili → küçük popup form */
  const isWithdrawDetail = mode === "withdraw" && selectedMethod !== null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-popupHead"
        style={{
          maxWidth: isWithdrawDetail ? "400px" : "960px",
          maxHeight: "calc(100dvh - 32px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {isDepositDetail ? (
          <DepositDetailView
            method={selectedMethod!}
            allMethods={DEPOSIT_METHODS}
            hideBalances={hideBalances}
            mode={mode}
            onSelectMethod={handleSelectMethod}
            onModeChange={handleModeChange}
            onToggleHide={() => setHideBalances((v) => !v)}
            onBack={handleBack}
            onClose={close}
          />
        ) : isWithdrawDetail ? (
          <WithdrawDetailView
            method={selectedMethod!}
            onBack={handleBack}
            onClose={close}
          />
        ) : (
          <ListView
            mode={mode}
            filter={filter}
            search={search}
            grouped={grouped}
            hideBalances={hideBalances}
            onModeChange={handleModeChange}
            onFilterChange={setFilter}
            onSearchChange={setSearch}
            onSelectMethod={handleSelectMethod}
            onToggleHide={() => setHideBalances((v) => !v)}
            onClose={close}
          />
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* SHARED: HEADER (tabs + balance)              */
/* ─────────────────────────────────────────── */

interface ModalHeaderProps {
  mode: "deposit" | "withdraw"
  hideBalances: boolean
  onModeChange: (m: "deposit" | "withdraw") => void
  onToggleHide: () => void
  onClose: () => void
  title?: string
}

function ModalHeader({ mode, hideBalances, onModeChange, onToggleHide, onClose, title = "Yatırım / Çekim" }: ModalHeaderProps) {
  return (
    <div className="shrink-0 bg-popupHead px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-title">{title}</h2>
        <button onClick={onClose} className="text-text-subtext transition-colors hover:text-text-main">
          <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Tabs */}
        <div className="flex gap-1 rounded-md bg-background-bodyAlpha p-1.5">
          <button
            onClick={() => onModeChange("deposit")}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-2 cursor-pointer text-sm font-bold transition-colors",
              mode === "deposit" ? "bg-neutral-dark text-deposit" : "text-text-subtext hover:text-text-main",
            )}
          >
            <HugeiconsIcon icon={Invoice04Icon} className="size-4" /> Para Yatır
          </button>
          <button
            onClick={() => onModeChange("withdraw")}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-2 cursor-pointer text-sm font-bold transition-colors",
              mode === "withdraw" ? "bg-neutral-dark text-deposit" : "text-text-subtext hover:text-text-main",
            )}
          >
            <HugeiconsIcon icon={ReverseWithdrawal01Icon} className="size-4" /> Para Çek
          </button>
        </div>

        {/* Bakiye */}
        <div className="ml-auto flex grow items-center gap-6 rounded-md bg-background-bodyAlpha px-6 py-2 h-[52px]">
          <div className="flex gap-8">
            <div>
              <p className="text-[11px] text-text-subtext">Bakiye</p>
              <p className="text-sm font-semibold text-text-title">{hideBalances ? "••••••••" : "₺15.520.125,52"}</p>
            </div>
            <div>
              <p className="text-[11px] text-text-subtext">Bonus Bakiye</p>
              <p className="text-sm font-semibold text-text-title">{hideBalances ? "••••" : "₺100"}</p>
            </div>
          </div>
          <button
            onClick={onToggleHide}
            className="ml-auto flex items-center gap-1 text-[11px] cursor-pointer text-text-subtext transition-colors hover:text-text-main"
          >
            Bakiyeleri Gizle
            <HugeiconsIcon icon={hideBalances ? ViewOffIcon : EyeIcon} className="size-3.5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* LIST VIEW                                    */
/* ─────────────────────────────────────────── */

interface ListViewProps {
  mode: "deposit" | "withdraw"
  filter: FilterTab
  search: string
  grouped: Record<string, PaymentMethod[]>
  hideBalances: boolean
  onModeChange: (m: "deposit" | "withdraw") => void
  onFilterChange: (f: FilterTab) => void
  onSearchChange: (s: string) => void
  onSelectMethod: (m: PaymentMethod) => void
  onToggleHide: () => void
  onClose: () => void
}

function ListView({
  mode, filter, search, grouped, hideBalances,
  onModeChange, onFilterChange, onSearchChange, onSelectMethod, onToggleHide, onClose,
}: ListViewProps) {
  return (
    <div className="flex h-full flex-col">
      <ModalHeader
        mode={mode}
        hideBalances={hideBalances}
        onModeChange={onModeChange}
        onToggleHide={onToggleHide}
        onClose={onClose}
      />

      {/* Filtreler + Arama */}
      <div className="flex shrink-0 items-center justify-between bg-popupHead px-6 pb-3">
        <div className="flex items-center gap-0.5 flex-wrap">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-bold cursor-pointer transition-colors",
                filter === tab.id ? "text-deposit" : "text-text-subtext hover:text-text-main",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex h-10 items-center gap-1.5 rounded-lg border border-divider-100 bg-background-bodyAlpha px-3">
          <HugeiconsIcon icon={Search01Icon} className="size-4 text-text-subtext" />
          <input
            type="text"
            placeholder="Yöntem Ara"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-28 bg-transparent text-sm text-text-main outline-none placeholder:text-text-subtext"
          />
        </div>
      </div>

      {/* Liste */}
      <div className="overflow-y-auto rounded-t-2xl bg-popup px-6 pb-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-element-border">
        {/* Sütun başlıkları */}
        <div className="sticky top-0 z-[1] bg-popup py-4">
          <div className="grid grid-cols-[1fr_130px_110px_120px_36px] text-[12px] font-medium text-text-subtext">
            <span className="pl-12">Yöntem</span>
            <span>Süre</span>
            <span>Min.</span>
            <span>Max.</span>
            <span />
          </div>
        </div>

        {Object.entries(grouped).map(([category, methods]) => (
          <div key={category} className="mb-4">
            <p className="mb-2 ml-2 text-[13px] font-bold text-text-subtext">{category}</p>
            <div className="flex flex-col gap-1.5">
              {methods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => onSelectMethod(method)}
                  className="grid grid-cols-[1fr_130px_110px_120px_36px] cursor-pointer items-center rounded-xl bg-neutral-100 px-4 py-3 text-left transition-colors hover:bg-neutral-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                      <Image src={method.iconSrc} alt={method.name} width={28} height={28} className="size-7 object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-title">{method.name}</p>
                      <p className="mt-0.5 flex items-center text-[10px] text-primary">
                        Nasıl yatırım yapılır?
                        <HugeiconsIcon className="ml-1 size-3.5" icon={PlayCircleIcon} />
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-text-main">{method.duration}</span>
                  <span className="text-sm text-text-main">{method.min}</span>
                  <span className="text-sm text-text-main">{method.max}</span>
                  <div className="flex items-center justify-center">
                    <span className="flex size-7 items-center justify-center rounded-md bg-neutral-200 text-text-subtext">
                      <HugeiconsIcon icon={ArrowDown01Icon} className="size-3.5 -rotate-90" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(grouped).length === 0 && (
          <p className="py-10 text-center text-sm text-text-subtext">Sonuç bulunamadı</p>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* DEPOSIT DETAIL VIEW — Split (left + right)  */
/* ─────────────────────────────────────────── */

interface DepositDetailViewProps {
  method: PaymentMethod
  allMethods: PaymentMethod[]
  hideBalances: boolean
  mode: "deposit" | "withdraw"
  onSelectMethod: (m: PaymentMethod) => void
  onModeChange: (m: "deposit" | "withdraw") => void
  onToggleHide: () => void
  onBack: () => void
  onClose: () => void
}

function DepositDetailView({
  method, allMethods, hideBalances, mode,
  onSelectMethod, onModeChange, onToggleHide, onBack, onClose,
}: DepositDetailViewProps) {
  const [gridSearch, setGridSearch] = useState("")
  const [network, setNetwork] = useState(method.networks?.[0] ?? "")
  const [networkOpen, setNetworkOpen] = useState(false)
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")

  const filteredGrid = allMethods.filter((m) =>
    m.name.toLowerCase().includes(gridSearch.toLowerCase())
  )

  const groupedGrid = filteredGrid.reduce<Record<string, PaymentMethod[]>>((acc, m) => {
    const key = m.categoryLabel
    if (!acc[key]) acc[key] = []
    acc[key].push(m)
    return acc
  }, {})

  return (
    <div className="flex h-full flex-col">
      <ModalHeader
        mode={mode}
        hideBalances={hideBalances}
        onModeChange={onModeChange}
        onToggleHide={onToggleHide}
        onClose={onClose}
      />

      {/* Body: left grid + right form */}
      <div className="flex flex-1 overflow-hidden rounded-t-2xl bg-popup">
        {/* ── Sol: Method Grid ── */}
        <div className="flex w-[520px] shrink-0 flex-col overflow-hidden border-r border-divider-100">
          {/* Arama + ülke */}
          <div className="flex items-center gap-3 border-b border-divider-100 px-4 py-3">
            <div className="flex flex-1 h-10 items-center gap-1.5 rounded-lg border border-divider-100 bg-background-bodyAlpha px-3">
              <HugeiconsIcon icon={Search01Icon} className="size-4 shrink-0 text-text-subtext" />
              <input
                type="text"
                placeholder="Yöntem Ara"
                value={gridSearch}
                onChange={(e) => setGridSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-text-main outline-none placeholder:text-text-subtext"
              />
            </div>
            <button className="flex items-center gap-1 text-sm font-medium text-text-main">
              <Image src="/images/flags/tr.svg" alt="TR" width={18} height={18} className="size-[18px] rounded-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
              Türkiye
              <HugeiconsIcon icon={ArrowDown01Icon} className="size-3.5 text-text-subtext" />
            </button>
          </div>

          {/* Method groups */}
          <div className="flex-1 overflow-y-auto px-4 py-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-element-border">
            {Object.entries(groupedGrid).map(([category, methods], i) => (
              <div key={category} className={i > 0 ? "mt-4 border-t border-divider-100 pt-4" : ""}>
                <p className="mb-2 text-[13px] font-bold text-text-subtext">{category}</p>
                <div className="grid grid-cols-3 gap-1">
                  {methods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => onSelectMethod(m)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors cursor-pointer",
                        m.id === method.id
                          ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                          : "text-text-main hover:bg-background-bodyAlpha",
                      )}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                        <Image src={m.iconSrc} alt={m.name} width={20} height={20} className="size-5 object-contain" />
                      </div>
                      <span className="truncate text-xs">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sağ: Form ── */}
        <div className="flex flex-1 flex-col overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-element-border">
          {/* Method header */}
          <div className="flex items-center justify-between border-b border-divider-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                <Image src={method.iconSrc} alt={method.name} width={22} height={22} className="size-[22px] object-contain" />
              </div>
              <span className="font-semibold text-text-title">{method.name}</span>
            </div>
            <button className="flex items-center gap-1 text-[11px] text-primary hover:underline">
              Nasıl yatırım yapılır?
              <HugeiconsIcon icon={PlayCircleIcon} className="size-3.5" />
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 px-5 py-5">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {/* Ağ seçin */}
              {method.networks && method.networks.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1 text-[11px] font-medium text-text-subtitle">
                    Ağ seçin <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setNetworkOpen((v) => !v)}
                      className={inputCls + " flex items-center justify-between"}
                    >
                      <span>{network}</span>
                      <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        className={cn("size-4 text-text-subtext transition-transform", networkOpen && "rotate-180")}
                      />
                    </button>
                    {networkOpen && (
                      <>
                        <div className="fixed inset-0 z-[10]" onClick={() => setNetworkOpen(false)} />
                        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-[11] overflow-hidden rounded-xl border border-element-border bg-background-modal shadow-xl">
                          {method.networks!.map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => { setNetwork(n); setNetworkOpen(false) }}
                              className={cn(
                                "flex w-full items-center px-4 py-3 text-left text-sm transition-colors hover:bg-background-elements",
                                n === network ? "font-semibold text-primary" : "text-text-main",
                              )}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Cüzdan Adresi */}
              {method.networks && (
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1 text-[11px] font-medium text-text-subtitle">
                    Cüzdan Adresi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Cüzdan adresinizi girin"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputCls}
                  />
                </div>
              )}

              {/* Tutar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1 text-[11px] font-medium text-text-subtitle">
                    Yatırmak istediğiniz tutar <span className="text-red-500">*</span>
                  </label>
                  <button type="button" className="text-[11px] font-semibold text-primary hover:underline">
                    Tüm Bakiye
                  </button>
                </div>
                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={inputCls}
                />
              </div>

              {/* Çekilebilir */}
              <p className="text-xs text-text-subtext">
                Çekilebilir: <span className="font-semibold text-primary">24.520₺</span>
              </p>

              {/* Min / Süre */}
              <div className="flex items-center gap-6 rounded-xl bg-background-bodyAlpha px-4 py-3">
                <div>
                  <p className="text-[10px] text-text-subtext">Minimum</p>
                  <p className="text-sm font-semibold text-text-title">{method.min}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-subtext">Tah. Süre</p>
                  <p className="text-sm font-semibold text-text-title">{method.duration}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-divider-100" />

              {/* Hesaplama */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[11px] font-medium text-text-subtitle">Hesaplama</p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <select className={cn(inputCls, "appearance-none pr-8")}>
                      <option>100</option>
                      <option>500</option>
                      <option>1000</option>
                    </select>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-subtext" />
                  </div>
                  <div className="relative flex-1">
                    <select className={cn(inputCls, "appearance-none pr-8")}>
                      <option>100</option>
                      <option>500</option>
                      <option>1000</option>
                    </select>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-subtext" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center rounded-xl bg-action-secondary-default text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Para Yatır
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Geri Dön */}
      <button
        onClick={onBack}
        className="absolute left-6 top-[22px] flex items-center gap-1.5 text-xs text-text-subtext transition-colors hover:text-text-main"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5" />
        Geri
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* WITHDRAW DETAIL VIEW — Small popup           */
/* ─────────────────────────────────────────── */

interface WithdrawDetailViewProps {
  method: PaymentMethod
  onBack: () => void
  onClose: () => void
}

function WithdrawDetailView({ method, onBack, onClose }: WithdrawDetailViewProps) {
  const [network, setNetwork] = useState(method.networks?.[0] ?? "")
  const [networkOpen, setNetworkOpen] = useState(false)
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")

  return (
    <div
      className="flex h-full flex-col overflow-y-auto bg-popup [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-element-border"
    >
      {/* Başlık */}
      <div className="bg-popup px-6 pb-4 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="cursor-pointer flex items-center gap-1.5 text-sm text-text-subtext transition-colors hover:text-text-main"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
            Geri Dön
          </button>
          <button onClick={onClose} className="text-text-subtext transition-colors hover:text-text-main">
            <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image src={method.iconSrc} alt={method.name} width={26} height={26} className="size-[26px] object-contain" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-title">{method.name} Çek</h2>
            <p className="text-xs text-text-subtext">{method.categoryLabel}</p>
          </div>
          <button className="ml-auto flex items-center gap-1 text-[11px] text-primary hover:underline">
            Nasıl yapılır?
            <HugeiconsIcon icon={PlayCircleIcon} className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="border-t border-divider-100 px-6 py-5">
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          {/* Ağ seçin — kripto */}
          {method.networks && method.networks.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1 text-[11px] font-medium text-text-subtitle">
                Ağ seçin <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNetworkOpen((v) => !v)}
                  className={inputCls + " flex items-center justify-between"}
                >
                  <span>{network}</span>
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className={cn("size-4 text-text-subtext transition-transform", networkOpen && "rotate-180")}
                  />
                </button>
                {networkOpen && (
                  <>
                    <div className="fixed inset-0 z-[10]" onClick={() => setNetworkOpen(false)} />
                    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-[11] overflow-hidden rounded-xl border border-element-border bg-background-modal shadow-xl">
                      {method.networks!.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => { setNetwork(n); setNetworkOpen(false) }}
                          className={cn(
                            "flex w-full items-center px-4 py-3 text-left text-sm transition-colors hover:bg-background-elements",
                            n === network ? "font-semibold text-primary" : "text-text-main",
                          )}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Cüzdan Adresi — kripto */}
          {method.networks && (
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1 text-[11px] font-medium text-text-subtitle">
                Cüzdan Adresi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Cüzdan adresinizi girin"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputCls}
              />
            </div>
          )}

          {/* Tutar */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1 text-[11px] font-medium text-text-subtitle">
                Çekmek istediğiniz tutar <span className="text-red-500">*</span>
              </label>
              <button type="button" className="text-[11px] font-semibold text-primary hover:underline">
                Tüm Bakiye
              </button>
            </div>
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Çekilebilir */}
          <p className="text-xs text-text-subtext">
            Çekilebilir: <span className="font-semibold text-primary">24.520₺</span>
          </p>

          {/* Min / Süre */}
          <div className="flex items-center gap-6 rounded-xl bg-background-bodyAlpha px-4 py-3">
            <div>
              <p className="text-[10px] text-text-subtext">Minimum</p>
              <p className="text-sm font-semibold text-text-title">{method.min}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-subtext">Tah. Süre</p>
              <p className="text-sm font-semibold text-text-title">{method.duration}</p>
            </div>
          </div>

          {/* Hesaplama — kripto */}
          {method.networks && (
            <>
              <div className="h-px w-full bg-divider-100" />
              <div className="flex flex-col gap-1.5">
                <p className="text-[11px] font-medium text-text-subtitle">Hesaplama</p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <select className={cn(inputCls, "appearance-none pr-8")}>
                      <option>100</option>
                      <option>500</option>
                      <option>1000</option>
                    </select>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-subtext" />
                  </div>
                  <div className="relative flex-1">
                    <select className={cn(inputCls, "appearance-none pr-8")}>
                      <option>100</option>
                      <option>500</option>
                      <option>1000</option>
                    </select>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-subtext" />
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center rounded-xl bg-action-secondary-default text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Para Çek
          </button>
        </form>
      </div>
    </div>
  )
}

const inputCls =
  "w-full rounded-xl border border-element-border bg-background-bodyAlpha px-4 py-3 text-sm text-text-main outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/40 placeholder:text-text-subtext/60"
