"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  formatDisplayDateRange,
  isTransactionInRange,
  type DateRangeValue,
} from "@/lib/date"
import { DatePicker } from "@/components/elements/date-picker"
import {
  HugeiconsIcon,
  Clock01Icon,
  Cancel01Icon,
  Copy01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Folder02Icon,
} from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Button } from "@/components/elements/button"

/* ─────────────────────────── Types ─────────────────────────── */
type MainTab = "spor" | "casino" | "odeme"
type OdemeSubTab = "yatirimlar" | "cekinler"
type KuponStatus = "beklemede" | "kazandi" | "kaybetti" | "satildi" | "freebet" | "iptal"
type KuponType = "tekli" | "kombine" | "coklu"
type OdemeStatus = "onaylandi" | "reddedildi" | "bekliyor" | "kyc"

/* ─────────────────────────── Status helpers ─────────────────── */
function KuponStatusBadge({ s }: { s: KuponStatus }) {
  const map: Record<KuponStatus, { label: string; cls: string; dotCls: string }> = {
    beklemede: {
      label: "Beklemede",
      cls: "bg-amber-500/15 text-amber-400",
      dotCls: "bg-amber-400",
    },
    kazandi: {
      label: "Kazandı",
      cls: "bg-green-500/15 text-green-400",
      dotCls: "bg-green-400",
    },
    kaybetti: {
      label: "Kaybetti",
      cls: "bg-red-500/15 text-red-400",
      dotCls: "bg-red-400",
    },
    satildi: {
      label: "Satıldı",
      cls: "bg-orange-500/15 text-orange-400",
      dotCls: "bg-orange-400",
    },
    freebet: {
      label: "Freebet",
      cls: "bg-blue-500/15 text-blue-400",
      dotCls: "bg-blue-400",
    },
    iptal: {
      label: "İptal",
      cls: "bg-neutral-500/30 text-text-subtext",
      dotCls: "bg-text-subtext",
    },
  }
  const { label, cls, dotCls } = map[s]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[7px] px-2 py-1 text-[11px] font-semibold",
        historyTableCellNowrap,
        cls
      )}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", dotCls)}
        aria-hidden
      />
      {label}
    </span>
  )
}

function KuponTypeBadge({ t }: { t: KuponType }) {
  const map: Record<KuponType, { label: string; cls: string }> = {
    tekli:   { label: "Tekli Bahis", cls: "bg-primary/20 text-primary" },
    kombine: { label: "Kombine",     cls: "bg-orange-500/20 text-orange-400" },
    coklu:   { label: "Çoklu",      cls: "bg-teal-500/20 text-teal-400" },
  }
  const { label, cls } = map[t]
  return <span className={cn("rounded-md px-2 py-0.5 text-[11px] font-medium", cls)}>{label}</span>
}

const kuponTypeCellConfig: Record<
  KuponType,
  { label: string; icon?: string }
> = {
  tekli: {
    label: "Tekli Bahis",
    icon: "/images/icons/kuponTipi-tekli.svg",
  },
  kombine: {
    label: "Kombine",
    icon: "/images/icons/kuponTipi-kombine.svg",
  },
  coklu: {
    label: "Çoklu",
    icon: "/images/icons/kuponTipi-multi.svg",
  },
}

function KuponTypeCell({ t }: { t: KuponType }) {
  const { label, icon } = kuponTypeCellConfig[t]
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium text-text-main",
        historyTableCellNowrap
      )}
    >
      {icon && (
        <Image src={icon} alt="" width={24} height={24} className="shrink-0" />
      )}
      <span>{label}</span>
    </div>
  )
}

function OdemeBadge({ s }: { s: OdemeStatus }) {
  const map: Record<OdemeStatus, { label: string; cls: string }> = {
    onaylandi: { label: "✓ Onaylandı",     cls: "bg-green-500/15 text-green-400" },
    reddedildi:{ label: "Reddedildi",      cls: "bg-red-500/15 text-red-400" },
    bekliyor:  { label: "Onay bekliyor",   cls: "bg-amber-500/15 text-amber-400" },
    kyc:       { label: "KYC İzlendi",     cls: "bg-primary/15 text-primary" },
  }
  const { label, cls } = map[s]
  return <span className={cn("rounded-md px-2.5 text-nowrap py-1 text-[11px] font-medium", cls)}>{label}</span>
}

