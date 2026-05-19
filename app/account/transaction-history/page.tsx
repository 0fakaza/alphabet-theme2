"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, Clock01Icon, Cancel01Icon, Copy01Icon, ArrowLeft01Icon, ArrowRight01Icon } from "@/lib/icons"
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
  const map: Record<KuponStatus, { label: string; cls: string }> = {
    beklemede: { label: "+ Beklemede", cls: "bg-amber-500/15 text-amber-400" },
    kazandi:   { label: "+ Kazandı",   cls: "bg-green-500/15 text-green-400" },
    kaybetti:  { label: "+ Kaybetti",  cls: "bg-red-500/15 text-red-400" },
    satildi:   { label: "+ Satıldı",   cls: "bg-orange-500/15 text-orange-400" },
    freebet:   { label: "+ Freebet",   cls: "bg-blue-500/15 text-blue-400" },
    iptal:     { label: "+ İptal",     cls: "bg-neutral-500/30 text-text-subtext" },
  }
  const { label, cls } = map[s]
  return <span className={cn("rounded-md px-2 py-0.5 text-[11px] font-semibold", cls)}>{label}</span>
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

function OdemeBadge({ s }: { s: OdemeStatus }) {
  const map: Record<OdemeStatus, { label: string; cls: string }> = {
    onaylandi: { label: "✓ Onaylandı",     cls: "bg-green-500/15 text-green-400" },
    reddedildi:{ label: "Reddedildi",      cls: "bg-red-500/15 text-red-400" },
    bekliyor:  { label: "Onay bekliyor",   cls: "bg-amber-500/15 text-amber-400" },
    kyc:       { label: "KYC İzlendi",     cls: "bg-primary/15 text-primary" },
  }
  const { label, cls } = map[s]
  return <span className={cn("rounded-md px-2.5 py-1 text-[11px] font-medium", cls)}>{label}</span>
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
    <div className="flex items-center gap-1">
      <span className="flex size-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-black">₮</span>
      <span className="text-sm font-medium text-text-main">{amount.toLocaleString()}</span>
    </div>
  )
}

function StatCard({ label, amount, sub, green }: { label: string; amount: string; sub?: string; green?: boolean }) {
  return (
    <div className="rounded-xl bg-background-elements px-4 py-3 min-w-[120px]">
      <p className="mb-1 text-xs text-text-subtext">{label}</p>
      <p className={cn("text-sm font-bold", green ? "text-green-400" : "text-text-title")}>{amount}</p>
      {sub && <p className="mt-0.5 text-[10px] text-text-subtext">{sub}</p>}
    </div>
  )
}

