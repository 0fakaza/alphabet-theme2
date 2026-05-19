"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, Cancel01Icon, Hold03Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"
import { Button } from "@/components/elements/button"
import { PencilEdit02Icon, Delete02Icon } from "@/lib/icons"
import {CheckmarkCircle01Icon} from "@hugeicons-pro/core-bulk-rounded";
import { InfoTooltip } from "@/components/elements/tooltip"

type TabId = "genel" | "spor" | "casino" | "disla"

const tabs: { id: TabId; label: string }[] = [
  { id: "genel", label: "Genel Limit" },
  { id: "spor", label: "Spor Limitleri" },
  { id: "casino", label: "Casino Limitleri" },
  { id: "disla", label: "Kendini Dışla" },
]

const inputCls =
  "w-full rounded-xl border border-element-border bg-background-elements px-4 py-3 text-sm text-text-main placeholder:text-text-subtext focus:outline-none focus:border-primary transition-colors"

/* ─── Tek limit kartı ─── */
function LimitCard({
  title,
  desc,
  expanded,
  onToggle,

  initialSaved = false,
}: {
  title: string
  desc: string
  expanded: boolean
  onToggle: () => void

  initialSaved?: boolean
}) {
  const [gunluk, setGunluk] = useState("500,00")
  const [haftalik, setHaftalik] = useState("2.000,00")
  const [aylik, setAylik] = useState("5.000,00")
  const [gerekce, setGerekce] = useState(
    "Ünsalan, Libadiye Co. No: 80 G Blok, 34700 Üsküdar/\nİstanbul...",
  )
  const [agreed, setAgreed] = useState(false)
  const [saved, setSaved] = useState(initialSaved)

  return (
    <div className="border-b border-divider-100">
      <div className="flex items-start justify-between py-5">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "flex items-center gap-2 text-sm font-semibold",
                saved ? "text-primary" : "text-text-title"
              )}
            >
              {title}{" "}
              {saved && (
                <HugeiconsIcon
                  icon={CheckmarkCircle01Icon}
                  className="size-4 text-semantic-success"
                />
              )}
            </p>
          </div>
          <p className="mt-1 text-xs text-text-subtext">{desc}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {saved && (
            <button
              onClick={() => setSaved(false)}
              className="flex size-8 cursor-pointer items-center justify-center rounded-md border border-element-border hover:border-semantic-error hover:text-semantic-error"
            >
              <HugeiconsIcon
                icon={Delete02Icon}
                className="size-4 text-text-subtext"
              />
            </button>
          )}
          <button
            onClick={onToggle}
            className="flex size-8 cursor-pointer items-center justify-center rounded-md border border-element-border hover:border-primary"
          >
            <HugeiconsIcon
              icon={PencilEdit02Icon}
              className="size-4 text-text-subtext"
            />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-element-border pt-4 pb-5">
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { label: "Günlük", value: gunluk, set: setGunluk },
              { label: "Haftalık", value: haftalik, set: setHaftalik },
              { label: "Aylık", value: aylik, set: setAylik },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5">
                <label className="flex items-center gap-0.5 text-xs text-text-subtext">
                  {f.label}
                  <span className="text-semantic-error">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-text-subtext">
                    ₺
                  </span>
                  <input
                    required
                    className={cn(inputCls, "pl-7")}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <label className="flex items-center gap-1.5 text-xs text-text-subtext">
                Gerekçe
                <span className="text-semantic-error">*</span>
              </label>
              <InfoTooltip content="Limit belirleme veya değiştirme talebiniz için kısa bir gerekçe yazmanız gerekir." />
            </div>
            <textarea
              required
              rows={3}
              className={cn(inputCls, "resize-none")}
              value={gerekce}
              onChange={(e) => setGerekce(e.target.value)}
            />
          </div>

          <label className="mb-4 flex cursor-pointer items-start gap-3">
            <span className="relative mt-0.5 flex size-4 shrink-0">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded border-2 transition-colors",
                  agreed
                    ? "border-primary bg-primary"
                    : "border-element-border bg-background-elements"
                )}
              >
                {agreed && <span className="text-[10px] text-white">✓</span>}
              </span>
            </span>
            <span className="text-xs text-text-subtext">
              Bu sınırı 24 saat geçmeden düzenleyemeyeceğimi ve silemeyeceğimi
              ve sınırların Masaüstü ve Demo modlarında çalıştığını anlıyorum.
            </span>
          </label>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSaved(true)
              onToggle()
            }}
          >
            Limiti Kaydet
          </Button>
        </div>
      )}
    </div>
  )
}