/* ─────────────────────────── Data ─────────────────────────── */
const sporActiveKuponlar = [
  { id: "42349992...", type: "coklu" as KuponType, tarih: "14.02.2025 14:30", bahis: 10000, oran: 14.02, maxKazanc: 10000, status: "beklemede" as KuponStatus, isActive: true },
]

const sporGecmisKuponlar = [
  { id: "42349992...", type: "tekli" as KuponType, tarih: "14.02.2025 14:30", bahis: 10000, oran: 3.25, maxKazanc: 10000, status: "kazandi" as KuponStatus, isActive: false },
  { id: "42349692...", type: "kombine" as KuponType, tarih: "14.02.2025 14:30", bahis: 10000, oran: 3.25, maxKazanc: 10000, status: "kaybetti" as KuponStatus, isActive: false },
  { id: "42349992...", type: "tekli" as KuponType, tarih: "14.02.2025 14:30", bahis: 10000, oran: 3.25, maxKazanc: 10000, status: "satildi" as KuponStatus, isActive: false },
  { id: "42349992...", type: "tekli" as KuponType, tarih: "14.02.2025 14:30", bahis: 10000, oran: 3.25, maxKazanc: 20000, status: "freebet" as KuponStatus, isActive: false },
  { id: "42349692...", type: "kombine" as KuponType, tarih: "14.02.2025 14:30", bahis: 10000, oran: 3.25, maxKazanc: 10000, status: "kaybetti" as KuponStatus, isActive: false },
  { id: "42349992...", type: "tekli" as KuponType, tarih: "14.02.2025 14:30", bahis: 10000, oran: 3.25, maxKazanc: 10000, status: "satildi" as KuponStatus, isActive: false },
]

const casinoIslemler = [
  { id: "42349992...", game: "Starlight Princess", tarih: "14.02.2025 14:30", bahis: 10000, oran: 3.25, kazanc: 10000, isActive: true,  type: "tekli" as KuponType, status: "beklemede" as KuponStatus },
  { id: "42349992...", game: "Flaming Hot",        tarih: "14.02.2025 14:30", bahis: 10000, oran: 3.25, kazanc: 10000, isActive: false, type: "tekli" as KuponType, status: "kazandi"   as KuponStatus },
  { id: "42349992...", game: "Gates of Olympus",   tarih: "14.02.2025 14:30", bahis: 10000, oran: 0.1,  kazanc: 10000, isActive: false, type: "tekli" as KuponType, status: "kaybetti"  as KuponStatus },
]

const yatirimIslemler = [
  { tur: "Kripto",         yontem: "Bitcoin",    txid: "TXID", tarih: "10.02.2025 09:15", tutar: 25000, status: "onaylandi"  as OdemeStatus },
  { tur: "Banka Havalesi", yontem: "Akbank",     txid: null,   tarih: "11.02.2025 11:40", tutar: 15000, status: "onaylandi"  as OdemeStatus },
  { tur: "Kripto",         yontem: "USDT",       txid: "TXID", tarih: "12.02.2025 14:30", tutar: 10000, status: "bekliyor"   as OdemeStatus },
  { tur: "Ödemix Havale",  yontem: "Kredi Kartı",txid: null,   tarih: "13.02.2025 16:00", tutar: 5000,  status: "reddedildi" as OdemeStatus },
]

const cekirIslemler = [
  { tur: "Kripto",         yontem: "Etherium",   txid: "TXID", tarih: "14.02.2025 14:30", tutar: 10000, status: "onaylandi"  as OdemeStatus },
  { tur: "Ödemix Havale",  yontem: "Kredi Kartı",txid: null,   tarih: "14.02.2025 14:30", tutar: 10000, status: "reddedildi" as OdemeStatus },
  { tur: "Kripto",         yontem: "USDT",       txid: "TXID", tarih: "14.02.2025 14:30", tutar: 10000, status: "bekliyor"   as OdemeStatus },
  { tur: "Kripto",         yontem: "Etherium",   txid: null,   tarih: "14.02.2025 14:30", tutar: 10000, status: "kyc"        as OdemeStatus },
]

