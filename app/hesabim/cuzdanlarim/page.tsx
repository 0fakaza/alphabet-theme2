"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, Wallet01Icon, Cancel01Icon, Add01Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Button } from "@/components/elements/button"
import { More02Icon, Delete02Icon, PencilEdit02Icon, Copy01Icon } from "@/lib/icons"
import { CurrencyBadge } from "@/components/elements/currency-badge"
import { toast } from "sonner"
import {MoreVerticalIcon} from "@hugeicons-pro/core-stroke-rounded";

type WalletType = "bank" | "crypto"

const banks = [
  {
    id: 1,
    name: "Ziraat Bankası",
    iban: "TR05 5448 2178 5467 4184",
    accountNo: "875412467",
    addedDate: "10.02.2025",
    logo: "/images/banks/ziraat.png",
  },
]

const cryptos = [
  {
    id: 1,
    name: "Tron (TRX)",
    currency: "TRX" as const,
    address: "0x1a9e8bc837a1fe6b68bb29f9f1234567890abcdef",
    network: "ERC-20",
    addedDate: "10.02.2025",
  },
  {
    id: 2,
    name: "Tether (USDT)",
    currency: "USDT" as const,
    address: "0x1a9e8bc837a1fe6b68bb29f9f1234567890abcdef",
    network: "TRC-20",
    addedDate: "10.02.2025",
  },
]

const inputCls = "w-full rounded-xl border border-element-border bg-background-elements px-4 py-3 text-sm text-text-main placeholder:text-text-subtext focus:outline-none focus:border-primary transition-colors"