/* ─────────────────────────── Main page ─────────────────────────── */
export default function GecmisIslemlerimPage() {
  const [mainTab, setMainTab] = useState<MainTab>("spor")
  const [odemeSubTab, setOdemeSubTab] = useState<OdemeSubTab>("yatirimlar")
  const [startDate] = useState("14/03/24")
  const [endDate] = useState("14/03/2024")
  type SelectedKupon = { id: string; tarih: string; isActive: boolean; type: KuponType; status: KuponStatus; game?: string; bahis?: number; oran?: number; maxKazanc?: number }
  const [selectedKupon, setSelectedKupon] = useState<SelectedKupon | null>(null)
  const [cashoutOpen, setCashoutOpen] = useState(false)
  const [cashoutAmount, setCashoutAmount] = useState("1256")
  const isEmpty = false // set to true to see empty state

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
                  mainTab === t ? "bg-background-modal text-text-title shadow-sm" : "text-text-subtext hover:text-text-main",
                )}
              >
                {t === "spor" ? "Spor" : t === "casino" ? "Casino" : "Yatırım / Çekim"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-text-subtext">
            <span>Tarih aralığı</span>
            <span className="flex items-center gap-2 rounded-xl border border-element-border bg-background-elements px-3 py-2 text-xs text-text-main">
              {startDate} – {endDate}
              <span>📅</span>
            </span>
          </div>
        </div>

        {mainTab === "spor" && (
          <>
            <div className="mb-5 flex flex-wrap gap-2">
              {isEmpty ? (
                <>
                  <StatCard label="Kazanç"  amount="0,00TRY" sub="8 kupon" />
                  <StatCard label="Kaybı"   amount="0,00TRY" sub="8 kupon" />
                  <StatCard label="Satılık" amount="0,00TRY" sub="8 kupon" />
                  <StatCard label="İade"    amount="0,00TRY" sub="8 kupon" />
                  <StatCard label="Kar/Zarar" amount="0,00TRY" sub="14 Ağustos 24 – 14 Temmuz tarihleri arası net" />
                </>
              ) : (
                <>
                  <StatCard label="Kazanç"    amount="$14.520" sub="8 kupon" />
                  <StatCard label="Kaybı"     amount="$14.520" sub="8 kupon" />
                  <StatCard label="Satılık"   amount="$14.520" sub="8 kupon" />
                  <StatCard label="İade"      amount="$14.520" sub="8 kupon" />
                  <StatCard label="Kar/Zarar" amount="+$420.52" sub="14 Ağu 24 – 14 Tem" green />
                </>
              )}
            </div>

            {isEmpty ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center rounded-2xl bg-background-main border border-element-border py-20 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/20">
                  <HugeiconsIcon icon={Clock01Icon} className="size-8 text-primary" />
                </div>
                <p className="text-sm font-semibold text-text-title">Buralar boş</p>
                <p className="mt-1 text-xs text-text-subtext">Kupon bulanamadı</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div>
                  <p className="mb-3 text-sm font-semibold text-text-title">Aktif Kuponlar</p>
                  <div className="overflow-hidden rounded-2xl bg-background-main border border-element-border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-element-border">
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">KUPON ID</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">TARİH</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">TARİH</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">BAHİS</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">ORAN</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">MAX KAZANÇ</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">DURUM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sporActiveKuponlar.map((k, i) => (
                          <tr
                            key={i}
                            className="cursor-pointer border-b border-element-border last:border-0 hover:bg-background-elements/30"
                            onClick={() => openSporKupon(k)}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-primary hover:underline">{k.id}</span>
                                <button onClick={(e) => { e.stopPropagation(); setCashoutOpen(false) }} className="text-semantic-error">
                                  <HugeiconsIcon icon={Cancel01Icon} className="size-3" />
                                </button>
                                <KuponTypeBadge t={k.type} />
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-text-subtext">{k.tarih}</td>
                            <td className="px-4 py-3 text-xs text-text-subtext">{k.tarih}</td>
                            <td className="px-4 py-3"><Coin amount={k.bahis} /></td>
                            <td className="px-4 py-3 text-sm text-text-main">x {k.oran}</td>
                            <td className="px-4 py-3"><Coin amount={k.maxKazanc} /></td>
                            <td className="px-4 py-3"><KuponStatusBadge s={k.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-text-title">Geçmiş Kuponlar</p>
                  <div className="overflow-hidden rounded-2xl bg-background-main border border-element-border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-element-border">
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">KUPON ID</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">TARİH</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">TARİH</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">BAHİS</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">ORAN</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">MAX KAZANÇ</th>
                          <th className="px-4 py-3 text-left text-[11px] font-medium text-text-subtext">DURUM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sporGecmisKuponlar.map((k, i) => (
                          <tr
                            key={i}
                            className="cursor-pointer border-b border-element-border last:border-0 hover:bg-background-elements/30"
                            onClick={() => openSporKupon(k)}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-primary hover:underline">{k.id}</span>
                                <button onClick={(e) => e.stopPropagation()} className="text-semantic-error">
                                  <HugeiconsIcon icon={Cancel01Icon} className="size-3" />
                                </button>
                                <KuponTypeBadge t={k.type} />
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-text-subtext">{k.tarih}</td>
                            <td className="px-4 py-3 text-xs text-text-subtext">{k.tarih}</td>
                            <td className="px-4 py-3"><Coin amount={k.bahis} /></td>
                            <td className="px-4 py-3 text-sm text-text-main">x {k.oran}</td>
                            <td className="px-4 py-3"><Coin amount={k.maxKazanc} /></td>
                            <td className="px-4 py-3"><KuponStatusBadge s={k.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex items-center justify-end gap-1 border-t border-element-border px-4 py-3">
                      <button className="flex size-7 items-center justify-center rounded-lg border border-element-border text-icon hover:border-primary hover:text-primary">
                        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5" />
                      </button>
                      {[1, 2, 3, 14].map((p) => (
                        <button key={p} className={cn("flex size-7 items-center justify-center rounded-lg border text-xs font-medium transition-colors", p === 1 ? "border-primary bg-primary text-white" : "border-element-border text-text-subtext hover:border-primary hover:text-primary")}>
                          {p}
                        </button>
                      ))}
                      <button className="flex size-7 items-center justify-center rounded-lg border border-element-border text-icon hover:border-primary hover:text-primary">
                        <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {mainTab === "casino" && (
          <div className="overflow-hidden rounded-2xl bg-background-main border border-element-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-element-border">
                  <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">ID</th>
                  <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">TARİH</th>
                  <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">TARİH</th>
                  <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">BAHİS</th>
                  <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">ORAN</th>
                  <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">KAZANÇ</th>
                </tr>
              </thead>
              <tbody>
                  {casinoIslemler.map((row, i) => (
                  <tr
                    key={i}
                    className="cursor-pointer border-b border-element-border last:border-0 hover:bg-background-elements/30"
                    onClick={() => openCasinoKupon(row)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-primary">{row.id}</span>
                        <span className="text-xs text-icon">↗</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-main">{row.game}</td>
                    <td className="px-5 py-4 text-xs text-text-subtext">{row.tarih}</td>
                    <td className="px-5 py-4"><Coin amount={row.bahis} /></td>
                    <td className="px-5 py-4 text-sm text-text-main">x{row.oran}</td>
                    <td className="px-5 py-4"><Coin amount={row.kazanc} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {mainTab === "odeme" && (
          <>
            <div className="mb-4 flex items-center gap-1 w-fit rounded-xl bg-background-elements p-1">
              {(["yatirimlar", "cekinler"] as OdemeSubTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setOdemeSubTab(t)}
                  className={cn("rounded-lg px-4 py-1.5 text-sm font-medium transition-colors", odemeSubTab === t ? "bg-background-modal text-text-title shadow-sm" : "text-text-subtext hover:text-text-main")}
                >
                  {t === "yatirimlar" ? "Yatırımlar" : "Çekinler"}
                </button>
              ))}
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <StatCard label="Yatırım" amount="$14.520" />
              <StatCard label="Çekim"   amount="$14.520" />
              <StatCard label="Fark"    amount="$14.520" />
            </div>

            <div className="overflow-hidden rounded-2xl bg-background-main border border-element-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-element-border">
                    <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">TÜR</th>
                    <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">YÖNTEM</th>
                    <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">TARİH</th>
                    <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">TUTAR</th>
                    <th className="px-5 py-3 text-left text-[11px] font-medium text-text-subtext">DURUM</th>
                  </tr>
                </thead>
                <tbody>
                  {(odemeSubTab === "yatirimlar" ? yatirimIslemler : cekirIslemler).map((row, i) => (
                    <tr key={i} className="border-b border-element-border last:border-0 hover:bg-background-elements/30">
                      <td className="px-5 py-4 text-sm text-text-main">{row.tur}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-text-main">{row.yontem}</span>
                          {row.txid && <span className="cursor-pointer text-xs font-semibold text-primary hover:underline">{row.txid} ↗</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-text-subtext">{row.tarih}</td>
                      <td className="px-5 py-4"><Coin amount={row.tutar} /></td>
                      <td className="px-5 py-4"><OdemeBadge s={row.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </AccountPageLayout>

      {selectedKupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-background-main border border-element-border shadow-2xl">
            <div className="flex items-center justify-between border-b border-element-border px-5 py-4">
              <div className="flex items-center gap-3">
                {selectedKupon.isActive && (
                  <>
                    <button className="flex size-7 items-center justify-center rounded-lg border border-element-border hover:border-primary">
                      <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5 text-icon" />
                    </button>
                    <span className="text-xs text-text-subtext">Aktif Kupon 1/3</span>
                    <button className="flex size-7 items-center justify-center rounded-lg border border-element-border hover:border-primary">
                      <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5 text-icon" />
                    </button>
                  </>
                )}
              </div>
              <h3 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-text-title">Kupon Detay</h3>
              <button
                onClick={() => { setSelectedKupon(null); setCashoutOpen(false) }}
                className="flex size-8 items-center justify-center rounded-lg bg-background-elements hover:bg-neutral-500/30"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-text-main" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
              <div className="mb-4 flex items-center justify-between text-xs text-text-subtext">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono">{selectedKupon.id}</span>
                  <HugeiconsIcon icon={Copy01Icon} className="size-3.5 cursor-pointer text-icon hover:text-primary" />
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
                          <p className="text-sm font-medium text-text-main">Cashout yap</p>
                          <p className="text-xs text-text-subtext">Kuponu bozdurup, olası kayıpları minimize et.</p>
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" onClick={() => setCashoutOpen(true)}>
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
                          <p className="text-sm font-medium text-text-main">Cashout yap</p>
                          <p className="text-xs text-text-subtext">Kuponu bozdurup, olası kayıpları minimize et.</p>
                        </div>
                      </div>
                      <div className="mb-2 flex flex-col gap-1.5">
                        <label className="text-xs text-text-subtext">Tutar</label>
                        <input value={cashoutAmount} onChange={(e) => setCashoutAmount(e.target.value)} className="w-full rounded-xl border border-element-border bg-background-main px-4 py-2.5 text-sm text-text-main focus:border-primary focus:outline-none" />
                      </div>
                      <p className="mb-2 text-xs text-text-subtext">Max. Cashout: 6.520TRY</p>
                      <div className="mb-3 flex gap-2">
                        {["%25", "%50", "%75", "%100"].map((p) => (
                          <button key={p} className="flex-1 rounded-lg border border-element-border py-1.5 text-xs font-medium text-text-main hover:border-primary hover:text-primary transition-colors">
                            {p}
                          </button>
                        ))}
                      </div>
                      <Button variant="secondary" className="w-full">Cashout yap 14.51TRY</Button>
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
                  <p className="mb-3 text-sm font-semibold text-text-main">{selectedKupon.game}</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="mb-1 text-xs text-text-subtext">Bahis</p>
                      {selectedKupon.bahis !== undefined && <Coin amount={selectedKupon.bahis} />}
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-text-subtext">Oran</p>
                      <p className="text-sm font-semibold text-text-main">x{selectedKupon.oran}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-text-subtext">Kazanç</p>
                      {selectedKupon.maxKazanc !== undefined && <Coin amount={selectedKupon.maxKazanc} />}
                    </div>
                  </div>
                </div>
              )}

              {!selectedKupon.game && (
                <div className="mb-4 flex flex-col gap-3">
                  {sporMatchRows.map((m, i) => (
                    <div key={i} className="rounded-xl bg-background-elements p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-text-main">{m.home} {m.homeScore}</p>
                          <p className="text-text-subtext">{m.away} {m.awayScore}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-text-subtext">{m.market} <span className="text-primary">{m.result}</span></p>
                          <p className="text-xs font-medium text-text-main">{m.odds}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <p className="mb-2 text-xs text-text-subtext">Bu kuponu arkadaşın ile paylaş</p>
                <div className="flex items-center gap-2 rounded-xl border border-element-border bg-background-elements px-3 py-2">
                  <span className="flex-1 truncate text-xs text-text-main">https://betnarrow992.com/cupon/xt633gfc2</span>
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