const sporMatchRows = [
  { home: "Galatasaray", homeScore: 2, away: "Real Madrid", awayScore: 2, market: "MS", result: "Galatasaray", odds: "x4.61" },
  { home: "Galatasaray", homeScore: 2, away: "Real Madrid", awayScore: 2, market: "MS", result: "Galatasaray", odds: "x4.61" },
  { home: "Galatasaray", homeScore: 2, away: "Real Madrid", awayScore: 2, market: "MS", result: "Galatasaray", odds: "x4.61" },
  { home: "Galatasaray", homeScore: 2, away: "Real Madrid", awayScore: 2, market: "MS", result: "Galatasaray", odds: "x4.61" },
]

/* ─────────────────────────── Helpers ─────────────────────────── */
function Coin({ amount }: { amount: number }) {
  return (
    <div className={cn("flex items-center gap-1", historyTableCellNowrap)}>
      <Image
        src="/images/currency/try.svg"
        alt="TRY"
        width={16}
        height={16}
        className="size-4 shrink-0"
      />
      <span className="text-sm font-medium text-text-main">{amount.toLocaleString()}</span>
    </div>
  )
}

function getOranPillClass(status: KuponStatus) {
  const base = cn(
    "inline-flex items-center rounded-[30px] px-2.5 py-0.5 text-sm font-medium",
    historyTableCellNowrap
  )
  if (status === "kaybetti") {
    return cn(base, "bg-semantic-error-bg text-semantic-error")
  }
  return cn(base, "bg-semantic-success-bg text-semantic-success")
}

const statCardLabelToneClass = {
  kazanc: "text-[#9BBC14]",
  kayip: "text-[#F82E2E]",
  satildi: "text-[#FB8C4B]",
  iade: "text-[#AC96FD]",
  karZarar: "text-text-main",
  default: "text-text-subtext",
} as const

type StatCardLabelTone = keyof typeof statCardLabelToneClass

function StatCard({
  label,
  amount,
  sub,
  green,
  labelTone = "default",
  className,
}: {
  label: string
  amount: string
  sub?: string
  green?: boolean
  labelTone?: StatCardLabelTone
  className?: string
}) {
  return (
    <div className={cn("min-w-[120px] rounded-md bg-background-elements px-4 py-5", className)}>
      <p className={cn("mb-1 text-xs", statCardLabelToneClass[labelTone])}>{label}</p>
      <p
        className={cn(
          "text-sm font-bold",
          green ? "text-[#9BBC14]" : "text-text-title"
        )}
      >
        {amount}
      </p>
      {sub && <p className="mt-0.5 text-[10px] text-text-subtext">{sub}</p>}
    </div>
  )
}

const historyTableClass =
  "w-full border-separate border-spacing-y-2 max-md:[&_th]:whitespace-nowrap max-md:[&_td]:whitespace-nowrap"
const historyTableCellNowrap = "max-md:whitespace-nowrap"
const historyTableBodyRowClass =
  "cursor-pointer transition-colors [&>td]:bg-neutral-300 [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-lg hover:[&>td]:bg-neutral-500"
const historyTableBodyRowStaticClass =
  "transition-colors [&>td]:bg-neutral-300 [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-lg hover:[&>td]:bg-neutral-500"

const sporTableHeadLabel = cn(
  "text-left text-[12px] font-medium text-text-subtitle",
  historyTableCellNowrap
)
const sporTableLeftGroup =
  "flex w-max max-w-full items-center gap-x-6 max-md:whitespace-nowrap"
const sporTableLeftColId = "flex min-w-[148px] shrink-0 items-center gap-2"
const sporTableLeftColType = "min-w-[100px] shrink-0 text-left"
const sporTableLeftColDate =
  "min-w-[120px] shrink-0 text-left text-xs text-text-subtext whitespace-nowrap"
const sporTableHeadColDate = cn(sporTableHeadLabel, "block min-w-[120px] text-left")
const sporTableRightGroup =
  "flex items-center gap-x-8 max-md:whitespace-nowrap"
const sporTableRightCol = "flex min-w-[72px] justify-end"
const historyTableScrollWrap =
  "overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]"
const sporHistoryTableClass = cn(
  historyTableClass,
  "w-full min-w-[820px] md:min-w-0 md:table-fixed"
)
const casinoHistoryTableClass = cn(historyTableClass, "w-full min-w-[640px]")
const odemeHistoryTableClass = cn(historyTableClass, "w-full min-w-[560px]")

function HistoryTableScroll({ children }: { children: React.ReactNode }) {
  return <div className={historyTableScrollWrap}>{children}</div>
}

function HistoryTableEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center ">
      <div
        className="mb-5 flex size-20 items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #872aff 0%, #a350ff 40%, #5eb3ff 100%)",
        }}
      >
        <HugeiconsIcon
          icon={Folder02Icon}
          className="size-9 text-white"
          strokeWidth={1.5}
        />
      </div>
      <p className="text-base font-semibold text-text-title">Buralar boş</p>
      <p className="mt-1.5 text-sm text-text-subtext">{message}</p>
    </div>
  )
}

type SporKuponRow = {
  id: string
  type: KuponType
  tarih: string
  bahis: number
  oran: number
  maxKazanc: number
  status: KuponStatus
}

function HistoryIdCell({
  id,
  ariaLabel = "Detaya git",
}: {
  id: string
  ariaLabel?: string
}) {
  return (
    <div className={sporTableLeftColId}>
      <a
        href="#"
        onClick={(e) => e.stopPropagation()}
        className="truncate font-mono text-xs text-text-subtext underline decoration-solid underline-offset-2 hover:text-text-main"
      >
        {id}
      </a>
      <button
        type="button"
        onClick={(e) => e.stopPropagation()}
        className="shrink-0 text-[#6781FF]"
        aria-label={ariaLabel}
      >
        <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-3.5" />
      </button>
    </div>
  )
}

function SporKuponTableHead() {
  return (
    <thead>
      <tr>
        <th className="w-px whitespace-nowrap px-4 pb-2 align-bottom">
          <div className={sporTableLeftGroup}>
            <span className={cn(sporTableHeadLabel, "block min-w-[148px] text-left")}>
              KUPON ID
            </span>
            <span className={cn(sporTableHeadLabel, "block min-w-[100px] text-left")}>
              TYPE
            </span>
            <span className={sporTableHeadColDate}>TARİH</span>
          </div>
        </th>
        <th className="w-full px-4 pb-2 align-bottom">
          <div className={cn(sporTableRightGroup, "ml-auto justify-end")}>
            <span className={cn(sporTableHeadLabel, sporTableRightCol)}>BAHİS</span>
            <span className={cn(sporTableHeadLabel, sporTableRightCol)}>ORAN</span>
            <span className={cn(sporTableHeadLabel, sporTableRightCol)}>
              MAX KAZANÇ
            </span>
            <span className={cn(sporTableHeadLabel, sporTableRightCol)}>DURUM</span>
          </div>
        </th>
      </tr>
    </thead>
  )
}

function SporKuponTableRow({
  kupon,
  onRowClick,
}: {
  kupon: SporKuponRow
  onRowClick: () => void
}) {
  return (
    <tr className={historyTableBodyRowClass} onClick={onRowClick}>
      <td className="w-px whitespace-nowrap px-4 py-3">
        <div className={sporTableLeftGroup}>
          <HistoryIdCell id={kupon.id} ariaLabel="Kupon detayına git" />
          <div className={sporTableLeftColType}>
            <KuponTypeCell t={kupon.type} />
          </div>
          <span className={sporTableLeftColDate}>{kupon.tarih}</span>
        </div>
      </td>
      <td className={cn("w-full px-4 py-3", historyTableCellNowrap)}>
        <div className={cn(sporTableRightGroup, "ml-auto justify-end")}>
          <div className={sporTableRightCol}>
            <Coin amount={kupon.bahis} />
          </div>
          <div className={sporTableRightCol}>
            <span className={getOranPillClass(kupon.status)}>x {kupon.oran}</span>
          </div>
          <div className={sporTableRightCol}>
            <Coin amount={kupon.maxKazanc} />
          </div>
          <div className={cn(sporTableRightCol, "flex justify-end")}>
            <KuponStatusBadge s={kupon.status} />
          </div>
        </div>
      </td>
    </tr>
  )
}

/* ─────────────────────────── Main page ─────────────────────────── */
const defaultDateRange: DateRangeValue = {
  start: "2025-02-01",
  end: "2025-02-28",
}