export default function CuzdanlarimPage() {
  const [bankList, setBankList] = useState(banks)
  const [cryptoList, setCryptoList] = useState(cryptos)
  const [addOpen, setAddOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<WalletType>("bank")
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [agreed, setAgreed] = useState(false)
  const [form, setForm] = useState({ sirket: "Papara", iban: "TR", accountNo: "" })
  const [cryptoForm, setCryptoForm] = useState({ coin: "Bitcoin (BTC)", address: "", network: "ERC-20" })

  const isEmpty = bankList.length === 0 && cryptoList.length === 0

  function openAdd() {
    setEditId(null)
    setForm({ sirket: "Papara", iban: "TR", accountNo: "" })
    setCryptoForm({ coin: "Bitcoin (BTC)", address: "", network: "ERC-20" })
    setAgreed(false)
    setAddOpen(true)
  }

  function openEdit(type: WalletType, id: number) {
    setActiveTab(type)
    setEditId(id)
    setOpenMenuId(null)
    if (type === "bank") {
      const b = bankList.find((b) => b.id === id)
      if (b) setForm({ sirket: b.name, iban: b.iban, accountNo: b.accountNo })
    } else {
      const c = cryptoList.find((c) => c.id === id)
      if (c) setCryptoForm({ coin: c.name, address: c.address, network: c.network })
    }
    setAgreed(false)
    setAddOpen(true)
  }

  function deleteBank(id: number) {
    setBankList((p) => p.filter((b) => b.id !== id))
    setOpenMenuId(null)
  }

  function deleteCrypto(id: number) {
    setCryptoList((p) => p.filter((c) => c.id !== id))
    setOpenMenuId(null)
  }

  function handleSave() {
    if (activeTab === "bank") {
      if (editId !== null) {
        setBankList((p) => p.map((b) => b.id === editId ? { ...b, name: form.sirket, iban: form.iban, accountNo: form.accountNo } : b))
      } else {
        setBankList((p) => [...p, { id: Date.now(), name: form.sirket, iban: form.iban, accountNo: form.accountNo, addedDate: new Date().toLocaleDateString("tr-TR"), logo: "" }])
      }
    } else {
      if (editId !== null) {
        setCryptoList((p) => p.map((c) => c.id === editId ? { ...c, name: cryptoForm.coin, address: cryptoForm.address, network: cryptoForm.network } : c))
      } else {
        setCryptoList((p) => [...p, { id: Date.now(), name: cryptoForm.coin, currency: "USDT" as const, address: cryptoForm.address, network: cryptoForm.network, addedDate: new Date().toLocaleDateString("tr-TR") }])
      }
    }
    setAddOpen(false)
    setEditId(null)
  }

  return (
    <>
      {openMenuId !== null && (
        <div className="fixed inset-0 z-[9]" onClick={() => setOpenMenuId(null)} />
      )}
      <AccountPageLayout title="Cüzdanlarım" icon={Wallet01Icon}>
        {isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl bg-background-main py-20 text-center">
            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-primary/20">
              <HugeiconsIcon icon={Wallet01Icon} className="size-9 text-primary" />
            </div>
            <h2 className="mb-2 text-base font-semibold text-text-title">Buralar boş</h2>
            <p className="mb-6 text-sm text-text-subtext">Kayıtlı herhangi bir çekim adresiniz bulunmuyor.</p>
            <Button variant="secondary" onClick={openAdd}>
              <HugeiconsIcon icon={Add01Icon} className="size-4" />
              Cüzdan Ekle
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">🏦</span>
                <h2 className="text-base font-semibold text-text-title">Bankalar</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {bankList.map((bank) => (
                  <div key={bank.id} className="relative rounded-2xl bg-background-main p-5">
                    <div className="flex items-start justify-between border-b border-divider-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background-elements">
                          <span className="text-lg">🏛️</span>
                        </div>
                        <span className="font-semibold text-text-title">{bank.name}</span>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === bank.id ? null : bank.id)}
                          className="flex size-8 items-center justify-center rounded-md border border-element-border hover:bg-background-elements cursor-pointer"
                        >
                          <HugeiconsIcon icon={MoreVerticalIcon} className="size-5 text-icon" />
                        </button>
                        {openMenuId === bank.id && (
                          <div className="absolute right-0 top-9 z-10 min-w-[120px] rounded-lg bg-background-elements shadow-lg ring-1 ring-divider-100">
                            <button onClick={() => deleteBank(bank.id)} className="flex cursor-pointer w-full cursor-pointer  items-center rounded-t-lg justify-end gap-3 px-4 py-2.5 text-sm text-semantic-error hover:bg-background-body/50">
                              Sil
                              <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                            </button>
                            <button onClick={() => openEdit("bank", bank.id)} className="flex cursor-pointer w-full rounded-b-lg items-center justify-between gap-3 px-4 py-2.5 text-sm text-text-main hover:bg-background-body/50">
                              Düzenle
                              <HugeiconsIcon icon={PencilEdit02Icon} className="size-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <div>
                        <p className="text-xs text-text-subtext">İban</p>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium text-text-main">{bank.iban}</p>
                          <button
                            onClick={() => { navigator.clipboard.writeText(bank.iban); toast.success("Kopyalandı", { description: bank.iban }) }}
                            className="cursor-pointer text-icon hover:text-primary"
                          >
                            <HugeiconsIcon icon={Copy01Icon} className="size-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div>
                          <p className="text-xs text-text-subtext">Hesap No</p>
                          <p className="text-sm font-medium text-text-main">{bank.accountNo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-subtext">Ekleme Tarihi</p>
                          <p className="text-sm font-medium text-text-main">{bank.addedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">🪙</span>
                <h2 className="text-base font-semibold text-text-title">Kripto Cüzdanlarım</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {cryptoList.map((crypto) => (
                  <div key={crypto.id} className="relative rounded-2xl bg-background-main p-5">
                    <div className="flex items-start justify-between border-b border-divider-100 pb-4">
                      <div className="flex items-center gap-3">
                        <CurrencyBadge currency={crypto.currency} />
                        <span className="font-semibold text-text-title">{crypto.name}</span>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === crypto.id + 1000 ? null : crypto.id + 1000)}
                          className="flex size-8 items-center justify-center rounded-md border border-element-border hover:bg-background-elements cursor-pointer"
                        >
                          <HugeiconsIcon icon={MoreVerticalIcon} className="size-5 text-icon" />
                        </button>
                        {openMenuId === crypto.id + 1000 && (
                          <div className="absolute right-0 top-9 z-10 min-w-[120px] rounded-xl bg-background-elements shadow-lg ring-1 ring-divider-100">
                            <button onClick={() => deleteCrypto(crypto.id)} className="flex w-full items-center justify-end cursor-pointer gap-3 px-4 py-2.5 text-sm text-semantic-error hover:bg-background-body/50">
                              Sil
                              <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                            </button>
                            <button onClick={() => openEdit("crypto", crypto.id)} className="flex w-full items-center justify-end cursor-pointer gap-3 px-4 py-2.5 text-sm text-text-main hover:bg-background-body/50">
                              Düzenle
                              <HugeiconsIcon icon={PencilEdit02Icon} className="size-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-1">
                      <p className="text-xs text-text-subtext">Cüzdan</p>
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-medium text-text-main">{crypto.address}</p>
                        <button
                          onClick={() => { navigator.clipboard.writeText(crypto.address); toast.success("Kopyalandı", { description: crypto.address.slice(0, 20) + "..." }) }}
                          className="shrink-0 cursor-pointer text-icon hover:text-primary"
                        >
                          <HugeiconsIcon icon={Copy01Icon} className="size-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-6">
                      <div>
                        <p className="text-xs text-text-subtext">Hesap Numarası</p>
                        <p className="text-sm font-medium text-text-main">{crypto.network}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-subtext">Ekleme Tarihi</p>
                        <p className="text-sm font-medium text-text-main">{crypto.addedDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="secondary" className="w-fit" onClick={openAdd}>
              <HugeiconsIcon icon={Add01Icon} className="size-4" />
              Cüzdan Ekle
            </Button>
          </div>
        )}
      </AccountPageLayout>

      {addOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setAddOpen(false)} />
          <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-background-modal shadow-2xl">
            <div className="flex items-start justify-between border-b border-divider-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-500/20">
                  <span className="text-lg">💚</span>
                </div>
                <div>
                  <p className="text-[11px] text-text-subtext">{editId !== null ? "Düzenleniyor" : "Nasıl yatırım yapabilirsiniz?"}</p>
                  <p className="font-semibold text-text-title">{editId !== null ? (activeTab === "bank" ? "Banka Cüzdanı" : "Kripto Cüzdanı") : "Peppara"}</p>
                </div>
              </div>
              <button onClick={() => setAddOpen(false)} className="flex size-8 items-center justify-center rounded-lg bg-background-elements hover:bg-neutral-400">
                <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-text-main" />
              </button>
            </div>

            <div className="flex border-b border-divider-100">
              {(["bank", "crypto"] as WalletType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 py-3 text-sm font-medium transition-colors",
                    activeTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-text-subtext hover:text-text-main",
                  )}
                >
                  {tab === "bank" ? "Banka Ekle" : "Kripto Ekle"}
                </button>
              ))}
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
              {activeTab === "bank" ? (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-subtext">Şirket *</label>
                    <div className="relative">
                      <select
                        value={form.sirket}
                        onChange={(e) => setForm((p) => ({ ...p, sirket: e.target.value }))}
                        className={inputCls}
                      >
                        <option>Papara</option>
                        <option>Ziraat Bankası</option>
                        <option>İş Bankası</option>
                        <option>Garanti</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-subtext">İban *</label>
                    <input
                      value={form.iban}
                      onChange={(e) => setForm((p) => ({ ...p, iban: e.target.value }))}
                      className={inputCls}
                      placeholder="TR"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-subtext">Hesap Numarası *</label>
                    <input
                      value={form.accountNo}
                      onChange={(e) => setForm((p) => ({ ...p, accountNo: e.target.value }))}
                      className={inputCls}
                      placeholder=""
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-subtext">Kripto Para *</label>
                    <select value={cryptoForm.coin} onChange={(e) => setCryptoForm((p) => ({ ...p, coin: e.target.value }))} className={inputCls}>
                      <option>Bitcoin (BTC)</option>
                      <option>Tether (USDT)</option>
                      <option>Tron (TRX)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-subtext">Cüzdan Adresi *</label>
                    <input value={cryptoForm.address} onChange={(e) => setCryptoForm((p) => ({ ...p, address: e.target.value }))} className={inputCls} placeholder="0x..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-text-subtext">Ağ *</label>
                    <select value={cryptoForm.network} onChange={(e) => setCryptoForm((p) => ({ ...p, network: e.target.value }))} className={inputCls}>
                      <option>ERC-20</option>
                      <option>TRC-20</option>
                      <option>BEP-20</option>
                    </select>
                  </div>
                </>
              )}

              <label className="flex cursor-pointer items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border-2 transition-colors",
                    agreed ? "border-primary bg-primary" : "border-element-border bg-background-elements",
                  )}
                  onClick={() => setAgreed((p) => !p)}
                >
                  {agreed && <span className="text-[10px] text-white">✓</span>}
                </span>
                <span className="text-sm text-text-subtext">Bilgilerimin bana ait olduğunu teyit ediyorum.</span>
              </label>
            </div>

            <div className="flex gap-3 border-t border-divider-100 p-5">
              <Button variant="outline" className="flex-1" onClick={() => setAddOpen(false)}>Vazgeç</Button>
              <Button variant="secondary" className="flex-1" onClick={handleSave}>{editId !== null ? "Güncelle" : "Kaydet"}</Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
