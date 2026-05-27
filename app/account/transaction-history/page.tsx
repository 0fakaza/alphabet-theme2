"use client"

import { useMemo, useState } from "react"
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
} from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Button } from "@/components/elements/button"
import type { MainTab, OdemeSubTab, SelectedKupon } from "./types"
import {
  sporActiveKuponlar,
  sporGecmisKuponlar,
  casinoIslemler,
  yatirimIslemler,
  cekirIslemler,
  sporMatchRows,
} from "./data"
import { KuponStatusBadge, KuponTypeBadge, OdemeBadge } from "./badges"
import {
  Coin,
  getOranPillClass,
  StatCard,
  HistoryTableScroll,
  HistoryTableEmptyState,
  HistoryIdCell,
  SporKuponTableHead,
  SporKuponTableRow,
  historyTableCellNowrap,
  historyTableBodyRowClass,
  historyTableBodyRowStaticClass,
  sporHistoryTableClass,
  casinoHistoryTableClass,
  odemeHistoryTableClass,
} from "./table-shared"

const defaultDateRange: DateRangeValue = {
  start: "2025-02-01",
  end: "2025-02-28",
}

export default function GecmisIslemlerimPage() {
  const [mainTab, setMainTab] = useState<MainTab>("spor")
  const [odemeSubTab, setOdemeSubTab] = useState<OdemeSubTab>("yatirimlar")
  const [dateRange, setDateRange] = useState<DateRangeValue>(defaultDateRange)
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

  function openSporKupon(k: (typeof sporActiveKuponlar)[0]) {
    setSelectedKupon({
      id: k.id,
      tarih: k.tarih,
      isActive: k.isActive,
      type: k.type,
      status: k.status,
      bahis: k.bahis,
      oran: k.oran,
      maxKazanc: k.maxKazanc,
    })
    setCashoutOpen(false)
  }
  function openCasinoKupon(r: (typeof casinoIslemler)[0]) {
    setSelectedKupon({
      id: r.id,
      tarih: r.tarih,
      isActive: r.isActive,
      type: r.type,
      status: r.status,
      game: r.game,
      bahis: r.bahis,
      oran: r.oran,
      maxKazanc: r.kazanc,
    })
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
                    https:
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