export default function GecmisIslemlerimPage() {
  const [mainTab, setMainTab] = useState<MainTab>("spor")
  const [odemeSubTab, setOdemeSubTab] = useState<OdemeSubTab>("yatirimlar")
  const [dateRange, setDateRange] = useState<DateRangeValue>(defaultDateRange)
  type SelectedKupon = { id: string; tarih: string; isActive: boolean; type: KuponType; status: KuponStatus; game?: string; bahis?: number; oran?: number; maxKazanc?: number }
  const [selectedKupon, setSelectedKupon] = useState<SelectedKupon | null>(null)
  const [cashoutOpen, setCashoutOpen] = useState(false)
  const [cashoutAmount, setCashoutAmount] = useState("1256")
  const inRange = (tarih: string) => isTransactionInRange(tarih, dateRange)

  const filteredSporActive = useMemo(
    () => sporActiveKuponlar.filter((k) => inRange(k.tarih)),
    [dateRange]
  )
  const filteredSporGecmis = useMemo(
    () => sporGecmisKuponlar.filter((k) => inRange(k.tarih)),
    [dateRange]
  )
  const filteredCasino = useMemo(
    () => casinoIslemler.filter((k) => inRange(k.tarih)),
    [dateRange]
  )
  const filteredYatirim = useMemo(
    () => yatirimIslemler.filter((k) => inRange(k.tarih)),
    [dateRange]
  )
  const filteredCekim = useMemo(
    () => cekirIslemler.filter((k) => inRange(k.tarih)),
    [dateRange]
  )

  const rangeLabel = formatDisplayDateRange(dateRange) || "Tarih aralığı"

  const filteredOdeme =
    odemeSubTab === "yatirimlar" ? filteredYatirim : filteredCekim

  function openSporKupon(k: typeof sporActiveKuponlar[0]) {
    setSelectedKupon({ id: k.id, tarih: k.tarih, isActive: k.isActive, type: k.type, status: k.status, bahis: k.bahis, oran: k.oran, maxKazanc: k.maxKazanc })
    setCashoutOpen(false)
  }
  function openCasinoKupon(r: typeof casinoIslemler[0]) {
    setSelectedKupon({ id: r.id, tarih: r.tarih, isActive: r.isActive, type: r.type, status: r.status, game: r.game, bahis: r.bahis, oran: r.oran, maxKazanc: r.kazanc })
    setCashoutOpen(false)
  }

  return (
    <>
      <AccountPageLayout title="Geçmiş İşlemlerim" icon={Clock01Icon}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-xl bg-background-elements p-1">
            {(["spor", "casino", "odeme"] as MainTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setMainTab(t)}
                className={cn(
                  "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                  mainTab === t
                    ? "bg-background-modal text-text-title shadow-sm"
                    : "text-text-subtext hover:text-text-main"
                )}
              >
                {t === "spor"
                  ? "Spor"
                  : t === "casino"
                    ? "Casino"
                    : "Yatırım / Çekim"}
              </button>
            ))}
          </div>
          <div className="flex w-full flex-col gap-1.5 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
            <span className="text-sm text-text-subtext">Tarih aralığı</span>
            <DatePicker
              mode="range"
              value={dateRange}
              onChange={setDateRange}
              aria-label="Tarih aralığı"
              triggerClassName="h-10 min-w-[220px] sm:min-w-[240px]"
            />
          </div>
        </div>

        {mainTab === "spor" && (
          <>
            <div className="mb-5 flex flex-wrap gap-3">
              <StatCard
                label="Kazanç"
                labelTone="kazanc"
                amount="$14.520"
                sub="8 kupon"
                className="max-w-[160px] flex-1"
              />
              <StatCard
                label="Kaybı"
                labelTone="kayip"
                amount="$14.520"
                sub="8 kupon"
                className="max-w-[160px] flex-1"
              />
              <StatCard
                label="Satılık"
                labelTone="satildi"
                amount="$14.520"
                sub="8 kupon"
                className="max-w-[160px] flex-1"
              />
              <StatCard
                label="İade"
                labelTone="iade"
                amount="$14.520"
                sub="8 kupon"
                className="max-w-[160px] flex-1"
              />
              <StatCard
                label="Kar/Zarar"
                labelTone="karZarar"
                amount="+$420.52"
                sub={rangeLabel}
                green
                className="min-w-0 flex-1"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <p className="mb-3 text-sm font-semibold text-text-title">
                  Aktif Kuponlar
                </p>
                {filteredSporActive.length === 0 ? (
                  <HistoryTableEmptyState message="Kupon bulunmuyor" />
                ) : (
                  <HistoryTableScroll>
                    <table className={sporHistoryTableClass}>
                      <SporKuponTableHead />
                      <tbody>
                        {filteredSporActive.map((k, i) => (
                          <SporKuponTableRow
                            key={i}
                            kupon={k}
                            onRowClick={() => openSporKupon(k)}
                          />
                        ))}
                      </tbody>
                    </table>
                  </HistoryTableScroll>
                )}
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-text-title">
                  Geçmiş Kuponlar
                </p>
                {filteredSporGecmis.length === 0 ? (
                  <HistoryTableEmptyState message="Kupon bulunmuyor" />
                ) : (
                  <>
                    <HistoryTableScroll>
                      <table className={sporHistoryTableClass}>
                        <SporKuponTableHead />
                        <tbody>
                          {filteredSporGecmis.map((k, i) => (
                            <SporKuponTableRow
                              key={i}
                              kupon={k}
                              onRowClick={() => openSporKupon(k)}
                            />
                          ))}
                        </tbody>
                      </table>
                    </HistoryTableScroll>
                    <div className="flex items-center justify-center gap-1.5 px-4 py-3 md:justify-end">
                      <button className="flex size-10 cursor-pointer items-center justify-center rounded-[10px] bg-neutral-500 text-icon hover:border-primary hover:text-primary">
                        <HugeiconsIcon
                          icon={ArrowLeft01Icon}
                          className="size-4"
                        />
                      </button>
                      {[1, 2, 3, 14].map((p) => (
                        <button
                          key={p}
                          className={cn(
                            "flex size-10 cursor-pointer items-center justify-center rounded-[10px] bg-neutral-500 text-sm font-medium transition duration-400",
                            p === 1
                              ? "bg-primary text-white"
                              : "text-text-subtext hover:text-primary"
                          )}
                        >
                          {p}
                        </button>
                      ))}
                      <button className="flex size-10 cursor-pointer items-center justify-center rounded-[10px] bg-neutral-500 text-icon hover:border-primary hover:text-primary">
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          className="size-4"
                        />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {mainTab === "casino" && (
          <>
            {filteredCasino.length === 0 ? (
              <HistoryTableEmptyState message="İşlem bulunmuyor" />
            ) : (
              <HistoryTableScroll>
                <table className={casinoHistoryTableClass}>
                  <thead>
                    <tr>
                      <th
                        className={cn(
                          "px-5 text-left text-[11px] font-medium text-text-subtext",
                          historyTableCellNowrap
                        )}
                      >
                        ID
                      </th>
                      <th
                        className={cn(
                          "px-5 text-left text-[11px] font-medium text-text-subtext",
                          historyTableCellNowrap
                        )}
                      >
                        TYPE
                      </th>
                      <th
                        className={cn(
                          "px-5 text-left text-[11px] font-medium text-text-subtext",
                          historyTableCellNowrap
                        )}
                      >
                        TARİH
                      </th>
                      <th
                        className={cn(
                          "px-5 text-left text-[11px] font-medium text-text-subtext",
                          historyTableCellNowrap
                        )}
                      >
                        BAHİS
                      </th>
                      <th
                        className={cn(
                          "px-5 text-left text-[11px] font-medium text-text-subtext",
                          historyTableCellNowrap
                        )}
                      >
                        ORAN
                      </th>
                      <th
                        className={cn(
                          "px-5 text-left text-[11px] font-medium text-text-subtext",
                          historyTableCellNowrap
                        )}
                      >
                        KAZANÇ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCasino.map((row, i) => (
                      <tr
                        key={i}
                        className={historyTableBodyRowClass}
                        onClick={() => openCasinoKupon(row)}
                      >
                        <td className={cn("px-5 py-4", historyTableCellNowrap)}>
                          <HistoryIdCell
                            id={row.id}
                            ariaLabel="İşlem detayına git"
                          />
                        </td>
                        <td
                          className={cn(
                            "px-5 py-4 text-sm text-text-main",
                            historyTableCellNowrap
                          )}
                        >
                          {row.game}
                        </td>
                        <td
                          className={cn(
                            "px-5 py-4 text-xs text-text-subtext",
                            historyTableCellNowrap
                          )}
                        >
                          {row.tarih}
                        </td>
                        <td className={cn("px-5 py-4", historyTableCellNowrap)}>
                          <Coin amount={row.bahis} />
                        </td>
                        <td className={cn("px-5 py-4", historyTableCellNowrap)}>
                          <span className={getOranPillClass(row.status)}>
                            x{row.oran}
                          </span>
                        </td>
                        <td className={cn("px-5 py-4", historyTableCellNowrap)}>
                          <Coin amount={row.kazanc} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </HistoryTableScroll>
            )}
          </>
        )}

        {mainTab === "odeme" && (
          <>
            <div className="mb-4 flex w-fit items-center gap-1 rounded-xl bg-background-elements p-1">
              {(["yatirimlar", "cekinler"] as OdemeSubTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setOdemeSubTab(t)}
                  className={cn(
                    "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                    odemeSubTab === t
                      ? "bg-background-modal text-text-title shadow-sm"
                      : "text-text-subtext hover:text-text-main"
                  )}
                >
                  {t === "yatirimlar" ? "Yatırımlar" : "Çekinler"}
                </button>
              ))}
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <StatCard label="Yatırım" amount="$14.520" />
              <StatCard label="Çekim" amount="$14.520" />
              <StatCard label="Fark" amount="$14.520" />
            </div>

            <div className="mt-8">
              {filteredOdeme.length === 0 ? (
                <HistoryTableEmptyState message="İşlem bulunmuyor" />
              ) : (
                <HistoryTableScroll>
                  <table className={odemeHistoryTableClass}>
                    <thead>
                      <tr>
                        <th
                          className={cn(
                            "px-5 text-left text-[11px] font-medium text-text-subtext",
                            historyTableCellNowrap
                          )}
                        >
                          TÜR
                        </th>
                        <th
                          className={cn(
                            "px-5 text-left text-[11px] font-medium text-text-subtext",
                            historyTableCellNowrap
                          )}
                        >
                          YÖNTEM
                        </th>
                        <th
                          className={cn(
                            "px-5 text-left text-[11px] font-medium text-text-subtext",
                            historyTableCellNowrap
                          )}
                        >
                          TARİH
                        </th>
                        <th
                          className={cn(
                            "px-5 text-left text-[11px] font-medium text-text-subtext",
                            historyTableCellNowrap
                          )}
                        >
                          TUTAR
                        </th>
                        <th
                          className={cn(
                            "px-5 text-left text-[11px] font-medium text-text-subtext",
                            historyTableCellNowrap
                          )}
                        >
                          DURUM
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOdeme.map((row, i) => (
                        <tr key={i} className={historyTableBodyRowStaticClass}>
                          <td
                            className={cn(
                              "px-5 py-4 text-sm text-text-main",
                              historyTableCellNowrap
                            )}
                          >
                            {row.tur}
                          </td>
                          <td className={cn("px-5 py-4", historyTableCellNowrap)}>
                            <div
                              className={cn(
                                "flex items-center gap-1",
                                historyTableCellNowrap
                              )}
                            >
                              <span className="text-sm text-text-main">
                                {row.yontem}
                              </span>
                              {row.txid && (
                                <span
                                  className={cn(
                                    "flex cursor-pointer items-center text-xs font-semibold text-text-subtext hover:underline",
                                    historyTableCellNowrap
                                  )}
                                >
                                  {row.txid}{" "}
                                  <HugeiconsIcon
                                    icon={ArrowUpRight01Icon}
                                    className="size-3.5 text-[#6781FF]"
                                  />
                                </span>
                              )}
                            </div>
                          </td>
                          <td
                            className={cn(
                              "px-5 py-4 text-xs text-text-subtext",
                              historyTableCellNowrap
                            )}
                          >
                            {row.tarih}
                          </td>
                          <td className={cn("px-5 py-4", historyTableCellNowrap)}>
                            <Coin amount={row.tutar} />
                          </td>
                          <td className={cn("px-5 py-4", historyTableCellNowrap)}>
                            <OdemeBadge s={row.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </HistoryTableScroll>
              )}
            </div>
          </>
        )}
      </AccountPageLayout>

      {selectedKupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-element-border bg-background-main shadow-2xl">
            <div className="flex items-center justify-between border-b border-element-border px-5 py-4">
              <div className="flex items-center gap-3">
                {selectedKupon.isActive && (
                  <>
                    <button className="flex size-7 items-center justify-center rounded-lg border border-element-border hover:border-primary">
                      <HugeiconsIcon
                        icon={ArrowLeft01Icon}
                        className="size-3.5 text-icon"
                      />
                    </button>
                    <span className="text-xs text-text-subtext">
                      Aktif Kupon 1/3
                    </span>
                    <button className="flex size-7 items-center justify-center rounded-lg border border-element-border hover:border-primary">
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        className="size-3.5 text-icon"
                      />
                    </button>
                  </>
                )}
              </div>
              <h3 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-text-title">
                Kupon Detay
              </h3>
              <button
                onClick={() => {
                  setSelectedKupon(null)
                  setCashoutOpen(false)
                }}
                className="flex size-8 items-center justify-center rounded-lg bg-background-elements hover:bg-neutral-500/30"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  className="size-4 text-text-main"
                />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
              <div className="mb-4 flex items-center justify-between text-xs text-text-subtext">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono">{selectedKupon.id}</span>
                  <HugeiconsIcon
                    icon={Copy01Icon}
                    className="size-3.5 cursor-pointer text-icon hover:text-primary"
                  />
                </div>
                <span>Oluşturma Tarihi: {selectedKupon.tarih}</span>
              </div>

              {selectedKupon.isActive && (
                <div className="mb-4 rounded-xl bg-background-elements p-4">
                  {!cashoutOpen ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/20">
                          <span className="text-primary">🛡️</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-main">
                            Cashout yap
                          </p>
                          <p className="text-xs text-text-subtext">
                            Kuponu bozdurup, olası kayıpları minimize et.
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setCashoutOpen(true)}
                      >
                        Cashout
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/20">
                          <span className="text-primary">🛡️</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-main">
                            Cashout yap
                          </p>
                          <p className="text-xs text-text-subtext">
                            Kuponu bozdurup, olası kayıpları minimize et.
                          </p>
                        </div>
                      </div>
                      <div className="mb-2 flex flex-col gap-1.5">
                        <label className="text-xs text-text-subtext">
                          Tutar
                        </label>
                        <input
                          value={cashoutAmount}
                          onChange={(e) => setCashoutAmount(e.target.value)}
                          className="w-full rounded-xl border border-element-border bg-background-main px-4 py-2.5 text-sm text-text-main focus:border-primary focus:outline-none"
                        />
                      </div>
                      <p className="mb-2 text-xs text-text-subtext">
                        Max. Cashout: 6.520TRY
                      </p>
                      <div className="mb-3 flex gap-2">
                        {["%25", "%50", "%75", "%100"].map((p) => (
                          <button
                            key={p}
                            className="flex-1 rounded-lg border border-element-border py-1.5 text-xs font-medium text-text-main transition-colors hover:border-primary hover:text-primary"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                      <Button variant="secondary" className="w-full">
                        Cashout yap 14.51TRY
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className="mb-4 flex items-center justify-between">
                <KuponTypeBadge t={selectedKupon.type} />
                <KuponStatusBadge s={selectedKupon.status} />
              </div>

              {selectedKupon.game && (
                <div className="mb-4 rounded-xl bg-background-elements p-4">
                  <p className="mb-3 text-sm font-semibold text-text-main">
                    {selectedKupon.game}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="mb-1 text-xs text-text-subtext">Bahis</p>
                      {selectedKupon.bahis !== undefined && (
                        <Coin amount={selectedKupon.bahis} />
                      )}
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-text-subtext">Oran</p>
                      <p className="text-sm font-semibold text-text-main">
                        x{selectedKupon.oran}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-text-subtext">Kazanç</p>
                      {selectedKupon.maxKazanc !== undefined && (
                        <Coin amount={selectedKupon.maxKazanc} />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!selectedKupon.game && (
                <div className="mb-4 flex flex-col gap-3">
                  {sporMatchRows.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-background-elements p-3 text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-text-main">
                            {m.home} {m.homeScore}
                          </p>
                          <p className="text-text-subtext">
                            {m.away} {m.awayScore}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-text-subtext">
                            {m.market}{" "}
                            <span className="text-primary">{m.result}</span>
                          </p>
                          <p className="text-xs font-medium text-text-main">
                            {m.odds}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <p className="mb-2 text-xs text-text-subtext">
                  Bu kuponu arkadaşın ile paylaş
                </p>
                <div className="flex items-center gap-2 rounded-xl border border-element-border bg-background-elements px-3 py-2">
                  <span className="flex-1 truncate text-xs text-text-main">
                    https://betnarrow992.com/cupon/xt633gfc2
                  </span>
                  <button className="shrink-0 text-icon hover:text-primary">
                    <HugeiconsIcon icon={Copy01Icon} className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
