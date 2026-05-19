"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, FingerPrintIcon, Upload04Icon, ArrowDown01Icon } from "@/lib/icons"
import { AccountPageLayout } from "@/components/account/account-page-layout"

type DocStatus = "pending" | "reviewing" | "approved" | "rejected" | "required"

interface DocItem {
  id: string
  label: string
  status: DocStatus
}

const docs: DocItem[] = [
  { id: "surucu", label: "Sürücü Belgesi", status: "required" },
  { id: "fatura", label: "Fatura Belgesi", status: "pending" },
  { id: "para", label: "Para Kaynağı", status: "pending" },
  { id: "ikamet", label: "İkamergah Belgesi", status: "reviewing" },
  { id: "kimlik", label: "Kimlik Belgesi", status: "pending" },
]

function StatusBadge({ status }: { status: DocStatus }) {
  if (status === "required") {
    return (
      <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-medium text-amber-500">
        Doğrulama Talep edilir
      </span>
    )
  }
  if (status === "reviewing") {
    return (
      <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[11px] font-medium text-blue-400">
        İnceleniyor
      </span>
    )
  }
  if (status === "approved") {
    return (
      <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-[11px] font-medium text-green-500">
        Onaylandı
      </span>
    )
  }
  if (status === "rejected") {
    return (
      <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-[11px] font-medium text-red-500">
        Reddedildi
      </span>
    )
  }
  return null
}

function DocAccordionItem({
  doc,
  isOpen,
  onToggle,
}: {
  doc: DocItem
  isOpen: boolean
  onToggle: () => void
}) {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border transition-colors bg-background-main",
        isOpen ? "border-primary" : "border-element-border",
      )}
    >
      <button
        className="flex w-full items-center justify-between px-5 py-4"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-text-title">{doc.label}</span>
          <StatusBadge status={doc.status} />
        </div>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          className={cn("size-4 text-icon transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="border-t border-element-border px-5 pb-5 pt-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-10 transition-colors",
              dragOver
                ? "border-primary bg-primary/5"
                : "border-element-border hover:border-primary/50",
            )}
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/15">
              <HugeiconsIcon icon={Upload04Icon} className="size-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-text-main">
                {file ? file.name : "Belgeyi sürükle bırak veya Dosyadan seç"}
              </p>
              <p className="mt-0.5 text-xs text-text-subtext">
                Maksimum dosya boyutu: 2MB, Desteklenen formatlar: PDF, JPG, PNG
              </p>
            </div>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function KYCPage() {
  const [openDoc, setOpenDoc] = useState<string | null>("fatura")

  function toggle(id: string) {
    setOpenDoc((prev) => (prev === id ? null : id))
  }

  return (
    <AccountPageLayout title="KYC" icon={FingerPrintIcon}>
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-element-border bg-background-main px-5 py-4">
        <span className="mt-0.5 shrink-0 text-primary">📋</span>
        <p className="text-xs text-text-subtext">
          Yükleyeceğiniz belgenin tüm köşeleri/fotoğrafın içinde görünmelidir. Belge düz bir zemine
          yerleştirilmeli ve üzerindeki bilgiler net şekilde okunabilir olmalıdır.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {docs.map((doc) => (
          <DocAccordionItem
            key={doc.id}
            doc={doc}
            isOpen={openDoc === doc.id}
            onToggle={() => toggle(doc.id)}
          />
        ))}
      </div>
    </AccountPageLayout>
  )
}