/* ─── Her sekmenin limit kartları ─── */
const tabContent: Record<TabId, { key: string; title: string; desc: string; initialSaved?: boolean }[]> = {
  genel: [
    { key: "para-yatirma", title: "Para Yatırma Limiti", desc: "Günlük, haftalık veya aylık yatırım miktarınızı sınırlayın." },
    { key: "para-cekme", title: "Para Çekme Limiti", desc: "Günlük, haftalık veya aylık çekim miktarınızı sınırlayın." },
  ],
  spor: [
    { key: "bahis", title: "Bahis limiti", desc: "Bahis miktarınızın günlük, haftalık veya aylık olarak düzenleyin.", initialSaved: true },
    { key: "kayip", title: "Kayıp Limiti", desc: "Bir günde, haftada veya ayda kaybedebileceğiniz maksimum miktarı sınırlandırın." },
    { key: "sure", title: "Bahis Süresi Limiti", desc: "Günlük oyun seanslarınızın süresini sınırlandırın." },
  ],
  casino: [
    { key: "casino-bahis", title: "Casino Bahis Limiti", desc: "Casino bahis miktarınızı günlük, haftalık veya aylık olarak sınırlayın." },
    { key: "casino-kayip", title: "Casino Kayıp Limiti", desc: "Casino'da kaybedebileceğiniz maksimum miktarı sınırlandırın." },
    { key: "casino-sure", title: "Casino Süre Limiti", desc: "Günlük casino oturumunuzun süresini sınırlandırın." },
  ],
  disla: [
    { key: "kisa-sure", title: "Kısa Süreli Dışlama", desc: "Belirli bir süre için hesabınıza erişimi geçici olarak engelleyin." },
    { key: "kalici", title: "Kalıcı Dışlama", desc: "Hesabınıza erişimi kalıcı olarak kapatın." },
  ],
}

export default function SinirlarPage() {
  const [activeTab, setActiveTab] = useState<TabId>("spor")
  const [expandedKey, setExpandedKey] = useState<string | null>("kayip")

  function toggle(key: string) {
    setExpandedKey((p) => (p === key ? null : key))
  }

  /* Sekme değişince expanded card'ı sıfırla */
  function handleTabChange(id: TabId) {
    setActiveTab(id)
    setExpandedKey(null)
  }

  const limits = tabContent[activeTab]

  return (
    <AccountPageLayout title="Hesabımı Sınırla" icon={Hold03Icon} breadcrumb="Hesabımı Sınırla">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[230px_1fr]">

        <div className="h-fit rounded-2xl  bg-background-main p-2 pr-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex w-full items-center cursor-pointer mb-1 justify-between rounded-md px-4 py-3 text-left text-sm transition-colors",
                  isActive
                    ? "bg-background-body text-text-main"
                    : "text-text-main hover:bg-background-elements/50",
                )}
              >
                <span>{tab.label}</span>
                {isActive && <HugeiconsIcon className="size-5 text-semantic-success" icon={CheckmarkCircle01Icon} />}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-3 pl-5">
          {limits.map((item) => (
            <LimitCard
              key={item.key}
              title={item.title}
              desc={item.desc}

              initialSaved={"initialSaved" in item ? item.initialSaved : false}
              expanded={expandedKey === item.key}
              onToggle={() => toggle(item.key)}
            />
          ))}
        </div>
      </div>
    </AccountPageLayout>
  )
}
